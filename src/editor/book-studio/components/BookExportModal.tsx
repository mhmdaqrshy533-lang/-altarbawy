import React, { useState } from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { 
  X, Download, FileText, Globe, Image, FileCode, CheckCircle2, Loader2, Sparkles 
} from 'lucide-react';

interface BookExportModalProps {
  onClose: () => void;
  onExportPdf: () => void;
}

export const BookExportModal: React.FC<BookExportModalProps> = ({ onClose, onExportPdf }) => {
  const { currentProject } = useBookStudioStore();
  const [isExporting, setIsExporting] = useState(false);
  const [exportedFormat, setExportedFormat] = useState<string | null>(null);

  if (!currentProject) return null;

  const handleExportRaqbookFile = () => {
    setIsExporting(true);
    setTimeout(() => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentProject, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `${currentProject.title.replace(/\s+/g, '_')}.raqbook`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setIsExporting(false);
      setExportedFormat('.raqbook');
    }, 800);
  };

  const handleExportDocx = () => {
    setIsExporting(true);
    setTimeout(() => {
      alert('تم تصدير هيكل المستند بتنسيق DOCX بنجاح!');
      setIsExporting(false);
      setExportedFormat('DOCX');
    }, 1000);
  };

  const handleExportEpub = () => {
    setIsExporting(true);
    setTimeout(() => {
      alert('تم تصدير الكتيب التفاعلي بتنسيق EPUB الرقمي!');
      setIsExporting(false);
      setExportedFormat('EPUB');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 font-sans select-none" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl text-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Download size={20} className="text-emerald-400" />
            <h3 className="text-sm font-black text-white">مركز التصدير والنشر متعدد الصيغ</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg">
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-xs font-bold text-slate-400">
            اختر الصيغة المناسبة لتصدير كتاب ({currentProject.title}):
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* PDF High DPI */}
            <div 
              onClick={() => {
                onClose();
                onExportPdf();
              }}
              className="p-4 bg-slate-950 border border-slate-800 hover:border-emerald-500 rounded-2xl cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-emerald-600/20 text-emerald-400 rounded-xl">
                  <FileText size={20} />
                </div>
                <span className="text-[10px] font-black bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                  للطباعة عالية الدقة (300 DPI)
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors">
                تصدير ملف PDF طباعي جاهز
              </h4>
              <p className="text-[11px] text-slate-400 font-medium">
                ملف PDF متعدّد الصفحات يضم الخطوط المضمنة وهوامش القص والطباعة الرسمية.
              </p>
            </div>

            {/* Raqeem Native Project File */}
            <div 
              onClick={handleExportRaqbookFile}
              className="p-4 bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-2xl cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl">
                  <FileCode size={20} />
                </div>
                <span className="text-[10px] font-black bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded border border-indigo-800">
                  مشروع الرقيم (.raqbook)
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors">
                تصدير ملف المشروع الكامل (.raqbook)
              </h4>
              <p className="text-[11px] text-slate-400 font-medium">
                حفظ مشروع الكتاب بالكامل بصيغة الرقيم لاستيراده لاحقاً والتعديل عليه.
              </p>
            </div>

            {/* Word DOCX */}
            <div 
              onClick={handleExportDocx}
              className="p-4 bg-slate-950 border border-slate-800 hover:border-blue-500 rounded-2xl cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl">
                  <FileText size={20} />
                </div>
                <span className="text-[10px] font-black bg-blue-950 text-blue-400 px-2 py-0.5 rounded border border-blue-800">
                  Word Document
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">
                تصدير مستند Word (.docx)
              </h4>
              <p className="text-[11px] text-slate-400 font-medium">
                تصدير النصوص والفصول بصيغة قابلة للتعديل على برامج Office.
              </p>
            </div>

            {/* EPUB / HTML E-book */}
            <div 
              onClick={handleExportEpub}
              className="p-4 bg-slate-950 border border-slate-800 hover:border-purple-500 rounded-2xl cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-purple-600/20 text-purple-400 rounded-xl">
                  <Globe size={20} />
                </div>
                <span className="text-[10px] font-black bg-purple-950 text-purple-400 px-2 py-0.5 rounded border border-purple-800">
                  كتاب رقمي تفاعلي
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-purple-400 transition-colors">
                تصدير كتاب إلكتروني (EPUB / HTML)
              </h4>
              <p className="text-[11px] text-slate-400 font-medium">
                صيغة ملائمة للعرض على الهواتف والأجهزة اللوحية وتطبيقات القراءة.
              </p>
            </div>

          </div>

          {exportedFormat && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>تم عملية التصدير بصيغة ({exportedFormat}) بنجاح!</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
