import type { ChatRequest, ChatResponse } from './types'
import type { NanoAdapter } from '../nano/adapter'
import type { Language } from '../i18n/types'

function buildChatPrompt(request: ChatRequest): string {
  const { question, formSchema, language } = request
  const lang = language === 'ar' ? 'Arabic' : 'English'

  let prompt = `You are a form assistant for ClariForm. Answer the following question about a form in ${lang}.\n\n`

  if (formSchema) {
    prompt += `Form: ${formSchema.title}\n`
    prompt += `Sections:\n`
    for (const section of formSchema.sections) {
      prompt += `- ${section.title}\n`
      for (const field of section.fields) {
        prompt += `  - ${field.label} (${field.type})\n`
      }
    }
    prompt += '\n'
  }

  prompt += `Question: ${question}\n\n`
  prompt += `Provide a helpful answer in ${lang}. Do not include any personal data or form values in your response.`

  return prompt
}

function getFallbackResponse(language: Language): ChatResponse {
  const answer = language === 'ar'
    ? 'مساعدة الذكاء الاصطناعي غير متاحة. يرجى الرجوع إلى نص المساعدة في الحقول.'
    : 'AI assistance is not available. Please refer to the help text in the fields.'

  return {
    answer,
    source: 'fallback',
  }
}

export async function chat(
  request: ChatRequest,
  adapter: NanoAdapter
): Promise<ChatResponse> {
  if (!adapter.isAvailable()) {
    return getFallbackResponse(request.language)
  }

  try {
    const prompt = buildChatPrompt(request)
    const answer = await adapter.prompt(prompt)

    return {
      answer,
      source: 'nano',
    }
  } catch {
    return getFallbackResponse(request.language)
  }
}

export function createChatMessage(
  id: string,
  role: 'user' | 'assistant',
  content: string
) {
  return {
    id,
    role,
    content,
    timestamp: new Date(),
  }
}
