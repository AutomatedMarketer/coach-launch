'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { MarkdownContent } from '@/components/results/MarkdownContent'
import {
  Loader2,
  ArrowLeft,
  Shield,
  CheckCircle2,
  Clock,
  FileDown,
  FileText,
  Copy,
  Check,
} from 'lucide-react'
import { PHASES, DELIVERABLES, PHASE_TITLES, getDeliverablesByPhase, type PhaseNumber } from '@/lib/deliverable-config'
import { exportToPdf, exportToDocx } from '@/lib/export'
import type { Deliverable } from '@/types'

const PHASE_COLORS: Record<PhaseNumber, { border: string; text: string; bg: string }> = {
  1: { border: 'border-l-purple-400', text: 'text-purple-400', bg: 'bg-purple-400/10' },
  2: { border: 'border-l-amber-400', text: 'text-amber-400', bg: 'bg-amber-400/10' },
  3: { border: 'border-l-blue-400', text: 'text-blue-400', bg: 'bg-blue-400/10' },
  4: { border: 'border-l-green-400', text: 'text-green-400', bg: 'bg-green-400/10' },
  5: { border: 'border-l-orange-400', text: 'text-orange-400', bg: 'bg-orange-400/10' },
}

const statusStyles: Record<string, string> = {
  pending: 'bg-slate-500/20 text-slate-300 border border-slate-500/30',
  generating: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  completed: 'bg-green-500/20 text-green-300 border border-green-500/30',
  error: 'bg-red-500/20 text-red-300 border border-red-500/30',
}

interface UserDetail {
  profile: {
    id: string
    email: string
    full_name: string | null
    created_at: string
  }
  questionnaires: Array<{
    id: string
    status: string
    answers: Record<string, unknown>
    created_at: string
  }>
  deliverables: Deliverable[]
}

export default function AdminReviewPage() {
  const { id } = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const router = useRouter()

  const [data, setData] = useState<UserDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (!userId) return

      try {
        // Check admin
        const meRes = await fetch('/api/admin/me')
        const meData = await meRes.json()
        if (!meData.isAdmin) {
          router.push('/dashboard')
          return
        }

        const res = await fetch(`/api/admin/user/${userId}`)
        if (!res.ok) {
          router.push('/admin')
          return
        }
        const userData: UserDetail = await res.json()
        setData(userData)
      } catch {
        router.push('/admin')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [userId, router])

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
      </div>
    )
  }

  const questionnaire = data.questionnaires.find(q => q.id === id)
  const businessName = (questionnaire?.answers?.businessName as string) || 'Untitled Kit'
  const clientName = data.profile.full_name || data.profile.email.split('@')[0]
  const deliverables = data.deliverables.filter(d => d.questionnaire_id === id)

  async function handleCopy(content: string, deliverableId: string) {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedId(deliverableId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // ignore
    }
  }

  function handleDownloadPhasePdf(phase: PhaseNumber) {
    const phaseTemplateIds = getDeliverablesByPhase(phase).map(c => c.templateId)
    const completed = deliverables.filter(
      d => phaseTemplateIds.includes(d.template_id) && d.status === 'completed'
    )
    if (completed.length === 0) return
    const items = completed.map(d => ({
      title: d.title,
      content: d.content || '',
      imageUrls: d.image_urls || [],
    }))
    exportToPdf(items, `${businessName}-phase-${phase}`)
  }

  function handleDownloadPhaseDocx(phase: PhaseNumber) {
    const phaseTemplateIds = getDeliverablesByPhase(phase).map(c => c.templateId)
    const completed = deliverables.filter(
      d => phaseTemplateIds.includes(d.template_id) && d.status === 'completed'
    )
    if (completed.length === 0) return
    const items = completed.map(d => ({
      title: d.title,
      content: d.content || '',
      imageUrls: d.image_urls || [],
    }))
    exportToDocx(items, `${businessName}-phase-${phase}`)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Back link + header */}
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Admin
        </Link>

        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{businessName}</h1>
            <p className="text-sm text-slate-400">
              Client: {clientName} ({data.profile.email})
            </p>
          </div>
        </div>
      </div>

      {/* Questionnaire answers summary */}
      {questionnaire && (
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-5">
          <h2 className="text-sm font-semibold text-white mb-3">Questionnaire Answers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {Object.entries(questionnaire.answers).map(([key, value]) => {
              if (!value || (typeof value === 'string' && !value.trim())) return null
              const label = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, s => s.toUpperCase())
                .trim()
              const display = Array.isArray(value)
                ? value.filter(Boolean).join(', ')
                : String(value)
              if (!display.trim()) return null
              return (
                <div key={key} className="rounded-lg bg-slate-900/50 p-3">
                  <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">{display}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Phase sections with deliverables */}
      {PHASES.map(phase => {
        const phaseTemplateIds = getDeliverablesByPhase(phase).map(c => c.templateId)
        const phaseDeliverables = deliverables.filter(d =>
          phaseTemplateIds.includes(d.template_id)
        )
        const completedCount = phaseDeliverables.filter(d => d.status === 'completed').length
        const colors = PHASE_COLORS[phase]

        return (
          <div key={phase}>
            <div className={`flex items-center justify-between mb-3 border-l-4 ${colors.border} pl-3`}>
              <div>
                <h2 className={`text-base font-semibold ${colors.text}`}>
                  Phase {phase}: {PHASE_TITLES[phase]}
                </h2>
                <p className="text-xs text-slate-500">
                  {completedCount}/{phaseDeliverables.length} deliverables complete
                </p>
              </div>
              {completedCount > 0 && (
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleDownloadPhasePdf(phase)}
                    className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border border-white/10 ${colors.text} hover:bg-white/5 transition-colors`}
                  >
                    <FileDown className="w-3 h-3" /> PDF
                  </button>
                  <button
                    onClick={() => handleDownloadPhaseDocx(phase)}
                    className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border border-white/10 ${colors.text} hover:bg-white/5 transition-colors`}
                  >
                    <FileText className="w-3 h-3" /> DOCX
                  </button>
                </div>
              )}
            </div>

            {phaseDeliverables.length === 0 ? (
              <p className="text-sm text-slate-600 italic ml-5 mb-4">
                No deliverables generated for this phase.
              </p>
            ) : (
              <Accordion className="rounded-xl border border-slate-700/50 bg-slate-800/60 mb-4 overflow-hidden">
                {phaseDeliverables.map(d => (
                  <AccordionItem key={d.id} value={d.id}>
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex w-full items-center gap-3 pr-2">
                        <span className="flex-1 text-left text-sm font-medium text-white">
                          {d.title}
                        </span>
                        <Badge className={statusStyles[d.status] || statusStyles.pending} variant="secondary">
                          {d.status}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      {d.content ? (
                        <>
                          <div className="max-h-96 overflow-y-auto rounded-xl bg-slate-900/80 border border-slate-700/50 p-5 text-sm mb-3">
                            <MarkdownContent content={d.content} />
                          </div>
                          <button
                            onClick={() => handleCopy(d.content || '', d.id)}
                            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-slate-600"
                          >
                            {copiedId === d.id ? (
                              <><Check className="w-3 h-3 text-green-400" /> Copied</>
                            ) : (
                              <><Copy className="w-3 h-3" /> Copy</>
                            )}
                          </button>
                        </>
                      ) : (
                        <p className="text-sm text-slate-500 italic">Not generated yet.</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        )
      })}
    </div>
  )
}
