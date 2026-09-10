import React from 'react';
import { useOMRStore } from './OMRStore';
import { FileSpreadsheet, Building2, BookOpen, Clock, Award, Shield } from 'lucide-react';

export const HeaderEditor: React.FC = () => {
  const { project, updateHeaderData } = useOMRStore();
  const meta = project.metadata;

  return (
    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
          <Building2 size={18} />
        </div>
        <div>
          <h3 className="text-xs font-black text-slate-800">بيانات ترويسة الاختبار الموحدة</h3>
          <p className="text-[10px] text-slate-400 font-semibold">تخصيص البيانات الوزارية والمدرسية</p>
        </div>
      </div>

      <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar p-1">
        <div>
          <label className="text-[10px] font-black text-slate-500 block mb-1">اسم الدولة والوزارة:</label>
          <input
            type="text"
            value={meta.ministry}
            onChange={(e) => updateHeaderData({ ministry: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-black text-slate-500 block mb-1">المحافظة / المديرية:</label>
            <input
              type="text"
              value={meta.governorate}
              onChange={(e) => updateHeaderData({ governorate: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-500 block mb-1">اسم المدرسة:</label>
            <input
              type="text"
              value={meta.school}
              onChange={(e) => updateHeaderData({ school: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-500 block mb-1">عنوان الامتحان الرئيسية:</label>
          <input
            type="text"
            value={meta.examTitle}
            onChange={(e) => updateHeaderData({ examTitle: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-black text-slate-500 block mb-1">اسم المادة:</label>
            <input
              type="text"
              value={meta.subject}
              onChange={(e) => updateHeaderData({ subject: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-500 block mb-1">الصف والتخصص:</label>
            <input
              type="text"
              value={meta.grade}
              onChange={(e) => updateHeaderData({ grade: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-[10px] font-black text-slate-500 block mb-1">رمز النموذج:</label>
            <select
              value={meta.modelCode}
              onChange={(e) => updateHeaderData({ modelCode: e.target.value as any })}
              className="w-full bg-purple-50 border border-purple-200 rounded-xl px-2 py-1.5 text-xs font-black text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="أ">نموذج أ</option>
              <option value="ب">نموذج ب</option>
              <option value="ج">نموذج ج</option>
              <option value="د">نموذج د</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-500 block mb-1">زمن الاختبار:</label>
            <input
              type="text"
              value={meta.time}
              onChange={(e) => updateHeaderData({ time: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-500 block mb-1">الدرجة الكلية:</label>
            <input
              type="text"
              value={meta.marks}
              onChange={(e) => updateHeaderData({ marks: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
