import React, { useState } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { TextElement, MathElement, PhysicsElement, ImageElement } from '../types';
import { FontPickerModal, TypographyStyle } from '../../components/FontPickerModal';
import { fontManager } from '../../services/fontManager';
import { 
  Bold, Italic, AlignRight, AlignCenter, AlignLeft, AlignJustify,
  Type, Palette, Lock, Unlock, Eye, EyeOff, Copy, Trash2, 
  Layers, ArrowUp, ArrowDown, Sparkles, CheckSquare, HelpCircle, 
  Table, Image as ImageIcon, Calculator, Zap, Grid, BookOpen, Sliders
} from 'lucide-react';

export const ContextToolbar: React.FC = () => {
  const [isFontPickerOpen, setIsFontPickerOpen] = useState(false);
  const { 
    document, activePageIndex, selectedElementIds, 
    updateElement, removeElement, duplicateElement, clearSelection 
  } = useEditorStore();

  if (selectedElementIds.length === 0) return null;

  const selectedId = selectedElementIds[0];
  const page = document.pages[activePageIndex];
  const element = page ? page.elements.find(el => el.id === selectedId) : null;

  if (!element) return null;

  const isQuestion = element.type === 'text' && (element as TextElement).isQuestion;
  const textEl = element.type === 'text' ? (element as TextElement) : null;

  const handleApplyPresetStyle = (styleType: string) => {
    if (!textEl) return;
    let updates: Partial<TextElement> = {};
    if (styleType === 'main_heading') {
      updates = { fontSize: 20, fontWeight: 'black', textAlign: 'center', color: '#0f172a' };
    } else if (styleType === 'sub_heading') {
      updates = { fontSize: 16, fontWeight: 'bold', textAlign: 'right', color: '#1e293b' };
    } else if (styleType === 'question_title') {
      updates = { fontSize: 15, fontWeight: 'bold', textAlign: 'right', color: '#000000' };
    } else if (styleType === 'option_text') {
      updates = { fontSize: 13, fontWeight: 'normal', textAlign: 'right', color: '#334155' };
    } else if (styleType === 'instruction_note') {
      updates = { fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#64748b' };
    }
    updateElement(activePageIndex, element.id, updates);
  };

  return (
    <div 
      className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs font-sans text-slate-200 select-none shadow-md z-20 overflow-x-auto custom-scrollbar"
      dir="rtl"
    >
      <div className="flex items-center gap-3 shrink-0">
        {/* Element Type Indicator Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-950 border border-indigo-700/60 rounded-lg text-indigo-300 font-bold text-[11px]">
          {element.type === 'text' && isQuestion && <CheckSquare size={13} className="text-amber-400" />}
          {element.type === 'text' && !isQuestion && <Type size={13} className="text-indigo-400" />}
          {element.type === 'math' && <Calculator size={13} className="text-blue-400" />}
          {element.type === 'physics' && <Zap size={13} className="text-yellow-400" />}
          {element.type === 'image' && <ImageIcon size={13} className="text-emerald-400" />}
          <span>
            {isQuestion ? `سؤال ${textEl?.questionNumber || ''}` : 
             element.type === 'text' ? 'مربع نص' :
             element.type === 'math' ? 'معادلة رياضية' :
             element.type === 'physics' ? 'رسم فيزيائي' : 'صورة'}
          </span>
        </div>

        {/* Text Element Quick Styles Bar */}
        {textEl && (
          <>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold px-1.5">الأنماط:</span>
              <button 
                onClick={() => handleApplyPresetStyle('main_heading')}
                className="px-2 py-0.5 rounded hover:bg-slate-800 text-[11px] font-black text-slate-100"
              >
                عنوان رئيسي
              </button>
              <button 
                onClick={() => handleApplyPresetStyle('question_title')}
                className="px-2 py-0.5 rounded hover:bg-slate-800 text-[11px] font-bold text-amber-300"
              >
                عنوان سؤال
              </button>
              <button 
                onClick={() => handleApplyPresetStyle('instruction_note')}
                className="px-2 py-0.5 rounded hover:bg-slate-800 text-[11px] font-bold text-cyan-300"
              >
                تنبيه / تعليمات
              </button>
            </div>

            {/* Typography Controls */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {/* Font Picker Modal Trigger */}
              <button
                onClick={() => setIsFontPickerOpen(true)}
                className="px-2.5 py-1 bg-indigo-950 border border-indigo-700/60 hover:bg-indigo-900 text-indigo-300 rounded font-black text-[11px] flex items-center gap-1 transition-all"
                title="تخصيص الخط والنمط الاحترافي"
              >
                <Type size={13} className="text-amber-400" />
                <span>الخط والنمط</span>
              </button>

              {/* Font Size */}
              <input 
                type="number"
                value={textEl.fontSize || 14}
                onChange={(e) => updateElement(activePageIndex, element.id, { fontSize: Number(e.target.value) })}
                className="w-11 bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-center text-xs font-bold text-white focus:outline-none"
                title="حجم الخط"
                min="8"
                max="72"
              />

              {/* Font Weight */}
              <button 
                onClick={() => updateElement(activePageIndex, element.id, { fontWeight: textEl.fontWeight === 'bold' ? 'normal' : 'bold' })}
                className={`p-1 rounded ${textEl.fontWeight === 'bold' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
                title="عريض (Bold)"
              >
                <Bold size={13} />
              </button>

              {/* Text Alignments */}
              <div className="flex items-center bg-slate-900 rounded p-0.5 border border-slate-800">
                <button 
                  onClick={() => updateElement(activePageIndex, element.id, { textAlign: 'right' })}
                  className={`p-1 rounded ${textEl.textAlign === 'right' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
                  title="محاذاة لليمين"
                >
                  <AlignRight size={13} />
                </button>
                <button 
                  onClick={() => updateElement(activePageIndex, element.id, { textAlign: 'center' })}
                  className={`p-1 rounded ${textEl.textAlign === 'center' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
                  title="محاذاة للوسط"
                >
                  <AlignCenter size={13} />
                </button>
                <button 
                  onClick={() => updateElement(activePageIndex, element.id, { textAlign: 'left' })}
                  className={`p-1 rounded ${textEl.textAlign === 'left' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
                  title="محاذاة لليسار"
                >
                  <AlignLeft size={13} />
                </button>
              </div>

              {/* Color Picker Input */}
              <input 
                type="color" 
                value={textEl.color || '#000000'}
                onChange={(e) => updateElement(activePageIndex, element.id, { color: e.target.value })}
                className="w-6 h-6 rounded cursor-pointer border border-slate-700 bg-transparent"
                title="لون النص"
              />
            </div>
          </>
        )}

        {/* Question-Specific Fast Attributes */}
        {isQuestion && textEl && (
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <span className="text-[11px] font-bold text-amber-400 px-1">النمط الرقمي:</span>
            <select 
              value={textEl.numberingFormat || 'arabic'}
              onChange={(e) => updateElement(activePageIndex, element.id, { numberingFormat: e.target.value as any })}
              className="bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 rounded px-2 py-0.5 focus:outline-none"
            >
              <option value="arabic">أرقام عربية (1, 2, 3)</option>
              <option value="abjad">أبجدي (أ، ب، ج)</option>
              <option value="hierarchical">تسلسلي (1.1, 1.2)</option>
              <option value="roman">روماني (I, II, III)</option>
            </select>
          </div>
        )}
      </div>

      {/* Common Actions (Lock, Hide, Duplicate, Delete, Close selection) */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button 
          onClick={() => updateElement(activePageIndex, element.id, { isLocked: !element.isLocked })}
          className={`p-1.5 rounded-lg border transition-all ${
            element.isLocked ? 'bg-rose-950 border-rose-800 text-rose-400' : 'bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-400'
          }`}
          title={element.isLocked ? 'إلغاء قفل العنصر' : 'قفل العنصر'}
        >
          {element.isLocked ? <Lock size={13} /> : <Unlock size={13} />}
        </button>

        <button 
          onClick={() => updateElement(activePageIndex, element.id, { isHidden: !element.isHidden })}
          className={`p-1.5 rounded-lg border transition-all ${
            element.isHidden ? 'bg-amber-950 border-amber-800 text-amber-400' : 'bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-400'
          }`}
          title={element.isHidden ? 'إظهار العنصر' : 'إخفاء العنصر'}
        >
          {element.isHidden ? <EyeOff size={13} /> : <Eye size={13} />}
        </button>

        <button 
          onClick={() => duplicateElement(activePageIndex, element.id)}
          className="p-1.5 bg-slate-950 border border-slate-800 hover:bg-indigo-950 hover:text-indigo-400 rounded-lg text-slate-300 transition-colors"
          title="تكرار العنصر"
        >
          <Copy size={13} />
        </button>

        <button 
          onClick={() => removeElement(activePageIndex, element.id)}
          className="p-1.5 bg-slate-950 border border-slate-800 hover:bg-rose-950 text-rose-400 rounded-lg transition-colors"
          title="حذف العنصر"
        >
          <Trash2 size={13} />
        </button>

        <button 
          onClick={clearSelection}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg text-[11px] font-bold transition-colors mr-1"
        >
          إنهاء التحديد
        </button>
      </div>

      {textEl && (
        <FontPickerModal
          isOpen={isFontPickerOpen}
          onClose={() => setIsFontPickerOpen(false)}
          title="مكتبة الخطوط وتعديل أنماط النص للاختبارات"
          documentType="exam"
          currentStyle={{
            fontFamily: textEl.fontFamily,
            fontSize: textEl.fontSize,
            fontWeight: textEl.fontWeight,
            color: textEl.color,
            textAlign: textEl.textAlign as any,
            lineHeight: textEl.lineHeight,
            letterSpacing: textEl.letterSpacing,
            wordSpacing: textEl.wordSpacing,
            opacity: textEl.opacity
          }}
          onApplyStyle={(style) => {
            if (!textEl) return;
            updateElement(activePageIndex, element.id, {
              fontFamily: style.fontFamily,
              fontSize: style.fontSize,
              fontWeight: style.fontWeight as any,
              color: style.color,
              textAlign: style.textAlign,
              lineHeight: style.lineHeight,
              letterSpacing: style.letterSpacing,
              wordSpacing: style.wordSpacing,
              opacity: style.opacity
            });
          }}
        />
      )}
    </div>
  );
};
