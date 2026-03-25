import { getClaudeClient } from './client'
import { loadTemplate, fillTemplate, injectContext, extractPrompt, loadVoiceProfile } from './template-loader'
import { DELIVERABLES } from '@/lib/deliverable-config'
import type { TemplateId } from '@/lib/deliverable-config'

const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514'

const GLOBAL_SYSTEM_PREAMBLE = `CRITICAL RULES — FOLLOW THESE EXACTLY:

1. FACTUAL ACCURACY: Only use facts explicitly provided in the questionnaire data below. Do NOT invent, embellish, or extrapolate biographical details, business history, achievements, or client results. If a detail is not provided, leave it out.

2. STORY CONSTRAINTS: The coach's personal story is provided in structured fields (Before State, Turning Point, After State, Key Facts). Use ONLY these details. Do not fill gaps with assumptions. If details are sparse, keep it brief rather than inventing.

3. NO FABRICATED QUOTES: Never attribute a quote to a real person unless you can verify it. Paraphrase published work or cite concepts by name instead.

4. NO FABRICATED TESTIMONIALS: If no testimonials are provided, use placeholders: [INSERT CLIENT TESTIMONIAL]. Never create fictional client stories or results.

5. FACT ALLOWLIST: The "Key Facts / Milestones" field is the COMPLETE list of true facts about this coach. If something is not listed, do not state it as fact. You may rephrase provided facts but must not change their substance (e.g., "built" must not become "sold").

6. VOICE PROFILE = STYLE ONLY: The voice profile below describes communication STYLE (tone, phrases, energy). It is NOT a source of biographical facts. Do not pull life events, business history, company names, mentor names, or dollar amounts from the voice profile into client content.

7. MISSING DATA PROTOCOL: When questionnaire data is missing, sparse, or marked [DATA NOT PROVIDED — DO NOT INVENT], follow this hierarchy: (a) Skip the section entirely if it is optional. (b) Use a clearly marked placeholder: [COACH: Insert your ___ here]. (c) Write a shorter version using ONLY what IS available. NEVER fill gaps with plausible-sounding invented content.

8. STATISTICS & NUMBERS: NEVER invent specific numbers, percentages, dollar amounts, timeframes, lead counts, or revenue figures. If a section calls for statistics but none are provided in the questionnaire, write: [COACH: Insert your real numbers here]. Do not write things like "60+ hours/week" or "15-20 qualified leads" unless those exact figures appear in the client's answers.

9. IDENTITY CONSISTENCY: If prior deliverables include named identity personas (e.g., an Undesired Identity name and an Aspiring Identity name from the Two Identities or Belief Shift Map), you MUST use those EXACT names throughout. Do not create new identity names or variations. Prior deliverables are the single source of truth for identity names.

10. PRIOR DELIVERABLE CAUTION: Prior deliverable content injected as context was AI-generated. Only details that ALSO appear in the questionnaire CLIENT INPUT DATA should be treated as verified facts. If a prior deliverable contains a specific statistic, dollar amount, or claim that does NOT appear in the questionnaire answers, do not propagate it as verified truth — use a placeholder instead.`

export { DELIVERABLES }
export type { TemplateId }

export interface GenerationResult {
  templateId: string
  title: string
  content: string
  promptTokens: number
  completionTokens: number
  model: string
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

  const prompt = extractPrompt(filledTemplate)

  const deliverable = DELIVERABLES.find(d => d.templateId === templateId)
  if (!deliverable) throw new Error(`Unknown template: ${templateId}`)

  // Load voice profile once and send as cached system message
  const voiceProfile = loadVoiceProfile()

  const response = await claude.messages.create({
    model: options?.modelOverride || CLAUDE_MODEL,
    max_tokens: options?.maxTokensOverride || deliverable.maxTokens,
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
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in Claude response')
  }

  return {
    templateId,
    title: deliverable.title,
    content: textContent.text,
    promptTokens: response.usage.input_tokens,
    completionTokens: response.usage.output_tokens,
    model: response.model,
  }
}
