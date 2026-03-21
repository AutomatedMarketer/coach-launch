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
}

// Fields that render better as bulleted lists in prompts
const BULLETED_FIELDS = new Set([
  'commonObjections', 'testimonials', 'expertise',
  'personalHobbies', 'personalTraits', 'idealClientFailedAttempts',
])

// Fields that contain arrays of objects — format as structured blocks
const OBJECT_ARRAY_FIELDS: Record<string, { prefix: string; fields: string[] }> = {
  caseStudies: {
    prefix: 'CLIENT CASE STUDY',
    fields: ['clientName', 'businessType', 'beforeState', 'intervention', 'result', 'timeframe', 'quote'],
  },
  programPhases: {
    prefix: 'PHASE',
    fields: ['phaseName', 'description', 'outcome'],
  },
  objectionRebuttals: {
    prefix: 'OBJECTION/REBUTTAL',
    fields: ['objection', 'rebuttal'],
  },
}

// Fields that are nested objects — format as labeled blocks
const NESTED_OBJECT_FIELDS = new Set(['trackRecord'])

function formatObjectArray(items: Record<string, string>[], config: { prefix: string; fields: string[] }): string {
  return items.map((item, i) => {
    const lines = config.fields
      .filter(f => item[f])
      .map(f => `${f.replace(/([A-Z])/g, ' $1').toUpperCase()}: ${item[f]}`)
    return `${config.prefix} #${i + 1}:\n${lines.join('\n')}`
  }).join('\n\n')
}

function formatNestedObject(obj: Record<string, unknown>): string {
  return Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1').toUpperCase()}: ${v}`)
    .join('\n')
}

export function fillTemplate(template: string, answers: Record<string, unknown>): string {
  const mergedAnswers = { ...FIELD_DEFAULTS, ...answers }

  // === Synthesize personalStory from structured fields ===
  // Old questionnaires with a single personalStory blob still pass through as-is
  const before = mergedAnswers['storyBeforeState'] as string || ''
  const turning = mergedAnswers['storyTurningPoint'] as string || ''
  const after = mergedAnswers['storyAfterState'] as string || ''
  const facts = mergedAnswers['storyFacts'] as string || ''

  if (before || turning || after) {
    mergedAnswers['personalStory'] =
      `BEFORE: ${before}\n\nTURNING POINT: ${turning}\n\nNOW: ${after}\n\nKEY FACTS (use ONLY these — do not invent others):\n${facts}`
  }

  // === Synthesize personalDetails from structured sub-fields ===
  const family = mergedAnswers['personalFamily'] as string || ''
  const hobbies = mergedAnswers['personalHobbies'] as string[] || []
  const traits = mergedAnswers['personalTraits'] as string[] || []
  const location = mergedAnswers['personalLocation'] as string || ''

  if (family || hobbies.length || traits.length || location) {
    const parts: string[] = []
    if (location) parts.push(`LOCATION: ${location}`)
    if (family) parts.push(`FAMILY: ${family}`)
    if (hobbies.length) parts.push(`HOBBIES & INTERESTS: ${hobbies.join(', ')}`)
    if (traits.length) parts.push(`PERSONALITY: ${traits.join(', ')}`)
    // Only override if the old personalDetails field wasn't manually filled
    if (!mergedAnswers['personalDetails']) {
      mergedAnswers['personalDetails'] = parts.join('\n')
    }
  }

  // === Synthesize caseStudies fallback from testimonials ===
  // If caseStudies exist, format them; otherwise fall back to testimonials
  const caseStudies = mergedAnswers['caseStudies'] as Record<string, string>[] | undefined
  if (caseStudies && caseStudies.length > 0) {
    // caseStudies will be formatted by the object array handler below
    // Also make them available as {{testimonials}} for older templates
    mergedAnswers['testimonials'] = caseStudies.map(cs =>
      `${cs.clientName} (${cs.businessType}): Was ${cs.beforeState}. We ${cs.intervention}. Result: ${cs.result} in ${cs.timeframe}.${cs.quote ? ` "${cs.quote}"` : ''}`
    )
  }

  let filled = template

  // === Handle arrays of objects (caseStudies, programPhases, objectionRebuttals) ===
  for (const [key, config] of Object.entries(OBJECT_ARRAY_FIELDS)) {
    const items = mergedAnswers[key] as Record<string, string>[] | undefined
    if (items && Array.isArray(items) && items.length > 0) {
      filled = filled.replaceAll(`{{${key}}}`, formatObjectArray(items, config))
    }
  }

  // === Handle nested objects (trackRecord) ===
  for (const key of NESTED_OBJECT_FIELDS) {
    const obj = mergedAnswers[key] as Record<string, unknown> | undefined
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      filled = filled.replaceAll(`{{${key}}}`, formatNestedObject(obj))
    }
  }

  // === Simple string replacements: {{varName}} ===
  for (const [key, value] of Object.entries(mergedAnswers)) {
    if (typeof value === 'string') {
      filled = filled.replaceAll(`{{${key}}}`, value)
    }
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
      // Format string arrays as bulleted lists or comma-separated depending on field
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

  // === Conditionals: {{#if varName}}...content...{{/if}} ===
  filled = filled.replace(/\{\{#if (\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (_, key, block) => {
    const val = mergedAnswers[key]
    const hasValue = val !== undefined && val !== null && val !== '' &&
      (!Array.isArray(val) || val.length > 0) &&
      (typeof val !== 'object' || Array.isArray(val) || Object.values(val as Record<string, unknown>).some(v => v !== undefined && v !== null && v !== ''))
    return hasValue ? block : ''
  })

  // Warn about unfilled placeholders (helps debug missing data in Vercel logs)
  const unfilledMatches = filled.match(/\{\{(?!BELIEF_FRAMEWORK_CONTEXT|STEVE_VOICE_PROFILE)[^}]+\}\}/g)
  if (unfilledMatches) {
    console.warn(`[template-loader] Unfilled placeholders: ${unfilledMatches.join(', ')}`)
  }

  // Replace unfilled placeholders with explicit instruction so Claude skips rather than invents
  // Preserve {{BELIEF_FRAMEWORK_CONTEXT}} and {{STEVE_VOICE_PROFILE}} — injected later by generate.ts
  filled = filled.replace(/\{\{(?!BELIEF_FRAMEWORK_CONTEXT|STEVE_VOICE_PROFILE)([^}]+)\}\}/g,
    (_match, fieldName) => `[${fieldName}: DATA NOT PROVIDED — DO NOT INVENT]`
  )

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
