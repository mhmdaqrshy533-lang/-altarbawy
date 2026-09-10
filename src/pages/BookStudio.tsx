import React, { useState, useEffect } from 'react';
import { useBookStudioStore } from '../editor/book-studio/store/useBookStudioStore';
import { BookStudioDashboard } from '../editor/book-studio/components/BookStudioDashboard';
import { BookWizardModal } from '../editor/book-studio/components/BookWizardModal';
import { SmartCoverEditorModal } from '../editor/book-studio/components/SmartCoverEditorModal';
import { AiCoverGeneratorModal } from '../editor/book-studio/components/AiCoverGeneratorModal';
import { StyleManagerModal } from '../editor/book-studio/components/StyleManagerModal';
import { ColorPaletteModal } from '../editor/book-studio/components/ColorPaletteModal';
import { MasterPageManagerModal } from '../editor/book-studio/components/MasterPageManagerModal';
import { BookPageManager } from '../editor/book-studio/components/BookPageManager';
import { BookCanvas } from '../editor/book-studio/components/BookCanvas';
import { BookToolbar } from '../editor/book-studio/components/BookToolbar';
import { BookProperties } from '../editor/book-studio/components/BookProperties';
import { InternalFormattingToolbar } from '../editor/book-studio/components/InternalFormattingToolbar';
import { MediaAssetBankDrawer } from '../editor/book-studio/components/MediaAssetBankDrawer';
import { FontManagerModal } from '../editor/book-studio/components/FontManagerModal';
import { FlipbookPreviewModal } from '../editor/book-studio/components/FlipbookPreviewModal';
import { BookExportModal } from '../editor/book-studio/components/BookExportModal';
import { PedagogicalMastermindDrawer } from '../editor/book-studio/components/PedagogicalMastermindDrawer';

import { EditorStatusBar } from '../editor/components/EditorStatusBar';
import { PrintCenterModal } from '../editor/components/PrintCenterModal';
import { useEditorStore } from '../editor/store/useEditorStore';
import { FormattingBlockType } from '../editor/book-studio/types';

import { 
  ArrowRight, Save, Layout, FolderTree, Sparkles, Type, Image, 
  BookOpen, Download, CheckCircle2, Layers, Wand2, Palette, Columns 
} from 'lucide-react';

interface BookStudioProps {
  onBack: () => void;
}

export default function BookStudio({ onBack }: BookStudioProps) {
  const { 
    currentProject, 
    activeView, 
    activeDrawer, 
    setActiveView, 
    setActiveDrawer, 
    saveCurrentProject,
    loadSavedProjects 
  } = useBookStudioStore();

  const { setDocument, addElement, activePageIndex, document: editorDoc } = useEditorStore();

  const [isPrintCenterOpen, setIsPrintCenterOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    loadSavedProjects();
  }, []);

  // Sync current book project to محرر الرقيم التربوي store when project changes or view opens
  useEffect(() => {
    if (currentProject && activeView === 'editor') {
      const docState = {
        id: currentProject.id,
        title: currentProject.title,
        pages: currentProject.pages,
        paperSize: currentProject.paperSize,
        orientation: currentProject.orientation,
        margins: { top: 15, right: 15, bottom: 15, left: 15 },
        metadata: currentProject.metadata
      };
      setDocument(docState);
    }
  }, [currentProject?.id, activeView]);

  const handleSave = () => {
    saveCurrentProject();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleInsertFormattingBlock = (blockType: FormattingBlockType) => {
    const pIdx = activePageIndex || 0;
    const yPos = 120 + (editorDoc.pages[pIdx]?.elements?.length || 0) * 80;

    let content = '';
    switch (blockType) {
      case 'chapter_title':
        content = `📖 الفصل الأول: عنوان الفصل المنهجي الشامل`;
        break;
      case 'lesson_heading':
        content = `📌 الدرس 1.1: التعاريف والقوانين الأساسية`;
        break;
      case 'definition':
        content = `💡 تعريف منهجي هَم:\nالمفهوم الأصلي هو القاعدة العلمية التي تبين الخصائص والسلوكيات تحت الظروف القياسية.`;
        break;
      case 'solved_example':
        content = `✅ مثال محلول:\nاحسب القيمة المطلوبة في المسألة التالية؟\nالحل:\n1) تطبيق القانون: F = m × a\n2) النتيجة النهائية: 50 نيوتن.`;
        break;
      case 'important_note':
        content = `⚠️ ملاحظة وزارية هامة:\nيرجى الانتباه إلى توحيد الوحدات الدولية قبل إجراء العمليات الحسابية.`;
        break;
      case 'question_block':
        content = `س) علل لما يأتي تعليلاً علمياً دقيقاً؟`;
        break;
      case 'lab_experiment':
        content = `🧪 تجربة عملية ومعملية:\nالأدوات: أنبوب اختبار، كاشف، ميزان حساس.\nالخطوات:\n1. ضع الكمية المطلوبة.\n2. سجل القراءة والملاحظة.`;
        break;
      case 'lesson_summary':
        content = `📝 خلاصة الدرس:\n- النقطة الأولى: الفكرة الجوهرية.\n- النقطة الثانية: المخرجات والتطبيقات.`;
        break;
      case 'quote':
        content = `«العلمُ نافذةٌ تنيرُ الآفاق وتسمو بالعقول» — حكمة تعليمية`;
        break;
      default:
        content = `نص منهجي تعليمي جديد...`;
    }

    const newElement = {
      id: `elem_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      type: 'text' as const,
      x: 40,
      y: yPos,
      width: 500,
      height: 100,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: (editorDoc.pages[pIdx]?.elements?.length || 0) + 1,
      content,
      fontSize: blockType === 'chapter_title' ? 22 : blockType === 'lesson_heading' ? 18 : 14,
      fontFamily: currentProject?.fontPairing?.headingFont || 'Amiri',
      fontWeight: 'bold',
      color: blockType === 'definition' ? '#0369a1' : blockType === 'solved_example' ? '#15803d' : '#0f172a',
      textAlign: 'right' as const
    };

    addElement(pIdx, newElement);
  };

  const handleInsertSvgFromBank = (svgContent: string, name: string) => {
    const pIdx = activePageIndex || 0;
    const newPhysicsElem = {
      id: `svg_${Date.now()}`,
      type: 'physics' as const,
      x: 100,
      y: 200,
      width: 200,
      height: 200,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: (editorDoc.pages[pIdx]?.elements?.length || 0) + 1,
      svgContent,
      strokeColor: '#1e40af',
      strokeWidth: 2
    };
    addElement(pIdx, newPhysicsElem);
  };

  // Render Studio Dashboard
  if (activeView === 'dashboard') {
    return <BookStudioDashboard onBackToMainOS={onBack} />;
  }

  // Render Studio Editor (Pure Desktop Publishing - DTP Mode)
  return (
    <div className="flex flex-col h-screen bg-slate-950 font-sans select-none overflow-hidden" dir="rtl">
      
      {/* Top Book Studio Custom Control Bar */}
      <div className="bg-emerald-950 border-b border-emerald-900/80 px-4 py-2 flex items-center justify-between text-slate-200 z-30 shadow-sm">
        
        {/* Left Actions & Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('dashboard')}
            className="p-2 bg-emerald-900 hover:bg-emerald-800 text-slate-200 border border-emerald-800 rounded-xl transition-all text-xs font-bold flex items-center gap-1.5"
            title="العودة للاستوديو"
          >
            <ArrowRight size={16} />
            <span>معرض الملازم</span>
          </button>

          <div className="h-5 w-px bg-emerald-900" />

          <div>
            <h2 className="text-sm font-black text-white flex items-center gap-2">
              {currentProject?.title || 'كتاب بدون عنوان'}
              <span className="px-2 py-0.5 bg-emerald-900 text-amber-300 border border-emerald-800 text-[10px] rounded-lg font-bold">
                {currentProject?.subject}
              </span>
            </h2>
            <p className="text-[10px] text-emerald-200/70 font-bold">
              {currentProject?.stage} — {currentProject?.grade} ({currentProject?.paperSize})
            </p>
          </div>
        </div>

        {/* Studio Tool Modals Triggers */}
        <div className="flex items-center gap-1.5">
          
          <button
            onClick={() => setActiveDrawer('pedagogical_mastermind')}
            className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-amber-300 border border-emerald-700 rounded-xl text-xs font-black shadow-sm transition-all flex items-center gap-1.5"
            title="العقل المدبر: معالجة ومزج خماسي إجباري للدرس"
          >
            <Sparkles size={15} className="text-amber-400" />
            <span>العقل المدبر (Mastermind)</span>
          </button>

          <button
            onClick={() => setActiveDrawer('ai_cover')}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-200 border border-emerald-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            title="توليد الغلاف بالذكاء الاصطناعي"
          >
            <Wand2 size={14} />
            <span>غلاف بالذكاء الاصطناعي</span>
          </button>

          <button
            onClick={() => setActiveDrawer('cover')}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-emerald-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            title="محرر الغلاف الشامل"
          >
            <Sparkles size={14} />
            <span>الغلاف</span>
          </button>

          <button
            onClick={() => setActiveDrawer('styles')}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-emerald-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            title="أنماط العناوين والفقرات"
          >
            <Type size={14} />
            <span>الأنماط</span>
          </button>

          <button
            onClick={() => setActiveDrawer('colors')}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-emerald-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            title="لوحة الألوان المنهجية"
          >
            <Palette size={14} />
            <span>الألوان</span>
          </button>

          <button
            onClick={() => setActiveDrawer('master_pages')}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-emerald-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            title="الصفحات الرئيسية والتقابل"
          >
            <Columns size={14} />
            <span>الصفحات الرئيسية</span>
          </button>

          <button
            onClick={() => setActiveDrawer('chapters')}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-emerald-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            title="هيكل وصفحات الكتاب"
          >
            <Layers size={14} />
            <span>الصفحات</span>
          </button>

          <button
            onClick={() => setActiveDrawer('media')}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-emerald-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            title="مكتبة الصور والرسومات"
          >
            <Image size={14} />
            <span>الوسائط</span>
          </button>

          <button
            onClick={() => setActiveDrawer('flipbook')}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-emerald-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            title="معاينة تصفح الكتاب"
          >
            <BookOpen size={14} />
            <span>تصفح</span>
          </button>

          <button
            onClick={() => setActiveDrawer('export')}
            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>تصدير</span>
          </button>

          <button
            onClick={handleSave}
            className="p-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all border border-emerald-700"
            title="حفظ المشروع"
          >
            <Save size={16} />
          </button>
        </div>

      </div>

      {/* Internal Semantic Formatting Bar */}
      <div className="px-4 py-1.5 bg-slate-950 border-b border-slate-800">
        <InternalFormattingToolbar onInsertBlock={handleInsertFormattingBlock} />
      </div>

      {/* Book DTP Toolbar */}
      <BookToolbar />

      {/* Main Studio Canvas Workspace */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Central Book Canvas Engine (No Exam Headers or Footers!) */}
        <main className="flex-1 relative overflow-auto custom-scrollbar bg-slate-900/90 p-4">
          <BookCanvas />
        </main>

        {/* Right Side Book DTP Properties Panel */}
        <BookProperties />

        {/* Slide-over Drawers & Modals */}
        <BookPageManager />

        {(activeDrawer === 'pedagogical_mastermind' || activeDrawer === 'ai_remix') && (
          <PedagogicalMastermindDrawer onClose={() => setActiveDrawer('none')} />
        )}

        {activeDrawer === 'media' && (
          <MediaAssetBankDrawer 
            onClose={() => setActiveDrawer('none')}
            onInsertSvg={handleInsertSvgFromBank}
            onInsertImage={(src) => {}}
          />
        )}

        {activeDrawer === 'cover' && (
          <SmartCoverEditorModal onClose={() => setActiveDrawer('none')} />
        )}

        {activeDrawer === 'ai_cover' && (
          <AiCoverGeneratorModal onClose={() => setActiveDrawer('none')} />
        )}

        {activeDrawer === 'styles' && (
          <StyleManagerModal onClose={() => setActiveDrawer('none')} />
        )}

        {activeDrawer === 'colors' && (
          <ColorPaletteModal onClose={() => setActiveDrawer('none')} />
        )}

        {activeDrawer === 'master_pages' && (
          <MasterPageManagerModal onClose={() => setActiveDrawer('none')} />
        )}

        {activeDrawer === 'fonts' && (
          <FontManagerModal onClose={() => setActiveDrawer('none')} />
        )}

        {activeDrawer === 'flipbook' && (
          <FlipbookPreviewModal 
            onClose={() => setActiveDrawer('none')} 
            onOpenPrintModal={() => setIsPrintCenterOpen(true)}
          />
        )}

        {activeDrawer === 'export' && (
          <BookExportModal 
            onClose={() => setActiveDrawer('none')} 
            onExportPdf={() => setIsPrintCenterOpen(true)}
          />
        )}
      </div>

      {/* Status Bar */}
      <EditorStatusBar />

      {/* Wizard Modal Overlay when activeView === 'wizard' */}
      <BookWizardModal />

      {/* Print Center Modal */}
      <PrintCenterModal 
        isOpen={isPrintCenterOpen} 
        onClose={() => setIsPrintCenterOpen(false)} 
      />

      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-12 right-12 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-black flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 size={18} />
          <span>تم حفظ تغييرات الكتاب المنهجي بنجاح!</span>
        </div>
      )}

    </div>
  );
}
