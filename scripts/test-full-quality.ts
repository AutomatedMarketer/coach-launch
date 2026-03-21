/**
 * Full Quality Test — 3 coach profiles, multiple deliverables each.
 * Grades content against Coach Syndicate standards + anti-hallucination rules.
 *
 * Usage: npx tsx scripts/test-full-quality.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { writeFileSync } from 'fs'

config({ path: resolve(import.meta.dirname || __dirname, '..', '.env.local') })

const originalCwd = process.cwd
process.cwd = () => resolve(import.meta.dirname || __dirname, '..')

import { generateDeliverable } from '../src/lib/claude/generate'

// ─── 3 COACH PROFILES ───────────────────────────────────────────────────────

const COACH_1_SALES = {
  label: 'Coach 1: Marcus Rivera — Sales-to-Coaching (Full Data)',
  data: {
    clientName: 'Marcus Rivera',
    businessName: 'Rivera Coaching Co',
    storyBeforeState: 'Corporate sales manager for 14 years at a Fortune 500 tech company making $120K/year. Worked 60-hour weeks, missed my kids growing up.',
    storyTurningPoint: 'Got laid off during a restructure in 2019. Instead of panicking, I realized it was the push I needed. Used my severance to hire a business coach for $8,000.',
    storyAfterState: 'Now run a coaching business helping B2B sales professionals transition to coaching. 35 active clients, work 25 hours a week from home.',
    storyFacts: '- Built Rivera Coaching Co from scratch in 2020\n- Helped 200+ sales professionals over 4 years\n- Host the "Sales to Coaching" podcast (50 episodes)\n- Spoke at 3 industry conferences\n- Clients average $8K/month within 6 months',
    credentials: 'ICF ACC certified, 14 years in enterprise sales',
    personalFamily: 'Married to Diana, two daughters ages 10 and 13',
    personalHobbies: ['Trail running', 'Woodworking', 'Cooking'],
    personalTraits: ['Direct', 'Competitive', 'Empathetic'],
    personalLocation: 'Denver, CO',
    niche: 'Helping B2B sales professionals build profitable coaching businesses',
    targetAudience: 'Men and women 35-50 in B2B sales making $80K-$150K who are burned out and want to leverage their skills into a coaching business',
    problemSolved: 'Talented sales professionals who know how to sell but have no idea how to package their expertise, attract clients online, or build a coaching business from scratch.',
    unwantedFeelings: 'Stuck, undervalued, exhausted, trapped in golden handcuffs, afraid to make the leap',
    desiredFeelings: 'Free, confident, in control, financially secure, doing meaningful work on their own terms',
    commonObjections: ['I have no coaching experience', 'The market is too saturated', 'I need to keep my salary'],
    idealClientCurrentRevenue: '$0-$3K/month from side coaching',
    idealClientCurrentMethods: 'Posting randomly on LinkedIn, cold DMing people, trying to get referrals from friends',
    idealClientStuckDuration: '6-18 months',
    idealClientFailedAttempts: ['Generic online course', 'Hired a VA for outreach with zero results', 'Burned $2K on Facebook ads'],
    idealClientDreamName: 'Stuck Sales Pro',
    salesApproach: 'call-close',
    deliveryModel: 'hybrid',
    offerName: 'The Sales-to-Coaching Accelerator',
    pricePoint: '$5,997 or 3 payments of $2,197',
    programDuration: '6 months',
    programIncludes: '2x monthly 1-on-1 calls, weekly group coaching, private Slack community, done-for-you templates, Voxer access',
    programPhases: [
      { phaseName: 'Foundation', description: 'Build your coaching offer, define your niche, and create your messaging', outcome: 'A clear, compelling offer ready to sell' },
      { phaseName: 'Attraction', description: 'Set up your content system, lead magnet, and organic lead generation', outcome: 'Consistent inbound leads from LinkedIn and podcasts' },
      { phaseName: 'Conversion', description: 'Master sales calls, build your email sequence, and close your first 10 clients', outcome: 'Predictable $8K+/month revenue' },
    ],
    transformation: 'BEFORE: Making $0-$3K/month, working evenings around day job, no pipeline. AFTER: Full-time coach making $8K-$15K/month, 25-30 hours/week.',
    aspiringIdentity: '"The Liberated Coach" — calm, confident, profitable. Making $10K+/month on their own terms.',
    uniqueMechanism: 'The Sales-to-Coaching Method — a 3-phase system that leverages existing sales skills to build a coaching business in 6 months.',
    leadMagnetName: 'The Sales Pro Exit Plan: 5 Steps to Replace Your Salary with Coaching Income',
    leadMagnetType: 'pdf-guide',
    ctaType: 'booking',
    guaranteeOrRisk: 'If you do the work for 90 days without results, I will personally coach you 1-on-1 until you get your first paying client.',
    revenuePerClient: '$5,997',
    caseStudies: [
      { clientName: 'Tom Petersen', businessType: 'Enterprise tech sales, 12 years', beforeState: 'Side-hustling coaching evenings, making $1,200/month', intervention: 'Built his offer around sales leadership, launched LinkedIn content system', result: 'Hit $9,500/month within 4 months, quit day job at month 5', timeframe: '5 months', quote: 'Marcus showed me I already had everything I needed — I just needed the system.' },
      { clientName: 'Rachel Kim', businessType: 'SaaS account executive, 8 years', beforeState: 'Wanted to coach but had zero online presence, no email list', intervention: 'Defined her niche (women in tech sales), built LinkedIn presence, launched podcast', result: 'From $0 to $6,800/month in 6 months, now has a waitlist', timeframe: '6 months', quote: 'I went from invisible to having a waitlist.' },
    ],
    trackRecord: { businessesBuilt: 'Rivera Coaching Co (2020-present)', yearsInIndustry: '4 years coaching + 14 years B2B sales', clientsHelped: '200+', certifications: 'ICF ACC', mediaAppearances: 'Sales to Coaching podcast (50 episodes)' },
    objectionRebuttals: [
      { objection: 'I have no coaching experience', rebuttal: 'You have 10+ years of sales experience. That IS your credential. My system shows you how to package it.' },
      { objection: 'The market is too saturated', rebuttal: 'There are 4 million coaches but almost none specialize in helping sales pros. Your niche is wide open.' },
    ],
    whyDoThis: 'I spent 14 years making someone else rich. Nobody should waste their best years making someone else wealthy.',
    competitorOldWay: 'Most coaching programs teach generic tactics — post on Instagram, run ads, cold DM. They never address the specific advantages sales professionals already have.',
    revenueGoal: '$50K/month',
    revenueGoalDeadline: 'December 2026',
    scarcityElement: 'Next cohort starts April 1st, limited to 8 spots',
    expertise: ['Sales psychology', 'Offer creation', 'LinkedIn organic growth'],
    brandVoice: 'tactical',
    voiceNotes: 'Direct but warm. Competitive energy but genuinely caring.',
  } as Record<string, unknown>,
}

const COACH_2_SPARSE = {
  label: 'Coach 2: Sarah Chen — Financial Wellness (Sparse Data — Anti-Hallucination Test)',
  data: {
    clientName: 'Sarah Chen',
    businessName: 'Chen Coaching',
    storyBeforeState: 'Former accountant for 10 years',
    storyTurningPoint: 'Realized I was helping everyone else with their money but had no freedom myself',
    storyAfterState: 'Now a financial wellness coach',
    storyFacts: '- CPA for 10 years\n- Started coaching in 2023\n- Based in Portland',
    niche: 'Financial wellness coaching for freelancers',
    targetAudience: 'Freelancers earning $50K-$100K who feel broke despite decent income',
    problemSolved: 'Freelancers who make decent money but have no savings, no plan, and constant money anxiety',
    unwantedFeelings: 'Anxious about money, overwhelmed, disorganized',
    desiredFeelings: 'Calm, in control, confident about their finances',
    commonObjections: ['I already know how to budget'],
    idealClientCurrentMethods: 'Using free budgeting apps and watching YouTube videos',
    salesApproach: 'dm-close',
    deliveryModel: 'group',
    offerName: 'The Freelancer Money Method',
    pricePoint: '$1,997',
    programDuration: '90 days',
    programIncludes: 'Weekly group calls, templates, community',
    transformation: 'From money stress to money confidence in 90 days',
    aspiringIdentity: 'The Financially Free Freelancer',
    uniqueMechanism: 'The Freelancer Money Method — 3 steps for freelancers',
    leadMagnetName: 'The Freelancer Finance Checklist',
    ctaType: 'dm-keyword',
    ctaKeyword: 'MONEY',
    expertise: ['Personal finance', 'Tax planning'],
    brandVoice: 'casual',
    whyDoThis: 'I saw too many talented freelancers stressed about money when the fix was simple.',
    // NOTE: No case studies, no track record, no personal details, no program phases
  } as Record<string, unknown>,
}

const COACH_3_FITNESS = {
  label: 'Coach 3: Derek Thompson — Executive Fitness (Different Niche)',
  data: {
    clientName: 'Derek Thompson',
    businessName: 'Thompson Peak Performance',
    storyBeforeState: 'Personal trainer for 8 years at a high-end gym, making $65K/year training clients one-on-one, burned out from 5am starts.',
    storyTurningPoint: 'A CEO client told me "Derek, you changed my life more than my therapist — you should be coaching executives, not counting reps." That conversation changed everything.',
    storyAfterState: 'Now run a high-ticket executive performance coaching business. 20 active clients at $3,500/month each, working from my home office.',
    storyFacts: '- Personal trainer 2014-2022\n- Launched Thompson Peak Performance in 2022\n- 20 active high-ticket clients\n- Revenue: $70K/month\n- NASM & Precision Nutrition certified\n- Published in Men\'s Health online',
    credentials: 'NASM CPT, Precision Nutrition Level 2, 8 years training executives',
    personalFamily: 'Single, lives with rescue dog named Atlas',
    personalHobbies: ['Brazilian jiu-jitsu', 'Meditation', 'Reading biographies'],
    personalTraits: ['Intense', 'Disciplined', 'Calm under pressure'],
    personalLocation: 'Scottsdale, AZ',
    niche: 'Executive performance coaching for C-suite leaders who want to dominate physically and mentally',
    targetAudience: 'Male C-suite executives aged 40-55, earning $300K+, physically declining, stressed, want to perform at their peak in business AND health',
    problemSolved: 'High-performing executives whose bodies are breaking down from stress and neglect, costing them energy, focus, and presence in the boardroom and at home.',
    unwantedFeelings: 'Physically declining, mentally foggy, exhausted, losing their edge, embarrassed by their health',
    desiredFeelings: 'Sharp, energized, powerful, confident in their body, performing at their absolute peak',
    commonObjections: ['I dont have time', 'I have a trainer already', 'This seems expensive'],
    idealClientCurrentRevenue: '$300K-$1M/year salary',
    idealClientCurrentMethods: 'Paying a gym trainer $100/session 2x/week, occasionally doing a cleanse or diet, buying supplements randomly',
    idealClientStuckDuration: '2-5 years of decline',
    idealClientFailedAttempts: ['Gym membership they barely use', 'Tried keto for 3 weeks', 'Hired a trainer who just counts reps'],
    idealClientDreamName: 'The Declining CEO',
    salesApproach: 'application',
    deliveryModel: 'one-on-one',
    offerName: 'The CEO Edge Protocol',
    pricePoint: '$3,500/month (12-month commitment)',
    programDuration: '12 months',
    programIncludes: 'Weekly 1-on-1 strategy calls, custom training programs, nutrition protocol, sleep optimization, quarterly in-person retreats',
    programPhases: [
      { phaseName: 'Reset', description: 'Comprehensive assessment, blood work review, sleep and stress audit, custom baseline protocol', outcome: 'Clear picture of where you are and a personalized roadmap' },
      { phaseName: 'Build', description: 'Progressive training, nutrition dialed in, energy management, executive performance habits', outcome: 'Visible physical transformation, 2x energy levels' },
      { phaseName: 'Dominate', description: 'Peak performance optimization, boardroom presence, sustainable lifestyle integration', outcome: 'Operating at your absolute peak, physically and mentally' },
    ],
    transformation: 'BEFORE: Overweight, foggy, low energy, embarrassed at the beach. AFTER: Lean, sharp, boundless energy, commanding presence in every room.',
    aspiringIdentity: '"The Peak CEO" — physically dominant, mentally sharp, radiating energy and confidence.',
    uniqueMechanism: 'The CEO Edge Protocol — a 3-phase system built specifically for executives who refuse to accept physical decline as the price of success.',
    leadMagnetName: 'The CEO Morning Protocol: 5 Non-Negotiable Habits of High-Performing Executives',
    leadMagnetType: 'pdf-guide',
    ctaType: 'application',
    guaranteeOrRisk: 'No money-back guarantee. This is for serious executives only. If you need a guarantee to commit, this isn\'t for you.',
    revenuePerClient: '$42,000/year',
    caseStudies: [
      { clientName: 'James Hartfield', businessType: 'CFO, SaaS company', beforeState: '48 years old, 30 lbs overweight, pre-diabetic, sleeping 5 hours/night', intervention: 'Custom training 4x/week, complete nutrition overhaul, sleep protocol, stress management', result: 'Lost 28 lbs in 6 months, reversed pre-diabetes, sleeping 7+ hours, got promoted to CEO', timeframe: '8 months', quote: 'Derek didn\'t just change my body — he changed how I show up in every room I walk into.' },
    ],
    trackRecord: { businessesBuilt: 'Thompson Peak Performance (2022-present)', yearsInIndustry: '10 years (8 training + 2 coaching)', clientsHelped: '200+ total (20 active high-ticket)', revenueGenerated: '$70K/month', certifications: 'NASM CPT, Precision Nutrition Level 2', mediaAppearances: 'Published in Men\'s Health online' },
    whyDoThis: 'I watched too many powerful men destroy their health chasing success. Your body is your most important business asset — and most executives treat it like an afterthought.',
    competitorOldWay: 'Traditional personal trainers just count reps. Executive coaches ignore the physical. Nobody combines elite physical training with executive performance coaching.',
    revenueGoal: '$100K/month',
    revenueGoalDeadline: 'June 2027',
    scarcityElement: 'I only take 25 clients at a time. Currently have 5 spots open.',
    expertise: ['Executive performance', 'Body composition', 'Stress management', 'Sleep optimization'],
    brandVoice: 'authoritative',
    voiceNotes: 'Military precision. No fluff. Speaks to CEOs like a peer, not a subordinate. Demanding but respectful.',
  } as Record<string, unknown>,
}

// ─── QUALITY CRITERIA ────────────────────────────────────────────────────────

interface QualityScore {
  factualAccuracy: number    // 0-10: Only uses provided facts
  dataUtilization: number    // 0-10: How well it uses the data given
  structuralQuality: number  // 0-10: Follows template structure
  voiceTone: number          // 0-10: Matches brand voice
  antiHallucination: number  // 0-10: No invented details
  overall: number            // Average
  notes: string[]
}

const HALLUCINATION_MARKERS = [
  /\bgym\b(?! member)/i, /\bVigor Summit\b/i, /\bWarrior Greens\b/i,
  /\bSam Bakhtiar\b/i, /\bGarrett\s+J\.?\s+White\b/i, /\bKevin Nations\b/i,
  /\bWake Up Warrior\b/i, /\bfitness studio\b/i,
]

function gradeContent(
  content: string,
  data: Record<string, unknown>,
  templateId: string,
): QualityScore {
  const notes: string[] = []
  let factualAccuracy = 10
  let dataUtilization = 10
  let structuralQuality = 10
  let voiceTone = 8  // default assumption
  let antiHallucination = 10

  const clientName = data.clientName as string
  const businessName = data.businessName as string

  // --- Anti-hallucination checks ---
  for (const pattern of HALLUCINATION_MARKERS) {
    if (pattern.test(content)) {
      antiHallucination -= 3
      notes.push(`HALLUCINATION: Steve's data leaked — found "${content.match(pattern)?.[0]}"`)
    }
  }

  // Check for [DATA NOT PROVIDED] markers appearing in output
  const rawMarkers = content.match(/\[.*DATA NOT PROVIDED.*\]/g)
  if (rawMarkers) {
    structuralQuality -= 2
    notes.push(`RAW MARKERS: ${rawMarkers.length} "[DATA NOT PROVIDED]" in output`)
  }

  // --- Data utilization checks ---
  if (!content.includes(clientName) && !content.includes(clientName.split(' ')[0])) {
    if (!['mission-statement'].includes(templateId)) { // Mission statements don't always use full name
      dataUtilization -= 1
      notes.push(`Coach name "${clientName}" not referenced`)
    }
  }

  if (businessName && !content.includes(businessName)) {
    if (!['mission-statement', 'human-bio'].includes(templateId)) {
      dataUtilization -= 0.5
    }
  }

  // Check case studies used (if provided)
  const caseStudies = data.caseStudies as Array<{ clientName: string }> | undefined
  if (caseStudies && caseStudies.length > 0 && ['proof-stack', 'core-conversion-content', 'sales-call-script'].includes(templateId)) {
    for (const cs of caseStudies) {
      if (!content.includes(cs.clientName)) {
        dataUtilization -= 1
        notes.push(`Case study "${cs.clientName}" not used`)
      }
    }
  }

  // Check program phases used (if provided)
  const phases = data.programPhases as Array<{ phaseName: string }> | undefined
  if (phases && phases.length > 0 && ['core-conversion-content', 'offer-one-sheet', 'pricing-framework'].includes(templateId)) {
    let phasesFound = 0
    for (const p of phases) {
      if (content.includes(p.phaseName)) phasesFound++
    }
    if (phasesFound === 0) {
      dataUtilization -= 2
      notes.push('Program phases not referenced at all')
    }
  }

  // Check track record used (if provided)
  const trackRecord = data.trackRecord as Record<string, string> | undefined
  if (trackRecord && ['proof-stack', 'about-page'].includes(templateId)) {
    let trUsed = 0
    for (const v of Object.values(trackRecord)) {
      if (v && content.includes(v.slice(0, 20))) trUsed++
    }
    if (trUsed === 0) {
      dataUtilization -= 1
      notes.push('Track record data not utilized')
    }
  }

  // --- Sparse data checks (for Coach 2) ---
  if (!caseStudies || caseStudies.length === 0) {
    // Check for invented client stories
    if (/(?:client|coach)\s+(?:named|called)\s+[A-Z]/i.test(content)) {
      factualAccuracy -= 3
      antiHallucination -= 3
      notes.push('INVENTED CLIENT: Found named client when no case studies were provided')
    }
  }

  if (!data.personalFamily && !data.personalHobbies) {
    // Check for invented personal details
    if (/(?:married|wife|husband|kids|children|daughter|son\b)/i.test(content)) {
      // More careful check — "son" in "person" or "reason" is a false positive
      const personalMatches = content.match(/\b(?:married|wife|husband|kids|children|daughter)\b/i)
      if (personalMatches) {
        factualAccuracy -= 2
        antiHallucination -= 2
        notes.push(`INVENTED PERSONAL: Found "${personalMatches[0]}" but no personal details provided`)
      }
    }
  }

  // --- Structural checks ---
  if (content.length < 200) {
    structuralQuality -= 3
    notes.push('Content too short (under 200 chars)')
  }

  // Check for markdown structure
  if (!content.includes('#') && !content.includes('**')) {
    structuralQuality -= 1
    notes.push('No markdown formatting detected')
  }

  // Clamp scores
  factualAccuracy = Math.max(0, Math.min(10, factualAccuracy))
  dataUtilization = Math.max(0, Math.min(10, dataUtilization))
  structuralQuality = Math.max(0, Math.min(10, structuralQuality))
  voiceTone = Math.max(0, Math.min(10, voiceTone))
  antiHallucination = Math.max(0, Math.min(10, antiHallucination))

  const overall = (factualAccuracy + dataUtilization + structuralQuality + voiceTone + antiHallucination) / 5

  if (notes.length === 0) notes.push('Clean — no issues found')

  return { factualAccuracy, dataUtilization, structuralQuality, voiceTone, antiHallucination, overall, notes }
}

// ─── TEST RUNNER ─────────────────────────────────────────────────────────────

interface TestRun {
  coach: string
  templateId: string
  title: string
  score: QualityScore
  tokens: number
  contentLength: number
  preview: string
  fullContent: string
}

async function generateAndGrade(
  coachLabel: string,
  data: Record<string, unknown>,
  templateId: string,
  title: string,
  context?: string,
): Promise<TestRun> {
  process.stdout.write(`  Generating ${title}...`)
  const start = Date.now()

  try {
    const result = await generateDeliverable(templateId, data, context)
    const elapsed = ((Date.now() - start) / 1000).toFixed(1)
    const score = gradeContent(result.content, data, templateId)
    const tokens = result.promptTokens + result.completionTokens

    const grade = score.overall >= 9 ? 'A+' : score.overall >= 8 ? 'A' : score.overall >= 7 ? 'B+' : score.overall >= 6 ? 'B' : score.overall >= 5 ? 'C' : 'D'

    console.log(` ${grade} (${score.overall.toFixed(1)}/10) — ${tokens} tokens, ${elapsed}s`)

    if (score.notes.some(n => !n.startsWith('Clean'))) {
      for (const note of score.notes) {
        if (!note.startsWith('Clean')) console.log(`    ⚠️  ${note}`)
      }
    }

    return {
      coach: coachLabel,
      templateId,
      title,
      score,
      tokens,
      contentLength: result.content.length,
      preview: result.content.slice(0, 300),
      fullContent: result.content,
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.log(` ❌ ERROR: ${msg}`)
    return {
      coach: coachLabel,
      templateId,
      title,
      score: { factualAccuracy: 0, dataUtilization: 0, structuralQuality: 0, voiceTone: 0, antiHallucination: 0, overall: 0, notes: [`ERROR: ${msg}`] },
      tokens: 0,
      contentLength: 0,
      preview: '',
      fullContent: '',
    }
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════════')
  console.log('  COACH LAUNCH — FULL QUALITY TEST SUITE')
  console.log('  3 Coach Profiles × Multiple Deliverables')
  console.log(`  ${new Date().toISOString()}`)
  console.log('═══════════════════════════════════════════════════════════════════\n')

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY not found. Set it in app/.env.local')
    process.exit(1)
  }

  const allResults: TestRun[] = []

  // ═══ COACH 1: Full Data — Test new Blueprint phase + core deliverables ═══
  console.log(`\n▶ ${COACH_1_SALES.label}`)
  console.log('─'.repeat(65))

  // Phase 1: Blueprint
  const c1Mission = await generateAndGrade(COACH_1_SALES.label, COACH_1_SALES.data, 'mission-statement', 'Mission Statement')
  allResults.push(c1Mission)

  const c1Bio = await generateAndGrade(COACH_1_SALES.label, COACH_1_SALES.data, 'human-bio', 'Human Bio')
  allResults.push(c1Bio)

  const c1Proof = await generateAndGrade(COACH_1_SALES.label, COACH_1_SALES.data, 'proof-stack', 'Proof Stack')
  allResults.push(c1Proof)

  // Phase 2: Money Messaging
  const c1Msg = await generateAndGrade(COACH_1_SALES.label, COACH_1_SALES.data, 'magnetic-messaging-statement', '4P Power Message')
  allResults.push(c1Msg)

  const c1Usp = await generateAndGrade(COACH_1_SALES.label, COACH_1_SALES.data, 'usp', 'USP')
  allResults.push(c1Usp)

  // ═══ COACH 2: Sparse Data — Anti-hallucination stress test ═══
  console.log(`\n▶ ${COACH_2_SPARSE.label}`)
  console.log('─'.repeat(65))

  const c2Mission = await generateAndGrade(COACH_2_SPARSE.label, COACH_2_SPARSE.data, 'mission-statement', 'Mission Statement')
  allResults.push(c2Mission)

  const c2Msg = await generateAndGrade(COACH_2_SPARSE.label, COACH_2_SPARSE.data, 'magnetic-messaging-statement', '4P Power Message')
  allResults.push(c2Msg)

  const c2Bio = await generateAndGrade(COACH_2_SPARSE.label, COACH_2_SPARSE.data, 'human-bio', 'Human Bio')
  allResults.push(c2Bio)

  // ═══ COACH 3: Different Niche — Test versatility ═══
  console.log(`\n▶ ${COACH_3_FITNESS.label}`)
  console.log('─'.repeat(65))

  const c3Mission = await generateAndGrade(COACH_3_FITNESS.label, COACH_3_FITNESS.data, 'mission-statement', 'Mission Statement')
  allResults.push(c3Mission)

  const c3Proof = await generateAndGrade(COACH_3_FITNESS.label, COACH_3_FITNESS.data, 'proof-stack', 'Proof Stack')
  allResults.push(c3Proof)

  const c3Usp = await generateAndGrade(COACH_3_FITNESS.label, COACH_3_FITNESS.data, 'usp', 'USP')
  allResults.push(c3Usp)

  const c3Pricing = await generateAndGrade(COACH_3_FITNESS.label, COACH_3_FITNESS.data, 'pricing-framework', 'Pricing Framework')
  allResults.push(c3Pricing)

  // ═══ FINAL REPORT ═══
  console.log('\n\n═══════════════════════════════════════════════════════════════════')
  console.log('  FINAL SCORECARD')
  console.log('═══════════════════════════════════════════════════════════════════\n')

  // Per-coach summary
  for (const coach of [COACH_1_SALES, COACH_2_SPARSE, COACH_3_FITNESS]) {
    const coachResults = allResults.filter(r => r.coach === coach.label)
    const avgScore = coachResults.reduce((s, r) => s + r.score.overall, 0) / coachResults.length
    const totalTokens = coachResults.reduce((s, r) => s + r.tokens, 0)
    const grade = avgScore >= 9 ? 'A+' : avgScore >= 8 ? 'A' : avgScore >= 7 ? 'B+' : avgScore >= 6 ? 'B' : avgScore >= 5 ? 'C' : 'D'

    console.log(`${grade} ${coach.label.split(':')[1]?.trim() || coach.label}`)
    for (const r of coachResults) {
      const g = r.score.overall >= 9 ? 'A+' : r.score.overall >= 8 ? 'A' : r.score.overall >= 7 ? 'B+' : r.score.overall >= 6 ? 'B' : 'C'
      console.log(`   ${g}  ${r.title} — Fact:${r.score.factualAccuracy} Data:${r.score.dataUtilization} Struct:${r.score.structuralQuality} Voice:${r.score.voiceTone} AntiHall:${r.score.antiHallucination}`)
    }
    console.log(`   AVG: ${avgScore.toFixed(1)}/10 | ${totalTokens} tokens\n`)
  }

  // Overall
  const overallAvg = allResults.reduce((s, r) => s + r.score.overall, 0) / allResults.length
  const totalTokens = allResults.reduce((s, r) => s + r.tokens, 0)
  const hallIssues = allResults.filter(r => r.score.antiHallucination < 10).length
  const overallGrade = overallAvg >= 9 ? 'A+' : overallAvg >= 8 ? 'A' : overallAvg >= 7 ? 'B+' : overallAvg >= 6 ? 'B' : 'C'

  console.log('───────────────────────────────────────────────────────────────────')
  console.log(`OVERALL GRADE: ${overallGrade} (${overallAvg.toFixed(1)}/10)`)
  console.log(`Total deliverables: ${allResults.length}`)
  console.log(`Total tokens: ${totalTokens}`)
  console.log(`Hallucination issues: ${hallIssues}/${allResults.length}`)
  console.log('───────────────────────────────────────────────────────────────────')

  // Write full results with content
  const outputPath = resolve(process.cwd(), 'scripts', 'test-full-results.json')
  writeFileSync(outputPath, JSON.stringify(allResults.map(r => ({
    ...r,
    fullContent: r.fullContent.slice(0, 2000) + (r.fullContent.length > 2000 ? '...[truncated]' : ''),
  })), null, 2))
  console.log(`\nFull results: ${outputPath}`)
}

main().catch(console.error)
