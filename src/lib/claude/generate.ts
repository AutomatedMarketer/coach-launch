import { getClaudeClient } from './client'
import { loadTemplate, fillTemplate, injectContext, extractPrompt, loadVoiceProfile } from './template-loader'
import { DELIVERABLES } from '@/lib/deliverable-config'
import type { TemplateId } from '@/lib/deliverable-config'

const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514'

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

export async function generateDeliverable(
  templateId: string,
  answers: Record<string, unknown>,
  context?: string
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
    model: CLAUDE_MODEL,
    max_tokens: deliverable.maxTokens,
    system: voiceProfile
      ? [
          {
            type: 'text' as const,
            text: voiceProfile,
            cache_control: { type: 'ephemeral' as const },
          },
        ]
      : undefined,
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
