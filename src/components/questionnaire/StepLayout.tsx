'use client'

import { Button } from '@/components/ui/button'
import { stepNames } from '@/lib/schemas/questionnaire'
import { ArrowLeft, ArrowRight, Lightbulb, Sparkles, Zap } from 'lucide-react'

// Motivational guidance shown above the form on each step.
// Coaches often don't know jargon like "niche" or "lead magnet", so
// these cards explain WHY each step matters in plain language.
const STEP_INTROS = [
  {
    headline: 'Tell Us About You',
    why: "Your story is your superpower. Clients don't buy coaching — they buy YOU. The more authentic, the better your marketing connects.",
    proTip: "Don't overthink it. Write like you're telling a friend over coffee.",
  },
  {
    headline: 'Define Your Audience',
    why: "The riches are in the niches. When you speak to everyone, you speak to no one. Get specific about who you serve.",
    proTip: 'Think about your best client ever. Describe THAT person.',
  },
  {
    headline: 'Build Your Offer',
    why: "Your offer is your business in a box. A clear, outcome-driven package is 10x easier to sell than vague 'coaching sessions.'",
    proTip: 'Name your system. A branded method instantly adds perceived value.',
  },
  {
    headline: 'Almost There!',
    why: 'These details fine-tune everything so your marketing sounds like YOU, not a robot.',
    proTip: 'Pick the voice that matches how you talk on client calls.',
  },
  {
    headline: 'The Finishing Touches',
    why: 'Visuals make the first impression. Even simple brand assets make your marketing look professional.',
    proTip: 'No logo? No problem. A great headshot is more powerful than any logo.',
  },
] as const

interface StepLayoutProps {
  step: number
  isFirstStep: boolean
  isLastStep: boolean
  isSaving: boolean
  onNext: () => void
  onBack: () => void
  children: React.ReactNode
}

const TOTAL_STEPS = stepNames.length // 4

export default function StepLayout({
  step,
  isFirstStep,
  isLastStep,
  isSaving,
  onNext,
  onBack,
  children,
}: StepLayoutProps) {
  const progressValue = (step / TOTAL_STEPS) * 100
  const stepName = stepNames[step - 1]
  const intro = STEP_INTROS[step - 1]

  return (
    <div className="mx-auto max-w-2xl py-6 px-4 sm:px-0">

      {/* Progress section — slim bar only, no circles */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">
            Step {step} of {TOTAL_STEPS}
          </p>
          <p className="text-xs font-semibold text-amber-400">
            {Math.round(progressValue)}% complete
          </p>
        </div>
        {/* Slim amber progress bar */}
        <div className="h-1 w-full rounded-full bg-white/8 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-500 ease-out"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      </div>

      {/* Motivational intro card — helps coaches understand WHY each step matters */}
      {intro && (
        <div className="mb-5 rounded-xl border border-amber-400/20 bg-gradient-to-br from-amber-400/8 via-slate-800/60 to-slate-900/40 px-5 py-4 shadow-md shadow-black/20">
          {/* Headline */}
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 shrink-0 text-amber-400" />
            <span className="text-sm font-semibold text-amber-300">{intro.headline}</span>
          </div>
          {/* Why this step matters */}
          <p className="text-sm text-slate-300 leading-relaxed mb-3">
            {intro.why}
          </p>
          {/* Pro Tip callout */}
          <div className="flex items-start gap-2 rounded-lg border border-amber-400/15 bg-amber-400/6 px-3 py-2">
            <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
            <p className="text-xs text-amber-200/80 leading-relaxed">
              <span className="font-semibold text-amber-300">Pro tip: </span>
              {intro.proTip}
            </p>
          </div>
        </div>
      )}

      {/* Card — visibly distinct from the page background */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 shadow-xl shadow-black/30 overflow-hidden">

        {/* Card top accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        <div className="p-6 sm:p-8">
          {/* Step title */}
          <h2 className="text-2xl font-bold text-white mb-1">{stepName}</h2>
          <p className="text-sm text-slate-400 mb-7">
            Fill in the details below — the more specific, the better your results.
          </p>

          {/* Separator */}
          <div className="h-px bg-slate-700/50 mb-7" />

          {/*
            Form content wrapper.
            The [&_...] selectors override shadcn/ui default light-theme styles
            so all form fields look correct on this dark card.
          */}
          <div
            className="space-y-6
              [&_label]:text-slate-200 [&_label]:font-medium
              [&_[class*='text-gray-500']]:!text-slate-400
              [&_[class*='text-muted-foreground']]:!text-slate-400
              [&_p.text-sm]:text-slate-400
              [&_input]:bg-slate-900/70
              [&_input]:border-slate-600
              [&_input]:text-white
              [&_input]:placeholder:text-slate-500
              [&_input:focus]:border-amber-400/60
              [&_input:focus]:ring-1
              [&_input:focus]:ring-amber-400/20
              [&_textarea]:bg-slate-900/70
              [&_textarea]:border-slate-600
              [&_textarea]:text-white
              [&_textarea]:placeholder:text-slate-500
              [&_textarea:focus]:border-amber-400/60
              [&_textarea:focus]:ring-1
              [&_textarea:focus]:ring-amber-400/20
              [&_select]:bg-slate-900/70
              [&_select]:border-slate-600
              [&_select]:text-white
              [&_button[role='combobox']]:bg-slate-900/70
              [&_button[role='combobox']]:border-slate-600
              [&_button[role='combobox']]:text-white
              [&_[class*='text-red']]:!text-red-400
              [&_[class*='text-destructive']]:!text-red-400
            "
          >
            {children}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-700/50">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isFirstStep}
              className="
                border-slate-600 bg-transparent text-slate-300
                hover:bg-slate-700/50 hover:text-white hover:border-slate-500
                disabled:opacity-30 disabled:cursor-not-allowed
                rounded-full px-5
              "
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button
              type="button"
              onClick={onNext}
              disabled={isSaving}
              className="
                bg-amber-400 text-zinc-900
                hover:bg-amber-300
                disabled:opacity-60 disabled:cursor-not-allowed
                font-semibold rounded-full px-6
                shadow-lg shadow-amber-400/20
              "
            >
              {isSaving ? (
                'Saving...'
              ) : isLastStep ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Submit & Generate
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
