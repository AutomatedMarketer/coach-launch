'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useGeneration } from '@/hooks/use-generation'
import {
  PHASES,
  PHASE_TITLES,
  PHASE_DESCRIPTIONS,
  getDeliverablesByPhase,
  type PhaseNumber,
} from '@/lib/deliverable-config'
import {
  Circle,
  Loader2,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Lock,
  PenLine,
} from 'lucide-react'

type PhaseStatus = 'locked' | 'ready' | 'generating' | 'complete'

// Helper to determine row status within a generating phase
type RowStatus = 'pending' | 'generating' | 'completed' | 'error'

function getRowStatus(
  templateId: string,
  activeTemplates: string[],
  completedTemplates: string[],
  failedTemplates: string[],
  overallStatus: string
): RowStatus {
  if (completedTemplates.includes(templateId)) return 'completed'
  if (failedTemplates.includes(templateId)) return 'error'
  if (activeTemplates.includes(templateId) && overallStatus === 'generating') return 'generating'
  return 'pending'
}

function ElapsedTimer({ startedAt }: { startedAt: number | null }) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!startedAt) return
    const tick = () => setElapsed(Math.floor((Date.now() - startedAt) / 1000))
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [startedAt])

  if (!startedAt) return null

  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`

  let label = timeStr
  if (elapsed > 180) label = `${timeStr} — Taking longer than usual`
  else if (elapsed > 60) label = `${timeStr} — Still working...`

  return (
    <span className="text-[11px] text-slate-500 ml-2">{label}</span>
  )
}

function StatusIcon({ status }: { status: RowStatus }) {
  switch (status) {
    case 'pending':
      return <Circle className="h-4 w-4 text-slate-600" />
    case 'generating':
      return <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
    case 'completed':
      return <CheckCircle2 className="h-4 w-4 text-green-400" />
    case 'error':
      return <XCircle className="h-4 w-4 text-red-400" />
  }
}

// Each phase gets its own hook instance, wrapped in a component
function PhaseCard({
  phase,
  questionnaireId,
  phaseStatus,
  onComplete,
  alreadyCompletedIds,
}: {
  phase: PhaseNumber
  questionnaireId: string
  phaseStatus: PhaseStatus
  onComplete: (phase: number) => void
  alreadyCompletedIds: string[]
}) {
  const phaseDeliverables = getDeliverablesByPhase(phase)
  const { progress, startGeneration } = useGeneration(questionnaireId, phase)

  // If this phase was already completed from a previous session, skip
  const isPreCompleted = phaseStatus === 'complete' && progress.status === 'idle'

  // Notify parent when generation completes
  useEffect(() => {
    if (progress.status === 'completed') {
      onComplete(phase)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.status])

  const handleGenerate = () => {
    startGeneration()
  }

  const completedCount = isPreCompleted
    ? phaseDeliverables.length
    : progress.completedTemplates.length
  const totalCount = phaseDeliverables.length
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  // Resolve display status: use hook status if generating/done, otherwise parent-provided status
  const displayStatus: PhaseStatus =
    progress.status === 'generating'
      ? 'generating'
      : progress.status === 'completed'
        ? 'complete'
        : phaseStatus

  return (
    <div
      className={`rounded-xl border p-5 transition-colors ${
        displayStatus === 'locked'
          ? 'border-slate-700/30 bg-slate-800/30 opacity-60'
          : displayStatus === 'generating'
            ? 'border-amber-400/30 bg-slate-800/60'
            : displayStatus === 'complete'
              ? 'border-green-500/30 bg-slate-800/60'
              : 'border-amber-400/20 bg-slate-800/60'
      }`}
    >
      {/* Phase header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Phase badge */}
          <div
            className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold ${
              displayStatus === 'locked'
                ? 'bg-slate-700/50 text-slate-500'
                : displayStatus === 'complete'
                  ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                  : 'bg-amber-400/15 text-amber-400 border border-amber-400/20'
            }`}
          >
            {phase}
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">
              {PHASE_TITLES[phase]}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {PHASE_DESCRIPTIONS[phase]}
            </p>
          </div>
        </div>

        {/* Status indicator / action */}
        <div className="flex items-center gap-2 mt-1">
          {displayStatus === 'locked' && (
            <div className="flex items-center gap-1.5 text-slate-500">
              <Lock className="w-4 h-4" />
              <span className="text-xs font-medium">Locked</span>
            </div>
          )}
          {displayStatus === 'ready' && (
            <Button
              onClick={handleGenerate}
              className="bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full px-5 py-2 text-sm"
            >
              Generate
              <Sparkles className="ml-1.5 w-3.5 h-3.5" />
            </Button>
          )}
          {displayStatus === 'complete' && (
            <div className="flex items-center gap-1.5 text-green-400">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-medium">Complete</span>
            </div>
          )}
          {displayStatus === 'generating' && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-amber-400">
                {completedCount} of {totalCount}
              </span>
              <ElapsedTimer startedAt={progress.startedAt} />
            </div>
          )}
        </div>
      </div>

      {/* Deliverable count */}
      <p className="text-xs text-slate-500 mb-3">
        {totalCount} deliverable{totalCount !== 1 ? 's' : ''}
      </p>

      {/* Progress bar (shown when generating) */}
      {displayStatus === 'generating' && (
        <div className="mb-3">
          <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Deliverable rows (shown when generating or complete via generation) */}
      {(displayStatus === 'generating' || (displayStatus === 'complete' && !isPreCompleted)) && (
        <div className="space-y-1.5">
          {phaseDeliverables.map((d) => {
            const rowStatus = getRowStatus(
              d.templateId,
              progress.activeTemplates,
              progress.completedTemplates,
              progress.failedTemplates,
              progress.status
            )
            return (
              <div
                key={d.templateId}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2 transition-colors ${
                  rowStatus === 'generating'
                    ? 'border-amber-400/20 bg-amber-500/10'
                    : rowStatus === 'completed'
                      ? 'border-green-500/15 bg-green-500/5'
                      : rowStatus === 'error'
                        ? 'border-red-500/20 bg-red-500/5'
                        : 'border-white/5 bg-slate-900/30'
                }`}
              >
                <StatusIcon status={rowStatus} />
                <div className="flex-1">
                  <p className="text-xs font-medium text-white">{d.title}</p>
                  {rowStatus === 'generating' && (
                    <p className="text-[11px] text-amber-400">Generating...</p>
                  )}
                  {rowStatus === 'error' && (
                    <p className="text-[11px] text-red-400">Failed</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Error retry for this phase */}
      {progress.status === 'error' && (
        <div className="mt-3 text-center">
          <p className="mb-2 text-xs text-red-400">{progress.error}</p>
          <Button
            onClick={handleGenerate}
            className="bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full px-5 py-2 text-sm"
          >
            Retry Phase {phase}
          </Button>
        </div>
      )}
    </div>
  )
}

export default function GeneratePage() {
  const params = useParams<{ id: string }>()
  const questionnaireId = params.id

  // Track which phases are complete (either from previous sessions or just now)
  const [completedPhases, setCompletedPhases] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)

  // On mount, check which deliverables already exist
  useEffect(() => {
    async function checkExisting() {
      try {
        const res = await fetch(`/api/deliverables?questionnaire_id=${questionnaireId}`)
        if (res.ok) {
          const data = await res.json()
          const existingIds = new Set(
            (data || []).map((d: { template_id: string }) => d.template_id)
          )

          const done = new Set<number>()
          for (const phase of PHASES) {
            const phaseDeliverables = getDeliverablesByPhase(phase)
            const allDone = phaseDeliverables.every(d => existingIds.has(d.templateId))
            if (allDone && phaseDeliverables.length > 0) {
              done.add(phase)
            }
          }
          setCompletedPhases(done)
        }
      } catch {
        // If fetch fails, just start fresh
      } finally {
        setLoading(false)
      }
    }
    checkExisting()
  }, [questionnaireId])

  const handlePhaseComplete = useCallback((phase: number) => {
    setCompletedPhases(prev => {
      const next = new Set(prev)
      next.add(phase)
      return next
    })
  }, [])

  // Determine each phase's status
  function getPhaseStatus(phase: PhaseNumber): PhaseStatus {
    if (completedPhases.has(phase)) return 'complete'
    if (phase === 1) return 'ready'
    // Phase N is ready if phase N-1 is complete
    if (completedPhases.has(phase - 1)) return 'ready'
    return 'locked'
  }

  const allDone = PHASES.every(p => completedPhases.has(p))

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl py-4 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400 mx-auto" />
        <p className="text-sm text-slate-400 mt-3">Loading...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5 py-4">
      {/* Header */}
      <div className="text-center mb-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/20 mb-5">
          <Sparkles className="w-8 h-8 text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">
          Building Your Launch Kit
        </h2>
        <p className="text-sm text-slate-400">
          Generate your marketing package phase by phase.
        </p>
        <Link
          href="/questionnaire/1"
          className="inline-flex items-center gap-1.5 mt-3 rounded-full border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-slate-500 transition-colors"
        >
          <PenLine className="h-3 w-3" />
          Edit Answers
        </Link>
      </div>

      {/* Phase cards */}
      {PHASES.map((phase) => (
        <PhaseCard
          key={phase}
          phase={phase}
          questionnaireId={questionnaireId}
          phaseStatus={getPhaseStatus(phase)}
          onComplete={handlePhaseComplete}
          alreadyCompletedIds={[]}
        />
      ))}

      {/* All phases done */}
      {allDone && (
        <div className="text-center py-4">
          <p className="mb-5 text-sm font-medium text-green-400">
            All phases complete — your launch kit is ready!
          </p>
          <Button
            render={<Link href={`/results/${questionnaireId}`} />}
            className="bg-amber-400 text-zinc-900 hover:bg-amber-300 font-bold rounded-full px-8 py-5 text-base shadow-lg shadow-amber-500/20"
          >
            View Your Marketing Package
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
