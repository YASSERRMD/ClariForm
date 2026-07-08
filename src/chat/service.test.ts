import { describe, it, expect, vi } from 'vitest'
import { chat, createChatMessage } from './service'
import { FallbackAdapter, NanoSessionAdapter } from '../nano/adapter'
import type { LanguageModel, LanguageModelSession } from '../nano/types'
import type { ChatRequest } from './types'

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

function createTestRequest(question: string): ChatRequest {
  return {
    question,
    language: 'en',
    formSchema: {
      id: 'test-form',
      title: 'Test Form',
      sections: [
        {
          title: 'Personal Info',
          fields: [
            { id: 'name', label: 'Name', type: 'text' },
          ],
        },
      ],
    },
  }
}

describe('chat service', () => {
  it('returns fallback when adapter not available', async () => {
    const adapter = new FallbackAdapter()
    const request = createTestRequest('What is this form?')
    const result = await chat(request, adapter)
    expect(result.source).toBe('fallback')
    expect(result.answer).toContain('not available')
  })

  it('returns nano response when available', async () => {
    const session = createMockSession()
    vi.mocked(session.prompt).mockResolvedValue('This is a test form for registration.')
    const model = createMockModel(session)
    const adapter = new NanoSessionAdapter(model)
    await adapter.init()

    const request = createTestRequest('What is this form?')
    const result = await chat(request, adapter)
    expect(result.source).toBe('nano')
    expect(result.answer).toContain('test form')
  })

  it('returns fallback on nano error', async () => {
    const session = createMockSession()
    vi.mocked(session.prompt).mockRejectedValue(new Error('API error'))
    const model = createMockModel(session)
    const adapter = new NanoSessionAdapter(model)
    await adapter.init()

    const request = createTestRequest('What is this form?')
    const result = await chat(request, adapter)
    expect(result.source).toBe('fallback')
  })

  it('creates chat message correctly', () => {
    const message = createChatMessage('1', 'user', 'Hello')
    expect(message.id).toBe('1')
    expect(message.role).toBe('user')
    expect(message.content).toBe('Hello')
    expect(message.timestamp).toBeInstanceOf(Date)
  })
})
