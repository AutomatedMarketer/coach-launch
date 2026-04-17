import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getClaudeClient } from '@/lib/claude/client'

const ALLOWED_FIELDS = ['monthlyActionCost', 'firstResultTimeframe', 'targetClientMonthlyRevenue', 'scarcityElement'] as const
type SuggestableField = typeof ALLOWED_FIELDS[number]

function buildPrompt(fieldName: SuggestableField, answers: Record<string, unknown>): string {
  const niche = answers.niche as string || ''
  const targetAudience = answers.targetAudience as string || ''
  const problemSolved = answers.problemSolved as string || ''
  const transformation = answers.transformation as string || ''
  const offerName = answers.offerName as string || ''
  const programDuration = answers.programDuration as string || ''
  const deliveryModel = answers.deliveryModel as string || ''
  const clientCapacity = answers.clientCapacity as string || ''
  const idealClientCurrentRevenue = answers.idealClientCurrentRevenue as string || ''

  const prompts: Record<SuggestableField, string> = {
    monthlyActionCost: `You are helping a coach fill out their business questionnaire.

Based on their business context, suggest a specific, credible "monthly cost of inaction" for their ideal client — the monthly cost of staying stuck.

COACH CONTEXT:
- Niche: ${niche}
- Ideal client: ${targetAudience}
- Problem they solve: ${problemSolved}
- Client's current revenue: ${idealClientCurrentRevenue}

Write ONE specific, realistic sentence quantifying what staying stuck costs their ideal client per month.
Format: "$X/month in [specific cost]" or "X hours/week of [specific waste] worth $X/month"
Use the client's actual niche and problem — no generic answers.
ONLY output the suggestion text, no explanation.`,

    firstResultTimeframe: `You are helping a coach fill out their business questionnaire.

Based on their program, suggest a specific "first measurable win" timeframe — when their clients typically see their first result.

COACH CONTEXT:
- Offer: ${offerName}
- Program duration: ${programDuration}
- Transformation delivered: ${transformation}

Write ONE specific timeframe phrase coaches can use verbatim in copy.
Format: "within X days" or "by end of week X" or "in the first X weeks — most clients [specific result]"
Be realistic for a ${programDuration} program.
ONLY output the suggestion text, no explanation.`,

    targetClientMonthlyRevenue: `You are helping a coach fill out their business questionnaire.

Based on their offer and transformation, suggest a specific "client revenue or outcome after the program" statement.

COACH CONTEXT:
- Offer: ${offerName}
- Transformation: ${transformation}
- Niche: ${niche}
- Ideal client currently earning: ${idealClientCurrentRevenue}

Write ONE specific, realistic outcome range clients achieve after the program.
Format: "$X-$Y/month" or "X qualified leads per week" — match the niche (revenue if coaching/business, outcomes if health/fitness/relationships).
ONLY output the suggestion text, no explanation.`,

    scarcityElement: `You are helping a coach fill out their business questionnaire.

Based on their delivery model and capacity, suggest a specific scarcity/urgency element they can use legitimately.

COACH CONTEXT:
- Delivery model: ${deliveryModel}
- Client capacity: ${clientCapacity}
- Program duration: ${programDuration}
- Niche: ${niche}

Write ONE specific, honest urgency statement this coach can use.
Examples by model:
- Group program: "Next cohort opens [month], only 15 spots"
- 1-on-1: "Taking only 5 new clients this quarter"
- Membership: "Founding member pricing ends [date]"

Pick the model that matches their delivery format and personalize to their context.
ONLY output the suggestion text, no explanation.`,
  }

  return prompts[fieldName]
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { fieldName, answers } = body as { fieldName: string; answers: Record<string, unknown> }

    if (!ALLOWED_FIELDS.includes(fieldName as SuggestableField)) {
      return NextResponse.json({ error: 'Field not supported' }, { status: 400 })
    }

    const prompt = buildPrompt(fieldName as SuggestableField, answers)
    const claude = getClaudeClient()

    const message = await claude.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 150,
      temperature: 0.4,
      messages: [{ role: 'user', content: prompt }],
    })

    const suggestion = (message.content[0] as { type: string; text: string }).text.trim()

    return NextResponse.json({ suggestion, fieldName })
  } catch (error) {
    console.error('[POST /api/questionnaire/suggest]', error)
    return NextResponse.json({ error: 'Failed to generate suggestion' }, { status: 500 })
  }
}
