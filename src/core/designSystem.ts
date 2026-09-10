/**
 * Raqeem Unified Design System (نظام تصميم الرقيم الموحد)
 * Central design tokens, color palettes, workspace modes, typography, and UI guidelines.
 */

export const RaqeemDesignSystem = {
  brand: {
    name: 'الرقيم',
    title: 'منصة الرقيم للنشر والتحرير التعليمي',
    version: '3.5 Pro',
  },
  colors: {
    primary: {
      50: '#f0f3ff',
      100: '#e0e7ff',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      900: '#1e1b4b',
    },
    emerald: {
      50: '#ecfdf5',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
    },
    amber: {
      50: '#fffbeb',
      400: '#fbbf24',
      600: '#d97706',
    },
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    }
  },
  typography: {
    fontFamilies: {
      arabicDefault: "'Amiri', 'Traditional Arabic', 'Sakkal Majalla', serif",
      arabicModern: "'Noto Naskh Arabic', 'Cairo', sans-serif",
      arabicHeadline: "'Reem Kufi', 'Scheherazade New', serif",
      mathLaTeX: "'STIX Two Math', 'Times New Roman', serif",
    },
    scales: {
      xs: '0.75rem',  // 12px
      sm: '0.875rem', // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem',// 30px
    }
  },
  workspaces: [
    {
      id: 'exam',
      label: 'مساحة الامتحانات والأتمتة',
      description: 'إعداد الامتحانات الوطنية، بنك الأسئلة، التصحيح الآلي، وجداول المواصفات',
      icon: 'FileSpreadsheet',
      accentColor: 'indigo',
    },
    {
      id: 'book',
      label: 'مساحة الكتب والمذكرات',
      description: 'تأليف المناهج، المذكرات الرسمية، وتصميم الملازم المدرسية متعددة الصفحات',
      icon: 'BookOpen',
      accentColor: 'emerald',
    },
    {
      id: 'certificate',
      label: 'مساحة الشهادات والنتائج',
      description: 'تصميم شهادات التقدير، بطاقات الجلوس، وكشوف درجات الطلاب الشاملة',
      icon: 'Award',
      accentColor: 'amber',
    },
    {
      id: 'documents',
      label: 'مساحة الخطط والتحضير',
      description: 'إعداد الخطط الدراسية اليومية والفصلية، وسجلات الحضور والغياب اليومي',
      icon: 'Calendar',
      accentColor: 'blue',
    },
  ],
  keyboardShortcuts: [
    { key: 'Ctrl + Shift + P', description: 'فتح لوحة الأوامر السريعة (Command Palette)' },
    { key: 'Ctrl + Z', description: 'تراجع عن العمل الأخير (Undo)' },
    { key: 'Ctrl + Y / Ctrl + Shift + Z', description: 'إعادة العمل المتراجع عنه (Redo)' },
    { key: 'Ctrl + P', description: 'طباعة فورية عالية الدقة' },
    { key: 'Ctrl + S', description: 'حفظ المشروع تلقائياً' },
    { key: 'Ctrl + Shift + F', description: 'فتح مكتبة الخطوط العربية واللاتينية' },
    { key: 'Ctrl + + / Ctrl + -', description: 'تكبير وتصغير مساحة العمل (Zoom)' },
  ]
};
