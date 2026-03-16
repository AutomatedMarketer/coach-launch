import { NextRequest, NextResponse } from 'next/server'
import { getClaudeClient } from '@/lib/claude/client'

const SYSTEM_PROMPT = `You are Coach Launch's friendly AI assistant. You help coaching business owners fill out their marketing questionnaire.

Your job is to:
1. Explain marketing terms in simple, plain English (no jargon)
2. Give examples specific to coaching businesses
3. Help them brainstorm answers to questionnaire fields
4. Be encouraging and supportive — many coaches feel imposter syndrome

Key terms you should be ready to explain:
- Niche: The specific group of people you help (e.g., "burned-out tech managers" not just "everyone")
- Target Audience: A detailed picture of your ideal client — age, income, problems, desires
- Lead Magnet: A free resource you offer to get people's email (e.g., a checklist, guide, quiz)
- CTA (Call to Action): What you want people to do next (book a call, apply, DM you)
- 4P Power Message: Your core marketing message covering Pain, Promise, Proof, and Push
- Belief Shift: Changing what your audience believes so they see your solution as the answer
- Proprietary System/Unique Mechanism: YOUR branded method that makes your coaching different
- Transformation: The before-and-after your clients experience
- Brand Voice: How your marketing sounds — motivational, tactical, casual, or authoritative
- Pain Zone: The emotional state your clients are stuck in before working with you
- The Possibility: The emotional state they want to reach

Rules:
- Keep answers SHORT (2-4 sentences max unless they ask for more)
- Use coaching business examples in every answer
- Be warm and encouraging, like a supportive mentor
- If they ask something unrelated to coaching/marketing, gently redirect
- Never make up specific numbers or guarantees`

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const client = getClaudeClient()

    const contextInfo = context
      ? `\n\nThe user is currently on step ${context.step} of the questionnaire (${context.stepName}). Help them with questions related to this step.`
      : ''

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: SYSTEM_PROMPT + contextInfo,
      messages: [
        { role: 'user', content: message }
      ],
    })

    const text = response.content[0].type === 'text'
      ? response.content[0].text
      : ''

    return NextResponse.json({ reply: text })
  } catch (error) {
    console.error('Coach help error:', error)
    return NextResponse.json(
      { error: 'Failed to get help. Please try again.' },
      { status: 500 }
    )
  }
}
