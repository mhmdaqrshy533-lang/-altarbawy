import React, { useState } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { EditorElement } from '../types';
import { 
  Calculator, Zap, FlaskConical, BookOpen, Globe, 
  Plus, Check, Sparkles, Hash, CornerDownLeft
} from 'lucide-react';

export const SubjectToolbar: React.FC = () => {
  const { document, activePageIndex, addElement, addQuestion, updateMetadata } = useEditorStore();
  const currentSubject = document.metadata.subject || 'الرياضيات';

  const [activeTab, setActiveTab] = useState<string>(() => {
    if (currentSubject.includes('فيزياء')) return 'physics';
    if (currentSubject.includes('كيمياء')) return 'chemistry';
    if (currentSubject.includes('عرب')) return 'arabic';
    if (currentSubject.includes('إنجليز') || currentSubject.includes('English')) return 'english';
    return 'math';
  });

  const handleInsertMathLatex = (latex: string) => {
    const newMath: EditorElement = {
      id: crypto.randomUUID(),
      type: 'math',
      x: 200,
      y: 280,
      width: 300,
      height: 70,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: 4,
      latex,
      fontSize: 20,
      color: '#0f172a'
    };
    addElement(activePageIndex, newMath);
  };

  const handleInsertPhysicsSVG = (svg: string) => {
    const newPhysics: EditorElement = {
      id: crypto.randomUUID(),
      type: 'physics',
      x: 200,
      y: 280,
      width: 160,
      height: 130,
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

  const handleInsertArabicVerse = () => {
    const verseHTML = `
      <div style="width:100%; font-family:serif; font-size:16px; font-weight:bold; color:#0f172a; text-align:center; padding:8px 0; border-top:1px border-slate-300; border-bottom:1px border-slate-300;">
        <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:20px;">
          <div style="flex:1; text-align:right;">الشَـوْقُ يَحْـدُونِي إِلى خَـيْرِ المَـلأ</div>
          <div style="font-weight:900; color:#475569;">***</div>
          <div style="flex:1; text-align:left;">والمَـجْـدُ يَبْنِـي في ذُرَا العُـلْيَا خُـطَا</div>
        </div>
      </div>
    `;
    const newText: EditorElement = {
      id: crypto.randomUUID(),
      type: 'text',
      x: 50,
      y: 300,
      width: 694,
      height: 60,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: 3,
      content: verseHTML,
      fontSize: 16,
      fontFamily: 'Amiri',
      fontWeight: 'bold',
      color: '#0f172a',
      textAlign: 'center'
    };
    addElement(activePageIndex, newText);
  };

  const handleInsertEnglishReadingPassage = () => {
    const passageText = `
      <div style="direction:ltr; text-align:left; font-family:sans-serif; background:#f8fafc; border:1.5px solid #334155; padding:12px; border-radius:8px;">
        <h4 style="margin:0 0 6px 0; font-weight:bold; font-size:13px; color:#0f172a;">Reading Comprehension Passage:</h4>
        <p style="margin:0; font-size:12px; line-height:1.6; color:#334155;">
          Artificial Intelligence is transforming global education by customizing learning pathways for students. Educators utilize specialized analytical tools to track individual academic progress accurately.
        </p>
      </div>
    `;
    const newText: EditorElement = {
      id: crypto.randomUUID(),
      type: 'text',
      x: 50,
      y: 300,
      width: 694,
      height: 110,
      rotation: 0,
      isLocked: false,
      isHidden: false,
      zIndex: 3,
      content: passageText,
      fontSize: 14,
      fontFamily: 'Inter',
      fontWeight: 'normal',
      color: '#0f172a',
      textAlign: 'left'
    };
    addElement(activePageIndex, newText);
  };

  return (
    <div className="bg-slate-900 text-white p-2 px-4 border-b border-slate-800 flex items-center justify-between gap-3 text-xs font-sans overflow-x-auto select-none" dir="rtl">
      {/* Subject Mode Selector Tabs */}
      <div className="flex items-center gap-1 shrink-0 bg-slate-800 p-1 rounded-xl">
        <button 
          onClick={() => { setActiveTab('math'); updateMetadata({ subject: 'الرياضيات' }); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeTab === 'math' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calculator size={14} />
          <span>محرر الرياضيات</span>
        </button>

        <button 
          onClick={() => { setActiveTab('physics'); updateMetadata({ subject: 'الفيزياء' }); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeTab === 'physics' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Zap size={14} />
          <span>محرر الفيزياء</span>
        </button>

        <button 
          onClick={() => { setActiveTab('chemistry'); updateMetadata({ subject: 'الكيمياء' }); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeTab === 'chemistry' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FlaskConical size={14} />
          <span>محرر الكيمياء</span>
        </button>

        <button 
          onClick={() => { setActiveTab('arabic'); updateMetadata({ subject: 'اللغة العربية' }); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeTab === 'arabic' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen size={14} />
          <span>اللغة العربية</span>
        </button>

        <button 
          onClick={() => { setActiveTab('english'); updateMetadata({ subject: 'اللغة الإنجليزية' }); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeTab === 'english' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Globe size={14} />
          <span>English</span>
        </button>
      </div>

      {/* Dynamic Active Toolbar Tools */}
      <div className="flex items-center gap-2 overflow-x-auto py-0.5 custom-scrollbar">
        {/* Math Tools */}
        {activeTab === 'math' && (
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] text-indigo-300 font-bold ml-1">أدوات الرياضيات:</span>
            <button 
              onClick={() => handleInsertMathLatex('\\frac{a}{b}')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg font-mono text-xs border border-slate-700 transition-colors"
              title="كسر اعتيادي"
            >
              \frac&#123;a&#125;&#123;b&#125;
            </button>
            <button 
              onClick={() => handleInsertMathLatex('\\sqrt[n]{x}')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg font-mono text-xs border border-slate-700 transition-colors"
              title="جذر"
            >
              \sqrt&#123;x&#125;
            </button>
            <button 
              onClick={() => handleInsertMathLatex('\\lim_{x \\to 0} f(x)')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg font-mono text-xs border border-slate-700 transition-colors"
              title="نهايات"
            >
              \lim
            </button>
            <button 
              onClick={() => handleInsertMathLatex('\\int_{a}^{b} f(x) dx')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg font-mono text-xs border border-slate-700 transition-colors"
              title="تكامل"
            >
              \int
            </button>
            <button 
              onClick={() => handleInsertMathLatex('\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg font-mono text-xs border border-slate-700 transition-colors"
              title="مصفوفة"
            >
              مصفوفة
            </button>

            <div className="h-4 w-px bg-slate-700 mx-1"></div>

            <button 
              onClick={() => handleInsertMathLatex('\\therefore \\quad \\because \\quad \\angle A \\quad \\Delta ABC \\quad AB \\perp CD \\quad L_1 \\parallel L_2')}
              className="px-2 py-1 bg-indigo-950 text-indigo-300 hover:bg-indigo-800 hover:text-white rounded-lg text-xs font-bold border border-indigo-800 transition-colors"
            >
              رموز البرهان (∴ ، ∵ ، ∠ ، ⊥)
            </button>
          </div>
        )}

        {/* Physics Tools */}
        {activeTab === 'physics' && (
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] text-amber-300 font-bold ml-1">رسوم وأجهزة الفيزياء:</span>
            <button 
              onClick={() => handleInsertPhysicsSVG(`<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;"><polygon points="60,15 15,85 105,85" stroke="black" stroke-width="2.5" fill="none"/><line x1="1" y1="65" x2="38" y2="52" stroke="red" stroke-width="2"/><line x1="38" y1="52" x2="82" y2="52" stroke="red" stroke-width="2" stroke-dasharray="2"/><line x1="82" y1="52" x2="119" y2="75" stroke="red" stroke-width="2"/><text x="40" y="42" font-size="9" font-family="sans-serif">A</text></svg>`)}
              className="px-2.5 py-1 bg-slate-800 hover:bg-amber-600 text-white rounded-lg text-xs font-bold border border-slate-700 transition-colors"
            >
              منشور زجاجي
            </button>
            <button 
              onClick={() => handleInsertPhysicsSVG(`<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;"><rect x="20" y="20" width="80" height="50" rx="3" stroke="black" stroke-width="2" fill="none"/><line x1="50" y1="20" x2="50" y2="10" stroke="black" stroke-width="2"/><line x1="70" y1="20" x2="70" y2="10" stroke="black" stroke-width="2"/><path d="M40 70 L48 65 L56 75 L64 65 L72 75 L80 70" stroke="red" stroke-width="2" fill="none"/><circle cx="50" cy="20" r="3" fill="black"/><circle cx="70" cy="20" r="3" fill="black"/><text x="54" y="60" font-size="9" fill="red">R</text></svg>`)}
              className="px-2.5 py-1 bg-slate-800 hover:bg-amber-600 text-white rounded-lg text-xs font-bold border border-slate-700 transition-colors"
            >
              دائرة كهربائية
            </button>
            <button 
              onClick={() => handleInsertPhysicsSVG(`<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;"><line x1="10" y1="80" x2="110" y2="80" stroke="black" stroke-width="3"/><rect x="40" y="45" width="40" height="35" stroke="black" stroke-width="2" fill="#f1f5f9"/><line x1="60" y1="62" x2="100" y2="32" stroke="blue" stroke-width="2" marker-end="url(#arrow)"/><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 Z" fill="blue"/></marker></defs><text x="85" y="48" font-size="8" fill="blue">F</text></svg>`)}
              className="px-2.5 py-1 bg-slate-800 hover:bg-amber-600 text-white rounded-lg text-xs font-bold border border-slate-700 transition-colors"
            >
              متجه قوة
            </button>

            <div className="h-4 w-px bg-slate-700 mx-1"></div>

            <div className="flex items-center gap-1 font-mono text-xs text-amber-300">
              <span>الوحدات: N , J , W , Ω , V , A , Hz , m/s²</span>
            </div>
          </div>
        )}

        {/* Chemistry Tools */}
        {activeTab === 'chemistry' && (
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] text-emerald-300 font-bold ml-1">أدوات الكيمياء:</span>
            <button 
              onClick={() => handleInsertMathLatex('2H_2 + O_2 \\xrightarrow[\\Delta]{\\text{حرارة}} 2H_2O')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold border border-slate-700 transition-colors"
            >
              معادلة تفاعل
            </button>
            <button 
              onClick={() => handleInsertMathLatex('N_2 + 3H_2 \\rightleftharpoons 2NH_3')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold border border-slate-700 transition-colors"
            >
              تفاعل متزن ⇌
            </button>
            
            <div className="h-4 w-px bg-slate-700 mx-1"></div>

            <span className="text-[10px] text-emerald-400">حالات المادة: (s) (l) (g) (aq)</span>
          </div>
        )}

        {/* Arabic Tools */}
        {activeTab === 'arabic' && (
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] text-rose-300 font-bold ml-1">أدوات اللغة العربية:</span>
            <button 
              onClick={handleInsertArabicVerse}
              className="px-2.5 py-1 bg-slate-800 hover:bg-rose-600 text-white rounded-lg text-xs font-bold border border-slate-700 transition-colors"
            >
              إدراج بيت شعري متناظر
            </button>
            <button 
              onClick={() => addQuestion(activePageIndex, '﴿ ثُمَّ إِذَا شَاءَ أَنشَرَهُ ﴾ - بين الأحكام التجويدية في الآية الكريمة.')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-rose-600 text-white rounded-lg text-xs font-bold border border-slate-700 transition-colors"
            >
              آية قرآنية ﴿ ﴾
            </button>
            <button 
              onClick={() => addQuestion(activePageIndex, '« إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ » - اخرج فوائد الحديث الشريف.')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-rose-600 text-white rounded-lg text-xs font-bold border border-slate-700 transition-colors"
            >
              حديث شريف « »
            </button>
          </div>
        )}

        {/* English Tools */}
        {activeTab === 'english' && (
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] text-cyan-300 font-bold ml-1">English Tools:</span>
            <button 
              onClick={handleInsertEnglishReadingPassage}
              className="px-2.5 py-1 bg-slate-800 hover:bg-cyan-600 text-white rounded-lg text-xs font-bold border border-slate-700 transition-colors"
            >
              Insert Reading Passage
            </button>
            <button 
              onClick={() => addQuestion(activePageIndex, 'Choose the correct form of the verb: She _______ (visit/visits/visiting) the museum every Monday.')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-cyan-600 text-white rounded-lg text-xs font-bold border border-slate-700 transition-colors"
            >
              Grammar MCQ Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
