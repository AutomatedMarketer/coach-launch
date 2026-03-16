'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check, FileText, FileDown } from 'lucide-react'
import { exportToDocx, exportToPdf } from '@/lib/export'
import type { Deliverable } from '@/types'

interface ExportMenuProps {
  deliverables: Deliverable[]
  businessName: string
}

export function ExportMenu({ deliverables, businessName }: ExportMenuProps) {
  const [copied, setCopied] = useState(false)

  const items = deliverables
    .filter((d) => d.content)
    .map((d) => ({ title: d.title, content: d.content!, imageUrls: d.image_urls || [] }))

  function formatAllContent(): string {
    return items
      .map((d) => {
        const separator = '='.repeat(60)
        return `${separator}\n${d.title.toUpperCase()}\n${separator}\n\n${d.content}\n`
      })
      .join('\n\n')
  }

  async function handleCopyAll() {
    try {
      await navigator.clipboard.writeText(formatAllContent())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API may fail in some contexts
    }
  }

  const filename = businessName || 'launch-kit'

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyAll}
        className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-full"
      >
        {copied ? (
          <>
            <Check className="mr-1 h-3 w-3 text-green-400" /> Copied All
          </>
        ) : (
          <>
            <Copy className="mr-1 h-3 w-3" /> Copy All
          </>
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => exportToPdf(items, filename)}
        className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-full"
      >
        <FileDown className="mr-1 h-3 w-3" /> PDF
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => exportToDocx(items, filename)}
        className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-full"
      >
        <FileText className="mr-1 h-3 w-3" /> DOCX
      </Button>
    </div>
  )
}
