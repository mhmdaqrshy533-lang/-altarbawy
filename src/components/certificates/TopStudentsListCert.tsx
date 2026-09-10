import React from 'react';

export interface TopStudentItem {
  id: number;
  seatNo: string;
  name: string;
  score: string;
  percentage: string;
  school: string;
  city: string;
  rank: string;
}

export interface TopStudentsListData {
  countryTitle: string;
  ministryTitle: string;
  committeeTitle: string;
  academicYear: string;
  streamTitle: string;
  mainHeaderTitle: string;
  students: TopStudentItem[];
  directorExams: string;
  deputyMinister: string;
  ministerName: string;
}

export const defaultTopStudentsListData: TopStudentsListData = {
  countryTitle: "الجمهورية اليمنية",
  ministryTitle: "وزارة التربية والتعليم",
  committeeTitle: "قطاع المناهج والتوجيه - اللجنة العليا للاختبارات",
  academicYear: "2025 / 2026 م",
  streamTitle: "القسم العلمي - على مستوى الجمهورية",
  mainHeaderTitle: "كشف بأسماء أوائل طلاب الشهادة الثانوية العامة",
  students: [
    { id: 1, seatNo: "421747", name: "غدير إبراهيم أحمد حسين النجدي", score: "797", percentage: "99.63%", school: "اليقظة / معين", city: "الأمانة", rank: "الأول" },
    { id: 2, seatNo: "423047", name: "علي أحمد إبراهيم صلاح هاشم", score: "797", percentage: "99.63%", school: "النهضة / الثورة", city: "الأمانة", rank: "الأول مكرر" },
    { id: 3, seatNo: "424244", name: "أمل عبد الكريم قايد درعان", score: "797", percentage: "99.63%", school: "الرشيد الحديثة / الثورة", city: "الأمانة", rank: "الأول مكرر" },
    { id: 4, seatNo: "426359", name: "عبد الله وليد عبد الرحمن الحضرمي", score: "797", percentage: "99.63%", school: "الأمجاد / شعوب", city: "الأمانة", rank: "الأول مكرر" },
    { id: 5, seatNo: "493396", name: "أحمد علي عبد الجبار علي المهاب", score: "797", percentage: "99.63%", school: "الشهيد الحمدي / المفتاح", city: "حجة", rank: "الأول مكرر" },
    { id: 6, seatNo: "504261", name: "عبد الرحمن فيصل بازل الشغدري", score: "797", percentage: "99.63%", school: "المتفوقين / ذمار", city: "ذمار", rank: "الأول مكرر" },
    { id: 7, seatNo: "504807", name: "غلام عبد الله محمد الأكوع", score: "797", percentage: "99.63%", school: "المتفوقين / ذمار", city: "ذمار", rank: "الأول مكرر" },
    { id: 8, seatNo: "504839", name: "عمر عبد الباسط أحمد الأفرع", score: "797", percentage: "99.63%", school: "المتفوقين / ذمار", city: "ذمار", rank: "الأول مكرر" },
    { id: 9, seatNo: "527662", name: "سلسبيل محمد يحيى شرف الدين", score: "797", percentage: "99.63%", school: "النهضة / الميناء", city: "الحديدة", rank: "الأول مكرر" },
    { id: 10, seatNo: "552838", name: "محمد منصور ناجي قاسم", score: "797", percentage: "99.63%", school: "النخبة / التعزية", city: "تعز", rank: "الأول مكرر" }
  ],
  directorExams: "أ. نجيب عبد الله المطري",
  deputyMinister: "أ. عبد اللطيف عبد الله المؤيد",
  ministerName: "د. حاتم حزام أبو حاتم"
};

interface Props {
  data: TopStudentsListData;
  onEdit: (field: keyof TopStudentsListData) => void;
  onEditStudent?: (index: number, key: keyof TopStudentItem, value: string) => void;
}

export default function TopStudentsListCert({ data, onEdit, onEditStudent }: Props) {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 font-serif relative p-6 shadow-2xl overflow-hidden flex flex-col justify-between print:w-full print:h-full print:shadow-none print:m-0 select-none border border-slate-300">
      
      {/* Document Outer Border */}
      <div className="absolute inset-3 border-2 border-slate-800 pointer-events-none z-10"></div>
      <div className="absolute inset-4 border border-slate-400 pointer-events-none z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col h-full justify-between p-2">
        
        {/* Official Ministry Header */}
        <div>
          <div className="flex justify-between items-start border-b-2 border-slate-800 pb-3 mb-2 text-center">
            
            {/* English Title Block */}
            <div className="text-left text-[10px] font-sans font-bold text-slate-800 leading-tight">
              <p>Republic of Yemen</p>
              <p>Ministry of Education</p>
              <p className="text-[9px] text-slate-600">SECTOR OF GUIDANCE & CURRICULUMS</p>
            </div>

            {/* Republic Emblem Center */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-100 border border-slate-400 rounded-full flex items-center justify-center font-bold text-xs text-slate-900 shadow-sm">
                شعار
              </div>
              <span onClick={() => onEdit('countryTitle')} className="text-[11px] font-bold text-slate-900 mt-1 cursor-pointer">
                {data.countryTitle}
              </span>
            </div>

            {/* Arabic Title Block */}
            <div className="text-right text-[11px] font-bold text-slate-900 leading-tight">
              <p onClick={() => onEdit('ministryTitle')} className="cursor-pointer">{data.ministryTitle}</p>
              <p onClick={() => onEdit('committeeTitle')} className="text-[10px] text-slate-700 cursor-pointer">{data.committeeTitle}</p>
            </div>

          </div>

          {/* Table Header Banner */}
          <div className="bg-slate-100 border border-slate-800 p-2 text-center mb-3 rounded-sm shadow-sm">
            <h1 onClick={() => onEdit('mainHeaderTitle')} className="font-['Amiri'] text-xl font-black text-slate-900 cursor-pointer">
              {data.mainHeaderTitle}
            </h1>
            <div className="flex justify-center gap-4 text-xs font-bold text-slate-800 mt-1">
              <span onClick={() => onEdit('streamTitle')} className="cursor-pointer text-blue-900">{data.streamTitle}</span>
              <span>•</span>
              <span onClick={() => onEdit('academicYear')} className="cursor-pointer text-slate-900">للعام الدراسي {data.academicYear}</span>
            </div>
          </div>
        </div>

        {/* Top Students Table */}
        <div className="my-1 overflow-x-auto">
          <table className="w-full text-center border-collapse border border-slate-800 text-[11px] font-sans">
            <thead>
              <tr className="bg-slate-200 text-slate-900 font-bold border-b border-slate-800">
                <th className="border border-slate-800 p-1 w-8">م</th>
                <th className="border border-slate-800 p-1">رقم الجلوس</th>
                <th className="border border-slate-800 p-1 text-right pr-3">اسم الطالب / الطالبة</th>
                <th className="border border-slate-800 p-1">المجموع</th>
                <th className="border border-slate-800 p-1">النسبة</th>
                <th className="border border-slate-800 p-1">المدرسة</th>
                <th className="border border-slate-800 p-1">المدينة</th>
                <th className="border border-slate-800 p-1">الترتيب</th>
              </tr>
            </thead>
            <tbody>
              {data.students.map((st, idx) => (
                <tr key={st.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="border border-slate-700 p-1.5 font-bold">{idx + 1}</td>
                  <td className="border border-slate-700 p-1.5 font-mono">{st.seatNo}</td>
                  <td className="border border-slate-700 p-1.5 text-right font-bold pr-3 font-['Amiri'] text-xs text-slate-900">{st.name}</td>
                  <td className="border border-slate-700 p-1.5 font-bold">{st.score}</td>
                  <td className="border border-slate-700 p-1.5 font-bold text-blue-900">{st.percentage}</td>
                  <td className="border border-slate-700 p-1.5 text-slate-800">{st.school}</td>
                  <td className="border border-slate-700 p-1.5 text-slate-800">{st.city}</td>
                  <td className="border border-slate-700 p-1.5 font-bold text-amber-900">{st.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Authority Signatures & Official Seals */}
        <div className="mt-4 pt-3 border-t-2 border-slate-800">
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-slate-900">
            
            <div>
              <p className="text-slate-700">مدير عام الاختبارات</p>
              <p onClick={() => onEdit('directorExams')} className="font-black mt-2 cursor-pointer">{data.directorExams}</p>
              <div className="w-24 border-b border-slate-400 mx-auto mt-2"></div>
            </div>

            <div>
              {/* Official Seal Placeholder */}
              <div className="w-16 h-16 rounded-full border-2 border-slate-800 bg-slate-50 flex items-center justify-center mx-auto text-[8px] font-bold p-1 transform -rotate-6">
                <span className="text-center">ختم وزارة التربية والتعليم</span>
              </div>
            </div>

            <div>
              <p className="text-slate-700">وزير التربية والتعليم</p>
              <p onClick={() => onEdit('ministerName')} className="font-black mt-2 cursor-pointer">{data.ministerName}</p>
              <div className="w-24 border-b border-slate-400 mx-auto mt-2"></div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
