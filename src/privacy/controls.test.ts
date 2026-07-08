import { describe, it, expect, beforeEach } from 'vitest'
import {
  isSensitiveField,
  redactSensitiveValues,
  logPrompt,
  getAuditLog,
  clearAuditLog,
  NO_CLOUD_AI_POLICY,
} from './controls'

describe('privacy controls', () => {
  beforeEach(() => {
    clearAuditLog()
  })

  describe('sensitive field detection', () => {
    it('detects emirates id as sensitive', () => {
      expect(isSensitiveField('emirates-id')).toBe(true)
    })

    it('detects mobile as sensitive', () => {
      expect(isSensitiveField('mobile-number')).toBe(true)
    })

    it('detects email as sensitive', () => {
      expect(isSensitiveField('email-address')).toBe(true)
    })

    it('does not detect name as sensitive', () => {
      expect(isSensitiveField('full-name')).toBe(false)
    })
  })

  describe('redaction', () => {
    it('redacts sensitive values', () => {
      const values = {
        'emirates-id': '784-1234-1234567-1',
        name: 'John Smith',
      }
      const redacted = redactSensitiveValues(values)
      expect(redacted['emirates-id']).toBe('[REDACTED]')
      expect(redacted.name).toBe('John Smith')
    })

    it('redacts array values', () => {
      const values = {
        documents: ['passport', 'emirates-id'],
      }
      const redacted = redactSensitiveValues(values)
      expect(redacted.documents).toEqual(['passport', 'emirates-id'])
    })
  })

  describe('audit log', () => {
    it('logs prompts', () => {
      logPrompt('test prompt', false)
      const log = getAuditLog()
      expect(log).toHaveLength(1)
      expect(log[0].prompt).toBe('test prompt')
      expect(log[0].redacted).toBe(false)
    })

    it('clears audit log', () => {
      logPrompt('test', false)
      clearAuditLog()
      const log = getAuditLog()
      expect(log).toHaveLength(0)
    })
  })

  it('has no cloud AI policy', () => {
    expect(NO_CLOUD_AI_POLICY).toContain('never sends')
  })
})
