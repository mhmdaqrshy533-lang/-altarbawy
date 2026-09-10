import React from 'react';

export interface AcademicExcellenceData {
  schoolName: string;
  studentName: string;
  appreciationText: string;
  teacherTitle: string;
  teacherName: string;
  principalTitle: string;
  principalName: string;
}

export const defaultAcademicExcellenceData: AcademicExcellenceData = {
  schoolName: "مدرسة النهضة الأهلية",
  studentName: "سهيل محمد الهزبري",
  appreciationText: "على التفوق الدراسي والآداء المتميز وحسن السيرة والسلوك كما تتقدم بالشكر لأسرة الطالب على الاهتمام وحسن المتابعة داعين لهم بمزيد من التفوق والنجاح",
  teacherTitle: "المعلم/ة :",
  teacherName: "أ. محمود البلوي",
  principalTitle: "المدير/ة :",
  principalName: "أ. عبدالإله الشريف"
};

interface Props {
  data: AcademicExcellenceData;
  onEdit: (field: keyof AcademicExcellenceData) => void;
}

export default function AcademicExcellenceCert({ data, onEdit }: Props) {
  return (
    <div className="w-[297mm] h-[210mm] bg-[#fdfaf5] text-slate-900 font-serif relative shadow-2xl overflow-hidden flex flex-col justify-between p-8 print:w-full print:h-full print:shadow-none print:m-0 select-none">
      
      {/* Outer Border */}
      <div className="absolute inset-4 border-2 border-[#b45309] pointer-events-none z-10"></div>
      <div className="absolute inset-6 border border-slate-300 pointer-events-none z-10"></div>

      {/* Top Left Geometric Diagonal Gold/Bronze Ribbon Fold */}
      <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,0 100,0 0,100" fill="#78350f" opacity="0.9" />
          <polygon points="0,0 70,0 0,70" fill="#d97706" />
          <polygon points="0,0 40,0 0,40" fill="#fef3c7" />
        </svg>
      </div>

      {/* Bottom Right Geometric Diagonal Gold/Bronze Ribbon Fold */}
      <div className="absolute bottom-0 right-0 w-56 h-56 pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="100,100 0,100 100,0" fill="#78350f" opacity="0.9" />
          <polygon points="100,100 30,100 100,30" fill="#d97706" />
          <polygon points="100,100 60,100 100,60" fill="#fbbf24" />
        </svg>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-20 flex h-full justify-between items-center">
        
        {/* LEFT COLUMN: Large Golden 3D Medal Emblem */}
        <div className="w-1/4 h-full flex flex-col items-center justify-center pl-4">
          <div className="relative flex flex-col items-center">
            
            {/* Hanging Golden Ribbon Tails */}
            <div className="absolute top-28 flex justify-center gap-2 z-0">
              <div className="w-8 h-24 bg-gradient-to-b from-amber-500 via-amber-400 to-amber-600 shadow-lg transform -rotate-12 rounded-b-md"></div>
              <div className="w-8 h-24 bg-gradient-to-b from-amber-500 via-amber-400 to-amber-600 shadow-lg transform rotate-12 rounded-b-md"></div>
            </div>

            {/* Medal Badge Outer Ring */}
            <div className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-tr from-amber-700 via-amber-400 to-yellow-200 p-2 shadow-2xl flex items-center justify-center">
              {/* Starburst Points Background */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-800 to-amber-950 p-2 flex items-center justify-center shadow-inner">
                {/* Center Circle Content */}
                <div className="w-24 h-24 rounded-full bg-black border-2 border-amber-400 flex flex-col items-center justify-center text-amber-300 p-2 text-center shadow-md">
                  <span className="font-['Amiri'] text-xs font-bold leading-tight">
                    وَقُل رَّبِّ
                    <br />
                    زِدْنِي عِلْمًا
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Certificate Title, Text, and Signatures */}
        <div className="w-3/4 h-full flex flex-col justify-between py-2 text-right pr-6">
          
          {/* Header Title */}
          <div className="text-center space-y-2">
            
            {/* Title */}
            <h1 className="font-['Amiri'] text-5xl font-black text-red-900 tracking-wide my-1">
              شهادة تفوق
            </h1>

            {/* Flourish Divider */}
            <div className="w-48 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
          </div>

          {/* School & Student Info Block */}
          <div className="space-y-4 my-2">
            
            {/* School Name */}
            <div className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <span>يسر مدرسة :</span>
              <span 
                onClick={() => onEdit('schoolName')}
                className="font-black text-amber-900 cursor-pointer hover:bg-amber-100/60 rounded px-2"
              >
                {data.schoolName}
              </span>
            </div>

            {/* Student Name Pill Box */}
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-slate-800 shrink-0">أن تهنئ الطالب/ة :</span>
              <div className="flex-1 border-2 border-amber-600 bg-amber-50/50 rounded-2xl px-6 py-2 shadow-sm text-center">
                <span 
                  onClick={() => onEdit('studentName')}
                  className="font-['Aref_Ruqaa'] text-3xl font-black text-slate-900 cursor-pointer hover:bg-amber-100 rounded px-3 py-1"
                >
                  {data.studentName}
                </span>
              </div>
            </div>

            {/* Appreciation Message */}
            <p 
              onClick={() => onEdit('appreciationText')}
              className="text-base font-bold text-slate-800 leading-[2.1] text-justify mt-2 cursor-pointer hover:bg-slate-100 rounded p-2"
            >
              {data.appreciationText}
            </p>

          </div>

          {/* Signatures Footer */}
          <div className="pt-4 border-t border-slate-300 flex justify-around items-center text-center">
            
            {/* Teacher Signature */}
            <div className="text-right">
              <span className="font-bold text-slate-800 text-sm block">{data.teacherTitle}</span>
              <p onClick={() => onEdit('teacherName')} className="font-bold text-slate-900 text-base mt-2 cursor-pointer">{data.teacherName}</p>
              <div className="w-36 border-b border-dotted border-slate-400 mt-1"></div>
            </div>

            {/* Principal Signature */}
            <div className="text-right">
              <span className="font-bold text-slate-800 text-sm block">{data.principalTitle}</span>
              <p onClick={() => onEdit('principalName')} className="font-bold text-slate-900 text-base mt-2 cursor-pointer">{data.principalName}</p>
              <div className="w-36 border-b border-dotted border-slate-400 mt-1"></div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
