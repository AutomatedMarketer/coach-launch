/**
 * Block 4 Quality Test — Tests that Deep Client Psychology fields
 * actually improve generated content.
 *
 * Generates emotional-trigger-map and belief-shift-map WITH and WITHOUT
 * Block 4 data to measure the difference.
 *
 * Usage: npx tsx scripts/test-block4-quality.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { writeFileSync } from 'fs'

config({ path: resolve(import.meta.dirname || __dirname, '..', '.env.local') })

const originalCwd = process.cwd
process.cwd = () => resolve(import.meta.dirname || __dirname, '..')

import { generateDeliverable } from '../src/lib/claude/generate'

// Coach profile WITHOUT Block 4 (baseline)
const COACH_WITHOUT_BLOCK4 = {
  clientName: 'Marcus Rivera',
  businessName: 'Rivera Coaching Co',
  storyBeforeState: 'Corporate sales manager for 14 years at a Fortune 500 tech company making $120K/year.',
  storyTurningPoint: 'Got laid off during a restructure in 2019. Used severance to hire a business coach.',
  storyAfterState: 'Now run a coaching business helping B2B sales pros transition to coaching. 35 active clients.',
  storyFacts: '- Built Rivera Coaching Co from scratch in 2020\n- Helped 200+ sales professionals\n- Host Sales to Coaching podcast (50 episodes)',
  niche: 'Helping B2B sales professionals build profitable coaching businesses',
  targetAudience: 'Men and women 35-50 in B2B sales making $80K-$150K who are burned out',
  problemSolved: 'Sales professionals who know how to sell but have no idea how to build a coaching business.',
  unwantedFeelings: 'Stuck, undervalued, exhausted, trapped in golden handcuffs',
  desiredFeelings: 'Free, confident, in control, financially secure',
  commonObjections: ['I have no coaching experience', 'The market is too saturated'],
  idealClientCurrentMethods: 'Posting randomly on LinkedIn, cold DMing people',
  offerName: 'The Sales-to-Coaching Accelerator',
  pricePoint: '$5,997',
  transformation: 'BEFORE: $0-$3K/month. AFTER: $8K-$15K/month.',
  aspiringIdentity: 'The Liberated Coach',
  uniqueMechanism: 'The Sales-to-Coaching Method',
  brandVoice: 'tactical',
} as Record<string, unknown>

// Same coach WITH Block 4 data
const COACH_WITH_BLOCK4 = {
  ...COACH_WITHOUT_BLOCK4,
  // Block 4 — Deep Client Psychology
  clientExcuse: 'I just need to close a few more deals at my day job first, then I will have the runway to go all-in on coaching. I am not ready yet.',
  clientSecretDesire: 'They want to be seen as a thought leader in their industry. They want their old corporate colleagues to see them thriving on their own terms. They want the lifestyle — work from a coffee shop, pick kids up from school.',
  clientFalseProblem: 'They think the problem is they need more followers, a better website, or a viral LinkedIn post. They think it is a marketing problem.',
  clientRealProblem: 'They do not have a clear, compelling offer. They are afraid of selling to their peers. They have no system for consistently getting clients. It is a confidence and clarity problem.',
  clientSecretFear: 'They are terrified of failing publicly. Everyone at their old company knows they left to start coaching. If it does not work, they will have to go back with their tail between their legs.',
  clientAngerTrigger: 'Seeing 25-year-old coaches with zero real experience charging $10K while they — with 14 years of enterprise sales — are struggling to charge $2K.',
  clientBlameTarget: 'They blame the saturated coaching market, the LinkedIn algorithm, and their last coach who charged them $5K and just told them to post more content.',
  clientGuiltShame: 'They feel guilty that their spouse supported this career change and it is taking longer than promised. Ashamed that they are dipping into savings. Embarrassed to tell friends how much they are actually making.',
  clientDailyReminder: 'Every morning they open LinkedIn and see other coaches posting client wins and revenue screenshots. They check their Stripe dashboard and see $0 in new revenue. Their old colleagues are getting promoted.',
  clientInactionConsequence: 'In 3 years: back at a corporate job they hate, more burned out than before, telling people coaching was just a phase. Marriage strained from the financial stress. Kids never got the present parent they were promised.',
  // New Step 3 fields
  topComplaints: 'I am working harder than ever but making less money. I know how to sell in corporate but I cannot sell myself. Everyone online makes it look easy but I am getting zero traction.',
  topDesires: 'Consistent $10K months so they can quit their day job. A system that brings clients to them instead of chasing. Recognition as a real authority in their space.',
  whyCurrentMethodFails: 'Random LinkedIn posts get zero engagement because they have no positioning. Cold DMs feel gross and get ignored. Referrals are unpredictable and dry up.',
} as Record<string, unknown>

// Hallucination markers
const HALLUCINATION_MARKERS = [
  /\bgym\b/i, /\bVigor Summit\b/i, /\bWarrior Greens\b/i,
  /\bfitness studio\b/i,
]

function checkHallucinations(content: string): string[] {
  const issues: string[] = []
  for (const pattern of HALLUCINATION_MARKERS) {
    if (pattern.test(content)) {
      issues.push(`Found "${content.match(pattern)?.[0]}"`)
    }
  }
  return issues
}

function checkBlock4Usage(content: string, data: Record<string, unknown>): { used: string[], missed: string[] } {
  const block4Fields = [
    { key: 'clientExcuse', markers: ['runway', 'not ready yet', 'few more deals'] },
    { key: 'clientSecretDesire', markers: ['thought leader', 'coffee shop', 'colleagues'] },
    { key: 'clientFalseProblem', markers: ['followers', 'viral', 'marketing problem'] },
    { key: 'clientRealProblem', markers: ['clear offer', 'afraid of selling', 'confidence and clarity'] },
    { key: 'clientSecretFear', markers: ['failing publicly', 'tail between', 'go back'] },
    { key: 'clientAngerTrigger', markers: ['25-year-old', 'zero real experience', '$10K'] },
    { key: 'clientBlameTarget', markers: ['saturated', 'algorithm', 'last coach'] },
    { key: 'clientGuiltShame', markers: ['spouse supported', 'dipping into savings', 'embarrassed'] },
    { key: 'clientDailyReminder', markers: ['Stripe dashboard', 'revenue screenshots', 'old colleagues'] },
    { key: 'clientInactionConsequence', markers: ['back at a corporate', 'coaching was just a phase', 'present parent'] },
  ]

  const used: string[] = []
  const missed: string[] = []

  for (const field of block4Fields) {
    if (!data[field.key]) continue
    const found = field.markers.some(m => content.toLowerCase().includes(m.toLowerCase()))
    if (found) used.push(field.key)
    else missed.push(field.key)
  }

  return { used, missed }
}

async function main() {
  console.log('=================================================================')
  console.log('  BLOCK 4 QUALITY TEST — Deep Client Psychology Impact')
  console.log(`  ${new Date().toISOString()}`)
  console.log('=================================================================\n')

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY not found')
    process.exit(1)
  }

  // Test 1: Emotional Trigger Map WITHOUT Block 4
  console.log('TEST 1: Emotional Trigger Map WITHOUT Block 4 data')
  console.log('-'.repeat(55))
  process.stdout.write('  Generating...')
  const etmWithout = await generateDeliverable('emotional-trigger-map', COACH_WITHOUT_BLOCK4)
  console.log(` done (${etmWithout.completionTokens} tokens)`)
  const hallWithout = checkHallucinations(etmWithout.content)
  console.log(`  Hallucinations: ${hallWithout.length === 0 ? 'NONE' : hallWithout.join(', ')}`)
  console.log(`  Content length: ${etmWithout.content.length} chars`)

  // Test 2: Emotional Trigger Map WITH Block 4
  console.log('\nTEST 2: Emotional Trigger Map WITH Block 4 data')
  console.log('-'.repeat(55))
  process.stdout.write('  Generating...')
  const etmWith = await generateDeliverable('emotional-trigger-map', COACH_WITH_BLOCK4)
  console.log(` done (${etmWith.completionTokens} tokens)`)
  const hallWith = checkHallucinations(etmWith.content)
  console.log(`  Hallucinations: ${hallWith.length === 0 ? 'NONE' : hallWith.join(', ')}`)
  const etmUsage = checkBlock4Usage(etmWith.content, COACH_WITH_BLOCK4)
  console.log(`  Block 4 fields used: ${etmUsage.used.length}/10 — ${etmUsage.used.join(', ')}`)
  if (etmUsage.missed.length > 0) {
    console.log(`  Block 4 fields missed: ${etmUsage.missed.join(', ')}`)
  }

  // Test 3: Belief Shift Map WITH Block 4
  console.log('\nTEST 3: Belief Shift Map WITH Block 4 data')
  console.log('-'.repeat(55))
  process.stdout.write('  Generating...')
  const bsmWith = await generateDeliverable('belief-shift-map', COACH_WITH_BLOCK4)
  console.log(` done (${bsmWith.completionTokens} tokens)`)
  const bsmHall = checkHallucinations(bsmWith.content)
  console.log(`  Hallucinations: ${bsmHall.length === 0 ? 'NONE' : bsmHall.join(', ')}`)
  const bsmUsage = checkBlock4Usage(bsmWith.content, COACH_WITH_BLOCK4)
  console.log(`  Block 4 fields used: ${bsmUsage.used.length}/10 — ${bsmUsage.used.join(', ')}`)

  // Summary
  console.log('\n=================================================================')
  console.log('  SUMMARY')
  console.log('=================================================================')
  console.log(`  Hallucinations: ${hallWithout.length + hallWith.length + bsmHall.length} total`)
  console.log(`  ETM Block 4 utilization: ${etmUsage.used.length}/10 fields grounded`)
  console.log(`  BSM Block 4 utilization: ${bsmUsage.used.length}/10 fields grounded`)
  const totalUsed = etmUsage.used.length + bsmUsage.used.length
  console.log(`  Total Block 4 grounding: ${totalUsed}/20 field-references`)
  console.log(`  Grade: ${totalUsed >= 14 ? 'A+' : totalUsed >= 10 ? 'A' : totalUsed >= 7 ? 'B+' : 'B'}`)

  // Save outputs for manual review
  writeFileSync(resolve(process.cwd(), 'scripts', 'test-block4-results.json'), JSON.stringify({
    etmWithout: { length: etmWithout.content.length, tokens: etmWithout.completionTokens, preview: etmWithout.content.slice(0, 500) },
    etmWith: { length: etmWith.content.length, tokens: etmWith.completionTokens, preview: etmWith.content.slice(0, 500), block4Usage: etmUsage },
    bsmWith: { length: bsmWith.content.length, tokens: bsmWith.completionTokens, preview: bsmWith.content.slice(0, 500), block4Usage: bsmUsage },
  }, null, 2))
  console.log('\nFull results saved to scripts/test-block4-results.json')
}

main().catch(console.error)
