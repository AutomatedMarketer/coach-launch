import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const authClient = await createClient()
    const { data: { user } } = await authClient.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const questionnaireId = request.nextUrl.searchParams.get('questionnaire_id')

    if (!questionnaireId) {
      return NextResponse.json(
        { error: 'questionnaire_id is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Verify questionnaire belongs to user
    const { data: questionnaire } = await supabase
      .from('questionnaires')
      .select('id')
      .eq('id', questionnaireId)
      .eq('user_id', user.id)
      .single()

    if (!questionnaire) {
      return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 })
    }

    const { data, error } = await supabase
      .from('deliverables')
      .select('*')
      .eq('questionnaire_id', questionnaireId)
      .order('created_at', { ascending: true })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch deliverables' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch deliverables' },
      { status: 500 }
    )
  }
}
