import React, { useState } from 'react';
import { X, Sparkles, FileText, School, User, Award, Clock, BookOpen, Layers } from 'lucide-react';
import { ExamMetadata } from '../types';

interface NewExamDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (metadata: Partial<ExamMetadata>, title: string) => void;
}

export const NewExamDialog: React.FC<NewExamDialogProps> = ({ isOpen, onClose, onCreate }) => {
  const [examTitle, setExamTitle] = useState('اختبار نهاية الفصل الدراسي الأول');
  const [subject, setSubject] = useState('الرياضيات');
  const [grade, setGrade] = useState('التاسع الأساسي');
  const [division, setDivision] = useState('أ');
  const [school, setSchool] = useState('مدرسة الرقيم النموذجية');
  const [governorate, setGovernorate] = useState('صنعاء');
  const [directorate, setDirectorate] = useState('السبعين');
  const [teacherName, setTeacherName] = useState('المهندس سهيل الهزبري');
  const [time, setTime] = useState('ساعتان');
  const [marks, setMarks] = useState('50');
  const [modelCode, setModelCode] = useState<'أ' | 'ب' | 'ج' | 'د'>('أ');
  const [templateType, setTemplateType] = useState<'ministerial' | 'automated' | 'private'>('ministerial');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const meta: Partial<ExamMetadata> = {
      examTitle,
      subject,
      grade,
      division,
      school,
      governorate,
      directorate,
      teacherName,
      time,
      marks,
      modelCode,
      templateType
    };
    onCreate(meta, `${examTitle} - ${subject}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans" dir="rtl">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-100 max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-inner">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">إنشاء مشروع امتحان جديد</h2>
              <p className="text-xs font-semibold text-blue-100 mt-0.5">قم بتعبئة البيانات الأساسية للترويسة وفتح بيئة التصميم فوراً</p>
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose} 
            className="p-2 hover:bg-white/20 rounded-2xl text-blue-100 hover:text-white transition-all relative z-10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          {/* Main Title & Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-extrabold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <FileText size={15} className="text-indigo-600" />
                عنوان الاختبار
              </label>
              <input 
                type="text" 
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                placeholder="مثال: اختبار نهاية الفصل الدراسي الأول"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <BookOpen size={15} className="text-indigo-600" />
                المادة الدراسية
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
              >
                <option value="الرياضيات">الرياضيات</option>
                <option value="الفيزياء">الفيزياء</option>
                <option value="العلوم">العلوم العامة</option>
                <option value="الكيمياء">الكيمياء</option>
                <option value="الأحياء">الأحياء</option>
                <option value="اللغة العربية">اللغة العربية</option>
                <option value="اللغة الإنجليزية">اللغة الإنجليزية</option>
                <option value="التربية الإسلامية">التربية الإسلامية</option>
                <option value="القرآن الكريم">القرآن الكريم والعلوم الشرعية</option>
                <option value="الاجتماعيات">الاجتماعيات (تاريخ - جغرافيا - وطنية)</option>
                <option value="الحاسوب وتكنولوجيا المعلومات">الحاسوب وتكنولوجيا المعلومات</option>
              </select>
            </div>
          </div>

          {/* Grade & School & Division */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-extrabold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Award size={15} className="text-indigo-600" />
                الصف الدراسي
              </label>
              <input 
                type="text" 
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                placeholder="التاسع الأساسي / الثالث الثانوي"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <School size={15} className="text-indigo-600" />
                المدرسة / المؤسسة
              </label>
              <input 
                type="text" 
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <User size={15} className="text-indigo-600" />
                الشعبة / المجموعة
              </label>
              <input 
                type="text" 
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                placeholder="أ ، ب ، ج"
              />
            </div>
          </div>

          {/* Governorate & Directorate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-extrabold text-slate-700 mb-1.5">المحافظة</label>
              <input 
                type="text" 
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 mb-1.5">المديرية</label>
              <input 
                type="text" 
                value={directorate}
                onChange={(e) => setDirectorate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
          </div>

          {/* Teacher & Time & Total Marks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-extrabold text-slate-700 mb-1.5">اسم معلم المادة</label>
              <input 
                type="text" 
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 mb-1.5 flex items-center gap-1">
                <Clock size={14} className="text-indigo-600" />
                زمن الاختبار
              </label>
              <input 
                type="text" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 mb-1.5">الدرجة الكلية</label>
              <input 
                type="text" 
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
          </div>

          {/* Model & Template Style */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-slate-800">
              <Layers size={16} className="text-indigo-600" />
              اختيار القالب ورمز النموذج
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 mb-1 block">قالب الامتحان</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTemplateType('ministerial')}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                      templateType === 'ministerial' 
                        ? 'bg-blue-600 text-white border-blue-700 shadow-sm' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    وزاري يمني
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemplateType('automated')}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                      templateType === 'automated' 
                        ? 'bg-purple-600 text-white border-purple-700 shadow-sm' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    أتمتة OMR
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemplateType('private')}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                      templateType === 'private' 
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    مدارس خاصة
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 mb-1 block">رمز النموذج</label>
                <div className="flex gap-2">
                  {(['أ', 'ب', 'ج', 'د'] as const).map(code => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setModelCode(code)}
                      className={`flex-1 py-2 rounded-xl text-xs font-black border transition-all ${
                        modelCode === code 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ({code})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit buttons */}
          <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>بدء تصميم ورقة الامتحان</span>
              <span>🚀</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
