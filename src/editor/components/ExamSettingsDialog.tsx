import React, { useState, useEffect } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { X, Award, MapPin, BookOpen, Clock, Palette, Check, Globe, Sliders } from 'lucide-react';
import { ExamMetadata } from '../types';
import { EducationStandardsEngine } from '../../core/standards/EducationStandardsEngine';
import { DocumentStandardProfile } from '../../core/standards/EducationStandardsTypes';

export const ExamSettingsDialog = ({ onClose }: { onClose: () => void }) => {
  const { document, updateMetadata } = useEditorStore();
  const metadata = document.metadata;

  // Integrate Standards Engine
  const [activeProfile, setActiveProfile] = useState<DocumentStandardProfile>(() => 
    EducationStandardsEngine.getActiveProfile()
  );
  const availableCountries = EducationStandardsEngine.getAllCountries();

  const handleApplyCountryProfile = (countryId: string) => {
    const newProfile = EducationStandardsEngine.createDefaultProfile(countryId, 'exam_term_final');
    EducationStandardsEngine.setActiveProfile(newProfile);
    setActiveProfile(newProfile);

    // Synchronize to current document metadata immediately
    updateMetadata({
      country: newProfile.authority.countryName,
      ministry: newProfile.authority.ministry,
      governorate: newProfile.authority.governorateOrRegion,
      directorate: newProfile.authority.directorate,
      school: newProfile.authority.schoolName,
      stage: newProfile.authority.schoolStage,
      academicYear: newProfile.authority.academicYear,
      semester: newProfile.authority.termName,
    });
  };

  // Local states to track stage and class for dynamic filtering
  const [selectedStage, setSelectedStage] = useState<string>(metadata.stage || 'الأساسي');
  const [selectedGrade, setSelectedGrade] = useState<string>(metadata.grade || 'التاسع الأساسي');

  const GOVERNORATES = [
    'أمانة العاصمة', 'صنعاء', 'عدن', 'تعز', 'إب', 'الحديدة', 'ذمار', 
    'حضرموت', 'لحج', 'أبين', 'البيضاء', 'شبوة', 'مأرب', 'الجوف', 
    'المهرة', 'سقطرى', 'حجة', 'صعدة', 'عمران', 'المحويت', 'ريمة'
  ];

  const DIRECTORATES = [
    'السبعين', 'معين', 'الوحدة', 'صنعاء القديمة', 'شعوب', 'الثورة', 'الصافية',
    'المنصورة', 'الشيخ عثمان', 'صالة', 'المظفر', 'السياني', 'المكلا'
  ];

  const STAGES = ['الأساسي', 'الثانوي'];

  const GRADES_BY_STAGE: Record<string, string[]> = {
    'الأساسي': [
      'الأول الأساسي', 'الثاني الأساسي', 'الثالث الأساسي', 
      'الرابع الأساسي', 'الخامس الأساسي', 'السادس الأساسي', 
      'السابع الأساسي', 'الثامن الأساسي', 'التاسع الأساسي'
    ],
    'الثانوي': [
      'الأول الثانوي', 'الثاني الثانوي', 'الثالث الثانوي'
    ]
  };

  const getSubjectsForGrade = (grade: string) => {
    if (grade.includes('الأول') || grade.includes('الثاني') || grade.includes('الثالث')) {
      if (grade.includes('الثانوي')) {
        return ['القرآن الكريم', 'التربية الإسلامية', 'اللغة العربية', 'الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'اللغة الإنجليزية', 'التاريخ', 'الجغرافيا', 'المجتمع'];
      }
      return ['القرآن الكريم', 'التربية الإسلامية', 'اللغة العربية', 'الرياضيات', 'العلوم'];
    }
    // High elementary basic grades 4-9
    return ['القرآن الكريم', 'التربية الإسلامية', 'اللغة العربية', 'الرياضيات', 'العلوم', 'الاجتماعيات', 'اللغة الإنجليزية'];
  };

  const DIVISIONS = ['أ', 'ب', 'ج', 'د', 'هـ', '1', '2', '3'];
  const SEMESTERS = ['الفصل الدراسي الأول', 'الفصل الدراسي الثاني', 'امتحان الدور الثاني'];
  const ROUNDS = ['الدور الأول', 'الدور الثاني', 'الدور الاستثنائي'];
  const ACADEMIC_YEARS = ['2024/2025م', '2025/2026م', '2026/2027م'];
  const TIMES = ['45 دقيقة', 'ساعة واحدة', 'ساعة ونصف', 'ساعتان', 'ثلاث ساعات'];
  const MARKS_OPTIONS = ['10', '15', '20', '30', '40', '50', '60', '80', '100'];
  const EXAM_TYPES = ['شهري', 'نصف فصلي', 'نهائي فصلي', 'تجريبي / وزاري'];

  const handleChange = (field: keyof ExamMetadata, value: string) => {
    updateMetadata({ [field]: value });
  };

  // Synchronize dynamic grade and stage selections
  const handleStageChange = (stage: string) => {
    setSelectedStage(stage);
    handleChange('stage', stage);
    
    // Auto-select first grade in that stage
    const defaultGrade = GRADES_BY_STAGE[stage][0];
    setSelectedGrade(defaultGrade);
    handleChange('grade', defaultGrade);

    // Auto-select first subject candidate
    const firstSubject = getSubjectsForGrade(defaultGrade)[0];
    handleChange('subject', firstSubject);
  };

  const handleGradeChange = (grade: string) => {
    setSelectedGrade(grade);
    handleChange('grade', grade);

    // Auto-select first subject candidate
    const candidates = getSubjectsForGrade(grade);
    handleChange('subject', candidates[0]);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans overflow-y-auto" dir="rtl">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] border border-slate-100">
        
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Award size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">بيانات وتنسيق ورقة الامتحان</h2>
              <p className="text-xs font-semibold text-slate-400">تحكم ببيانات الترويسة الرسمية والدرجات</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body - Card-based Layout */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 flex-1 bg-slate-50/30">
          
          {/* Standards Profile Engine Selection */}
          <div className="bg-sky-50/60 border border-sky-200/80 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#004B6E] font-black text-sm">
                <Globe size={18} />
                <span>المعيار التعليمي العربي المعتمد للورقة</span>
              </div>
              <span className="text-[10px] font-bold bg-[#004B6E] text-white px-2.5 py-0.5 rounded-full">
                {activeProfile.authority.countryName}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-600">
              اختر الدولة لتطبيق الترويسة ومسميات الهيكل الإداري ونظام التقييم فوراً:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {availableCountries.map((c) => {
                const isSelected = activeProfile.authority.countryId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleApplyCountryProfile(c.id)}
                    className={`p-2.5 rounded-xl border text-right transition-all flex items-center gap-2 text-xs font-black ${
                      isSelected 
                        ? 'border-[#004B6E] bg-white text-[#004B6E] shadow-xs' 
                        : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700'
                    }`}
                  >
                    <span className="text-base select-none">{c.flagEmoji}</span>
                    <span className="truncate">{c.name}</span>
                    {isSelected && <Check size={14} className="mr-auto text-[#004B6E]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 1: Geographic & Administration */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-sm border-b border-slate-100 pb-2 mb-1">
              <MapPin size={18} />
              <span>البيانات الإدارية والجغرافية</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">المحافظة</label>
                <select 
                  value={metadata.governorate} 
                  onChange={(e) => handleChange('governorate', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <option value="">اختر المحافظة...</option>
                  {GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">الإدارة التعليمية (المديرية)</label>
                <select 
                  value={metadata.directorate} 
                  onChange={(e) => handleChange('directorate', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <option value="">اختر المديرية...</option>
                  {DIRECTORATES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-black text-slate-500">اسم المدرسة (قابل للتحرير)</label>
                <input 
                  type="text"
                  placeholder="اكتب اسم المدرسة هنا"
                  value={metadata.school} 
                  onChange={(e) => handleChange('school', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Academic details */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-sm border-b border-slate-100 pb-2 mb-1">
              <BookOpen size={18} />
              <span>بيانات الصف والمرحلة والمادة</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">المرحلة الدراسية</label>
                <select 
                  value={selectedStage} 
                  onChange={(e) => handleStageChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">الصف الدراسي</label>
                <select 
                  value={selectedGrade} 
                  onChange={(e) => handleGradeChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {(GRADES_BY_STAGE[selectedStage] || []).map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">المادة (مُرشحة تلقائياً)</label>
                <select 
                  value={metadata.subject} 
                  onChange={(e) => handleChange('subject', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {getSubjectsForGrade(selectedGrade).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">الشعبة</label>
                <select 
                  value={metadata.division} 
                  onChange={(e) => handleChange('division', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <option value="">اختر الشعبة...</option>
                  {DIVISIONS.map(div => <option key={div} value={div}>{div}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Card 3: Exam properties & Teacher Sign-off */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-sm border-b border-slate-100 pb-2 mb-1">
              <Clock size={18} />
              <span>تفاصيل الاختبار والتوثيق</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">نوع الاختبار</label>
                <select 
                  value={metadata.examType} 
                  onChange={(e) => handleChange('examType', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {EXAM_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">الفصل الدراسي</label>
                <select 
                  value={metadata.semester} 
                  onChange={(e) => handleChange('semester', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {SEMESTERS.map(sem => <option key={sem} value={sem}>{sem}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">الدور</label>
                <select 
                  value={metadata.round} 
                  onChange={(e) => handleChange('round', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {ROUNDS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">العام الدراسي</label>
                <select 
                  value={metadata.academicYear} 
                  onChange={(e) => handleChange('academicYear', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {ACADEMIC_YEARS.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">زمن الاختبار</label>
                <select 
                  value={metadata.time} 
                  onChange={(e) => handleChange('time', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">الدرجة الكلية</label>
                <select 
                  value={metadata.marks} 
                  onChange={(e) => handleChange('marks', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {MARKS_OPTIONS.map(m => <option key={m} value={m}>{m} درجات</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">رمز نموذج الأتمتة ( Key Version )</label>
                <select 
                  value={metadata.modelCode || 'أ'} 
                  onChange={(e) => handleChange('modelCode', e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <option value="أ">نموذج أسئلة ( أ )</option>
                  <option value="ب">نموذج أسئلة ( ب )</option>
                  <option value="ج">نموذج أسئلة ( ج )</option>
                  <option value="د">نموذج أسئلة ( د )</option>
                </select>
              </div>

              <div className="space-y-1 md:col-span-3">
                <label className="text-xs font-black text-slate-500 font-sans">عنوان الاختبار التفصيلي</label>
                <input 
                  type="text"
                  placeholder="مثال: اختبار نهاية شهر محرم"
                  value={metadata.examTitle} 
                  onChange={(e) => handleChange('examTitle', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="space-y-1 md:col-span-3">
                <label className="text-xs font-black text-slate-500 font-sans">اسم المعلم المعد (قابل للتحرير)</label>
                <input 
                  type="text"
                  placeholder="اكتب اسم المعلم للتوقيع"
                  value={metadata.teacherName} 
                  onChange={(e) => handleChange('teacherName', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Card 4: Template Customization and Design Presets */}
          {metadata.templateType === 'ministerial' && (
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-5 animate-fadeIn">
              <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-sm border-b border-slate-100 pb-2 mb-1">
                <Palette size={18} />
                <span>لوحة التنسيق الفني وتخصيص الألوان (القالب الوزاري)</span>
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 block">اختر طابع الألوان والسمة العامة للورقة:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {Object.entries({
                    classic: { name: 'الكلاسيكي الكربوني (الأسود الرسمي)', desc: 'أسود كربوني رسمي تقليدي عالي التباين', colors: ['bg-slate-900', 'bg-slate-100', 'bg-rose-600'] },
                    luxury_blue: { name: 'الكحلي الإمبراطوري الفاخر', desc: 'مزيج الكحلي الفاخر مع تطعيمات ذهبية ملكية', colors: ['bg-blue-900', 'bg-blue-100', 'bg-amber-500'] },
                    emerald_green: { name: 'الزمردي الجمهوري التعليمي', desc: 'طابع أخضر رسمي مع تدرجات عشبية متوازنة', colors: ['bg-emerald-900', 'bg-emerald-100', 'bg-red-600'] },
                    royal_crimson: { name: 'العنابي السلطاني المهيب', desc: 'نبرة عنابية مهيبة تعكس الفخامة والأناقة', colors: ['bg-rose-950', 'bg-rose-100', 'bg-rose-600'] },
                    imperial_purple: { name: 'الأرجواني الأكاديمي الموقر', desc: 'بنفسجي ملكي هادئ يمنح الورقة طابعاً متطوراً', colors: ['bg-violet-950', 'bg-violet-100', 'bg-fuchsia-600'] },
                    noble_gold: { name: 'الذهبي العسلي البرونزي', desc: 'تدرج ترابي دافئ مريح للعين أثناء الكتابة والحل', colors: ['bg-amber-950', 'bg-amber-100', 'bg-amber-600'] }
                  }).map(([key, data]) => {
                    const isSelected = (metadata.themePreset || 'classic') === key;
                    return (
                      <div 
                        key={key}
                        onClick={() => handleChange('themePreset', key as any)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col gap-2 relative hover:shadow-md ${
                          isSelected 
                            ? 'border-indigo-600 bg-indigo-50/25 shadow-sm scale-[1.01]' 
                            : 'border-slate-100 bg-slate-50/30 hover:border-indigo-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-800">{data.name}</span>
                          <div className="flex gap-1">
                            {data.colors.map((c, i) => (
                              <span key={i} className={`w-3.5 h-3.5 rounded-full ${c} border border-white shadow-sm`}></span>
                            ))}
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">{data.desc}</p>
                        {isSelected && (
                          <div className="absolute left-3 top-3 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-md">
                            <Check size={12} className="stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Advanced Border Tweaks */}
              <div className="border-t border-slate-100 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500">طريقة رسم خط الإطار والحدود</label>
                  <select 
                    value={metadata.themeBorderStyle || 'double'} 
                    onChange={(e) => handleChange('themeBorderStyle', e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                  >
                    <option value="double">إطار وزاري مزدوج (Double Line)</option>
                    <option value="solid">إطار مصمت عريض (Solid Line)</option>
                    <option value="dashed">إطار منقط متقطع (Dashed Line)</option>
                    <option value="groove">إطار مجوف ثلاثي الأبعاد (Groove Line)</option>
                    <option value="ridge">إطار بارز كلاسيكي مضلع (Ridge Line)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500">سُمْك الحدود والإطار الخارجي</label>
                  <select 
                    value={metadata.themeBorderWidth || 'border-[6px]'} 
                    onChange={(e) => handleChange('themeBorderWidth', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                  >
                    <option value="border-2">رفيع وأنيق (2 بكسل)</option>
                    <option value="border-4">رسمي متوازن (4 بكسل)</option>
                    <option value="border-[6px]">عريض فخم ومميز (6 بكسل)</option>
                    <option value="border-[8px]">مهيب وسميك جداً (8 بكسل)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Action Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3.5 rounded-2xl font-black shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 transition-all text-sm"
          >
            حفظ البيانات ومزامنة الورقة
          </button>
        </div>
      </div>
    </div>
  );
};
