import React from 'react';
import { useOMRStore } from './OMRStore';
import { 
  ArrowRight, Undo2, Redo2, Grid, UserCheck, Layout, 
  Eye, FileDown, Sparkles, Building2, Sliders, CheckCircle2 
} from 'lucide-react';
import { AutoSaveManager } from './AutoSaveManager';

interface OMRToolbarProps {
  onBack?: () => void;
}

export const OMRToolbar: React.FC<OMRToolbarProps> = ({ onBack }) => {
  const { 
    project, 
    undo, 
    redo, 
    history, 
    future,
    setShowBubbleGeneratorModal,
    setShowTemplateGallery,
    setShowPrintPreview,
    setShowExportModal,
    setActiveSidebarTab,
    activeSidebarTab,
    convertExamToOMRSheet
  } = useOMRStore();

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-lg font-sans select-none" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Right Section: Back + Title + AutoSave */}
        <div className="flex items-center gap-3">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors"
              title="العودة للرئيسية"
            >
              <ArrowRight size={20} />
            </button>
          )}

          <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-400 flex items-center justify-center font-bold">
            <Grid size={20} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black font-serif text-white tracking-wide">
                محرر امتحانات الأتمتة الموحدة (OMR Studio)
              </h1>
              <span className="text-[9px] bg-purple-600 text-white px-2 py-0.5 rounded-full font-black">
                الرقيم V2
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-semibold truncate max-w-[220px]">
              {project.title}
            </div>
          </div>

          <div className="hidden md:block mr-2">
            <AutoSaveManager />
          </div>
        </div>

        {/* Center Tools: Quick Actions */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60">
          
          <button
            onClick={() => undo()}
            disabled={history.length === 0}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl transition-colors disabled:opacity-30"
            title="تراجع (Undo)"
          >
            <Undo2 size={16} />
          </button>

          <button
            onClick={() => redo()}
            disabled={future.length === 0}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl transition-colors disabled:opacity-30"
            title="إعادة (Redo)"
          >
            <Redo2 size={16} />
          </button>

          <div className="w-px h-5 bg-slate-700 mx-1"></div>

          {/* Generator Modal Trigger */}
          <button
            onClick={() => setShowBubbleGeneratorModal(true)}
            className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-md shadow-purple-600/20 transition-all"
          >
            <Sparkles size={14} />
            توليد شبكة OMR
          </button>

          {/* Student ID Trigger */}
          <button
            onClick={() => setActiveSidebarTab('student_id')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSidebarTab === 'student_id' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <UserCheck size={14} />
            رقم الجلوس
          </button>

          {/* Header Editor Trigger */}
          <button
            onClick={() => setActiveSidebarTab('header')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSidebarTab === 'header' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Building2 size={14} />
            الترويسة الوزارية
          </button>

          {/* Template Gallery Trigger */}
          <button
            onClick={() => setShowTemplateGallery(true)}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white hover:bg-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors"
          >
            <Layout size={14} />
            القوالب
          </button>
        </div>

        {/* Left Section: Preview & Export */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={() => setShowPrintPreview(true)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-black transition-all"
          >
            <Eye size={16} className="text-purple-400" />
            المعاينة
          </button>

          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-purple-600/30 transition-all"
          >
            <FileDown size={16} />
            تصدير PDF / RAQ
          </button>

        </div>

      </div>
    </header>
  );
};
