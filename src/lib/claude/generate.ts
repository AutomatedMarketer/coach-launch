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

6. VOICE PROFILE = STYLE ONLY: The voice profile below describes communication STYLE (tone, phrases, energy). It is NOT a source of biographical facts. Do not pull life events or business history from the voice profile.`

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
