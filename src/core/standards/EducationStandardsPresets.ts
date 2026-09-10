/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * الرقيم التربوي - حزم البيانات والمعايير العربية المرجعية (Preset Profiles & Engine Registry)
 * برمجة وتصميم وتطوير المهندس سهيل الهزبري
 */

import { 
  CountryProfile, 
  DocumentTypeDefinition, 
  GradeSystem, 
  BrandProfile, 
  TypographyStandard,
  TableStandard,
  HeaderStandard,
  FooterStandard,
  AuthorityProfile
} from './EducationStandardsTypes';

/**
 * 1. الدول والكيانات التعليمية العربية (قابلة للإضافة والتعديل التام)
 */
export const PRESET_COUNTRIES: CountryProfile[] = [
  {
    id: 'ye',
    name: 'الجمهورية اليمنية',
    flagEmoji: '🇾🇪',
    defaultMinistryName: 'وزارة التربية والتعليم والبحث العلمي',
    administrativeHierarchy: {
      level1Name: 'الوزارة',
      level2Name: 'قطاع المناهج والتوجيه',
      level3Name: 'مكتب التربية والتعليم بالأمانة / المحافظة',
      level4Name: 'إدارة التربية والتعليم بالمديرية',
      level5Name: 'المدرسة / الثانوية',
    },
    defaultGradingScaleId: 'scale_100_ye',
    defaultPaperSize: 'A4',
  },
  {
    id: 'sa',
    name: 'المملكة العربية السعودية',
    flagEmoji: '🇸🇦',
    defaultMinistryName: 'وزارة التعليم',
    administrativeHierarchy: {
      level1Name: 'الوزارة',
      level2Name: 'وكالة التعليم العام',
      level3Name: 'الإدارة العامة للتعليم بالمنطقة',
      level4Name: 'مكتب التعليم',
      level5Name: 'المدرسة',
    },
    defaultGradingScaleId: 'scale_100_standard',
    defaultPaperSize: 'A4',
  },
  {
    id: 'eg',
    name: 'جمهورية مصر العربية',
    flagEmoji: '🇪🇬',
    defaultMinistryName: 'وزارة التربية والتعليم والتعليم الفني',
    administrativeHierarchy: {
      level1Name: 'الوزارة',
      level2Name: 'قطاع التعليم العام',
      level3Name: 'مديرية التربية والتعليم بالمحافظة',
      level4Name: 'الإدارة التعليمية',
      level5Name: 'المدرسة',
    },
    defaultGradingScaleId: 'scale_100_standard',
    defaultPaperSize: 'A4',
  },
  {
    id: 'om',
    name: 'سلطنة عمان',
    flagEmoji: '🇴🇲',
    defaultMinistryName: 'وزارة التربية والتعليم',
    administrativeHierarchy: {
      level1Name: 'الوزارة',
      level2Name: 'المديرية العامة للمناهج والتقويم',
      level3Name: 'المديرية العامة للتربية والتعليم بالمحافظة',
      level4Name: 'دائرة الإشراف التربوي',
      level5Name: 'المدرسة',
    },
    defaultGradingScaleId: 'scale_100_standard',
    defaultPaperSize: 'A4',
  },
  {
    id: 'ae',
    name: 'الإمارات العربية المتحدة',
    flagEmoji: '🇦🇪',
    defaultMinistryName: 'مؤسسة الإمارات للتعليم المدرسي / وزارة التربية والتعليم',
    administrativeHierarchy: {
      level1Name: 'الوزارة / المؤسسة',
      level2Name: 'قطاع العمليات المدرسية',
      level3Name: 'النطاق التعليمي / الإمارة',
      level4Name: 'المجمع التعليمي',
      level5Name: 'المدرسة',
    },
    defaultGradingScaleId: 'scale_100_standard',
    defaultPaperSize: 'A4',
  },
  {
    id: 'jo',
    name: 'المملكة الأردنية الهاشمية',
    flagEmoji: '🇯🇴',
    defaultMinistryName: 'وزارة التربية والتعليم',
    administrativeHierarchy: {
      level1Name: 'الوزارة',
      level2Name: 'إدارة الامتحانات والاختبارات',
      level3Name: 'مديرية التربية والتعليم بالمحافظة',
      level4Name: 'قسم الامتحانات',
      level5Name: 'المدرسة',
    },
    defaultGradingScaleId: 'scale_100_standard',
    defaultPaperSize: 'A4',
  },
  {
    id: 'iq',
    name: 'جمهورية العراق',
    flagEmoji: '🇮🇶',
    defaultMinistryName: 'وزارة التربية',
    administrativeHierarchy: {
      level1Name: 'الوزارة',
      level2Name: 'المديرية العامة للتقويم والامتحانات',
      level3Name: 'المديرية العامة لتربية المحافظة',
      level4Name: 'قسم التربية في القضاء',
      level5Name: 'المدرسة',
    },
    defaultGradingScaleId: 'scale_100_standard',
    defaultPaperSize: 'A4',
  },
  {
    id: 'custom_authority',
    name: 'جهة تعليمية خاصة / مركز تدريب / مدرسة أهلية',
    flagEmoji: '🏫',
    defaultMinistryName: 'الإدارة العامة للتعليم الأهلي والخاص',
    administrativeHierarchy: {
      level1Name: 'المؤسسة / الإدارة العامة',
      level2Name: 'الفرع أو المنطقة',
      level3Name: 'المجمع التعليمي',
      level4Name: 'القسم التعليمي',
      level5Name: 'الشعبة أو القاعة',
    },
    defaultGradingScaleId: 'scale_100_standard',
    defaultPaperSize: 'A4',
  },
];

/**
 * 2. تصنيفات وأنواع الوثائق التعليمية الشاملة
 */
export const PRESET_DOCUMENT_TYPES: DocumentTypeDefinition[] = [
  // فئة الامتحانات
  {
    id: 'exam_monthly',
    category: 'exam',
    name: 'امتحان شهري دوري',
    description: 'اختبار تقييمي دوري يقيس تحصيل وحدة أو شهر دراسي.',
    defaultPageOrientation: 'portrait',
    recommendedPaperSize: 'A4',
    headerType: 'full_formal',
    hasGradeSystem: true,
    hasTableStandard: false,
    complianceLevel: 'official_looking',
  },
  {
    id: 'exam_term_final',
    category: 'exam',
    name: 'امتحان نهاية الفصل الدراسي',
    description: 'اختبار تحريري رسمي شامل مع جدول توزيع الدرجات واللجان.',
    defaultPageOrientation: 'portrait',
    recommendedPaperSize: 'A4',
    headerType: 'full_formal',
    hasGradeSystem: true,
    hasTableStandard: true,
    complianceLevel: 'official_looking',
  },
  {
    id: 'exam_short_quiz',
    category: 'exam',
    name: 'اختبار قصير (Quiz / شفهي / عملي)',
    description: 'ورقة اختبار مركزة لتقويم سريع للدروس اليومية.',
    defaultPageOrientation: 'portrait',
    recommendedPaperSize: 'A4',
    headerType: 'compact',
    hasGradeSystem: true,
    hasTableStandard: false,
    complianceLevel: 'official_looking',
  },
  {
    id: 'exam_omr_bubble',
    category: 'exam',
    name: 'امتحان مؤتمت بنظام التظليل OMR',
    description: 'نموذج أسئلة موضوعية متكامل مع ورقة الإجابة والتصحيح الآلي.',
    defaultPageOrientation: 'portrait',
    recommendedPaperSize: 'A4',
    headerType: 'full_formal',
    hasGradeSystem: true,
    hasTableStandard: true,
    complianceLevel: 'official_looking',
  },

  // فئة النتائج والكشوفات
  {
    id: 'records_grade_sheet',
    category: 'records',
    name: 'كشف رصد درجات الطلاب الشهري / الفصلي',
    description: 'جدول رصد أعمال السنة، الحضور، الشفهي، والامتحان التحريري.',
    defaultPageOrientation: 'landscape',
    recommendedPaperSize: 'A4',
    headerType: 'full_formal',
    hasGradeSystem: true,
    hasTableStandard: true,
    complianceLevel: 'official_looking',
  },
  {
    id: 'records_final_results',
    category: 'records',
    name: 'مبيضّة النتائج النهائية ولوحة الشرف',
    description: 'سجل إعلان نتائج نهاية العام الدراسي والتقديرات والترتيب.',
    defaultPageOrientation: 'landscape',
    recommendedPaperSize: 'A3',
    headerType: 'full_formal',
    hasGradeSystem: true,
    hasTableStandard: true,
    complianceLevel: 'official_looking',
  },
  {
    id: 'records_attendance_log',
    category: 'records',
    name: 'سجل حصر الحضور والغياب اليومي',
    description: 'كشف متابعة انضباط الطلاب الأسبوعي والشهري.',
    defaultPageOrientation: 'landscape',
    recommendedPaperSize: 'A4',
    headerType: 'compact',
    hasGradeSystem: false,
    hasTableStandard: true,
    complianceLevel: 'official_looking',
  },

  // فئة الشهادات والوثائق
  {
    id: 'cert_excellence',
    category: 'certificate',
    name: 'شهادة تقدير وتفوق أكاديمي',
    description: 'شهادة تكريم رسمي للطالب المتفوق بالوسام والإطار التراثي.',
    defaultPageOrientation: 'landscape',
    recommendedPaperSize: 'A4',
    headerType: 'simple',
    hasGradeSystem: false,
    hasTableStandard: false,
    complianceLevel: 'official_looking',
  },
  {
    id: 'cert_graduation',
    category: 'certificate',
    name: 'وثيقة تخرج وإتمام مرحلة دراسية',
    description: 'وثيقة تخرج معتمدة تحتوي المعدل والتقدير وبيانات السجل.',
    defaultPageOrientation: 'portrait',
    recommendedPaperSize: 'A4',
    headerType: 'full_formal',
    hasGradeSystem: true,
    hasTableStandard: true,
    complianceLevel: 'official_looking',
  },

  // فئة الوثائق الإدارية
  {
    id: 'admin_memo',
    category: 'administrative',
    name: 'مذكرة / تعميم إداري رسمي',
    description: 'خطاب إداري مدرسي لتوجيه الإعلانات والقرارات والتعليمات.',
    defaultPageOrientation: 'portrait',
    recommendedPaperSize: 'A4',
    headerType: 'full_formal',
    hasGradeSystem: false,
    hasTableStandard: false,
    complianceLevel: 'official_looking',
  },
  {
    id: 'admin_assignment_order',
    category: 'administrative',
    name: 'أمر تكليف رسمي / محضر اجتماع',
    description: 'وثيقة إسناد مهام أو توثيق اجتماعات المجالس المدرسية.',
    defaultPageOrientation: 'portrait',
    recommendedPaperSize: 'A4',
    headerType: 'full_formal',
    hasGradeSystem: false,
    hasTableStandard: true,
    complianceLevel: 'official_looking',
  },

  // فئة الوثائق التعليمية
  {
    id: 'edu_lesson_plan',
    category: 'educational',
    name: 'دفتر تحضير الدروس اليومي',
    description: 'خطة تنفيذ الحصة الدراسية وفق المعايير التربوية ونواتج التعلم.',
    defaultPageOrientation: 'portrait',
    recommendedPaperSize: 'A4',
    headerType: 'compact',
    hasGradeSystem: false,
    hasTableStandard: true,
    complianceLevel: 'official_looking',
  },
  {
    id: 'edu_book_binder',
    category: 'educational',
    name: 'ملزمة تعليمية / كتيب مدرسي شامل',
    description: 'كتاب دراسي أو ملزمة مراجعة متعددة الفصول والأبواب.',
    defaultPageOrientation: 'portrait',
    recommendedPaperSize: 'A4',
    headerType: 'simple',
    hasGradeSystem: false,
    hasTableStandard: true,
    complianceLevel: 'official_looking',
  },
];

/**
 * 3. أنظمة التقدير والدرجات المعيارية
 */
export const PRESET_GRADE_SYSTEMS: GradeSystem[] = [
  {
    id: 'scale_100_standard',
    name: 'المعيار المئوي القياسي (100 درجة)',
    countryId: 'global',
    passingScore: 50,
    maxScore: 100,
    rules: [
      { minPercentage: 90, maxPercentage: 100, label: 'ممتاز', gpaEquivalent: 4.0, isPassing: true, badgeColor: '#047857' },
      { minPercentage: 80, maxPercentage: 89.9, label: 'جيد جداً', gpaEquivalent: 3.5, isPassing: true, badgeColor: '#0284c7' },
      { minPercentage: 70, maxPercentage: 79.9, label: 'جيد', gpaEquivalent: 3.0, isPassing: true, badgeColor: '#4f46e5' },
      { minPercentage: 60, maxPercentage: 69.9, label: 'مقبول', gpaEquivalent: 2.0, isPassing: true, badgeColor: '#d97706' },
      { minPercentage: 50, maxPercentage: 59.9, label: 'ضعيف (ناجح حافة)', gpaEquivalent: 1.0, isPassing: true, badgeColor: '#b45309' },
      { minPercentage: 0, maxPercentage: 49.9, label: 'راسب (يحق له الإعادة)', gpaEquivalent: 0.0, isPassing: false, badgeColor: '#be123c' },
    ],
  },
  {
    id: 'scale_100_ye',
    name: 'معيار التقويم والامتحانات (المعدل المئوي المعتمد)',
    countryId: 'ye',
    passingScore: 50,
    maxScore: 100,
    rules: [
      { minPercentage: 90, maxPercentage: 100, label: 'ممتاز', isPassing: true, badgeColor: '#047857' },
      { minPercentage: 80, maxPercentage: 89.9, label: 'جيد جداً', isPassing: true, badgeColor: '#0284c7' },
      { minPercentage: 65, maxPercentage: 79.9, label: 'جيد', isPassing: true, badgeColor: '#4f46e5' },
      { minPercentage: 50, maxPercentage: 64.9, label: 'مقبول', isPassing: true, badgeColor: '#d97706' },
      { minPercentage: 0, maxPercentage: 49.9, label: 'راسب / مكمّل', isPassing: false, badgeColor: '#be123c' },
    ],
  },
];

/**
 * 4. الإعدادات الافتراضية لعناصر الهوية والطباعة
 */
export const DEFAULT_TYPOGRAPHY_STANDARD: TypographyStandard = {
  primaryFont: "'Cairo', sans-serif",
  secondaryFont: "'Amiri', serif",
  mathFont: "'STIX Two Math', serif",
  bodyFontSize: 14,
  headerFontSize: 13,
  titleFontSize: 18,
  lineHeight: 1.6,
  letterSpacing: 0,
  direction: 'rtl',
};

export const DEFAULT_TABLE_STANDARD: TableStandard = {
  showBorder: true,
  borderWidth: 1.5,
  borderColor: '#334155',
  repeatHeaderOnPageBreak: true,
  headerBgColor: '#f1f5f9',
  alternateRowBg: true,
  paddingY: 6,
  paddingX: 8,
  fontSize: 12,
};

export const DEFAULT_HEADER_STANDARD: HeaderStandard = {
  showCountryName: true,
  showMinistry: true,
  showGovernorate: true,
  showDirectorate: true,
  showSchoolName: true,
  showEmblem: true,
  showDocumentTitle: true,
  showAcademicYear: true,
  showTerm: true,
  showRefNumber: true,
  showDate: true,
  emblemSize: 52,
  headerBorderBottom: true,
};

export const DEFAULT_FOOTER_STANDARD: FooterStandard = {
  showPageNumber: true,
  showTotalPages: true,
  showDocumentId: true,
  showPrintDate: true,
  showSchoolSignature: true,
  showDeveloperCredit: true,
  developerCreditText: 'الرقيم التربوي — برمجة وتصميم المهندس سهيل الهزبري',
};

export const DEFAULT_BRAND_PROFILE: BrandProfile = {
  id: 'brand_formal_navy',
  name: 'الهوية الرسمية الكلاسيكية (كحلي ملكي)',
  primaryColor: '#004B6E',
  accentColor: '#4f46e5',
  darkColor: '#0f172a',
  neutralBg: '#ffffff',
  borderStyle: 'classic_formal',
  watermarkOpacity: 0.04,
};
