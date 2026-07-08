<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ClariForm - Private Bilingual Form Assistant</title>
  <style>
    body {
      font-family: Calibri, Arial, sans-serif;
      margin: 0;
      padding: 24px;
      color: #2C2C2C;
      max-width: 960px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* Header */
    .header {
      text-align: center;
      margin-bottom: 32px;
      padding-bottom: 16px;
      border-bottom: 3px solid #C5A55A;
    }

    .header img.logo {
      width: 64px;
      height: 64px;
      margin-bottom: 12px;
    }

    .header img.cliform-logo {
      width: 120px;
      height: 120px;
      margin-bottom: 16px;
    }

    h1 {
      color: #1B2A4A;
      font-family: Georgia, serif;
      font-size: 2.2em;
      font-weight: 700;
      margin: 0 0 8px 0;
      letter-spacing: -0.5px;
    }

    .tagline {
      color: #666666;
      font-size: 14px;
      font-style: italic;
      margin: 0 0 16px 0;
    }

    .author-block {
      color: #1B2A4A;
      font-size: 13px;
      font-weight: 500;
    }

    /* Section Headings */
    h2 {
      color: #1B2A4A;
      font-family: Georgia, serif;
      font-size: 1.3em;
      font-weight: 700;
      margin-top: 32px;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 2px solid #C5A55A;
      letter-spacing: 0.3px;
    }

    h3 {
      color: #1B2A4A;
      font-family: Georgia, serif;
      font-size: 1.05em;
      font-weight: 700;
      margin-top: 20px;
      margin-bottom: 8px;
    }

    /* Content */
    p {
      margin: 0 0 16px 0;
      font-size: 15px;
      line-height: 1.65;
    }

    /* Feature Grid */
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
      margin: 16px 0 24px 0;
    }

    .feature-card {
      background: #F2F2F2;
      border-left: 4px solid #C5A55A;
      padding: 16px;
      border-radius: 0 6px 6px 0;
    }

    .feature-card strong {
      color: #1B2A4A;
      display: block;
      margin-bottom: 4px;
      font-size: 14px;
    }

    .feature-card span {
      color: #555555;
      font-size: 13px;
    }

    /* Architecture Diagram */
    .architecture-img {
      width: 100%;
      max-width: 800px;
      margin: 16px auto;
      display: block;
      border-radius: 8px;
      border: 1px solid #E5E5E5;
    }

    /* Tech Stack Table */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      font-size: 14px;
    }

    thead th {
      background: #1B2A4A;
      color: #FFFFFF;
      font-weight: 600;
      text-align: left;
      padding: 10px 12px;
      font-size: 13px;
    }

    tbody td {
      padding: 10px 12px;
      border-bottom: 1px solid #E5E5E5;
    }

    tbody tr:nth-child(even) {
      background: #F2F2F2;
    }

    tbody tr:nth-child(odd) {
      background: #FFFFFF;
    }

    /* Code Blocks */
    pre {
      background: #F8F9FA;
      border-left: 4px solid #C5A55A;
      padding: 16px;
      border-radius: 0 6px 6px 0;
      overflow-x: auto;
      font-family: Consolas, 'Fira Code', monospace;
      font-size: 13px;
      line-height: 1.5;
      margin: 12px 0 20px 0;
    }

    code {
      font-family: Consolas, 'Fira Code', monospace;
      background: #F2F2F2;
      padding: 2px 5px;
      border-radius: 3px;
      font-size: 13px;
    }

    pre code {
      background: none;
      padding: 0;
    }

    /* Lists */
    ul {
      margin: 8px 0 16px 0;
      padding-left: 24px;
    }

    li {
      margin-bottom: 6px;
      font-size: 14px;
    }

    /* Privacy Banner */
    .privacy-banner {
      background: #1B2A4A;
      color: #FFFFFF;
      padding: 16px 20px;
      border-radius: 8px;
      margin: 20px 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .privacy-banner .shield {
      font-size: 28px;
    }

    .privacy-banner p {
      margin: 0;
      font-size: 14px;
      font-weight: 500;
    }

    /* Forms Grid */
    .forms-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 12px;
      margin: 12px 0 20px 0;
    }

    .form-card {
      background: #F2F2F2;
      padding: 14px;
      border-radius: 6px;
      border: 1px solid #E5E5E5;
    }

    .form-card strong {
      color: #1B2A4A;
      display: block;
      margin-bottom: 4px;
      font-size: 14px;
    }

    .form-card span {
      color: #666666;
      font-size: 12px;
    }

    /* Footer */
    .footer {
      margin-top: 40px;
      padding-top: 16px;
      border-top: 2px solid #C5A55A;
      color: #888888;
      font-size: 12px;
      text-align: center;
    }

    .footer .brand {
      color: #1B2A4A;
      font-weight: 700;
      font-family: Georgia, serif;
    }

    /* Divider */
    .gold-divider {
      width: 60px;
      height: 3px;
      background: #C5A55A;
      margin: 16px 0;
    }

    /* Badge Row */
    .badge-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin: 12px 0;
    }

    .badge {
      background: #1B2A4A;
      color: #FFFFFF;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.3px;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="header">
    <img src="public/images/cliform-logo.png" alt="ClariForm" class="cliform-logo">
    <h1>ClariForm</h1>
    <p class="tagline">Private bilingual form assistance directly in the browser</p>
    <div class="author-block">Mohamed Yasser | Solutions Architect</div>
  </div>

  <!-- Overview -->
  <h2>Overview</h2>
  <p>
    ClariForm is a browser-based Arabic/English form assistant that helps users understand fields,
    fill structured forms, validate inputs, and receive AI-powered guidance — all without sending
    personal data to the cloud. Built with privacy at its core, ClariForm processes everything
    locally and integrates with Chrome's on-device Gemini Nano when available.
  </p>

  <div class="badge-row">
    <span class="badge">v1.0.0</span>
    <span class="badge">Privacy-First</span>
    <span class="badge">Bilingual AR/EN</span>
    <span class="badge">Offline PWA</span>
  </div>

  <!-- Key Features -->
  <h2>Key Features</h2>
  <div class="feature-grid">
    <div class="feature-card">
      <strong>Privacy-First</strong>
      <span>All processing happens locally in the browser. No personal data ever leaves your device.</span>
    </div>
    <div class="feature-card">
      <strong>Bilingual Support</strong>
      <span>Full Arabic and English UI with seamless RTL/LTR switching and localized validation messages.</span>
    </div>
    <div class="feature-card">
      <strong>Schema-Driven Forms</strong>
      <span>Dynamic form rendering from JSON schemas with bilingual labels and type-specific constraints.</span>
    </div>
    <div class="feature-card">
      <strong>Local Validation</strong>
      <span>Deterministic Zod validation rules as the source of truth — never AI-dependent.</span>
    </div>
    <div class="feature-card">
      <strong>Gemini Nano Integration</strong>
      <span>On-device AI for field explanation, chat assistance, and input refinement when available.</span>
    </div>
    <div class="feature-card">
      <strong>Offline Capable</strong>
      <span>Full PWA support with service workers and IndexedDB for offline draft persistence.</span>
    </div>
  </div>

  <!-- Architecture -->
  <h2>Architecture</h2>
  <p>
    ClariForm follows a local-first architecture with a clear three-layer separation. All form
    data stays in the browser, validation runs deterministically, and AI assistance is optional
    and privacy-guarded.
  </p>

  <img src="public/images/architecture-diagram.png" alt="ClariForm Architecture Diagram" class="architecture-img">

  <div class="privacy-banner">
    <div class="shield">&#128737;</div>
    <p>All data stays local — no cloud calls, no external API requests, no data leaks.</p>
  </div>

  <!-- Tech Stack -->
  <h2>Tech Stack</h2>
  <table>
    <thead>
      <tr>
        <th>Layer</th>
        <th>Technology</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Framework</td><td>React 19 + TypeScript 6</td></tr>
      <tr><td>Bundler</td><td>Vite 8</td></tr>
      <tr><td>Styling</td><td>Tailwind CSS 4</td></tr>
      <tr><td>Schema Validation</td><td>Zod 4</td></tr>
      <tr><td>Local Database</td><td>Dexie (IndexedDB)</td></tr>
      <tr><td>AI Integration</td><td>Chrome Built-in AI Prompt API / Gemini Nano</td></tr>
      <tr><td>PWA</td><td>vite-plugin-pwa (Workbox)</td></tr>
      <tr><td>Unit Testing</td><td>Vitest + Testing Library</td></tr>
      <tr><td>E2E Testing</td><td>Playwright (Chromium)</td></tr>
      <tr><td>Linting</td><td>oxlint</td></tr>
    </tbody>
  </table>

  <!-- Privacy Model -->
  <h2>Privacy Model</h2>
  <ul>
    <li><strong>Zero cloud dependencies</strong> — all form data stays in the browser</li>
    <li><strong>Sensitive field detection</strong> — Emirates ID, passport, mobile, email auto-redacted from AI prompts</li>
    <li><strong>Prompt audit log</strong> — every AI request is logged with redaction status</li>
    <li><strong>Validation as source of truth</strong> — deterministic rules, never AI-generated</li>
    <li><strong>Gemini Nano on-device</strong> — AI runs locally via Chrome's built-in API</li>
  </ul>

  <!-- Sample Forms -->
  <h2>Sample Forms</h2>
  <div class="forms-grid">
    <div class="form-card">
      <strong>Individual Profile</strong>
      <span>Personal info, Emirates ID, contact, document checklist — 3 sections</span>
    </div>
    <div class="form-card">
      <strong>Business Registration</strong>
      <span>Company details, trade license, owner info, documents — 3 sections</span>
    </div>
    <div class="form-card">
      <strong>Service Request</strong>
      <span>Requester info, service type, supporting documents — 3 sections</span>
    </div>
  </div>

  <!-- Getting Started -->
  <h2>Getting Started</h2>
  <pre><code># Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests (87 tests)
npm run test

# Run e2e tests (8 tests)
npm run test:e2e

# Build for production
npm run build</code></pre>

  <!-- Development -->
  <h2>Development</h2>
  <table>
    <thead>
      <tr>
        <th>Command</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>npm run dev</code></td><td>Start Vite dev server</td></tr>
      <tr><td><code>npm run build</code></td><td>Type-check + production build</td></tr>
      <tr><td><code>npm run test</code></td><td>Run Vitest unit tests</td></tr>
      <tr><td><code>npm run test:e2e</code></td><td>Run Playwright e2e tests</td></tr>
      <tr><td><code>npm run lint</code></td><td>Run oxlint linter</td></tr>
    </tbody>
  </table>

  <!-- Project Structure -->
  <h2>Project Structure</h2>
  <pre><code>src/
├── components/       # React UI components (FormRenderer, ReviewPage, etc.)
├── schema/           # FormSchema types &amp; Zod validation
├── forms/            # Bilingual form definitions (3 sample forms)
├── validation/       # Field-level validation engine
├── i18n/             # Arabic/English translations &amp; RTL support
├── db/               # IndexedDB draft persistence (Dexie)
├── nano/             # Gemini Nano capability detection &amp; adapter
├── assistant/        # AI field explanation
├── chat/             # AI form Q&amp;A chat
├── refine/           # AI input refinement (non-sensitive fields)
├── missing/          # Missing information detection
└── privacy/          # Sensitive field redaction &amp; audit log</code></pre>

  <!-- Footer -->
  <div class="footer">
    <span class="brand">MY</span> &nbsp;|&nbsp; Mohamed Yasser | Solutions Architect
  </div>

</body>
</html>
