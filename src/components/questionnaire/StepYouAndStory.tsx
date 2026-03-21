'use client'

import { type UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface StepYouAndStoryProps {
  form: UseFormReturn<Record<string, unknown>>
}

export default function StepYouAndStory({ form }: StepYouAndStoryProps) {
  const { register, formState: { errors } } = form

  return (
    <div className="space-y-6">
      {/* Client Name */}
      <div className="space-y-2">
        <Label htmlFor="clientName">Your Name</Label>
        <p className="text-sm text-gray-500">
          The name your clients know you by. This appears across all your marketing materials.
        </p>
        <Input
          id="clientName"
          placeholder="e.g. Sarah Mitchell"
          {...register('clientName')}
        />
        {errors.clientName && (
          <p className="text-sm text-red-500">{errors.clientName.message as string}</p>
        )}
      </div>

      {/* Business Name */}
      <div className="space-y-2">
        <Label htmlFor="businessName">Your Brand Name</Label>
        <p className="text-sm text-gray-500">
          This appears on landing pages, emails, and ads. If you coach under your own name, enter that.
        </p>
        <Input
          id="businessName"
          placeholder="e.g. Mitchell Performance Coaching"
          {...register('businessName')}
        />
        {errors.businessName && (
          <p className="text-sm text-red-500">{errors.businessName.message as string}</p>
        )}
      </div>

      {/* Elevator Pitch — Q2 */}
      <div className="space-y-2">
        <Label htmlFor="elevatorPitch">
          What You Do <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Say it simply — what do you do and who do you help? One sentence is all you need. This becomes the spine of your messaging.
        </p>
        <Textarea
          id="elevatorPitch"
          placeholder="e.g. I help burned-out executives build a sustainable fitness routine so they can lead at full capacity without sacrificing their health."
          rows={2}
          {...register('elevatorPitch')}
        />
      </div>

      {/* Coaching Years — Q3 */}
      <div className="space-y-2">
        <Label htmlFor="coachingYears">
          How Long You&apos;ve Been Coaching <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Years of experience matter to clients. Include any related experience even before you called yourself a coach.
        </p>
        <Input
          id="coachingYears"
          placeholder="e.g. 8 years (5 as a personal trainer, 3 as a business coach)"
          {...register('coachingYears')}
        />
      </div>

      {/* Total Clients Coached — Q4 */}
      <div className="space-y-2">
        <Label htmlFor="totalClientsCoached">
          Clients You&apos;ve Worked With <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          An approximate number is fine. This shows up in your authority proof — people trust coaches with a track record.
        </p>
        <Input
          id="totalClientsCoached"
          placeholder="e.g. 200+ clients across group and 1:1 programs"
          {...register('totalClientsCoached')}
        />
      </div>

      {/* Businesses Built — Q5 */}
      <div className="space-y-2">
        <Label htmlFor="businessesBuiltList">
          Programs &amp; Businesses You&apos;ve Built <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          List every coaching program or business you&apos;ve built — name, who it was for, and rough revenue if you&apos;re comfortable. This is your credibility baseline.
        </p>
        <Textarea
          id="businessesBuiltList"
          placeholder={"e.g.\n- Elite Body Academy — fitness coaching for professionals, $400K revenue\n- The CEO Performance Program — 1:1 coaching for executives, launched 2021\n- Vigor Summit — annual live event, 300+ attendees"}
          rows={4}
          {...register('businessesBuiltList')}
        />
      </div>

      {/* Positions Held — Q6 */}
      <div className="space-y-2">
        <Label htmlFor="positionsHeld">
          Jobs &amp; Roles That Give You Credibility <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Former job titles, industries, or roles that make you worth listening to. Don&apos;t undersell yourself — experience outside coaching counts.
        </p>
        <Textarea
          id="positionsHeld"
          placeholder={"e.g.\n- Regional Sales Director, Fortune 500 company (10 years)\n- Division I college athlete\n- U.S. Army veteran, served 6 years"}
          rows={3}
          {...register('positionsHeld')}
        />
      </div>

      {/* Certifications — Q7 (relabeled from credentials) */}
      <div className="space-y-2">
        <Label htmlFor="certifications">
          Certifications, Degrees &amp; Formal Training <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Any letters after your name, degrees, or accredited training programs. Even if it feels obvious to you, your clients want to see it.
        </p>
        <Textarea
          id="certifications"
          placeholder={"e.g.\n- ICF-certified coach (ACC level)\n- Bachelor's in Exercise Science, Penn State\n- NASM Certified Personal Trainer"}
          rows={3}
          {...register('certifications')}
        />
      </div>

      {/* Media and Stages — Q8 */}
      <div className="space-y-2">
        <Label htmlFor="mediaAndStages">
          Books, Stages &amp; Media Features <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Any books you&apos;ve written, podcasts you&apos;ve appeared on, stages you&apos;ve spoken on, or press mentions. These build instant trust.
        </p>
        <Textarea
          id="mediaAndStages"
          placeholder={"e.g.\n- Author of The High-Performance Habit (2022)\n- Guest on The Tim Ferriss Show\n- Keynote speaker at CEO Summit 2023"}
          rows={3}
          {...register('mediaAndStages')}
        />
      </div>

      {/* Notable Associations — Q9 */}
      <div className="space-y-2">
        <Label htmlFor="notableAssociations">
          Well-Known Clients or People You&apos;ve Worked With <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Name-dropping isn&apos;t bragging when it&apos;s true. Notable clients, mentors, or programs you&apos;ve been part of transfer credibility to you.
        </p>
        <Textarea
          id="notableAssociations"
          placeholder={"e.g.\n- Coached 3 NFL athletes\n- Mentored under Tony Robbins Business Mastery program\n- Part of the John Whiting Coach Syndicate mastermind"}
          rows={3}
          {...register('notableAssociations')}
        />
      </div>

      {/* Twelve Month Vision — Q10 */}
      <div className="space-y-2">
        <Label htmlFor="twelveMonthVision">
          Your 12-Month Vision <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          What does your coaching business look like 12 months from now? Be specific — revenue, number of clients, what your days look like. This shapes the ambition behind your marketing.
        </p>
        <Textarea
          id="twelveMonthVision"
          placeholder={"e.g. A full roster of 20 high-ticket 1:1 clients at $3K/month, a group program with 50 members, and working 4 days a week from anywhere in the world."}
          rows={3}
          {...register('twelveMonthVision')}
        />
      </div>

      {/* Legacy credentials field — kept for backward compatibility */}
      <input type="hidden" {...register('credentials')} />

      {/* Legacy personalDetails field — hidden, synthesized from prior fields */}
      <input type="hidden" {...register('personalDetails')} />
    </div>
  )
}
