import React from 'react';
import { useOMRStore } from './OMRStore';
import { Layers, Lock, Eye, EyeOff, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export const LayersPanel: React.FC = () => {
  const { 
    project, 
    selectedElementIds, 
    selectElement, 
    toggleLock, 
    toggleHide, 
    removeElement,
    bringForward,
    sendBackward
  } = useOMRStore();

  const elements = [...project.elements].reverse();

  return (
    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3 font-sans" dir="rtl">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
          <Layers size={18} />
        </div>
        <div>
          <h3 className="text-xs font-black text-slate-800">إدارة طبقات الصفحة (Layers)</h3>
          <p className="text-[10px] text-slate-400 font-semibold">الترتيب الرأسي وإخفاء/قفل العناصر</p>
        </div>
      </div>

      <div className="space-y-1.5 max-h-[50vh] overflow-y-auto custom-scrollbar">
        {elements.map((el) => {
          const isSelected = selectedElementIds.includes(el.id);
          const label = el.type === 'header' ? 'ترويسة الامتحان' 
                      : el.type === 'bubble_grid' ? 'شبكة تظليل الأسئلة'
                      : el.type === 'student_id_matrix' ? 'مربع رقم الجلوس'
                      : el.type === 'calibration_anchor' ? 'علامة معايرة الماسح'
                      : el.type === 'barcode' ? 'باركود المعايرة'
                      : el.type === 'qrcode' ? 'رمز QR'
                      : el.type === 'text' ? 'عنصر نصي'
                      : el.type;

          return (
            <div
              key={el.id}
              onClick={() => selectElement(el.id)}
              className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-purple-50 border-purple-500 shadow-sm' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-800">{label}</span>
              </div>

              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => bringForward(el.id)}
                  title="أعلى"
                  className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-200"
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  onClick={() => sendBackward(el.id)}
                  title="أسفل"
                  className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-200"
                >
                  <ArrowDown size={12} />
                </button>
                <button
                  onClick={() => toggleLock(el.id)}
                  className={`p-1 rounded ${el.isLocked ? 'text-amber-600 bg-amber-100' : 'text-slate-400 hover:text-slate-700'}`}
                >
                  <Lock size={12} />
                </button>
                <button
                  onClick={() => toggleHide(el.id)}
                  className={`p-1 rounded ${el.isHidden ? 'text-rose-600' : 'text-slate-400 hover:text-slate-700'}`}
                >
                  {el.isHidden ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
                {!el.id.startsWith('anchor-') && (
                  <button
                    onClick={() => removeElement(el.id)}
                    className="p-1 text-rose-500 hover:bg-rose-100 rounded"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
