'use client'

import { type UseFormReturn } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface StepDeepPsychologyProps {
  form: UseFormReturn<Record<string, unknown>>
}

export default function StepDeepPsychology({ form }: StepDeepPsychologyProps) {
  const { register } = form

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 mb-2">
        <p className="text-sm text-amber-200/80">
          These questions go deep into what your ideal client is <strong>really</strong> thinking and feeling.
          The more specific you are here, the better your sales copy, emails, and ads will resonate.
          Everything here is optional — but the more you fill in, the less the AI has to guess.
        </p>
      </div>

      {/* Q31: Client Excuse */}
      <div className="space-y-2">
        <Label htmlFor="clientExcuse">
          What story do they tell themselves? <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          What excuse do they keep coming back to for why they haven&apos;t fixed this yet? This is the narrative they repeat to justify staying stuck.
        </p>
        <Textarea
          id="clientExcuse"
          placeholder={"e.g. I just need to figure it out on my own first, I need more experience before I can charge more, The timing isn't right"}
          rows={3}
          {...register('clientExcuse')}
        />
      </div>

      {/* Q32: Secret Desire */}
      <div className="space-y-2">
        <Label htmlFor="clientSecretDesire">
          What do they secretly want but won&apos;t admit? <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          The thing they want from their coaching business that they&apos;d be embarrassed to say out loud. This is gold for sales copy.
        </p>
        <Textarea
          id="clientSecretDesire"
          placeholder='e.g. "They want to be seen as a thought leader. They want people to look up to them. They want the financial freedom to buy a house on the beach."'
          rows={3}
          {...register('clientSecretDesire')}
        />
      </div>

      {/* Q33: False Problem */}
      <div className="space-y-2">
        <Label htmlFor="clientFalseProblem">
          What do they THINK the problem is? <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          What they believe is holding them back — that you know is NOT the real issue. This powers your &quot;Real Problem Reveal&quot; in sales content.
        </p>
        <Textarea
          id="clientFalseProblem"
          placeholder={"e.g. They think they need a better website, more followers, or a viral post. They think it's a marketing problem."}
          rows={3}
          {...register('clientFalseProblem')}
        />
      </div>

      {/* Q34: Real Problem */}
      <div className="space-y-2">
        <Label htmlFor="clientRealProblem">
          What is the REAL problem underneath? <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          The actual issue they won&apos;t admit publicly. This is what you actually fix — and it&apos;s what makes your sales script land.
        </p>
        <Textarea
          id="clientRealProblem"
          placeholder={"e.g. They don't have a clear offer, they're afraid of selling, and they have no system for getting clients. It's a confidence and clarity problem, not a marketing problem."}
          rows={3}
          {...register('clientRealProblem')}
        />
      </div>

      {/* Q35: Secret Fear */}
      <div className="space-y-2">
        <Label htmlFor="clientSecretFear">
          What are they most afraid of? <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          The fear they&apos;d never say out loud — not even to their spouse. This drives urgency in your email sequences.
        </p>
        <Textarea
          id="clientSecretFear"
          placeholder={"e.g. They're afraid they'll have to go back to their old job. They're afraid they're not good enough to charge premium prices. They're afraid their spouse is losing faith in them."}
          rows={3}
          {...register('clientSecretFear')}
        />
      </div>

      {/* Q36: Anger Trigger */}
      <div className="space-y-2">
        <Label htmlFor="clientAngerTrigger">
          What makes them genuinely angry? <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Specific things about their situation that piss them off. Anger is a powerful emotional trigger in content.
        </p>
        <Textarea
          id="clientAngerTrigger"
          placeholder='e.g. "Seeing less experienced coaches charging 3x what they charge. Gurus selling $47 courses that teach outdated methods. People who got lucky with one viral post acting like experts."'
          rows={3}
          {...register('clientAngerTrigger')}
        />
      </div>

      {/* Q37: Blame Target */}
      <div className="space-y-2">
        <Label htmlFor="clientBlameTarget">
          Who or what do they blame? <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Who is the enemy in their mind? The algorithm, their market, their location, their past coach? This feeds the &quot;Us vs. Them&quot; framing in your content.
        </p>
        <Textarea
          id="clientBlameTarget"
          placeholder='e.g. "They blame the algorithm, the saturated market, their last coach who took their money and disappeared, or the economy"'
          rows={3}
          {...register('clientBlameTarget')}
        />
      </div>

      {/* Q38: Guilt/Shame */}
      <div className="space-y-2">
        <Label htmlFor="clientGuiltShame">
          What do they feel guilty or ashamed about? <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Shame is the most powerful hidden emotion. What are they embarrassed about when it comes to their coaching business?
        </p>
        <Textarea
          id="clientGuiltShame"
          placeholder={"e.g. They feel guilty for not providing better for their family. Ashamed that they told everyone they were going to build a coaching business and it still isn't working. Embarrassed by their income compared to their peers."}
          rows={3}
          {...register('clientGuiltShame')}
        />
      </div>

      {/* Q39: Daily Reminder */}
      <div className="space-y-2">
        <Label htmlFor="clientDailyReminder">
          What do they see every day that reminds them? <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          What do they encounter daily that makes them feel behind or stuck? This creates vivid, relatable hooks for social content.
        </p>
        <Textarea
          id="clientDailyReminder"
          placeholder='e.g. "They see other coaches posting wins on Instagram. They check their bank account and feel the pit in their stomach. They open their calendar and see empty client slots."'
          rows={3}
          {...register('clientDailyReminder')}
        />
      </div>

      {/* Q40: Inaction Consequence */}
      <div className="space-y-2">
        <Label htmlFor="clientInactionConsequence">
          If they do nothing — what does life look like in 3 years? <span className="text-slate-500">(optional)</span>
        </Label>
        <p className="text-sm text-gray-500">
          Paint the picture of staying stuck. This is the &quot;cost of inaction&quot; that drives urgency in your sales emails and closing scripts.
        </p>
        <Textarea
          id="clientInactionConsequence"
          placeholder={"e.g. Still at the same income, maybe worse. Probably back at a 9-5 they hate. Marriage more strained. Health worse from stress. Watching other coaches pass them by."}
          rows={3}
          {...register('clientInactionConsequence')}
        />
      </div>
    </div>
  )
}
