import React, { useState } from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { useEditorStore } from '../../store/useEditorStore';
import { 
  Sparkles, Wand2, BookOpen, Layers, CheckCircle2, Type, 
  Palette, HelpCircle, FileText, ArrowLeft, RefreshCw, X, Download, ShieldCheck
} from 'lucide-react';

interface MastermindResult {
  header: {
    targetAudience: string;
    difficulty: string;
    classification: string;
  };
  typography: {
    fontName: string;
    titleSize: string;
    bodySize: string;
    spacingAdvice: string;
  };
  colorHarmony: {
    paletteName: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    frameLayoutAdvice: string;
  };
  coreContent: {
    mainTitle: string;
    objective: string;
    points: string[];
    anticipatorySummary: string;
  };
  interactiveStation: {
    exercise: string;
    criticalThinkingQuestion: string;
  };
}

interface PedagogicalMastermindDrawerProps {
  onClose: () => void;
}

export const PedagogicalMastermindDrawer: React.FC<PedagogicalMastermindDrawerProps> = ({ onClose }) => {
  const { currentProject } = useBookStudioStore();
  const { activePageIndex, document: editorDoc, addElement } = useEditorStore();

  const [inputContent, setInputContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<MastermindResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Pull existing text elements from the active page canvas
  const handlePullCanvasContent = () => {
    const pIdx = activePageIndex || 0;
    const pageElements = editorDoc.pages[pIdx]?.elements || [];
    const textElements = pageElements
      .filter((el: any) => el.type === 'text' && el.content)
      .map((el: any) => el.content);

    if (textElements.length > 0) {
      setInputContent(textElements.join('\n\n'));
    } else {
      setError('لا توجد عناصر نصية في الصفحة الحالية لسحبها.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleRunPipeline = async () => {
    if (!inputContent.trim()) {
      setError('يرجى كتابة نص المادة أو الضغط على "سحب نص الصفحة" أولاً.');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const res = await fetch('/api/pedagogical/remix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: inputContent,
          subject: currentProject?.subject || 'عام',
          grade: currentProject?.grade || 'عام',
          stage: currentProject?.stage || 'عام'
        })
      });

      if (!res.ok) {
        throw new Error('فشلت معالجة النص بواسطة العقل المدبر التربوي');
      }

      const data: MastermindResult = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'حدث خطأ غير متوقع أثناء معالجة المحتوى');
    } finally {
      setIsProcessing(false);
    }
  };

  // Inject formatted result elements into Book Studio DTP Canvas
  const handleInjectToCanvas = () => {
    if (!result) return;

    const pIdx = activePageIndex || 0;
    const currentElementsCount = editorDoc.pages[pIdx]?.elements?.length || 0;
    let currentY = 80;

    // 1. Title Element
    const titleElement = {
      id: `title_${Date.now()}`,
      type: 'text' as const,
      x: 40,
      y: currentY,
      width: 520,
      height: 60,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: currentElementsCount + 1,
      content: `📖 ${result.coreContent.mainTitle}`,
      fontSize: 22,
      fontFamily: result.typography.fontName || 'Cairo',
      fontWeight: 'bold',
      color: result.colorHarmony.primaryColor || '#1e3a8a',
      textAlign: 'right' as const
    };
    addElement(pIdx, titleElement);
    currentY += 70;

    // 2. Metadata / Target Header Badge
    const headerElement = {
      id: `header_${Date.now()}`,
      type: 'text' as const,
      x: 40,
      y: currentY,
      width: 520,
      height: 45,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: currentElementsCount + 2,
      content: `🎯 [الفئة: ${result.header.targetAudience}] | [المستوى: ${result.header.difficulty}] | [التصنيف: ${result.header.classification}]`,
      fontSize: 11,
      fontFamily: 'Cairo',
      fontWeight: 'bold',
      color: result.colorHarmony.secondaryColor || '#0369a1',
      textAlign: 'right' as const
    };
    addElement(pIdx, headerElement);
    currentY += 55;

    // 3. Objective & Core Content Box
    const pointsFormatted = (result.coreContent?.points || []).map((p, i) => ` • ${p}`).join('\n');
    const coreTextContent = `📌 الهدف التربوي والتمهيد:\n${result.coreContent?.objective || ''}\n\nالمضمون المنهجي المكثف:\n${pointsFormatted}`;
    
    const coreElement = {
      id: `core_${Date.now()}`,
      type: 'text' as const,
      x: 40,
      y: currentY,
      width: 520,
      height: 160,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: currentElementsCount + 3,
      content: coreTextContent,
      fontSize: 13,
      fontFamily: result.typography.fontName || 'Noto Naskh Arabic',
      fontWeight: 'normal',
      color: '#0f172a',
      textAlign: 'right' as const
    };
    addElement(pIdx, coreElement);
    currentY += 175;

    // 4. Anticipatory Summary Card
    const summaryElement = {
      id: `summary_${Date.now()}`,
      type: 'text' as const,
      x: 40,
      y: currentY,
      width: 520,
      height: 80,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: currentElementsCount + 4,
      content: `🧠 خلاصة مركزة (قراءة الأفكار الذكية):\n${result.coreContent.anticipatorySummary}`,
      fontSize: 12,
      fontFamily: 'Cairo',
      fontWeight: 'bold',
      color: result.colorHarmony.accentColor || '#d97706',
      textAlign: 'right' as const
    };
    addElement(pIdx, summaryElement);
    currentY += 90;

    // 5. Interactive Station Element
    const interactiveContent = `⚡ المحطة التفاعلية الذكية:\n• التمرين التطبيقي: ${result.interactiveStation.exercise}\n• سؤال التفكير الناقد: ${result.interactiveStation.criticalThinkingQuestion}`;
    const interactiveElement = {
      id: `station_${Date.now()}`,
      type: 'text' as const,
      x: 40,
      y: currentY,
      width: 520,
      height: 110,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: currentElementsCount + 5,
      content: interactiveContent,
      fontSize: 12,
      fontFamily: 'Cairo',
      fontWeight: 'bold',
      color: '#15803d',
      textAlign: 'right' as const
    };
    addElement(pIdx, interactiveElement);

    onClose();
  };

  return (
    <div className="fixed inset-y-0 left-0 w-[450px] bg-slate-900 border-r border-slate-800 text-slate-100 shadow-2xl z-50 flex flex-col font-sans select-none animate-in slide-in-from-left duration-200" dir="rtl">
      
      {/* Header */}
      <div className="p-4 border-b border-emerald-900 flex items-center justify-between bg-emerald-950">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-900 text-amber-300 border border-emerald-800 rounded-xl">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-sm font-black text-white flex items-center gap-1.5">
              العقل المدبر التربوي (Mastermind Engine)
            </h3>
            <p className="text-[11px] text-emerald-200/80">معالجة ومزج منهجي لخمس خطوات معيارية</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all"
        >
          <X size={18} />
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        
        {/* Input Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <FileText size={14} />
              <span>موضوع الدرس أو النص المطلوب معالجته:</span>
            </label>
            <button
              onClick={handlePullCanvasContent}
              className="text-[11px] font-bold text-sky-400 hover:text-sky-300 bg-sky-950/60 border border-sky-800/60 px-2 py-1 rounded-lg transition-all flex items-center gap-1"
              title="سحب كافة النصوص الموجودة في الصفحة الحالية"
            >
              <Download size={12} />
              <span>سحب نص الصفحة</span>
            </button>
          </div>

          <textarea
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder="أدخل النص الخام، الملاحظات، أو أفكار الدرس ليقوم العقل المدبر بتحويلها فوراً إلى محتوى تربوي متكامل..."
            rows={5}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleRunPipeline}
          disabled={isProcessing || !inputContent.trim()}
          className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white text-xs font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              <span>جاري التحليل والمزج الهيكلي...</span>
            </>
          ) : (
            <>
              <Wand2 size={16} />
              <span>تطبيق المعالجة التربوية والمزج الخماسي</span>
            </>
          )}
        </button>

        {error && (
          <div className="p-3 bg-rose-950/80 border border-rose-800/80 rounded-xl text-rose-300 text-xs font-bold">
            {error}
          </div>
        )}

        {/* Pipeline Output Display */}
        {result && (
          <div className="space-y-3 pt-2 animate-in fade-in duration-300">
            
            <div className="text-xs font-black text-slate-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>نتائج معالجة العقل المدبر (Structured Output Pipeline):</span>
            </div>

            {/* Stage 1 */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
              <div className="text-[11px] font-black text-indigo-400 flex items-center gap-1">
                <span>1. الترويسة الهندسية والمعيارية</span>
              </div>
              <p className="text-[11px] text-slate-300">🎯 الفئة المستهدفة: <span className="font-bold text-white">{result.header.targetAudience}</span></p>
              <p className="text-[11px] text-slate-300">📊 درجة الصعوبة: <span className="font-bold text-white">{result.header.difficulty}</span></p>
              <p className="text-[11px] text-slate-300">🏷️ التصنيف التربوي: <span className="font-bold text-white">{result.header.classification}</span></p>
            </div>

            {/* Stage 2 */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
              <div className="text-[11px] font-black text-purple-400 flex items-center gap-1">
                <Type size={13} />
                <span>2. هندسة التيبوغرافي والخطوط</span>
              </div>
              <p className="text-[11px] text-slate-300">✍️ الخط الموصى به: <span className="font-bold text-white">{result.typography.fontName}</span></p>
              <p className="text-[11px] text-slate-300">📏 تباعد العناوين والمتن: <span className="font-bold text-slate-200">{result.typography.spacingAdvice}</span></p>
            </div>

            {/* Stage 3 */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
              <div className="text-[11px] font-black text-rose-400 flex items-center gap-1">
                <Palette size={13} />
                <span>3. التناغم اللوني والإطارات</span>
              </div>
              <div className="flex items-center gap-2 py-1">
                <div className="w-4 h-4 rounded-full border border-slate-700" style={{ backgroundColor: result.colorHarmony.primaryColor }} title="الأساسي" />
                <div className="w-4 h-4 rounded-full border border-slate-700" style={{ backgroundColor: result.colorHarmony.secondaryColor }} title="الثانوي" />
                <div className="w-4 h-4 rounded-full border border-slate-700" style={{ backgroundColor: result.colorHarmony.accentColor }} title="التمييزي" />
                <span className="text-[11px] font-bold text-slate-300">{result.colorHarmony.paletteName}</span>
              </div>
              <p className="text-[10px] text-slate-400">{result.colorHarmony.frameLayoutAdvice}</p>
            </div>

            {/* Stage 4 */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="text-[11px] font-black text-amber-400 flex items-center gap-1">
                <BookOpen size={13} />
                <span>4. المحتوى الجوهري المكثف</span>
              </div>
              <p className="text-xs font-bold text-white">{result.coreContent.mainTitle}</p>
              <p className="text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded-lg">{result.coreContent.objective}</p>
              <ul className="text-[11px] text-slate-300 space-y-1 pr-3 list-disc">
                {result.coreContent.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
              <div className="p-2 bg-amber-950/40 border border-amber-800/40 rounded-lg text-[11px] text-amber-200 font-medium">
                🧠 <span className="font-bold">خلاصة استباقية:</span> {result.coreContent.anticipatorySummary}
              </div>
            </div>

            {/* Stage 5 */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
              <div className="text-[11px] font-black text-emerald-400 flex items-center gap-1">
                <HelpCircle size={13} />
                <span>5. المحطة التفاعلية الذكية</span>
              </div>
              <p className="text-[11px] text-slate-200 font-medium">✏️ <span className="font-bold">تمرين تطبيق:</span> {result.interactiveStation.exercise}</p>
              <p className="text-[11px] text-emerald-300 font-medium">💡 <span className="font-bold">تفكير ناقد:</span> {result.interactiveStation.criticalThinkingQuestion}</p>
            </div>

            {/* Inject Button */}
            <button
              onClick={handleInjectToCanvas}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={16} />
              <span>إدراج المخرجات المعالجة مباشرة في صفحة الكتاب (DTP)</span>
            </button>

          </div>
        )}

      </div>

    </div>
  );
};
