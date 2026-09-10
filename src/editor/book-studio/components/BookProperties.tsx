import React from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { useEditorStore } from '../../store/useEditorStore';
import { TextElement } from '../../types';
import { FONT_LIBRARY } from '../data';
import { 
  Sliders, Type, Palette, Layout, Lock, Unlock, 
  Eye, EyeOff, ArrowUp, ArrowDown, AlignRight, AlignCenter, 
  AlignLeft, AlignJustify, Bold, Sparkles, BookOpen 
} from 'lucide-react';

export const BookProperties: React.FC = () => {
  const { currentProject } = useBookStudioStore();
  const { 
    document, 
    activePageIndex, 
    selectedElementIds, 
    updateElement, 
    removeElement
  } = useEditorStore();

  if (!currentProject) return null;

  const page = document.pages[activePageIndex] || { elements: [] };
  const selectedElement = page.elements.find(e => selectedElementIds.includes(e.id));
  const isSelected = !!selectedElement;

  const getSectionName = (idx: number) => {
    if (idx === 0) return '🟦 الغلاف الأمامي الخارجي';
    if (idx === 1) return '⬜ صفحة بيانات الكتاب والحقوق';
    if (idx === 2) return '⬜ صفحة الإهداء ومقدمة المنهج';
    if (idx === 3) return '⬜ صفحة الفهرس الآلي';
    if (idx === document.pages.length - 1) return '🟥 الغلاف الخلفي الخارجي';
    return `⬜ صفحة المحتوى (فصل منهجي)`;
  };

  const handleBringToFront = () => {
    if (selectedElement) {
      const maxZ = Math.max(...page.elements.map(e => e.zIndex || 0), 0);
      updateElement(activePageIndex, selectedElement.id, { zIndex: maxZ + 1 });
    }
  };

  const handleSendToBack = () => {
    if (selectedElement) {
      const minZ = Math.min(...page.elements.map(e => e.zIndex || 0), 0);
      updateElement(activePageIndex, selectedElement.id, { zIndex: Math.max(0, minZ - 1) });
    }
  };

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col font-sans select-none text-slate-100 z-20 shrink-0" dir="rtl">
      
      {/* Header */}
      <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders size={18} className="text-indigo-400" />
          <h3 className="text-xs font-black text-white">خصائص عنصر النشر والتصميم</h3>
        </div>
        <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-bold">
          DTP Inspector
        </span>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-4 text-xs font-bold">
        
        {/* Section Info Card */}
        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 block font-bold">قسم الصفحة الحالية:</span>
          <span className="text-xs font-black text-indigo-400 block">{getSectionName(activePageIndex)}</span>
        </div>

        {isSelected && selectedElement ? (
          /* Selected Element Inspector */
          <div className="space-y-4 animate-in fade-in duration-150">
            
            {/* Element Type & Actions */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-black text-slate-200">
                نوع العنصر: <span className="text-indigo-400">{selectedElement.type}</span>
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateElement(activePageIndex, selectedElement.id, { isLocked: !selectedElement.isLocked })}
                  className={`p-1.5 rounded-lg border transition-all ${
                    selectedElement.isLocked ? 'bg-amber-950 text-amber-400 border-amber-800' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                  title={selectedElement.isLocked ? 'فك قفل العنصر' : 'قفل العنصر'}
                >
                  {selectedElement.isLocked ? <Lock size={14} /> : <Unlock size={14} />}
                </button>

                <button
                  onClick={() => updateElement(activePageIndex, selectedElement.id, { isHidden: !selectedElement.isHidden })}
                  className={`p-1.5 rounded-lg border transition-all ${
                    selectedElement.isHidden ? 'bg-rose-950 text-rose-400 border-rose-800' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                  title={selectedElement.isHidden ? 'إظهار العنصر' : 'إخفاء العنصر'}
                >
                  {selectedElement.isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Typography Section (If Text Element) */}
            {selectedElement.type === 'text' && (
              <div className="space-y-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-indigo-400 font-black block">إعدادات الخط والتايبوجرافي:</span>

                {/* Font Family */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 block">خط المنهج:</label>
                  <select
                    value={(selectedElement as TextElement).fontFamily || currentProject.fontPairing.bodyFont}
                    onChange={(e) => updateElement(activePageIndex, selectedElement.id, { fontFamily: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  >
                    {FONT_LIBRARY.map(f => (
                      <option key={f.id} value={f.headingFont}>{f.name}</option>
                    ))}
                  </select>
                </div>

                {/* Font Size & Weight */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 block">حجم الخط:</label>
                    <input
                      type="number"
                      value={(selectedElement as TextElement).fontSize || 14}
                      onChange={(e) => updateElement(activePageIndex, selectedElement.id, { fontSize: parseInt(e.target.value, 10) || 14 })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 text-xs font-mono focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 block">وزن الخط:</label>
                    <select
                      value={(selectedElement as TextElement).fontWeight || 'normal'}
                      onChange={(e) => updateElement(activePageIndex, selectedElement.id, { fontWeight: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2 py-1.5 text-slate-200 text-xs focus:outline-none"
                    >
                      <option value="normal">عادي (Normal)</option>
                      <option value="bold">عريض (Bold)</option>
                      <option value="black">أسود عريض (Black)</option>
                    </select>
                  </div>
                </div>

                {/* Alignment & Text Color */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 block">محاذاة النص واللون:</label>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
                      {['right', 'center', 'left'].map(align => (
                        <button
                          key={align}
                          onClick={() => updateElement(activePageIndex, selectedElement.id, { textAlign: align as any })}
                          className={`p-1.5 rounded-lg text-xs transition-all ${
                            (selectedElement as TextElement).textAlign === align ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {align === 'right' ? <AlignRight size={14} /> : align === 'center' ? <AlignCenter size={14} /> : <AlignLeft size={14} />}
                        </button>
                      ))}
                    </div>

                    <input
                      type="color"
                      value={(selectedElement as TextElement).color || '#0f172a'}
                      onChange={(e) => updateElement(activePageIndex, selectedElement.id, { color: e.target.value })}
                      className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer p-0.5"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* Layer Z-Index Reordering */}
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-[10px] text-indigo-400 font-black block">ترتيب الطبقات (Layer Order):</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleBringToFront}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 transition-all flex items-center justify-center gap-1"
                >
                  <ArrowUp size={14} />
                  <span>تقديم للأمام</span>
                </button>

                <button
                  onClick={handleSendToBack}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 transition-all flex items-center justify-center gap-1"
                >
                  <ArrowDown size={14} />
                  <span>تأخير للخلف</span>
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Empty Selection State */
          <div className="p-6 text-center space-y-2 bg-slate-950/50 rounded-2xl border border-slate-800/80">
            <Layout size={32} className="mx-auto text-slate-600" />
            <p className="text-xs font-bold text-slate-400">
              اضغط على أي عنصر أو مربع نص داخل صفحة الكتاب لاستعراض وتعديل خصائصه.
            </p>
          </div>
        )}

      </div>
    </aside>
  );
};
