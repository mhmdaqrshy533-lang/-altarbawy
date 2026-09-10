import React from 'react';

export interface QuranCompetitionData {
  title: string;
  institutionText: string;
  studentName: string;
  eventPreamble: string;
  badge1: string;
  badge2: string;
  duaText: string;
  closingWish: string;
  dateStr: string;
  coordinatorName: string;
  principalName: string;
}

export const defaultQuranCompetitionData: QuranCompetitionData = {
  title: "شَهَادَةُ شُكْرٍ وَتَقْدِيرٍ",
  institutionText: "تتقدم إدارة المدرسة بخالص الشكر والتقدير للطالبة:",
  studentName: "سارة محمد العتيبي",
  eventPreamble: "وذلك لمشاركتها المميزة في",
  badge1: "مسابقة حفظ القرآن الكريم",
  badge2: "مسابقة رتّل",
  duaText: "سائلين الله أن يجعل القرآن الكريم نوراً لقلبها، ورفيقاً لها في الدنيا والآخرة، وأن يبارك في جهودها ويزيدها علماً وهدايةً.",
  closingWish: "مع خالص الدعوات بدوام التوفيق والتميز",
  dateStr: "١٤ / ٠٥ / ١٤٤٥ هـ",
  coordinatorName: "أ. منيرة السبيعي",
  principalName: "أ. نورة الغامدي"
};

interface Props {
  data: QuranCompetitionData;
  onEdit: (field: keyof QuranCompetitionData) => void;
}

export default function QuranCompetitionCert({ data, onEdit }: Props) {
  return (
    <div className="w-[297mm] h-[210mm] bg-[#fcf8f2] text-slate-900 font-serif relative shadow-2xl overflow-hidden flex flex-col justify-between p-6 print:w-full print:h-full print:shadow-none print:m-0 select-none">
      
      {/* Deluxe Outer Gold Frame */}
      <div className="absolute inset-3 border-2 border-amber-600/60 pointer-events-none z-10 rounded-sm"></div>
      <div className="absolute inset-4 border border-amber-500/30 pointer-events-none z-10"></div>
      <div className="absolute inset-5 border-4 border-emerald-900/90 pointer-events-none z-10"></div>

      {/* Background Floral Pattern SVG */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#064e3b_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Main Grid: Left Arch Artwork (Quran & Rehal) vs Right Content Area */}
      <div className="relative z-20 flex h-full gap-6 items-center">
        
        {/* LEFT COLUMN: Islamic Arch Window with Quran Artwork */}
        <div className="w-1/3 h-full flex flex-col items-center justify-center relative">
          
          {/* Arch Frame Container */}
          <div className="w-full h-[92%] bg-gradient-to-b from-emerald-950 to-emerald-900 rounded-t-full border-4 border-amber-500/80 shadow-xl p-4 flex flex-col items-center justify-between relative overflow-hidden text-center">
            
            {/* Top Hanging Lantern Graphic */}
            <div className="absolute top-0 inset-x-0 flex justify-center pointer-events-none">
              <div className="w-0.5 h-10 bg-amber-400"></div>
              <div className="absolute top-10 w-6 h-10 bg-amber-500/30 rounded-full blur-sm"></div>
            </div>

            {/* Arch Top Verse Calligraphy */}
            <div className="pt-6 px-2 text-amber-300 font-['Amiri'] text-lg font-bold leading-relaxed z-10 border-b border-amber-500/30 pb-2">
              ﴿ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا ﴾
            </div>

            {/* Central 3D Quran on Rehal Visual */}
            <div className="my-auto z-10 flex flex-col items-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* Glowing Aura */}
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
                {/* Quran Box */}
                <div className="w-28 h-28 bg-amber-100 rounded-2xl border-4 border-amber-500 shadow-2xl flex flex-col items-center justify-center text-emerald-900 p-2 transform -rotate-3 hover:rotate-0 transition-transform">
                  <span className="font-['Amiri'] text-base font-black text-emerald-950">القرآن الكريم</span>
                </div>
              </div>
              <p className="text-[11px] text-amber-200/90 font-bold mt-2">المصحف الشريف</p>
            </div>

            {/* Decorative Accents at Arch Base */}
            <div className="w-full pt-2 border-t border-amber-500/30 text-amber-300 text-xs flex justify-around items-center">
              <span className="font-['Aref_Ruqaa'] text-sm text-amber-200">ورتل</span>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Main Certificate Body */}
        <div className="w-2/3 h-full flex flex-col justify-between py-2 text-center pl-4">
          
          {/* Top Decorative Line */}
          <div className="flex justify-end pr-8">
            <div className="flex flex-col items-center -mt-2">
              <div className="w-0.5 h-8 bg-amber-500"></div>
            </div>
          </div>

          {/* Title Header */}
          <div>
            <h1 
              onClick={() => onEdit('title')}
              className="font-['Amiri'] text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight cursor-pointer hover:bg-amber-100/50 rounded px-4 py-1 inline-block"
            >
              {data.title}
            </h1>

            <p 
              onClick={() => onEdit('institutionText')}
              className="font-['Cairo'] text-sm font-bold text-slate-700 mt-3 cursor-pointer hover:bg-slate-100 rounded px-3 py-0.5"
            >
              {data.institutionText}
            </p>

            {/* Recipient Name inside Dotted Oval Frame */}
            <div className="my-4 max-w-lg mx-auto">
              <div className="border-2 border-dashed border-amber-600 bg-amber-50/60 rounded-full px-8 py-2 shadow-sm inline-block min-w-[320px]">
                <h2 
                  onClick={() => onEdit('studentName')}
                  className="font-['Aref_Ruqaa'] text-3xl font-black text-emerald-900 cursor-pointer hover:bg-amber-100 rounded px-3 py-1"
                >
                  {data.studentName}
                </h2>
              </div>
            </div>

            {/* Event Preamble */}
            <p 
              onClick={() => onEdit('eventPreamble')}
              className="text-xs font-bold text-slate-600 my-1 cursor-pointer"
            >
              {data.eventPreamble}
            </p>

            {/* Rounded Pill Event Badges */}
            <div className="flex items-center justify-center gap-3 my-3">
              <div className="bg-emerald-900 text-amber-300 font-bold text-sm px-5 py-2 rounded-2xl border-2 border-amber-500 shadow-md">
                <span onClick={() => onEdit('badge1')} className="cursor-pointer">{data.badge1}</span>
              </div>
              <span className="font-bold text-amber-700 text-lg">و</span>
              <div className="bg-emerald-900 text-amber-300 font-bold text-sm px-5 py-2 rounded-2xl border-2 border-amber-500 shadow-md">
                <span onClick={() => onEdit('badge2')} className="cursor-pointer">{data.badge2}</span>
              </div>
            </div>

            {/* Closing Dua */}
            <p 
              onClick={() => onEdit('duaText')}
              className="font-['Amiri'] text-xs md:text-sm text-slate-800 leading-relaxed max-w-xl mx-auto my-2 cursor-pointer hover:bg-slate-100 rounded px-3 py-1"
            >
              {data.duaText}
            </p>

            {/* Closing Wish */}
            <p 
              onClick={() => onEdit('closingWish')}
              className="font-bold text-amber-800 text-xs my-1 cursor-pointer hover:bg-amber-50 rounded px-2"
            >
              {data.closingWish}
            </p>
          </div>

          {/* Footer Signature Blocks */}
          <div className="mt-4 pt-3 border-t border-slate-300 grid grid-cols-3 gap-2 text-center text-xs text-slate-800">
            
            {/* Date Slot */}
            <div className="flex flex-col items-center">
              <div className="font-bold text-emerald-900 mb-1">
                <span>التاريخ:</span>
              </div>
              <p onClick={() => onEdit('dateStr')} className="font-bold text-slate-700 cursor-pointer">{data.dateStr}</p>
            </div>

            {/* Coordinator Slot */}
            <div className="flex flex-col items-center">
              <div className="font-bold text-emerald-900 mb-1">
                <span>منسقة النشاط:</span>
              </div>
              <p onClick={() => onEdit('coordinatorName')} className="font-bold text-slate-900 cursor-pointer">{data.coordinatorName}</p>
            </div>

            {/* Principal Slot */}
            <div className="flex flex-col items-center">
              <div className="font-bold text-emerald-900 mb-1">
                <span>مديرة المدرسة:</span>
              </div>
              <p onClick={() => onEdit('principalName')} className="font-bold text-slate-900 cursor-pointer">{data.principalName}</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
