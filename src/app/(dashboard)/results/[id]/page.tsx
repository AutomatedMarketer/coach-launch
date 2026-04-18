'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Accordion } from '@/components/ui/accordion'
import { DeliverableCard } from '@/components/results/DeliverableCard'
import { ExportMenu } from '@/components/results/ExportMenu'
import { Loader2, Sparkles, PenLine } from 'lucide-react'
import Link from 'next/link'
import {
  PHASES,
  PHASE_TITLES,
  PHASE_DESCRIPTIONS,
  getDeliverablesByPhase,
  type PhaseNumber,
} from '@/lib/deliverable-config'
import type { Deliverable, Questionnaire } from '@/types'

const PHASE_ACCENT: Record<PhaseNumber, string> = {
  1: 'border-l-purple-400',
  2: 'border-l-amber-400',
  3: 'border-l-blue-400',
  4: 'border-l-green-400',
  5: 'border-l-orange-400',
}

export default function ResultsPage() {
  const params = useParams<{ id: string }>()
  const questionnaireId = params.id

  const [deliverables, setDeliverables] = useState<Deliverable[]>([])
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [delRes, qRes] = await Promise.all([
          fetch(`/api/deliverables?questionnaire_id=${questionnaireId}`),
          fetch(`/api/questionnaire/${questionnaireId}`),
        ])

        if (delRes.ok) {
          const delData = await delRes.json()
          setDeliverables(delData)
        }
        if (qRes.ok) {
          const qData = await qRes.json()
          setQuestionnaire(qData)
        }
      } catch (error) {
        console.error('Failed to fetch results:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [questionnaireId])

  function handleUpdate(updated: Deliverable) {
    setDeliverables((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d))
    )
  }

  const businessName =
    (questionnaire?.answers?.businessName as string) || 'Untitled'

  // Group deliverables by phase using template IDs from config
  function getPhaseDeliverables(phase: PhaseNumber): Deliverable[] {
    const phaseTemplateIds = getDeliverablesByPhase(phase).map(
      (cfg) => cfg.templateId
    )
    return deliverables.filter((d) =>
      phaseTemplateIds.includes(d.template_id)
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {businessName}
            </h2>
          </div>
          <p className="text-sm text-slate-400">
            {deliverables.length} deliverables generated — ready to use
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/questionnaire/1?id=${questionnaireId}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-slate-500 transition-colors"
          >
            <PenLine className="h-3 w-3" />
            Edit Answers
          </Link>
          <ExportMenu deliverables={deliverables} businessName={businessName} />
        </div>
      </div>

      {/* Deliverable cards grouped by phase */}
      {deliverables.length === 0 ? (
        <div
          className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-12 text-center text-slate-400"
        >
          No deliverables found for this questionnaire.
        </div>
      ) : (
        <div className="space-y-8">
          {PHASES.map((phase) => {
            const phaseDeliverables = getPhaseDeliverables(phase)
            if (phaseDeliverables.length === 0) return null

            return (
              <section key={phase} className={`border-l-4 ${PHASE_ACCENT[phase]} pl-4`}>
                <h3 className="text-lg font-bold text-white mb-1">
                  Phase {phase}: {PHASE_TITLES[phase]}
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  {PHASE_DESCRIPTIONS[phase]}
                </p>

                <Accordion multiple className="space-y-2">
                  {phaseDeliverables.map((d) => (
                    <div
                      key={d.id}
                      className="rounded-xl border border-slate-700/50 bg-slate-800/60 overflow-hidden hover:border-amber-400/20 transition-colors"
                    >
                      <DeliverableCard
                        deliverable={d}
                        questionnaireId={questionnaireId}
                        onUpdate={handleUpdate}
                      />
                    </div>
                  ))}
                </Accordion>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
