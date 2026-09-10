import React from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { 
  ZoomIn, ZoomOut, Plus, ChevronRight, ChevronLeft, 
  Grid, CheckCircle2, Award, Loader2, AlertCircle
} from 'lucide-react';

export const EditorStatusBar: React.FC = () => {
  const { 
    document, activePageIndex, setActivePage, addPage, removePage,
    zoom, setZoom, snapToGrid, toggleSnapToGrid, autosaveStatus, saveImmediately
  } = useEditorStore();

  const totalPages = document.pages.length;
  const zoomLevels = [50, 75, 100, 125, 150, 200, 300];

  const handleZoomOut = () => {
    const currentIndex = zoomLevels.findIndex(z => z >= zoom);
    if (currentIndex > 0) {
      setZoom(zoomLevels[currentIndex - 1]);
    } else if (currentIndex === -1) {
      setZoom(300);
    }
  };

  const handleZoomIn = () => {
    const currentIndex = zoomLevels.findIndex(z => z > zoom);
    if (currentIndex !== -1 && currentIndex < zoomLevels.length) {
      setZoom(zoomLevels[currentIndex]);
    } else {
      setZoom(50);
    }
  };

  // Calculate total marks across questions
  const totalMarks = document.pages.reduce((acc, page) => {
    return acc + page.elements
      .filter(el => el.type === 'text' && (el as any).isQuestion)
      .reduce((sum, el) => sum + ((el as any).marks || 0), 0);
  }, 0);

  return (
    <footer className="h-11 bg-slate-900 text-slate-300 border-t border-slate-800 px-4 flex items-center justify-between text-xs font-sans select-none shrink-0 z-30" dir="rtl">
      {/* Right side: Page Navigation & Page Actions */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
          <button 
            disabled={activePageIndex === 0}
            onClick={() => setActivePage(activePageIndex - 1)}
            className="p-1 hover:bg-slate-700 rounded text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent"
            title="الصفحة السابقة"
          >
            <ChevronRight size={14} />
          </button>
          
          <span className="px-2 font-bold text-slate-200 text-[11px]">
            صفحة {activePageIndex + 1} من {totalPages}
          </span>

          <button 
            disabled={activePageIndex >= totalPages - 1}
            onClick={() => setActivePage(activePageIndex + 1)}
            className="p-1 hover:bg-slate-700 rounded text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent"
            title="الصفحة التالية"
          >
            <ChevronLeft size={14} />
          </button>
        </div>

        <button 
          onClick={addPage}
          className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors text-[11px]"
        >
          <Plus size={13} />
          <span>إضافة صفحة</span>
        </button>

        {totalPages > 1 && (
          <button 
            onClick={() => removePage(activePageIndex)}
            className="text-rose-400 hover:text-rose-300 font-bold text-[11px] px-2 py-1 hover:bg-rose-950/40 rounded-lg transition-colors"
          >
            حذف الصفحة الحالية
          </button>
        )}
      </div>

      {/* Center: Total Marks & Saved Status */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60">
          <Award size={14} className="text-amber-400" />
          <span className="text-slate-400 text-[11px]">مجموع الدرجات:</span>
          <span className="font-black text-amber-400 text-xs">{totalMarks || 50} درجة</span>
        </div>

        {autosaveStatus === 'saving' && (
          <div className="flex items-center gap-1.5 text-sky-400 text-[11px] animate-pulse">
            <Loader2 size={13} className="animate-spin" />
            <span>جاري الحفظ التلقائي...</span>
          </div>
        )}
        {autosaveStatus === 'saved' && (
          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
            <CheckCircle2 size={13} />
            <span>تم الحفظ تلقائياً</span>
          </div>
        )}
        {autosaveStatus === 'error' && (
          <button 
            onClick={() => saveImmediately()} 
            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 text-[11px] font-bold"
            title="انقر لإعادة محاولة الحفظ"
          >
            <AlertCircle size={13} />
            <span>تعذر الحفظ (إعادة المحاولة)</span>
          </button>
        )}
      </div>

      {/* Left side: Grid Snap & Zoom Controller */}
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSnapToGrid}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all ${
            snapToGrid 
              ? 'bg-indigo-900/50 border-indigo-700 text-indigo-300' 
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
          }`}
          title="محاذاة العناصر مع الشبكة"
        >
          <Grid size={13} />
          <span className="hidden sm:inline">الشبكة</span>
        </button>

        {/* Dedicated Internal Zoom Selector */}
        <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
          <button 
            onClick={handleZoomOut}
            className="p-1 hover:bg-slate-700 text-slate-300 rounded"
            title="تصغير"
          >
            <ZoomOut size={14} />
          </button>

          <select 
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="bg-transparent text-slate-200 text-[11px] font-mono font-bold px-1.5 py-0.5 focus:outline-none cursor-pointer"
          >
            {zoomLevels.map(lvl => (
              <option key={lvl} value={lvl} className="bg-slate-900 text-slate-200">
                {lvl}%
              </option>
            ))}
          </select>

          <button 
            onClick={handleZoomIn}
            className="p-1 hover:bg-slate-700 text-slate-300 rounded"
            title="تكبير"
          >
            <ZoomIn size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
