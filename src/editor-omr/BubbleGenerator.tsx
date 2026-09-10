import React, { useState } from 'react';
import { useOMRStore } from './OMRStore';
import { BubbleShape, BubbleLabelType } from './types';
import { CheckSquare, Sparkles, X, Grid, Circle, Square, LayoutGrid, Hash } from 'lucide-react';

export const BubbleGenerator: React.FC = () => {
  const { showBubbleGeneratorModal, setShowBubbleGeneratorModal, generateBubbleGrid } = useOMRStore();

  const [questionCount, setQuestionCount] = useState<number>(40);
  const [choicesCount, setChoicesCount] = useState<number>(4);
  const [columns, setColumns] = useState<number>(2);
  const [questionType, setQuestionType] = useState<'mcq' | 'true_false' | 'matching' | 'ordering' | 'numeric'>('mcq');
  const [bubbleShape, setBubbleShape] = useState<BubbleShape>('circle');
  const [labelType, setLabelType] = useState<BubbleLabelType>('arabic');
  const [marksPerQuestion, setMarksPerQuestion] = useState<number>(2.5);
  const [startQuestionNumber, setStartQuestionNumber] = useState<number>(1);

  if (!showBubbleGeneratorModal) return null;

  const handleGenerate = () => {
    generateBubbleGrid({
      questionCount,
      choicesCount: questionType === 'true_false' ? 2 : choicesCount,
      columns,
      questionType,
      bubbleShape,
      labelType: questionType === 'true_false' ? 'arabic' : labelType,
      marksPerQuestion,
      startQuestionNumber
    });
  };

  const getLabels = () => {
    if (questionType === 'true_false') return ['صح', 'خطأ'];
    if (labelType === 'arabic') return ['أ', 'ب', 'ج', 'د', 'هـ'].slice(0, choicesCount);
    if (labelType === 'english') return ['A', 'B', 'C', 'D', 'E'].slice(0, choicesCount);
    return ['1', '2', '3', '4', '5'].slice(0, choicesCount);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/30 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Grid size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black font-serif">مولد شبكات التظليل الآلي (Bubble Generator)</h2>
              <p className="text-xs text-slate-400 font-bold">إنشاء شبكات إجابة معايرة 100% للتصحيح الضوئي</p>
            </div>
          </div>
          <button 
            onClick={() => setShowBubbleGeneratorModal(false)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          
          {/* Preset Buttons */}
          <div>
            <label className="text-xs font-black text-slate-500 mb-2 block">اختيار عدد الأسئلة السريع:</label>
            <div className="grid grid-cols-6 gap-2">
              {[10, 20, 30, 40, 50, 60, 80, 100].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    setQuestionCount(num);
                    if (num <= 20) setColumns(1);
                    else if (num <= 60) setColumns(2);
                    else setColumns(3);
                  }}
                  className={`py-2 px-3 rounded-xl font-black text-xs transition-all border ${
                    questionCount === num 
                      ? 'bg-purple-600 text-white border-purple-700 shadow-md shadow-purple-200' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {num} سؤال
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Question Type */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-600">نوع الأسئلة:</label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="mcq">اختيار من متعدد (MCQ)</option>
                <option value="true_false">صح وخطأ (True/False)</option>
                <option value="matching">مطابقة / توصيل</option>
                <option value="ordering">ترتيب تسلسلي</option>
                <option value="numeric">شبكة إجابة رقمية</option>
              </select>
            </div>

            {/* Choices count */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-600">عدد الخيارات لكل سؤال:</label>
              <select
                disabled={questionType === 'true_false'}
                value={choicesCount}
                onChange={(e) => setChoicesCount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              >
                <option value={2}>خياران (2)</option>
                <option value={3}>3 خيارات</option>
                <option value={4}>4 خيارات (القياسي اليمني)</option>
                <option value={5}>5 خيارات (جامعي)</option>
              </select>
            </div>

            {/* Columns count */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-600">توزيع أعمدة الورقة:</label>
              <select
                value={columns}
                onChange={(e) => setColumns(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value={1}>عمود واحد (1 Column)</option>
                <option value={2}>عمودان (2 Columns)</option>
                <option value={3}>3 أعمدة (3 Columns)</option>
                <option value={4}>4 أعمدة (مكثف جداً)</option>
              </select>
            </div>

            {/* Bubble shape */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-600">شكل فقاعات التظليل:</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setBubbleShape('circle')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                    bubbleShape === 'circle' ? 'bg-purple-50 text-purple-700 border-purple-500' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  <Circle size={14} /> دائرية
                </button>
                <button
                  type="button"
                  onClick={() => setBubbleShape('square')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                    bubbleShape === 'square' ? 'bg-purple-50 text-purple-700 border-purple-500' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  <Square size={14} /> مربعة
                </button>
                <button
                  type="button"
                  onClick={() => setBubbleShape('oval')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                    bubbleShape === 'oval' ? 'bg-purple-50 text-purple-700 border-purple-500' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  <div className="w-3.5 h-2.5 rounded-full border-2 border-current"></div> بيضاوية
                </button>
              </div>
            </div>

            {/* Label Type */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-600">رموز الفقاعات:</label>
              <select
                disabled={questionType === 'true_false'}
                value={labelType}
                onChange={(e) => setLabelType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              >
                <option value="arabic">حروف عربية (أ ، ب ، ج ، د)</option>
                <option value="english">حروف إنجليزية (A , B , C , D)</option>
                <option value="numeric">أرقام (1 ، 2 ، 3 ، 4)</option>
              </select>
            </div>

            {/* Marks per question */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-600">درجة كل سؤال:</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="20"
                value={marksPerQuestion}
                onChange={(e) => setMarksPerQuestion(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Live Preview Sample */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-[11px] font-black text-slate-500 mb-2 flex items-center justify-between">
              <span>معاينة نمط فقاعات التظليل:</span>
              <span>مجموع الدرجات المفترضة: {(questionCount * marksPerQuestion).toFixed(1)} درجة</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="font-extrabold text-xs text-slate-800">س {startQuestionNumber}.</span>
              <div className="flex gap-3">
                {getLabels().map((lbl, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div 
                      className={`w-6 h-6 border-2 border-slate-900 flex items-center justify-center font-black text-[11px] bg-white text-slate-900 ${
                        bubbleShape === 'circle' ? 'rounded-full' : bubbleShape === 'oval' ? 'rounded-xl' : 'rounded-md'
                      }`}
                    >
                      {lbl}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-end gap-3">
          <button
            onClick={() => setShowBubbleGeneratorModal(false)}
            className="px-5 py-2.5 text-xs font-extrabold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-black text-xs shadow-lg shadow-purple-600/30 transition-all"
          >
            <Sparkles size={16} />
            توليد شبكة الأسئلة الآن
          </button>
        </div>

      </div>
    </div>
  );
};
