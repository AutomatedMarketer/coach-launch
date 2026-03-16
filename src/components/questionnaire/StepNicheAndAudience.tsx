'use client'

import { type UseFormReturn } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import DynamicArrayField from './DynamicArrayField'

interface StepNicheAndAudienceProps {
  form: UseFormReturn<Record<string, unknown>>
}

export default function StepNicheAndAudience({ form }: StepNicheAndAudienceProps) {
  const { register, formState: { errors } } = form

  return (
    <div className="space-y-6">
      {/* Niche */}
      <div className="space-y-2">
        <Label htmlFor="niche">Who Do You Help?</Label>
        <p className="text-sm text-gray-500">
          Get specific. &apos;Executive coaching for burned-out tech managers&apos; beats &apos;life coaching&apos; every time. The more specific, the less you spend on ads and the faster you close.
        </p>
        <Textarea
          id="niche"
          placeholder='e.g. Executive performance coaching for mid-level tech managers who want to break into the C-suite within 2 years'
          rows={3}
          {...register('niche')}
        />
        {errors.niche && (
          <p className="text-sm text-red-500">{errors.niche.message as string}</p>
        )}
      </div>

      {/* Target Audience */}
      <div className="space-y-2">
        <Label htmlFor="targetAudience">Describe Your Dream Client</Label>
        <p className="text-sm text-gray-500">
          Paint a picture. Age, income, job title, what keeps them up at night, what they&apos;re Googling at 2am. The more detail, the better your marketing hits.
        </p>
        <Textarea
          id="targetAudience"
          placeholder='e.g. Men aged 35-50, earning $100K-$250K in corporate roles, feeling stuck and unfulfilled. They are successful on paper but exhausted. Skeptical of fluffy coaching — they want tactical, results-driven guidance.'
          rows={4}
          {...register('targetAudience')}
        />
        {errors.targetAudience && (
          <p className="text-sm text-red-500">{errors.targetAudience.message as string}</p>
        )}
      </div>

      {/* Minimum Client Requirements */}
      <div className="space-y-2">
        <Label htmlFor="minimumRequirements">
          Minimum Client Requirements <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          What are the bare-minimum qualifications someone needs to work with you?
          Income level, experience, business stage, etc. This is your floor — different
          from your dream client above.
        </p>
        <Textarea
          id="minimumRequirements"
          placeholder="e.g. Must be making at least $15K/month, have an existing business for 2+ years, and be willing to invest in growth"
          rows={3}
          {...register('minimumRequirements')}
        />
      </div>

      {/* Problem Solved */}
      <div className="space-y-2">
        <Label htmlFor="problemSolved">The #1 Problem You Solve</Label>
        <p className="text-sm text-gray-500">
          Go deep — not the surface symptom, but the real problem underneath. This becomes the Pain in your 4P Power Message.
        </p>
        <Textarea
          id="problemSolved"
          placeholder='e.g. My clients are high-performing professionals who feel empty inside — they hit a ceiling in their career, their health is declining, and they have no real strategy to get to the next level. They keep grinding harder but getting diminishing returns.'
          rows={4}
          {...register('problemSolved')}
        />
        {errors.problemSolved && (
          <p className="text-sm text-red-500">{errors.problemSolved.message as string}</p>
        )}
      </div>

      {/* Unwanted Feelings (Hell Island) */}
      <div className="space-y-2">
        <Label htmlFor="unwantedFeelings">Where Are They Stuck? (The Pain Zone)</Label>
        <p className="text-sm text-gray-500">
          What emotions are they stuck in every day? Frustrated, overwhelmed, ashamed, broke, exhausted? These feelings become the hook in everything we create for you.
        </p>
        <Textarea
          id="unwantedFeelings"
          placeholder="e.g. Overwhelmed, exhausted, frustrated, anxious, stuck, doubtful. They feel like they're working harder than ever but getting nowhere."
          rows={3}
          {...register('unwantedFeelings')}
        />
        {errors.unwantedFeelings && (
          <p className="text-sm text-red-500">{errors.unwantedFeelings.message as string}</p>
        )}
      </div>

      {/* Desired Feelings (Heaven Island) */}
      <div className="space-y-2">
        <Label htmlFor="desiredFeelings">Where Do They Want to Be? (The Possibility)</Label>
        <p className="text-sm text-gray-500">
          What does the other side look like? Confident, free, in control, making money? The gap between where they are and where they want to be — that&apos;s what sells.
        </p>
        <Textarea
          id="desiredFeelings"
          placeholder="e.g. Confident, free, in control, energized, proud, peaceful. They want to wake up excited about their business, not dreading another day of hustle."
          rows={3}
          {...register('desiredFeelings')}
        />
        {errors.desiredFeelings && (
          <p className="text-sm text-red-500">{errors.desiredFeelings.message as string}</p>
        )}
      </div>

      {/* Common Objections */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          What do people say when they hesitate? &apos;I can&apos;t afford it,&apos; &apos;I need to think about it,&apos; &apos;I&apos;ve tried coaching before.&apos; These become content that handles objections before the sales call.
        </p>
        <DynamicArrayField
          form={form}
          name="commonObjections"
          label="What Excuses Do They Make?"
          placeholder="e.g. I tried coaching before and it didn't work"
          addLabel="Add Objection"
        />
      </div>

      {/* Testimonials (optional) */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          Social proof is the most powerful tool in coaching marketing. Even 2-3 strong
          testimonials with specific results can dramatically increase conversions. Skip if you
          don&apos;t have any yet.
        </p>
        <DynamicArrayField
          form={form}
          name="testimonials"
          label="Client Testimonials (optional)"
          placeholder='e.g. "Before working with Sarah, I was stuck at $4K/month. Within 60 days I hit $12K." — Jamie R.'
          addLabel="Add Testimonial"
        />
      </div>
    </div>
  )
}
