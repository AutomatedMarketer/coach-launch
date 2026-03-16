'use client'

import { useEffect } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
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

  // Set default brandVoice if not already set (fixes validation bug where
  // the Select displays "motivational" but the form value is undefined)
  useEffect(() => {
    if (!watch('brandVoice')) {
      setValue('brandVoice', 'motivational')
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
