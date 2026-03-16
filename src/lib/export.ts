'use client'

import { Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType } from 'docx'
import { jsPDF } from 'jspdf'

interface ExportItem {
  title: string
  content: string
  imageUrls?: string[]
}

// ── DOCX Export ──────────────────────────────────────────────

async function fetchImageAsBuffer(url: string): Promise<{ buffer: ArrayBuffer; type: 'png' | 'jpg' } | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const buffer = await res.arrayBuffer()
    const isPng = url.toLowerCase().includes('.png')
    return { buffer, type: isPng ? 'png' : 'jpg' }
  } catch {
    return null
  }
}

async function buildDocxParagraphs(items: ExportItem[]): Promise<Paragraph[]> {
  const paragraphs: Paragraph[] = []

  for (const item of items) {
    // Title heading
    paragraphs.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
        children: [new TextRun({ text: item.title, bold: true, font: 'Arial', size: 28 })],
      })
    )

    // Content — split by newlines, each line becomes a paragraph
    const lines = item.content.split('\n')
    for (const line of lines) {
      paragraphs.push(
        new Paragraph({
          spacing: { after: 80 },
          children: [new TextRun({ text: line, font: 'Arial', size: 22 })],
        })
      )
    }

    // Images (if any)
    if (item.imageUrls && item.imageUrls.length > 0) {
      paragraphs.push(
        new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: 'Generated Images:', bold: true, font: 'Arial', size: 22 })],
        })
      )

      for (const url of item.imageUrls) {
        const imgData = await fetchImageAsBuffer(url)
        if (imgData) {
          paragraphs.push(
            new Paragraph({
              spacing: { after: 200 },
              alignment: AlignmentType.CENTER,
              children: [
                new ImageRun({
                  type: imgData.type,
                  data: imgData.buffer,
                  transformation: { width: 400, height: 400 },
                  altText: { title: item.title, description: `Image for ${item.title}`, name: item.title },
                }),
              ],
            })
          )
        }
      }
    }

    // Spacer between deliverables
    paragraphs.push(new Paragraph({ spacing: { after: 300 }, children: [] }))
  }

  return paragraphs
}

export async function exportToDocx(items: ExportItem[], filename: string) {
  const children = await buildDocxParagraphs(items)
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      children,
    }],
  })

  const buffer = await Packer.toBlob(doc)
  downloadBlob(buffer, `${sanitizeFilename(filename)}.docx`)
}

// ── PDF Export ────────────────────────────────────────────────

export async function exportToPdf(items: ExportItem[], filename: string) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const margin = 20
  const maxWidth = pageWidth - margin * 2
  let y = margin

  for (let i = 0; i < items.length; i++) {
    const item = items[i]

    // Check if we need a new page for the title
    if (y > 250) {
      pdf.addPage()
      y = margin
    }

    // Title
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(16)
    pdf.text(item.title, margin, y)
    y += 10

    // Content
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(10)
    const lines = pdf.splitTextToSize(item.content, maxWidth)

    for (const line of lines) {
      if (y > 270) {
        pdf.addPage()
        y = margin
      }
      pdf.text(line, margin, y)
      y += 5
    }

    // Images (if any)
    if (item.imageUrls && item.imageUrls.length > 0) {
      for (const url of item.imageUrls) {
        try {
          const imgData = await fetchImageAsBuffer(url)
          if (imgData) {
            const imgSize = 60 // mm
            if (y + imgSize > 270) {
              pdf.addPage()
              y = margin
            }
            const base64 = btoa(
              new Uint8Array(imgData.buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
            )
            pdf.addImage(
              `data:image/${imgData.type};base64,${base64}`,
              imgData.type.toUpperCase(),
              margin,
              y,
              imgSize,
              imgSize
            )
            y += imgSize + 5
          }
        } catch {
          // Skip failed image downloads
        }
      }
    }

    // Spacer between deliverables
    y += 10
  }

  pdf.save(`${sanitizeFilename(filename)}.pdf`)
}

// ── Helpers ──────────────────────────────────────────────────

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/\s+/g, '-').toLowerCase() || 'deliverable'
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
