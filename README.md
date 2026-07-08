# ClariForm

Private bilingual form assistance directly in the browser.

## Overview

ClariForm is a browser-based Arabic/English form assistant that helps users understand fields, fill structured forms, validate inputs, and receive guidance without sending personal data to the cloud.

## Key Features

- **Privacy-first**: All processing happens locally in the browser
- **Bilingual support**: Arabic and English UI with RTL/LTR switching
- **Schema-driven forms**: Dynamic form rendering from JSON schemas
- **Local validation**: Deterministic validation rules as source of truth
- **Gemini Nano integration**: On-device AI assistance when available
- **Offline capable**: PWA support for offline usage

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS
- Vitest (unit tests)
- Playwright (e2e tests)
- Chrome Built-in AI Prompt API / Gemini Nano
- Local JSON form schemas
- IndexedDB for draft storage (Dexie)
- Zod for schema validation

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Build for production
npm run build
```

## Architecture

### Local-first Design

ClariForm processes all form data locally in the browser. No personal data is sent to external services. When Gemini Nano is available, it provides on-device AI assistance without cloud connectivity.

### Form Schema System

Forms are defined using JSON schemas with bilingual labels:

```typescript
const formSchema: FormSchema = {
  id: 'individual-profile',
  title: { en: 'Individual Profile', ar: 'الملف الشخصي للأفراد' },
  sections: [
    {
      id: 'personal-info',
      title: { en: 'Personal Information', ar: 'المعلومات الشخصية' },
      fields: [
        {
          id: 'emirates-id',
          type: 'text',
          label: { en: 'Emirates ID', ar: 'هوية الإمارات' },
          required: true,
          pattern: '^784-[0-9]{4}-[0-9]{7}-[0-9]$',
        },
      ],
    },
  ],
}
```

### Validation Engine

Deterministic validation rules are always the source of truth. AI assistance is never used for validation.

### Gemini Nano Integration

When Chrome's built-in AI is available, ClariForm uses it for:
- Field explanation
- Form assistance chat
- Input refinement (non-sensitive fields only)

Personal data is never sent to AI models.

## Privacy Model

- All form data stays in the browser
- No cloud AI calls
- Sensitive fields are redacted from AI prompts
- Local validation is always the source of truth

## Sample Forms

- Individual Profile Form
- Business Registration Form
- Service Request Form

## Development

```bash
# Type checking
npm run build

# Linting
npm run lint

# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

## License

See LICENSE file for details.
