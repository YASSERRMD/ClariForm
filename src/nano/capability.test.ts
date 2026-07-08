import { describe, it, expect, vi, beforeEach } from 'vitest'
import { detectNanoCapability, getStatusMessage } from './capability'

describe('nano capability', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  it('detects unavailable when window.ai is missing', async () => {
    vi.stubGlobal('ai', undefined)
    const capability = await detectNanoCapability()
    expect(capability.available).toBe(false)
    expect(capability.status).toBe('unavailable')
  })

  it('detects available when window.ai works', async () => {
    vi.stubGlobal('ai', {
      create: vi.fn().mockResolvedValue({
        prompt: vi.fn().mockResolvedValue('response'),
      }),
    })
    const capability = await detectNanoCapability()
    expect(capability.available).toBe(true)
    expect(capability.status).toBe('available')
  })

  it('detects downloadable when download is needed', async () => {
    vi.stubGlobal('ai', {
      create: vi.fn().mockRejectedValue(new Error('download required')),
    })
    const capability = await detectNanoCapability()
    expect(capability.available).toBe(false)
    expect(capability.status).toBe('downloadable')
  })

  it('returns correct status messages', () => {
    expect(getStatusMessage('available')).toContain('available')
    expect(getStatusMessage('unavailable')).toContain('not available')
    expect(getStatusMessage('downloadable')).toContain('download')
  })
})
