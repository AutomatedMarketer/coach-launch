'use client'

import {
  MessageCircleQuestion,
  Lightbulb,
  Sparkles,
  ClipboardList,
  Rocket,
  BarChart3,
  Mail,
} from 'lucide-react'

const FAQS = [
  {
    q: 'What is a niche?',
    a: 'Your niche is the specific group of people you help. Instead of "life coaching for everyone," think "performance coaching for burned-out tech managers." The more specific, the easier it is to attract the right clients.',
  },
  {
    q: 'What is a lead magnet?',
    a: 'A lead magnet is a free resource you offer in exchange for someone\'s email address. It could be a checklist, a short guide, a quiz, or a video training. It should solve a small but real problem for your ideal client.',
  },
  {
    q: 'What is a 4P Power Message?',
    a: 'Your 4P Power Message is your core marketing statement built around four elements: Pain (what they\'re struggling with), Promise (the outcome you deliver), Proof (why they should trust you), and Push (the call to action).',
  },
  {
    q: 'What if I don\'t have testimonials yet?',
    a: 'That\'s totally fine! Skip the testimonials field. If you\'ve helped anyone informally — friends, colleagues, beta clients — you can use those results as social proof instead.',
  },
  {
    q: 'What is a proprietary system?',
    a: 'It\'s YOUR branded method or framework that makes your coaching different. Give your approach a name — like "The Peak Protocol" or "The Revenue Ramp Method." It adds perceived value and makes you memorable.',
  },
  {
    q: 'How long does generation take?',
    a: 'Each phase takes 2-5 minutes to generate all deliverables. You\'ll see real-time progress as each piece is created. The AI builds content in dependency order — your core message first, then everything else flows from that.',
  },
  {
    q: 'Can I edit the generated content?',
    a: 'Yes! Every deliverable has an Edit button. You can modify any content, then save it. You can also regenerate any individual piece if you want a fresh version.',
  },
  {
    q: 'What are the 3 phases?',
    a: 'Phase 1 (Money Messaging) defines your audience and messaging. Phase 2 (Mind Shift Method) builds your persuasion framework and offer. Phase 3 (The Conversion Code) builds your sales script and marketing pages. Phase 4 (Authority Amplifier) creates your content system, ads, and automation.',
  },
]

const STEPS = [
  {
    icon: ClipboardList,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    title: 'Fill out the questionnaire',
    desc: 'Answer 5 steps of questions about your coaching business — who you help, your offer, and your story.',
  },
  {
    icon: Rocket,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    title: 'Generate your launch kit',
    desc: 'AI creates your complete marketing package across 3 phases — messaging, sales copy, and content.',
  },
  {
    icon: BarChart3,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    title: 'Review, edit, and export',
    desc: 'Read through every piece, make tweaks, and download as PDF or DOCX. Ready to publish.',
  },
]

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-400/15 flex items-center justify-center">
            <MessageCircleQuestion className="w-5 h-5 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Help Center</h1>
        </div>
        <p className="text-slate-400">
          Everything you need to know about using Coach Launch.
        </p>
      </div>

      {/* How it works */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">How It Works</h2>
        <ol className="space-y-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <li key={i} className="flex gap-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${step.bg} shrink-0`}>
                  <Icon className={`w-4 h-4 ${step.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <p className="text-sm text-slate-400 mt-0.5">{step.desc}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-5"
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white mb-1">{faq.q}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Need more help */}
      <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-5 text-center">
        <Sparkles className="w-6 h-6 text-amber-400 mx-auto mb-2" />
        <p className="text-sm font-semibold text-white mb-1">Still have questions?</p>
        <p className="text-sm text-slate-400 mb-3">
          Use the Coach Helper chat button in the bottom right corner — it can answer any question about the questionnaire in real time.
        </p>
        <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
          <Mail className="w-3 h-3" />
          Or contact support at steve@coachlaunch.com
        </p>
      </div>
    </div>
  )
}
