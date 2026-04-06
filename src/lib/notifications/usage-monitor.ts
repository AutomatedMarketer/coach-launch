import { reportError, type ErrorReport } from './error-reporter'

interface UsageAlert {
  type: 'daily-spend' | 'user-spend' | 'rate-limit-hit' | 'high-error-rate' | 'quality-alert'
  message: string
  details: Record<string, string | number>
}

// Track daily token spend in memory (resets on cold start, which is fine — it's an alert, not billing)
const dailyTokens = new Map<string, number>()
const userTokens = new Map<string, number>()
const rateLimitHits = new Map<string, number>()

function getToday(): string {
  return new Date().toISOString().substring(0, 10)
}

/** Call this after every successful generation */
export function trackTokenUsage(userId: string, tokensUsed: number, templateId: string): void {
  const today = getToday()
  const dayKey = `day:${today}`
  const userKey = `user:${userId}:${today}`

  const newDayTotal = (dailyTokens.get(dayKey) || 0) + tokensUsed
  dailyTokens.set(dayKey, newDayTotal)

  const newUserTotal = (userTokens.get(userKey) || 0) + tokensUsed
  userTokens.set(userKey, newUserTotal)

  // Alert thresholds
  const DAILY_TOKEN_LIMIT = 2_000_000    // ~$12/day
  const USER_TOKEN_LIMIT = 500_000       // ~$3/user/day
  const COST_PER_1M = 6

  // Daily spend alert (fires once per threshold crossing)
  if (newDayTotal > DAILY_TOKEN_LIMIT && (newDayTotal - tokensUsed) <= DAILY_TOKEN_LIMIT) {
    sendUsageAlert({
      type: 'daily-spend',
      message: `Daily token usage exceeded ${(DAILY_TOKEN_LIMIT / 1_000_000).toFixed(1)}M tokens (~$${((DAILY_TOKEN_LIMIT / 1_000_000) * COST_PER_1M).toFixed(0)})`,
      details: {
        date: today,
        totalTokens: newDayTotal,
        estimatedCost: Number(((newDayTotal / 1_000_000) * COST_PER_1M).toFixed(2)),
      },
    })
  }

  // Per-user spend alert
  if (newUserTotal > USER_TOKEN_LIMIT && (newUserTotal - tokensUsed) <= USER_TOKEN_LIMIT) {
    sendUsageAlert({
      type: 'user-spend',
      message: `User exceeded ${(USER_TOKEN_LIMIT / 1_000_000).toFixed(1)}M tokens today`,
      details: {
        userId: userId.substring(0, 8),
        date: today,
        totalTokens: newUserTotal,
        estimatedCost: Number(((newUserTotal / 1_000_000) * COST_PER_1M).toFixed(2)),
        templateId,
      },
    })
  }
}

/** Call this when a rate limit is hit */
export function trackRateLimitHit(userId: string, endpoint: string): void {
  const today = getToday()
  const key = `ratelimit:${today}`
  const count = (rateLimitHits.get(key) || 0) + 1
  rateLimitHits.set(key, count)

  // Alert on first hit and every 10th hit
  if (count === 1 || count % 10 === 0) {
    sendUsageAlert({
      type: 'rate-limit-hit',
      message: `Rate limit triggered ${count} time(s) today`,
      details: {
        userId: userId.substring(0, 8),
        endpoint,
        totalHitsToday: count,
      },
    })
  }
}

/** Call this when quality score is very low */
export function trackQualityAlert(templateId: string, score: number, coachName: string): void {
  if (score < 50) {
    sendUsageAlert({
      type: 'quality-alert',
      message: `Very low quality score: ${score}/100 for ${templateId}`,
      details: { templateId, score, coachName },
    })
  }
}

async function sendUsageAlert(alert: UsageAlert): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('[usage-monitor] No SLACK_WEBHOOK_URL — alert skipped:', alert.type, alert.message)
    return
  }

  const emoji = alert.type === 'daily-spend' ? ':money_with_wings:' :
                alert.type === 'user-spend' ? ':bust_in_silhouette:' :
                alert.type === 'rate-limit-hit' ? ':rotating_light:' :
                alert.type === 'quality-alert' ? ':warning:' : ':bell:'

  const color = alert.type === 'rate-limit-hit' ? '#ef4444' :
                alert.type === 'daily-spend' ? '#f59e0b' :
                alert.type === 'quality-alert' ? '#f59e0b' : '#3b82f6'

  const detailLines = Object.entries(alert.details)
    .map(([k, v]) => `*${k}:* ${v}`)
    .join('\n')

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `${emoji} *Coach Launch Alert*: ${alert.message}`,
        attachments: [{
          color,
          blocks: [
            { type: 'section', text: { type: 'mrkdwn', text: detailLines } },
            { type: 'context', elements: [{ type: 'mrkdwn', text: `${new Date().toISOString()} | Usage Monitor` }] },
          ],
        }],
      }),
    })
  } catch (err) {
    console.error('[usage-monitor] Failed to send alert:', err instanceof Error ? err.message : err)
  }
}
