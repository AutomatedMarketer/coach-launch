import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import {
  Zap,
  CheckCircle2,
  FileText,
  Mail,
  MessageSquare,
  Target,
  BookOpen,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Share2,
  ClipboardList,
} from 'lucide-react'

export const metadata: Metadata = {
  title: "Coach Launch — Launch Your Coaching Business in Minutes with AI",
  description:
    "Answer 8 simple questions about your coaching business and get a complete, ready-to-publish marketing package — website copy, email sequences, social posts, ad copy, and 26 professional deliverables. Built on a proven coaching framework.",
  openGraph: {
    title: "Launch Your Coaching Business in Minutes, Not Months",
    description:
      "AI-powered marketing package generator for coaches. Website copy, emails, social posts, ad copy — all generated from one short questionnaire.",
    url: "/",
  },
  twitter: {
    title: "Launch Your Coaching Business in Minutes, Not Months",
    description:
      "AI-powered marketing package generator for coaches. 26 deliverables from one short questionnaire.",
  },
  alternates: {
    canonical: "/",
  },
}

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Coach Launch",
        "url": process.env.NEXT_PUBLIC_SITE_URL || "https://coachlaunch.app",
        "description":
          "AI-powered marketing package generator for coaching businesses. Answer a questionnaire and receive 26 ready-to-publish deliverables.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Free to get started. No credit card required.",
        },
        "creator": {
          "@type": "Person",
          "name": "Steve Krebs",
        },
        "featureList": [
          "AI-generated homepage copy",
          "Email welcome and sales sequences",
          "Facebook posts and ad copy",
          "Lead magnet outline",
          "Sales call script",
          "YouTube and Shorts/Reels scripts",
          "GHL and ManyChat automation sequences",
        ],
      },
      {
        "@type": "Organization",
        "name": "Coach Launch",
        "url": process.env.NEXT_PUBLIC_SITE_URL || "https://coachlaunch.app",
        "founder": {
          "@type": "Person",
          "name": "Steve Krebs",
        },
      },
      {
        "@type": "HowTo",
        "name": "How to Launch Your Coaching Business with Coach Launch",
        "description":
          "Three simple steps to generate a complete marketing package for your coaching business.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Answer Questions About Your Business",
            "text": "Walk through our guided questionnaire. Tell us who you help, your method, and your offers. Takes less than five minutes.",
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "AI Generates Your Full Marketing Package",
            "text": "Our AI — trained on proven coaching frameworks — writes your homepage, emails, social posts, ad copy, and more in seconds.",
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Launch With Confidence",
            "text": "Download everything, plug it into your tools, and go live. No copywriter needed. No months of delays.",
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div
      className="min-h-screen bg-[#0a0f1e] text-white"
      style={{ fontFamily: 'var(--font-geist-sans)' }}
    >
      <JsonLd />

      {/* ── NAV ── */}
      <header>
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto" aria-label="Main navigation">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="font-semibold text-lg tracking-tight">Coach Launch</span>
        </div>
        <Button
          size="sm"
          render={<Link href="/login" />}
          className="bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold px-5 rounded-full"
        >
          Get Started
        </Button>
      </nav>
      </header>

      <main>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-6 pt-24 pb-32 text-center max-w-5xl mx-auto">

        {/* Background glow blobs */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute top-24 left-1/4 w-[300px] h-[300px] rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 mb-8">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          Powered by Advanced AI — Built on a Proven Framework
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
          Launch Your Coaching Business{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
            in Minutes, Not Months.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
          Answer 8 simple questions about your coaching business. Coach Launch
          uses AI to instantly generate your complete marketing package —
          website copy, emails, social posts, ad copy, and more. Ready to
          publish from day one.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            render={<Link href="/login" />}
            className="bg-amber-400 text-zinc-900 hover:bg-amber-300 font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-amber-500/20 flex items-center gap-2"
          >
            Generate My Marketing Package
            <ArrowRight className="w-4 h-4" />
          </Button>
          <span className="text-slate-500 text-sm">Free to get started. No credit card required.</span>
        </div>

        {/* Stat strip */}
        <div className="mt-16 flex flex-wrap justify-center gap-10 text-center">
          {[
            { value: '26', label: 'Marketing Deliverables Generated' },
            { value: '< 5 min', label: 'To Complete the Questionnaire' },
            { value: '100%', label: 'Ready to Publish' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-extrabold text-amber-400">{value}</p>
              <p className="text-sm text-slate-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-24 max-w-5xl mx-auto" aria-labelledby="how-it-works">
        <div className="text-center mb-14">
          <p className="text-amber-400 font-semibold tracking-widest text-sm uppercase mb-3">How It Works</p>
          <h2 id="how-it-works" className="text-3xl sm:text-4xl font-bold">Three Steps to Your Complete Coaching Marketing Package</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              icon: <ClipboardList className="w-6 h-6 text-amber-400" />,
              title: 'Answer Questions About Your Business',
              description:
                'Walk through our guided 8-step questionnaire. Tell us who you help, your method, and your offers. Takes less than five minutes.',
            },
            {
              step: '02',
              icon: <Sparkles className="w-6 h-6 text-amber-400" />,
              title: 'AI Generates Your Full Marketing Package',
              description:
                'Our AI — trained on proven coaching frameworks — writes your homepage, emails, social posts, ad copy, and more in seconds.',
            },
            {
              step: '03',
              icon: <Zap className="w-6 h-6 text-amber-400" />,
              title: 'Launch With Confidence',
              description:
                'Download everything, plug it into your tools, and go live. No copywriter needed. No months of delays.',
            },
          ].map(({ step, icon, title, description }) => (
            <div
              key={step}
              className="relative rounded-2xl border border-white/5 bg-white/3 p-7 backdrop-blur-sm hover:border-indigo-500/30 transition-colors"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="absolute -top-4 -left-2 text-7xl font-black text-white/4 select-none leading-none">
                {step}
              </div>
              <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/20">
                {icon}
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section className="px-6 py-24 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent" aria-labelledby="what-you-get">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-400 font-semibold tracking-widest text-sm uppercase mb-3">What You Get</p>
            <h2 id="what-you-get" className="text-3xl sm:text-4xl font-bold">
              Your complete marketing package —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-300">
                all generated in one go
              </span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Every deliverable a coach needs to attract clients, build trust, and convert leads — written and ready.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <FileText className="w-5 h-5" />,
                title: 'Homepage Copy',
                description: 'A compelling hero, benefits, and CTA written to convert visitors into leads.',
              },
              {
                icon: <BookOpen className="w-5 h-5" />,
                title: 'About Page',
                description: 'Your personal story and credentials crafted to build instant trust.',
              },
              {
                icon: <Mail className="w-5 h-5" />,
                title: 'Email Welcome Sequence',
                description: '5–7 emails that nurture new subscribers and prime them to buy.',
              },
              {
                icon: <Mail className="w-5 h-5" />,
                title: 'Email Sales Sequence',
                description: '3–5 persuasive emails that guide warm leads to your paid offer.',
              },
              {
                icon: <MessageSquare className="w-5 h-5" />,
                title: 'GHL Chat Automation',
                description: 'Ready-to-import chat sequences for your GoHighLevel account.',
              },
              {
                icon: <Share2 className="w-5 h-5" />,
                title: 'Facebook Posts',
                description: '10–20 value-packed posts to grow your audience and authority.',
              },
              {
                icon: <Target className="w-5 h-5" />,
                title: 'Facebook Ad Copy',
                description: '3–5 ad variations tested against your ideal client avatar.',
              },
              {
                icon: <MessageCircle className="w-5 h-5" />,
                title: 'Lead Magnet Outline',
                description: 'A structured outline for your free offer to grow your list fast.',
              },
            ].map(({ icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-white/5 p-5 flex flex-col gap-3 hover:border-amber-500/25 hover:bg-amber-500/5 transition-all"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-amber-400">{icon}</div>
                  <h3 className="font-semibold text-sm text-white">{title}</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{description}</p>
                <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST / SOCIAL PROOF ── */}
      <section className="px-6 py-24 max-w-5xl mx-auto" aria-labelledby="why-trust-us">
        <h2 id="why-trust-us" className="sr-only">Why Coaches Trust Coach Launch</h2>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: <BookOpen className="w-7 h-7 text-amber-400" />,
              title: "John Whiting's Proven Framework",
              body: 'Every prompt and output is built on the coaching sales methodology proven across hundreds of coaching businesses.',
            },
            {
              icon: <Sparkles className="w-7 h-7 text-amber-400" />,
              title: 'Powered by Advanced AI',
              body: 'State-of-the-art language models trained to write marketing copy that sounds like you — not a robot.',
            },
            {
              icon: <CheckCircle2 className="w-7 h-7 text-amber-400" />,
              title: "Steve Krebs's Coaching Clients",
              body: 'Used exclusively with coaches mentored by Steve Krebs — a trusted advisor in the coaching industry.',
            },
          ].map(({ icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/5 p-8 flex flex-col items-center gap-4"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/20">
                {icon}
              </div>
              <h3 className="font-bold text-base">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-28 text-center relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-indigo-700/25 blur-3xl" />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        <p className="text-amber-400 font-semibold tracking-widest text-sm uppercase mb-4">Ready to Launch?</p>
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
          Your coaching business deserves<br className="hidden sm:block" /> a real launch.
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg">
          Stop putting it off. Answer a few questions and walk away with a
          complete, professional marketing package — built in minutes.
        </p>

        <Button
          size="lg"
          render={<Link href="/login" />}
          className="bg-amber-400 text-zinc-900 hover:bg-amber-300 font-bold text-base px-10 py-4 rounded-full shadow-xl shadow-amber-500/25 flex items-center gap-2 mx-auto"
        >
          Generate My Marketing Package
          <ArrowRight className="w-4 h-4" />
        </Button>
      </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 px-6 py-8 text-center text-slate-600 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-amber-400/50" />
          <span className="font-medium text-slate-400">Coach Launch</span>
        </div>
        <p>Built by Steve Krebs &mdash; For coaches who are ready to grow.</p>
        <nav aria-label="Footer navigation" className="mt-4 flex items-center justify-center gap-6 text-slate-500 text-xs">
          <Link href="/login" className="hover:text-amber-400 transition-colors">Log In</Link>
          <Link href="/signup" className="hover:text-amber-400 transition-colors">Sign Up</Link>
        </nav>
        <p className="mt-3 text-slate-700 text-xs">&copy; {new Date().getFullYear()} Coach Launch. All rights reserved.</p>
      </footer>

    </div>
  )
}
