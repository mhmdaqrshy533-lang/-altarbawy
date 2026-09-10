import React, { useState } from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { 
  BookOpen, X, Check, LayoutGrid, Layers, Columns, 
  Ruler, Eye, Shield, FileText 
} from 'lucide-react';

interface MasterPageManagerModalProps {
  onClose: () => void;
}

export const MasterPageManagerModal: React.FC<MasterPageManagerModalProps> = ({ onClose }) => {
  const { currentProject } = useBookStudioStore();

  const [viewSpread, setViewSpread] = useState<'single' | 'facing'>('facing');
  const [runningHeader, setRunningHeader] = useState(currentProject?.title || 'كتاب المنهج التعليمي');
  const [runningFooter, setRunningFooter] = useState(currentProject?.cover.publisherName || 'منصة الرقيم للنشر المنهجي');
  const [showPageNumbers, setShowPageNumbers] = useState(true);
  const [numberPosition, setNumberPosition] = useState<'bottom_center' | 'outer_margins' | 'top_header'>('outer_margins');
  const [showBleedGuides, setShowBleedGuides] = useState(true);
  const [hasOrnamentalFrame, setHasOrnamentalFrame] = useState(true);

  if (!currentProject) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans select-none" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <BookOpen size={22} />
            </div>
            <div>
              <h2 className="text-base font-black text-white">إعدادات الصفحات الرئيسية والتقابل (Master Pages & Spreads)</h2>
              <p className="text-xs text-slate-400 font-bold">التحكم في الرؤوس، التذييلات، الترقيم الآلي، والصفحات المتقابلة (Facing Pages)</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-5 text-xs font-bold">
          
          {/* Spread Display Mode */}
          <div className="space-y-2">
            <label className="text-slate-300 block font-black">نمط عرض وعمل الصفحات:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setViewSpread('facing')}
                className={`p-4 rounded-2xl border transition-all text-right space-y-1.5 ${
                  viewSpread === 'facing'
                    ? 'bg-indigo-950 border-indigo-500 text-white ring-2 ring-indigo-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 text-indigo-400 font-black">
                  <Columns size={18} />
                  <span>صفحات متقابلة (Facing Pages Spread)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                  عرض صفحتين جنباً إلى جنب للكتب والملازم والمجلات لضبط التوريق قبل التجليد.
                </p>
              </button>

              <button
                onClick={() => setViewSpread('single')}
                className={`p-4 rounded-2xl border transition-all text-right space-y-1.5 ${
                  viewSpread === 'single'
                    ? 'bg-indigo-950 border-indigo-500 text-white ring-2 ring-indigo-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 text-indigo-400 font-black">
                  <FileText size={18} />
                  <span>صفحة مفردة (Single Page View)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                  عرض صفحة واحدة مركزية لتركيز التصميم والتحرير الدقيق لكل صفحة.
                </p>
              </button>
            </div>
          </div>

          {/* Running Headers & Footers */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <span className="text-xs font-black text-indigo-400 block">نصوص الرأس والتذييل المستمر (Running Headers & Footers):</span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-400 block font-bold">عنوان الرأس العلوي (Header):</label>
                <input
                  type="text"
                  value={runningHeader}
                  onChange={(e) => setRunningHeader(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block font-bold">نص التذييل السفلي (Footer):</label>
                <input
                  type="text"
                  value={runningFooter}
                  onChange={(e) => setRunningFooter(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Page Numbering Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-slate-400 block font-bold">موقع ترقيم الصفحات الآلي:</label>
                <select
                  value={numberPosition}
                  onChange={(e) => setNumberPosition(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                >
                  <option value="outer_margins">الهوامش الخارجية (Outer Margins)</option>
                  <option value="bottom_center">أسفل منتصف الصفحة (Bottom Center)</option>
                  <option value="top_header">أعلى الرأس (Top Header)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 my-auto">
                <span className="text-slate-300 font-bold">إظهار الترقيم في كافة الصفحات:</span>
                <input
                  type="checkbox"
                  checked={showPageNumbers}
                  onChange={(e) => setShowPageNumbers(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </div>
            </div>

          </div>

          {/* DTP Print Guides */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-black text-indigo-400 block">أدوات إخراج المطابع (DTP Print Setup):</span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
                <span className="text-slate-300 font-bold">إظهار أمان قص النزف (Bleed Lines - 3mm):</span>
                <input
                  type="checkbox"
                  checked={showBleedGuides}
                  onChange={(e) => setShowBleedGuides(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
                <span className="text-slate-300 font-bold">تأطير زخرفي لصفحات المنهج:</span>
                <input
                  type="checkbox"
                  checked={hasOrnamentalFrame}
                  onChange={(e) => setHasOrnamentalFrame(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-bold">
          <span className="text-slate-400">تطبيق الإعدادات يُحدث المظهر لكافة الفصول والصفحات مباشرة</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg transition-all flex items-center gap-2 font-black"
          >
            <Check size={16} />
            <span>حفظ إعدادات Master Pages</span>
          </button>
        </div>

      </div>
    </div>
  );
};
