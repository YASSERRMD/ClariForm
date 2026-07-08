import { describe, it, expect, vi } from 'vitest'
import { NanoSessionAdapter, FallbackAdapter, createAdapter } from './adapter'
import type { LanguageModel, LanguageModelSession } from './types'

function createMockSession(): LanguageModelSession {
  return {
    prompt: vi.fn().mockResolvedValue('response'),
    promptStreaming: vi.fn(),
  }
}

function createMockModel(session: LanguageModelSession): LanguageModel {
  return {
    createSession: vi.fn().mockResolvedValue(session),
  }
}

describe('nano adapter', () => {
  describe('NanoSessionAdapter', () => {
    it('returns prompt response', async () => {
      const session = createMockSession()
      const model = createMockModel(session)
      const adapter = new NanoSessionAdapter(model)
      await adapter.init()
      const result = await adapter.prompt('test')
      expect(result).toBe('response')
    })

    it('parses json response', async () => {
      const session = createMockSession()
      vi.mocked(session.prompt).mockResolvedValue('{"key": "value"}')
      const model = createMockModel(session)
      const adapter = new NanoSessionAdapter(model)
      await adapter.init()
      const result = await adapter.promptJson<{ key: string }>('test')
      expect(result).toEqual({ key: 'value' })
    })

    it('throws on invalid json', async () => {
      const session = createMockSession()
      vi.mocked(session.prompt).mockResolvedValue('not json')
      const model = createMockModel(session)
      const adapter = new NanoSessionAdapter(model)
      await adapter.init()
      await expect(adapter.promptJson('test')).rejects.toThrow('Failed to parse JSON')
    })
  })

  describe('FallbackAdapter', () => {
    it('throws on prompt', async () => {
      const adapter = new FallbackAdapter()
      await expect(adapter.prompt('test')).rejects.toThrow('Nano not available')
    })

    it('returns false for isAvailable', () => {
      const adapter = new FallbackAdapter()
      expect(adapter.isAvailable()).toBe(false)
    })
  })

  describe('createAdapter', () => {
    it('creates session adapter when model provided', () => {
      const model = createMockModel(createMockSession())
      const adapter = createAdapter(model)
      expect(adapter).toBeInstanceOf(NanoSessionAdapter)
    })

    it('creates fallback adapter when no model', () => {
      const adapter = createAdapter(null)
      expect(adapter).toBeInstanceOf(FallbackAdapter)
    })
  })
})
