'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Sparkles,
  HelpCircle,
  Check,
  Megaphone,
  FileText,
  Rocket,
  Shield,
  Target,
} from 'lucide-react'

// ─── Nav items ────────────────────────────────────────────────────────────────

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/help', label: 'Help', icon: HelpCircle },
]

// ─── Questionnaire steps ──────────────────────────────────────────────────────

const STEPS = [
  {
    number: 1,
    label: 'You & Your Story',
    tip: 'This is your foundation. Your story is what separates you from every other coach. Own it.',
  },
  {
    number: 2,
    label: 'Niche & Audience',
    tip: 'The more specific your niche, the less you spend on ads and the faster you close. Get laser-focused.',
  },
  {
    number: 3,
    label: 'Your Offer',
    tip: 'Your offer is your business. A clear, outcome-driven package sells itself.',
  },
  {
    number: 4,
    label: 'Final Details',
    tip: 'These details fine-tune your AI-generated content to sound exactly like you.',
  },
  {
    number: 5,
    label: 'Brand Assets',
    tip: 'Your visuals make the first impression. Even basic assets make your marketing look pro.',
  },
]

// ─── Phase preview items ──────────────────────────────────────────────────────

const SIDEBAR_PHASES = [
  {
    icon: Megaphone,
    label: 'Money Messaging',
    description: 'Define your audience and messaging.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  {
    icon: Target,
    label: 'Mind Shift Method',
    description: 'Build your persuasion framework and offer.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    icon: FileText,
    label: 'The Conversion Code',
    description: 'Build your sales script and marketing copy.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    icon: Rocket,
    label: 'Authority Amplifier',
    description: 'Launch your content engine, ads, and automation.',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
]

// ─── Props ────────────────────────────────────────────────────────────────────

interface SidebarProps {
  userEmail?: string | null
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Sidebar({ userEmail }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch('/api/admin/me')
        const data = await res.json()
        setIsAdmin(data.isAdmin === true)
      } catch {
        // ignore
      }
    }
    checkAdmin()
  }, [])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  // Detect context from URL
  const stepMatch = pathname.match(/\/questionnaire\/(\d+)/)
  const isOnQuestionnaire = stepMatch !== null
  const currentStep = stepMatch ? parseInt(stepMatch[1], 10) : null
  const isOnDashboard = pathname === '/dashboard' || pathname.startsWith('/dashboard/')

  const sidebarContent = (
    <div className="flex h-full flex-col overflow-y-auto">

      {/* Logo */}
      <div className="flex h-14 shrink-0 items-center gap-2 px-4 border-b border-white/5">
        <Sparkles className="w-5 h-5 text-amber-400" />
        <Link
          href="/dashboard"
          className="text-lg font-semibold tracking-tight text-white"
        >
          Coach Launch
        </Link>
      </div>

      {/* Navigation */}
      <nav className="shrink-0 space-y-1 px-3 py-4 border-b border-white/5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
        {isAdmin && (
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              pathname.startsWith('/admin')
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Shield className="h-4 w-4" />
            Admin
          </Link>
        )}
      </nav>

      {/* Context panel — grows to fill remaining space */}
      <div className="flex-1 px-3 py-4 space-y-4">

        {/* Questionnaire step progress */}
        {isOnQuestionnaire && currentStep !== null && (
          <>
            <div>
              <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Your Progress
              </p>
              <ol className="space-y-1">
                {STEPS.map((step) => {
                  const isComplete = step.number < currentStep
                  const isCurrent = step.number === currentStep
                  const isPending = step.number > currentStep

                  return (
                    <li
                      key={step.number}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isCurrent
                          ? 'bg-amber-400/10 border border-amber-400/20'
                          : isComplete
                          ? 'bg-white/3'
                          : ''
                      }`}
                    >
                      {/* Step indicator */}
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                          isComplete
                            ? 'bg-green-400/20 text-green-400'
                            : isCurrent
                            ? 'bg-amber-400/20 text-amber-400'
                            : 'bg-white/5 text-slate-600'
                        }`}
                      >
                        {isComplete ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          step.number
                        )}
                      </span>

                      {/* Step label */}
                      <span
                        className={
                          isComplete
                            ? 'text-slate-400 line-through decoration-slate-600'
                            : isCurrent
                            ? 'font-medium text-amber-400'
                            : isPending
                            ? 'text-slate-600'
                            : 'text-slate-400'
                        }
                      >
                        {step.label}
                      </span>
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* Motivational tip for current step */}
            <div className="rounded-xl border border-amber-400/15 bg-amber-400/5 px-3 py-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-amber-400/70">
                Why this matters
              </p>
              <p className="text-xs leading-relaxed text-slate-300">
                {STEPS[currentStep - 1]?.tip}
              </p>
            </div>
          </>
        )}

        {/* Dashboard — what you'll get */}
        {isOnDashboard && (
          <div>
            <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
              What You'll Get
            </p>
            <ul className="space-y-2">
              {SIDEBAR_PHASES.map((phase) => {
                const Icon = phase.icon
                return (
                  <li
                    key={phase.label}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/3 px-3 py-2.5"
                  >
                    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${phase.bg}`}>
                      <Icon className={`h-3.5 w-3.5 ${phase.color}`} />
                    </span>
                    <div>
                      <p className={`text-xs font-semibold ${phase.color}`}>
                        {phase.label}
                      </p>
                      <p className="mt-0.5 text-xs leading-snug text-slate-500">
                        {phase.description}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>

      {/* User / sign out */}
      <div className="shrink-0 border-t border-white/5 px-4 py-3">
        {userEmail && (
          <p className="mb-2 truncate text-xs text-slate-500">
            {userEmail}
          </p>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-slate-400 hover:text-white hover:bg-white/5"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed left-4 top-4 z-50 rounded-md border border-white/10 bg-[#0a0f1e] p-2 shadow-sm md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/5 bg-[#070b18] transition-transform duration-200 md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-white/5 bg-[#070b18] md:flex md:flex-col">
        {sidebarContent}
      </aside>
    </>
  )
}
