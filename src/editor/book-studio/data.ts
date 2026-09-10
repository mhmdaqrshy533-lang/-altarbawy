import { 
  DocumentTypeConfig, 
  ColorPalette, 
  FontPairing, 
  CoverSettings, 
  BookOutlineItem,
  BookSubject,
  BookDocumentType
} from './types';

export const DOCUMENT_TYPE_CONFIGS: DocumentTypeConfig[] = [
  {
    id: 'book',
    title: 'كتاب من هجي جديد',
    subtitle: 'تأليف وتنسيق كتاب مدرسي متكامل وفق المعايير الوزارية',
    iconName: 'BookOpen',
    badge: 'شامل',
    gradient: 'from-blue-600 to-indigo-800',
    description: 'كتاب تعليمي رسمي يحتوي على وحدات، فصول، دروش، أهداف تعليمية، وأنشطة تقويمية.',
    defaultPagesCount: 12
  },
  {
    id: 'booklet',
    title: 'ملزمة تعليمية',
    subtitle: 'إعداد ملزمة مراجعة وشرح مبسط للدروس والوحدات',
    iconName: 'BookMarked',
    badge: 'شائع',
    gradient: 'from-indigo-600 to-violet-800',
    description: 'ملزمة مساعدة للطلاب تجمع بين الملخصات المركزة والتدريبات التطبيقية النمطية.',
    defaultPagesCount: 8
  },
  {
    id: 'teacher_guide',
    title: 'دليل المعلم',
    subtitle: 'دليل استرشادي لتنفيذ المنهج والاستراتيجيات والحلول',
    iconName: 'Award',
    badge: 'للمعلم',
    gradient: 'from-emerald-600 to-teal-800',
    description: 'دليل كامل للمدرس يشمل توزيع المنهج، الخطط الفصلية، الإجابات النموذجية، والوسائل.',
    defaultPagesCount: 10
  },
  {
    id: 'activity_workbook',
    title: 'كراسة النشاط والتطبيقات',
    subtitle: 'كراسة تفاعلية للأنشطة والمهارات والواجبات المنزلية',
    iconName: 'FileSpreadsheet',
    badge: 'تفاعلي',
    gradient: 'from-amber-500 to-amber-700',
    description: 'مساحة مخصصة للطالب لحل التمارين، رسم المخططات، وتنفيذ التجارب الاستكشافية.',
    defaultPagesCount: 6
  },
  {
    id: 'exercise_book',
    title: 'كتاب التدريبات المكثفة',
    subtitle: 'بنك تمارين وشواهد ومسائل امتحانية متنوعة',
    iconName: 'CheckSquare',
    badge: 'تمارين',
    gradient: 'from-purple-600 to-pink-700',
    description: 'تجمعات تدريبية مبوبة حسب الأهداف التعليمية لزيادة تحصيل الطالب قبل الاختبارات.',
    defaultPagesCount: 8
  },
  {
    id: 'revision_guide',
    title: 'كتاب المراجعة النهائية',
    subtitle: 'ملخص شامل وخارطة مفاهيم للمراجعة السريعة',
    iconName: 'Sparkles',
    badge: 'مكثف',
    gradient: 'from-rose-600 to-rose-800',
    description: 'مراجعة مركزة ليلة الامتحان تحتوي على خرائط الذهن، الملخصات الشجرية، والأسئلة الهامة.',
    defaultPagesCount: 6
  },
  {
    id: 'solution_manual',
    title: 'كتاب الحلول والإجابات',
    subtitle: 'دليل إجابات نموذجية ودقيقة لأسئلة المنهج',
    iconName: 'CheckCircle2',
    badge: 'إجابات',
    gradient: 'from-teal-600 to-emerald-900',
    description: 'حلول خطوة بخطوة لجميع تمارين الكتاب المدرسي والمسائل الحسابية.',
    defaultPagesCount: 6
  },
  {
    id: 'question_bank_book',
    title: 'كتاب بنك الأسئلة',
    subtitle: 'موسوعة أسئلة موضوعية ومقالية شاملة للمنهج',
    iconName: 'HelpCircle',
    badge: 'بنك أسئلة',
    gradient: 'from-cyan-600 to-blue-800',
    description: 'بنك أسئلة مصنف حسب المخرجات والمستويات المعرفية (تذكر، فهم، تطبيق، تحليل).',
    defaultPagesCount: 10
  },
  {
    id: 'lab_manual',
    title: 'دليل المختبر والتجارب',
    subtitle: 'دليل التجارب الميدانية والمعملية للأحياء والفيزياء والكيمياء',
    iconName: 'FlaskConical',
    badge: 'علمي',
    gradient: 'from-emerald-600 to-cyan-800',
    description: 'خطوات العمل المعملي، احتياطات السلامة، وتوثيق النتائج والملاحظات والمشاهدات.',
    defaultPagesCount: 6
  },
  {
    id: 'instructional_booklet',
    title: 'كتيب تعليمي إرشادي',
    subtitle: 'كتيب إرشادي مصور لشرح مهارة أو موضوع محدد',
    iconName: 'Layout',
    badge: 'إرشادي',
    gradient: 'from-sky-600 to-indigo-800',
    description: 'كتيب صغير الحجم سهل القراءة موجه للطلاب أو أولياء الأمور لتوضيح المفاهيم.',
    defaultPagesCount: 4
  },
  {
    id: 'school_magazine',
    title: 'مجلة مدرسية تربوية',
    subtitle: 'إخراج مجلة دورية للمدرسة أو النادي العلمي والأنشطة',
    iconName: 'Newspaper',
    badge: 'إعلامي',
    gradient: 'from-fuchsia-600 to-purple-800',
    description: 'مجلة أنيقة لعرض إنجازات الطلاب، المقالات التربوية، والمسابقات المدرسية.',
    defaultPagesCount: 8
  },
  {
    id: 'educational_bulletin',
    title: 'نشرة تربوية وثقافية',
    subtitle: 'نشرة موجزة للتوعية والتعليم والتوجيه الإداري والتربوي',
    iconName: 'FileText',
    badge: 'توعوي',
    gradient: 'from-slate-700 to-slate-900',
    description: 'وثيقة تربوية دورية تصدر عن الإدارة أو المعلمين لتوجيه النصائح والإرشادات.',
    defaultPagesCount: 2
  }
];

export const SMART_COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'science_blue',
    name: 'أزرق العلوم والتقنية (Science Blue)',
    primary: '#1e40af',
    secondary: '#3b82f6',
    accent: '#0284c7',
    background: '#f8fafc',
    surface: '#ffffff',
    textPrimary: '#0f172a',
    textSecondary: '#475569'
  },
  {
    id: 'islamic_emerald',
    name: 'أخضر التربية الإسلامية (Islamic Emerald)',
    primary: '#065f46',
    secondary: '#10b981',
    accent: '#d97706',
    background: '#f0fdf4',
    surface: '#ffffff',
    textPrimary: '#064e3b',
    textSecondary: '#374151'
  },
  {
    id: 'math_amber',
    name: 'برتقالي الرياضيات والدقة (Math Amber)',
    primary: '#c2410c',
    secondary: '#f97316',
    accent: '#4338ca',
    background: '#fff7ed',
    surface: '#ffffff',
    textPrimary: '#431407',
    textSecondary: '#57534e'
  },
  {
    id: 'language_violet',
    name: 'بنفسجي اللغات والأدب (Language Violet)',
    primary: '#5b21b6',
    secondary: '#8b5cf6',
    accent: '#e11d48',
    background: '#f5f3ff',
    surface: '#ffffff',
    textPrimary: '#2e1065',
    textSecondary: '#4c1d95'
  },
  {
    id: 'history_brown',
    name: 'بني التاريخ والمخطوطات (History Ochre)',
    primary: '#78350f',
    secondary: '#b45309',
    accent: '#047857',
    background: '#fef3c7',
    surface: '#ffffff',
    textPrimary: '#451a03',
    textSecondary: '#78350f'
  },
  {
    id: 'geography_turquoise',
    name: 'فيروزي الجغرافيا والطبيعة (Geography Teal)',
    primary: '#0f766e',
    secondary: '#14b8a6',
    accent: '#0284c7',
    background: '#f0fdfa',
    surface: '#ffffff',
    textPrimary: '#134e4a',
    textSecondary: '#334155'
  },
  {
    id: 'reports_slate',
    name: 'رمادي التقارير الإدارية (Executive Slate)',
    primary: '#1e293b',
    secondary: '#475569',
    accent: '#2563eb',
    background: '#f8fafc',
    surface: '#ffffff',
    textPrimary: '#0f172a',
    textSecondary: '#64748b'
  }
];

export const FONT_LIBRARY: FontPairing[] = [
  {
    id: 'amiri_naskh',
    name: 'خط الأميري والأصيل (العناوين الأصيلة والقراءة المريحة)',
    headingFont: 'Amiri',
    bodyFont: 'Amiri',
    captionFont: 'Amiri'
  },
  {
    id: 'cairo_modern',
    name: 'خط القاهرة الحديث (Cairo - للكتب العصرية والتفاعلية)',
    headingFont: 'Cairo',
    bodyFont: 'Cairo',
    captionFont: 'Cairo'
  },
  {
    id: 'tajawal_clean',
    name: 'خط تجوال الرقمي (Tajawal - واضح جداً ومناسب للطلاب)',
    headingFont: 'Tajawal',
    bodyFont: 'Tajawal',
    captionFont: 'Tajawal'
  },
  {
    id: 'ibm_plex_pro',
    name: 'IBM Plex Sans Arabic (للمتلازمات العلمية والرياضية)',
    headingFont: 'IBM Plex Sans Arabic',
    bodyFont: 'IBM Plex Sans Arabic',
    captionFont: 'IBM Plex Sans Arabic'
  },
  {
    id: 'aref_ruqaa_art',
    name: 'عارف رقعة والأميري (للغة العربية والتربية الإسلامية)',
    headingFont: 'Aref Ruqaa',
    bodyFont: 'Amiri',
    captionFont: 'Cairo'
  },
  {
    id: 'reem_kufi_modern',
    name: 'ريم كوفي والقاهرة (للعناوين البارزة والمجلات المدرسية)',
    headingFont: 'Reem Kufi',
    bodyFont: 'Cairo',
    captionFont: 'Tajawal'
  },
  {
    id: 'noto_naskh_edu',
    name: 'Noto Naskh Arabic (الخط المعتمد للطباعة المدرسية)',
    headingFont: 'Noto Naskh Arabic',
    bodyFont: 'Noto Naskh Arabic',
    captionFont: 'Noto Naskh Arabic'
  }
];

export const YEMENI_CURRICULUM_PRESETS = [
  {
    id: 'yemeni_quran',
    subject: 'التربية الإسلامية' as BookSubject,
    mainTitle: 'الْقُرْآنُ الْكَرِيمُ وَعُلُومُهُ',
    subtitle: 'لِلصَّفِّ التَّاسِعِ مِنْ مَرْحَلَةِ التَّعْلِيمِ الأَسَاسِيِّ',
    grade: 'الصف التاسع',
    stage: 'الإعدادية / المتوسطة' as const,
    accentColor: '#047857',
    backgroundColor: '#ecfdf5',
    titleColor: '#064e3b',
    heroGraphicType: 'calligraphy' as const,
    borderStyle: 'islamic_frame' as const,
    authorName: 'الإدارة العامة للمناهج والبرامج',
    reviewerName: 'قطاع المناهج والتوجيه التربوي',
    publisherName: 'وزارة التربية والتعليم — الجمهورية اليمنية',
    editionNumber: '1447 هـ / 2026 م (طبعة معتمدة)',
    badge: 'القرآن الكريم'
  },
  {
    id: 'yemeni_islamic',
    subject: 'التربية الإسلامية' as BookSubject,
    mainTitle: 'التَّرْبِيَةُ الإِسْلَامِيَّةُ',
    subtitle: 'لِلصَّفِّ الْخَامِسِ مِنْ مَرْحَلَةِ التَّعْلِيمِ الأَسَاسِيِّ — (الجزء الأول)',
    grade: 'الصف الخامس',
    stage: 'الابتدائية' as const,
    accentColor: '#065f46',
    backgroundColor: '#f0fdf4',
    titleColor: '#064e3b',
    heroGraphicType: 'calligraphy' as const,
    borderStyle: 'islamic_frame' as const,
    authorName: 'فريق المناهج للتربية الإسلامية',
    reviewerName: 'قطاع المناهج والتوجيه',
    publisherName: 'وزارة التربية والتعليم — الجمهورية اليمنية',
    editionNumber: '1447 هـ / 2026 م (طبعة تجريبية)',
    badge: 'التربية الإسلامية'
  },
  {
    id: 'yemeni_math',
    subject: 'الرياضيات' as BookSubject,
    mainTitle: 'الرِّيَاضِيَّاتُ',
    subtitle: 'لِلصَّفِّ التَّاسِعِ مِنْ مَرْحَلَةِ التَّعْلِيمِ الأَسَاسِيِّ — (الجزء الثاني)',
    grade: 'الصف التاسع',
    stage: 'الإعدادية / المتوسطة' as const,
    accentColor: '#0284c7',
    backgroundColor: '#f0f9ff',
    titleColor: '#0369a1',
    heroGraphicType: 'formula' as const,
    borderStyle: 'modern_grid' as const,
    authorName: 'فريق تطوير مناهج الرياضيات',
    reviewerName: 'الإدارة العامة للمناهج',
    publisherName: 'وزارة التربية والتعليم — الجمهورية اليمنية',
    editionNumber: '1447 هـ / 2026 م',
    badge: 'الرياضيات'
  },
  {
    id: 'yemeni_arabic',
    subject: 'اللغة العربية' as BookSubject,
    mainTitle: 'لُغَتِي العَرَبِيَّةُ',
    subtitle: 'لِلصَّفِّ الخَامِسِ مِنْ مَرْحَلَةِ التَّعْلِيمِ الأَسَاسِيِّ — (الجزء الأول)',
    grade: 'الصف الخامس',
    stage: 'الابتدائية' as const,
    accentColor: '#1d4ed8',
    backgroundColor: '#eff6ff',
    titleColor: '#1e3a8a',
    heroGraphicType: 'calligraphy' as const,
    borderStyle: 'classic' as const,
    authorName: 'لجنة التأليف المنهجي للغة العربية',
    reviewerName: 'قطاع المناهج والتوجيه',
    publisherName: 'وزارة التربية والتعليم — الجمهورية اليمنية',
    editionNumber: '1447 هـ / 2026 م',
    badge: 'لغتي العربية'
  },
  {
    id: 'yemeni_geography',
    subject: 'الجغرافيا' as BookSubject,
    mainTitle: 'جُغْرَافِيَةُ الجُمْهُورِيَّةِ اليَمَنِيَّةِ وَالوَطَنِ العَرَبِيِّ',
    subtitle: 'لِلصَّفِّ التَّاسِعِ مِنْ مَرْحَلَةِ التَّعْلِيمِ الأَسَاسِيِّ',
    grade: 'الصف التاسع',
    stage: 'الإعدادية / المتوسطة' as const,
    accentColor: '#0d9488',
    backgroundColor: '#f0fdfa',
    titleColor: '#115e59',
    heroGraphicType: 'map' as const,
    borderStyle: 'modern_grid' as const,
    authorName: 'قسم الدراسات الاجتماعية والجغرافيا',
    reviewerName: 'الإدارة العامة للمناهج',
    publisherName: 'وزارة التربية والتعليم — الجمهورية اليمنية',
    editionNumber: '1447 هـ / 2026 م',
    badge: 'الجغرافيا'
  },
  {
    id: 'yemeni_history',
    subject: 'التاريخ' as BookSubject,
    mainTitle: 'تَارِيخُ العَرَبِ الحَدِيثُ وَالمُعَاصِرُ',
    subtitle: 'لِلصَّفِّ التَّاسِعِ مِنْ مَرْحَلَةِ التَّعْلِيمِ الأَسَاسِيِّ — (الجزء الأول)',
    grade: 'الصف التاسع',
    stage: 'الإعدادية / المتوسطة' as const,
    accentColor: '#b45309',
    backgroundColor: '#fef3c7',
    titleColor: '#78350f',
    heroGraphicType: 'abstract' as const,
    borderStyle: 'classic' as const,
    authorName: 'فريق أبحاث التاريخ والتراث',
    reviewerName: 'قطاع المناهج والتوجيه',
    publisherName: 'وزارة التربية والتعليم — الجمهورية اليمنية',
    editionNumber: '1447 هـ / 2026 م',
    badge: 'التاريخ'
  },
  {
    id: 'yemeni_science',
    subject: 'العلوم العامة' as BookSubject,
    mainTitle: 'العُـــلُـــــومُ',
    subtitle: 'لِلصَّفِّ الرَّابِعِ مِنْ مَرْحَلَةِ التَّعْلِيمِ الأَسَاسِيِّ — (الجزء الأول)',
    grade: 'الصف الرابع',
    stage: 'الابتدائية' as const,
    accentColor: '#2563eb',
    backgroundColor: '#f8fafc',
    titleColor: '#1e40af',
    heroGraphicType: 'flask' as const,
    borderStyle: 'modern_grid' as const,
    authorName: 'فريق التوجيه التربوي للعلوم',
    reviewerName: 'الإدارة العامة للمناهج',
    publisherName: 'وزارة التربية والتعليم — الجمهورية اليمنية',
    editionNumber: '1447 هـ / 2026 م',
    badge: 'العلوم'
  },
  {
    id: 'yemeni_english',
    subject: 'اللغة الإنجليزية' as BookSubject,
    mainTitle: 'ENGLISH COURSE FOR YEMEN',
    subtitle: "Pupil's Book 1 — Basic Education Stage",
    grade: 'Grade 7 / Basic Stage',
    stage: 'الإعدادية / المتوسطة' as const,
    accentColor: '#4f46e5',
    backgroundColor: '#f5f3ff',
    titleColor: '#312e81',
    heroGraphicType: 'abstract' as const,
    borderStyle: 'minimal_bar' as const,
    authorName: 'Yemeni Curriculum ELT Department',
    reviewerName: 'Ministry of Education Guidance Sector',
    publisherName: 'Republic of Yemen — Ministry of Education',
    editionNumber: '1447 AH / 2026 AD (Experimental Edition)',
    badge: 'English'
  }
];

export const DEFAULT_COVER_SETTINGS: CoverSettings = {
  stylePreset: 'official',
  mainTitle: 'كتاب الرياضيات الشامل',
  subtitle: 'الصف الثالث الثانوي — الجزء الأول',
  authorName: 'أ.د. عبد الله محمد علي',
  reviewerName: 'أ. مراجع عبد القادر',
  publisherName: 'منصة الرقيم للطباعة والنشر التعليمي',
  editionNumber: 'الطبعة الأولى (1448 هـ / 2026 م)',
  publicationYear: '2026 م',
  isbnNumber: '978-9953-0-1234-5',
  qrCodeUrl: 'https://raqeem.edu/book/ver/1001',
  showLogo: true,
  heroGraphicType: 'formula',
  accentColor: '#1e40af',
  backgroundColor: '#f8fafc',
  titleColor: '#0f172a',
  hasDecorativeBorder: true,
  borderStyle: 'islamic_frame'
};

export const getSubjectSuggestedPalette = (subject: BookSubject): ColorPalette => {
  switch (subject) {
    case 'الرياضيات':
      return SMART_COLOR_PALETTES.find(p => p.id === 'math_amber') || SMART_COLOR_PALETTES[2];
    case 'الفيزياء':
    case 'الحاسوب والتقانة':
    case 'العلوم العامة':
      return SMART_COLOR_PALETTES.find(p => p.id === 'science_blue') || SMART_COLOR_PALETTES[0];
    case 'التربية الإسلامية':
      return SMART_COLOR_PALETTES.find(p => p.id === 'islamic_emerald') || SMART_COLOR_PALETTES[1];
    case 'اللغة العربية':
    case 'اللغة الإنجليزية':
      return SMART_COLOR_PALETTES.find(p => p.id === 'language_violet') || SMART_COLOR_PALETTES[3];
    case 'التاريخ':
      return SMART_COLOR_PALETTES.find(p => p.id === 'history_brown') || SMART_COLOR_PALETTES[4];
    case 'الجغرافيا':
    case 'الكيمياء':
    case 'الأحياء':
      return SMART_COLOR_PALETTES.find(p => p.id === 'geography_turquoise') || SMART_COLOR_PALETTES[5];
    default:
      return SMART_COLOR_PALETTES[0];
  }
};

export const generateDefaultBookOutline = (bookTitle: string): BookOutlineItem[] => {
  return [
    { id: 'sec_cover_front', title: 'الغلاف الخارجي الرئيسي', type: 'cover_front', pageIndex: 0 },
    { id: 'sec_copyright', title: 'صفحة حقوق الطبع والنشر والإصدار', type: 'copyright', pageIndex: 1 },
    { id: 'sec_dedication', title: 'صفحة الإهداء والمقدمة الوزارية', type: 'preface', pageIndex: 2 },
    { id: 'sec_toc', title: 'فهرس المحتويات الآلي', type: 'toc', pageIndex: 3 },
    {
      id: 'unit_1',
      title: 'الوحدة الأولى: الأساسيات والمفاهيم الكبرى',
      type: 'unit',
      pageIndex: 4,
      children: [
        { id: 'chap_1_1', title: 'الفصل الأول: المدخل الشامل والتأسيس', type: 'chapter', pageIndex: 4 },
        { id: 'less_1_1', title: 'الدرس 1.1: التعاريف والقوانين الجوهرية', type: 'lesson', pageIndex: 5 },
        { id: 'act_1_1', title: 'نشاط استكشافي وتجريبي', type: 'activity', pageIndex: 6 },
        { id: 'quiz_1', title: 'تقويم واختبار الوحدة الأولى', type: 'quiz', pageIndex: 7 }
      ]
    },
    {
      id: 'unit_2',
      title: 'الوحدة الثانية: التطبيقات والحلول العملية',
      type: 'unit',
      pageIndex: 8,
      children: [
        { id: 'chap_2_1', title: 'الفصل الثاني: مسائل وتدريبات متقدمة', type: 'chapter', pageIndex: 8 },
        { id: 'less_2_1', title: 'الدرس 2.1: التطبيقات الواقعية والمعملية', type: 'lesson', pageIndex: 9 },
        { id: 'quiz_2', title: 'تقويم واختبار الوحدة الثانية', type: 'quiz', pageIndex: 10 }
      ]
    },
    { id: 'sec_references', title: 'المصادر والمراجع والملاحق', type: 'references', pageIndex: 11 },
    { id: 'sec_cover_back', title: 'الغلاف الخلفي', type: 'cover_back', pageIndex: 12 }
  ];
};
