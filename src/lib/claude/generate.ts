import { getClaudeClient } from './client'
import { loadTemplate, fillTemplate, injectContext, extractPrompt, loadVoiceProfile } from './template-loader'
import { buildFactAllowlist, type FactAllowlist } from './fact-allowlist'
import { DELIVERABLES } from '@/lib/deliverable-config'
import type { TemplateId } from '@/lib/deliverable-config'

const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-4-6'

const GLOBAL_SYSTEM_PREAMBLE = `CRITICAL RULES — FOLLOW THESE EXACTLY:

1. FACTUAL ACCURACY: Only use facts explicitly provided in the questionnaire data below. Do NOT invent, embellish, or extrapolate biographical details, business history, achievements, or client results. If a detail is not provided, leave it out.

2. STORY CONSTRAINTS: The coach's personal story is provided in structured fields (Before State, Turning Point, After State, Key Facts). Use ONLY these details. Do not fill gaps with assumptions. If details are sparse, keep it brief rather than inventing.

3. NO FABRICATED QUOTES: Never attribute a quote to a real person unless you can verify it. Paraphrase published work or cite concepts by name instead.

4. NO FABRICATED TESTIMONIALS: If no testimonials are provided, either omit the testimonial block entirely, or structure the paragraph around the coach's existing proof (years coaching, number of clients helped, recognizable credentials from the questionnaire) without inventing a fake quote.

5. FACT ALLOWLIST: The "Key Facts / Milestones" field is the COMPLETE list of true facts about this coach. If something is not listed, do not state it as fact. You may rephrase provided facts but must not change their substance (e.g., "built" must not become "sold").

6. VOICE PROFILE = STYLE ONLY: The voice profile below describes communication STYLE (tone, phrases, energy). It is NOT a source of biographical facts. Do not pull life events, business history, company names, mentor names, or dollar amounts from the voice profile into client content.

7. MISSING DATA PROTOCOL — follow this EXACT hierarchy in order. Stop at the first option that works:
   (a) SKIP the entire section, sub-section, or bullet point if the data isn't in the questionnaire. Shorter output is better than padded output.
   (b) WRITE IT QUALITATIVELY. Instead of demanding a specific number, describe the concept in language a human would actually use: "significant ROI," "meaningful savings over the course of the program," "a fraction of what alternatives cost," "within a few short weeks," "well under what therapy or coaching alternatives charge." Good coaching copy rarely needs exact numbers — a specific-sounding claim that's actually guessed is WORSE than a true qualitative statement.
   (c) REPHRASE around what IS provided. If the questionnaire has "clients typically see their first win within 14 days," use that verbatim instead of inventing a different timeframe.
   (d) LAST RESORT ONLY — if the section structurally requires a number and (a)–(c) all fail, write a clearly-marked inline blank like "— $___ per month —" or "— [the coach's real figure] —". Do NOT use "[COACH: Insert ...]" phrasing; that makes the output feel broken. Prefer (a) skipping over (d) markers in almost every case.

8. STATISTICS & NUMBERS: NEVER invent specific numbers, percentages, dollar amounts, timeframes, lead counts, or revenue figures. If a statistic would land in your output, verify it against the COMPLETE CLIENT INPUT DATA block first. If not present, use rule 7's qualitative approach — describe the effect in words instead of guessing a number. Do not write things like "60+ hours/week" or "15-20 qualified leads" unless those exact figures appear in the client's answers.

9. IDENTITY CONSISTENCY: If prior deliverables include named identity personas (e.g., an Undesired Identity name and an Aspiring Identity name from the Two Identities or Belief Shift Map), you MUST use those EXACT names throughout. Do not create new identity names or variations. Prior deliverables are the single source of truth for identity names.

10. PRIOR DELIVERABLE CAUTION: Prior deliverable content injected as context was AI-generated. Only details that ALSO appear in the questionnaire CLIENT INPUT DATA should be treated as verified facts. If a prior deliverable contains a specific statistic, dollar amount, or claim that does NOT appear in the questionnaire answers, do not propagate it as verified truth — rephrase qualitatively instead.

11. COMPLETE CLIENT DATA: A "COMPLETE CLIENT INPUT DATA" section is included in every prompt. This contains ALL answers the client provided across the entire questionnaire. Use this as your primary factual source, even for fields not explicitly called out in the template instructions. The more of the client's actual words, stories, and details you weave in naturally, the better the output will feel to them.

12. NICHE-SPECIFIC LANGUAGE: Identity names, headlines, and key messaging must use language specific to the client's niche — insider jargon, specific metrics, recognizable moments, or physical details from their daily life. For abstract niches (life balance, mindset, purpose, wellness), anchor language to SPECIFIC MOMENTS, BEHAVIORS, or PHYSICAL DETAILS — not abstract emotions or generic business terms. Every identity name should make someone ask "what niche is this for?" Generic metaphors that could apply to any industry are unacceptable.
`

/** Strip known hallucinated names from Claude output as a final safety net */
const HALLUCINATED_NAMES = [
  'Sam Bakhtiar', 'Bakhtiar', 'Kevin Nations', 'Garrett J. White',
  'Garrett White', 'Warrior Greens', 'Vigor Summit'
]

function sanitizeOutput(content: string): string {
  let sanitized = content
  for (const name of HALLUCINATED_NAMES) {
    sanitized = sanitized.replaceAll(name, '[coach reference]')
  }
  return sanitized
}

export { DELIVERABLES }
export type { TemplateId }

// Creative templates benefit from higher temperature for diversity across users.
// Structured templates (pricing, offer sheets) need lower temperature for consistency.
const CREATIVE_TEMPLATES = new Set([
  'two-identities', 'belief-shift-map', 'emotional-trigger-map',
  'content-angle-library', 'facebook-posts', 'youtube-script',
  'shorts-reels-scripts', 'carousel-posts', 'facebook-ad-copy',
  'magnetic-messaging-statement',
])

// Fields to exclude from the client data dump (brand assets for future image gen, not useful for text)
const DATA_DUMP_EXCLUDE = new Set(['brandColors', 'brandFonts', 'brandPhotoUrls', 'logoUrl'])

/**
 * Convert camelCase field names to readable labels.
 * e.g. "storyBeforeState" → "Story Before State"
 */
function humanize(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .trim()
}

/**
 * Format ALL non-empty questionnaire answers as a readable text block.
 * This gets prepended to every generation prompt so Claude always sees
 * the complete picture — not just the fields the template remembered to include.
 */
function formatAllAnswers(answers: Record<string, unknown>): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(answers)) {
    if (DATA_DUMP_EXCLUDE.has(key)) continue
    if (value === undefined || value === null || value === '') continue

    if (Array.isArray(value)) {
      if (value.length === 0) continue
      if (typeof value[0] === 'string') {
        lines.push(`${humanize(key)}: ${value.join(', ')}`)
      } else {
        // Object arrays (caseStudies, programPhases, objectionRebuttals)
        lines.push(`${humanize(key)}:`)
        value.forEach((item: Record<string, unknown>, i: number) => {
          const fields = Object.entries(item)
            .filter(([, v]) => v)
            .map(([k, v]) => `  ${humanize(k)}: ${v}`)
          lines.push(`  #${i + 1}:\n${fields.join('\n')}`)
        })
      }
    } else if (typeof value === 'object') {
      // Nested objects (trackRecord)
      const fields = Object.entries(value as Record<string, unknown>)
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => `  ${humanize(k)}: ${v}`)
      if (fields.length) lines.push(`${humanize(key)}:\n${fields.join('\n')}`)
    } else {
      lines.push(`${humanize(key)}: ${value}`)
    }
  }

  return lines.join('\n')
}

export interface GenerationResult {
  templateId: string
  title: string
  content: string
  promptTokens: number
  completionTokens: number
  model: string
  allowlist: FactAllowlist
}

/**
 * Format the fact allowlist into a "VERIFIED FACTS" block that gets injected into
 * the prompt. Claude is told these are the ONLY allowed numbers/durations/names —
 * anything else will be rejected by post-generation verification.
 */
function formatVerifiedFacts(allowlist: FactAllowlist): string {
  const parts: string[] = []
  if (allowlist.money.size > 0) {
    parts.push(`Money amounts: ${[...allowlist.money].map(v => `$${v}`).join(', ')}`)
  }
  if (allowlist.durations.size > 0) {
    parts.push(`Durations: ${[...allowlist.durations].join(', ')}`)
  }
  if (allowlist.numbers.size > 0) {
    const numList = [...allowlist.numbers].slice(0, 40).join(', ')
    parts.push(`Numbers: ${numList}${allowlist.numbers.size > 40 ? ', …' : ''}`)
  }
  if (allowlist.properNouns.size > 0) {
    const nounList = [...allowlist.properNouns].slice(0, 30).join(', ')
    parts.push(`Proper nouns: ${nounList}${allowlist.properNouns.size > 30 ? ', …' : ''}`)
  }

  const body = parts.length > 0
    ? parts.map(p => `- ${p}`).join('\n')
    : '- (none extracted from client input)'

  return `--- VERIFIED FACTS (the ONLY allowed numbers, durations, money amounts, and proper nouns) ---
${body}
--- END VERIFIED FACTS ---

⚠️ AUTOMATED POST-GENERATION CHECK: Every number, money amount, duration, and multi-word proper noun in your output will be compared against the VERIFIED FACTS above by a deterministic scanner.
- Do NOT include a number not in the list (math, aggregation, and estimation all count as invention).
- Do NOT paraphrase a duration ("13 years" must stay "13 years" — not "over a decade," not "15 years," not "more than ten years").
- Do NOT rename or rephrase proper nouns ("personal training" must stay "personal training" — not "fitness industry").
- Missing data: follow the MISSING DATA PROTOCOL in rule 7 above — skip the section, or describe the concept qualitatively (e.g., "significant ROI," "within a few weeks"). Avoid writing "[COACH: Insert your real number here]" unless the section structurally requires a number and no alternative works.`
}

export interface GenerateOptions {
  modelOverride?: string
  maxTokensOverride?: number
}

export async function generateDeliverable(
  templateId: string,
  answers: Record<string, unknown>,
  context?: string,
  options?: GenerateOptions
): Promise<GenerationResult> {
  const claude = getClaudeClient()

  // Load and fill the template with questionnaire answers
  const rawTemplate = loadTemplate(templateId)
  let filledTemplate = fillTemplate(rawTemplate, answers)

  // Inject belief framework context from prior deliverables (if provided)
  if (context) {
    filledTemplate = injectContext(filledTemplate, context)
  } else {
    filledTemplate = filledTemplate.replaceAll('{{BELIEF_FRAMEWORK_CONTEXT}}', '')
  }

  // Voice profile goes in system message (not user message) for prompt caching
  filledTemplate = filledTemplate.replaceAll('{{STEVE_VOICE_PROFILE}}', '')

  const templatePrompt = extractPrompt(filledTemplate)

  // Prepend a complete dump of ALL client answers so Claude always sees everything,
  // even fields the template didn't explicitly reference with {{placeholders}}
  const clientDataDump = formatAllAnswers(answers)

  // Build the deterministic fact allowlist and inject as VERIFIED FACTS block.
  // Post-generation, a fact-scanner verifies every number/duration/money/proper-noun
  // in the output against this list. Anything not here will be flagged as a hallucination.
  const allowlist = buildFactAllowlist(answers)
  const verifiedFactsBlock = formatVerifiedFacts(allowlist)

  const prompt = `--- COMPLETE CLIENT INPUT DATA ---
(Every answer the client provided. Use this as your primary source of truth for all facts, stories, and details.)

${clientDataDump}

--- END CLIENT INPUT DATA ---

${verifiedFactsBlock}

${templatePrompt}`

  const deliverable = DELIVERABLES.find(d => d.templateId === templateId)
  if (!deliverable) throw new Error(`Unknown template: ${templateId}`)

  // Load voice profile once and send as cached system message
  const voiceProfile = loadVoiceProfile()

  const temperature = CREATIVE_TEMPLATES.has(templateId) ? 0.6 : 0.4

  const response = await claude.messages.create({
    model: options?.modelOverride || CLAUDE_MODEL,
    max_tokens: options?.maxTokensOverride || deliverable.maxTokens,
    temperature,
    system: [
      { type: 'text' as const, text: GLOBAL_SYSTEM_PREAMBLE },
      ...(voiceProfile
        ? [
            {
              type: 'text' as const,
              text: voiceProfile,
              cache_control: { type: 'ephemeral' as const },
            },
          ]
        : []),
    ],
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const textContent = response.content.find(c => c.type === 'text')
  const stopReason = response.stop_reason

  // If Claude hit max_tokens with no text (dense input + long template), auto-retry once
  // with a larger budget. This prevents the user-visible "Content generation failed" error.
  if (!textContent || textContent.type !== 'text') {
    const isRetryable = (stopReason === 'max_tokens' || stopReason === null) && !options?.maxTokensOverride
    if (isRetryable) {
      const retryMax = Math.min(deliverable.maxTokens * 2, 32768)
      console.warn(`[generate] ${templateId}: no text content (stop_reason=${stopReason}). Retrying with max_tokens=${retryMax}.`)
      return generateDeliverable(templateId, answers, context, {
        ...options,
        maxTokensOverride: retryMax,
      })
    }
    throw new Error(
      `Claude returned no text content for "${deliverable.title}" (stop_reason: ${stopReason || 'unknown'}). ` +
      `This usually means the prompt + expected output exceeded the ${deliverable.maxTokens}-token budget. ` +
      `Try simplifying your questionnaire answers (especially long testimonials or objection lists) or contact support.`
    )
  }

  // Partial output from max_tokens: return what we got and log a warning. The QA
  // retry in route.ts will detect mid-sentence truncation and regenerate with a bigger budget.
  if (stopReason === 'max_tokens' && textContent.text.length < 200) {
    console.warn(`[generate] ${templateId}: only ${textContent.text.length} chars returned before max_tokens. Content may be unusable.`)
  }

  return {
    templateId,
    title: deliverable.title,
    content: sanitizeOutput(textContent.text),
    promptTokens: response.usage.input_tokens,
    completionTokens: response.usage.output_tokens,
    model: response.model,
    allowlist,
  }
}
