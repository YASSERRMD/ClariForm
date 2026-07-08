# ClariForm

<img src="public/images/cliform-logo.png" alt="ClariForm Logo" width="120">

**Private bilingual form assistance directly in the browser**

> Mohamed Yasser | Solutions Architect

---

## Overview

ClariForm is a browser-based Arabic/English form assistant that helps users understand fields, fill structured forms, validate inputs, and receive AI-powered guidance — all without sending personal data to the cloud. Built with privacy at its core, ClariForm processes everything locally and integrates with Chrome's on-device Gemini Nano when available.

`v1.0.0` · `Privacy-First` · `Bilingual AR/EN` · `Offline PWA`

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Privacy-First** | All processing happens locally in the browser. No personal data ever leaves your device. |
| **Bilingual Support** | Full Arabic and English UI with seamless RTL/LTR switching and localized validation messages. |
| **Schema-Driven Forms** | Dynamic form rendering from JSON schemas with bilingual labels and type-specific constraints. |
| **Local Validation** | Deterministic Zod validation rules as the source of truth — never AI-dependent. |
| **Gemini Nano Integration** | On-device AI for field explanation, chat assistance, and input refinement when available. |
| **Offline Capable** | Full PWA support with service workers and IndexedDB for offline draft persistence. |

---

## Architecture

ClariForm follows a local-first architecture with a clear three-layer separation. All form data stays in the browser, validation runs deterministically, and AI assistance is optional and privacy-guarded.

![ClariForm Architecture](public/images/architecture-diagram.png)

> **All data stays local — no cloud calls, no external API requests, no data leaks.**

---

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

---

## Privacy Model

- **Zero cloud dependencies** — all form data stays in the browser
- **Sensitive field detection** — Emirates ID, passport, mobile, email auto-redacted from AI prompts
- **Prompt audit log** — every AI request is logged with redaction status
- **Validation as source of truth** — deterministic rules, never AI-generated
- **Gemini Nano on-device** — AI runs locally via Chrome's built-in API

---

## Sample Forms

| Form | Sections |
|------|----------|
| **Individual Profile** | Personal info, Emirates ID, contact, document checklist |
| **Business Registration** | Company details, trade license, owner info, documents |
| **Service Request** | Requester info, service type, supporting documents |

---

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

---

## Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run test` | Run Vitest unit tests |
| `npm run test:e2e` | Run Playwright e2e tests |
| `npm run lint` | Run oxlint linter |

---

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

---

**MY** | Mohamed Yasser | Solutions Architect
