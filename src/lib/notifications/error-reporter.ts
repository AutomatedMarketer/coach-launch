export interface ErrorReport {
  errorType: 'generation-failure' | 'quality-fail' | 'api-error'
  templateId?: string
  templateTitle?: string
  coachName?: string
  questionnaireId?: string
  deliverableId?: string
  errorMessage: string
  stackTrace?: string
  retryCount?: number
  qualityScore?: number
  timestamp: string
}

const COOLDOWN_MS = 15 * 60 * 1000 // 15 minutes
const recentErrors = new Map<string, number>()

function getCooldownKey(report: ErrorReport): string {
  return `${report.errorType}:${report.templateId || 'unknown'}`
}

function isOnCooldown(key: string): boolean {
  const lastSent = recentErrors.get(key)
  if (!lastSent) return false
  return Date.now() - lastSent < COOLDOWN_MS
}

export async function reportError(report: ErrorReport): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('[error-reporter] SLACK_WEBHOOK_URL not set — skipping Slack notification')
    console.error('[error-reporter] Error:', report.errorType, report.templateTitle, report.errorMessage)
    return
  }

  const cooldownKey = getCooldownKey(report)
  if (isOnCooldown(cooldownKey)) {
    console.log(`[error-reporter] Cooldown active for ${cooldownKey} — skipping notification`)
    return
  }

  try {
    const emoji = report.errorType === 'generation-failure' ? ':x:' : ':warning:'
    const color = report.errorType === 'generation-failure' ? '#ef4444' : '#f59e0b'

    const fields = [
      { title: 'Error Type', value: report.errorType, short: true },
      { title: 'Template', value: `${report.templateTitle || 'N/A'} (\`${report.templateId || 'N/A'}\`)`, short: true },
      { title: 'Coach', value: report.coachName || 'N/A', short: true },
      { title: 'Retries', value: `${report.retryCount ?? 0}`, short: true },
    ]

    if (report.qualityScore !== undefined) {
      fields.push({ title: 'Quality Score', value: `${report.qualityScore}/100`, short: true })
    }

    if (report.questionnaireId) {
      fields.push({ title: 'Questionnaire', value: `\`${report.questionnaireId}\``, short: false })
    }

    const payload = {
      text: `${emoji} *Coach Launch Error*: ${report.templateTitle || report.templateId}`,
      attachments: [
        {
          color,
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Error Message:*\n\`\`\`${report.errorMessage.slice(0, 500)}\`\`\``,
              },
            },
            {
              type: 'section',
              fields: fields.map(f => ({
                type: 'mrkdwn',
                text: `*${f.title}:* ${f.value}`,
              })),
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `${report.timestamp} | Coach Launch Error Reporter`,
                },
              ],
            },
          ],
        },
      ],
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Slack responded ${response.status}: ${await response.text()}`)
    }

    recentErrors.set(cooldownKey, Date.now())
    console.log(`[error-reporter] Slack notification sent: ${report.errorType} — ${report.templateTitle}`)
  } catch (slackErr) {
    console.error('[error-reporter] Failed to send Slack notification:', slackErr instanceof Error ? slackErr.message : slackErr)
  }
}
