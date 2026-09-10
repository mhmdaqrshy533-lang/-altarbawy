import React from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { useEditorStore } from '../../store/useEditorStore';
import { 
  X, Layers, Plus, Trash2, ArrowUp, ArrowDown, 
  BookOpen, Bookmark, FileText, CheckCircle2, Shield, Edit3 
} from 'lucide-react';

export const BookPageManager: React.FC = () => {
  const { currentProject, activeDrawer, setActiveDrawer } = useBookStudioStore();
  const { document, activePageIndex, setActivePage, addPage, removePage } = useEditorStore();

  if (activeDrawer !== 'chapters') return null;
  if (!currentProject) return null;

  const totalPages = document.pages.length;

  const getPageSectionBadge = (index: number) => {
    if (index === 0) return { title: 'الغلاف الأمامي الرئيسي', badge: '🟦 غلاف غلاف', bg: 'bg-blue-950 text-blue-300 border-blue-800' };
    if (index === 1) return { title: 'بيانات الكتاب وحقوق النشر', badge: '⬜ صفحة حقوق', bg: 'bg-slate-900 text-slate-300 border-slate-700' };
    if (index === 2) return { title: 'الإهداء ومقدمة المنهج', badge: '⬜ صفحة إهداء', bg: 'bg-slate-900 text-slate-300 border-slate-700' };
    if (index === 3) return { title: 'فهرس المحتويات الآلي', badge: '⬜ صفحة فهرس', bg: 'bg-indigo-950 text-indigo-300 border-indigo-800' };
    if (index === totalPages - 1) return { title: 'الغلاف الخلفي الخارجي', badge: '🟥 غلاف خلفي', bg: 'bg-rose-950 text-rose-300 border-rose-800' };
    return { title: `صفحة محتوى منهجي (${index - 3})`, badge: '⬜ محتوى', bg: 'bg-slate-900 text-slate-300 border-slate-700' };
  };

  const handleAddNewContentPage = () => {
    // Insert new page right before the back cover
    addPage();
    setActivePage(document.pages.length);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-80 bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col font-sans select-none text-slate-100 animate-in slide-in-from-right duration-200" dir="rtl">
      
      {/* Drawer Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-indigo-400" />
          <h3 className="text-sm font-black text-white">مدير هيكل وصفحات الكتاب</h3>
        </div>

        <button 
          onClick={() => setActiveDrawer('none')}
          className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
        >
          <X size={16} />
        </button>
      </div>

      {/* Pages List Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2.5">
        
        {document.pages.map((p, idx) => {
          const section = getPageSectionBadge(idx);
          const isActive = idx === activePageIndex;

          return (
            <div
              key={p.id || idx}
              onClick={() => setActivePage(idx)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isActive 
                  ? 'bg-indigo-950/90 border-indigo-500 ring-2 ring-indigo-500/30 text-white shadow-lg' 
                  : 'bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-xl font-mono text-xs font-black flex items-center justify-center shrink-0 border ${section.bg}`}>
                  {idx + 1}
                </span>

                <div className="space-y-0.5">
                  <span className="text-xs font-black block leading-tight">{section.title}</span>
                  <span className="text-[10px] text-slate-400 font-bold block">{section.badge}</span>
                </div>
              </div>

              {/* Action Delete (Not allowed for front cover, copyright, TOC, or back cover) */}
              {idx > 3 && idx < totalPages - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (document.pages.length > 5) {
                      removePage(idx);
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 rounded-lg transition-all"
                  title="حذف هذه الصفحة"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          );
        })}

      </div>

      {/* Drawer Footer Actions */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 space-y-2">
        <button
          onClick={handleAddNewContentPage}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-xl text-xs font-black shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          <span>إضافة صفحة محتوى منهجية جديدة</span>
        </button>

        <p className="text-[10px] text-slate-400 text-center font-bold">
          إجمالي صفحات الكتاب المنسقة: <strong>{totalPages} صفحة</strong>
        </p>
      </div>

    </div>
  );
};
