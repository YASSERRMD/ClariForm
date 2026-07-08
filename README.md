<p align="center">
  <img src="public/images/cliform-logo.png" alt="ClariForm" width="160" />
</p>

<h1 align="center">ClariForm</h1>

<p align="center">
  <b>Private bilingual form assistance directly in the browser.</b>
</p>

<p align="center">
  <a href="#getting-started"><img alt="npm" src="https://img.shields.io/badge/package%20manager-npm-1B2A4A?style=flat-square" /></a>
  <a href="#getting-started"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-1B2A4A?style=flat-square" /></a>
  <a href="#privacy-model"><img alt="Privacy" src="https://img.shields.io/badge/privacy-local--first-C5A55A?style=flat-square" /></a>
  <a href="#architecture"><img alt="Gemini Nano" src="https://img.shields.io/badge/AI-Gemini%20Nano%20on--device-C5A55A?style=flat-square" /></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/license-Apache%202.0-666666?style=flat-square" /></a>
</p>

---

ClariForm is a browser-based Arabic/English form assistant that helps users
understand fields, fill structured forms, validate inputs, and receive
guidance without sending personal data to the cloud.

All processing happens locally in the browser. When Gemini Nano is available
in Chrome, ClariForm uses it for on-device AI assistance — field explanation,
form chat, and input refinement — without any cloud connectivity. Personal
data is never sent to AI models.

<p align="center">
  <img src="public/images/architecture-diagram.png" alt="ClariForm architecture: User Layer (Browser, Bilingual Forms, Language Switcher) feeds into Core Engine (Form Renderer, Validation Engine, Schema System, Draft Storage), with optional AI Layer (Gemini Nano Adapter, Field Explainer, Form Chat, Input Refinement). All data stays local." width="100%" />
</p>

## What's in the box

- **Privacy-first architecture.** All form data stays in the browser via
  IndexedDB. No cloud AI calls. Sensitive fields (Emirates ID, passport,
  mobile, email) are auto-redacted from AI prompts with a full audit log.
- **Bilingual support.** Full Arabic and English UI with seamless RTL/LTR
  switching, localized validation messages, and bilingual form schemas.
- **Schema-driven forms.** Dynamic form rendering from JSON schemas with
  bilingual labels, type-specific constraints, and Zod validation.
- **Local validation engine.** Deterministic validation rules are always the
  source of truth — AI is never used for validation.
- **Gemini Nano integration.** On-device AI for field explanation, form
  assistance chat, and input refinement (non-sensitive fields only) via
  Chrome's built-in `window.ai` API.
- **Offline capable.** Full PWA support with service workers, Workbox
  caching, and IndexedDB draft persistence.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + TypeScript 6 |
| Bundler | Vite 8 |
| Styling | Tailwind CSS 4 |
| Schema Validation | Zod 4 |
| Local Database | Dexie (IndexedDB) |
| AI Integration | Chrome Built-in AI Prompt API / Gemini Nano |
| PWA | vite-plugin-pwa (Workbox) |
| Unit Testing | Vitest + Testing Library |
| E2E Testing | Playwright (Chromium) |
| Linting | oxlint |

## Privacy Model

- **Zero cloud dependencies** — all form data stays in the browser
- **Sensitive field detection** — Emirates ID, passport, mobile, email auto-redacted from AI prompts
- **Prompt audit log** — every AI request is logged with redaction status
- **Validation as source of truth** — deterministic rules, never AI-generated
- **Gemini Nano on-device** — AI runs locally via Chrome's built-in API

## Sample Forms

| Form | Sections |
|------|----------|
| **Individual Profile** | Personal info, Emirates ID, contact, document checklist |
| **Business Registration** | Company details, trade license, owner info, documents |
| **Service Request** | Requester info, service type, supporting documents |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests (87 tests)
npm run test

# Run e2e tests (8 tests)
npm run test:e2e

# Build for production
npm run build
```

## Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run test` | Run Vitest unit tests |
| `npm run test:e2e` | Run Playwright e2e tests |
| `npm run lint` | Run oxlint linter |

## Project Structure

```
src/
├── components/       # React UI components (FormRenderer, ReviewPage, etc.)
├── schema/           # FormSchema types & Zod validation
├── forms/            # Bilingual form definitions (3 sample forms)
├── validation/       # Field-level validation engine
├── i18n/             # Arabic/English translations & RTL support
├── db/               # IndexedDB draft persistence (Dexie)
├── nano/             # Gemini Nano capability detection & adapter
├── assistant/        # AI field explanation
├── chat/             # AI form Q&A chat
├── refine/           # AI input refinement (non-sensitive fields)
├── missing/          # Missing information detection
└── privacy/          # Sensitive field redaction & audit log
```

## License

Apache License 2.0. See [LICENSE](LICENSE).

---

<p align="center"><sub>Mohamed Yasser | Solutions Architect</sub></p>
