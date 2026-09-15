import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Trash2, 
  Plus, 
  Sparkles, 
  HelpCircle, 
  Award, 
  Layers, 
  Sliders,
  AlignLeft
} from 'lucide-react';
import { 
  ExamQuestion, 
  QuestionType, 
  QuestionOption, 
  MatchingPair,
  BloomLevel,
  QuestionDifficulty 
} from '../types/exam';
import { AITextNormalizer } from '../utils/aiTextNormalizer';

interface QuestionEditorModalProps {
  question: ExamQuestion | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: ExamQuestion) => void;
  onDelete?: (questionId: string) => void;
}

export const QuestionEditorModal: React.FC<QuestionEditorModalProps> = ({
  question,
  isOpen,
  onClose,
  onSave,
  onDelete
}) => {
  if (!isOpen || !question) return null;

  const [formData, setFormData] = useState<ExamQuestion>({ ...question });

  // Handle Question Type Change
  const handleTypeChange = (type: QuestionType) => {
    const updated: ExamQuestion = { ...formData, type };

    if (type === 'tf') {
      updated.options = undefined;
      updated.correctAnswer = updated.correctAnswer || 'T';
      updated.points = 1.5;
    } else if (type === 'mcq') {
      updated.options = updated.options || [
        { id: 'A', label: 'أ', text: 'الخيار الأول' },
        { id: 'B', label: 'ب', text: 'الخيار الثاني' },
        { id: 'C', label: 'ج', text: 'الخيار الثالث' },
        { id: 'D', label: 'د', text: 'الخيار الرابع' }
      ];
      updated.correctAnswer = updated.correctAnswer || 'A';
      updated.points = 2;
    } else if (type === 'matching') {
      updated.matchingPairs = updated.matchingPairs || [
        { id: '1', leftText: 'العنصر الأول', rightText: 'المطابق الأول', correctMatch: '1' },
        { id: '2', leftText: 'العنصر الثاني', rightText: 'المطابق الثاني', correctMatch: '2' },
        { id: '3', leftText: 'العنصر الثالث', rightText: 'المطابق الثالث', correctMatch: '3' }
      ];
      updated.points = 3;
    } else if (type === 'essay') {
      updated.essayLinesCount = updated.essayLinesCount || 3;
      updated.points = 3;
    } else if (type === 'poetry') {
      updated.passageText = updated.passageText || 'إِذَا المَلِكُ الجَبَّارُ صَعَّرَ خَدَّهُ ... مَشَيْنَا إلَيْهِ بالسُّيُوفِ نُعَاتِبُهْ';
      updated.points = 2;
    }

    setFormData(updated);
  };

  // AI Auto-Classify Bloom & Clean text
  const handleAICleanAndClassify = () => {
    const cleanedText = AITextNormalizer.deepCleanArabic(formData.text, {
      removeTatweel: true,
      fixPunctuation: true
    });
    const classification = AITextNormalizer.classifyBloomTaxonomy(cleanedText);

    setFormData({
      ...formData,
      text: cleanedText,
      bloomLevel: classification.level,
      difficulty: classification.suggestedDifficulty
    });
  };

  const handleOptionTextChange = (index: number, text: string) => {
    if (!formData.options) return;
    const newOpts = [...formData.options];
    newOpts[index] = { ...newOpts[index], text };
    setFormData({ ...formData, options: newOpts });
  };

  const handleAddOption = () => {
    if (!formData.options || formData.options.length >= 5) return;
    const arabicLabels = ['أ', 'ب', 'ج', 'د', 'هـ'];
    const ids = ['A', 'B', 'C', 'D', 'E'];
    const newIdx = formData.options.length;
    const newOpts = [
      ...formData.options,
      { id: ids[newIdx] || `opt_${newIdx}`, label: arabicLabels[newIdx] || `${newIdx + 1}`, text: `خيار جديد` }
    ];
    setFormData({ ...formData, options: newOpts });
  };

  const handleRemoveOption = (index: number) => {
    if (!formData.options || formData.options.length <= 2) return;
    const newOpts = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOpts });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto select-none" dir="rtl">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0d5c3a] to-slate-900 p-4 px-6 flex items-center justify-between border-b border-slate-700 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black">محرر الفقرة الاختبارية والمعايير التربوية</h3>
              <p className="text-[11px] text-emerald-200/80">تعديل النص، الخيارات، مفتاح الإجابة وتصنيف بلوم</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
          
          {/* Question Type & Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">نوع الفقرة:</label>
              <select
                value={formData.type}
                onChange={(e) => handleTypeChange(e.target.value as QuestionType)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs font-bold"
              >
                <option value="tf">صواب وخطأ (True/False - OMR)</option>
                <option value="mcq">اختيار من متعدد (MCQ - OMR)</option>
                <option value="matching">مزاوجة وتوصيل (Matching)</option>
                <option value="passage">نص قراءة واستيعاب (Reading Passage)</option>
                <option value="poetry">بيت شعري واستشهاد (Poetry)</option>
                <option value="essay">تعبير ومقالي (Essay Lines)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">الدرجة المخصصة للفقرة:</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="20"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs font-mono font-bold"
              />
            </div>
          </div>

          {/* Question Text with AI Clean button */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-300 font-bold">نص السؤال أو رأس الفقرة:</label>
              <button
                type="button"
                onClick={handleAICleanAndClassify}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold"
              >
                <Sparkles size={13} />
                <span>تدقيق لغوي وتصنيف بلوم الذكي</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-xs leading-relaxed focus:border-emerald-500 focus:outline-none"
              placeholder="اكتب نص السؤال هنا..."
            />
          </div>

          {/* Reading Passage or Poetry specific field */}
          {(formData.type === 'passage' || formData.type === 'poetry') && (
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                {formData.type === 'passage' ? 'نص القطعة القرائية:' : 'البيت الشعري (الصدر ... العجز):'}
              </label>
              <textarea
                rows={4}
                value={formData.passageText || ''}
                onChange={(e) => setFormData({ ...formData, passageText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-xs leading-relaxed font-amiri text-sm focus:border-emerald-500 focus:outline-none"
                placeholder="اكتب النص القرائي أو البيت الشعري هنا..."
              />
            </div>
          )}

          {/* Essay Lines Count */}
          {formData.type === 'essay' && (
            <div>
              <label className="block text-slate-300 font-bold mb-1">عدد أسطر الإجابة المسطرة:</label>
              <input
                type="number"
                min="1"
                max="8"
                value={formData.essayLinesCount || 3}
                onChange={(e) => setFormData({ ...formData, essayLinesCount: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs font-mono"
              />
            </div>
          )}

          {/* True / False Answer Selection */}
          {formData.type === 'tf' && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <label className="block text-slate-300 font-bold">الإجابة النموذجية الصحيحة (مفتاح التصحيح):</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, correctAnswer: 'T' })}
                  className={`p-3 rounded-xl border font-bold text-xs transition flex items-center justify-center gap-2 ${
                    formData.correctAnswer === 'T'
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/40'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">ص</span>
                  <span>صواب (True)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, correctAnswer: 'F' })}
                  className={`p-3 rounded-xl border font-bold text-xs transition flex items-center justify-center gap-2 ${
                    formData.correctAnswer === 'F'
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/40'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">خ</span>
                  <span>خطأ (False)</span>
                </button>
              </div>
            </div>
          )}

          {/* MCQ Options Editor */}
          {formData.type === 'mcq' && formData.options && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-bold">خيارات الإجابة ومفتاح الحل:</label>
                {formData.options.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold"
                  >
                    <Plus size={13} />
                    <span>إضافة خيار خامس (هـ)</span>
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {formData.options.map((opt, optIdx) => {
                  const isCorrect = formData.correctAnswer === opt.id;

                  return (
                    <div key={opt.id} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, correctAnswer: opt.id })}
                        className={`w-8 h-8 rounded-xl border font-bold text-xs flex items-center justify-center transition shrink-0 ${
                          isCorrect
                            ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                        title="انقر لتعيين هذا الخيار كإجابة صحيحة"
                      >
                        {opt.label}
                      </button>

                      <input
                        type="text"
                        value={opt.text}
                        onChange={(e) => handleOptionTextChange(optIdx, e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-2 text-white text-xs"
                      />

                      {formData.options && formData.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(optIdx)}
                          className="p-2 text-slate-500 hover:text-rose-400 transition"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bloom Taxonomy & Difficulty */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Award size={14} className="text-emerald-400" />
              <span>المعايير التربوية وهدف التعلم:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 text-[11px] mb-1">مستوى بلوم المعرفي:</label>
                <select
                  value={formData.bloomLevel || 'understand'}
                  onChange={(e) => setFormData({ ...formData, bloomLevel: e.target.value as BloomLevel })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white text-xs"
                >
                  <option value="remember">تذكر واسترجاع (Remembering)</option>
                  <option value="understand">فهم واستيعاب (Understanding)</option>
                  <option value="apply">تطبيق نحوي وصرفي (Applying)</option>
                  <option value="analyze">تحليل وبلاغة (Analyzing)</option>
                  <option value="evaluate">تقويم ونقد (Evaluating)</option>
                  <option value="create">تركيب وتعبير (Creating)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">مستوى الصعوبة المتوقع:</label>
                <select
                  value={formData.difficulty || 'medium'}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as QuestionDifficulty })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white text-xs"
                >
                  <option value="easy">سهل (مباشر)</option>
                  <option value="medium">متوسط (قياسي)</option>
                  <option value="hard">صعب (للمتفوقين)</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-950 p-4 px-6 border-t border-slate-800 flex items-center justify-between gap-2">
          {onDelete && (
            <button
              type="button"
              onClick={() => {
                onDelete(formData.id);
                onClose();
              }}
              className="px-3 py-2 text-rose-400 hover:text-rose-300 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Trash2 size={15} />
              <span>حذف الفقرة</span>
            </button>
          )}

          <div className="flex items-center gap-2 mr-auto">
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
