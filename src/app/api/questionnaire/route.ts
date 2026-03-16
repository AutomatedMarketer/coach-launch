import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) {
      console.error('[GET /api/questionnaire] Auth error:', authError.message)
    }
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const userId = user.id

    const { data, error } = await supabase
      .from('questionnaires')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[GET /api/questionnaire] DB error:', error.message, error.details)
      return NextResponse.json(
        { error: 'Failed to fetch questionnaires' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('[GET /api/questionnaire] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch questionnaires' },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) {
      console.error('[POST /api/questionnaire] Auth error:', authError.message)
    }
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const userId = user.id

    const { data, error } = await supabase
      .from('questionnaires')
      .insert({
        user_id: userId,
        status: 'draft',
        current_step: 1,
        answers: {},
      })
      .select()
      .single()

    if (error) {
      console.error('[POST /api/questionnaire] DB error:', error.message, error.details)
      return NextResponse.json(
        { error: 'Failed to create questionnaire' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('[POST /api/questionnaire] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Failed to create questionnaire' },
      { status: 500 }
    )
  }
}
