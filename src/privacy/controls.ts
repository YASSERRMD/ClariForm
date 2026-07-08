export const NO_CLOUD_AI_POLICY = 'ClariForm never sends your data to external services. All processing happens locally in your browser.'

export const SENSITIVE_FIELD_PATTERNS = [
  'emirates-id',
  'passport',
  'mobile',
  'phone',
  'email',
  'trade-license',
  'national-id',
]

export function isSensitiveField(fieldId: string): boolean {
  return SENSITIVE_FIELD_PATTERNS.some((pattern) =>
    fieldId.toLowerCase().includes(pattern.toLowerCase())
  )
}

export function redactSensitiveValues(
  values: Record<string, string | boolean | string[]>
): Record<string, string | boolean | string[]> {
  const redacted: Record<string, string | boolean | string[]> = {}

  for (const [key, value] of Object.entries(values)) {
    if (isSensitiveField(key)) {
      if (typeof value === 'string') {
        redacted[key] = '[REDACTED]'
      } else if (Array.isArray(value)) {
        redacted[key] = value.map(() => '[REDACTED]')
      } else {
        redacted[key] = value
      }
    } else {
      redacted[key] = value
    }
  }

  return redacted
}

export interface PromptAuditEntry {
  timestamp: Date
  prompt: string
  redacted: boolean
}

const auditLog: PromptAuditEntry[] = []

export function logPrompt(prompt: string, redacted: boolean): void {
  auditLog.push({
    timestamp: new Date(),
    prompt,
    redacted,
  })
}

export function getAuditLog(): PromptAuditEntry[] {
  return [...auditLog]
}

export function clearAuditLog(): void {
  auditLog.length = 0
}
