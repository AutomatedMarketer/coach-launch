'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  MessageCircleQuestion,
  X,
  Send,
  Loader2,
  Sparkles,
} from 'lucide-react'
import { stepNames } from '@/lib/schemas/questionnaire'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const QUICK_QUESTIONS = [
  'What is a niche?',
  'How do I write my story?',
  'What is a lead magnet?',
  'Help me name my offer',
]

const STEP_QUESTIONS: Record<number, string[]> = {
  1: [
    'How do I write my story?',
    "What if I don't have credentials?",
    'What makes a good brand name?',
  ],
  2: [
    'What is a niche?',
    'How specific should my audience be?',
    "What if I don't know their objections?",
  ],
  3: [
    'How do I price my coaching?',
    'What is a lead magnet?',
    'Help me name my offer',
  ],
  4: [
    'What are expertise topics?',
    'Which brand voice fits me?',
    'Do I need a website first?',
  ],
  5: [
    'What photos work best?',
    "What if I don't have a logo?",
    'How do I pick brand colors?',
  ],
}

export function CoachHelper() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Detect current step from URL
  const stepMatch = pathname.match(/\/questionnaire\/(\d+)/)
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : null
  const isOnQuestionnaire = currentStep !== null

  const quickQuestions = currentStep && STEP_QUESTIONS[currentStep]
    ? STEP_QUESTIONS[currentStep]
    : QUICK_QUESTIONS

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: text.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/coach-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          context: currentStep ? {
            step: currentStep,
            stepName: stepNames[currentStep - 1] || 'Unknown',
          } : null,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "Sorry, I couldn't process that. Try asking again!"
        }])
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Something went wrong. Check your connection and try again."
      }])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, currentStep])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  // Don't show on auth pages
  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    return null
  }

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-amber-400 px-4 py-3 text-zinc-900 font-semibold shadow-lg shadow-amber-400/25 hover:bg-amber-300 transition-all hover:scale-105"
        >
          <MessageCircleQuestion className="h-5 w-5" />
          <span className="hidden sm:inline">Need Help?</span>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[520px] rounded-2xl border border-slate-700/50 bg-[#0f1523] shadow-2xl shadow-black/50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-slate-800/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-400/15 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Coach Helper</p>
                <p className="text-xs text-slate-500">Ask me anything about the questionnaire</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px] max-h-[340px]">
            {messages.length === 0 && (
              <div className="text-center py-4">
                <p className="text-sm text-slate-400 mb-4">
                  {isOnQuestionnaire
                    ? `Stuck on something in "${stepNames[(currentStep || 1) - 1]}"? I can help!`
                    : "Hi! I'm here to help you with your marketing questionnaire."
                  }
                </p>
                <div className="space-y-2">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="block w-full text-left text-sm px-3 py-2 rounded-lg border border-slate-700/50 bg-slate-800/50 text-slate-300 hover:border-amber-400/30 hover:text-white transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-amber-400/15 text-amber-100 border border-amber-400/20'
                      : 'bg-slate-800/80 text-slate-200 border border-slate-700/50'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/80 border border-slate-700/50 rounded-xl px-3 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-3 border-t border-white/5 bg-slate-800/30"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              disabled={isLoading}
              className="flex-1 bg-slate-900/70 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/20 outline-none disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-amber-400 text-zinc-900 hover:bg-amber-300 rounded-lg px-3 py-2 h-auto disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
