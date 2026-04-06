/**
 * PRODUCTION QUALITY TEST — Hits live Vercel deployment
 * Creates 3 test questionnaires in Supabase, triggers generation via production API,
 * then grades the results.
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const PROD_URL = 'https://app-neon-chi.vercel.app'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const BANNED = ['prisoner','captive','trapped','slave','beggar','grind','grinding','hamster wheel','treadmill','rat race','cage','chains']
const HALLUC = ['sam bakhtiar','kevin nations','garrett j. white','garrett white','warrior greens','vigor summit']

const TEST_USERS = [
  {
    email: 'maria.test@coachlaunch.test',
    answers: {
      clientName: 'Maria Gonzalez test', businessName: 'Radiant Real Estate Academy',
      niche: 'Real estate agents in their first 3 years drowning in cold calls and open houses but closing fewer than 6 deals a year.',
      targetAudience: 'Women and men aged 25-40 making under $40K from commissions, working 60+ hours a week.',
      unwantedFeelings: 'Embarrassed at family dinners. Anxious about desk fees every month. Jealous of top producers.',
      desiredFeelings: 'Confident at listing appointments. Financially stable. Respected in their brokerage.',
      aspiringIdentity: 'The go-to agent in their market. Closing 2-3 deals per month with inbound pipeline.',
      problemSolved: 'New agents relying on cold calling. I give them a content-based lead gen system.',
      uniqueMechanism: 'The Listing Magnet Method — Local Authority Content + Referral Engine + Pipeline Dashboard.',
      commonObjections: ['No time for content','Broker provides leads','Social media doesnt work here'],
      brandVoice: 'motivational', offerName: 'The Listing Magnet Method', pricePoint: '$3,997',
      transformation: 'From scrambling for deals to predictable inbound leads.',
      idealClientCurrentMethods: 'Cold calling expired listings, sitting open houses, buying Zillow leads.',
      idealClientCurrentRevenue: 'Under $40K/year. 4-6 deals/year. Spending $300-500/month on bad leads.',
      expertise: ['real estate lead gen','social media for agents'],
      storyBeforeState: 'Brand new agent in an empty office.', storyTurningPoint: 'Started posting hyper-local content, got first inbound lead in 90 days.',
      storyAfterState: 'Close 3-4 deals/month, 80% from content and referrals.', storyFacts: 'Licensed 8 years. 200+ transactions. Team of 4.',
      programDuration: '6 months', programIncludes: '12 weeks coaching, content templates, CRM setup.',
    }
  },
  {
    email: 'david.test@coachlaunch.test',
    answers: {
      clientName: 'David Chen test', businessName: 'Inner Compass Leadership',
      niche: 'Tech founders making $200K-$1M who achieved product-market fit but are emotionally disconnected from teams and partners.',
      targetAudience: 'Men aged 30-45 who founded tech companies. Smart, driven, introverted, emotionally avoidant.',
      unwantedFeelings: 'Numb. Lonely despite being surrounded by people. Terrified showing weakness will collapse everything. Secretly ashamed.',
      desiredFeelings: 'Present during conversations. Calm confidence. Deep trust with co-founder and partner.',
      aspiringIdentity: 'A leader respected for how he makes people feel. Team stays for culture not equity.',
      problemSolved: 'Founders who optimized everything except emotional intelligence. Zero framework for vulnerability.',
      uniqueMechanism: 'The Inner OS Framework — Diagnostic + Rewrite + Integration.',
      commonObjections: ['No time for soft skills','Sounds like therapy','Company needs me focused'],
      brandVoice: 'authoritative', offerName: 'The Inner OS Framework', pricePoint: '$15,000',
      transformation: 'From emotionally avoidant founder to integrated leader who builds trust.',
      idealClientCurrentMethods: 'Leadership books, exec coaches focused on metrics, meditation apps, therapy they quit.',
      idealClientCurrentRevenue: '$200K-$1M personal. Company $1M-$10M ARR.',
      expertise: ['emotional intelligence','leadership communication'],
      storyBeforeState: 'CTO who could debug any system except his marriage.',
      storyTurningPoint: 'Co-founder said he was leaving because he couldnt trust someone who never showed emotion.',
      storyAfterState: 'Rebuilt both relationships by leading with connection.', storyFacts: 'Former CTO at 2 startups. 12 years in tech. 40+ founders coached.',
      programDuration: '6 months', programIncludes: 'Weekly 1-on-1, EQ assessments, peer group of 8.',
    }
  },
  {
    email: 'rachel.test@coachlaunch.test',
    answers: {
      clientName: 'Rachel Kim test', businessName: 'Stage Ready Academy',
      niche: 'Amateur bikini competitors who keep placing outside top 5. Posing, peak week, and stage presence cost them trophies.',
      targetAudience: 'Women aged 22-38 in NPC bikini/figure. Done 2-5 shows, never top 3. Spend $5K-$15K per prep.',
      unwantedFeelings: 'Devastated in the lineup about to get called last. Embarrassed posting results. Confused why judges dont see it.',
      desiredFeelings: 'Electric confidence hitting front pose under stage lights. Proud holding a trophy. Certain about peak week.',
      aspiringIdentity: 'Competitor judges cant stop watching. Conditioning dialed. Posing flawless. The girl others ask for tips.',
      problemSolved: 'Competitors with physique but not presentation. I fix the gap between gym mirror and stage.',
      uniqueMechanism: 'The Stage Ready System — Posing Lab + Peak Protocol + Spotlight Method.',
      commonObjections: ['Current coach handles posing','Need better genetics','Posing coaching not worth it'],
      brandVoice: 'motivational', offerName: 'The Stage Ready System', pricePoint: '$2,497',
      transformation: 'From always-outside-top-5 to consistently placing top 3.',
      idealClientCurrentMethods: 'YouTube posing tutorials, gym mirror practice, general prep coach spending 5 min on posing.',
      idealClientCurrentRevenue: 'Hobby — spend $5K-$15K per prep from day job.',
      expertise: ['competition posing','peak week','stage presence'],
      storyBeforeState: 'Placed 11th in first three shows, ready to quit.',
      storyTurningPoint: 'Judge said physique was top 3 but posing was hiding it.',
      storyAfterState: 'Won pro card within a year.', storyFacts: 'NPC competitor 6 years. Pro card. Top 3 in 12 shows. 30+ clients coached.',
      programDuration: '16 weeks', programIncludes: 'Weekly posing video reviews, custom peak week, stage presence training.',
    }
  },
]

// Templates to generate per user (core pipeline)
const TEMPLATES = ['two-identities', 'belief-shift-map', 'homepage-copy', 'about-page']

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

async function main() {
  console.log('═'.repeat(70))
  console.log('  LIVE PRODUCTION TEST — 3 Users × 4 Deliverables')
  console.log(`  Target: ${PROD_URL}`)
  console.log('═'.repeat(70))

  const allResults = []

  for (const testUser of TEST_USERS) {
    const answers = testUser.answers
    console.log(`\n${'─'.repeat(70)}`)
    console.log(`  ${answers.clientName}`)
    console.log(`  ${answers.niche.substring(0, 60)}...`)
    console.log(`${'─'.repeat(70)}`)

    // 1. Create or find test user in Supabase Auth
    let userId
    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    const existing = existingUsers?.users?.find(u => u.email === testUser.email)

    if (existing) {
      userId = existing.id
      console.log(`  Using existing test user: ${userId.substring(0, 8)}`)
    } else {
      const { data: newUser, error: userErr } = await supabase.auth.admin.createUser({
        email: testUser.email,
        password: 'TestPass123!',
        email_confirm: true,
      })
      if (userErr) { console.error(`  Failed to create user: ${userErr.message}`); continue }
      userId = newUser.user.id
      console.log(`  Created test user: ${userId.substring(0, 8)}`)
    }

    // 2. Create questionnaire
    const { data: questionnaire, error: qErr } = await supabase
      .from('questionnaires')
      .insert({ user_id: userId, status: 'completed', current_step: 8, answers })
      .select()
      .single()

    if (qErr) { console.error(`  Failed to create questionnaire: ${qErr.message}`); continue }
    console.log(`  Questionnaire: ${questionnaire.id.substring(0, 8)}`)

    // 3. Get a session token for API calls
    const { data: session, error: sessErr } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: testUser.email,
    })

    // Sign in to get access token
    const { data: signIn, error: signErr } = await supabase.auth.signInWithPassword({
      email: testUser.email,
      password: 'TestPass123!',
    })

    if (signErr) { console.error(`  Auth failed: ${signErr.message}`); continue }
    const accessToken = signIn.session.access_token
    console.log(`  Authenticated. Generating via production API...\n`)

    // 4. Generate each template via production API
    const grades = []

    for (const templateId of TEMPLATES) {
      process.stdout.write(`  ${templateId}...`)
      const startMs = Date.now()

      try {
        const res = await fetch(`${PROD_URL}/api/generate/${questionnaire.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Cookie': `sb-access-token=${accessToken}; sb-refresh-token=${signIn.session.refresh_token}`,
          },
          body: JSON.stringify({ templateId }),
        })

        const elapsed = ((Date.now() - startMs) / 1000).toFixed(1)

        if (!res.ok) {
          const errText = await res.text()
          console.log(` FAILED (${res.status}) ${elapsed}s — ${errText.substring(0, 100)}`)
          grades.push({ tid: templateId, score: 0, grade: 'F', issues: [`API ${res.status}`] })
          continue
        }

        const data = await res.json()
        const content = data.content || ''

        // Grade
        let score = 100
        const issues = []

        const banned = countBanned(content)
        score -= banned.count * 3
        if (banned.count) issues.push(`banned(${banned.found.join(',')})`)

        const halluc = countHalluc(content)
        score -= halluc.count * 10
        if (halluc.count) issues.push(`halluc(${halluc.found.join(',')})`)

        const placeholders = (content.match(/\{\{[a-zA-Z]+\}\}/g) || []).length + (content.match(/DATA NOT PROVIDED/gi) || []).length
        score -= placeholders * 15
        if (placeholders) issues.push(`placeholders(${placeholders})`)

        if (content.length < 500) { score -= 20; issues.push('too short') }

        score = Math.max(0, Math.min(100, score))
        const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'

        const icon = grade === 'A' ? '✅' : grade === 'B' ? '🟢' : grade === 'C' ? '🟡' : grade === 'D' ? '🟠' : '🔴'
        console.log(` ${icon} ${grade}(${score}) ${elapsed}s ${issues.length ? issues.join('; ') : ''}`)

        // Show identity names for two-identities
        if (templateId === 'two-identities') {
          const nameMatch = content.match(/Selected Name[:\s]*\**\s*"?([^"\n*|]+)/i)
          if (nameMatch) console.log(`    → Identity: "${nameMatch[1].trim()}"`)
        }

        grades.push({ tid: templateId, score, grade, issues, qualityScore: data.qualityScore })
      } catch (err) {
        const elapsed = ((Date.now() - startMs) / 1000).toFixed(1)
        console.log(` ERROR ${elapsed}s — ${err.message}`)
        grades.push({ tid: templateId, score: 0, grade: 'F', issues: [err.message] })
      }
    }

    const avg = grades.length ? Math.round(grades.reduce((s, g) => s + g.score, 0) / grades.length) : 0
    const avgGrade = avg >= 90 ? 'A' : avg >= 80 ? 'B' : avg >= 70 ? 'C' : avg >= 60 ? 'D' : 'F'
    console.log(`\n  ★ ${answers.clientName}: ${avg}/100 (${avgGrade})`)

    allResults.push({ name: answers.clientName, avg, avgGrade, grades })

    // Sign out
    await supabase.auth.signOut()
  }

  // Final report
  console.log(`\n${'═'.repeat(70)}`)
  console.log('  PRODUCTION TEST RESULTS')
  console.log('═'.repeat(70))

  for (const r of allResults) {
    console.log(`\n  ${r.name}: ${r.avg}/100 (${r.avgGrade})`)
    for (const g of r.grades) {
      const icon = g.grade === 'A' ? '✅' : g.grade === 'B' ? '🟢' : g.grade === 'C' ? '🟡' : g.grade === 'D' ? '🟠' : '🔴'
      console.log(`    ${icon} ${g.tid.padEnd(22)} ${g.grade}(${g.score}) ${g.issues.length ? g.issues.join('; ') : ''}`)
    }
  }

  const totalAvg = allResults.length ? Math.round(allResults.reduce((s, r) => s + r.avg, 0) / allResults.length) : 0
  const fCount = allResults.flatMap(r => r.grades).filter(g => g.grade === 'F').length
  const hallucCount = allResults.flatMap(r => r.grades).filter(g => g.issues.some(i => i.startsWith('halluc'))).length

  console.log(`\n  Combined: ${totalAvg}/100`)
  console.log(`  F grades: ${fCount}`)
  console.log(`  Hallucinations: ${hallucCount}`)
  console.log(`\n${'═'.repeat(70)}`)
  console.log(`  ${totalAvg >= 80 && fCount === 0 ? '✅ PRODUCTION QUALITY VERIFIED' : '⚠️  ISSUES DETECTED'}`)
  console.log('═'.repeat(70))
}

main().catch(e => { console.error(e); process.exit(1) })
