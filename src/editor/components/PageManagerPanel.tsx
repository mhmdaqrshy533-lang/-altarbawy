import React from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { 
  FileText, Plus, Copy, Trash2, ArrowUp, ArrowDown, 
  Layers, Layout, CheckCircle, ChevronRight, X 
} from 'lucide-react';

interface PageManagerPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PageManagerPanel: React.FC<PageManagerPanelProps> = ({ isOpen, onClose }) => {
  const { 
    document, activePageIndex, setActivePage, addPage, removePage 
  } = useEditorStore();

  if (!isOpen) return null;

  const totalPages = document.pages.length;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-80 bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col font-sans select-none text-slate-100 animate-in slide-in-from-right duration-200" dir="rtl">
      {/* Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-400 font-black text-sm">
          <Layers size={18} className="stroke-[2.5]" />
          <span>مدير الصفحات (Page Manager)</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Pages Scrollable Thumbnails List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {document.pages.map((page, index) => {
          const isActive = index === activePageIndex;
          const questionCount = page.elements.filter(el => el.type === 'text' && (el as any).isQuestion).length;
          const totalPageMarks = page.elements
            .filter(el => el.type === 'text' && (el as any).isQuestion)
            .reduce((sum, el) => sum + ((el as any).marks || 0), 0);

          return (
            <div 
              key={page.id}
              onClick={() => setActivePage(index)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer relative ${
                isActive 
                  ? 'bg-indigo-950/60 border-indigo-500 shadow-lg ring-2 ring-indigo-500/30' 
                  : 'bg-slate-950/70 border-slate-800 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
                    صفحة {index + 1}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle size={12} />
                      نشطة حالياً
                    </span>
                  )}
                </div>

                <span className="text-[10px] font-bold text-amber-400 bg-amber-950/50 border border-amber-800/50 px-2 py-0.5 rounded-md">
                  {totalPageMarks} درجة
                </span>
              </div>

              {/* Simulated Page Thumbnail Box */}
              <div className="bg-white rounded-lg border border-slate-300 h-28 p-2 text-[8px] text-slate-900 font-mono overflow-hidden relative shadow-inner mb-2 flex flex-col justify-between">
                <div className="border-b border-slate-300 pb-1 font-bold text-center">
                  {document.metadata.school || 'نموذج رقيم'}
                </div>
                <div className="text-center font-sans font-bold text-slate-500">
                  {questionCount > 0 ? `${questionCount} سؤال مسجل` : 'صفحة بيضاء فارغة'}
                </div>
                <div className="text-center border-t border-slate-200 pt-0.5 text-slate-400">
                  {index + 1} / {totalPages}
                </div>
              </div>

              {/* Page Actions Footer Bar */}
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold pt-1 border-t border-slate-800">
                <span className="text-[11px] text-slate-400">{page.elements.length} عناصر</span>

                {totalPages > 1 && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); removePage(index); }}
                    className="p-1 text-rose-400 hover:bg-rose-950/60 rounded transition-colors"
                    title="حذف هذه الصفحة"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Add Page Action */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0">
        <button
          onClick={() => addPage()}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          <span>إضافة صفحة اختبار جديدة</span>
        </button>
      </div>
    </div>
  );
};
