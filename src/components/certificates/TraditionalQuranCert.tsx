import React from 'react';

export interface TraditionalQuranData {
  certNumber: string;
  bismillah: string;
  certTitle: string;
  preamble: string;
  studentName: string;
  birthDate: string;
  birthPlace: string;
  classYear: string;
  gradeRating: string;
  achievementText: string;
  closingDua: string;
  issueDate: string;
  totalScore: string;
  regNumber: string;
  directorName: string;
  examinerName: string;
  secretaryName: string;
}

export const defaultTraditionalQuranData: TraditionalQuranData = {
  certNumber: "389354",
  bismillah: "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ",
  certTitle: "شَهَادَةُ حِفْظِ القُرْآنِ الكَرِيمِ",
  preamble: "الحَمْدُ للهِ رَبِّ العَالَمِينَ ، وَالصَّلاَةُ وَالسَّلاَمُ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ أَجْمَعِينَ ، وَبَعْدُ :",
  studentName: "عبد الحنان خان",
  birthDate: "10-10-2001 م",
  birthPlace: "فيصل أباد",
  classYear: "1437 هـ / 2016 م",
  gradeRating: "ممتاز",
  achievementText: "قد حفظ القرآن الكريم كاملاً ونجح في اختبار الحفظ بامتياز وتفوق تحت إشراف المراكز القرآنية المعتمدة.",
  closingDua: "ونسأل الله عز وجل أن يجعله من أهل القرآن الذين هم أهل الله وخاصته وأن ينفع به إسلاماً ومسلمين.",
  issueDate: "18-05-2016 م",
  totalScore: "100",
  regNumber: "1437024854",
  directorName: "الشيخ عبد الرحمن",
  examinerName: "الشيخ ناصر الدين",
  secretaryName: "أ. محمد أرسلان"
};

interface Props {
  data: TraditionalQuranData;
  onEdit: (field: keyof TraditionalQuranData) => void;
}

export default function TraditionalQuranCert({ data, onEdit }: Props) {
  return (
    <div className="w-[297mm] h-[210mm] bg-[#fffdfa] text-slate-900 font-serif relative p-6 shadow-2xl overflow-hidden flex flex-col justify-between print:w-full print:h-full print:shadow-none print:m-0 select-none">
      
      {/* Traditional Islamic Gold & Blue Ribbon Outer Frame */}
      <div className="absolute inset-2 border-8 border-blue-900 pointer-events-none z-10"></div>
      <div className="absolute inset-4 border-2 border-amber-500 pointer-events-none z-10"></div>
      <div className="absolute inset-5 border border-blue-800/40 pointer-events-none z-10"></div>

      {/* Decorative Traditional Corner Patterns */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 297 210" preserveAspectRatio="none">
        {[
          { x: 12, y: 12, rot: 0 },
          { x: 285, y: 12, rot: 90 },
          { x: 285, y: 198, rot: 180 },
          { x: 12, y: 198, rot: 270 }
        ].map((c, i) => (
          <g key={i} transform={`translate(${c.x}, ${c.y}) rotate(${c.rot})`}>
            <polygon points="0,0 35,0 0,35" fill="#1e3a8a" />
            <polygon points="0,0 25,0 0,25" fill="#d97706" />
            <polygon points="0,0 12,0 0,12" fill="#fef3c7" />
          </g>
        ))}
      </svg>

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col h-full justify-between p-6 text-center">
        
        {/* Header Block */}
        <div>
          {/* Top Bar: Serial Number & Bismillah */}
          <div className="flex justify-between items-center mb-1 px-4">
            <div className="text-right text-xs font-mono font-bold text-blue-900">
              <span>Nº </span>
              <span onClick={() => onEdit('certNumber')} className="cursor-pointer underline decoration-dotted">{data.certNumber}</span>
            </div>

            <div 
              onClick={() => onEdit('bismillah')}
              className="font-['Amiri'] text-2xl font-bold text-slate-900 cursor-pointer hover:bg-amber-100/50 rounded px-3"
            >
              {data.bismillah}
            </div>

            <div className="w-20 text-left">
              {/* Emblem Stamp Placeholder */}
              <div className="w-14 h-14 border-2 border-blue-900 rounded-full flex items-center justify-center text-[8px] font-bold text-blue-900 bg-white shadow-sm mx-auto transform rotate-6">
                <span className="text-center leading-tight">إدارة المراكز القرآنية</span>
              </div>
            </div>
          </div>

          {/* Main Title Calligraphy Box */}
          <div className="my-2 border-y-2 border-amber-600/60 py-2 bg-amber-50/40">
            <h1 
              onClick={() => onEdit('certTitle')}
              className="font-['Reem_Kufi'] text-4xl md:text-5xl font-black text-blue-950 tracking-wider cursor-pointer hover:bg-amber-100/60 rounded inline-block px-6"
            >
              {data.certTitle}
            </h1>
          </div>

          {/* Preamble Text */}
          <p 
            onClick={() => onEdit('preamble')}
            className="font-['Amiri'] text-xs font-bold text-slate-800 my-2 cursor-pointer hover:bg-slate-100 rounded px-2"
          >
            {data.preamble}
          </p>
        </div>

        {/* Certificate Body Details */}
        <div className="my-2 space-y-3 font-['Amiri']">
          
          {/* Student Name */}
          <div className="text-center py-2 bg-blue-50/40 border-y border-blue-200">
            <span className="text-sm font-bold text-slate-800">تشهد إدارة المراكز بأن الطالب : </span>
            <span 
              onClick={() => onEdit('studentName')}
              className="text-3xl font-black text-blue-950 mx-2 font-['Aref_Ruqaa'] underline decoration-amber-500 underline-offset-8 cursor-pointer hover:bg-amber-100 rounded px-3 py-1"
            >
              {data.studentName}
            </span>
          </div>

          {/* Birth & Class Details */}
          <div className="flex justify-center items-center gap-6 text-xs font-bold text-slate-800 my-2">
            <div>
              <span>المولود في : </span>
              <span onClick={() => onEdit('birthDate')} className="text-blue-900 font-black cursor-pointer underline">{data.birthDate}</span>
            </div>
            <div>
              <span>مكان الميلاد : </span>
              <span onClick={() => onEdit('birthPlace')} className="text-blue-900 font-black cursor-pointer underline">{data.birthPlace}</span>
            </div>
            <div>
              <span>عام / دفعة : </span>
              <span onClick={() => onEdit('classYear')} className="text-blue-900 font-black cursor-pointer underline">{data.classYear}</span>
            </div>
            <div>
              <span>التقدير : </span>
              <span onClick={() => onEdit('gradeRating')} className="text-amber-700 font-black cursor-pointer bg-amber-100 px-2 py-0.5 rounded">{data.gradeRating}</span>
            </div>
          </div>

          {/* Achievement Description */}
          <p 
            onClick={() => onEdit('achievementText')}
            className="text-sm font-bold text-slate-900 leading-relaxed max-w-2xl mx-auto my-2 cursor-pointer hover:bg-slate-100 rounded p-2 text-justify"
          >
            {data.achievementText}
          </p>

          {/* Closing Dua */}
          <p 
            onClick={() => onEdit('closingDua')}
            className="text-xs font-bold text-amber-900 cursor-pointer hover:bg-amber-50 rounded px-2"
          >
            {data.closingDua}
          </p>

        </div>

        {/* Footer Meta & Signatures */}
        <div className="pt-3 border-t-2 border-blue-900/40">
          
          {/* Metadata Row */}
          <div className="flex justify-between items-center text-[11px] font-bold text-slate-700 px-6 mb-3">
            <div>
              <span>التاريخ : </span>
              <span onClick={() => onEdit('issueDate')} className="cursor-pointer text-blue-900">{data.issueDate}</span>
            </div>
            <div>
              <span>الدرجة : </span>
              <span onClick={() => onEdit('totalScore')} className="cursor-pointer text-blue-900">{data.totalScore} / 100</span>
            </div>
            <div>
              <span>رقم التسجيل : </span>
              <span onClick={() => onEdit('regNumber')} className="cursor-pointer text-blue-900">{data.regNumber}</span>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="grid grid-cols-3 gap-4 text-center text-xs font-bold text-slate-900 items-center">
            
            <div>
              <p className="text-blue-900 text-[11px]">المختبر</p>
              <p onClick={() => onEdit('examinerName')} className="font-black mt-1 cursor-pointer">{data.examinerName}</p>
              <div className="w-28 border-b border-dotted border-slate-400 mx-auto mt-2"></div>
            </div>

            {/* Official Blue Stamp */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-blue-800 bg-blue-50/80 flex flex-col items-center justify-center text-blue-900 text-[8px] p-1 font-bold shadow-md transform -rotate-12">
                <span className="font-black text-[9px]">إدارة تحفيظ القرآن</span>
                <span className="my-0.5">معتمدة رسمياً</span>
                <span className="text-[7px] text-blue-700">ختم التصديق</span>
              </div>
            </div>

            <div>
              <p className="text-blue-900 text-[11px]">المدير التنفيذي</p>
              <p onClick={() => onEdit('directorName')} className="font-black mt-1 cursor-pointer">{data.directorName}</p>
              <div className="w-28 border-b border-dotted border-slate-400 mx-auto mt-2"></div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
