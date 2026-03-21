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

  // Set defaults for Select fields (fixes validation bug where
  // the Select displays a value but the form value is undefined)
  useEffect(() => {
    if (!watch('brandVoice')) {
      setValue('brandVoice', 'motivational')
    }
    if (!watch('contentCadence')) {
      setValue('contentCadence', 'unsure')
    }
  }, [watch, setValue])

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

      {/* URLs (optional) */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-300">
          Links <span className="text-slate-500">(optional — skip if you don&apos;t have these yet)</span>
        </h3>

        <div className="space-y-2">
          <Label htmlFor="offerDetailsUrl">Offer / Sales Page URL</Label>
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
          <Label htmlFor="applicationUrl">Application / Booking URL</Label>
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
