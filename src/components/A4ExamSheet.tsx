import React from 'react';
import { 
  ExamHeader, 
  ExamQuestion, 
  ExamTheme, 
  MANDATORY_COPYRIGHT 
} from '../types/exam';

interface A4ExamSheetProps {
  header: ExamHeader;
  questions: ExamQuestion[];
  theme: ExamTheme;
  showAnswerKey?: boolean;
  onEditHeader?: () => void;
  onEditQuestion?: (question: ExamQuestion) => void;
  isPrintMode?: boolean;
}

export const A4ExamSheet: React.FC<A4ExamSheetProps> = ({
  header,
  questions,
  theme,
  showAnswerKey = false,
  onEditHeader,
  onEditQuestion,
  isPrintMode = false
}) => {
  // Group questions by type/section
  const passage = questions.find(q => q.type === 'passage');
  const tfQuestions = questions.filter(q => q.type === 'tf');
  const poetry = questions.find(q => q.type === 'poetry');
  const mcqQuestions = questions.filter(q => q.type === 'mcq');
  const essayQuestions = questions.filter(q => q.type === 'essay');

  const fontClass = 
    theme.fontFamily === 'amiri' 
      ? 'font-amiri' 
      : theme.fontFamily === 'naskh' 
        ? 'font-naskh' 
        : 'font-cairo';

  const baseFontSize = 
    theme.fontSize === 'compact' 
      ? 'text-[7.2pt] leading-[1.3]' 
      : theme.fontSize === 'large' 
        ? 'text-[8.5pt] leading-[1.4]' 
        : 'text-[7.8pt] leading-[1.35]';

  return (
    <div 
      className={`a4-sheet-render relative bg-white text-[#111111] select-text shadow-2xl transition-all duration-200 ${fontClass} ${baseFontSize}`}
      style={{
        width: '210mm',
        height: '297mm',
        maxHeight: '297mm',
        padding: '6.5mm 8.5mm',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden'
      }}
      dir="rtl"
    >
      {/* === 4 OMR CORNER ALIGNMENT MARKS (7mm x 7mm, 3mm from edges) === */}
      <div className="absolute top-[3mm] left-[3mm] w-[7mm] h-[7mm] bg-black z-30" title="OMR Mark Top-Left" />
      <div className="absolute top-[3mm] right-[3mm] w-[7mm] h-[7mm] bg-black z-30" title="OMR Mark Top-Right" />
      <div className="absolute bottom-[3mm] left-[3mm] w-[7mm] h-[7mm] bg-black z-30" title="OMR Mark Bottom-Left" />
      <div className="absolute bottom-[3mm] right-[3mm] w-[7mm] h-[7mm] bg-black z-30" title="OMR Mark Bottom-Right" />

      {/* TOP SECTION: Header + Tables + Banner */}
      <div className="w-full shrink-0">
        
        {/* 1. Official Header */}
        <div 
          onClick={onEditHeader}
          className="cursor-pointer hover:ring-1 hover:ring-emerald-500/50 rounded-sm transition p-0.5"
          title="انقر لتعديل الترويسة المدرسية"
        >
          <table className="w-full border-collapse mb-1 text-[7.2pt] leading-[1.3] font-semibold text-[#1a2521]">
            <tbody>
              <tr>
                {/* Right: Ministerial Directorate */}
                <td className="w-[38%] text-right align-middle">
                  <div>{header.republicText}</div>
                  <div>{header.ministryText}</div>
                  <div>{header.officeText}</div>
                  <div>{header.directorateText}</div>
                  <div className="font-extrabold text-[#073823]">{header.schoolName}</div>
                </td>

                {/* Center: Logo & Exam Box */}
                <td className="w-[24%] text-center align-middle">
                  <div className="w-12 h-12 mx-auto mb-1 flex items-center justify-center">
                    {header.logoUrl ? (
                      <img 
                        src={header.logoUrl} 
                        alt="شعار" 
                        className="max-w-full max-h-full object-contain" 
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full border border-[#0d5c3a] bg-[#f2f7f4] flex flex-col items-center justify-center text-[#0d5c3a] text-[7pt] font-black shadow-xs">
                        <span>الرقيم</span>
                        <span className="text-[5pt]">OMR</span>
                      </div>
                    )}
                  </div>
                  <div className="border-[1.5pt] border-[#0d5c3a] bg-[#f2f7f4] rounded px-1.5 py-0.5 text-[7.5pt] font-black text-[#0d5c3a] leading-tight shadow-xs">
                    <div>{header.examTitle}</div>
                    <div>النموذج ( {header.modelName || 'أ'} ) — أتمتة</div>
                  </div>
                </td>

                {/* Left: Class & Subject Metadata */}
                <td className="w-[38%] text-left align-middle font-medium">
                  <div>الصف: {header.grade}</div>
                  <div>الشعبة: ( {header.sectionName || 'أ'} )</div>
                  <div>المادة: <b className="text-[#073823]">{header.subject}</b></div>
                  <div>الزمن: {header.duration}</div>
                  <div>العام الدراسي: {header.academicYear}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 2. Student Info & Barcode Table */}
        {theme.showStudentInfo && (
          <table className="w-full border-collapse mb-1 text-[7.2pt] border border-[#0d5c3a]">
            <tbody>
              <tr>
                <td className="border border-[#0d5c3a] bg-[#e8f0eb] font-bold text-[#073823] text-center w-[12%] py-0.5">
                  اسم الطالب:
                </td>
                <td className="border border-[#0d5c3a] text-right font-bold w-[48%] px-2 text-[#333]">
                  .........................................................................................
                </td>
                <td className="border border-[#0d5c3a] bg-[#e8f0eb] font-bold text-[#073823] text-center w-[12%] py-0.5">
                  رقم الجلوس:
                </td>
                <td className="border border-[#0d5c3a] text-center font-bold w-[12%] text-[#333]">
                  ( .......... )
                </td>
                <td className="border border-[#0d5c3a] bg-[#e8f0eb] font-bold text-[#073823] text-center w-[8%] py-0.5">
                  الرمز:
                </td>
                <td className="border border-[#0d5c3a] text-center w-[8%] font-mono text-[7pt] tracking-widest bg-slate-50">
                  {header.barcodeText || '||||||||'}
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {/* 3. Official Marks & Grading Table */}
        {theme.showMarksTable && (
          <table className="w-full border-collapse mb-1 text-[7.2pt] border border-[#0d5c3a] text-center">
            <thead>
              <tr className="bg-[#e8f0eb] font-bold text-[#073823]">
                <td className="border border-[#0d5c3a] w-[20%] py-0.5">درجة الاختيار (OMR)</td>
                <td className="border border-[#0d5c3a] w-[20%] py-0.5">درجة المقالي</td>
                <td className="border border-[#0d5c3a] w-[20%] py-0.5">الدرجة الكلية</td>
                <td className="border border-[#0d5c3a] w-[20%] py-0.5">توقيع المصحح الآلي/المراجع</td>
                <td className="border border-[#0d5c3a] w-[20%] py-0.5 text-red-700">اعتماد الكنترول</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#0d5c3a] py-0.5">/ {header.omrMarks || 20}</td>
                <td className="border border-[#0d5c3a] py-0.5">/ {header.essayMarks || 10}</td>
                <td className="border border-[#0d5c3a] py-0.5 font-extrabold text-[8pt] bg-slate-50 text-[#073823]">
                  / {header.totalMarks || 30}
                </td>
                <td className="border border-[#0d5c3a] py-0.5 text-slate-500">توقيع: ................</td>
                <td className="border border-[#0d5c3a] py-0.5 text-slate-400">ختم: </td>
              </tr>
            </tbody>
          </table>
        )}

        {/* 4. Green Directive Banner */}
        <div className="w-full bg-[#073823] text-white px-2 py-0.5 rounded-xs text-[7.2pt] font-bold mb-1 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="w-1/4 text-right">الدرجة الكلية: ({header.totalMarks || 30} درجة)</span>
            <span className="w-2/4 text-center">أجب مستعيناً بالله بظل الدائرة المعبرة عن الإجابة الصحيحة بالقلم الأزرق أو الأسود</span>
            <span className="w-1/4 text-left">نظام الأتمتة OMR — نموذج ({header.modelName || 'أ'})</span>
          </div>
        </div>

        {/* 5. Instructions Alert Box */}
        {theme.showInstructions && (
          <div className="border border-[#b2d2c4] bg-[#f7faf8] rounded-xs px-2 py-0.5 mb-1 text-[7pt] text-[#111] leading-tight">
            <b>تنبيهات التصحيح الآلي:</b>
            <span className="mx-1">تظليل صحيح: <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0d5c3a] align-middle mx-0.5" /></span> | 
            <span className="mx-1">تظليل خاطئ: <span className="inline-block w-2.5 h-2.5 rounded-full border border-[#0d5c3a] align-middle mx-0.5" /> ✗ / <span className="inline-block w-2.5 h-2.5 rounded-full border border-[#0d5c3a] align-middle mx-0.5" /> ✓</span> | 
            <span className="mr-1">* استخدم قلم الجاف الأزرق أو الأسود ولا تضع أي علامات أو ثنيات خارج الدوائر المحددة.</span>
          </div>
        )}
      </div>

      {/* MIDDLE SECTION: Questions Content */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        
        {/* Optional Reading Passage */}
        {passage && (
          <div 
            onClick={() => onEditQuestion?.(passage)}
            className="bg-[#fcfdfe] border border-[#d0d7d1] border-r-[3.5px] border-r-[#0d5c3a] p-1.5 rounded-xs text-[7.3pt] text-justify leading-relaxed cursor-pointer hover:bg-emerald-50/40 transition mb-1 shadow-2xs"
          >
            <b className="text-[#073823] block mb-0.5">{passage.text}</b>
            {passage.passageText}
          </div>
        )}

        {/* SECTION 1: True / False (أسئلة الصواب والخطأ) */}
        {tfQuestions.length > 0 && (
          <div className="mb-1">
            <div className="font-extrabold bg-[#e8f0eb] px-2 py-0.5 border-r-[3.5px] border-r-[#0d5c3a] text-[7.8pt] text-[#073823] rounded-l-xs flex justify-between items-center mb-0.5">
              <span>أولاً: أسئلة الصواب والخطأ (ظلل ص للإجابة الصحيحة، أو خ للإجابة الخاطئة):</span>
              <span className="text-[6.8pt] font-bold text-[#0d5c3a]">[{tfQuestions.reduce((a, b) => a + (b.points || 1.5), 0)} درجات]</span>
            </div>

            <table className="w-full border-collapse">
              <tbody>
                {tfQuestions.map((q, idx) => {
                  const isCorrectT = q.correctAnswer === 'T';
                  const isCorrectF = q.correctAnswer === 'F';

                  return (
                    <tr 
                      key={q.id || idx} 
                      onClick={() => onEditQuestion?.(q)}
                      className="cursor-pointer hover:bg-emerald-50/50 transition border-b border-slate-100/70"
                    >
                      <td className="w-5 text-right font-extrabold text-[#0d5c3a] align-top pt-0.5 text-[7.5pt]">
                        {q.questionNumber || (idx + 1)}.
                      </td>
                      <td className="text-right align-top pt-0.5 text-[7.3pt] leading-tight text-[#1a2521] pl-2">
                        {q.text}
                      </td>
                      <td className="w-24 text-left whitespace-nowrap align-middle py-0.5">
                        <div className="inline-flex items-center gap-2">
                          <div className="inline-flex items-center gap-1">
                            <span 
                              className={`w-3.5 h-3.5 rounded-full border border-[#0d5c3a] text-center font-bold text-[6.5pt] flex items-center justify-center transition ${
                                showAnswerKey && isCorrectT 
                                  ? 'bg-[#0d5c3a] text-white font-black ring-1 ring-emerald-500' 
                                  : 'bg-white text-[#0d5c3a]'
                              }`}
                            >
                              ص
                            </span>
                            <span className="text-[6.8pt] font-semibold text-slate-700">صواب</span>
                          </div>

                          <div className="inline-flex items-center gap-1">
                            <span 
                              className={`w-3.5 h-3.5 rounded-full border border-[#0d5c3a] text-center font-bold text-[6.5pt] flex items-center justify-center transition ${
                                showAnswerKey && isCorrectF 
                                  ? 'bg-[#0d5c3a] text-white font-black ring-1 ring-emerald-500' 
                                  : 'bg-white text-[#0d5c3a]'
                              }`}
                            >
                              خ
                            </span>
                            <span className="text-[6.8pt] font-semibold text-slate-700">خطأ</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Optional Poetry Highlight Box */}
        {poetry && (
          <div 
            onClick={() => onEditQuestion?.(poetry)}
            className="bg-[#fcfdfe] border border-dashed border-[#0d5c3a] rounded-xs px-2 py-1 my-0.5 text-center cursor-pointer hover:bg-emerald-50/40 transition"
          >
            <div className="text-[7pt] font-bold text-slate-600 mb-0.5">{poetry.text}</div>
            <div className="font-amiri text-[8.5pt] font-bold text-[#0d5c3a] tracking-wide">
              {poetry.passageText || '"إِذَا المَلِكُ الجَبَّارُ صَعَّرَ خَدَّهُ ... مَشَيْنَا إلَيْهِ بالسُّيُوفِ نُعَاتِبُهْ"'}
            </div>
          </div>
        )}

        {/* SECTION 2: Multiple Choice (أسئلة الاختيار من متعدد) */}
        {mcqQuestions.length > 0 && (
          <div className="mb-1">
            <div className="font-extrabold bg-[#e8f0eb] px-2 py-0.5 border-r-[3.5px] border-r-[#0d5c3a] text-[7.8pt] text-[#073823] rounded-l-xs flex justify-between items-center mb-0.5">
              <span>ثانياً: أسئلة الاختيار من متعدد (ظلل دائرة الرمز المناسب لكل فقرة):</span>
              <span className="text-[6.8pt] font-bold text-[#0d5c3a]">[{mcqQuestions.reduce((a, b) => a + (b.points || 2), 0)} درجات]</span>
            </div>

            <table className="w-full border-collapse">
              <tbody>
                {mcqQuestions.map((q, idx) => {
                  const options = q.options || [
                    { id: 'A', label: 'أ', text: 'الخيار الأول' },
                    { id: 'B', label: 'ب', text: 'الخيار الثاني' },
                    { id: 'C', label: 'ج', text: 'الخيار الثالث' },
                    { id: 'D', label: 'د', text: 'الخيار الرابع' }
                  ];

                  return (
                    <tr 
                      key={q.id || idx}
                      onClick={() => onEditQuestion?.(q)}
                      className="cursor-pointer hover:bg-emerald-50/50 transition border-b border-slate-100/70"
                    >
                      <td className="w-5 text-right font-extrabold text-[#0d5c3a] align-top pt-0.5 text-[7.5pt]">
                        {q.questionNumber || (idx + tfQuestions.length + 1)}.
                      </td>
                      <td className="text-right align-top pt-0.5 pb-1">
                        <div className="text-[7.3pt] font-semibold text-[#1a2521] leading-tight mb-0.5">
                          {q.text}
                        </div>
                        
                        {/* Horizontal Bubble Group */}
                        <div className="flex items-center justify-between flex-wrap gap-x-2 gap-y-0.5 text-[7pt]">
                          {options.map((opt) => {
                            const isSelectedInAnswerKey = showAnswerKey && q.correctAnswer === opt.id;

                            return (
                              <div key={opt.id} className="inline-flex items-center gap-1 shrink-0">
                                <span 
                                  className={`w-3.5 h-3.5 rounded-full border border-[#0d5c3a] text-center font-bold text-[6.5pt] flex items-center justify-center transition shrink-0 ${
                                    isSelectedInAnswerKey 
                                      ? 'bg-[#0d5c3a] text-white font-black ring-1 ring-emerald-500' 
                                      : 'bg-white text-[#0d5c3a]'
                                  }`}
                                >
                                  {opt.label}
                                </span>
                                <span className="text-[#222] font-medium leading-none">{opt.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* SECTION 3: Written Essay & Expression (سؤال مقالي / تعبير كتابي) */}
        {essayQuestions.length > 0 && (
          <div className="mb-0.5">
            <div className="font-extrabold bg-[#e8f0eb] px-2 py-0.5 border-r-[3.5px] border-r-[#0d5c3a] text-[7.8pt] text-[#073823] rounded-l-xs flex justify-between items-center mb-0.5">
              <span>ثالثاً: التعبير الكتابي والمقالي (يُصحح يدوياً بواسطة المعلم):</span>
              <span className="text-[6.8pt] font-bold text-[#0d5c3a]">[{essayQuestions.reduce((a, b) => a + (b.points || 3), 0)} درجات]</span>
            </div>

            {essayQuestions.map((eq, i) => (
              <div 
                key={eq.id || i}
                onClick={() => onEditQuestion?.(eq)}
                className="cursor-pointer hover:bg-emerald-50/40 p-1 rounded transition"
              >
                <div className="text-[7.2pt] text-[#111] mb-1">
                  <b>{eq.questionNumber || (tfQuestions.length + mcqQuestions.length + 1)}.</b> {eq.text}
                </div>
                
                {/* Ruled lines for student handwriting */}
                <div className="border border-[#c0d4ca] bg-[#fafbfb] rounded-xs p-1 space-y-2">
                  {Array.from({ length: eq.essayLinesCount || 3 }).map((_, lineIdx) => (
                    <div 
                      key={lineIdx} 
                      className="border-b border-dashed border-slate-400/80 h-3.5 w-full"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* BOTTOM SECTION: Signatures & Mandatory Copyright */}
      <div className="w-full shrink-0 border-t-[1.2pt] border-[#0d5c3a] pt-1 mt-1">
        <table className="w-full border-collapse text-center text-[7.2pt]">
          <tbody>
            <tr>
              <td className="w-1/3 text-right">
                <b>معد الاختبار (المعلم):</b> {header.teacherName || 'أ/ عبد القوي سيف محمد'}<br />
                <span className="text-[6.5pt] text-slate-500">التوقيع: .................................</span>
              </td>
              <td className="w-1/3 text-center font-extrabold text-[#0d5c3a] text-[7.8pt]">
                انتهت الأسئلة بحمد الله وتوفيقه<br />
                <span className="text-[6.2pt] text-slate-600 font-normal">نظام الاختبارات المؤتمتة — {header.schoolName}</span>
              </td>
              <td className="w-1/3 text-left">
                <b>مدير المدرسة:</b> {header.principalName || 'أ/ محمد عبد المغني'}<br />
                <span className="text-[6.5pt] text-slate-500">الختم والتوقيع: .................................</span>
              </td>
            </tr>
          </tbody>
        </table>

        {/* 👑 MANDATORY COPYRIGHT TAG */}
        <div className="text-center text-[6.5pt] text-slate-600 font-bold mt-1 tracking-tight select-none border-t border-slate-200/60 pt-0.5">
          {MANDATORY_COPYRIGHT}
        </div>
      </div>

    </div>
  );
};
