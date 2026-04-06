/**
 * FULL QUALITY AUDIT — End-to-End Test
 * Creates 3 test users with diverse niches, generates Two Identities + Belief Shift Map,
 * runs QA checks, and produces a comprehensive graded report.
 *
 * Test users are marked with "test" suffix for easy identification/cleanup.
 */

import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ── 3 Test Users — maximally diverse niches ──

const TEST_USERS = [
  {
    clientName: 'Maria Gonzalez test',
    businessName: 'Radiant Real Estate Academy',
    niche: 'Real estate agents in their first 3 years who are drowning in cold calls, open houses, and floor time but still closing fewer than 6 deals a year. Specifically residential agents in mid-size markets who know the industry is lucrative but can not crack the code on consistent lead gen.',
    targetAudience: 'Women and men aged 25-40 who got their real estate license with big dreams but are now 1-3 years in, making under $40K from commissions, working 60+ hours a week, and seriously questioning if they made the right career move. They see top producers closing 30+ deals and wonder what secret they are missing.',
    unwantedFeelings: 'Embarrassed at family dinners when people ask how real estate is going. Anxious every month about whether they will close enough to cover their desk fees and MLS dues. Jealous of the agents in their office who seem to have listings fall from the sky. Exhausted from driving all over town for showings that go nowhere. Starting to feel like maybe they are just not cut out for sales.',
    desiredFeelings: 'Confident walking into a listing appointment knowing they will win it. Proud when their phone rings with referrals instead of having to cold call. Financially stable with predictable closings every month. Respected in their brokerage as someone who actually knows what they are doing. Free to take a weekend off without panicking about pipeline.',
    aspiringIdentity: 'The go-to agent in their market. The one other agents refer overflow to. Consistently closing 2-3 deals per month with a pipeline that fills itself through their content and referral system. They work 40 hours a week, take real vacations, and their sphere of influence actively sends them business.',
    problemSolved: 'New real estate agents who rely on cold calling, door knocking, and begging their sphere for referrals. I give them a content-based lead generation system that turns their local expertise into a steady stream of inbound buyer and seller leads.',
    uniqueMechanism: 'The Listing Magnet Method — Phase 1: Local Authority Content (become the neighborhood expert on social media). Phase 2: The Referral Engine (systematic follow-up that turns past clients into repeat referral sources). Phase 3: The Pipeline Dashboard (track every lead, every showing, every follow-up so nothing falls through the cracks).',
    commonObjections: ['I do not have time to create content', 'My broker already provides leads', 'Social media does not work for real estate in my market'],
    brandVoice: 'motivational',
    offerName: 'The Listing Magnet Method',
    pricePoint: '$3,997',
    transformation: 'From scrambling for every deal to having a predictable pipeline of inbound leads that keeps their calendar full of listing appointments.',
    idealClientCurrentMethods: 'Cold calling expired listings, sitting open houses hoping for walk-ins, posting generic just-listed/just-sold content, buying Zillow leads that go nowhere, asking friends and family for referrals at every social event.',
    idealClientCurrentRevenue: 'Under $40K/year in commissions despite working 60+ hours a week. Closing 4-6 deals a year. Spending $300-500/month on lead sources that rarely convert.',
    expertise: ['real estate lead generation', 'social media for agents', 'listing presentations'],
    storyBeforeState: 'I was a brand new agent sitting in an empty office wondering where my next showing was coming from.',
    storyTurningPoint: 'I started posting hyper-local neighborhood content on Instagram and within 90 days had my first inbound listing lead.',
    storyAfterState: 'Now I close 3-4 deals per month and 80% of my business comes from content and referrals.',
    storyFacts: 'Licensed real estate agent for 8 years. Closed over 200 transactions. Built a team of 4 agents. Featured in local real estate magazine.',
    programDuration: '6 months',
    programIncludes: '12 weeks of group coaching, content templates, CRM setup, listing presentation scripts, weekly accountability calls, private community.',
  },
  {
    clientName: 'David Chen test',
    businessName: 'Inner Compass Leadership',
    niche: 'Tech founders and startup CEOs making $200K-$1M who have achieved product-market fit but are emotionally disconnected from their teams, their partners, and themselves. They built something that works but they feel empty inside and their relationships are deteriorating.',
    targetAudience: 'Men aged 30-45 who founded or lead tech companies. They are smart, driven, introverted, and emotionally avoidant. They solve problems with logic and spreadsheets but cannot have a vulnerable conversation with their wife or co-founder. Many are considering divorce or have co-founders threatening to leave. They would never call it therapy but they know something is deeply wrong.',
    unwantedFeelings: 'Numb. They have trained themselves to not feel because feelings slow down execution. Lonely despite being surrounded by people who depend on them. Terrified that if they slow down or show weakness, everything they built will collapse. Resentful that nobody appreciates how much they sacrifice. Secretly ashamed that they have everything society says should make them happy and they still feel hollow.',
    desiredFeelings: 'Present and connected during conversations instead of mentally solving the next problem. Calm confidence that does not depend on the latest metrics. Deep trust with their co-founder and partner. Able to feel joy and gratitude without immediately thinking about what could go wrong. At peace with being imperfect.',
    aspiringIdentity: 'A leader who is respected not just for what he builds but for how he makes people feel. Someone whose team stays because of the culture, not the equity. A partner who is emotionally available. A founder who can hold space for ambiguity without immediately trying to optimize it.',
    problemSolved: 'Tech founders who optimized everything except their emotional intelligence. They built systems for code and customers but have zero framework for connection, vulnerability, or self-awareness. I help them develop the inner operating system that makes everything else sustainable.',
    uniqueMechanism: 'The Inner OS Framework — Module 1: The Diagnostic (map your emotional blind spots and relationship debt using a structured self-assessment). Module 2: The Rewrite (replace avoidance patterns with connection protocols through weekly practice). Module 3: The Integration (apply emotional skills in real scenarios — board meetings, partner conversations, team conflicts — with live coaching support).',
    commonObjections: ['I do not have time for soft skills', 'This sounds like therapy and I have tried that', 'My company needs me focused not distracted by feelings'],
    brandVoice: 'authoritative',
    offerName: 'The Inner OS Framework',
    pricePoint: '$15,000',
    transformation: 'From emotionally avoidant founder running on logic alone to an integrated leader who builds trust as effectively as he builds products.',
    idealClientCurrentMethods: 'Reading leadership books, listening to podcasts, hiring executive coaches who focus only on business metrics, occasional meditation apps, sometimes therapy but they quit after 3 sessions because it feels unproductive.',
    idealClientCurrentRevenue: '$200K-$1M personal income. Company doing $1M-$10M ARR. Has 10-50 employees.',
    expertise: ['emotional intelligence for founders', 'leadership communication', 'relationship repair'],
    storyBeforeState: 'I was a CTO who could debug any system except my own marriage.',
    storyTurningPoint: 'My co-founder told me he was leaving because he could not trust someone who never showed a real emotion.',
    storyAfterState: 'I rebuilt both relationships by learning to lead with connection first.',
    storyFacts: 'Former CTO at two venture-backed startups. 12 years in tech. Certified in somatic experiencing and nonviolent communication. Coached 40+ founders.',
    programDuration: '6 months',
    programIncludes: 'Weekly 1-on-1 coaching, emotional intelligence assessments, relationship repair framework, founder peer group of 8, partner session option, Slack community.',
  },
  {
    clientName: 'Rachel Kim test',
    businessName: 'Stage Ready Academy',
    niche: 'Amateur competitive bodybuilders and bikini competitors who keep placing outside the top 5 and cannot figure out why. They train hard, diet hard, but their stage presence, posing, and peak week protocol are costing them trophies.',
    targetAudience: 'Women aged 22-38 who compete in NPC bikini or figure divisions. They have done 2-5 shows and never placed top 3. They spend $5K-$15K per prep on coaches, suits, tanning, travel, and registration but keep getting the same feedback from judges: posing needs work, conditioning was off, presentation lacked confidence. They are frustrated and considering quitting the sport.',
    unwantedFeelings: 'Devastated standing in the lineup knowing they are about to get called last again. Embarrassed posting their results when everyone on Instagram seems to be winning. Confused because their physique looks great in the gym mirror but judges do not see it. Angry at themselves for spending thousands on another prep that ended in disappointment. Afraid this is their ceiling and they will never have what it takes.',
    desiredFeelings: 'Electric confidence hitting their front pose under stage lights. Proud holding a top 3 trophy with their family cheering. Certain that their peak week protocol will land them on stage in their absolute best condition. Validated that the years of sacrifice actually paid off. Excited to compete again instead of dreading it.',
    aspiringIdentity: 'The competitor who walks on stage and the judges cannot stop watching. Conditioning dialed. Posing flawless. Stage presence magnetic. The girl backstage that other competitors ask for posing tips. Consistently placing top 3 and qualifying for national shows.',
    problemSolved: 'Competitors who have the physique but not the presentation. I fix the gap between how good they look in the gym and how they show up on stage — through posing mastery, peak week precision, and stage presence coaching.',
    uniqueMechanism: 'The Stage Ready System — Pillar 1: The Posing Lab (weekly video-based posing refinement with judge-eye feedback). Pillar 2: The Peak Protocol (day-by-day water, sodium, carb manipulation specific to your body). Pillar 3: The Spotlight Method (stage presence, transitions, confidence under lights training).',
    commonObjections: ['My current coach handles my posing', 'I just need better genetics', 'Posing coaching is not worth the money when I need to fix my physique first'],
    brandVoice: 'motivational',
    offerName: 'The Stage Ready System',
    pricePoint: '$2,497',
    transformation: 'From always-outside-top-5 to consistently placing top 3 and qualifying for nationals.',
    idealClientCurrentMethods: 'Watching YouTube posing tutorials, practicing in the gym mirror with no feedback, hiring a general prep coach who spends 5 minutes on posing in the last week, buying expensive competition suits hoping it compensates for weak presentation.',
    idealClientCurrentRevenue: 'Not applicable — this is a hobby/sport. They spend $5K-$15K per competition prep from their day job income.',
    expertise: ['competition posing', 'peak week protocols', 'stage presence coaching'],
    storyBeforeState: 'I placed 11th in my first three shows and was ready to quit the sport entirely.',
    storyTurningPoint: 'A judge told me after my fourth show that my physique was top 3 material but my posing was hiding it.',
    storyAfterState: 'I rebuilt my entire stage approach and placed 2nd at my next show, then won my pro card within a year.',
    storyFacts: 'NPC bikini competitor for 6 years. Pro card holder. Placed top 3 in 12 shows. Coached 30+ competitors to their first top-5 placement.',
    programDuration: '16 weeks (one full prep cycle)',
    programIncludes: 'Weekly posing video reviews, custom peak week protocol, stage presence training sessions, judge feedback analysis, competition day game plan, suit and presentation consultation.',
  },
]

// ── Template loading (simplified) ──
function loadTemplate(templateId) {
  const path = resolve(`./src/lib/claude/templates/${templateId}.md`)
  const raw = readFileSync(path, 'utf-8')
  const match = raw.match(/```\n([\s\S]*?)\n```/)
  if (!match) throw new Error(`No prompt block in ${templateId}`)
  return match[1]
}

function fillTemplate(prompt, answers) {
  for (const [key, value] of Object.entries(answers)) {
    if (typeof value === 'string') {
      prompt = prompt.replaceAll(`{{${key}}}`, value)
    } else if (Array.isArray(value)) {
      prompt = prompt.replaceAll(`{{${key}}}`, value.join(', '))
    }
  }
  prompt = prompt.replace(/\{\{#if (\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (m, field, content) =>
    answers[field] ? content.replaceAll(`{{${field}}}`, String(answers[field])) : ''
  )
  prompt = prompt.replace(/\{\{(\w+)\}\}/g, '[$1: DATA NOT PROVIDED — DO NOT INVENT]')
  prompt = prompt.replaceAll('{{STEVE_VOICE_PROFILE}}', '')
  prompt = prompt.replaceAll('{{BELIEF_FRAMEWORK_CONTEXT}}', '')
  return prompt
}

function formatAnswers(answers) {
  const lines = []
  const exclude = new Set(['brandColors', 'brandFonts', 'brandPhotoUrls', 'logoUrl'])
  for (const [key, value] of Object.entries(answers)) {
    if (exclude.has(key) || value === undefined || value === null || value === '') continue
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim()
    if (Array.isArray(value)) {
      if (value.length) lines.push(`${label}: ${typeof value[0] === 'string' ? value.join(', ') : JSON.stringify(value)}`)
    } else if (typeof value === 'object') {
      const fields = Object.entries(value).filter(([,v]) => v).map(([k,v]) => `  ${k}: ${v}`)
      if (fields.length) lines.push(`${label}:\n${fields.join('\n')}`)
    } else {
      lines.push(`${label}: ${value}`)
    }
  }
  return lines.join('\n')
}

function loadPreamble() {
  const raw = readFileSync(resolve('./src/lib/claude/generate.ts'), 'utf-8')
  const match = raw.match(/const GLOBAL_SYSTEM_PREAMBLE = `([\s\S]*?)`/)
  return match ? match[1] : ''
}

function loadVoiceProfile() {
  try { return readFileSync(resolve('./src/lib/claude/steve-voice-profile.md'), 'utf-8') }
  catch { return '' }
}

// ── Quality Grading ──
const BANNED_WORDS = [
  'prisoner', 'captive', 'trapped', 'slave', 'beggar',
  'grind', 'grinding', 'grinder', 'hamster wheel', 'treadmill',
  'rat race', 'cage', 'chains', 'hustler'
]

const GENERIC_NAMES = [
  'the authority', 'the ceo', 'the machine', 'the leader', 'the expert',
  'the coach', 'the owner', 'the operator', 'the worker', 'the starter',
  'the achiever', 'the striver', 'the hustler', 'the grinder'
]

function gradeIdentityNames(undesired, aspiring, niche) {
  let score = 100
  const issues = []

  // Check banned words (-15 each)
  for (const word of BANNED_WORDS) {
    if (undesired.toLowerCase().includes(word)) {
      score -= 15; issues.push(`Undesired name contains banned word "${word}"`)
    }
    if (aspiring.toLowerCase().includes(word)) {
      score -= 15; issues.push(`Aspiring name contains banned word "${word}"`)
    }
  }

  // Check generic names (-10 each)
  for (const gn of GENERIC_NAMES) {
    if (undesired.toLowerCase() === gn || aspiring.toLowerCase() === gn) {
      score -= 10; issues.push(`Name "${gn}" is generic`)
    }
  }

  // Check niche-specificity heuristic (-10 if too short or too generic)
  if (undesired.split(/\s+/).length < 2) { score -= 5; issues.push(`Undesired name too short: "${undesired}"`) }
  if (aspiring.split(/\s+/).length < 2) { score -= 5; issues.push(`Aspiring name too short: "${aspiring}"`) }

  // Bonus: check if names feel specific (has a number, specific noun, or insider term)
  const specificMarkers = /\$|\d|mom|dad|founder|agent|competitor|listing|stage|code|deploy|prep|posing/i
  if (!specificMarkers.test(undesired) && !specificMarkers.test(aspiring)) {
    issues.push('Neither name contains niche-specific markers (numbers, insider terms)')
  }

  return { score: Math.max(0, score), issues }
}

function gradeBannedWordDensity(content) {
  let count = 0
  const found = []
  const lower = content.toLowerCase()
  for (const word of BANNED_WORDS) {
    const regex = new RegExp(`\\b${word.replace(/\s+/g, '\\s+')}\\b`, 'gi')
    const matches = lower.match(regex)
    if (matches) { count += matches.length; found.push(`"${word}" x${matches.length}`) }
  }
  return { count, found }
}

// ── Name extraction (robust) ──
function extractNames(content) {
  const patterns = [
    // "Selected Name:" or "**Selected Name:**" pattern (from brainstorm table)
    /Selected Name[:\s]*\**\s*"?([^"\n*|]+)"?\s*\**/i,
    // Standard "Identity Name:" pattern
    /(?:Identity Name|Name\/Label)[^:]*:\s*\**\s*"?([^"*\n|]+)"?\s*\**/i,
    // ## heading with "Undesired/Before" label
    /##\s*(?:The\s+)?(?:Undesired|Before)\s+Identity[:\s]*[""]?([^""\n]+)/i,
    // ## heading with bold name
    /##\s*\*?\*?(The\s+[A-Z][^\n*]{2,40})\*?\*?\s*$/im,
    // After colon in a heading
    /##[^:\n]+:\s*\**\s*"?([^"*\n]+)"?\s*\**/i,
  ]

  const aspiringPatterns = [
    /Selected Name[:\s]*\**\s*"?([^"\n*|]+)"?\s*\**/i,
    /(?:Identity Name|Name\/Label)[^:]*:\s*\**\s*"?([^"*\n|]+)"?\s*\**/i,
    /##\s*(?:The\s+)?(?:Aspiring|After)\s+Identity[:\s]*[""]?([^""\n]+)/i,
    /##\s*\*?\*?(The\s+[A-Z][^\n*]{2,40})\*?\*?\s*$/im,
    /##[^:\n]+:\s*\**\s*"?([^"*\n]+)"?\s*\**/i,
  ]

  // Split at Part 2 / Aspiring section
  const splitRegex = /####?\s*(?:PART\s*2|The Aspiring Identity|After Identity|Identity #2|BECOME)/i
  const parts = content.split(splitRegex)
  const part1 = parts[0] || ''
  const part2 = parts[1] || content.substring(Math.floor(content.length * 0.45))

  function clean(name) {
    return name
      .replace(/\s*\((?:Undesired|Before|Aspiring|After|Current|Future)\s*Identity\)\s*/gi, '')
      .replace(/^["'*]+|["'*]+$/g, '')
      .replace(/\s*\|.*$/, '')  // Remove table remnants
      .trim()
  }

  function tryExtract(text, regexes) {
    for (const regex of regexes) {
      const match = text.match(regex)
      if (match) {
        const name = clean(match[1])
        if (name.length > 3 && name.length < 60 && name.split(/\s+/).length <= 8 &&
            !name.toLowerCase().includes('bridge') && !name.toLowerCase().includes('transformation')) {
          return name
        }
      }
    }
    return 'NOT FOUND'
  }

  return {
    undesired: tryExtract(part1, patterns),
    aspiring: tryExtract(part2, aspiringPatterns),
  }
}

// ── Generate one deliverable ──
async function generate(templateId, answers, context, preamble, voiceProfile) {
  const templatePrompt = fillTemplate(loadTemplate(templateId), answers)
  const clientDump = formatAnswers(answers)

  let prompt = `--- COMPLETE CLIENT INPUT DATA ---\n${clientDump}\n--- END CLIENT INPUT DATA ---\n\n${templatePrompt}`

  if (context) {
    prompt = prompt.replace('{{BELIEF_FRAMEWORK_CONTEXT}}', context)
  }

  const response = await claude.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: templateId === 'belief-shift-map' ? 12288 : 4096,
    temperature: 0.6,
    system: [
      { type: 'text', text: preamble },
      ...(voiceProfile ? [{ type: 'text', text: voiceProfile }] : []),
    ],
    messages: [{ role: 'user', content: prompt }],
  })

  const text = response.content.find(c => c.type === 'text')?.text || ''
  return {
    content: text,
    tokens: response.usage.input_tokens + response.usage.output_tokens,
  }
}

// ── Main ──
async function main() {
  console.log('═══════════════════════════════════════════════════════════════════')
  console.log('  FULL QUALITY AUDIT — 3 New Test Users (End-to-End)')
  console.log('═══════════════════════════════════════════════════════════════════\n')

  const preamble = loadPreamble()
  const voiceProfile = loadVoiceProfile()
  const allResults = []

  for (const user of TEST_USERS) {
    console.log(`\n${'─'.repeat(65)}`)
    console.log(`  ${user.clientName} — ${user.niche.substring(0, 60)}...`)
    console.log(`${'─'.repeat(65)}`)

    // ── Generate Two Identities ──
    console.log('\n  [1/2] Generating Two Identities...')
    const twoId = await generate('two-identities', user, null, preamble, voiceProfile)
    const names = extractNames(twoId.content)
    console.log(`        Undesired: "${names.undesired}"`)
    console.log(`        Aspiring:  "${names.aspiring}"`)

    // Grade identity names
    const nameGrade = gradeIdentityNames(names.undesired, names.aspiring, user.niche)
    const bodyBanned = gradeBannedWordDensity(twoId.content)

    console.log(`        Name Score: ${nameGrade.score}/100`)
    if (nameGrade.issues.length) console.log(`        Issues: ${nameGrade.issues.join('; ')}`)
    console.log(`        Banned words in body: ${bodyBanned.count} (${bodyBanned.found.join(', ') || 'none'})`)

    // ── Generate Belief Shift Map (uses two-identities as context) ──
    console.log('\n  [2/2] Generating Belief Shift Map...')

    // Build context from two-identities (mimics the real pipeline)
    const bsmContext = `## [DIRECT DEPENDENCY: two-identities] Two Identities\n\n${twoId.content}`

    // Also inject identity names prominently
    let identityBlock = ''
    if (names.undesired !== 'NOT FOUND' || names.aspiring !== 'NOT FOUND') {
      identityBlock = `\n⚠️ MANDATORY — IDENTITY NAMES ARE LOCKED ⚠️\nUndesired Identity: "${names.undesired}"\nAspiring Identity: "${names.aspiring}"\nYou MUST use these EXACT names. Do NOT create new names.\n⚠️ END MANDATORY IDENTITY NAMES ⚠️\n\n`
    }

    const bsm = await generate('belief-shift-map', user, identityBlock + bsmContext, preamble, voiceProfile)

    // Check if BSM preserved identity names
    const bsmLower = bsm.content.toLowerCase()
    const undesiredPreserved = names.undesired !== 'NOT FOUND' && bsmLower.includes(names.undesired.toLowerCase())
    const aspiringPreserved = names.aspiring !== 'NOT FOUND' && bsmLower.includes(names.aspiring.toLowerCase())
    const bsmBanned = gradeBannedWordDensity(bsm.content)

    console.log(`        Identity preserved in BSM: Undesired=${undesiredPreserved ? 'YES' : 'NO'}, Aspiring=${aspiringPreserved ? 'YES' : 'NO'}`)
    console.log(`        Banned words in BSM: ${bsmBanned.count} (${bsmBanned.found.join(', ') || 'none'})`)

    // ── Overall grade for this user ──
    let overallScore = nameGrade.score
    // Penalty for banned words in body (-2 each)
    overallScore -= bodyBanned.count * 2
    overallScore -= bsmBanned.count * 2
    // Penalty for identity NOT preserved in BSM (-10 each)
    if (!undesiredPreserved && names.undesired !== 'NOT FOUND') overallScore -= 10
    if (!aspiringPreserved && names.aspiring !== 'NOT FOUND') overallScore -= 10
    overallScore = Math.max(0, Math.min(100, overallScore))

    const grade = overallScore >= 90 ? 'A' : overallScore >= 80 ? 'B' : overallScore >= 70 ? 'C' : overallScore >= 60 ? 'D' : 'F'

    allResults.push({
      name: user.clientName,
      niche: user.niche.substring(0, 50),
      undesired: names.undesired,
      aspiring: names.aspiring,
      nameScore: nameGrade.score,
      nameIssues: nameGrade.issues,
      bodyBanned: bodyBanned.count,
      bsmBanned: bsmBanned.count,
      undesiredPreserved,
      aspiringPreserved,
      overallScore,
      grade,
      twoIdTokens: twoId.tokens,
      bsmTokens: bsm.tokens,
    })

    console.log(`\n  ★ OVERALL: ${overallScore}/100 (Grade: ${grade})`)
  }

  // ═══ FINAL REPORT ═══
  console.log('\n\n' + '═'.repeat(65))
  console.log('  FINAL QUALITY REPORT')
  console.log('═'.repeat(65))

  console.log('\n┌─────────────────────┬──────────────────────────┬──────────────────────────┬───────┬───────┐')
  console.log('│ Client              │ Undesired Identity       │ Aspiring Identity         │ Score │ Grade │')
  console.log('├─────────────────────┼──────────────────────────┼──────────────────────────┼───────┼───────┤')
  for (const r of allResults) {
    const name = r.name.padEnd(19).substring(0, 19)
    const und = r.undesired.padEnd(24).substring(0, 24)
    const asp = r.aspiring.padEnd(24).substring(0, 24)
    console.log(`│ ${name} │ ${und} │ ${asp} │ ${String(r.overallScore).padStart(5)} │   ${r.grade}   │`)
  }
  console.log('└─────────────────────┴──────────────────────────┴──────────────────────────┴───────┴───────┘')

  // Cross-user uniqueness
  const allNames = allResults
    .flatMap(r => [r.undesired, r.aspiring])
    .filter(n => n !== 'NOT FOUND')
    .map(n => n.toLowerCase())
  const dupes = allNames.filter((n, i) => allNames.indexOf(n) !== i)

  console.log('\n── Quality Checks ──')
  console.log(`  Unique names across users: ${dupes.length === 0 ? '✅ PASS' : `❌ FAIL (${dupes.join(', ')})`}`)
  console.log(`  Banned words in names:     ${allResults.every(r => r.nameScore >= 85) ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`  Identity preserved in BSM: ${allResults.every(r => r.undesiredPreserved || r.undesired === 'NOT FOUND') ? '✅ PASS' : '⚠️  PARTIAL'}`)

  const avgScore = Math.round(allResults.reduce((s, r) => s + r.overallScore, 0) / allResults.length)
  const avgGrade = avgScore >= 90 ? 'A' : avgScore >= 80 ? 'B' : avgScore >= 70 ? 'C' : avgScore >= 60 ? 'D' : 'F'

  console.log(`\n  Total banned words (body): ${allResults.reduce((s, r) => s + r.bodyBanned + r.bsmBanned, 0)}`)
  console.log(`  Average score:             ${avgScore}/100 (Grade: ${avgGrade})`)

  const totalTokens = allResults.reduce((s, r) => s + r.twoIdTokens + r.bsmTokens, 0)
  console.log(`  Total tokens used:         ${totalTokens.toLocaleString()}`)

  console.log('\n' + '═'.repeat(65))
  console.log(`  OVERALL VERDICT: ${avgScore >= 80 ? '✅ QUALITY SYSTEM IS WORKING' : '❌ NEEDS MORE WORK'}`)
  console.log('═'.repeat(65))
}

main().catch(err => { console.error('Test failed:', err); process.exit(1) })
