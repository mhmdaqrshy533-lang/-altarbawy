import React, { useState } from 'react';
import { TextElement } from '../types';
import { useEditorStore } from '../store/useEditorStore';
import { 
  Trash2, Copy, ArrowUp, ArrowDown, Plus, X, 
  Columns, Grid, List, CheckSquare
} from 'lucide-react';

interface QuestionCardProps {
  element: TextElement;
  activePageIndex: number;
}

export const formatQuestionNumber = (num: number, style?: string): string => {
  if (style === 'abjad') {
    const abjad = ['أ', 'ب', 'ج', 'د', 'هـ', 'و', 'ز', 'ح', 'ط', 'ي', 'ك', 'ل', 'م', 'ن', 'س', 'ع', 'ف', 'ص', 'ق', 'ر', 'ش', 'ت', 'ث', 'خ', 'ذ', 'ض', 'ظ', 'غ'];
    return abjad[num - 1] || `${num}`;
  }
  if (style === 'hierarchical') {
    return `1.${num}`;
  }
  if (style === 'roman') {
    const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];
    return roman[num - 1] || `${num}`;
  }
  return `${num}`;
};

export const QuestionCardComponent: React.FC<QuestionCardProps> = ({ element, activePageIndex }) => {
  const { 
    document, updateElement, removeElement, duplicateElement, 
    moveQuestionUp, moveQuestionDown, reorderAndRenumberQuestions 
  } = useEditorStore();

  const [isFocused, setIsFocused] = useState(false);

  // Extract clean text from content if it had prefixes like "س1:"
  const rawText = element.content.replace(/^س\s*[\d\w\.-]+:\s*/, '').replace(/\s*\[\d+\s*درجات\]$/, '');

  const questionType = element.questionType || 'essay';
  const optionCols = element.optionColumns || 4;
  const numStyle = element.numberingFormat || document.metadata.numberingStyle || 'arabic';

  const options = element.options || [
    'الخيار الأول',
    'الخيار الثاني',
    'الخيار الثالث',
    'الخيار الرابع'
  ];

  const formattedNum = formatQuestionNumber(element.questionNumber || 1, numStyle);

  const handleTypeChange = (newType: 'mcq' | 'tf' | 'essay' | 'matching' | 'fill' | 'reasoning') => {
    let defaultOptions = options;
    if (newType === 'tf') {
      defaultOptions = ['صواب (صح)', 'خطأ'];
    } else if (newType === 'mcq' && options.length < 2) {
      defaultOptions = ['الخيار (أ)', 'الخيار (ب)', 'الخيار (ج)', 'الخيار (د)'];
    }
    updateElement(activePageIndex, element.id, { 
      questionType: newType, 
      options: defaultOptions 
    });
  };

  const handleOptionChange = (index: number, val: string) => {
    const nextOptions = [...options];
    nextOptions[index] = val;
    updateElement(activePageIndex, element.id, { options: nextOptions });
  };

  const handleAddOption = () => {
    const letters = ['أ', 'ب', 'ج', 'د', 'هـ', 'و', 'ز', 'ح'];
    const nextLetter = letters[options.length] || `${options.length + 1}`;
    updateElement(activePageIndex, element.id, { 
      options: [...options, `الخيار (${nextLetter})`] 
    });
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    const nextOptions = options.filter((_, i) => i !== index);
    updateElement(activePageIndex, element.id, { options: nextOptions });
  };

  const handleOptionColumnsChange = (cols: 1 | 2 | 4) => {
    updateElement(activePageIndex, element.id, { optionColumns: cols });
  };

  const handleMarksChange = (marks: number) => {
    updateElement(activePageIndex, element.id, { marks });
    setTimeout(() => {
      const pageElements = useEditorStore.getState().document.pages[activePageIndex].elements;
      const totalMarks = pageElements
        .filter(el => el.type === 'text' && (el as any).isQuestion)
        .reduce((sum, el) => sum + ((el as any).marks || 0), 0);
      useEditorStore.getState().updateMetadata({ marks: String(totalMarks || 50) });
    }, 50);
  };

  const handleTextBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText.trim();
    const formattedContent = `س${formattedNum}: ${text}`;
    updateElement(activePageIndex, element.id, { content: formattedContent });
    setIsFocused(false);
    setTimeout(() => {
      reorderAndRenumberQuestions(activePageIndex);
    }, 100);
  };

  const getGridClass = () => {
    if (optionCols === 1) return 'grid-cols-1';
    if (optionCols === 2) return 'grid-cols-2';
    return 'grid-cols-2 md:grid-cols-4';
  };

  return (
    <div 
      className={`w-full h-full bg-white rounded-xl border-2 transition-all p-3 text-right flex flex-col justify-between font-sans select-none ${
        isFocused ? 'border-indigo-600 shadow-md ring-2 ring-indigo-200' : 'border-slate-800 hover:border-slate-900 shadow-xs'
      }`}
      dir="rtl"
    >
      {/* Question Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2 bg-slate-50/80 -mx-3 -mt-3 p-2.5 rounded-t-lg print:border-slate-400">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Question Number Badge */}
          <span className="bg-slate-900 text-white font-black text-xs px-2.5 py-1 rounded-lg shrink-0 shadow-xs">
            س{formattedNum}
          </span>

          {/* Question Type Selector */}
          <select 
            value={questionType}
            onChange={(e) => handleTypeChange(e.target.value as any)}
            className="bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-bold rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer print:border-none print:bg-transparent"
          >
            <option value="essay">سؤال مقالي / إجابة قصيرة</option>
            <option value="mcq">اختيار من متعدد (MCQ)</option>
            <option value="tf">صواب / خطأ</option>
            <option value="matching">توصيل / زاوج</option>
            <option value="fill">أكمل الفراغات</option>
            <option value="reasoning">علل / اذكر السبب</option>
          </select>

          {/* Option Columns Selector for MCQ */}
          {questionType === 'mcq' && (
            <div className="flex items-center bg-white border border-slate-300 rounded-lg p-0.5 text-[10px] font-bold text-slate-600 print:hidden">
              <span className="px-1.5 text-slate-400">الأعمدة:</span>
              <button 
                onClick={() => handleOptionColumnsChange(1)}
                className={`px-1.5 py-0.5 rounded ${optionCols === 1 ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100'}`}
                title="عمود واحد"
              >
                1
              </button>
              <button 
                onClick={() => handleOptionColumnsChange(2)}
                className={`px-1.5 py-0.5 rounded ${optionCols === 2 ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100'}`}
                title="عمودان"
              >
                2
              </button>
              <button 
                onClick={() => handleOptionColumnsChange(4)}
                className={`px-1.5 py-0.5 rounded ${optionCols === 4 ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100'}`}
                title="4 أعمدة"
              >
                4
              </button>
            </div>
          )}

          {/* Marks Input Badge */}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-2 py-0.5 rounded-lg text-xs font-bold">
            <input 
              type="number" 
              value={element.marks || 5} 
              onChange={(e) => handleMarksChange(Number(e.target.value))}
              className="w-10 bg-white border border-amber-300 rounded text-center text-xs font-bold text-amber-900 focus:outline-none focus:ring-1 focus:ring-amber-500 print:border-none print:bg-transparent"
              min="1"
            />
            <span className="text-[11px] text-amber-800 font-bold">درجات</span>
          </div>
        </div>

        {/* Action Tools (Hidden on Print) */}
        <div className="flex items-center gap-1 print:hidden">
          <button 
            onClick={() => moveQuestionUp(activePageIndex, element.id)}
            className="p-1 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
            title="نقل للأعلى"
          >
            <ArrowUp size={14} />
          </button>
          <button 
            onClick={() => moveQuestionDown(activePageIndex, element.id)}
            className="p-1 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
            title="نقل للأسفل"
          >
            <ArrowDown size={14} />
          </button>
          <button 
            onClick={() => duplicateElement(activePageIndex, element.id)}
            className="p-1 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors"
            title="تكرار السؤال"
          >
            <Copy size={14} />
          </button>
          <button 
            onClick={() => removeElement(activePageIndex, element.id)}
            className="p-1 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
            title="حذف السؤال"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Question Text Field (Inline Edit) */}
      <div className="flex-1 my-1">
        <div 
          contentEditable
          suppressContentEditableWarning
          onFocus={() => setIsFocused(true)}
          onBlur={handleTextBlur}
          className="w-full text-slate-900 font-bold text-sm leading-relaxed outline-none cursor-text px-1 py-0.5 min-h-[30px]"
          style={{ fontSize: element.fontSize || 14 }}
        >
          {rawText || 'اكتب نص السؤال هنا...'}
        </div>
      </div>

      {/* Dynamic MCQ Grid Options Area */}
      {questionType === 'mcq' && (
        <div className="mt-2 pt-2 border-t border-slate-200">
          <div className={`grid ${getGridClass()} gap-2`}>
            {options.map((opt, i) => {
              const letters = ['أ', 'ب', 'ج', 'د', 'هـ', 'و', 'ز', 'ح'];
              const letter = letters[i] || `${i + 1}`;
              return (
                <div key={i} className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 print:bg-white print:border-slate-800">
                  <span className="w-5 h-5 rounded-full border border-slate-800 flex items-center justify-center font-black text-[10px] bg-white shrink-0">
                    {letter}
                  </span>
                  <input 
                    type="text" 
                    value={opt} 
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    className="w-full bg-transparent border-none text-xs font-bold text-slate-800 focus:outline-none focus:ring-0"
                  />
                  {options.length > 2 && (
                    <button 
                      onClick={() => handleRemoveOption(i)}
                      className="text-slate-400 hover:text-rose-600 p-0.5 print:hidden"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <button 
            onClick={handleAddOption}
            className="mt-2 flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors print:hidden"
          >
            <Plus size={12} />
            <span>إضافة خيار آخر</span>
          </button>
        </div>
      )}

      {/* True/False Options */}
      {questionType === 'tf' && (
        <div className="mt-2 pt-2 border-t border-slate-200 flex items-center gap-6 text-xs font-bold text-slate-800">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 px-3 py-1 rounded-lg">
            <span className="w-4 h-4 border border-slate-800 rounded-sm inline-block"></span>
            <span>صواب (صح)</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 px-3 py-1 rounded-lg">
            <span className="w-4 h-4 border border-slate-800 rounded-sm inline-block"></span>
            <span>خطأ</span>
          </div>
        </div>
      )}

      {/* Essay / Short Answer Lines */}
      {questionType === 'essay' && (
        <div className="mt-1 text-xs text-slate-400 font-normal italic border-b border-dashed border-slate-300 pb-2">
          ...................................................................................................................................................
        </div>
      )}
    </div>
  );
};

