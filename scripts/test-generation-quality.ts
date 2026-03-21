/**
 * Quality test script — bypasses web app, calls generation pipeline directly.
 * Tests 3 scenarios against anti-hallucination rules and Coach Syndicate alignment.
 *
 * Usage: npx tsx scripts/test-generation-quality.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local (Next.js convention)
config({ path: resolve(import.meta.dirname || __dirname, '..', '.env.local') })

// Patch the cwd so template-loader finds templates correctly
const originalCwd = process.cwd
process.cwd = () => resolve(import.meta.dirname || __dirname, '..')

import { generateDeliverable } from '../src/lib/claude/generate'

// ─── TEST DATA ───────────────────────────────────────────────────────────────

/** Steve-like coach with FULL structured data (new 7-step questionnaire) */
const FULL_DATA: Record<string, unknown> = {
  clientName: 'Marcus Rivera',
  businessName: 'Rivera Coaching Co',
  storyBeforeState: 'Corporate sales manager for 14 years at a Fortune 500 tech company making $120K/year. Worked 60-hour weeks, missed my kids growing up.',
  storyTurningPoint: 'Got laid off during a restructure in 2019. Instead of panicking, I realized it was the push I needed. Used my severance to hire a business coach for $8,000.',
  storyAfterState: 'Now run a coaching business helping B2B sales professionals transition to coaching. 35 active clients, work 25 hours a week from home.',
  storyFacts: '- Built Rivera Coaching Co from scratch in 2020\n- Helped 200+ sales professionals over 4 years\n- Host the "Sales to Coaching" podcast (50 episodes)\n- Spoke at 3 industry conferences\n- Clients average $8K/month within 6 months',
  credentials: 'ICF ACC certified, 14 years in enterprise sales, trained under two mentors',
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
  idealClientCurrentMethods: 'Posting randomly on LinkedIn, cold DMing people, trying to get referrals from friends. Some have tried Facebook groups or bought a generic online course.',
  idealClientStuckDuration: '6-18 months',
  idealClientFailedAttempts: ['Generic online course that taught them nothing specific', 'Hired a VA to do outreach with zero results', 'Tried running Facebook ads and burned $2K'],
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
  transformation: 'BEFORE: Making $0-$3K/month from coaching, working evenings and weekends around their day job, no clear offer, no pipeline. AFTER: Full-time coach making $8K-$15K/month, working 25-30 hours/week, clear positioning, steady client flow.',
  aspiringIdentity: '"The Liberated Coach" — calm, confident, profitable. Making $10K+/month on their own terms, known as the go-to authority in their niche.',
  uniqueMechanism: 'The Sales-to-Coaching Method — a 3-phase system that leverages your existing sales skills to build a coaching business in 6 months without quitting your job first.',
  leadMagnetName: 'The Sales Pro Exit Plan: 5 Steps to Replace Your Salary with Coaching Income',
  leadMagnetType: 'pdf-guide',
  ctaType: 'booking',
  guaranteeOrRisk: 'If you do the work and follow the system for 90 days without results, I will personally coach you 1-on-1 until you get your first paying client.',
  revenuePerClient: '$5,997',
  caseStudies: [
    {
      clientName: 'Tom Petersen',
      businessType: 'Enterprise tech sales, 12 years',
      beforeState: 'Side-hustling coaching evenings and weekends, making $1,200/month, no clear offer, exhausted',
      intervention: 'Built his offer around sales leadership coaching, launched LinkedIn content system, created his sales call script',
      result: 'Hit $9,500/month within 4 months, quit his day job at month 5',
      timeframe: '5 months',
      quote: 'Marcus showed me I already had everything I needed — I just needed the system to package it.',
    },
    {
      clientName: 'Rachel Kim',
      businessType: 'SaaS account executive, 8 years',
      beforeState: 'Wanted to coach but had zero online presence, no email list, no idea where to start',
      intervention: 'Defined her niche (women in tech sales), built her LinkedIn presence, created a lead magnet, launched a podcast',
      result: 'From $0 to $6,800/month in 6 months, now has a waitlist',
      timeframe: '6 months',
      quote: 'I went from invisible to having a waitlist. The framework actually works.',
    },
  ],
  trackRecord: {
    businessesBuilt: 'Built Rivera Coaching Co from scratch (2020-present)',
    yearsInIndustry: '4 years coaching, 14 years in B2B sales',
    clientsHelped: '200+ sales professionals coached',
    eventsRun: 'Spoke at 3 industry conferences',
    certifications: 'ICF ACC certified',
    mediaAppearances: 'Sales to Coaching podcast (50 episodes)',
  },
  objectionRebuttals: [
    { objection: 'I have no coaching experience', rebuttal: 'You have 10+ years of sales experience. That IS your coaching credential. My system shows you how to package it.' },
    { objection: 'The market is too saturated', rebuttal: 'There are 4 million coaches. But almost none of them specialize in helping sales pros. Your niche is wide open.' },
  ],
  whyDoThis: 'I spent 14 years making someone else rich. When I got laid off, I realized I had the skills to build something of my own — and so does every burned-out sales pro sitting in a cubicle right now. I do this because nobody should waste their best years making someone else wealthy.',
  competitorOldWay: 'Most coaching programs teach generic tactics — post on Instagram, run ads, cold DM people. They never address the specific advantages sales professionals already have or how to leverage their existing network.',
  revenueGoal: '$50K/month',
  revenueGoalDeadline: 'December 2026',
  scarcityElement: 'Next cohort starts April 1st, limited to 8 spots',
  missionStatement: '',
  expertise: ['Sales psychology', 'Offer creation', 'LinkedIn organic growth', 'Sales call mastery'],
  brandVoice: 'tactical',
  voiceNotes: 'Direct but warm. Uses sports metaphors. Says "listen" a lot. Competitive energy but genuinely caring.',
}

/** Sparse data — tests anti-hallucination with minimal info */
const SPARSE_DATA: Record<string, unknown> = {
  clientName: 'Sarah Chen',
  businessName: 'Chen Coaching',
  storyBeforeState: 'Former accountant for 10 years',
  storyTurningPoint: 'Realized I was helping everyone else with their money but had no freedom myself',
  storyAfterState: 'Now a financial wellness coach',
  storyFacts: '- CPA for 10 years\n- Started coaching in 2023\n- Based in Portland',
  niche: 'Financial wellness coaching for freelancers',
  targetAudience: 'Freelancers and solopreneurs who earn $50K-$100K but feel broke',
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
  uniqueMechanism: 'The Freelancer Money Method — a 3-step system for freelancers',
  leadMagnetName: 'The Freelancer Finance Checklist',
  ctaType: 'dm-keyword',
  ctaKeyword: 'MONEY',
  expertise: ['Personal finance', 'Tax planning'],
  brandVoice: 'casual',
  // NOTE: No case studies, no track record, no personal details, no program phases
  // This tests whether the AI respects [DATA NOT PROVIDED — DO NOT INVENT]
  whyDoThis: 'I saw too many talented freelancers stressed about money when the fix was simple.',
}

// ─── TEST RUNNER ─────────────────────────────────────────────────────────────

interface TestResult {
  name: string
  templateId: string
  passed: boolean
  issues: string[]
  tokenCount: number
  contentPreview: string
}

const HALLUCINATION_MARKERS = [
  /gym/i,
  /sold\s+(six|6)\s+(coaching\s+)?businesses/i,
  /fitness\s+studio/i,
  /personal\s+training/i,
  /\bSam Bakhtiar\b/i,
  /\bGarrett\s+J\.?\s+White\b/i,
  /\bWarrior\s+Greens\b/i,
  /\bVigor\s+Summit\b/i,
]

function checkHallucination(content: string, testName: string): string[] {
  const issues: string[] = []
  for (const pattern of HALLUCINATION_MARKERS) {
    const match = content.match(pattern)
    if (match) {
      issues.push(`HALLUCINATION: Found "${match[0]}" — this is Steve's data leaking into ${testName}'s content`)
    }
  }
  return issues
}

function checkDataNotProvided(content: string): string[] {
  const issues: string[] = []
  // Check that [DATA NOT PROVIDED] markers are NOT in the final output
  // (they should be in the prompt but Claude should skip those sections)
  const matches = content.match(/\[.*DATA NOT PROVIDED.*\]/g)
  if (matches) {
    issues.push(`RAW MARKERS: Found ${matches.length} "[DATA NOT PROVIDED]" markers in output — Claude should have skipped these sections instead of echoing them`)
  }
  return issues
}

function checkFactualAccuracy(content: string, data: Record<string, unknown>): string[] {
  const issues: string[] = []
  const clientName = data.clientName as string

  // Check that the content mentions the actual client name
  if (!content.includes(clientName)) {
    issues.push(`MISSING: Content does not mention client name "${clientName}"`)
  }

  // Check that case studies (if provided) are referenced correctly
  const caseStudies = data.caseStudies as Array<{ clientName: string }> | undefined
  if (caseStudies && caseStudies.length > 0) {
    for (const cs of caseStudies) {
      if (!content.includes(cs.clientName)) {
        issues.push(`MISSING CASE STUDY: "${cs.clientName}" was provided but not found in content`)
      }
    }
  }

  return issues
}

function checkSparseDataHandling(content: string): string[] {
  const issues: string[] = []

  // Check for invented case studies when none were provided
  const caseStudyPatterns = [
    /client\s+(?:name|story|case|example|result).*?["""].*?["""]/gi,
    /worked\s+with\s+(?:a|one)\s+(?:client|coach)\s+(?:named|called)\s+/i,
  ]
  for (const pattern of caseStudyPatterns) {
    const match = content.match(pattern)
    if (match) {
      issues.push(`POSSIBLE INVENTED STORY: Found "${match[0].slice(0, 80)}..." — verify this isn't fabricated (no case studies were provided)`)
    }
  }

  // Check for invented personal details
  const personalDetailPatterns = [
    /(?:married|spouse|wife|husband|partner|kids|children|daughter|son)/i,
    /(?:lives?\s+in|based\s+in|from)\s+(?!Portland)[A-Z][a-z]+/i, // Portland is in storyFacts
  ]
  for (const pattern of personalDetailPatterns) {
    const match = content.match(pattern)
    if (match) {
      issues.push(`POSSIBLE INVENTED DETAIL: Found "${match[0]}" — sparse profile has no personal details`)
    }
  }

  return issues
}

async function runTest(
  name: string,
  templateId: string,
  data: Record<string, unknown>,
  checks: (content: string, data: Record<string, unknown>) => string[]
): Promise<TestResult> {
  console.log(`\n${'='.repeat(70)}`)
  console.log(`TEST: ${name}`)
  console.log(`Template: ${templateId}`)
  console.log(`${'='.repeat(70)}`)

  try {
    const result = await generateDeliverable(templateId, data)
    const content = result.content
    const issues = checks(content, data)
    const passed = issues.length === 0

    console.log(`\nTokens: ${result.promptTokens} prompt + ${result.completionTokens} completion = ${result.promptTokens + result.completionTokens} total`)
    console.log(`Status: ${passed ? '✅ PASSED' : '❌ FAILED'}`)

    if (issues.length > 0) {
      console.log(`\nIssues (${issues.length}):`)
      for (const issue of issues) {
        console.log(`  ⚠️  ${issue}`)
      }
    }

    // Show first 500 chars of content
    console.log(`\n--- Content Preview (first 500 chars) ---`)
    console.log(content.slice(0, 500))
    console.log('...\n')

    return {
      name,
      templateId,
      passed,
      issues,
      tokenCount: result.promptTokens + result.completionTokens,
      contentPreview: content.slice(0, 500),
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.log(`\n❌ ERROR: ${msg}`)
    return {
      name,
      templateId,
      passed: false,
      issues: [`GENERATION ERROR: ${msg}`],
      tokenCount: 0,
      contentPreview: '',
    }
  }
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🧪 COACH LAUNCH — CONTENT QUALITY TEST SUITE')
  console.log(`Date: ${new Date().toISOString()}`)
  console.log(`Testing against anti-hallucination rules + Coach Syndicate alignment\n`)

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY not found in environment. Set it in app/.env.local')
    process.exit(1)
  }

  const results: TestResult[] = []

  // ─── TEST 1: Mission Statement (new deliverable, full data) ─────────────
  results.push(await runTest(
    'Test 1: Mission Statement — Full Data (New Deliverable)',
    'mission-statement',
    FULL_DATA,
    (content, data) => [
      ...checkHallucination(content, data.clientName as string),
      ...checkDataNotProvided(content),
      ...checkFactualAccuracy(content, data),
      // Mission statement specific checks
      ...(content.toLowerCase().includes('deadline') || content.includes('2026') || content.includes('December')
        ? []
        : ['MISSING: Mission statement should reference the revenue goal deadline']),
      ...(content.includes('Rivera') ? [] : ['MISSING: Should reference the coach by name']),
    ]
  ))

  // ─── TEST 2: About Page — Sparse Data (anti-hallucination stress test) ──
  results.push(await runTest(
    'Test 2: About Page — Sparse Data (Anti-Hallucination Test)',
    'about-page',
    SPARSE_DATA,
    (content, data) => [
      ...checkHallucination(content, data.clientName as string),
      ...checkDataNotProvided(content),
      ...checkSparseDataHandling(content),
      // About page specific — should mention Portland (it's in storyFacts)
      ...(content.includes('Portland') ? [] : ['NOTE: Portland is in storyFacts but not referenced (minor)']),
      // Should NOT invent hobbies, family, or traits
    ]
  ))

  // ─── TEST 3: USP — Full Data (new deliverable, 3 variations) ───────────
  results.push(await runTest(
    'Test 3: USP — Full Data (New Deliverable, 3 Variations)',
    'usp',
    FULL_DATA,
    (content, data) => [
      ...checkHallucination(content, data.clientName as string),
      ...checkDataNotProvided(content),
      // USP specific — should have multiple versions
      ...(content.includes('Version') || content.includes('Option') || content.includes('Variation') || content.includes('Alternative')
        ? []
        : ['MISSING: USP should generate 3+ variations']),
      // Should reference the unique mechanism
      ...(content.includes('Sales-to-Coaching') ? [] : ['MISSING: Should reference the unique mechanism "Sales-to-Coaching"']),
      // Should reference the competitor old way
      ...(content.toLowerCase().includes('generic') || content.toLowerCase().includes('old way') || content.toLowerCase().includes('instagram')
        ? []
        : ['MISSING: Should contrast against the old way / competitor approach']),
    ]
  ))

  // ─── SUMMARY ───────────────────────────────────────────────────────────
  console.log('\n' + '═'.repeat(70))
  console.log('FINAL RESULTS')
  console.log('═'.repeat(70))

  let allPassed = true
  for (const r of results) {
    const status = r.passed ? '✅' : '❌'
    console.log(`${status} ${r.name} — ${r.issues.length} issues, ${r.tokenCount} tokens`)
    if (!r.passed) allPassed = false
  }

  console.log(`\nOverall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`)
  console.log(`Total tokens used: ${results.reduce((sum, r) => sum + r.tokenCount, 0)}`)

  // Write full results to file for review
  const outputPath = resolve(process.cwd(), 'scripts', 'test-results.json')
  const { writeFileSync } = await import('fs')
  writeFileSync(outputPath, JSON.stringify(results, null, 2))
  console.log(`\nFull results written to: ${outputPath}`)
}

main().catch(console.error)
