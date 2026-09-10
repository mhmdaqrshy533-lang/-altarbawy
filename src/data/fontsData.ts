export interface FontItem {
  id: string;
  name: string;
  arabicName: string;
  fontFamily: string;
  category: 'naskh' | 'kufi' | 'ruqaa' | 'thuluth_diwani' | 'modern' | 'serif' | 'sans_serif' | 'display' | 'handwriting' | 'monospace';
  lang: 'ar' | 'en';
  weights: number[];
  recommendedFor: ('exam' | 'book' | 'certificate' | 'report' | 'official_letter' | 'cover')[];
  sampleText: string;
  googleFontQuery: string;
}

export const ARABIC_FONTS: FontItem[] = [
  {
    id: 'noto_naskh_arabic',
    name: 'Noto Naskh Arabic',
    arabicName: 'نوطو نسخ عربي',
    fontFamily: "'Noto Naskh Arabic', serif",
    category: 'naskh',
    lang: 'ar',
    weights: [400, 500, 600, 700],
    recommendedFor: ['exam', 'official_letter', 'book'],
    sampleText: 'بسم الله الرحمن الرحيم - مدرسة الرقيم النموذجية',
    googleFontQuery: 'family=Noto+Naskh+Arabic:wght@400;500;600;700'
  },
  {
    id: 'noto_kufi_arabic',
    name: 'Noto Kufi Arabic',
    arabicName: 'نوطو كوفي عربي',
    fontFamily: "'Noto Kufi Arabic', sans-serif",
    category: 'kufi',
    lang: 'ar',
    weights: [400, 500, 600, 700, 800],
    recommendedFor: ['certificate', 'cover', 'report'],
    sampleText: 'الجمهورية اليمنية - وزارة التربية والتعليم',
    googleFontQuery: 'family=Noto+Kufi+Arabic:wght@400;500;600;700;800'
  },
  {
    id: 'cairo',
    name: 'Cairo',
    arabicName: 'القاهرة Cairo',
    fontFamily: "'Cairo', sans-serif",
    category: 'modern',
    lang: 'ar',
    weights: [400, 500, 600, 700, 800, 900],
    recommendedFor: ['book', 'report', 'cover'],
    sampleText: 'منصة الرقيم التعليمية المنسقة للكتب والمناهج',
    googleFontQuery: 'family=Cairo:wght@400;500;600;700;800;900'
  },
  {
    id: 'tajawal',
    name: 'Tajawal',
    arabicName: 'تجول Tajawal',
    fontFamily: "'Tajawal', sans-serif",
    category: 'modern',
    lang: 'ar',
    weights: [400, 500, 700, 800],
    recommendedFor: ['report', 'exam', 'book'],
    sampleText: 'كشوفات الدرجات والنتائج المدرسية الدقيقة',
    googleFontQuery: 'family=Tajawal:wght@400;500;700;800'
  },
  {
    id: 'almarai',
    name: 'Almarai',
    arabicName: 'المراعي Almarai',
    fontFamily: "'Almarai', sans-serif",
    category: 'modern',
    lang: 'ar',
    weights: [400, 700, 800],
    recommendedFor: ['report', 'official_letter'],
    sampleText: 'الجمهورية اليمنية - قطاع المناهج والتوجيه',
    googleFontQuery: 'family=Almarai:wght@400;700;800'
  },
  {
    id: 'changa',
    name: 'Changa',
    arabicName: 'تشانغا Changa',
    fontFamily: "'Changa', sans-serif",
    category: 'modern',
    lang: 'ar',
    weights: [400, 600, 700, 800],
    recommendedFor: ['cover', 'certificate'],
    sampleText: 'شهادة شكر وتقدير وتفوق دراسي',
    googleFontQuery: 'family=Changa:wght@400;600;700;800'
  },
  {
    id: 'reem_kufi',
    name: 'Reem Kufi',
    arabicName: 'ريم كوفي Reem Kufi',
    fontFamily: "'Reem Kufi', sans-serif",
    category: 'kufi',
    lang: 'ar',
    weights: [400, 600, 700],
    recommendedFor: ['cover', 'certificate'],
    sampleText: 'الْقُرْآنُ الْكَرِيمُ وَعُلُومُهُ - المنهج اليمني',
    googleFontQuery: 'family=Reem+Kufi:wght@400;600;700'
  },
  {
    id: 'markazi_text',
    name: 'Markazi Text',
    arabicName: 'مركزي Markazi',
    fontFamily: "'Markazi Text', serif",
    category: 'naskh',
    lang: 'ar',
    weights: [400, 500, 600, 700],
    recommendedFor: ['book', 'official_letter'],
    sampleText: 'تاريخ العرب الحديث والمعاصر - مرحلة التعليم الأساسي',
    googleFontQuery: 'family=Markazi+Text:wght@400;500;600;700'
  },
  {
    id: 'amiri',
    name: 'Amiri',
    arabicName: 'الأميري Amiri',
    fontFamily: "'Amiri', serif",
    category: 'naskh',
    lang: 'ar',
    weights: [400, 700],
    recommendedFor: ['exam', 'official_letter', 'book'],
    sampleText: 'السؤال الأول: اختر الإجابة الصحيحة مما يلي بين القوسين',
    googleFontQuery: 'family=Amiri:ital,wght@0,400;0,700;1,400'
  },
  {
    id: 'ibm_plex_sans_arabic',
    name: 'IBM Plex Sans Arabic',
    arabicName: 'آي بي إم بلكس عربي',
    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    category: 'modern',
    lang: 'ar',
    weights: [400, 500, 600, 700],
    recommendedFor: ['book', 'report'],
    sampleText: 'دليل المعلم في أتمتة الاختبارات والتصحيح الآلي',
    googleFontQuery: 'family=IBM+Plex+Sans+Arabic:wght@400;500;600;700'
  },
  {
    id: 'readex_pro',
    name: 'Readex Pro',
    arabicName: 'ريدكس برو Readex Pro',
    fontFamily: "'Readex Pro', sans-serif",
    category: 'modern',
    lang: 'ar',
    weights: [400, 600, 700],
    recommendedFor: ['report', 'exam'],
    sampleText: 'الاختبار النصف سنوي للعام الدراسي المعتمد',
    googleFontQuery: 'family=Readex+Pro:wght@400;600;700'
  },
  {
    id: 'el_messiri',
    name: 'El Messiri',
    arabicName: 'المسيري El Messiri',
    fontFamily: "'El Messiri', sans-serif",
    category: 'modern',
    lang: 'ar',
    weights: [400, 600, 700],
    recommendedFor: ['cover', 'certificate'],
    sampleText: 'التربية الإسلامية - الصف التاسع الأساسي',
    googleFontQuery: 'family=El+Messiri:wght@400;600;700'
  },
  {
    id: 'harmattan',
    name: 'Harmattan',
    arabicName: 'Harmattan هرمتان',
    fontFamily: "'Harmattan', sans-serif",
    category: 'naskh',
    lang: 'ar',
    weights: [400, 700],
    recommendedFor: ['book', 'exam'],
    sampleText: 'جغرافية الجمهورية اليمنية والوطن العربي',
    googleFontQuery: 'family=Harmattan:wght@400;700'
  },
  {
    id: 'scheherazade_new',
    name: 'Scheherazade New',
    arabicName: 'شهرزاد الجديدة',
    fontFamily: "'Scheherazade New', serif",
    category: 'naskh',
    lang: 'ar',
    weights: [400, 700],
    recommendedFor: ['official_letter', 'exam'],
    sampleText: 'نص الحديث الشريف والمأثورات المدرسية',
    googleFontQuery: 'family=Scheherazade+New:wght@400;700'
  },
  {
    id: 'lateef',
    name: 'Lateef',
    arabicName: 'لطيف Lateef',
    fontFamily: "'Lateef', cursive",
    category: 'naskh',
    lang: 'ar',
    weights: [400, 700],
    recommendedFor: ['official_letter', 'book'],
    sampleText: 'الحمد لله رب العالمين والصلوات على نبينا محمد',
    googleFontQuery: 'family=Lateef:wght@400;700'
  },
  {
    id: 'aref_ruqaa',
    name: 'Aref Ruqaa',
    arabicName: 'عارف رقعة Aref Ruqaa',
    fontFamily: "'Aref Ruqaa', serif",
    category: 'ruqaa',
    lang: 'ar',
    weights: [400, 700],
    recommendedFor: ['cover', 'certificate', 'official_letter'],
    sampleText: 'خط الرقعة العربي المتقن والأصيل',
    googleFontQuery: 'family=Aref+Ruqaa:wght@400;700'
  },
  {
    id: 'aref_ruqaa_ink',
    name: 'Aref Ruqaa Ink',
    arabicName: 'عارف رقعة حبر Ink',
    fontFamily: "'Aref Ruqaa Ink', serif",
    category: 'ruqaa',
    lang: 'ar',
    weights: [400, 700],
    recommendedFor: ['cover', 'certificate'],
    sampleText: 'مخطوطات الرقعة الأصيلة والزخارف',
    googleFontQuery: 'family=Aref+Ruqaa+Ink:wght@400;700'
  },
  {
    id: 'mirza',
    name: 'Mirza',
    arabicName: 'مرزا Mirza',
    fontFamily: "'Mirza', cursive",
    category: 'naskh',
    lang: 'ar',
    weights: [400, 600, 700],
    recommendedFor: ['official_letter', 'cover'],
    sampleText: 'لغتي العربية - الجزء الأول المعتمد',
    googleFontQuery: 'family=Mirza:wght@400;600;700'
  },
  {
    id: 'baloo_bhaijaan_2',
    name: 'Baloo Bhaijaan 2',
    arabicName: 'بالو بهيجان Baloo',
    fontFamily: "'Baloo Bhaijaan 2', cursive",
    category: 'modern',
    lang: 'ar',
    weights: [400, 600, 800],
    recommendedFor: ['cover', 'report'],
    sampleText: 'العلوم العامة والأنشطة التفاعلية للطلاب',
    googleFontQuery: 'family=Baloo+Bhaijaan+2:wght@400;600;800'
  },
  {
    id: 'mada',
    name: 'Mada',
    arabicName: 'مدى Mada',
    fontFamily: "'Mada', sans-serif",
    category: 'modern',
    lang: 'ar',
    weights: [400, 600, 700],
    recommendedFor: ['report', 'exam'],
    sampleText: 'جدول مواعيد الاختبارات النهائية للمرحلة الأساسية',
    googleFontQuery: 'family=Mada:wght@400;600;700'
  },
  {
    id: 'lemonada',
    name: 'Lemonada',
    arabicName: 'ليمونادة Lemonada',
    fontFamily: "'Lemonada', cursive",
    category: 'modern',
    lang: 'ar',
    weights: [400, 600, 700],
    recommendedFor: ['cover', 'certificate'],
    sampleText: 'شهادة تفوق وإبداع في الأنشطة المدرسية',
    googleFontQuery: 'family=Lemonada:wght@400;600;700'
  },
  {
    id: 'katibeh',
    name: 'Katibeh',
    arabicName: 'كتيبة Katibeh',
    fontFamily: "'Katibeh', cursive",
    category: 'thuluth_diwani',
    lang: 'ar',
    weights: [400],
    recommendedFor: ['cover', 'certificate'],
    sampleText: 'شعار وزارة التربية والتعليم المعتمد',
    googleFontQuery: 'family=Katibeh'
  },
  {
    id: 'jomhuria',
    name: 'Jomhuria',
    arabicName: 'جمهورية Jomhuria',
    fontFamily: "'Jomhuria', cursive",
    category: 'thuluth_diwani',
    lang: 'ar',
    weights: [400],
    recommendedFor: ['cover', 'certificate'],
    sampleText: 'الجمهورية اليمنية - الإدارة العامة للمناهج',
    googleFontQuery: 'family=Jomhuria'
  },
  {
    id: 'rakkas',
    name: 'Rakkas',
    arabicName: 'رقاص Rakkas',
    fontFamily: "'Rakkas', display",
    category: 'thuluth_diwani',
    lang: 'ar',
    weights: [400],
    recommendedFor: ['cover', 'certificate'],
    sampleText: 'القرآن الكريم وعلومه - الطبعة الرسمية',
    googleFontQuery: 'family=Rakkas'
  },
  {
    id: 'noto_sans_arabic',
    name: 'Noto Sans Arabic',
    arabicName: 'نوطو سانس عربي',
    fontFamily: "'Noto Sans Arabic', sans-serif",
    category: 'modern',
    lang: 'ar',
    weights: [400, 500, 600, 700],
    recommendedFor: ['exam', 'report', 'book'],
    sampleText: 'نماذج الامتحانات المؤتمتة ورقة OMR',
    googleFontQuery: 'family=Noto+Sans+Arabic:wght@400;500;600;700'
  },
  {
    id: 'kufi_standard',
    name: 'Kufi Standard',
    arabicName: 'كوفي قياسي Kufi',
    fontFamily: "'Reem Kufi', 'Noto Kufi Arabic', sans-serif",
    category: 'kufi',
    lang: 'ar',
    weights: [400, 700],
    recommendedFor: ['certificate', 'cover'],
    sampleText: 'شهادة تقدير وتفوق في المنهج التعليمي',
    googleFontQuery: 'family=Reem+Kufi:wght@400;700&family=Noto+Kufi+Arabic:wght@400;700'
  },
  {
    id: 'geeza_pro_style',
    name: 'Geeza Pro Style',
    arabicName: 'نمط جيزا برو Geeza',
    fontFamily: "'Noto Naskh Arabic', 'Cairo', serif",
    category: 'naskh',
    lang: 'ar',
    weights: [400, 600, 700],
    recommendedFor: ['official_letter', 'exam'],
    sampleText: 'الوثيقة الرسمية والخطابات الصادرة من المدرسة',
    googleFontQuery: 'family=Noto+Naskh+Arabic:wght@400;600;700'
  },
  {
    id: 'traditional_arabic_style',
    name: 'Traditional Arabic Style',
    arabicName: 'الخط العربي التقليدي',
    fontFamily: "'Amiri', 'Scheherazade New', serif",
    category: 'naskh',
    lang: 'ar',
    weights: [400, 700],
    recommendedFor: ['official_letter', 'exam', 'book'],
    sampleText: 'المملكة والجمهورية والتاريخ العربي الأصيل',
    googleFontQuery: 'family=Amiri:wght@400;700&family=Scheherazade+New:wght@400;700'
  },
  {
    id: 'andalus_style',
    name: 'Andalus Style',
    arabicName: 'نمط أندلسي Andalus',
    fontFamily: "'Aref Ruqaa', 'Amiri', serif",
    category: 'ruqaa',
    lang: 'ar',
    weights: [400, 700],
    recommendedFor: ['cover', 'certificate'],
    sampleText: 'الزخرفة الأندلسية والمخطوطات العريقة',
    googleFontQuery: 'family=Aref+Ruqaa:wght@400;700'
  },
  {
    id: 'diwani_style',
    name: 'Diwani Style',
    arabicName: 'نمط ديواني Diwani',
    fontFamily: "'Aref Ruqaa Ink', 'Katibeh', cursive",
    category: 'thuluth_diwani',
    lang: 'ar',
    weights: [400, 700],
    recommendedFor: ['cover', 'certificate'],
    sampleText: 'الخط الديواني الشريف للعناوين والشهادات',
    googleFontQuery: 'family=Aref+Ruqaa+Ink:wght@400;700&family=Katibeh'
  }
];

export const ENGLISH_FONTS: FontItem[] = [
  {
    id: 'inter',
    name: 'Inter',
    arabicName: 'Inter إنتر',
    fontFamily: "'Inter', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 500, 600, 700],
    recommendedFor: ['book', 'exam', 'report'],
    sampleText: 'The quick brown fox jumps over the lazy dog.',
    googleFontQuery: 'family=Inter:wght@400;500;600;700'
  },
  {
    id: 'roboto',
    name: 'Roboto',
    arabicName: 'Roboto روبوتو',
    fontFamily: "'Roboto', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 500, 700],
    recommendedFor: ['report', 'exam'],
    sampleText: 'Republic of Yemen - Ministry of Education ELT',
    googleFontQuery: 'family=Roboto:wght@400;500;700'
  },
  {
    id: 'open_sans',
    name: 'Open Sans',
    arabicName: 'Open Sans أوبن سانس',
    fontFamily: "'Open Sans', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 700],
    recommendedFor: ['book', 'report'],
    sampleText: 'ENGLISH COURSE FOR YEMEN - Pupil Book 1',
    googleFontQuery: 'family=Open+Sans:wght@400;600;700'
  },
  {
    id: 'lato',
    name: 'Lato',
    arabicName: 'Lato لاتو',
    fontFamily: "'Lato', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 700],
    recommendedFor: ['exam', 'report'],
    sampleText: 'Grade 9 Basic Education Final Examinations',
    googleFontQuery: 'family=Lato:wght@400;700'
  },
  {
    id: 'poppins',
    name: 'Poppins',
    arabicName: 'Poppins بوبينز',
    fontFamily: "'Poppins', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 700],
    recommendedFor: ['cover', 'report'],
    sampleText: 'Al-Raqeem Educational Platform Curriculum',
    googleFontQuery: 'family=Poppins:wght@400;600;700'
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    arabicName: 'Montserrat مونتسيرات',
    fontFamily: "'Montserrat', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 800],
    recommendedFor: ['cover', 'certificate'],
    sampleText: 'CERTIFICATE OF ACADEMIC EXCELLENCE',
    googleFontQuery: 'family=Montserrat:wght@400;600;800'
  },
  {
    id: 'source_sans_pro',
    name: 'Source Sans Pro',
    arabicName: 'سورس سانس برو',
    fontFamily: "'Source Sans 3', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 700],
    recommendedFor: ['exam', 'official_letter'],
    sampleText: 'Official Academic Examination Sheet OMR',
    googleFontQuery: 'family=Source+Sans+3:wght@400;600;700'
  },
  {
    id: 'nunito',
    name: 'Nunito',
    arabicName: 'Nunito نونيتو',
    fontFamily: "'Nunito', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 800],
    recommendedFor: ['book', 'report'],
    sampleText: 'Basic Education Science & Mathematics',
    googleFontQuery: 'family=Nunito:wght@400;600;800'
  },
  {
    id: 'work_sans',
    name: 'Work Sans',
    arabicName: 'Work Sans وورك سانس',
    fontFamily: "'Work Sans', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 700],
    recommendedFor: ['report', 'exam'],
    sampleText: 'School Assessment Data and Analytics',
    googleFontQuery: 'family=Work+Sans:wght@400;600;700'
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu',
    arabicName: 'Ubuntu أوبونتو',
    fontFamily: "'Ubuntu', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 500, 700],
    recommendedFor: ['report', 'cover'],
    sampleText: 'Interactive Digital Studio for Teachers',
    googleFontQuery: 'family=Ubuntu:wght@400;500;700'
  },
  {
    id: 'merriweather',
    name: 'Merriweather',
    arabicName: 'Merriweather ميريويذر',
    fontFamily: "'Merriweather', serif",
    category: 'serif',
    lang: 'en',
    weights: [400, 700],
    recommendedFor: ['book', 'official_letter'],
    sampleText: 'English Literature and Historical Reading',
    googleFontQuery: 'family=Merriweather:wght@400;700'
  },
  {
    id: 'playfair_display',
    name: 'Playfair Display',
    arabicName: 'بلايفير ديسپلاي',
    fontFamily: "'Playfair Display', serif",
    category: 'display',
    lang: 'en',
    weights: [400, 700, 900],
    recommendedFor: ['cover', 'certificate'],
    sampleText: 'ENGLISH COURSE FOR YEMEN 2026',
    googleFontQuery: 'family=Playfair+Display:wght@400;700;900'
  },
  {
    id: 'raleway',
    name: 'Raleway',
    arabicName: 'Raleway راليواي',
    fontFamily: "'Raleway', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 800],
    recommendedFor: ['cover', 'certificate'],
    sampleText: 'Republic of Yemen Ministry Seal',
    googleFontQuery: 'family=Raleway:wght@400;600;800'
  },
  {
    id: 'fira_sans',
    name: 'Fira Sans',
    arabicName: 'فيرا سانس Fira',
    fontFamily: "'Fira Sans', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 700],
    recommendedFor: ['exam', 'report'],
    sampleText: 'Section A: Multiple Choice Questions',
    googleFontQuery: 'family=Fira+Sans:wght@400;600;700'
  },
  {
    id: 'pt_sans',
    name: 'PT Sans',
    arabicName: 'بي تي سانس PT',
    fontFamily: "'PT Sans', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 700],
    recommendedFor: ['official_letter', 'exam'],
    sampleText: 'Standardized Educational Curriculum',
    googleFontQuery: 'family=PT+Sans:wght@400;700'
  },
  {
    id: 'rubik',
    name: 'Rubik',
    arabicName: 'Rubik روبيك',
    fontFamily: "'Rubik', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 700],
    recommendedFor: ['book', 'report'],
    sampleText: 'Mathematics and Physics Formulas',
    googleFontQuery: 'family=Rubik:wght@400;600;700'
  },
  {
    id: 'cabin',
    name: 'Cabin',
    arabicName: 'Cabin كابين',
    fontFamily: "'Cabin', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 700],
    recommendedFor: ['report', 'exam'],
    sampleText: 'Teacher Lesson Planner & Grade Book',
    googleFontQuery: 'family=Cabin:wght@400;600;700'
  },
  {
    id: 'karla',
    name: 'Karla',
    arabicName: 'Karla كارلا',
    fontFamily: "'Karla', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 700],
    recommendedFor: ['official_letter', 'book'],
    sampleText: 'Clear and legible typography for printing',
    googleFontQuery: 'family=Karla:wght@400;700'
  },
  {
    id: 'ibm_plex_sans',
    name: 'IBM Plex Sans',
    arabicName: 'آي بي إم بلكس إنجليزي',
    fontFamily: "'IBM Plex Sans', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 700],
    recommendedFor: ['book', 'report'],
    sampleText: 'OMR Optical Mark Recognition Scanning',
    googleFontQuery: 'family=IBM+Plex+Sans:wght@400;600;700'
  },
  {
    id: 'dm_sans',
    name: 'DM Sans',
    arabicName: 'دي إم سانس DM',
    fontFamily: "'DM Sans', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 700],
    recommendedFor: ['report', 'exam'],
    sampleText: 'Modern Educational Workspace Tooling',
    googleFontQuery: 'family=DM+Sans:wght@400;700'
  },
  {
    id: 'lexend',
    name: 'Lexend',
    arabicName: 'Lexend ليكسيند',
    fontFamily: "'Lexend', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 700],
    recommendedFor: ['book', 'exam'],
    sampleText: 'Designed for improved reading proficiency',
    googleFontQuery: 'family=Lexend:wght@400;600;700'
  },
  {
    id: 'outfit',
    name: 'Outfit',
    arabicName: 'Outfit أوتفيت',
    fontFamily: "'Outfit', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 800],
    recommendedFor: ['cover', 'report'],
    sampleText: 'Yemeni Curriculum Modern Textbook Series',
    googleFontQuery: 'family=Outfit:wght@400;600;800'
  },
  {
    id: 'manrope',
    name: 'Manrope',
    arabicName: 'Manrope مانروب',
    fontFamily: "'Manrope', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 800],
    recommendedFor: ['report', 'exam'],
    sampleText: 'Advanced Student Statistics & Reports',
    googleFontQuery: 'family=Manrope:wght@400;600;800'
  },
  {
    id: 'bebas_neue',
    name: 'Bebas Neue',
    arabicName: 'بيباس نيو Bebas',
    fontFamily: "'Bebas Neue', sans-serif",
    category: 'display',
    lang: 'en',
    weights: [400],
    recommendedFor: ['cover', 'certificate'],
    sampleText: 'BASIC EDUCATION CERTIFICATE 2026',
    googleFontQuery: 'family=Bebas+Neue'
  },
  {
    id: 'oswald',
    name: 'Oswald',
    arabicName: 'Oswald أوزوالد',
    fontFamily: "'Oswald', sans-serif",
    category: 'display',
    lang: 'en',
    weights: [400, 600, 700],
    recommendedFor: ['cover', 'certificate'],
    sampleText: 'MINISTRY OF EDUCATION PUBLICATIONS',
    googleFontQuery: 'family=Oswald:wght@400;600;700'
  },
  {
    id: 'libre_baskerville',
    name: 'Libre Baskerville',
    arabicName: 'ليبشر باسكرفيل',
    fontFamily: "'Libre Baskerville', serif",
    category: 'serif',
    lang: 'en',
    weights: [400, 700],
    recommendedFor: ['book', 'official_letter'],
    sampleText: 'Classic Serif Typography for Academic Papers',
    googleFontQuery: 'family=Libre+Baskerville:wght@400;700'
  },
  {
    id: 'inconsolata',
    name: 'Inconsolata',
    arabicName: 'Inconsolata إنكونسولاتا',
    fontFamily: "'Inconsolata', monospace",
    category: 'monospace',
    lang: 'en',
    weights: [400, 700],
    recommendedFor: ['report', 'exam'],
    sampleText: 'Code: YEM-2026-OMR-0984 #A1',
    googleFontQuery: 'family=Inconsolata:wght@400;700'
  },
  {
    id: 'jetbrains_mono',
    name: 'JetBrains Mono',
    arabicName: 'جيت برينز مونو',
    fontFamily: "'JetBrains Mono', monospace",
    category: 'monospace',
    lang: 'en',
    weights: [400, 700],
    recommendedFor: ['report', 'exam'],
    sampleText: 'Barcode ID: 978-9953-0-1234-5',
    googleFontQuery: 'family=JetBrains+Mono:wght@400;700'
  },
  {
    id: 'space_grotesk',
    name: 'Space Grotesk',
    arabicName: 'سبايس جروتسك',
    fontFamily: "'Space Grotesk', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 700],
    recommendedFor: ['cover', 'report'],
    sampleText: 'Digital Education Studio Al-Raqeem',
    googleFontQuery: 'family=Space+Grotesk:wght@400;600;700'
  },
  {
    id: 'quicksand',
    name: 'Quicksand',
    arabicName: 'Quicksand كويكساند',
    fontFamily: "'Quicksand', sans-serif",
    category: 'sans_serif',
    lang: 'en',
    weights: [400, 600, 700],
    recommendedFor: ['book', 'cover'],
    sampleText: 'Primary & Kindergarten Student Activities',
    googleFontQuery: 'family=Quicksand:wght@400;600;700'
  }
];

export const ALL_FONTS = [...ARABIC_FONTS, ...ENGLISH_FONTS];

export const DOCUMENT_DEFAULT_FONTS: Record<string, { arabic: string; english: string; name: string }> = {
  exam: {
    arabic: 'amiri',
    english: 'inter',
    name: 'امتحان اختبار'
  },
  book: {
    arabic: 'cairo',
    english: 'ibm_plex_sans',
    name: 'كتاب / ملزمة'
  },
  certificate: {
    arabic: 'kufi_standard',
    english: 'montserrat',
    name: 'شهادة تقدير'
  },
  report: {
    arabic: 'tajawal',
    english: 'work_sans',
    name: 'تقرير / كشف درجات'
  },
  official_letter: {
    arabic: 'amiri',
    english: 'merriweather',
    name: 'خطاب رسمي'
  },
  cover: {
    arabic: 'reem_kufi',
    english: 'playfair_display',
    name: 'غلاف كتاب'
  }
};
