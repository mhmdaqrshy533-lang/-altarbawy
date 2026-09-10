import React from 'react';

export interface StudentGradeRow {
  id: number;
  secretNo: string;
  name: string;
  quranScore: string;
  islamicScore: string;
  arabicScore: string;
  englishScore: string;
  mathScore: string;
  scienceScore: string;
  socialScore: string;
  totalScore: string;
  resultStatus: string;
  gradeRating: string;
}

export interface GradeRecordData {
  districtName: string;
  schoolName: string;
  gradeLevel: string;
  academicYear: string;
  title: string;
  students: StudentGradeRow[];
  examsDirector: string;
  controlHead: string;
  schoolPrincipal: string;
}

export const defaultGradeRecordData: GradeRecordData = {
  districtName: "معين التعليمية",
  schoolName: "معاذ بن جبل",
  gradeLevel: "الرابع الأساسي",
  academicYear: "2017 - 2018 م",
  title: "كشف رصد درجات أعمال السنة وامتحان النقل في المرحلة الأساسية",
  students: [
    { id: 1, secretNo: "101", name: "إبراهيم محمد علي صالح الشميري", quranScore: "95", islamicScore: "92", arabicScore: "90", englishScore: "88", mathScore: "94", scienceScore: "91", socialScore: "93", totalScore: "643", resultStatus: "ناجح", gradeRating: "ممتاز" },
    { id: 2, secretNo: "102", name: "إبراهيم نجيب عبد الله عباس المقطري", quranScore: "88", islamicScore: "85", arabicScore: "82", englishScore: "80", mathScore: "86", scienceScore: "84", socialScore: "87", totalScore: "592", resultStatus: "ناجح", gradeRating: "جيد جداً" },
    { id: 3, secretNo: "103", name: "أبوبكر درهم عبد الله أحمد الزمر", quranScore: "92", islamicScore: "90", arabicScore: "89", englishScore: "85", mathScore: "91", scienceScore: "88", socialScore: "90", totalScore: "625", resultStatus: "ناجح", gradeRating: "ممتاز" },
    { id: 4, secretNo: "104", name: "أحمد أفرم أحمد عوده العجيلي", quranScore: "78", islamicScore: "75", arabicScore: "72", englishScore: "70", mathScore: "76", scienceScore: "74", socialScore: "75", totalScore: "520", resultStatus: "ناجح", gradeRating: "جيد" },
    { id: 5, secretNo: "105", name: "أحمد حسن يوسف عبد الغني", quranScore: "96", islamicScore: "94", arabicScore: "95", englishScore: "92", mathScore: "98", scienceScore: "95", socialScore: "96", totalScore: "666", resultStatus: "ناجح", gradeRating: "ممتاز" }
  ],
  examsDirector: "أ. علي محمد الكبسي",
  controlHead: "أ. عبده الماوري",
  schoolPrincipal: "أ. ناصر ناصر التويتي"
};

interface Props {
  data: GradeRecordData;
  onEdit: (field: keyof GradeRecordData) => void;
}

export default function GradeRecordSheet({ data, onEdit }: Props) {
  return (
    <div className="w-[297mm] min-h-[210mm] bg-white text-slate-900 font-serif relative p-6 shadow-2xl overflow-hidden flex flex-col justify-between print:w-full print:h-full print:shadow-none print:m-0 select-none border border-slate-300">
      
      {/* Outer Border */}
      <div className="absolute inset-3 border-2 border-slate-800 pointer-events-none z-10"></div>

      {/* Main Container */}
      <div className="relative z-20 flex flex-col h-full justify-between p-2">
        
        {/* Header Block */}
        <div>
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2 text-xs font-bold text-slate-900">
            {/* Right Meta */}
            <div className="text-right space-y-0.5">
              <p>المنطقة : <span onClick={() => onEdit('districtName')} className="cursor-pointer font-black text-blue-900">{data.districtName}</span></p>
              <p>المدرسة : <span onClick={() => onEdit('schoolName')} className="cursor-pointer font-black text-blue-900">{data.schoolName}</span></p>
              <p>الصف : <span onClick={() => onEdit('gradeLevel')} className="cursor-pointer font-black text-blue-900">{data.gradeLevel}</span></p>
            </div>

            {/* Republic Title Center */}
            <div className="text-center">
              <div className="w-10 h-10 border border-slate-800 rounded-full flex items-center justify-center font-bold text-[8px] mx-auto mb-1">
                شعار
              </div>
              <p className="font-['Amiri'] text-sm font-black">بسم الله الرحمن الرحيم</p>
              <p className="text-[10px] text-slate-700">وزارة التربية والتعليم - قطاع المناهج والتوجيه</p>
            </div>

            {/* Left Meta */}
            <div className="text-left space-y-0.5">
              <p>كشف رصد درجات النقل</p>
              <p>العام الدراسي : <span onClick={() => onEdit('academicYear')} className="cursor-pointer text-blue-900">{data.academicYear}</span></p>
            </div>
          </div>

          {/* Title Banner */}
          <div className="bg-slate-100 border border-slate-800 p-1.5 text-center mb-2">
            <h1 onClick={() => onEdit('title')} className="font-['Amiri'] text-lg font-black text-slate-900 cursor-pointer">
              {data.title} للعام الدراسي {data.academicYear}
            </h1>
          </div>
        </div>

        {/* Grades Table */}
        <div className="my-1 overflow-x-auto">
          <table className="w-full text-center border-collapse border border-slate-800 text-[10px] font-sans">
            <thead>
              <tr className="bg-slate-200 font-bold border-b border-slate-800 text-slate-900">
                <th className="border border-slate-800 p-1 w-6">م</th>
                <th className="border border-slate-800 p-1">الرقم السري</th>
                <th className="border border-slate-800 p-1 text-right pr-2 min-w-[160px]">اسم الطالب</th>
                <th className="border border-slate-800 p-1">القرآن الكريم</th>
                <th className="border border-slate-800 p-1">التربية الإسلامية</th>
                <th className="border border-slate-800 p-1">اللغة العربية</th>
                <th className="border border-slate-800 p-1">اللغة الإنجليزية</th>
                <th className="border border-slate-800 p-1">الرياضيات</th>
                <th className="border border-slate-800 p-1">العلوم</th>
                <th className="border border-slate-800 p-1">المواد الاجتماعية</th>
                <th className="border border-slate-800 p-1">المجموع الكلي</th>
                <th className="border border-slate-800 p-1">النتيجة</th>
                <th className="border border-slate-800 p-1">التقدير</th>
              </tr>
            </thead>
            <tbody>
              {data.students.map((st, idx) => (
                <tr key={st.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="border border-slate-700 p-1 font-bold">{idx + 1}</td>
                  <td className="border border-slate-700 p-1 font-mono text-slate-600">{st.secretNo}</td>
                  <td className="border border-slate-700 p-1 text-right font-bold pr-2 font-['Amiri'] text-xs text-slate-900">{st.name}</td>
                  <td className="border border-slate-700 p-1 font-bold">{st.quranScore}</td>
                  <td className="border border-slate-700 p-1 font-bold">{st.islamicScore}</td>
                  <td className="border border-slate-700 p-1 font-bold">{st.arabicScore}</td>
                  <td className="border border-slate-700 p-1 font-bold">{st.englishScore}</td>
                  <td className="border border-slate-700 p-1 font-bold">{st.mathScore}</td>
                  <td className="border border-slate-700 p-1 font-bold">{st.scienceScore}</td>
                  <td className="border border-slate-700 p-1 font-bold">{st.socialScore}</td>
                  <td className="border border-slate-700 p-1 font-black text-blue-900">{st.totalScore}</td>
                  <td className="border border-slate-700 p-1 font-bold text-emerald-800">{st.resultStatus}</td>
                  <td className="border border-slate-700 p-1 font-bold text-amber-900">{st.gradeRating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Signatures */}
        <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-bold text-slate-900">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-slate-700">مدير الاختبارات</p>
              <p onClick={() => onEdit('examsDirector')} className="font-black mt-1 cursor-pointer">{data.examsDirector}</p>
              <div className="w-24 border-b border-slate-400 mx-auto mt-2"></div>
            </div>

            <div>
              <p className="text-slate-700">رئيس الكنترول</p>
              <p onClick={() => onEdit('controlHead')} className="font-black mt-1 cursor-pointer">{data.controlHead}</p>
              <div className="w-24 border-b border-slate-400 mx-auto mt-2"></div>
            </div>

            <div>
              <p className="text-slate-700">مدير المدرسة</p>
              <p onClick={() => onEdit('schoolPrincipal')} className="font-black mt-1 cursor-pointer">{data.schoolPrincipal}</p>
              <div className="w-24 border-b border-slate-400 mx-auto mt-2"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
