import React from 'react';

export interface UniversityDegreeData {
  universityName: string;
  departmentName: string;
  serialNo: string;
  title: string;
  bodyText1: string;
  bodyText2: string;
  traineeName: string;
  courseLabel: string;
  courseTitle: string;
  totalHours: string;
  dateRange: string;
  directorAcademy: string;
  activityLeader: string;
  directorCenter: string;
  deanName: string;
}

export const defaultUniversityDegreeData: UniversityDegreeData = {
  universityName: "جامعة عين شمس",
  departmentName: "نشاط التأهيل والتميز التربوي",
  serialNo: "0011073",
  title: "شَهَادَة",
  bodyText1: "يشهد مركز الدراسات والبحوث والخدمات المتكاملة بكلية البنات للآداب والعلوم والتربية - جامعة عين شمس / نشاط التأهيل والتميز التربوي",
  bodyText2: "بالتعاون مع أكاديمية الرواد للتنمية البشرية",
  traineeName: "ماريان جرجس توفيق سيدهم",
  courseLabel: "قد اجتاز الدورة التدريبية",
  courseTitle: "إعداد مدرب حساب ذهني",
  totalHours: "بإجمالي عدد (٢٤ ساعة تدريبية)",
  dateRange: "وذلك في الفترة من ١١ / ١٠ / ٢٠١٨م وحتى ١٥ / ١٠ / ٢٠١٨م",
  directorAcademy: "أ. سحر دسوقي إبراهيم",
  activityLeader: "أ.د/ فايزة أحمد الحشيني",
  directorCenter: "أ.م.د/ هيام صابر شاهين",
  deanName: "أ.د/ رقية حسين شلبي"
};

interface Props {
  data: UniversityDegreeData;
  onEdit: (field: keyof UniversityDegreeData) => void;
}

export default function UniversityDegreeCert({ data, onEdit }: Props) {
  return (
    <div className="w-[210mm] h-[297mm] bg-[#fafaf7] text-slate-900 font-serif relative p-8 shadow-2xl overflow-hidden flex flex-col justify-between print:w-full print:h-full print:shadow-none print:m-0 select-none">
      
      {/* Guilloche Security Border SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 210 297" preserveAspectRatio="none">
        {/* Outer Fine Lace Ribbon Frame */}
        <rect x="6" y="6" width="198" height="285" fill="none" stroke="#047857" strokeWidth="2" />
        <rect x="9" y="9" width="192" height="279" fill="none" stroke="#d97706" strokeWidth="1" strokeDasharray="2 1" />
        <rect x="12" y="12" width="186" height="273" fill="none" stroke="#064e3b" strokeWidth="1.5" />
        <rect x="15" y="15" width="180" height="267" fill="none" stroke="#047857" strokeWidth="0.5" />

        {/* Four Corner Guilloche Medallions */}
        {[
          { x: 15, y: 15 },
          { x: 195, y: 15 },
          { x: 195, y: 282 },
          { x: 15, y: 282 }
        ].map((pt, i) => (
          <g key={i} transform={`translate(${pt.x}, ${pt.y})`}>
            <circle cx="0" cy="0" r="10" fill="#064e3b" opacity="0.8" />
            <circle cx="0" cy="0" r="7" fill="none" stroke="#f59e0b" strokeWidth="1" />
            <circle cx="0" cy="0" r="4" fill="#047857" />
          </g>
        ))}
      </svg>

      {/* Watermark Logo Background */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-[0.06] z-0">
        <div className="w-80 h-80 rounded-full border-8 border-emerald-900 flex flex-col items-center justify-center p-4 text-center">
          <span className="font-['Amiri'] text-2xl font-black text-emerald-950 mt-2">جامعة عين شمس</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 flex flex-col h-full justify-between text-center px-6 py-4">
        
        {/* Header Block */}
        <div>
          
          {/* Header Logos Line */}
          <div className="flex justify-between items-center mb-3">
            {/* Center Center Logo */}
            <div className="w-16 h-16 border border-emerald-800/40 rounded-full flex flex-col items-center justify-center bg-white shadow-sm p-1">
              <span className="text-[9px] font-bold text-emerald-900">مركز البحوث</span>
            </div>

            {/* University Eagle Logo */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-emerald-900 rounded-full border-2 border-amber-500 flex items-center justify-center text-amber-300 text-xs font-bold shadow-md">
                شعار
              </div>
              <h2 onClick={() => onEdit('universityName')} className="font-['Amiri'] text-lg font-bold text-emerald-950 mt-1 cursor-pointer">
                {data.universityName}
              </h2>
            </div>

            {/* Academy Logo */}
            <div className="w-16 h-16 border border-emerald-800/40 rounded-full flex flex-col items-center justify-center bg-white shadow-sm p-1">
              <span className="text-[9px] font-bold text-amber-800">الرواد للتنمية</span>
            </div>
          </div>

          <p onClick={() => onEdit('departmentName')} className="text-xs font-bold text-emerald-800 mb-2 cursor-pointer">
            {data.departmentName}
          </p>

          {/* Serial Number */}
          <div className="flex justify-center mb-2">
            <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-200/80 px-3 py-0.5 rounded border border-slate-300">
              الرقم التسلسلي: <span onClick={() => onEdit('serialNo')} className="cursor-pointer font-black text-red-700">{data.serialNo}</span>
            </span>
          </div>

          {/* Title Header */}
          <div className="my-2">
            <h1 
              onClick={() => onEdit('title')}
              className="font-['Reem_Kufi'] text-5xl font-extrabold text-emerald-900 tracking-wider cursor-pointer hover:bg-emerald-100/50 rounded px-4 py-1 inline-block"
            >
              {data.title}
            </h1>
            <div className="w-32 h-1 bg-emerald-700 mx-auto mt-1 rounded-full"></div>
          </div>

        </div>

        {/* Body Text Block */}
        <div className="my-2 space-y-3">
          
          <p onClick={() => onEdit('bodyText1')} className="font-['Amiri'] text-xs leading-[2.1] font-bold text-slate-800 max-w-xl mx-auto cursor-pointer hover:bg-slate-100 rounded p-1">
            {data.bodyText1}
          </p>

          <p onClick={() => onEdit('bodyText2')} className="text-xs font-bold text-emerald-800 cursor-pointer">
            {data.bodyText2}
          </p>

          {/* Trainee Name */}
          <div className="my-3 py-2 border-y border-emerald-800/30 bg-emerald-50/40">
            <span className="text-xs font-bold text-slate-700">بأن المتدرب/ة : </span>
            <span 
              onClick={() => onEdit('traineeName')}
              className="font-['Aref_Ruqaa'] text-2xl font-black text-emerald-950 mx-2 cursor-pointer hover:bg-amber-100 rounded px-3 py-1"
            >
              {data.traineeName}
            </span>
          </div>

          <p onClick={() => onEdit('courseLabel')} className="text-xs font-bold text-slate-800 cursor-pointer">
            {data.courseLabel}
          </p>

          {/* Course Title Box */}
          <div className="my-2 inline-block bg-white border-2 border-emerald-800 px-6 py-2 rounded-xl shadow-sm">
            <h3 
              onClick={() => onEdit('courseTitle')}
              className="font-['Amiri'] text-xl font-black text-emerald-950 cursor-pointer hover:bg-amber-100 rounded px-3 py-0.5"
            >
              ( {data.courseTitle} )
            </h3>
          </div>

          <p onClick={() => onEdit('totalHours')} className="text-xs font-bold text-slate-800 cursor-pointer">
            {data.totalHours}
          </p>

          <p onClick={() => onEdit('dateRange')} className="text-[11px] font-bold text-amber-900 cursor-pointer">
            {data.dateRange}
          </p>

        </div>

        {/* Footer Officers & Official Stamps Block */}
        <div className="pt-2 border-t border-slate-300">
          
          {/* Top 3 Officers */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] leading-relaxed mb-3">
            
            <div>
              <p className="font-bold text-slate-700">مدير الأكاديمية</p>
              <p onClick={() => onEdit('directorAcademy')} className="font-black text-slate-900 mt-1 cursor-pointer">{data.directorAcademy}</p>
              <div className="w-20 border-b border-slate-400 mx-auto mt-2"></div>
            </div>

            <div>
              <p className="font-bold text-slate-700">مسئول النشاط</p>
              <p onClick={() => onEdit('activityLeader')} className="font-black text-slate-900 mt-1 cursor-pointer">{data.activityLeader}</p>
              <div className="w-20 border-b border-slate-400 mx-auto mt-2"></div>
            </div>

            <div>
              <p className="font-bold text-slate-700">مدير المركز</p>
              <p onClick={() => onEdit('directorCenter')} className="font-black text-slate-900 mt-1 cursor-pointer">{data.directorCenter}</p>
              <div className="w-20 border-b border-slate-400 mx-auto mt-2"></div>
            </div>

          </div>

          {/* Bottom Stamp & Dean Signature */}
          <div className="flex justify-between items-center px-4 pt-1">
            
            {/* Official Blue Circular Stamp */}
            <div className="w-20 h-20 rounded-full border-2 border-blue-800 bg-blue-50/50 flex flex-col items-center justify-center text-blue-900 p-1 text-[8px] font-bold shadow-sm transform -rotate-6">
              <span className="text-[7px] text-blue-800">جامعة عين شمس</span>
              <span className="font-black my-0.5">كلية البنات</span>
              <span className="text-[6px]">مطبعة المركز</span>
            </div>

            {/* Dean Signature */}
            <div className="text-left text-[11px]">
              <p className="font-bold text-slate-800">عميد الكلية</p>
              <p onClick={() => onEdit('deanName')} className="font-black text-slate-900 mt-1 cursor-pointer">{data.deanName}</p>
              <div className="font-['Aref_Ruqaa'] text-base text-emerald-900 font-bold transform -rotate-6 mt-1">رقية حسين</div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
