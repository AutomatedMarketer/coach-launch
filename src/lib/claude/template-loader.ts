import { readFileSync } from 'fs'
import { resolve, basename } from 'path'
import { DELIVERABLES } from '@/lib/deliverable-config'

const TEMPLATE_DIR = resolve(process.cwd(), 'src', 'lib', 'claude', 'templates')

const VALID_TEMPLATE_IDS = new Set(DELIVERABLES.map(d => d.templateId))

export function loadTemplate(templateId: string): string {
  // Prevent path traversal — only allow known template IDs
  if (!VALID_TEMPLATE_IDS.has(templateId)) {
    throw new Error(`Unknown template: ${templateId}`)
  }
  const safe = basename(templateId)
  const filePath = resolve(TEMPLATE_DIR, `${safe}.md`)
  return readFileSync(filePath, 'utf-8')
}

// Default values for fields removed from the questionnaire
// but still referenced in some templates
const FIELD_DEFAULTS: Record<string, string> = {
  contentStyle: 'mixed',
  adGoal: 'lead-magnet',
  platformType: 'instagram-dm',
  leadMagnetType: 'pdf-guide',
}

// Fields that render better as bulleted lists in prompts
const BULLETED_FIELDS = new Set([
  'commonObjections', 'testimonials', 'expertise'
])

export function fillTemplate(template: string, answers: Record<string, unknown>): string {
  const mergedAnswers = { ...FIELD_DEFAULTS, ...answers }
  let filled = template

  // Simple string replacements: {{varName}}
  for (const [key, value] of Object.entries(mergedAnswers)) {
    if (typeof value === 'string') {
      filled = filled.replaceAll(`{{${key}}}`, value)
    }
    if (Array.isArray(value)) {
      // Format arrays as bulleted lists or comma-separated depending on field
      if (BULLETED_FIELDS.has(key)) {
        filled = filled.replaceAll(`{{${key}}}`, value.map(item => `- ${item}`).join('\n'))
      } else {
        filled = filled.replaceAll(`{{${key}}}`, value.join(', '))
      }
      // Indexed access: {{array[0]}}, {{array[1]}}, etc.
      value.forEach((item, i) => {
        filled = filled.replaceAll(`{{${key}[${i}]}}`, String(item))
      })
    }
  }

  // Conditionals: {{#if varName}}...content...{{/if}}
  filled = filled.replace(/\{\{#if (\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (_, key, block) => {
    const val = mergedAnswers[key]
    const hasValue = val !== undefined && val !== null && val !== '' &&
      (!Array.isArray(val) || val.length > 0)
    return hasValue ? block : ''
  })

  // Warn about unfilled placeholders (helps debug missing data in Vercel logs)
  const unfilledMatches = filled.match(/\{\{(?!BELIEF_FRAMEWORK_CONTEXT|STEVE_VOICE_PROFILE)[^}]+\}\}/g)
  if (unfilledMatches) {
    console.warn(`[template-loader] Unfilled placeholders: ${unfilledMatches.join(', ')}`)
  }

  // Clean up any remaining unfilled placeholders
  // but preserve {{BELIEF_FRAMEWORK_CONTEXT}} and {{STEVE_VOICE_PROFILE}} — injected later by generate.ts
  filled = filled.replace(/\{\{(?!BELIEF_FRAMEWORK_CONTEXT|STEVE_VOICE_PROFILE)[^}]+\}\}/g, '')

  return filled
}

// Inject belief framework context (outputs from prior deliverables) into a filled template
export function injectContext(filledTemplate: string, context: string): string {
  return filledTemplate.replaceAll('{{BELIEF_FRAMEWORK_CONTEXT}}', context)
}

// Load Steve's voice profile for injection into templates
export function loadVoiceProfile(): string {
  const voicePath = resolve(TEMPLATE_DIR, '..', 'steve-voice-profile.md')
  try {
    return readFileSync(voicePath, 'utf-8')
  } catch {
    console.warn('[template-loader] Steve voice profile not found at', voicePath, '— generating without voice profile')
    return ''
  }
}

// Extract just the generation prompt section from the template
export function extractPrompt(filledTemplate: string): string {
  // The prompt is inside the ```...``` block after "## Generation Prompt"
  const promptMatch = filledTemplate.match(/## Generation Prompt\s*```([\s\S]*?)```/)
  if (promptMatch) {
    return promptMatch[1].trim()
  }
  // Fallback: return everything after "## Generation Prompt"
  const sectionMatch = filledTemplate.match(/## Generation Prompt\s*([\s\S]*)/)
  if (sectionMatch) {
    return sectionMatch[1].trim()
  }
  // Last resort: return the whole thing
  return filledTemplate
}
