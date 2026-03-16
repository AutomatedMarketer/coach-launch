import { NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'

// Helper: check if current user is admin
async function getAdminUser() {
  const authClient = await createClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) return null

  const supabase = createAdminClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) return null
  return user
}

// GET /api/admin — returns all users with their questionnaire + deliverable counts
export async function GET() {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const supabase = createAdminClient()

    // Get all profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email, full_name, is_admin, created_at')
      .order('created_at', { ascending: false })

    if (profilesError) {
      return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 })
    }

    // Get all questionnaires with deliverable counts
    const { data: questionnaires, error: qError } = await supabase
      .from('questionnaires')
      .select('id, user_id, status, current_step, answers, created_at, updated_at')
      .order('created_at', { ascending: false })

    if (qError) {
      return NextResponse.json({ error: 'Failed to fetch questionnaires' }, { status: 500 })
    }

    // Get deliverable summaries (id, questionnaire_id, template_id, title, status — no content for performance)
    const { data: deliverables, error: dError } = await supabase
      .from('deliverables')
      .select('id, questionnaire_id, user_id, template_id, title, status, created_at')

    if (dError) {
      return NextResponse.json({ error: 'Failed to fetch deliverables' }, { status: 500 })
    }

    // Group questionnaires by user
    const userMap = profiles.map(profile => {
      const userQuestionnaires = questionnaires.filter(q => q.user_id === profile.id)
      const userDeliverables = deliverables.filter(d => d.user_id === profile.id)
      const completedDeliverables = userDeliverables.filter(d => d.status === 'completed')

      return {
        ...profile,
        questionnaires: userQuestionnaires.map(q => {
          const qDeliverables = deliverables.filter(d => d.questionnaire_id === q.id)
          const qCompleted = qDeliverables.filter(d => d.status === 'completed')
          return {
            ...q,
            businessName: (q.answers as Record<string, unknown>)?.businessName as string || null,
            deliverable_count: qDeliverables.length,
            completed_count: qCompleted.length,
          }
        }),
        total_questionnaires: userQuestionnaires.length,
        total_deliverables: userDeliverables.length,
        completed_deliverables: completedDeliverables.length,
      }
    })

    return NextResponse.json(userMap)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
