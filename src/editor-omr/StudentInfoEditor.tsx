import React, { useState } from 'react';
import { useOMRStore } from './OMRStore';
import { UserCheck, Sparkles, Hash, Layers } from 'lucide-react';

export const StudentInfoEditor: React.FC = () => {
  const { generateStudentIDMatrix, project, updateElement } = useOMRStore();
  
  const studentElement = project.elements.find((el) => el.type === 'student_id_matrix') as any;

  const [digitCount, setDigitCount] = useState<number>(studentElement?.digitCount || 5);
  const [matrixTitle, setMatrixTitle] = useState<string>(studentElement?.title || 'تظليل رقم الجلوس');

  const handleGenerate = () => {
    generateStudentIDMatrix(digitCount, matrixTitle);
  };

  return (
    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
          <UserCheck size={18} />
        </div>
        <div>
          <h3 className="text-xs font-black text-slate-800">توليد خانات رقم الجلوس (Roll Number)</h3>
          <p className="text-[10px] text-slate-400 font-semibold">تظليل رقم الجلوس للمصحح الآلي OMR</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-[11px] font-black text-slate-600 mb-1 block">عنوان الصندوق:</label>
          <input
            type="text"
            value={matrixTitle}
            onChange={(e) => setMatrixTitle(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="مثال: رقم الجلوس"
          />
        </div>

        <div>
          <label className="text-[11px] font-black text-slate-600 mb-1 block">عدد أرقام/خانات رقم الجلوس (Digits):</label>
          <div className="flex items-center gap-2">
            {[3, 4, 5, 6, 7, 8].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setDigitCount(num)}
                className={`flex-1 py-1.5 rounded-xl font-extrabold text-xs border transition-all ${
                  digitCount === num
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-xs font-black shadow-md shadow-indigo-600/20 transition-all mt-2"
        >
          <Sparkles size={15} />
          توليد / تحديث مربع رقم الجلوس
        </button>
      </div>
    </div>
  );
};
