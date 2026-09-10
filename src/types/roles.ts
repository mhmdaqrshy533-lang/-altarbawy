/**
 * National Education Hierarchy & Role Definitions for Raqeem Platform
 * المنصة الوطنية للوثائق التعليمية - الرقيم
 * برمجة وتطوير المهندس//:سهيل الهزبري
 */

export type EducationRoleID = 
  | 'ministry'
  | 'curriculum_sector'
  | 'exams_sector'
  | 'general_admin'
  | 'governorate_office'
  | 'directorate_office'
  | 'school_principal'
  | 'school_vice_principal'
  | 'student_counselor'
  | 'teacher'
  | 'educational_supervisor'
  | 'student'
  | 'parent';

export interface EducationTool {
  id: string;
  title: string;
  description: string;
  iconName: string;
  actionRoute: string;
  badge?: string;
  documentCategory: 'exam' | 'memo' | 'certificate' | 'plan' | 'grade' | 'report' | 'official' | 'omr';
}

export interface EducationRole {
  id: EducationRoleID;
  title: string;
  subtitle: string;
  description: string;
  level: 'national' | 'sector' | 'governorate' | 'directorate' | 'school' | 'classroom' | 'student';
  badgeBg: string;
  badgeText: string;
  badgeColor: string;
  defaultHeaderBg: string;
  officialTitle: string;
  tools: EducationTool[];
}

export const EDUCATION_ROLES: Record<EducationRoleID, EducationRole> = {
  ministry: {
    id: 'ministry',
    title: 'وزارة التربية والتعليم',
    subtitle: 'السطة الوطنية العليا للتعليم',
    description: 'إصدار اللوائح والقرارات والتعاميم والمناهج والاعتمادات والخطط الإستراتيجية',
    level: 'national',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    badgeColor: '#b45309',
    defaultHeaderBg: '#1e293b',
    officialTitle: 'وزارة التربية والتعليم - الجمهورية اليمنية',
    tools: [
      { id: 'ministerial_memo', title: 'محرر التعاميم والقرارات الوزارية', description: 'صياغة وإصدار القرار الوزاري الرسمي مع الختم الرقمي', iconName: 'FileText', actionRoute: 'document_editor', badge: 'رسمي', documentCategory: 'memo' },
      { id: 'strategic_plan', title: 'محرر الخطط الإستراتيجية والميزانيات', description: 'تخطيط الموازنات السنوية والخطط الوطنية', iconName: 'BarChart3', actionRoute: 'term_plan', documentCategory: 'plan' },
      { id: 'curriculum_builder', title: 'محرر ومطوّر المناهج الدراسية', description: 'تطوير الكتب والمقررات الوطنية', iconName: 'BookOpen', actionRoute: 'library_section', documentCategory: 'official' },
      { id: 'national_exams', title: 'محرر الامتحانات والشهادات الوطنية', description: 'نماذج امتحانات الشهادتين الأساسية والثانوية', iconName: 'FileCheck', actionRoute: 'exams_section', badge: 'سيادي', documentCategory: 'exam' },
      { id: 'official_letters', title: 'محرر الخطابات والنماذج الحكومية', description: 'المراسلات الرسمية الموثقة بـ QR وBarcode', iconName: 'Mail', actionRoute: 'document_editor', documentCategory: 'official' },
    ]
  },
  curriculum_sector: {
    id: 'curriculum_sector',
    title: 'قطاع المناهج والتوجيه',
    subtitle: 'إعداد وتطوير المحتوى العلمي والكتب',
    description: 'تطوير الوحدات والدروس والأنشطة والرسومات العلمية والمعادلات الرياضيات والفيزياء',
    level: 'sector',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    badgeColor: '#047857',
    defaultHeaderBg: '#065f46',
    officialTitle: 'قطاع المناهج والتوجيه التربوي',
    tools: [
      { id: 'curriculum_units', title: 'محرر الوحدات والدروس التعليمية', description: 'تنسيق وحدات المقرر والمصفوفات المفاهيمية', iconName: 'BookMarked', actionRoute: 'plans_section', documentCategory: 'plan' },
      { id: 'activities_editor', title: 'محرر الأنشطة والتدريبات', description: 'صياغة الأنشطة اللاصفية والتجارب العلمية', iconName: 'Sparkles', actionRoute: 'document_editor', documentCategory: 'official' },
      { id: 'scientific_drawings', title: 'مكتبة ومحرر الرسومات والمعادلات', description: 'رسم الصيغ الكيميائية والمعادلات الفيزيائية والرياضية', iconName: 'Calculator', actionRoute: 'exams_section', documentCategory: 'exam' },
    ]
  },
  exams_sector: {
    id: 'exams_sector',
    title: 'قطاع الاختبارات والأتمتة',
    subtitle: 'إدارة الامتحانات والتصحيح الإلكتروني OMR',
    description: 'استوديو الامتحانات، أتمتة أوراق التظليل OMR، بنك الأسئلة والموديلات A/B/C/D',
    level: 'sector',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-900',
    badgeColor: '#6b21a8',
    defaultHeaderBg: '#4c1d95',
    officialTitle: 'الإدارة العامة للاختبارات والأتمتة الوطنية',
    tools: [
      { id: 'exam_studio', title: 'استوديو محرر الامتحانات الذكي', description: 'تصميم ورقة الامتحان الوزارية وشبكة الأسئلة', iconName: 'FileSignature', actionRoute: 'exams_section', badge: 'رئيسي', documentCategory: 'exam' },
      { id: 'omr_automation', title: 'محرر ونظام أتمتة التصحيح OMR', description: 'توليد أوراق الفقاعات وتصحيحها بالكاميرا', iconName: 'QrCode', actionRoute: 'bubble_sheets', badge: 'أتمتة OMR', documentCategory: 'omr' },
      { id: 'question_bank', title: 'بنك الأسئلة والفقارات الوزارية', description: 'تصنيف الأسئلة حسب مستويات بلوم والمعايير', iconName: 'Database', actionRoute: 'question_bank', documentCategory: 'exam' },
      { id: 'models_generator', title: 'مولد النماذج الأربعة (أ، ب، ج، د)', description: 'توليد أربعة نماذج متكافئة تلقائياً', iconName: 'Layers', actionRoute: 'exams_section', documentCategory: 'exam' }
    ]
  },
  general_admin: {
    id: 'general_admin',
    title: 'الإدارة العامة للشؤون الإدارية',
    subtitle: 'المراسلات ومحاضر الاجتماعات القرارات',
    description: 'إدارة المراسلات الرسمية والتكليفات ومحاضر الاجتماعات الوزارية والإدارية',
    level: 'sector',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-800',
    badgeColor: '#334155',
    defaultHeaderBg: '#334155',
    officialTitle: 'الإدارة العامة للشؤون الإدارية والمالية',
    tools: [
      { id: 'admin_letters', title: 'محرر الخطابات والمراسلات الإدارية', description: 'تنسيق المراسلات مع الترقيم التلقائي', iconName: 'Mail', actionRoute: 'document_editor', documentCategory: 'official' },
      { id: 'meeting_minutes', title: 'محرر محاضر الاجتماعات والقرارات', description: 'توثيق محاضر الجلسات وتوقيعات الحاضرين', iconName: 'Users', actionRoute: 'document_editor', documentCategory: 'memo' },
      { id: 'assignment_orders', title: 'أوامر التكليف القرارات الإدارية', description: 'أوامر النقل والتكليف الرسمية', iconName: 'FileCheck', actionRoute: 'document_editor', documentCategory: 'official' }
    ]
  },
  governorate_office: {
    id: 'governorate_office',
    title: 'مكتب التربية والتعليم بالمحافظة',
    subtitle: 'الإدارة التعليمية الفرعية على مستوى المحافظة',
    description: 'إصدار تعاميم المحافظة، اعتماد امتحانات المدارس، متابعة المديريات والتقارير',
    level: 'governorate',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-900',
    badgeColor: '#1e40af',
    defaultHeaderBg: '#1e3a8a',
    officialTitle: 'مكتب التربية والتعليم بمحافظة صنعاء',
    tools: [
      { id: 'gov_memos', title: 'محرر تعاميم مكتب المحافظة', description: 'إصدار التعاميم الموجهة للمديريات والمدارس', iconName: 'Send', actionRoute: 'document_editor', documentCategory: 'memo' },
      { id: 'exam_accreditation', title: 'مركز اعتماد الامتحانات المدرسية', description: 'مراجعة واعتماد امتحانات النقل والشهادات', iconName: 'CheckCircle2', actionRoute: 'exams_section', documentCategory: 'exam' },
      { id: 'gov_reports', title: 'محرر تقارير الأداء والإحصاءات', description: 'إحصائيات المدارس المعلمين والكشوف العامة', iconName: 'PieChart', actionRoute: 'dashboard_overview', documentCategory: 'report' }
    ]
  },
  directorate_office: {
    id: 'directorate_office',
    title: 'إدارة التربية والتعليم بالمديرية',
    subtitle: 'متابعة وإشراف المدارس في المديرية',
    description: 'إدارة الامتحانات بالمديرية، متابعة الموجهين والمدارس، كشوف المتابعة',
    level: 'directorate',
    badgeBg: 'bg-cyan-100',
    badgeText: 'text-cyan-900',
    badgeColor: '#0e7490',
    defaultHeaderBg: '#155e75',
    officialTitle: 'إدارة التربية والتعليم بمديرية السبعين',
    tools: [
      { id: 'directorate_exams', title: 'محرر امتحانات ومتابعة المديرية', description: 'امتحانات الموحدة وكشوف المتابعة', iconName: 'FileSignature', actionRoute: 'exams_section', documentCategory: 'exam' },
      { id: 'supervisors_tracking', title: 'تقارير المشرفين والزيارات', description: 'تجميع تقارير الموجهين الميدانيين', iconName: 'Eye', actionRoute: 'document_editor', documentCategory: 'report' }
    ]
  },
  school_principal: {
    id: 'school_principal',
    title: 'مدير المدرسة',
    subtitle: 'قيادة المدرسة وتوثيق القرارات والجداول',
    description: 'تعاميم المدرسة، الجداول الدراسية، محاضر الاجتماعات، الشهادات وكشوف الطلاب',
    level: 'school',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-900',
    badgeColor: '#3730a3',
    defaultHeaderBg: '#312e81',
    officialTitle: 'مدرسة الرقيم النموذجية - إدارة المدرسة',
    tools: [
      { id: 'school_memos', title: 'محرر تعاميم وقرارات المدرسة', description: 'القرارات الموجهة للمعلمين ولأولياء الأمور', iconName: 'FileText', actionRoute: 'document_editor', documentCategory: 'memo' },
      { id: 'school_timetable', title: 'محرر ومصمم الجدول المدرسي', description: 'توزيع الحصص والمعلمين أسبوعياً', iconName: 'Calendar', actionRoute: 'teacher_tools', documentCategory: 'official' },
      { id: 'school_certificates', title: 'محرر شهادات التفوق والتقدير', description: 'إصدار شهادات التقدير بختم المدرسة الرسمي', iconName: 'Award', actionRoute: 'certificates_section', documentCategory: 'certificate' },
      { id: 'student_roster', title: 'كشوف وسجلات الطلاب', description: 'كشوف الأسماء للعام الدراسي واللجان الامتحانية', iconName: 'Users', actionRoute: 'student_affairs', documentCategory: 'official' }
    ]
  },
  school_vice_principal: {
    id: 'school_vice_principal',
    title: 'وكيل المدرسة لشؤون الطلاب',
    subtitle: 'متابعة الانضباط والغياب والنتائج',
    description: 'سجلات الغياب اليومي، كشوف الدرجات والنتائج، التقارير اليومية',
    level: 'school',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-900',
    badgeColor: '#0369a1',
    defaultHeaderBg: '#075985',
    officialTitle: 'إدارة وكالة الشؤون الطلابية',
    tools: [
      { id: 'attendance_tracker', title: 'محرر وسجل الحضور والغياب', description: 'تتبع غياب الطلاب وتوليد إنذارات الغياب', iconName: 'UserCheck', actionRoute: 'attendance_section', badge: 'يومي', documentCategory: 'report' },
      { id: 'grade_monitoring', title: 'متابعة ومحرر سجلات الدرجات', description: 'مراجعة درجات الفصول والشهادات الشهرية', iconName: 'GraduationCap', actionRoute: 'grades_section', documentCategory: 'grade' }
    ]
  },
  student_counselor: {
    id: 'student_counselor',
    title: 'المرشد الطلابي والتربوي',
    subtitle: 'الرعاية النفسية والسلوكية للطلاب',
    description: 'استمارات الملفات السلوكية، تقارير الحالات الخاصة، خطط المتابعة',
    level: 'school',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-900',
    badgeColor: '#0f766e',
    defaultHeaderBg: '#115e59',
    officialTitle: 'مكتب الإرشاد الطلابي والتربوي',
    tools: [
      { id: 'student_counseling_files', title: 'محرر ملفات واستمارات الطلاب', description: 'توثيق الحالات السلوكية والدراسية بسرية', iconName: 'FolderHeart', actionRoute: 'document_editor', documentCategory: 'official' }
    ]
  },
  teacher: {
    id: 'teacher',
    title: 'المعلم (أستاذ المادة)',
    subtitle: 'صانع الاختبارات وأوراق العمل والتحضير',
    description: 'محرر الامتحانات الوزارية والنظامية، OMR، أوراق العمل، تحضير الدروس، وسجل الدرجات',
    level: 'classroom',
    badgeBg: 'bg-violet-100',
    badgeText: 'text-violet-900',
    badgeColor: '#5b21b6',
    defaultHeaderBg: '#4c1d95',
    officialTitle: 'مكتب أستاذ المادة - معلم الفصل',
    tools: [
      { id: 'teacher_exam_studio', title: 'محرر ومصمم الامتحانات الذكي', description: 'إنشاء ورق الامتحان بالشكل الوزاري الرسمي', iconName: 'FileSignature', actionRoute: 'exams_section', badge: 'شامل', documentCategory: 'exam' },
      { id: 'teacher_omr', title: 'محرر نماذج التظليل والتحقيق OMR', description: 'توليد أوراق الإجابة المؤتمتة بالتظليل', iconName: 'QrCode', actionRoute: 'bubble_sheets', badge: 'أتمتة OMR', documentCategory: 'omr' },
      { id: 'teacher_worksheets', title: 'محرر أوراق العمل والأنشطة', description: 'تصميم أوراق العمل والتطبيقات الصفية', iconName: 'FileEdit', actionRoute: 'document_editor', documentCategory: 'official' },
      { id: 'teacher_lesson_prep', title: 'محرر التحضير اليومي والفصلي', description: 'تحضير الدروس وفق النموذج الوزاري', iconName: 'BookOpen', actionRoute: 'plans_section', documentCategory: 'plan' },
      { id: 'teacher_grades', title: 'محرر سجل الدرجات والأعمال', description: 'كشوف أعمال السنة والاختبارات الشفهية والمحاط', iconName: 'GraduationCap', actionRoute: 'grades_section', documentCategory: 'grade' },
      { id: 'teacher_attendance', title: 'سجل رصد الحضور اليومي', description: 'تسجيل الحضور والغياب للطلاب بنقرة واحدة', iconName: 'UserCheck', actionRoute: 'attendance_section', documentCategory: 'report' },
      { id: 'teacher_question_bank', title: 'بنك أسئلة المادة', description: 'أرشيف الأسئلة المبوب حسب الدروس والفصول', iconName: 'Database', actionRoute: 'question_bank', documentCategory: 'exam' }
    ]
  },
  educational_supervisor: {
    id: 'educational_supervisor',
    title: 'المشرف التربوي (الموجه)',
    subtitle: 'التقييم الفني والتوجيه الميداني',
    description: 'تقارير الزيارات الصفية، تقييم المعلمين، النماذج الإشرافية والخطط العلاجية',
    level: 'governorate',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-900',
    badgeColor: '#be123c',
    defaultHeaderBg: '#9f1239',
    officialTitle: 'مكتب التوجيه والإنماء التربوي',
    tools: [
      { id: 'supervisor_visits', title: 'محرر تقارير الزيارات التوجيهية', description: 'توثيق نتائج زيارات المعلمين والملحوظات', iconName: 'ClipboardCheck', actionRoute: 'document_editor', documentCategory: 'report' },
      { id: 'remedial_plans', title: 'محرر الخطط العلاجية والتطويرية', description: 'صياغة التوصيات والبرامج العلاجية', iconName: 'TrendingUp', actionRoute: 'term_plan', documentCategory: 'plan' }
    ]
  },
  student: {
    id: 'student',
    title: 'الطالب',
    subtitle: 'بوابة الطالب لاستلام الواجبات والنتائج',
    description: 'مشاهدة واستلام أوراق العمل، الواجبات، النتاجات، والشهادات الرسمية',
    level: 'student',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    badgeColor: '#047857',
    defaultHeaderBg: '#064e3b',
    officialTitle: 'بوابة الطالب للنتائج والوثائق',
    tools: [
      { id: 'student_homework', title: 'أوراق العمل والواجبات', description: 'استعراض وتحميل الواجبات وأوراق المراجعة', iconName: 'FileText', actionRoute: 'library_section', documentCategory: 'official' },
      { id: 'student_results', title: 'شهادات ونتائج الامتحانات', description: 'عرض شهادات التقدير وكشوف درجات الاختبارات', iconName: 'Award', actionRoute: 'certificates_section', documentCategory: 'certificate' }
    ]
  },
  parent: {
    id: 'parent',
    title: 'ولي الأمر',
    subtitle: 'بوابة متابعة الطالب والتحصيل الدراسي والرسوم',
    description: 'متابعة الحضور، الدرجات، الإشعارات المدرسية، وسداد الرسوم',
    level: 'student',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    badgeColor: '#d97706',
    defaultHeaderBg: '#004B6E',
    officialTitle: 'بوابة ولي الأمر للمتابعة والتحصيل',
    tools: [
      { id: 'parent_grades', title: 'متابعة الدرجات والنتائج', description: 'الاطلاع على كشوف درجات الطالب والتقارير الدورية', iconName: 'GraduationCap', actionRoute: 'grades_section', documentCategory: 'grade' },
      { id: 'parent_attendance', title: 'متابعة الحضور والمواظبة', description: 'تتبع الحضور والغياب اليومي للابن', iconName: 'UserCheck', actionRoute: 'attendance_section', documentCategory: 'report' },
      { id: 'parent_timetable', title: 'جدول الحصص الأسبوعي', description: 'متابعة مواعيد الحصص المدرسية', iconName: 'Calendar', actionRoute: 'timetables_section', documentCategory: 'official' },
    ]
  }
};
