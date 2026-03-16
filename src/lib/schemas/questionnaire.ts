import { z } from 'zod'

// Step 1: You & Your Story
export const stepYouAndStorySchema = z.object({
  clientName: z.string().min(2, 'Name is required'),
  businessName: z.string().min(2, 'Business name is required'),
  personalStory: z.string().min(20, 'Tell us more about your story'),
  credentials: z.string().optional(),
  personalDetails: z.string().optional(),
})

// Step 2: Your Niche & Audience
export const stepNicheAndAudienceSchema = z.object({
  niche: z.string().min(5, 'Describe your niche'),
  targetAudience: z.string().min(10, 'Describe your target audience'),
  minimumRequirements: z.string().optional(),
  problemSolved: z.string().min(10, 'What problem do you solve?'),
  unwantedFeelings: z.string().min(5, 'Describe how your ideal client feels right now'),
  desiredFeelings: z.string().min(5, 'Describe how they want to feel'),
  commonObjections: z.array(z.string()).min(1, 'Add at least one objection'),
  testimonials: z.array(z.string()).optional(),
})

// Step 3: Your Offer
export const stepYourOfferSchema = z.object({
  offerName: z.string().min(2, 'Name your offer'),
  pricePoint: z.string().min(1, 'Set your price'),
  transformation: z.string().min(10, 'What transformation do you deliver?'),
  aspiringIdentity: z.string().min(10, 'Describe who your client wants to become'),
  uniqueMechanism: z.string().min(10, 'What makes your approach different?'),
  leadMagnetName: z.string().min(2, 'Name your lead magnet'),
  ctaType: z.enum(['application', 'booking', 'dm-keyword']),
  ctaKeyword: z.string().optional(),
})

// Step 4: Final Details
export const stepFinalDetailsSchema = z.object({
  expertise: z.array(z.string()).min(1, 'List your expertise topics'),
  brandVoice: z.enum(['motivational', 'tactical', 'casual', 'authoritative']),
  offerDetailsUrl: z.string().url().optional().or(z.literal('')),
  applicationUrl: z.string().url().optional().or(z.literal('')),
})

// Step 5: Brand Assets
export const stepBrandAssetsSchema = z.object({
  brandColors: z.string().optional(),
  brandFonts: z.string().optional(),
  brandPhotoUrls: z.array(z.string()).optional(),
  logoUrl: z.string().optional(),
})

// Full schema (for final validation)
export const questionnaireSchema = stepYouAndStorySchema
  .merge(stepNicheAndAudienceSchema)
  .merge(stepYourOfferSchema)
  .merge(stepFinalDetailsSchema)
  .merge(stepBrandAssetsSchema)

export type QuestionnaireAnswers = z.infer<typeof questionnaireSchema>

// Step schemas array for dynamic validation
export const stepSchemas = [
  stepYouAndStorySchema,
  stepNicheAndAudienceSchema,
  stepYourOfferSchema,
  stepFinalDetailsSchema,
  stepBrandAssetsSchema,
]

export const stepNames = [
  'You & Your Story',
  'Niche & Audience',
  'Your Offer',
  'Final Details',
  'Brand Assets',
]
