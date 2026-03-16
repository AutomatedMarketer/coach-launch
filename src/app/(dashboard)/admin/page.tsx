'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Loader2,
  Shield,
  Users,
  FileText,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Eye,
} from 'lucide-react'

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

export default function AdminPage() {
  const router = useRouter()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>({})

  useEffect(() => {
    async function fetchData() {
      try {
        // Check admin access first
        const meRes = await fetch('/api/admin/me')
        const meData = await meRes.json()
        if (!meData.isAdmin) {
          router.push('/dashboard')
          return
        }

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
    </div>
  )
}
