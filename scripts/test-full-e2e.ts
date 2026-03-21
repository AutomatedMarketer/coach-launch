/**
 * Full E2E Quality Test — 3 coach profiles with ALL new fields filled.
 * Tests every deliverable across all 5 phases.
 * Grades: factual accuracy, data utilization, Block 4 grounding, anti-hallucination.
 *
 * Usage: npx tsx scripts/test-full-e2e.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { writeFileSync } from 'fs'

config({ path: resolve(import.meta.dirname || __dirname, '..', '.env.local') })

const originalCwd = process.cwd
process.cwd = () => resolve(import.meta.dirname || __dirname, '..')

import { generateDeliverable } from '../src/lib/claude/generate'

// ─── COACH 1: Full Data — Sales Coach (Block 4 filled) ─────────────────────

const COACH_1 = {
  label: 'Coach 1: Marcus Rivera — Sales Coach (FULL data + Block 4)',
  data: {
    // Step 1: Who You Are
    clientName: 'Marcus Rivera',
    businessName: 'Rivera Coaching Co',
    elevatorPitch: 'I help burned-out B2B sales professionals build profitable coaching businesses in 6 months.',
    coachingYears: '4 years',
    totalClientsCoached: '200+',
    businessesBuiltList: 'Rivera Coaching Co (2020-present) — coaching for sales professionals, $480K total revenue. Before that: Regional sales team at Datacloud Inc (2006-2019).',
    positionsHeld: 'Regional Sales Director at Datacloud Inc (14 years), Sales Team Lead at NetSys (3 years)',
    certifications: 'ICF ACC certified, Sandler Sales Training certified',
    mediaAndStages: 'Host of Sales to Coaching podcast (50 episodes), spoke at SaaS Sales Summit 2023, guest on 12 podcasts',
    notableAssociations: 'Trained under John Maxwell leadership program, member of ICF Colorado chapter',
    twelveMonthVision: '100 active clients, $50K/month revenue, team of 3 coaches, working 25 hours/week from home in Denver.',
    credentials: 'ICF ACC certified, 14 years in enterprise sales',
    // Step 2: Your Story
    upbringing: 'Grew up in a small town in New Mexico. Dad was a truck driver, mom worked at Walmart. First person in my family to go to college.',
    parentInfluence: 'My dad worked 70-hour weeks and never complained. Taught me work ethic but also showed me what I did NOT want — trading all your time for money.',
    coachingLineage: 'My high school football coach Mr. Hernandez was the first person who believed in me. He is the reason I got into coaching.',
    firstBusiness: 'I tried to start a car detailing business at 19. Made $200 in 3 months and quit. Learned that hustle without a system is just exhaustion.',
    storyBeforeState: 'Corporate sales manager for 14 years at Datacloud making $120K/year. Worked 60-hour weeks, missed my kids growing up, had a health scare at 38.',
    storyTurningPoint: 'Got laid off during a restructure in 2019. Instead of panicking, I realized it was the push I needed. Used my severance to hire a business coach for $8,000.',
    storyAfterState: 'Now run Rivera Coaching Co helping B2B sales professionals transition to coaching. 35 active clients, $40K/month, work 25 hours a week from home.',
    whyDoThis: 'I spent 14 years making someone else rich while missing my daughters grow up. Nobody should waste their best years building someone else\'s dream.',
    personalHobbies: ['Trail running', 'Woodworking', 'Cooking'],
    personalLife: 'Married to Diana for 15 years, two daughters ages 10 and 13. Live in Denver, CO. A great week is coaching calls in the morning, trail run at lunch, picking up the girls from school at 3.',
    storyFacts: '- Built Rivera Coaching Co from scratch in 2020\n- Helped 200+ sales professionals over 4 years\n- Host the Sales to Coaching podcast (50 episodes)\n- Spoke at 3 industry conferences\n- Clients average $8K/month within 6 months\n- Was laid off from Datacloud in 2019\n- Invested $8K in a coach with severance money',
    // Step 3: Your Ideal Client
    niche: 'Helping B2B sales professionals build profitable coaching businesses',
    targetAudience: 'Men and women 35-50 in B2B sales making $80K-$150K who are burned out and want to leverage their skills into a coaching business',
    bestClientEver: 'Tom Petersen — 12 years in enterprise tech sales, was side-hustling coaching evenings making $1,200/month. We built his offer around sales leadership, launched a LinkedIn content system. Hit $9,500/month within 4 months, quit his day job at month 5.',
    topComplaints: 'I am working harder than ever but making less money. I know how to sell in corporate but I cannot sell myself. Everyone online makes it look easy but I am getting zero traction.',
    unwantedFeelings: 'Stuck, undervalued, exhausted, trapped in golden handcuffs, afraid to make the leap',
    topDesires: 'Consistent $10K months so they can quit their day job. A system that brings clients to them instead of chasing. Recognition as a real authority in their space.',
    desiredFeelings: 'Free, confident, in control, financially secure, doing meaningful work on their own terms',
    idealClientCurrentMethods: 'Posting randomly on LinkedIn, cold DMing people, trying to get referrals from friends',
    whyCurrentMethodFails: 'Random LinkedIn posts get zero engagement because they have no positioning. Cold DMs feel gross and get ignored. Referrals are unpredictable.',
    aspiringIdentity: '"The Liberated Coach" — calm, confident, profitable. Making $10K+/month on their own terms.',
    problemSolved: 'Talented sales professionals who know how to sell but have no idea how to package their expertise, attract clients online, or build a coaching business from scratch.',
    commonObjections: ['I have no coaching experience', 'The market is too saturated', 'I need to keep my salary'],
    salesApproach: 'call-close',
    deliveryModel: 'hybrid',
    idealClientCurrentRevenue: '$0-$3K/month from side coaching',
    idealClientStuckDuration: '6-18 months',
    idealClientFailedAttempts: ['Generic online course', 'Hired a VA for outreach with zero results', 'Burned $2K on Facebook ads'],
    idealClientDreamName: 'Stuck Sales Pro',
    // Step 4: Deep Client Psychology
    clientExcuse: 'I just need to close a few more deals at my day job first, then I will have the runway to go all-in on coaching.',
    clientSecretDesire: 'They want their old corporate colleagues to see them thriving on their own terms. They want the lifestyle — work from a coffee shop, pick kids up from school.',
    clientFalseProblem: 'They think the problem is they need more followers, a better website, or a viral LinkedIn post.',
    clientRealProblem: 'They do not have a clear offer. They are afraid of selling to their peers. They have no system for consistently getting clients.',
    clientSecretFear: 'Everyone at their old company knows they left to start coaching. If it does not work, they will have to go back with their tail between their legs.',
    clientAngerTrigger: 'Seeing 25-year-old coaches with zero experience charging $10K while they with 14 years of enterprise sales are struggling to charge $2K.',
    clientBlameTarget: 'The saturated coaching market, the LinkedIn algorithm, and their last coach who charged them $5K and just told them to post more content.',
    clientGuiltShame: 'Spouse supported this career change and it is taking longer than promised. Dipping into savings. Embarrassed to tell friends how much they are actually making.',
    clientDailyReminder: 'Every morning they open LinkedIn and see other coaches posting client wins. They check their Stripe dashboard and see $0 in new revenue.',
    clientInactionConsequence: 'In 3 years: back at a corporate job they hate, telling people coaching was just a phase. Marriage strained from the financial stress.',
    // Step 5: Your Program
    offerName: 'The Sales-to-Coaching Accelerator',
    pricePoint: '$5,997 or 3 payments of $2,197',
    programDuration: '6 months',
    programIncludes: '2x monthly 1-on-1 calls, weekly group coaching, private Slack community, done-for-you templates, Voxer access',
    programPhases: [
      { phaseName: 'Foundation', description: 'Build your coaching offer, define your niche, and create your messaging', outcome: 'A clear, compelling offer ready to sell' },
      { phaseName: 'Attraction', description: 'Set up your content system, lead magnet, and organic lead generation', outcome: 'Consistent inbound leads from LinkedIn and podcasts' },
      { phaseName: 'Conversion', description: 'Master sales calls, build your email sequence, and close your first 10 clients', outcome: 'Predictable $8K+/month revenue' },
    ],
    doneForYou: 'We build your LinkedIn profile, create your lead magnet PDF, set up your email welcome sequence, and design your offer one-sheet.',
    taughtSkills: 'Sales call framework, content creation system, niche positioning, offer architecture, client onboarding process.',
    billboardResult: 'Replace your corporate salary with coaching income in 6 months.',
    bonuses: 'Done-for-you LinkedIn profile optimization, 30-day content calendar template, sales call recording review (2 per month)',
    clientCapacity: '8 clients per cohort — small enough for personal attention, large enough for group energy.',
    transformation: 'BEFORE: Making $0-$3K/month, working evenings around day job, no pipeline. AFTER: Full-time coach making $8K-$15K/month, 25-30 hours/week.',
    uniqueMechanism: 'The Sales-to-Coaching Method — a 3-phase system that leverages existing sales skills to build a coaching business in 6 months.',
    leadMagnetName: 'The Sales Pro Exit Plan: 5 Steps to Replace Your Salary with Coaching Income',
    leadMagnetType: 'pdf-guide',
    ctaType: 'booking',
    guaranteeOrRisk: 'If you do the work for 90 days without results, I will personally coach you 1-on-1 until you get your first paying client.',
    revenuePerClient: '$5,997',
    // Step 6: Your Results
    caseStudies: [
      { clientName: 'Tom Petersen', businessType: 'Enterprise tech sales, 12 years', beforeState: 'Side-hustling coaching evenings, making $1,200/month', intervention: 'Built his offer around sales leadership, launched LinkedIn content system', result: 'Hit $9,500/month within 4 months, quit day job at month 5', timeframe: '5 months', quote: 'Marcus showed me I already had everything I needed — I just needed the system.' },
      { clientName: 'Rachel Kim', businessType: 'SaaS account executive, 8 years', beforeState: 'Wanted to coach but had zero online presence, no email list', intervention: 'Defined her niche (women in tech sales), built LinkedIn presence, launched podcast', result: 'From $0 to $6,800/month in 6 months, now has a waitlist', timeframe: '6 months', quote: 'I went from invisible to having a waitlist.' },
    ],
    trackRecord: { businessesBuilt: 'Rivera Coaching Co (2020-present)', yearsInIndustry: '4 years coaching + 14 years B2B sales', clientsHelped: '200+', certifications: 'ICF ACC', mediaAppearances: 'Sales to Coaching podcast (50 episodes)' },
    objectionRebuttals: [
      { objection: 'I have no coaching experience', rebuttal: 'You have 10+ years of sales experience. That IS your credential. My system shows you how to package it.' },
      { objection: 'The market is too saturated', rebuttal: 'There are 4 million coaches but almost none specialize in helping sales pros. Your niche is wide open.' },
    ],
    revenueGoal: '$50K/month',
    revenueGoalDeadline: 'December 2026',
    competitorOldWay: 'Generic coaching programs teach Instagram tactics and cold DMs. They never address the specific advantages sales professionals already have.',
    scarcityElement: 'Next cohort starts April 1st, limited to 8 spots',
    // Step 7: Final Details
    expertise: ['Sales psychology', 'Offer creation', 'LinkedIn organic growth'],
    brandVoice: 'tactical',
    voiceNotes: 'Direct but warm. Competitive energy but genuinely caring. No fluff.',
  } as Record<string, unknown>,
}

// ─── COACH 2: Sparse Data (Anti-Hallucination Stress Test) ──────────────────

const COACH_2 = {
  label: 'Coach 2: Sarah Chen — Financial Wellness (SPARSE — anti-hallucination)',
  data: {
    clientName: 'Sarah Chen',
    businessName: 'Chen Coaching',
    storyBeforeState: 'Former accountant for 10 years.',
    storyTurningPoint: 'Realized I was helping everyone else with money but had no freedom myself.',
    storyAfterState: 'Now a financial wellness coach for freelancers.',
    storyFacts: '- CPA for 10 years\n- Started coaching in 2023\n- Based in Portland, OR',
    whyDoThis: 'Too many talented freelancers are stressed about money when the fix is simple.',
    niche: 'Financial wellness coaching for freelancers',
    targetAudience: 'Freelancers earning $50K-$100K who feel broke despite decent income',
    problemSolved: 'Freelancers who make decent money but have no savings, no plan, and constant money anxiety.',
    unwantedFeelings: 'Anxious about money, overwhelmed, disorganized',
    desiredFeelings: 'Calm, in control, confident about their finances',
    commonObjections: ['I already know how to budget'],
    idealClientCurrentMethods: 'Using free budgeting apps and watching YouTube videos about personal finance',
    aspiringIdentity: 'The Financially Free Freelancer',
    offerName: 'The Freelancer Money Method',
    pricePoint: '$1,997',
    programDuration: '90 days',
    programIncludes: 'Weekly group calls, templates, community',
    transformation: 'From money stress to money confidence in 90 days.',
    uniqueMechanism: 'The Freelancer Money Method — 3 steps to financial confidence.',
    leadMagnetName: 'The Freelancer Finance Checklist',
    ctaType: 'dm-keyword',
    ctaKeyword: 'MONEY',
    salesApproach: 'dm-close',
    deliveryModel: 'group',
    expertise: ['Personal finance', 'Tax planning'],
    brandVoice: 'casual',
    // NO Block 4, NO case studies, NO track record, NO personal details
  } as Record<string, unknown>,
}

// ─── COACH 3: Different Niche — Executive Fitness ───────────────────────────

const COACH_3 = {
  label: 'Coach 3: Derek Thompson — Executive Fitness (different niche + Block 4)',
  data: {
    clientName: 'Derek Thompson',
    businessName: 'Thompson Peak Performance',
    elevatorPitch: 'I help C-suite executives dominate physically and mentally through a 12-month performance protocol.',
    coachingYears: '2 years coaching, 8 years training',
    totalClientsCoached: '200+ total (20 active high-ticket)',
    storyBeforeState: 'Personal trainer for 8 years at a high-end gym, making $65K/year, burned out from 5am starts.',
    storyTurningPoint: 'A CEO client told me: Derek, you changed my life more than my therapist — you should be coaching executives.',
    storyAfterState: 'Now run a high-ticket executive performance coaching business. 20 active clients at $3,500/month each.',
    storyFacts: '- Personal trainer 2014-2022\n- Launched Thompson Peak Performance in 2022\n- 20 active high-ticket clients\n- Revenue: $70K/month\n- NASM & Precision Nutrition certified\n- Published in Men\'s Health online',
    whyDoThis: 'I watched too many powerful men destroy their health chasing success. Your body is your most important business asset.',
    niche: 'Executive performance coaching for C-suite leaders',
    targetAudience: 'Male C-suite executives aged 40-55, earning $300K+, physically declining, stressed',
    problemSolved: 'High-performing executives whose bodies are breaking down from stress and neglect.',
    unwantedFeelings: 'Physically declining, mentally foggy, exhausted, losing their edge',
    desiredFeelings: 'Sharp, energized, powerful, confident in their body',
    commonObjections: ['I dont have time', 'I have a trainer already', 'This seems expensive'],
    idealClientCurrentMethods: 'Paying a gym trainer $100/session 2x/week, occasionally doing a cleanse, buying random supplements',
    aspiringIdentity: '"The Peak CEO" — physically dominant, mentally sharp, radiating energy.',
    // Block 4
    clientExcuse: 'I will start taking care of myself after this quarter. Things are too busy right now.',
    clientFalseProblem: 'They think they just need to find time to work out more. They think it is a scheduling problem.',
    clientRealProblem: 'They have no integrated system connecting training, nutrition, sleep, and stress. Random workouts with a gym trainer are not enough for an executive lifestyle.',
    clientSecretFear: 'They are afraid their body is past the point of no return. They see themselves in the mirror and do not recognize who they have become.',
    clientAngerTrigger: 'Younger executives with half their experience outperforming them because they have more energy and presence.',
    clientInactionConsequence: 'Heart attack scare at 52. Divorced because they were never present. Kids remember a tired, irritable father, not the leader they are at work.',
    offerName: 'The CEO Edge Protocol',
    pricePoint: '$3,500/month (12-month commitment)',
    programDuration: '12 months',
    programIncludes: 'Weekly 1-on-1 strategy calls, custom training programs, nutrition protocol, sleep optimization, quarterly in-person retreats',
    programPhases: [
      { phaseName: 'Reset', description: 'Comprehensive assessment, blood work review, sleep and stress audit', outcome: 'Clear picture of where you are and a personalized roadmap' },
      { phaseName: 'Build', description: 'Progressive training, nutrition dialed in, energy management', outcome: 'Visible physical transformation, 2x energy levels' },
      { phaseName: 'Dominate', description: 'Peak performance optimization, boardroom presence, sustainable integration', outcome: 'Operating at your absolute peak' },
    ],
    transformation: 'BEFORE: Overweight, foggy, low energy. AFTER: Lean, sharp, boundless energy, commanding presence.',
    uniqueMechanism: 'The CEO Edge Protocol — a 3-phase system for executives who refuse to accept physical decline.',
    leadMagnetName: 'The CEO Morning Protocol: 5 Non-Negotiable Habits',
    leadMagnetType: 'pdf-guide',
    ctaType: 'application',
    guaranteeOrRisk: 'No money-back guarantee. This is for serious executives only.',
    caseStudies: [
      { clientName: 'James Hartfield', businessType: 'CFO, SaaS company', beforeState: '48 years old, 30 lbs overweight, pre-diabetic, sleeping 5 hours/night', intervention: 'Custom training 4x/week, nutrition overhaul, sleep protocol', result: 'Lost 28 lbs in 6 months, reversed pre-diabetes, promoted to CEO', timeframe: '8 months', quote: 'Derek didn\'t just change my body — he changed how I show up in every room.' },
    ],
    salesApproach: 'application',
    deliveryModel: 'one-on-one',
    expertise: ['Executive performance', 'Body composition', 'Stress management'],
    brandVoice: 'authoritative',
  } as Record<string, unknown>,
}

// ─── DELIVERABLES TO TEST ────────────────────────────────────────────────────

const PHASE_TESTS = [
  // Phase 1: Blueprint
  { id: 'mission-statement', title: 'Mission Statement', phase: 1 },
  { id: 'human-bio', title: 'Human Bio', phase: 1 },
  { id: 'proof-stack', title: 'Proof Stack', phase: 1 },
  // Phase 2: Money Messaging
  { id: 'magnetic-messaging-statement', title: '4P Power Message', phase: 2 },
  { id: 'emotional-trigger-map', title: 'Emotional Trigger Map', phase: 2 },
  { id: 'usp', title: 'USP', phase: 2 },
  // Phase 3: Mind Shift
  { id: 'two-identities', title: 'Two Identities', phase: 3 },
  { id: 'belief-shift-map', title: 'Belief Shift Map', phase: 3 },
  // Phase 4: Conversion Code
  { id: 'offer-one-sheet', title: 'Offer One-Sheet', phase: 4 },
  { id: 'qualifying-filter', title: 'Qualifying Filter', phase: 4 },
  { id: 'pricing-framework', title: 'Pricing Framework', phase: 4 },
  // Phase 5: Authority Amplifier
  { id: 'facebook-posts', title: 'Facebook Posts', phase: 5 },
  { id: 'facebook-ad-copy', title: 'Facebook Ad Copy', phase: 5 },
]

// ─── GRADING ─────────────────────────────────────────────────────────────────

const HALLUCINATION_MARKERS = [
  /\bgym\b(?! member| trainer)/i, /\bVigor Summit\b/i, /\bWarrior Greens\b/i,
  /\bSam Bakhtiar\b/i, /\bGarrett\s+J\.?\s+White\b/i,
  /\bWake Up Warrior\b/i, /\bfitness studio\b/i,
]

const BLOCK4_MARKERS: Record<string, string[]> = {
  clientExcuse: ['runway', 'not ready yet', 'after this quarter', 'too busy right now'],
  clientFalseProblem: ['followers', 'viral', 'marketing problem', 'scheduling problem', 'find time'],
  clientRealProblem: ['clear offer', 'afraid of selling', 'no system', 'integrated system'],
  clientSecretFear: ['failing publicly', 'tail between', 'go back', 'past the point', 'do not recognize'],
  clientAngerTrigger: ['25-year-old', 'zero experience', 'younger executives', 'half their experience'],
  clientBlameTarget: ['saturated', 'algorithm', 'last coach'],
  clientGuiltShame: ['spouse supported', 'dipping into savings', 'embarrassed'],
  clientInactionConsequence: ['back at a corporate', 'coaching was just a phase', 'heart attack', 'divorced'],
}

interface TestResult {
  coach: string
  templateId: string
  title: string
  phase: number
  status: 'ok' | 'error'
  tokens: number
  contentLength: number
  hallucinations: string[]
  block4Used: number
  block4Total: number
  newFieldsUsed: string[]
  errorMsg?: string
}

async function generateAndGrade(
  coachLabel: string,
  data: Record<string, unknown>,
  templateId: string,
  title: string,
  phase: number,
): Promise<TestResult> {
  process.stdout.write(`  ${title}...`)
  try {
    const result = await generateDeliverable(templateId, data)
    const tokens = result.promptTokens + result.completionTokens
    const content = result.content

    // Hallucination check
    const hallucinations: string[] = []
    for (const p of HALLUCINATION_MARKERS) {
      if (p.test(content)) hallucinations.push(content.match(p)?.[0] || 'unknown')
    }

    // Block 4 usage check
    let block4Used = 0
    let block4Total = 0
    for (const [key, markers] of Object.entries(BLOCK4_MARKERS)) {
      if (data[key]) {
        block4Total++
        if (markers.some(m => content.toLowerCase().includes(m.toLowerCase()))) block4Used++
      }
    }

    // New field usage check
    const newFieldsUsed: string[] = []
    const newFieldChecks: Record<string, string[]> = {
      elevatorPitch: ['help', 'one sentence'],
      upbringing: ['grew up', 'small town', 'shaped'],
      firstBusiness: ['first business', 'detailing', 'car'],
      personalLife: ['married', 'Diana', 'daughters', 'Denver'],
      topComplaints: ['working harder', 'cannot sell myself', 'zero traction'],
      topDesires: ['$10K months', 'quit', 'authority'],
      doneForYou: ['build your', 'set up your', 'design your'],
      billboardResult: ['replace your', 'salary', '6 months'],
      bonuses: ['bonus', 'content calendar', 'recording review'],
    }
    for (const [key, markers] of Object.entries(newFieldChecks)) {
      if (data[key] && markers.some(m => content.toLowerCase().includes(m.toLowerCase()))) {
        newFieldsUsed.push(key)
      }
    }

    const grade = hallucinations.length > 0 ? 'FAIL' : block4Total > 0 && block4Used / block4Total >= 0.3 ? 'A+' : 'A'
    console.log(` ${grade} (${tokens} tok, ${content.length} chars${block4Total > 0 ? `, B4: ${block4Used}/${block4Total}` : ''}${hallucinations.length > 0 ? `, HALL: ${hallucinations.join(',')}` : ''})`)

    return { coach: coachLabel, templateId, title, phase, status: 'ok', tokens, contentLength: content.length, hallucinations, block4Used, block4Total, newFieldsUsed }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.log(` ERROR: ${msg.slice(0, 80)}`)
    return { coach: coachLabel, templateId, title, phase, status: 'error', tokens: 0, contentLength: 0, hallucinations: [], block4Used: 0, block4Total: 0, newFieldsUsed: [], errorMsg: msg }
  }
}

async function runCoachTests(coach: { label: string, data: Record<string, unknown> }, tests: typeof PHASE_TESTS): Promise<TestResult[]> {
  const results: TestResult[] = []
  for (const test of tests) {
    results.push(await generateAndGrade(coach.label, coach.data, test.id, test.title, test.phase))
  }
  return results
}

async function main() {
  console.log('===================================================================')
  console.log('  FULL E2E QUALITY TEST — 3 Coaches × 13 Deliverables')
  console.log('  Tests all 5 phases with new 8-step questionnaire data')
  console.log(`  ${new Date().toISOString()}`)
  console.log('===================================================================\n')

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY not found')
    process.exit(1)
  }

  const allResults: TestResult[] = []

  // Coach 1: Full data
  console.log(`\n▶ ${COACH_1.label}`)
  console.log('─'.repeat(65))
  const c1 = await runCoachTests(COACH_1, PHASE_TESTS)
  allResults.push(...c1)

  // Coach 2: Sparse data (anti-hallucination)
  console.log(`\n▶ ${COACH_2.label}`)
  console.log('─'.repeat(65))
  const c2Tests = PHASE_TESTS.filter(t => [1, 2].includes(t.phase)) // Only test Phases 1-2 for sparse
  const c2 = await runCoachTests(COACH_2, c2Tests)
  allResults.push(...c2)

  // Coach 3: Different niche
  console.log(`\n▶ ${COACH_3.label}`)
  console.log('─'.repeat(65))
  const c3Tests = PHASE_TESTS.filter(t => [1, 2, 3, 4].includes(t.phase)) // Phases 1-4
  const c3 = await runCoachTests(COACH_3, c3Tests)
  allResults.push(...c3)

  // ═══ FINAL REPORT ═══
  console.log('\n\n===================================================================')
  console.log('  FINAL SCORECARD')
  console.log('===================================================================\n')

  const coaches = [COACH_1, COACH_2, COACH_3]
  for (const coach of coaches) {
    const results = allResults.filter(r => r.coach === coach.label)
    const ok = results.filter(r => r.status === 'ok')
    const errors = results.filter(r => r.status === 'error')
    const hallTotal = ok.reduce((s, r) => s + r.hallucinations.length, 0)
    const b4Used = ok.reduce((s, r) => s + r.block4Used, 0)
    const b4Total = ok.reduce((s, r) => s + r.block4Total, 0)
    const totalTokens = ok.reduce((s, r) => s + r.tokens, 0)

    const shortLabel = coach.label.split(':')[1]?.split('—')[0]?.trim() || coach.label
    console.log(`${shortLabel}`)
    console.log(`  Deliverables: ${ok.length}/${results.length} passed, ${errors.length} errors`)
    console.log(`  Hallucinations: ${hallTotal}`)
    console.log(`  Block 4 grounding: ${b4Used}/${b4Total} field-references`)
    console.log(`  Tokens: ${totalTokens.toLocaleString()}`)
    if (errors.length > 0) {
      for (const e of errors) console.log(`  ❌ ${e.title}: ${e.errorMsg?.slice(0, 60)}`)
    }
    console.log()
  }

  // Overall
  const totalOk = allResults.filter(r => r.status === 'ok').length
  const totalErr = allResults.filter(r => r.status === 'error').length
  const totalHall = allResults.reduce((s, r) => s + r.hallucinations.length, 0)
  const totalB4Used = allResults.reduce((s, r) => s + r.block4Used, 0)
  const totalB4 = allResults.reduce((s, r) => s + r.block4Total, 0)
  const totalTokens = allResults.reduce((s, r) => s + r.tokens, 0)

  console.log('───────────────────────────────────────────────────────────────────')
  console.log(`OVERALL: ${totalOk}/${allResults.length} passed, ${totalErr} errors`)
  console.log(`HALLUCINATIONS: ${totalHall}`)
  console.log(`BLOCK 4 GROUNDING: ${totalB4Used}/${totalB4} field-references (${totalB4 > 0 ? Math.round(totalB4Used / totalB4 * 100) : 0}%)`)
  console.log(`TOTAL TOKENS: ${totalTokens.toLocaleString()}`)
  const grade = totalHall === 0 && totalErr === 0 ? 'A+' : totalHall === 0 ? 'A' : 'B'
  console.log(`GRADE: ${grade}`)
  console.log('───────────────────────────────────────────────────────────────────')

  // Save full results
  writeFileSync(
    resolve(process.cwd(), 'scripts', 'test-e2e-results.json'),
    JSON.stringify(allResults, null, 2)
  )
  console.log('\nFull results: scripts/test-e2e-results.json')
}

main().catch(console.error)
