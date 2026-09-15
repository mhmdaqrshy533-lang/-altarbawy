import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Upload, 
  School, 
  Sparkles,
  Sliders,
  Image as ImageIcon
} from 'lucide-react';
import { ExamHeader, ExamTheme } from '../types/exam';

interface HeaderEditorModalProps {
  header: ExamHeader;
  theme: ExamTheme;
  isOpen: boolean;
  onClose: () => void;
  onSave: (header: ExamHeader, theme: ExamTheme) => void;
}

export const HeaderEditorModal: React.FC<HeaderEditorModalProps> = ({
  header,
  theme,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen) return null;

  const [formHeader, setFormHeader] = useState<ExamHeader>({ ...header });
  const [formTheme, setFormTheme] = useState<ExamTheme>({ ...theme });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormHeader({ ...formHeader, logoUrl: event.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(formHeader, formTheme);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto select-none" dir="rtl">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0d5c3a] to-slate-900 p-4 px-6 flex items-center justify-between border-b border-slate-700 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
              <School size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black">إعدادات الترويسة المدرسية والمعايير</h3>
              <p className="text-[11px] text-emerald-200/80">تخصيص بيانات وزارة التربية والمدرسة والمادة والخطوط</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
          
          {/* Logo Upload Box */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden">
                {formHeader.logoUrl ? (
                  <img src={formHeader.logoUrl} alt="شعار" className="max-w-full max-h-full object-contain" />
                ) : (
                  <ImageIcon size={24} className="text-slate-500" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">شعار المدرسة / الوزارة</h4>
                <p className="text-[10px] text-slate-400">يدعم PNG, JPG, SVG الشفاف</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold cursor-pointer transition flex items-center gap-1.5 border border-slate-700">
                <Upload size={14} />
                <span>رفع شعار جديد</span>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
              {formHeader.logoUrl && (
                <button
                  type="button"
                  onClick={() => setFormHeader({ ...formHeader, logoUrl: undefined })}
                  className="px-2 py-2 text-rose-400 hover:text-rose-300 text-xs font-bold"
                >
                  حذف
                </button>
              )}
            </div>
          </div>

          {/* Ministerial Directorate Lines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">الدولة / الترويسة العليا:</label>
              <input 
                type="text"
                value={formHeader.republicText}
                onChange={(e) => setFormHeader({ ...formHeader, republicText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">الوزارة:</label>
              <input 
                type="text"
                value={formHeader.ministryText}
                onChange={(e) => setFormHeader({ ...formHeader, ministryText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">مكتب التربية بالمحافظة:</label>
              <input 
                type="text"
                value={formHeader.officeText}
                onChange={(e) => setFormHeader({ ...formHeader, officeText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">إدارة التربية بالمديرية:</label>
              <input 
                type="text"
                value={formHeader.directorateText}
                onChange={(e) => setFormHeader({ ...formHeader, directorateText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
              />
            </div>
          </div>

          {/* School & Exam Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">اسم المدرسة:</label>
              <input 
                type="text"
                value={formHeader.schoolName}
                onChange={(e) => setFormHeader({ ...formHeader, schoolName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs font-bold text-emerald-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">عنوان الاختبار:</label>
              <input 
                type="text"
                value={formHeader.examTitle}
                onChange={(e) => setFormHeader({ ...formHeader, examTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs font-bold"
              />
            </div>
          </div>

          {/* Subject, Grade, Year & Duration */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">المادة الدراسية:</label>
              <input 
                type="text"
                value={formHeader.subject}
                onChange={(e) => setFormHeader({ ...formHeader, subject: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">الصف:</label>
              <input 
                type="text"
                value={formHeader.grade}
                onChange={(e) => setFormHeader({ ...formHeader, grade: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">الشعبة:</label>
              <input 
                type="text"
                value={formHeader.sectionName}
                onChange={(e) => setFormHeader({ ...formHeader, sectionName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">زمن الاختبار:</label>
              <input 
                type="text"
                value={formHeader.duration}
                onChange={(e) => setFormHeader({ ...formHeader, duration: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
              />
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">اسم معلم المادة (معد الاختبار):</label>
              <input 
                type="text"
                value={formHeader.teacherName}
                onChange={(e) => setFormHeader({ ...formHeader, teacherName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">اسم مدير المدرسة:</label>
              <input 
                type="text"
                value={formHeader.principalName}
                onChange={(e) => setFormHeader({ ...formHeader, principalName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
              />
            </div>
          </div>

          {/* Theme & Typography */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sliders size={14} className="text-emerald-400" />
              <span>خيارات الخطوط والتنسيق البصري:</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 text-[11px] mb-1">نوع الخط:</label>
                <select
                  value={formTheme.fontFamily}
                  onChange={(e) => setFormTheme({ ...formTheme, fontFamily: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white text-xs"
                >
                  <option value="cairo">Cairo (عصري قياسي)</option>
                  <option value="naskh">Noto Naskh (نسخ أكاديمي)</option>
                  <option value="amiri">Amiri (أميري مطبعي)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">حجم الخط والملاءمة:</label>
                <select
                  value={formTheme.fontSize}
                  onChange={(e) => setFormTheme({ ...formTheme, fontSize: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white text-xs"
                >
                  <option value="compact">مدمج (Compact - للأوراق المزدحمة)</option>
                  <option value="normal">طبيعي (Standard A4)</option>
                  <option value="large">مكبر (Large)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <label className="flex items-center gap-1.5 text-[11px] text-slate-300 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formTheme.showInstructions}
                    onChange={(e) => setFormTheme({ ...formTheme, showInstructions: e.target.checked })}
                    className="accent-emerald-500 rounded"
                  />
                  <span>صندوق تنبيهات التظليل</span>
                </label>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 p-4 px-6 border-t border-slate-800 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl transition shadow-lg flex items-center gap-1.5"
          >
            <Check size={16} />
            <span>حفظ الإعدادات</span>
          </button>
        </div>

      </div>
    </div>
  );
};
