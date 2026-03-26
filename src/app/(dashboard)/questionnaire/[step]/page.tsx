'use client'

import React, { useState, useEffect } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { useParams } from 'next/navigation'
import { useQuestionnaire } from '@/hooks/use-questionnaire'
import StepLayout from '@/components/questionnaire/StepLayout'
import StepYouAndStory from '@/components/questionnaire/StepYouAndStory'
import StepNicheAndAudience from '@/components/questionnaire/StepNicheAndAudience'
import StepYourOffer from '@/components/questionnaire/StepYourOffer'
import StepDeepPsychology from '@/components/questionnaire/StepDeepPsychology'
import StepYourProof from '@/components/questionnaire/StepYourProof'
import StepGoalsAndWhy from '@/components/questionnaire/StepGoalsAndWhy'
import StepFinalDetails from '@/components/questionnaire/StepFinalDetails'
import StepBrandAssets from '@/components/questionnaire/StepBrandAssets'
import type { Questionnaire } from '@/types'

const STORAGE_KEY = 'questionnaire_id'

// All step components accept `form`; StepBrandAssets also uses `questionnaireId`
const stepComponents: React.ComponentType<{ form: UseFormReturn<Record<string, unknown>>; questionnaireId?: string }>[] = [
  StepYouAndStory,
  StepNicheAndAudience,
  StepYourOffer,
  StepDeepPsychology,
  StepYourProof,
  StepGoalsAndWhy,
  StepFinalDetails,
  StepBrandAssets,
]

/**
 * Data-loading wrapper. Fetches the questionnaire, then mounts the form
 * component ONLY after data is available. This ensures the form is created
 * with correct defaultValues — no async reset() needed.
 */
export default function QuestionnairePage() {
  const params = useParams()
  const stepParam = Number(params.step)
  const step = isNaN(stepParam) || stepParam < 1 || stepParam > 8 ? 1 : stepParam

  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadOrCreate() {
      setIsLoading(true)
      try {
        let questionnaireId = localStorage.getItem(STORAGE_KEY)

        if (questionnaireId) {
          const response = await fetch(`/api/questionnaire/${questionnaireId}`)
          if (response.ok) {
            const data: Questionnaire = await response.json()
            setQuestionnaire(data)
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
  }, [])

  if (isLoading || !questionnaire) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-amber-400 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-400">Loading your questionnaire...</p>
        </div>
      </div>
    )
  }

  // Form component mounts ONLY after questionnaire data is loaded.
  // This guarantees useForm gets correct defaultValues from birth.
  return (
    <QuestionnaireStepForm
      step={step}
      questionnaire={questionnaire}
      onUpdate={setQuestionnaire}
    />
  )
}

/**
 * Inner form component — only mounts after data is loaded.
 * useForm gets defaultValues: questionnaire.answers, not {}.
 */
function QuestionnaireStepForm({
  step,
  questionnaire,
  onUpdate,
}: {
  step: number
  questionnaire: Questionnaire
  onUpdate: (q: Questionnaire) => void
}) {
  const initialAnswers = (questionnaire.answers as Record<string, unknown>) || {}

  const {
    form,
    isSaving,
    goNext,
    goBack,
    isFirstStep,
    isLastStep,
  } = useQuestionnaire({ step, questionnaire, initialAnswers, onUpdate })

  const StepComponent = stepComponents[step - 1]

  return (
    <StepLayout
      step={step}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      isSaving={isSaving}
      errorCount={Object.keys(form.formState.errors).length}
      onNext={goNext}
      onBack={goBack}
    >
      <StepComponent form={form} questionnaireId={questionnaire.id} />
    </StepLayout>
  )
}
