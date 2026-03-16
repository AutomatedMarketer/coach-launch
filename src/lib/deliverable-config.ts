export type ImageType = 'social-post' | 'ad-creative' | 'hero-image' | 'lead-magnet-cover' | 'carousel-slide'

export interface DeliverableConfig {
  templateId: string
  title: string
  dependsOn: string[]
  phase: 1 | 2 | 3
  maxTokens: number
  imageType?: ImageType
  imageCount?: number
}

export const PHASE_TITLES: Record<1 | 2 | 3, string> = {
  1: 'Magnetic Messaging',
  2: 'Core Conversion Content',
  3: 'Propaganda Machine',
}

export const PHASE_DESCRIPTIONS: Record<1 | 2 | 3, string> = {
  1: 'Define your audience, messaging, and core offer statement',
  2: 'Build your master sales script and marketing assets',
  3: 'Launch your content system, ads, and automation at scale',
}

export const DELIVERABLES: DeliverableConfig[] = [
  // Phase 1: Magnetic Messaging (3 deliverables)
  { templateId: 'magnetic-messaging-statement', title: '4P Power Message', dependsOn: [], phase: 1, maxTokens: 4096 },
  { templateId: 'belief-shift-map', title: 'Belief Breakthrough Blueprint', dependsOn: [], phase: 1, maxTokens: 4096 },
  { templateId: 'lead-magnet-outline', title: 'Lead Magnet Outline', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map'], phase: 1, maxTokens: 4096, imageType: 'lead-magnet-cover', imageCount: 1 },

  // Phase 2: Core Conversion Content (5 deliverables)
  { templateId: 'core-conversion-content', title: 'Bulletproof Sales Script', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map'], phase: 2, maxTokens: 8192 },
  { templateId: 'homepage-copy', title: 'Homepage Copy', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content'], phase: 2, maxTokens: 8192, imageType: 'hero-image', imageCount: 1 },
  { templateId: 'about-page', title: 'About Page', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content'], phase: 2, maxTokens: 8192 },
  { templateId: 'email-welcome-sequence', title: 'Email Welcome Sequence', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content'], phase: 2, maxTokens: 8192 },
  { templateId: 'email-sales-sequence', title: 'Email Sales Sequence', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content'], phase: 2, maxTokens: 8192 },

  // Phase 3: Propaganda Machine (8 deliverables)
  { templateId: 'content-angle-library', title: 'Content Playbook (70+ Ideas)', dependsOn: ['belief-shift-map', 'core-conversion-content'], phase: 3, maxTokens: 8192 },
  { templateId: 'facebook-posts', title: 'Facebook Posts', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content', 'content-angle-library'], phase: 3, maxTokens: 8192, imageType: 'social-post', imageCount: 3 },
  { templateId: 'facebook-ad-copy', title: 'Facebook Ad Copy', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content', 'content-angle-library'], phase: 3, maxTokens: 4096, imageType: 'ad-creative', imageCount: 3 },
  { templateId: 'youtube-script', title: 'YouTube Script', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content', 'content-angle-library'], phase: 3, maxTokens: 6144 },
  { templateId: 'shorts-reels-scripts', title: 'Shorts/Reels Scripts', dependsOn: ['youtube-script'], phase: 3, maxTokens: 6144 },
  { templateId: 'carousel-posts', title: 'Carousel Posts', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'content-angle-library'], phase: 3, maxTokens: 8192, imageType: 'carousel-slide', imageCount: 5 },
  { templateId: 'ghl-chat-sequence', title: 'GHL Chat Sequence', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content'], phase: 3, maxTokens: 6144 },
  { templateId: 'manychat-sequence', title: 'ManyChat Automation Flow', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content'], phase: 3, maxTokens: 6144 },
]

export function getDeliverablesByPhase(phase: 1 | 2 | 3): DeliverableConfig[] {
  return DELIVERABLES.filter(d => d.phase === phase)
}

/**
 * Build execution waves for a phase based on dependency graph.
 * Within each wave, deliverables are independent and can run in parallel.
 */
export function buildWaves(
  phaseDeliverables: DeliverableConfig[],
  alreadyCompleted: Set<string>
): DeliverableConfig[][] {
  const remaining = phaseDeliverables.filter(d => !alreadyCompleted.has(d.templateId))
  const completed = new Set(alreadyCompleted)
  const waves: DeliverableConfig[][] = []

  while (remaining.length > 0) {
    const wave = remaining.filter(d =>
      d.dependsOn.every(dep => completed.has(dep))
    )

    if (wave.length === 0) {
      // Shouldn't happen with valid config, but avoid infinite loop
      waves.push(remaining.splice(0))
      break
    }

    waves.push(wave)
    for (const d of wave) {
      completed.add(d.templateId)
      const idx = remaining.indexOf(d)
      if (idx >= 0) remaining.splice(idx, 1)
    }
  }

  return waves
}

export type TemplateId = string
