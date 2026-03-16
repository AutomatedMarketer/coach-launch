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

const CTA_LABELS: Record<string, string> = {
  application: 'Application Form — Pre-qualifies leads before you speak',
  booking: 'Book a Call — Direct calendar link, fastest path to sales',
  'dm-keyword': 'DM Keyword — Prospect DMs a word to trigger automation',
}

interface StepYourOfferProps {
  form: UseFormReturn<Record<string, unknown>>
}

export default function StepYourOffer({ form }: StepYourOfferProps) {
  const { register, formState: { errors }, watch, setValue } = form
  const ctaType = watch('ctaType') as string

  return (
    <div className="space-y-6">
      {/* Offer Name */}
      <div className="space-y-2">
        <Label htmlFor="offerName">Offer Name</Label>
        <p className="text-sm text-gray-500">
          Give your program a compelling, outcome-driven name that makes it feel
          like a branded system — not just &quot;coaching sessions.&quot;
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

      {/* Price Point */}
      <div className="space-y-2">
        <Label htmlFor="pricePoint">Price Point</Label>
        <p className="text-sm text-gray-500">
          Your price anchors your positioning. Include payment plan options if you offer them.
        </p>
        <Input
          id="pricePoint"
          placeholder="e.g. $4,997 one-time or 3 payments of $1,897"
          {...register('pricePoint')}
        />
        {errors.pricePoint && (
          <p className="text-sm text-red-500">{errors.pricePoint.message as string}</p>
        )}
      </div>

      {/* Transformation */}
      <div className="space-y-2">
        <Label htmlFor="transformation">The Before & After</Label>
        <p className="text-sm text-gray-500">
          Where do they start, and where do they end up? Be specific — &apos;20 lbs lighter in 90 days&apos; beats &apos;better health.&apos; Details matter.
        </p>
        <Textarea
          id="transformation"
          placeholder="e.g. BEFORE: Stuck at $5K-$8K/month, working 50+ hours, doing everything themselves. AFTER: Consistently hitting $15K-$25K/month, working 30 hours a week, team in place, automated lead gen running."
          rows={4}
          {...register('transformation')}
        />
        {errors.transformation && (
          <p className="text-sm text-red-500">{errors.transformation.message as string}</p>
        )}
      </div>

      {/* Aspiring Identity */}
      <div className="space-y-2">
        <Label htmlFor="aspiringIdentity">Their Next-Level Self</Label>
        <p className="text-sm text-gray-500">
          Not what they want to DO — who they want to BE. All your content sells this identity. What does the upgraded version of your client look like?
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

      {/* Unique Mechanism */}
      <div className="space-y-2">
        <Label htmlFor="uniqueMechanism">Your Proprietary System</Label>
        <p className="text-sm text-gray-500">
          Your method. Your framework. The thing that makes YOUR approach different. Give it a name — &apos;The 4 P&apos;s,&apos; &apos;The Bulletproof Protocol,&apos; whatever feels right. If you don&apos;t have one, we&apos;ll help you create it.
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
        <Label htmlFor="leadMagnetName">Lead Magnet Name</Label>
        <p className="text-sm text-gray-500">
          Your free resource that attracts leads into your funnel. Make the name specific
          and outcome-driven — it should feel like something they would pay for.
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

      {/* CTA Type */}
      <div className="space-y-2">
        <Label>Call-to-Action Type</Label>
        <p className="text-sm text-gray-500">
          How prospects take the next step after engaging with your content.
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

      {/* CTA Keyword — conditional */}
      {ctaType === 'dm-keyword' && (
        <div className="space-y-2">
          <Label htmlFor="ctaKeyword">DM Keyword</Label>
          <p className="text-sm text-gray-500">
            A short, memorable word. When someone DMs you this word, your automation kicks in.
          </p>
          <Input
            id="ctaKeyword"
            placeholder='e.g. "READY" or "SCALE" or "BLUEPRINT"'
            {...register('ctaKeyword')}
          />
        </div>
      )}
    </div>
  )
}
