import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Sparkles, Printer, Edit3, X, Palette, 
  Settings, Image as ImageIcon, Database, PlusCircle, 
  PenTool, Circle, ArrowUpRight, Type, Check, Download,
  Square, Triangle, Wand2, Battery, Magnet, ZoomIn, ZoomOut, Trash2, LayoutTemplate,
  BrainCircuit, Send
} from 'lucide-react';

export default function AIGenerator({ onBack }: { onBack: () => void }) {
  const [questions, setQuestions] = useState<any[]>([]);
  
  // Paper Info
  const [paperInfo, setPaperInfo] = useState({
    governorate: 'محافظة تعز',
    directorate: 'مديرية التعزية',
    school: 'مدرسة عمار بن ياسر',
    teacher: 'م. سهيل الهزبري',
    subject: 'الفيزياء',
    grade: 'الثالث الثانوي',
    section: 'أ',
    term: 'الفصل الدراسي الأول',
    year: '2026-2027',
    examTitle: 'اختبار نهاية الفصل الدراسي الأول',
    time: 'ساعتان',
    score: '100',
    day: 'الأحد',
    date: '2026/01/15',
    formNumber: '1',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Coat_of_arms_of_Yemen.svg'
  });

  // Templates & Themes
  const [activeTemplate, setActiveTemplate] = useState<'classic' | 'modern' | 'minimalist'>('classic');
  const [activeColor, setActiveColor] = useState('#000000');
  const [showSettings, setShowSettings] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  // Magic AI Editor State
  const [editorText, setEditorText] = useState('');
  const [livePreviewQ, setLivePreviewQ] = useState<any>(null);

  // Background AI (Reads Mind)
  useEffect(() => {
    if (editorText.trim() === '') {
      setLivePreviewQ(null);
      return;
    }
    
    // Simulate background AI formatting based on typing
    const text = editorText;
    let type = 'direct';
    let options = undefined;
    let formattedText = text;

    if (text.includes('صح') || text.includes('خطأ')) {
      type = 'tf';
    } else if (text.includes('؟') || text.includes('ما') || text.includes('كيف') || text.includes('علل') || text.includes('بم تفسر')) {
      if (text.includes('-')) {
        type = 'mcq';
        options = text.split('-').slice(1).map(s => s.trim());
        formattedText = text.split('-')[0].trim();
      } else {
        type = 'direct';
      }
    } else if (text.includes('...')) {
      type = 'complete';
    }

    setLivePreviewQ({
      type,
      text: formattedText,
      options: options || (type === 'mcq' ? ['أ', 'ب', 'ج', 'د'] : undefined)
    });
  }, [editorText]);

  const addQuestion = () => {
    if (livePreviewQ) {
      setQuestions([...questions, livePreviewQ]);
      setEditorText('');
      setLivePreviewQ(null);
    }
  };

  const getTemplateStyles = () => {
    switch (activeTemplate) {
      case 'modern':
        return {
          wrapper: 'font-sans rounded-3xl overflow-hidden',
          border: `2px solid ${activeColor}`,
          header: `flex justify-between items-center bg-[${activeColor}10] p-6 rounded-2xl mb-6`,
          title: `text-[${activeColor}] text-xl font-black bg-[${activeColor}20] px-6 py-3 rounded-xl`,
          questionBlock: 'bg-slate-50 p-6 rounded-xl border-none shadow-sm mb-4',
          circle: `w-8 h-8 rounded-md bg-[${activeColor}15] text-[${activeColor}] flex items-center justify-center font-bold text-sm`,
          studentInfo: `flex gap-6 bg-[${activeColor}05] p-4 rounded-xl border border-[${activeColor}30] mb-8 font-bold`
        };
      case 'minimalist':
        return {
          wrapper: 'font-mono bg-white',
          border: 'none',
          header: 'flex flex-col items-center border-b-2 border-slate-200 pb-8 mb-10 gap-6',
          title: 'text-3xl tracking-widest uppercase font-light',
          questionBlock: 'border-b border-slate-100 py-8 mb-4',
          circle: 'w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center font-bold text-sm text-slate-500',
          studentInfo: 'flex justify-between border-y border-slate-200 py-6 mb-10 text-sm text-slate-600'
        };
      case 'classic':
      default:
        return {
          wrapper: 'font-serif bg-white',
          border: `4px double ${activeColor}`,
          header: `grid grid-cols-3 items-center border-b-[3px] border-double pb-4 mb-6 text-center border-[${activeColor}]`,
          title: `border-2 px-4 py-1 text-sm font-bold mt-2 border-[${activeColor}]`,
          questionBlock: 'py-3 mb-3',
          circle: `w-6 h-6 rounded-full border-[1.5px] border-[${activeColor}] flex items-center justify-center font-bold text-xs bg-white text-[${activeColor}] ml-2`,
          studentInfo: `flex border-[2px] border-[${activeColor}] my-6 text-[15px] bg-slate-50`
        };
    }
  };

  const ts = getTemplateStyles();

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#0B1120] font-sans select-none overflow-hidden" dir="rtl">
      
      {/* ---------------- EDITOR PANE (LEFT SIDE - DARK MODE) ---------------- */}
      <div className="w-full lg:w-[450px] bg-[#0f172a] border-l border-slate-800/60 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 flex flex-col no-print relative">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-violet-900/20 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Header */}
        <div className="p-6 border-b border-slate-800/60 flex items-center justify-between bg-[#131c31] text-white relative z-10">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl transition-colors border border-slate-700/50">
              <ArrowRight size={20} className="text-violet-400" />
            </button>
            <div>
              <h2 className="font-black text-xl flex items-center gap-2 text-white">
                <BrainCircuit size={20} className="text-violet-500" /> محرر الاختبارات
              </h2>
              <p className="text-slate-400 text-xs mt-1">الذكاء الاصطناعي يقرأ أفكارك في الخلفية</p>
            </div>
          </div>
        </div>

        {/* Tools & Settings */}
        <div className="p-4 border-b border-slate-800/60 flex gap-2 bg-[#0B1120] relative z-10">
          <button onClick={() => setShowTemplates(true)} className="flex-1 bg-slate-800/50 border border-slate-700/50 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:bg-violet-600/20 hover:border-violet-500/50 hover:text-violet-300 flex items-center justify-center gap-2 transition-all">
            <LayoutTemplate size={16} /> القوالب
          </button>
          <button onClick={() => setShowSettings(true)} className="flex-1 bg-slate-800/50 border border-slate-700/50 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:bg-violet-600/20 hover:border-violet-500/50 hover:text-violet-300 flex items-center justify-center gap-2 transition-all">
            <Settings size={16} /> الترويسة
          </button>
          <button onClick={() => window.print()} className="bg-violet-600 hover:bg-violet-500 text-white py-2.5 px-5 rounded-xl text-sm font-bold shadow-lg shadow-violet-600/20 transition-all flex items-center justify-center border border-violet-500/50">
            <Printer size={18} />
          </button>
        </div>

        {/* Smart Input Area */}
        <div className="p-6 flex-1 flex flex-col overflow-y-auto relative z-10 custom-scrollbar">
          <label className="block font-black text-slate-200 mb-2 flex items-center gap-2">
            <Sparkles size={16} className="text-emerald-400" /> صياغة السؤال (بث حي)
          </label>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            اكتب السؤال هنا، وسيقوم النظام بتنسيقه وفهمه تلقائياً وعرضه في الورقة مباشرة.
            لإضافة خيارات استخدم شرطة (-). مثال: ما عاصمة اليمن؟ - صنعاء - عدن - تعز
          </p>
          
          <div className="relative mb-4 flex-1">
            <textarea
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              placeholder="اكتب هنا..."
              className="w-full h-full bg-[#0B1120] border-2 border-slate-800 rounded-2xl p-5 font-bold text-slate-200 focus:outline-none focus:border-violet-500/50 transition-all resize-none shadow-inner text-lg placeholder-slate-600"
            />
          </div>

          <button 
            onClick={addQuestion}
            disabled={!editorText.trim()}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white py-4 rounded-xl text-lg font-black shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle size={20} /> إضافة السؤال للورقة
          </button>
        </div>
      </div>

      {/* ---------------- PAPER PREVIEW PANE (RIGHT SIDE) ---------------- */}
      <div className="flex-1 bg-[#1e293b] overflow-y-auto p-4 lg:p-8 flex justify-center items-start custom-scrollbar relative">
        <style>
          {`
            @media print {
              body * { visibility: hidden; }
              .print-area, .print-area * { visibility: visible; }
              .print-area { position: absolute; left: 0; top: 0; width: 100%; margin: 0; box-shadow: none !important; }
              .no-print { display: none !important; }
            }
          `}
        </style>
        
        {/* The Realistic A4 Paper */}
        <motion.div 
          layout
          className={`print-area w-[210mm] min-h-[297mm] p-[20mm_20mm] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative bg-white transition-all duration-500 ${ts.wrapper}`}
          style={{ border: ts.border, color: activeColor }}
        >
          {/* Watermarks */}
          <div className="absolute bottom-6 left-6 text-[11px] opacity-40 font-bold font-sans flex flex-col items-center">
            <span>برمجة وتطوير المهندس /سهيل الهزبري</span>
          </div>
          <div className="absolute top-1/2 left-4 text-[11px] opacity-20 font-bold font-sans whitespace-nowrap transform -rotate-90 origin-left">
            برمجة وتطوير المهندس /سهيل الهزبري - EduOS
          </div>

          {/* Dynamic Header based on template */}
          {activeTemplate === 'classic' && (
            <div className={ts.header}>
              <div className="text-right text-[14px] leading-[1.8] font-bold">
                <div>الجمهورية اليمنية</div>
                <div>وزارة التربية والتعليم</div>
                <div>مكتب التربية ب{paperInfo.governorate}</div>
                <div>{paperInfo.directorate} - {paperInfo.school}</div>
              </div>
              <div className="flex flex-col items-center">
                <img src={paperInfo.logo} alt="الشعار" className="h-[75px] object-contain mb-2" />
                <span className={ts.title}>{paperInfo.examTitle}</span>
                <span className="text-[12px] font-bold mt-2">العام الدراسي {paperInfo.year}</span>
              </div>
              <div className="text-left text-[14px] leading-[1.8]">
                <div><b>المادة:</b> {paperInfo.subject}</div>
                <div><b>الصف:</b> {paperInfo.grade} - <b>الشعبة:</b> {paperInfo.section}</div>
                <div><b>الزمن:</b> {paperInfo.time} - <b>الدرجة:</b> {paperInfo.score}</div>
                <div><b>التاريخ:</b> {paperInfo.date} م</div>
              </div>
            </div>
          )}

          {activeTemplate === 'modern' && (
            <div className={ts.header} style={{ backgroundColor: `${activeColor}08` }}>
               <div className="flex items-center gap-6">
                  <img src={paperInfo.logo} alt="الشعار" className="h-[60px] object-contain" />
                  <div>
                    <h2 className="font-black text-2xl" style={{ color: activeColor }}>{paperInfo.school}</h2>
                    <p className="text-sm opacity-70 mt-1">{paperInfo.examTitle} - {paperInfo.year}</p>
                  </div>
               </div>
               <div className="text-left text-base opacity-80 leading-relaxed font-medium">
                  <div>المادة: <b>{paperInfo.subject}</b> | الصف: <b>{paperInfo.grade}</b></div>
                  <div>الزمن: <b>{paperInfo.time}</b> | التاريخ: <b>{paperInfo.date}</b></div>
               </div>
            </div>
          )}

          {activeTemplate === 'minimalist' && (
            <div className={ts.header}>
              <img src={paperInfo.logo} alt="الشعار" className="h-[50px] opacity-80 grayscale" />
              <h1 className={ts.title}>{paperInfo.examTitle}</h1>
              <p className="text-sm tracking-widest opacity-60 font-medium">{paperInfo.subject} • {paperInfo.grade} • {paperInfo.year}</p>
            </div>
          )}

          {/* Student Info Bar */}
          {activeTemplate === 'classic' && (
            <div className={ts.studentInfo}>
              <div className="flex-[3] p-[8px_12px]"><b>اسم الطالب الثلاثي:</b> ............................................................................................</div>
              <div className="flex-1 p-[8px_12px] border-r-[2px]" style={{ borderColor: activeColor }}><b>رقم الجلوس:</b> ........................</div>
            </div>
          )}
          {activeTemplate === 'modern' && (
             <div className={ts.studentInfo} style={{ backgroundColor: `${activeColor}05`, borderColor: `${activeColor}20` }}>
                <div className="flex-1">اسم الطالب: ....................................................................</div>
                <div className="w-[2px] h-6 bg-slate-300 mx-6"></div>
                <div className="flex-1">الرقم الأكاديمي: .................................</div>
             </div>
          )}
          {activeTemplate === 'minimalist' && (
             <div className={ts.studentInfo}>
                <div>Name: __________________________________________________</div>
                <div>ID: ______________________</div>
             </div>
          )}

          {/* Questions Area */}
          <div className="mt-8">
            <AnimatePresence>
              {questions.map((q, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, height: 0 }}
                  key={idx} 
                  className={`group relative ${ts.questionBlock}`}
                >
                  {/* Delete Button (No Print) */}
                  <button 
                    onClick={() => setQuestions(questions.filter((_, i) => i !== idx))}
                    className="absolute top-4 left-4 p-2 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity no-print z-10 shadow-sm"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="flex items-start gap-4">
                    <span className="font-bold text-xl mt-0.5">{idx + 1}.</span>
                    <div className="flex-1">
                      
                      {q.type === 'tf' && (
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-[17px] leading-relaxed">{q.text}</div>
                          <div className="flex shrink-0 gap-2">
                            <div className={ts.circle} style={activeTemplate === 'modern' ? { backgroundColor: `${activeColor}15`, color: activeColor } : { borderColor: activeColor }}>ص</div>
                            <div className={ts.circle} style={activeTemplate === 'modern' ? { backgroundColor: `${activeColor}15`, color: activeColor } : { borderColor: activeColor }}>خ</div>
                          </div>
                        </div>
                      )}

                      {q.type === 'mcq' && (
                        <div>
                          <div className="font-bold text-[17px] mb-4 leading-relaxed">{q.text}</div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {q.options?.map((opt: string, oIdx: number) => (
                              <div key={oIdx} className="flex items-center gap-3">
                                <div className={ts.circle} style={activeTemplate === 'modern' ? { backgroundColor: `${activeColor}15`, color: activeColor } : { borderColor: activeColor }}>{['أ','ب','ج','د'][oIdx]}</div>
                                <span className="text-[16px] font-medium">{opt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {q.type === 'direct' && (
                        <div className="pb-6">
                          <div className="font-bold text-[17px] mb-6 leading-relaxed">{q.text}</div>
                          <div className="border-b-2 border-dotted w-full mt-8" style={{ borderColor: `${activeColor}40` }}></div>
                          <div className="border-b-2 border-dotted w-full mt-8" style={{ borderColor: `${activeColor}40` }}></div>
                          <div className="border-b-2 border-dotted w-full mt-8" style={{ borderColor: `${activeColor}40` }}></div>
                        </div>
                      )}

                      {q.type === 'complete' && (
                        <div className="pb-2">
                          <div className="font-bold text-[17px] mb-2 leading-relaxed">{q.text}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* LIVE PREVIEW OF CURRENTLY TYPED QUESTION */}
              {livePreviewQ && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 0.7 }} 
                  className={`group relative ${ts.questionBlock} border-2 border-dashed border-violet-400 bg-violet-50/50`}
                >
                  <div className="absolute top-2 right-2 bg-violet-200 text-violet-700 text-[10px] font-bold px-2 py-1 rounded-md no-print">
                    بث حي (قيد التعديل)
                  </div>
                  <div className="flex items-start gap-4 opacity-70">
                    <span className="font-bold text-xl mt-0.5">{questions.length + 1}.</span>
                    <div className="flex-1">
                      {livePreviewQ.type === 'tf' && (
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-[17px] leading-relaxed">{livePreviewQ.text}</div>
                          <div className="flex shrink-0 gap-2">
                            <div className={ts.circle} style={activeTemplate === 'modern' ? { backgroundColor: `${activeColor}15`, color: activeColor } : { borderColor: activeColor }}>ص</div>
                            <div className={ts.circle} style={activeTemplate === 'modern' ? { backgroundColor: `${activeColor}15`, color: activeColor } : { borderColor: activeColor }}>خ</div>
                          </div>
                        </div>
                      )}

                      {livePreviewQ.type === 'mcq' && (
                        <div>
                          <div className="font-bold text-[17px] mb-4 leading-relaxed">{livePreviewQ.text}</div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {livePreviewQ.options?.map((opt: string, oIdx: number) => (
                              <div key={oIdx} className="flex items-center gap-3">
                                <div className={ts.circle} style={activeTemplate === 'modern' ? { backgroundColor: `${activeColor}15`, color: activeColor } : { borderColor: activeColor }}>{['أ','ب','ج','د'][oIdx]}</div>
                                <span className="text-[16px] font-medium">{opt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {livePreviewQ.type === 'direct' && (
                        <div className="pb-6">
                          <div className="font-bold text-[17px] mb-6 leading-relaxed">{livePreviewQ.text}</div>
                          <div className="border-b-2 border-dotted w-full mt-8" style={{ borderColor: `${activeColor}40` }}></div>
                          <div className="border-b-2 border-dotted w-full mt-8" style={{ borderColor: `${activeColor}40` }}></div>
                          <div className="border-b-2 border-dotted w-full mt-8" style={{ borderColor: `${activeColor}40` }}></div>
                        </div>
                      )}

                      {livePreviewQ.type === 'complete' && (
                        <div className="pb-2">
                          <div className="font-bold text-[17px] mb-2 leading-relaxed">{livePreviewQ.text}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {questions.length === 0 && !livePreviewQ && (
              <div className="text-center py-32 opacity-30 no-print flex flex-col items-center">
                <LayoutTemplate size={64} className="mb-6" />
                <p className="text-2xl font-bold">ورقة الاختبار فارغة</p>
                <p className="text-base mt-2">ابدأ بكتابة الأسئلة في المحرر الجانبي لتظهر هنا فوراً وبشكل سحري.</p>
              </div>
            )}
          </div>

        </motion.div>
      </div>

      {/* Settings Dialog (Dark Mode) */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 bg-[#0B1120]/80 backdrop-blur-md z-50 flex items-center justify-center no-print p-4">
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#131c31] border border-slate-700/50 rounded-3xl p-8 w-full max-w-2xl shadow-2xl">
                <div className="flex justify-between items-center mb-8 text-white">
                  <h3 className="font-black text-xl flex items-center gap-2"><Settings className="text-violet-500"/> تعديل بيانات الترويسة</h3>
                  <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:bg-slate-800 p-2 rounded-full"><X size={20}/></button>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-8 h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                   {Object.keys(paperInfo).map((key) => {
                     if(key === 'logo') return null;
                     return (
                       <div key={key}>
                         <label className="block text-sm font-bold text-slate-400 mb-2">{key}</label>
                         <input 
                           type="text" 
                           value={(paperInfo as any)[key]} 
                           onChange={(e) => setPaperInfo({...paperInfo, [key]: e.target.value})} 
                           className="w-full bg-[#0B1120] border border-slate-700/50 rounded-xl p-3 font-bold text-slate-200 text-sm focus:border-violet-500 outline-none transition-colors" 
                         />
                       </div>
                     )
                   })}
                </div>
                <button onClick={() => setShowSettings(false)} className="w-full bg-violet-600 text-white font-black text-lg py-4 rounded-xl hover:bg-violet-500 transition-colors shadow-lg shadow-violet-600/20">حفظ وتطبيق</button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Templates Dialog (Dark Mode) */}
      <AnimatePresence>
        {showTemplates && (
          <div className="fixed inset-0 bg-[#0B1120]/80 backdrop-blur-md z-50 flex items-center justify-center no-print p-4">
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#131c31] border border-slate-700/50 rounded-3xl p-8 w-full max-w-3xl shadow-2xl">
                <div className="flex justify-between items-center mb-8 text-white">
                  <h3 className="font-black text-xl flex items-center gap-2"><Palette className="text-violet-500"/> تصميم الورقة (القوالب والألوان)</h3>
                  <button onClick={() => setShowTemplates(false)} className="text-slate-400 hover:bg-slate-800 p-2 rounded-full"><X size={20}/></button>
                </div>
                
                <h4 className="font-bold text-sm text-slate-400 mb-4">اختر القالب (الهيكلية)</h4>
                <div className="grid grid-cols-3 gap-6 mb-10">
                  {[
                    { id: 'classic', name: 'الكلاسيكي (الوزاري)', icon: <LayoutTemplate /> },
                    { id: 'modern', name: 'الحديث (المدارس الخاصة)', icon: <Check /> },
                    { id: 'minimalist', name: 'التبسيطي (الجامعات)', icon: <Square /> },
                  ].map(t => (
                    <button 
                      key={t.id} 
                      onClick={() => setActiveTemplate(t.id as any)}
                      className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${activeTemplate === t.id ? 'border-violet-500 bg-violet-500/10 text-violet-300' : 'border-slate-700/50 bg-[#0B1120] text-slate-400 hover:border-slate-600'}`}
                    >
                      {t.icon}
                      <span className="font-bold text-base">{t.name}</span>
                    </button>
                  ))}
                </div>

                <h4 className="font-bold text-sm text-slate-400 mb-4">اختر اللون الأساسي للطباعة</h4>
                <div className="flex gap-6 mb-10">
                  {['#000000', '#1e3a8a', '#047857', '#7c3aed', '#b91c1c', '#0f766e'].map(color => (
                     <button 
                       key={color} 
                       onClick={() => setActiveColor(color)}
                       className={`w-14 h-14 rounded-full border-4 transition-all flex items-center justify-center ${activeColor === color ? 'border-violet-400 scale-110 shadow-[0_0_20px_rgba(139,92,246,0.3)]' : 'border-slate-700'}`}
                       style={{ backgroundColor: color }}
                     >
                       {activeColor === color && <Check className="text-white drop-shadow-md" />}
                     </button>
                  ))}
                </div>

                <button onClick={() => setShowTemplates(false)} className="w-full bg-violet-600 text-white font-black text-lg py-4 rounded-xl hover:bg-violet-500 transition-colors shadow-lg shadow-violet-600/20">تطبيق التصميم</button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
