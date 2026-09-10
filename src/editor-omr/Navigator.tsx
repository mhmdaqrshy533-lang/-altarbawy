import React from 'react';
import { useOMRStore } from './OMRStore';
import { ZoomIn, ZoomOut, Maximize2, Eye, Edit3, CheckCircle2 } from 'lucide-react';

export const Navigator: React.FC = () => {
  const { project, setZoom, setMode } = useOMRStore();
  const zoom = project.zoom;

  return (
    <div className="bg-slate-900/90 text-white backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3 select-none font-sans" dir="rtl">
      
      {/* Mode Selector */}
      <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
        <button
          onClick={() => setMode('edit')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black transition-all ${
            project.mode === 'edit' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Edit3 size={13} />
          تحرير التصميم
        </button>
        <button
          onClick={() => setMode('preview')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black transition-all ${
            project.mode === 'preview' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Eye size={13} />
          معاينة وتظليل
        </button>
        <button
          onClick={() => setMode('grading')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black transition-all ${
            project.mode === 'grading' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <CheckCircle2 size={13} />
          مفتاح الإجابة النموذجية
        </button>
      </div>

      <div className="w-px h-5 bg-slate-700"></div>

      {/* Zoom controls */}
      <div className="flex items-center gap-2 text-xs font-bold">
        <button
          onClick={() => setZoom(zoom - 15)}
          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors"
          title="تصغير"
        >
          <ZoomOut size={16} />
        </button>

        <span className="w-12 text-center font-extrabold text-purple-300">{zoom}%</span>

        <button
          onClick={() => setZoom(zoom + 15)}
          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors"
          title="تكبير"
        >
          <ZoomIn size={16} />
        </button>

        <button
          onClick={() => setZoom(100)}
          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors text-[10px] font-black"
          title="إعادة ضبط 100%"
        >
          <Maximize2 size={14} />
        </button>
      </div>

    </div>
  );
};
