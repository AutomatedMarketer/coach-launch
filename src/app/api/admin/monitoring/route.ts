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

const COST_PER_1M_TOKENS = 6 // Rough average for Claude Sonnet (input + output)

export async function GET() {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const supabase = createAdminClient()

    // Get all deliverables with token data
    const { data: deliverables } = await supabase
      .from('deliverables')
      .select('template_id, tokens_used, user_id, quality_score, status, created_at, model_used')
      .order('created_at', { ascending: false })

    if (!deliverables) {
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }

    // Calculate stats
    const completed = deliverables.filter(d => d.status === 'completed')
    const totalTokens = completed.reduce((sum, d) => sum + (d.tokens_used || 0), 0)
    const totalCost = (totalTokens / 1_000_000) * COST_PER_1M_TOKENS
    const avgPerDeliverable = completed.length ? Math.round(totalTokens / completed.length) : 0
    const estimatedCostPerUser = ((avgPerDeliverable * 26) / 1_000_000) * COST_PER_1M_TOKENS

    // Per-user breakdown
    const byUser: Record<string, { tokens: number; deliverables: number; errors: number }> = {}
    for (const d of deliverables) {
      const uid = d.user_id || 'unknown'
      if (!byUser[uid]) byUser[uid] = { tokens: 0, deliverables: 0, errors: 0 }
      if (d.status === 'completed') {
        byUser[uid].tokens += d.tokens_used || 0
        byUser[uid].deliverables++
      } else if (d.status === 'error') {
        byUser[uid].errors++
      }
    }

    // Get user names
    const userIds = Object.keys(byUser)
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .in('id', userIds)

    const profileMap: Record<string, { email: string; name: string }> = {}
    for (const p of (profiles || [])) {
      profileMap[p.id] = { email: p.email || '', name: p.full_name || p.email || 'Unknown' }
    }

    const userBreakdown = Object.entries(byUser)
      .map(([uid, stats]) => ({
        userId: uid,
        name: profileMap[uid]?.name || 'Unknown',
        email: profileMap[uid]?.email || '',
        ...stats,
        cost: Number(((stats.tokens / 1_000_000) * COST_PER_1M_TOKENS).toFixed(2)),
      }))
      .sort((a, b) => b.tokens - a.tokens)

    // Per-template breakdown
    const byTemplate: Record<string, { tokens: number; count: number; avgScore: number; scores: number[] }> = {}
    for (const d of completed) {
      if (!byTemplate[d.template_id]) byTemplate[d.template_id] = { tokens: 0, count: 0, avgScore: 0, scores: [] }
      byTemplate[d.template_id].tokens += d.tokens_used || 0
      byTemplate[d.template_id].count++
      if (d.quality_score) byTemplate[d.template_id].scores.push(d.quality_score)
    }
    const templateBreakdown = Object.entries(byTemplate)
      .map(([tid, stats]) => ({
        templateId: tid,
        ...stats,
        avgScore: stats.scores.length
          ? Math.round(stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length)
          : 0,
      }))
      .sort((a, b) => b.tokens - a.tokens)

    // Daily usage (last 14 days)
    const dailyUsage: Record<string, { tokens: number; count: number; errors: number }> = {}
    for (const d of deliverables) {
      const day = (d.created_at || '').substring(0, 10)
      if (!day) continue
      if (!dailyUsage[day]) dailyUsage[day] = { tokens: 0, count: 0, errors: 0 }
      if (d.status === 'completed') {
        dailyUsage[day].tokens += d.tokens_used || 0
        dailyUsage[day].count++
      } else if (d.status === 'error') {
        dailyUsage[day].errors++
      }
    }
    const daily = Object.entries(dailyUsage)
      .map(([date, stats]) => ({
        date,
        ...stats,
        cost: Number(((stats.tokens / 1_000_000) * COST_PER_1M_TOKENS).toFixed(2)),
      }))
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 14)

    // Quality overview
    const qualityScores = completed.filter(d => d.quality_score).map(d => d.quality_score!)
    const avgQuality = qualityScores.length
      ? Math.round(qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length)
      : 0
    const errorCount = deliverables.filter(d => d.status === 'error').length

    return NextResponse.json({
      summary: {
        totalDeliverables: completed.length,
        totalTokens,
        totalCost: Number(totalCost.toFixed(2)),
        avgPerDeliverable,
        estimatedCostPerUser: Number(estimatedCostPerUser.toFixed(2)),
        avgQualityScore: avgQuality,
        errorCount,
        totalUsers: userBreakdown.length,
      },
      userBreakdown,
      templateBreakdown,
      dailyUsage: daily,
    })
  } catch (err) {
    console.error('[admin/monitoring] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
