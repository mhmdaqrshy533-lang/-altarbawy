import React from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { useEditorStore } from '../../store/useEditorStore';
import { FormattingBlockType } from '../types';
import { 
  Type, Heading1, Heading2, AlignRight, Sparkles, CheckCircle2, 
  AlertCircle, Table, Image as ImageIcon, Sigma, FlaskConical, Quote, 
  ZoomIn, ZoomOut, Grid, Plus, Trash2, Layers, Bookmark 
} from 'lucide-react';

export const BookToolbar: React.FC = () => {
  const { currentProject, setActiveDrawer } = useBookStudioStore();
  const { 
    activePageIndex, 
    document: editorDoc, 
    addElement, 
    removeElement,
    zoom, 
    setZoom, 
    snapToGrid, 
    toggleSnapToGrid,
    selectedElementIds
  } = useEditorStore();

  if (!currentProject) return null;

  const handleDeleteSelected = () => {
    selectedElementIds.forEach(id => {
      removeElement(activePageIndex, id);
    });
  };

  const handleInsertBlock = (type: FormattingBlockType) => {
    const pIdx = activePageIndex || 0;
    const yPos = 100 + ((editorDoc.pages[pIdx]?.elements?.length || 0) * 85) % 600;

    let content = '';
    let fontSize = 14;
    let color = '#0f172a';
    let fontWeight = 'normal';

    switch (type) {
      case 'chapter_title':
        content = `📖 الفصل الأول: عنوان الفصل المنهجي الشامل`;
        fontSize = 22;
        fontWeight = 'bold';
        color = currentProject.palette.primary;
        break;
      case 'lesson_heading':
        content = `📌 الدرس 1.1: المفاهيم والتطبيقات الأساسية`;
        fontSize = 18;
        fontWeight = 'bold';
        color = currentProject.palette.secondary;
        break;
      case 'paragraph':
        content = `هذا نص فقرة منهجة تشرح المفاهيم العلمية بوضوح مع مراعاة التدرج في تقديم المعلومات والخط الواضح للمنهج المعتمد.`;
        fontSize = 13;
        break;
      case 'definition':
        content = `💡 تعريف مصطلح علمي هَام:\nالقاعدة الأساسية تعبر عن السلوك المنتظم تحت الظروف القياسية المعتمدة في المناهج الوزارية.`;
        fontSize = 13;
        color = '#0369a1';
        fontWeight = 'bold';
        break;
      case 'solved_example':
        content = `✅ مثال محلول بالتفصيل:\nاحسب الناتج المطلوب في المسألة المنهجية التالية؟\nالحل:\n1) القانون المعتمد: F = m × a\n2) بالتعويض المباشر: F = 10 × 5 = 50 نيوتن.`;
        fontSize = 13;
        color = '#15803d';
        fontWeight = 'bold';
        break;
      case 'important_note':
        content = `⚠️ ملاحظة امتحانية هامة:\nتأكد دائماً من توحيد الوحدات الدولية (SI) قبل البدء في الحسابات.`;
        fontSize = 13;
        color = '#b45309';
        fontWeight = 'bold';
        break;
      case 'quote':
        content = `«العلمُ نافذةٌ تنيرُ الآفاق وتسمو بالعقول» — حكمة تعليمية`;
        fontSize = 14;
        color = '#4338ca';
        fontWeight = 'bold';
        break;
      default:
        content = `عنصر محتوى جديد...`;
    }

    const newElement = {
      id: `elem_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      type: 'text' as const,
      x: 50,
      y: yPos,
      width: 520,
      height: 90,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: (editorDoc.pages[pIdx]?.elements?.length || 0) + 1,
      content,
      fontSize,
      fontFamily: currentProject.fontPairing.bodyFont,
      fontWeight,
      color,
      textAlign: 'right' as const
    };

    addElement(pIdx, newElement);
  };

  const handleInsertMath = () => {
    const pIdx = activePageIndex || 0;
    const newMathElement = {
      id: `math_${Date.now()}`,
      type: 'math' as const,
      x: 100,
      y: 150,
      width: 300,
      height: 80,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: (editorDoc.pages[pIdx]?.elements?.length || 0) + 1,
      latex: 'f(x) = \\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}',
      fontSize: 18,
      color: currentProject.palette.primary
    };
    addElement(pIdx, newMathElement);
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-slate-200 z-20 font-sans select-none overflow-x-auto custom-scrollbar" dir="rtl">
      
      {/* Element Insertion Group */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-[11px] font-black text-slate-400 pl-2 border-l border-slate-800">
          إدراج عناصر المنهج:
        </span>

        <button
          onClick={() => handleInsertBlock('chapter_title')}
          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
          title="عنوان فصل رئيسي"
        >
          <Heading1 size={15} />
          <span>عنوان فصل</span>
        </button>

        <button
          onClick={() => handleInsertBlock('lesson_heading')}
          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
          title="ترويسة درس فرعي"
        >
          <Heading2 size={15} />
          <span>ترويسة درس</span>
        </button>

        <button
          onClick={() => handleInsertBlock('paragraph')}
          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
          title="فقرة نصية"
        >
          <Type size={15} />
          <span>فقرة شرح</span>
        </button>

        <button
          onClick={() => handleInsertBlock('definition')}
          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
          title="صندوق تعريف مصطلح"
        >
          <Sparkles size={15} />
          <span>تعريف مصطلح</span>
        </button>

        <button
          onClick={() => handleInsertBlock('solved_example')}
          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
          title="مثال محلول بالخطوات"
        >
          <CheckCircle2 size={15} />
          <span>مثال محلول</span>
        </button>

        <button
          onClick={() => handleInsertBlock('important_note')}
          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
          title="تنبيه وملاحظة هامة"
        >
          <AlertCircle size={15} />
          <span>ملاحظة هامة</span>
        </button>

        <button
          onClick={handleInsertMath}
          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
          title="إدراج معادلة رياضية"
        >
          <Sigma size={15} />
          <span>معادلة</span>
        </button>

        <button
          onClick={() => setActiveDrawer('media')}
          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
          title="مكتبة الأشكال والرسومات العلمية"
        >
          <FlaskConical size={15} />
          <span>رسم علمي</span>
        </button>

        <button
          onClick={() => setActiveDrawer('pedagogical_mastermind')}
          className="px-2.5 py-1.5 bg-gradient-to-r from-purple-900 to-indigo-900 hover:from-purple-800 hover:to-indigo-800 text-amber-300 border border-purple-700/60 rounded-xl text-xs font-black transition-all flex items-center gap-1 shadow-sm"
          title="العقل المدبر لمعالجة ومزج المحتوى المنهجي"
        >
          <Sparkles size={15} className="text-amber-400" />
          <span>إعادة مزج ذكي (Mastermind)</span>
        </button>
      </div>

      {/* Grid & Zoom Controls */}
      <div className="flex items-center gap-2 shrink-0">
        
        {selectedElementIds.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="px-2.5 py-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/60 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
          >
            <Trash2 size={14} />
            <span>حذف المحدد ({selectedElementIds.length})</span>
          </button>
        )}

        <div className="h-5 w-px bg-slate-800" />

        <button
          onClick={toggleSnapToGrid}
          className={`p-1.5 rounded-xl text-xs border transition-all ${
            snapToGrid ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}
          title="محاذاة الشبكة"
        >
          <Grid size={16} />
        </button>

        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-0.5 text-xs font-bold">
          <button 
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            className="p-1 text-slate-400 hover:text-white rounded"
          >
            <ZoomOut size={14} />
          </button>
          <span className="px-2 font-mono text-[11px] text-indigo-400">{zoom}%</span>
          <button 
            onClick={() => setZoom(Math.min(200, zoom + 10))}
            className="p-1 text-slate-400 hover:text-white rounded"
          >
            <ZoomIn size={14} />
          </button>
        </div>
      </div>

    </div>
  );
};
