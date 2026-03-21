import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { generateDeliverable } from '@/lib/claude/generate'
import { generateWithRetry } from '@/lib/claude/retry-engine'
import { checkQuality, extractPostProcessing } from '@/lib/claude/quality-check'
import { reportError } from '@/lib/notifications/error-reporter'
import { DELIVERABLES } from '@/lib/deliverable-config'

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
      // Build context from prior deliverables (if this template depends on them)
      let context: string | undefined
      if (config.dependsOn.length > 0) {
        const { data: priorDeliverables } = await supabase
          .from('deliverables')
          .select('template_id, title, content')
          .eq('questionnaire_id', questionnaireId)
          .eq('status', 'completed')
          .in('template_id', config.dependsOn)

        if (priorDeliverables && priorDeliverables.length > 0) {
          context = priorDeliverables
            .map(d => {
              const delConfig = DELIVERABLES.find(del => del.templateId === d.template_id)
              return `## [PRIOR DELIVERABLE: ${d.template_id}] ${d.title}\nPhase ${delConfig?.phase || '?'} | Template: ${d.template_id}\n\n${d.content}`
            })
            .join('\n\n---\n\n')
        }
      }

      // Generate with auto-retry (3-tier retry engine)
      const result = await generateWithRetry(templateId, answers, context)

      // Quality verification (Haiku QA agent)
      const postProcessingRules = extractPostProcessing(templateId)
      let qualityResult = await checkQuality(templateId, result.content, answers, postProcessingRules)

      // If quality fails, retry once with corrections
      if (!qualityResult.pass && qualityResult.suggestions.length > 0) {
        console.log(`[generate] QA failed for ${templateId} (score: ${qualityResult.score}). Retrying with corrections...`)
        try {
          const correctionContext = `\n\nIMPORTANT CORRECTIONS REQUIRED:\n${qualityResult.suggestions.map(s => `- ${s}`).join('\n')}\nPlease regenerate addressing these specific issues.`
          const correctedResult = await generateDeliverable(
            templateId,
            answers,
            context ? context + correctionContext : correctionContext
          )
          result.content = correctedResult.content
          result.promptTokens += correctedResult.promptTokens
          result.completionTokens += correctedResult.completionTokens
          result.retryCount += 1

          // Re-check quality
          qualityResult = await checkQuality(templateId, result.content, answers, postProcessingRules)
        } catch (corrErr) {
          console.error(`[generate] Correction retry failed for ${templateId}:`, corrErr instanceof Error ? corrErr.message : corrErr)
        }
      }

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

      return NextResponse.json(
        { error: errorMsg, deliverable },
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
