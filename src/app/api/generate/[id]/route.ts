import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { generateDeliverable } from '@/lib/claude/generate'
import { generateWithRetry } from '@/lib/claude/retry-engine'
import { checkQuality, extractPostProcessing } from '@/lib/claude/quality-check'
import { scanForHallucinations, redactHallucinations } from '@/lib/claude/fact-scanner'
import { logHallucinations } from '@/lib/notifications/hallucination-logger'
import { reportError } from '@/lib/notifications/error-reporter'
import { trackTokenUsage, trackRateLimitHit, trackQualityAlert } from '@/lib/notifications/usage-monitor'
import { DELIVERABLES } from '@/lib/deliverable-config'
import { extractIdentityNames } from '@/lib/claude/identity-extractor'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'

/**
 * Fact-scanner enforcement flag. When true, critical hallucinations force a
 * correction retry (older, more expensive path). Default false.
 */
const FACT_SCANNER_ENFORCE = process.env.FACT_SCANNER_ENFORCE === 'true'

/**
 * Auto-redact flag. When true (default), critical hallucinations detected by the
 * scanner are REPLACED in-place with `[COACH: Insert your real X here]` placeholders
 * before the deliverable is saved. Deterministic, no retry needed, works uniformly
 * across all templates regardless of output length.
 * Set FACT_SCANNER_AUTOREDACT=false to disable.
 */
const FACT_SCANNER_AUTOREDACT = process.env.FACT_SCANNER_AUTOREDACT !== 'false'

/** Strip known hallucinated names from prior deliverable context to prevent propagation */
const HALLUCINATED_NAMES = [
  'Sam Bakhtiar', 'Bakhtiar', 'Kevin Nations', 'Garrett J. White',
  'Garrett White', 'Warrior Greens', 'Vigor Summit'
]

function sanitizeContext(content: string): string {
  let sanitized = content
  for (const name of HALLUCINATED_NAMES) {
    sanitized = sanitized.replaceAll(name, '[mentor reference removed]')
  }
  return sanitized
}

export const maxDuration = 600 // 10 minutes — Vercel Pro plan

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth check
    const authClient = await createClient()
    const { data: { user } } = await authClient.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limit: 5 generation requests per minute per user
    const rateCheck = checkRateLimit(`generate:${user.id}`, RATE_LIMITS.generate)
    if (!rateCheck.allowed) {
      trackRateLimitHit(user.id, 'generate')
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait before generating again.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateCheck.resetAt - Date.now()) / 1000)),
            'X-RateLimit-Remaining': '0',
          }
        }
      )
    }

    const { id: questionnaireId } = await params
    const body = await request.json()
    const { templateId } = body

    if (!templateId) {
      return NextResponse.json(
        { error: 'templateId is required' },
        { status: 400 }
      )
    }

    const config = DELIVERABLES.find((d) => d.templateId === templateId)
    if (!config) {
      return NextResponse.json(
        { error: 'Invalid templateId' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Fetch questionnaire and verify ownership
    let answers: Record<string, unknown> = {}
    const { data: questionnaire } = await supabase
      .from('questionnaires')
      .select('answers, user_id')
      .eq('id', questionnaireId)
      .single()

    if (!questionnaire) {
      return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 })
    }
    if (questionnaire.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    answers = questionnaire.answers || {}

    // Enforce dependency completion before generating
    if (config.dependsOn.length > 0) {
      const { data: completedDeps } = await supabase
        .from('deliverables')
        .select('template_id')
        .eq('questionnaire_id', questionnaireId)
        .eq('status', 'completed')
        .in('template_id', config.dependsOn)

      const completedIds = new Set((completedDeps || []).map((d: { template_id: string }) => d.template_id))
      const missingDeps = config.dependsOn.filter(dep => !completedIds.has(dep))

      if (missingDeps.length > 0) {
        const missingTitles = missingDeps
          .map(id => DELIVERABLES.find(d => d.templateId === id)?.title || id)
          .join(', ')
        return NextResponse.json(
          { error: `Missing required deliverables: ${missingTitles}. Please generate them first.` },
          { status: 400 }
        )
      }
    }

    const now = new Date().toISOString()

    // Check for existing deliverable (regeneration case)
    const { data: existing } = await supabase
      .from('deliverables')
      .select('*')
      .eq('questionnaire_id', questionnaireId)
      .eq('template_id', templateId)
      .single()

    // Update status to generating if existing
    if (existing) {
      await supabase
        .from('deliverables')
        .update({ status: 'generating', updated_at: now })
        .eq('id', existing.id)
    }

    try {
      // Build context from DIRECT DEPENDENCIES only — not all completed deliverables.
      // Loading everything risks contamination: one bad artifact with a wrong identity
      // name can propagate through unrelated downstream templates.
      // Identity names are extracted separately and injected as a locked, authoritative block.
      let context: string | undefined

      // Fetch direct dependencies for full content injection
      const { data: directDeps } = config.dependsOn.length > 0
        ? await supabase
            .from('deliverables')
            .select('template_id, title, content')
            .eq('questionnaire_id', questionnaireId)
            .eq('status', 'completed')
            .in('template_id', config.dependsOn)
        : { data: [] }

      // Always fetch two-identities for identity name locking (even if not a direct dep)
      const needsIdentityLookup = !config.dependsOn.includes('two-identities')
      let twoIdentitiesContent: string | null = null
      if (needsIdentityLookup) {
        const { data: twoId } = await supabase
          .from('deliverables')
          .select('content')
          .eq('questionnaire_id', questionnaireId)
          .eq('template_id', 'two-identities')
          .eq('status', 'completed')
          .single()
        twoIdentitiesContent = twoId?.content || null
      }

      // Extract identity names from two-identities (from deps or separate lookup)
      let identityBlock = ''
      const twoIdentitiesSource = (directDeps || []).find(d => d.template_id === 'two-identities')
      const identityContent = twoIdentitiesSource?.content || twoIdentitiesContent
      if (identityContent) {
        const names = extractIdentityNames(identityContent)
        if (names.undesired || names.aspiring) {
          identityBlock = `\n⚠️ MANDATORY — IDENTITY NAMES ARE LOCKED ⚠️\n${names.undesired ? `Undesired Identity: "${names.undesired}"` : ''}${names.undesired && names.aspiring ? '\n' : ''}${names.aspiring ? `Aspiring Identity: "${names.aspiring}"` : ''}\nYou MUST use these EXACT names throughout your output. Do NOT create new names, synonyms, abbreviations, or "improved" versions. These names were established in the Two Identities deliverable and are FINAL.\n⚠️ END MANDATORY IDENTITY NAMES ⚠️\n\n`
        } else {
          // Extraction failed — warn so we can debug
          console.warn(`[generate] Identity name extraction returned null for both names in questionnaire ${questionnaireId}. Two-identities content may use an unparseable format.`)
        }
      }

      if ((directDeps && directDeps.length > 0) || identityBlock) {
        // Sort direct deps by phase order
        const sorted = (directDeps || []).sort((a, b) => {
          const phaseA = DELIVERABLES.find(d => d.templateId === a.template_id)?.phase || 0
          const phaseB = DELIVERABLES.find(d => d.templateId === b.template_id)?.phase || 0
          return phaseA - phaseB
        })

        const deliverableContent = sorted
          .map(d => {
            const delConfig = DELIVERABLES.find(del => del.templateId === d.template_id)
            return `## [DIRECT DEPENDENCY: ${d.template_id}] ${d.title}\nPhase ${delConfig?.phase || '?'} | Template: ${d.template_id}\n\n${sanitizeContext(d.content)}`
          })
          .join('\n\n---\n\n')

        const qualityWarning = `⚠️ PRIOR DELIVERABLE QUALITY NOTICE: The content below was AI-generated and may contain generic language or overused metaphors. Use it for STRUCTURAL REFERENCE ONLY (what sections exist, what topics were covered, what identity names were chosen). Do NOT copy phrases, metaphors, or identity descriptions verbatim from prior deliverables. Generate fresh, niche-specific language based on the CLIENT INPUT DATA above. The only elements to carry forward EXACTLY are: identity names (Undesired Identity and Aspiring Identity) and specific belief shift names.\n\n`

        context = `IMPORTANT: Below are the deliverables this template directly depends on. Use their content, terminology, and naming as your primary reference for consistency.\n\nIf any prior deliverable defines identity names (Undesired Identity, Aspiring Identity), use those EXACT names. Do not create new ones.\n${identityBlock}${qualityWarning}${deliverableContent}`
      }

      // Generate with auto-retry (3-tier retry engine)
      const result = await generateWithRetry(templateId, answers, context)

      // Quality verification (Haiku QA agent)
      const postProcessingRules = extractPostProcessing(templateId)
      let qualityResult = await checkQuality(templateId, result.content, answers, postProcessingRules)

      // Deterministic fact scanner: catches numeric/duration/money/proper-noun hallucinations
      // that the LLM QA reviewer has blind spots for (math on client data, paraphrased durations).
      // Shadow mode by default — logs findings but does NOT force a retry unless FACT_SCANNER_ENFORCE=true.
      let scannerResult = scanForHallucinations(result.content, result.allowlist)
      const criticalScannerHits = scannerResult.hallucinations.filter(h => h.severity === 'critical')
      if (FACT_SCANNER_ENFORCE && criticalScannerHits.length > 0 && qualityResult.pass) {
        console.log(`[fact-scanner] ${criticalScannerHits.length} critical hallucinations caught — forcing correction retry`)
        qualityResult = {
          ...qualityResult,
          pass: false,
          issues: [
            ...qualityResult.issues,
            ...criticalScannerHits.map(h => `SCANNER HALLUCINATION (${h.type}): "${h.value}" not in client input — context: "${h.evidence}"`),
          ],
          suggestions: [
            ...qualityResult.suggestions,
            `Remove these fabricated ${criticalScannerHits[0].type} values: ${criticalScannerHits.map(h => h.value).join(', ')}. Either skip the sentence/section entirely, or rewrite it qualitatively (e.g. "significant ROI" instead of a specific dollar amount).`,
          ],
        }
      }

      // If quality fails, retry once with corrections
      // Small templates: always retry. Large templates: only retry on truncation (to avoid timeout).
      const TRUNCATION_SIGNALS = ['truncat', 'cut off', 'cut-off', 'incomplete', 'unfinished', 'mid-sentence', 'mid sentence', 'mid-bullet', 'mid bullet']
      const isTruncated = qualityResult.issues.some(i => {
        const lower = i.toLowerCase()
        return TRUNCATION_SIGNALS.some(sig => lower.includes(sig))
      })
      // Always retry truncation, regardless of template size.
      // Retry other QA failures only for small templates (large-template re-gen is expensive + rarely improves).
      if (!qualityResult.pass && qualityResult.suggestions.length > 0 && (config.maxTokens < 16384 || isTruncated)) {
        console.log(`[generate] QA failed for ${templateId} (score: ${qualityResult.score}, truncated: ${isTruncated}). Retrying with corrections...`)
        try {
          const correctionContext = `\n\nIMPORTANT CORRECTIONS REQUIRED:\n${qualityResult.suggestions.map(s => `- ${s}`).join('\n')}\nPlease regenerate addressing these specific issues.${isTruncated ? ' Ensure ALL sections are fully completed — do not cut off mid-sentence.' : ''}`
          const correctedResult = await generateDeliverable(
            templateId,
            answers,
            context ? context + correctionContext : correctionContext,
            isTruncated ? { maxTokensOverride: config.maxTokens + 2048 } : undefined
          )
          result.content = correctedResult.content
          result.promptTokens += correctedResult.promptTokens
          result.completionTokens += correctedResult.completionTokens
          result.retryCount += 1

          // Re-check quality AND re-scan facts on the corrected content
          qualityResult = await checkQuality(templateId, result.content, answers, postProcessingRules)
          scannerResult = scanForHallucinations(result.content, result.allowlist)
        } catch (corrErr) {
          console.error(`[generate] Correction retry failed for ${templateId}:`, corrErr instanceof Error ? corrErr.message : corrErr)
        }
      }

      // Auto-redact critical hallucinations in-place with [COACH: Insert ...] placeholders.
      // This is the "strong fix" — deterministic, output-agnostic, works for long multi-item
      // templates where prompt-layer rules decay mid-generation.
      if (FACT_SCANNER_AUTOREDACT) {
        const redaction = redactHallucinations(result.content, scannerResult.hallucinations, { severity: 'critical' })
        if (redaction.redacted > 0) {
          console.log(`[fact-scanner] Auto-redacted ${redaction.redacted} critical hallucination(s) in ${templateId}: ${redaction.redactedValues.slice(0, 5).join(', ')}${redaction.redactedValues.length > 5 ? ', …' : ''}`)
          result.content = redaction.content
        }
      }

      // Measure post-redaction quality: semantic blanks + leaked fallbacks
      const semanticBlanks = (result.content.match(/\[ADD: [^\]]+\]/g) || []).length
      const leakedFallbacks = (result.content.match(/not provided — skip this element/gi) || []).length
      console.log(`[quality] ${templateId}: ${semanticBlanks} blanks, ${leakedFallbacks} leaked fallbacks`)

      const deliverableData = {
        questionnaire_id: questionnaireId,
        user_id: user.id,
        template_id: templateId,
        title: config.title,
        content: result.content,
        status: 'completed' as const,
        error_message: null,
        model_used: result.model,
        tokens_used: result.promptTokens + result.completionTokens,
        quality_score: qualityResult.score,
        quality_issues: qualityResult.issues.length > 0 ? qualityResult.issues.join('; ') : null,
        retry_count: result.retryCount,
        updated_at: new Date().toISOString(),
      }

      let data
      if (existing) {
        const { data: updated, error } = await supabase
          .from('deliverables')
          .update(deliverableData)
          .eq('id', existing.id)
          .select()
          .single()

        if (error) throw error
        data = updated
      } else {
        const { data: inserted, error } = await supabase
          .from('deliverables')
          .insert(deliverableData)
          .select()
          .single()

        if (error) throw error
        data = inserted
      }

      // Persist every caught hallucination (scanner + QA) for the self-learning loop.
      // Fire-and-forget — logging must never block the response.
      void logHallucinations(
        {
          templateId,
          questionnaireId,
          deliverableId: data?.id,
          enforced: FACT_SCANNER_ENFORCE,
        },
        scannerResult,
        qualityResult.issues,
      )

      // Track token usage for billing/usage alerts
      trackTokenUsage(user.id, result.promptTokens + result.completionTokens, templateId)

      // Track very low quality scores
      if (qualityResult && qualityResult.score < 60 && !qualityResult.issues.some((i: string) => i.includes('QA system unavailable'))) {
        trackQualityAlert(templateId, qualityResult.score, String(answers.clientName || 'Unknown'))
      }

      // Report quality failures via email (even if we saved the content)
      if (!qualityResult.pass) {
        await reportError({
          errorType: 'quality-fail',
          templateId,
          templateTitle: config.title,
          coachName: (answers.clientName as string) || 'Unknown',
          questionnaireId,
          deliverableId: data?.id,
          errorMessage: `Quality score: ${qualityResult.score}/100. Issues: ${qualityResult.issues.join('; ')}`,
          retryCount: result.retryCount,
          qualityScore: qualityResult.score,
          timestamp: new Date().toISOString(),
        })
      }

      return NextResponse.json(data, { status: existing ? 200 : 201 })
    } catch (genError) {
      // If generation or DB save fails after all retries, save error status
      const errorMsg = genError instanceof Error ? genError.message : 'Generation failed'

      const errorData = {
        questionnaire_id: questionnaireId,
        user_id: user.id,
        template_id: templateId,
        title: config.title,
        content: null,
        status: 'error' as const,
        error_message: errorMsg,
        model_used: null,
        tokens_used: null,
        quality_score: null,
        quality_issues: null,
        retry_count: 0,
        updated_at: new Date().toISOString(),
      }

      let deliverable
      if (existing) {
        const { data } = await supabase
          .from('deliverables')
          .update(errorData)
          .eq('id', existing.id)
          .select()
          .single()
        deliverable = data
      } else {
        const { data } = await supabase
          .from('deliverables')
          .insert(errorData)
          .select()
          .single()
        deliverable = data
      }

      // Send error notification email
      await reportError({
        errorType: 'generation-failure',
        templateId,
        templateTitle: config.title,
        coachName: (answers.clientName as string) || 'Unknown',
        questionnaireId,
        deliverableId: deliverable?.id,
        errorMessage: errorMsg,
        timestamp: new Date().toISOString(),
      })

      console.error(`[generate] Generation failed for ${templateId}:`, errorMsg)

      // Surface the detailed error from generateDeliverable (token-budget hints, etc.)
      // instead of the generic "try again" message. The user sees this directly.
      const clientMessage = errorMsg.startsWith('Claude returned no text content')
        ? errorMsg
        : `Content generation for "${config.title}" failed. This can happen if your questionnaire answers are very long or if the AI service is temporarily overloaded. Please try again, or contact support if it keeps failing.`

      return NextResponse.json(
        { error: clientMessage, deliverable },
        { status: 500 }
      )
    }
  } catch {
    return NextResponse.json(
      { error: 'Request failed' },
      { status: 500 }
    )
  }
}
