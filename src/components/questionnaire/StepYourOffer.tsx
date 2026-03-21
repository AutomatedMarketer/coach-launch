'use client'

import { type UseFormReturn } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import DynamicArrayField from './DynamicArrayField'

interface StepYourOfferProps {
  form: UseFormReturn<Record<string, unknown>>
}

export default function StepYourOffer({ form }: StepYourOfferProps) {
  const { register, formState: { errors }, watch, setValue } = form

  return (
    <div className="space-y-6">

      {/* Q21 — Target Audience */}
      <div className="space-y-2">
        <Label htmlFor="targetAudience">
          Who do you most love working with? <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          Describe the person you most love working with — who are they, what do they do, how old, how much are they earning?
        </p>
        <Textarea
          id="targetAudience"
          placeholder="e.g. Online coaches aged 30-45 who are earning $3K-$8K/month and feel stuck. They've got a program, they know they're good at what they do, but they can't consistently get clients."
          rows={4}
          {...register('targetAudience')}
        />
        {errors.targetAudience && (
          <p className="text-sm text-red-500">{errors.targetAudience.message as string}</p>
        )}
      </div>

      {/* Q22 — Niche */}
      <div className="space-y-2">
        <Label htmlFor="niche">
          Do you focus on a specific niche? <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          Is there a specific type of coach or niche you focus on? Being specific makes all your marketing sharper.
        </p>
        <Textarea
          id="niche"
          placeholder="e.g. I work with health and wellness coaches who want to build a 6-figure online business — specifically people who have the skills but struggle with sales and lead generation."
          rows={3}
          {...register('niche')}
        />
        {errors.niche && (
          <p className="text-sm text-red-500">{errors.niche.message as string}</p>
        )}
      </div>

      {/* Q23 — Best Client Ever */}
      <div className="space-y-2">
        <Label htmlFor="bestClientEver">
          Describe your best client ever <span className="text-slate-500 font-normal">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Describe your best client ever by name — who were they, what was their situation when they came to you, and what happened after working with you?
        </p>
        <Textarea
          id="bestClientEver"
          placeholder="e.g. Sarah was a fitness coach making $2K/month and burning out with 1-on-1 clients. She came to me confused about her messaging. Within 90 days she had a signature group program, a lead gen system, and hit $11K in a single month."
          rows={4}
          {...register('bestClientEver')}
        />
      </div>

      {/* Q24 — Top Complaints */}
      <div className="space-y-2">
        <Label htmlFor="topComplaints">
          What are the top 3 things your ideal client complains about? <span className="text-slate-500 font-normal">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          What do they say when being completely honest with a close friend? What frustrations do they vent about?
        </p>
        <Textarea
          id="topComplaints"
          placeholder={`e.g.\n1. "I post every day but nobody engages and I never get leads."\n2. "I have calls with people who say they're interested and then ghost me."\n3. "I feel like I'm doing everything right but I'm still stuck at the same income."`}
          rows={4}
          {...register('topComplaints')}
        />
      </div>

      {/* Q25 — Unwanted Feelings */}
      <div className="space-y-2">
        <Label htmlFor="unwantedFeelings">
          How does your ideal client feel on a daily basis? <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          How does your ideal client feel on a daily basis because of those problems? These emotions are the engine of your marketing.
        </p>
        <Textarea
          id="unwantedFeelings"
          placeholder="e.g. Frustrated and embarrassed that they're not further along. Anxious checking their bank account. Exhausted from constant hustle. A quiet fear that maybe they're not cut out for this. Imposter syndrome when they see others succeeding."
          rows={4}
          {...register('unwantedFeelings')}
        />
        {errors.unwantedFeelings && (
          <p className="text-sm text-red-500">{errors.unwantedFeelings.message as string}</p>
        )}
      </div>

      {/* Q26 — Top Desires */}
      <div className="space-y-2">
        <Label htmlFor="topDesires">
          What are the top 3 things your ideal client wants most? <span className="text-slate-500 font-normal">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          What are the top 3 things your ideal client wants most from their coaching business? What do they daydream about?
        </p>
        <Textarea
          id="topDesires"
          placeholder={`e.g.\n1. Consistent $10K-$20K months without burning out.\n2. A steady stream of qualified leads coming to them.\n3. The confidence and credibility to charge premium prices.`}
          rows={4}
          {...register('topDesires')}
        />
      </div>

      {/* Q27 — Desired Feelings */}
      <div className="space-y-2">
        <Label htmlFor="desiredFeelings">
          How do they want to feel when they get those things? <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          Your marketing sells a feeling before it sells a result. What emotion does your client most crave?
        </p>
        <Textarea
          id="desiredFeelings"
          placeholder="e.g. Free. In control. Proud. Like they made the right bet on themselves. Confident when they talk about their business at dinner. Excited to check their phone in the morning."
          rows={3}
          {...register('desiredFeelings')}
        />
        {errors.desiredFeelings && (
          <p className="text-sm text-red-500">{errors.desiredFeelings.message as string}</p>
        )}
      </div>

      {/* Q28 — Current Methods */}
      <div className="space-y-2">
        <Label htmlFor="idealClientCurrentMethods">
          What is your ideal client currently doing to try to grow? <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          What strategies, platforms, or approaches are they already trying? This helps position your method as different.
        </p>
        <Textarea
          id="idealClientCurrentMethods"
          placeholder="e.g. Posting on Instagram daily, running free discovery calls, watching YouTube videos about funnels, buying online courses, trying to figure out Facebook ads on their own."
          rows={3}
          {...register('idealClientCurrentMethods')}
        />
        {errors.idealClientCurrentMethods && (
          <p className="text-sm text-red-500">{errors.idealClientCurrentMethods.message as string}</p>
        )}
      </div>

      {/* Q29 — Why Current Method Fails */}
      <div className="space-y-2">
        <Label htmlFor="whyCurrentMethodFails">
          Why isn&apos;t what they&apos;re currently doing working? <span className="text-slate-500 font-normal">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          What is the root reason their current approach keeps failing them? This becomes the core of your marketing argument.
        </p>
        <Textarea
          id="whyCurrentMethodFails"
          placeholder="e.g. They're focusing on tactics before they have a clear message. They're attracting the wrong people or no one at all because their positioning is vague. They're copying what big names do but they don't have the audience yet."
          rows={3}
          {...register('whyCurrentMethodFails')}
        />
      </div>

      {/* Q30 — Aspiring Identity */}
      <div className="space-y-2">
        <Label htmlFor="aspiringIdentity">
          Who has your ideal client become after your program? <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          Not what they can DO — who they have BECOME. All your content sells this identity. Describe the upgraded version of your client.
        </p>
        <Textarea
          id="aspiringIdentity"
          placeholder='e.g. "The Wealthy Coach" — calm, systematic, profitable. Making $20K+/month working 25 hours/week. Known as the go-to authority in their niche. Confident, free, and fully in control of their business and life.'
          rows={3}
          {...register('aspiringIdentity')}
        />
        {errors.aspiringIdentity && (
          <p className="text-sm text-red-500">{errors.aspiringIdentity.message as string}</p>
        )}
      </div>

      {/* Problem Solved */}
      <div className="space-y-2">
        <Label htmlFor="problemSolved">
          The #1 deep problem you solve <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          Boil it down to one sentence. What is the single most painful problem you eliminate for your clients?
        </p>
        <Textarea
          id="problemSolved"
          placeholder="e.g. Coaches who are great at their craft but invisible online — I help them build a clear message and a repeatable system so they can attract and close clients consistently."
          rows={3}
          {...register('problemSolved')}
        />
        {errors.problemSolved && (
          <p className="text-sm text-red-500">{errors.problemSolved.message as string}</p>
        )}
      </div>

      {/* Common Objections */}
      <DynamicArrayField
        form={form}
        name="commonObjections"
        label="What excuses do they make? (min 1)"
        placeholder={"e.g. \"I don't have enough time\" or \"I've tried this before and it didn't work\""}
        addLabel="Add Objection"
      />

      {/* Sales Approach */}
      <div className="space-y-2">
        <Label>
          How do you close clients? <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          Your primary sales method — this shapes the sales scripts and content we generate for you.
        </p>
        <Select
          value={watch('salesApproach') as string || ''}
          onValueChange={(value) => setValue('salesApproach', value, { shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose your sales approach..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="discovery-call">Discovery Call — Free strategy session to qualify and close</SelectItem>
            <SelectItem value="application-call">Application + Sales Call — Application first, then close on a call</SelectItem>
            <SelectItem value="dm-close">DM Close — Close entirely through direct message conversation</SelectItem>
            <SelectItem value="webinar">Webinar / Workshop — Live or automated presentation with pitch at the end</SelectItem>
            <SelectItem value="video-sales-letter">Video Sales Letter — Recorded presentation, no live selling</SelectItem>
          </SelectContent>
        </Select>
        {errors.salesApproach && (
          <p className="text-sm text-red-500">{errors.salesApproach.message as string}</p>
        )}
      </div>

      {/* Delivery Model */}
      <div className="space-y-2">
        <Label>
          How do you deliver your coaching? <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          Your delivery format affects how your offer is positioned and described across all generated materials.
        </p>
        <Select
          value={watch('deliveryModel') as string || ''}
          onValueChange={(value) => setValue('deliveryModel', value, { shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose your delivery model..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-on-1">1-on-1 Coaching — Private sessions, fully personalized</SelectItem>
            <SelectItem value="group-program">Group Program — Cohort-based, structured curriculum</SelectItem>
            <SelectItem value="mastermind">Mastermind — Peer learning + hot seats + community</SelectItem>
            <SelectItem value="hybrid">Hybrid — Mix of private and group elements</SelectItem>
            <SelectItem value="self-paced-course">Self-Paced Course — Recorded content with optional support</SelectItem>
            <SelectItem value="membership">Membership / Community — Recurring subscription model</SelectItem>
          </SelectContent>
        </Select>
        {errors.deliveryModel && (
          <p className="text-sm text-red-500">{errors.deliveryModel.message as string}</p>
        )}
      </div>

    </div>
  )
}
