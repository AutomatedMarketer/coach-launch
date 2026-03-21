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

      {/* Hidden legacy fields for schema backward compatibility */}
      <input type="hidden" {...register('personalFamily')} />
      <input type="hidden" {...register('personalLocation')} />

      {/* Q11 — Upbringing */}
      <div className="space-y-2">
        <Label htmlFor="upbringing">
          Where Did You Grow Up? <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Where you came from shapes who you are. Tell us about your hometown, your background, and anything that left a mark on you growing up.
        </p>
        <Textarea
          id="upbringing"
          placeholder="e.g. I grew up in a small town in Ohio. Working-class neighborhood, not a lot of opportunity around — but that environment taught me to create my own."
          rows={3}
          {...register('upbringing')}
        />
      </div>

      {/* Q12 — Parent Influence */}
      <div className="space-y-2">
        <Label htmlFor="parentInfluence">
          What Role Did Your Parents Play? <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          What did your parents do for work? What did they model for you — about money, work, success, or life? Even what they got wrong matters here.
        </p>
        <Textarea
          id="parentInfluence"
          placeholder="e.g. My dad worked nights at a factory and my mom stayed home with us. They worked incredibly hard but always struggled financially. That instilled a deep drive in me to build something different."
          rows={3}
          {...register('parentInfluence')}
        />
      </div>

      {/* Q13 — Coaching Lineage */}
      <div className="space-y-2">
        <Label htmlFor="coachingLineage">
          Any Coaches, Teachers, or Mentors in Your Family? <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Was anyone in your family or close circle a coach, teacher, pastor, mentor, or guide? This often reveals where your gift for helping people comes from.
        </p>
        <Textarea
          id="coachingLineage"
          placeholder="e.g. My uncle was a high school football coach for 30 years. He was the first person who ever believed in me and showed me what real mentorship looks like."
          rows={3}
          {...register('coachingLineage')}
        />
      </div>

      {/* Q14 — First Business */}
      <div className="space-y-2">
        <Label htmlFor="firstBusiness">
          What Was the First Business You Ever Built? <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Whether it was a lemonade stand or a seven-figure company — your first venture reveals a lot about your entrepreneurial DNA. What did you learn from it?
        </p>
        <Textarea
          id="firstBusiness"
          placeholder="e.g. I started a landscaping company at 17. I had no idea what I was doing but I learned everything about knocking on doors, delivering results, and managing people the hard way."
          rows={3}
          {...register('firstBusiness')}
        />
      </div>

      {/* Q15 — Before State (was in Step 1) */}
      <div className="space-y-2">
        <Label htmlFor="storyBeforeState">
          When Were You Most Stuck? <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          Describe your lowest point. What was happening in your life and business? The more honest and specific you are here, the more your future clients will see themselves in your story.
        </p>
        <Textarea
          id="storyBeforeState"
          placeholder="e.g. In 2019, I was $80K in debt, my marriage was falling apart, and I was working 70-hour weeks with nothing to show for it. I felt like a complete fraud — a business coach who couldn't run his own business."
          rows={4}
          {...register('storyBeforeState')}
        />
        {errors.storyBeforeState && (
          <p className="text-sm text-red-500">{errors.storyBeforeState.message as string}</p>
        )}
      </div>

      {/* Q16 — Turning Point (was in Step 1) */}
      <div className="space-y-2">
        <Label htmlFor="storyTurningPoint">
          What Did You Figure Out That Changed Everything? <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          What was the insight, the moment, or the decision that turned it all around? This is the core of your origin story — the thing your clients are about to discover for themselves.
        </p>
        <Textarea
          id="storyTurningPoint"
          placeholder="e.g. I stopped trying to do everything and went all-in on one niche. Within 90 days of niching down and fixing my offer, I signed 4 clients at $5K each. The problem was never effort — it was clarity."
          rows={4}
          {...register('storyTurningPoint')}
        />
        {errors.storyTurningPoint && (
          <p className="text-sm text-red-500">{errors.storyTurningPoint.message as string}</p>
        )}
      </div>

      {/* Q17 — After State (was in Step 1) */}
      <div className="space-y-2">
        <Label htmlFor="storyAfterState">
          What Has Your Coaching Journey Looked Like Since? <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          Where are you now? What have you built, achieved, or helped others accomplish since that turning point? Be specific — numbers, timelines, and outcomes make this credible.
        </p>
        <Textarea
          id="storyAfterState"
          placeholder="e.g. Over the next 3 years I built a 7-figure coaching practice, helped over 200 coaches scale past $10K/month, and now run a team of 6 while working 4 days a week from home."
          rows={4}
          {...register('storyAfterState')}
        />
        {errors.storyAfterState && (
          <p className="text-sm text-red-500">{errors.storyAfterState.message as string}</p>
        )}
      </div>

      {/* Q18 — Why Do This */}
      <div className="space-y-2">
        <Label htmlFor="whyDoThis">
          Why Is This the Most Important Work You Could Be Doing Right Now? <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          Beyond money or freedom — what is the deeper reason you do this work? What would be lost in the world if you stopped? This becomes the emotional core of your brand.
        </p>
        <Textarea
          id="whyDoThis"
          placeholder="e.g. I spent 8 years figuring this out the hard way. If I can shortcut that journey for even one coach, that is 8 years of their life back — time with their family, freedom, and the impact they were meant to have."
          rows={4}
          {...register('whyDoThis')}
        />
        {errors.whyDoThis && (
          <p className="text-sm text-red-500">{errors.whyDoThis.message as string}</p>
        )}
      </div>

      {/* Q19 — Personal Hobbies (was in Step 1) */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          What do you do when you are not coaching? Hobbies and interests make you relatable and give your content personality. List as many as you like.
        </p>
        <DynamicArrayField
          form={form}
          name="personalHobbies"
          label="What Do You Do Outside of Work? (optional)"
          placeholder="e.g. Trail running, cooking, reading biographies"
          addLabel="Add Hobby"
        />
      </div>

      {/* Q20 — Personal Life (new field replacing personalFamily + personalLocation) */}
      <div className="space-y-2">
        <Label htmlFor="personalLife">
          Describe Your Personal Life <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Who is in your life — family, partner, kids, pets? Where do you live? What does a great week look like for you? This context lets the AI write about you like a real person, not a LinkedIn profile.
        </p>
        <Textarea
          id="personalLife"
          placeholder="e.g. I live in Phoenix with my wife and two daughters. A great week means school drop-off in the morning, client calls by 10am, done by 3pm, and a date night on Friday. We love hiking and slow Sundays."
          rows={4}
          {...register('personalLife')}
        />
      </div>

      {/* Anti-hallucination: Story Facts (was in Step 1) */}
      <div className="space-y-2">
        <Label htmlFor="storyFacts">
          Key Facts and Milestones <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          List the facts, numbers, and milestones the AI is allowed to use about you. One per line. This prevents the AI from inventing details — it will only reference what you write here.
        </p>
        <Textarea
          id="storyFacts"
          placeholder={`e.g.\n- Coached 200+ clients since 2020\n- Hit $1M revenue in year 3\n- Former corporate sales director for 12 years\n- Based in Phoenix, AZ\n- Married with 2 daughters\n- Featured in Forbes and Entrepreneur Magazine`}
          rows={6}
          {...register('storyFacts')}
        />
        {errors.storyFacts && (
          <p className="text-sm text-red-500">{errors.storyFacts.message as string}</p>
        )}
      </div>

    </div>
  )
}
