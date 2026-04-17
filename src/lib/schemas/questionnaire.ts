import { z } from 'zod'

// === Reusable sub-schemas for structured objects ===

export const caseStudySchema = z.object({
  clientName: z.string().min(1, 'Client name required'),
  businessType: z.string().min(1, 'Business type required'),
  beforeState: z.string().min(1, 'Before state required'),
  intervention: z.string().min(1, 'What you did together'),
  result: z.string().min(1, 'Result required'),
  timeframe: z.string().min(1, 'Timeframe required'),
  quote: z.string().optional(),
})

export const programPhaseSchema = z.object({
  phaseName: z.string().min(1, 'Phase name required'),
  description: z.string().min(1, 'Description required'),
  outcome: z.string().min(1, 'Outcome required'),
})

export const objectionRebuttalSchema = z.object({
  objection: z.string().min(1, 'Objection required'),
  rebuttal: z.string().min(1, 'Rebuttal required'),
})

export const trackRecordSchema = z.object({
  businessesBuilt: z.string().optional(),
  yearsInIndustry: z.string().optional(),
  clientsHelped: z.string().optional(),
  revenueGenerated: z.string().optional(),
  eventsRun: z.string().optional(),
  booksWritten: z.string().optional(),
  certifications: z.string().optional(),
  speakingEngagements: z.string().optional(),
  mediaAppearances: z.string().optional(),
  notableClients: z.string().optional(),
})

// Structured pricing — replaces free-text `pricePoint` to kill parser hallucinations.
export const pricingSchema = z.object({
  totalUSD: z.number().min(1, 'Enter the total program price in USD'),
  billingType: z.enum(['one-time', 'subscription', 'installments']),
  displayString: z.string().min(2, 'How you display the price (e.g. "$12,000 for 6 months", "$500/mo")'),
  paymentPlanCount: z.number().int().min(1).max(24).optional(),
  pifDiscountPercent: z.number().int().min(0).max(30).default(0),
  _needsReviewByCoach: z.boolean().optional(),
}).superRefine((val, ctx) => {
  if (val.billingType === 'installments' && !val.paymentPlanCount) {
    ctx.addIssue({
      path: ['paymentPlanCount'],
      code: z.ZodIssueCode.custom,
      message: 'Number of payments required when billing type is installments',
    })
  }
})

// === Step 1: Who You Are (CS Block 1 — Q1-Q10) ===
export const stepWhoYouAreSchema = z.object({
  clientName: z.string().min(2, 'Name is required'),
  businessName: z.string().min(2, 'Business name is required'),
  elevatorPitch: z.string().optional(),
  coachingYears: z.string().optional(),
  totalClientsCoached: z.string().optional(),
  businessesBuiltList: z.string().optional(),
  positionsHeld: z.string().optional(),
  certifications: z.string().optional(),
  mediaAndStages: z.string().optional(),
  notableAssociations: z.string().optional(),
  twelveMonthVision: z.string().optional(),
  credentials: z.string().optional(), // legacy — kept for backward compat
  personalDetails: z.string().optional(), // legacy — synthesized
})

// === Step 2: Your Story (CS Block 2 — Q11-Q20) ===
export const stepYourStorySchema = z.object({
  upbringing: z.string().optional(),
  parentInfluence: z.string().optional(),
  coachingLineage: z.string().optional(),
  firstBusiness: z.string().optional(),
  storyBeforeState: z.string().min(20, 'Tell us about when you were most stuck'),
  storyTurningPoint: z.string().min(20, 'Tell us what changed everything'),
  storyAfterState: z.string().min(20, 'Tell us what your coaching journey has looked like since'),
  whyDoThis: z.string().min(10, 'Why is this work the most important thing you could be doing?'),
  personalHobbies: z.array(z.string()).optional(),
  personalLife: z.string().optional(),
  storyFacts: z.string().min(10, 'List at least a few key facts'),
  // Legacy fields — kept for backward compat
  personalFamily: z.string().optional(),
  personalTraits: z.array(z.string()).optional(),
  personalLocation: z.string().optional(),
})

// === Step 3: Your Ideal Client (CS Block 3 — Q21-Q30) ===
export const stepIdealClientSchema = z.object({
  niche: z.string().min(5, 'Describe your niche'),
  targetAudience: z.string().min(10, 'Describe your target audience'),
  bestClientEver: z.string().optional(),
  topComplaints: z.string().optional(),
  unwantedFeelings: z.string().min(5, 'Describe how your ideal client feels right now'),
  topDesires: z.string().optional(),
  desiredFeelings: z.string().min(5, 'Describe how they want to feel'),
  idealClientCurrentMethods: z.string().min(5, 'How are they currently trying to solve it?'),
  whyCurrentMethodFails: z.string().optional(),
  aspiringIdentity: z.string().min(10, 'Describe who your client becomes after working with you'),
  problemSolved: z.string().min(10, 'What problem do you solve?'),
  commonObjections: z.array(z.string()).min(1, 'Add at least one objection'),
  salesApproach: z.enum(['discovery-call', 'application-call', 'dm-close', 'webinar', 'video-sales-letter']),
  deliveryModel: z.enum(['1-on-1', 'group-program', 'mastermind', 'hybrid', 'self-paced-course', 'membership']),
  // Data-gap fields (added April 15 2026 to close hallucination → placeholder pipeline)
  idealClientCurrentRevenue: z.string().min(3, 'Estimate your ideal client\'s current revenue (e.g. "$150K-$500K/year" or "$5-10K/month"). This powers pricing math and urgency copy.'),
  // Promoted from optional to required (v6a) — used by cost-angle / urgency copy across 5+ templates.
  monthlyActionCost: z.string().min(5, 'Quantify the monthly cost of staying stuck (e.g. "$2,000/month in underpricing", "15 hours/week of lost time worth $3K"). Leave vague and the AI fills in [COACH: Insert X].'),
  // Legacy fields
  minimumRequirements: z.string().optional(),
  testimonials: z.array(z.string()).optional(),
  idealClientStuckDuration: z.string().optional(),
  idealClientFailedAttempts: z.array(z.string()).optional(),
  idealClientDreamName: z.string().optional(),
})

// === Step 4: Deep Client Psychology (CS Block 4 — Q31-Q40) ===
export const stepDeepPsychologySchema = z.object({
  clientExcuse: z.string().optional(),
  clientSecretDesire: z.string().optional(),
  clientFalseProblem: z.string().optional(),
  clientRealProblem: z.string().optional(),
  clientSecretFear: z.string().optional(),
  clientAngerTrigger: z.string().optional(),
  clientBlameTarget: z.string().optional(),
  clientGuiltShame: z.string().optional(),
  clientDailyReminder: z.string().optional(),
  clientInactionConsequence: z.string().optional(),
})

// === Step 5: Your Program (CS Block 5 — Q41-Q49) ===
export const stepYourProgramSchema = z.object({
  offerName: z.string().min(2, 'Name your offer'),
  programPhases: z.array(programPhaseSchema).min(2, 'Add at least 2 phases').max(5).optional(),
  doneForYou: z.string().optional(),
  taughtSkills: z.string().optional(),
  billboardResult: z.string().optional(),
  bonuses: z.string().optional(),
  clientCapacity: z.string().optional(),
  // v6a: replaced free-text `pricePoint` with structured `pricing` object.
  // `pricePoint` is still synthesized by template-loader for backward compat with templates.
  pricing: pricingSchema,
  guaranteeOrRisk: z.string().optional(),
  // v6b: when coach has a guarantee, we need the timeframe to avoid invented "30 days" etc.
  // Required-if logic enforced by full-schema superRefine below.
  guaranteeTimeframe: z.string().optional(),
  // v6b: optional fast-action bonus deadline, used by pricing-framework and sales-call-script.
  fastActionBonusDeadline: z.string().optional(),
  programDuration: z.string().min(1, 'How long is your program?'),
  programIncludes: z.string().min(10, 'List what clients get in your program'),
  transformation: z.string().min(10, 'What transformation do you deliver?'),
  uniqueMechanism: z.string().min(10, 'What makes your approach different?'),
  // v6a: added so templates stop inventing timeframes.
  firstResultTimeframe: z.string().min(3, 'When does a client typically see their first measurable win? (e.g. "within 14 days", "by end of week 2")'),
  targetClientMonthlyRevenue: z.string().min(3, 'After your program, what does a typical client earn or achieve? (e.g. "$15K-$30K/month", "20+ qualified leads per week")'),
  leadMagnetName: z.string().min(2, 'Name your lead magnet'),
  leadMagnetType: z.enum(['pdf-guide', 'checklist', 'framework', 'mini-course', 'quiz', 'video-series']).optional(),
  ctaType: z.enum(['application', 'booking', 'dm-keyword']),
  ctaKeyword: z.string().optional(),
  revenuePerClient: z.string().optional(),
})

// === Step 6: Your Results (CS Block 6 — Q50) ===
export const stepYourResultsSchema = z.object({
  caseStudies: z.array(caseStudySchema).optional(),
  trackRecord: trackRecordSchema.optional(),
  objectionRebuttals: z.array(objectionRebuttalSchema).optional(),
  // Structured success rate (added April 15 2026) — powers belief-shift-map Component 12 internal case study
  clientSuccessRate: z.object({
    clientsAchievedResult: z.number().optional(),
    totalClientsInProgram: z.number().optional(),
  }).optional(),
  // Legacy + goal fields
  revenueGoal: z.string().optional(),
  revenueGoalDeadline: z.string().optional(),
  competitorOldWay: z.string().optional(),
  // v6b: promoted from optional to required. Every coach has a capacity limit or
  // enrollment signal — without it, scarcity/urgency sections either hallucinate
  // or fall back to placeholders.
  scarcityElement: z.string().min(5, 'Describe what makes your enrollment limited — capacity cap, cohort start date, bonus deadline, price increase, etc. This powers every scarcity/urgency section.'),
  missionStatement: z.string().optional(),
})

// === Step 7: Final Details ===
// v6a: URLs validated conditionally based on ctaType (on the full-questionnaire schema, below).
// leadMagnetUrl is always required — every coach has a lead magnet.
export const stepFinalDetailsSchema = z.object({
  expertise: z.array(z.string()).min(1, 'List your expertise topics'),
  brandVoice: z.enum(['motivational', 'tactical', 'casual', 'authoritative']),
  contentCadence: z.enum(['daily', '3-5-week', 'weekly', 'biweekly', 'unsure']).optional().default('unsure'),
  voiceNotes: z.string().optional(),
  offerDetailsUrl: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  applicationUrl: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  leadMagnetUrl: z.string().url('Direct link to your lead magnet download'),
})

// === Step 8: Brand Assets (unchanged) ===
export const stepBrandAssetsSchema = z.object({
  brandColors: z.string().optional(),
  brandFonts: z.string().optional(),
  brandPhotoUrls: z.array(z.string()).optional(),
  logoUrl: z.string().optional(),
})

// Full schema (for final validation)
// v6a: superRefine enforces URL requirements based on ctaType.
// Application-type CTAs need applicationUrl; booking-type CTAs need offerDetailsUrl;
// dm-keyword CTAs need ctaKeyword instead (no URL required).
export const questionnaireSchema = stepWhoYouAreSchema
  .merge(stepYourStorySchema)
  .merge(stepIdealClientSchema)
  .merge(stepDeepPsychologySchema)
  .merge(stepYourProgramSchema)
  .merge(stepYourResultsSchema)
  .merge(stepFinalDetailsSchema)
  .merge(stepBrandAssetsSchema)
  .superRefine((val, ctx) => {
    if (val.ctaType === 'application' && !val.applicationUrl) {
      ctx.addIssue({
        path: ['applicationUrl'],
        code: z.ZodIssueCode.custom,
        message: 'Application URL required when CTA type is Application',
      })
    }
    if (val.ctaType === 'booking' && !val.offerDetailsUrl) {
      ctx.addIssue({
        path: ['offerDetailsUrl'],
        code: z.ZodIssueCode.custom,
        message: 'Booking / sales page URL required when CTA type is Book a Call',
      })
    }
    if (val.ctaType === 'dm-keyword' && !val.ctaKeyword) {
      ctx.addIssue({
        path: ['ctaKeyword'],
        code: z.ZodIssueCode.custom,
        message: 'DM keyword required when CTA type is DM Keyword',
      })
    }
    // v6b: if a guarantee is set, enforce a timeframe so templates stop inventing "30 days."
    if (val.guaranteeOrRisk && val.guaranteeOrRisk.trim().length > 0 && !val.guaranteeTimeframe) {
      ctx.addIssue({
        path: ['guaranteeTimeframe'],
        code: z.ZodIssueCode.custom,
        message: 'Guarantee timeframe required when a guarantee is set (e.g. "60 days," "first 90 days")',
      })
    }
  })

export type QuestionnaireAnswers = z.infer<typeof questionnaireSchema>
export type CaseStudy = z.infer<typeof caseStudySchema>
export type ProgramPhase = z.infer<typeof programPhaseSchema>
export type ObjectionRebuttal = z.infer<typeof objectionRebuttalSchema>
export type TrackRecord = z.infer<typeof trackRecordSchema>
export type Pricing = z.infer<typeof pricingSchema>

// Legacy exports for backward compatibility
export const stepYouAndStorySchema = stepWhoYouAreSchema.merge(stepYourStorySchema)
export const stepNicheAndAudienceSchema = stepIdealClientSchema
export const stepYourOfferSchema = stepYourProgramSchema
export const stepYourProofSchema = stepYourResultsSchema
export const stepGoalsAndWhySchema = stepYourResultsSchema

// Step schemas array for dynamic validation
export const stepSchemas = [
  stepWhoYouAreSchema,
  stepYourStorySchema,
  stepIdealClientSchema,
  stepDeepPsychologySchema,
  stepYourProgramSchema,
  stepYourResultsSchema,
  stepFinalDetailsSchema,
  stepBrandAssetsSchema,
]

export const stepNames = [
  'Who You Are',
  'Your Story',
  'Your Ideal Client',
  'Deep Client Psychology',
  'Your Program',
  'Your Results',
  'Final Details',
  'Brand Assets',
]
