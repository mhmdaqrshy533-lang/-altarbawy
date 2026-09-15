import React, { useState } from 'react';
import { 
  Shuffle, 
  Layers, 
  Download, 
  Printer, 
  CheckCircle2, 
  FileText, 
  Eye, 
  Sparkles,
  KeyRound,
  FileSpreadsheet
} from 'lucide-react';
import { 
  ExamQuestion, 
  ExamHeader, 
  ExamTheme, 
  MANDATORY_COPYRIGHT 
} from '../types/exam';

interface MultiModelGeneratorProps {
  baseQuestions: ExamQuestion[];
  header: ExamHeader;
  theme: ExamTheme;
  onSelectModelForPreview: (modelLetter: 'أ' | 'ب' | 'ج' | 'د', questions: ExamQuestion[]) => void;
}

export const MultiModelGenerator: React.FC<MultiModelGeneratorProps> = ({
  baseQuestions,
  header,
  theme,
  onSelectModelForPreview
}) => {
  const [shuffleOptions, setShuffleOptions] = useState(true);
  const [shuffleQuestionsOrder, setShuffleQuestionsOrder] = useState(true);
  const [activeTab, setActiveTab] = useState<'matrix' | 'overview'>('matrix');

  // Generate 4 Models (A, B, C, D)
  const modelsData = React.useMemo(() => {
    const letters: ('أ' | 'ب' | 'ج' | 'د')[] = ['أ', 'ب', 'ج', 'د'];
    
    return letters.map((letter, letterIdx) => {
      // For Model A (أ), preserve original order
      if (letterIdx === 0) {
        return {
          letter,
          questions: baseQuestions,
          answerKey: baseQuestions.filter(q => q.type === 'tf' || q.type === 'mcq').map(q => ({
            num: q.questionNumber || 0,
            text: q.text,
            type: q.type,
            correctAnswer: q.correctAnswer || (q.type === 'tf' ? 'T' : 'A'),
            correctLabel: q.type === 'tf' 
              ? (q.correctAnswer === 'F' ? 'خ' : 'ص')
              : (q.options?.find(o => o.id === q.correctAnswer)?.label || 'أ')
          }))
        };
      }

      // Permutation logic for B, C, D
      // Separate passages, TF, poetry, MCQ, essay to keep structural integrity
      const passage = baseQuestions.find(q => q.type === 'passage');
      const poetry = baseQuestions.find(q => q.type === 'poetry');
      const essay = baseQuestions.filter(q => q.type === 'essay');

      let tfList = baseQuestions.filter(q => q.type === 'tf').map(q => ({ ...q }));
      let mcqList = baseQuestions.filter(q => q.type === 'mcq').map(q => ({ 
        ...q,
        options: q.options ? [...q.options] : undefined
      }));

      // Deterministic pseudo-random shuffle based on model letter index
      if (shuffleQuestionsOrder) {
        tfList = tfList.sort((a, b) => {
          const hashA = (a.text.length * (letterIdx + 1) + 7) % 13;
          const hashB = (b.text.length * (letterIdx + 1) + 7) % 13;
          return hashA - hashB;
        });

        mcqList = mcqList.sort((a, b) => {
          const hashA = (a.text.length * (letterIdx + 2) + 11) % 17;
          const hashB = (b.text.length * (letterIdx + 2) + 11) % 17;
          return hashA - hashB;
        });
      }

      // If shuffle options enabled for MCQs
      if (shuffleOptions) {
        mcqList = mcqList.map((q) => {
          if (!q.options || q.options.length < 2) return q;
          
          // Rotate options by letterIdx
          const rotatedOptions = [...q.options];
          const shift = (letterIdx) % rotatedOptions.length;
          const shifted = rotatedOptions.slice(shift).concat(rotatedOptions.slice(0, shift));
          
          // Re-assign Arabic labels: أ، ب، ج، د
          const standardLabels = ['أ', 'ب', 'ج', 'د', 'هـ', 'و'];
          const labeledOptions = shifted.map((opt, i) => ({
            ...opt,
            label: standardLabels[i] || `${i + 1}`
          }));

          return {
            ...q,
            options: labeledOptions
          };
        });
      }

      // Re-index question numbers sequentially
      let currentNum = 1;
      tfList.forEach(q => { q.questionNumber = currentNum++; });
      mcqList.forEach(q => { q.questionNumber = currentNum++; });
      essay.forEach(q => { q.questionNumber = currentNum++; });

      const combined: ExamQuestion[] = [];
      if (passage) combined.push(passage);
      combined.push(...tfList);
      if (poetry) combined.push(poetry);
      combined.push(...mcqList);
      combined.push(...essay);

      const answerKey = combined.filter(q => q.type === 'tf' || q.type === 'mcq').map(q => ({
        num: q.questionNumber || 0,
        text: q.text,
        type: q.type,
        correctAnswer: q.correctAnswer || (q.type === 'tf' ? 'T' : 'A'),
        correctLabel: q.type === 'tf' 
          ? (q.correctAnswer === 'F' ? 'خ' : 'ص')
          : (q.options?.find(o => o.id === q.correctAnswer)?.label || 'أ')
      }));

      return {
        letter,
        questions: combined,
        answerKey
      };
    });
  }, [baseQuestions, shuffleOptions, shuffleQuestionsOrder]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 select-none" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0d5c3a] via-[#073823] to-slate-900 border border-emerald-600/40 rounded-3xl p-6 text-white shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-black text-emerald-300">
            <Shuffle size={14} />
            <span>محرك أتمتة النماذج المتعددة (A, B, C, D Multi-Form Engine)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            توليد النماذج الأربعة (أ ، ب ، ج ، د) ومصفوفة مفاتيح الإجابة
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl font-medium leading-relaxed">
            خلط ذكي للفقرات والخيارات مع الحفاظ على التناسق الهيكلي للقطعة والشعر ومزامنة تلقائية لمفاتيح التصحيح.
          </p>
        </div>

        {/* Options Toggles */}
        <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-700 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-200 font-bold">
            <input 
              type="checkbox" 
              checked={shuffleOptions} 
              onChange={(e) => setShuffleOptions(e.target.checked)}
              className="accent-emerald-500 rounded"
            />
            <span>تبديل ترتيب الخيارات (أ/ب/ج/د)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-200 font-bold">
            <input 
              type="checkbox" 
              checked={shuffleQuestionsOrder} 
              onChange={(e) => setShuffleQuestionsOrder(e.target.checked)}
              className="accent-emerald-500 rounded"
            />
            <span>خلط ترتيب الفقرات</span>
          </label>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modelsData.map((m) => (
          <div 
            key={m.letter}
            className="bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-3xl p-5 shadow-xl transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-[#0d5c3a] text-white flex items-center justify-center font-black text-lg shadow-md">
                  {m.letter}
                </div>
                <span className="text-[11px] bg-slate-800 text-slate-300 font-bold px-2.5 py-1 rounded-full border border-slate-700">
                  {m.questions.length} عنصر
                </span>
              </div>
              <h3 className="text-sm font-black text-white">النموذج ({m.letter}) — ورقة كاملة</h3>
              <p className="text-xs text-slate-400 mt-1">
                جاهز للطباعة والتوزيع مع مفتاح إجابة مستقل.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => onSelectModelForPreview(m.letter, m.questions)}
                className="flex-1 py-2 bg-slate-800 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Eye size={14} />
                <span>معاينة النموذج</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Answer Key Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <KeyRound size={20} className="text-emerald-400" />
            <h3 className="text-base font-black text-white">مصفوفة مفاتيح الإجابة النموذجية (Master Answer Matrix)</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <Printer size={14} />
              <span>طباعة كشف الإجابات للكنترول</span>
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse text-xs">
            <thead>
              <tr className="bg-slate-800/90 text-slate-300 font-bold">
                <th className="p-2.5 rounded-r-xl border-b border-slate-700 w-16">رقم الفقرة</th>
                <th className="p-2.5 border-b border-slate-700 text-right">نص السؤال</th>
                <th className="p-2.5 border-b border-slate-700 w-24 text-emerald-400 font-black">نموذج ( أ )</th>
                <th className="p-2.5 border-b border-slate-700 w-24 text-sky-400 font-black">نموذج ( ب )</th>
                <th className="p-2.5 border-b border-slate-700 w-24 text-amber-400 font-black">نموذج ( ج )</th>
                <th className="p-2.5 rounded-l-xl border-b border-slate-700 w-24 text-purple-400 font-black">نموذج ( د )</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {modelsData[0].answerKey.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="p-2.5 font-bold text-slate-400 font-mono">{idx + 1}</td>
                  <td className="p-2.5 text-right text-slate-200 truncate max-w-xs">{item.text}</td>
                  <td className="p-2.5 font-black text-emerald-400 bg-emerald-950/20">
                    <span className="inline-block w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 leading-6">
                      {modelsData[0].answerKey[idx]?.correctLabel || '-'}
                    </span>
                  </td>
                  <td className="p-2.5 font-black text-sky-400 bg-sky-950/20">
                    <span className="inline-block w-6 h-6 rounded-full bg-sky-500/20 border border-sky-500/40 leading-6">
                      {modelsData[1].answerKey[idx]?.correctLabel || '-'}
                    </span>
                  </td>
                  <td className="p-2.5 font-black text-amber-400 bg-amber-950/20">
                    <span className="inline-block w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 leading-6">
                      {modelsData[2].answerKey[idx]?.correctLabel || '-'}
                    </span>
                  </td>
                  <td className="p-2.5 font-black text-purple-400 bg-purple-950/20">
                    <span className="inline-block w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 leading-6">
                      {modelsData[3].answerKey[idx]?.correctLabel || '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mandatory Copyright Footer */}
      <div className="text-center text-xs text-slate-500 font-bold pt-4 border-t border-slate-800/80 select-none">
        {MANDATORY_COPYRIGHT}
      </div>

    </div>
  );
};
