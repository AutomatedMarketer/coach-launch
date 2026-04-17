/**
 * Full E2E test: 3 coaches × 26 templates = 78 generations.
 *
 * Tests the new fact-scanner pipeline end-to-end without hitting the database.
 * Uses the same production code (generateDeliverable, scanForHallucinations)
 * so results mirror what real users would get.
 *
 * Run from the app/ directory:
 *   npx tsx scripts/test-fact-scanner-e2e.ts
 *   npx tsx scripts/test-fact-scanner-e2e.ts --limit=fitness  (test single coach)
 *   npx tsx scripts/test-fact-scanner-e2e.ts --phases=1,2     (test only phases 1-2)
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { writeFileSync, mkdirSync } from 'fs'

// Load env from app/.env.local — override any stale system env vars (important!)
config({ path: resolve(process.cwd(), '.env.local'), override: true })
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY not found in app/.env.local')
  process.exit(1)
}
console.log(`[env] Anthropic key loaded: ${process.env.ANTHROPIC_API_KEY.slice(0, 15)}…${process.env.ANTHROPIC_API_KEY.slice(-8)}`)

import { generateDeliverable } from '../src/lib/claude/generate'
import { scanForHallucinations, redactHallucinations } from '../src/lib/claude/fact-scanner'
import { buildFactAllowlist } from '../src/lib/claude/fact-allowlist'
import { DELIVERABLES, buildWaves, getDeliverablesByPhase } from '../src/lib/deliverable-config'
import { extractIdentityNames } from '../src/lib/claude/identity-extractor'
import { COACH_FIXTURES } from './coach-fixtures'

// ── Parse CLI args ───────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? true]
  })
)
const limitCoach = typeof args.limit === 'string' ? args.limit : null
const limitPhases = typeof args.phases === 'string'
  ? new Set(args.phases.split(',').map(Number))
  : new Set([1, 2, 3, 4, 5])

// ── Result types ─────────────────────────────────────────────────────────
interface DeliverableResult {
  coachId: string
  templateId: string
  title: string
  phase: number
  success: boolean
  errorMessage?: string
  content?: string
  promptTokens?: number
  completionTokens?: number
  latencyMs: number

  // Scanner findings (post-redaction — what the coach actually sees)
  scannerHallucinations: number
  scannerCritical: number
  scannerWarnings: number
  scannerVerified: number
  scannerScanned: number
  scannerHits: Array<{ type: string; value: string; severity: string; evidence: string }>
  redactedCount: number  // How many critical hits were auto-redacted (scanner doing its job)

  // Heuristic quality checks (no Haiku — keep cost down)
  hasPlaceholderLeaks: boolean       // {{foo}} survived
  hasAllSections: boolean            // Has more than 3 headers
  truncated: boolean                 // Ends mid-sentence
  wordCount: number

  // Composite score (0-100)
  rating: number
  ratingReason: string
}

interface CoachSummary {
  coachId: string
  coachLabel: string
  totalAttempted: number
  totalCompleted: number
  totalFailed: number
  totalHallucinations: number
  totalCriticalHallucinations: number
  totalRedacted: number   // How many critical hits were auto-replaced with [COACH:...] placeholders
  totalTokens: number
  avgRating: number
  medianRating: number
  worstDeliverables: DeliverableResult[]
}

// ── Quality rating heuristics ────────────────────────────────────────────
function rateDeliverable(r: Pick<DeliverableResult,
  'success' | 'scannerCritical' | 'scannerWarnings' | 'hasPlaceholderLeaks' | 'hasAllSections' | 'truncated' | 'wordCount' | 'errorMessage'
>): { rating: number; reason: string } {
  if (!r.success) {
    return { rating: 0, reason: `Generation failed: ${r.errorMessage || 'unknown'}` }
  }
  if (r.hasPlaceholderLeaks) {
    return { rating: 15, reason: 'Unfilled {{placeholders}} leaked into output' }
  }

  let rating = 100
  const issues: string[] = []

  if (r.truncated) { rating -= 30; issues.push('truncated mid-sentence') }
  if (!r.hasAllSections) { rating -= 15; issues.push('missing sections') }
  if (r.wordCount < 150) { rating -= 20; issues.push(`very short (${r.wordCount} words)`) }
  if (r.scannerCritical > 0) { rating -= Math.min(40, 15 * r.scannerCritical); issues.push(`${r.scannerCritical} critical hallucinations`) }
  if (r.scannerWarnings > 2) { rating -= Math.min(15, 3 * r.scannerWarnings); issues.push(`${r.scannerWarnings} scanner warnings`) }

  return {
    rating: Math.max(0, rating),
    reason: issues.length > 0 ? issues.join('; ') : 'clean output',
  }
}

function analyzeContent(content: string): {
  hasPlaceholderLeaks: boolean
  hasAllSections: boolean
  truncated: boolean
  wordCount: number
} {
  const hasPlaceholderLeaks = /\{\{[a-zA-Z]/.test(content)
  const headerCount = (content.match(/^#{1,4}\s/gm) || []).length
  const hasAllSections = headerCount >= 3
  const wordCount = content.trim().split(/\s+/).length

  // Truncation heuristic: genuinely cut off mid-phrase, not just "list without terminal punctuation"
  // A completed output has some kind of boundary signal in the last 200 chars.
  const tail = content.trim().slice(-200)
  const hasBoundarySignal = /[.!?"'\)\]\*`]\s*$|\n\s*[-*]|\|\s*$|\n\s*\n/.test(tail)
  const lastWord = content.trim().split(/\s+/).pop() || ''
  const endsMidWord = /^[a-z]{1,3}$/.test(lastWord) && !['yes', 'no', 'win', 'the', 'and', 'end', 'top', 'how', 'why', 'now'].includes(lastWord.toLowerCase())
  const truncated = (!hasBoundarySignal || endsMidWord) && content.length > 200

  return { hasPlaceholderLeaks, hasAllSections, truncated, wordCount }
}

// ── Main test loop ───────────────────────────────────────────────────────

async function runOneTemplate(
  coach: typeof COACH_FIXTURES[number],
  templateId: string,
  prior: Map<string, string>,
): Promise<DeliverableResult> {
  const config = DELIVERABLES.find(d => d.templateId === templateId)!
  const start = Date.now()

  // Build context from direct dependencies (mirrors route.ts logic)
  let context: string | undefined
  if (config.dependsOn.length > 0) {
    const depContent = config.dependsOn
      .map(dep => {
        const content = prior.get(dep)
        if (!content) return null
        const depConfig = DELIVERABLES.find(d => d.templateId === dep)
        return `## [DIRECT DEPENDENCY: ${dep}] ${depConfig?.title}\n\n${content}`
      })
      .filter(Boolean)
      .join('\n\n---\n\n')

    // Identity locking (same as route.ts)
    let identityBlock = ''
    const twoIdContent = prior.get('two-identities')
    if (twoIdContent) {
      const names = extractIdentityNames(twoIdContent)
      if (names.undesired || names.aspiring) {
        identityBlock = `\n⚠️ MANDATORY — IDENTITY NAMES ARE LOCKED ⚠️\n${names.undesired ? `Undesired Identity: "${names.undesired}"` : ''}${names.undesired && names.aspiring ? '\n' : ''}${names.aspiring ? `Aspiring Identity: "${names.aspiring}"` : ''}\nYou MUST use these EXACT names throughout your output.\n⚠️ END ⚠️\n\n`
      }
    }

    if (depContent || identityBlock) {
      context = `Below are the deliverables this template directly depends on.\n${identityBlock}\n${depContent}`
    }
  }

  const baseResult: DeliverableResult = {
    coachId: coach.id,
    templateId,
    title: config.title,
    phase: config.phase,
    success: false,
    latencyMs: 0,
    scannerHallucinations: 0,
    scannerCritical: 0,
    scannerWarnings: 0,
    scannerVerified: 0,
    scannerScanned: 0,
    scannerHits: [],
    redactedCount: 0,
    hasPlaceholderLeaks: false,
    hasAllSections: false,
    truncated: false,
    wordCount: 0,
    rating: 0,
    ratingReason: '',
  }

  try {
    const gen = await generateDeliverable(templateId, coach.answers, context)
    const scan = scanForHallucinations(gen.content, gen.allowlist)
    // Apply auto-redaction (same as production route.ts) so the scored content reflects
    // what the coach would actually see.
    const redaction = redactHallucinations(gen.content, scan.hallucinations, { severity: 'critical' })
    const finalContent = redaction.content
    const analysis = analyzeContent(finalContent)
    // Re-scan the redacted content to get the POST-redaction hallucination counts used for rating
    const postScan = scanForHallucinations(finalContent, gen.allowlist)

    const result: DeliverableResult = {
      ...baseResult,
      success: true,
      content: finalContent,
      promptTokens: gen.promptTokens,
      completionTokens: gen.completionTokens,
      latencyMs: Date.now() - start,
      // Post-redaction counts — these drive the rating (they reflect what the coach sees)
      scannerHallucinations: postScan.hallucinations.length,
      scannerCritical: postScan.hallucinations.filter(h => h.severity === 'critical').length,
      scannerWarnings: postScan.hallucinations.filter(h => h.severity === 'warning').length,
      scannerVerified: postScan.verified,
      scannerScanned: postScan.scanned,
      scannerHits: postScan.hallucinations.slice(0, 10).map(h => ({
        type: h.type,
        value: h.value,
        severity: h.severity,
        evidence: h.evidence.slice(0, 120),
      })),
      redactedCount: redaction.redacted,
      ...analysis,
    }

    const { rating, reason } = rateDeliverable(result)
    result.rating = rating
    result.ratingReason = reason

    prior.set(templateId, finalContent)
    return result
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    const { rating, reason } = rateDeliverable({ ...baseResult, errorMessage })
    return { ...baseResult, errorMessage, latencyMs: Date.now() - start, rating, ratingReason: reason }
  }
}

async function runOneCoach(coach: typeof COACH_FIXTURES[number]): Promise<DeliverableResult[]> {
  console.log(`\n${'='.repeat(80)}\n▶ COACH: ${coach.label} (${coach.niche})\n${'='.repeat(80)}`)

  const results: DeliverableResult[] = []
  const prior = new Map<string, string>()
  const completed = new Set<string>()

  for (const phase of [1, 2, 3, 4, 5] as const) {
    if (!limitPhases.has(phase)) continue
    const phaseDeliverables = getDeliverablesByPhase(phase)
    const waves = buildWaves(phaseDeliverables, completed)

    console.log(`\n── Phase ${phase} (${waves.length} waves, ${phaseDeliverables.length} deliverables) ──`)

    for (let w = 0; w < waves.length; w++) {
      const wave = waves[w]
      // Run wave in parallel (independent deliverables)
      const waveResults = await Promise.all(wave.map(d => runOneTemplate(coach, d.templateId, prior)))

      for (const r of waveResults) {
        results.push(r)
        completed.add(r.templateId)
        const icon = r.success ? (r.rating >= 80 ? '✓' : r.rating >= 50 ? '~' : '✗') : '✗'
        const ratingStr = r.success ? `${r.rating}/100` : 'FAILED'
        const hallStr = r.scannerCritical > 0 ? ` [${r.scannerCritical}C/${r.scannerWarnings}W]` : ''
        const redactStr = r.redactedCount > 0 ? ` [redacted ${r.redactedCount}]` : ''
        console.log(`  ${icon} ${r.templateId.padEnd(30)} ${ratingStr.padEnd(10)} ${(r.latencyMs / 1000).toFixed(1)}s${hallStr}${redactStr} — ${r.ratingReason}`)
      }
    }
  }

  return results
}

function summarizeCoach(coach: typeof COACH_FIXTURES[number], results: DeliverableResult[]): CoachSummary {
  const completed = results.filter(r => r.success)
  const ratings = completed.map(r => r.rating).sort((a, b) => a - b)
  const totalTokens = completed.reduce((sum, r) => sum + (r.promptTokens || 0) + (r.completionTokens || 0), 0)
  const worstDeliverables = [...results].sort((a, b) => a.rating - b.rating).slice(0, 5)

  return {
    coachId: coach.id,
    coachLabel: coach.label,
    totalAttempted: results.length,
    totalCompleted: completed.length,
    totalFailed: results.length - completed.length,
    totalHallucinations: results.reduce((sum, r) => sum + r.scannerHallucinations, 0),
    totalCriticalHallucinations: results.reduce((sum, r) => sum + r.scannerCritical, 0),
    totalRedacted: results.reduce((sum, r) => sum + r.redactedCount, 0),
    totalTokens,
    avgRating: ratings.length ? Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length) : 0,
    medianRating: ratings.length ? ratings[Math.floor(ratings.length / 2)] : 0,
    worstDeliverables,
  }
}

async function main() {
  const coaches = limitCoach
    ? COACH_FIXTURES.filter(c => c.id === limitCoach)
    : COACH_FIXTURES

  if (coaches.length === 0) {
    console.error(`No coach matches --limit=${limitCoach}. Available: ${COACH_FIXTURES.map(c => c.id).join(', ')}`)
    process.exit(1)
  }

  // Verify allowlist building works on each coach first (sanity check)
  console.log('\n── Fact allowlist preview ──')
  for (const coach of coaches) {
    const al = buildFactAllowlist(coach.answers)
    console.log(`${coach.id.padEnd(15)} money=${al.money.size}  durations=${al.durations.size}  numbers=${al.numbers.size}  properNouns=${al.properNouns.size}`)
  }

  const allResults: Record<string, DeliverableResult[]> = {}
  const summaries: CoachSummary[] = []

  for (const coach of coaches) {
    const results = await runOneCoach(coach)
    allResults[coach.id] = results
    summaries.push(summarizeCoach(coach, results))
  }

  // ── Final report ────────────────────────────────────────────────────
  console.log(`\n${'='.repeat(80)}\n  FINAL REPORT\n${'='.repeat(80)}\n`)

  for (const s of summaries) {
    console.log(`\n┌─ ${s.coachLabel}`)
    console.log(`│   Attempted: ${s.totalAttempted} | Completed: ${s.totalCompleted} | Failed: ${s.totalFailed}`)
    console.log(`│   Avg rating: ${s.avgRating}/100 | Median: ${s.medianRating}/100`)
    console.log(`│   Hallucinations (post-redact): ${s.totalHallucinations} (${s.totalCriticalHallucinations} critical)`)
    console.log(`│   Auto-redacted: ${s.totalRedacted} critical hits replaced with [COACH: Insert ...]`)
    console.log(`│   Tokens: ${s.totalTokens.toLocaleString()} (est. cost: $${(s.totalTokens * 0.000006).toFixed(2)})`)
    console.log(`│`)
    console.log(`│   Worst deliverables:`)
    for (const w of s.worstDeliverables) {
      console.log(`│     ${w.rating}/100  ${w.templateId.padEnd(30)}  ${w.ratingReason}`)
    }
    console.log(`└─`)
  }

  // Scanner accuracy snapshot
  const allFlat = summaries.flatMap(s => allResults[s.coachId])
  const totalCritical = allFlat.reduce((sum, r) => sum + r.scannerCritical, 0)
  const totalWarnings = allFlat.reduce((sum, r) => sum + r.scannerWarnings, 0)
  const perTemplateCritical: Record<string, number> = {}
  const perTemplateHitExamples: Record<string, Array<{ coach: string; type: string; value: string; evidence: string }>> = {}
  for (const r of allFlat) {
    if (r.scannerCritical > 0) {
      perTemplateCritical[r.templateId] = (perTemplateCritical[r.templateId] || 0) + r.scannerCritical
    }
    for (const hit of r.scannerHits.filter(h => h.severity === 'critical')) {
      if (!perTemplateHitExamples[r.templateId]) perTemplateHitExamples[r.templateId] = []
      perTemplateHitExamples[r.templateId].push({ coach: r.coachId, type: hit.type, value: hit.value, evidence: hit.evidence })
    }
  }

  console.log(`\n── SCANNER ACCURACY ──`)
  console.log(`Total critical hallucinations caught: ${totalCritical}`)
  console.log(`Total warnings caught: ${totalWarnings}`)
  console.log(`Templates with critical hallucinations:`)
  for (const [tid, count] of Object.entries(perTemplateCritical).sort(([, a], [, b]) => b - a)) {
    console.log(`  ${count}×  ${tid}`)
    for (const ex of (perTemplateHitExamples[tid] || []).slice(0, 3)) {
      console.log(`       [${ex.coach} / ${ex.type}] "${ex.value}"  — "${ex.evidence.slice(0, 80)}..."`)
    }
  }

  // Save full results to disk for review
  const outputDir = resolve(process.cwd(), 'scripts', 'test-output')
  mkdirSync(outputDir, { recursive: true })
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const outputFile = resolve(outputDir, `fact-scanner-e2e-${stamp}.json`)
  writeFileSync(outputFile, JSON.stringify({ summaries, results: allResults }, null, 2))
  console.log(`\nFull results written to: ${outputFile}\n`)
}

main().catch(err => {
  console.error('\nFATAL:', err)
  process.exit(1)
})
