'use client'

import { useState } from 'react'
import { Sparkles, X, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FieldSuggestionProps {
  fieldName: string
  answers: Record<string, unknown>
  onAccept: (suggestion: string) => void
}

export default function FieldSuggestion({ fieldName, answers, onAccept }: FieldSuggestionProps) {
  const [loading, setLoading] = useState(false)
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleGetSuggestion() {
    setLoading(true)
    setError(null)
    setSuggestion(null)
    try {
      const res = await fetch('/api/questionnaire/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fieldName, answers }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setSuggestion(data.suggestion)
    } catch {
      setError('Could not generate a suggestion. Try filling in more fields above first.')
    } finally {
      setLoading(false)
    }
  }

  function handleAccept() {
    if (suggestion) {
      onAccept(suggestion)
      setSuggestion(null)
    }
  }

  function handleDismiss() {
    setSuggestion(null)
    setError(null)
  }

  return (
    <div className="mt-1">
      {!suggestion && !error && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleGetSuggestion}
          disabled={loading}
          className="h-7 px-2 text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 gap-1.5"
        >
          {loading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Sparkles className="h-3 w-3" />
          )}
          {loading ? 'Generating suggestion…' : 'Get a suggested answer'}
        </Button>
      )}

      {error && (
        <div className="flex items-start gap-2 mt-2 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
          <p className="text-xs text-slate-400 flex-1">{error}</p>
          <button type="button" onClick={handleDismiss} className="text-slate-500 hover:text-slate-300 shrink-0">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {suggestion && (
        <div className="mt-2 rounded-lg border border-green-500/30 bg-green-500/5 p-3 space-y-2">
          <div className="flex items-start gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-sm text-slate-200 flex-1">{suggestion}</p>
            <button type="button" onClick={handleDismiss} className="text-slate-500 hover:text-slate-300 shrink-0">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex gap-2 pl-5">
            <Button
              type="button"
              size="sm"
              onClick={handleAccept}
              className="h-7 px-3 text-xs bg-green-600 hover:bg-green-500 text-white gap-1.5"
            >
              <Check className="h-3 w-3" />
              Use This
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleGetSuggestion}
              disabled={loading}
              className="h-7 px-3 text-xs text-slate-400 hover:text-slate-200 gap-1.5"
            >
              {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
