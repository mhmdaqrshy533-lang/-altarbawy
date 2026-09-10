import React, { useRef, useState } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { useExamProjectsStore } from '../store/useExamProjectsStore';
import { 
  PlusCircle, Image as ImageIcon, Table, Calculator, Zap, 
  Search, Layout, Sliders, Eye, FileDown, X, ArrowRight, Undo2, Redo2, Check, CheckSquare, Grid, FolderOpen, Save, Plus
} from 'lucide-react';
import { useOS } from '../../context/OSContext';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { RaqeemPrintEngine } from '../../core/print/RaqeemPrintEngine';
import { DocumentStandardsValidator } from '../../core/standards/DocumentValidator';
import { ExamSettingsDialog } from './ExamSettingsDialog';
import { SubjectToolbar } from './SubjectToolbar';
import { QuickAddQuestionDialog } from './QuickAddQuestionDialog';
import { EditorElement } from '../types';

interface ExamToolbarProps {
  onBack?: () => void;
  onOpenProjectsList?: () => void;
  onNewProject?: () => void;
  onOpenPrintCenter?: () => void;
  onOpenPageManager?: () => void;
  onOpenAssetBank?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenFontPicker?: () => void;
}

export const ExamToolbar: React.FC<ExamToolbarProps> = ({ 
  onBack, onOpenProjectsList, onNewProject,
  onOpenPrintCenter, onOpenPageManager, onOpenAssetBank,
  onOpenCommandPalette, onOpenFontPicker
}) => {
  const { 
    zoom, setZoom, document, activePageIndex, addQuestion, addElement, updateMetadata,
    history, future, undo, redo, selectElement
  } = useEditorStore();

  const { saveCurrentDocument, exportRaqFile } = useExamProjectsStore();

  const [showSettings, setShowSettings] = useState(false);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('الكل');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // High-Fidelity Multi-Page PDF Exporting Engine
  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const pageIds = document.pages.map((_, idx) => `exam-canvas-page-${idx}`);
      const fileName = document.metadata.examTitle || 'raq_exam';
      
      await RaqeemPrintEngine.exportToVectorPdf(
        pageIds,
        fileName,
        {
          paperSize: document.paperSize,
          orientation: document.orientation,
          includeWatermark: true,
          watermarkText: 'محرر الرقيم التربوي — منصة التحرير والنشر المدرسي',
          showPageNumbers: true,
          headerTitle: `${document.metadata.school} - ${document.metadata.subject}`,
          footerTitle: document.metadata.examTitle
        }
      );
    } catch (e) {
      console.error('PDF Engine error:', e);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  // Add Automated MCQ Question Helper
  const handleAddMCQQuestion = () => {
    const currentQuestions = document.pages[activePageIndex].elements.filter(el => el.type === 'text' && (el as any).isQuestion);
    const qNum = currentQuestions.length + 1;
    const newMCQ: EditorElement = {
      id: crypto.randomUUID(),
      type: 'text',
      x: 35,
      y: 350,
      width: 724,
      height: 120,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: 2,
      content: `س${qNum}: اختر الإجابة الصحيحة من بين الخيارات الآتية:`,
      fontSize: 14,
      fontFamily: 'Inter',
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'right',
      isQuestion: true,
      questionNumber: qNum,
      questionType: 'mcq',
      marks: 2,
      options: ['الخيار (أ)', 'الخيار (ب)', 'الخيار (ج)', 'الخيار (د)']
    };
    addElement(activePageIndex, newMCQ);
  };

  // Add Table Helper
  const handleAddTable = () => {
    const tableHTML = `
      <table style="width:100%; border-collapse:collapse; border:2px solid black; text-align:center; font-family:inherit; direction:rtl;">
        <thead>
          <tr style="background:#f1f5f9; font-weight:bold;">
            <th style="border:1px solid black; padding:6px; font-size:12px; width:20%;">رقم</th>
            <th style="border:1px solid black; padding:6px; font-size:12px;">المعطيات المطلوب إكمالها</th>
            <th style="border:1px solid black; padding:6px; font-size:12px; width:25%;">الدرجة</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border:1px solid black; padding:6px; font-size:12px;">1</td>
            <td style="border:1px solid black; padding:6px; font-size:12px;">.........................................</td>
            <td style="border:1px solid black; padding:6px; font-size:12px;">درجتان</td>
          </tr>
          <tr>
            <td style="border:1px solid black; padding:6px; font-size:12px;">2</td>
            <td style="border:1px solid black; padding:6px; font-size:12px;">.........................................</td>
            <td style="border:1px solid black; padding:6px; font-size:12px;">درجتان</td>
          </tr>
        </tbody>
      </table>
    `;

    const newTable: EditorElement = {
      id: crypto.randomUUID(),
      type: 'text',
      x: 50,
      y: 350,
      width: 694,
      height: 120,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: 2,
      content: tableHTML,
      fontSize: 14,
      fontFamily: 'Inter',
      fontWeight: 'normal',
      color: '#000000',
      textAlign: 'center'
    };
    
    addElement(activePageIndex, newTable);
  };

  // Add Image triggers
  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newImage: EditorElement = {
            id: crypto.randomUUID(),
            type: 'image',
            x: 200,
            y: 300,
            width: 220,
            height: 180,
            rotation: 0,
            isLocked: false,
            isHidden: false,
            zIndex: 3,
            src: event.target.result as string
          };
          addElement(activePageIndex, newImage);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add LaTeX math equation block
  const handleAddMath = () => {
    const newMath: EditorElement = {
      id: crypto.randomUUID(),
      type: 'math',
      x: 250,
      y: 320,
      width: 250,
      height: 70,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: 4,
      latex: '\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}',
      fontSize: 20,
      color: '#1e1b4b'
    };
    addElement(activePageIndex, newMath);
  };

  // Physics diagrams vectors (Prism refraction, circuit resistor, force vector)
  const PHYSICS_PRESETS = [
    {
      name: 'منشور زجاجي ومسار الضوء',
      svg: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;"><polygon points="60,15 15,85 105,85" stroke="black" stroke-width="2.5" fill="none"/><line x1="1" y1="65" x2="38" y2="52" stroke="red" stroke-width="2"/><line x1="38" y1="52" x2="82" y2="52" stroke="red" stroke-width="2" stroke-dasharray="2"/><line x1="82" y1="52" x2="119" y2="75" stroke="red" stroke-width="2"/><text x="40" y="42" font-size="9" font-family="sans-serif">A</text></svg>`
    },
    {
      name: 'مقاومة كهربائية وبطارية',
      svg: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;"><rect x="20" y="20" width="80" height="50" rx="3" stroke="black" stroke-width="2" fill="none"/><line x1="50" y1="20" x2="50" y2="10" stroke="black" stroke-width="2"/><line x1="70" y1="20" x2="70" y2="10" stroke="black" stroke-width="2"/><path d="M40 70 L48 65 L56 75 L64 65 L72 75 L80 70" stroke="red" stroke-width="2" fill="none"/><circle cx="50" cy="20" r="3" fill="black"/><circle cx="70" cy="20" r="3" fill="black"/><text x="54" y="60" font-size="9" fill="red">R</text></svg>`
    },
    {
      name: 'قوة مائلة على كتلة',
      svg: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;"><line x1="10" y1="80" x2="110" y2="80" stroke="black" stroke-width="3"/><rect x="40" y="45" width="40" height="35" stroke="black" stroke-width="2" fill="#f1f5f9"/><line x1="60" y1="62" x2="100" y2="32" stroke="blue" stroke-width="2" marker-end="url(#arrow)"/><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 Z" fill="blue"/></marker></defs><text x="85" y="48" font-size="8" fill="blue">F</text></svg>`
    }
  ];

  const handleAddPhysics = (svg: string) => {
    const newPhysics: EditorElement = {
      id: crypto.randomUUID(),
      type: 'physics',
      x: 250,
      y: 350,
      width: 140,
      height: 120,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: 3,
      svgContent: svg,
      strokeColor: '#000000',
      strokeWidth: 2
    };
    addElement(activePageIndex, newPhysics);
  };

  // Mock Question Bank questions
  const BANK_QUESTIONS = [
    { id: 'bq1', subject: 'الفيزياء', grade: 'التاسع الأساسي', text: 'علل ما يأتي: تزداد مقاومة الموصل الفلزي بارتفاع درجة حرارته.', marks: 5 },
    { id: 'bq2', subject: 'الفيزياء', grade: 'التاسع الأساسي', text: 'احسب شدة التيار المار في مقاومة مقدارها 10 أوم عندما يكون فرق الجهد 220 فولت.', marks: 10 },
    { id: 'bq3', subject: 'الرياضيات', grade: 'التاسع الأساسي', text: 'أوجد مجموعة حل المعادلة س² - 5س + 6 = 0 بالتحليل المباشر.', marks: 6 },
    { id: 'bq4', subject: 'الرياضيات', grade: 'التاسع الأساسي', text: 'باستخدام القانون العام، أوجد جذري المعادلة: س² - 4س + 1 = 0.', marks: 8 },
    { id: 'bq5', subject: 'اللغة العربية', grade: 'التاسع الأساسي', text: 'أعرب كلمة (المعلم) في الجملة الآتية: "كاد المعلم أن يكون رسولاً".', marks: 4 },
    { id: 'bq6', subject: 'التربية الإسلامية', grade: 'التاسع الأساسي', text: 'ما هي أركان الإيمان؟ اذكرها بالتفصيل مع بيان أهمية النية.', marks: 5 },
    { id: 'bq7', subject: 'القرآن الكريم', grade: 'التاسع الأساسي', text: 'اكتب من سورة النبأ من قوله تعالى: "عم يتساءلون..." إلى قوله "...وجعلنا السراج وهاجاً".', marks: 10 }
  ];

  const handleAddFromBank = (text: string, marks: number) => {
    addQuestion(activePageIndex, text);
    setShowQuestionBank(false);
  };

  const { launchApplet } = useOS();

  // Toolbar elements rendering data
  const TOOLS = [
    { id: 'add_question', label: 'إضافة سؤال', desc: 'إدراج سريع (< ثوانٍ)', icon: PlusCircle, color: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100/70 border-emerald-200 shadow-sm font-black', action: () => setIsQuickAddOpen(true) },
    { id: 'add_mcq', label: 'سؤال مؤتمت (MCQ)', desc: 'جدول خيارات أ، ب، ج، د', icon: CheckSquare, color: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100/70 border-indigo-200', action: handleAddMCQQuestion },
    { id: 'omr_studio', label: 'محرر OMR', desc: 'تحويل لورقة تظليل مؤتمتة', icon: Grid, color: 'text-purple-600 bg-purple-50 hover:bg-purple-100/70 border-purple-200', action: () => launchApplet('bubble_sheets') },
    { id: 'pages_manager', label: 'إدارة الصفحات', desc: 'ترتيب وعرض الصفحات', icon: Layout, color: 'text-sky-600 bg-sky-50 hover:bg-sky-100/70 border-sky-200', action: () => onOpenPageManager && onOpenPageManager() },
    { id: 'add_image', label: 'إضافة صورة', desc: 'شعار أو رسم توضيحي', icon: ImageIcon, color: 'text-blue-600 bg-blue-50 hover:bg-blue-100/70 border-blue-200', action: triggerImageUpload },
    { id: 'add_table', label: 'إضافة جدول', desc: 'جدول أسئلة متكامل', icon: Table, color: 'text-cyan-600 bg-cyan-50 hover:bg-cyan-100/70 border-cyan-200', action: handleAddTable },
    { id: 'add_math', label: 'معادلة رياضية', desc: 'رموز ومعادلات LaTeX', icon: Calculator, color: 'text-violet-600 bg-violet-50 hover:bg-violet-100/70 border-violet-200', action: handleAddMath },
    { id: 'add_physics', label: 'رسم فيزياء', desc: 'نماذج متجهات ودوائر', icon: Zap, color: 'text-amber-600 bg-amber-50 hover:bg-amber-100/70 border-amber-200', action: () => handleAddPhysics(PHYSICS_PRESETS[0].svg) },
    { id: 'bank', label: 'بنك الأسئلة', desc: 'مكتبة يمنية متكاملة', icon: Search, color: 'text-rose-600 bg-rose-50 hover:bg-rose-100/70 border-rose-200', action: () => onOpenAssetBank ? onOpenAssetBank() : setShowQuestionBank(true) },
    { id: 'templates', label: 'القوالب', desc: 'وزاري، أتمتة، ورقة تظليل', icon: Layout, color: 'text-purple-600 bg-purple-50 hover:bg-purple-100/70 border-purple-200', action: () => setShowTemplates(true) },
    { id: 'settings', label: 'بيانات الامتحان', desc: 'تخصيص كامل الترويسة', icon: Sliders, color: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100/70 border-indigo-200', action: () => setShowSettings(true) },
    { id: 'preview', label: 'مركز الطباعة', desc: 'طباعة فورية / PDF', icon: Eye, color: 'text-slate-700 bg-slate-100 hover:bg-slate-200/80 border-slate-300', action: () => onOpenPrintCenter ? onOpenPrintCenter() : setShowPreview(true) },
    { id: 'pdf', label: 'حفظ PDF', desc: 'تصدير عالي الدقة 300DPI', icon: FileDown, color: 'text-white bg-rose-600 hover:bg-rose-700 border-rose-700 shadow-rose-200 shadow-md', action: () => onOpenPrintCenter ? onOpenPrintCenter() : handleExportPDF() }
  ];

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Primary Desktop Top Bar Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm shrink-0 font-sans select-none z-30 relative" dir="rtl">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-all">
              <ArrowRight size={18} />
            </button>
          )}
          
          {onOpenProjectsList && (
            <button 
              onClick={onOpenProjectsList}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-black transition-all flex items-center gap-1.5"
              title="عرض قائمة مشروعات الامتحانات"
            >
              <FolderOpen size={15} className="text-indigo-600" />
              <span>المشروعات</span>
            </button>
          )}

          {onNewProject && (
            <button 
              onClick={onNewProject}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black transition-all flex items-center gap-1 shadow-sm active:scale-95"
            >
              <Plus size={15} />
              <span>إمتحان جديد</span>
            </button>
          )}

          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>محرر الرقيم</span>
              <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">ذكي ومحلي</span>
            </h1>
          </div>
          <div className="h-6 w-px bg-slate-200"></div>
          <span className="text-xs font-black text-slate-400 max-w-[180px] truncate">
            {document.metadata.school} - {document.metadata.subject}
          </span>
        </div>

        {/* Undo/Redo/Zoom & Save shortcuts */}
        <div className="flex items-center gap-2">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-black transition-all flex items-center gap-1.5 shadow-sm"
              title="لوحة الأوامر السريعة (Ctrl+K)"
            >
              <Search size={15} className="text-indigo-600" />
              <span className="hidden sm:inline">أوامر سريعة</span>
              <kbd className="hidden md:inline-block text-[9px] bg-white text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-200 font-mono">
                Ctrl+K
              </kbd>
            </button>
          )}

          {onOpenFontPicker && (
            <button
              onClick={onOpenFontPicker}
              className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-black transition-all flex items-center gap-1.5"
              title="مكتبة الخطوط وأنماط الطباعة"
            >
              <span className="text-sm font-serif">خط</span>
              <span className="hidden sm:inline">الخطوط</span>
            </button>
          )}

          <button
            onClick={() => {
              saveCurrentDocument(document);
              exportRaqFile(document.id);
            }}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-black transition-all flex items-center gap-1.5"
            title="تصدير مشروع الامتحان بتنسيق .raq"
          >
            <FileDown size={15} className="text-emerald-600" />
            <span>تصدير (.raq)</span>
          </button>

          <button
            onClick={() => {
              saveCurrentDocument(document);
              setSaveSuccess(true);
              setTimeout(() => setSaveSuccess(false), 2000);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              saveSuccess 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
            title="حفظ المشروع في التخزين المستديم"
          >
            {saveSuccess ? (
              <>
                <Check size={15} className="text-white" />
                <span>تم الحفظ</span>
              </>
            ) : (
              <>
                <Save size={15} className="text-[#004B6E]" />
                <span>حفظ</span>
              </>
            )}
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1"></div>

          <button 
            disabled={history.length === 0}
            onClick={undo}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 disabled:opacity-30 transition-all" 
            title="تراجع (Ctrl+Z)"
          >
            <Undo2 size={16} />
          </button>
          <button 
            disabled={future.length === 0}
            onClick={redo}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 disabled:opacity-30 transition-all" 
            title="إعادة (Ctrl+Y)"
          >
            <Redo2 size={16} />
          </button>
          
          <div className="h-4 w-px bg-slate-200 mx-1"></div>

          <button 
            onClick={() => setZoom(Math.max(50, zoom - 10))} 
            className="px-1.5 py-1 text-xs font-black text-slate-600 hover:text-slate-900 transition-colors"
            title="تصغير العرض"
          >
            -
          </button>
          <span 
            onClick={() => setZoom(100)}
            className="text-xs font-black text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer px-2 py-1 rounded-md transition-colors" 
            dir="ltr"
            title="إعادة الضبط إلى 100%"
          >
            {zoom}%
          </span>
          <button 
            onClick={() => setZoom(Math.min(175, zoom + 10))} 
            className="px-1.5 py-1 text-xs font-black text-slate-600 hover:text-slate-900 transition-colors"
            title="تكبير العرض"
          >
            +
          </button>
        </div>
      </header>

      {/* Dynamic Subject-Specific Toolbar */}
      <SubjectToolbar />

      {/* Main Large Tools Control Panel - Floating/Bottom Mobile adaptive */}
      <div className="bg-slate-50 border-b border-slate-200 py-3 px-4 z-20 overflow-x-auto shrink-0 select-none shadow-inner" dir="rtl">
        <div className="flex items-stretch gap-2.5 min-w-max pb-1 md:pb-0">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={tool.action}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all text-right group ${tool.color}`}
              >
                <div className="p-2 rounded-xl bg-white/70 shadow-sm shrink-0">
                  <Icon size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-xs font-black leading-tight">{tool.label}</div>
                  <div className="text-[10px] font-semibold opacity-60 leading-tight mt-0.5">{tool.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* BOTTOM BAR FOR MOBILE LAUNCH */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white shadow-2xl z-40 flex items-center justify-around py-2.5 px-4">
        {TOOLS.slice(0, 5).map((tool) => {
          const Icon = tool.icon;
          return (
            <button 
              key={tool.id} 
              onClick={tool.action} 
              className="flex flex-col items-center gap-1 text-slate-600 hover:text-indigo-600 active:scale-95 transition-all"
            >
              <div className="p-1.5 rounded-xl bg-slate-50">
                <Icon size={18} />
              </div>
              <span className="text-[9px] font-extrabold">{tool.label}</span>
            </button>
          );
        })}
        <button 
          onClick={() => setShowSettings(true)}
          className="flex flex-col items-center gap-1 text-slate-600 hover:text-indigo-600 active:scale-95 transition-all"
        >
          <div className="p-1.5 rounded-xl bg-indigo-50 text-indigo-600">
            <Sliders size={18} />
          </div>
          <span className="text-[9px] font-extrabold">بيانات الترويسة</span>
        </button>
      </div>

      {/* MODAL 1: Exam Info Settings */}
      {showSettings && <ExamSettingsDialog onClose={() => setShowSettings(false)} />}

      {/* MODAL 2: Question Bank Panel (لوحة بنك الأسئلة الصغيرة الذكية) */}
      {showQuestionBank && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans" dir="rtl">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-slate-100">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-black text-slate-800 text-lg">بنك الأسئلة المحلي الذكي</h3>
                <p className="text-[11px] font-semibold text-slate-400">اختر السؤال ليُضاف فوراً بموقعه المناسب</p>
              </div>
              <button onClick={() => setShowQuestionBank(false)} className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Filters bar */}
            <div className="p-4 bg-slate-50/50 border-b border-slate-100 space-y-3">
              <div className="relative">
                <Search className="absolute right-3 top-2.5 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="ابحث بالكلمات الدليلة (مثال: مقاومة، معادلة)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pr-9 pl-4 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {['الكل', 'الفيزياء', 'الرياضيات', 'اللغة العربية', 'التربية الإسلامية', 'القرآن الكريم'].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSubjectFilter(sub)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold shrink-0 transition-all ${
                      subjectFilter === sub 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="p-4 overflow-y-auto custom-scrollbar space-y-2.5 flex-1 max-h-[40vh]">
              {BANK_QUESTIONS.filter(q => {
                const matchesSearch = q.text.includes(searchQuery);
                const matchesSubject = subjectFilter === 'الكل' || q.subject === subjectFilter;
                return matchesSearch && matchesSubject;
              }).map(q => (
                <div 
                  key={q.id} 
                  onClick={() => handleAddFromBank(q.text, q.marks)}
                  className="p-3 border border-slate-100 hover:border-indigo-400 bg-white hover:bg-indigo-50/10 rounded-2xl cursor-pointer transition-all flex flex-col gap-2 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full">{q.subject} - {q.grade}</span>
                    <span className="text-[10px] font-bold text-rose-600">[{q.marks} درجات]</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed text-right">{q.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Templates Selector */}
      {showTemplates && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans" dir="rtl">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col border border-slate-100">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-black text-slate-800 text-base">نماذج وقوالب الامتحانات</h3>
                <p className="text-[11px] font-semibold text-slate-400">تغيير تصميم الورقة والترويسة بكبسة زر</p>
              </div>
              <button onClick={() => setShowTemplates(false)} className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 space-y-3 max-h-[65vh] overflow-y-auto custom-scrollbar">
              {/* Template cards */}
              <div 
                onClick={() => {
                  updateMetadata({ templateType: 'ministerial' });
                  setShowTemplates(false);
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between hover:shadow-md ${
                  document.metadata.templateType === 'ministerial' 
                    ? 'border-indigo-600 bg-indigo-50/20' 
                    : 'border-slate-100 hover:border-indigo-200'
                }`}
              >
                <div className="text-right">
                  <div className="text-xs font-black text-slate-800">قالب وزارة التربية والتعليم اليمني (التقليدي)</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-semibold">ترويسة ثنائية الحدود، صندوق درجات، قسيمة قص مخصصة</div>
                </div>
                {document.metadata.templateType === 'ministerial' && <Check className="text-indigo-600" size={18} />}
              </div>

              <div 
                onClick={() => {
                  updateMetadata({ templateType: 'automated' });
                  setShowTemplates(false);
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between hover:shadow-md ${
                  document.metadata.templateType === 'automated' 
                    ? 'border-indigo-600 bg-indigo-50/20' 
                    : 'border-slate-100 hover:border-indigo-200'
                }`}
              >
                <div className="text-right">
                  <div className="text-xs font-black text-slate-800">قالب امتحانات الأتمتة الوزارية (OMR Questions)</div>
                  <div className="text-[10px] text-slate-500 mt-1 font-semibold">نموذج أتمتة مع علامات OMR وتعليمات التظليل ورمز النموذج (أ، ب، ج، د)</div>
                </div>
                {document.metadata.templateType === 'automated' && <Check className="text-indigo-600" size={18} />}
              </div>

              <div 
                onClick={() => {
                  updateMetadata({ templateType: 'bubblesheet' });
                  setShowTemplates(false);
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between hover:shadow-md ${
                  document.metadata.templateType === 'bubblesheet' 
                    ? 'border-indigo-600 bg-indigo-50/20' 
                    : 'border-slate-100 hover:border-indigo-200'
                }`}
              >
                <div className="text-right">
                  <div className="text-xs font-black text-slate-800">ورقة التظليل والإجابة المؤتمتة (Bubble Sheet)</div>
                  <div className="text-[10px] text-slate-500 mt-1 font-semibold">ورقة إجابة OMR مخصصة للآلات الضوئية لـ 50 سؤالاً مع رقم الجلوس</div>
                </div>
                {document.metadata.templateType === 'bubblesheet' && <Check className="text-indigo-600" size={18} />}
              </div>

              <div 
                onClick={() => {
                  updateMetadata({ templateType: 'private' });
                  setShowTemplates(false);
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between hover:shadow-md ${
                  document.metadata.templateType === 'private' 
                    ? 'border-indigo-600 bg-indigo-50/20' 
                    : 'border-slate-100 hover:border-indigo-200'
                }`}
              >
                <div className="text-right">
                  <div className="text-xs font-black text-slate-800">قالب المدارس الخاصة والأهلية</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-semibold">تصميم عصري ملون، بطاقة ترويسة، خطوط ناعمة</div>
                </div>
                {document.metadata.templateType === 'private' && <Check className="text-indigo-600" size={18} />}
              </div>

              <div 
                onClick={() => {
                  updateMetadata({ templateType: 'none' });
                  setShowTemplates(false);
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between hover:shadow-md ${
                  document.metadata.templateType === 'none' 
                    ? 'border-indigo-600 bg-indigo-50/20' 
                    : 'border-slate-100 hover:border-indigo-200'
                }`}
              >
                <div className="text-right">
                  <div className="text-xs font-black text-slate-800">بدون ترويسة (مسودة حرة)</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-semibold">مساحة بيضاء كاملة لتخطيط وتأليف الأسئلة بحرية</div>
                </div>
                {document.metadata.templateType === 'none' && <Check className="text-indigo-600" size={18} />}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Fullscreen Print Preview Overlay */}
      {showPreview && (
        <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col font-sans" dir="rtl">
          <div className="h-14 bg-slate-800 text-white px-6 flex items-center justify-between shadow-lg select-none">
            <div className="flex items-center gap-2">
              <h3 className="font-black text-sm">شاشة معاينة الطباعة النهائية</h3>
              <span className="text-[10px] bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded font-bold">بدقة 300 DPI</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleExportPDF}
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
              >
                تنزيل ملف PDF فوراً
              </button>
              <button 
                onClick={() => setShowPreview(false)} 
                className="p-1.5 hover:bg-slate-700 rounded-xl text-slate-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-slate-950 p-6 flex justify-center items-start">
            <div className="bg-white shadow-2xl p-4 rounded-lg scale-90 origin-top">
              {/* Target the actual page render perfectly */}
              <div 
                style={{ width: '794px', height: '1123px' }}
                className="bg-white relative overflow-hidden"
                dangerouslySetInnerHTML={{ 
                  __html: window.document.getElementById(`exam-canvas-page-${activePageIndex}`)?.innerHTML || '' 
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Quick Add Question Dialog */}
      <QuickAddQuestionDialog 
        isOpen={isQuickAddOpen} 
        onClose={() => setIsQuickAddOpen(false)} 
      />
    </>
  );
};
