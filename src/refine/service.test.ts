import { describe, it, expect, vi } from 'vitest'
import { refineInput, createRefinementRequest } from './service'
import { isSensitiveField } from './types'
import { FallbackAdapter, NanoSessionAdapter } from '../nano/adapter'
import type { LanguageModel, LanguageModelSession } from '../nano/types'

function createMockSession(): LanguageModelSession {
  return {
    prompt: vi.fn(),
    promptStreaming: vi.fn(),
  }
}

function createMockModel(session: LanguageModelSession): LanguageModel {
  return {
    createSession: vi.fn().mockResolvedValue(session),
  }
}

describe('refine service', () => {
  describe('sensitive field detection', () => {
    it('blocks emirates id refinement', () => {
      expect(isSensitiveField('emirates-id')).toBe(true)
    })

    it('blocks mobile refinement', () => {
      expect(isSensitiveField('mobile')).toBe(true)
    })

    it('allows free text refinement', () => {
      expect(isSensitiveField('description')).toBe(false)
    })
  })

  it('returns current value for sensitive fields', async () => {
    const adapter = new FallbackAdapter()
    const request = createRefinementRequest('emirates-id', 'Emirates ID', '784-1234-1234567-1', 'text', 'en')
    const result = await refineInput(request, adapter)
    expect(result.refinedValue).toBe('784-1234-1234567-1')
    expect(result.source).toBe('fallback')
  })

  it('returns fallback when adapter not available', async () => {
    const adapter = new FallbackAdapter()
    const request = createRefinementRequest('description', 'Description', 'test text', 'text', 'en')
    const result = await refineInput(request, adapter)
    expect(result.source).toBe('fallback')
  })

  it('returns nano refinement when available', async () => {
    const session = createMockSession()
    vi.mocked(session.prompt).mockResolvedValue(
      JSON.stringify({ refinedValue: 'Refined text here' })
    )
    const model = createMockModel(session)
    const adapter = new NanoSessionAdapter(model)
    await adapter.init()

    const request = createRefinementRequest('description', 'Description', 'test text', 'text', 'en')
    const result = await refineInput(request, adapter)
    expect(result.source).toBe('nano')
    expect(result.refinedValue).toBe('Refined text here')
  })

  it('creates refinement request correctly', () => {
    const request = createRefinementRequest('name', 'Name', 'John', 'text', 'en')
    expect(request.fieldId).toBe('name')
    expect(request.currentValue).toBe('John')
    expect(request.language).toBe('en')
  })
})
