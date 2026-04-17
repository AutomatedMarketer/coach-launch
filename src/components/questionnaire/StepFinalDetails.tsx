'use client'

import { useEffect } from 'react'
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
import DynamicArrayField from './DynamicArrayField'

interface StepFinalDetailsProps {
  form: UseFormReturn<Record<string, unknown>>
}

export default function StepFinalDetails({ form }: StepFinalDetailsProps) {
  const { register, formState: { errors }, watch, setValue } = form

  // ctaType comes from Step 5 (Your Program). We key the URL requirements off it.
  const ctaType = watch('ctaType') as string | undefined

  // Set defaults for Select fields only on first mount (if not already set from saved answers)
  useEffect(() => {
    if (!watch('brandVoice')) {
      setValue('brandVoice', 'motivational')
    }
    if (!watch('contentCadence')) {
      setValue('contentCadence', 'unsure')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6">
      {/* Expertise */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          These become your content pillars. What topics do you own? What would you get fired up about on stage? List them out.
        </p>
        <DynamicArrayField
          form={form}
          name="expertise"
          label="What Could You Talk About for 30 Minutes?"
          placeholder="e.g. Sales psychology, Offer creation, Client retention"
          addLabel="Add Topic"
        />
      </div>

      {/* Brand Voice */}
      <div className="space-y-2">
        <Label>How Do You Talk?</Label>
        <p className="text-sm text-gray-500">
          How should your marketing sound? Pick what feels most natural to how you
          talk on calls with clients.
        </p>
        <Select
          value={watch('brandVoice') as string || 'motivational'}
          onValueChange={(value) => setValue('brandVoice', value, { shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose your voice..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="motivational">Motivational — &apos;You can do this, let&apos;s go&apos;</SelectItem>
            <SelectItem value="tactical">Tactical — &apos;Here&apos;s exactly how, step by step&apos;</SelectItem>
            <SelectItem value="casual">Casual — &apos;Real talk, no BS&apos;</SelectItem>
            <SelectItem value="authoritative">Authoritative — &apos;Trust the process, I&apos;ve done this&apos;</SelectItem>
          </SelectContent>
        </Select>
        {errors.brandVoice && (
          <p className="text-sm text-red-500">{errors.brandVoice.message as string}</p>
        )}
      </div>

      {/* Content Cadence */}
      <div className="space-y-2">
        <Label>How Often Will You Post Content?</Label>
        <p className="text-sm text-gray-500">
          How frequently you plan to publish content. This helps us tailor your content playbook and posting schedule.
        </p>
        <Select
          value={watch('contentCadence') as string || 'unsure'}
          onValueChange={(value) => setValue('contentCadence', value, { shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose frequency..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="3-5-week">3-5 times per week</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="biweekly">Every other week</SelectItem>
            <SelectItem value="unsure">Not sure yet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Voice Notes (free-text addition to dropdown) */}
      <div className="space-y-2">
        <Label htmlFor="voiceNotes">
          Voice Notes <span className="text-slate-500 font-normal">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Want to get more specific? Describe how you actually talk to clients. Are you blunt?
          Sarcastic? Do you curse? Do you use sports metaphors? Give us a line you&apos;d
          actually say on a call.
        </p>
        <Textarea
          id="voiceNotes"
          placeholder="e.g. I'm pretty direct and I curse sometimes. I use sports and military analogies. I say things like 'stop being soft' and 'execute the play.' More like a no-BS older brother than a therapist."
          rows={3}
          {...register('voiceNotes')}
        />
      </div>

      {/* URLs — required fields vary by CTA type */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-300">Links</h3>
        {ctaType ? (
          <p className="text-xs text-slate-500 -mt-2">
            Your CTA type is <span className="text-amber-300">{ctaType}</span>.
            {ctaType === 'application' && ' Application URL is required — it anchors all your "apply now" CTAs in emails and ads.'}
            {ctaType === 'booking' && ' Offer / sales page URL is required — it\'s the destination for all "book a call" CTAs.'}
            {ctaType === 'dm-keyword' && ' No booking URL required — the DM keyword drives your automations.'}
          </p>
        ) : (
          <p className="text-xs -mt-2 rounded-md border border-amber-500/30 bg-amber-500/10 p-2 text-amber-300">
            ⚠ No CTA type selected yet on Step 5 (Your Program). Go back and choose one so we know which URL you actually need.
          </p>
        )}

        <div className="space-y-2">
          <Label htmlFor="offerDetailsUrl">
            Offer / Sales Page URL
            {ctaType === 'booking'
              ? <span className="text-red-400"> *</span>
              : <span className="text-slate-500 font-normal"> (optional)</span>}
          </Label>
          <Input
            id="offerDetailsUrl"
            type="url"
            placeholder="https://yoursite.com/offer"
            {...register('offerDetailsUrl')}
          />
          {errors.offerDetailsUrl && (
            <p className="text-sm text-red-500">{errors.offerDetailsUrl.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="applicationUrl">
            Application URL
            {ctaType === 'application'
              ? <span className="text-red-400"> *</span>
              : <span className="text-slate-500 font-normal"> (optional)</span>}
          </Label>
          <Input
            id="applicationUrl"
            type="url"
            placeholder="https://yoursite.com/apply"
            {...register('applicationUrl')}
          />
          {errors.applicationUrl && (
            <p className="text-sm text-red-500">{errors.applicationUrl.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="leadMagnetUrl">
            Lead Magnet Download URL <span className="text-red-400">*</span>
          </Label>
          <p className="text-sm text-gray-500">
            Direct link to your free resource. Used in welcome emails, DM automations, and any nurture sequence — so every lead can access it with one tap.
          </p>
          <Input
            id="leadMagnetUrl"
            type="url"
            placeholder="https://yoursite.com/guide"
            {...register('leadMagnetUrl')}
          />
          {errors.leadMagnetUrl && (
            <p className="text-sm text-red-500">{errors.leadMagnetUrl.message as string}</p>
          )}
        </div>
      </div>

      {/* Next step notice */}
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4 text-sm text-amber-300">
        <p className="font-medium">Almost there!</p>
        <p className="mt-1 text-amber-300/80">
          One more step — optional brand assets — then AI will create your complete marketing
          package.
        </p>
      </div>
    </div>
  )
}
