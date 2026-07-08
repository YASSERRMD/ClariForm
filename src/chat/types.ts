import type { Language } from '../i18n/types'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ChatRequest {
  question: string
  formSchema?: {
    id: string
    title: string
    sections: { title: string; fields: { id: string; label: string; type: string }[] }[]
  }
  language: Language
}

export interface ChatResponse {
  answer: string
  source: 'nano' | 'fallback'
}
