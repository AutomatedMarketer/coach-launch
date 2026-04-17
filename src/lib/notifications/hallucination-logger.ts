/**
 * Hallucination Logger
 *
 * Writes every hallucination — whether caught by the deterministic fact-scanner
 * or flagged by the Haiku QA reviewer — to the `hallucination_log` table.
 *
 * This log is the fuel for the self-learning loop (PR 2): a weekly cron
 * aggregates it to produce "DO NOT DO THIS" examples that get injected into
 * future generations of each template.
 */

import { createAdminClient } from '@/lib/supabase/server'
import type { Hallucination, ScanResult } from '@/lib/claude/fact-scanner'

export interface LogContext {
  templateId: string
  questionnaireId: string
  deliverableId?: string | null
  enforced: boolean  // Whether this finding actually blocked the generation (true = enforce mode, false = shadow mode)
}

export type QaHallucinationType = 'money' | 'duration' | 'number' | 'proper_noun' | 'voice_bleed' | 'qa_other'

/**
 * Parse a Haiku QA "issues" string into a structured type + value.
 * Haiku typically emits issues like:
 *   "HALLUCINATION: '$500,000 revenue generated' — not found in client input"
 *   "HALLUCINATION: '15 years in the fitness industry' — client input states..."
 */
export function parseQaIssue(issue: string): { type: QaHallucinationType; value: string } | null {
  if (!issue.toUpperCase().includes('HALLUCINATION')) return null

  // Extract the quoted portion if present
  const quoted = issue.match(/['"]([^'"]+)['"]/)
  const value = quoted ? quoted[1] : issue.slice(0, 200)

  const lower = value.toLowerCase()
  if (/\$[\d,]/.test(value)) return { type: 'money', value }
  if (/\b\d+\s*(year|month|week|day|decade)/i.test(value)) return { type: 'duration', value }
  if (/\b\d+\b/.test(value)) return { type: 'number', value }
  // Known voice-profile bleed markers
  if (/warrior greens|vigor summit|bakhtiar|kevin nations|garrett.*white/i.test(lower)) {
    return { type: 'voice_bleed', value }
  }
  // Proper noun heuristic: value is mostly capitalized words
  if (/^[A-Z][a-z]+(\s+[A-Z][a-z]+)+$/.test(value.trim())) return { type: 'proper_noun', value }
  return { type: 'qa_other', value }
}

/** Insert scanner findings into hallucination_log. Fails silently — logging never blocks generation. */
async function logScannerHits(
  ctx: LogContext,
  hallucinations: Hallucination[]
): Promise<void> {
  if (hallucinations.length === 0) return

  const rows = hallucinations.map(h => ({
    template_id: ctx.templateId,
    questionnaire_id: ctx.questionnaireId,
    deliverable_id: ctx.deliverableId || null,
    hallucination_type: h.type,
    flagged_value: h.value.slice(0, 500),
    evidence: h.evidence.slice(0, 1000),
    detected_by: 'scanner' as const,
    severity: h.severity,
    enforced: ctx.enforced,
  }))

  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('hallucination_log').insert(rows)
    if (error) {
      console.warn('[hallucination-logger] scanner insert failed:', error.message)
    }
  } catch (err) {
    console.warn('[hallucination-logger] scanner insert threw:', err instanceof Error ? err.message : err)
  }
}

/** Insert QA-flagged hallucinations into hallucination_log. */
async function logQaHits(
  ctx: LogContext,
  qaIssues: string[]
): Promise<void> {
  const rows = qaIssues
    .map(issue => {
      const parsed = parseQaIssue(issue)
      if (!parsed) return null
      return {
        template_id: ctx.templateId,
        questionnaire_id: ctx.questionnaireId,
        deliverable_id: ctx.deliverableId || null,
        hallucination_type: parsed.type,
        flagged_value: parsed.value.slice(0, 500),
        evidence: issue.slice(0, 1000),
        detected_by: 'qa' as const,
        severity: 'warning' as const,
        enforced: false,  // QA doesn't enforce; it suggests retries via the existing pipeline
      }
    })
    .filter((r): r is NonNullable<typeof r> => r !== null)

  if (rows.length === 0) return

  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('hallucination_log').insert(rows)
    if (error) {
      console.warn('[hallucination-logger] qa insert failed:', error.message)
    }
  } catch (err) {
    console.warn('[hallucination-logger] qa insert threw:', err instanceof Error ? err.message : err)
  }
}

/**
 * Single entry point: takes scanner results + Haiku QA issues and writes
 * one row per flagged hallucination. Never throws — failures are logged but
 * never block the generation pipeline.
 */
export async function logHallucinations(
  ctx: LogContext,
  scannerResult: ScanResult,
  qaIssues: string[]
): Promise<void> {
  await Promise.all([
    logScannerHits(ctx, scannerResult.hallucinations),
    logQaHits(ctx, qaIssues),
  ])
}
