'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  Loader2,
  Sparkles,
  ArrowRight,
  ClipboardList,
  Zap,
  FileText,
  CheckCircle2,
  Clock,
  Lock,
  Rocket,
  Target,
  BarChart3,
  Download,
  FileDown,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import {
  PHASES,
  PHASE_TITLES,
  getDeliverablesByPhase,
  DELIVERABLES,
  type PhaseNumber,
} from '@/lib/deliverable-config'
import { exportToPdf, exportToDocx } from '@/lib/export'
import type { Questionnaire, QuestionnaireStatus, Deliverable } from '@/types'

const statusConfig: Record<
  QuestionnaireStatus,
  { label: string; className: string }
> = {
  draft: {
    label: 'Draft',
    className: 'bg-slate-500/20 text-slate-300 border border-slate-500/30',
  },
  completed: {
    label: 'Ready to Generate',
    className: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
  },
  generating: {
    label: 'Generating',
    className: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  },
  done: {
    label: 'Done',
    className: 'bg-green-500/20 text-green-300 border border-green-500/30',
  },
}

function getActionForStatus(questionnaire: Questionnaire, deliverables: Deliverable[] = []) {
  // If all deliverables are completed, show results regardless of questionnaire status
  const totalExpected = DELIVERABLES.length
  const completedCount = deliverables.filter(d => d.status === 'completed').length
  if (completedCount === totalExpected && totalExpected > 0) {
    return { label: 'View Results', href: `/results/${questionnaire.id}` }
  }

  switch (questionnaire.status) {
    case 'draft':
      return {
        label: 'Continue',
        href: `/questionnaire/${questionnaire.current_step}`,
      }
    case 'completed':
      return { label: 'Generate', href: `/generate/${questionnaire.id}` }
    case 'generating':
      return { label: 'View Progress', href: `/generate/${questionnaire.id}` }
    case 'done':
      return { label: 'View Results', href: `/results/${questionnaire.id}` }
    default:
      return { label: 'Open', href: '/dashboard' }
  }
}

// Full phase display config — name, bar color, icon color
const PHASE_CONFIG: Record<
  PhaseNumber,
  { textColor: string; barColor: string; pillBg: string; pillText: string }
> = {
  1: {
    textColor: 'text-purple-400',
    barColor: 'bg-purple-400',
    pillBg: 'bg-purple-400/10',
    pillText: 'text-purple-300',
  },
  2: {
    textColor: 'text-amber-400',
    barColor: 'bg-amber-400',
    pillBg: 'bg-amber-400/10',
    pillText: 'text-amber-300',
  },
  3: {
    textColor: 'text-blue-400',
    barColor: 'bg-blue-400',
    pillBg: 'bg-blue-400/10',
    pillText: 'text-blue-300',
  },
  4: {
    textColor: 'text-green-400',
    barColor: 'bg-green-400',
    pillBg: 'bg-green-400/10',
    pillText: 'text-green-300',
  },
  5: {
    textColor: 'text-orange-400',
    barColor: 'bg-orange-400',
    pillBg: 'bg-orange-400/10',
    pillText: 'text-orange-300',
  },
}

type PhaseStatus = 'complete' | 'in-progress' | 'not-started' | 'locked'

function getPhaseStatus(
  phase: PhaseNumber,
  deliverables: Deliverable[],
  questionnaireStatus: QuestionnaireStatus
): PhaseStatus {
  const phaseTemplateIds = getDeliverablesByPhase(phase).map(
    (cfg) => cfg.templateId
  )
  const phaseDeliverables = deliverables.filter((d) =>
    phaseTemplateIds.includes(d.template_id)
  )

  const totalExpected = phaseTemplateIds.length
  const completedCount = phaseDeliverables.filter(
    (d) => d.status === 'completed'
  ).length

  // Check actual deliverable data first — if deliverables exist, trust that
  if (completedCount === totalExpected && totalExpected > 0) return 'complete'
  if (completedCount > 0) return 'in-progress'

  // If the questionnaire hasn't started generating and no deliverables exist, it's not started
  if (questionnaireStatus === 'draft' || questionnaireStatus === 'completed') {
    return 'not-started'
  }

  // Check if any earlier phase is still incomplete — if so, this phase is locked
  for (const earlier of PHASES) {
    if (earlier >= phase) break
    const earlierStatus = getPhaseStatus(earlier, deliverables, questionnaireStatus)
    if (earlierStatus !== 'complete') return 'locked'
  }

  return 'not-started'
}

function getPhaseProgress(
  phase: PhaseNumber,
  deliverables: Deliverable[]
): { completed: number; total: number } {
  const phaseTemplateIds = getDeliverablesByPhase(phase).map(
    (cfg) => cfg.templateId
  )
  const phaseDeliverables = deliverables.filter((d) =>
    phaseTemplateIds.includes(d.template_id)
  )
  const completed = phaseDeliverables.filter((d) => d.status === 'completed').length
  return { completed, total: phaseTemplateIds.length }
}

function PhaseStatusIcon({ status }: { status: PhaseStatus }) {
  switch (status) {
    case 'complete':
      return <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
    case 'in-progress':
      return <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
    case 'locked':
      return <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
    default:
      return (
        <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
      )
  }
}

const PHASE_STATUS_LABEL: Record<PhaseStatus, string> = {
  complete: 'Complete',
  'in-progress': 'In Progress',
  'not-started': 'Not started',
  locked: 'Locked',
}

// Short display names for the phase pills (to keep cards compact)
const PHASE_SHORT_NAMES: Record<PhaseNumber, string> = {
  1: 'Blueprint',
  2: 'Messaging',
  3: 'Mind Shift',
  4: 'Conversion',
  5: 'Amplifier',
}

function getPhaseCompletedDeliverables(
  phase: PhaseNumber,
  deliverables: Deliverable[]
): Deliverable[] {
  const phaseTemplateIds = getDeliverablesByPhase(phase).map(cfg => cfg.templateId)
  return deliverables.filter(
    d => phaseTemplateIds.includes(d.template_id) && d.status === 'completed'
  )
}

function handleDownloadAllPdf(
  phase: PhaseNumber,
  deliverables: Deliverable[],
  businessName: string
) {
  const completed = getPhaseCompletedDeliverables(phase, deliverables)
  if (completed.length === 0) return
  const items = completed.map(d => ({
    title: d.title,
    content: d.content || '',
    imageUrls: d.image_urls || [],
  }))
  const filename = `${businessName || 'launch-kit'}-phase-${phase}`
  exportToPdf(items, filename)
}

function handleDownloadAllDocx(
  phase: PhaseNumber,
  deliverables: Deliverable[],
  businessName: string
) {
  const completed = getPhaseCompletedDeliverables(phase, deliverables)
  if (completed.length === 0) return
  const items = completed.map(d => ({
    title: d.title,
    content: d.content || '',
    imageUrls: d.image_urls || [],
  }))
  const filename = `${businessName || 'launch-kit'}-phase-${phase}`
  exportToDocx(items, filename)
}

export default function DashboardPage() {
  const router = useRouter()
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
  const [deliverablesByQ, setDeliverablesByQ] = useState<
    Record<string, Deliverable[]>
  >({})
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({})

  useEffect(() => {
    async function fetchQuestionnaires() {
      try {
        const response = await fetch('/api/questionnaire')
        if (response.ok) {
          const data: Questionnaire[] = await response.json()
          setQuestionnaires(data)

          // Fetch deliverables for all non-draft questionnaires
          const active = data.filter(
            (q) => q.status !== 'draft'
          )
          const results = await Promise.all(
            active.map(async (q) => {
              const res = await fetch(
                `/api/deliverables?questionnaire_id=${q.id}`
              )
              const dels: Deliverable[] = res.ok ? await res.json() : []
              return { id: q.id, dels }
            })
          )
          const map: Record<string, Deliverable[]> = {}
          for (const r of results) {
            map[r.id] = r.dels
          }
          setDeliverablesByQ(map)
        }
      } catch (error) {
        console.error('Failed to fetch questionnaires:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestionnaires()
  }, [])

  async function handleCreate() {
    setIsCreating(true)
    try {
      const response = await fetch('/api/questionnaire', { method: 'POST' })
      if (response.ok) {
        const data: Questionnaire = await response.json()
        localStorage.setItem('questionnaire_id', data.id)
        router.push('/questionnaire/1')
      }
    } catch (error) {
      console.error('Failed to create questionnaire:', error)
    } finally {
      setIsCreating(false)
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
      </div>
    )
  }

  // Empty state — big "Start Here" CTA
  if (questionnaires.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-amber-500/5 blur-3xl" />
        </div>

        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-indigo-500/15 border border-indigo-500/20 mb-8">
          <Sparkles className="w-10 h-10 text-amber-400" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
          Welcome to Coach Launch
        </h2>
        <p className="text-slate-400 max-w-md mb-4 text-lg leading-relaxed">
          Answer a few questions about your coaching business and we&apos;ll generate your complete marketing launch kit — 26 deliverables powered by belief-shifting frameworks.
        </p>

        {/* What you get mini-preview */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { icon: <Sparkles className="w-3.5 h-3.5" />, label: '4P Power Message' },
            { icon: <FileText className="w-3.5 h-3.5" />, label: 'Sales Script' },
            { icon: <ClipboardList className="w-3.5 h-3.5" />, label: 'Email Sequences' },
            { icon: <Zap className="w-3.5 h-3.5" />, label: '+ 23 More' },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
            >
              {icon}
              {label}
            </span>
          ))}
        </div>

        {/* How it works — 3 numbered steps */}
        <div className="w-full max-w-md mb-10 rounded-xl border border-slate-700/50 bg-slate-800/50 p-5 text-left">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Here&apos;s how it works
          </p>
          <ol className="space-y-4">
            {[
              {
                icon: <ClipboardList className="w-4 h-4 text-amber-400" />,
                title: 'Fill in your questionnaire',
                desc: 'Tell us about your coaching business, niche, and offer. Takes less than 5 minutes.',
              },
              {
                icon: <Rocket className="w-4 h-4 text-blue-400" />,
                title: 'Generate your 5-phase launch kit',
                desc: 'AI builds your blueprint, messaging, sales assets, and content system — all in your voice.',
              },
              {
                icon: <BarChart3 className="w-4 h-4 text-green-400" />,
                title: 'Review, edit, and launch',
                desc: 'Read through every piece, make tweaks, and export what you need.',
              },
            ].map((step, index) => (
              <li key={index} className="flex gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    {step.icon}
                    <p className="text-sm font-semibold text-white">{step.title}</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Button
          onClick={handleCreate}
          disabled={isCreating}
          className="bg-amber-400 text-zinc-900 hover:bg-amber-300 font-bold text-lg px-10 py-6 rounded-full shadow-lg shadow-amber-500/20 flex items-center gap-3"
        >
          {isCreating ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Start Here
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>

        <p className="mt-4 text-slate-600 text-sm">Takes less than 5 minutes</p>
      </div>
    )
  }

  // Has questionnaires — show list
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Motivational header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Your Launch Kits
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Each kit generates your complete marketing package across 5 phases.
          </p>
        </div>
        <Button
          onClick={handleCreate}
          disabled={isCreating}
          className="bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full px-5 shrink-0"
        >
          {isCreating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          New Launch Kit
        </Button>
      </div>

      <div className="grid gap-4">
        {questionnaires.map((q) => {
          const qDeliverables = deliverablesByQ[q.id] || []
          const status = statusConfig[q.status]
          const action = getActionForStatus(q, qDeliverables)
          const rawName = q.answers?.businessName as string | undefined
          const businessName = rawName?.trim() || null

          return (
            <div
              key={q.id}
              className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-5 hover:border-amber-400/20 transition-colors"
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="text-base font-semibold text-white">
                      {businessName ?? 'My Launch Kit'}
                    </h3>
                    <Badge className={status.className} variant="secondary">
                      {status.label}
                    </Badge>
                  </div>
                  {!businessName && (
                    <p className="text-xs text-slate-600 italic mb-0.5">
                      Name appears once you fill in your business name
                    </p>
                  )}
                  <p className="text-xs text-slate-500">
                    Created {formatDate(q.created_at)}
                  </p>
                </div>
                <Link
                  href={action.href}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-full px-5 shrink-0 ml-3"
                  )}
                >
                  {action.label}
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </div>

              {/* Phase progress indicators */}
              <div className="grid grid-cols-5 gap-2 pt-3 border-t border-slate-700/50">
                {PHASES.map((phase) => {
                  const phaseStatus = getPhaseStatus(
                    phase,
                    qDeliverables,
                    q.status
                  )
                  const { completed, total } = getPhaseProgress(phase, qDeliverables)
                  const config = PHASE_CONFIG[phase]
                  const isLocked = phaseStatus === 'locked'
                  const progressPct =
                    phaseStatus === 'not-started' || phaseStatus === 'locked'
                      ? 0
                      : Math.round((completed / total) * 100)
                  const completedDeliverables = getPhaseCompletedDeliverables(phase, qDeliverables)
                  const phaseKey = `${q.id}-${phase}`
                  const isExpanded = expandedPhases[phaseKey] ?? false

                  return (
                    <div
                      key={phase}
                      className={`rounded-lg p-2.5 ${config.pillBg} ${isLocked ? 'opacity-40' : ''}`}
                    >
                      {/* Phase name + status icon */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-xs font-semibold ${config.textColor}`}>
                          {PHASE_SHORT_NAMES[phase]}
                        </span>
                        <PhaseStatusIcon status={phaseStatus} />
                      </div>

                      {/* Progress bar */}
                      <div className="h-1 rounded-full bg-white/10 overflow-hidden mb-1.5">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${config.barColor}`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>

                      {/* Status label + count */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          {PHASE_STATUS_LABEL[phaseStatus]}
                        </span>
                        {(phaseStatus === 'in-progress' || phaseStatus === 'complete') && (
                          <span className="text-xs text-slate-500">
                            {completed}/{total}
                          </span>
                        )}
                      </div>

                      {/* Deliverable previews — show when there are completed items */}
                      {completedDeliverables.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-white/5">
                          <button
                            onClick={() =>
                              setExpandedPhases(prev => ({
                                ...prev,
                                [phaseKey]: !prev[phaseKey],
                              }))
                            }
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors w-full"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                            {completedDeliverables.length} deliverable{completedDeliverables.length !== 1 ? 's' : ''} ready
                          </button>

                          {isExpanded && (
                            <ul className="mt-1.5 space-y-1">
                              {completedDeliverables.map(d => (
                                <li
                                  key={d.id}
                                  className="flex items-center gap-1.5 text-xs text-slate-400"
                                >
                                  <CheckCircle2 className="w-2.5 h-2.5 text-green-400 shrink-0" />
                                  <span className="truncate">{d.title}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}

                      {/* Download All buttons — show when phase is complete or has completed items */}
                      {completedDeliverables.length > 0 && (
                        <div className="mt-2 flex gap-1">
                          <button
                            onClick={() =>
                              handleDownloadAllPdf(phase, qDeliverables, businessName || '')
                            }
                            className={`flex-1 flex items-center justify-center gap-1 text-xs py-1 rounded-md border transition-colors ${config.pillText} border-white/10 hover:bg-white/5`}
                            title="Download all as PDF"
                          >
                            <FileDown className="w-3 h-3" />
                            PDF
                          </button>
                          <button
                            onClick={() =>
                              handleDownloadAllDocx(phase, qDeliverables, businessName || '')
                            }
                            className={`flex-1 flex items-center justify-center gap-1 text-xs py-1 rounded-md border transition-colors ${config.pillText} border-white/10 hover:bg-white/5`}
                            title="Download all as DOCX"
                          >
                            <FileText className="w-3 h-3" />
                            DOCX
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
