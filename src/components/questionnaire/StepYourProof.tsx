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
import FieldSuggestion from './FieldSuggestion'

const CTA_LABELS: Record<string, string> = {
  application: 'Application Form — Pre-qualifies leads before you speak',
  booking: 'Book a Call — Direct calendar link, fastest path to sales',
  'dm-keyword': 'DM Keyword — Prospect DMs a word to trigger automation',
}

interface StepYourProofProps {
  form: UseFormReturn<Record<string, unknown>>
}

interface PricingValue {
  totalUSD?: number
  billingType?: 'one-time' | 'subscription' | 'installments'
  displayString?: string
  paymentPlanCount?: number
  pifDiscountPercent?: number
}

export default function StepYourProof({ form }: StepYourProofProps) {
  const { register, formState: { errors }, watch, setValue } = form
  const ctaType = watch('ctaType') as string
  const pricing = (watch('pricing') || {}) as PricingValue
  const pricingErrors = errors.pricing as Record<string, { message?: string }> | undefined

  const updatePricing = (patch: Partial<PricingValue>) => {
    setValue('pricing', { ...pricing, ...patch }, { shouldValidate: true, shouldDirty: true })
  }

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

      {/* Q48 — Pricing (structured) */}
      <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-900/30 p-4">
        <div>
          <Label className="text-base">What does your program cost?</Label>
          <p className="text-sm text-gray-500 mt-1">
            Enter the total price as a number so we can compute payment plans and pay-in-full discounts without guessing. The display string is exactly how we&apos;ll quote the price on your pages and in copy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="pricing.totalUSD" className="text-sm">Total price (USD)</Label>
            <Input
              id="pricing.totalUSD"
              type="number"
              min={1}
              placeholder="e.g. 4997"
              value={pricing.totalUSD ?? ''}
              onChange={(e) => updatePricing({ totalUSD: e.target.value === '' ? undefined : Number(e.target.value) })}
            />
            {pricingErrors?.totalUSD?.message && (
              <p className="text-sm text-red-500">{pricingErrors.totalUSD.message as string}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-sm">Billing type</Label>
            <Select
              value={pricing.billingType || ''}
              onValueChange={(value) => updatePricing({ billingType: value as PricingValue['billingType'] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose billing type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one-time">One-time payment</SelectItem>
                <SelectItem value="subscription">Recurring subscription</SelectItem>
                <SelectItem value="installments">Installments / payment plan</SelectItem>
              </SelectContent>
            </Select>
            {pricingErrors?.billingType?.message && (
              <p className="text-sm text-red-500">{pricingErrors.billingType.message as string}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="pricing.displayString" className="text-sm">How you display the price</Label>
          <Input
            id="pricing.displayString"
            placeholder='e.g. "$4,997 for 6 months (or 3 payments of $1,897)"'
            value={pricing.displayString || ''}
            onChange={(e) => updatePricing({ displayString: e.target.value })}
          />
          {pricingErrors?.displayString?.message && (
            <p className="text-sm text-red-500">{pricingErrors.displayString.message as string}</p>
          )}
        </div>

        {pricing.billingType === 'installments' && (
          <div className="space-y-1">
            <Label htmlFor="pricing.paymentPlanCount" className="text-sm">Number of monthly payments</Label>
            <Input
              id="pricing.paymentPlanCount"
              type="number"
              min={1}
              max={24}
              placeholder="e.g. 3, 6, or 12"
              value={pricing.paymentPlanCount ?? ''}
              onChange={(e) => updatePricing({ paymentPlanCount: e.target.value === '' ? undefined : Number(e.target.value) })}
            />
            {pricingErrors?.paymentPlanCount?.message && (
              <p className="text-sm text-red-500">{pricingErrors.paymentPlanCount.message as string}</p>
            )}
          </div>
        )}

        <div className="space-y-1">
          <Label htmlFor="pricing.pifDiscountPercent" className="text-sm">
            Pay-in-full discount (%) <span className="text-slate-500 font-normal">— optional, default 0</span>
          </Label>
          <Input
            id="pricing.pifDiscountPercent"
            type="number"
            min={0}
            max={30}
            placeholder="e.g. 10"
            value={pricing.pifDiscountPercent ?? ''}
            onChange={(e) => updatePricing({ pifDiscountPercent: e.target.value === '' ? 0 : Number(e.target.value) })}
          />
          {pricingErrors?.pifDiscountPercent?.message && (
            <p className="text-sm text-red-500">{pricingErrors.pifDiscountPercent.message as string}</p>
          )}
        </div>
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

      {/* Guarantee Timeframe (v6b — required if guaranteeOrRisk is set) */}
      {(() => {
        const g = watch('guaranteeOrRisk')
        return typeof g === 'string' && g.trim().length > 0
      })() && (
        <div className="space-y-2">
          <Label htmlFor="guaranteeTimeframe">
            Guarantee timeframe <span className="text-red-400">*</span>
          </Label>
          <p className="text-sm text-gray-500">
            How long does the guarantee last? The AI quotes this verbatim in your guarantee copy. Without it, we get &quot;30 days&quot; or &quot;90 days&quot; invented.
          </p>
          <Input
            id="guaranteeTimeframe"
            placeholder='e.g. "first 60 days of the program" or "first 90 days" or "through the end of month 4"'
            {...register('guaranteeTimeframe')}
          />
          {errors.guaranteeTimeframe && (
            <p className="text-sm text-red-500">{errors.guaranteeTimeframe.message as string}</p>
          )}
        </div>
      )}

      {/* Fast-Action Bonus Deadline (v6b — optional) */}
      <div className="space-y-2">
        <Label htmlFor="fastActionBonusDeadline">
          Fast-action bonus deadline <span className="text-slate-500 font-normal">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          When does the &quot;enroll fast, get this bonus&quot; window close? Used verbatim in pricing pages and sales call scripts. Leave blank if you don&apos;t run a fast-action bonus.
        </p>
        <Input
          id="fastActionBonusDeadline"
          placeholder='e.g. "72 hours from discovery call" or "within 48 hours of this email" or "by midnight Friday"'
          {...register('fastActionBonusDeadline')}
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

      {/* First Result Timeframe (v6a — required) */}
      <div className="space-y-2">
        <Label htmlFor="firstResultTimeframe">
          When do clients see their first measurable win? <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          Be specific. The AI quotes this verbatim across emails, ads, and pricing pages. Vague answers become invented &quot;within 90 days&quot; timeframes that aren&apos;t yours.
        </p>
        <Input
          id="firstResultTimeframe"
          placeholder='e.g. "within 14 days" or "by end of week 2" or "in the first 30 days — most clients report 2-3 qualified leads"'
          {...register('firstResultTimeframe')}
        />
        <FieldSuggestion
          fieldName="firstResultTimeframe"
          answers={form.getValues() as Record<string, unknown>}
          onAccept={(val) => form.setValue('firstResultTimeframe', val, { shouldValidate: true, shouldDirty: true })}
        />
        {errors.firstResultTimeframe && (
          <p className="text-sm text-red-500">{errors.firstResultTimeframe.message as string}</p>
        )}
      </div>

      {/* Target Client Monthly Revenue (v6a — required) */}
      <div className="space-y-2">
        <Label htmlFor="targetClientMonthlyRevenue">
          What does a typical client earn or achieve after the program? <span className="text-red-400">*</span>
        </Label>
        <p className="text-sm text-gray-500">
          If your niche is revenue-based, give the dollar range. If it&apos;s not (fitness, relationships, health), describe the typical outcome in numbers. Powers all ROI, value-gap, and transformation copy.
        </p>
        <Input
          id="targetClientMonthlyRevenue"
          placeholder='e.g. "$15K-$30K/month" or "20+ qualified leads per week" or "30-45 lbs lost by month 6"'
          {...register('targetClientMonthlyRevenue')}
        />
        <FieldSuggestion
          fieldName="targetClientMonthlyRevenue"
          answers={form.getValues() as Record<string, unknown>}
          onAccept={(val) => form.setValue('targetClientMonthlyRevenue', val, { shouldValidate: true, shouldDirty: true })}
        />
        {errors.targetClientMonthlyRevenue && (
          <p className="text-sm text-red-500">{errors.targetClientMonthlyRevenue.message as string}</p>
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
