import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Check, 
  HelpCircle, 
  Sparkles,
  BookOpen,
  AlignRight
} from 'lucide-react';
import { ExamQuestion, QuestionOption, QuestionType } from '../types/exam';
import { AITextNormalizer } from '../utils/aiTextNormalizer';

interface QuestionEditorModalProps {
  question: ExamQuestion | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedQuestion: ExamQuestion) => void;
  onDelete?: (id: string) => void;
}

export const QuestionEditorModal: React.FC<QuestionEditorModalProps> = ({
  question,
  isOpen,
  onClose,
  onSave,
  onDelete
}) => {
  if (!isOpen || !question) return null;

  const [type, setType] = useState<QuestionType>(question.type);
  const [text, setText] = useState<string>(question.text);
  const [points, setPoints] = useState<number>(question.points || 2);
  const [passageText, setPassageText] = useState<string>(question.passageText || '');
  const [correctAnswer, setCorrectAnswer] = useState<string>(question.correctAnswer || (question.type === 'tf' ? 'T' : 'A'));
  const [options, setOptions] = useState<QuestionOption[]>(
    question.options || [
      { id: 'A', label: 'أ', text: 'الخيار الأول' },
      { id: 'B', label: 'ب', text: 'الخيار الثاني' },
      { id: 'C', label: 'ج', text: 'الخيار الثالث' },
      { id: 'D', label: 'د', text: 'الخيار الرابع' }
    ]
  );
  const [essayLines, setEssayLines] = useState<number>(question.essayLinesCount || 3);

  // AI Clean Handler
  const handleAICleanText = () => {
    const cleaned = AITextNormalizer.deepCleanArabic(text, {
      stripDiacritics: false,
      removeTatweel: true,
      fixPunctuation: true
    });
    setText(cleaned);
  };

  const handleSave = () => {
    onSave({
      ...question,
      type,
      text,
      points: Number(points),
      passageText: (type === 'passage' || type === 'poetry') ? passageText : undefined,
      correctAnswer,
      options: type === 'mcq' ? options : undefined,
      essayLinesCount: type === 'essay' ? Number(essayLines) : undefined
    });
    onClose();
  };

  const handleAddOption = () => {
    const labels = ['أ', 'ب', 'ج', 'د', 'هـ', 'و'];
    const nextIdx = options.length;
    if (nextIdx >= labels.length) return;
    const newId = String.fromCharCode(65 + nextIdx);
    setOptions([...options, { id: newId, label: labels[nextIdx], text: `خيار جديد (${labels[nextIdx]})` }]);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto select-none" dir="rtl">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0d5c3a] to-slate-900 p-4 px-6 flex items-center justify-between border-b border-slate-700 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black">محرر تفاصيل الفقرة الامتحانية</h3>
              <p className="text-[11px] text-emerald-200/80">تعديل النص والخيارات وتحديد الإجابة الصحيحة للكنترول</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
          
          {/* Question Type Selector */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">نوع العنصر / السؤال:</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {[
                { id: 'mcq' as QuestionType, label: 'اختيار من متعدد' },
                { id: 'tf' as QuestionType, label: 'صواب أو خطأ' },
                { id: 'passage' as QuestionType, label: 'نص قرائي / قطعة' },
                { id: 'poetry' as QuestionType, label: 'بيت شعري' },
                { id: 'essay' as QuestionType, label: 'سؤال مقالي / تعبير' }
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setType(t.id);
                    if (t.id === 'tf') setCorrectAnswer('T');
                    else if (t.id === 'mcq') setCorrectAnswer('A');
                  }}
                  className={`py-2 px-2 rounded-xl text-center font-bold transition ${
                    type === t.id 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question Text / Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-300 font-bold">
                {type === 'passage' ? 'عنوان القطعة / تعليمات القراءة:' : type === 'poetry' ? 'عنوان الفقرة الشعرية:' : 'نص السؤال:'}
              </label>
              <button
                type="button"
                onClick={handleAICleanText}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-800/40"
              >
                <Sparkles size={12} />
                <span>تدقيق وضبط النص ذكياً</span>
              </button>
            </div>
            <textarea
              rows={2}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="اكتب نص السؤال بدقة..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Passage / Poetry Body text */}
          {(type === 'passage' || type === 'poetry') && (
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">
                {type === 'passage' ? 'محتوى النص النثري / القطعة:' : 'البيت الشعري (الصدر والعجز):'}
              </label>
              <textarea
                rows={3}
                value={passageText}
                onChange={(e) => setPassageText(e.target.value)}
                placeholder={type === 'poetry' ? '"إِذَا المَلِكُ الجَبَّارُ صَعَّرَ خَدَّهُ ... مَشَيْنَا إلَيْهِ بالسُّيُوفِ نُعَاتِبُهْ"' : 'اكتب نص القطعة القرائية هنا...'}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-xs focus:border-emerald-500 focus:outline-none font-amiri text-sm"
              />
            </div>
          )}

          {/* Score & Points */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">درجة الفقرة:</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="20"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {type === 'essay' && (
              <div>
                <label className="block text-slate-300 font-bold mb-1.5">عدد أسطر الإجابة المسطرة:</label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={essayLines}
                  onChange={(e) => setEssayLines(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* True / False Selection */}
          {type === 'tf' && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <label className="block text-slate-300 font-bold">الإجابة النموذجية الصحيحة للتصحيح الآلي (OMR):</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCorrectAnswer('T')}
                  className={`flex-1 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                    correctAnswer === 'T' 
                      ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400' 
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold">ص</span>
                  <span>صواب (True)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCorrectAnswer('F')}
                  className={`flex-1 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                    correctAnswer === 'F' 
                      ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-400' 
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold">خ</span>
                  <span>خطأ (False)</span>
                </button>
              </div>
            </div>
          )}

          {/* MCQ Options List */}
          {type === 'mcq' && (
            <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-bold">خيارات الإجابة وتحديد الإجابة الصحيحة:</label>
                {options.length < 6 && (
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                  >
                    <Plus size={14} />
                    <span>إضافة خيار</span>
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {options.map((opt, idx) => {
                  const isCorrect = correctAnswer === opt.id;

                  return (
                    <div key={opt.id} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCorrectAnswer(opt.id)}
                        className={`w-7 h-7 rounded-full font-bold flex items-center justify-center shrink-0 transition text-xs ${
                          isCorrect 
                            ? 'bg-emerald-500 text-slate-950 font-black ring-2 ring-emerald-300' 
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                        title="انقر لتعيين كإجابة صحيحة"
                      >
                        {opt.label}
                      </button>

                      <input
                        type="text"
                        value={opt.text}
                        onChange={(e) => {
                          const newOpts = [...options];
                          newOpts[idx].text = e.target.value;
                          setOptions(newOpts);
                        }}
                        placeholder={`نص الخيار (${opt.label})`}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />

                      {options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(idx)}
                          className="p-2 text-slate-500 hover:text-rose-400 transition"
                          title="حذف الخيار"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 p-4 px-6 border-t border-slate-800 flex items-center justify-between">
          {onDelete ? (
            <button
              type="button"
              onClick={() => {
                onDelete(question.id);
                onClose();
              }}
              className="text-rose-400 hover:text-rose-300 font-bold text-xs flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-rose-950/30 transition"
            >
              <Trash2 size={14} />
              <span>حذف الفقرة</span>
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl transition shadow-lg flex items-center gap-1.5"
            >
              <Check size={16} />
              <span>حفظ التعديلات</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
