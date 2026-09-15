import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Download, 
  Printer, 
  RefreshCw, 
  Eye, 
  FileSpreadsheet, 
  Award, 
  Sliders, 
  HelpCircle,
  QrCode
} from 'lucide-react';
import { 
  ExamQuestion, 
  OMRGradingReport, 
  MANDATORY_COPYRIGHT 
} from '../types/exam';
import { OMRVisionEngine } from '../utils/omrVisionEngine';

interface OMRGraderViewProps {
  questions: ExamQuestion[];
  activeModel: string;
}

export const OMRGraderView: React.FC<OMRGraderViewProps> = ({
  questions,
  activeModel
}) => {
  const [report, setReport] = useState<OMRGradingReport | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [selectedStudentName, setSelectedStudentName] = useState<string>('أحمد محمد قائد الحكيمي');
  const [selectedSeatNumber, setSelectedSeatNumber] = useState<string>('2048');
  const [modelLetter, setModelLetter] = useState<string>(activeModel || 'أ');
  const [batchResults, setBatchResults] = useState<OMRGradingReport[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [sensitivity, setSensitivity] = useState<number>(32);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      setPreviewImage(dataUrl);
      await runGradingOnImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // 2. Generate Simulated Student Sheet for Instant Live Testing
  const handleSimulateStudent = async (accuracy: 'high' | 'medium' | 'random' = 'high') => {
    setIsProcessing(true);
    const names = [
      'أحمد محمد قائد الحكيمي',
      'فاطمة عبد الرقيب الصلوي',
      'ياسر عادل عبد الإله',
      'سارة جميل الشميري',
      'عمر فاروق الشرجبي'
    ];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomSeat = (1000 + Math.floor(Math.random() * 8999)).toString();
    setSelectedStudentName(randomName);
    setSelectedSeatNumber(randomSeat);

    try {
      const generatedImageUrl = await OMRVisionEngine.generateSimulatedStudentSheet(
        questions,
        randomName,
        randomSeat,
        modelLetter,
        accuracy
      );
      setPreviewImage(generatedImageUrl);
      await runGradingOnImage(generatedImageUrl, randomName, randomSeat);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  // 3. Run Computer Vision on Image
  const runGradingOnImage = async (
    imageUrl: string, 
    studentName = selectedStudentName, 
    seatNumber = selectedSeatNumber
  ) => {
    setIsProcessing(true);
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageUrl;
      await new Promise((res) => { img.onload = res; });

      const gradingReport = await OMRVisionEngine.processAndGrade(
        img,
        questions,
        modelLetter,
        studentName,
        seatNumber,
        { fillCutoff: sensitivity }
      );

      setReport(gradingReport);
      setBatchResults(prev => [gradingReport, ...prev.slice(0, 19)]);
    } catch (err) {
      console.error('OMR Vision error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Export Batch to CSV
  const handleExportCSV = () => {
    if (batchResults.length === 0 && !report) return;
    const list = batchResults.length > 0 ? batchResults : report ? [report] : [];

    let csvContent = 'اسم الطالب,رقم الجلوس,النموذج,الدرجة الكلية,الدرجة العظمى,النسبة المئوية,الإجابات الصحيحة,الإجابات الخاطئة,غير المظلل,وقت التصحيح\n';
    list.forEach(r => {
      csvContent += `"${r.studentName}","${r.seatNumber}","${r.modelLetter}",${r.totalScore},${r.maxScore},"${r.percentage}%",${r.correctCount},${r.incorrectCount},${r.unansweredCount},"${r.timestamp}"\n`;
    });

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `نتائج_التصحيح_الآلي_OMR_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 select-none" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#073823] via-[#0d5c3a] to-[#004B6E] border border-emerald-600/40 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-black text-emerald-300">
              <Sparkles size={14} />
              <span>مصحح OMR الفائق — معمارية الذكاء الاصطناعي السيادي</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              مصحح الرقيم البصري الفوري (Client-Side Computer Vision)
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl font-medium leading-relaxed">
              تصحيح فائق السرعة عبر متصفح الويب مباشرة دون خوادم خارجية — خوارزمية Otsu للتظليل وتطابق علامات الزوايا الأربع وحساب دقيق لكثافة البكسل.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSimulateStudent('high')}
              disabled={isProcessing}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-2xl transition-all shadow-lg flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <Sparkles size={16} />
              <span>توليد ورقة طالب وتصحيحها فوراً</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-2xl transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <Upload size={16} />
              <span>رفع صورة ماسح ضوئي</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Control Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        
        {/* Model & Sensitivity Settings */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300">النموذج النشط:</span>
            <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
              {['أ', 'ب', 'ج', 'د'].map(m => (
                <button
                  key={m}
                  onClick={() => setModelLetter(m)}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                    modelLetter === m ? 'bg-[#0d5c3a] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  نموذج ({m})
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs">
            <Sliders size={14} className="text-emerald-400" />
            <span className="text-slate-300 font-bold">حساسية التظليل:</span>
            <input 
              type="range" 
              min="15" 
              max="65" 
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className="w-24 accent-emerald-500 cursor-pointer"
            />
            <span className="text-emerald-400 font-mono font-bold">{sensitivity}%</span>
          </div>
        </div>

        {/* Simulation Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSimulateStudent('high')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl transition"
          >
            طالب متفوق (100%)
          </button>
          <button
            onClick={() => handleSimulateStudent('medium')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl transition"
          >
            طالب متوسط (أخطاء عشوائية)
          </button>
          {batchResults.length > 0 && (
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
            >
              <FileSpreadsheet size={14} />
              <span>تصدير Excel ({batchResults.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Visual Scanned Canvas with Overlays (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col items-center justify-center min-h-[500px] shadow-xl relative overflow-hidden">
          
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-emerald-400" />
              <span className="text-xs font-bold text-slate-200">المعاينة البصرية ومطابقة الدوائر</span>
            </div>
            {report && (
              <span className="text-[11px] text-emerald-400 font-mono font-bold bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-lg">
                تم الرصد بنجاح ({report.timestamp})
              </span>
            )}
          </div>

          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold text-emerald-400 animate-pulse">
                جارٍ تحليل مصفوفة البكسلات ومعايرة علامات الزوايا الأربع...
              </p>
            </div>
          ) : report?.processedCanvasUrl || previewImage ? (
            <div className="relative w-full max-h-[620px] overflow-auto rounded-2xl border border-slate-700/80 bg-slate-950 flex items-center justify-center p-2">
              <img 
                src={report?.processedCanvasUrl || previewImage || ''} 
                alt="ورقة إجابة الطالب" 
                className="max-w-full h-auto object-contain rounded-lg shadow-md"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center px-4">
              <div className="w-16 h-16 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 mb-4 shadow-inner">
                <QrCode size={32} />
              </div>
              <h3 className="text-sm font-bold text-slate-200 mb-1">لا توجد ورقة مصححة حالياً</h3>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                انقر على "توليد ورقة طالب وتصحيحها فوراً" لتجربة المصحح فائق السرعة أو ارفع صورة ممسوحة ضوئياً.
              </p>
              <button
                onClick={() => handleSimulateStudent('high')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-2"
              >
                <Sparkles size={14} />
                <span>بدء تجربة التصحيح الآن</span>
              </button>
            </div>
          )}

          {/* Overlay Legend */}
          {report && (
            <div className="w-full mt-3 pt-3 border-t border-slate-800 flex items-center justify-around text-[11px] font-bold text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>إجابة صحيحة ({report.correctCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span>إجابة خاطئة ({report.incorrectCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full border border-dashed border-emerald-400" />
                <span>الإجابة النموذجية الصحيحة</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Scorecard & Question Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {report ? (
            <>
              {/* Scorecard Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-sm font-black text-white">{report.studentName}</h3>
                    <p className="text-xs text-slate-400">
                      رقم الجلوس: <span className="font-mono font-bold text-emerald-400">({report.seatNumber})</span> | النموذج ({report.modelLetter})
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black">
                    <Award size={22} />
                  </div>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 text-center">
                    <div className="text-[10px] text-slate-400 font-bold mb-0.5">الدرجة المحتسبة</div>
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      {report.totalScore} <span className="text-xs text-slate-400">/ {report.maxScore}</span>
                    </div>
                  </div>

                  <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 text-center">
                    <div className="text-[10px] text-slate-400 font-bold mb-0.5">النسبة المئوية</div>
                    <div className={`text-2xl font-black font-mono ${
                      report.percentage >= 90 ? 'text-emerald-400' : report.percentage >= 60 ? 'text-sky-400' : 'text-amber-400'
                    }`}>
                      {report.percentage}%
                    </div>
                  </div>
                </div>

                {/* Detailed counts */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-emerald-950/40 border border-emerald-800/50 p-2 rounded-xl">
                    <div className="font-bold text-emerald-400 font-mono text-base">{report.correctCount}</div>
                    <div className="text-[10px] text-emerald-200">صحيحة</div>
                  </div>
                  <div className="bg-rose-950/40 border border-rose-800/50 p-2 rounded-xl">
                    <div className="font-bold text-rose-400 font-mono text-base">{report.incorrectCount}</div>
                    <div className="text-[10px] text-rose-200">خاطئة</div>
                  </div>
                  <div className="bg-slate-800/60 border border-slate-700 p-2 rounded-xl">
                    <div className="font-bold text-slate-300 font-mono text-base">{report.unansweredCount}</div>
                    <div className="text-[10px] text-slate-400">متروكة</div>
                  </div>
                </div>
              </div>

              {/* Item-by-Item Breakdown */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl max-h-[380px] overflow-y-auto space-y-2">
                <div className="text-xs font-bold text-slate-200 mb-2 flex items-center justify-between sticky top-0 bg-slate-900 py-1">
                  <span>تحليل إجابات الفقرات (Item Analysis)</span>
                  <span className="text-[10px] text-slate-400 font-mono">{report.scannedQuestions.length} فقرة</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {report.scannedQuestions.map((q) => (
                    <div 
                      key={q.questionId}
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition ${
                        q.isCorrect 
                          ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-200' 
                          : 'bg-rose-950/20 border-rose-800/40 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {q.isCorrect ? (
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle size={16} className="text-rose-400 shrink-0" />
                        )}
                        <div>
                          <span className="font-bold text-white">س{q.questionNumber}:</span>
                          <span className="mr-1.5 text-[11px] text-slate-300">
                            إجابة الطالب: <b>({q.selectedOptionLabel || 'فارغ'})</b>
                          </span>
                        </div>
                      </div>

                      <div className="text-left flex items-center gap-2">
                        {!q.isCorrect && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                            الصحيح: ({q.correctOptionLabel})
                          </span>
                        )}
                        <span className="font-mono font-bold text-xs text-slate-400">
                          {q.pointsEarned}/{q.pointsPossible} د
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-slate-400 space-y-3">
              <HelpCircle size={32} className="mx-auto text-slate-600" />
              <div className="text-xs font-bold text-slate-300">في انتظار بدء التصحيح</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                ستظهر هنا بطاقة رصد الدرجات التفصيلية وتحليل إجابات الطالب فور معالجة الورقة.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Mandatory Copyright Footer */}
      <div className="text-center text-xs text-slate-500 font-bold pt-4 border-t border-slate-800/80 select-none">
        {MANDATORY_COPYRIGHT}
      </div>

    </div>
  );
};
