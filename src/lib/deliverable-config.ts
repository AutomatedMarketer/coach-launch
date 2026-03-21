export type ImageType = 'social-post' | 'ad-creative' | 'hero-image' | 'lead-magnet-cover' | 'carousel-slide'

export type PhaseNumber = 1 | 2 | 3 | 4 | 5

export const PHASES = [1, 2, 3, 4, 5] as const

export interface DeliverableConfig {
  templateId: string
  title: string
  dependsOn: string[]
  phase: PhaseNumber
  maxTokens: number
  imageType?: ImageType
  imageCount?: number
}

export const PHASE_TITLES: Record<PhaseNumber, string> = {
  1: 'The Blueprint',
  2: 'Money Messaging',
  3: 'Mind Shift Method',
  4: 'The Conversion Code',
  5: 'Authority Amplifier',
}

export const PHASE_DESCRIPTIONS: Record<PhaseNumber, string> = {
  1: 'Your foundation — mission, bio, and proof stack',
  2: 'Define your audience and messaging',
  3: 'Build your persuasion framework and offer structure',
  4: 'Build your sales assets and marketing pages',
  5: 'Launch your content system, ads, and automation at scale',
}

export const PHASE_ACCENTS: Record<PhaseNumber, string> = {
  1: 'purple',
  2: 'amber',
  3: 'blue',
  4: 'green',
  5: 'orange',
}

export const DELIVERABLES: DeliverableConfig[] = [
  // Phase 1: The Blueprint (3 deliverables)
  { templateId: 'mission-statement', title: 'Mission Statement', dependsOn: [], phase: 1, maxTokens: 4096 },
  { templateId: 'human-bio', title: 'Human Bio', dependsOn: [], phase: 1, maxTokens: 4096 },
  { templateId: 'proof-stack', title: 'Proof Stack', dependsOn: [], phase: 1, maxTokens: 6144 },

  // Phase 2: Money Messaging (3 deliverables)
  { templateId: 'magnetic-messaging-statement', title: '4P Power Message', dependsOn: [], phase: 2, maxTokens: 4096 },
  { templateId: 'emotional-trigger-map', title: 'Emotional Trigger Map', dependsOn: [], phase: 2, maxTokens: 6144 },
  { templateId: 'usp', title: 'Unique Selling Proposition', dependsOn: ['magnetic-messaging-statement'], phase: 2, maxTokens: 4096 },

  // Phase 3: Mind Shift Method (4 deliverables)
  { templateId: 'two-identities', title: 'Two Identities', dependsOn: ['magnetic-messaging-statement', 'emotional-trigger-map'], phase: 3, maxTokens: 6144 },
  { templateId: 'belief-shift-map', title: 'Belief Breakthrough Blueprint', dependsOn: ['magnetic-messaging-statement', 'emotional-trigger-map', 'two-identities'], phase: 3, maxTokens: 8192 },
  { templateId: 'lead-magnet-outline', title: 'Lead Magnet Outline', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'emotional-trigger-map'], phase: 3, maxTokens: 4096, imageType: 'lead-magnet-cover', imageCount: 1 },
  { templateId: 'offer-one-sheet', title: 'Offer 1-Sheet', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'emotional-trigger-map'], phase: 3, maxTokens: 4096 },

  // Phase 4: The Conversion Code (8 deliverables)
  { templateId: 'core-conversion-content', title: 'Bulletproof Sales Script', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'emotional-trigger-map', 'two-identities'], phase: 4, maxTokens: 8192 },
  { templateId: 'sales-call-script', title: 'Sales Call Script', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'emotional-trigger-map', 'core-conversion-content'], phase: 4, maxTokens: 8192 },
  { templateId: 'homepage-copy', title: 'Homepage Copy', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content'], phase: 4, maxTokens: 8192, imageType: 'hero-image', imageCount: 1 },
  { templateId: 'about-page', title: 'About Page', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content'], phase: 4, maxTokens: 8192 },
  { templateId: 'email-welcome-sequence', title: 'Email Welcome Sequence', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content'], phase: 4, maxTokens: 8192 },
  { templateId: 'email-sales-sequence', title: 'Email Sales Sequence', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content'], phase: 4, maxTokens: 12288 },
  { templateId: 'qualifying-filter', title: 'This Is For You If / Not For You', dependsOn: ['two-identities', 'belief-shift-map'], phase: 4, maxTokens: 4096 },
  { templateId: 'pricing-framework', title: 'Perfect Pricing Framework', dependsOn: ['offer-one-sheet'], phase: 4, maxTokens: 6144 },

  // Phase 5: Authority Amplifier (8 deliverables)
  { templateId: 'content-angle-library', title: 'Content Playbook (98+ Ideas)', dependsOn: ['belief-shift-map', 'core-conversion-content'], phase: 5, maxTokens: 8192 },
  { templateId: 'facebook-posts', title: 'Facebook Posts', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content', 'content-angle-library'], phase: 5, maxTokens: 8192, imageType: 'social-post', imageCount: 3 },
  { templateId: 'facebook-ad-copy', title: 'Facebook Ad Copy', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content', 'content-angle-library'], phase: 5, maxTokens: 4096, imageType: 'ad-creative', imageCount: 3 },
  { templateId: 'youtube-script', title: 'YouTube Script', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content', 'content-angle-library'], phase: 5, maxTokens: 6144 },
  { templateId: 'shorts-reels-scripts', title: 'Shorts/Reels Scripts', dependsOn: ['youtube-script'], phase: 5, maxTokens: 6144 },
  { templateId: 'carousel-posts', title: 'Carousel Posts', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'content-angle-library'], phase: 5, maxTokens: 8192, imageType: 'carousel-slide', imageCount: 5 },
  { templateId: 'ghl-chat-sequence', title: 'GHL Chat Sequence', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content'], phase: 5, maxTokens: 6144 },
  { templateId: 'manychat-sequence', title: 'ManyChat Automation Flow', dependsOn: ['magnetic-messaging-statement', 'belief-shift-map', 'core-conversion-content'], phase: 5, maxTokens: 6144 },
]

export function getDeliverablesByPhase(phase: PhaseNumber): DeliverableConfig[] {
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
