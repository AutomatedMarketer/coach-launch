'use client'

import { useState, useEffect, useCallback } from 'react'
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
  goBack: () => void
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
    if (!isValid) return

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

  const goBack = useCallback(() => {
    if (step > 1) {
      router.push(`/questionnaire/${step - 1}`)
    }
  }, [step, router])

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
