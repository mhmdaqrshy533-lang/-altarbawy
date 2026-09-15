import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Layers, 
  Camera, 
  Shuffle, 
  Printer, 
  Download, 
  Plus, 
  Sparkles, 
  Settings, 
  Eye, 
  EyeOff, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ChevronUp, 
  ChevronDown, 
  Trash2, 
  Copy, 
  Sliders, 
  Edit3,
  HelpCircle,
  School,
  Award,
  BookOpen
} from 'lucide-react';
import { 
  ExamHeader, 
  ExamQuestion, 
  ExamTheme, 
  MANDATORY_COPYRIGHT 
} from './types/exam';
import { A4ExamSheet } from './components/A4ExamSheet';
import { QuestionEditorModal } from './components/QuestionEditorModal';
import { HeaderEditorModal } from './components/HeaderEditorModal';
import { AITextToolsModal } from './components/AITextToolsModal';
import { OMRGraderView } from './components/OMRGraderView';
import { MultiModelGenerator } from './components/MultiModelGenerator';

// Initial Default Exam Data (Official Ministerial Standard)
const INITIAL_HEADER: ExamHeader = {
  republicText: 'الجمهورية اليمنية',
  ministryText: 'وزارة التربية والتعليم',
  officeText: 'مكتب التربية والتعليم بالأمانة',
  directorateText: 'إدارة التربية والتعليم بمنطقة السبعين',
  schoolName: 'مدارس الرقيم الأهلية النموذجية',
  subject: 'اللغة العربية وفنونها',
  grade: 'الثالث الثانوي (العلمي والأدبي)',
  sectionName: 'أ / ب',
  examTitle: 'اختبار نهاية الفصل الدراسي الأول',
  modelName: 'أ',
  duration: 'ساعتان ونصف (2:30)',
  academicYear: '1447هـ - 2025/2026م',
  totalMarks: 30,
  omrMarks: 25,
  essayMarks: 5,
  teacherName: 'أ/ عبد القوي سيف محمد',
  principalName: 'أ/ محمد عبد المغني',
  barcodeText: '*RQ-OMR-2026*'
};

const INITIAL_THEME: ExamTheme = {
  primaryColor: '#0d5c3a',
  primaryDark: '#073823',
  accentTint: '#f2f7f4',
  borderTint: '#e8f0eb',
  fontFamily: 'cairo',
  fontSize: 'compact',
  headerStyle: 'ministerial',
  showInstructions: true,
  showMarksTable: true,
  showStudentInfo: true
};

const INITIAL_QUESTIONS: ExamQuestion[] = [
  {
    id: 'passage-1',
    type: 'passage',
    sectionNumber: 1,
    text: 'اقرأ النص القرائي الآتي بعناية ثم أجب عن الأسئلة التي تليه:',
    points: 0,
    passageText: '«إن اللغة العربية ليست مجرد أداة للتواصل، بل هي وعاء الفكر العربي ومستودع تراث الأمة وحضارتها الخالدة، وقد تميزت بالإيجاز والبيان ودقة التعبير عن أدق المعاني الإنسانية والروحية والعلمية.»'
  },
  {
    id: 'q-tf-1',
    type: 'tf',
    sectionNumber: 1,
    questionNumber: 1,
    text: 'تعد اللغة العربية وعاء الفكر ومستودع التراث الحضاري للأمة.',
    points: 1.5,
    correctAnswer: 'T'
  },
  {
    id: 'q-tf-2',
    type: 'tf',
    sectionNumber: 1,
    questionNumber: 2,
    text: 'يقتصر دور اللغة العربية بحسب النص على التواصل اليومي البسيط فقط.',
    points: 1.5,
    correctAnswer: 'F'
  },
  {
    id: 'q-tf-3',
    type: 'tf',
    sectionNumber: 1,
    questionNumber: 3,
    text: 'الفعل المتعدي هو الذي يكتفي بفاعله ولا يحتاج إلى مفعول به لإتمام المعنى.',
    points: 1.5,
    correctAnswer: 'F'
  },
  {
    id: 'poetry-1',
    type: 'poetry',
    sectionNumber: 2,
    text: 'قال الشاعر في الفخر والحماسة والشجاعة:',
    points: 0,
    passageText: 'إِذَا المَلِكُ الجَبَّارُ صَعَّرَ خَدَّهُ ... مَشَيْنَا إلَيْهِ بالسُّيُوفِ نُعَاتِبُهْ'
  },
  {
    id: 'q-mcq-1',
    type: 'mcq',
    sectionNumber: 2,
    questionNumber: 4,
    text: 'معنى كلمة (صَعَّرَ خَدَّهُ) في البيت الشعري السابق هو:',
    points: 2,
    correctAnswer: 'B',
    options: [
      { id: 'A', label: 'أ', text: 'تواضع ولان جانبه' },
      { id: 'B', label: 'ب', text: 'أمال وجهه تكبراً وخيلاء' },
      { id: 'C', label: 'ج', text: 'أقبل مستبشراً وضاحكاً' },
      { id: 'D', label: 'د', text: 'أعرض حياءً وخجلاً' }
    ]
  },
  {
    id: 'q-mcq-2',
    type: 'mcq',
    sectionNumber: 2,
    questionNumber: 5,
    text: 'إعراب كلمة (نُعَاتِبُهْ) في الشطر الثاني من البيت هو فعل مضارع:',
    points: 2,
    correctAnswer: 'A',
    options: [
      { id: 'A', label: 'أ', text: 'مرفوع وعلامة رفعه الضمة والهاء مفعول به' },
      { id: 'B', label: 'ب', text: 'مجزوم في جواب الشرط بالسكون' },
      { id: 'C', label: 'ج', text: 'منصوب بأن المضمرة بعد الفاء' },
      { id: 'D', label: 'د', text: 'مبني على السكون لاتصاله بضمير' }
    ]
  },
  {
    id: 'q-mcq-3',
    type: 'mcq',
    sectionNumber: 2,
    questionNumber: 6,
    text: 'المحسن البديعي في قولهم: (يومَ تقومُ الساعةُ يقسمُ المجرمون ما لبثوا غيرَ ساعة) هو:',
    points: 2,
    correctAnswer: 'C',
    options: [
      { id: 'A', label: 'أ', text: 'طباق إيجاب' },
      { id: 'B', label: 'ب', text: 'سجع مرصع' },
      { id: 'C', label: 'ج', text: 'جناس تام' },
      { id: 'D', label: 'د', text: 'مقابلة بلاغية' }
    ]
  },
  {
    id: 'q-mcq-4',
    type: 'mcq',
    sectionNumber: 2,
    questionNumber: 7,
    text: 'الهمزة في كلمة (اسْتِغْفَار) همزة وصل لأنها مصدر لفعل:',
    points: 2,
    correctAnswer: 'D',
    options: [
      { id: 'A', label: 'أ', text: 'ثلاثي مجرد' },
      { id: 'B', label: 'ب', text: 'رباعي مزيد' },
      { id: 'C', label: 'ج', text: 'خماسي مبدوء بتاء' },
      { id: 'D', label: 'د', text: 'سداسي على وزن استفعل' }
    ]
  },
  {
    id: 'q-essay-1',
    type: 'essay',
    sectionNumber: 3,
    questionNumber: 8,
    text: 'اكتب فقرة موجزة تبين فيها أثر القراءة الواعية في صقل شخصية الطالب وبناء مستقبله:',
    points: 5,
    essayLinesCount: 3
  }
];

export function App() {
  const [activeTab, setActiveTab] = useState<'editor' | 'grader' | 'multimodel'>('editor');
  const [header, setHeader] = useState<ExamHeader>(INITIAL_HEADER);
  const [questions, setQuestions] = useState<ExamQuestion[]>(INITIAL_QUESTIONS);
  const [theme, setTheme] = useState<ExamTheme>(INITIAL_THEME);
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(85); // 85% default fits nicely on 1080p
  const [activeModelName, setActiveModelName] = useState<'أ' | 'ب' | 'ج' | 'د'>('أ');

  // Modals state
  const [editingQuestion, setEditingQuestion] = useState<ExamQuestion | null>(null);
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState<boolean>(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);

  // Recalculate question numbers sequentially
  const reindexQuestions = (list: ExamQuestion[]) => {
    let qNum = 1;
    return list.map(q => {
      if (q.type === 'tf' || q.type === 'mcq' || q.type === 'essay') {
        return { ...q, questionNumber: qNum++ };
      }
      return q;
    });
  };

  // Add Question Handlers
  const handleAddQuestion = (type: 'mcq' | 'tf' | 'passage' | 'poetry' | 'essay') => {
    const newId = `q-${Date.now()}`;
    let newQ: ExamQuestion;

    if (type === 'tf') {
      newQ = {
        id: newId,
        type: 'tf',
        text: 'اكتب نص سؤال الصواب أو الخطأ الجديد هنا...',
        points: 1.5,
        correctAnswer: 'T'
      };
    } else if (type === 'mcq') {
      newQ = {
        id: newId,
        type: 'mcq',
        text: 'اكتب نص سؤال الاختيار من متعدد الجديد هنا...',
        points: 2,
        correctAnswer: 'A',
        options: [
          { id: 'A', label: 'أ', text: 'الخيار الأول' },
          { id: 'B', label: 'ب', text: 'الخيار الثاني' },
          { id: 'C', label: 'ج', text: 'الخيار الثالث' },
          { id: 'D', label: 'د', text: 'الخيار الرابع' }
        ]
      };
    } else if (type === 'passage') {
      newQ = {
        id: newId,
        type: 'passage',
        text: 'اقرأ النص القرائي الآتي بعناية:',
        points: 0,
        passageText: 'اكتب نص الفقرة القرائية هنا...'
      };
    } else if (type === 'poetry') {
      newQ = {
        id: newId,
        type: 'poetry',
        text: 'قال الشاعر:',
        points: 0,
        passageText: 'إِذَا المَلِكُ الجَبَّارُ صَعَّرَ خَدَّهُ ... مَشَيْنَا إلَيْهِ بالسُّيُوفِ نُعَاتِبُهْ'
      };
    } else {
      newQ = {
        id: newId,
        type: 'essay',
        text: 'اكتب موضوعاً تعبيرياً موجزاً...',
        points: 4,
        essayLinesCount: 3
      };
    }

    const updated = reindexQuestions([...questions, newQ]);
    setQuestions(updated);
    setEditingQuestion(newQ);
  };

  // Reorder Questions
  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === questions.length - 1) return;

    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const newItems = [...questions];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIdx, 0, moved);

    setQuestions(reindexQuestions(newItems));
  };

  // Duplicate Question
  const duplicateQuestion = (index: number) => {
    const item = questions[index];
    const copy = {
      ...item,
      id: `q-copy-${Date.now()}`,
      text: `${item.text} (نسخة)`
    };
    const newItems = [...questions];
    newItems.splice(index + 1, 0, copy);
    setQuestions(reindexQuestions(newItems));
  };

  // Delete Question
  const deleteQuestion = (id: string) => {
    const newItems = questions.filter(q => q.id !== id);
    setQuestions(reindexQuestions(newItems));
  };

  // Total Marks recalculation
  useEffect(() => {
    const omrScore = questions
      .filter(q => q.type === 'tf' || q.type === 'mcq')
      .reduce((acc, q) => acc + (q.points || 0), 0);
    const essayScore = questions
      .filter(q => q.type === 'essay')
      .reduce((acc, q) => acc + (q.points || 0), 0);
    const totalScore = omrScore + essayScore;

    setHeader(prev => ({
      ...prev,
      omrMarks: Number(omrScore.toFixed(1)),
      essayMarks: Number(essayScore.toFixed(1)),
      totalMarks: Number(totalScore.toFixed(1))
    }));
  }, [questions]);

  // Export JSON Configuration
  const handleExportJSON = () => {
    const data = {
      app: 'نظام الرقيم التربوي — المحرر الذكي ومصحح OMR الفائق',
      copyright: MANDATORY_COPYRIGHT,
      header,
      theme,
      questions,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `اختبار_${header.subject}_${header.grade}_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col antialiased selection:bg-emerald-500 selection:text-slate-950 font-sans" dir="rtl">
      
      {/* 1. TOP MASTER APP BAR (Non-printable) */}
      <header className="no-print sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 shadow-xl select-none">
        <div className="max-w-[1600px] mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          
          {/* Brand & Credit Pill */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0d5c3a] to-emerald-500 p-0.5 shadow-lg shadow-emerald-950/50 flex items-center justify-center">
              <div className="w-full h-full bg-[#073823] rounded-[14px] flex flex-col items-center justify-center text-emerald-300">
                <span className="text-xs font-black leading-none">الرقيم</span>
                <span className="text-[7px] font-mono text-emerald-400">OMR</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-black tracking-tight text-white">
                  نظام الرقيم التربوي
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  المحرر الذكي ومصحح OMR الفائق
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                {MANDATORY_COPYRIGHT}
              </p>
            </div>
          </div>

          {/* Core Navigation Tabs */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'editor' 
                  ? 'bg-[#0d5c3a] text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText size={15} />
              <span>المحرر الحي (Studio Canvas)</span>
            </button>

            <button
              onClick={() => setActiveTab('grader')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'grader' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Camera size={15} />
              <span>مصحح OMR الفائق</span>
            </button>

            <button
              onClick={() => setActiveTab('multimodel')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'multimodel' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shuffle size={15} />
              <span>أتمتة النماذج (A, B, C, D)</span>
            </button>
          </div>

          {/* Quick Action Suite */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAIModalOpen(true)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              title="مساعد الذكاء الاصطناعي ومؤشر سعة A4"
            >
              <Sparkles size={14} />
              <span className="hidden sm:inline">أدوات AI وضبط A4</span>
            </button>

            <button
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                showAnswerKey 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black shadow-lg shadow-emerald-500/20' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="تفعيل إظهار الإجابة النموذجية في المعاينة والطباعة"
            >
              {showAnswerKey ? <Eye size={14} /> : <EyeOff size={14} />}
              <span>{showAnswerKey ? 'مفتاح الإجابة (مفعّل)' : 'مفتاح الإجابة'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <Printer size={15} />
              <span>طباعة ورقة A4</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col max-w-[1600px] w-full mx-auto p-4">
        
        {/* VIEW 1: Canva-Grade Studio Editor (Sidebar + Live Canvas) */}
        {activeTab === 'editor' && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* RIGHT COLUMN: Inspector & Question Management Studio (5 cols) */}
            <div className="no-print lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col space-y-4 max-h-[calc(100vh-100px)] overflow-hidden">
              
              {/* Top Studio Controls */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h2 className="text-xs font-black text-white">إدارة الفقرات والترويسة</h2>
                    <p className="text-[10px] text-slate-400">
                      الدرجة الكلية: <b className="text-emerald-400 font-mono">{header.totalMarks}</b> د | OMR: <b className="text-emerald-400 font-mono">{header.omrMarks}</b> د
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsHeaderModalOpen(true)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                    title="تعديل الترويسة المدرسية"
                  >
                    <Settings size={15} />
                  </button>
                  <button
                    onClick={handleExportJSON}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                    title="تصدير ملف JSON"
                  >
                    <Download size={15} />
                  </button>
                </div>
              </div>

              {/* Quick Add Question Bar */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 block">إضافة فقرة جديدة بنقرة واحدة:</span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  <button
                    onClick={() => handleAddQuestion('mcq')}
                    className="p-2 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/50 text-emerald-300 rounded-xl text-[11px] font-bold transition flex flex-col items-center gap-1"
                  >
                    <Plus size={14} />
                    <span>+ اختيار MCQ</span>
                  </button>
                  <button
                    onClick={() => handleAddQuestion('tf')}
                    className="p-2 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/50 text-emerald-300 rounded-xl text-[11px] font-bold transition flex flex-col items-center gap-1"
                  >
                    <Plus size={14} />
                    <span>+ صواب/خطأ</span>
                  </button>
                  <button
                    onClick={() => handleAddQuestion('passage')}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[11px] font-bold transition flex flex-col items-center gap-1"
                  >
                    <Plus size={14} />
                    <span>+ نص قرائي</span>
                  </button>
                  <button
                    onClick={() => handleAddQuestion('poetry')}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[11px] font-bold transition flex flex-col items-center gap-1"
                  >
                    <Plus size={14} />
                    <span>+ بيت شعر</span>
                  </button>
                  <button
                    onClick={() => handleAddQuestion('essay')}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[11px] font-bold transition flex flex-col items-center gap-1"
                  >
                    <Plus size={14} />
                    <span>+ مقالي/تعبير</span>
                  </button>
                </div>
              </div>

              {/* Scrollable Questions List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 select-none">
                {questions.map((q, idx) => {
                  const isMCQ = q.type === 'mcq';
                  const isTF = q.type === 'tf';
                  const isPassage = q.type === 'passage';
                  const isPoetry = q.type === 'poetry';
                  const isEssay = q.type === 'essay';

                  return (
                    <div
                      key={q.id}
                      className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-3 transition space-y-2 group shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 truncate">
                          <span className={`w-5 h-5 rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0 ${
                            isMCQ ? 'bg-emerald-500/20 text-emerald-400' : isTF ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {q.questionNumber || (isPassage ? 'ق' : isPoetry ? 'ش' : idx + 1)}
                          </span>
                          
                          <span className="text-xs font-bold text-white truncate max-w-[220px]">
                            {q.text}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {q.points > 0 && (
                            <span className="text-[10px] bg-slate-800 text-slate-300 font-mono font-bold px-1.5 py-0.5 rounded">
                              {q.points} د
                            </span>
                          )}
                          <button
                            onClick={() => moveQuestion(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded disabled:opacity-30"
                            title="تحريك لأعلى"
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            onClick={() => moveQuestion(idx, 'down')}
                            disabled={idx === questions.length - 1}
                            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded disabled:opacity-30"
                            title="تحريك لأسفل"
                          >
                            <ChevronDown size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Snippet / Answers Summary */}
                      <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-900 pt-1.5">
                        <div className="truncate text-[10px]">
                          {isTF && <span>الإجابة: <b>({q.correctAnswer === 'T' ? 'صواب' : 'خطأ'})</b></span>}
                          {isMCQ && <span>الإجابة: <b>({q.options?.find(o => o.id === q.correctAnswer)?.label || 'أ'})</b> | {q.options?.length || 4} خيارات</span>}
                          {isEssay && <span>{q.essayLinesCount || 3} أسطر مسطرة</span>}
                          {isPassage && <span className="truncate">{q.passageText?.substring(0, 35)}...</span>}
                          {isPoetry && <span className="truncate">{q.passageText}</span>}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingQuestion(q)}
                            className="p-1 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 rounded transition"
                            title="تعديل التفاصيل"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            onClick={() => duplicateQuestion(idx)}
                            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition"
                            title="تكرار الفقرة"
                          >
                            <Copy size={13} />
                          </button>
                          <button
                            onClick={() => deleteQuestion(q.id)}
                            className="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded transition"
                            title="حذف"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Copyright Credit */}
              <div className="pt-2 border-t border-slate-800 text-center text-[10px] text-slate-500 font-bold">
                {MANDATORY_COPYRIGHT}
              </div>
            </div>

            {/* LEFT COLUMN: Zoomable & Live Interactive A4 Canvas (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center space-y-3">
              
              {/* Canvas Controls Toolbar */}
              <div className="no-print w-full bg-slate-900 border border-slate-800 rounded-2xl p-2.5 px-4 flex items-center justify-between gap-4 shadow-xl">
                
                {/* Active Model Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">النموذج:</span>
                  <div className="flex bg-slate-800 p-0.5 rounded-xl border border-slate-700">
                    {(['أ', 'ب', 'ج', 'د'] as const).map(m => (
                      <button
                        key={m}
                        onClick={() => {
                          setActiveModelName(m);
                          setHeader(prev => ({ ...prev, modelName: m }));
                        }}
                        className={`px-2.5 py-0.5 rounded-lg text-xs font-black transition ${
                          activeModelName === m 
                            ? 'bg-[#0d5c3a] text-white shadow-xs' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        ({m})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Canvas Zoom Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(prev - 10, 50))}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                    title="تصغير المعاينة"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="text-xs font-mono font-bold text-slate-300 min-w-[45px] text-center">
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(prev + 10, 130))}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                    title="تكبير المعاينة"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    onClick={() => setZoomLevel(85)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                    title="إعادة ضبط الحجم الطبيعي"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                {/* Print button shortcut */}
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Printer size={13} />
                  <span>طباعة فورية</span>
                </button>
              </div>

              {/* Scrollable Viewport Container for A4 Sheet */}
              <div className="w-full flex justify-center overflow-auto p-4 bg-slate-950/80 rounded-3xl border border-slate-800/80 shadow-2xl min-h-[750px]">
                <div 
                  style={{ 
                    transform: `scale(${zoomLevel / 100})`, 
                    transformOrigin: 'top center',
                    transition: 'transform 0.15s ease-out'
                  }}
                  className="shrink-0"
                >
                  <A4ExamSheet
                    header={header}
                    questions={questions}
                    theme={theme}
                    showAnswerKey={showAnswerKey}
                    onEditHeader={() => setIsHeaderModalOpen(true)}
                    onEditQuestion={(q) => setEditingQuestion(q)}
                  />
                </div>
              </div>

            </div>

          </div>
        )}

        {/* VIEW 2: Computer Vision OMR Grader */}
        {activeTab === 'grader' && (
          <OMRGraderView 
            questions={questions} 
            activeModel={activeModelName} 
          />
        )}

        {/* VIEW 3: Multi-Form Generator (Models A, B, C, D) */}
        {activeTab === 'multimodel' && (
          <MultiModelGenerator
            baseQuestions={questions}
            header={header}
            theme={theme}
            onSelectModelForPreview={(modelLetter, modelQuestions) => {
              setActiveModelName(modelLetter);
              setHeader(prev => ({ ...prev, modelName: modelLetter }));
              setQuestions(modelQuestions);
              setActiveTab('editor');
            }}
          />
        )}

      </main>

      {/* 3. MODALS */}
      {/* Question Editor Modal */}
      <QuestionEditorModal
        question={editingQuestion}
        isOpen={!!editingQuestion}
        onClose={() => setEditingQuestion(null)}
        onSave={(updatedQ) => {
          const newItems = questions.map(q => q.id === updatedQ.id ? updatedQ : q);
          setQuestions(reindexQuestions(newItems));
        }}
        onDelete={(id) => deleteQuestion(id)}
      />

      {/* Header & Settings Modal */}
      <HeaderEditorModal
        header={header}
        theme={theme}
        isOpen={isHeaderModalOpen}
        onClose={() => setIsHeaderModalOpen(false)}
        onSave={(updatedHeader, updatedTheme) => {
          setHeader(updatedHeader);
          setTheme(updatedTheme);
        }}
      />

      {/* AI Text Optimizer Modal */}
      <AITextToolsModal
        questions={questions}
        theme={theme}
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onApplyCleanedQuestions={(cleaned) => setQuestions(cleaned)}
        onChangeFontSize={(newSize) => setTheme(prev => ({ ...prev, fontSize: newSize }))}
      />

      {/* 4. PRINT CONTAINER (Strictly rendered for window.print()) */}
      <div className="print-only-container hidden">
        <A4ExamSheet
          header={header}
          questions={questions}
          theme={theme}
          showAnswerKey={showAnswerKey}
          isPrintMode={true}
        />
      </div>

    </div>
  );
}

export default App;
