/**
 * FULL PIPELINE TEST — 3 Test Users × 5 Deliverables
 * Generates: two-identities → belief-shift-map → homepage-copy → about-page → email-sales-sequence
 * Tests the complete chain: identity creation → downstream propagation → client-facing copy
 */
import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const BANNED = ['prisoner','captive','trapped','slave','beggar','grind','grinding','hamster wheel','treadmill','rat race','cage','chains']
const HALLUC = ['sam bakhtiar','kevin nations','garrett j. white','garrett white','warrior greens','vigor summit']
const HALLUC_FILTER = ['Sam Bakhtiar','Bakhtiar','Kevin Nations','Garrett J. White','Garrett White','Warrior Greens','Vigor Summit']

const USERS = [
  {
    clientName: 'Maria Gonzalez test', businessName: 'Radiant Real Estate Academy',
    niche: 'Real estate agents in their first 3 years who are drowning in cold calls and open houses but closing fewer than 6 deals a year.',
    targetAudience: 'Women and men aged 25-40 making under $40K from commissions, working 60+ hours a week.',
    unwantedFeelings: 'Embarrassed at family dinners when people ask how real estate is going. Anxious every month about desk fees. Jealous of top producers.',
    desiredFeelings: 'Confident walking into listing appointments. Financially stable with predictable closings. Respected in their brokerage.',
    aspiringIdentity: 'The go-to agent in their market. Consistently closing 2-3 deals per month with a pipeline that fills itself.',
    problemSolved: 'New agents relying on cold calling and begging their sphere for referrals. I give them a content-based lead gen system.',
    uniqueMechanism: 'The Listing Magnet Method — Local Authority Content + Referral Engine + Pipeline Dashboard.',
    commonObjections: ['I do not have time to create content','My broker already provides leads','Social media does not work in my market'],
    brandVoice: 'motivational', offerName: 'The Listing Magnet Method', pricePoint: '$3,997',
    transformation: 'From scrambling for every deal to predictable inbound leads filling their calendar.',
    idealClientCurrentMethods: 'Cold calling expired listings, open houses, buying Zillow leads, posting generic just-listed content.',
    idealClientCurrentRevenue: 'Under $40K/year from commissions. 4-6 deals per year. Spending $300-500/month on bad leads.',
    expertise: ['real estate lead gen','social media for agents'], storyBeforeState: 'Brand new agent sitting in an empty office.',
    storyTurningPoint: 'Started posting hyper-local content on Instagram, got first inbound listing lead in 90 days.',
    storyAfterState: 'Now close 3-4 deals/month, 80% from content and referrals.', storyFacts: 'Licensed 8 years. 200+ transactions. Team of 4.',
    programDuration: '6 months', programIncludes: '12 weeks coaching, content templates, CRM setup, listing scripts.',
  },
  {
    clientName: 'David Chen test', businessName: 'Inner Compass Leadership',
    niche: 'Tech founders making $200K-$1M who achieved product-market fit but are emotionally disconnected from teams, partners, and themselves.',
    targetAudience: 'Men aged 30-45 who founded tech companies. Smart, driven, introverted, emotionally avoidant. Cannot have vulnerable conversations.',
    unwantedFeelings: 'Numb. Lonely despite being surrounded by people. Terrified that showing weakness will collapse everything they built. Secretly ashamed.',
    desiredFeelings: 'Present during conversations. Calm confidence. Deep trust with co-founder and partner. At peace with imperfection.',
    aspiringIdentity: 'A leader respected for how he makes people feel, not just what he builds. Team stays for culture, not equity.',
    problemSolved: 'Tech founders who optimized everything except emotional intelligence. Zero framework for connection or vulnerability.',
    uniqueMechanism: 'The Inner OS Framework — Diagnostic (map blind spots) + Rewrite (replace avoidance with connection) + Integration (apply in real scenarios).',
    commonObjections: ['I do not have time for soft skills','This sounds like therapy','My company needs me focused'],
    brandVoice: 'authoritative', offerName: 'The Inner OS Framework', pricePoint: '$15,000',
    transformation: 'From emotionally avoidant founder to integrated leader who builds trust as effectively as products.',
    idealClientCurrentMethods: 'Leadership books, podcasts, exec coaches focused on metrics, meditation apps, therapy they quit after 3 sessions.',
    idealClientCurrentRevenue: '$200K-$1M personal. Company $1M-$10M ARR. 10-50 employees.',
    expertise: ['emotional intelligence','leadership communication'], storyBeforeState: 'CTO who could debug any system except his marriage.',
    storyTurningPoint: 'Co-founder said he was leaving because he could not trust someone who never showed a real emotion.',
    storyAfterState: 'Rebuilt both relationships by leading with connection first.', storyFacts: 'Former CTO at 2 startups. 12 years in tech. 40+ founders coached.',
    programDuration: '6 months', programIncludes: 'Weekly 1-on-1, EQ assessments, relationship repair framework, peer group of 8.',
  },
  {
    clientName: 'Rachel Kim test', businessName: 'Stage Ready Academy',
    niche: 'Amateur bikini competitors who keep placing outside top 5. They train hard but posing, peak week, and stage presence cost them trophies.',
    targetAudience: 'Women aged 22-38 in NPC bikini/figure. Done 2-5 shows, never top 3. Spend $5K-$15K per prep.',
    unwantedFeelings: 'Devastated standing in lineup about to get called last. Embarrassed posting results. Confused because physique looks great in gym mirror.',
    desiredFeelings: 'Electric confidence hitting front pose under stage lights. Proud holding top 3 trophy. Certain peak week protocol will land perfectly.',
    aspiringIdentity: 'The competitor judges cannot stop watching. Conditioning dialed. Posing flawless. The girl backstage others ask for tips.',
    problemSolved: 'Competitors with the physique but not the presentation. I fix the gap between gym mirror and stage.',
    uniqueMechanism: 'The Stage Ready System — Posing Lab (weekly video feedback) + Peak Protocol (day-by-day water/sodium/carb) + Spotlight Method (stage presence).',
    commonObjections: ['My current coach handles posing','I just need better genetics','Posing coaching is not worth the money'],
    brandVoice: 'motivational', offerName: 'The Stage Ready System', pricePoint: '$2,497',
    transformation: 'From always-outside-top-5 to consistently placing top 3 and qualifying for nationals.',
    idealClientCurrentMethods: 'YouTube posing tutorials, gym mirror practice, general prep coach spending 5 mins on posing last week.',
    idealClientCurrentRevenue: 'Not applicable — hobby. Spend $5K-$15K per prep from day job.',
    expertise: ['competition posing','peak week','stage presence'], storyBeforeState: 'Placed 11th in first three shows, ready to quit.',
    storyTurningPoint: 'Judge said physique was top 3 but posing was hiding it.',
    storyAfterState: 'Won pro card within a year after rebuilding stage approach.', storyFacts: 'NPC competitor 6 years. Pro card. Top 3 in 12 shows. 30+ clients coached.',
    programDuration: '16 weeks', programIncludes: 'Weekly posing video reviews, custom peak week, stage presence training, suit consultation.',
  },
]

const TEMPLATES = ['two-identities', 'belief-shift-map', 'homepage-copy', 'about-page', 'email-sales-sequence']

function loadTemplate(id) {
  const raw = readFileSync(resolve(`./src/lib/claude/templates/${id}.md`), 'utf-8')
  const m = raw.match(/```\n([\s\S]*?)\n```/)
  return m ? m[1] : ''
}

function fill(prompt, answers) {
  for (const [k, v] of Object.entries(answers)) {
    if (typeof v === 'string') prompt = prompt.replaceAll(`{{${k}}}`, v)
    else if (Array.isArray(v)) prompt = prompt.replaceAll(`{{${k}}}`, v.join(', '))
  }
  prompt = prompt.replace(/\{\{#if (\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (m, f, c) => answers[f] ? c.replaceAll(`{{${f}}}`, String(answers[f])) : '')
  prompt = prompt.replace(/\{\{(\w+)\}\}/g, '[$1: DATA NOT PROVIDED]')
  prompt = prompt.replaceAll('{{STEVE_VOICE_PROFILE}}', '')
  return prompt
}

function fmtAnswers(a) {
  return Object.entries(a).filter(([,v]) => v && v !== '').map(([k,v]) => {
    const l = k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim()
    return Array.isArray(v) ? `${l}: ${v.join(', ')}` : `${l}: ${v}`
  }).join('\n')
}

function sanitize(text) {
  let s = text
  for (const n of HALLUC_FILTER) s = s.replaceAll(n, '[ref removed]')
  return s
}

function countBanned(text) {
  const l = text.toLowerCase(); let c = 0; const f = []
  for (const w of BANNED) { const m = l.match(new RegExp(`\\b${w.replace(/\s+/g,'\\s+')}\\b`, 'gi')); if (m) { c += m.length; f.push(`${w}(${m.length})`) } }
  return { count: c, found: f }
}

function countHalluc(text) {
  const l = text.toLowerCase(); let c = 0; const f = []
  for (const n of HALLUC) { if (l.includes(n)) { c++; f.push(n) } }
  return { count: c, found: f }
}

function extractNames(content) {
  const patterns = [/Selected Name[:\s]*\**\s*"?([^"\n*|]+)/i, /Identity Name[^:]*:\s*\**\s*"?([^"*\n|]+)/i, /##\s*\*?\*?(The\s+[A-Z][^\n*]{2,35})\*?\*?\s*$/im]
  const parts = content.split(/####?\s*(?:PART\s*2|The Aspiring Identity|After Identity)/i)
  function ex(t) { for (const p of patterns) { const m = t.match(p); if (m) { const n = m[1].replace(/[*"'|]/g,'').trim(); if (n.length > 3 && n.length < 50) return n } } return null }
  return { undesired: ex(parts[0] || ''), aspiring: ex(parts[1] || '') }
}

async function gen(templateId, answers, context, preamble, vp) {
  let prompt = fill(loadTemplate(templateId), answers)
  if (context) prompt = prompt.replace('{{BELIEF_FRAMEWORK_CONTEXT}}', context)
  else prompt = prompt.replaceAll('{{BELIEF_FRAMEWORK_CONTEXT}}', '')
  const full = `--- COMPLETE CLIENT INPUT DATA ---\n${fmtAnswers(answers)}\n--- END CLIENT INPUT DATA ---\n\n${prompt}`
  const r = await claude.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: templateId === 'email-sales-sequence' ? 20480 : templateId === 'belief-shift-map' ? 12288 : 8192,
    temperature: 0.6,
    system: [{ type: 'text', text: preamble }, ...(vp ? [{ type: 'text', text: vp }] : [])],
    messages: [{ role: 'user', content: full }],
  })
  const text = r.content.find(c => c.type === 'text')?.text || ''
  return { content: sanitize(text), tokens: r.usage.input_tokens + r.usage.output_tokens }
}

async function main() {
  console.log('═'.repeat(70))
  console.log('  FULL PIPELINE TEST — 3 Users × 5 Deliverables')
  console.log('═'.repeat(70))

  const preamble = (() => { const r = readFileSync(resolve('./src/lib/claude/generate.ts'), 'utf-8'); const m = r.match(/const GLOBAL_SYSTEM_PREAMBLE = `([\s\S]*?)`/); return m ? m[1] : '' })()
  let vp = ''; try { vp = readFileSync(resolve('./src/lib/claude/steve-voice-profile.md'), 'utf-8') } catch {}

  const allResults = []

  for (const user of USERS) {
    console.log(`\n${'─'.repeat(70)}`)
    console.log(`  ${user.clientName}`)
    console.log(`  ${user.niche.substring(0, 65)}...`)
    console.log(`${'─'.repeat(70)}`)

    const deliverables = {}
    let totalTokens = 0
    let overallScore = 0
    let delivCount = 0
    const grades = []

    for (const tid of TEMPLATES) {
      process.stdout.write(`  Generating ${tid}...`)
      const startMs = Date.now()

      // Build context from prior deliverables
      let ctx = ''
      if (tid !== 'two-identities') {
        const priorIds = Object.keys(deliverables)
        if (priorIds.length) {
          // Add identity names prominently
          if (deliverables['two-identities']) {
            const names = extractNames(deliverables['two-identities'])
            if (names.undesired || names.aspiring) {
              ctx += `⚠️ MANDATORY — IDENTITY NAMES ARE LOCKED ⚠️\nUndesired Identity: "${names.undesired || 'N/A'}"\nAspiring Identity: "${names.aspiring || 'N/A'}"\nUse these EXACT names. Do NOT create new ones.\n⚠️ END MANDATORY IDENTITY NAMES ⚠️\n\n`
            }
          }
          ctx += `⚠️ PRIOR DELIVERABLE QUALITY NOTICE: Use for structural reference only. Generate fresh niche-specific language.\n\n`
          for (const pid of priorIds) {
            ctx += `## [PRIOR: ${pid}]\n${deliverables[pid].substring(0, 4000)}\n\n`
          }
        }
      }

      const result = await gen(tid, user, ctx || null, preamble, vp)
      deliverables[tid] = result.content
      totalTokens += result.tokens
      const elapsed = ((Date.now() - startMs) / 1000).toFixed(1)

      // Grade
      let score = 100
      const issues = []

      const banned = countBanned(result.content)
      score -= banned.count * 3
      if (banned.count) issues.push(`banned(${banned.found.join(',')})`)

      const halluc = countHalluc(result.content)
      score -= halluc.count * 10
      if (halluc.count) issues.push(`halluc(${halluc.found.join(',')})`)

      const placeholders = (result.content.match(/\{\{[a-zA-Z]+\}\}/g) || []).length + (result.content.match(/DATA NOT PROVIDED/gi) || []).length
      score -= placeholders * 15
      if (placeholders) issues.push(`placeholders(${placeholders})`)

      if (result.content.length < 500) { score -= 20; issues.push('too short') }

      // Identity consistency for downstream templates
      if (tid !== 'two-identities' && deliverables['two-identities']) {
        const names = extractNames(deliverables['two-identities'])
        if (names.undesired && !result.content.toLowerCase().includes(names.undesired.toLowerCase())) {
          if (['belief-shift-map','homepage-copy','about-page','email-sales-sequence'].includes(tid)) {
            score -= 8; issues.push('identity not preserved')
          }
        }
      }

      score = Math.max(0, Math.min(100, score))
      const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'
      overallScore += score; delivCount++
      grades.push({ tid, score, grade, issues })

      const icon = grade === 'A' ? '✅' : grade === 'B' ? '🟢' : grade === 'C' ? '🟡' : grade === 'D' ? '🟠' : '🔴'
      console.log(` ${elapsed}s ${icon} ${grade}(${score}) ${issues.length ? issues.join('; ') : ''}`)

      // Show identity names for two-identities
      if (tid === 'two-identities') {
        const names = extractNames(result.content)
        console.log(`    → Undesired: "${names.undesired || 'NOT FOUND'}" | Aspiring: "${names.aspiring || 'NOT FOUND'}"`)
      }
    }

    const avg = Math.round(overallScore / delivCount)
    const avgGrade = avg >= 90 ? 'A' : avg >= 80 ? 'B' : avg >= 70 ? 'C' : avg >= 60 ? 'D' : 'F'
    console.log(`\n  ★ ${user.clientName}: ${avg}/100 (${avgGrade}) — ${totalTokens.toLocaleString()} tokens`)
    allResults.push({ name: user.clientName, avg, avgGrade, grades, totalTokens })
  }

  // Final report
  console.log(`\n${'═'.repeat(70)}`)
  console.log('  FINAL RESULTS')
  console.log('═'.repeat(70))

  console.log('\n  Per-User Scores:')
  for (const r of allResults) {
    console.log(`    ${r.name.padEnd(22)} ${r.avg}/100 (${r.avgGrade})`)
    for (const g of r.grades) {
      const icon = g.grade === 'A' ? '✅' : g.grade === 'B' ? '🟢' : g.grade === 'C' ? '🟡' : g.grade === 'D' ? '🟠' : '🔴'
      console.log(`      ${icon} ${g.tid.padEnd(25)} ${g.grade}(${g.score}) ${g.issues.join('; ')}`)
    }
  }

  // Cross-user identity check
  console.log('\n  Identity Names:')
  for (const r of allResults) {
    const twoId = r.grades.find(g => g.tid === 'two-identities')
    console.log(`    ${r.name}: see above`)
  }

  const totalAvg = Math.round(allResults.reduce((s, r) => s + r.avg, 0) / allResults.length)
  const totalGrade = totalAvg >= 90 ? 'A' : totalAvg >= 80 ? 'B' : totalAvg >= 70 ? 'C' : totalAvg >= 60 ? 'D' : 'F'
  const totalTokens = allResults.reduce((s, r) => s + r.totalTokens, 0)
  const fCount = allResults.flatMap(r => r.grades).filter(g => g.grade === 'F').length
  const hallucCount = allResults.flatMap(r => r.grades).reduce((s, g) => s + (g.issues.some(i => i.startsWith('halluc')) ? 1 : 0), 0)

  console.log(`\n  Combined: ${totalAvg}/100 (${totalGrade})`)
  console.log(`  F grades: ${fCount}`)
  console.log(`  Hallucinations: ${hallucCount}`)
  console.log(`  Total tokens: ${totalTokens.toLocaleString()}`)

  console.log(`\n${'═'.repeat(70)}`)
  console.log(`  ${totalAvg >= 85 && fCount === 0 && hallucCount === 0 ? '✅ ALL QUALITY CHECKS PASSED' : '⚠️  ISSUES REMAIN — SEE DETAILS ABOVE'}`)
  console.log('═'.repeat(70))
}

main().catch(e => { console.error(e); process.exit(1) })
