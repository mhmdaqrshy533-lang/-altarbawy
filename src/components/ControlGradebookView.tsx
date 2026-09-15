import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Printer, 
  Download, 
  Award, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles,
  BarChart3,
  Filter
} from 'lucide-react';
import { 
  ExamQuestion, 
  OMRGradingReport, 
  ControlClassAnalytics, 
  MANDATORY_COPYRIGHT 
} from '../types/exam';

interface ControlGradebookViewProps {
  batchReports: OMRGradingReport[];
  questions: ExamQuestion[];
  subjectName: string;
  gradeName: string;
  onClearBatch?: () => void;
}

export const ControlGradebookView: React.FC<ControlGradebookViewProps> = ({
  batchReports,
  questions,
  subjectName,
  gradeName,
  onClearBatch
}) => {
  const [filterModel, setFilterModel] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter reports
  const filteredReports = useMemo(() => {
    return batchReports.filter(r => {
      const matchesModel = filterModel === 'all' || r.modelLetter === filterModel;
      const matchesSearch = !searchTerm || 
        r.studentName.includes(searchTerm) || 
        r.seatNumber.includes(searchTerm);
      return matchesModel && matchesSearch;
    });
  }, [batchReports, filterModel, searchTerm]);

  // Compute analytics
  const analytics: ControlClassAnalytics = useMemo(() => {
    const total = filteredReports.length;
    if (total === 0) {
      return {
        totalStudents: 0,
        averageScore: 0,
        passCount: 0,
        failCount: 0,
        passPercentage: 0,
        highestScore: 0,
        lowestScore: 0,
        gradeDistribution: { excellent: 0, veryGood: 0, good: 0, pass: 0, fail: 0 },
        itemStats: []
      };
    }

    const scores = filteredReports.map(r => r.totalScore);
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = Number((sum / total).toFixed(1));
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);

    let passCount = 0;
    let failCount = 0;
    const distribution = { excellent: 0, veryGood: 0, good: 0, pass: 0, fail: 0 };

    filteredReports.forEach(r => {
      if (r.percentage >= 50) passCount++;
      else failCount++;

      if (r.percentage >= 90) distribution.excellent++;
      else if (r.percentage >= 80) distribution.veryGood++;
      else if (r.percentage >= 65) distribution.good++;
      else if (r.percentage >= 50) distribution.pass++;
      else distribution.fail++;
    });

    const omrQuestions = questions.filter(q => q.type === 'tf' || q.type === 'mcq' || q.type === 'matching');
    const itemStats = omrQuestions.map((q, idx) => {
      let correct = 0;
      let wrong = 0;
      let blank = 0;

      filteredReports.forEach(r => {
        const sq = r.scannedQuestions.find(s => s.questionNumber === (idx + 1) || s.questionId === q.id);
        if (sq) {
          if (sq.isCorrect) correct++;
          else if (sq.isUnanswered) blank++;
          else wrong++;
        }
      });

      const difficultyIndex = Number((correct / total).toFixed(2));
      const discriminationIndex = Number(((correct - wrong) / total).toFixed(2));

      return {
        questionNumber: q.questionNumber || (idx + 1),
        questionText: q.text,
        type: q.type,
        difficultyIndex,
        discriminationIndex,
        correctCount: correct,
        wrongCount: wrong,
        blankCount: blank
      };
    });

    return {
      totalStudents: total,
      averageScore: avg,
      passCount,
      failCount,
      passPercentage: Math.round((passCount / total) * 100),
      highestScore: highest,
      lowestScore: lowest,
      gradeDistribution: distribution,
      itemStats
    };
  }, [filteredReports, questions]);

  // Export CSV / Excel
  const handleExportCSV = () => {
    if (filteredReports.length === 0) return;

    let csv = 'م,اسم الطالب,رقم الجلوس,النموذج,الدرجة المستحقة,الدرجة العظمى,النسبة المئوية,التقدير,توقيع الكنترول\n';
    filteredReports.forEach((r, i) => {
      const rating = r.percentage >= 90 ? 'ممتاز' : r.percentage >= 80 ? 'جيد جداً' : r.percentage >= 65 ? 'جيد' : r.percentage >= 50 ? 'مقبول' : 'راسب';
      csv += `${i + 1},"${r.studentName}","${r.seatNumber}","${r.modelLetter}",${r.totalScore},${r.maxScore},"${r.percentage}%","${rating}",""\n`;
    });

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `كشف_رصد_درجات_الكنترول_${subjectName}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 select-none" dir="rtl">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#073823] via-[#0d5c3a] to-slate-900 border border-emerald-600/40 rounded-3xl p-6 text-white shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-black text-emerald-300">
            <Award size={14} />
            <span>كشف الكنترول والتحليل الإحصائي المتقدم (Control Gradebook)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            سجل رصد الدرجات وإحصائيات التقييم التربوي — {subjectName} ({gradeName})
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl font-medium leading-relaxed">
            رصد تلقائي فوري لأوراق الطلاب المصححة آلياً، حساب معدل النجاح، منحنى التوزيع التكراري، ومعاملات الصعوبة والتمييز للفقرات.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {filteredReports.length > 0 && (
            <>
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-2 shadow-lg"
              >
                <FileSpreadsheet size={15} />
                <span>تصدير Excel / CSV</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 border border-white/20"
              >
                <Printer size={15} />
                <span>طباعة الكشف</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 text-center">
          <div className="text-[11px] text-slate-400 font-bold mb-1">إجمالي الطلاب المرصودين</div>
          <div className="text-2xl font-black text-white font-mono">{analytics.totalStudents}</div>
          <div className="text-[10px] text-emerald-400 mt-1">طالب مسجل بالكشف</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 text-center">
          <div className="text-[11px] text-slate-400 font-bold mb-1">نسبة النجاح العامة</div>
          <div className="text-2xl font-black text-emerald-400 font-mono">{analytics.passPercentage}%</div>
          <div className="text-[10px] text-slate-400 mt-1">ناجح: {analytics.passCount} | راسب: {analytics.failCount}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 text-center">
          <div className="text-[11px] text-slate-400 font-bold mb-1">متوسط درجات الصف</div>
          <div className="text-2xl font-black text-sky-400 font-mono">{analytics.averageScore}</div>
          <div className="text-[10px] text-slate-400 mt-1">الدرجة العظمى: {analytics.highestScore}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 text-center">
          <div className="text-[11px] text-slate-400 font-bold mb-1">الدرجة الصغرى المسجلة</div>
          <div className="text-2xl font-black text-amber-400 font-mono">{analytics.lowestScore}</div>
          <div className="text-[10px] text-slate-400 mt-1">أدنى تحصيل مرصود</div>
        </div>
      </div>

      {/* Grade Distribution Bar */}
      {analytics.totalStudents > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-200">
            <span className="flex items-center gap-1.5">
              <BarChart3 size={15} className="text-emerald-400" />
              <span>منحنى التوزيع التكراري للتقديرات (Grade Distribution):</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
            <div className="bg-emerald-950/40 border border-emerald-800/50 p-2.5 rounded-2xl">
              <div className="font-bold text-emerald-400 font-mono text-lg">{analytics.gradeDistribution.excellent}</div>
              <div className="text-[11px] text-emerald-200 font-bold">ممتاز (90%+)</div>
            </div>
            <div className="bg-sky-950/40 border border-sky-800/50 p-2.5 rounded-2xl">
              <div className="font-bold text-sky-400 font-mono text-lg">{analytics.gradeDistribution.veryGood}</div>
              <div className="text-[11px] text-sky-200 font-bold">جيد جداً (80-89%)</div>
            </div>
            <div className="bg-blue-950/40 border border-blue-800/50 p-2.5 rounded-2xl">
              <div className="font-bold text-blue-400 font-mono text-lg">{analytics.gradeDistribution.good}</div>
              <div className="text-[11px] text-blue-200 font-bold">جيد (65-79%)</div>
            </div>
            <div className="bg-amber-950/40 border border-amber-800/50 p-2.5 rounded-2xl">
              <div className="font-bold text-amber-400 font-mono text-lg">{analytics.gradeDistribution.pass}</div>
              <div className="text-[11px] text-amber-200 font-bold">مقبول (50-64%)</div>
            </div>
            <div className="bg-rose-950/40 border border-rose-800/50 p-2.5 rounded-2xl">
              <div className="font-bold text-rose-400 font-mono text-lg">{analytics.gradeDistribution.fail}</div>
              <div className="text-[11px] text-rose-200 font-bold">راسب (أقل من 50%)</div>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <input 
            type="text"
            placeholder="بحث باسم الطالب أو رقم الجلوس..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">تصفية حسب النموذج:</span>
          <div className="flex bg-slate-800 p-0.5 rounded-xl border border-slate-700">
            {['all', 'أ', 'ب', 'ج', 'د'].map(m => (
              <button
                key={m}
                onClick={() => setFilterModel(m)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  filterModel === m ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                {m === 'all' ? 'الكل' : `نموذج (${m})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gradebook Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-emerald-400" />
            <h3 className="text-sm font-black text-white">كشف رصد درجات الطلاب (Official Control Sheet)</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">{filteredReports.length} طالب</span>
        </div>

        {filteredReports.length === 0 ? (
          <div className="text-center py-16 text-slate-500 space-y-3">
            <HelpCircle size={32} className="mx-auto text-slate-600" />
            <div className="text-xs font-bold text-slate-400">لا توجد نتائج مسجلة حتى الآن</div>
            <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
              قم بتصحيح أوراق الطلاب عبر تبويب "مصحح OMR الفائق" ليتم إدراج درجاتهم آلياً في هذا الكشف.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="bg-slate-800/90 text-slate-300 font-bold">
                  <th className="p-2.5 rounded-r-xl w-12">م</th>
                  <th className="p-2.5 text-right">اسم الطالب الرباعي</th>
                  <th className="p-2.5 w-24">رقم الجلوس</th>
                  <th className="p-2.5 w-20">النموذج</th>
                  <th className="p-2.5 w-24">الدرجة</th>
                  <th className="p-2.5 w-24">النسبة</th>
                  <th className="p-2.5 w-24">التقدير</th>
                  <th className="p-2.5 rounded-l-xl w-28">وقت الرصد</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                {filteredReports.map((r, idx) => {
                  const isPass = r.percentage >= 50;
                  const rating = r.percentage >= 90 ? 'ممتاز' : r.percentage >= 80 ? 'جيد جداً' : r.percentage >= 65 ? 'جيد' : r.percentage >= 50 ? 'مقبول' : 'راسب';

                  return (
                    <tr key={idx} className="hover:bg-slate-800/40 transition">
                      <td className="p-2.5 font-bold text-slate-400 font-mono">{idx + 1}</td>
                      <td className="p-2.5 text-right font-bold text-white">{r.studentName}</td>
                      <td className="p-2.5 font-mono text-emerald-400 font-bold">{r.seatNumber}</td>
                      <td className="p-2.5 font-bold text-slate-300">({r.modelLetter})</td>
                      <td className="p-2.5 font-mono font-black text-white">
                        {r.totalScore} <span className="text-[10px] text-slate-400 font-normal">/ {r.maxScore}</span>
                      </td>
                      <td className={`p-2.5 font-mono font-bold ${isPass ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {r.percentage}%
                      </td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          r.percentage >= 80 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                            : isPass 
                              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' 
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}>
                          {rating}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-400 font-mono text-[11px]">{r.timestamp}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Question Item Analysis Table */}
      {analytics.itemStats.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-400" />
              <h3 className="text-sm font-black text-white">تحليل صعوبة وتمييز الفقرات (Item Difficulty & Discrimination Index)</h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="bg-slate-800/90 text-slate-300 font-bold">
                  <th className="p-2.5 rounded-r-xl w-14">رقم الفقرة</th>
                  <th className="p-2.5 text-right">نص السؤال</th>
                  <th className="p-2.5 w-24">معامل السهولة</th>
                  <th className="p-2.5 w-24">معامل التمييز</th>
                  <th className="p-2.5 w-24 text-emerald-400">صحيحة</th>
                  <th className="p-2.5 rounded-l-xl w-24 text-rose-400">خاطئة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                {analytics.itemStats.map((st) => (
                  <tr key={st.questionNumber} className="hover:bg-slate-800/40 transition">
                    <td className="p-2.5 font-mono font-bold text-slate-400">{st.questionNumber}</td>
                    <td className="p-2.5 text-right text-slate-200 truncate max-w-sm">{st.questionText}</td>
                    <td className="p-2.5 font-mono font-bold text-sky-400">
                      {(st.difficultyIndex * 100).toFixed(0)}%
                    </td>
                    <td className="p-2.5 font-mono font-bold text-amber-400">
                      {st.discriminationIndex}
                    </td>
                    <td className="p-2.5 font-mono font-bold text-emerald-400">{st.correctCount}</td>
                    <td className="p-2.5 font-mono font-bold text-rose-400">{st.wrongCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mandatory Copyright Footer */}
      <div className="text-center text-xs text-slate-500 font-bold pt-4 border-t border-slate-800/80 select-none">
        {MANDATORY_COPYRIGHT}
      </div>

    </div>
  );
};
