import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  Gauge, 
  Maximize2 
} from 'lucide-react';
import { ExamQuestion, ExamTheme } from '../types/exam';
import { AITextNormalizer } from '../utils/aiTextNormalizer';

interface AITextToolsModalProps {
  questions: ExamQuestion[];
  theme: ExamTheme;
  isOpen: boolean;
  onClose: () => void;
  onApplyCleanedQuestions: (cleanedQuestions: ExamQuestion[]) => void;
  onChangeFontSize: (size: 'compact' | 'normal' | 'large') => void;
}

export const AITextToolsModal: React.FC<AITextToolsModalProps> = ({
  questions,
  theme,
  isOpen,
  onClose,
  onApplyCleanedQuestions,
  onChangeFontSize
}) => {
  if (!isOpen) return null;

  const [stripDiacritics, setStripDiacritics] = useState(false);
  const [removeTatweel, setRemoveTatweel] = useState(true);
  const [standardizeHamza, setStandardizeHamza] = useState(false);
  const [fixPunctuation, setFixPunctuation] = useState(true);

  // Calculate A4 Fit metrics
  const totalChars = questions.reduce((acc, q) => acc + q.text.length + (q.passageText?.length || 0) + (q.options?.reduce((oa, opt) => oa + opt.text.length, 0) || 0), 0);
  const passageCount = questions.filter(q => q.type === 'passage').length;
  const poetryCount = questions.filter(q => q.type === 'poetry').length;
  const essayLinesCount = questions.filter(q => q.type === 'essay').reduce((a, b) => a + (b.essayLinesCount || 3), 0);
  const questionCount = questions.filter(q => q.type === 'tf' || q.type === 'mcq').length;

  const fitAnalysis = AITextNormalizer.estimateA4Fit({
    questionCount,
    passageCount,
    poetryCount,
    essayLinesCount,
    totalCharacters: totalChars,
    fontSize: theme.fontSize
  });

  const handleApply = () => {
    const cleaned = questions.map(q => {
      const newQ = { ...q };
      newQ.text = AITextNormalizer.deepCleanArabic(q.text, {
        stripDiacritics,
        removeTatweel,
        standardizeHamza,
        fixPunctuation
      });
      if (q.passageText) {
        newQ.passageText = AITextNormalizer.deepCleanArabic(q.passageText, {
          stripDiacritics: false, // keep diacritics in reading passage for accuracy
          removeTatweel,
          standardizeHamza: false,
          fixPunctuation
        });
      }
      if (q.options) {
        newQ.options = q.options.map(opt => ({
          ...opt,
          text: AITextNormalizer.deepCleanArabic(opt.text, {
            stripDiacritics,
            removeTatweel,
            standardizeHamza,
            fixPunctuation
          })
        }));
      }
      return newQ;
    });

    onApplyCleanedQuestions(cleaned);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto select-none" dir="rtl">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0d5c3a] to-slate-900 p-4 px-6 flex items-center justify-between border-b border-slate-700 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black">مساعد الذكاء الاصطناعي والملاءمة لورقة A4</h3>
              <p className="text-[11px] text-emerald-200/80">تدقيق النصوص العربية تلقائياً وضبط حجم المحتوى</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          
          {/* A4 Gauge meter */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge size={18} className="text-emerald-400" />
                <span className="font-bold text-white text-xs">مؤشر سعة ورقة A4 (210mm × 297mm):</span>
              </div>
              <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded-lg ${
                fitAnalysis.status === 'optimal' || fitAnalysis.status === 'safe'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : fitAnalysis.status === 'warning'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-rose-950 text-rose-400 border border-rose-800'
              }`}>
                {fitAnalysis.percentageUsed}% من سعة الصفحة
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 rounded-full ${
                  fitAnalysis.percentageUsed <= 85 
                    ? 'bg-emerald-500' 
                    : fitAnalysis.percentageUsed <= 100 
                      ? 'bg-amber-500' 
                      : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(fitAnalysis.percentageUsed, 100)}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              {fitAnalysis.recommendation}
            </p>

            {/* Font Auto-Adjust suggestion */}
            {fitAnalysis.status === 'warning' || fitAnalysis.status === 'overflow' ? (
              <button
                type="button"
                onClick={() => onChangeFontSize('compact')}
                className="w-full py-2 bg-emerald-950/60 border border-emerald-700/60 hover:bg-emerald-900/60 text-emerald-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <Maximize2 size={14} />
                <span>تطبيق وضع الخط المدمج الفائق (Compact 7.2pt) تلقائياً</span>
              </button>
            ) : null}
          </div>

          {/* AI Text Cleaning Options */}
          <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <h4 className="font-bold text-slate-200">خيارات المعالجة اللغوية والتدقيق:</h4>

            <div className="space-y-2.5">
              <label className="flex items-center gap-3 cursor-pointer text-slate-300 font-medium">
                <input 
                  type="checkbox" 
                  checked={removeTatweel} 
                  onChange={(e) => setRemoveTatweel(e.target.checked)}
                  className="accent-emerald-500 rounded"
                />
                <div>
                  <div className="text-white font-bold">حذف التطويل والكشيدة (ـ) الزائدة</div>
                  <div className="text-[10px] text-slate-400">لتوفير مساحة أفقية وتفادي تكسر الأسطر</div>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-slate-300 font-medium">
                <input 
                  type="checkbox" 
                  checked={fixPunctuation} 
                  onChange={(e) => setFixPunctuation(e.target.checked)}
                  className="accent-emerald-500 rounded"
                />
                <div>
                  <div className="text-white font-bold">ضبط المسافات وعلامات الترقيم (، ؛ : ؟ !)</div>
                  <div className="text-[10px] text-slate-400">تصحيح التصاق الفواصل بالأحرف وفق قواعد الإملاء</div>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-slate-300 font-medium">
                <input 
                  type="checkbox" 
                  checked={stripDiacritics} 
                  onChange={(e) => setStripDiacritics(e.target.checked)}
                  className="accent-emerald-500 rounded"
                />
                <div>
                  <div className="text-white font-bold">تجريد الحركات والتشكيل من أسئلة الاختيار</div>
                  <div className="text-[10px] text-slate-400">يقلل الازدحام البصري للأسئلة العادية</div>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 p-4 px-6 border-t border-slate-800 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl transition shadow-lg flex items-center gap-1.5"
          >
            <Check size={16} />
            <span>تطبيق التحسينات</span>
          </button>
        </div>

      </div>
    </div>
  );
};
