import type { FormSchema } from '../schema'

export const individualProfileForm: FormSchema = {
  id: 'individual-profile',
  title: {
    en: 'Individual Profile',
    ar: 'الملف الشخصي للأفراد',
  },
  description: {
    en: 'Personal information form for individual registration',
    ar: 'استمارة المعلومات الشخصية لتسجيل الأفراد',
  },
  sections: [
    {
      id: 'personal-info',
      title: {
        en: 'Personal Information',
        ar: 'المعلومات الشخصية',
      },
      fields: [
        {
          id: 'full-name-en',
          type: 'text',
          label: { en: 'Full Name (English)', ar: 'الاسم الكامل (إنجليزي)' },
          helpText: {
            en: 'Enter your full name as it appears on your passport',
            ar: 'أدخل اسمك الكامل كما يظهر في جواز سفرك',
          },
          required: true,
          minLength: 2,
          maxLength: 100,
        },
        {
          id: 'full-name-ar',
          type: 'text',
          label: { en: 'Full Name (Arabic)', ar: 'الاسم الكامل (عربي)' },
          helpText: {
            en: 'Enter your full name in Arabic',
            ar: 'أدخل اسمك الكامل بالعربية',
          },
          required: true,
          minLength: 2,
          maxLength: 100,
        },
        {
          id: 'emirates-id',
          type: 'text',
          label: { en: 'Emirates ID', ar: 'هوية الإمارات' },
          helpText: {
            en: 'Enter your 15-digit Emirates ID number (format: 784-XXXX-XXXXXXX-X)',
            ar: 'أدخل رقم هوية الإمارات المكون من 15 رقماً (الشكل: 784-XXXX-XXXXXXX-X)',
          },
          required: true,
          pattern: '^784-[0-9]{4}-[0-9]{7}-[0-9]$',
        },
        {
          id: 'date-of-birth',
          type: 'date',
          label: { en: 'Date of Birth', ar: 'تاريخ الميلاد' },
          helpText: {
            en: 'Select your date of birth',
            ar: 'اختر تاريخ ميلادك',
          },
          required: true,
          maxDate: '2006-01-01',
        },
        {
          id: 'nationality',
          type: 'select',
          label: { en: 'Nationality', ar: 'الجنسية' },
          helpText: {
            en: 'Select your nationality',
            ar: 'اختر جنسيتك',
          },
          required: true,
          options: [
            { value: 'uae', label: { en: 'Emirati', ar: 'إماراتي' } },
            { value: 'sa', label: { en: 'Saudi', ar: 'سعودي' } },
            { value: 'eg', label: { en: 'Egyptian', ar: 'مصري' } },
            { value: 'other', label: { en: 'Other', ar: 'أخرى' } },
          ],
        },
      ],
    },
    {
      id: 'contact-info',
      title: {
        en: 'Contact Information',
        ar: 'معلومات الاتصال',
      },
      fields: [
        {
          id: 'mobile',
          type: 'text',
          label: { en: 'Mobile Number', ar: 'رقم الجوال' },
          helpText: {
            en: 'Enter your UAE mobile number (format: +971XXXXXXXXX)',
            ar: 'أدخل رقم جوالك في الإمارات (الشكل: +971XXXXXXXXX)',
          },
          required: true,
          pattern: '^\\+971[0-9]{9}$',
        },
        {
          id: 'email',
          type: 'text',
          label: { en: 'Email Address', ar: 'البريد الإلكتروني' },
          helpText: {
            en: 'Enter your email address',
            ar: 'أدخل بريدك الإلكتروني',
          },
          required: true,
          pattern: '^[^@]+@[^@]+\\.[^@]+$',
        },
      ],
    },
    {
      id: 'documents',
      title: {
        en: 'Required Documents',
        ar: 'المستندات المطلوبة',
      },
      fields: [
        {
          id: 'required-docs',
          type: 'file-checklist',
          label: { en: 'Document Checklist', ar: 'قائمة المستندات' },
          helpText: {
            en: 'Check the documents you have ready',
            ar: 'حدد المستندات التي لديك',
          },
          required: true,
          items: [
            { id: 'passport', label: { en: 'Passport Copy', ar: 'نسخة جواز السفر' } },
            { id: 'emirates-id-copy', label: { en: 'Emirates ID Copy', ar: 'نسخة هوية الإمارات' } },
            { id: 'photo', label: { en: 'Passport Photo', ar: 'صورة جواز السفر' } },
          ],
        },
      ],
    },
  ],
}
