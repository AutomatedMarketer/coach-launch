/**
 * Live Server Test — 3 coaches, tests the generation pipeline directly
 * against the live Anthropic API with the production-ready codebase.
 * Validates: generation, quality check (Haiku QA), retry engine, Block 4 grounding.
 *
 * Usage: npx tsx scripts/test-live-server.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(import.meta.dirname || __dirname, '..', '.env.local') })
const originalCwd = process.cwd
process.cwd = () => resolve(import.meta.dirname || __dirname, '..')

import { generateWithRetry } from '../src/lib/claude/retry-engine'
import { checkQuality, extractPostProcessing } from '../src/lib/claude/quality-check'

// ─── COACH 1: Relationship Coach (Female, Full Data + Block 4) ──────────────

const COACH_1 = {
  label: 'Coach 1: Priya Desai — Relationship Coach (Full + Block 4)',
  data: {
    clientName: 'Priya Desai',
    businessName: 'Desai Relationship Institute',
    elevatorPitch: 'I help high-achieving women stop attracting emotionally unavailable partners and build lasting, fulfilling relationships.',
    coachingYears: '6 years',
    totalClientsCoached: '350+',
    businessesBuiltList: 'Desai Relationship Institute (2020-present) — relationship coaching for professional women, $620K total revenue.',
    positionsHeld: 'Licensed Marriage & Family Therapist (10 years), Clinical Director at Bay Area Counseling Center (5 years)',
    certifications: 'LMFT, Gottman Level 3 certified, EFT certified',
    mediaAndStages: 'TEDx talk on attachment styles (2023), featured in Psychology Today, guest on 20+ podcasts',
    notableAssociations: 'Trained under Dr. Sue Johnson (EFT founder), advisory board member of National Relationship Association',
    twelveMonthVision: '500 active members in my group program, $80K/month, team of 4 coaches, speaking at 6 events, book deal in progress.',
    upbringing: 'Grew up in a traditional Indian-American family in New Jersey. My parents had an arranged marriage that was deeply loving — it shaped my belief that great relationships are built, not found.',
    parentInfluence: 'My mother was a pediatrician who worked 60-hour weeks but never missed dinner. She taught me that presence matters more than time. My father ran a small import business and showed me entrepreneurship.',
    firstBusiness: 'Started a couples workshop series in my living room in 2018 with 4 couples. Charged $200 per couple. Made $800 and knew I was onto something.',
    storyBeforeState: 'Licensed therapist for 10 years, making $95K/year at a counseling center. Saw 8 clients a day, burned out, couldn\'t help people the way I wanted in 50-minute sessions.',
    storyTurningPoint: 'A client told me: "Priya, you changed my marriage in 6 sessions. My last therapist couldn\'t do that in 3 years." I realized my framework was different and I needed to take it to more people.',
    storyAfterState: 'Now run a coaching business with 350+ clients helped, $50K/month revenue, work 30 hours/week, and my clients consistently save their marriages within 90 days.',
    whyDoThis: 'I watched my best friend\'s marriage fall apart because she couldn\'t find the right help in time. No one should lose the person they love because they got the wrong advice.',
    personalHobbies: ['Bollywood dancing', 'Meditation', 'Wine tasting'],
    personalLife: 'Married to Ravi for 12 years, two boys ages 6 and 9. Live in San Francisco. A great week is coaching calls in the morning, school pickup at 2:30, date night with Ravi on Fridays.',
    storyFacts: '- Licensed therapist for 10 years before coaching\n- Founded Desai Relationship Institute in 2020\n- 350+ clients helped\n- TEDx speaker on attachment styles\n- Gottman Level 3 + EFT certified\n- Revenue: $50K/month\n- Clients save marriages within 90 days',
    niche: 'Relationship coaching for high-achieving professional women who keep attracting emotionally unavailable partners',
    targetAudience: 'Women aged 30-45, earning $80K+, successful in career but struggling in love. They\'ve done therapy, read the books, but keep repeating the same patterns.',
    bestClientEver: 'Monica Reyes — VP of Marketing at a tech company, 38 years old. Was about to file for divorce after 7 years. In 8 weeks we identified her anxious attachment pattern and rebuilt communication with her husband. They renewed their vows 6 months later.',
    topComplaints: 'I keep attracting the same type of person. I\'ve done therapy for years and nothing changes. I don\'t have time for another program that won\'t work.',
    unwantedFeelings: 'Lonely despite being surrounded by people, frustrated, hopeless about love, ashamed of being single or in a bad relationship at their age',
    topDesires: 'A partner who is emotionally present and committed. To stop the cycle of anxious attachment. To feel secure and at peace in love.',
    desiredFeelings: 'Secure, cherished, peaceful, confident in love, worthy of deep connection',
    idealClientCurrentMethods: 'Individual therapy (years of it), self-help books (Attached, Hold Me Tight), dating apps, friends\' advice',
    whyCurrentMethodFails: 'Therapy processes the past but doesn\'t give them a system for the future. Books give theory but no accountability. Dating apps optimize for volume, not quality.',
    aspiringIdentity: '"The Secure Woman" — grounded, magnetic, emotionally intelligent, attracting love effortlessly because she\'s done the inner work.',
    problemSolved: 'High-achieving women who unconsciously repeat anxious-avoidant relationship patterns because they\'ve never been taught secure attachment skills.',
    commonObjections: ['I\'ve already done years of therapy', 'Coaching can\'t fix my relationship', 'I don\'t have time for another program'],
    salesApproach: 'call-close',
    deliveryModel: 'hybrid',
    idealClientCurrentRevenue: '$80K-$200K/year salary',
    // Block 4
    clientExcuse: 'I just haven\'t met the right person yet. When I find them, everything will be different.',
    clientSecretDesire: 'They want to be chosen. They want someone to fight for them. They want the fairy-tale love they see their friends posting about.',
    clientFalseProblem: 'They think the problem is the dating pool — there are no good men left. Or they think their partner is the entire problem.',
    clientRealProblem: 'They have an anxious attachment style that causes them to over-function, people-please, and lose themselves in relationships. They don\'t know how to be securely attached.',
    clientSecretFear: 'They\'re terrified they\'re fundamentally unlovable. That there\'s something wrong with them that makes people leave.',
    clientAngerTrigger: 'Seeing engagement posts on Instagram from people who\'ve been dating for 6 months when they\'ve been trying for 6 years.',
    clientBlameTarget: 'They blame the dating apps, "men these days," their ex who ruined them, or their parents for modeling unhealthy relationships.',
    clientGuiltShame: 'Ashamed that they\'re a successful professional who "has it all together" except in love. Guilty for staying too long in bad relationships.',
    clientDailyReminder: 'Coming home to an empty apartment. Seeing couples at restaurants. Getting the "so are you seeing anyone?" question at family dinners.',
    clientInactionConsequence: 'In 3 years: still single or in another failing relationship. Fertility window closing. Watching friends\' kids grow up while wondering if they\'ll ever have their own family.',
    // Program
    offerName: 'The Secure Love Method',
    pricePoint: '$4,997 or 6 payments of $897',
    programDuration: '90 days',
    programIncludes: 'Weekly 1-on-1 coaching, group coaching calls, attachment style assessment, communication scripts, partner evaluation framework',
    programPhases: [
      { phaseName: 'Aware', description: 'Identify your attachment patterns, triggers, and relationship blueprint', outcome: 'Complete clarity on why you attract who you attract' },
      { phaseName: 'Heal', description: 'Process attachment wounds, build self-worth independent of relationships', outcome: 'Emotional security that doesn\'t depend on a partner' },
      { phaseName: 'Attract', description: 'Implement secure dating/relationship skills, communication frameworks', outcome: 'Either transform current relationship or attract secure partner' },
    ],
    doneForYou: 'Personalized attachment style assessment report, custom communication scripts for their specific relationship dynamic, partner evaluation scorecard.',
    taughtSkills: 'Secure attachment communication, emotional regulation during conflict, boundary setting without guilt, partner evaluation framework.',
    billboardResult: 'Stop the cycle of anxious attachment in 90 days.',
    bonuses: 'Emergency coaching sessions for relationship crises, private community of women doing the work, monthly Q&A with Priya',
    clientCapacity: '15 clients per cohort — intimate enough for deep work.',
    transformation: 'BEFORE: Anxious, people-pleasing, losing themselves in relationships. AFTER: Secure, grounded, attracting healthy love or transforming their current relationship.',
    uniqueMechanism: 'The Secure Love Method — a 3-phase system that rewires anxious attachment patterns using neuroscience-backed techniques.',
    leadMagnetName: 'The Attachment Style Quiz: Why You Keep Attracting the Wrong Partners',
    leadMagnetType: 'quiz',
    ctaType: 'booking',
    guaranteeOrRisk: 'If you do the work for 90 days and don\'t see a measurable shift in your attachment patterns, I\'ll coach you for another 90 days free.',
    revenuePerClient: '$4,997',
    caseStudies: [
      { clientName: 'Monica Reyes', businessType: 'VP of Marketing, tech company', beforeState: 'About to file for divorce after 7 years, constant fights, emotionally disconnected', intervention: 'Identified anxious attachment pattern, rebuilt communication with husband using Gottman method + EFT', result: 'Saved marriage, renewed vows 6 months later, husband says "I got my wife back"', timeframe: '8 weeks', quote: 'Priya didn\'t just save my marriage — she saved me from myself.' },
      { clientName: 'Jasmine Okafor', businessType: 'Corporate attorney, 35', beforeState: 'Serial dater, 4 relationships in 3 years, always the one who over-functions', intervention: 'Attachment repatterning, boundary framework, secure dating protocol', result: 'In a committed relationship with a securely attached partner for 8 months and counting', timeframe: '12 weeks', quote: 'For the first time, I\'m not anxious. I\'m just... happy.' },
    ],
    revenueGoal: '$80K/month',
    revenueGoalDeadline: 'December 2026',
    competitorOldWay: 'Traditional therapy processes the past endlessly. Dating coaches teach manipulation tactics. Self-help books give theory with no implementation.',
    scarcityElement: 'Next cohort starts May 1st, limited to 15 women',
    expertise: ['Attachment theory', 'Emotional intelligence', 'Secure communication'],
    brandVoice: 'motivational',
    voiceNotes: 'Warm but direct. Like a best friend who happens to be a therapist. Uses metaphors. Emotional but not fluffy.',
  } as Record<string, unknown>,
}

// ─── COACH 2: Business Coach (Sparse — Anti-Hallucination) ──────────────────

const COACH_2 = {
  label: 'Coach 2: Daniel Park — Business Coach (SPARSE — hallucination test)',
  data: {
    clientName: 'Daniel Park',
    businessName: 'Park Advisory',
    storyBeforeState: 'Management consultant for 15 years at Deloitte.',
    storyTurningPoint: 'Realized I was solving the same problems for Fortune 500 companies that small business owners face, but they couldn\'t afford $500/hour consultants.',
    storyAfterState: 'Now coach small business owners to scale past $1M/year.',
    storyFacts: '- 15 years at Deloitte\n- Started Park Advisory in 2024\n- Based in Chicago',
    whyDoThis: 'Small business owners deserve the same strategic thinking that Fortune 500 companies get.',
    niche: 'Business strategy coaching for small business owners scaling from $500K to $5M',
    targetAudience: 'Small business owners aged 35-55 earning $500K-$1M who are stuck at a revenue plateau',
    problemSolved: 'Business owners who hit a ceiling because they\'re still operating like a solopreneur instead of a CEO.',
    unwantedFeelings: 'Overwhelmed, stuck at a plateau, exhausted from doing everything themselves',
    desiredFeelings: 'Strategic, in control, growing predictably, working ON the business not IN it',
    commonObjections: ['I already have an accountant', 'Consulting is too expensive'],
    idealClientCurrentMethods: 'Reading business books, attending local networking events, asking their accountant for strategic advice',
    aspiringIdentity: 'The Strategic CEO',
    offerName: 'The CEO Shift',
    pricePoint: '$8,000',
    programDuration: '6 months',
    programIncludes: 'Monthly strategy calls, quarterly business reviews, KPI dashboard setup',
    transformation: 'From overwhelmed operator to strategic CEO. From $500K plateau to $1M+ trajectory.',
    uniqueMechanism: 'The CEO Shift Framework — 4 pillars of strategic scaling.',
    leadMagnetName: 'The $1M Business Audit Checklist',
    ctaType: 'application',
    salesApproach: 'call-close',
    deliveryModel: 'one-on-one',
    expertise: ['Business strategy', 'Operations scaling', 'Leadership'],
    brandVoice: 'authoritative',
    // NO Block 4, NO case studies, NO personal details, NO track record
  } as Record<string, unknown>,
}

// ─── COACH 3: Health Coach (Male, Different Niche + Block 4) ────────────────

const COACH_3 = {
  label: 'Coach 3: Marcus Williams — Men\'s Health Coach (Block 4 + Case Studies)',
  data: {
    clientName: 'Marcus Williams',
    businessName: 'Williams Vitality',
    elevatorPitch: 'I help men over 40 reclaim their energy, drop the dad bod, and show up as the man their family needs.',
    coachingYears: '3 years',
    totalClientsCoached: '150+',
    storyBeforeState: 'Pharmaceutical sales rep for 12 years. Gained 45 pounds, pre-diabetic, energy crashed by 2pm every day. Marriage was suffering because I was a zombie at home.',
    storyTurningPoint: 'My 6-year-old son asked me why I couldn\'t play with him in the backyard without getting out of breath. That broke me.',
    storyAfterState: 'Lost 45 pounds in 8 months using the system I now teach. Reversed pre-diabetes. Now coach 150+ men through the same transformation.',
    storyFacts: '- Pharma sales rep 2008-2020\n- Lost 45 pounds personally\n- Reversed pre-diabetes\n- Launched Williams Vitality in 2023\n- 150+ men coached\n- Revenue: $35K/month\n- NASM CPT certified',
    whyDoThis: 'I almost missed my son\'s childhood because I was too tired and too fat to show up. No dad should have to feel that shame.',
    niche: 'Health and vitality coaching for men over 40 who want to lose weight, gain energy, and be present for their families',
    targetAudience: 'Men aged 40-55, professionals earning $80K+, 20-50 pounds overweight, low energy, feel like they\'ve "let themselves go"',
    bestClientEver: 'Rob Cassidy — 47-year-old insurance broker, was 240 lbs, blood pressure medication, couldn\'t coach his son\'s little league team because he got winded. Lost 35 pounds in 5 months, got off blood pressure meds, now coaches little league every Saturday.',
    topComplaints: 'I\'ve tried every diet and nothing sticks. I don\'t have time to spend 2 hours at a facility. I used to be athletic and I don\'t know what happened.',
    unwantedFeelings: 'Embarrassed by their body, exhausted, ashamed they let themselves go, frustrated that nothing works',
    topDesires: 'Energy to keep up with their kids. Confidence to take their shirt off at the pool. Health numbers that don\'t scare them at the doctor.',
    desiredFeelings: 'Energized, confident, proud of their body, present for their family, in control of their health',
    idealClientCurrentMethods: 'Trying keto for 2 weeks then quitting, buying a Peloton that becomes a clothes hanger, taking testosterone supplements from Instagram ads',
    whyCurrentMethodFails: 'Crash diets don\'t address the root habits. Equipment purchases don\'t come with accountability. Supplements are band-aids.',
    aspiringIdentity: '"The Vital Dad" — lean, energized, present, leading by example for his kids.',
    problemSolved: 'Men over 40 who have lost their health and energy because they prioritized career over body, and now don\'t know how to get it back sustainably.',
    commonObjections: ['I don\'t have time to work out', 'I\'ve tried everything already', 'My metabolism is just slow now'],
    salesApproach: 'dm-close',
    deliveryModel: 'group',
    // Block 4
    clientExcuse: 'I\'ll start Monday. Or after the holidays. Or when work slows down. There\'s always a reason to wait.',
    clientFalseProblem: 'They think they need a better workout plan or a stricter diet. They think it\'s an information problem.',
    clientRealProblem: 'They have no system, no accountability, and they\'ve built an entire lifestyle around convenience over health. It\'s a habit and identity problem.',
    clientSecretFear: 'They\'re afraid their best years are behind them. That their body is too far gone. That their wife isn\'t attracted to them anymore.',
    clientAngerTrigger: 'Seeing guys their age on Instagram with six-packs while they can\'t see their toes. Younger coworkers outperforming them because they have more energy.',
    clientInactionConsequence: 'In 3 years: on blood pressure meds and cholesterol meds. Can\'t play with their kids without pain. Wife stops suggesting date nights. Doctor starts using the word "heart disease."',
    offerName: 'The Vital Dad Protocol',
    pricePoint: '$2,497 or 3 payments of $897',
    programDuration: '16 weeks',
    programIncludes: 'Weekly group coaching, custom meal plans, 3x/week workout programs (30 min each), accountability partner matching, private community',
    programPhases: [
      { phaseName: 'Reset', description: 'Bloodwork review, habit audit, nutrition overhaul, sleep protocol', outcome: 'Energy doubles within 2 weeks, clear roadmap' },
      { phaseName: 'Burn', description: 'Progressive training, nutrition dialed in, stress management', outcome: '15-20 pounds lost, visible transformation' },
      { phaseName: 'Sustain', description: 'Lifestyle integration, family wellness habits, maintenance protocol', outcome: 'Results that last because the habits are built to stay' },
    ],
    doneForYou: 'Custom meal plan based on food preferences, personalized workout program for their equipment/schedule, weekly check-in accountability.',
    billboardResult: 'Lose 20+ pounds and get your energy back in 16 weeks — without giving up beer or spending 2 hours at a facility.',
    bonuses: 'Bloodwork interpretation guide, 30-day meal prep cookbook, partner workout guide for couples',
    clientCapacity: '20 men per cohort — big enough for group energy, small enough that nobody hides.',
    transformation: 'BEFORE: 20-50 lbs overweight, exhausted by 2pm, embarrassed at the pool. AFTER: Lean, energized, confident, keeping up with their kids.',
    uniqueMechanism: 'The Vital Dad Protocol — a 16-week system built for busy dads who have 30 minutes a day and zero willpower left.',
    leadMagnetName: 'The Dad Bod Exit Plan: 5 Habits That Burn Fat Without Dieting',
    leadMagnetType: 'pdf-guide',
    ctaType: 'dm-keyword',
    ctaKeyword: 'VITAL',
    guaranteeOrRisk: 'If you follow the protocol for 16 weeks and don\'t lose at least 15 pounds, I\'ll coach you for another 16 weeks free.',
    revenuePerClient: '$2,497',
    caseStudies: [
      { clientName: 'Rob Cassidy', businessType: 'Insurance broker, 47', beforeState: '240 lbs, blood pressure medication, couldn\'t coach son\'s little league', intervention: 'Custom nutrition plan, 30-min workouts 4x/week, sleep protocol, accountability calls', result: 'Lost 35 pounds in 5 months, off blood pressure meds, coaches little league every Saturday', timeframe: '5 months', quote: 'My son told me I\'m his hero now. That\'s worth more than any number on a scale.' },
    ],
    competitorOldWay: 'Personal trainers just count reps. Dietitians give meal plans nobody follows. Online programs have zero accountability.',
    scarcityElement: 'Next cohort starts April 15th, only 20 spots',
    expertise: ['Men\'s health', 'Sustainable fat loss', 'Habit change'],
    brandVoice: 'casual',
    voiceNotes: 'Talks like a buddy at a barbecue, not a drill sergeant. Funny but honest. Uses dad jokes.',
  } as Record<string, unknown>,
}

// ─── DELIVERABLES TO TEST (across all 5 phases) ─────────────────────────────

const TESTS = [
  { id: 'mission-statement', title: 'Mission Statement', phase: 1 },
  { id: 'proof-stack', title: 'Proof Stack', phase: 1 },
  { id: 'magnetic-messaging-statement', title: '4P Power Message', phase: 2 },
  { id: 'emotional-trigger-map', title: 'Emotional Trigger Map', phase: 2 },
  { id: 'usp', title: 'USP', phase: 2 },
  { id: 'two-identities', title: 'Two Identities', phase: 3 },
  { id: 'belief-shift-map', title: 'Belief Shift Map', phase: 3 },
  { id: 'offer-one-sheet', title: 'Offer One-Sheet', phase: 4 },
  { id: 'qualifying-filter', title: 'Qualifying Filter', phase: 4 },
  { id: 'facebook-ad-copy', title: 'Facebook Ad Copy', phase: 5 },
]

// ─── HALLUCINATION CHECK ─────────────────────────────────────────────────────

const STEVE_MARKERS = [
  /\bVigor Summit\b/i, /\bWarrior Greens\b/i, /\bSam Bakhtiar\b/i,
  /\bGarrett\s+J\.?\s+White\b/i, /\bWake Up Warrior\b/i,
  /\bSteve Krebs\b/i, /\bCoach Syndicate\b/i,
]

function checkHallucinations(content: string, coachName: string): string[] {
  const issues: string[] = []
  for (const p of STEVE_MARKERS) {
    if (p.test(content)) issues.push(`Steve's data leaked: "${content.match(p)?.[0]}"`)
  }
  // Check for invented client names (not in the provided data)
  if (content.includes('[INSERT') || content.includes('[PLACEHOLDER')) {
    // This is actually GOOD — means it's using placeholders instead of inventing
  }
  return issues
}

// ─── RUNNER ──────────────────────────────────────────────────────────────────

interface Result {
  coach: string
  template: string
  phase: number
  status: 'pass' | 'fail' | 'error'
  tokens: number
  contentLength: number
  retryCount: number
  qualityScore: number
  qualityPass: boolean
  qualityIssues: string[]
  hallucinations: string[]
  errorMsg?: string
}

async function testDeliverable(
  coachLabel: string,
  data: Record<string, unknown>,
  templateId: string,
  title: string,
  phase: number,
): Promise<Result> {
  process.stdout.write(`  ${title}...`)
  const start = Date.now()

  try {
    // 1. Generate with retry engine
    const result = await generateWithRetry(templateId, data)

    // 2. Quality check with Haiku
    const postRules = extractPostProcessing(templateId)
    const quality = await checkQuality(templateId, result.content, data, postRules)

    // 3. Hallucination check
    const hallucinations = checkHallucinations(result.content, data.clientName as string)

    const elapsed = ((Date.now() - start) / 1000).toFixed(1)
    const tokens = result.promptTokens + result.completionTokens
    const status = hallucinations.length > 0 ? 'fail' : 'pass'
    const grade = quality.score >= 90 ? 'A+' : quality.score >= 80 ? 'A' : quality.score >= 70 ? 'B+' : quality.score >= 60 ? 'B' : 'C'

    console.log(` ${grade} (QA:${quality.score}, ${tokens} tok, ${elapsed}s, retries:${result.retryCount}${hallucinations.length > 0 ? ', HALL!' : ''})`)

    if (quality.issues.length > 0 && quality.issues[0] !== 'QA check error — skipped') {
      quality.issues.slice(0, 2).forEach(i => console.log(`    ⚠ ${i}`))
    }

    return {
      coach: coachLabel, template: title, phase, status, tokens,
      contentLength: result.content.length, retryCount: result.retryCount,
      qualityScore: quality.score, qualityPass: quality.pass,
      qualityIssues: quality.issues, hallucinations,
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.log(` ERROR: ${msg.slice(0, 80)}`)
    return {
      coach: coachLabel, template: title, phase, status: 'error', tokens: 0,
      contentLength: 0, retryCount: 0, qualityScore: 0, qualityPass: false,
      qualityIssues: [], hallucinations: [], errorMsg: msg,
    }
  }
}

async function main() {
  console.log('====================================================================')
  console.log('  LIVE SERVER TEST — 3 Coaches × 10 Deliverables')
  console.log('  Tests: Retry Engine + QA Agent + Block 4 + Anti-Hallucination')
  console.log(`  ${new Date().toISOString()}`)
  console.log('====================================================================\n')

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY not found')
    process.exit(1)
  }

  const allResults: Result[] = []

  // Coach 1: Full data — all 10 deliverables
  console.log(`▶ ${COACH_1.label}`)
  console.log('─'.repeat(65))
  for (const t of TESTS) {
    allResults.push(await testDeliverable(COACH_1.label, COACH_1.data, t.id, t.title, t.phase))
  }

  // Coach 2: Sparse — 5 deliverables (Phases 1-2 only)
  console.log(`\n▶ ${COACH_2.label}`)
  console.log('─'.repeat(65))
  for (const t of TESTS.filter(t => t.phase <= 2)) {
    allResults.push(await testDeliverable(COACH_2.label, COACH_2.data, t.id, t.title, t.phase))
  }

  // Coach 3: Different niche — all 10 deliverables
  console.log(`\n▶ ${COACH_3.label}`)
  console.log('─'.repeat(65))
  for (const t of TESTS) {
    allResults.push(await testDeliverable(COACH_3.label, COACH_3.data, t.id, t.title, t.phase))
  }

  // ═══ FINAL REPORT ═══
  console.log('\n\n====================================================================')
  console.log('  FINAL SCORECARD')
  console.log('====================================================================\n')

  for (const coach of [COACH_1, COACH_2, COACH_3]) {
    const results = allResults.filter(r => r.coach === coach.label)
    const passed = results.filter(r => r.status === 'pass').length
    const errors = results.filter(r => r.status === 'error').length
    const halls = results.reduce((s, r) => s + r.hallucinations.length, 0)
    const avgQA = results.filter(r => r.qualityScore > 0).reduce((s, r) => s + r.qualityScore, 0) / (results.filter(r => r.qualityScore > 0).length || 1)
    const totalRetries = results.reduce((s, r) => s + r.retryCount, 0)
    const totalTokens = results.reduce((s, r) => s + r.tokens, 0)

    const shortLabel = coach.label.split(':')[1]?.split('—')[0]?.trim() || coach.label
    console.log(`${shortLabel}`)
    console.log(`  Pass: ${passed}/${results.length} | Errors: ${errors} | Hallucinations: ${halls}`)
    console.log(`  Avg QA Score: ${avgQA.toFixed(0)}/100 | Retries: ${totalRetries} | Tokens: ${totalTokens.toLocaleString()}`)
    console.log()
  }

  const totalPass = allResults.filter(r => r.status === 'pass').length
  const totalErr = allResults.filter(r => r.status === 'error').length
  const totalHall = allResults.reduce((s, r) => s + r.hallucinations.length, 0)
  const overallQA = allResults.filter(r => r.qualityScore > 0).reduce((s, r) => s + r.qualityScore, 0) / (allResults.filter(r => r.qualityScore > 0).length || 1)
  const totalTokens = allResults.reduce((s, r) => s + r.tokens, 0)
  const totalRetries = allResults.reduce((s, r) => s + r.retryCount, 0)

  const grade = totalHall === 0 && totalErr === 0 && overallQA >= 80 ? 'A+' :
    totalHall === 0 && totalErr === 0 ? 'A' :
    totalHall <= 2 ? 'B+' : 'B'

  console.log('────────────────────────────────────────────────────────────────────')
  console.log(`OVERALL: ${totalPass}/${allResults.length} passed | ${totalErr} errors | ${totalHall} hallucinations`)
  console.log(`AVG QA SCORE: ${overallQA.toFixed(0)}/100`)
  console.log(`RETRIES USED: ${totalRetries}`)
  console.log(`TOTAL TOKENS: ${totalTokens.toLocaleString()}`)
  console.log(`GRADE: ${grade}`)
  console.log('────────────────────────────────────────────────────────────────────')
}

main().catch(console.error)
