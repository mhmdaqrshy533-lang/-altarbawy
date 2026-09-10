import React from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { DOCUMENT_TYPE_CONFIGS, SMART_COLOR_PALETTES, FONT_LIBRARY } from '../data';
import { 
  BookSubject, 
  EducationalStage, 
  PaperSize, 
  PageOrientation, 
  CoverStylePreset 
} from '../types';
import { 
  X, ChevronLeft, ChevronRight, Check, Sparkles, BookOpen, 
  Palette, Type, Layers, CheckCircle2, Shield, Globe, Layout 
} from 'lucide-react';

const STAGES: EducationalStage[] = [
  'الابتدائية', 
  'الإعدادية / المتوسطة', 
  'الثانوية العامة', 
  'التعليم الجامعي والمهني'
];

const GRADES_BY_STAGE: Record<EducationalStage, string[]> = {
  'الابتدائية': ['الصف الأول الابتدائي', 'الصف الثاني الابتدائي', 'الصف الثالث الابتدائي', 'الصف الرابع الابتدائي', 'الصف الخامس الابتدائي', 'الصف السادس الابتدائي'],
  'الإعدادية / المتوسطة': ['الصف السابع (الأول الإعدادي)', 'الصف الثامن (الثاني الإعدادي)', 'الصف التاسع (الثالث الإعدادي)'],
  'الثانوية العامة': ['الصف العاشر (الأول الثانوي)', 'الصف الحادي عشر (الثاني الثانوي)', 'الصف الثاني عشر (الثالث الثانوي)'],
  'التعليم الجامعي والمهني': ['السنة الأولى الجامعية', 'السنة الثانية الجامعية', 'السنة الثالثة الجامعية', 'السنة الرابعة الجامعية']
};

const SUBJECTS: BookSubject[] = [
  'الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'اللغة العربية', 
  'اللغة الإنجليزية', 'التربية الإسلامية', 'التاريخ', 'الجغرافيا', 
  'الحاسوب والتقانة', 'العلوم العامة', 'عام / مخصص'
];

const COVER_PRESETS: { id: CoverStylePreset; title: string; desc: string }[] = [
  { id: 'official', title: 'رسمي وزاري', desc: 'إطار رسمي معتمد للمناهج المدرسية والتعليمية' },
  { id: 'academic', title: 'أكاديمي جامعي', desc: 'تنسيق متزن ومناسب للكتب الأكاديمية والملازم العالية' },
  { id: 'modern', title: 'حديث وجذاب', desc: 'أشكال تصفح ملونة وعصرية تجذب الطلاب' },
  { id: 'minimal', title: 'بسيط وأنيق', desc: 'تصميم راقٍ يعتمد على التايبوجرافي الواضح' },
  { id: 'creative', title: 'إبداعي مبتكر', desc: 'زخارف هندسية وإيضاحات بصرية قوية' },
  { id: 'kids', title: 'للأطفال والناشئة', desc: 'ألوان حيوية ورسومات ودية للأساسيات' }
];

export const BookWizardModal: React.FC = () => {
  const { 
    activeView, 
    wizardStep, 
    wizardDraft, 
    setWizardStep, 
    updateWizardDraft, 
    finishWizardAndCreateProject, 
    setActiveView 
  } = useBookStudioStore();

  if (activeView !== 'wizard') return null;

  const handleNext = () => {
    if (wizardStep < 12) {
      setWizardStep(wizardStep + 1);
    } else {
      finishWizardAndCreateProject();
    }
  };

  const handlePrev = () => {
    if (wizardStep > 1) {
      setWizardStep(wizardStep - 1);
    } else {
      setActiveView('dashboard');
    }
  };

  const selectedStage = wizardDraft.stage || 'الثانوية العامة';
  const currentGrades = GRADES_BY_STAGE[selectedStage] || [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans select-none" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Step Indicator Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
              <Sparkles size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">معالج إعداد الكتاب المنهجي (الخطوة {wizardStep} من 12)</h3>
              <p className="text-xs font-bold text-slate-400">تخصيص كامل الهوية، المقاسات، وأنظمة التنسيق</p>
            </div>
          </div>

          <button 
            onClick={() => setActiveView('dashboard')}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-1.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-300"
            style={{ width: `${(wizardStep / 12) * 100}%` }}
          />
        </div>

        {/* Wizard Body Content */}
        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-5">
          
          {/* STEP 1: Document Type */}
          {wizardStep === 1 && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-white">1. اختر نوع المستند المراد تأليفه:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {DOCUMENT_TYPE_CONFIGS.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => updateWizardDraft({ documentType: doc.id, title: doc.title })}
                    className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between space-y-2 ${
                      wizardDraft.documentType === doc.id 
                        ? 'bg-indigo-950/80 border-indigo-500 ring-2 ring-indigo-500/30 text-white' 
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs font-black block">{doc.title}</span>
                    <span className="text-[10px] text-slate-400 block font-medium leading-tight">{doc.subtitle}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Subject */}
          {wizardStep === 2 && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-white">2. اختر المادة الدراسية المستهدفة:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SUBJECTS.map(subj => (
                  <button
                    key={subj}
                    onClick={() => updateWizardDraft({ subject: subj })}
                    className={`p-3 rounded-2xl border text-center font-bold text-xs transition-all ${
                      wizardDraft.subject === subj 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Stage */}
          {wizardStep === 3 && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-white">3. اختر المرحلة التعليمية:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {STAGES.map(st => (
                  <button
                    key={st}
                    onClick={() => updateWizardDraft({ stage: st, grade: GRADES_BY_STAGE[st][0] })}
                    className={`p-4 rounded-2xl border text-right font-black text-sm transition-all flex items-center justify-between ${
                      wizardDraft.stage === st 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{st}</span>
                    {wizardDraft.stage === st && <CheckCircle2 size={18} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Grade */}
          {wizardStep === 4 && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-white">4. حدد الصف الدراسي ({selectedStage}):</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentGrades.map(gr => (
                  <button
                    key={gr}
                    onClick={() => updateWizardDraft({ grade: gr })}
                    className={`p-3.5 rounded-2xl border text-right font-bold text-xs transition-all ${
                      wizardDraft.grade === gr 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {gr}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Semester */}
          {wizardStep === 5 && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-white">5. اختر الفصل الدراسي / الدورة:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['الفصل الأول', 'الفصل الثاني', 'الفصل الثالث', 'كامل العام'].map(sem => (
                  <button
                    key={sem}
                    onClick={() => updateWizardDraft({ semester: sem })}
                    className={`p-3.5 rounded-2xl border text-center font-bold text-xs transition-all ${
                      wizardDraft.semester === sem 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {sem}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: Language */}
          {wizardStep === 6 && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-white">6. اختر لغة الكتاب:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: 'العربية', title: 'اللغة العربية الكاملة', desc: 'مناسب لجميع المواد المنهجية العربية' },
                  { id: 'التقنية الإنجليزية', title: 'English Technical', desc: 'مناسب للغات والعلوم المترجمة' },
                  { id: 'ثنائي اللغة (عربي - إنجليزي)', title: 'ثنائي اللغة (Bilingual)', desc: 'شرح عربي مع رموز ومصطلحات لاتينية' }
                ].map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => updateWizardDraft({ language: lang.id as any })}
                    className={`p-4 rounded-2xl border text-right transition-all space-y-1 ${
                      wizardDraft.language === lang.id 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs font-black block">{lang.title}</span>
                    <span className="text-[10px] text-slate-300 opacity-80 block">{lang.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: Paper Size */}
          {wizardStep === 7 && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-white">7. اختر مقاس ورق الطباعة:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'A4', label: 'A4 القياسي (210 × 297 mm)', desc: 'الخيار الوزاري المعتمد' },
                  { id: 'A5', label: 'A5 كتيب (148 × 210 mm)', desc: 'مناسب للمذكرات والكتيبات' },
                  { id: 'Letter', label: 'Letter (216 × 279 mm)', desc: 'المقاس الأمريكي اللاتيني' },
                  { id: 'B5', label: 'B5 المنهجي (176 × 250 mm)', desc: 'مقاس الكتب الجامعية' }
                ].map(size => (
                  <button
                    key={size.id}
                    onClick={() => updateWizardDraft({ paperSize: size.id as PaperSize })}
                    className={`p-3.5 rounded-2xl border text-right transition-all space-y-1 ${
                      wizardDraft.paperSize === size.id 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs font-black block">{size.label}</span>
                    <span className="text-[10px] text-slate-400 block">{size.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 8: Page Orientation */}
          {wizardStep === 8 && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-white">8. حدد اتجاه الصفحات:</h4>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => updateWizardDraft({ orientation: 'portrait' })}
                  className={`p-5 rounded-2xl border text-center transition-all space-y-2 ${
                    wizardDraft.orientation === 'portrait' 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="w-12 h-16 bg-white/20 border-2 border-current rounded mx-auto" />
                  <span className="text-xs font-black block">عمودي (Portrait) — المعتمد للكتب</span>
                </button>

                <button
                  onClick={() => updateWizardDraft({ orientation: 'landscape' })}
                  className={`p-5 rounded-2xl border text-center transition-all space-y-2 ${
                    wizardDraft.orientation === 'landscape' 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="w-16 h-12 bg-white/20 border-2 border-current rounded mx-auto" />
                  <span className="text-xs font-black block">أفقي (Landscape) — للخرائط والمجلات</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 9: Cover Template Selection */}
          {wizardStep === 9 && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-white">9. اختر نمط تصميم الغلاف الرئيسي:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {COVER_PRESETS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => updateWizardDraft({
                      cover: {
                        ...(wizardDraft.cover || {} as any),
                        stylePreset: c.id
                      }
                    })}
                    className={`p-3.5 rounded-2xl border text-right transition-all space-y-1 ${
                      wizardDraft.cover?.stylePreset === c.id 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs font-black block">{c.title}</span>
                    <span className="text-[10px] text-slate-400 block leading-tight">{c.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 10: Color Palette Selection */}
          {wizardStep === 10 && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-white">10. نظام الألوان المتناسق (Palette):</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SMART_COLOR_PALETTES.map(p => (
                  <button
                    key={p.id}
                    onClick={() => updateWizardDraft({ palette: p })}
                    className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between ${
                      wizardDraft.palette?.id === p.id 
                        ? 'bg-slate-800 border-indigo-500 ring-2 ring-indigo-500/30' 
                        : 'bg-slate-950 border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black text-white block">{p.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: p.primary }} />
                      <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: p.secondary }} />
                      <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: p.accent }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 11: Font Pairing */}
          {wizardStep === 11 && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-white">11. مكتبة الخطوط العربية المعتمدة:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {FONT_LIBRARY.map(f => (
                  <button
                    key={f.id}
                    onClick={() => updateWizardDraft({ fontPairing: f })}
                    className={`p-3.5 rounded-2xl border text-right transition-all ${
                      wizardDraft.fontPairing?.id === f.id 
                        ? 'bg-indigo-950/80 border-indigo-500 ring-2 ring-indigo-500/30 text-white' 
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <span className="text-xs font-black block mb-1">{f.name}</span>
                    <span className="text-xs text-indigo-300 block font-bold" style={{ fontFamily: f.headingFont }}>
                      معاينة العنوان الرئيسي بخط {f.headingFont}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 12: Summary Review & Launch */}
          {wizardStep === 12 && (
            <div className="space-y-4 text-slate-200">
              <h4 className="text-base font-black text-white">12. ملخص مواصفات المشروع قبل الإنشاء:</h4>
              
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs font-bold">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">نوع المستند:</span>
                    <span className="text-indigo-400 font-black">{wizardDraft.title}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">المادة والمرحلة:</span>
                    <span className="text-white">{wizardDraft.subject} — {wizardDraft.stage}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">الصف والفصل:</span>
                    <span className="text-white">{wizardDraft.grade} ({wizardDraft.semester})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">مقاس الورق والاتجاه:</span>
                    <span className="text-white">{wizardDraft.paperSize} ({wizardDraft.orientation === 'portrait' ? 'عمودي' : 'أفقي'})</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span>نظام الألوان: <strong style={{ color: wizardDraft.palette?.primary }}>{wizardDraft.palette?.name}</strong></span>
                  <span>خط العناوين: <strong>{wizardDraft.fontPairing?.headingFont}</strong></span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Action Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <ChevronRight size={16} />
            <span>{wizardStep === 1 ? 'إلغاء' : 'السابق'}</span>
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
          >
            <span>{wizardStep === 12 ? 'إنشاء مشروع الكتاب الآن' : 'التالي'}</span>
            <ChevronLeft size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
