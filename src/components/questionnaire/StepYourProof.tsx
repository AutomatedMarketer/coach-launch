'use client'

import { type UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import DynamicObjectArrayField from './DynamicObjectArrayField'

const CTA_LABELS: Record<string, string> = {
  application: 'Application Form — Pre-qualifies leads before you speak',
  booking: 'Book a Call — Direct calendar link, fastest path to sales',
  'dm-keyword': 'DM Keyword — Prospect DMs a word to trigger automation',
}

interface StepYourProofProps {
  form: UseFormReturn<Record<string, unknown>>
}

export default function StepYourProof({ form }: StepYourProofProps) {
  const { register, formState: { errors }, watch, setValue } = form
  const ctaType = watch('ctaType') as string

  return (
    <div className="space-y-6">

      {/* Q41 — Offer Name */}
      <div className="space-y-2">
        <Label htmlFor="offerName">What is your program called?</Label>
        <p className="text-sm text-gray-500">
          Give your program a compelling, outcome-driven name. It should feel like a branded system — not just &quot;coaching sessions.&quot;
        </p>
        <Input
          id="offerName"
          placeholder='e.g. "The 90-Day Revenue Accelerator" or "Unstoppable Coach Blueprint"'
          {...register('offerName')}
        />
        {errors.offerName && (
          <p className="text-sm text-red-500">{errors.offerName.message as string}</p>
        )}
      </div>

      {/* Q42 — Program Phases */}
      <DynamicObjectArrayField
        form={form}
        name="programPhases"
        label="Describe each phase — name, what happens, outcome (min 2)"
        emptyMessage="Break your program into 2–5 phases. For each one: what it's called, what happens during it, and what the client walks away with."
        addLabel="Add Phase"
        fields={[
          { key: 'phaseName', label: 'Phase Name', placeholder: 'e.g. Money Messaging' },
          { key: 'description', label: 'What Happens', placeholder: 'e.g. We define your audience, craft your core message, and build your positioning', type: 'textarea' },
          { key: 'outcome', label: 'Outcome', placeholder: 'e.g. Crystal-clear positioning that attracts dream clients' },
        ]}
      />

      {/* Q43 — Done For You */}
      <div className="space-y-2">
        <Label htmlFor="doneForYou">
          What does your team do FOR the client? <span className="text-slate-500 font-normal">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          What gets built or set up on their behalf? Think: funnels, ads, copy, tech setup, automations. Anything the client does NOT have to do themselves.
        </p>
        <Textarea
          id="doneForYou"
          placeholder="e.g. We build your entire funnel, write your ad copy, set up your CRM automations, and create your lead magnet — done for you, ready to launch."
          rows={3}
          {...register('doneForYou')}
        />
      </div>

      {/* Q44 — Taught Skills */}
      <div className="space-y-2">
        <Label htmlFor="taughtSkills">
          What do you personally teach the client to do? <span className="text-slate-500 font-normal">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          What skills does the client walk away with? What can they do themselves after working with you that they couldn&apos;t before?
        </p>
        <Textarea
          id="taughtSkills"
          placeholder="e.g. How to close high-ticket sales over the phone, how to run their own Facebook ads, how to lead their team effectively."
          rows={3}
          {...register('taughtSkills')}
        />
      </div>

      {/* Q45 — Billboard Result */}
      <div className="space-y-2">
        <Label htmlFor="billboardResult">
          The single most important result <span className="text-slate-500 font-normal">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          If you had one sentence on a billboard, what would it say? The one outcome that makes everything else click — specific, vivid, undeniable.
        </p>
        <Input
          id="billboardResult"
          placeholder='e.g. "Go from $5K/month to $25K/month in 90 days — without burning out or running ads."'
          {...register('billboardResult')}
        />
      </div>

      {/* Q46 — Bonuses */}
      <div className="space-y-2">
        <Label htmlFor="bonuses">
          Bonuses, extras, or additional support <span className="text-slate-500 font-normal">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          What do clients get beyond the core program? Templates, community access, bonus calls, tools, swipe files — anything that adds perceived value.
        </p>
        <Textarea
          id="bonuses"
          placeholder="e.g. Private Slack community, monthly hot-seat calls, done-for-you email templates, lifetime access to the resource vault."
          rows={3}
          {...register('bonuses')}
        />
      </div>

      {/* Q47 — Client Capacity */}
      <div className="space-y-2">
        <Label htmlFor="clientCapacity">
          How many clients do you take at one time — and why? <span className="text-slate-500 font-normal">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Capacity limits create scarcity and signal high-touch quality. If you have a cap, say what it is and the reason behind it.
        </p>
        <Input
          id="clientCapacity"
          placeholder='e.g. "I work with a maximum of 10 clients at a time so everyone gets direct access to me."'
          {...register('clientCapacity')}
        />
      </div>

      {/* Q48 — Price Point */}
      <div className="space-y-2">
        <Label htmlFor="pricePoint">What does it cost — pay-in-full and payment plan?</Label>
        <p className="text-sm text-gray-500">
          Your price anchors your positioning. Include both options if you offer them — prospects often choose the plan even when they can pay in full.
        </p>
        <Input
          id="pricePoint"
          placeholder="e.g. $4,997 pay-in-full or 3 payments of $1,897"
          {...register('pricePoint')}
        />
        {errors.pricePoint && (
          <p className="text-sm text-red-500">{errors.pricePoint.message as string}</p>
        )}
      </div>

      {/* Q49 — Guarantee / Risk Reversal */}
      <div className="space-y-2">
        <Label htmlFor="guaranteeOrRisk">
          What do you guarantee — and what don&apos;t you? <span className="text-slate-500 font-normal">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Be honest about what you stand behind and where responsibility falls on the client. This goes directly into your sales script and offer pages.
        </p>
        <Textarea
          id="guaranteeOrRisk"
          placeholder={'e.g. "I guarantee my process — if you show up, do the work, and follow the system, you will see results. I don\'t guarantee income because I can\'t control your execution."'}
          rows={3}
          {...register('guaranteeOrRisk')}
        />
      </div>

      {/* Program Duration */}
      <div className="space-y-2">
        <Label htmlFor="programDuration">How long is your program?</Label>
        <p className="text-sm text-gray-500">
          Be specific — &apos;12-month mentorship&apos; sets different expectations than &apos;90-day sprint.&apos; This shows up in your sales copy, emails, and ads.
        </p>
        <Input
          id="programDuration"
          placeholder='e.g. "90 days" or "12 months" or "6-month program with lifetime community access"'
          {...register('programDuration')}
        />
        {errors.programDuration && (
          <p className="text-sm text-red-500">{errors.programDuration.message as string}</p>
        )}
      </div>

      {/* Program Includes */}
      <div className="space-y-2">
        <Label htmlFor="programIncludes">What&apos;s included?</Label>
        <p className="text-sm text-gray-500">
          List what clients actually get. Specific beats vague — this shows up on your offer pages, sales scripts, and ads.
        </p>
        <Textarea
          id="programIncludes"
          placeholder="e.g. 2x monthly 1-on-1 calls, private Slack community, weekly group coaching, done-for-you templates, Voxer access between calls"
          rows={3}
          {...register('programIncludes')}
        />
        {errors.programIncludes && (
          <p className="text-sm text-red-500">{errors.programIncludes.message as string}</p>
        )}
      </div>

      {/* Transformation */}
      <div className="space-y-2">
        <Label htmlFor="transformation">The before &amp; after</Label>
        <p className="text-sm text-gray-500">
          Where do they start, and where do they end up? &apos;20 lbs lighter in 90 days&apos; beats &apos;better health.&apos; Be specific — the more vivid, the more powerful.
        </p>
        <Textarea
          id="transformation"
          placeholder="e.g. BEFORE: Stuck at $5K–$8K/month, working 50+ hours, doing everything themselves. AFTER: Consistently hitting $15K–$25K/month, working 30 hours/week, team in place, automated lead gen running."
          rows={4}
          {...register('transformation')}
        />
        {errors.transformation && (
          <p className="text-sm text-red-500">{errors.transformation.message as string}</p>
        )}
      </div>

      {/* Unique Mechanism */}
      <div className="space-y-2">
        <Label htmlFor="uniqueMechanism">Your proprietary system</Label>
        <p className="text-sm text-gray-500">
          Your method. Your framework. The thing that makes YOUR approach different from every other coach. Give it a name — &apos;The 4 P&apos;s,&apos; &apos;The Bulletproof Protocol,&apos; whatever fits. If you don&apos;t have one yet, describe how your process works and we&apos;ll help name it.
        </p>
        <Textarea
          id="uniqueMechanism"
          placeholder='e.g. "The Revenue Ramp Method" — a 4-phase system: Phase 1: Offer Architecture. Phase 2: Audience Magnetism. Phase 3: Conversion Engine. Phase 4: Scale Systems.'
          rows={4}
          {...register('uniqueMechanism')}
        />
        {errors.uniqueMechanism && (
          <p className="text-sm text-red-500">{errors.uniqueMechanism.message as string}</p>
        )}
      </div>

      {/* Lead Magnet Name */}
      <div className="space-y-2">
        <Label htmlFor="leadMagnetName">Lead magnet name</Label>
        <p className="text-sm text-gray-500">
          Your free resource that pulls leads into your funnel. Make the name specific and outcome-driven — it should feel like something they would pay for.
        </p>
        <Input
          id="leadMagnetName"
          placeholder='e.g. "The 7-Figure Coach Checklist: 12 Things You Need Before You Scale Past $10K/Month"'
          {...register('leadMagnetName')}
        />
        {errors.leadMagnetName && (
          <p className="text-sm text-red-500">{errors.leadMagnetName.message as string}</p>
        )}
      </div>

      {/* Lead Magnet Format */}
      <div className="space-y-2">
        <Label>Lead magnet format <span className="text-slate-500 font-normal">(optional)</span></Label>
        <p className="text-sm text-gray-500">
          What type of free resource is it? This shapes how the content is structured inside your funnel.
        </p>
        <Select
          value={watch('leadMagnetType') as string || ''}
          onValueChange={(value) => setValue('leadMagnetType', value, { shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose format..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pdf-guide">PDF Guide</SelectItem>
            <SelectItem value="checklist">Checklist</SelectItem>
            <SelectItem value="framework">Framework / Template</SelectItem>
            <SelectItem value="mini-course">Mini-Course (video/email)</SelectItem>
            <SelectItem value="quiz">Quiz / Assessment</SelectItem>
            <SelectItem value="video-series">Video Series</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* CTA Type */}
      <div className="space-y-2">
        <Label>Call-to-action type</Label>
        <p className="text-sm text-gray-500">
          How do prospects take the next step after seeing your content or ads?
        </p>
        <Select
          value={ctaType || ''}
          onValueChange={(value) => setValue('ctaType', value, { shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose CTA type...">
              {ctaType ? CTA_LABELS[ctaType] || ctaType : undefined}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="application">Application Form — Pre-qualifies leads before you speak</SelectItem>
            <SelectItem value="booking">Book a Call — Direct calendar link, fastest path to sales</SelectItem>
            <SelectItem value="dm-keyword">DM Keyword — Prospect DMs a word to trigger automation</SelectItem>
          </SelectContent>
        </Select>
        {errors.ctaType && (
          <p className="text-sm text-red-500">{errors.ctaType.message as string}</p>
        )}
      </div>

      {/* CTA Keyword — conditional on dm-keyword */}
      {ctaType === 'dm-keyword' && (
        <div className="space-y-2">
          <Label htmlFor="ctaKeyword">DM keyword</Label>
          <p className="text-sm text-gray-500">
            A short, memorable word. When someone DMs you this word, your automation kicks in and handles the follow-up.
          </p>
          <Input
            id="ctaKeyword"
            placeholder='e.g. "READY" or "SCALE" or "BLUEPRINT"'
            {...register('ctaKeyword')}
          />
        </div>
      )}

      {/* Revenue Per Client */}
      <div className="space-y-2">
        <Label htmlFor="revenuePerClient">
          Average client lifetime value <span className="text-slate-500 font-normal">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          How much is one client worth to your business over the full relationship? Used for ROI math in your pricing and sales copy.
        </p>
        <Input
          id="revenuePerClient"
          placeholder="e.g. $5,000 or $12,000 over 12 months"
          {...register('revenuePerClient')}
        />
      </div>

    </div>
  )
}
