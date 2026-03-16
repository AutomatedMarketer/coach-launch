import { generateImage } from './client'
import { createAdminClient } from '@/lib/supabase/server'
import type { ImageType } from '@/lib/deliverable-config'

// Variation themes so each image in a set feels different
const SOCIAL_THEMES = [
  'confident man standing on a mountain summit at golden hour, arms crossed, looking out over a vast landscape — symbolizing achievement and clarity',
  'silhouette of a person walking through an open doorway into bright golden light, leaving a dark room behind — symbolizing transformation and breakthrough',
  'a clean modern desk workspace with a journal, coffee, and laptop, morning sunlight streaming through a window — symbolizing focus and intentional living',
]

const AD_THEMES = [
  'dramatic split image: left side shows a stressed exhausted professional in dark tones, right side shows the same person confident and energized in golden warm tones — transformation contrast',
  'a powerful image of a man climbing stone steps toward a glowing summit, dark storm clouds behind him and golden light ahead — symbolizing the journey from struggle to success',
  'a coaching session in a premium office setting, two people in conversation across a table, warm lighting, professional atmosphere — conveying trust and mentorship',
]

const CAROUSEL_THEMES = [
  'clean dark navy background with subtle golden light rays emanating from the center, professional and aspirational',
  'overhead shot of a strategic planning session — notebooks, coffee, sticky notes on a dark wood table, warm ambient lighting',
  'a winding mountain road at sunrise with golden light breaking through clouds — symbolizing the coaching journey ahead',
  'a professional man looking confident in a tailored suit, standing in front of a modern office window with city skyline, golden hour light',
  'an open road stretching to the horizon through beautiful landscape at dawn, golden light, wide cinematic feel — symbolizing new beginnings',
]

interface ImagePromptConfig {
  prompt: (ctx: ImageContext, variation: number) => string
  aspectRatio: string
  imageSize: '1K' | '2K'
}

const IMAGE_CONFIGS: Record<ImageType, ImagePromptConfig> = {
  'social-post': {
    aspectRatio: '1:1',
    imageSize: '1K',
    prompt: (ctx, i) => {
      const theme = SOCIAL_THEMES[i % SOCIAL_THEMES.length]
      return (
        `Create a photorealistic, inspirational social media image for a coaching brand called "${ctx.brandName}". ` +
        `Scene: ${theme}. ` +
        `Color grading: warm golden tones, rich and cinematic. ` +
        `No text, no words, no letters, no logos — purely photographic. ` +
        `Professional quality, magazine-worthy composition. Square format. ` +
        `Style: authentic and aspirational, like a high-end lifestyle brand photo.`
      )
    },
  },

  'ad-creative': {
    aspectRatio: '1:1',
    imageSize: '1K',
    prompt: (ctx, i) => {
      const theme = AD_THEMES[i % AD_THEMES.length]
      return (
        `Create a high-impact, photorealistic Facebook ad image for "${ctx.brandName}" coaching brand. ` +
        `Scene: ${theme}. ` +
        `Color grading: rich cinematic tones with warm highlights and deep shadows. ` +
        `No text, no words, no letters — image only. ` +
        `Leave some clean open space for text overlay. ` +
        `Professional photography quality, emotionally compelling, scroll-stopping. Square format.`
      )
    },
  },

  'hero-image': {
    aspectRatio: '16:9',
    imageSize: '2K',
    prompt: (ctx) =>
      `Create a wide cinematic hero banner photo for a premium coaching website. Brand: "${ctx.brandName}". ` +
      `Scene: a dramatic mountain landscape at golden hour — jagged peaks with golden sunlight breaking through clouds, ` +
      `a winding path leading upward, misty valleys below. Conveys transformation, ascent, and breakthrough. ` +
      `Color grading: deep shadows, rich golden highlights, warm amber tones. ` +
      `No text, no words, no letters — purely photographic. ` +
      `Leave clean open space on the left third for text overlay. ` +
      `Wide landscape format, cinematic aspect ratio. National Geographic quality.`,
  },

  'lead-magnet-cover': {
    aspectRatio: '3:4',
    imageSize: '2K',
    prompt: (ctx) =>
      `Create a professional ebook cover design for a coaching lead magnet by "${ctx.brandName}". ` +
      `The title is: "${ctx.snippet}". ` +
      `Style: premium modern book cover with clean typography. ` +
      `Display the title text "${ctx.snippet}" prominently in bold white sans-serif font. ` +
      `Display "${ctx.brandName}" at the bottom as author name. ` +
      `Background: dramatic mountain landscape at golden hour, slightly blurred, with a dark overlay. ` +
      `Color palette: deep navy, gold accents, white text. ` +
      `Portrait format, ebook/PDF cover proportions. Professional, authoritative, and aspirational.`,
  },

  'carousel-slide': {
    aspectRatio: '1:1',
    imageSize: '1K',
    prompt: (ctx, i) => {
      const theme = CAROUSEL_THEMES[i % CAROUSEL_THEMES.length]
      return (
        `Create a photorealistic carousel slide background for "${ctx.brandName}" coaching brand on Instagram/LinkedIn. ` +
        `Scene: ${theme}. ` +
        `Color grading: warm cinematic tones, golden highlights, professional quality. ` +
        `No text, no words, no letters — background image only. ` +
        `Leave generous clean space in the center for text overlay (use depth of field blur if needed). ` +
        `Premium, aspirational coaching brand aesthetic. Square format.`
      )
    },
  },
}

interface ImageContext {
  brandName: string
  snippet: string
}

export async function generateImagesForDeliverable(
  questionnaireId: string,
  templateId: string,
  imageType: ImageType,
  imageCount: number,
  deliverableContent: string,
  answers: Record<string, unknown>
): Promise<string[]> {
  const brandName = (answers.businessName as string) || (answers.fullName as string) || 'Coach'

  // Extract lead magnet title for cover images
  const leadMagnetName = (answers.leadMagnetName as string) || ''

  // For lead magnet covers, use the lead magnet name; otherwise use content snippet
  const snippet = imageType === 'lead-magnet-cover' && leadMagnetName
    ? leadMagnetName
    : deliverableContent
        .replace(/[#*_\-]/g, '')
        .slice(0, 150)
        .trim()

  const config = IMAGE_CONFIGS[imageType]
  const urls: string[] = []

  const supabase = createAdminClient()

  for (let i = 0; i < imageCount; i++) {
    try {
      const context: ImageContext = { brandName, snippet }
      const prompt = config.prompt(context, i)

      console.log(`[gemini] Generating ${imageType} ${i + 1}/${imageCount} via ${config.imageSize}...`)

      const imageBuffer = await generateImage(prompt, {
        aspectRatio: config.aspectRatio,
        imageSize: config.imageSize,
      })

      // Upload to Supabase Storage
      const timestamp = Date.now()
      const path = `generated/${questionnaireId}/${templateId}/${timestamp}-${i}.png`

      const { error: uploadError } = await supabase.storage
        .from('brand-assets')
        .upload(path, imageBuffer, {
          contentType: 'image/png',
          upsert: true,
        })

      if (uploadError) {
        console.error(`[gemini] Upload failed for ${path}:`, uploadError.message)
        continue
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('brand-assets')
        .getPublicUrl(path)

      urls.push(urlData.publicUrl)
      console.log(`[gemini] Image ${i + 1}/${imageCount} uploaded: ${path}`)
    } catch (err) {
      console.error(`[gemini] Image generation ${i + 1}/${imageCount} failed:`, err)
      // Continue with remaining images instead of failing completely
    }
  }

  return urls
}
