import React, { useState } from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { FormattingBlockType } from '../types';
import { FONT_LIBRARY } from '../data';
import { 
  Type, X, Check, Save, Sparkles, Heading1, Heading2, 
  HelpCircle, CheckCircle2, AlertCircle, Bookmark, Quote 
} from 'lucide-react';

interface StyleManagerModalProps {
  onClose: () => void;
}

interface StylePreset {
  id: FormattingBlockType;
  title: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const StyleManagerModal: React.FC<StyleManagerModalProps> = ({ onClose }) => {
  const { currentProject } = useBookStudioStore();

  const [activeStyleId, setActiveStyleId] = useState<FormattingBlockType>('chapter_title');

  const [presets, setPresets] = useState<StylePreset[]>([
    { id: 'chapter_title', title: 'عنوان الفصل الرئيسي (Chapter Title)', fontFamily: currentProject?.fontPairing.headingFont || 'Amiri', fontSize: 22, fontWeight: 'bold', color: currentProject?.palette.primary || '#1e40af', bgColor: '#eff6ff', borderColor: '#3b82f6' },
    { id: 'lesson_heading', title: 'عنوان الدرس الفرعي (Lesson Heading)', fontFamily: currentProject?.fontPairing.headingFont || 'Amiri', fontSize: 18, fontWeight: 'bold', color: currentProject?.palette.secondary || '#3b82f6', bgColor: '#f8fafc', borderColor: '#94a3b8' },
    { id: 'definition', title: 'صندوق تعريف مصطلح (Definition Box)', fontFamily: currentProject?.fontPairing.bodyFont || 'Cairo', fontSize: 13, fontWeight: 'bold', color: '#0369a1', bgColor: '#f0f9ff', borderColor: '#0284c7' },
    { id: 'solved_example', title: 'صندوق مثال محلول (Solved Example)', fontFamily: currentProject?.fontPairing.bodyFont || 'Cairo', fontSize: 13, fontWeight: 'bold', color: '#15803d', bgColor: '#f0fdf4', borderColor: '#16a34a' },
    { id: 'important_note', title: 'صندوق ملاحظة امتحانية (Important Note)', fontFamily: currentProject?.fontPairing.bodyFont || 'Cairo', fontSize: 13, fontWeight: 'bold', color: '#b45309', bgColor: '#fffbeb', borderColor: '#f59e0b' },
    { id: 'question_block', title: 'صندوق سؤال وتمارين (Question Block)', fontFamily: currentProject?.fontPairing.bodyFont || 'Cairo', fontSize: 13, fontWeight: 'bold', color: '#4338ca', bgColor: '#e0e7ff', borderColor: '#6366f1' },
    { id: 'quote', title: 'صندوق حكمة واقتباس (Quote Box)', fontFamily: currentProject?.fontPairing.headingFont || 'Amiri', fontSize: 14, fontWeight: 'bold', color: '#7c3aed', bgColor: '#f5f3ff', borderColor: '#8b5cf6' }
  ]);

  const activeStyle = presets.find(p => p.id === activeStyleId) || presets[0];

  const handleUpdateActiveStyle = (updates: Partial<StylePreset>) => {
    setPresets(prev => prev.map(p => p.id === activeStyleId ? { ...p, ...updates } : p));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans select-none" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Type size={22} />
            </div>
            <div>
              <h2 className="text-base font-black text-white">مدير أنماط المناهج والنشر (Styles Inspector)</h2>
              <p className="text-xs text-slate-400 font-bold">تحديد التنسيق الموحد للعناوين، التعريفات، الأمثلة، والصناديق التعليمية</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Style List */}
          <div className="w-64 bg-slate-950 border-l border-slate-800 p-3 overflow-y-auto custom-scrollbar space-y-1.5 shrink-0">
            <span className="text-[10px] font-black text-slate-400 block px-2 mb-2">أنماط الكتاب المتاحة:</span>
            {presets.map(style => (
              <button
                key={style.id}
                onClick={() => setActiveStyleId(style.id)}
                className={`w-full text-right p-3 rounded-2xl transition-all text-xs font-bold flex items-center justify-between gap-2 ${
                  activeStyleId === style.id
                    ? 'bg-indigo-600 text-white shadow-lg font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="line-clamp-1">{style.title}</span>
                <div className="w-3 h-3 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: style.color }} />
              </button>
            ))}
          </div>

          {/* Right Editor & Live Preview */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            
            {/* Live Preview Box */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-300 block">معاينة النمط الحية في المنهج:</span>
              <div 
                className="p-5 rounded-2xl border-2 transition-all shadow-md space-y-1"
                style={{
                  backgroundColor: activeStyle.bgColor,
                  borderColor: activeStyle.borderColor,
                  color: activeStyle.color,
                  fontFamily: activeStyle.fontFamily
                }}
              >
                <h4 
                  style={{ 
                    fontSize: `${activeStyle.fontSize}px`, 
                    fontWeight: activeStyle.fontWeight 
                  }}
                >
                  {activeStyle.title}
                </h4>
                <p className="text-xs opacity-90 leading-relaxed font-normal">
                  هذا مربع توضيحي يمثل النمط المعتمد داخل كافة صفحات الكتاب المنهجي.
                </p>
              </div>
            </div>

            {/* Customization Form */}
            <div className="grid grid-cols-2 gap-4 text-xs font-bold bg-slate-950 p-4 rounded-2xl border border-slate-800">
              
              <div className="space-y-1">
                <label className="text-slate-400 block">خط النمط:</label>
                <select
                  value={activeStyle.fontFamily}
                  onChange={(e) => handleUpdateActiveStyle({ fontFamily: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                >
                  {FONT_LIBRARY.map(f => (
                    <option key={f.id} value={f.headingFont}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">حجم الخط (px):</label>
                <input
                  type="number"
                  value={activeStyle.fontSize}
                  onChange={(e) => handleUpdateActiveStyle({ fontSize: parseInt(e.target.value) || 14 })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">لون النص الرئيسية:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={activeStyle.color}
                    onChange={(e) => handleUpdateActiveStyle({ color: e.target.value })}
                    className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={activeStyle.color}
                    onChange={(e) => handleUpdateActiveStyle({ color: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">لون خلفية الصندوق:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={activeStyle.bgColor}
                    onChange={(e) => handleUpdateActiveStyle({ bgColor: e.target.value })}
                    className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={activeStyle.bgColor}
                    onChange={(e) => handleUpdateActiveStyle({ bgColor: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono focus:outline-none"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-bold">
          <span className="text-slate-400">تطبيق الأنماط يعيد توحيد الهوية البصرية لكافة العناصر في الكتاب</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg transition-all flex items-center gap-2 font-black"
          >
            <Check size={16} />
            <span>حفظ وتطبيق الأنماط</span>
          </button>
        </div>

      </div>
    </div>
  );
};
