import { describe, it, expect } from 'vitest'
import { t } from './t'
import { getDirection } from './types'

describe('i18n', () => {
  describe('translation helper', () => {
    it('returns english translation', () => {
      expect(t('app.name', 'en')).toBe('ClariForm')
    })

    it('returns arabic translation', () => {
      expect(t('app.name', 'ar')).toBe('ClariForm')
    })

    it('returns key if translation not found', () => {
      expect(t('nonexistent.key', 'en')).toBe('nonexistent.key')
    })

    it('replaces template parameters', () => {
      const result = t('validation.minLength', 'en', { min: 5 })
      expect(result).toBe('Must be at least 5 characters')
    })
  })

  describe('direction', () => {
    it('returns ltr for english', () => {
      expect(getDirection('en')).toBe('ltr')
    })

    it('returns rtl for arabic', () => {
      expect(getDirection('ar')).toBe('rtl')
    })
  })
})
