import React, { useState } from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { 
  X, ChevronRight, ChevronLeft, BookOpen, Printer, Eye, 
  ZoomIn, ZoomOut, Check, Sparkles 
} from 'lucide-react';

interface FlipbookPreviewModalProps {
  onClose: () => void;
  onOpenPrintModal: () => void;
}

export const FlipbookPreviewModal: React.FC<FlipbookPreviewModalProps> = ({ onClose, onOpenPrintModal }) => {
  const { currentProject } = useBookStudioStore();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showBleedLines, setShowBleedLines] = useState(true);

  if (!currentProject) return null;
  const totalPages = currentProject.pages.length;

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 font-sans select-none" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl h-[90vh] overflow-hidden shadow-2xl text-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="text-base font-black text-white">معاينة الكتاب التفاعلية والطباعية (Flipbook)</h3>
              <p className="text-xs font-bold text-slate-400">تصفح الصفحات، فحص هوامش القص، والتأكد من جودة النشر</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBleedLines(!showBleedLines)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                showBleedLines ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              هوامش القص (Bleed)
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenPrintModal();
              }}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Printer size={15} />
              <span>تصدير وطباعة</span>
            </button>

            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Flipbook Viewer Workspace */}
        <div className="flex-1 bg-slate-950 p-6 flex items-center justify-center relative overflow-hidden">
          
          {/* Paper Sheet Preview Frame */}
          <div 
            className="w-[380px] h-[520px] bg-white text-slate-900 rounded-lg shadow-2xl relative p-8 flex flex-col justify-between transition-all duration-300 border border-slate-300"
            style={{ fontFamily: currentProject.fontPairing.bodyFont }}
          >
            {/* Bleed Guide Overlay */}
            {showBleedLines && (
              <div className="absolute inset-3 border-2 border-dashed border-rose-400/50 pointer-events-none flex items-start justify-end p-1">
                <span className="text-[8px] font-mono font-bold text-rose-500 bg-rose-50 px-1 rounded">حد الهامش والقص 3mm</span>
              </div>
            )}

            {/* Page Running Header */}
            <div className="border-b border-slate-200 pb-2 flex items-center justify-between text-[10px] font-bold text-slate-500">
              <span>{currentProject.title}</span>
              <span>{currentProject.subject}</span>
            </div>

            {/* Page Main Content Area */}
            <div className="my-auto space-y-4 text-right">
              {currentPageIndex === 0 ? (
                /* Cover Page Simulation */
                <div className="text-center space-y-3 py-8">
                  <span className="text-xs font-black text-indigo-600 block">{currentProject.metadata.school}</span>
                  <h1 className="text-2xl font-black text-slate-900">{currentProject.title}</h1>
                  <p className="text-xs text-slate-600 font-bold">{currentProject.grade} — {currentProject.semester}</p>
                </div>
              ) : (
                /* Standard Content Page Simulation */
                <div className="space-y-3">
                  <h2 className="text-base font-black text-indigo-900 border-r-4 border-indigo-600 pr-2">
                    الوحدة {Math.ceil(currentPageIndex / 2)}: الدرس والمفاهيم التطبيقية
                  </h2>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    يحتوي هذا الفصل على شرح مبسط للمفاهيم الأساسية، مدعماً بالأنشطة والتدريبات المنهجية المعتمدة مع خطوط مريحة وقراءة واضحة.
                  </p>
                  <div className="p-3 bg-indigo-50/80 border border-indigo-100 rounded-xl text-[11px] text-indigo-900 font-bold">
                    💡 ملاحظة منهجة هامة: يوصى بحل التمارين التطبيقية نهاية الوحدة.
                  </div>
                </div>
              )}
            </div>

            {/* Page Running Footer */}
            <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-[10px] font-bold text-slate-500">
              <span>منصة الرقيم للنشر المنهجي</span>
              <span className="font-mono text-indigo-600 font-black">صفحة {currentPageIndex + 1} من {totalPages}</span>
            </div>

          </div>

        </div>

        {/* Page Switcher Navigation Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handlePrevPage}
            disabled={currentPageIndex === 0}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <ChevronRight size={16} />
            <span>الصفحة السابقة</span>
          </button>

          <span className="text-xs font-black text-slate-300">
            الصفحة {currentPageIndex + 1} من {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPageIndex === totalPages - 1}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span>الصفحة التالية</span>
            <ChevronLeft size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
