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
  // Legacy fields
  minimumRequirements: z.string().optional(),
  testimonials: z.array(z.string()).optional(),
  idealClientCurrentRevenue: z.string().optional(),
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
  pricePoint: z.string().min(1, 'Set your price'),
  guaranteeOrRisk: z.string().optional(),
  programDuration: z.string().min(1, 'How long is your program?'),
  programIncludes: z.string().min(10, 'List what clients get in your program'),
  transformation: z.string().min(10, 'What transformation do you deliver?'),
  uniqueMechanism: z.string().min(10, 'What makes your approach different?'),
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
  // Legacy + goal fields
  revenueGoal: z.string().optional(),
  revenueGoalDeadline: z.string().optional(),
  competitorOldWay: z.string().optional(),
  scarcityElement: z.string().optional(),
  missionStatement: z.string().optional(),
})

// === Step 7: Final Details (unchanged) ===
export const stepFinalDetailsSchema = z.object({
  expertise: z.array(z.string()).min(1, 'List your expertise topics'),
  brandVoice: z.enum(['motivational', 'tactical', 'casual', 'authoritative']),
  contentCadence: z.enum(['daily', '3-5-week', 'weekly', 'biweekly', 'unsure']).optional().default('unsure'),
  voiceNotes: z.string().optional(),
  offerDetailsUrl: z.string().url().optional().or(z.literal('')),
  applicationUrl: z.string().url().optional().or(z.literal('')),
})

// === Step 8: Brand Assets (unchanged) ===
export const stepBrandAssetsSchema = z.object({
  brandColors: z.string().optional(),
  brandFonts: z.string().optional(),
  brandPhotoUrls: z.array(z.string()).optional(),
  logoUrl: z.string().optional(),
})

// Full schema (for final validation)
export const questionnaireSchema = stepWhoYouAreSchema
  .merge(stepYourStorySchema)
  .merge(stepIdealClientSchema)
  .merge(stepDeepPsychologySchema)
  .merge(stepYourProgramSchema)
  .merge(stepYourResultsSchema)
  .merge(stepFinalDetailsSchema)
  .merge(stepBrandAssetsSchema)

export type QuestionnaireAnswers = z.infer<typeof questionnaireSchema>
export type CaseStudy = z.infer<typeof caseStudySchema>
export type ProgramPhase = z.infer<typeof programPhaseSchema>
export type ObjectionRebuttal = z.infer<typeof objectionRebuttalSchema>
export type TrackRecord = z.infer<typeof trackRecordSchema>

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
