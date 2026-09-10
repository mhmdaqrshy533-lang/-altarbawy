/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * الرقيم التربوي - البوابة والواجهة الرئيسية (Platform Main Portal)
 * Lead UI/UX & Design System Architecture
 * برمجة وتصميم وتطوير المهندس سهيل الهزبري
 */

import React, { useState, useEffect } from 'react';
import { 
  FileSignature, 
  BookOpen, 
  Award, 
  GraduationCap, 
  UserCheck, 
  Mail, 
  FileText, 
  Wrench, 
  Search, 
  Plus, 
  FolderOpen, 
  Library, 
  Sparkles, 
  Building2, 
  Clock, 
  ArrowLeft,
  CheckCircle2,
  CalendarDays,
  FileSpreadsheet
} from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { RaqeemSectionCard } from './ui/RaqeemSectionCard';
import { RaqeemEmptyState } from './ui/RaqeemEmptyState';
import { RaqeemBadge } from './ui/RaqeemBadge';
import { PersistenceEngine, DocumentSnapshot } from '../core/PersistenceEngine';
import { EducationStandardsEngine } from '../core/standards/EducationStandardsEngine';

interface DashboardProps {
  onSelect: (routeId: string) => void;
  onOpenBadges?: () => void;
}

export default function Dashboard({ onSelect }: DashboardProps) {
  const { currentRole, headerInfo } = useRole();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentProjects, setRecentProjects] = useState<DocumentSnapshot[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [activeCountryName, setActiveCountryName] = useState('الجمهورية اليمنية');

  // Load real active standards and real user projects (NO MOCK DATA)
  useEffect(() => {
    let isMounted = true;

    async function loadRealData() {
      try {
        // 1. Get active educational standard country
        const activeProfile = EducationStandardsEngine.getActiveProfile();
        if (activeProfile?.authority?.countryName && isMounted) {
          setActiveCountryName(activeProfile.authority.countryName);
        }

        // 2. Fetch real projects from persistence engine
        const examProjects = await PersistenceEngine.listProjectsByCategory('exams');
        const bookProjects = await PersistenceEngine.listProjectsByCategory('books');
        const memoProjects = await PersistenceEngine.listProjectsByCategory('memos');

        const combined = [...examProjects, ...bookProjects, ...memoProjects].sort(
          (a, b) => (b.metadata.updatedAt || 0) - (a.metadata.updatedAt || 0)
        );

        if (isMounted) {
          setRecentProjects(combined);
          setIsLoadingProjects(false);
        }
      } catch (err) {
        if (isMounted) {
          setIsLoadingProjects(false);
        }
      }
    }

    loadRealData();
    return () => {
      isMounted = false;
    };
  }, []);

  // The 8 Major Institutional Platform Studios (الأقسام الرئيسية الثمانية)
  const platformStudios = [
    {
      id: 'educational_studio',
      title: 'الاستوديو التعليمي',
      subtitle: 'اختبارات وأوراق عمل',
      description: 'محرر الامتحانات الوزارية والفترية، بنك الأسئلة الموحد، وتوليد أوراق الإجابة المقروءة آلياً OMR.',
      icon: FileSignature,
      route: 'exams_section',
      badge: 'الأساسي',
      countLabel: recentProjects.filter(p => p.metadata.category === 'exams').length > 0 
        ? `${recentProjects.filter(p => p.metadata.category === 'exams').length} مستند` 
        : undefined,
    },
    {
      id: 'books_studio',
      title: 'الكتب والمذكرات',
      subtitle: 'Book Studio',
      description: 'تصميم وإخراج المذكرات الدراسية والكتيبات المنهجية متعددة الصفحات وفق معايير الطباعة A4.',
      icon: BookOpen,
      route: 'books_section',
      badge: 'إصدارات',
      countLabel: recentProjects.filter(p => p.metadata.category === 'books').length > 0 
        ? `${recentProjects.filter(p => p.metadata.category === 'books').length} مذكرة` 
        : undefined,
    },
    {
      id: 'certificates_studio',
      title: 'الشهادات المعتمدة',
      subtitle: 'Certificate Studio',
      description: 'إصدار شهادات التقدير، التخرج، والتفوق مع إمكانية التوليد المجمع وتضمين رموز الاستجابة QR والباركود.',
      icon: Award,
      route: 'certificates_section',
      badge: 'رسمي',
    },
    {
      id: 'results_studio',
      title: 'النتائج والدرجات',
      subtitle: 'Grade Sheets',
      description: 'كشوف رصد الدرجات الشهرية والفصلية، استخراج المعدلات والترتيب التراكمي وتصدير تقارير التحصيل.',
      icon: GraduationCap,
      route: 'grades_section',
    },
    {
      id: 'attendance_studio',
      title: 'الحضور والغياب',
      subtitle: 'Attendance Studio',
      description: 'رصد الغياب والتأخير اليومي للطلاب، سجلات الانضباط المدرسي وإعداد التقارير الإحصائية.',
      icon: UserCheck,
      route: 'attendance_section',
      badge: 'يومي',
    },
    {
      id: 'official_documents',
      title: 'الوثائق الرسمية',
      subtitle: 'Official Documents',
      description: 'صياغة التعاميم الإدارية، الخطابات الموجهة، المذكرات الداخلية، والمراسلات المعتمدة بختم الإدارة.',
      icon: Mail,
      route: 'official_memos',
    },
    {
      id: 'general_documents',
      title: 'المستندات العامة',
      subtitle: 'Document Studio',
      description: 'محرر المستندات والنماذج الحرة، الجداول المدرسية، والمطبوعات الإدارية المخصصة.',
      icon: FileText,
      route: 'document_editor',
    },
    {
      id: 'automation_and_tools',
      title: 'الأدوات والأتمتة',
      subtitle: 'Automation & Tools',
      description: 'مركز تصحيح OMR الآلي، حاسبة الدرجات، مولد الباركود، ومحول الملفات السريع.',
      icon: Wrench,
      route: 'automation_center',
      badge: 'تقني',
    },
  ];

  // Filter studios based on search query
  const filteredStudios = platformStudios.filter((s) => 
    s.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    (s.subtitle && s.subtitle.toLowerCase().includes(searchQuery.trim().toLowerCase()))
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 select-none" dir="rtl">
      
      {/* 1. Hero Section - Balanced, Sovereign, and Responsive */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-sky-50/40 dark:from-slate-900 dark:to-slate-950 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xs">
        {/* Subtle decorative grid motif (No harsh neon) */}
        <div className="absolute inset-0 bg-[radial-gradient(#004B6E_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] dark:opacity-[0.07] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-[#004B6E] dark:text-sky-300 text-xs font-black">
            <Sparkles size={14} />
            <span>محرر الرقيم التربوي — الإصدار السيادي المعتمد</span>
          </div>

          <h1 className="text-fluid-hero font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            منصة إنشاء وإدارة <span className="text-[#004B6E] dark:text-sky-400">الوثائق التعليمية</span>
          </h1>

          <p className="text-fluid-body font-medium text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            المنظومة الوطنية الموحدة لتأطير وإخراج الامتحانات، المذكرات، الشهادات، وكشوف الدرجات المتوافقة مع معايير وزارات التربية والتعليم العربية بدون الحاجة للاتصال بالإنترنت.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelect('exams_section')}
              className="px-5 py-3 rounded-2xl bg-[#004B6E] hover:bg-[#003B57] active:bg-[#002B40] text-white text-xs sm:text-sm font-black shadow-sm transition-all duration-150 flex items-center gap-2 cursor-pointer"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span>إنشاء مستند جديد</span>
            </button>

            <button
              onClick={() => {
                const elem = document.getElementById('recent-projects-section');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 active:bg-slate-100 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <FolderOpen size={18} />
              <span>مشاريعي المحفوظة</span>
              {recentProjects.length > 0 && (
                <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-black px-2 py-0.5 rounded-full tabular-nums">
                  {recentProjects.length}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelect('templates_gallery')}
              className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 active:bg-slate-100 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <Library size={18} />
              <span>مركز القوالب</span>
            </button>

            <a
              href="/Raqeem-Android-Studio-Project.zip"
              download="Raqeem-Android-Studio-Project.zip"
              className="px-4 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-black shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={18} />
              <span>مشروع Android Native (ZIP)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Educational Standards Banner - Sovereign Identity */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-sky-50/70 dark:bg-slate-900/90 border border-sky-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#004B6E] text-white flex items-center justify-center shrink-0">
            <Building2 size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-900 dark:text-white">المعيار التعليمي المعتمد:</span>
              <span className="text-xs font-black text-[#004B6E] dark:text-sky-300 bg-white dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-slate-700 shadow-2xs">
                {activeCountryName}
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              تُطبع الترويسات والشعارات والمسميات الإدارية ونظام رصد الدرجات تلقائياً وفق هذا المعيار.
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelect('standards_center')}
          className="self-end sm:self-center px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-[#004B6E] dark:text-sky-300 border border-sky-200 dark:border-slate-700 text-xs font-black transition-all flex items-center gap-1.5 shrink-0 shadow-2xs"
        >
          <span>تخصيص الهوية والمعايير</span>
          <ArrowLeft size={14} />
        </button>
      </div>

      {/* 3. Main Sections Header & Filter */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>الأقسام والاستوديوهات الرئيسية</span>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">({platformStudios.length})</span>
            </h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              الوصول المباشر إلى بيئات التحرير المتخصصة لإنتاج الوثائق الرسمية والمدرسية.
            </p>
          </div>

          {/* Quick Studio Search */}
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="تصفية الأقسام..."
              className="w-full pl-3 pr-9 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 placeholder-slate-400 outline-hidden focus:border-[#004B6E] focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 transition-all"
            />
          </div>
        </div>

        {/* 4. Responsive Studios Grid (320px 1 col, 600px 2 cols, 900px 3 cols, 1200px 4 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredStudios.map((studio) => (
            <RaqeemSectionCard
              key={studio.id}
              id={studio.id}
              title={studio.title}
              subtitle={studio.subtitle}
              description={studio.description}
              icon={studio.icon}
              badge={studio.badge}
              countLabel={studio.countLabel}
              route={studio.route}
              onClick={onSelect}
            />
          ))}
        </div>

        {filteredStudios.length === 0 && (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500 text-xs font-bold">
            لم يتم العثور على أقسام مطابقة لعبارة البحث "{searchQuery}"
          </div>
        )}
      </section>

      {/* 5. Real Projects Section - Strict Zero Mock Data Policy */}
      <section id="recent-projects-section" className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <FolderOpen size={20} className="text-[#004B6E] dark:text-sky-400" />
              <span>مشاريعي ومستنداتي المحفوظة</span>
              {recentProjects.length > 0 && (
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 tabular-nums">
                  ({recentProjects.length})
                </span>
              )}
            </h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              المستندات والامتحانات المحفوظة محلياً في وعاء التخزين المستديم دون الحاجة لإنترنت.
            </p>
          </div>

          {recentProjects.length > 0 && (
            <button
              onClick={() => onSelect('archive_section')}
              className="text-xs font-extrabold text-[#004B6E] dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              <span>عرض كل الأرشيف</span>
              <ArrowLeft size={14} />
            </button>
          )}
        </div>

        {isLoadingProjects ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs font-bold animate-pulse">
            جاري فحص المستندات المحفوظة في محرك التخزين المستديم...
          </div>
        ) : recentProjects.length === 0 ? (
          /* Empty State strictly as instructed (no fake data) */
          <RaqeemEmptyState
            icon={FolderOpen}
            title="لم تبدأ أي مشروع بعد"
            description="جميع الوثائق، الاختبارات، والمذكرات التي تنشئها وتعدلها ستُحفظ هنا تلقائياً لسهولة استئناف العمل والتصدير في أي وقت."
            actionLabel="إنشاء أول مستند الآن"
            onAction={() => onSelect('exams_section')}
          />
        ) : (
          /* Real User Projects List */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {recentProjects.slice(0, 6).map((proj) => {
              const dateStr = proj.metadata.updatedAt 
                ? new Date(proj.metadata.updatedAt).toLocaleDateString('ar-EG', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : 'مسودة حديثة';

              const categoryBadge = proj.metadata.category === 'exams' 
                ? 'امتحان' 
                : proj.metadata.category === 'books' 
                  ? 'مذكرة' 
                  : 'مستند';

              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    if (proj.metadata.category === 'exams') {
                      onSelect('exams_section');
                    } else if (proj.metadata.category === 'books') {
                      onSelect('books_section');
                    } else {
                      onSelect('document_editor');
                    }
                  }}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-slate-800 text-[#004B6E] dark:text-sky-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <FileSignature size={18} />
                    </div>
                    <div className="overflow-hidden text-right">
                      <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 truncate group-hover:text-[#004B6E] dark:group-hover:text-sky-300 transition-colors">
                        {proj.metadata.title || 'مستند بدون عنوان'}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[10px] font-bold text-slate-400">
                        <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400">
                          {categoryBadge}
                        </span>
                        <span className="flex items-center gap-1 tabular-nums">
                          <Clock size={11} />
                          {dateStr}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ArrowLeft size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-[#004B6E] dark:group-hover:text-sky-400 group-hover:-translate-x-1 transition-all shrink-0" />
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
}
