'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sparkles, CheckCircle2 } from 'lucide-react'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // If Supabase auto-confirms (email confirmation disabled), redirect to dashboard
    if (data.session) {
      window.location.href = '/dashboard'
      return
    }

    // Otherwise show "check your email" screen
    setSuccess(true)
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-[#0a0f1e]">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span className="text-2xl font-bold text-white tracking-tight">Coach Launch</span>
          </div>
          <p className="text-sm text-slate-400">
            Create your account
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border border-white/5 p-6 sm:p-8"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          {success ? (
            <div className="space-y-5 text-center py-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-500/15 border border-green-500/20 mx-auto">
                <CheckCircle2 className="w-7 h-7 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Check your email</h3>
                <p className="text-sm text-slate-400">
                  We sent a confirmation link to your email. Click it to activate your account.
                </p>
              </div>
              <Link
                href="/login"
                className="inline-block text-sm font-medium text-amber-400 hover:text-amber-300 underline-offset-4 hover:underline"
              >
                Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white">Get started</h2>
                <p className="text-sm text-slate-400 mt-1">Fill in your details to create an account</p>
              </div>

              {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-slate-300 text-sm">Full name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  autoComplete="name"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-amber-400/50 focus:ring-amber-400/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-amber-400/50 focus:ring-amber-400/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300 text-sm">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-amber-400/50 focus:ring-amber-400/20"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full py-5"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>

              <p className="text-center text-sm text-slate-400">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-amber-400 hover:text-amber-300 underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
