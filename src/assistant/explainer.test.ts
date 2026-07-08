import { describe, it, expect, vi } from 'vitest'
import { explainField, createExplanationRequest } from './explainer'
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

describe('field explainer', () => {
  it('returns fallback when adapter not available', async () => {
    const adapter = new FallbackAdapter()
    const request = createExplanationRequest('name', 'Name', 'text', 'Enter your name', 'en')
    const result = await explainField(request, adapter)
    expect(result.source).toBe('fallback')
    expect(result.explanation).toBe('Enter your name')
  })

  it('returns nano explanation when available', async () => {
    const session = createMockSession()
    vi.mocked(session.prompt).mockResolvedValue(
      JSON.stringify({ explanation: 'Your full legal name', example: 'John Smith' })
    )
    const model = createMockModel(session)
    const adapter = new NanoSessionAdapter(model)
    await adapter.init()

    const request = createExplanationRequest('name', 'Name', 'text', undefined, 'en')
    const result = await explainField(request, adapter)
    expect(result.source).toBe('nano')
    expect(result.explanation).toBe('Your full legal name')
    expect(result.example).toBe('John Smith')
  })

  it('returns fallback on nano error', async () => {
    const session = createMockSession()
    vi.mocked(session.prompt).mockRejectedValue(new Error('API error'))
    const model = createMockModel(session)
    const adapter = new NanoSessionAdapter(model)
    await adapter.init()

    const request = createExplanationRequest('name', 'Name', 'text', undefined, 'en')
    const result = await explainField(request, adapter)
    expect(result.source).toBe('fallback')
  })

  it('creates explanation request correctly', () => {
    const request = createExplanationRequest('email', 'Email', 'text', 'Enter email', 'en')
    expect(request.fieldId).toBe('email')
    expect(request.fieldLabel).toBe('Email')
    expect(request.language).toBe('en')
  })
})
