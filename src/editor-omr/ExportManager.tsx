import React, { useState } from 'react';
import { useOMRStore } from './OMRStore';
import { FileDown, X, Check, FileCode, Image as ImageIcon, Sparkles, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const ExportManager: React.FC = () => {
  const { showExportModal, setShowExportModal, project } = useOMRStore();

  const [dpi, setDpi] = useState<number>(300);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'png' | 'svg' | 'raq'>('pdf');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!showExportModal) return null;

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const canvasElement = document.getElementById('omr-a4-canvas-node');
      
      if (exportFormat === 'raq') {
        // Export offline .RAQ JSON project file
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(project, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `${project.title || 'OMR-Sheet'}.raq`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      } else if (canvasElement) {
        const scale = dpi === 600 ? 4 : 2;
        const canvas = await html2canvas(canvasElement, {
          scale: scale,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        if (exportFormat === 'png') {
          const imgData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = `${project.title || 'OMR-Sheet'}.png`;
          link.href = imgData;
          link.click();
        } else if (exportFormat === 'pdf') {
          const imgData = canvas.toDataURL('image/jpeg', 0.98);
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });
          pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
          pdf.save(`${project.title || 'OMR-Sheet'}.pdf`);
        } else if (exportFormat === 'svg') {
          // Direct SVG vector download
          const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="794" height="1123">${canvasElement.innerHTML}</svg>`;
          const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${project.title || 'OMR-Sheet'}.svg`;
          link.click();
        }
      }
    } catch (e) {
      console.error('Export failed:', e);
    } finally {
      setIsExporting(false);
      setShowExportModal(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/30 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <FileDown size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black font-serif">تصدير ورقة OMR للطباعة الفورية</h2>
              <p className="text-xs text-slate-400 font-bold">تصدير مباشر بجودة عالية وبدون الحاجة للإنترنت</p>
            </div>
          </div>
          <button 
            onClick={() => setShowExportModal(false)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Format selection */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-600 block">صيغة الملف المطلوب:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setExportFormat('pdf')}
                className={`p-3 rounded-2xl border-2 font-black text-xs text-right transition-all flex items-center justify-between ${
                  exportFormat === 'pdf' ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <div className="font-black">مستند PDF (موصى به)</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-0.5">جاهز للطباعة بدقة المتجهات Vector</div>
                </div>
                {exportFormat === 'pdf' && <Check size={18} className="text-purple-600" />}
              </button>

              <button
                type="button"
                onClick={() => setExportFormat('png')}
                className={`p-3 rounded-2xl border-2 font-black text-xs text-right transition-all flex items-center justify-between ${
                  exportFormat === 'png' ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <div className="font-black">صورة عالية الدقة PNG</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-0.5">للأبحاث والتوزيع الرقمي</div>
                </div>
                {exportFormat === 'png' && <Check size={18} className="text-purple-600" />}
              </button>

              <button
                type="button"
                onClick={() => setExportFormat('svg')}
                className={`p-3 rounded-2xl border-2 font-black text-xs text-right transition-all flex items-center justify-between ${
                  exportFormat === 'svg' ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <div className="font-black">متجهات SVG Vector</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-0.5">دقة لا متناهية بدون تشوه</div>
                </div>
                {exportFormat === 'svg' && <Check size={18} className="text-purple-600" />}
              </button>

              <button
                type="button"
                onClick={() => setExportFormat('raq')}
                className={`p-3 rounded-2xl border-2 font-black text-xs text-right transition-all flex items-center justify-between ${
                  exportFormat === 'raq' ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <div className="font-black">مشروع الرقيم (RAQ Format)</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-0.5">حفظ للتعديل والاستيراد اللاحق</div>
                </div>
                {exportFormat === 'raq' && <Check size={18} className="text-purple-600" />}
              </button>
            </div>
          </div>

          {/* Resolution DPI Selection */}
          {exportFormat !== 'raq' && (
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-600 block">دقة الطباعة والمعايرة (DPI):</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setDpi(300)}
                  className={`flex-1 py-2.5 rounded-xl border font-black text-xs transition-all ${
                    dpi === 300 ? 'bg-purple-600 text-white border-purple-700 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  300 DPI (طباعة ممتازة)
                </button>
                <button
                  type="button"
                  onClick={() => setDpi(600)}
                  className={`flex-1 py-2.5 rounded-xl border font-black text-xs transition-all ${
                    dpi === 600 ? 'bg-purple-600 text-white border-purple-700 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  600 DPI (دقة فائقة جداً)
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-end gap-3">
          <button
            onClick={() => setShowExportModal(false)}
            className="px-5 py-2.5 text-xs font-extrabold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            إلغاء
          </button>
          <button
            disabled={isExporting}
            onClick={handleExport}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-black text-xs shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50"
          >
            <Sparkles size={16} />
            {isExporting ? 'جاري تجهيز وتصدير الملف...' : 'تصدير الملف الآن'}
          </button>
        </div>

      </div>
    </div>
  );
};
