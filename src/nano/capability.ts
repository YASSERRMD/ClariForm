import type { NanoCapability, NanoAvailability } from './types'

export async function detectNanoCapability(): Promise<NanoCapability> {
  try {
    if (!window.ai) {
      return {
        available: false,
        status: 'unavailable',
        error: 'Window.ai API not available',
      }
    }

    const model = await window.ai.create()
    return {
      available: true,
      status: 'available',
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    if (message.includes('download') || message.includes('not found')) {
      return {
        available: false,
        status: 'downloadable',
        error: message,
      }
    }

    return {
      available: false,
      status: 'unavailable',
      error: message,
    }
  }
}

export function getStatusMessage(status: NanoAvailability): string {
  switch (status) {
    case 'available':
      return 'Gemini Nano is available'
    case 'unavailable':
      return 'Gemini Nano is not available. Using local fallback.'
    case 'downloadable':
      return 'Gemini Nano can be downloaded'
    case 'downloading':
      return 'Gemini Nano is downloading...'
    default:
      return 'Unknown status'
  }
}
