import { describe, it, expect } from 'vitest'
import {
  validateRequired,
  validatePattern,
  validateMinLength,
  validateMaxLength,
  validateEmiratesId,
  validateMobile,
  validateTradeLicense,
  validateField,
} from './validators'
import type { TextFieldSchema, SelectFieldSchema } from '../schema'

describe('validation engine', () => {
  describe('required validation', () => {
    it('returns error for empty value', () => {
      const error = validateRequired('name', '', 'en')
      expect(error).not.toBeNull()
      expect(error?.type).toBe('required')
    })

    it('returns null for valid value', () => {
      const error = validateRequired('name', 'John', 'en')
      expect(error).toBeNull()
    })

    it('returns error for empty array', () => {
      const error = validateRequired('docs', [], 'en')
      expect(error).not.toBeNull()
    })
  })

  describe('pattern validation', () => {
    it('returns error for invalid pattern', () => {
      const error = validatePattern('email', 'invalid', '^[^@]+@[^@]+\\.[^@]+$', 'en')
      expect(error).not.toBeNull()
    })

    it('returns null for valid pattern', () => {
      const error = validatePattern('email', 'test@example.com', '^[^@]+@[^@]+\\.[^@]+$', 'en')
      expect(error).toBeNull()
    })
  })

  describe('min length validation', () => {
    it('returns error for too short', () => {
      const error = validateMinLength('name', 'ab', 3, 'en')
      expect(error).not.toBeNull()
    })

    it('returns null for valid length', () => {
      const error = validateMinLength('name', 'abc', 3, 'en')
      expect(error).toBeNull()
    })
  })

  describe('emirates id validation', () => {
    it('returns error for invalid format', () => {
      const error = validateEmiratesId('id', '123-456-7890123-4', 'en')
      expect(error).not.toBeNull()
    })

    it('returns null for valid format', () => {
      const error = validateEmiratesId('id', '784-1234-1234567-1', 'en')
      expect(error).toBeNull()
    })
  })

  describe('mobile validation', () => {
    it('returns error for invalid format', () => {
      const error = validateMobile('mobile', '123456789', 'en')
      expect(error).not.toBeNull()
    })

    it('returns null for valid format', () => {
      const error = validateMobile('mobile', '+971501234567', 'en')
      expect(error).toBeNull()
    })
  })

  describe('trade license validation', () => {
    it('returns error for invalid format', () => {
      const error = validateTradeLicense('license', 'ABC', 'en')
      expect(error).not.toBeNull()
    })

    it('returns null for valid format', () => {
      const error = validateTradeLicense('license', 'ABC12345', 'en')
      expect(error).toBeNull()
    })
  })

  describe('field validation', () => {
    it('validates required text field', () => {
      const field: TextFieldSchema = {
        id: 'name',
        type: 'text',
        label: { en: 'Name', ar: 'الاسم' },
        required: true,
        minLength: 2,
      }
      const errors = validateField(field, '', 'en')
      expect(errors.length).toBe(1)
      expect(errors[0].type).toBe('required')
    })

    it('validates select field', () => {
      const field: SelectFieldSchema = {
        id: 'country',
        type: 'select',
        label: { en: 'Country', ar: 'الدولة' },
        required: true,
        options: [
          { value: 'uae', label: { en: 'UAE', ar: 'الإمارات' } },
        ],
      }
      const errors = validateField(field, 'uae', 'en')
      expect(errors.length).toBe(0)
    })
  })
})
