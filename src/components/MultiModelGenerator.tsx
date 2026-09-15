import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Printer, 
  Download, 
  Check, 
  RefreshCw, 
  Table, 
  CheckCircle2, 
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { 
  ExamHeader, 
  ExamQuestion, 
  ExamTheme, 
  ExamFormModel,
  MANDATORY_COPYRIGHT 
} from '../types/exam';

interface MultiModelGeneratorProps {
  header: ExamHeader;
  questions: ExamQuestion[];
  theme: ExamTheme;
  onSelectModelForPreview: (modelLetter: 'أ' | 'ب' | 'ج' | 'د', shuffledQuestions: ExamQuestion[]) => void;
}

export const MultiModelGenerator: React.FC<MultiModelGeneratorProps> = ({
  header,
  questions,
  theme,
  onSelectModelForPreview
}) => {
  const [activeModel, setActiveModel] = useState<'أ' | 'ب' | 'ج' | 'د'>('أ');
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate 4 deterministic models
  const models = React.useMemo<Record<'أ' | 'ب' | 'ج' | 'د', ExamFormModel>>(() => {
    const letters: ('أ' | 'ب' | 'ج' | 'د')[] = ['أ', 'ب', 'ج', 'د'];
    const result: any = {};

    letters.forEach((letter, letterIdx) => {
      if (letter === 'أ') {
        // Model A is the reference model
        const answerKey: Record<string, string> = {};
        questions.forEach((q, i) => {
          answerKey[String(i + 1)] = q.correctAnswer || (q.type === 'tf' ? 'T' : 'A');
        });
        result[letter] = {
          modelLetter: letter,
          questions: questions.map((q, idx) => ({ ...q, questionNumber: idx + 1 })),
          answerKey
        };
        return;
      }

      // For models B, C, D: smart shuffle keeping passage intact
      const passage = questions.find(q => q.type === 'passage');
      const poetry = questions.find(q => q.type === 'poetry');
      const tfList = questions.filter(q => q.type === 'tf');
      const mcqList = questions.filter(q => q.type === 'mcq');
      const matchingList = questions.filter(q => q.type === 'matching');
      const essayList = questions.filter(q => q.type === 'essay');

      // Deterministic shift based on model letter index
      const shiftArray = <T,>(arr: T[], shift: number): T[] => {
        if (arr.length <= 1) return [...arr];
        const n = shift % arr.length;
        return [...arr.slice(n), ...arr.slice(0, n)];
      };

      const shuffledTF = shiftArray(tfList, letterIdx);
      const shuffledMCQ = shiftArray(mcqList, letterIdx * 2).map((q, qIdx) => {
        // Also permute MCQ choices for anti-cheating protection
        if (!q.options || q.options.length < 2) return q;
        const opts = [...q.options];
        const shiftedOpts = shiftArray(opts, (letterIdx + qIdx) % opts.length);
        
        // Re-assign Arabic labels (أ، ب، ج، د) in sequence
        const arabicLabels = ['أ', 'ب', 'ج', 'د', 'هـ'];
        const relabeledOpts = shiftedOpts.map((opt, oIdx) => ({
          ...opt,
          label: arabicLabels[oIdx] || opt.label
        }));

        // Find which option ID was the correct one originally
        const origCorrectId = q.correctAnswer || 'A';
        return {
          ...q,
          options: relabeledOpts,
          correctAnswer: origCorrectId
        };
      });

      const fullShuffled: ExamQuestion[] = [];
      if (passage) fullShuffled.push({ ...passage });
      fullShuffled.push(...shuffledTF);
      if (poetry) fullShuffled.push({ ...poetry });
      fullShuffled.push(...shuffledMCQ);
      fullShuffled.push(...matchingList);
      fullShuffled.push(...essayList);

      const numbered = fullShuffled.map((q, idx) => ({
        ...q,
        questionNumber: idx + 1
      }));

      const answerKey: Record<string, string> = {};
      numbered.forEach((q, i) => {
        if (q.type === 'tf' || q.type === 'mcq' || q.type === 'matching') {
          answerKey[String(i + 1)] = q.correctAnswer || (q.type === 'tf' ? 'T' : 'A');
        }
      });

      result[letter] = {
        modelLetter: letter,
        questions: numbered,
        answerKey
      };
    });

    return result;
  }, [questions]);

  const handleSelectModel = (letter: 'أ' | 'ب' | 'ج' | 'د') => {
    setActiveModel(letter);
    onSelectModelForPreview(letter, models[letter].questions);
  };

  const handleExportMatrixCSV = () => {
    const omrCount = questions.filter(q => q.type === 'tf' || q.type === 'mcq' || q.type === 'matching').length;
    let csv = 'رقم الفقرة,النموذج ( أ ),النموذج ( ب ),النموذج ( ج ),النموذج ( د )\n';
    
    for (let i = 1; i <= omrCount; i++) {
      const qNum = String(i);
      const kA = models['أ'].answerKey[qNum] || '-';
      const kB = models['ب'].answerKey[qNum] || '-';
      const kC = models['ج'].answerKey[qNum] || '-';
      const kD = models['د'].answerKey[qNum] || '-';
      csv += `${i},"${kA}","${kB}","${kC}","${kD}"\n`;
    }

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `مصفوفة_مفاتيح_الإجابة_${header.subject}_نماذج_أ_ب_ج_د.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const omrQuestions = questions.filter(q => q.type === 'tf' || q.type === 'mcq' || q.type === 'matching');

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 select-none" dir="rtl">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#073823] via-[#0d5c3a] to-slate-900 border border-emerald-600/40 rounded-3xl p-6 text-white shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-black text-emerald-300">
            <Sparkles size={14} />
            <span>مولد النماذج المتعددة ومصفوفة الكنترول (A/B/C/D Engine)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            أتمتة النماذج المتعددة (أ، ب، ج، د) ومنع الغش
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl font-medium leading-relaxed">
            توليد 4 نماذج متكافئة الصعوبة تلقائياً مع خلط الفقرات والخيارات، وإنشاء مصفوفة الإجابة النموذجية الموحدة للمصحح الآلي ولجنة الكنترول.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportMatrixCSV}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-2 shadow-lg"
          >
            <FileSpreadsheet size={15} />
            <span>تصدير المصفوفة Excel</span>
          </button>
        </div>
      </div>

      {/* Models Switcher Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(['أ', 'ب', 'ج', 'د'] as const).map((letter) => {
          const isSelected = activeModel === letter;
          const modelData = models[letter];

          return (
            <button
              key={letter}
              onClick={() => handleSelectModel(letter)}
              className={`p-4 rounded-3xl border text-right transition-all flex flex-col justify-between h-28 relative overflow-hidden ${
                isSelected 
                  ? 'bg-gradient-to-br from-emerald-950 to-slate-900 border-emerald-500 shadow-xl shadow-emerald-950/50 ring-2 ring-emerald-500/40' 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-xl font-black ${isSelected ? 'text-emerald-400' : 'text-slate-200'}`}>
                  النموذج ({letter})
                </span>
                {isSelected && <CheckCircle2 size={18} className="text-emerald-400" />}
              </div>

              <div className="text-[11px] space-y-0.5">
                <div className="text-slate-300 font-bold">{modelData.questions.length} فقرة مخلطة</div>
                <div className="text-emerald-400 font-mono text-[10px]">جاهز للطباعة والتصحيح</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Master Answer Key Matrix (مصفوفة الإجابة الموحدة) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Table size={18} className="text-emerald-400" />
            <h3 className="text-sm font-black text-white">مصفوفة مفاتيح الإجابة النموذجية الموحدة (Master Answer Key Matrix)</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">عدد الفقرات المؤتمتة: {omrQuestions.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse text-xs">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 font-bold">
                <th className="p-2.5 rounded-r-xl w-16">رقم الفقرة</th>
                <th className="p-2.5 text-emerald-400 font-black">النموذج ( أ )</th>
                <th className="p-2.5 text-emerald-400 font-black">النموذج ( ب )</th>
                <th className="p-2.5 text-emerald-400 font-black">النموذج ( ج )</th>
                <th className="p-2.5 text-emerald-400 font-black rounded-l-xl">النموذج ( د )</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono font-bold">
              {omrQuestions.map((_, idx) => {
                const qNum = String(idx + 1);
                const kA = models['أ'].answerKey[qNum] || '—';
                const kB = models['ب'].answerKey[qNum] || '—';
                const kC = models['ج'].answerKey[qNum] || '—';
                const kD = models['د'].answerKey[qNum] || '—';

                // Format labels nicely
                const formatKey = (k: string) => {
                  if (k === 'T') return 'صواب (ص)';
                  if (k === 'F') return 'خطأ (خ)';
                  if (k === 'A') return 'أ';
                  if (k === 'B') return 'ب';
                  if (k === 'C') return 'ج';
                  if (k === 'D') return 'د';
                  return k;
                };

                return (
                  <tr key={idx} className="hover:bg-slate-800/40 transition">
                    <td className="p-2.5 font-bold text-slate-400">{qNum}</td>
                    <td className="p-2.5 text-white bg-emerald-950/20">{formatKey(kA)}</td>
                    <td className="p-2.5 text-white bg-emerald-950/10">{formatKey(kB)}</td>
                    <td className="p-2.5 text-white bg-emerald-950/20">{formatKey(kC)}</td>
                    <td className="p-2.5 text-white bg-emerald-950/10">{formatKey(kD)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mandatory Copyright Footer */}
      <div className="text-center text-xs text-slate-500 font-bold pt-4 border-t border-slate-800 select-none">
        {MANDATORY_COPYRIGHT}
      </div>

    </div>
  );
};
