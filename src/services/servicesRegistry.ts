import { EducationRoleID } from '../types/roles';

export type ServiceCategory = 'student' | 'teacher' | 'parent' | 'automation' | 'admin' | 'general';

export interface ServiceTool {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: ServiceCategory;
  subcategory: string;
  roles: EducationRoleID[];
  permissions: string[];
  route: string;
  featured?: boolean;
  quickAccess?: boolean;
  status?: 'available' | 'new' | 'beta';
  badge?: string;
  searchable?: boolean;
}

export const ALL_SERVICES_REGISTRY: ServiceTool[] = [
  // ==========================================
  // 1. خدمات الطالب (Student Services)
  // ==========================================
  {
    id: 'student_timetable',
    name: 'الجدول الدراسي للحصص',
    description: 'استعراض الحصص اليومية والأسبوعية والقاعات الدراسية والمعلمين.',
    iconName: 'CalendarDays',
    category: 'student',
    subcategory: 'التعلم والدراسة',
    roles: ['student', 'parent', 'teacher', 'school_principal', 'school_vice_principal'],
    permissions: ['view_timetable'],
    route: 'timetables_section',
    featured: true,
    quickAccess: true,
    status: 'available',
    searchable: true,
  },
  {
    id: 'student_homework',
    name: 'الواجبات والأنشطة',
    description: 'متابعة التكليفات المنزلية، رفع الإجابات ومتابعة التقييمات.',
    iconName: 'ClipboardList',
    category: 'student',
    subcategory: 'التعلم والدراسة',
    roles: ['student', 'parent', 'teacher', 'school_principal'],
    permissions: ['view_homework'],
    route: 'plans_section',
    featured: true,
    quickAccess: true,
    status: 'available',
    badge: 'تكليف',
    searchable: true,
  },
  {
    id: 'student_exams',
    name: 'جدول وحالات الاختبارات',
    description: 'استعراض مواعيد الاختبارات الفترية والوزارية وتنبيهات القاعات.',
    iconName: 'ClipboardCheck',
    category: 'student',
    subcategory: 'التقييم',
    roles: ['student', 'parent', 'teacher', 'exams_sector', 'school_principal'],
    permissions: ['view_exams'],
    route: 'exams_section',
    featured: true,
    quickAccess: true,
    status: 'available',
    badge: 'اختبارات',
    searchable: true,
  },
  {
    id: 'student_grades',
    name: 'كشف النتائج والدرجات',
    description: 'استعراض كشوف الدرجات والنتائج الشهرية والتقارير الفترية.',
    iconName: 'GraduationCap',
    category: 'student',
    subcategory: 'التقييم',
    roles: ['student', 'parent', 'teacher', 'school_principal', 'school_vice_principal'],
    permissions: ['view_grades'],
    route: 'grades_section',
    featured: true,
    quickAccess: true,
    status: 'available',
    badge: 'نتائج',
    searchable: true,
  },
  {
    id: 'student_attendance',
    name: 'سجل الحضور والغياب',
    description: 'متابعة نسبة الانضباط اليومي، أيام الحضور والإنذارات.',
    iconName: 'CalendarCheck',
    category: 'student',
    subcategory: 'المتابعة',
    roles: ['student', 'parent', 'teacher', 'school_vice_principal', 'school_principal'],
    permissions: ['view_attendance'],
    route: 'attendance_section',
    featured: false,
    quickAccess: true,
    status: 'available',
    badge: 'يومي',
    searchable: true,
  },
  {
    id: 'student_library',
    name: 'المكتبة الرقمية والمقررات',
    description: 'تحميل المناهج والكتب الإلكترونية والملفات الإثرائية والملازم.',
    iconName: 'Library',
    category: 'student',
    subcategory: 'التعلم والدراسة',
    roles: ['student', 'teacher', 'curriculum_sector', 'school_principal'],
    permissions: ['view_library'],
    route: 'books_section',
    featured: false,
    quickAccess: false,
    status: 'available',
    searchable: true,
  },
  {
    id: 'student_ai_assistant',
    name: 'SharEdu AI - المساعد الدراسي',
    description: 'المساعد الذكي لشرح المفاهيم المعقدة وتلخيص الدروس وحل التمارين.',
    iconName: 'Sparkles',
    category: 'student',
    subcategory: 'الذكاء الاصطناعي',
    roles: ['student', 'teacher', 'school_principal'],
    permissions: ['use_ai'],
    route: 'ai_section',
    featured: true,
    quickAccess: true,
    status: 'new',
    badge: 'ذكاء اصطناعي',
    searchable: true,
  },
  {
    id: 'student_badges',
    name: 'المكافآت والأوسمة الرقمية',
    description: 'شارة التميز والتفوق العلمي والشرف المدرسي الممنوحة للطالب.',
    iconName: 'Award',
    category: 'student',
    subcategory: 'التحفيز',
    roles: ['student', 'parent', 'teacher', 'school_principal'],
    permissions: ['view_badges'],
    route: 'badges',
    featured: false,
    quickAccess: false,
    status: 'available',
    searchable: true,
  },
  {
    id: 'student_memos',
    name: 'التعاميم والرسائل المدرسية',
    description: 'تنبيهات وتوجيهات إدارة المدرسة الموجهة للطالب وأولياء الأمور.',
    iconName: 'Mail',
    category: 'student',
    subcategory: 'التواصل',
    roles: ['student', 'parent', 'teacher', 'school_principal'],
    permissions: ['view_memos'],
    route: 'official_memos',
    featured: false,
    quickAccess: false,
    status: 'available',
    searchable: true,
  },

  // ==========================================
  // 2. خدمات المعلم (Teacher Services)
  // ==========================================
  {
    id: 'teacher_attendance',
    name: 'رصد الحضور والغياب اليومي',
    description: 'تسجيل الحضور والغياب للطلاب بالحصة والفصل بنقرة واحدة.',
    iconName: 'CalendarCheck',
    category: 'teacher',
    subcategory: 'المتابعة اليومية',
    roles: ['teacher', 'school_vice_principal', 'school_principal', 'educational_supervisor'],
    permissions: ['manage_attendance'],
    route: 'attendance_section',
    featured: true,
    quickAccess: true,
    status: 'available',
    badge: 'يومي',
    searchable: true,
  },
  {
    id: 'teacher_exam_studio',
    name: 'استوديو ومحرر الاختبارات',
    description: 'تصميم ورقة الاختبار الرسمية بالهوية الوطنية وشبكة الأسئلة والباربود.',
    iconName: 'ClipboardCheck',
    category: 'teacher',
    subcategory: 'التعليم والتقييم',
    roles: ['teacher', 'exams_sector', 'school_principal', 'educational_supervisor'],
    permissions: ['create_exams'],
    route: 'exams_section',
    featured: true,
    quickAccess: true,
    status: 'available',
    badge: 'شامل',
    searchable: true,
  },
  {
    id: 'teacher_prep_plans',
    name: 'التحضير الإلكتروني والخطط',
    description: 'تحضير الدروس والوحدات التعليمية وفق المعايير الوزارية.',
    iconName: 'BookOpen',
    category: 'teacher',
    subcategory: 'المتابعة اليومية',
    roles: ['teacher', 'curriculum_sector', 'school_principal', 'educational_supervisor'],
    permissions: ['manage_prep'],
    route: 'plans_section',
    featured: true,
    quickAccess: true,
    status: 'available',
    searchable: true,
  },
  {
    id: 'teacher_grades_records',
    name: 'رصد وكشوف الدرجات',
    description: 'إدخال درجات الأعمال والمشاركة والاختبارات واستخراج الكشوف.',
    iconName: 'GraduationCap',
    category: 'teacher',
    subcategory: 'التعليم والتقييم',
    roles: ['teacher', 'school_vice_principal', 'school_principal'],
    permissions: ['manage_grades'],
    route: 'grades_section',
    featured: true,
    quickAccess: true,
    status: 'available',
    searchable: true,
  },
  {
    id: 'teacher_question_bank',
    name: 'بنك أسئلة المادة',
    description: 'أرشيف الأسئلة المبوب حسب الدروس والمعايير ومستويات المعرفة.',
    iconName: 'Archive',
    category: 'teacher',
    subcategory: 'التعليم والتقييم',
    roles: ['teacher', 'exams_sector', 'curriculum_sector', 'educational_supervisor'],
    permissions: ['manage_questions'],
    route: 'question_bank',
    featured: false,
    quickAccess: true,
    status: 'available',
    searchable: true,
  },
  {
    id: 'teacher_omr_sheets',
    name: 'التصحيح الآلي OMR',
    description: 'توليد أوراق الفقاعات وتصحيحها الآلي عبر الكاميرا والماسح الضوئي.',
    iconName: 'Workflow',
    category: 'teacher',
    subcategory: 'التعليم والتقييم',
    roles: ['teacher', 'exams_sector', 'school_principal'],
    permissions: ['process_omr'],
    route: 'bubble_sheets',
    featured: true,
    quickAccess: true,
    status: 'new',
    badge: 'أتمتة OMR',
    searchable: true,
  },
  {
    id: 'teacher_timetable',
    name: 'جدول الحصص الأسبوعي',
    description: 'عرض جدول النصاب الأسبوعي والقاعات ومواعيد الحصص.',
    iconName: 'CalendarDays',
    category: 'teacher',
    subcategory: 'المتابعة اليومية',
    roles: ['teacher', 'school_principal', 'school_vice_principal'],
    permissions: ['view_timetable'],
    route: 'timetables_section',
    featured: false,
    quickAccess: true,
    status: 'available',
    searchable: true,
  },
  {
    id: 'teacher_students_management',
    name: 'سجلات وملفات الطلاب',
    description: 'متابعة قائمة الطلاب الموكلين وملاحظات السلوك والأداء.',
    iconName: 'Users',
    category: 'teacher',
    subcategory: 'الطلاب',
    roles: ['teacher', 'school_principal', 'school_vice_principal', 'student_counselor'],
    permissions: ['view_students'],
    route: 'students_page',
    featured: false,
    quickAccess: false,
    status: 'available',
    searchable: true,
  },
  {
    id: 'teacher_memos',
    name: 'التعاميم والمراسلات المعتمدة',
    description: 'استلام وإرسال التعاميم المدرسية والخطابات الرسمية.',
    iconName: 'Mail',
    category: 'teacher',
    subcategory: 'التواصل والإدارة',
    roles: ['teacher', 'school_principal', 'general_admin'],
    permissions: ['send_memos'],
    route: 'official_memos',
    featured: false,
    quickAccess: false,
    status: 'available',
    searchable: true,
  },
  {
    id: 'teacher_reports',
    name: 'التقارير والإحصائيات الأكاديمية',
    description: 'رسوم بيانية وتحليلات شاملة لنسب النجاح والغياب ومستوى الفصل.',
    iconName: 'ChartNoAxesCombined',
    category: 'teacher',
    subcategory: 'التواصل والإدارة',
    roles: ['teacher', 'school_principal', 'educational_supervisor', 'governorate_office'],
    permissions: ['view_reports'],
    route: 'analytical_dashboard',
    featured: false,
    quickAccess: false,
    status: 'available',
    searchable: true,
  },

  // ==========================================
  // 3. خدمات ولي الأمر (Parent Services)
  // ==========================================
  {
    id: 'parent_children_track',
    name: 'متابعة شؤون الأبناء',
    description: 'اختيار ومتابعة المستوى العلمي والسلوكي لكل ابن في مكان واحد.',
    iconName: 'Users',
    category: 'parent',
    subcategory: 'الأبناء',
    roles: ['parent'],
    permissions: ['view_children'],
    route: 'student_services',
    featured: true,
    quickAccess: true,
    status: 'available',
    searchable: true,
  },
  {
    id: 'parent_attendance',
    name: 'حضور وانضباط الأبناء',
    description: 'متابعة سجل الغياب والحضور اليومي والتأخير الصباحي.',
    iconName: 'CalendarCheck',
    category: 'parent',
    subcategory: 'المتابعة',
    roles: ['parent'],
    permissions: ['view_child_attendance'],
    route: 'attendance_section',
    featured: true,
    quickAccess: true,
    status: 'available',
    badge: 'متابعة',
    searchable: true,
  },
  {
    id: 'parent_grades',
    name: 'نتائج ودرجات الابن',
    description: 'استعراض تقارير الاختبارات المدرسية وكشوف الدرجات الشهرية.',
    iconName: 'GraduationCap',
    category: 'parent',
    subcategory: 'الدراسة',
    roles: ['parent'],
    permissions: ['view_child_grades'],
    route: 'grades_section',
    featured: true,
    quickAccess: true,
    status: 'available',
    searchable: true,
  },
  {
    id: 'parent_timetable',
    name: 'جدول الحصص والاختبارات',
    description: 'معرفة جدول المواد والمواضيع اليومية ومواعيد التقييم القادمة.',
    iconName: 'CalendarDays',
    category: 'parent',
    subcategory: 'الدراسة',
    roles: ['parent'],
    permissions: ['view_child_timetable'],
    route: 'timetables_section',
    featured: false,
    quickAccess: true,
    status: 'available',
    searchable: true,
  },
  {
    id: 'parent_memos',
    name: 'الرسائل والتعاميم المدرسية',
    description: 'الاطلاع على إشعارات المدرسة والقرارات الإدارية الخاصة بالأبناء.',
    iconName: 'Bell',
    category: 'parent',
    subcategory: 'التواصل',
    roles: ['parent'],
    permissions: ['view_parent_memos'],
    route: 'official_memos',
    featured: false,
    quickAccess: false,
    status: 'available',
    searchable: true,
  },

  // ==========================================
  // 4. الأتمتة والإدارة (Automation & Management)
  // ==========================================
  {
    id: 'auto_exam_builder',
    name: 'محرر ومولد الامتحانات',
    description: 'أتمتة بناء ورقة الامتحان الرسمي مع الباربود والتنسيق الموحد.',
    iconName: 'ClipboardCheck',
    category: 'automation',
    subcategory: 'إنشاء المستندات',
    roles: ['teacher', 'exams_sector', 'school_principal', 'ministry'],
    permissions: ['build_exams'],
    route: 'exams_section',
    featured: true,
    quickAccess: true,
    status: 'available',
    badge: 'أتمتة',
    searchable: true,
  },
  {
    id: 'auto_certificates',
    name: 'محرر الشهادات المعتمدة',
    description: 'إصدار وتصميم شهادات النجاح والتفوق والشكر بالختم الرقمي.',
    iconName: 'BadgeCheck',
    category: 'automation',
    subcategory: 'إنشاء المستندات',
    roles: ['school_principal', 'teacher', 'governorate_office', 'ministry'],
    permissions: ['issue_certificates'],
    route: 'certificates_section',
    featured: true,
    quickAccess: true,
    status: 'available',
    badge: 'رسمي',
    searchable: true,
  },
  {
    id: 'auto_official_memos',
    name: 'محرر التعاميم والقرارات',
    description: 'صياغة المراسلات الإدارية الموثقة بـ QR والترقيم التلقائي.',
    iconName: 'Mail',
    category: 'automation',
    subcategory: 'إنشاء المستندات',
    roles: ['ministry', 'governorate_office', 'directorate_office', 'school_principal', 'general_admin'],
    permissions: ['issue_memos'],
    route: 'official_memos',
    featured: true,
    quickAccess: true,
    status: 'available',
    searchable: true,
  },
  {
    id: 'auto_timetable_generator',
    name: 'مولد الجداول الدراسية',
    description: 'خوارزمية أتمتة التوزيع الأسبوعي للحصص والمعلمين ودفع التعارض.',
    iconName: 'Workflow',
    category: 'automation',
    subcategory: 'المعالجة والأتمتة',
    roles: ['school_principal', 'school_vice_principal', 'teacher'],
    permissions: ['generate_timetable'],
    route: 'timetables_section',
    featured: false,
    quickAccess: false,
    status: 'available',
    searchable: true,
  },
  {
    id: 'auto_templates_gallery',
    name: 'مركز القوالب الوطنية الرسمية',
    description: 'مكتبة تضم أكثر من 200 قالب رسمي معتمد للمؤسسات والمدارس.',
    iconName: 'Library',
    category: 'automation',
    subcategory: 'القوالب',
    roles: ['teacher', 'school_principal', 'ministry', 'exams_sector', 'curriculum_sector'],
    permissions: ['use_templates'],
    route: 'templates_gallery',
    featured: false,
    quickAccess: true,
    status: 'available',
    badge: '200+ قالب',
    searchable: true,
  },
  {
    id: 'auto_archive',
    name: 'الأرشيف والسجل الإلكتروني',
    description: 'توثيق وتشفير المستندات الصادرة والقرارات وحفظها في السجل.',
    iconName: 'Archive',
    category: 'automation',
    subcategory: 'الأرشفة',
    roles: ['school_principal', 'general_admin', 'governorate_office', 'ministry'],
    permissions: ['view_archive'],
    route: 'archive_section',
    featured: false,
    quickAccess: false,
    status: 'available',
    searchable: true,
  },
  {
    id: 'auto_export_center',
    name: 'مركز التصدير والطباعة',
    description: 'تصدير جماعي للوثائق والكشوف بصيغ PDF وExcel والطباعة المباشرة.',
    iconName: 'ChartNoAxesCombined',
    category: 'automation',
    subcategory: 'التصدير',
    roles: ['teacher', 'school_principal', 'general_admin', 'exams_sector'],
    permissions: ['export_data'],
    route: 'print_export',
    featured: false,
    quickAccess: false,
    status: 'available',
    searchable: true,
  },

  // ==========================================
  // 5. الإدارة العامة والأفراد (Admin & Staff)
  // ==========================================
  {
    id: 'admin_students_page',
    name: 'إدارة الطلاب والشؤون المدرسية',
    description: 'قواعد بيانات الطلاب الكلية، السجلات، وتوزيع الفصول.',
    iconName: 'Users',
    category: 'admin',
    subcategory: 'الأفراد والأدوار',
    roles: ['school_principal', 'school_vice_principal', 'student_counselor', 'governorate_office', 'ministry'],
    permissions: ['manage_students'],
    route: 'students_page',
    featured: true,
    quickAccess: true,
    status: 'available',
    searchable: true,
  },
  {
    id: 'admin_teachers_page',
    name: 'إدارة الكادر المعلم والأكاديمي',
    description: 'دليل المعلمين، الأنصبة الأسبوعية، والتخصصات.',
    iconName: 'UserRoundCheck',
    category: 'admin',
    subcategory: 'الأفراد والأدوار',
    roles: ['school_principal', 'directorate_office', 'governorate_office', 'ministry'],
    permissions: ['manage_teachers'],
    route: 'teachers_page',
    featured: true,
    quickAccess: true,
    status: 'available',
    searchable: true,
  },
  {
    id: 'admin_analytics',
    name: 'إحصائيات وتحليلات المنظومة',
    description: 'مؤشرات الأداء الكلية للمؤسسة ومعدلات الانضباط والتحصيل.',
    iconName: 'ChartNoAxesCombined',
    category: 'admin',
    subcategory: 'التقارير والإحصاء',
    roles: ['ministry', 'governorate_office', 'directorate_office', 'school_principal'],
    permissions: ['view_analytics'],
    route: 'analytical_dashboard',
    featured: true,
    quickAccess: true,
    status: 'available',
    searchable: true,
  },
  {
    id: 'admin_settings',
    name: 'إعدادات المنظومة والصلاحيات',
    description: 'ضبط الهوية الرسمية للمؤسسة، الترويسة الوطنية وسجل النشاط.',
    iconName: 'Settings',
    category: 'admin',
    subcategory: 'الإعدادات',
    roles: ['ministry', 'governorate_office', 'directorate_office', 'school_principal', 'teacher', 'student', 'parent'],
    permissions: ['manage_settings'],
    route: 'settings',
    featured: false,
    quickAccess: false,
    status: 'available',
    searchable: true,
  }
];

// ==========================================
// Helper Utility Functions for RBAC & Search
// ==========================================

/**
 * Returns services filtered by user role ID.
 */
export function getServicesByRole(roleId: EducationRoleID): ServiceTool[] {
  return ALL_SERVICES_REGISTRY.filter(tool => {
    // If role is in tool.roles, allow access.
    // Allow ministry and school_principal to see admin/all tools.
    if (roleId === 'ministry' || roleId === 'school_principal') return true;
    return tool.roles.includes(roleId);
  });
}

/**
 * Returns services filtered by category and optional role ID.
 */
export function getServicesByCategory(category: ServiceCategory, roleId?: EducationRoleID): ServiceTool[] {
  let tools = ALL_SERVICES_REGISTRY.filter(t => t.category === category);
  if (roleId) {
    tools = tools.filter(t => {
      if (roleId === 'ministry' || roleId === 'school_principal') return true;
      return t.roles.includes(roleId);
    });
  }
  return tools;
}

/**
 * Searches services by query string (name, description, subcategory) filtered by role ID.
 */
export function searchServices(query: string, roleId?: EducationRoleID): ServiceTool[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  let tools = ALL_SERVICES_REGISTRY;
  if (roleId) {
    tools = tools.filter(t => {
      if (roleId === 'ministry' || roleId === 'school_principal') return true;
      return t.roles.includes(roleId);
    });
  }

  return tools.filter(t => 
    t.name.toLowerCase().includes(cleanQuery) ||
    t.description.toLowerCase().includes(cleanQuery) ||
    t.subcategory.toLowerCase().includes(cleanQuery)
  );
}

/**
 * Get Quick Access services for a role.
 */
export function getQuickAccessServices(roleId: EducationRoleID): ServiceTool[] {
  return getServicesByRole(roleId).filter(t => t.quickAccess);
}

/**
 * Get Featured services for a role.
 */
export function getFeaturedServices(roleId: EducationRoleID): ServiceTool[] {
  return getServicesByRole(roleId).filter(t => t.featured);
}
