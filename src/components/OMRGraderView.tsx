import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Scan, 
  RefreshCw, 
  Eye, 
  FileCheck, 
  UserCheck, 
  SlidersHorizontal,
  Plus
} from 'lucide-react';
import { 
  ExamQuestion, 
  OMRGradingReport, 
  MANDATORY_COPYRIGHT 
} from '../types/exam';
import { OMRVisionEngine } from '../utils/omrVisionEngine';

interface OMRGraderViewProps {
  questions: ExamQuestion[];
  modelLetter: string;
  onAddReportToGradebook?: (report: OMRGradingReport) => void;
}

export const OMRGraderView: React.FC<OMRGraderViewProps> = ({
  questions,
  modelLetter = 'أ',
  onAddReportToGradebook
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [studentName, setStudentName] = useState<string>('طالب تجريبي — سهيل الهزبري');
  const [seatNumber, setSeatNumber] = useState<string>('2045');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [report, setReport] = useState<OMRGradingReport | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [fillCutoff, setFillCutoff] = useState<number>(28);
  const [contrastCutoff, setContrastCutoff] = useState<number>(14);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle uploaded image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
      setReport(null);
    };
    reader.readAsDataURL(file);
  };

  // Generate simulated sheet for instant testing
  const handleGenerateSimulated = async (accuracy: 'high' | 'medium' | 'random' = 'high') => {
    setIsScanning(true);
    const mockNames = [
      'سيف الدين الهزبري (متفوق)',
      'صهيب محمد عبد المغني',
      'أسامة عادل الوصابي',
      'عمرو خالد اليريمي'
    ];
    const pickedName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const randomSeat = String(Math.floor(1000 + Math.random() * 9000));
    setStudentName(pickedName);
    setSeatNumber(randomSeat);

    const generatedDataUrl = await OMRVisionEngine.generateSimulatedStudentSheet(
      questions,
      pickedName,
      randomSeat,
      modelLetter,
      accuracy
    );
    setImageSrc(generatedDataUrl);
    setIsScanning(false);
    setReport(null);
  };

  // Run OMR Computer Vision scan on loaded image
  const handleScanNow = async () => {
    if (!imageSrc) return;
    setIsScanning(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      try {
        const gradingReport = await OMRVisionEngine.processAndGrade(
          img,
          questions,
          modelLetter,
          studentName,
          seatNumber,
          {
            fillCutoff,
            contrastCutoff,
            autoPerspectiveCorrection: true
          }
        );
        setReport(gradingReport);
        if (onAddReportToGradebook) {
          onAddReportToGradebook(gradingReport);
        }
      } catch (err) {
        console.error('OMR grading error:', err);
      } finally {
        setIsScanning(false);
      }
    };
    img.src = imageSrc;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 select-none" dir="rtl">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0d5c3a] via-[#073823] to-slate-900 border border-emerald-600/40 rounded-3xl p-6 text-white shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-black text-emerald-300">
            <Sparkles size={14} />
            <span>محرك الرؤية الحاسوبية الفائق (Ultra-Fast OMR Vision Engine)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            مصحح الاختبارات المؤتمتة وتحليل استجابات الطلاب
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl font-medium leading-relaxed">
            معالجة صورية فورية على مستوى المتصفح عبر خوارزمية Otsu التكيفية، وتصحيح الانحراف والمنظور الزاوي بدقة متناهية.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl border border-slate-700 transition"
            title="إعدادات الحساسية ومعامل التباين"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Threshold & Calibration Settings Drawer */}
      {showSettings && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4 animate-in fade-in duration-150">
          <h4 className="text-xs font-black text-white flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-emerald-400" />
            <span>معايرة حساسية كاشف التظليل وعتبة Otsu:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-bold">
                عتبة كثافة التظليل (Fill Cutoff): {fillCutoff}%
              </label>
              <input 
                type="range" 
                min="15" 
                max="50" 
                value={fillCutoff}
                onChange={(e) => setFillCutoff(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <span className="text-[10px] text-slate-400">القيمة الموصى بها: 28% لتمييز خطوط الرصاص الخافتة</span>
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-bold">
                عتبة التباين النسبي المحيطي (Donut Contrast): {contrastCutoff}%
              </label>
              <input 
                type="range" 
                min="8" 
                max="30" 
                value={contrastCutoff}
                onChange={(e) => setContrastCutoff(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <span className="text-[10px] text-slate-400">يقارن الحلقة الخارجية للفقرة بالمركز لإلغاء آثار المسح والظلال</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Source & Scanner Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Controls Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <h3 className="text-xs font-black text-white flex items-center gap-2">
              <Camera size={16} className="text-emerald-400" />
              <span>مصدر ورقة الإجابة (OMR Sheet Source)</span>
            </h3>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">اسم الطالب:</label>
                <input 
                  type="text" 
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold">رقم الجلوس:</label>
                <input 
                  type="text" 
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs font-mono"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 border border-slate-700"
                >
                  <Upload size={16} className="text-emerald-400" />
                  <span>رفع صورة مصورة</span>
                </button>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />

                <button
                  onClick={() => handleGenerateSimulated('high')}
                  className="flex-1 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 border border-emerald-800"
                >
                  <Sparkles size={16} />
                  <span>توليد ورقة تجريبية</span>
                </button>
              </div>

              {imageSrc && (
                <button
                  onClick={handleScanNow}
                  disabled={isScanning}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-[#0d5c3a] hover:from-emerald-500 hover:to-emerald-600 text-white rounded-2xl text-xs font-black transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>جارٍ معالجة بكسلات الورقة عبر الرؤية الحاسوبية...</span>
                    </>
                  ) : (
                    <>
                      <Scan size={18} />
                      <span>بدء التصحيح الآلي الفوري (Grade Now)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Preview Sheet Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl flex flex-col items-center justify-center min-h-[380px] overflow-hidden">
            {imageSrc ? (
              <div className="relative w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
                <img 
                  src={report?.processedCanvasUrl || imageSrc} 
                  alt="ورقة الاختبار" 
                  className="w-full h-auto object-contain max-h-[480px]"
                />
                {report && (
                  <div className="absolute top-2 right-2 bg-emerald-600/90 text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-md flex items-center gap-1.5 backdrop-blur-xs">
                    <CheckCircle2 size={13} />
                    <span>تم التحليل وتحديد الإحداثيات بنجاح</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-8 text-slate-500 space-y-3">
                <Scan size={44} className="mx-auto text-slate-600 animate-pulse" />
                <div className="text-xs font-bold text-slate-400">لا توجد ورقة محملة حالياً</div>
                <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
                  ارفع صورة تم التقاطها بكاميرا الهاتف أو انقر على "توليد ورقة تجريبية" لمعاينة قوة المحرك البصري.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Grading Diagnostics & Scorecard (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {report ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              
              {/* Scorecard Hero */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <UserCheck size={14} />
                      <span>تقرير التصحيح والاعتماد الآلي</span>
                    </span>
                    <h3 className="text-lg font-black text-white">{report.studentName}</h3>
                    <div className="text-xs text-slate-400 font-mono">
                      رقم الجلوس: <span className="text-emerald-400 font-bold">{report.seatNumber}</span> | النموذج: <span className="text-white font-bold">({report.modelLetter})</span>
                    </div>
                  </div>

                  <div className="text-center bg-slate-900/90 border border-slate-700/80 p-3 rounded-2xl shadow-inner min-w-[110px]">
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      {report.totalScore} <span className="text-xs text-slate-400 font-normal">/ {report.maxScore}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-300 font-mono">
                      {report.percentage}%
                    </div>
                  </div>
                </div>

                {/* Score Breakdown Pills */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-emerald-950/40 border border-emerald-800/50 p-2 rounded-xl">
                    <div className="text-emerald-400 font-black text-base font-mono">{report.correctCount}</div>
                    <div className="text-[10px] text-emerald-200 font-bold">إجابة صحيحة</div>
                  </div>
                  <div className="bg-rose-950/40 border border-rose-800/50 p-2 rounded-xl">
                    <div className="text-rose-400 font-black text-base font-mono">{report.incorrectCount}</div>
                    <div className="text-[10px] text-rose-200 font-bold">إجابة خاطئة</div>
                  </div>
                  <div className="bg-slate-800/60 border border-slate-700 p-2 rounded-xl">
                    <div className="text-slate-300 font-black text-base font-mono">{report.unansweredCount}</div>
                    <div className="text-[10px] text-slate-400 font-bold">متروكة</div>
                  </div>
                  <div className="bg-amber-950/40 border border-amber-800/50 p-2 rounded-xl">
                    <div className="text-amber-400 font-black text-base font-mono">{report.doubleMarkedCount}</div>
                    <div className="text-[10px] text-amber-200 font-bold">تظليل مزدوج</div>
                  </div>
                </div>
              </div>

              {/* Detailed Question Rows */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
                <h4 className="text-xs font-black text-white flex items-center justify-between">
                  <span>تفاصيل إجابات الفقرات (Item Analysis):</span>
                  <span className="text-[11px] text-slate-400 font-normal">{report.scannedQuestions.length} فقرة مؤتمتة</span>
                </h4>

                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {report.scannedQuestions.map((sq) => {
                    return (
                      <div 
                        key={sq.questionNumber}
                        className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-3 transition ${
                          sq.isCorrect 
                            ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200' 
                            : sq.isDoubleMarked
                              ? 'bg-amber-950/20 border-amber-800/40 text-amber-200'
                              : 'bg-rose-950/20 border-rose-800/40 text-rose-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-mono font-bold flex items-center justify-center text-xs">
                            {sq.questionNumber}
                          </span>

                          <div>
                            <div className="font-bold text-white text-xs">
                              {sq.type === 'tf' ? 'سؤال صواب وخطأ' : sq.type === 'matching' ? 'سؤال مزاوجة' : 'سؤال اختيار من متعدد'}
                            </div>
                            <div className="text-[11px] opacity-80">
                              إجابة الطالب: <b className="text-white font-mono">[{sq.selectedOptionLabel || 'لا يوجد'}]</b> 
                              {' '} | النموذجية: <b className="text-emerald-400 font-mono">[{sq.correctOptionLabel || 'أ'}]</b>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 font-mono">
                          <span className={`font-bold text-xs ${sq.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {sq.pointsEarned} / {sq.pointsPossible} د
                          </span>
                          {sq.isCorrect ? (
                            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                          ) : sq.isDoubleMarked ? (
                            <span title="تظليل مزدوج"><AlertCircle size={18} className="text-amber-400 shrink-0" /></span>
                          ) : (
                            <XCircle size={18} className="text-rose-400 shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500 space-y-3 min-h-[420px] flex flex-col items-center justify-center">
              <FileCheck size={48} className="text-slate-600" />
              <div className="text-sm font-bold text-slate-300">في انتظار بدء التصحيح</div>
              <p className="text-xs text-slate-500 max-w-sm">
                اختر ورقة اختبار وانقر على "بدء التصحيح الآلي" لاستخراج النتائج وعرض المخطط البصري التفصيلي وتصدير الدرجات.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Mandatory Copyright */}
      <div className="text-center text-xs text-slate-500 font-bold pt-4 border-t border-slate-800 select-none">
        {MANDATORY_COPYRIGHT}
      </div>

    </div>
  );
};
