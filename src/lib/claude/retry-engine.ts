import { generateDeliverable, type GenerationResult } from './generate'

export interface RetryResult extends GenerationResult {
  retryCount: number
  retryStrategy: 'none' | 'fresh-call' | 'simplified-context' | 'model-fallback'
}

const FALLBACK_MODEL = 'claude-sonnet-4-6'
const RETRY_BACKOFF_MS = 2000
const MAX_RETRIES = 3

function simplifyContext(context: string): string {
  const sections = context.split('\n\n---\n\n')
  if (sections.length <= 2) return context
  return sections.slice(-2).join('\n\n---\n\n')
}

export async function generateWithRetry(
  templateId: string,
  answers: Record<string, unknown>,
  context?: string
): Promise<RetryResult> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      let currentContext = context
      let modelOverride: string | undefined

      if (attempt === 2 && context) {
        currentContext = simplifyContext(context)
      } else if (attempt === 3) {
        modelOverride = FALLBACK_MODEL
        if (context) currentContext = simplifyContext(context)
      }

      const result = await generateDeliverable(
        templateId,
        answers,
        currentContext,
        modelOverride ? { modelOverride } : undefined
      )

      return {
        ...result,
        retryCount: attempt,
        retryStrategy: attempt === 0 ? 'none'
          : attempt === 1 ? 'fresh-call'
          : attempt === 2 ? 'simplified-context'
          : 'model-fallback',
      }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
      console.error(`[retry-engine] Attempt ${attempt + 1}/${MAX_RETRIES + 1} failed for ${templateId}: ${lastError.message}`)

      if (attempt < MAX_RETRIES) {
        await new Promise(r => setTimeout(r, RETRY_BACKOFF_MS * (attempt + 1)))
      }
    }
  }

  throw lastError || new Error(`Generation failed after ${MAX_RETRIES + 1} attempts`)
}
