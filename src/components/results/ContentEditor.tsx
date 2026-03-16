'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

interface ContentEditorProps {
  initialContent: string
  onSave: (content: string) => Promise<void>
  onCancel: () => void
}

export function ContentEditor({
  initialContent,
  onSave,
  onCancel,
}: ContentEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [isSaving, setIsSaving] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea to fit content
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [content])

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  async function handleSave() {
    setIsSaving(true)
    try {
      await onSave(content)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="mb-4 space-y-3">
      <div className="flex items-center gap-2 text-amber-400">
        <Pencil className="h-3.5 w-3.5" />
        <span className="text-xs font-medium uppercase tracking-wider">Editing — make changes below</span>
      </div>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full min-h-[200px] max-h-[600px] resize-y rounded-xl border border-amber-400/30 bg-slate-900/80 px-4 py-3 font-mono text-sm leading-relaxed text-slate-200 placeholder:text-slate-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
      />
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={handleSave}
          disabled={isSaving}
          className="bg-amber-500 text-black hover:bg-amber-400 rounded-full"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onCancel}
          disabled={isSaving}
          className="border-slate-600 text-slate-300 hover:bg-slate-700/50 rounded-full"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
