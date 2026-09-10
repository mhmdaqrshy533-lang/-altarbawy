import React from 'react';

export interface IjazahBukhariData {
  bismillah: string;
  ijazahTitle: string;
  mainTitle: string;
  opening: string;
  recipient: string;
  course: string;
  isnadText: string;
  salawat: string;
  mujeezTitle: string;
  mujeezName: string;
  mujeezDua: string;
  dateStr: string;
  centerSealText: string;
  directorTitle: string;
  directorName: string;
}

export const defaultIjazahBukhariData: IjazahBukhariData = {
  bismillah: "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ",
  ijazahTitle: "إجازة خاصة بـ",
  mainTitle: "ثلاثيات الإمام البخاري ﷺ",
  opening: "الحمد لله والصلاة والسلام على رسول الله صلى الله عليه وسلم وعلى آله وصحبه ومن والاه ... وبعد :",
  recipient: "إمل علي حسين الحبيل",
  course: "سماع ثلاثيات الإمام البخاري بالإسناد المتصل إلى النبي صلى الله عليه وسلم.",
  isnadText: "ويقول الفقير إلى عفو ربه / أحمد بن عبدالله بن إبراهيم أبوالنصر أخبرنا الشيخ عبد الوكيل بن عبدالحق الهادشمي قراءة عليه لصحيح البخاري و أنا أسمع و إجازة بما فاتني ، و قال أخبرني والدى العلامة عبدالحق الهاشمي قراءة عليه لجميعه ، وقال أخبرنا أبو سعيد حسين بن عبدالرحيم البتالوى قراءة عليه لجميعه ، وقال أخبرنا نذير حسين الدهلوى ، قال أخبرنا محمد إسحاق الدهلوى ، قال أخبرنا الشاة عبد العزيز بن ولى الله أحمد الدهلوى ، قال أخبرني والدى سماعًا إلى كتاب الحج مع إكمال باقيه على أكبر خلفائه عنه ، قال أخبرنا أبو طاهر الكورانى ، قال أخبرنا حسن بن على العجيمي ، قال أخبرنا محمد بن العلاء البابلى ، قال أخبرنا سالم بن محمد السنهورى سماعًا لبعضه و إجازة لسائره ، قال أخبرنا النجم محمد الغيطي ، قال أخبرنا زكريا بن محمد الأنصاري ، قال أخبرنا أبو الفضل بن حجر العسقلاني سماعًا لكثير منه إجازة لسائره ، قال أخبرنا إبراهيم بن أحمد التنوخى البعلى و على بن محمد بن أبي المجد الدمشقى ، قالا أخبرنا أحمد بن أبي طالب الحجار لجميعه إلا ابن أبي المجد فمن أول ( كتاب الإكراه إلى آخره وللثلاثيات ) ، وأخبرتنا به ست الوزراء وزيرة بنت عمر التنوخية ، أخبرنا الحسين بن المبارك الزبيدى ، قال أخبرنا أبو الوقت عبدالأول بن عيسى الهروى ، قال أخبرنا عبد الرحمن بن محمد الداودى البوشنجى ، قال أخبرنا عبدالله بن أحمد السرخسى ، قال أخبرنا محمد ن يوسف بن مطر الفربرى ، قال أخبرنا محمد بن إسماعيل البخارى مرتين .",
  salawat: "وصلى الله على نبينا محمد وعلى آله وصحبه وسلم تسليمًا كثيرًا",
  mujeezTitle: "المجيز",
  mujeezName: "فضيلة الشيخ : أحمد عبدالله أبو النصر",
  mujeezDua: "غفر الله له ولوالديه ولمشايخه",
  dateStr: "تحريراً في: 11 ربيع الثاني 1443هـ",
  centerSealText: "أكاديمية غيث - إجازة شرعية",
  directorTitle: "مديرة الأكاديمية",
  directorName: "أ. أحلام سيف"
};

interface Props {
  data: IjazahBukhariData;
  onEdit: (field: keyof IjazahBukhariData) => void;
}

export default function IjazahBukhariCert({ data, onEdit }: Props) {
  return (
    <div className="w-[210mm] h-[297mm] bg-[#fffdf9] text-slate-900 font-serif relative p-8 shadow-2xl overflow-hidden flex flex-col justify-between print:w-full print:h-full print:shadow-none print:m-0 select-none">
      
      {/* Decorative Traditional Islamic Blue Frame SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 210 297" preserveAspectRatio="none">
        {/* Outer Frame Lines */}
        <rect x="8" y="8" width="194" height="281" fill="none" stroke="#1e3a8a" strokeWidth="1.2" />
        <rect x="11" y="11" width="188" height="275" fill="none" stroke="#1e3a8a" strokeWidth="0.5" />
        <rect x="15" y="15" width="180" height="267" fill="none" stroke="#1e3a8a" strokeWidth="1" strokeDasharray="3 1.5" />
        <rect x="18" y="18" width="174" height="261" fill="none" stroke="#1e3a8a" strokeWidth="0.8" />
        
        {/* Corner Ornaments */}
        {[
          { x: 18, y: 18, rot: 0 },
          { x: 192, y: 18, rot: 90 },
          { x: 192, y: 279, rot: 180 },
          { x: 18, y: 279, rot: 270 }
        ].map((c, i) => (
          <g key={i} transform={`translate(${c.x}, ${c.y}) rotate(${c.rot})`}>
            <path d="M 0 0 L 25 0 C 25 12, 12 25, 0 25 Z" fill="#1e3a8a" opacity="0.85" />
            <path d="M 3 3 L 20 3 C 20 10, 10 20, 3 20 Z" fill="#fffdf9" />
            <path d="M 5 5 L 15 5 C 15 8, 8 15, 5 15 Z" fill="#1e3a8a" />
            <circle cx="8" cy="8" r="1.5" fill="#fffdf9" />
          </g>
        ))}
      </svg>

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col h-full justify-between px-6 py-6 text-center">
        
        {/* Top Header Section */}
        <div>
          {/* Top Header Logos & Bismillah */}
          <div className="flex justify-between items-center mb-2">
            <div className="w-16 h-16 border border-slate-300 rounded-full flex items-center justify-center text-[10px] text-slate-500 bg-white/80 shadow-sm p-1">
              <div className="text-center">
                <span className="font-bold text-[#1e3a8a] block text-[9px]">أكاديمية غيث</span>
                <span className="text-[7px] text-slate-400">للعلوم الشرعية</span>
              </div>
            </div>

            <div 
              onClick={() => onEdit('bismillah')} 
              className="text-center font-['Amiri'] text-2xl font-bold text-[#000] cursor-pointer hover:bg-amber-100/60 rounded px-3 py-1"
            >
              {data.bismillah}
            </div>

            <div className="w-16 h-16 border border-slate-300 rounded-full flex items-center justify-center text-[10px] text-slate-500 bg-white/80 shadow-sm p-1">
              <div className="text-center">
                <span className="font-bold text-[#1e3a8a] block text-[9px]">مجلس الإسناد</span>
                <span className="text-[7px] text-slate-400">صحيح البخاري</span>
              </div>
            </div>
          </div>

          {/* Title Badges */}
          <div className="my-2">
            <h3 
              onClick={() => onEdit('ijazahTitle')} 
              className="font-['Amiri'] text-xl font-bold text-red-700 cursor-pointer hover:bg-red-50 rounded inline-block px-4 py-0.5"
            >
              {data.ijazahTitle}
            </h3>
            <h1 
              onClick={() => onEdit('mainTitle')} 
              className="font-['Amiri'] text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight mt-1 mb-2 cursor-pointer hover:bg-amber-100/60 rounded px-4 py-1"
            >
              {data.mainTitle}
            </h1>
          </div>

          <p 
            onClick={() => onEdit('opening')} 
            className="text-[13px] font-bold text-slate-700 mb-3 cursor-pointer hover:bg-slate-100 rounded px-2 py-0.5"
          >
            {data.opening}
          </p>

          {/* Recipient Line */}
          <div className="my-3 py-2 bg-amber-50/50 border-y border-amber-200/60">
            <span className="text-sm font-bold text-slate-800">فقد يسر الله للأخت / </span>
            <span 
              onClick={() => onEdit('recipient')} 
              className="font-['Amiri'] text-2xl font-black text-red-700 mx-2 underline decoration-red-400 decoration-dotted underline-offset-8 cursor-pointer hover:bg-red-100/80 rounded px-3 py-1"
            >
              {data.recipient}
            </span>
          </div>

          {/* Course Line */}
          <p 
            onClick={() => onEdit('course')} 
            className="text-sm font-bold text-slate-900 my-2 cursor-pointer hover:bg-slate-100 rounded px-2 py-1"
          >
            {data.course}
          </p>
        </div>

        {/* Isnad Text Block */}
        <div className="my-2 p-4 bg-slate-50/80 border border-slate-200 rounded-lg shadow-inner text-justify text-[11.5px] leading-[2.1] font-['Amiri'] text-slate-800 tracking-wide">
          <p onClick={() => onEdit('isnadText')} className="cursor-pointer hover:bg-amber-100/40 rounded p-1">
            {data.isnadText}
          </p>
        </div>

        {/* Salawat Closing */}
        <div 
          onClick={() => onEdit('salawat')} 
          className="text-xs font-bold text-slate-800 my-1 cursor-pointer hover:bg-slate-100 rounded px-2 py-1"
        >
          {data.salawat}
        </div>

        {/* Footer Signatures & Seals */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center px-4">
          
          {/* Mujeez Signature & Seal */}
          <div className="text-right text-[11px] leading-relaxed">
            <p onClick={() => onEdit('mujeezTitle')} className="font-bold text-[#1e3a8a] text-xs cursor-pointer">{data.mujeezTitle}</p>
            <p onClick={() => onEdit('mujeezName')} className="font-black text-slate-900 mt-1 cursor-pointer">{data.mujeezName}</p>
            <p onClick={() => onEdit('mujeezDua')} className="text-[10px] text-slate-500 cursor-pointer">{data.mujeezDua}</p>
            <p onClick={() => onEdit('dateStr')} className="text-[10px] font-bold text-amber-800 mt-1 cursor-pointer">{data.dateStr}</p>
          </div>

          {/* Center Circular Stamp */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-700/80 animate-spin-slow opacity-80"></div>
            <div className="w-16 h-16 rounded-full border-2 border-blue-800 bg-blue-50/60 flex flex-col items-center justify-center text-center p-1 text-[#1e3a8a] shadow-sm transform -rotate-12">
              <span className="text-[8px] font-black uppercase">إجازة شرعية</span>
              <span className="text-[7px] font-bold mt-0.5">معتمدة</span>
              <div className="w-8 border-t border-blue-800 my-0.5"></div>
              <span className="text-[6px] font-bold text-blue-900">البخاري</span>
            </div>
          </div>

          {/* Director Signature */}
          <div className="text-left text-[11px] leading-relaxed">
            <p onClick={() => onEdit('directorTitle')} className="font-bold text-[#1e3a8a] text-xs cursor-pointer">{data.directorTitle}</p>
            <p onClick={() => onEdit('directorName')} className="font-black text-slate-900 mt-1 cursor-pointer">{data.directorName}</p>
            <div className="mt-2 text-indigo-800 font-['Aref_Ruqaa'] text-lg font-bold transform -rotate-6">
              أحلام سيف
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
