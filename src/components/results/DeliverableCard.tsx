'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { ContentEditor } from './ContentEditor'
import { MarkdownContent } from './MarkdownContent'
import { Copy, Pencil, RotateCcw, Check, FileText, FileDown, ImagePlus, Loader2 } from 'lucide-react'
import { exportToDocx, exportToPdf } from '@/lib/export'
import { DELIVERABLES } from '@/lib/deliverable-config'
import { safeParseJSON } from '@/lib/utils'
import type { Deliverable, DeliverableStatus } from '@/types'

const statusStyles: Record<DeliverableStatus, string> = {
  pending: 'bg-slate-500/20 text-slate-300 border border-slate-500/30',
  generating: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  completed: 'bg-green-500/20 text-green-300 border border-green-500/30',
  error: 'bg-red-500/20 text-red-300 border border-red-500/30',
}

interface DeliverableCardProps {
  deliverable: Deliverable
  questionnaireId: string
  onUpdate: (updated: Deliverable) => void
}

export function DeliverableCard({
  deliverable,
  questionnaireId,
  onUpdate,
}: DeliverableCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [isGeneratingImages, setIsGeneratingImages] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>(deliverable.image_urls || [])
  const [error, setError] = useState<string | null>(null)

  const content = deliverable.content || ''
  const config = DELIVERABLES.find(d => d.templateId === deliverable.template_id)
  const hasImageSupport = !!(config?.imageType && config?.imageCount)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API may fail in some contexts
    }
  }

  const exportItem = [{ title: deliverable.title, content, imageUrls }]

  async function handleRegenerate() {
    setError(null)
    setIsRegenerating(true)
    try {
      const response = await fetch(
        `/api/generate/${questionnaireId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ templateId: deliverable.template_id }),
        }
      )
      if (response.ok) {
        const data = await response.json()
        onUpdate({ ...deliverable, content: data.content, status: 'completed' })
      } else {
        const data = await safeParseJSON(response)
        setError(data.error || 'Regeneration failed. Please try again.')
      }
    } catch (err) {
      console.error('Regeneration failed:', err)
      setError('Regeneration failed. Please try again.')
    } finally {
      setIsRegenerating(false)
    }
  }

  async function handleGenerateImages() {
    setError(null)
    setIsGeneratingImages(true)
    try {
      const response = await fetch(
        `/api/generate/${questionnaireId}/images`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ templateId: deliverable.template_id }),
        }
      )
      if (response.ok) {
        const data = await response.json()
        setImageUrls(data.image_urls || [])
        onUpdate({ ...deliverable, image_urls: data.image_urls || [] })
      } else {
        const data = await safeParseJSON(response)
        setError(data.error || 'Image generation failed')
      }
    } catch (err) {
      console.error('Image generation failed:', err)
      setError('Image generation failed. Please try again.')
    } finally {
      setIsGeneratingImages(false)
    }
  }

  async function handleSave(newContent: string) {
    setError(null)
    try {
      const response = await fetch(`/api/deliverables/${deliverable.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newContent }),
      })
      if (response.ok) {
        onUpdate({ ...deliverable, content: newContent })
        setIsEditing(false)
      } else {
        const data = await safeParseJSON(response)
        setError(data.error || 'Save failed. Please try again.')
      }
    } catch (err) {
      console.error('Save failed:', err)
      setError('Save failed. Please try again.')
    }
  }

  return (
    <AccordionItem value={deliverable.id}>
      <AccordionTrigger className="px-5 py-4 hover:no-underline">
        <div className="flex w-full items-center gap-3 pr-2">
          <span className="flex-1 text-left text-sm font-medium text-white">
            {deliverable.title}
          </span>
          <Badge className={statusStyles[deliverable.status]} variant="secondary">
            {deliverable.status}
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent key={isEditing ? 'editing' : 'viewing'} className="px-5 pb-5">
        {/* Content */}
        {isEditing ? (
          <ContentEditor
            initialContent={content}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="mb-4 max-h-96 overflow-y-auto rounded-xl bg-slate-900/80 border border-slate-700/50 p-5 text-sm leading-relaxed text-slate-300">
            {content ? (
              <MarkdownContent content={content} />
            ) : (
              <p className="text-slate-500 italic">No content generated yet.</p>
            )}
          </div>
        )}

        {/* Image Gallery */}
        {imageUrls.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-slate-400 mb-2">Generated Images</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {imageUrls.map((url, i) => {
                const filename = `${deliverable.template_id}-image-${i + 1}.png`
                return (
                  <button
                    key={i}
                    onClick={async () => {
                      try {
                        const res = await fetch(url)
                        const blob = await res.blob()
                        const blobUrl = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = blobUrl
                        a.download = filename
                        a.click()
                        URL.revokeObjectURL(blobUrl)
                      } catch {
                        window.open(url, '_blank')
                      }
                    }}
                    className="block rounded-lg overflow-hidden border border-slate-700/50 hover:border-amber-400/30 transition-colors cursor-pointer text-left"
                    title={`Download ${filename}`}
                  >
                    <img
                      src={url}
                      alt={`${deliverable.title} image ${i + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        {!isEditing && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-full"
            >
              {copied ? (
                <>
                  <Check className="mr-1 h-3 w-3 text-green-400" /> Copied
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-3 w-3" /> Copy
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToPdf(exportItem, deliverable.template_id)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-full"
            >
              <FileDown className="mr-1 h-3 w-3" /> PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToDocx(exportItem, deliverable.template_id)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-full"
            >
              <FileText className="mr-1 h-3 w-3" /> DOCX
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-full"
            >
              <Pencil className="mr-1 h-3 w-3" /> Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-full"
            >
              <RotateCcw
                className={`mr-1 h-3 w-3 ${isRegenerating ? 'animate-spin' : ''}`}
              />
              {isRegenerating ? 'Regenerating...' : 'Regenerate'}
            </Button>
            {hasImageSupport && deliverable.status === 'completed' && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateImages}
                disabled={isGeneratingImages}
                className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 hover:text-amber-200 rounded-full"
              >
                {isGeneratingImages ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Generating Images...
                  </>
                ) : (
                  <>
                    <ImagePlus className="mr-1 h-3 w-3" />
                    {imageUrls.length > 0 ? 'Regenerate Images' : 'Generate Images'}
                  </>
                )}
              </Button>
            )}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-400 mt-2">{error}</p>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}
