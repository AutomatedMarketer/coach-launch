'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Loader2,
  Shield,
  ShieldPlus,
  ShieldMinus,
  Users,
  FileText,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Eye,
  BarChart3,
  DollarSign,
  Zap,
  AlertTriangle,
  Star,
} from 'lucide-react'

// --- Types ---

interface AdminUser {
  id: string
  email: string
  full_name: string | null
  is_admin: boolean
  created_at: string
  questionnaires: AdminQuestionnaire[]
  total_questionnaires: number
  total_deliverables: number
  completed_deliverables: number
}

interface AdminQuestionnaire {
  id: string
  user_id: string
  status: string
  current_step: number
  answers: Record<string, unknown>
  businessName: string | null
  deliverable_count: number
  completed_count: number
  created_at: string
  updated_at: string
}

interface MonitoringSummary {
  totalDeliverables: number
  totalTokens: number
  totalCost: number
  avgPerDeliverable: number
  estimatedCostPerUser: number
  avgQualityScore: number
  errorCount: number
  totalUsers: number
}

interface UserBreakdownItem {
  userId: string
  name: string
  email: string
  tokens: number
  deliverables: number
  errors: number
  cost: number
}

interface TemplateBreakdownItem {
  templateId: string
  tokens: number
  count: number
  avgScore: number
  scores: number[]
}

interface DailyUsageItem {
  date: string
  tokens: number
  count: number
  errors: number
  cost: number
}

interface MonitoringData {
  summary: MonitoringSummary
  userBreakdown: UserBreakdownItem[]
  templateBreakdown: TemplateBreakdownItem[]
  dailyUsage: DailyUsageItem[]
}

type TabId = 'users' | 'monitoring'

// --- Constants ---

const statusColors: Record<string, string> = {
  draft: 'bg-slate-500/20 text-slate-300 border border-slate-500/30',
  completed: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
  generating: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  done: 'bg-green-500/20 text-green-300 border border-green-500/30',
}

const statusLabels: Record<string, string> = {
  draft: 'Draft',
  completed: 'Ready to Generate',
  generating: 'Generating',
  done: 'Done',
}

// --- Helpers ---

function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

function formatTemplateId(id: string): string {
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// --- Component ---

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabId>('users')
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>({})
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [togglingUser, setTogglingUser] = useState<string | null>(null)

  // Monitoring state
  const [monitoringData, setMonitoringData] = useState<MonitoringData | null>(null)
  const [monitoringLoading, setMonitoringLoading] = useState(false)
  const [monitoringError, setMonitoringError] = useState<string | null>(null)
  const [monitoringFetched, setMonitoringFetched] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const meRes = await fetch('/api/admin/me')
        const meData = await meRes.json()
        if (!meData.isAdmin) {
          router.push('/dashboard')
          return
        }
        if (meData.userId) setCurrentUserId(meData.userId)

        const res = await fetch('/api/admin')
        if (!res.ok) {
          setError('Failed to load admin data')
          return
        }
        const data: AdminUser[] = await res.json()
        setUsers(data)
      } catch {
        setError('Failed to load admin data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [router])

  const fetchMonitoring = useCallback(async () => {
    if (monitoringFetched) return
    setMonitoringLoading(true)
    setMonitoringError(null)
    try {
      const res = await fetch('/api/admin/monitoring')
      if (!res.ok) {
        setMonitoringError('Failed to load monitoring data')
        return
      }
      const data: MonitoringData = await res.json()
      setMonitoringData(data)
      setMonitoringFetched(true)
    } catch {
      setMonitoringError('Failed to load monitoring data')
    } finally {
      setMonitoringLoading(false)
    }
  }, [monitoringFetched])

  // Fetch monitoring data when the tab is selected
  useEffect(() => {
    if (activeTab === 'monitoring' && !monitoringFetched) {
      fetchMonitoring()
    }
  }, [activeTab, monitoringFetched, fetchMonitoring])

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  function toggleUser(userId: string) {
    setExpandedUsers(prev => ({ ...prev, [userId]: !prev[userId] }))
  }

  async function handleToggleAdmin(userId: string, currentIsAdmin: boolean) {
    const newStatus = !currentIsAdmin
    if (currentIsAdmin && !confirm('Remove admin access for this user?')) return

    setTogglingUser(userId)
    try {
      const res = await fetch(`/api/admin/user/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_admin: newStatus }),
      })
      if (res.ok) {
        setUsers(prev => prev.map(u =>
          u.id === userId ? { ...u, is_admin: newStatus } : u
        ))
      }
    } catch {
      // ignore
    } finally {
      setTogglingUser(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  const totalClients = users.filter(u => !u.is_admin).length
  const totalKits = users.reduce((sum, u) => sum + u.total_questionnaires, 0)
  const totalCompleted = users.reduce((sum, u) => sum + u.completed_deliverables, 0)

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-slate-400">
              View and review all client launch kits
            </p>
          </div>
        </div>
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-1 rounded-xl bg-slate-800/60 border border-slate-700/50 p-1">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'users'
              ? 'bg-slate-700 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/40'
          }`}
        >
          <Users className="w-4 h-4" />
          Users
        </button>
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'monitoring'
              ? 'bg-slate-700 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/40'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Monitoring
        </button>
      </div>

      {/* ===== USERS TAB ===== */}
      {activeTab === 'users' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
              <Users className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-white">{totalClients}</p>
              <p className="text-xs text-slate-400">Clients</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
              <FileText className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-white">{totalKits}</p>
              <p className="text-xs text-slate-400">Launch Kits</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
              <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-white">{totalCompleted}</p>
              <p className="text-xs text-slate-400">Deliverables Generated</p>
            </div>
          </div>

          {/* User list */}
          <div className="space-y-3">
            {users.map(user => {
              const isExpanded = expandedUsers[user.id] ?? false
              const displayName = user.full_name || user.email.split('@')[0]

              return (
                <div
                  key={user.id}
                  className="rounded-xl border border-slate-700/50 bg-slate-800/60 overflow-hidden"
                >
                  {/* User header row */}
                  <button
                    onClick={() => toggleUser(user.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-white shrink-0">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-white truncate">
                            {displayName}
                          </p>
                          {user.is_admin && (
                            <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30" variant="secondary">
                              Admin
                            </Badge>
                          )}
                          {user.id !== currentUserId && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleToggleAdmin(user.id, user.is_admin) }}
                              disabled={togglingUser === user.id}
                              className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border transition-colors ${
                                user.is_admin
                                  ? 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                                  : 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'
                              } ${togglingUser === user.id ? 'opacity-50' : ''}`}
                              title={user.is_admin ? 'Remove admin access' : 'Grant admin access'}
                            >
                              {togglingUser === user.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : user.is_admin ? (
                                <><ShieldMinus className="w-3 h-3" /> Remove</>
                              ) : (
                                <><ShieldPlus className="w-3 h-3" /> Make Admin</>
                              )}
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-slate-400">
                          {user.total_questionnaires} kit{user.total_questionnaires !== 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-slate-500">
                          {user.completed_deliverables} deliverable{user.completed_deliverables !== 1 ? 's' : ''} done
                        </p>
                      </div>
                      <div className="text-xs text-slate-500 hidden sm:block">
                        Joined {formatDate(user.created_at)}
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded: show questionnaires */}
                  {isExpanded && (
                    <div className="border-t border-slate-700/50 px-4 pb-4">
                      {user.questionnaires.length === 0 ? (
                        <p className="text-sm text-slate-500 py-3 italic">
                          No launch kits created yet.
                        </p>
                      ) : (
                        <div className="space-y-2 mt-3">
                          {user.questionnaires.map(q => (
                            <div
                              key={q.id}
                              className="flex items-center justify-between rounded-lg bg-slate-900/50 border border-slate-700/30 p-3"
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <p className="text-sm font-medium text-white truncate">
                                    {q.businessName || 'Untitled Kit'}
                                  </p>
                                  <Badge
                                    className={statusColors[q.status] || statusColors.draft}
                                    variant="secondary"
                                  >
                                    {statusLabels[q.status] || q.status}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-500">
                                  <span className="flex items-center gap-1">
                                    {q.completed_count > 0 ? (
                                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                                    ) : (
                                      <Clock className="w-3 h-3 text-slate-600" />
                                    )}
                                    {q.completed_count}/{q.deliverable_count} deliverables
                                  </span>
                                  <span>Step {q.current_step}/5</span>
                                  <span>{formatDate(q.updated_at || q.created_at)}</span>
                                </div>
                              </div>

                              {q.completed_count > 0 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  render={<Link href={`/admin/review/${q.id}?userId=${q.user_id}`} />}
                                  className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 rounded-full px-4 shrink-0 ml-3"
                                >
                                  <Eye className="mr-1.5 h-3 w-3" />
                                  Review
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* ===== MONITORING TAB ===== */}
      {activeTab === 'monitoring' && (
        <MonitoringTab
          data={monitoringData}
          isLoading={monitoringLoading}
          error={monitoringError}
        />
      )}
    </div>
  )
}

// --- Monitoring Tab Component ---

function MonitoringTab({
  data,
  isLoading,
  error,
}: {
  data: MonitoringData | null
  isLoading: boolean
  error: string | null
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  if (!data) return null

  const { summary, userBreakdown, templateBreakdown, dailyUsage } = data

  // Calculate max tokens for the bar chart scaling
  const maxDailyTokens = Math.max(...dailyUsage.map(d => d.tokens), 1)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
          <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-white">{formatNumber(summary.totalTokens)}</p>
          <p className="text-xs text-slate-400">Total Tokens</p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
          <DollarSign className="w-5 h-5 text-green-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-white">${summary.totalCost.toFixed(2)}</p>
          <p className="text-xs text-slate-400">Total Cost</p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
          <Users className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-white">${summary.estimatedCostPerUser.toFixed(2)}</p>
          <p className="text-xs text-slate-400">Avg Cost / User</p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
          <Star className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-white">
            {summary.avgQualityScore > 0 ? `${summary.avgQualityScore}/100` : '--'}
          </p>
          <p className="text-xs text-slate-400">Avg Quality</p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
          <AlertTriangle className="w-5 h-5 text-red-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-white">{summary.errorCount}</p>
          <p className="text-xs text-slate-400">Errors</p>
        </div>
      </div>

      {/* Secondary stats row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-3 text-center">
          <p className="text-lg font-bold text-white">{formatNumber(summary.totalDeliverables)}</p>
          <p className="text-xs text-slate-400">Deliverables Generated</p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-3 text-center">
          <p className="text-lg font-bold text-white">{formatNumber(summary.avgPerDeliverable)}</p>
          <p className="text-xs text-slate-400">Avg Tokens / Deliverable</p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-3 text-center">
          <p className="text-lg font-bold text-white">{summary.totalUsers}</p>
          <p className="text-xs text-slate-400">Active Users</p>
        </div>
      </div>

      {/* Daily Usage Chart */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Daily Token Usage (Last 14 Days)</h3>
        {dailyUsage.length === 0 ? (
          <p className="text-sm text-slate-500 italic py-8 text-center">No usage data yet.</p>
        ) : (
          <div className="flex items-end gap-2 h-48">
            {[...dailyUsage].reverse().map(day => {
              const heightPct = maxDailyTokens > 0 ? (day.tokens / maxDailyTokens) * 100 : 0
              const barHeight = Math.max(heightPct, day.tokens > 0 ? 4 : 0)
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                  {/* Cost label */}
                  <span className="text-[10px] text-slate-500 truncate w-full text-center">
                    {day.cost > 0 ? `$${day.cost.toFixed(2)}` : ''}
                  </span>
                  {/* Bar */}
                  <div className="w-full flex flex-col justify-end" style={{ height: '140px' }}>
                    <div
                      className={`w-full rounded-t transition-all ${
                        day.errors > 0
                          ? 'bg-gradient-to-t from-red-500/60 to-amber-400/80'
                          : 'bg-gradient-to-t from-amber-500/60 to-amber-400/80'
                      }`}
                      style={{ height: `${barHeight}%`, minHeight: day.tokens > 0 ? '4px' : '0px' }}
                      title={`${formatNumber(day.tokens)} tokens | $${day.cost.toFixed(2)} | ${day.count} deliverables${day.errors > 0 ? ` | ${day.errors} errors` : ''}`}
                    />
                  </div>
                  {/* Date label */}
                  <span className="text-[10px] text-slate-500 truncate w-full text-center">
                    {day.date.substring(5)}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* User Breakdown Table */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 overflow-hidden">
        <div className="p-4 border-b border-slate-700/50">
          <h3 className="text-sm font-semibold text-white">Usage by User</h3>
        </div>
        {userBreakdown.length === 0 ? (
          <p className="text-sm text-slate-500 italic p-4">No user data yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-slate-700/30">
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium text-right">Deliverables</th>
                  <th className="px-4 py-3 font-medium text-right">Tokens</th>
                  <th className="px-4 py-3 font-medium text-right">Cost</th>
                  <th className="px-4 py-3 font-medium text-right">Errors</th>
                </tr>
              </thead>
              <tbody>
                {userBreakdown.map(user => (
                  <tr key={user.userId} className="border-b border-slate-700/20 hover:bg-slate-700/20 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-white font-medium truncate max-w-[200px]">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate max-w-[200px]">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-300">{user.deliverables}</td>
                    <td className="px-4 py-3 text-right text-slate-300">{formatNumber(user.tokens)}</td>
                    <td className="px-4 py-3 text-right text-green-400 font-medium">${user.cost.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">
                      {user.errors > 0 ? (
                        <Badge className="bg-red-500/20 text-red-300 border border-red-500/30" variant="secondary">
                          {user.errors}
                        </Badge>
                      ) : (
                        <span className="text-slate-600">0</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Template Breakdown Table */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 overflow-hidden">
        <div className="p-4 border-b border-slate-700/50">
          <h3 className="text-sm font-semibold text-white">Usage by Template</h3>
        </div>
        {templateBreakdown.length === 0 ? (
          <p className="text-sm text-slate-500 italic p-4">No template data yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-slate-700/30">
                  <th className="px-4 py-3 font-medium">Template</th>
                  <th className="px-4 py-3 font-medium text-right">Generated</th>
                  <th className="px-4 py-3 font-medium text-right">Tokens</th>
                  <th className="px-4 py-3 font-medium text-right">Avg Quality</th>
                </tr>
              </thead>
              <tbody>
                {templateBreakdown.map(t => (
                  <tr key={t.templateId} className="border-b border-slate-700/20 hover:bg-slate-700/20 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{formatTemplateId(t.templateId)}</td>
                    <td className="px-4 py-3 text-right text-slate-300">{t.count}</td>
                    <td className="px-4 py-3 text-right text-slate-300">{formatNumber(t.tokens)}</td>
                    <td className="px-4 py-3 text-right">
                      {t.avgScore > 0 ? (
                        <span className={`font-medium ${
                          t.avgScore >= 80 ? 'text-green-400' :
                          t.avgScore >= 60 ? 'text-amber-400' :
                          'text-red-400'
                        }`}>
                          {t.avgScore}/100
                        </span>
                      ) : (
                        <span className="text-slate-600">--</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
