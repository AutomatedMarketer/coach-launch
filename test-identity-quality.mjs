/**
 * Quality Validation Test — Two Identities
 * Tests the updated templates against 3 different niches to verify:
 * 1. No banned words in identity names
 * 2. Niche-specific names (not generic)
 * 3. Diversity across users
 * 4. Identity names are meaningfully different
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

// ── Banned words list (from our fix) ──
const BANNED_WORDS = [
  'prisoner', 'captive', 'trapped', 'slave', 'beggar',
  'grind', 'grinding', 'grinder', 'hamster wheel', 'treadmill',
  'rat race', 'cage', 'chains', 'hustler'
]

// ── Test users with diverse niches ──
const TEST_QUESTIONNAIRES = [
  'aecc5398-b06a-4d36-9da2-0109646de60f',  // Jake Loeffler — blue-collar trade businesses
  'f9bba82f-cf5c-432b-b5b1-788935072ab8',  // Sarah Martinez — postpartum fitness for moms
  '88e69098-2f43-48d5-bb4b-9b7d39fde69a',  // Michael DeSanti — high-achieving men, life balance
]

// ── Load and fill template (simplified version of template-loader) ──
function loadAndFillTemplate(answers) {
  const templatePath = resolve('./src/lib/claude/templates/two-identities.md')
  const raw = readFileSync(templatePath, 'utf-8')

  // Extract generation prompt section
  const promptMatch = raw.match(/```\n([\s\S]*?)\n```/)
  if (!promptMatch) throw new Error('Could not extract generation prompt')
  let prompt = promptMatch[1]

  // Fill placeholders
  for (const [key, value] of Object.entries(answers)) {
    if (typeof value === 'string') {
      prompt = prompt.replaceAll(`{{${key}}}`, value)
    } else if (Array.isArray(value)) {
      prompt = prompt.replaceAll(`{{${key}}}`, value.join(', '))
    }
  }

  // Handle conditional blocks
  prompt = prompt.replace(/\{\{#if (\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, field, content) => {
    return answers[field] ? content.replaceAll(`{{${field}}}`, String(answers[field])) : ''
  })

  // Replace unfilled placeholders
  prompt = prompt.replace(/\{\{(\w+)\}\}/g, '[$1: DATA NOT PROVIDED — DO NOT INVENT]')

  // Remove voice profile placeholder (goes in system message)
  prompt = prompt.replaceAll('{{STEVE_VOICE_PROFILE}}', '')
  prompt = prompt.replaceAll('{{BELIEF_FRAMEWORK_CONTEXT}}', '')

  return prompt
}

// ── Format answers dump (matches generate.ts) ──
function formatAllAnswers(answers) {
  const lines = []
  const exclude = new Set(['brandColors', 'brandFonts', 'brandPhotoUrls', 'logoUrl'])

  for (const [key, value] of Object.entries(answers)) {
    if (exclude.has(key)) continue
    if (value === undefined || value === null || value === '') continue

    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim()

    if (Array.isArray(value)) {
      if (value.length === 0) continue
      lines.push(`${label}: ${typeof value[0] === 'string' ? value.join(', ') : JSON.stringify(value)}`)
    } else if (typeof value === 'object') {
      const fields = Object.entries(value)
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => `  ${k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim()}: ${v}`)
      if (fields.length) lines.push(`${label}:\n${fields.join('\n')}`)
    } else {
      lines.push(`${label}: ${value}`)
    }
  }
  return lines.join('\n')
}

// ── Load global preamble from generate.ts ──
function loadPreamble() {
  const generatePath = resolve('./src/lib/claude/generate.ts')
  const raw = readFileSync(generatePath, 'utf-8')
  const match = raw.match(/const GLOBAL_SYSTEM_PREAMBLE = `([\s\S]*?)`/)
  if (!match) throw new Error('Could not extract preamble')
  return match[1]
}

// ── Load voice profile ──
function loadVoiceProfile() {
  try {
    return readFileSync(resolve('./src/lib/claude/steve-voice-profile.md'), 'utf-8')
  } catch { return '' }
}

// ── Extract identity names from generated content ──
function extractNames(content) {
  // Split content at Part 2 / Aspiring section
  const parts = content.split(/####?\s*(?:PART\s*2|The Aspiring Identity|After Identity|AFTER|Identity #2|BECOME)/i)

  // Also try splitting on "vs" in a title line (e.g. "# The Two Identities: X vs Y")
  let part1 = parts[0] || ''
  let part2 = parts[1] || ''

  // If no split found, try splitting on "vs" in a heading
  if (!part2) {
    const vsSplit = content.split(/\bvs\.?\b/i)
    if (vsSplit.length >= 2) {
      part1 = vsSplit[0]
      part2 = vsSplit.slice(1).join('vs')
    } else {
      // fallback: second half
      part2 = content.substring(content.length / 2)
    }
  }

  // Clean up: remove trailing parenthetical labels from extracted name
  function cleanName(name) {
    return name
      .replace(/\s*\((?:Undesired|Before|Aspiring|After|Current|Future)\s*Identity\)\s*/gi, '')
      .replace(/^["'*]+|["'*]+$/g, '')
      .trim()
  }

  // Multiple regex patterns to handle varied output formats
  const patterns = [
    /(?:Identity Name|Name\/Label)[^:]*:\s*\**\s*"?([^"*\n]+)"?\s*\**/i,
    /##\s*(?:The\s+)?(?:Undesired Identity|Before Identity)[:\s]*[""]?([^""\n]+)[""]?/i,
    /##\s*\*?\*?The\s+(\S+(?:\s+\S+){0,4})\*?\*?\s*(?:\(Undesired|\(Before|$)/im,
    /:\s*\*?\*?"?The\s+(\S+(?:\s+\S+){0,4})"?\*?\*?\s*$/im,
    /^#\s+.*?:\s*(?:The\s+)?(.+?)\s+vs\s+/im,
    /##\s*Identity #?\d+[:\s]*(?:The\s+)?([^(\n]+)/i,
    /##\s+(The [A-Z][^\n]{2,40})\s*$/im,
    /##\s*\*?\*?(The\s+[A-Z][^\n*]{2,40})\*?\*?\s*$/im,
    /\*\*(?:Name|Identity)[:\s]*\**\s*[""]?([^""*\n]+)/i,
  ]

  const aspiringPatterns = [
    /(?:Identity Name|Name\/Label)[^:]*:\s*\**\s*"?([^"*\n]+)"?\s*\**/i,
    /##\s*(?:The\s+)?(?:Aspiring Identity|After Identity)[:\s]*[""]?([^""\n]+)[""]?/i,
    /##\s*\*?\*?The\s+(\S+(?:\s+\S+){0,4})\*?\*?\s*(?:\(Aspiring|\(After|$)/im,
    /:\s*\*?\*?"?The\s+(\S+(?:\s+\S+){0,4})"?\*?\*?\s*$/im,
    /##\s*Identity #?\d+[:\s]*(?:The\s+)?([^(\n]+)/i,
    /##\s+(The [A-Z][^\n]{2,40})\s*$/im,
    /##\s*\*?\*?(The\s+[A-Z][^\n*]{2,40})\*?\*?\s*$/im,
    /\*\*(?:Name|Identity)[:\s]*\**\s*[""]?([^""*\n]+)/i,
  ]

  // Also try to extract both names from a "X vs Y" title line
  const titleVsMatch = content.match(/^#\s+.*?:\s*(?:The\s+)?(.+?)\s+vs\.?\s+(?:The\s+)?(.+)/im)

  function tryExtract(text, regexes, titleFallbackIndex) {
    for (const regex of regexes) {
      const match = text.match(regex)
      if (match) {
        let name = cleanName(match[1])
        if (name.length > 3 && name.length < 60 && name.split(/\s+/).length <= 8) return name
      }
    }
    // Fallback: use "X vs Y" title if found
    if (titleVsMatch && titleVsMatch[titleFallbackIndex]) {
      let name = cleanName(titleVsMatch[titleFallbackIndex])
      if (name.length > 3 && name.length < 60) return name
    }
    return 'NOT FOUND'
  }

  return {
    undesired: tryExtract(part1, patterns, 1),
    aspiring: tryExtract(part2, aspiringPatterns, 2),
  }
}

// ── Check for banned words ──
function checkBannedWords(content, context = 'content') {
  const issues = []
  const lower = content.toLowerCase()
  for (const word of BANNED_WORDS) {
    if (lower.includes(word)) {
      issues.push(`"${word}" found in ${context}`)
    }
  }
  return issues
}

// ── Main test runner ──
async function runTests() {
  console.log('═══════════════════════════════════════════════════════════')
  console.log('  QUALITY VALIDATION TEST — Two Identities (Post-Fix)')
  console.log('═══════════════════════════════════════════════════════════\n')

  const preamble = loadPreamble()
  const voiceProfile = loadVoiceProfile()
  const results = []

  for (const qIdPrefix of TEST_QUESTIONNAIRES) {
    // Fetch questionnaire
    const { data: questionnaires } = await supabase
      .from('questionnaires')
      .select('id, answers')
      .eq('id', qIdPrefix)
      .limit(1)

    if (!questionnaires?.length) {
      console.log(`⚠ Questionnaire ${qIdPrefix} not found, skipping`)
      continue
    }

    const q = questionnaires[0]
    const answers = q.answers || {}

    console.log(`\n── Testing: ${answers.clientName || 'Unknown'} (${qIdPrefix}) ──`)
    console.log(`   Niche: ${(answers.niche || 'N/A').substring(0, 80)}...`)
    console.log(`   Generating...`)

    const templatePrompt = loadAndFillTemplate(answers)
    const clientDataDump = formatAllAnswers(answers)

    const fullPrompt = `--- COMPLETE CLIENT INPUT DATA ---
(Every answer the client provided. Use this as your primary source of truth for all facts, stories, and details.)

${clientDataDump}

--- END CLIENT INPUT DATA ---

${templatePrompt}`

    const startTime = Date.now()

    const response = await claude.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      temperature: 0.8,
      system: [
        { type: 'text', text: preamble },
        ...(voiceProfile ? [{ type: 'text', text: voiceProfile }] : []),
      ],
      messages: [{ role: 'user', content: fullPrompt }],
    })

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
    const text = response.content.find(c => c.type === 'text')?.text || ''

    // Extract and validate
    const names = extractNames(text)
    const nameIssues = [
      ...checkBannedWords(names.undesired, 'Undesired Identity name'),
      ...checkBannedWords(names.aspiring, 'Aspiring Identity name'),
    ]

    // Check body for banned word density in prominent positions
    const bodyIssues = checkBannedWords(text, 'full content')

    // Niche specificity test (heuristic)
    const genericNames = ['the authority', 'the ceo', 'the machine', 'the leader', 'the expert',
      'the coach', 'the owner', 'the operator', 'the worker', 'the starter']
    const genericIssues = []
    for (const gn of genericNames) {
      if (names.undesired.toLowerCase().includes(gn)) genericIssues.push(`Undesired "${names.undesired}" contains generic word "${gn}"`)
      if (names.aspiring.toLowerCase().includes(gn)) genericIssues.push(`Aspiring "${names.aspiring}" contains generic word "${gn}"`)
    }

    const result = {
      client: answers.clientName,
      niche: (answers.niche || '').substring(0, 60),
      undesired: names.undesired,
      aspiring: names.aspiring,
      nameIssues,
      genericIssues,
      bodyBannedCount: bodyIssues.length,
      tokens: response.usage.input_tokens + response.usage.output_tokens,
      elapsed,
    }
    results.push(result)

    // Report
    console.log(`   Done in ${elapsed}s (${result.tokens} tokens)`)
    console.log(`   Undesired: "${names.undesired}"`)
    console.log(`   Aspiring:  "${names.aspiring}"`)

    if (nameIssues.length > 0) {
      console.log(`   ❌ BANNED WORDS IN NAMES: ${nameIssues.join('; ')}`)
    } else {
      console.log(`   ✅ No banned words in identity names`)
    }

    if (genericIssues.length > 0) {
      console.log(`   ⚠️  GENERIC NAME WARNING: ${genericIssues.join('; ')}`)
    } else {
      console.log(`   ✅ Names appear niche-specific`)
    }

    console.log(`   📊 Banned words in body text: ${bodyIssues.length} instances`)
    if (bodyIssues.length > 0) {
      console.log(`      ${bodyIssues.join(', ')}`)
    }
  }

  // ── Cross-user comparison ──
  console.log('\n═══════════════════════════════════════════════════════════')
  console.log('  CROSS-USER COMPARISON')
  console.log('═══════════════════════════════════════════════════════════\n')

  console.log('| Client | Niche | Undesired | Aspiring |')
  console.log('|--------|-------|-----------|----------|')
  for (const r of results) {
    console.log(`| ${r.client} | ${r.niche} | ${r.undesired} | ${r.aspiring} |`)
  }

  // Check for duplicate names (excluding NOT FOUND)
  const allNames = results
    .flatMap(r => [r.undesired.toLowerCase(), r.aspiring.toLowerCase()])
    .filter(n => n !== 'not found')
  const dupes = allNames.filter((name, i) => allNames.indexOf(name) !== i)

  console.log('\n── Uniqueness Check ──')
  if (dupes.length > 0) {
    console.log(`❌ DUPLICATE NAMES FOUND: ${dupes.join(', ')}`)
  } else {
    console.log('✅ All identity names are unique across users')
  }

  // Final score
  const totalNameIssues = results.reduce((sum, r) => sum + r.nameIssues.length, 0)
  const totalGenericIssues = results.reduce((sum, r) => sum + r.genericIssues.length, 0)
  const totalBodyBanned = results.reduce((sum, r) => sum + r.bodyBannedCount, 0)

  console.log('\n── Final Score ──')
  console.log(`Banned words in names: ${totalNameIssues === 0 ? '✅ PASS (0)' : `❌ FAIL (${totalNameIssues})`}`)
  console.log(`Generic name warnings: ${totalGenericIssues === 0 ? '✅ PASS (0)' : `⚠️  WARN (${totalGenericIssues})`}`)
  console.log(`Duplicate names: ${dupes.length === 0 ? '✅ PASS (0)' : `❌ FAIL (${dupes.length})`}`)
  console.log(`Banned words in body: ${totalBodyBanned} instances (lower is better, 0 is ideal)`)

  const passed = totalNameIssues === 0 && dupes.length === 0
  console.log(`\n${'═'.repeat(59)}`)
  console.log(`  OVERALL: ${passed ? '✅ PASS' : '❌ NEEDS ATTENTION'}`)
  console.log(`${'═'.repeat(59)}`)
}

runTests().catch(err => {
  console.error('Test failed:', err)
  process.exit(1)
})
