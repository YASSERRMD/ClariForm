import type { FormSchema } from '../schema'

export const businessRegistrationForm: FormSchema = {
  id: 'business-registration',
  title: {
    en: 'Business Registration',
    ar: 'تسجيل الأعمال',
  },
  description: {
    en: 'Register your business entity with official authorities',
    ar: 'سجل كيانك التجاري لدى الجهات الرسمية',
  },
  sections: [
    {
      id: 'business-info',
      title: {
        en: 'Business Information',
        ar: 'معلومات العمل',
      },
      fields: [
        {
          id: 'company-name-en',
          type: 'text',
          label: { en: 'Company Name (English)', ar: 'اسم الشركة (إنجليزي)' },
          helpText: {
            en: 'Enter the official English name of your company',
            ar: 'أدخل الاسم الرسمي للشركة بالإنجليزية',
          },
          required: true,
          minLength: 3,
          maxLength: 150,
        },
        {
          id: 'company-name-ar',
          type: 'text',
          label: { en: 'Company Name (Arabic)', ar: 'اسم الشركة (عربي)' },
          helpText: {
            en: 'Enter the official Arabic name of your company',
            ar: 'أدخل الاسم الرسمي للشركة بالعربية',
          },
          required: true,
          minLength: 3,
          maxLength: 150,
        },
        {
          id: 'trade-license',
          type: 'text',
          label: { en: 'Trade License Number', ar: 'رقم رخصة التجارة' },
          helpText: {
            en: 'Enter your trade license number (format: XXXXXXXX)',
            ar: 'أدخل رقم رخصة التجارة (الشكل: XXXXXXXX)',
          },
          required: true,
          pattern: '^[A-Z0-9]{8}$',
        },
        {
          id: 'business-type',
          type: 'select',
          label: { en: 'Business Type', ar: 'نوع العمل' },
          helpText: {
            en: 'Select the type of your business',
            ar: 'اختر نوع عملك',
          },
          required: true,
          options: [
            { value: 'llc', label: { en: 'LLC', ar: 'شركة ذات مسؤولية محدودة' } },
            { value: 'sole', label: { en: 'Sole Proprietorship', ar: 'ملكية فردية' } },
            { value: 'branch', label: { en: 'Branch Office', ar: 'فرع' } },
            { value: 'freezone', label: { en: 'Free Zone Company', ar: 'شركة منطقة حرة' } },
          ],
        },
        {
          id: 'establishment-date',
          type: 'date',
          label: { en: 'Establishment Date', ar: 'تاريخ التأسيس' },
          helpText: {
            en: 'Select the date your business was established',
            ar: 'اختر تاريخ تأسيس عملك',
          },
          required: true,
        },
      ],
    },
    {
      id: 'owner-info',
      title: {
        en: 'Owner Information',
        ar: 'معلومات المالك',
      },
      fields: [
        {
          id: 'owner-name',
          type: 'text',
          label: { en: 'Owner Full Name', ar: 'اسم المالك الكامل' },
          helpText: {
            en: 'Enter the full name of the business owner',
            ar: 'أدخل الاسم الكامل لمالك العمل',
          },
          required: true,
          minLength: 2,
          maxLength: 100,
        },
        {
          id: 'owner-emirates-id',
          type: 'text',
          label: { en: 'Owner Emirates ID', ar: 'هوية الإمارات للمالك' },
          helpText: {
            en: 'Enter the owner Emirates ID number',
            ar: 'أدخل رقم هوية الإمارات للمالك',
          },
          required: true,
          pattern: '^784-[0-9]{4}-[0-9]{7}-[0-9]$',
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
            { id: 'trade-license-copy', label: { en: 'Trade License Copy', ar: 'نسخة رخصة التجارة' } },
            { id: 'owner-passport', label: { en: 'Owner Passport Copy', ar: 'نسخة جواز المالك' } },
            { id: 'owner-emirates-id-copy', label: { en: 'Owner Emirates ID Copy', ar: 'نسخة هوية الإمارات للمالك' } },
            { id: 'memorandum', label: { en: 'Memorandum of Association', ar: 'عقد التأسيس' } },
          ],
        },
      ],
    },
  ],
}
