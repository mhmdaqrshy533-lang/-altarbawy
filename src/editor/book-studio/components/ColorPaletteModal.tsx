import React, { useState } from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { ColorPalette } from '../types';
import { SMART_COLOR_PALETTES } from '../data';
import { 
  Palette, X, Check, Sparkles, RefreshCw, Layers 
} from 'lucide-react';

interface ColorPaletteModalProps {
  onClose: () => void;
}

export const ColorPaletteModal: React.FC<ColorPaletteModalProps> = ({ onClose }) => {
  const { currentProject, updateColorPalette } = useBookStudioStore();

  const [selectedPaletteId, setSelectedPaletteId] = useState<string>(currentProject?.palette.id || 'science_blue');
  const [customPalette, setCustomPalette] = useState<ColorPalette>(currentProject?.palette || SMART_COLOR_PALETTES[0]);

  if (!currentProject) return null;

  const handleSelectPreset = (p: ColorPalette) => {
    setSelectedPaletteId(p.id);
    setCustomPalette(p);
  };

  const handleApply = () => {
    updateColorPalette(customPalette);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans select-none" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Palette size={22} />
            </div>
            <div>
              <h2 className="text-base font-black text-white">مدير لوحات الألوان الهندسية (Color Schemes)</h2>
              <p className="text-xs text-slate-400 font-bold">تحديد اللوحة اللونية الموحدة وتطبيقها على كامل الغلاف والأوراق وصناديق الشرح</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          
          {/* Preset Palettes Grid */}
          <div className="space-y-3">
            <span className="text-xs font-black text-slate-300 block">لوحات الألوان الموصى بها حسب المادة:</span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SMART_COLOR_PALETTES.map(p => {
                const isSelected = selectedPaletteId === p.id;

                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectPreset(p)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-indigo-950/80 border-indigo-500 ring-2 ring-indigo-500/30 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-black block">{p.name}</span>
                      <div className="flex items-center gap-1.5 pt-1">
                        <div className="w-5 h-5 rounded-lg border border-white/20" style={{ backgroundColor: p.primary }} title="Primary" />
                        <div className="w-5 h-5 rounded-lg border border-white/20" style={{ backgroundColor: p.secondary }} title="Secondary" />
                        <div className="w-5 h-5 rounded-lg border border-white/20" style={{ backgroundColor: p.accent }} title="Accent" />
                        <div className="w-5 h-5 rounded-lg border border-white/20" style={{ backgroundColor: p.background }} title="Background" />
                      </div>
                    </div>

                    {isSelected && <Check size={18} className="text-emerald-400 shrink-0 font-black" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Color Customizer */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-black text-indigo-400 block">تخصيص قيم الألوان الدقيقة:</span>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-bold">
              <div className="space-y-1">
                <label className="text-slate-400 block">اللون الرئيسي (Primary):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customPalette.primary}
                    onChange={(e) => setCustomPalette({ ...customPalette, primary: e.target.value })}
                    className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={customPalette.primary}
                    onChange={(e) => setCustomPalette({ ...customPalette, primary: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2 py-1 text-slate-200 font-mono text-[11px] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">اللون الثانوي (Secondary):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customPalette.secondary}
                    onChange={(e) => setCustomPalette({ ...customPalette, secondary: e.target.value })}
                    className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={customPalette.secondary}
                    onChange={(e) => setCustomPalette({ ...customPalette, secondary: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2 py-1 text-slate-200 font-mono text-[11px] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">لون التمييز (Accent):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customPalette.accent}
                    onChange={(e) => setCustomPalette({ ...customPalette, accent: e.target.value })}
                    className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={customPalette.accent}
                    onChange={(e) => setCustomPalette({ ...customPalette, accent: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2 py-1 text-slate-200 font-mono text-[11px] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">لون خلفية الصفحات:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customPalette.background}
                    onChange={(e) => setCustomPalette({ ...customPalette, background: e.target.value })}
                    className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={customPalette.background}
                    onChange={(e) => setCustomPalette({ ...customPalette, background: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2 py-1 text-slate-200 font-mono text-[11px] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-bold">
          <span className="text-slate-400">تغيير الألوان يسري فوراً على كامل صفحات المستند</span>
          <button
            onClick={handleApply}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg transition-all flex items-center gap-2 font-black"
          >
            <Check size={16} />
            <span>تطبيق لوحة الألوان الحالية</span>
          </button>
        </div>

      </div>
    </div>
  );
};
