import React from 'react';
import { OMRElement, OMRBubbleGridElement, OMRStudentIDElement, OMRHeaderElement, OMRTextElement } from './types';
import { useOMRStore } from './OMRStore';
import { BarcodeGenerator } from './BarcodeGenerator';
import { QRGenerator } from './QRGenerator';
import { Check, X as CloseIcon } from 'lucide-react';

interface BubbleEditorProps {
  element: OMRElement;
  isSelectable?: boolean;
}

export const BubbleEditor: React.FC<BubbleEditorProps> = ({ element }) => {
  const { toggleBubbleAnswer, setStudentDigit, project } = useOMRStore();
  const isInteractive = project.mode === 'preview' || project.mode === 'grading';

  // Render Header Component
  if (element.type === 'header') {
    const data = (element as OMRHeaderElement).data;
    return (
      <div className="w-full h-full bg-white border-2 border-slate-900 rounded-2xl p-3 flex flex-col justify-between select-none font-sans text-right" dir="rtl">
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-2">
          {/* Right Header info */}
          <div className="text-right text-[11px] font-black text-slate-900 leading-tight">
            <div>{data.country}</div>
            <div>{data.ministry}</div>
            <div className="text-purple-900 font-extrabold">{data.governorate}</div>
            <div className="text-slate-700">{data.school}</div>
          </div>

          {/* Center Title & Seal */}
          <div className="text-center px-2">
            <div className="text-[10px] font-bold text-slate-600 mb-1">بسم الله الرحمن الرحيم</div>
            <div className="inline-block bg-slate-900 text-white px-4 py-1 rounded-xl text-xs font-black shadow-sm">
              {data.examTitle}
            </div>
            <div className="text-[11px] font-extrabold text-slate-800 mt-1">
              مادة: <span className="text-purple-900 underline font-black">{data.subject}</span> | {data.grade}
            </div>
          </div>

          {/* Left Model Badge & QR */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center justify-center bg-purple-100 border-2 border-purple-700 rounded-xl px-3 py-1 text-center">
              <span className="text-[9px] font-extrabold text-purple-800">نموذج الإجابة</span>
              <span className="text-xl font-black text-purple-950">{data.modelCode}</span>
            </div>
            <QRGenerator value={`OMR-RAQIM-${data.subject}-${data.modelCode}`} size={52} />
          </div>
        </div>

        {/* Student metadata row */}
        <div className="grid grid-cols-4 gap-2 pt-1 text-[11px] font-extrabold text-slate-900">
          <div className="border border-slate-300 rounded-lg p-1 bg-slate-50">اسم الطالب: .........................</div>
          <div className="border border-slate-300 rounded-lg p-1 bg-slate-50">الزمن: {data.time}</div>
          <div className="border border-slate-300 rounded-lg p-1 bg-slate-50">الدرجة الكلية: {data.marks}</div>
          <div className="border border-slate-300 rounded-lg p-1 bg-slate-50">العام: {data.academicYear}</div>
        </div>
      </div>
    );
  }

  // Render Student ID Matrix (Roll Number Grid)
  if (element.type === 'student_id_matrix') {
    const matrix = element as OMRStudentIDElement;
    const digitCols = Array.from({ length: matrix.digitCount });

    return (
      <div className="w-full h-full bg-white border-2 border-slate-900 rounded-2xl p-2.5 flex flex-col justify-between font-sans select-none" dir="rtl">
        <div className="bg-slate-900 text-white text-[10px] font-black text-center py-1 rounded-lg mb-2">
          {matrix.title}
        </div>
        <div className="flex justify-around items-start flex-1 border border-slate-300 rounded-xl p-1 bg-slate-50/50">
          {digitCols.map((_, colIdx) => (
            <div key={colIdx} className="flex flex-col items-center gap-1">
              {/* Digit Box */}
              <div className="w-5 h-5 bg-white border border-slate-900 rounded font-black text-[10px] flex items-center justify-center text-slate-900 shadow-sm">
                {matrix.filledDigits[colIdx] !== undefined ? matrix.filledDigits[colIdx] : colIdx + 1}
              </div>
              {/* 0-9 Circles */}
              {Array.from({ length: 10 }).map((_, digit) => {
                const isFilled = matrix.filledDigits[colIdx] === digit;
                return (
                  <button
                    key={digit}
                    type="button"
                    onClick={() => isInteractive && setStudentDigit(matrix.id, colIdx, digit)}
                    className={`w-4 h-4 rounded-full border border-slate-900 text-[8px] font-extrabold flex items-center justify-center transition-all ${
                      isFilled 
                        ? 'bg-slate-950 text-white border-slate-950 scale-105' 
                        : 'bg-white text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {digit}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render OMR Bubble Grid
  if (element.type === 'bubble_grid') {
    const grid = element as OMRBubbleGridElement;

    const getLabels = () => {
      if (grid.questionType === 'true_false') return ['صح', 'خطأ'];
      if (grid.labelType === 'arabic') return ['أ', 'ب', 'ج', 'د', 'هـ'].slice(0, grid.choicesCount);
      if (grid.labelType === 'english') return ['A', 'B', 'C', 'D', 'E'].slice(0, grid.choicesCount);
      return ['1', '2', '3', '4', '5'].slice(0, grid.choicesCount);
    };

    const labels = getLabels();
    const totalQuestions = grid.questionCount;
    const questionsPerCol = Math.ceil(totalQuestions / grid.columns);

    return (
      <div className="w-full h-full bg-white border-2 border-slate-900 rounded-2xl p-3 font-sans select-none flex flex-col" dir="rtl">
        {/* Table Title / Banner */}
        <div className="bg-slate-900 text-white text-[11px] font-black py-1 px-3 rounded-xl flex items-center justify-between mb-2">
          <span>ورقة تظليل الأسئلة (OMR Response Grid)</span>
          <span className="text-[9px] bg-purple-600 px-2 py-0.5 rounded-md">
            {grid.questionCount} سؤال | {grid.marksPerQuestion} درجة
          </span>
        </div>

        {/* Multi-column Questions Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 overflow-hidden">
          {Array.from({ length: grid.columns }).map((_, colIdx) => {
            const startIdx = colIdx * questionsPerCol;
            const endIdx = Math.min(totalQuestions, startIdx + questionsPerCol);
            
            return (
              <div key={colIdx} className="border border-slate-300 rounded-xl overflow-hidden bg-slate-50/30 flex flex-col">
                <div className="bg-slate-200/80 border-b border-slate-300 px-2 py-1 flex items-center justify-between text-[10px] font-black text-slate-800">
                  <span className="w-8 text-center">الرقم</span>
                  <div className="flex gap-2.5 pl-1">
                    {labels.map((lbl, idx) => (
                      <span key={idx} className="w-4 text-center">{lbl}</span>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-slate-200 overflow-y-auto flex-1">
                  {Array.from({ length: endIdx - startIdx }).map((_, i) => {
                    const qNum = startIdx + i + grid.startQuestionNumber;
                    const qIdx = startIdx + i;
                    const filledList = grid.filledAnswers[qIdx] || [];

                    return (
                      <div key={qNum} className="flex items-center justify-between px-2 py-1 hover:bg-slate-100 transition-colors">
                        <span className="text-[11px] font-black text-slate-900 w-8 text-center">{qNum}</span>
                        <div className="flex gap-2.5">
                          {labels.map((lbl, idx) => {
                            const isFilled = filledList.includes(lbl);
                            
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => isInteractive && toggleBubbleAnswer(grid.id, qIdx, lbl)}
                                className={`w-5 h-5 flex items-center justify-center font-extrabold text-[10px] border-1.5 transition-all ${
                                  grid.bubbleShape === 'circle' ? 'rounded-full' : grid.bubbleShape === 'oval' ? 'rounded-lg' : 'rounded-md'
                                } ${
                                  isFilled 
                                    ? 'bg-slate-950 text-white border-slate-950 scale-105' 
                                    : 'bg-white text-slate-800 border-slate-800 hover:border-purple-600'
                                }`}
                              >
                                {lbl}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Render Calibration Anchors
  if (element.type === 'calibration_anchor') {
    return (
      <div className="w-full h-full bg-slate-950 rounded-sm flex items-center justify-center p-0.5 border-2 border-white shadow-sm">
        <div className="w-full h-full bg-slate-950 border border-white"></div>
      </div>
    );
  }

  // Render Barcode
  if (element.type === 'barcode') {
    return <BarcodeGenerator code={(element as any).code || 'OMR-YEMEN-2026'} width={element.width} height={element.height} />;
  }

  // Render QR Code
  if (element.type === 'qrcode') {
    return <QRGenerator value={(element as any).data || 'OMR-RAQIM-VALIDATION'} size={Math.min(element.width, element.height)} />;
  }

  // Render Custom Text
  if (element.type === 'text') {
    const textEl = element as OMRTextElement;
    return (
      <div 
        className="w-full h-full flex items-center font-bold px-1 select-none" 
        style={{
          fontSize: `${textEl.fontSize || 12}px`,
          fontWeight: textEl.fontWeight || 'bold',
          color: textEl.color || '#000000',
          textAlign: textEl.textAlign || 'right'
        }}
      >
        {textEl.text}
      </div>
    );
  }

  // Render Signature Box
  if (element.type === 'signature_box') {
    return (
      <div className="w-full h-full border-2 border-dashed border-slate-800 rounded-xl bg-white/80 p-2 flex flex-col justify-between text-right font-bold text-[10px] text-slate-800" dir="rtl">
        <div>{(element as any).label || 'توقيع الملاحظ / المراجع:'}</div>
        <div className="border-b border-slate-400 border-dotted mb-1"></div>
      </div>
    );
  }

  // Render Stamp Area
  if (element.type === 'stamp_area') {
    return (
      <div className="w-full h-full border-2 border-slate-800 rounded-2xl bg-white p-2 flex flex-col items-center justify-center text-center font-black text-[10px] text-slate-700 shadow-sm" dir="rtl">
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-400 flex items-center justify-center text-[9px] text-slate-400">
          ختم المدرسة
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="w-full h-full bg-slate-100 border border-slate-300 rounded flex items-center justify-center text-[10px] text-slate-500 font-bold">
      {element.type}
    </div>
  );
};
