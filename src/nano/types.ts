export interface LanguageModel {
  createSession(): Promise<LanguageModelSession>
}

export interface LanguageModelSession {
  prompt(text: string): Promise<string>
  promptStreaming(text: string): ReadableStream<string>
}

export interface LanguageModelFactory {
  create(): Promise<LanguageModel>
}

declare global {
  interface Window {
    ai?: LanguageModelFactory
  }
}

export type NanoAvailability = 'available' | 'unavailable' | 'downloadable' | 'downloading'

export interface NanoCapability {
  available: boolean
  status: NanoAvailability
  error?: string
}
