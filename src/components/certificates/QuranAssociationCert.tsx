import React from 'react';

export interface QuranAssociationData {
  associationTitle: string;
  certificateTitle: string;
  bismillah: string;
  preamble: string;
  declaration: string;
  studentName: string;
  programName: string;
  closingDua: string;
  dateGregorian: string;
  dateHijri: string;
  authorityTitle: string;
  authorityName: string;
  authorityRole: string;
  mujizeenList: string[];
}

export const defaultQuranAssociationData: QuranAssociationData = {
  associationTitle: "جَمْعِيَّةُ القُرَّاءِ وَالحُفَّاظِ نَهْضَةُ العُلَمَاءِ سَرِيرَبُون",
  certificateTitle: "شَهَادَة",
  bismillah: "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ",
  preamble: "الحَمْدُ للهِ الَّذِي جَعَلَ القُرْآنَ لِلْقُلُوبِ نُوراً وَجَعَلَ حَامِلَهُ فِي الدُّنْيَا وَالآخِرَةِ مَسْرُوراً وَسَهَّلَ حِفْظَهُ فَصَارَ مَيْسُوراً ، وَالصَّلاَةُ وَالسَّلاَمُ عَلَى أَشْرَفِ الأَنْبِيَاءِ وَالمُرْسَلِينَ وَعَلَى آلِهِ وَصَحْبِهِ أَجْمَعِينَ",
  declaration: "تشهد جمعية القراء والحفاظ نهضة العلماء سريربون بأن :",
  studentName: "عبدالرحمن محمد الأزهري",
  programName: "للمشاركة في إجازة التحفيظ تحت إشراف هذا البرنامج .",
  closingDua: "والله الموفق إلى أقوم الطريق",
  dateGregorian: "Cirebon, 22 Mei 2021 M",
  dateHijri: "10 Syawal 1442 H",
  authorityTitle: "Pengurus Cabang JQHNU Kab. Cirebon",
  authorityName: "K. AHMAD KHOLIQ AL-HAFIDZ",
  authorityRole: "Ketua",
  mujizeenList: [
    "كياهي احسن سفاء محمد الحاج",
    "كياهي نور البادي طيب الحاج",
    "كياهي أنوار معصوم الحاج",
    "كياهي عبد البسيط الحاج",
    "كياهي عباد الله زروني الحاج",
    "كياهي لقمان حكيم الحاج",
    "كياهي محدث الرفاعي الحاج",
    "باهي عفرة ممتازة الحاجة",
    "باهي نهاية الصالح الحاجة",
    "باهي ان عائشة الحاجة"
  ]
};

interface Props {
  data: QuranAssociationData;
  onEdit: (field: keyof QuranAssociationData) => void;
}

export default function QuranAssociationCert({ data, onEdit }: Props) {
  return (
    <div className="w-[210mm] h-[297mm] bg-[#fefcf8] text-slate-900 font-serif relative shadow-2xl overflow-hidden flex flex-col justify-between print:w-full print:h-full print:shadow-none print:m-0 select-none">
      
      {/* Background Frame & Gold Geometry */}
      <div className="absolute inset-4 border border-emerald-800/40 pointer-events-none z-0"></div>
      <div className="absolute inset-5 border-2 border-emerald-900 pointer-events-none z-0"></div>
      <div className="absolute inset-6 border border-amber-600/40 pointer-events-none z-0"></div>

      {/* Bottom Right Gold Triangular Geometric Accent */}
      <svg className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none z-0 opacity-90" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="100,0 100,100 0,100" fill="#064e3b" />
        <polygon points="100,20 100,100 20,100" fill="#d97706" />
        <polygon points="100,45 100,100 45,100" fill="#f59e0b" opacity="0.8" />
        <polygon points="100,70 100,100 70,100" fill="#047857" />
      </svg>

      {/* Content Container */}
      <div className="relative z-10 px-12 py-10 flex flex-col h-full justify-between text-center">
        
        {/* Top Emblem & Header */}
        <div>
          {/* Top Circular Quran Emblem */}
          <div className="flex justify-center mb-3">
            <div className="w-20 h-20 rounded-full border-4 border-emerald-800 bg-white shadow-md flex items-center justify-center p-2">
              <div className="w-full h-full rounded-full border-2 border-amber-500 bg-emerald-950 flex flex-col items-center justify-center text-amber-300 text-center">
                <span className="text-[10px] font-bold tracking-tight text-white">JQHNU</span>
              </div>
            </div>
          </div>

          {/* Association Title */}
          <h2 
            onClick={() => onEdit('associationTitle')}
            className="font-['Amiri'] text-lg md:text-xl font-bold text-emerald-900 mb-2 cursor-pointer hover:bg-emerald-100/50 rounded px-3 py-1"
          >
            {data.associationTitle}
          </h2>

          {/* Main Certificate Title (Golden Calligraphic Kufic) */}
          <div className="my-3">
            <h1 
              onClick={() => onEdit('certificateTitle')}
              className="font-['Reem_Kufi'] text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-500 to-amber-800 tracking-widest cursor-pointer hover:opacity-80 py-1"
            >
              {data.certificateTitle}
            </h1>
          </div>

          {/* Bismillah */}
          <p 
            onClick={() => onEdit('bismillah')}
            className="font-['Amiri'] text-2xl font-bold text-slate-800 my-2 cursor-pointer hover:bg-amber-50 rounded px-3 py-1"
          >
            {data.bismillah}
          </p>

          {/* Preamble */}
          <p 
            onClick={() => onEdit('preamble')}
            className="font-['Amiri'] text-xs leading-[2.1] text-slate-700 max-w-xl mx-auto my-3 cursor-pointer hover:bg-slate-100 rounded p-2 text-justify"
          >
            {data.preamble}
          </p>

          {/* Declaration Line */}
          <p 
            onClick={() => onEdit('declaration')}
            className="font-['Amiri'] text-sm font-bold text-emerald-950 my-2 cursor-pointer hover:bg-emerald-50 rounded px-2 py-0.5"
          >
            {data.declaration}
          </p>

          {/* Recipient Name Box */}
          <div className="my-4 py-2 border-b-2 border-dotted border-amber-600 max-w-md mx-auto">
            <h3 
              onClick={() => onEdit('studentName')}
              className="font-['Aref_Ruqaa'] text-3xl font-extrabold text-emerald-950 cursor-pointer hover:bg-amber-100/60 rounded px-4 py-1"
            >
              {data.studentName}
            </h3>
          </div>

          {/* Program Name */}
          <p 
            onClick={() => onEdit('programName')}
            className="font-['Amiri'] text-sm font-bold text-slate-800 my-3 cursor-pointer hover:bg-slate-100 rounded px-2 py-1"
          >
            {data.programName}
          </p>

          {/* Closing Dua */}
          <p 
            onClick={() => onEdit('closingDua')}
            className="font-['Aref_Ruqaa'] text-base font-bold text-amber-800 my-2 cursor-pointer hover:bg-amber-50 rounded px-2 py-1"
          >
            {data.closingDua}
          </p>
        </div>

        {/* Date & Authority Block */}
        <div className="my-4 text-center">
          <div className="text-xs font-sans text-slate-600 space-y-0.5">
            <p onClick={() => onEdit('dateGregorian')} className="cursor-pointer font-bold">{data.dateGregorian}</p>
            <p onClick={() => onEdit('dateHijri')} className="cursor-pointer">{data.dateHijri}</p>
          </div>

          <div className="mt-4 pt-2 max-w-xs mx-auto">
            <p onClick={() => onEdit('authorityTitle')} className="text-[11px] font-bold text-slate-700 cursor-pointer">{data.authorityTitle}</p>
            <div className="h-10 my-1 flex justify-center items-center">
              <span className="font-['Aref_Ruqaa'] text-xl font-bold text-emerald-900 opacity-80 transform -rotate-3">أحمد خاليق الحافظ</span>
            </div>
            <p onClick={() => onEdit('authorityName')} className="text-xs font-black text-slate-900 border-t border-slate-400 pt-1 cursor-pointer">{data.authorityName}</p>
            <p onClick={() => onEdit('authorityRole')} className="text-[10px] font-bold text-emerald-800 cursor-pointer">{data.authorityRole}</p>
          </div>
        </div>

        {/* Bottom Scholars Grid Section (Mujizeen) */}
        <div className="bg-emerald-950 text-emerald-50 rounded-lg p-3 shadow-md border border-amber-500/40 text-right z-10">
          <h4 className="text-[11px] font-bold text-amber-400 border-b border-emerald-800 pb-1 mb-2 text-center">
            مجيزنا
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] font-['Amiri'] leading-tight">
            {data.mujizeenList.map((m, idx) => (
              <div key={idx} className="flex items-center gap-1.5 truncate">
                <span className="text-amber-400 text-[8px]">•</span>
                <span className="truncate">{m}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
