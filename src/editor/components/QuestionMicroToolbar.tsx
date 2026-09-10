import React from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { TextElement } from '../types';
import { 
  Copy, Scissors, Trash2, ArrowUp, ArrowDown, Plus, 
  HelpCircle, Sliders, CheckSquare, AlignLeft, Sparkles, X 
} from 'lucide-react';

interface QuestionMicroToolbarProps {
  element: TextElement;
  activePageIndex: number;
}

export const QuestionMicroToolbar: React.FC<QuestionMicroToolbarProps> = ({
  element,
  activePageIndex
}) => {
  const { 
    duplicateElement, removeElement, updateElement, addElement, 
    reorderAndRenumberQuestions, selectElement
  } = useEditorStore();

  const questionType = element.questionType || 'essay';

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateElement(activePageIndex, element.id);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeElement(activePageIndex, element.id);
  };

  const handleAddAbove = (e: React.MouseEvent) => {
    e.stopPropagation();
    const qNum = (element.questionNumber || 1);
    const newQuestion: any = {
      id: crypto.randomUUID(),
      type: 'text',
      x: element.x,
      y: Math.max(0, element.y - 120),
      width: element.width,
      height: element.height,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: 2,
      content: `س${qNum}: اكتب نص السؤال هنا...`,
      fontSize: element.fontSize || 14,
      fontFamily: element.fontFamily || 'Amiri',
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'right',
      isQuestion: true,
      questionNumber: qNum,
      questionType: 'essay',
      marks: 5
    };
    addElement(activePageIndex, newQuestion);
    setTimeout(() => reorderAndRenumberQuestions(activePageIndex), 50);
  };

  const handleAddBelow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const qNum = (element.questionNumber || 1) + 1;
    const newQuestion: any = {
      id: crypto.randomUUID(),
      type: 'text',
      x: element.x,
      y: element.y + element.height + 20,
      width: element.width,
      height: element.height,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: 2,
      content: `س${qNum}: اكتب نص السؤال هنا...`,
      fontSize: element.fontSize || 14,
      fontFamily: element.fontFamily || 'Amiri',
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'right',
      isQuestion: true,
      questionNumber: qNum,
      questionType: 'essay',
      marks: 5
    };
    addElement(activePageIndex, newQuestion);
    setTimeout(() => reorderAndRenumberQuestions(activePageIndex), 50);
  };

  const handleTypeChange = (newType: string) => {
    updateElement(activePageIndex, element.id, { questionType: newType as any });
  };

  const handleMarksChange = (marks: number) => {
    updateElement(activePageIndex, element.id, { marks });
  };

  return (
    <div 
      className="absolute -top-11 right-2 z-40 bg-slate-900/95 border border-slate-700/80 rounded-xl p-1 shadow-2xl backdrop-blur-md flex items-center gap-1 text-white font-sans text-[11px] font-bold select-none animate-in fade-in zoom-in-95 print:hidden"
      onClick={(e) => e.stopPropagation()}
      dir="rtl"
    >
      {/* Question Type Selector */}
      <select 
        value={questionType}
        onChange={(e) => handleTypeChange(e.target.value)}
        className="bg-slate-800 border border-slate-700 hover:border-slate-600 text-xs font-bold text-indigo-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
      >
        <option value="essay">مقالي</option>
        <option value="mcq">اختيار من متعدد</option>
        <option value="tf">صح وخطأ</option>
        <option value="matching">توصيل</option>
        <option value="fill">أكمل</option>
        <option value="reasoning">علل</option>
      </select>

      {/* Marks Quick Input */}
      <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg px-2 py-0.5 text-amber-400">
        <input 
          type="number" 
          value={element.marks || 5} 
          onChange={(e) => handleMarksChange(Number(e.target.value))}
          className="w-7 bg-transparent border-none text-center font-black text-amber-400 text-xs focus:outline-none"
          min="1"
        />
        <span className="text-[10px] text-slate-400">درجات</span>
      </div>

      <div className="w-[1px] h-4 bg-slate-700 mx-0.5" />

      {/* Add Above */}
      <button 
        onClick={handleAddAbove}
        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1 text-slate-200"
        title="إضافة سؤال فوق"
      >
        <ArrowUp size={12} className="text-indigo-400" />
        <span>فوق</span>
      </button>

      {/* Add Below */}
      <button 
        onClick={handleAddBelow}
        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1 text-slate-200"
        title="إضافة سؤال تحت"
      >
        <ArrowDown size={12} className="text-indigo-400" />
        <span>تحت</span>
      </button>

      <div className="w-[1px] h-4 bg-slate-700 mx-0.5" />

      {/* Copy */}
      <button 
        onClick={handleDuplicate}
        className="p-1 hover:bg-indigo-950 hover:text-indigo-400 rounded-lg transition-colors text-slate-300"
        title="نسخ السؤال"
      >
        <Copy size={13} />
      </button>

      {/* Delete */}
      <button 
        onClick={handleRemove}
        className="p-1 hover:bg-rose-950 hover:text-rose-400 rounded-lg transition-colors text-slate-300"
        title="حذف السؤال"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
};
