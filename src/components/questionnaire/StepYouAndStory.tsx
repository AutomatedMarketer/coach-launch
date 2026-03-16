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

      {/* Personal Story */}
      <div className="space-y-2">
        <Label htmlFor="personalStory">Your &apos;Why&apos; Story</Label>
        <p className="text-sm text-gray-500">
          What&apos;s the moment everything changed for you? The story that made you say &apos;I need to help people with this.&apos; Be real — your clients connect with the struggle, not perfection.
        </p>
        <Textarea
          id="personalStory"
          placeholder="e.g. I spent 12 years in corporate finance, climbing the ladder and earning six figures — but I was burned out, 30 pounds overweight, and my marriage was falling apart. After a health scare at 38, I discovered a framework that transformed my energy, my relationships, and eventually my career. Within a year I had completely rebuilt my life, and I started coaching because I realized the system I built could work for anyone stuck in the same cycle I was in."
          rows={5}
          {...register('personalStory')}
        />
        {errors.personalStory && (
          <p className="text-sm text-red-500">{errors.personalStory.message as string}</p>
        )}
      </div>

      {/* Credentials (optional) */}
      <div className="space-y-2">
        <Label htmlFor="credentials">
          Your Proof <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Certifications, years in the game, clients helped, media features — whatever makes people go &apos;okay, this person knows their shit.&apos;
        </p>
        <Textarea
          id="credentials"
          placeholder="e.g. ICF-certified coach, 8 years of experience, helped 200+ clients. Featured on The Coaching Edge podcast."
          rows={3}
          {...register('credentials')}
        />
      </div>

      {/* Personal Details (optional) */}
      <div className="space-y-2">
        <Label htmlFor="personalDetails">
          The Human Side <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Where you live, family, hobbies — the stuff that makes you a real person, not just a coach logo.
        </p>
        <Input
          id="personalDetails"
          placeholder="e.g. Based in Austin, TX. Married with two kids. Ultramarathon runner."
          {...register('personalDetails')}
        />
      </div>
    </div>
  )
}
