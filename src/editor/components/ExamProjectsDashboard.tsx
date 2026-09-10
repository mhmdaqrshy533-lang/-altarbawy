import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Search, FileText, Download, Upload, Copy, Trash2, Edit3, 
  Calendar, School, BookOpen, Layers, Sparkles, FolderPlus, ArrowLeft, RefreshCw
} from 'lucide-react';
import { useExamProjectsStore, ExamProject } from '../store/useExamProjectsStore';
import { useEditorStore } from '../store/useEditorStore';
import { NewExamDialog } from './NewExamDialog';
import { ExamMetadata } from '../types';

interface ExamProjectsDashboardProps {
  onOpenProject: () => void;
}

export const ExamProjectsDashboard: React.FC<ExamProjectsDashboardProps> = ({ onOpenProject }) => {
  const { 
    projects, loadProjects, createProject, openProject, duplicateProject, 
    deleteProject, exportRaqFile, importRaqFile 
  } = useExamProjectsStore();
  
  const { setDocument } = useEditorStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('الكل');
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleOpen = (id: string) => {
    const doc = openProject(id);
    if (doc) {
      setDocument(doc);
      onOpenProject();
    }
  };

  const handleCreateNew = (metadata: Partial<ExamMetadata>, title: string) => {
    const newProj = createProject(metadata, title);
    if (newProj && newProj.document) {
      setDocument(newProj.document);
      onOpenProject();
    }
  };

  const handleImportRaqClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          const importedProj = importRaqFile(content);
          if (importedProj && importedProj.document) {
            setDocument(importedProj.document);
            onOpenProject();
          } else {
            alert('تعذر استيراد الملف. يرجى التأكد من اختيار ملف .raq صحيح');
          }
        }
      };
      reader.readAsText(file);
    }
    // reset input
    if (e.target) e.target.value = '';
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.grade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'الكل' || p.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const formatDate = (timestamp: number) => {
    try {
      return new Date(timestamp).toLocaleDateString('ar-YE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return '';
    }
  };

  const getTemplateBadge = (templateType: string) => {
    switch (templateType) {
      case 'automated':
        return { label: 'أتمتة OMR', bg: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'private':
        return { label: 'مدارس خاصة', bg: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      case 'bubblesheet':
        return { label: 'ورقة تظليل', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
      default:
        return { label: 'وزاري يمني', bg: 'bg-blue-100 text-blue-800 border-blue-200' };
    }
  };

  return (
    <div className="flex-1 bg-slate-100/70 p-4 md:p-8 overflow-y-auto custom-scrollbar font-sans select-none" dir="rtl">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".raq,.json" 
        className="hidden" 
      />

      {/* Top Banner & Header */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-2 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold">
              <Sparkles size={14} />
              <span>محرر الرقيم للامتحانات والأتمتة</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">مشروعات الامتحانات القابلة للتحرير والتصدير</h1>
            <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
              احفظ امتحاناتك كـ مشروعات مستقلة، قم بالتعديل، الاستنسال، وتصدير/استيراد صيغ <code className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-indigo-300">.raq</code> لتبادل الامتحانات بسهولة بدون إنترنت.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
            <button
              onClick={handleImportRaqClick}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-extrabold transition-all flex items-center gap-2 backdrop-blur-md active:scale-95"
              title="استيراد مشروع .raq"
            >
              <Upload size={16} />
              <span>استيراد مشروع (.raq)</span>
            </button>

            <button
              onClick={() => setIsNewDialogOpen(true)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white text-xs font-black shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2.5 active:scale-95"
            >
              <Plus size={18} className="stroke-[3]" />
              <span>إنشاء إمتحان جديد</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3.5 top-3 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="ابحث باسم الامتحان، المادة، المدرسة..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 custom-scrollbar">
            {['الكل', 'الرياضيات', 'الفيزياء', 'العلوم', 'اللغة العربية', 'التربية الإسلامية', 'الاجتماعيات', 'اللغة الإنجليزية'].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedSubject === sub 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((proj) => {
              const badge = getTemplateBadge(proj.templateType);
              return (
                <div 
                  key={proj.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                        {badge.label}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(proj.lastModified)}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-indigo-600 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1 flex items-center gap-1.5">
                        <School size={13} className="text-slate-400 shrink-0" />
                        <span>{proj.school}</span>
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-600 border-t border-slate-100">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <BookOpen size={12} className="text-indigo-500" />
                        {proj.subject}
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded-md">
                        {proj.grade}
                      </span>
                      {proj.document?.pages?.[0]?.elements && (
                        <span className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-500">
                          {proj.document.pages[0].elements.length} عناصر
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpen(proj.id)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <Edit3 size={14} />
                      <span>تعديل الامتحان</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => duplicateProject(proj.id)}
                        className="p-2 rounded-xl text-slate-500 hover:bg-slate-200/70 hover:text-indigo-600 transition-colors"
                        title="نسخ وتكرار المشروع"
                      >
                        <Copy size={15} />
                      </button>

                      <button
                        onClick={() => exportRaqFile(proj.id)}
                        className="p-2 rounded-xl text-slate-500 hover:bg-slate-200/70 hover:text-emerald-600 transition-colors"
                        title="تصدير ملف .raq"
                      >
                        <Download size={15} />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`هل أنت تأكد من حذف المشروع "${proj.title}"؟`)) {
                            deleteProject(proj.id);
                          }
                        }}
                        className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        title="حذف المشروع"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-lg mx-auto my-8 space-y-4">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto">
              <FolderPlus size={32} />
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-lg">لا توجد مشروعات امتحانات مطابقة</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                قم باختيار "إنشاء إمتحان جديد" لتعيين الترويسة وفتح محرر الرقيم الذكي
              </p>
            </div>
            <button
              onClick={() => setIsNewDialogOpen(true)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-md transition-all inline-flex items-center gap-2"
            >
              <Plus size={16} />
              <span>إنشاء إمتحان جديد الآن</span>
            </button>
          </div>
        )}
      </div>

      {/* New Exam Dialog Modal */}
      <NewExamDialog 
        isOpen={isNewDialogOpen} 
        onClose={() => setIsNewDialogOpen(false)}
        onCreate={handleCreateNew}
      />
    </div>
  );
};
