'use client'

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

const stepComponents = [
  StepYouAndStory,
  StepNicheAndAudience,
  StepYourOffer,
  StepDeepPsychology,
  StepYourProof,
  StepGoalsAndWhy,
  StepFinalDetails,
  StepBrandAssets,
]

export default function QuestionnairePage() {
  const params = useParams()
  const stepParam = Number(params.step)
  const step = isNaN(stepParam) || stepParam < 1 || stepParam > 8 ? 1 : stepParam

  const {
    form,
    isLoading,
    isSaving,
    goNext,
    goBack,
    isFirstStep,
    isLastStep,
  } = useQuestionnaire({ step })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-amber-400 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-400">Loading your questionnaire...</p>
        </div>
      </div>
    )
  }

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
      <StepComponent form={form} />
    </StepLayout>
  )
}
