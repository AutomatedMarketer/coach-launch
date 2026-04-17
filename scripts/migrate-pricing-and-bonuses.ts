/**
 * One-time migration: backfill structured `pricing` object from legacy `pricePoint` string.
 *
 * Why: v6a schema replaces free-text `pricePoint` with a structured `pricing` object
 * (totalUSD, billingType, displayString, paymentPlanCount, pifDiscountPercent).
 * In-flight Supabase drafts that only have `pricePoint: string` would otherwise fail
 * schema validation the next time the coach loads the questionnaire.
 *
 * What this does: for every questionnaire row whose `answers.pricePoint` is set
 * and `answers.pricing` is not, best-effort parse the first dollar number out of
 * the price string into `totalUSD`, copy the verbatim string to `displayString`,
 * default to `one-time` billing, and flag `_needsReviewByCoach: true` so the
 * UI can surface a "review your pricing" banner on next login. We NEVER silently
 * fail — anything we can't parse becomes a prompt to the coach.
 *
 * Run from the app/ directory:
 *   npx tsx scripts/migrate-pricing-and-bonuses.ts           # dry run by default
 *   npx tsx scripts/migrate-pricing-and-bonuses.ts --apply   # actually write changes
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in app/.env.local.
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'

config({ path: resolve(process.cwd(), '.env.local'), override: true })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('[migrate] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in app/.env.local')
  process.exit(1)
}

const APPLY = process.argv.includes('--apply')

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
})

interface LegacyAnswers {
  pricePoint?: string
  pricing?: {
    totalUSD?: number
    billingType?: string
    displayString?: string
    paymentPlanCount?: number
    pifDiscountPercent?: number
    _needsReviewByCoach?: boolean
  }
  [key: string]: unknown
}

interface ParsedPricing {
  totalUSD: number
  billingType: 'one-time' | 'subscription' | 'installments'
  displayString: string
  paymentPlanCount?: number
  pifDiscountPercent: number
  _needsReviewByCoach: boolean
}

// Best-effort parse of legacy free-text `pricePoint`.
// Any uncertainty → _needsReviewByCoach = true so the coach confirms before the next generation.
function parsePricePoint(raw: string): ParsedPricing | null {
  const text = raw.trim()
  if (!text) return null

  // First dollar number wins as totalUSD. Accepts "$12,000", "$12K", "$12k", "12000".
  const dollarMatch = text.match(/\$?\s*([0-9][0-9,]*)(\s*[kK])?/)
  if (!dollarMatch) return null

  const numeric = Number(dollarMatch[1].replace(/,/g, ''))
  if (Number.isNaN(numeric) || numeric < 1) return null
  const totalUSD = dollarMatch[2] ? numeric * 1000 : numeric

  // Billing type: subscription signals override one-time.
  const lower = text.toLowerCase()
  let billingType: ParsedPricing['billingType'] = 'one-time'
  let paymentPlanCount: number | undefined
  if (/\/\s*(mo|month)\b|monthly subscription|\/mo\b/.test(lower)) {
    billingType = 'subscription'
  } else {
    const paymentMatch = lower.match(/(\d+)\s*(monthly\s+)?payments?/)
    if (paymentMatch) {
      billingType = 'installments'
      const n = Number(paymentMatch[1])
      if (n >= 1 && n <= 24) paymentPlanCount = n
    }
  }

  // We flag review whenever: (a) the raw text looks more complex than what we parsed,
  // or (b) we guessed installments without a confident payment count.
  const hasSecondNumber = /\$[^$]+\$/.test(text)
  const mentionsPayInFull = /pay\s*-?in\s*-?full|pif\b/.test(lower)
  const needsReview =
    hasSecondNumber ||
    mentionsPayInFull ||
    (billingType === 'installments' && !paymentPlanCount)

  return {
    totalUSD,
    billingType,
    displayString: raw,
    paymentPlanCount,
    pifDiscountPercent: 0,
    _needsReviewByCoach: needsReview,
  }
}

async function main() {
  console.log(`[migrate] ${APPLY ? 'APPLY' : 'DRY RUN'} — fetching questionnaires with legacy pricePoint…`)

  const { data: rows, error } = await supabase
    .from('questionnaires')
    .select('id, user_id, answers')

  if (error) {
    console.error('[migrate] Failed to fetch questionnaires:', error.message)
    process.exit(1)
  }

  let candidates = 0
  let skippedAlreadyMigrated = 0
  let parsed = 0
  let flagged = 0
  let failed = 0
  const failures: Array<{ id: string; pricePoint: string }> = []
  const updates: Array<{ id: string; answers: LegacyAnswers }> = []

  for (const row of rows ?? []) {
    const answers = (row.answers ?? {}) as LegacyAnswers
    const legacy = answers.pricePoint
    const already = answers.pricing

    if (!legacy) continue
    candidates++

    if (already && typeof already.totalUSD === 'number' && already.totalUSD > 0) {
      skippedAlreadyMigrated++
      continue
    }

    const parsedPricing = parsePricePoint(legacy)
    if (!parsedPricing) {
      failed++
      failures.push({ id: row.id, pricePoint: legacy })
      continue
    }

    parsed++
    if (parsedPricing._needsReviewByCoach) flagged++

    updates.push({
      id: row.id,
      answers: {
        ...answers,
        pricing: parsedPricing,
      },
    })
  }

  console.log(`[migrate] Scanned ${rows?.length ?? 0} rows`)
  console.log(`[migrate]   ${candidates} had legacy pricePoint`)
  console.log(`[migrate]   ${skippedAlreadyMigrated} already had pricing (skipped)`)
  console.log(`[migrate]   ${parsed} parsed into pricing object`)
  console.log(`[migrate]   ${flagged} flagged for coach review (_needsReviewByCoach: true)`)
  console.log(`[migrate]   ${failed} could NOT be parsed`)
  if (failures.length) {
    console.log('[migrate] Unparseable rows (manual fix required):')
    for (const f of failures) console.log(`    ${f.id}  ← "${f.pricePoint}"`)
  }

  if (!APPLY) {
    console.log('[migrate] Dry run complete. Re-run with --apply to write changes.')
    return
  }

  console.log(`[migrate] Applying ${updates.length} updates…`)
  for (const u of updates) {
    const { error: updErr } = await supabase
      .from('questionnaires')
      .update({ answers: u.answers })
      .eq('id', u.id)
    if (updErr) {
      console.error(`[migrate] FAILED ${u.id}: ${updErr.message}`)
    }
  }
  console.log('[migrate] Done.')
}

main().catch(err => {
  console.error('[migrate] Unhandled error:', err)
  process.exit(1)
})
