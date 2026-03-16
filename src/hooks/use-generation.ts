'use client'
import { useState, useCallback, useRef, useEffect } from 'react'
import { getDeliverablesByPhase, buildWaves } from '@/lib/deliverable-config'
import { safeParseJSON } from '@/lib/utils'

const GENERATION_TIMEOUT_MS = 5 * 60 * 1000 // 5 minutes per deliverable
const POLL_INTERVAL_MS = 15_000 // 15 seconds

export interface GenerationProgress {
  currentStep: number
  totalSteps: number
  currentTemplate: string | null
  activeTemplates: string[] // templates currently generating in parallel
  status: 'idle' | 'generating' | 'completed' | 'error'
  completedTemplates: string[]
  failedTemplates: string[]
  error: string | null
  startedAt: number | null // timestamp for elapsed timer
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('Generation is taking longer than expected. You can retry or refresh.')
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}

export function useGeneration(questionnaireId: string, phase: 1 | 2 | 3) {
  const phaseDeliverables = getDeliverablesByPhase(phase)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [progress, setProgress] = useState<GenerationProgress>({
    currentStep: 0,
    totalSteps: phaseDeliverables.length,
    currentTemplate: null,
    activeTemplates: [],
    status: 'idle',
    completedTemplates: [],
    failedTemplates: [],
    error: null,
    startedAt: null,
  })

  // Clean up polling on unmount
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [])

  // Start polling to sync state with DB
  const startPolling = useCallback(() => {
    if (pollRef.current) return
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/deliverables?questionnaire_id=${questionnaireId}`)
        if (!res.ok) return
        const data = await res.json()
        const dbCompleted = new Set(
          (data || [])
            .filter((d: { status: string }) => d.status === 'completed')
            .map((d: { template_id: string }) => d.template_id)
        )
        // Merge any DB-confirmed completions into local state
        setProgress(prev => {
          const phaseTemplateIds = phaseDeliverables.map(d => d.templateId)
          const newCompleted = phaseTemplateIds.filter(id => dbCompleted.has(id))
          if (newCompleted.length > prev.completedTemplates.length) {
            return {
              ...prev,
              completedTemplates: newCompleted,
              currentStep: newCompleted.length,
            }
          }
          return prev
        })
      } catch {
        // Polling failure is non-critical
      }
    }, POLL_INTERVAL_MS)
  }, [questionnaireId, phaseDeliverables])

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  const startGeneration = useCallback(async () => {
    // Check which deliverables already exist
    let alreadyCompleted: Set<string> = new Set()
    try {
      const checkRes = await fetch(`/api/deliverables?questionnaire_id=${questionnaireId}`)
      if (checkRes.ok) {
        const existing = await checkRes.json()
        alreadyCompleted = new Set(
          (existing || [])
            .filter((d: { status: string }) => d.status === 'completed')
            .map((d: { template_id: string }) => d.template_id)
        )
      }
    } catch {
      // If check fails, regenerate everything
    }

    // If all already done, mark complete immediately
    const toGenerate = phaseDeliverables.filter(d => !alreadyCompleted.has(d.templateId))
    const preCompleted = phaseDeliverables
      .filter(d => alreadyCompleted.has(d.templateId))
      .map(d => d.templateId)

    if (toGenerate.length === 0) {
      setProgress(prev => ({
        ...prev,
        status: 'completed',
        completedTemplates: phaseDeliverables.map(d => d.templateId),
        currentTemplate: null,
        activeTemplates: [],
        error: null,
      }))
      return
    }

    setProgress(prev => ({
      ...prev,
      status: 'generating',
      completedTemplates: preCompleted,
      failedTemplates: [],
      error: null,
      currentStep: preCompleted.length,
      startedAt: Date.now(),
    }))

    // Start background polling for state sync
    startPolling()

    // Build waves from remaining deliverables using dependency graph
    const waves = buildWaves(toGenerate, alreadyCompleted)

    for (const wave of waves) {
      const waveIds = wave.map(d => d.templateId)

      // Show all active templates in this wave
      setProgress(prev => ({
        ...prev,
        activeTemplates: waveIds,
        currentTemplate: waveIds[0],
      }))

      // Run all deliverables in this wave in parallel
      const results = await Promise.allSettled(
        wave.map(async ({ templateId }) => {
          const res = await fetchWithTimeout(
            `/api/generate/${questionnaireId}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ templateId }),
            },
            GENERATION_TIMEOUT_MS
          )

          if (!res.ok) {
            const data = await safeParseJSON(res)
            throw new Error(data.error || 'Generation failed')
          }

          // Mark this one as completed immediately
          setProgress(prev => ({
            ...prev,
            completedTemplates: [...prev.completedTemplates, templateId],
            currentStep: prev.completedTemplates.length + 1,
          }))

          return templateId
        })
      )

      // Check for failures in this wave
      const failures: string[] = []
      const errors: string[] = []
      results.forEach((result, i) => {
        if (result.status === 'rejected') {
          failures.push(waveIds[i])
          errors.push(result.reason?.message || 'Unknown error')
        }
      })

      if (failures.length > 0) {
        stopPolling()
        setProgress(prev => ({
          ...prev,
          status: 'error',
          failedTemplates: [...prev.failedTemplates, ...failures],
          currentTemplate: null,
          activeTemplates: [],
          error: `Failed: ${failures.join(', ')} — ${errors[0]}`,
        }))
        return
      }
    }

    stopPolling()
    setProgress(prev => ({
      ...prev,
      status: 'completed',
      currentTemplate: null,
      activeTemplates: [],
      error: null,
    }))
  }, [questionnaireId, phaseDeliverables, startPolling, stopPolling])

  return { progress, startGeneration }
}
