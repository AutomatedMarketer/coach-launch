'use client'

import { type UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import DynamicObjectArrayField from './DynamicObjectArrayField'
import FieldSuggestion from './FieldSuggestion'

interface StepGoalsAndWhyProps {
  form: UseFormReturn<Record<string, unknown>>
}

export default function StepGoalsAndWhy({ form }: StepGoalsAndWhyProps) {
  const { register, formState: { errors } } = form

  return (
    <div className="space-y-10">

      {/* Section 1 — Client Success Stories */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-amber-400 uppercase tracking-wide">
          Client Success Stories
        </h3>
        <p className="text-sm text-slate-400">
          These become your proof stack — used in your sales script, emails, homepage, and ads. Be specific: numbers, timeframes, and direct quotes are what make prospects believe you.
        </p>
        <DynamicObjectArrayField
          form={form}
          name="caseStudies"
          label="Your 3 Best Client Success Stories (Q50)"
          addLabel="Add Client Story"
          emptyMessage="No stories added yet. Add your best client win to get started."
          fields={[
            { key: 'clientName', label: 'Client Name', placeholder: 'e.g. Jamie Rodriguez' },
            { key: 'businessType', label: 'Their Business', placeholder: 'e.g. Health coach, $3K/month' },
            { key: 'beforeState', label: 'Where They Were Before', placeholder: 'e.g. Stuck at $3K/month, no pipeline', type: 'textarea' },
            { key: 'intervention', label: 'What You Did Together', placeholder: 'e.g. Built offer, launched LinkedIn system', type: 'textarea' },
            { key: 'result', label: 'The Result', placeholder: 'e.g. Hit $12K/month in 90 days' },
            { key: 'timeframe', label: 'How Long', placeholder: 'e.g. 90 days' },
            { key: 'quote', label: 'Their Words (optional)', placeholder: 'e.g. "This changed everything for me"', type: 'textarea' },
          ]}
        />
      </div>

      {/* Aggregate Success Rate (added April 15 2026 — closes belief-shift-map Component 12 gap) */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-amber-400 uppercase tracking-wide">
          Program Success Rate
        </h3>
        <p className="text-sm text-slate-400">
          If you have rough numbers, drop them here. The AI uses this in your Belief Breakthrough Blueprint as internal case study evidence. Leave blank if you don&apos;t track this yet — the AI will skip it rather than invent.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="clientSuccessRate.totalClientsInProgram">
              Total Clients in Your Program <span className="text-slate-500">(optional)</span>
            </Label>
            <Input
              id="clientSuccessRate.totalClientsInProgram"
              type="number"
              min={0}
              placeholder="e.g. 50"
              {...register('clientSuccessRate.totalClientsInProgram', { valueAsNumber: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientSuccessRate.clientsAchievedResult">
              How Many Achieved the Result <span className="text-slate-500">(optional)</span>
            </Label>
            <Input
              id="clientSuccessRate.clientsAchievedResult"
              type="number"
              min={0}
              placeholder="e.g. 43"
              {...register('clientSuccessRate.clientsAchievedResult', { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>

      {/* Section 2 — Track Record */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-amber-400 uppercase tracking-wide">
          Track Record
        </h3>
        <p className="text-sm text-slate-400">
          These facts build authority and get woven into your bio, homepage, and sales assets. Fill in only what applies to you — all fields are optional.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="space-y-2">
            <Label htmlFor="trackRecord.businessesBuilt">Businesses or Programs Built</Label>
            <Input
              id="trackRecord.businessesBuilt"
              placeholder="e.g. 3 coaching programs"
              {...register('trackRecord.businessesBuilt')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trackRecord.yearsInIndustry">Years in the Industry</Label>
            <Input
              id="trackRecord.yearsInIndustry"
              placeholder="e.g. 12 years"
              {...register('trackRecord.yearsInIndustry')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trackRecord.clientsHelped">Number of People Coached</Label>
            <Input
              id="trackRecord.clientsHelped"
              placeholder="e.g. 200+ coaches"
              {...register('trackRecord.clientsHelped')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trackRecord.revenueGenerated">Revenue Generated</Label>
            <Input
              id="trackRecord.revenueGenerated"
              placeholder="e.g. $2M in client results"
              {...register('trackRecord.revenueGenerated')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trackRecord.eventsRun">Events Hosted</Label>
            <Input
              id="trackRecord.eventsRun"
              placeholder="e.g. 5 live retreats"
              {...register('trackRecord.eventsRun')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trackRecord.booksWritten">Books Written</Label>
            <Input
              id="trackRecord.booksWritten"
              placeholder="e.g. 2 published books"
              {...register('trackRecord.booksWritten')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trackRecord.certifications">Certifications</Label>
            <Input
              id="trackRecord.certifications"
              placeholder="e.g. ICF-certified, NLP Practitioner"
              {...register('trackRecord.certifications')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trackRecord.speakingEngagements">Speaking Engagements</Label>
            <Input
              id="trackRecord.speakingEngagements"
              placeholder="e.g. Keynoted 3 national conferences"
              {...register('trackRecord.speakingEngagements')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trackRecord.mediaAppearances">Media Appearances</Label>
            <Input
              id="trackRecord.mediaAppearances"
              placeholder="e.g. Forbes, Entrepreneur, 4 podcasts"
              {...register('trackRecord.mediaAppearances')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trackRecord.notableClients">Notable Clients</Label>
            <Input
              id="trackRecord.notableClients"
              placeholder="e.g. Ex-Nike exec, 7-figure agency owner"
              {...register('trackRecord.notableClients')}
            />
          </div>

        </div>
      </div>

      {/* Section 3 — Objection Handling */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-amber-400 uppercase tracking-wide">
          Objection Handling
        </h3>
        <p className="text-sm text-slate-400">
          What do prospects say right before they walk away? Pair each objection with the reframe you actually use. These go into your sales script and email sequences.
        </p>
        <DynamicObjectArrayField
          form={form}
          name="objectionRebuttals"
          label="Common Objections and Your Responses"
          addLabel="Add Objection"
          emptyMessage="No objections added yet. Think about what prospects say right before they say no."
          fields={[
            { key: 'objection', label: 'The Objection', placeholder: "e.g. I can't afford it right now" },
            { key: 'rebuttal', label: 'Your Response', placeholder: "e.g. What's the cost of staying stuck for another year?", type: 'textarea' },
          ]}
        />
      </div>

      {/* Section 4 — Goals & Strategy */}
      <div className="space-y-6">
        <h3 className="text-base font-semibold text-amber-400 uppercase tracking-wide">
          Goals &amp; Strategy
        </h3>

        <div className="space-y-2">
          <Label htmlFor="revenueGoal">
            Revenue Target <span className="text-slate-500">(optional)</span>
          </Label>
          <p className="text-sm text-slate-400">
            Used in your Mission Statement and to create urgency in emails and ads.
          </p>
          <Input
            id="revenueGoal"
            placeholder="e.g. $50K/month or $500K/year"
            {...register('revenueGoal')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="revenueGoalDeadline">
            By When? <span className="text-slate-500">(optional)</span>
          </Label>
          <p className="text-sm text-slate-400">
            A specific deadline makes the goal feel real and drives urgency in your content.
          </p>
          <Input
            id="revenueGoalDeadline"
            placeholder="e.g. December 2025 or Q1 2026"
            {...register('revenueGoalDeadline')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="competitorOldWay">
            What Does the Industry Do Wrong? <span className="text-slate-500">(optional)</span>
          </Label>
          <p className="text-sm text-slate-400">
            The conventional wisdom that keeps your ideal clients stuck. This powers your Money Messaging and Belief Shifts.
          </p>
          <Textarea
            id="competitorOldWay"
            placeholder={"e.g. Most coaching programs just teach tactics — post more, run ads, do cold outreach. They never fix the messaging, the offer, or the belief system. So coaches burn out doing more of what already isn't working."}
            rows={3}
            {...register('competitorOldWay')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="scarcityElement">
            What Creates Urgency? <span className="text-red-400">*</span>
          </Label>
          <p className="text-sm text-slate-400">
            Capacity cap, cohort start dates, upcoming price increase, bonus deadline — anything that creates legitimate FOMO. Used across every email, ad, and sales page. Without it, the AI invents a deadline.
          </p>
          <Input
            id="scarcityElement"
            placeholder='e.g. "Only 10 clients at a time, next cohort opens March 1" or "Enrollment closes Friday — price goes up $2K on Monday"'
            {...register('scarcityElement')}
          />
          <FieldSuggestion
            fieldName="scarcityElement"
            answers={form.getValues() as Record<string, unknown>}
            onAccept={(val) => form.setValue('scarcityElement', val, { shouldValidate: true, shouldDirty: true })}
          />
          {errors.scarcityElement && (
            <p className="text-sm text-red-500">{errors.scarcityElement.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="missionStatement">
            Your Mission Statement <span className="text-slate-500">(optional)</span>
          </Label>
          <p className="text-sm text-slate-400">
            If you already have one, paste it here. If not, we&apos;ll generate one from your answers.
          </p>
          <Textarea
            id="missionStatement"
            placeholder='e.g. "We will help 100 coaches hit $10K/month by December 2025 because no one should have to choose between doing what they love and paying their bills."'
            rows={3}
            {...register('missionStatement')}
          />
        </div>

        {errors.revenueGoal && (
          <p className="text-sm text-red-500">{errors.revenueGoal.message as string}</p>
        )}
      </div>

    </div>
  )
}
