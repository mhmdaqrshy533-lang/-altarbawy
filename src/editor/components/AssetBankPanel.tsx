import React, { useState } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { 
  Library, HelpCircle, Table, Image as ImageIcon, Sparkles, 
  BookOpen, Calculator, Zap, FlaskConical, Globe, Plus, X, Grid 
} from 'lucide-react';

interface AssetBankPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_BANK_QUESTIONS = [
  {
    category: 'الرياضيات',
    type: 'math',
    content: 'س: حُل المعادلة التربيعية الآتية مستخدماً القانون العام: $x^2 - 5x + 6 = 0$',
    marks: 5
  },
  {
    category: 'الفيزياء',
    type: 'physics',
    content: 'س: احسب الشدة الكهرومغناطيسية للملف عند مرور تيار كهربائي قدره 5 أمبير.',
    marks: 6
  },
  {
    category: 'الكيمياء',
    type: 'chemistry',
    content: 'س: وازن المعادلة الكيميائية الآتية مع ذكر اسم التفاعل: $2H_2 + O_2 \\rightarrow 2H_2O$',
    marks: 4
  },
  {
    category: 'اللغة العربية',
    type: 'arabic',
    content: 'س: أعرب ما تحته خط إعراباً تاماً في البيت الشعري الآتي مع ضبط التشكيل.',
    marks: 5
  },
  {
    category: 'English',
    type: 'english',
    content: 'Question: Read the passage above and summarize the main idea in three concise sentences.',
    marks: 5
  }
];

export const AssetBankPanel: React.FC<AssetBankPanelProps> = ({ isOpen, onClose }) => {
  const { document, activePageIndex, addElement, selectElement } = useEditorStore();
  const [activeTab, setActiveTab] = useState<'questions' | 'stamps' | 'formulas'>('questions');

  if (!isOpen) return null;

  const handleInsertQuestion = (q: typeof PRESET_BANK_QUESTIONS[0]) => {
    const page = document.pages[activePageIndex];
    const existingQCount = page ? page.elements.filter(el => el.type === 'text' && (el as any).isQuestion).length : 0;
    const qNum = existingQCount + 1;

    const newId = crypto.randomUUID();
    const newQuestion = {
      id: newId,
      type: 'text' as const,
      x: 35,
      y: 200 + existingQCount * 110,
      width: 724,
      height: 80,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: 2,
      content: q.content.replace(/^س:/, `س${qNum}:`),
      fontSize: 14,
      fontFamily: q.category === 'English' ? 'Inter' : 'Amiri',
      fontWeight: 'bold',
      color: '#000000',
      textAlign: (q.category === 'English' ? 'left' : 'right') as any,
      isQuestion: true,
      questionNumber: qNum,
      marks: q.marks
    };

    addElement(activePageIndex, newQuestion);
    selectElement(newId);
    onClose();
  };

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-80 bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col font-sans select-none text-slate-100 animate-in slide-in-from-right duration-200" dir="rtl">
      {/* Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-400 font-black text-sm">
          <Library size={18} className="stroke-[2.5]" />
          <span>بنك الأسئلة والعناصر (Asset Bank)</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/60 p-1">
        <button 
          onClick={() => setActiveTab('questions')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'questions' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          أسئلة جاهزة
        </button>
        <button 
          onClick={() => setActiveTab('stamps')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'stamps' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          أختام وشعارات
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {activeTab === 'questions' && (
          <div className="space-y-3">
            {PRESET_BANK_QUESTIONS.map((q, idx) => (
              <div 
                key={idx}
                className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl hover:border-indigo-500/60 transition-all space-y-2 group cursor-pointer"
                onClick={() => handleInsertQuestion(q)}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800/60 rounded-md text-[10px]">
                    {q.category}
                  </span>
                  <span className="text-amber-400 text-[11px] font-black">{q.marks} درجات</span>
                </div>
                <p className="text-xs text-slate-200 font-bold leading-relaxed">{q.content}</p>
                <button className="w-full py-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1">
                  <Plus size={13} />
                  <span>إدراج في الصفحة الحالية</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stamps' && (
          <div className="text-center py-8 text-xs font-bold text-slate-400 space-y-3">
            <Sparkles size={28} className="mx-auto text-amber-400" />
            <p>يمكنك اختيار الشعار والختم الوزاري مباشرة من إعدادات القالب بضغطة زر واحدة.</p>
          </div>
        )}
      </div>
    </div>
  );
};
