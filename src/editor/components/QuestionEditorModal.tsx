/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * محرر الرقيم التربوي - نافذة تحرير السؤال الذكية (QuestionEditorModal)
 * واجهة بسيطة ومرنة للمعلم لصياغة نص السؤال والدرجة وخيارات الاختيار من متعدد دون أكواد داخلية.
 * برمجة وتصميم وتطوير المهندس سهيل الهزبري
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  X, 
  Check, 
  Plus, 
  Trash2, 
  ChevronDown, 
  Sliders, 
  Type, 
  Award, 
  HelpCircle 
} from 'lucide-react';
import { TextElement } from '../types';

interface QuestionEditorModalProps {
  isOpen: boolean;
  element: TextElement | null;
  onClose: () => void;
  onSave: (updated: Partial<TextElement>) => void;
}

export const QuestionEditorModal: React.FC<QuestionEditorModalProps> = ({
  isOpen,
  element,
  onClose,
  onSave,
}) => {
  const [content, setContent] = useState('');
  const [questionType, setQuestionType] = useState<string>('essay');
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [marks, setMarks] = useState<number>(2);
  const [fontSize, setFontSize] = useState<number>(14);
  const [fontFamily, setFontFamily] = useState<string>('Cairo');
  const [options, setOptions] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (element) {
      setContent(element.content || '');
      setQuestionType(element.questionType || 'essay');
      setQuestionNumber(element.questionNumber || 1);
      setMarks(element.marks || 2);
      setFontSize(element.fontSize || 14);
      setFontFamily(element.fontFamily || 'Cairo');
      setOptions(element.options ? [...element.options] : []);
    }
  }, [element]);

  if (!isOpen || !element) return null;

  const handleAddOption = () => {
    const letters = ['أ', 'ب', 'ج', 'د', 'هـ', 'و'];
    const nextLetter = letters[options.length] || `${options.length + 1}`;
    setOptions([...options, `الخيار (${nextLetter})`]);
  };

  const handleUpdateOption = (index: number, val: string) => {
    const updated = [...options];
    updated[index] = val;
    setOptions(updated);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({
      content,
      questionType: questionType as any,
      questionNumber,
      marks,
      fontSize,
      fontFamily,
      options: questionType === 'mcq' ? options : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 select-none font-sans" dir="rtl">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#004B6E] text-white flex items-center justify-center shadow-xs">
              <CheckSquare size={20} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">تحرير السؤال (س{questionNumber})</h3>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500">تعديل صيغة السؤال والدرجات والخيارات</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Question Text */}
          <div>
            <label className="text-xs font-black text-slate-700 dark:text-slate-300 block mb-1.5">
              نص السؤال
            </label>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="اكتب منطوق السؤال هنا بكل وضوح..."
              className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-hidden focus:border-[#004B6E] focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 transition-all"
            />
          </div>

          {/* Question Type & Marks Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-slate-700 dark:text-slate-300 block mb-1.5">
                نوع السؤال
              </label>
              <select
                value={questionType}
                onChange={(e) => {
                  const newType = e.target.value;
                  setQuestionType(newType);
                  if (newType === 'mcq' && options.length === 0) {
                    setOptions(['الخيار (أ)', 'الخيار (ب)', 'الخيار (ج)', 'الخيار (د)']);
                  }
                }}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 outline-hidden"
              >
                <option value="essay">سؤال مقالي / مباشر</option>
                <option value="mcq">اختيار من متعدد (MCQ)</option>
                <option value="tf">صواب أو خطأ</option>
                <option value="fill">أكمل الفراغات</option>
                <option value="matching">مزاوجة وتوصيل</option>
                <option value="reasoning">علل / بيّن السبب</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-slate-700 dark:text-slate-300 block mb-1.5">
                الدرجة المستحقة
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  max="100"
                  value={marks}
                  onChange={(e) => setMarks(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 text-center"
                />
                <span className="text-xs font-bold text-slate-500 shrink-0">درجات</span>
              </div>
            </div>
          </div>

          {/* MCQ Options Editor */}
          {questionType === 'mcq' && (
            <div className="p-3.5 rounded-2xl bg-sky-50/60 dark:bg-slate-800/60 border border-sky-200/80 dark:border-slate-700/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 dark:text-slate-200">خيارات الإجابة:</span>
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="px-2 py-1 rounded-lg bg-white dark:bg-slate-700 border border-sky-200 dark:border-slate-600 text-xs font-bold text-[#004B6E] dark:text-sky-300 hover:bg-sky-50 transition-colors flex items-center gap-1"
                >
                  <Plus size={13} />
                  <span>إضافة خيار</span>
                </button>
              </div>

              <div className="space-y-2">
                {options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-5 text-center text-xs font-bold text-slate-400 tabular-nums">{i + 1}</span>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handleUpdateOption(i, e.target.value)}
                      className="flex-1 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200"
                    />
                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(i)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Advanced Options Accordion */}
          <div className="border border-slate-200 dark:border-slate-700/80 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/40 text-right flex items-center justify-between text-xs font-black text-slate-700 dark:text-slate-300"
            >
              <div className="flex items-center gap-2">
                <Sliders size={14} className="text-[#004B6E] dark:text-sky-400" />
                <span>خيارات متقدمة (تنسيق الخط وحجم العرض)</span>
              </div>
              <ChevronDown size={15} className={`transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`} />
            </button>

            {showAdvanced && (
              <div className="p-4 space-y-3 bg-white dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      حجم خط السؤال ({fontSize}px)
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="22"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#004B6E]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      نوع الخط
                    </label>
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                    >
                      <option value="Cairo">خط القاهرة (Cairo)</option>
                      <option value="Amiri">خط أميري (Amiri)</option>
                      <option value="Noto Naskh Arabic">خط النسخ (Noto Naskh)</option>
                      <option value="Inter">خط قياسي (Inter)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2 bg-slate-50 dark:bg-slate-800/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-[#004B6E] hover:bg-[#003B57] active:bg-[#002B40] text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Check size={16} />
            <span>حفظ التعديلات</span>
          </button>
        </div>

      </div>
    </div>
  );
};
