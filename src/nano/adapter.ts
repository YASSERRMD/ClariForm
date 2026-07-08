import type { LanguageModel, LanguageModelSession } from './types'

export interface NanoAdapter {
  prompt(text: string): Promise<string>
  promptJson<T>(text: string): Promise<T>
  isAvailable(): boolean
}

export class NanoSessionAdapter implements NanoAdapter {
  private session: LanguageModelSession | null = null
  private available = false
  private model: LanguageModel

  constructor(model: LanguageModel) {
    this.model = model
    this.available = true
  }

  async init(): Promise<void> {
    this.session = await this.model.createSession()
  }

  async prompt(text: string): Promise<string> {
    if (!this.session) {
      throw new Error('Session not initialized')
    }
    return this.session.prompt(text)
  }

  async promptJson<T>(text: string): Promise<T> {
    const response = await this.prompt(text)
    try {
      return JSON.parse(response) as T
    } catch {
      throw new Error('Failed to parse JSON response')
    }
  }

  isAvailable(): boolean {
    return this.available && this.session !== null
  }
}

export class FallbackAdapter implements NanoAdapter {
  async prompt(): Promise<string> {
    throw new Error('Nano not available')
  }

  async promptJson<T>(): Promise<T> {
    throw new Error('Nano not available')
  }

  isAvailable(): boolean {
    return false
  }
}

export function createAdapter(model: LanguageModel | null): NanoAdapter {
  if (model) {
    return new NanoSessionAdapter(model)
  }
  return new FallbackAdapter()
}
