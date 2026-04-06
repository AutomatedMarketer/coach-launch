import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'

/** Build allowed origins from env config — never hardcode deployment URLs */
function buildAllowedOrigins(): Set<string> {
  const origins = new Set<string>(['http://localhost:3000'])
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (siteUrl) {
    origins.add(siteUrl.replace(/\/$/, ''))
  }
  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) {
    origins.add(`https://${vercelUrl}`)
  }
  const projectUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (projectUrl) {
    origins.add(`https://${projectUrl}`)
  }
  return origins
}

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3MB — matches client-side limit (multipart overhead adds ~33%)
const ALLOWED_UPLOAD_TYPES = ['headshots', 'logos', 'brand-photos']

export async function POST(request: NextRequest) {
  try {
    const authClient = await createClient()
    const { data: { user } } = await authClient.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // CSRF protection: verify request origin (driven by env config, not hardcoded)
    const origin = request.headers.get('origin')
    const allowedOrigins = buildAllowedOrigins()
    if (origin && !allowedOrigins.has(origin)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Rate limit: 10 upload requests per minute per user
    const rateCheck = checkRateLimit(`upload:${user.id}`, RATE_LIMITS.upload)
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait before uploading again.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateCheck.resetAt - Date.now()) / 1000)),
            'X-RateLimit-Remaining': '0',
          }
        }
      )
    }

    const formData = await request.formData()

    const questionnaireId = formData.get('questionnaire_id')
    const type = formData.get('type')
    const files = formData.getAll('files') as File[]

    // Validate required fields
    if (!questionnaireId || typeof questionnaireId !== 'string') {
      return NextResponse.json(
        { error: 'questionnaire_id is required' },
        { status: 400 }
      )
    }

    if (!type || typeof type !== 'string' || !ALLOWED_UPLOAD_TYPES.includes(type)) {
      return NextResponse.json(
        { error: `type must be one of: ${ALLOWED_UPLOAD_TYPES.join(', ')}` },
        { status: 400 }
      )
    }

    if (!files.length) {
      return NextResponse.json(
        { error: 'At least one file is required' },
        { status: 400 }
      )
    }

    // Verify questionnaire belongs to user
    const adminClient = createAdminClient()
    const { data: questionnaire } = await adminClient
      .from('questionnaires')
      .select('id')
      .eq('id', questionnaireId)
      .eq('user_id', user.id)
      .single()

    if (!questionnaire) {
      return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 })
    }

    // Validate each file
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid file type: ${file.type}. Allowed: jpg, jpeg, png, webp` },
          { status: 400 }
        )
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds 3MB limit. Please resize or compress it.` },
          { status: 400 }
        )
      }
    }

    const supabase = createAdminClient()
    const uploadedUrls: string[] = []

    for (const file of files) {
      // Generate a unique filename to avoid collisions
      const timestamp = Date.now()
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const path = `${questionnaireId}/${type}/${timestamp}-${safeName}`

      const buffer = Buffer.from(await file.arrayBuffer())

      const { error: uploadError } = await supabase.storage
        .from('brand-assets')
        .upload(path, buffer, {
          contentType: file.type,
          upsert: false,
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        const message = uploadError.message?.includes('not found')
          ? 'File uploads are temporarily unavailable. Your answers have been saved — you can add brand assets later.'
          : 'Failed to upload file. Please try again.'
        return NextResponse.json(
          { error: message },
          { status: 500 }
        )
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('brand-assets')
        .getPublicUrl(path)

      uploadedUrls.push(urlData.publicUrl)
    }

    return NextResponse.json({ urls: uploadedUrls })
  } catch (error) {
    console.error('Upload route error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    // Handle body parser / payload too large errors
    if (message.includes('body') || message.includes('size') || message.includes('limit') || message.includes('Entity')) {
      return NextResponse.json(
        { error: 'File too large. Please use images under 3MB each.' },
        { status: 413 }
      )
    }
    return NextResponse.json(
      { error: 'Upload failed. Please try again with smaller files.' },
      { status: 500 }
    )
  }
}
