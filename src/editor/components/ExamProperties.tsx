import React, { useState } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { 
  Settings2, Trash2, Sliders, ChevronDown, AlignRight, AlignCenter, AlignLeft, AlignJustify,
  Type, Lock, Unlock, Eye, EyeOff, Layers, RotateCw, Maximize2, Sparkles, Award
} from 'lucide-react';
import { FontPickerModal } from '../../components/FontPickerModal';

export const ExamProperties = () => {
  const { document, activePageIndex, selectedElementIds, updateElement, removeElement } = useEditorStore();
  const [isFontPickerOpen, setIsFontPickerOpen] = useState(false);
  
  const page = document.pages[activePageIndex];
  
  if (selectedElementIds.length === 0) return null;

  const selectedElementId = selectedElementIds[0]; 
  const element = page.elements.find(e => e.id === selectedElementId);

  if (!element) return null;

  const isQuestion = (element as any).isQuestion;

  const renderContent = () => (
    <div className="space-y-4 text-slate-800" dir="rtl">
      {/* Element Header & Quick Actions */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
          <Settings2 size={18} className="stroke-[2.5]" />
          <span>خصائص العنصر المحدد</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => updateElement(activePageIndex, element.id, { isLocked: !element.isLocked })}
            className={`p-1.5 rounded-lg border transition-all ${element.isLocked ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}
            title={element.isLocked ? "إلغاء قفل العنصر" : "قفل العنصر"}
          >
            {element.isLocked ? <Lock size={15} /> : <Unlock size={15} />}
          </button>
          <button 
            onClick={() => updateElement(activePageIndex, element.id, { isHidden: !element.isHidden })}
            className={`p-1.5 rounded-lg border transition-all ${element.isHidden ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}
            title={element.isHidden ? "إظهار العنصر" : "إخفاء العنصر"}
          >
            {element.isHidden ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
          <button 
            onClick={() => removeElement(activePageIndex, element.id)}
            className="text-rose-600 hover:bg-rose-50 border border-rose-100 p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
            title="حذف العنصر"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Transform Geometry (X, Y, Width, Height) */}
      <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
        <div className="text-[11px] font-black text-slate-500 flex items-center gap-1 mb-1">
          <Maximize2 size={13} className="text-indigo-600" />
          <span>الأبعاد والموقع (الملم / Bounding)</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-0.5">الموقع الأفقي X</label>
            <input 
              type="number" 
              value={element.x} 
              onChange={(e) => updateElement(activePageIndex, element.id, { x: Number(e.target.value) })}
              className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-0.5">الموقع العمودي Y</label>
            <input 
              type="number" 
              value={element.y} 
              onChange={(e) => updateElement(activePageIndex, element.id, { y: Number(e.target.value) })}
              className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-0.5">العرض W</label>
            <input 
              type="number" 
              value={element.width} 
              onChange={(e) => updateElement(activePageIndex, element.id, { width: Number(e.target.value) })}
              className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-0.5">الارتفاع H</label>
            <input 
              type="number" 
              value={element.height} 
              onChange={(e) => updateElement(activePageIndex, element.id, { height: Number(e.target.value) })}
              className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Question Specific Marks property */}
      {isQuestion && (
        <div className="space-y-1.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-3 rounded-2xl shadow-sm">
          <div className="flex items-center gap-1.5 text-amber-800 text-xs font-black">
            <Award size={15} className="text-amber-600" />
            <span>درجة هذا السؤال [حساب تلقائي]</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <input 
              type="number" 
              value={(element as any).marks || 5} 
              onChange={(e) => {
                const newMarks = Number(e.target.value);
                updateElement(activePageIndex, element.id, { marks: newMarks });
                setTimeout(() => {
                  const updatedPages = useEditorStore.getState().document.pages;
                  const total = updatedPages[activePageIndex].elements
                    .filter(el => el.type === 'text' && (el as any).isQuestion)
                    .reduce((sum, el) => sum + ((el as any).marks || 0), 0);
                  useEditorStore.getState().updateMetadata({ marks: String(total || 50) });
                }, 100);
              }}
              className="w-20 bg-white border border-amber-300 rounded-xl px-3 py-1.5 text-sm font-black text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
              min="1"
            />
            <span className="text-xs font-bold text-amber-700">درجات في الامتحان</span>
          </div>
        </div>
      )}

      {/* Text Element Properties */}
      {element.type === 'text' && (
        <div className="space-y-3.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-black text-slate-600 flex items-center gap-1">
              <Type size={14} className="text-indigo-600" />
              <span>تنسيق النمط والخط</span>
            </label>
            <button
              onClick={() => setIsFontPickerOpen(true)}
              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-[11px] flex items-center gap-1 transition-all shadow-sm"
            >
              <Sparkles size={12} className="text-amber-300" />
              <span>مكتبة الخطوط</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">حجم الخط (pt)</label>
              <input 
                type="number" 
                value={(element as any).fontSize || 14} 
                onChange={(e) => updateElement(activePageIndex, element.id, { fontSize: Number(e.target.value) })}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">وزن الخط</label>
              <select
                value={(element as any).fontWeight || 'normal'}
                onChange={(e) => updateElement(activePageIndex, element.id, { fontWeight: e.target.value as any })}
                className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="normal">عادي (Normal)</option>
                <option value="bold">عريض (Bold)</option>
                <option value="900">أسود ثقيل (Black)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-black text-slate-500 block mb-1">لون الخط</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={(element as any).color || '#0f172a'} 
                onChange={(e) => updateElement(activePageIndex, element.id, { color: e.target.value })}
                className="w-10 h-8 bg-white border border-slate-200 rounded-lg p-0.5 cursor-pointer shadow-sm"
              />
              <input 
                type="text" 
                value={(element as any).color || '#0f172a'} 
                onChange={(e) => updateElement(activePageIndex, element.id, { color: e.target.value })}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1 text-xs font-mono text-slate-600 font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-black text-slate-500 block mb-1.5">المحاذاة واتجاه النص</label>
            <div className="grid grid-cols-4 gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
              <button 
                onClick={() => updateElement(activePageIndex, element.id, { textAlign: 'right' })}
                className={`py-1.5 rounded-lg flex justify-center transition-all ${element.textAlign === 'right' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <AlignRight size={16} />
              </button>
              <button 
                onClick={() => updateElement(activePageIndex, element.id, { textAlign: 'center' })}
                className={`py-1.5 rounded-lg flex justify-center transition-all ${element.textAlign === 'center' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <AlignCenter size={16} />
              </button>
              <button 
                onClick={() => updateElement(activePageIndex, element.id, { textAlign: 'left' })}
                className={`py-1.5 rounded-lg flex justify-center transition-all ${element.textAlign === 'left' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <AlignLeft size={16} />
              </button>
              <button 
                onClick={() => updateElement(activePageIndex, element.id, { textAlign: 'justify' })}
                className={`py-1.5 rounded-lg flex justify-center transition-all ${element.textAlign === 'justify' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <AlignJustify size={16} />
              </button>
            </div>
          </div>

          {/* Advanced Spacing & Opacity */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-0.5">ارتفاع السطر (Line Height)</label>
              <input 
                type="number" 
                step="0.1"
                min="1"
                max="3"
                value={(element as any).lineHeight || 1.5} 
                onChange={(e) => updateElement(activePageIndex, element.id, { lineHeight: Number(e.target.value) })}
                className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-0.5">تباعد الحروف (Spacing)</label>
              <input 
                type="number" 
                step="0.5"
                value={(element as any).letterSpacing || 0} 
                onChange={(e) => updateElement(activePageIndex, element.id, { letterSpacing: Number(e.target.value) })}
                className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Math Element Properties */}
      {element.type === 'math' && (
        <div className="space-y-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div>
            <label className="text-[11px] font-black text-slate-600 block mb-1">رموز LaTeX الرياضية</label>
            <textarea 
              value={(element as any).latex || ''} 
              onChange={(e) => updateElement(activePageIndex, element.id, { latex: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-700 h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
              dir="ltr"
            />
          </div>
          <div>
            <label className="text-[11px] font-black text-slate-600 block mb-1">حجم الخط الرياضي</label>
            <input 
              type="number" 
              value={(element as any).fontSize || 16} 
              onChange={(e) => updateElement(activePageIndex, element.id, { fontSize: Number(e.target.value) })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}

      {/* Modal for font selection */}
      <FontPickerModal
        isOpen={isFontPickerOpen}
        onClose={() => setIsFontPickerOpen(false)}
        title="مكتبة الخطوط وأنماط الطباعة"
        documentType="exam"
        currentStyle={{
          fontFamily: (element as any).fontFamily,
          fontSize: (element as any).fontSize,
          fontWeight: (element as any).fontWeight,
          color: (element as any).color,
          textAlign: (element as any).textAlign as any,
          lineHeight: (element as any).lineHeight,
          letterSpacing: (element as any).letterSpacing,
          opacity: (element as any).opacity
        }}
        onApplyStyle={(style) => {
          updateElement(activePageIndex, element.id, {
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight as any,
            color: style.color,
            textAlign: style.textAlign,
            lineHeight: style.lineHeight,
            letterSpacing: style.letterSpacing,
            opacity: style.opacity
          });
        }}
      />
    </div>
  );

  return (
    <>
      {/* Desktop properties sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 z-15 shrink-0 hidden lg:flex flex-col p-4 space-y-4 overflow-y-auto custom-scrollbar">
        {renderContent()}
      </aside>

      {/* Mobile properties Bottom Sheet */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 bg-white border-t border-slate-200 rounded-t-[2.5rem] shadow-[0_-15px_30px_rgba(0,0,0,0.15)] p-5 z-40 max-h-[50vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4"></div>
        {renderContent()}
      </div>
    </>
  );
};

