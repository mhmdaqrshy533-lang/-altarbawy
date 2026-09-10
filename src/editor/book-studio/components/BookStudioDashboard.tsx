import React, { useState, useEffect } from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { DOCUMENT_TYPE_CONFIGS } from '../data';
import { BookDocumentType, BookSubject } from '../types';
import { 
  BookOpen, 
  BookMarked, 
  Award, 
  FileSpreadsheet, 
  CheckSquare, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  FlaskConical, 
  Layout, 
  Newspaper, 
  FileText, 
  Plus, 
  Search, 
  FolderOpen, 
  Calendar, 
  Trash2, 
  Copy, 
  Download, 
  Eye, 
  Edit3, 
  ArrowRight,
  Layers,
  Palette,
  Check,
  ChevronLeft
} from 'lucide-react';
import { motion } from 'motion/react';

const ICON_MAP: Record<string, any> = {
  BookOpen,
  BookMarked,
  Award,
  FileSpreadsheet,
  CheckSquare,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  FlaskConical,
  Layout,
  Newspaper,
  FileText
};

interface BookStudioDashboardProps {
  onBackToMainOS: () => void;
}

export const BookStudioDashboard: React.FC<BookStudioDashboardProps> = ({ onBackToMainOS }) => {
  const { 
    savedProjects, 
    loadSavedProjects, 
    startWizardWithDocType, 
    openProject, 
    duplicateProject, 
    deleteProject,
    importProjectFromFile 
  } = useBookStudioStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');

  useEffect(() => {
    loadSavedProjects();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          const success = importProjectFromFile(content);
          if (!success) {
            alert('عذراً، الملف المحدد ليس مشروع كتاب رقيم (.raqbook) صالح.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredProjects = savedProjects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubjectFilter === 'all' || p.subject === selectedSubjectFilter;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans select-none pb-12" dir="rtl">
      
      {/* Top Navigation Header Bar */}
      <div className="bg-emerald-950 border-b border-emerald-900 sticky top-0 z-30 shadow-md backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBackToMainOS}
              className="px-3 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-slate-200 hover:text-white border border-emerald-800 transition-all flex items-center gap-2 text-xs font-bold"
              title="العودة للوحة تحكم الرقيم"
            >
              <ArrowRight size={16} />
              <span>الرئيسية</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-900 text-amber-300 rounded-xl border border-emerald-800 shadow-sm">
                <BookMarked size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-base font-black text-white flex items-center gap-2">
                  استوديو الكتب والملازم المنهجية
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Raqeem Book Studio
                  </span>
                </h1>
                <p className="text-[11px] font-medium text-emerald-200/80">إعداد وتنسيق الكتب والملازم والمقررات الدراسية</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="px-3.5 py-2 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 hover:text-white border border-emerald-700/60 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2">
              <Download size={14} />
              <span>استيراد مشروع (.raqbook)</span>
              <input type="file" accept=".raqbook,.json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-10">

        {/* Hero Banner */}
        <div className="bg-emerald-950/80 border border-emerald-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-900/80 border border-emerald-700/60 text-amber-300 rounded-md text-xs font-bold">
              <Sparkles size={13} className="text-amber-400" />
              <span>نظام التحرير والإخراج المنهجي</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white leading-tight">
              إعداد الكُتب والوثائق التعليمية بنسق منظم ودقيق
            </h2>
            <p className="text-xs font-medium text-emerald-100/80 leading-relaxed">
              اختر نوع المستند المطلوب للبدء مباشرة في إنشاء وتنسيق صفحات المادة والفهارس والأغلفة.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 z-10">
            <div className="bg-slate-900/90 border border-emerald-800/60 px-4 py-3 rounded-xl text-center space-y-0.5 min-w-[110px]">
              <span className="text-xl font-black text-amber-400 block">{savedProjects.length}</span>
              <span className="text-[10px] font-bold text-slate-400 block">مشاريع محفوظة</span>
            </div>
            <div className="bg-slate-900/90 border border-emerald-800/60 px-4 py-3 rounded-xl text-center space-y-0.5 min-w-[110px]">
              <span className="text-xl font-black text-emerald-400 block">12</span>
              <span className="text-[10px] font-bold text-slate-400 block">نماذج معتمدة</span>
            </div>
          </div>
        </div>

        {/* Section 1: Create New Book Cards (12 Types) */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Plus size={20} className="text-indigo-400" />
                <span>إنشاء مستند جديد (اختر النوع)</span>
              </h3>
              <p className="text-xs font-bold text-slate-400 mt-1">بطاقات النماذج المعتمدة للتأليف والإخراج</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {DOCUMENT_TYPE_CONFIGS.map((config) => {
              const IconComp = ICON_MAP[config.iconName] || BookOpen;
              return (
                <motion.div
                  key={config.id}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => startWizardWithDocType(config.id)}
                  className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between relative group overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r ${config.gradient}`} />
                  
                  <div>
                    <div className="flex items-center justify-between mb-4 pt-1">
                      <div className={`p-3 rounded-2xl bg-gradient-to-tr ${config.gradient} text-white shadow-md`}>
                        <IconComp size={22} className="stroke-[2.5]" />
                      </div>
                      <span className="px-2.5 py-0.5 bg-slate-800 border border-slate-700 text-indigo-300 text-[10px] font-black rounded-lg">
                        {config.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-white mb-1 group-hover:text-indigo-300 transition-colors">
                      {config.title}
                    </h4>
                    <p className="text-xs font-bold text-slate-400 leading-relaxed mb-3">
                      {config.subtitle}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium line-clamp-2">
                      {config.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-indigo-400 group-hover:text-white transition-colors text-xs font-black">
                    <span>بدء التحرير بالمساعد</span>
                    <ChevronLeft size={16} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Authored Projects Library (List & Search) */}
        <div className="pt-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <FolderOpen size={20} className="text-amber-400" />
                <span>مشاريع الكتب والملازم المحفوظة ({filteredProjects.length})</span>
              </h3>
              <p className="text-xs font-bold text-slate-400 mt-1">إدارة، استكمال التحرير، والتصدير المباشر</p>
            </div>

            {/* Search & Subject Filter Bar */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text"
                  placeholder="بحث في الكتب والملازم..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs font-bold text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <select
                value={selectedSubjectFilter}
                onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">جميع المواد الدراسية</option>
                <option value="الرياضيات">الرياضيات</option>
                <option value="الفيزياء">الفيزياء</option>
                <option value="الكيمياء">الكيمياء</option>
                <option value="الأحياء">الأحياء</option>
                <option value="اللغة العربية">اللغة العربية</option>
                <option value="اللغة الإنجليزية">اللغة الإنجليزية</option>
                <option value="التربية الإسلامية">التربية الإسلامية</option>
                <option value="التاريخ">التاريخ</option>
                <option value="الجغرافيا">الجغرافيا</option>
              </select>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-800/80 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-slate-700">
                <BookOpen size={32} />
              </div>
              <h4 className="text-base font-black text-slate-200">لا توجد مشاريع ملازم أو كتب مخصصة حتى الآن</h4>
              <p className="text-xs font-bold text-slate-400 max-w-md mx-auto">
                اختر أي بطاقة من الأعلى للبدء في تأليف وإخراج أول كتاب أو ملزمة تعليمية بنظام التنسيق التلقائي.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800/60 rounded-xl text-[10px] font-black">
                        {project.subject}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                        <Calendar size={13} />
                        {new Date(project.updatedAt).toLocaleDateString('ar-EG')}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-white line-clamp-1">{project.title}</h4>
                      <p className="text-xs font-bold text-slate-400 mt-0.5">{project.stage} — {project.grade}</p>
                    </div>

                    {/* Book Metadata Mini Info */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-2xl border border-slate-800 text-[11px] font-bold text-slate-300">
                      <div>
                        <span className="text-slate-500 block text-[9px]">المؤلف:</span>
                        <span className="truncate block font-black text-white">{project.author || 'غير محدد'}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">عدد الصفحات:</span>
                        <span className="truncate block font-black text-indigo-400">{project.pages.length} صفحة</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openProject(project.id)}
                      className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30"
                    >
                      <Edit3 size={14} />
                      <span>فتح الاستوديو</span>
                    </button>

                    <button
                      onClick={() => duplicateProject(project.id)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors"
                      title="نسخ المشروع"
                    >
                      <Copy size={15} />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`هل أنت تأكد من حذف مشروع (${project.title})؟`)) {
                          deleteProject(project.id);
                        }
                      }}
                      className="p-2 bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 rounded-xl transition-colors"
                      title="حذف المشروع"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
