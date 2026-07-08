import type { FormSchema } from '../schema'

export const serviceRequestForm: FormSchema = {
  id: 'service-request',
  title: {
    en: 'Service Request',
    ar: 'طلب خدمة',
  },
  description: {
    en: 'Submit a request for government services',
    ar: 'تقديم طلب لخدمات الحكومة',
  },
  sections: [
    {
      id: 'requester-info',
      title: {
        en: 'Requester Information',
        ar: 'معلومات مقدم الطلب',
      },
      fields: [
        {
          id: 'requester-name',
          type: 'text',
          label: { en: 'Requester Name', ar: 'اسم مقدم الطلب' },
          helpText: {
            en: 'Enter your full name',
            ar: 'أدخل اسمك الكامل',
          },
          required: true,
          minLength: 2,
          maxLength: 100,
        },
        {
          id: 'requester-id',
          type: 'text',
          label: { en: 'Emirates ID', ar: 'هوية الإمارات' },
          helpText: {
            en: 'Enter your Emirates ID number',
            ar: 'أدخل رقم هوية الإمارات',
          },
          required: true,
          pattern: '^784-[0-9]{4}-[0-9]{7}-[0-9]$',
        },
        {
          id: 'requester-mobile',
          type: 'text',
          label: { en: 'Mobile Number', ar: 'رقم الجوال' },
          helpText: {
            en: 'Enter your UAE mobile number',
            ar: 'أدخل رقم جوالك في الإمارات',
          },
          required: true,
          pattern: '^\\+971[0-9]{9}$',
        },
      ],
    },
    {
      id: 'service-details',
      title: {
        en: 'Service Details',
        ar: 'تفاصيل الخدمة',
      },
      fields: [
        {
          id: 'service-type',
          type: 'select',
          label: { en: 'Service Type', ar: 'نوع الخدمة' },
          helpText: {
            en: 'Select the type of service you need',
            ar: 'اختر نوع الخدمة التي تحتاجها',
          },
          required: true,
          options: [
            { value: 'certificate', label: { en: 'Certificate Request', ar: 'طلب شهادة' } },
            { value: 'renewal', label: { en: 'Document Renewal', ar: 'تجديد مستند' } },
            { value: 'transfer', label: { en: 'Transfer Request', ar: 'طلب تحويل' } },
            { value: 'complaint', label: { en: 'Complaint', ar: 'شكوى' } },
          ],
        },
        {
          id: 'description',
          type: 'text',
          label: { en: 'Description', ar: 'الوصف' },
          helpText: {
            en: 'Describe your request in detail',
            ar: 'صف طلبك بالتفصيل',
          },
          required: true,
          minLength: 10,
          maxLength: 500,
        },
        {
          id: 'preferred-date',
          type: 'date',
          label: { en: 'Preferred Date', ar: 'التاريخ المفضل' },
          helpText: {
            en: 'Select your preferred appointment date',
            ar: 'اختر تاريخ الموعد المفضل',
          },
          required: false,
          minDate: new Date().toISOString().split('T')[0],
        },
      ],
    },
    {
      id: 'documents',
      title: {
        en: 'Supporting Documents',
        ar: 'المستندات الداعمة',
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
            { id: 'id-copy', label: { en: 'Emirates ID Copy', ar: 'نسخة هوية الإمارات' } },
            { id: 'supporting-letter', label: { en: 'Supporting Letter', ar: 'خطاب داعم' } },
            { id: 'previous-docs', label: { en: 'Previous Documents', ar: 'مستندات سابقة' } },
          ],
        },
      ],
    },
  ],
}
