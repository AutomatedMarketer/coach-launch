import { getClaudeClient } from './client'
import { loadTemplate } from './template-loader'

const QA_MODEL = 'claude-haiku-4-5-20251001'
const PASS_THRESHOLD = 70
const CHUNK_SIZE = 12000 // chars per QA chunk — keeps each Haiku call fast
const MAX_CHUNKS = 4 // max chunks to review (48K chars total coverage)

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
6. Content is an appropriate length (not suspiciously short or truncated)
7. No invented statistics, dollar amounts, percentages, or timeframes — every number in the output should trace back to a CLIENT INPUT DATA field
8. No voice profile biographical details leaking into client content (e.g., no references to the platform coach's personal businesses, mentor names, supplement companies, or company names that are not in the client input)
9. Identity names (Undesired Identity, Aspiring Identity) are consistent — no new names invented if prior deliverable context defined them
10. Personal story sections use ONLY details from the personalStory / storyBeforeState / storyTurningPoint / storyAfterState / storyFacts fields — no embellishment or invented anecdotes
11. BANNED CLICHE CHECK: Flag if any identity names, headlines, or key messaging use these overused words: "prisoner," "captive," "trapped," "slave," "beggar," "grind/grinding," "hamster wheel," "treadmill," "rat race," "cage," "chains." These are banned because they repeat across every user. Score penalty: -10 per instance in a prominent position (identity name, section header, key tagline).
12. NICHE SPECIFICITY CHECK: Identity names (Undesired Identity, Aspiring Identity) must be specific enough that a reader could guess the coach's industry from the name alone. If an identity name could apply equally to a fitness coach, a business coach, and a relationship coach, it fails this check. Score penalty: -15 per generic identity name.
13. IDENTITY CONSISTENCY CHECK: If prior deliverable context includes identity names from the Two Identities deliverable, verify the generated content uses those EXACT names — not variations, synonyms, or new names. Any deviation is a critical failure. Score penalty: -20 per inconsistent identity name.`

export async function checkQuality(
  templateId: string,
  content: string,
  answers: Record<string, unknown>,
  postProcessingRules: string | null
): Promise<QualityResult> {
  try {
    const claude = getClaudeClient()
    const checks = postProcessingRules || DEFAULT_CHECKS

    // Build a readable summary of client input for QA verification
    const inputSummary = Object.entries(answers)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}: ${value.slice(0, 200)}`
        if (Array.isArray(value)) return `${key}: ${JSON.stringify(value).slice(0, 200)}`
        if (typeof value === 'object') return `${key}: ${JSON.stringify(value).slice(0, 200)}`
        return null
      })
      .filter(Boolean)
      .join('\n')

    // Split content into overlapping chunks so nothing is skipped
    const chunks = chunkContent(content, CHUNK_SIZE, MAX_CHUNKS)

    // Run QA on each chunk in parallel
    const chunkResults = await Promise.all(
      chunks.map(async (chunk, i) => {
        const chunkLabel = chunks.length > 1
          ? ` (section ${i + 1} of ${chunks.length})`
          : ''

        const prompt = `You are a quality assurance reviewer for AI-generated coaching content. Grade the content below.

TEMPLATE: ${templateId}${chunkLabel}
COACH: ${answers.clientName || 'Unknown'}
BUSINESS: ${answers.businessName || 'Unknown'}

CLIENT INPUT DATA (verify generated content against these fields — if a detail in the output matches a field here, it is VERIFIED and should NOT be flagged):
${inputSummary}

GENERATED CONTENT${chunkLabel}:
${chunk}

QUALITY CHECKS TO APPLY:
${checks}

IMPORTANT: Only flag details as "unverified" if they appear in the generated content but do NOT appear anywhere in the CLIENT INPUT DATA above. If a fact matches client input, it is verified.

HALLUCINATION-SPECIFIC CHECKS (critical):
- Compare ALL statistics, dollar amounts, percentages, and timeframes in the generated content against the CLIENT INPUT DATA. Flag any number that does not have a matching source.
- Check for voice profile bleed: flag any references to specific company names (e.g., "Warrior Greens," "Vigor Summit"), mentor names (e.g., "Sam Bakhtiar," "Garrett J. White," "Kevin Nations"), or dollar amounts (e.g., "$3,500/month") that appear to come from the voice profile rather than client input.
- Check that identity names are consistent across the content and match prior deliverables if those were provided as context.
- Verify personal story sections only use details from the structured story fields — flag any biographical details that appear invented.

REPETITION & QUALITY CHECKS (critical for user experience):
- Check identity names against banned cliche list: "prisoner," "captive," "trapped," "slave," "beggar," "grind," "hamster wheel," "treadmill," "rat race," "cage," "chains." If ANY of these appear in an identity name or section header, deduct 10 points per instance.
- Verify identity names are niche-specific: could you guess the coach's industry from the name? If not, deduct 15 points.
- If prior deliverable identity names were provided, verify they are used EXACTLY in the output. Any new or modified identity name is a -20 point penalty.

Respond with ONLY this JSON (no other text):
{"score": <0-100>, "pass": <true if score >= ${PASS_THRESHOLD}>, "issues": ["issue 1", "issue 2"], "suggestions": ["fix for issue 1", "fix for issue 2"]}`

        try {
          const response = await claude.messages.create({
            model: QA_MODEL,
            max_tokens: 2048,
            messages: [{ role: 'user', content: prompt }],
          })

          const text = response.content.find(c => c.type === 'text')
          if (!text || text.type !== 'text') return null
          return parseQualityResponse(text.text)
        } catch {
          return null
        }
      })
    )

    // Aggregate: take the lowest score, merge all issues and suggestions, fail if any chunk fails
    return aggregateQualityResults(chunkResults)
  } catch (err) {
    console.warn(`[quality-check] QA unavailable for ${templateId} — content saved without verification:`, err instanceof Error ? err.message : err)
    return { score: 70, pass: true, issues: ['QA system unavailable — content saved without quality verification'], suggestions: [] }
  }
}

/** Split content into chunks, breaking at section boundaries when possible */
function chunkContent(content: string, chunkSize: number, maxChunks: number): string[] {
  if (content.length <= chunkSize) return [content]

  const chunks: string[] = []
  let offset = 0

  while (offset < content.length && chunks.length < maxChunks) {
    let end = Math.min(offset + chunkSize, content.length)

    // If not at the end, try to break at a section header (## or ---) within the last 500 chars
    if (end < content.length) {
      const lookback = content.slice(Math.max(offset, end - 500), end)
      const sectionBreak = lookback.lastIndexOf('\n## ')
      const hrBreak = lookback.lastIndexOf('\n---')
      const breakPoint = Math.max(sectionBreak, hrBreak)
      if (breakPoint > 0) {
        end = (end - 500 + Math.max(0, Math.min(500, end - offset))) + breakPoint - (500 - breakPoint)
        // Recalculate: find the actual position in the original string
        end = Math.max(offset, end - 500) + breakPoint
      }
    }

    chunks.push(content.slice(offset, end))
    offset = end
  }

  // If there's leftover content beyond maxChunks, append it to the last chunk
  if (offset < content.length && chunks.length > 0) {
    chunks[chunks.length - 1] += content.slice(offset)
  }

  return chunks
}

/** Aggregate results from multiple QA chunks: lowest score wins, all issues merged */
function aggregateQualityResults(results: (QualityResult | null)[]): QualityResult {
  const valid = results.filter((r): r is QualityResult => r !== null)

  if (valid.length === 0) {
    return { score: 70, pass: true, issues: ['QA system unavailable — content saved without quality verification'], suggestions: [] }
  }

  if (valid.length === 1) return valid[0]

  const lowestScore = Math.min(...valid.map(r => r.score))
  const allIssues = [...new Set(valid.flatMap(r => r.issues))]
  const allSuggestions = [...new Set(valid.flatMap(r => r.suggestions))]

  return {
    score: lowestScore,
    pass: lowestScore >= PASS_THRESHOLD,
    issues: allIssues,
    suggestions: allSuggestions,
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
    console.warn('[quality-check] Failed to parse QA response — content saved without verification')
    return { score: 70, pass: true, issues: ['QA system unavailable — content saved without quality verification'], suggestions: [] }
  }
}
