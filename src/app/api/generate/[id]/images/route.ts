import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { DELIVERABLES } from '@/lib/deliverable-config'
import { generateImagesForDeliverable } from '@/lib/gemini/generate-image'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth check
    const authClient = await createClient()
    const { data: { user } } = await authClient.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: questionnaireId } = await params
    const body = await request.json()
    const { templateId } = body

    if (!templateId) {
      return NextResponse.json({ error: 'templateId is required' }, { status: 400 })
    }

    const config = DELIVERABLES.find(d => d.templateId === templateId)
    if (!config) {
      return NextResponse.json({ error: 'Invalid templateId' }, { status: 400 })
    }

    if (!config.imageType || !config.imageCount) {
      return NextResponse.json(
        { error: 'This deliverable does not support image generation' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Verify ownership
    const { data: questionnaire } = await supabase
      .from('questionnaires')
      .select('answers, user_id')
      .eq('id', questionnaireId)
      .single()

    if (!questionnaire) {
      return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 })
    }
    if (questionnaire.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get the deliverable's text content
    const { data: deliverable } = await supabase
      .from('deliverables')
      .select('id, content')
      .eq('questionnaire_id', questionnaireId)
      .eq('template_id', templateId)
      .eq('status', 'completed')
      .single()

    if (!deliverable?.content) {
      return NextResponse.json(
        { error: 'Deliverable must be generated before creating images' },
        { status: 400 }
      )
    }

    // Generate images via Gemini
    const imageUrls = await generateImagesForDeliverable(
      questionnaireId,
      templateId,
      config.imageType,
      config.imageCount,
      deliverable.content,
      questionnaire.answers || {}
    )

    // Save image URLs to the deliverable
    await supabase
      .from('deliverables')
      .update({ image_urls: imageUrls, updated_at: new Date().toISOString() })
      .eq('id', deliverable.id)

    return NextResponse.json({ image_urls: imageUrls })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Image generation failed'
    console.error('[api/generate/images]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
