/**
 * Simple in-memory rate limiter for API routes.
 * Uses a sliding window approach. Safe for single-instance Vercel Fluid Compute.
 * For multi-region production, upgrade to Upstash Redis.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key)
  }
}, 5 * 60 * 1000)

interface RateLimitConfig {
  /** Max requests in the window */
  limit: number
  /** Window duration in seconds */
  windowSeconds: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

export function checkRateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    // New window
    store.set(key, { count: 1, resetAt: now + config.windowSeconds * 1000 })
    return { allowed: true, remaining: config.limit - 1, resetAt: now + config.windowSeconds * 1000 }
  }

  if (entry.count >= config.limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: config.limit - entry.count, resetAt: entry.resetAt }
}

/** Pre-configured rate limits for different endpoint types */
export const RATE_LIMITS = {
  /** AI generation — expensive, 5 per minute per user */
  generate: { limit: 5, windowSeconds: 60 },
  /** Image generation — expensive, 3 per minute per user */
  imageGenerate: { limit: 3, windowSeconds: 60 },
  /** Coach help chat — moderate, 20 per minute per user */
  coachHelp: { limit: 20, windowSeconds: 60 },
  /** File uploads — 10 per minute per user */
  upload: { limit: 10, windowSeconds: 60 },
  /** Questionnaire reads — generous, 60 per minute per user */
  questionnaireRead: { limit: 60, windowSeconds: 60 },
  /** Questionnaire writes (save/complete) — 45 per minute per user */
  questionnaireWrite: { limit: 45, windowSeconds: 60 },
  /** Deliverable CRUD — 30 per minute per user */
  deliverable: { limit: 30, windowSeconds: 60 },
  /** Login — 5 attempts per 5 min per IP+email combo */
  login: { limit: 5, windowSeconds: 300 },
}
