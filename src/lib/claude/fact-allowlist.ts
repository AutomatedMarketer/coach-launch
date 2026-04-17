/**
 * Fact Allowlist Builder
 *
 * Extracts a deterministic inventory of verifiable facts from questionnaire answers.
 * Used by the fact-scanner to distinguish "claim traceable to client input" from
 * "claim that appeared out of thin air."
 *
 * This is the anti-hallucination system's ground truth: if a number/duration/name
 * in the generated output isn't in this allowlist, it's a hallucination candidate.
 */

import { synthesizePricing } from './template-loader'

export interface FactAllowlist {
  numbers: Set<string>      // Normalized: "5000", "13", "47"
  money: Set<string>        // Normalized: "5000" (from "$5,000", "$5000", "$5K")
  durations: Set<string>    // Exact: "13 years", "6 months"
  properNouns: Set<string>  // Multi-word capitalized sequences: "Steve Krebs", "Global Fitness"
  rawText: string           // Flattened string of all answer values (for substring fallback checks)
}

// Numbers below this threshold are too noisy to track (single digits appear everywhere)
const MIN_NUMBER_TO_TRACK = 10

// Field names to skip entirely when building the allowlist
const SKIP_FIELDS = new Set([
  'brandColors', 'brandFonts', 'brandPhotoUrls', 'logoUrl',
])

const NUMBER_REGEX = /\b(\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?\b/g
// KkMm unit must be followed by a non-letter (end of word) — otherwise "$500 monthly" matches "m" as millions
const MONEY_REGEX = /\$\s?(\d+(?:,\d{3})*(?:\.\d+)?)\s?([KkMm](?![a-zA-Z]))?/g
const DURATION_REGEX = /\b(\d+)\s*(year|years|yr|yrs|month|months|mo|week|weeks|wk|wks|day|days|decade|decades)\b/gi
const PROPER_NOUN_REGEX = /\b[A-Z][a-z]+(?:\s+(?:of|the|and|&)?\s*[A-Z][a-z]+)+\b/g

// Range patterns like "$150K-$500K", "$150,000 to $500,000", "3-5 years"
const MONEY_RANGE_REGEX = /\$\s?(\d+(?:,\d{3})*(?:\.\d+)?)\s?([KkMm](?![a-zA-Z]))?\s*(?:-|–|—|to)\s*\$?\s?(\d+(?:,\d{3})*(?:\.\d+)?)\s?([KkMm](?![a-zA-Z]))?/g
const DURATION_RANGE_REGEX = /\b(\d+)\s*(?:-|–|—|to)\s*(\d+)\s*(year|years|yr|yrs|month|months|week|weeks|day|days)\b/gi

/**
 * Normalize a numeric string for comparison.
 * "$5,000" / "5000" / "5,000" all → "5000"
 * "$5K" → "5000"
 * "$2.5M" → "2500000"
 */
export function normalizeNumber(raw: string): string {
  const cleaned = raw.replace(/[$,\s]/g, '')
  const multiplierMatch = cleaned.match(/^(\d+(?:\.\d+)?)([KkMmBb])$/)
  if (multiplierMatch) {
    const value = parseFloat(multiplierMatch[1])
    const unit = multiplierMatch[2].toLowerCase()
    const multiplier = unit === 'k' ? 1000 : unit === 'm' ? 1000000 : 1000000000
    return String(Math.round(value * multiplier))
  }
  const asFloat = parseFloat(cleaned)
  if (isNaN(asFloat)) return cleaned
  return String(asFloat % 1 === 0 ? Math.round(asFloat) : asFloat)
}

/**
 * Normalize a duration: "13 Years" → "13 years", collapses plurals.
 */
export function normalizeDuration(raw: string): string {
  const match = raw.match(/^(\d+)\s*(year|month|week|day|decade)/i)
  if (!match) return raw.toLowerCase().trim()
  const num = match[1]
  const unitLower = match[2].toLowerCase()
  const unit = num === '1' ? unitLower : `${unitLower}s`
  return `${num} ${unit}`
}

/** Recursively walk the answers object and collect every string value. */
function collectStrings(value: unknown, skip: Set<string>, out: string[]): void {
  if (value === null || value === undefined) return
  if (typeof value === 'string') {
    if (value.trim().length > 0) out.push(value)
    return
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    out.push(String(value))
    return
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, skip, out)
    return
  }
  if (typeof value === 'object') {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (skip.has(k)) continue
      collectStrings(v, skip, out)
    }
  }
}

export function buildFactAllowlist(answers: Record<string, unknown>): FactAllowlist {
  const allowlist: FactAllowlist = {
    numbers: new Set<string>(),
    money: new Set<string>(),
    durations: new Set<string>(),
    properNouns: new Set<string>(),
    rawText: '',
  }

  const strings: string[] = []
  // Skip top-level excluded fields but walk everything else
  for (const [k, v] of Object.entries(answers)) {
    if (SKIP_FIELDS.has(k)) continue
    collectStrings(v, SKIP_FIELDS, strings)
  }

  const allText = strings.join('\n')
  allowlist.rawText = allText.toLowerCase()

  // Money ranges — "$150K-$500K" expands to every $50K anchor between, preventing false positives
  // when the AI picks any value inside the coach's stated range as an example.
  const rangeSpans: Array<[number, number]> = []
  for (const m of allText.matchAll(MONEY_RANGE_REGEX)) {
    if (m.index === undefined) continue
    const low = parseInt(normalizeNumber(m[1] + (m[2] || '')), 10)
    const high = parseInt(normalizeNumber(m[3] + (m[4] || '')), 10)
    if (isNaN(low) || isNaN(high) || low >= high || high - low > 100_000_000) continue
    const step = high - low <= 10_000 ? 1000
      : high - low <= 100_000 ? 10_000
      : high - low <= 1_000_000 ? 50_000
      : 500_000
    for (let v = low; v <= high; v += step) {
      allowlist.money.add(String(v))
      allowlist.numbers.add(String(v))
    }
    rangeSpans.push([m.index, m.index + m[0].length])
  }

  // Duration ranges — "3-5 years" expands to "3 years", "4 years", "5 years"
  for (const m of allText.matchAll(DURATION_RANGE_REGEX)) {
    const low = parseInt(m[1], 10)
    const high = parseInt(m[2], 10)
    const unitRaw = m[3].toLowerCase()
    const unitBase = unitRaw.replace(/s$/, '')
    if (isNaN(low) || isNaN(high) || low >= high || high - low > 100) continue
    for (let v = low; v <= high; v++) {
      const unit = v === 1 ? unitBase : `${unitBase}s`
      allowlist.durations.add(`${v} ${unit}`)
    }
  }

  // Money — extract first so currency values don't also get counted as bare numbers
  const moneyMatches = [...allText.matchAll(MONEY_REGEX)]
  const moneySpans: Array<[number, number]> = []
  for (const m of moneyMatches) {
    const full = m[0]
    const digits = m[1]
    const unit = m[2]
    const normalized = normalizeNumber(digits + (unit || ''))
    allowlist.money.add(normalized)
    // Also register as a plain number so "$5000 → 5000" matches "5000 clients"
    allowlist.numbers.add(normalized)
    if (m.index !== undefined) moneySpans.push([m.index, m.index + full.length])
  }

  // Numbers (skip anything inside a money span)
  for (const m of allText.matchAll(NUMBER_REGEX)) {
    if (m.index === undefined) continue
    const inMoney = moneySpans.some(([s, e]) => m.index! >= s && m.index! < e)
    if (inMoney) continue
    const normalized = normalizeNumber(m[0])
    const asInt = parseInt(normalized, 10)
    if (!isNaN(asInt) && asInt >= MIN_NUMBER_TO_TRACK) {
      allowlist.numbers.add(normalized)
    }
  }

  // Durations
  for (const m of allText.matchAll(DURATION_REGEX)) {
    allowlist.durations.add(normalizeDuration(m[0]))
  }

  // Proper nouns (multi-word only; single words are too ambiguous)
  for (const m of allText.matchAll(PROPER_NOUN_REGEX)) {
    allowlist.properNouns.add(m[0])
  }

  // === v6a: whitelist synthesized pricing numbers ===
  // Without this, the scanner redacts the exact per-payment / PIF-savings / PIF-price
  // numbers we inject into prompts as paymentPlanBreakdown / pifBreakdown.
  const pricingSynth = synthesizePricing(answers)
  for (const n of pricingSynth.computedNumbers) {
    allowlist.money.add(n)
    allowlist.numbers.add(n)
  }

  return allowlist
}
