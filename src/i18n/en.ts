export const en = {
  app: {
    name: 'ClariForm',
    tagline: 'Private bilingual form assistance',
  },
  header: {
    home: 'Home',
    forms: 'Forms',
    settings: 'Settings',
  },
  footer: {
    privacy: 'Your data stays in your browser. No information is sent to the cloud.',
  },
  form: {
    select: 'Select a form',
    submit: 'Submit',
    save: 'Save draft',
    clear: 'Clear',
    back: 'Back',
    next: 'Next',
    review: 'Review',
    required: 'Required',
    optional: 'Optional',
  },
  validation: {
    required: 'This field is required',
    invalidFormat: 'Invalid format',
    minLength: 'Must be at least {{min}} characters',
    maxLength: 'Must be at most {{max}} characters',
    invalidEmiratesId: 'Invalid Emirates ID format',
    invalidMobile: 'Invalid mobile number format',
    invalidTradeLicense: 'Invalid trade license format',
  },
  assistant: {
    explain: 'Explain this field',
    refine: 'Refine answer',
    help: 'Help',
    thinking: 'Thinking...',
    fallback: 'AI assistance is not available. Please refer to the help text.',
  },
  privacy: {
    mode: 'Privacy Mode',
    localOnly: 'All processing happens locally',
    noCloud: 'No data leaves your browser',
  },
} as const
