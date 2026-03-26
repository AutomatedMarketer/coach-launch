'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { stepSchemas } from '@/lib/schemas/questionnaire'
import type { Questionnaire } from '@/types'

interface UseQuestionnaireOptions {
  step: number
  questionnaire: Questionnaire
  initialAnswers: Record<string, unknown>
  onUpdate: (q: Questionnaire) => void
}

interface UseQuestionnaireReturn {
  form: UseFormReturn<Record<string, unknown>>
  questionnaire: Questionnaire
  isSaving: boolean
  goNext: () => Promise<void>
  goBack: () => Promise<void>
  isFirstStep: boolean
  isLastStep: boolean
}

/**
 * Extract only the current step's field values from the full form state.
 * Prevents cross-step data overwrites — only the fields the user is actively
 * editing on this step get sent to the API.
 */
function scopeToStep(
  allValues: Record<string, unknown>,
  schema: { shape: Record<string, unknown> }
): Record<string, unknown> {
  const keys = Object.keys(schema.shape)
  const scoped: Record<string, unknown> = {}
  for (const key of keys) {
    if (key in allValues) {
      scoped[key] = allValues[key]
    }
  }
  return scoped
}

export function useQuestionnaire({
  step,
  questionnaire,
  initialAnswers,
  onUpdate,
}: UseQuestionnaireOptions): UseQuestionnaireReturn {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  // step is 1-indexed from URL, schemas are 0-indexed
  const stepIndex = step - 1
  const currentSchema = stepSchemas[stepIndex]

  // Form is created with the LOADED answers as defaultValues.
  // No reset() needed — data is correct from birth.
  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: initialAnswers,
    mode: 'onSubmit',
  })

  // Auto-save: silently persist answers 3 seconds after any field change
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => {
    const subscription = form.watch(() => {
      clearTimeout(autoSaveTimer.current)
      autoSaveTimer.current = setTimeout(async () => {
        const formData = scopeToStep(form.getValues(), currentSchema)
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
  }, [questionnaire.id, form, currentSchema])

  const saveCurrentStep = useCallback(async (formData: Record<string, unknown>): Promise<boolean> => {
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
        onUpdate(updated)
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
  }, [questionnaire.id, step, onUpdate])

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

    const formData = scopeToStep(form.getValues(), currentSchema)
    const saved = await saveCurrentStep(formData)
    if (!saved) return

    if (step === stepSchemas.length) {
      // Final step — mark as completed and redirect
      await fetch(`/api/questionnaire/${questionnaire.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' }),
      })
      router.push(`/generate/${questionnaire.id}`)
    } else {
      router.push(`/questionnaire/${step + 1}`)
    }
  }, [form, saveCurrentStep, step, currentSchema, questionnaire.id, router])

  const goBack = useCallback(async () => {
    if (step > 1) {
      // Save current answers before navigating back (skip validation — partial data is OK)
      const formData = scopeToStep(form.getValues(), currentSchema)
      await saveCurrentStep(formData)
      router.push(`/questionnaire/${step - 1}`)
    }
  }, [step, router, form, currentSchema, saveCurrentStep])

  return {
    form: form as unknown as UseFormReturn<Record<string, unknown>>,
    questionnaire,
    isSaving,
    goNext,
    goBack,
    isFirstStep: step === 1,
    isLastStep: step === stepSchemas.length,
  }
}
