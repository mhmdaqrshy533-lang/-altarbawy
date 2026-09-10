import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, School, BookOpen, User, Plus, Minus, FileText, CheckCircle2, 
  Settings, Save, Printer, Download, Search, LayoutTemplate, 
  Type, CheckSquare, List, GripVertical, Image as ImageIcon,
  Calculator, AlignRight, Trash2, Edit3, AlertCircle, Copy, Shuffle,
  Book, PenTool, Mic, Volume2, Brain, Columns, Map, Table, FlaskConical, Shapes, HelpCircle, FilePlus2,
  Zap, Eye, Activity, LineChart, FunctionSquare, LayoutDashboard
} from 'lucide-react';

import PhysicsEditor from '../components/PhysicsEditor';
import MathEditor from '../components/MathEditor';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

type ExamTemplate = 'ministerial' | 'government' | 'private' | 'monthly' | 'unified' | 'certificate' | 'model' | 'stem' | 'international' | 'academy' | 'minimal_white' | 'elegant_blue' | 'emerald_edu' | 'royal_purple' | 'dark_pro' | string;

const TEMPLATES = [
  { id: 'ministerial', name: 'وزاري يمني كلاسيكي', type: 'وزاري', desc: 'للاختبارات النهائية الرسمية' },
  { id: 'ministerial_modern', name: 'وزاري حديث', type: 'وزاري', desc: 'تصميم وزاري عصري' },
  { id: 'government', name: 'حكومي', type: 'حكومي', desc: 'للمدارس الحكومية والأساسية' },
  { id: 'private', name: 'مدارس خاصة', type: 'خاص', desc: 'ألوان المدرسة والشعار الخاص' },
  { id: 'math_template', name: 'قالب رياضيات', type: 'رياضيات', desc: 'مخصص للمعادلات والرسوم البيانية' },
  { id: 'physics_template', name: 'قالب فيزياء', type: 'فيزياء', desc: 'للرسوم البيانية والدوائر الكهربائية' },
  { id: 'economic_print', name: 'قالب اقتصادي للطباعة', type: 'طباعة', desc: 'أصغر خط ومسافات مضغوطة لتوفير الورق' },
  { id: 'black_white', name: 'قالب أبيض وأسود', type: 'طباعة', desc: 'توفير الحبر وتصوير دقيق' },
  { id: 'colorful_template', name: 'قالب ملون', type: 'حديث', desc: 'للفصول المبكرة والتحفيز' }
];

const THEMES = {
  slate: { primary: 'border-slate-800', text: 'text-slate-900', bg: 'bg-slate-50', name: 'أسود ملكي' },
  blue: { primary: 'border-blue-800', text: 'text-blue-900', bg: 'bg-blue-50', name: 'أزرق وزاري' },
  emerald: { primary: 'border-emerald-800', text: 'text-emerald-950', bg: 'bg-emerald-50', name: 'أخضر تعليمي' },
  purple: { primary: 'border-purple-800', text: 'text-purple-950', bg: 'bg-purple-50', name: 'بنفسجي حديث' },
  rose: { primary: 'border-rose-900', text: 'text-rose-950', bg: 'bg-rose-50', name: 'أحمر قرمزي' },
  amber: { primary: 'border-amber-700', text: 'text-amber-950', bg: 'bg-amber-50', name: 'ذهبي رسمي' },
  gray: { primary: 'border-gray-600', text: 'text-gray-900', bg: 'bg-gray-50', name: 'رمادي احترافي' },
  teal: { primary: 'border-teal-800', text: 'text-teal-950', bg: 'bg-teal-50', name: 'تركواز' },
  indigo: { primary: 'border-indigo-800', text: 'text-indigo-950', bg: 'bg-indigo-50', name: 'نيلي' },
};

type ExamModel = 'أ' | 'ب' | 'ج' | 'د';

type ExamData = {
  // Institutional
  governorate: string;
  directorate: string;
  uzlah: string;
  school: string;
  // Exam metadata
  year: string;
  semester: string;
  session: string;
  subject: string;
  grade: string;
  section: string;
  time: string;
  score: number;
  model: ExamModel;
  template: ExamTemplate;
  themeColor: string;
  // Teacher
  teacherName: string;
  jobTitle: string;
  // Logo
  logoData?: string;
};

type QuestionType = 'mcq' | 'tf' | 'fill' | 'essay' | 'match' | 'order' | 'table' | 'image' | 'math' | 'reading' | 'grammar' | 'expression' | 'calligraphy' | 'dictation' | 'verses' | 'tajweed' | 'definition' | 'reasoning' | 'comparison' | 'map' | 'experiment' | 'page_break' | 'circuit' | 'optics' | 'mechanics' | 'graph' | 'physics_equation';

interface Question {
  id: string;
  type: QuestionType;
  text: string;
  score: number;
  difficulty: 'سهل' | 'متوسط' | 'صعب' | 'متميز';
  objective: string;
  options?: string[];
  correctAnswer?: string;
  notes?: string;
  physicsElements?: any[];
  latexData?: string;
  tableConfig?: { rows: number; cols: number; hasHeader: boolean };
}

const subjectToolbox: Record<string, { type: QuestionType, label: string, icon: any }[]> = {
  'اللغة العربية': [
    { type: 'reading', label: 'قطعة قراءة', icon: BookOpen },
    { type: 'grammar', label: 'إعراب', icon: PenTool },
    { type: 'expression', label: 'تعبير', icon: FileText },
    { type: 'calligraphy', label: 'خط', icon: Edit3 },
    { type: 'dictation', label: 'إملاء', icon: Mic },
    { type: 'mcq', label: 'اختيار متعدد', icon: CheckSquare },
    { type: 'essay', label: 'أسئلة مقالية', icon: AlignRight },
  ],
  'القرآن الكريم': [
    { type: 'verses', label: 'كتابة آيات', icon: Book },
    { type: 'tajweed', label: 'أحكام تجويد', icon: Volume2 },
    { type: 'order', label: 'ترتيب كلمات', icon: GripVertical },
    { type: 'essay', label: 'استنباط', icon: Brain },
    { type: 'match', label: 'توصيل', icon: List },
  ],
  'الاجتماعيات': [
    { type: 'tf', label: 'صح وخطأ', icon: CheckCircle2 },
    { type: 'definition', label: 'تعريفات', icon: FileText },
    { type: 'reasoning', label: 'علل', icon: HelpCircle },
    { type: 'comparison', label: 'مقارنة', icon: Columns },
    { type: 'map', label: 'خرائط', icon: Map },
    { type: 'match', label: 'توصيل', icon: List },
  ],
  'الرياضيات': [
    { type: 'math', label: 'معادلات', icon: Calculator },
    { type: 'table', label: 'جداول', icon: Table },
    { type: 'image', label: 'رسوم هندسية', icon: Shapes },
    { type: 'mcq', label: 'اختيار متعدد', icon: CheckSquare },
  ],
  'الفيزياء': [
    { type: 'circuit', label: 'دائرة كهربائية', icon: Zap },
    { type: 'optics', label: 'بصريات', icon: Eye },
    { type: 'mechanics', label: 'ميكانيكا', icon: Activity },
    { type: 'graph', label: 'رسم بياني', icon: LineChart },
    { type: 'physics_equation', label: 'معادلة', icon: FunctionSquare },
    { type: 'mcq', label: 'اختيار متعدد', icon: CheckSquare },
    { type: 'tf', label: 'صح وخطأ', icon: CheckCircle2 },
    { type: 'table', label: 'جدول مقارنة', icon: Table },
    { type: 'reasoning', label: 'علل', icon: HelpCircle },
  ],
  'العلوم': [
    { type: 'image', label: 'صور ورسومات', icon: ImageIcon },
    { type: 'table', label: 'جداول', icon: Table },
    { type: 'experiment', label: 'تجارب', icon: FlaskConical },
    { type: 'mcq', label: 'اختيار متعدد', icon: CheckSquare },
    { type: 'reasoning', label: 'علل', icon: HelpCircle },
  ]
};

const defaultToolbox: { type: QuestionType, label: string, icon: any }[] = [
  { type: 'mcq', label: 'اختيار متعدد', icon: CheckSquare },
  { type: 'tf', label: 'صح وخطأ', icon: CheckCircle2 },
  { type: 'fill', label: 'أكمل الفراغ', icon: Type },
  { type: 'essay', label: 'سؤال مقالي', icon: AlignRight },
  { type: 'match', label: 'وصل', icon: List },
  { type: 'table', label: 'جدول', icon: Table },
  { type: 'image', label: 'صورة', icon: ImageIcon },
  { type: 'page_break', label: 'فاصل صفحات', icon: FilePlus2 },
];

const MiniExamPreview = ({ type, templateId, themeColor, logoData }: { type: string, templateId: string, themeColor: string, logoData?: string }) => {
  const currentTheme = THEMES[themeColor as keyof typeof THEMES] || THEMES.slate;
  
  return (
    <div className={`w-full h-full bg-slate-50 shadow-sm border rounded-sm flex flex-col items-center overflow-hidden relative ${currentTheme.primary.replace('border-', 'border-opacity-20 border-')}`}>
      <div 
        className={`origin-top flex flex-col bg-white w-[210mm] min-h-[297mm] shadow-2xl ${currentTheme.text} ${currentTheme.primary}`}
        style={{ transform: 'scale(0.24)', padding: '15mm' }}
      >
        {/* Header Section */}
        {templateId === 'ministerial' || templateId === 'ministerial_modern' ? (
          <div className="flex justify-between items-stretch border-2 mb-2 font-serif rounded-sm border-inherit overflow-hidden">
            <div className="w-[35%] p-2 flex flex-col justify-start leading-tight font-bold text-[9px] border-l-2 border-inherit">
              <p className="text-[11px] mb-1">الجمهورية اليمنية</p>
              <p>وزارة التربية والتعليم والبحث العلمي</p>
              <p>قطاع المناهج والتوجيه</p>
              <p>مكتب التربية ب{type === 'الرياضيات' ? 'تعز' : 'المحافظة'}</p>
              <p>مدرسة: ...........................</p>
            </div>
            <div className="w-[30%] flex flex-col items-center justify-center p-1">
              <img src={logoData || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Emblem_of_Yemen.svg/200px-Emblem_of_Yemen.svg.png"} className="h-10 object-contain mb-1" />
              <div className="w-full border rounded-sm p-0.5 text-center border-inherit bg-black/5">
                <div className="font-bold text-[8px] leading-none">إدارة التقويم والامتحانات</div>
              </div>
              <div className="font-bold text-[9px] mt-1">اختبار {type}</div>
            </div>
            <div className="w-[35%] p-2 flex flex-col justify-between text-[9px] border-r-2 border-inherit">
              <div className="flex items-center gap-1 border-b border-dotted border-inherit">الاسم: ...........................</div>
              <div className="flex items-center gap-1 border-b border-dotted border-inherit mt-1">رقم الجلوس: ..................</div>
              <div className="flex items-center justify-between mt-1">
                <span>الصف: ............</span>
                <span>الشعبة: ............</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center border-b-2 pb-4 mb-4 border-inherit">
             <div className="w-12 h-12 rounded-full bg-slate-100 mb-2 border border-inherit"></div>
             <div className="h-4 bg-slate-100 rounded w-48 mb-2"></div>
             <div className="h-3 bg-slate-100 rounded w-32"></div>
          </div>
        )}

        {/* Ministerial Sub-bar */}
        {(templateId === 'ministerial' || templateId === 'ministerial_modern') && (
           <div className="flex border-2 mb-2 font-serif text-[9px] font-bold border-inherit bg-black/5">
              <div className="w-6 border-l-2 border-inherit flex items-center justify-center">س</div>
              <div className="flex-1 p-1 text-center border-l-2 border-inherit">أجب عن جميع الأسئلة</div>
              <div className="w-6 flex items-center justify-center">د</div>
           </div>
        )}
        
        {/* Body content placeholders */}
        <div className="flex-1 mt-2 border-2 border-t-0 border-inherit">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-stretch border-t-2 border-inherit">
              <div className="w-6 border-l-2 border-inherit flex items-center justify-center text-[10px] font-bold">{i}</div>
              <div className="flex-1 p-2 space-y-2">
                <div className="h-2 bg-slate-100 rounded w-full"></div>
                <div className="h-2 bg-slate-100 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center text-[8px] font-bold opacity-50">
           <div>تطبيق الرقيم التعليمي</div>
           <div>الصفحة 1 من 2</div>
        </div>
      </div>
    </div>
  );
};


import { taizAdminData, taizDistricts } from '../data/taizAdminData';

export default function ExamStudio({ onBack }: { onBack: () => void }) {
  const [showWizard, setShowWizard] = useState(true);
  const [wizardStep, setWizardStep] = useState<1 | 2>(1);
  
  const [examData, setExamData] = useState<ExamData>({
    governorate: 'تعز',
    directorate: 'التعزية',
    uzlah: 'الجندية العليا',
    school: 'مدرسة اليرموك النموذجية',
    year: '2026/2027',
    semester: 'الأول',
    session: 'نهاية الفصل',
    subject: 'الرياضيات',
    grade: 'الصف التاسع',
    section: 'أ',
    time: 'ساعتان',
    score: 50,
    model: 'أ',
    template: 'الوزاري اليمني الكلاسيكي',
    themeColor: 'slate',
    teacherName: 'أ.عبدالقوي سيف محمد',
    jobTitle: 'معلم أول',
    logoData: ''
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [showQuestionTypes, setShowQuestionTypes] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [physicsEditorOpen, setPhysicsEditorOpen] = useState(false);
  const [physicsEditorQuestionId, setPhysicsEditorQuestionId] = useState<string | null>(null);
  const [physicsEditorInitialCategory, setPhysicsEditorInitialCategory] = useState<string>('electricity');
  
  const [mathEditorOpen, setMathEditorOpen] = useState(false);
  const [mathEditorQuestionId, setMathEditorQuestionId] = useState<string | null>(null);
  const [mathEditorInitialLatex, setMathEditorInitialLatex] = useState<string>('');

  const [tableConfigOpen, setTableConfigOpen] = useState(false);
  const [tempTableConfig, setTempTableConfig] = useState({ rows: 3, cols: 2, hasHeader: true });
  const [zoom, setZoom] = useState(1);

  // Auto-fill institutional & teacher data from local storage
  useEffect(() => {
    const savedData = localStorage.getItem('mistar_inst_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        let updatedDirectorate = parsed.directorate;
        let updatedUzlah = parsed.uzlah;
        
        if (!taizDistricts.includes(updatedDirectorate)) {
          updatedDirectorate = 'التعزية';
        }
        
        const validUzlahs = taizAdminData[updatedDirectorate as keyof typeof taizAdminData] || [];
        if (!validUzlahs.includes(updatedUzlah)) {
          updatedUzlah = validUzlahs[0] || '';
        }
        
        setExamData(prev => ({ 
          ...prev, 
          ...parsed, 
          governorate: 'تعز',
          directorate: updatedDirectorate,
          uzlah: updatedUzlah
        }));
      } catch (e) {}
    }
  }, []);

  const totalScore = useMemo(() => questions.reduce((sum, q) => sum + q.score, 0), [questions]);
  const isScoreExceeded = totalScore > examData.score;
  const isScoreIncomplete = totalScore > 0 && totalScore < examData.score;

  const handleNextStep = () => {
    if (wizardStep < 2) {
      setWizardStep(2);
    } else {
      // Save data for future
      localStorage.setItem('mistar_inst_data', JSON.stringify({
        governorate: 'تعز',
        directorate: examData.directorate,
        uzlah: examData.uzlah,
        school: examData.school,
        teacherName: examData.teacherName,
        jobTitle: examData.jobTitle,
        logoData: examData.logoData
      }));
      setShowWizard(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setExamData(prev => ({ ...prev, logoData: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    // Inject metadata into document for PDF print (works best in Chrome's Save as PDF)
    const originalTitle = document.title;
    const docId = `${examData.year.replace('/', '')}${examData.grade.length}`;
    document.title = `اختبار_${examData.subject}_${examData.grade}_V1.0_ID${docId}`;
    
    // Add meta tags temporarily
    const metaAuthor = document.createElement('meta');
    metaAuthor.name = 'author';
    metaAuthor.content = 'محرر الرقيم - م.سهيل الهزبري';
    document.head.appendChild(metaAuthor);
    
    window.print();
    
    // Restore
    document.title = originalTitle;
    document.head.removeChild(metaAuthor);
  };
  const handleSave = () => {
    setIsSaving(true);
    // Simulate smart save to local DB
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  const addQuestion = (type: QuestionType) => {
    if (type === 'table') {
      setTableConfigOpen(true);
      setShowQuestionTypes(false);
      return;
    }

    const newQ: Question = {
      id: crypto.randomUUID(),
      type,
      text: '',
      score: 1,
      difficulty: 'متوسط',
      objective: 'تذكر'
    };
    if (type === 'mcq') newQ.options = ['أ', 'ب', 'ج', 'د'];
    if (type === 'tf') newQ.options = ['صح', 'خطأ'];
    
    setQuestions([...questions, newQ]);
    setSelectedQuestionId(newQ.id);
    setShowQuestionTypes(false);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    if (selectedQuestionId === id) setSelectedQuestionId(null);
  };

  const generateAlternativeModel = () => {
    const shuffled = [...questions].map(q => {
      const newQ = { ...q, id: crypto.randomUUID() };
      if (newQ.options) {
         newQ.options = [...newQ.options].sort(() => Math.random() - 0.5);
      }
      return newQ;
    }).sort(() => Math.random() - 0.5);
    
    setQuestions(shuffled);
    setExamData(prev => ({ 
      ...prev, 
      model: prev.model === 'أ' ? 'ب' : prev.model === 'ب' ? 'ج' : 'أ' 
    }));
  };

  const activeToolbox = useMemo(() => {
    const specific = subjectToolbox[examData.subject] || [];
    const others = defaultToolbox.filter(d => !specific.find(s => s.type === d.type));
    return [...specific, ...others];
  }, [examData.subject]);

  const pages = useMemo(() => {
    const result: { id: string; questions: (Question & { qIndex: number })[] }[] = [];
    let current: (Question & { qIndex: number })[] = [];
    let currentId = 'first';
    let globalQIndex = 1;
    
    questions.forEach(q => {
        if (q.type === 'page_break') {
            result.push({ id: currentId, questions: current });
            currentId = q.id;
            current = [];
        } else {
            current.push({ ...q, qIndex: globalQIndex++ });
        }
    });
    result.push({ id: currentId, questions: current });
    return result;
  }, [questions]);

  const currentTheme = THEMES[examData.themeColor as keyof typeof THEMES] || THEMES.slate;

  return (
    <div className="h-screen bg-[#f3f4f6] text-slate-900 font-sans flex flex-col overflow-hidden" dir="rtl">
      {/* Top Navbar */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-20 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
            <ArrowRight size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white">
              <FileText size={16} />
            </div>
            <div>
              <h1 className="font-bold text-sm text-slate-800">Raqeem Exam Studio</h1>
              <p className="text-[10px] text-slate-500">محرر الامتحانات الاحترافي - Zero Typing</p>
            </div>
          </div>
        </div>
        
        {!showWizard && (
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 rounded-lg p-1 mx-2">
              <button onClick={() => setZoom(z => Math.min(z + 0.1, 2))} className="p-1 hover:bg-white rounded text-slate-600 shadow-sm" title="تكبير">
                <Plus size={14} />
              </button>
              <span className="text-xs font-bold w-10 text-center text-slate-600">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))} className="p-1 hover:bg-white rounded text-slate-600 shadow-sm" title="تصغير">
                <Minus size={14} />
              </button>
            </div>
            <button onClick={generateAlternativeModel} className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-2 transition-colors">
              <Shuffle size={14} /> إنشاء نموذج {examData.model === 'أ' ? 'ب' : 'أ'}
            </button>
            <button onClick={handlePrint} className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-2 transition-colors border-r border-slate-200 pl-2" title="الطباعة المباشرة">
              <Printer size={14} /> طباعة
            </button>
            <button onClick={() => { alert('للحفاظ على جودة الرسومات العالية (SVG) ولتضمين بيانات الحقوق، نرجو استخدام خيار الطباعة ثم اختيار "Save as PDF" من المتصفح.'); handlePrint(); }} className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-2 transition-colors" title="حفظ كملف PDF">
              <Download size={14} /> PDF
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg flex items-center gap-2 transition-colors shadow-sm disabled:opacity-70 mr-2"
            >
              {isSaving ? (
                <>يتم الأرشفة...</>
              ) : (
                <><Save size={14} /> حفظ في البنك</>
              )}
            </button>
          </div>
        )}
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {!showWizard && (
          <>
            {/* Left Sidebar: Toolbox (Contextual to Subject) */}
            <aside className="w-16 md:w-64 bg-white border-l border-slate-200 flex flex-col items-center md:items-start z-10 shrink-0 overflow-y-auto custom-scrollbar">
              <div className="p-4 w-full border-b border-slate-100 hidden md:flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-500 uppercase">مكتبة العناصر</h3>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{examData.subject}</span>
              </div>
              <div className="p-2 md:p-3 w-full flex flex-col gap-1 md:gap-2">
                {activeToolbox.map(tool => (
                  <ToolboxItem key={tool.type} icon={tool.icon} label={tool.label} onClick={() => addQuestion(tool.type)} />
                ))}
              </div>
            </aside>

            {/* Middle: A4 Canvas */}
            <main className="flex-1 bg-slate-100/50 overflow-y-auto p-4 md:p-12 flex flex-col items-center custom-scrollbar relative">
              
              {/* Workspace Background Grid (Only visible in editor) */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] print:hidden" 
                   style={{ 
                     backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                     backgroundSize: '20px 20px' 
                   }} 
              />
              
              {/* Grading Engine Warning */}
              <AnimatePresence>
                {isScoreExceeded && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="w-full max-w-[210mm] mb-4 bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-between text-red-800 text-sm shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle size={16} className="text-red-500 shrink-0" />
                      <div>
                        <span className="font-bold">تنبيه:</span> مجموع درجات الأسئلة ({totalScore}) يتجاوز الدرجة النهائية للاختبار ({examData.score}).
                      </div>
                    </div>
                  </motion.div>
                )}
                {isScoreIncomplete && !isScoreExceeded && (
                   <motion.div 
                   initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                   className="w-full max-w-[210mm] mb-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-amber-800 text-sm shadow-sm"
                 >
                   <div className="flex items-center gap-3">
                     <AlertCircle size={16} className="text-amber-500 shrink-0" />
                     <div>
                       <span className="font-bold">ملاحظة:</span> مجموع الدرجات الحالي ({totalScore}) أقل من الدرجة النهائية ({examData.score}). متبقي ({examData.score - totalScore}) درجات.
                     </div>
                   </div>
                 </motion.div>
                )}
                {totalScore > 0 && totalScore === examData.score && (
                   <motion.div 
                   initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                   className="w-full max-w-[210mm] mb-4 bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-emerald-800 text-sm shadow-sm"
                 >
                   <div className="flex items-center gap-3">
                     <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                     <div>
                       <span className="font-bold">ممتاز:</span> توزيع الدرجات مكتمل ومطابق للدرجة النهائية ({examData.score}).
                     </div>
                   </div>
                 </motion.div>
                )}
              </AnimatePresence>

              {/* AI Suggestion */}
              <AnimatePresence>
                {questions.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="w-full max-w-[210mm] mb-4 bg-violet-50 border border-violet-100 rounded-xl p-3 flex items-start gap-3 text-violet-800 text-sm shadow-sm"
                  >
                    <div className="mt-0.5"><CheckCircle2 size={16} className="text-violet-500" /></div>
                    <div className="flex-1">
                      <span className="font-bold">اقتراح ذكي:</span> توجد 326 سؤالاً سابقاً لمادة {examData.subject} للصف {examData.grade}. هل ترغب بتوليد الاختبار منها تلقائياً؟
                    </div>
                    <button className="text-xs bg-violet-200 hover:bg-violet-300 text-violet-900 px-3 py-1.5 rounded-lg font-bold transition-colors shrink-0">
                      توليد تلقائي
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div 
                className="flex flex-col items-center transition-transform duration-200"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
              >
              {pages.map((page, pageIndex) => (
                <div 
                  key={page.id} 
                  className={`w-[210mm] bg-white shadow-2xl border min-h-[297mm] rounded-sm relative print:shadow-none print:w-[210mm] print:h-[297mm] print:m-0 mb-12 print:mb-0 break-after-page flex flex-col print:overflow-hidden print:box-border ${currentTheme.primary}`}
                  style={{
                    paddingTop: '25mm',
                    paddingBottom: '20mm',
                    paddingLeft: '15mm',
                    paddingRight: '15mm'
                  }}
                >
                  
                  {pageIndex > 0 && (
                    <div className="absolute -top-12 left-0 right-0 flex justify-between items-center print:hidden">
                      <span className="text-sm font-bold text-slate-500">فاصل صفحات</span>
                      <button 
                        onClick={() => removeQuestion(page.id)} 
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold hover:bg-red-200 transition-colors"
                      >
                        حذف فاصل الصفحات
                      </button>
                    </div>
                  )}

                  {/* Header Engine */}
                  {pageIndex === 0 ? (
                    <>
                      {examData.template === 'وزاري يمني كلاسيكي' ? (
                        <div className={`flex flex-col mb-4 font-serif rounded-sm ${examData.themeColor === 'blue' ? 'text-blue-900 border-blue-800' : examData.themeColor === 'rose' ? 'text-rose-950 border-rose-900' : examData.themeColor === 'emerald' ? 'text-emerald-950 border-emerald-800' : 'text-slate-900 border-slate-800'}`}>
                          
                          {/* Secret Number & Student Info Top Bar */}
                          <div className={`w-full flex items-center justify-between border-2 border-b-0 rounded-t-sm print:bg-white text-[12px] font-bold ${examData.themeColor === 'blue' ? 'border-blue-800 bg-blue-50/50' : examData.themeColor === 'rose' ? 'border-rose-900 bg-rose-50/50' : examData.themeColor === 'emerald' ? 'border-emerald-800 bg-emerald-50/50' : 'border-slate-800 bg-slate-50/50'}`}>
                            <div className="w-[120px] p-2 text-center border-l-2 border-inherit whitespace-nowrap">
                              الرقم السري: ( ............ )
                            </div>
                            <div className="flex-1 p-2 text-right">
                              اسم الطالب رباعياً / ..........................................................................................
                            </div>
                            <div className="w-[120px] p-2 text-center border-r-2 border-inherit whitespace-nowrap">
                              رقم الجلوس: ( ............ )
                            </div>
                          </div>

                          {/* Cut Line */}
                          <div className="flex items-center justify-center overflow-hidden border-x-2 border-inherit text-[9px] opacity-60">
                             <span className="whitespace-nowrap">قـــص هنـــــــاء - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - قـــص هنـــــــاء</span>
                          </div>

                          {/* Main Header Box */}
                          <div className="flex justify-between items-stretch border-2 rounded-b-sm border-inherit overflow-hidden">
                            
                            {/* Right: Ministry Info */}
                            <div className="w-[30%] p-2 flex flex-col justify-start leading-tight font-bold text-[12px] border-l-2 border-inherit">
                              <p>وزارة التربية والتعليم</p>
                              <p>مكتب التربية والتعليم بمحافظة/ {examData.governorate}</p>
                              <p>إدارة التربية والتعليم مديرية/ {examData.directorate}</p>
                              <p>مدرسة/ {examData.school}</p>
                            </div>
                            
                            {/* Center: Logo & Title */}
                            <div className="w-[40%] flex flex-col items-center justify-between p-2 pt-1 pb-1">
                              <div className="flex-1 flex items-center justify-center mb-1">
                                <img 
                                  src={examData.logoData || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Emblem_of_Yemen.svg/200px-Emblem_of_Yemen.svg.png"} 
                                  alt="شعار المؤسسة" 
                                  className="h-16 object-contain"
                                  style={{ filter: !examData.logoData ? 'grayscale(100%) contrast(1.2)' : 'none' }}
                                  crossOrigin="anonymous"
                                />
                              </div>
                              <div className="font-bold text-[13px] leading-tight text-center w-full">
                                اختبار {examData.session} لعام {examData.year}
                              </div>
                            </div>
                            
                            {/* Left: Exam Details */}
                            <div className="w-[30%] p-2 flex flex-col justify-between leading-tight font-bold text-[13px] border-r-2 border-inherit">
                              <div className="flex gap-1"><span>الصف :</span> <span>{examData.grade}</span></div>
                              <div className="flex gap-1"><span>المادة :</span> <span>{examData.subject}</span></div>
                              <div className="flex gap-1"><span>التاريخ :</span> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
                              <div className="flex gap-1"><span>الزمن :</span> <span>{examData.time}</span></div>
                              <div className="flex gap-1"><span>النموذج :</span> <span>{examData.model}</span></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={`flex justify-between items-start border-b-2 pb-4 mb-6 font-serif ${examData.themeColor === 'blue' ? 'border-blue-800 text-blue-900' : examData.themeColor === 'rose' ? 'border-rose-900 text-rose-950' : examData.themeColor === 'emerald' ? 'border-emerald-800 text-emerald-950' : 'border-slate-800 text-slate-900'}`}>
                          {/* Modern School Template */}
                          <div className="text-center w-full">
                              <div className="text-sm opacity-80 mb-1">
                                تعز - مديرية {examData.directorate} - عزلة {examData.uzlah}
                              </div>
                              <h1 className="font-bold text-xl mb-1">{examData.school}</h1>
                              <h2 className="text-lg mb-4">اختبار {examData.session} - مادة {examData.subject} - الصف {examData.grade}</h2>
                              <div className="flex justify-center gap-8 text-sm">
                                <span><span className="font-bold">الزمن:</span> {examData.time}</span>
                                <span><span className="font-bold">الدرجة:</span> {examData.score}</span>
                                <span><span className="font-bold">نموذج:</span> {examData.model}</span>
                              </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className={`flex items-center justify-center border-b-2 pb-2 mb-4 font-serif ${examData.themeColor === 'blue' ? 'border-blue-800 text-blue-900' : examData.themeColor === 'rose' ? 'border-rose-900 text-rose-950' : examData.themeColor === 'emerald' ? 'border-emerald-800 text-emerald-950' : 'border-slate-800 text-slate-900'}`}>
                       <h2 className="text-lg font-bold">﴿ تابع اختبار {examData.subject} - الصف {examData.grade} - نموذج ({examData.model}) ﴾</h2>
                    </div>
                  )}

                  {/* Sub-header Bar (Only on first page for ministerial) */}
                  {pageIndex === 0 && examData.template === 'وزاري يمني كلاسيكي' && (
                    <div className={`flex border-2 mb-4 font-serif text-sm font-bold print:bg-white items-stretch ${examData.themeColor === 'blue' ? 'border-blue-800 text-blue-900 bg-blue-50' : examData.themeColor === 'rose' ? 'border-rose-900 text-rose-950 bg-rose-50' : examData.themeColor === 'emerald' ? 'border-emerald-800 text-emerald-950 bg-emerald-50' : 'border-slate-800 text-slate-900 bg-slate-50'}`}>
                      <div className={`w-8 border-l-2 flex items-center justify-center ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>س</div>

                    <div className="flex-1 flex items-center justify-center border-l-2 border-slate-800 p-1 text-center">
                      مستعيناً بالله أجب عن جميع الأسئلة الآتية
                    </div>
                    <div className="w-48 flex items-center justify-center border-l-2 border-slate-800 p-1 text-center">
                      مادة {examData.subject} {examData.grade}
                    </div>
                    <div className="w-24 flex items-center justify-center border-l-2 border-slate-800 p-1">
                      النموذج ( {examData.model} )
                    </div>
                    <div className="w-8 flex items-center justify-center">د</div>
                  </div>
                )}

                {/* Questions */}
                <div className={`flex flex-col border-2 border-t-0 -mt-4 flex-1 ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>
                  {page.questions.map((q) => (
                    <div 
                      key={q.id}
                      onClick={() => setSelectedQuestionId(q.id)}
                      className={`relative group flex items-stretch border-t-2 transition-all cursor-text ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'} ${
                        selectedQuestionId === q.id 
                          ? 'bg-violet-50/30' 
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-8 border-l-2 flex items-start justify-center pt-4 font-bold text-lg font-serif ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>
                        {q.qIndex}
                      </div>
                      <div className="flex-1 p-4">
                        <textarea 
                          value={q.text}
                          onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                          placeholder="اكتب نص السؤال هنا..."
                          className="w-full bg-transparent border-none outline-none font-bold text-base mb-2 placeholder-slate-300 resize-none overflow-hidden font-serif leading-relaxed"
                          rows={1}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = target.scrollHeight + 'px';
                          }}
                        />
                        
                        {q.type === 'mcq' && q.options && (
                          <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-3 font-serif">
                            {q.options.map((opt, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="text-sm font-bold w-6 text-left">
                                  {i === 0 ? 'أ )' : i === 1 ? 'ب)' : i === 2 ? 'ج)' : 'د )'}
                                </div>
                                <input 
                                  type="text"
                                  value={opt}
                                  onChange={(e) => {
                                    const newOpts = [...q.options!];
                                    newOpts[i] = e.target.value;
                                    updateQuestion(q.id, { options: newOpts });
                                  }}
                                  placeholder={`خيار`}
                                  className="bg-transparent border-b border-slate-200 outline-none text-sm w-full focus:border-violet-400 py-1"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {q.type === 'tf' && (
                          <div className="flex gap-12 mt-3 font-serif">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold">( &nbsp;&nbsp;&nbsp;&nbsp; )</span>
                              <span className="text-sm">صح</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold">( &nbsp;&nbsp;&nbsp;&nbsp; )</span>
                              <span className="text-sm">خطأ</span>
                            </div>
                          </div>
                        )}
                        
                        {(q.type === 'essay' || q.type === 'reading' || q.type === 'expression' || q.type === 'definition' || q.type === 'reasoning') && (
                          <div className="mt-4 flex flex-col gap-8">
                            <div className="border-b border-dotted border-slate-400 w-full"></div>
                            <div className="border-b border-dotted border-slate-400 w-full"></div>
                            <div className="border-b border-dotted border-slate-400 w-full"></div>
                          </div>
                        )}

                        {q.type === 'fill' && (
                          <div className="mt-4 border-b border-dotted border-slate-400 w-2/3"></div>
                        )}

                        {q.type === 'match' && (
                          <div className={`mt-4 border rounded-sm font-serif ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>
                            <div className={`flex border-b font-bold print:bg-white text-sm ${examData.themeColor === 'blue' ? 'border-blue-800 bg-blue-50' : examData.themeColor === 'rose' ? 'border-rose-900 bg-rose-50' : examData.themeColor === 'emerald' ? 'border-emerald-800 bg-emerald-50' : 'border-slate-800 bg-slate-50'}`}>
                              <div className={`flex-1 p-2 text-center border-l ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>المجموعة ( أ )</div>
                              <div className={`w-16 p-2 text-center border-l ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>الرقم</div>
                              <div className="flex-1 p-2 text-center">المجموعة ( ب )</div>
                            </div>
                            {[1,2,3,4].map((i) => (
                              <div key={i} className={`flex border-b last:border-0 ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>
                                <div className={`flex-1 p-2 border-l flex items-center ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>
                                  <span className="ml-2 font-bold">{i} - </span>
                                  <input className="flex-1 bg-transparent border-none outline-none text-sm" placeholder="عنصر أ" />
                                </div>
                                <div className={`w-16 p-2 border-l flex items-center justify-center ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>
                                  <div className="w-8 h-8 border border-slate-400 rounded-full flex items-center justify-center text-slate-300 text-[10px]">الرقم</div>
                                </div>
                                <div className="flex-1 p-2 flex items-center">
                                  <input className="flex-1 bg-transparent border-none outline-none text-sm" placeholder="عنصر ب" />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {(q.type === 'table' || q.type === 'comparison' || q.type === 'tajweed') && (
                          <div className={`mt-4 border rounded-sm font-serif ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>
                            
                            {(q.type === 'comparison' || q.type === 'tajweed' || (q.type === 'table' && q.tableConfig?.hasHeader)) && (
                              <div className={`flex border-b font-bold print:bg-white text-sm ${examData.themeColor === 'blue' ? 'border-blue-800 bg-blue-50' : examData.themeColor === 'rose' ? 'border-rose-900 bg-rose-50' : examData.themeColor === 'emerald' ? 'border-emerald-800 bg-emerald-50' : 'border-slate-800 bg-slate-50'}`}>
                                {q.type === 'table' ? (
                                  Array.from({ length: q.tableConfig?.cols || 2 }).map((_, cIndex) => (
                                    <div key={cIndex} className={`flex-1 p-2 text-center ${cIndex < (q.tableConfig?.cols || 2) - 1 ? 'border-l' : ''} ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>
                                      <input className="bg-transparent text-center border-none outline-none w-full font-bold" placeholder={`عنوان العمود ${cIndex + 1}`} />
                                    </div>
                                  ))
                                ) : (
                                  <>
                                    {(q.type === 'comparison') && <div className={`flex-1 p-2 text-center border-l ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>وجه المقارنة</div>}
                                    {(q.type === 'tajweed') && <div className={`flex-1 p-2 text-center border-l ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>الكلمة</div>}
                                    <div className={`flex-1 p-2 text-center border-l ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}><input className="bg-transparent text-center border-none outline-none w-full font-bold" placeholder={q.type === 'tajweed' ? "الحكم التجويدي" : "العنصر الأول"} /></div>
                                    <div className="flex-1 p-2 text-center"><input className="bg-transparent text-center border-none outline-none w-full font-bold" placeholder={q.type === 'tajweed' ? "السبب" : "العنصر الثاني"} /></div>
                                  </>
                                )}
                              </div>
                            )}

                            {Array.from({ length: q.type === 'table' ? (q.tableConfig?.rows || 3) : 3 }).map((_, rIndex) => (
                              <div key={rIndex} className={`flex border-b last:border-0 min-h-10 ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>
                                {q.type === 'table' ? (
                                  Array.from({ length: q.tableConfig?.cols || 2 }).map((_, cIndex) => (
                                    <div key={cIndex} className={`flex-1 p-2 ${cIndex < (q.tableConfig?.cols || 2) - 1 ? 'border-l' : ''} ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>
                                      <textarea className="bg-transparent border-none outline-none w-full h-full resize-none text-sm leading-tight text-center overflow-hidden" placeholder="..." rows={1}></textarea>
                                    </div>
                                  ))
                                ) : (
                                  <>
                                    {(q.type === 'comparison' || q.type === 'tajweed') && <div className={`flex-1 p-2 border-l ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}><input className="bg-transparent border-none outline-none w-full h-full text-center text-sm" placeholder="..." /></div>}
                                    <div className={`flex-1 p-2 border-l ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}></div>
                                    <div className="flex-1 p-2"></div>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {q.type === 'grammar' && (
                          <div className={`mt-4 border rounded-sm font-serif ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>
                            <div className={`flex border-b font-bold print:bg-white text-sm ${examData.themeColor === 'blue' ? 'border-blue-800 bg-blue-50' : examData.themeColor === 'rose' ? 'border-rose-900 bg-rose-50' : examData.themeColor === 'emerald' ? 'border-emerald-800 bg-emerald-50' : 'border-slate-800 bg-slate-50'}`}>
                              <div className={`w-32 p-2 text-center border-l ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>الكلمة</div>
                              <div className="flex-1 p-2 text-center">إعرابها</div>
                            </div>
                            {[1,2,3].map((i) => (
                              <div key={i} className={`flex border-b last:border-0 h-10 ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>
                                <div className={`w-32 p-2 border-l ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}><input className="bg-transparent border-none outline-none w-full h-full text-center text-sm font-bold" placeholder="..." /></div>
                                <div className="flex-1 p-2"></div>
                              </div>
                            ))}
                          </div>
                        )}

                        {(q.type === 'calligraphy' || q.type === 'dictation') && (
                          <div className="mt-8 flex flex-col gap-10">
                            <div className={`border-b-2 w-full relative ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}><span className="absolute -top-6 right-0 text-xs font-bold text-slate-500">خط النسخ</span></div>
                            <div className={`border-b-2 w-full relative ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}><span className="absolute -top-6 right-0 text-xs font-bold text-slate-500">خط الرقعة</span></div>
                          </div>
                        )}

                        {(q.type === 'image' || q.type === 'map' || q.type === 'experiment') && (
                          <div className="mt-4 w-full h-40 border-2 border-dashed border-slate-300 rounded-md flex items-center justify-center text-slate-400 bg-slate-50 print:border-solid print:border-slate-800 print:bg-white">
                            <div className="text-center">
                              <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50 print:hidden" />
                              <span className="text-sm print:hidden">مساحة للرسم / الخريطة / الصورة</span>
                            </div>
                          </div>
                        )}

                        {(q.type === 'circuit' || q.type === 'optics' || q.type === 'mechanics' || q.type === 'graph') && (
                          <div 
                            className={`mt-4 w-full h-48 border-2 ${q.physicsElements && q.physicsElements.length > 0 ? 'border-solid border-slate-300 print:border-none' : 'border-dashed border-slate-300 print:border-solid print:border-slate-800'} rounded-md flex flex-col items-center justify-center text-slate-400 bg-slate-50 print:bg-white relative overflow-hidden cursor-pointer hover:border-violet-400 hover:shadow-sm transition-all group`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPhysicsEditorQuestionId(q.id);
                              setPhysicsEditorInitialCategory(q.type === 'circuit' ? 'electricity' : q.type === 'optics' ? 'optics' : q.type === 'mechanics' ? 'mechanics' : 'electricity');
                              setPhysicsEditorOpen(true);
                            }}
                          >
                            {(!q.physicsElements || q.physicsElements.length === 0) ? (
                              <>
                                <div className="text-center z-10 group-hover:scale-105 transition-transform">
                                  {q.type === 'circuit' && <Zap className="w-8 h-8 mx-auto mb-2 opacity-50 print:hidden text-amber-500" />}
                                  {q.type === 'optics' && <Eye className="w-8 h-8 mx-auto mb-2 opacity-50 print:hidden text-blue-500" />}
                                  {q.type === 'mechanics' && <Activity className="w-8 h-8 mx-auto mb-2 opacity-50 print:hidden text-emerald-500" />}
                                  {q.type === 'graph' && <LineChart className="w-8 h-8 mx-auto mb-2 opacity-50 print:hidden text-rose-500" />}
                                  <span className="text-sm font-bold text-slate-500 print:hidden">استوديو الفيزياء التفاعلي</span>
                                  <p className="text-xs mt-1 print:hidden">انقر لفتح المحرر ورسم النموذج</p>
                                </div>
                                <div className="absolute top-2 right-2 flex gap-1 print:hidden z-20">
                                   <div className="w-8 h-8 bg-white border border-slate-200 rounded shadow-sm flex items-center justify-center cursor-pointer hover:bg-slate-50 text-slate-600"><Shapes size={14}/></div>
                                   <div className="w-8 h-8 bg-white border border-slate-200 rounded shadow-sm flex items-center justify-center cursor-pointer hover:bg-slate-50 text-slate-600"><FunctionSquare size={14}/></div>
                                </div>
                              </>
                            ) : (
                              <div className="w-full h-full relative print:!bg-none" style={{ 
                                backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                              }}>
                                {/* Scale down to fit the 48 height (192px) if canvas was 600px */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none" style={{ transform: 'translate(-50%, -50%) scale(0.3)' }}>
                                  {q.physicsElements.map((el: any) => (
                                    <div
                                      key={el.uid}
                                      className="absolute"
                                      style={{
                                        left: el.x,
                                        top: el.y,
                                        transform: `rotate(${el.rotation}deg) scale(${el.scale})`,
                                        width: el.id === 'wire' ? 100 : el.id.includes('lens') ? 40 : 100,
                                        height: el.id.includes('lens') || el.id === 'mirror' ? 100 : 40,
                                        transformOrigin: 'center center'
                                      }}
                                    >
                                      <div className="w-full h-full text-slate-800" dangerouslySetInnerHTML={{ __html: el.svg }} />
                                    </div>
                                  ))}
                                </div>
                                
                                <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
                                  انقر للتعديل
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {q.type === 'physics_equation' && (
                           <div className="mt-4 text-left px-12" dir="ltr">
                             <div className="font-serif italic text-xl border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center pb-1">
                               <span className="text-slate-400 text-sm font-sans mr-2 print:hidden">معادلة فيزيائية</span>
                             </div>
                           </div>
                        )}

                        {q.type === 'math' && (
                          <div 
                            className={`mt-4 w-full min-h-24 border-2 ${q.latexData ? 'border-transparent print:border-none' : 'border-dashed border-slate-300 print:border-solid print:border-slate-800'} rounded-md flex flex-col items-center justify-center text-slate-400 bg-slate-50 print:bg-white relative overflow-hidden cursor-pointer hover:border-emerald-400 hover:shadow-sm transition-all group`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setMathEditorQuestionId(q.id);
                              setMathEditorInitialLatex(q.latexData || '');
                              setMathEditorOpen(true);
                            }}
                          >
                            {!q.latexData ? (
                              <div className="text-center z-10 group-hover:scale-105 transition-transform py-6">
                                <Calculator className="w-8 h-8 mx-auto mb-2 opacity-50 print:hidden text-emerald-500" />
                                <span className="text-sm font-bold text-slate-500 print:hidden">محرر المعادلات الرياضية</span>
                                <p className="text-xs mt-1 print:hidden">انقر لفتح المحرر وإضافة معادلة</p>
                              </div>
                            ) : (
                              <div className="w-full h-full relative p-4 flex items-center justify-center text-xl text-slate-900" dir="ltr">
                                <BlockMath math={q.latexData} />
                                <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
                                  انقر للتعديل
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {q.type === 'verses' && (
                          <div className="mt-6 text-center text-xl font-serif text-slate-800 leading-[3rem]">
                            ﴾ ........................................................................................................ ﴿
                          </div>
                        )}
                      </div>
                      
                      <div className={`w-8 border-r-2 flex items-start justify-center pt-4 font-bold text-sm font-serif ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>
                        {q.score}
                      </div>
                      
                      {/* Delete Button */}
                      {selectedQuestionId === q.id && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeQuestion(q.id); }}
                          className="absolute -top-3 -right-3 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm print:hidden z-10"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                  {page.questions.length === 0 && (
                    <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center font-serif">
                      <p>لم يتم إضافة أي أسئلة بعد.</p>
                      <p className="text-sm">استخدم زر (+) لإضافة سؤال جديد إلى الورقة.</p>
                    </div>
                  )}
                  {/* Total Score Footer (Only on the last page) */}
                  {pageIndex === pages.length - 1 && page.questions.length > 0 && (
                    <div className={`flex items-stretch border-t-2 font-serif font-bold text-sm print:bg-white ${examData.themeColor === 'blue' ? 'border-blue-800 bg-blue-50 text-blue-900' : examData.themeColor === 'rose' ? 'border-rose-900 bg-rose-50 text-rose-950' : examData.themeColor === 'emerald' ? 'border-emerald-800 bg-emerald-50 text-emerald-950' : 'border-slate-800 bg-slate-50 text-slate-900'}`}>
                      <div className={`flex-1 p-2 text-left border-l-2 ${examData.themeColor === 'blue' ? 'border-blue-800' : examData.themeColor === 'rose' ? 'border-rose-900' : examData.themeColor === 'emerald' ? 'border-emerald-800' : 'border-slate-800'}`}>
                        المجموع
                      </div>
                      <div className="w-8 flex items-center justify-center p-2">
                        {totalScore}
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating Add Button for this page */}
                <div className="relative mt-8 flex justify-center print:hidden flex-1 items-end pb-24">
                  <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-slate-200 -z-10"></div>
                  
                  <button 
                    onClick={() => setShowQuestionTypes(!showQuestionTypes)}
                    className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-violet-600 hover:border-violet-300 shadow-sm transition-colors z-10"
                  >
                    <Plus size={24} className={showQuestionTypes ? "rotate-45 transition-transform" : "transition-transform"} />
                  </button>

                  <AnimatePresence>
                    {showQuestionTypes && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-full mb-4 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 grid grid-cols-4 gap-2 w-[400px] max-h-[300px] overflow-y-auto z-20"
                      >
                        {activeToolbox.map(tool => (
                           <QuickTypeBtn key={tool.type} icon={tool.icon} label={tool.label} onClick={() => {
                             // Wait! We need to add the question. The current addQuestion adds it to the end of all questions.
                             // But that's correct, since the user is clicking the "+" button at the end of a page.
                             // Well, what if they click it on an earlier page? Then it should add it before the next page break.
                             // But `addQuestion` just appends to the end of the `questions` array.
                             // Let's pass the current page's index or ID.
                             // For now, let's keep it simple. It appends to the end of the whole array.
                             addQuestion(tool.type);
                           }} />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Paper Footer */}
                {pageIndex === pages.length - 1 ? (
                  <div className="absolute bottom-12 left-12 right-12 flex flex-col justify-end text-sm font-bold font-serif">
                    <div className="w-full border-b-[3px] border-inherit mb-1"></div>
                    <div className="w-full border-b border-inherit mb-2"></div>
                    <div className="flex justify-between items-center text-sm font-bold">
                      <div className="text-right flex-1 text-slate-800">
                        انتهت الأسئلة ،، تمنياتي لكم بالتوفيق والنجاح
                      </div>
                      <div className="text-left w-32 text-slate-800">
                        أ/ {examData.teacherName || '................................'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute bottom-12 left-12 right-12 flex flex-col justify-end text-sm font-bold font-serif">
                    <div className="w-full border-b-[3px] border-inherit mb-1"></div>
                    <div className="w-full border-b border-inherit mb-2"></div>
                    <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                      <div className="text-right">
                        للأسئلة بقية في الورقة التالـيـة &gt;&gt;&gt;
                      </div>
                      <div className="text-left">
                        إقلــــــب الصفحــــــــــــة &gt;&gt;&gt;&gt;&gt;
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Page Number */}
                <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-slate-400 font-bold font-serif print:text-black">
                  الصفحة {pageIndex + 1} من {pages.length}
                </div>

                {/* Print only watermark - Vertical Right Side */}
                <div className="absolute top-1/2 -right-[400px] w-[800px] text-[7px] text-slate-300 font-sans whitespace-nowrap -rotate-90 origin-center text-center">
                  تم التصميم والإنشاء بواسطة استوديو الرقيم التعليمي &copy; {new Date().getFullYear()} || معرف المستند: {examData.year.replace('/','')}{examData.grade.length}
                </div>
              </div>
            ))}
            </div>
            </main>

            {/* Right Sidebar: Properties */}
            <aside className="w-0 md:w-72 bg-white border-r border-slate-200 shrink-0 overflow-y-auto hidden md:block">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-bold text-sm text-slate-800 mb-3">إعدادات الورقة</h3>
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => addQuestion('page_break')}
                    className="w-full bg-slate-800 text-white font-bold py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors"
                  >
                    <FilePlus2 size={16} />
                    <span>إضافة صفحة جديدة</span>
                  </button>

                  <PropertyField label="توزيع الدرجات">
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                      <div className={`h-2 rounded-full ${isScoreExceeded ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, (totalScore / examData.score) * 100)}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] mt-1 text-slate-500">
                      <span>{totalScore} مرصودة</span>
                      <span>النهائية {examData.score}</span>
                    </div>
                  </PropertyField>

                  <PropertyField label="قالب الامتحان">
                    <button 
                      onClick={() => setShowGallery(true)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm outline-none hover:border-violet-400 text-right flex justify-between items-center"
                    >
                      <span className="font-bold text-slate-700 truncate">{examData.template}</span>
                      <LayoutTemplate size={16} className="text-slate-400 shrink-0" />
                    </button>
                  </PropertyField>

                  <PropertyField label="لون الترويسة">
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {Object.entries(THEMES).map(([key, theme]) => {
                         const bgClass = key === 'slate' ? 'bg-slate-800' : 
                                         key === 'blue' ? 'bg-blue-800' :
                                         key === 'emerald' ? 'bg-emerald-800' :
                                         key === 'purple' ? 'bg-purple-800' :
                                         key === 'rose' ? 'bg-rose-900' :
                                         key === 'amber' ? 'bg-amber-700' :
                                         key === 'gray' ? 'bg-gray-600' :
                                         key === 'teal' ? 'bg-teal-800' :
                                         key === 'indigo' ? 'bg-indigo-800' : 'bg-slate-800';
                         return (
                           <button 
                             key={key}
                             onClick={() => setExamData({...examData, themeColor: key})}
                             className={`w-6 h-6 rounded-full border-2 ${examData.themeColor === key ? 'border-slate-800 ring-2 ring-violet-200' : 'border-transparent'} ${bgClass}`}
                             title={theme.name}
                           />
                         );
                      })}
                    </div>
                  </PropertyField>
                </div>
              </div>
              
              {selectedQuestionId ? (
                <div className="p-4 flex flex-col gap-5">
                  <h3 className="font-bold text-sm text-slate-800 mb-2">خصائص السؤال المحدد</h3>
                  {questions.map(q => q.id === selectedQuestionId && (
                    <React.Fragment key={q.id}>
                      <PropertyField label="الدرجة المخصصة">
                        <select 
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-violet-400"
                          value={q.score}
                          onChange={(e) => updateQuestion(q.id, { score: Number(e.target.value) })}
                        >
                          <option value="0.5">نصف درجة</option>
                          <option value="1">درجة واحدة</option>
                          <option value="2">درجتان</option>
                          <option value="3">3 درجات</option>
                          <option value="4">4 درجات</option>
                          <option value="5">5 درجات</option>
                          <option value="10">10 درجات</option>
                        </select>
                      </PropertyField>

                      <PropertyField label="مستوى الصعوبة (AI Metatag)">
                        <select 
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-violet-400"
                          value={q.difficulty}
                          onChange={(e) => updateQuestion(q.id, { difficulty: e.target.value as any })}
                        >
                          <option value="سهل">سهل (استدعاء مباشر)</option>
                          <option value="متوسط">متوسط (تطبيق)</option>
                          <option value="صعب">صعب (تحليل)</option>
                          <option value="متميز">متميز (قدرات عليا)</option>
                        </select>
                      </PropertyField>

                      <PropertyField label="الهدف التعليمي">
                        <select 
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-violet-400"
                          value={q.objective}
                          onChange={(e) => updateQuestion(q.id, { objective: e.target.value })}
                        >
                          <option value="تذكر">تذكر المعارف</option>
                          <option value="فهم">استيعاب المفهوم</option>
                          <option value="تطبيق">تطبيق القاعدة</option>
                          <option value="تحليل">تحليل العلاقات</option>
                        </select>
                      </PropertyField>

                      <PropertyField label="الإجابة النموذجية (لبنك الأسئلة)">
                        <textarea 
                          rows={3}
                          placeholder="لن تظهر للطلاب، سيتم تخزينها في بنك الأسئلة وتستخدم للتصحيح الذكي..."
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-violet-400 resize-none"
                          value={q.correctAnswer || ''}
                          onChange={(e) => updateQuestion(q.id, { correctAnswer: e.target.value })}
                        ></textarea>
                      </PropertyField>
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 flex flex-col items-center gap-3">
                  <Edit3 size={32} className="opacity-20" />
                  <p className="text-sm">انقر على أي سؤال في الورقة لعرض الخصائص وتعديلها</p>
                </div>
              )}
            </aside>
          </>
        )}
      </div>

      {/* Template Gallery Overlay */}
      <AnimatePresence>
        {showGallery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-50 w-full max-w-6xl h-full max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
            >
              <div className="flex items-center justify-between p-6 bg-white border-b border-slate-200 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
                    <LayoutTemplate size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">معرض القوالب (Live Preview)</h2>
                    <p className="text-slate-500 text-sm">اختر القالب الأنسب لاختبارك وسيتم تطبيق بياناتك عليه فوراً</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowGallery(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors rotate-45"
                >
                  <Plus size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {['وزاري', 'حكومي', 'خاص', 'رياضيات', 'فيزياء', 'أساسي', 'حديث', 'طباعة'].map((category) => (
                  <div key={category} className="mb-12 last:mb-0">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-3">
                      <span className="w-2 h-6 bg-violet-500 rounded-full"></span>
                      قوالب {category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {TEMPLATES.filter(t => t.type === category).map(t => (
                        <div 
                          key={t.id}
                          onClick={() => {
                            setExamData({...examData, template: t.name});
                            setShowGallery(false);
                          }}
                          className={`group cursor-pointer rounded-2xl border-2 transition-all overflow-hidden flex flex-col ${examData.template === t.name ? 'border-violet-600 shadow-lg shadow-violet-200' : 'border-slate-200 bg-white hover:border-violet-300 hover:shadow-md'}`}
                        >
                          {/* Mini Preview Box */}
                          <div className="aspect-[1/1.2] bg-slate-100 relative p-4 flex flex-col items-center border-b border-slate-200">
                            {/* Abstract paper representation */}
                            <MiniExamPreview type={t.type} templateId={t.id} themeColor={examData.themeColor} logoData={examData.logoData} />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                              <button className="bg-white text-violet-700 font-bold px-4 py-2 rounded-lg shadow-md text-sm">
                                اختيار القالب
                              </button>
                            </div>
                          </div>
                          
                          {/* Info */}
                          <div className="p-4 bg-white flex-1 flex flex-col">
                            <h4 className="font-bold text-slate-800">{t.name}</h4>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{t.desc}</p>
                            
                            {examData.template === t.name && (
                              <div className="mt-3 flex items-center gap-1 text-xs font-bold text-violet-600 bg-violet-50 p-2 rounded-lg justify-center">
                                <CheckCircle2 size={14} />
                                <span>القالب الحالي</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zero-Typing Wizard Overlay */}
      <AnimatePresence>
        {showWizard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col"
            >
              {/* Wizard Header */}
              <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">إعداد بيئة الاختبار</h2>
                  <p className="text-sm text-slate-500 mt-1">دع النظام يبني الترويسة والقوالب نيابة عنك</p>
                </div>
                <div className="flex gap-2">
                  {[1, 2].map(step => (
                    <div 
                      key={step} 
                      className={`h-2 rounded-full transition-all ${
                        wizardStep === step ? 'w-8 bg-violet-600' : 
                        wizardStep > step ? 'w-4 bg-violet-300' : 'w-4 bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Wizard Content */}
              <div className="p-8 h-[450px] overflow-y-auto custom-scrollbar">
                {wizardStep === 1 && (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                    <div className="flex items-center gap-3 mb-6 text-violet-600">
                      <School size={24} />
                      <h3 className="font-bold text-lg">البيانات الإدارية (تُحفظ تلقائياً)</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <WizardField label="المحافظة">
                        <select className="wizard-select opacity-50 bg-slate-50 cursor-not-allowed" value="تعز" disabled>
                          <option value="تعز">تعز</option>
                        </select>
                      </WizardField>
                      
                      <WizardField label="المديرية">
                        <select 
                          className="wizard-select" 
                          value={examData.directorate} 
                          onChange={e => {
                            const newDirectorate = e.target.value;
                            const newUzlahs = taizAdminData[newDirectorate as keyof typeof taizAdminData] || [];
                            setExamData({...examData, directorate: newDirectorate, uzlah: newUzlahs[0] || ''});
                          }}
                        >
                          {taizDistricts.map(dist => (
                            <option key={dist} value={dist}>{dist}</option>
                          ))}
                        </select>
                      </WizardField>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <WizardField label="العزلة">
                        <select 
                          className="wizard-select" 
                          value={examData.uzlah} 
                          onChange={e => setExamData({...examData, uzlah: e.target.value})}
                        >
                          {(taizAdminData[examData.directorate as keyof typeof taizAdminData] || []).map(u => (
                            <option key={u} value={u}>{u}</option>
                          ))}
                        </select>
                      </WizardField>

                      <WizardField label="اسم المدرسة / المركز الامتحاني">
                        <input 
                          type="text" 
                          className="wizard-select" 
                          value={examData.school} 
                          onChange={e => setExamData({...examData, school: e.target.value})}
                          placeholder="مثال: مدرسة اليرموك النموذجية"
                        />
                      </WizardField>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <WizardField label="اسم المعلم">
                        <input 
                          type="text" 
                          className="wizard-select" 
                          value={examData.teacherName} 
                          onChange={e => setExamData({...examData, teacherName: e.target.value})}
                        />
                      </WizardField>
                      
                      <WizardField label="المسمى الوظيفي">
                        <select className="wizard-select" value={examData.jobTitle} onChange={e => setExamData({...examData, jobTitle: e.target.value})}>
                          <option value="معلم">معلم</option>
                          <option value="معلم أول">معلم أول</option>
                          <option value="رئيس قسم">رئيس قسم</option>
                        </select>
                      </WizardField>
                    </div>

                    <WizardField label="شعار المدرسة / المؤسسة (يظهر في الترويسة)">
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-100 transition-colors">
                          <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                          <div className="text-sm text-slate-500 flex flex-col items-center">
                            <ImageIcon size={24} className="mb-2 text-slate-400" />
                            <span>انقر لرفع الشعار</span>
                          </div>
                        </label>
                        {examData.logoData && (
                          <div className="w-16 h-16 rounded border border-slate-200 overflow-hidden shrink-0 bg-white">
                            <img src={examData.logoData} alt="Logo" className="w-full h-full object-contain" />
                          </div>
                        )}
                      </div>
                    </WizardField>
                  </motion.div>
                )}

                {wizardStep === 2 && (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                    <div className="flex items-center gap-3 mb-6 text-violet-600">
                      <BookOpen size={24} />
                      <h3 className="font-bold text-lg">المحددات الأكاديمية (لبناء الترويسة)</h3>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <WizardField label="قالب الاختبار">
                        <button 
                          onClick={() => setShowGallery(true)}
                          className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none hover:border-violet-500 hover:ring-2 hover:ring-violet-200 transition-all text-right flex justify-between items-center text-sm font-bold text-slate-700"
                        >
                          <span className="truncate">{examData.template}</span>
                          <LayoutTemplate size={18} className="text-violet-500 shrink-0" />
                        </button>
                      </WizardField>

                      <WizardField label="الفصل الدراسي">
                        <select className="wizard-select" value={examData.semester} onChange={e => setExamData({...examData, semester: e.target.value})}>
                          <option value="الأول">الأول</option>
                          <option value="الثاني">الثاني</option>
                        </select>
                      </WizardField>

                      <WizardField label="نوع الاختبار">
                        <select className="wizard-select" value={examData.session} onChange={e => setExamData({...examData, session: e.target.value})}>
                          <option value="نهاية الفصل">نهاية الفصل</option>
                          <option value="نصف الفصل">نصف الفصل</option>
                          <option value="شهري">شهري</option>
                          <option value="الدور الثاني">الدور الثاني</option>
                        </select>
                      </WizardField>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <WizardField label="المادة المستهدفة">
                        <select className="wizard-select font-bold text-violet-700 bg-violet-50" value={examData.subject} onChange={e => setExamData({...examData, subject: e.target.value})}>
                          {Object.keys(subjectToolbox).map(sub => (
                             <option key={sub} value={sub}>{sub}</option>
                          ))}
                          <option value="التربية الإسلامية">التربية الإسلامية</option>
                          <option value="اللغة الإنجليزية">اللغة الإنجليزية</option>
                        </select>
                      </WizardField>

                      <div className="grid grid-cols-2 gap-4">
                        <WizardField label="الصف">
                          <select className="wizard-select" value={examData.grade} onChange={e => setExamData({...examData, grade: e.target.value})}>
                            <option value="الصف السابع">السابع</option>
                            <option value="الصف الثامن">الثامن</option>
                            <option value="الصف التاسع">التاسع</option>
                            <option value="الأول الثانوي">الأول الثانوي</option>
                            <option value="الثاني الثانوي">الثاني الثانوي</option>
                            <option value="الثالث الثانوي">الثالث الثانوي</option>
                          </select>
                        </WizardField>

                        <WizardField label="الشعبة">
                          <select className="wizard-select" value={examData.section} onChange={e => setExamData({...examData, section: e.target.value})}>
                            <option value="أ">أ</option>
                            <option value="ب">ب</option>
                            <option value="ج">ج</option>
                          </select>
                        </WizardField>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <WizardField label="الزمن">
                        <select className="wizard-select" value={examData.time} onChange={e => setExamData({...examData, time: e.target.value})}>
                          <option value="45 دقيقة">45 دقيقة</option>
                          <option value="ساعة">ساعة</option>
                          <option value="ساعتان">ساعتان</option>
                          <option value="ثلاث ساعات">ثلاث ساعات</option>
                        </select>
                      </WizardField>

                      <WizardField label="الدرجة النهائية">
                        <select className="wizard-select" value={examData.score.toString()} onChange={e => setExamData({...examData, score: Number(e.target.value)})}>
                          <option value="20">20 درجة</option>
                          <option value="40">40 درجة</option>
                          <option value="50">50 درجة</option>
                          <option value="100">100 درجة</option>
                        </select>
                      </WizardField>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Wizard Footer */}
              <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button 
                  onClick={onBack}
                  className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  العودة للرئيسية
                </button>
                <button 
                  onClick={handleNextStep}
                  className="px-8 py-2.5 rounded-xl font-bold text-white bg-violet-600 hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/30 flex items-center gap-2"
                >
                  {wizardStep === 2 ? 'إنشاء مساحة العمل' : 'التالي'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PhysicsEditor 
        isOpen={physicsEditorOpen}
        onClose={() => {
          setPhysicsEditorOpen(false);
          setPhysicsEditorQuestionId(null);
        }}
        initialCategory={physicsEditorInitialCategory}
        onSave={(elements) => {
          if (physicsEditorQuestionId) {
            setQuestions(questions.map(q => 
              q.id === physicsEditorQuestionId 
                ? { ...q, physicsElements: elements } 
                : q
            ));
          }
          setPhysicsEditorOpen(false);
          setPhysicsEditorQuestionId(null);
        }}
      />

      <MathEditor
        isOpen={mathEditorOpen}
        onClose={() => {
          setMathEditorOpen(false);
          setMathEditorQuestionId(null);
        }}
        initialLatex={mathEditorInitialLatex}
        onSave={(latex) => {
          if (mathEditorQuestionId) {
            setQuestions(questions.map(q =>
              q.id === mathEditorQuestionId
                ? { ...q, latexData: latex }
                : q
            ));
          }
          setMathEditorOpen(false);
          setMathEditorQuestionId(null);
        }}
      />

      <AnimatePresence>
        {tableConfigOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Table size={24} className="text-violet-500" />
                إعدادات الجدول
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">عدد الصفوف</label>
                  <input 
                    type="number" 
                    min="1" max="20"
                    value={tempTableConfig.rows}
                    onChange={e => setTempTableConfig({...tempTableConfig, rows: parseInt(e.target.value) || 1})}
                    className="w-full border border-slate-200 rounded-lg p-2 text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">عدد الأعمدة</label>
                  <input 
                    type="number" 
                    min="1" max="10"
                    value={tempTableConfig.cols}
                    onChange={e => setTempTableConfig({...tempTableConfig, cols: parseInt(e.target.value) || 1})}
                    className="w-full border border-slate-200 rounded-lg p-2 text-center"
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="hasHeader"
                    checked={tempTableConfig.hasHeader}
                    onChange={e => setTempTableConfig({...tempTableConfig, hasHeader: e.target.checked})}
                    className="w-4 h-4 text-violet-600 rounded"
                  />
                  <label htmlFor="hasHeader" className="text-sm font-bold text-slate-700 select-none">تضمين صف العنوان (رأس الجدول)</label>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => {
                    const newQ: Question = {
                      id: crypto.randomUUID(),
                      type: 'table',
                      text: '',
                      score: 1,
                      difficulty: 'متوسط',
                      objective: 'تذكر',
                      tableConfig: tempTableConfig
                    };
                    setQuestions([...questions, newQ]);
                    setSelectedQuestionId(newQ.id);
                    setTableConfigOpen(false);
                  }}
                  className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 rounded-lg transition-colors"
                >
                  إضافة الجدول
                </button>
                <button 
                  onClick={() => setTableConfigOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .wizard-select {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .wizard-select:focus {
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }
      `}} />
    </div>
  );
}

const ToolboxItem: React.FC<{ icon: any, label: string, onClick: () => void }> = ({ icon: Icon, label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col md:flex-row items-center gap-2 p-2 hover:bg-violet-50 hover:text-violet-700 text-slate-600 rounded-lg transition-colors w-full md:text-right group"
    >
      <Icon size={18} className="shrink-0 text-slate-400 group-hover:text-violet-600" />
      <span className="text-[10px] md:text-xs font-medium md:flex-1 text-center md:text-right">{label}</span>
    </button>
  );
}

const QuickTypeBtn: React.FC<{ icon: any, label: string, onClick: () => void }> = ({ icon: Icon, label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-3 hover:bg-violet-50 hover:text-violet-700 text-slate-600 rounded-xl transition-colors"
    >
      <Icon size={20} />
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}

function WizardField({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-slate-700">{label}</label>
      {children}
    </div>
  );
}
function PropertyField({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-slate-500 uppercase">{label}</label>
      {children}
    </div>
  );
}
