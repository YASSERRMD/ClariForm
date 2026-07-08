export const ar = {
  app: {
    name: 'ClariForm',
    tagline: 'مساعدة خاصة بالاستمارات ثنائية اللغة',
  },
  header: {
    home: 'الرئيسية',
    forms: 'الاستمارات',
    settings: 'الإعدادات',
  },
  footer: {
    privacy: 'بياناتك تبقى في متصفحك. لا يتم إرسال أي معلومات إلى السحابة.',
  },
  form: {
    select: 'اختر استمارة',
    submit: 'إرسال',
    save: 'حفظ مسودة',
    clear: 'مسح',
    back: 'رجوع',
    next: 'التالي',
    review: 'مراجعة',
    required: 'مطلوب',
    optional: 'اختياري',
  },
  validation: {
    required: 'هذا الحقل مطلوب',
    invalidFormat: 'تنسيق غير صالح',
    minLength: 'يجب أن يكون على الأقل {{min}} أحرف',
    maxLength: 'يجب أن يكون على الأكثر {{max}} أحرف',
    invalidEmiratesId: 'تنسيق هوية الإمارات غير صالح',
    invalidMobile: 'تنسيق رقم الجوال غير صالح',
    invalidTradeLicense: 'تنسيق رخصة التجارة غير صالح',
  },
  assistant: {
    explain: 'شرح هذا الحقل',
    refine: 'تحسين الإجابة',
    help: 'مساعدة',
    thinking: 'جاري التفكير...',
    fallback: 'مساعدة الذكاء الاصطناعي غير متاحة. يرجى الرجوع إلى نص المساعدة.',
  },
  privacy: {
    mode: 'وضع الخصوصية',
    localOnly: 'جميع المعالجات تحدث محلياً',
    noCloud: 'لا يتم إرسال أي بيانات خارج متصفحك',
  },
} as const
