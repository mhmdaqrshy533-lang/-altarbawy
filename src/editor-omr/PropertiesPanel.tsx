import React from 'react';
import { useOMRStore } from './OMRStore';
import { 
  Sliders, Move, Maximize2, RotateCw, Lock, Eye, EyeOff, 
  Trash2, ArrowUp, ArrowDown, Grid, UserCheck, Type, Building2 
} from 'lucide-react';

export const PropertiesPanel: React.FC = () => {
  const { 
    project, 
    selectedElementIds, 
    updateElement, 
    removeElement, 
    toggleLock, 
    toggleHide,
    bringForward,
    sendBackward,
    setShowBubbleGeneratorModal
  } = useOMRStore();

  const selectedElement = project.elements.find((el) => selectedElementIds.includes(el.id));

  if (!selectedElement) {
    return (
      <div className="p-6 text-center text-slate-400 font-bold text-xs font-sans" dir="rtl">
        <Sliders size={28} className="mx-auto mb-2 text-slate-300" />
        انقر على أي عنصر في ورقة OMR للتحكم بخصائصه وأبعاده
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 font-sans" dir="rtl">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Sliders size={18} />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-800">خصائص العنصر المحدد</h3>
            <p className="text-[10px] text-slate-400 font-extrabold capitalize">{selectedElement.type}</p>
          </div>
        </div>

        {/* Layer Quick Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => toggleLock(selectedElement.id)}
            title={selectedElement.isLocked ? 'فك القفل' : 'قفل العنصر'}
            className={`p-1.5 rounded-lg border transition-colors ${
              selectedElement.isLocked ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Lock size={14} />
          </button>
          <button
            onClick={() => toggleHide(selectedElement.id)}
            title={selectedElement.isHidden ? 'إظهار' : 'إخفاء'}
            className="p-1.5 bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {selectedElement.isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
          <button
            onClick={() => bringForward(selectedElement.id)}
            title="تقديم للجميع"
            className="p-1.5 bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowUp size={14} />
          </button>
          <button
            onClick={() => sendBackward(selectedElement.id)}
            title="تأخير للخلف"
            className="p-1.5 bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowDown size={14} />
          </button>
          <button
            onClick={() => removeElement(selectedElement.id)}
            title="حذف العنصر"
            className="p-1.5 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 rounded-lg transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Geometry / Positions */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-500 block">الموقع والأبعاد (مم / بكسل):</label>
        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <span className="text-slate-400 font-black">X:</span>
            <input
              type="number"
              value={Math.round(selectedElement.x)}
              onChange={(e) => updateElement(selectedElement.id, { x: Number(e.target.value) })}
              className="w-full bg-transparent focus:outline-none font-extrabold text-slate-800"
            />
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <span className="text-slate-400 font-black">Y:</span>
            <input
              type="number"
              value={Math.round(selectedElement.y)}
              onChange={(e) => updateElement(selectedElement.id, { y: Number(e.target.value) })}
              className="w-full bg-transparent focus:outline-none font-extrabold text-slate-800"
            />
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <span className="text-slate-400 font-black">العرض:</span>
            <input
              type="number"
              value={Math.round(selectedElement.width)}
              onChange={(e) => updateElement(selectedElement.id, { width: Number(e.target.value) })}
              className="w-full bg-transparent focus:outline-none font-extrabold text-slate-800"
            />
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <span className="text-slate-400 font-black">الارتفاع:</span>
            <input
              type="number"
              value={Math.round(selectedElement.height)}
              onChange={(e) => updateElement(selectedElement.id, { height: Number(e.target.value) })}
              className="w-full bg-transparent focus:outline-none font-extrabold text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Specific Element Configurations */}
      {selectedElement.type === 'bubble_grid' && (
        <div className="p-3 bg-purple-50/60 border border-purple-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-xs font-black text-purple-900">
            <span>تعديل شبكة الأتمتة</span>
            <button
              onClick={() => setShowBubbleGeneratorModal(true)}
              className="text-[10px] bg-purple-600 text-white px-2 py-1 rounded-lg font-bold"
            >
              فتح المولد الكامل
            </button>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-1">عدد الأسئلة:</label>
              <input
                type="number"
                value={(selectedElement as any).questionCount}
                onChange={(e) => updateElement(selectedElement.id, { questionCount: Number(e.target.value) } as any)}
                className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-1">عدد الخيارات (2 - 5):</label>
              <input
                type="number"
                min="2"
                max="5"
                value={(selectedElement as any).choicesCount}
                onChange={(e) => updateElement(selectedElement.id, { choicesCount: Number(e.target.value) } as any)}
                className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold"
              />
            </div>
          </div>
        </div>
      )}

      {selectedElement.type === 'text' && (
        <div className="space-y-2 text-xs">
          <label className="text-[10px] font-black text-slate-500 block">نص العنوان / الفقرة:</label>
          <textarea
            value={(selectedElement as any).text}
            onChange={(e) => updateElement(selectedElement.id, { text: e.target.value } as any)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold text-slate-800 h-20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      )}

    </div>
  );
};
