import React, { useState } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { 
  Printer, Download, FileText, Settings, X, Check, Eye, 
  Share2, Shield, Layers, LayoutGrid, AlertCircle, Loader2, Sparkles
} from 'lucide-react';
import { RaqeemPrintEngine } from '../../core/print/RaqeemPrintEngine';

interface PrintCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintCenterModal: React.FC<PrintCenterModalProps> = ({ isOpen, onClose }) => {
  const { document, activePageIndex } = useEditorStore();

  const [paperSize, setPaperSize] = useState<'A4' | 'A3' | 'Letter' | 'Legal' | 'A5' | 'B5'>(document.paperSize || 'A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(document.orientation || 'portrait');
  const [includeWatermark, setIncludeWatermark] = useState<boolean>(true);
  const [showBleedMarks, setShowBleedMarks] = useState<boolean>(false);
  const [showPageNumbers, setShowPageNumbers] = useState<boolean>(true);
  const [pageRange, setPageRange] = useState<'all' | 'current'>('all');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<{ percent: number; message: string }>({ percent: 0, message: '' });

  if (!isOpen) return null;

  const totalPages = document.pages.length;

  const handlePrintNow = async () => {
    setIsExporting(true);
    try {
      RaqeemPrintEngine.printElement('exam-canvas-container', { paperSize, orientation });
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportVectorPDF = async () => {
    setIsExporting(true);
    try {
      const pageToRenderIndices = pageRange === 'current' 
        ? [activePageIndex] 
        : Array.from({ length: totalPages }, (_, i) => i);

      const elementIds = pageToRenderIndices.map(idx => `exam-canvas-page-${idx}`);
      const fileName = document.metadata.examTitle ? document.metadata.examTitle.replace(/\s+/g, '_') : 'raq_document';

      await RaqeemPrintEngine.exportToVectorPdf(
        elementIds,
        fileName,
        {
          paperSize,
          orientation,
          includeWatermark,
          showBleedMarks,
          showPageNumbers,
          headerTitle: document.metadata.school || '',
          footerTitle: document.metadata.subject ? `مادة ${document.metadata.subject}` : ''
        },
        (progress, message) => {
          setExportProgress({ percent: progress, message });
        }
      );
    } catch (err) {
      console.error('PDF Export Error:', err);
      window.print();
    } finally {
      setIsExporting(false);
      setExportProgress({ percent: 0, message: '' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans select-none" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
              <Printer size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">مركز الطباعة والتصدير الاحترافي (Print & PDF Center)</h3>
              <p className="text-xs font-bold text-slate-400">إعدادات الطباعة، المقاسات، والطباعة المباشرة من الهاتف</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body Split (Preview & Settings) */}
        <div className="grid grid-cols-1 md:grid-cols-3 flex-1 overflow-hidden">
          
          {/* Controls Sidebar Settings */}
          <div className="p-5 border-l border-slate-800 bg-slate-950/60 space-y-5 overflow-y-auto custom-scrollbar">
            
            {/* Paper Size Selector */}
            <div>
              <label className="text-xs font-black text-slate-300 mb-2 block">حجم ورقة الطباعة:</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                {(['A4', 'A3', 'Letter', 'Legal'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => setPaperSize(size)}
                    className={`py-2 px-3 rounded-xl border transition-all ${
                      paperSize === size ? 'bg-indigo-600 border-indigo-500 text-white shadow' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Page Orientation */}
            <div>
              <label className="text-xs font-black text-slate-300 mb-2 block">اتجاه الصفحة:</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  onClick={() => setOrientation('portrait')}
                  className={`py-2 px-3 rounded-xl border transition-all ${
                    orientation === 'portrait' ? 'bg-indigo-600 border-indigo-500 text-white shadow' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  عمودي (Portrait)
                </button>
                <button
                  onClick={() => setOrientation('landscape')}
                  className={`py-2 px-3 rounded-xl border transition-all ${
                    orientation === 'landscape' ? 'bg-indigo-600 border-indigo-500 text-white shadow' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  أفقي (Landscape)
                </button>
              </div>
            </div>

            {/* Page Range Selection */}
            <div>
              <label className="text-xs font-black text-slate-300 mb-2 block">نطاق الطباعة:</label>
              <div className="space-y-2 text-xs font-bold">
                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-800 bg-slate-900 cursor-pointer">
                  <input 
                    type="radio" 
                    name="pageRange" 
                    checked={pageRange === 'all'} 
                    onChange={() => setPageRange('all')}
                    className="accent-indigo-600"
                  />
                  <span>جميع الصفحات ({totalPages})</span>
                </label>
                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-800 bg-slate-900 cursor-pointer">
                  <input 
                    type="radio" 
                    name="pageRange" 
                    checked={pageRange === 'current'} 
                    onChange={() => setPageRange('current')}
                    className="accent-indigo-600"
                  />
                  <span>الصفحة الحالية فقط (صفحة {activePageIndex + 1})</span>
                </label>
              </div>
            </div>

            {/* Watermark Side Credit Toggle */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900 cursor-pointer">
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-slate-200 block">العلامة الجانبية للمصمم</span>
                  <span className="text-[10px] font-bold text-slate-400 block">برمجة وتصميم المهندس سهيل الهزبري</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={includeWatermark} 
                  onChange={(e) => setIncludeWatermark(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900 cursor-pointer">
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-slate-200 block">علامات القص والإنهاء (DTP Bleed Marks)</span>
                  <span className="text-[10px] font-bold text-slate-400 block">لإخراج المطابع والمشاحن التجارية</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={showBleedMarks} 
                  onChange={(e) => setShowBleedMarks(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900 cursor-pointer">
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-slate-200 block">ترقيم الصفحات التلقائي</span>
                  <span className="text-[10px] font-bold text-slate-400 block">إدراج رقم الصفحة أسفل كل ورقة</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={showPageNumbers} 
                  onChange={(e) => setShowPageNumbers(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
              </label>
            </div>

          </div>

          {/* Real-time Document Print Preview Container */}
          <div className="col-span-2 p-6 bg-slate-900/90 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2">
              <Eye size={15} className="text-indigo-400" />
              <span>معاينة الطباعة المباشرة (Live Print View)</span>
            </div>

            {/* Simulated Paper Frame */}
            <div className="bg-white text-slate-900 rounded-xl shadow-2xl p-6 w-[340px] h-[480px] overflow-y-auto custom-scrollbar border border-slate-300 relative font-serif select-none flex flex-col justify-between">
              <div>
                {/* Header preview snippet */}
                <div className="border-b-2 border-slate-800 pb-3 mb-3 text-center space-y-1">
                  <h4 className="font-black text-sm">{document.metadata.school || 'اسم المدرسة'}</h4>
                  <p className="text-[11px] font-bold text-slate-600">{document.metadata.examTitle || 'عنوان الامتحان'}</p>
                  <div className="flex justify-between text-[9px] font-bold text-slate-500 pt-1 border-t border-slate-300">
                    <span>المادة: {document.metadata.subject}</span>
                    <span>الزمن: {document.metadata.time}</span>
                    <span>الدرجة: {document.metadata.marks}</span>
                  </div>
                </div>

                {/* Question items snippet */}
                <div className="space-y-3 text-[10px] font-sans text-right">
                  <div className="p-2 bg-slate-50 border border-slate-300 rounded font-bold">
                    <span className="font-black text-indigo-700">س1: </span>
                    <span>اجب عن جميع الأسئلة الآتية بكل دقة ووضوح...</span>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-300 rounded font-bold">
                    <span className="font-black text-indigo-700">س2: </span>
                    <span>اختر الإجابة الصحيحة من بين الخيارات المتاحة...</span>
                  </div>
                </div>
              </div>

              {/* Watermark preview credit */}
              {includeWatermark && (
                <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[7px] font-bold text-slate-400 [writing-mode:vertical-lr] rotate-180">
                  محرر الرقيم الذكي — برمجة وتصميم المهندس سهيل الهزبري
                </div>
              )}

              <div className="text-center text-[9px] font-bold text-slate-400 border-t border-slate-200 pt-2">
                صفحة {activePageIndex + 1} من {totalPages}
              </div>
            </div>
          </div>

        </div>

        {/* Progress bar overlay during PDF generation */}
        {isExporting && exportProgress.message && (
          <div className="px-6 py-2.5 bg-indigo-950/80 border-t border-indigo-800/50 flex items-center justify-between text-xs font-bold text-indigo-200">
            <div className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-indigo-400" />
              <span>{exportProgress.message}</span>
            </div>
            <div className="w-32 bg-indigo-900 rounded-full h-2 overflow-hidden border border-indigo-700">
              <div 
                className="bg-indigo-400 h-full transition-all duration-300" 
                style={{ width: `${exportProgress.percent}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
          >
            إغلاق
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintNow}
              disabled={isExporting}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <Printer size={16} />
              <span>طباعة مباشرة (Web / Mobile Print)</span>
            </button>

            <button
              onClick={handleExportVectorPDF}
              disabled={isExporting}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <Download size={16} />
              <span>{isExporting ? 'جاري تجهيز PDF...' : 'تصدير Vector PDF عالي الدقة'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
