import { getClaudeClient } from './client'
import { loadTemplate } from './template-loader'

const QA_MODEL = 'claude-haiku-4-5-20251001'
const PASS_THRESHOLD = 70
const MAX_CONTENT_FOR_QA = 4000

export interface QualityResult {
  score: number
  pass: boolean
  issues: string[]
  suggestions: string[]
}

export function extractPostProcessing(templateId: string): string | null {
  try {
    const raw = loadTemplate(templateId)
    const match = raw.match(/## Post-Processing\s*([\s\S]*)/)
    if (match) return match[1].trim()
    return null
  } catch {
    return null
  }
}

const DEFAULT_CHECKS = `1. No placeholder text like {{fieldName}} or [DATA NOT PROVIDED] leaked into output
2. No fabricated quotes attributed to real people
3. No invented client stories or testimonials (unless clearly marked as templates/placeholders)
4. Content is specific to the coach's niche, not generic coaching language
5. All requested sections/components are present and substantive
6. Content is an appropriate length (not suspiciously short or truncated)`

export async function checkQuality(
  templateId: string,
  content: string,
  answers: Record<string, unknown>,
  postProcessingRules: string | null
): Promise<QualityResult> {
  try {
    const claude = getClaudeClient()

    const truncatedContent = content.length > MAX_CONTENT_FOR_QA
      ? content.slice(0, MAX_CONTENT_FOR_QA) + '\n\n[...content truncated for QA review...]'
      : content

    const checks = postProcessingRules || DEFAULT_CHECKS

    const prompt = `You are a quality assurance reviewer for AI-generated coaching content. Grade the content below.

TEMPLATE: ${templateId}
COACH: ${answers.clientName || 'Unknown'}
BUSINESS: ${answers.businessName || 'Unknown'}
NICHE: ${answers.niche || 'Unknown'}

GENERATED CONTENT (may be truncated):
${truncatedContent}

QUALITY CHECKS TO APPLY:
${checks}

UNIVERSAL CHECKS (always apply):
${DEFAULT_CHECKS}

Respond with ONLY this JSON (no other text):
{"score": <0-100>, "pass": <true if score >= ${PASS_THRESHOLD}>, "issues": ["issue 1", "issue 2"], "suggestions": ["fix for issue 1", "fix for issue 2"]}`

    const response = await claude.messages.create({
      model: QA_MODEL,
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content.find(c => c.type === 'text')
    if (!text || text.type !== 'text') {
      return { score: 75, pass: true, issues: ['QA: no response'], suggestions: [] }
    }

    return parseQualityResponse(text.text)
  } catch (err) {
    console.error('[quality-check] QA check failed:', err instanceof Error ? err.message : err)
    return { score: 75, pass: true, issues: ['QA check error — skipped'], suggestions: [] }
  }
}

function parseQualityResponse(raw: string): QualityResult {
  try {
    // Strip markdown code blocks if present
    const cleaned = raw.replace(/```(?:json)?\s*/g, '').replace(/```\s*/g, '').trim()

    // Try to extract JSON from the response
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON found')

    const parsed = JSON.parse(jsonMatch[0])

    return {
      score: typeof parsed.score === 'number' ? Math.min(100, Math.max(0, parsed.score)) : 75,
      pass: typeof parsed.pass === 'boolean' ? parsed.pass : (parsed.score >= PASS_THRESHOLD),
      issues: Array.isArray(parsed.issues) ? parsed.issues.filter((i: unknown) => typeof i === 'string') : [],
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions.filter((s: unknown) => typeof s === 'string') : [],
    }
  } catch {
    console.warn('[quality-check] Failed to parse QA response, defaulting to pass')
    return { score: 75, pass: true, issues: ['QA parse error'], suggestions: [] }
  }
}
