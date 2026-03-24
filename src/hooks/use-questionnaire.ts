'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { stepSchemas, type QuestionnaireAnswers } from '@/lib/schemas/questionnaire'
import type { Questionnaire } from '@/types'

interface UseQuestionnaireOptions {
  step: number
}

interface UseQuestionnaireReturn {
  form: UseFormReturn<Record<string, unknown>>
  questionnaire: Questionnaire | null
  isLoading: boolean
  isSaving: boolean
  goNext: () => Promise<void>
  goBack: () => Promise<void>
  isFirstStep: boolean
  isLastStep: boolean
}

const STORAGE_KEY = 'questionnaire_id'

export function useQuestionnaire({ step }: UseQuestionnaireOptions): UseQuestionnaireReturn {
  const router = useRouter()
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // step is 1-indexed from URL, schemas are 0-indexed
  const stepIndex = step - 1
  const currentSchema = stepSchemas[stepIndex]

  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: {},
    mode: 'onSubmit',
  })

  // Load or create questionnaire on mount
  useEffect(() => {
    async function loadOrCreate() {
      setIsLoading(true)
      try {
        let questionnaireId = localStorage.getItem(STORAGE_KEY)

        if (questionnaireId) {
          // Try to load existing
          const response = await fetch(`/api/questionnaire/${questionnaireId}`)
          if (response.ok) {
            const data: Questionnaire = await response.json()
            setQuestionnaire(data)
            // Pre-fill form with saved answers
            if (data.answers) {
              const currentAnswers = data.answers as Record<string, unknown>
              form.reset(currentAnswers)
            }
            setIsLoading(false)
            return
          }
        }

        // Create new questionnaire
        const response = await fetch('/api/questionnaire', { method: 'POST' })
        if (response.ok) {
          const data: Questionnaire = await response.json()
          localStorage.setItem(STORAGE_KEY, data.id)
          setQuestionnaire(data)
        }
      } catch (error) {
        console.error('Failed to load questionnaire:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrCreate()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-save: silently persist answers 3 seconds after any field change
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => {
    if (!questionnaire) return

    const subscription = form.watch(() => {
      clearTimeout(autoSaveTimer.current)
      autoSaveTimer.current = setTimeout(async () => {
        const formData = form.getValues()
        try {
          await fetch(`/api/questionnaire/${questionnaire.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: formData }),
          })
        } catch {
          // Auto-save failure is non-critical — explicit save on Next/Back is the fallback
        }
      }, 3000)
    })

    return () => {
      clearTimeout(autoSaveTimer.current)
      subscription.unsubscribe()
    }
  }, [questionnaire, form])

  const saveCurrentStep = useCallback(async (formData: Record<string, unknown>): Promise<boolean> => {
    if (!questionnaire) return false

    setIsSaving(true)
    try {
      const response = await fetch(`/api/questionnaire/${questionnaire.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: formData,
          current_step: step,
        }),
      })

      if (response.ok) {
        const updated = await response.json()
        setQuestionnaire(updated)
        return true
      }

      alert('Failed to save your answers. Please try again.')
      return false
    } catch (error) {
      console.error('Failed to save step:', error)
      alert('Failed to save your answers. Please try again.')
      return false
    } finally {
      setIsSaving(false)
    }
  }, [questionnaire, step])

  const goNext = useCallback(async () => {
    // Validate and get form data
    const isValid = await form.trigger()
    if (!isValid) {
      // Scroll to the first field with an error so the user sees what's wrong
      const firstErrorKey = Object.keys(form.formState.errors)[0]
      if (firstErrorKey) {
        const el = document.querySelector(`[name="${firstErrorKey}"], [id="${firstErrorKey}"]`)
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    const formData = form.getValues()
    const saved = await saveCurrentStep(formData)
    if (!saved) return

    if (step === stepSchemas.length) {
      // Final step — mark as completed and redirect
      if (questionnaire) {
        await fetch(`/api/questionnaire/${questionnaire.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'completed' }),
        })
        router.push(`/generate/${questionnaire.id}`)
      }
    } else {
      router.push(`/questionnaire/${step + 1}`)
    }
  }, [form, saveCurrentStep, step, questionnaire, router])

  const goBack = useCallback(async () => {
    if (step > 1) {
      // Save current answers before navigating back (skip validation — partial data is OK)
      const formData = form.getValues()
      await saveCurrentStep(formData)
      router.push(`/questionnaire/${step - 1}`)
    }
  }, [step, router, form, saveCurrentStep])

  return {
    form: form as unknown as UseFormReturn<Record<string, unknown>>,
    questionnaire,
    isLoading,
    isSaving,
    goNext,
    goBack,
    isFirstStep: step === 1,
    isLastStep: step === stepSchemas.length,
  }
}
