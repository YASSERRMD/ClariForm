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
- IndexedDB for draft storage

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
```

## Privacy Model

ClariForm processes all form data locally in the browser. No personal data is sent to external services. When Gemini Nano is available, it provides on-device AI assistance without cloud connectivity.

## License

See LICENSE file for details.
