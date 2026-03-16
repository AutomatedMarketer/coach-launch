import { NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'

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

// GET /api/admin/user/[userId] — full detail for one user's questionnaires + deliverables
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { userId } = await params
    const supabase = createAdminClient()

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('id, email, full_name, is_admin, created_at')
      .eq('id', userId)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get all questionnaires for this user
    const { data: questionnaires } = await supabase
      .from('questionnaires')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    // Get all deliverables for this user (with content for viewing)
    const { data: deliverables } = await supabase
      .from('deliverables')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })

    return NextResponse.json({
      profile,
      questionnaires: questionnaires || [],
      deliverables: deliverables || [],
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
