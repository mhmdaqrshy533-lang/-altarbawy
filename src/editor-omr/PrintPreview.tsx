import React from 'react';
import { useOMRStore } from './OMRStore';
import { Printer, X, FileDown, CheckCircle } from 'lucide-react';
import { BubbleEditor } from './BubbleEditor';

export const PrintPreview: React.FC = () => {
  const { showPrintPreview, setShowPrintPreview, project, setShowExportModal } = useOMRStore();

  if (!showPrintPreview) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/90 backdrop-blur-md flex flex-col font-sans select-none" dir="rtl">
      
      {/* Top Controls Header */}
      <div className="bg-slate-950 text-white p-4 px-8 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600/30 text-purple-400 rounded-2xl flex items-center justify-center font-bold border border-purple-500/30">
            <Printer size={20} />
          </div>
          <div>
            <h2 className="text-base font-black font-serif">معاينة الطباعة المباشرة بدقة 100% (Real A4 Print Preview)</h2>
            <p className="text-xs text-slate-400 font-semibold">تأكيد مطابقة القياسات المليمترية مع أجهزة التصحيح الضوئي</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setShowPrintPreview(false);
              setShowExportModal(true);
            }}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-lg shadow-purple-600/30 transition-all"
          >
            <FileDown size={16} />
            تصدير PDF عالي الدقة (300DPI)
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-extrabold text-xs border border-slate-700 transition-all"
          >
            <Printer size={16} />
            طباعة الورقة الآن
          </button>

          <button
            onClick={() => setShowPrintPreview(false)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* A4 Sheet Render Stage */}
      <div className="flex-1 overflow-auto p-8 flex justify-center bg-slate-900/50 custom-scrollbar">
        <div 
          className="bg-white shadow-2xl relative border border-slate-300 print:shadow-none print:border-none print:m-0"
          style={{
            width: '794px',
            height: '1123px',
            minWidth: '794px',
            minHeight: '1123px',
            transformOrigin: 'top center'
          }}
        >
          {project.elements.map((el) => {
            if (el.isHidden) return null;
            return (
              <div
                key={el.id}
                style={{
                  position: 'absolute',
                  left: `${el.x}px`,
                  top: `${el.y}px`,
                  width: `${el.width}px`,
                  height: `${el.height}px`,
                  zIndex: el.zIndex,
                  transform: `rotate(${el.rotation || 0}deg)`
                }}
              >
                <BubbleEditor element={el} />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
};
