/**
 * COMPREHENSIVE QUALITY AUDIT — All Deliverables for 2 Users
 * Checks: banned words, placeholders, identity consistency, hallucinations,
 * content length, cross-user repetition. Grades each deliverable A-F.
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const BANNED = ['prisoner', 'captive', 'trapped', 'slave', 'beggar', 'grind', 'grinding', 'hamster wheel', 'treadmill', 'rat race', 'cage', 'chains']
const HALLUC_NAMES = ['warrior greens', 'vigor summit', 'sam bakhtiar', 'garrett j. white', 'kevin nations', 'garrett white']
const PHASES = {
  1: ['mission-statement', 'human-bio', 'proof-stack'],
  2: ['magnetic-messaging-statement', 'emotional-trigger-map', 'usp'],
  3: ['two-identities', 'belief-shift-map', 'lead-magnet-outline', 'offer-one-sheet'],
  4: ['core-conversion-content', 'sales-call-script', 'homepage-copy', 'about-page', 'email-welcome-sequence', 'email-sales-sequence', 'qualifying-filter', 'pricing-framework'],
  5: ['content-angle-library', 'facebook-posts', 'facebook-ad-copy', 'youtube-script', 'shorts-reels-scripts', 'carousel-posts', 'ghl-chat-sequence', 'manychat-sequence'],
}

function getPhase(templateId) {
  for (const [phase, ids] of Object.entries(PHASES)) {
    if (ids.includes(templateId)) return Number(phase)
  }
  return 0
}

function countBanned(content) {
  const lower = content.toLowerCase()
  let count = 0
  const found = []
  for (const word of BANNED) {
    const regex = new RegExp(`\\b${word.replace(/\s+/g, '\\s+')}\\b`, 'gi')
    const matches = content.match(regex)
    if (matches) { count += matches.length; found.push(`${word}(${matches.length})`) }
  }
  return { count, found }
}

function countPlaceholders(content) {
  const templateLeaks = (content.match(/\{\{[a-zA-Z]+\}\}/g) || []).length
  const dataNotProvided = (content.match(/DATA NOT PROVIDED/gi) || []).length
  return templateLeaks + dataNotProvided
}

function countHallucinations(content) {
  const lower = content.toLowerCase()
  let count = 0
  const found = []
  for (const name of HALLUC_NAMES) {
    if (lower.includes(name)) { count++; found.push(name) }
  }
  // Check for suspicious invented stats (numbers not from client data)
  // Look for very specific percentages that seem made up
  const suspiciousStats = content.match(/\b\d{2,3}%\b/g) || []
  if (suspiciousStats.length > 5) { count++; found.push(`${suspiciousStats.length} percentages`) }
  return { count, found }
}

function extractIdentityNames(content) {
  let undesired = null, aspiring = null

  // Split at any heading level: ##, ###, ####
  const parts = content.split(/#{2,4}\s*(?:PART\s*2|The Aspiring Identity|After Identity)/i)
  const part1 = parts[0] || '', part2 = parts[1] || ''

  function cleanN(raw) {
    return raw.trim().replace(/\*+/g, '').replace(/^["'\u201C\u201D]|["'\u201C\u201D]$/g, '').replace(/^\[|\]$/g, '').trim()
  }

  // Pattern 1: Selected Name:
  const selRe = /\*?\*?Selected\s+Name\*?\*?:?\s*\*?\*?\s*\[?\s*"?([^"*\n\]]+)"?\s*\]?\s*\*?\*?/i
  const p1s = part1.match(selRe); if (p1s) undesired = cleanN(p1s[1])
  const p2s = part2.match(selRe); if (p2s) aspiring = cleanN(p2s[1])

  // Pattern 2: Name/Label or Identity Name:
  if (!undesired || !aspiring) {
    const nlRe = /\*?\*?(?:Name\/Label|Identity Name)\*?\*?:?\s*\*?\*?\s*"?([^"*\n]+)"?\s*\*?\*?/i
    if (!undesired) { const m = part1.match(nlRe); if (m) undesired = cleanN(m[1]) }
    if (!aspiring) { const m = part2.match(nlRe); if (m) aspiring = cleanN(m[1]) }
  }

  // Pattern 2b: Bold-quoted name after Identity Name heading
  if (!undesired || !aspiring) {
    const bqRe = /Identity Name\s*\n+\s*\*\*"([^"]+)"\*\*/gi
    const allM = [...content.matchAll(bqRe)]
    if (allM.length >= 1 && !undesired) undesired = cleanN(allM[0][1])
    if (allM.length >= 2 && !aspiring) aspiring = cleanN(allM[1][1])
  }

  // Pattern 3: BEFORE/AFTER in condensed section
  if (!undesired) {
    const m = content.match(/(?:^|\n)\s*\*?\*?BEFORE\s*\((?:The\s+)?([^)]+)\)\s*\*?\*?\s*:?/im)
    if (m) { const c = cleanN(m[1]); if (!c.toLowerCase().includes('sales page')) { undesired = c; if (!undesired.toLowerCase().startsWith('the ')) undesired = 'The ' + undesired } }
  }
  if (!aspiring) {
    const m = content.match(/(?:^|\n)\s*\*?\*?AFTER\s*\((?:The\s+)?([^)]+)\)\s*\*?\*?\s*:?/im)
    if (m && !m[0].includes('& AFTER')) { const c = cleanN(m[1]); if (!c.toLowerCase().includes('sales page')) { aspiring = c; if (!aspiring.toLowerCase().startsWith('the ')) aspiring = 'The ' + aspiring } }
  }

  // Pattern 4: Bridge statement
  if (!undesired || !aspiring) {
    const m = content.match(/difference between\s+(?:(?:the|a)\s+)?[""\u201C]?([^""\u201D]+?)[""\u201D]?\s+and\s+(?:(?:the|a)\s+)?[""\u201C]?([^""\u201D]+?)[""\u201D]?\s+is/i)
    if (m) { if (!undesired) undesired = m[1].trim(); if (!aspiring) aspiring = m[2].trim() }
  }

  if (undesired && undesired.split(/\s+/).length > 6) undesired = null
  if (aspiring && aspiring.split(/\s+/).length > 6) aspiring = null
  return { undesired, aspiring }
}

// Extract 5-grams for cross-user comparison
function extractNGrams(content, n = 5) {
  const words = content.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(w => w.length > 2)
  const grams = new Set()
  for (let i = 0; i <= words.length - n; i++) {
    grams.add(words.slice(i, i + n).join(' '))
  }
  return grams
}

function gradeDeliverable(templateId, content, identityNames) {
  let score = 100
  const issues = []

  // Banned words: -3 each
  const banned = countBanned(content)
  score -= banned.count * 3
  if (banned.count) issues.push(`Banned words: ${banned.found.join(', ')}`)

  // Placeholders: -15 each
  const placeholders = countPlaceholders(content)
  score -= placeholders * 15
  if (placeholders) issues.push(`${placeholders} placeholder leaks`)

  // Hallucinations: -10 each
  const halluc = countHallucinations(content)
  score -= halluc.count * 10
  if (halluc.count) issues.push(`Hallucination: ${halluc.found.join(', ')}`)

  // Content length: -20 if too short
  if (content.length < 500) { score -= 20; issues.push(`Very short (${content.length} chars)`) }

  // Identity consistency: check if downstream deliverables use the identity names
  if (identityNames && templateId !== 'two-identities') {
    const lower = content.toLowerCase()
    if (identityNames.undesired && !lower.includes(identityNames.undesired.toLowerCase())) {
      // Only penalize deliverables that SHOULD use identity names
      const shouldUse = ['belief-shift-map', 'core-conversion-content', 'sales-call-script',
        'homepage-copy', 'about-page', 'qualifying-filter', 'facebook-posts', 'facebook-ad-copy',
        'youtube-script', 'email-sales-sequence']
      if (shouldUse.includes(templateId)) {
        score -= 8; issues.push(`Missing undesired identity name`)
      }
    }
  }

  score = Math.max(0, Math.min(100, score))
  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'
  return { score, grade, issues }
}

async function main() {
  console.log('═'.repeat(70))
  console.log('  COMPREHENSIVE DELIVERABLE QUALITY AUDIT')
  console.log('═'.repeat(70))

  // Pick 2 users: most deliverables, different niches
  const { data: allQ } = await supabase
    .from('questionnaires')
    .select('id, answers, status')
    .eq('status', 'completed')

  // Count deliverables per questionnaire
  const { data: allD } = await supabase
    .from('deliverables')
    .select('id, questionnaire_id, template_id, content, quality_score, status')
    .eq('status', 'completed')

  const countByQ = {}
  for (const d of allD) {
    countByQ[d.questionnaire_id] = (countByQ[d.questionnaire_id] || 0) + 1
  }

  // Find the freshly regenerated Steve (specific QID) and top non-Steve
  const STEVE_QID = '290fffc7-cd3c-403e-9be4-7a7d7212dbcb'
  let steveQ = allQ.find(q => q.id === STEVE_QID) || null
  let otherQ = null
  const sorted = allQ.sort((a, b) => (countByQ[b.id] || 0) - (countByQ[a.id] || 0))
  for (const q of sorted) {
    const name = (q.answers?.clientName || '').toLowerCase()
    if (!otherQ && !name.includes('steve') && !name.includes('test')) otherQ = q
  }

  const users = [steveQ, otherQ].filter(Boolean)
  console.log(`\nAuditing ${users.length} users:\n`)

  const userResults = []

  for (const q of users) {
    const clientName = q.answers?.clientName || 'Unknown'
    const niche = (q.answers?.niche || '').substring(0, 60)
    const deliverables = allD.filter(d => d.questionnaire_id === q.id)

    console.log(`${'─'.repeat(70)}`)
    console.log(`  ${clientName} (${deliverables.length} deliverables)`)
    console.log(`  Niche: ${niche}...`)
    console.log(`${'─'.repeat(70)}`)

    // Extract identity names from two-identities if it exists
    const twoId = deliverables.find(d => d.template_id === 'two-identities')
    const identityNames = twoId ? extractIdentityNames(twoId.content) : null
    if (identityNames) {
      console.log(`  Identity Names: "${identityNames.undesired}" / "${identityNames.aspiring}"`)
    }

    // Grade each deliverable
    const grades = []
    const phaseScores = {}

    // Sort by phase order
    deliverables.sort((a, b) => getPhase(a.template_id) - getPhase(b.template_id))

    let currentPhase = 0
    for (const d of deliverables) {
      const phase = getPhase(d.template_id)
      if (phase !== currentPhase) {
        currentPhase = phase
        console.log(`\n  Phase ${phase}:`)
      }

      const result = gradeDeliverable(d.template_id, d.content, identityNames)
      grades.push({ ...result, templateId: d.template_id, phase })

      if (!phaseScores[phase]) phaseScores[phase] = []
      phaseScores[phase].push(result.score)

      const icon = result.grade === 'A' ? '✅' : result.grade === 'B' ? '🟢' : result.grade === 'C' ? '🟡' : result.grade === 'D' ? '🟠' : '🔴'
      const issueStr = result.issues.length ? ` — ${result.issues.join('; ')}` : ''
      console.log(`    ${icon} ${d.template_id.padEnd(28)} ${result.grade} (${result.score})${issueStr}`)
    }

    // Phase summaries
    console.log(`\n  Phase Averages:`)
    for (const [phase, scores] of Object.entries(phaseScores).sort()) {
      const avg = Math.round(scores.reduce((s, v) => s + v, 0) / scores.length)
      const grade = avg >= 90 ? 'A' : avg >= 80 ? 'B' : avg >= 70 ? 'C' : avg >= 60 ? 'D' : 'F'
      console.log(`    Phase ${phase}: ${avg}/100 (${grade}) — ${scores.length} deliverables`)
    }

    const overallAvg = Math.round(grades.reduce((s, g) => s + g.score, 0) / grades.length)
    const overallGrade = overallAvg >= 90 ? 'A' : overallAvg >= 80 ? 'B' : overallAvg >= 70 ? 'C' : overallAvg >= 60 ? 'D' : 'F'
    console.log(`\n  ★ OVERALL: ${overallAvg}/100 (${overallGrade})`)

    userResults.push({
      name: clientName,
      niche,
      deliverableCount: deliverables.length,
      grades,
      overallAvg,
      overallGrade,
      identityNames,
      ngrams: new Set(),
    })

    // Collect n-grams for cross-user comparison
    for (const d of deliverables) {
      const grams = extractNGrams(d.content)
      for (const g of grams) userResults[userResults.length - 1].ngrams.add(g)
    }
  }

  // Cross-user repetition
  if (userResults.length === 2) {
    console.log(`\n${'═'.repeat(70)}`)
    console.log('  CROSS-USER REPETITION ANALYSIS')
    console.log(`${'═'.repeat(70)}`)

    const shared = []
    const set1 = userResults[0].ngrams
    const set2 = userResults[1].ngrams
    for (const gram of set1) {
      if (set2.has(gram)) shared.push(gram)
    }

    // Filter out very common English phrases
    const commonEnglish = new Set(['this is not about', 'you are not alone', 'the end of the', 'one of the most',
      'that is why you', 'what you need to', 'you need to know', 'for the first time', 'the rest of your',
      'the most important thing', 'and that is why', 'that you can use'])

    const meaningful = shared
      .filter(g => !commonEnglish.has(g) && g.length > 20)
      .sort((a, b) => b.length - a.length)
      .slice(0, 20)

    console.log(`\n  Shared 5-grams: ${shared.length} total, ${meaningful.length} potentially meaningful`)
    console.log(`\n  Top repeated phrases across both users:`)
    for (let i = 0; i < Math.min(meaningful.length, 15); i++) {
      console.log(`    ${i + 1}. "${meaningful[i]}"`)
    }

    // Identity names comparison
    console.log(`\n  Identity Name Comparison:`)
    for (const r of userResults) {
      console.log(`    ${r.name}: "${r.identityNames?.undesired || 'N/A'}" / "${r.identityNames?.aspiring || 'N/A'}"`)
    }
    const u1 = userResults[0].identityNames?.undesired?.toLowerCase() || ''
    const u2 = userResults[1].identityNames?.undesired?.toLowerCase() || ''
    if (u1 && u2 && u1 === u2) {
      console.log('    ❌ SAME undesired identity name across users!')
    } else {
      console.log('    ✅ Different identity names')
    }
  }

  // Final summary
  console.log(`\n${'═'.repeat(70)}`)
  console.log('  FINAL SUMMARY')
  console.log(`${'═'.repeat(70)}`)
  for (const r of userResults) {
    const aCount = r.grades.filter(g => g.grade === 'A').length
    const bCount = r.grades.filter(g => g.grade === 'B').length
    const cCount = r.grades.filter(g => g.grade === 'C').length
    const dCount = r.grades.filter(g => g.grade === 'D').length
    const fCount = r.grades.filter(g => g.grade === 'F').length
    console.log(`\n  ${r.name}: ${r.overallAvg}/100 (${r.overallGrade})`)
    console.log(`    A:${aCount} B:${bCount} C:${cCount} D:${dCount} F:${fCount} — ${r.deliverableCount} total`)
  }
  console.log(`\n  Combined average: ${Math.round(userResults.reduce((s, r) => s + r.overallAvg, 0) / userResults.length)}/100`)
  console.log('═'.repeat(70))
}

main().catch(err => { console.error(err); process.exit(1) })
