import React, { useState } from 'react';
import { 
  Sparkles, 
  FileSignature, 
  Award, 
  FileText, 
  BarChart3, 
  Users2, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  QrCode, 
  FileSpreadsheet, 
  Plus, 
  Search, 
  ArrowRight, 
  ChevronLeft, 
  Printer, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  FolderCheck,
  Layers,
  FileCode2,
  FileCheck2
} from 'lucide-react';

interface ToolCard {
  id: string;
  title: string;
  description: string;
  icon: any;
  route: string;
  badge?: string;
  count?: string;
}

export default function AutomationCenterPage({ onSelect, onBack }: { onSelect: (route: string) => void, onBack?: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const documentTools: ToolCard[] = [
    { id: 'exam_editor', title: 'محرر ومولد الامتحانات', description: 'تصميم ورقة اختبارية رسمية مع الترويسة، الرقمنة، والباربود للأسئلة', icon: FileSignature, route: 'exams_section', badge: 'شامل', count: '124 نموذجاً' },
    { id: 'certificates', title: 'محرر الشهادات والتقدير', description: 'استخراج وتصدير شهادات النجاح والتفوق بالأختام المعتمدة', icon: Award, route: 'certificates_section', badge: 'رسمي', count: '128 شهادة' },
    { id: 'official_memos', title: 'محرر الخطابات والتعاميم', description: 'صياغة التعاميم الإدارية والمخاطبات الرسمية للوزارة والمكاتب', icon: FileText, route: 'document_editor', count: '45 خطابات' },
    { id: 'reports_builder', title: 'محيط التقارير الشاملة', description: 'بناء وتجميع التقارير الإحصائية والتحليلية للأداء المدرسي', icon: BarChart3, route: 'analytical_dashboard', count: '18 تقريراً' },
    { id: 'meeting_minutes', title: 'محرر محاضر الاجتماعات', description: 'توثيق واعتماذ القرارات ومحاضر مجالس الآباء والمواد', icon: Users2, route: 'official_memos' },
  ];

  const editorTools: ToolCard[] = [
    { id: 'grades_editor', title: 'محرر كشوف الدرجات', description: 'معالجة ورصد الدرجات التلقائي وحساب المعدلات والتقديرات', icon: GraduationCap, route: 'grades_section', badge: 'تلقائي' },
    { id: 'timetable_editor', title: 'محرر ومولد الجداول', description: 'خوارزمية توزيع الجداول وتفادي تعارض الحصص والقاعات', icon: Calendar, route: 'timetables_section' },
    { id: 'omr_scanner', title: 'أتمتة التصحيح OMR', description: 'تصميم أوراق الإجابات وتصحيحها ذكياً عبر الكاميرا والمسح', icon: QrCode, route: 'bubble_sheets', badge: 'ذكاء اصطناعي' },
    { id: 'preparation_editor', title: 'محرر التحضير الإلكتروني', description: 'استيراد الأهداف وتوليد تحضير الحصص والدروس اليومية', icon: BookOpen, route: 'plans_section' },
    { id: 'template_hub', title: 'مركز القوالب الوطنية', description: 'مكتبة تضم أكثر من 200 قالب رسمي معتمد للمدارس والمكاتب', icon: Layers, route: 'templates_gallery', badge: '200+ قالب' },
  ];

  const archiveTools: ToolCard[] = [
    { id: 'archive', title: 'الأرشيف والسجل الوطني', description: 'أرشفة وتوثيق المحررات والقرارات مع استرجاع لحظي مشفر', icon: FolderCheck, route: 'archive_section' },
    { id: 'export_center', title: 'مركز التصدير والطباعة', description: 'تصدير جماعي بصيغ PDF, Excel مع التوقيع الإلكتروني والرمز QR', icon: Printer, route: 'print_export' },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 font-sans bg-slate-50 min-h-full" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-[#004B6E] text-white rounded-3xl p-6 md:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 bg-sky-400/20 px-3 py-1 rounded-full text-xs font-black text-sky-200 border border-sky-300/30">
            <Sparkles size={14} className="text-amber-300" />
            <span>منصة الأتمتة وإنشاء المستندات المعتمدة</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black">مركز الأتمتة والإدارة الموحد</h1>
          <p className="text-sky-100 font-bold text-xs md:text-sm max-w-xl leading-relaxed">
            أنشئ مستنداتك، تقاريرك، امتحاناتك، وشهاداتك التعليمية والإدارية بسرعة ودقة فائقة مع التوقيع الرقمي والأختام المعتمدة.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <button 
            onClick={() => onSelect('exams_section')}
            className="flex items-center gap-2 bg-[#38BDF8] hover:bg-sky-400 text-slate-900 font-black px-5 py-3 rounded-2xl text-xs transition-all shadow-md"
          >
            <Plus size={18} />
            <span>إنشاء مستند جديد</span>
          </button>
        </div>
      </div>

      {/* Section 1: Official Documents Generators */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
          <div>
            <h2 className="text-lg font-black text-[#004B6E]">محررات ومولدات المستندات الرسمية</h2>
            <p className="text-xs font-bold text-slate-400">إنشاء وتصميم النماذج مع الترويسات الرسمية المعتمدة</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {documentTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => onSelect(tool.route)}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:border-sky-300 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#004B6E] flex items-center justify-center font-black group-hover:scale-105 transition-transform">
                      <Icon size={20} />
                    </div>
                    {tool.badge && (
                      <span className="bg-sky-50 text-[#004B6E] border border-sky-200 px-2 py-0.5 rounded-full text-[10px] font-black">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-black text-slate-900 text-sm group-hover:text-[#004B6E] transition-colors mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-slate-500 font-bold text-xs leading-relaxed mb-4">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-black text-slate-700 text-[11px]">{tool.count || 'لبدء العمل'}</span>
                  <div className="w-7 h-7 rounded-xl bg-slate-50 group-hover:bg-[#004B6E] group-hover:text-white text-slate-500 flex items-center justify-center transition-all">
                    <ChevronLeft size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Advanced Editing Tools & Engines */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
          <div>
            <h2 className="text-lg font-black text-[#004B6E]">محركات وأدوات المعالجة والتصحيح</h2>
            <p className="text-xs font-bold text-slate-400">أتمتة عملية التصحيح، الجداول، ورصد الدرجات</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {editorTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => onSelect(tool.route)}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:border-sky-300 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-black group-hover:scale-105 transition-transform">
                      <Icon size={20} />
                    </div>
                    {tool.badge && (
                      <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full text-[10px] font-black">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-black text-slate-900 text-sm group-hover:text-[#004B6E] transition-colors mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-slate-500 font-bold text-xs leading-relaxed mb-4">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-black text-slate-700 text-[11px]">تشغيل الأدوات</span>
                  <div className="w-7 h-7 rounded-xl bg-slate-50 group-hover:bg-[#004B6E] group-hover:text-white text-slate-500 flex items-center justify-center transition-all">
                    <ChevronLeft size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Archiving & Exporting */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
          <div>
            <h2 className="text-lg font-black text-[#004B6E]">التصدير، الطباعة والأرشيف الرقمي</h2>
            <p className="text-xs font-bold text-slate-400">تصدير الملفات الرسمية، التوقيع، والطباعة بضغطة زر</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {archiveTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => onSelect(tool.route)}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-sky-300 shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#004B6E] text-[#38BDF8] flex items-center justify-center font-black group-hover:scale-105 transition-transform">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base group-hover:text-[#004B6E] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-slate-500 font-bold text-xs mt-0.5">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-slate-50 group-hover:bg-[#004B6E] group-hover:text-white text-slate-600 flex items-center justify-center transition-all">
                  <ChevronLeft size={20} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
