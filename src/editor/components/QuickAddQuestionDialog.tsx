import React, { useState, useEffect, useRef } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { EditorElement } from '../types';
import { 
  Plus, X, HelpCircle, CheckSquare, AlignLeft, Calculator, 
  Zap, FlaskConical, BookOpen, Globe, Grid, Sparkles, Layers,
  PlusCircle, Sparkle, FileText, Type, Hash, Award, Check, AlertTriangle
} from 'lucide-react';

interface QuickAddQuestionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (elementId: string) => void;
}

const ARABIC_FONTS = [
  { name: 'خط الأميري (Amiri)', value: 'Amiri' },
  { name: 'خط القاهرة (Cairo)', value: 'Cairo' },
  { name: 'خط نوستالجيا (Noto Naskh Arabic)', value: 'Noto Naskh Arabic' },
  { name: 'خط تجوال (Tajawal)', value: 'Tajawal' },
  { name: 'خط آي بي إم (IBM Plex Sans Arabic)', value: 'IBM Plex Sans Arabic' },
  { name: 'خط ريم كوفي (Reem Kufi)', value: 'Reem Kufi' },
  { name: 'خط عارف رقعة (Aref Ruqaa)', value: 'Aref Ruqaa' },
  { name: 'خط لطيف (Lateef)', value: 'Lateef' },
  { name: 'خط شهرزاد (Scheherazade New)', value: 'Scheherazade New' },
  { name: 'خط المركزي (Markazi Text)', value: 'Markazi Text' },
  { name: 'خط شانجا (Changa)', value: 'Changa' },
  { name: 'خط المسيري (El Messiri)', value: 'El Messiri' },
  { name: 'خط هرمتان (Harmattan)', value: 'Harmattan' },
  { name: 'خط النسخ القياسي (Standard Naskh)', value: 'Traditional Arabic' },
  { name: 'خط الرقعة الأصيل (Ruqaa)', value: 'Ruqaa' },
  { name: 'خط مجلة (Sakkal Majalla)', value: 'Sakkal Majalla' },
  { name: 'Inter (English Standard)', value: 'Inter' },
  { name: 'Playfair Display (Serif)', value: 'Playfair Display' },
  { name: 'Plus Jakarta Sans', value: 'Plus Jakarta Sans' },
];

const FONT_SIZES = [10, 11, 12, 13, 14, 16, 18, 20, 22, 24];

const QUESTION_TYPES = [
  { id: 'essay', name: 'سؤال مقالي / إجابة قصيرة', icon: AlignLeft, color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200' },
  { id: 'mcq', name: 'اختيار من متعدد (MCQ)', icon: CheckSquare, color: 'text-indigo-500', bg: 'bg-indigo-50 border-indigo-200' },
  { id: 'tf', name: 'صواب / خطأ', icon: HelpCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 border-emerald-200' },
  { id: 'matching', name: 'توصيل / زاوج العمودين', icon: Layers, color: 'text-cyan-500', bg: 'bg-cyan-50 border-cyan-200' },
  { id: 'fill', name: 'أكمل الفراغات الآتية', icon: AlignLeft, color: 'text-purple-500', bg: 'bg-purple-50 border-purple-200' },
  { id: 'reasoning', name: 'علل / اذكر السبب العلمي', icon: Sparkles, color: 'text-rose-500', bg: 'bg-rose-50 border-rose-200' },
  { id: 'math', name: 'مسألة رياضية / معادلات', icon: Calculator, color: 'text-blue-500', bg: 'bg-blue-50 border-blue-200' },
  { id: 'physics', name: 'مسألة فيزيائية / متجهات', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
  { id: 'chemistry', name: 'معادلة / تركيبة كيميائية', icon: FlaskConical, color: 'text-teal-500', bg: 'bg-teal-50 border-teal-200' },
  { id: 'arabic', name: 'لغة عربية / إعراب وتشكيل', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
  { id: 'english', name: 'English Passage / Grammar', icon: Globe, color: 'text-sky-500', bg: 'bg-sky-50 border-sky-200' },
  { id: 'table', name: 'جدول مقارنة / معطيات', icon: Grid, color: 'text-slate-600', bg: 'bg-slate-50 border-slate-200' },
];

export const numberToArabicWords = (num: number): string => {
  const words = [
    'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر',
    'الحادي عشر', 'الثاني عشر', 'الثالث عشر', 'الرابع عشر', 'الخامس عشر', 'السادس عشر', 'السابع عشر', 'الثامن عشر', 'التاسع عشر', 'العشرون'
  ];
  return words[num - 1] || `${num}`;
};

export const QuickAddQuestionDialog: React.FC<QuickAddQuestionDialogProps> = ({
  isOpen,
  onClose,
  onCreated
}) => {
  const { document, activePageIndex, addElement, selectElement, reorderAndRenumberQuestions } = useEditorStore();

  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const [questionText, setQuestionText] = useState('');
  const [selectedType, setSelectedType] = useState('essay');
  const [marks, setMarks] = useState<number>(5);
  const [customQuestionNumber, setCustomQuestionNumber] = useState<number | ''>('');
  const [fontSize, setFontSize] = useState<number>(14);
  const [fontFamily, setFontFamily] = useState<string>('Amiri');

  // Auto initialize question number when opened
  useEffect(() => {
    if (isOpen) {
      const page = document.pages[activePageIndex];
      const existingQCount = page ? page.elements.filter(el => el.type === 'text' && (el as any).isQuestion).length : 0;
      const nextNum = existingQCount + 1;
      setCustomQuestionNumber(nextNum);
      
      if (!questionText) {
        setQuestionText(`السؤال ${numberToArabicWords(nextNum)}: اكتب نص السؤال هنا...`);
      }

      setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current.focus();
          textInputRef.current.select();
        }
      }, 100);
    }
  }, [isOpen, activePageIndex]);

  if (!isOpen) return null;

  const currentQNum = customQuestionNumber !== '' ? Number(customQuestionNumber) : 1;

  // Tashkeel Insertion Helper
  const insertTashkeel = (char: string) => {
    if (!textInputRef.current) return;
    const input = textInputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const newText = questionText.substring(0, start) + char + questionText.substring(end);
    setQuestionText(newText);
    setTimeout(() => {
      input.selectionStart = input.selectionEnd = start + char.length;
      input.focus();
    }, 10);
  };

  // Math / Formula Symbol Insertion Helper
  const insertSymbol = (sym: string) => {
    if (!textInputRef.current) return;
    const input = textInputRef.current;
    const start = input.selectionStart;
    const newText = questionText.substring(0, start) + ` ${sym} ` + questionText.substring(input.selectionEnd);
    setQuestionText(newText);
    setTimeout(() => {
      input.focus();
    }, 10);
  };

  const createQuestionElement = (keepModalOpen: boolean = false) => {
    const page = document.pages[activePageIndex];
    const existingQuestions = page ? page.elements.filter(el => el.type === 'text' && (el as any).isQuestion) : [];
    
    let defaultOptions: string[] | undefined = undefined;
    if (selectedType === 'mcq') {
      defaultOptions = ['الخيار (أ)', 'الخيار (ب)', 'الخيار (ج)', 'الخيار (د)'];
    } else if (selectedType === 'tf') {
      defaultOptions = ['صواب (صح)', 'خطأ'];
    }

    // Auto calculate Y position cleanly
    const lastY = existingQuestions.length > 0 
      ? Math.max(...existingQuestions.map(e => e.y + e.height)) + 20 
      : 300;

    const finalContent = questionText.trim() || `السؤال ${numberToArabicWords(currentQNum)}: اكتب نص السؤال هنا...`;

    const newQuestionId = crypto.randomUUID();
    const newQuestion: EditorElement = {
      id: newQuestionId,
      type: 'text',
      x: 35,
      y: Math.min(lastY, 950),
      width: 724,
      height: selectedType === 'mcq' ? 140 : 110,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: 2,
      content: finalContent,
      fontSize: fontSize,
      fontFamily: fontFamily,
      fontWeight: 'bold',
      color: '#000000',
      textAlign: selectedType === 'english' ? 'left' : 'right',
      isQuestion: true,
      questionNumber: currentQNum,
      questionType: selectedType as any,
      marks: marks,
      options: defaultOptions,
      optionColumns: 4
    };

    addElement(activePageIndex, newQuestion);
    reorderAndRenumberQuestions(activePageIndex);
    selectElement(newQuestionId);

    if (onCreated) {
      onCreated(newQuestionId);
    }

    if (keepModalOpen) {
      // Auto increment question number for fast sequential addition
      const nextNum = currentQNum + 1;
      setCustomQuestionNumber(nextNum);
      setQuestionText(`السؤال ${numberToArabicWords(nextNum)}: `);
      setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      }, 100);
    } else {
      onClose();

      // Smooth scroll focus into canvas
      setTimeout(() => {
        const cardEl = window.document.getElementById(`question-card-${newQuestionId}`);
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 font-sans select-none" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
              <PlusCircle size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">إضافة سؤال جديد (Smart Question Card)</h3>
              <p className="text-xs font-bold text-slate-400">إدخال نص السؤال، التنسيق، والدرجة دون تعقيدات تقنية</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1">
          
          {/* Question Text Area + Tashkeel Bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-black text-slate-200 flex items-center gap-1.5">
                <Type size={15} className="text-indigo-400" />
                <span>1. نص السؤال الرسمي:</span>
              </label>

              {/* Tashkeel Quick Helper Buttons */}
              <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-xs font-bold text-indigo-300">
                <span className="text-[10px] text-slate-400 font-bold ml-1">تشكيل:</span>
                {['َ', 'ً', 'ُ', 'ٌ', 'ِ', 'ٍ', 'ْ', 'ّ'].map((char, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => insertTashkeel(char)}
                    className="w-5 h-5 bg-slate-900 hover:bg-indigo-600 hover:text-white rounded text-center leading-none transition-colors border border-slate-800"
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>

            <textarea 
              ref={textInputRef}
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              style={{ fontFamily: fontFamily }}
              placeholder="اكتب نص السؤال هنا باللغة العربية أو الإنجليزية..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm font-bold text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 leading-relaxed resize-none"
            />

            {/* Quick Symbol Insert Bar for STEM / Languages */}
            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 text-xs custom-scrollbar">
              <span className="text-[10px] text-slate-400 font-bold shrink-0">رموز سريعة:</span>
              {['$\\frac{x}{y}$', '$\\sqrt{x}$', '$\\int$', '$\\sum$', '$\\alpha$', '$\\beta$', '$\\pi$', '$\\vec{F}$', '$\\rightleftharpoons$', '« »'].map((sym, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => insertSymbol(sym)}
                  className="px-2 py-0.5 bg-slate-950 border border-slate-800 hover:border-indigo-500 hover:text-indigo-300 rounded-lg text-[11px] font-mono text-slate-300 shrink-0 transition-colors"
                >
                  {sym.replace(/\$/g, '')}
                </button>
              ))}
            </div>
          </div>

          {/* Question Type Grid */}
          <div>
            <label className="text-xs font-black text-slate-200 mb-2 block">2. نوع السؤال المطلوب:</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {QUESTION_TYPES.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`p-2.5 rounded-2xl border text-right transition-all flex items-center gap-2.5 ${
                      isSelected 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-md ring-2 ring-indigo-400/40' 
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className={`p-1.5 rounded-xl border shrink-0 ${isSelected ? 'bg-white/20 text-white border-white/30' : `${type.bg} ${type.color}`}`}>
                      <Icon size={16} />
                    </div>
                    <span className="text-xs font-bold truncate">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls Bar (Marks, Q Number, Font Size, Font Family) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
            
            {/* Marks */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1 flex items-center gap-1">
                <Award size={12} className="text-amber-400" />
                <span>الدرجة:</span>
              </label>
              <select 
                value={marks} 
                onChange={(e) => setMarks(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-black text-amber-400 focus:outline-none focus:border-indigo-500"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 25, 50].map(m => (
                  <option key={m} value={m}>{m} {m === 1 ? 'درجة' : 'درجات'}</option>
                ))}
              </select>
            </div>

            {/* Question Number */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1 flex items-center gap-1">
                <Hash size={12} className="text-indigo-400" />
                <span>رقم السؤال:</span>
              </label>
              <input 
                type="number" 
                value={customQuestionNumber} 
                onChange={(e) => setCustomQuestionNumber(e.target.value === '' ? '' : Number(e.target.value))}
                min="1"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2 py-1.5 text-xs font-bold text-slate-200 text-center focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Font Size */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">حجم الخط:</label>
              <select 
                value={fontSize} 
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2 py-1.5 text-xs font-bold text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {FONT_SIZES.map(sz => (
                  <option key={sz} value={sz}>{sz}px</option>
                ))}
              </select>
            </div>

            {/* Font Family */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">نوع الخط:</label>
              <select 
                value={fontFamily} 
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2 py-1.5 text-xs font-bold text-slate-200 focus:outline-none focus:border-indigo-500 truncate"
              >
                {ARABIC_FONTS.map(f => (
                  <option key={f.name} value={f.value} style={{ fontFamily: f.value }}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Smart Writing Tip Warning */}
          {questionText.length > 250 && (
            <div className="p-2.5 bg-amber-950/40 border border-amber-800/60 rounded-xl flex items-center gap-2 text-xs font-bold text-amber-300">
              <AlertTriangle size={15} className="shrink-0 text-amber-400" />
              <span>نص السؤال طويل نسبياً. سيرعاه محرك الرقيم تلقائياً ويضبط المسافات دون التأثير على تنسيق الصفحة.</span>
            </div>
          )}

        </div>

        {/* Action Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
          >
            إلغاء
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => createQuestionElement(true)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 hover:text-white border border-indigo-700/50 rounded-xl text-xs font-black transition-all flex items-center gap-1.5"
            >
              <PlusCircle size={15} />
              <span>إنشاء وإضافة سؤال آخر</span>
            </button>

            <button
              onClick={() => createQuestionElement(false)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <Check size={16} />
              <span>إنشاء السؤال وتطبيقه</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
