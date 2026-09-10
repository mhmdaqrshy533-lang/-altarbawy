import React, { useState } from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { CoverSettings, ColorPalette, BookSubject, EducationalStage } from '../types';
import { SMART_COLOR_PALETTES, FONT_LIBRARY } from '../data';
import { 
  Sparkles, X, Wand2, Shield, CheckCircle2, RefreshCw, 
  BookOpen, Palette, Layout, Award, Dna, FlaskConical, Sigma 
} from 'lucide-react';

interface AiCoverGeneratorModalProps {
  onClose: () => void;
}

interface CoverSuggestion {
  id: string;
  name: string;
  description: string;
  cover: CoverSettings;
  palette: ColorPalette;
}

export const AiCoverGeneratorModal: React.FC<AiCoverGeneratorModalProps> = ({ onClose }) => {
  const { currentProject, updateCoverSettings, updateColorPalette } = useBookStudioStore();

  const [subject, setSubject] = useState<BookSubject>(currentProject?.subject || 'الرياضيات');
  const [stage, setStage] = useState<EducationalStage>(currentProject?.stage || 'الثانوية العامة');
  const [grade, setGrade] = useState(currentProject?.grade || 'الصف الثالث الثانوي');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<string>('preset_1');

  if (!currentProject) return null;

  // Generate 4 AI Cover Design Mockups based on subject and stage
  const generateSuggestions = (): CoverSuggestion[] => {
    const isMathOrPhysics = subject === 'الرياضيات' || subject === 'الفيزياء';
    const isIslamicOrArabic = subject === 'التربية الإسلامية' || subject === 'اللغة العربية';
    const isChemistryOrBio = subject === 'الكيمياء' || subject === 'الأحياء' || subject === 'العلوم العامة';

    return [
      {
        id: 'preset_1',
        name: 'التصميم المنهجي الرصين (Ministerial Academic)',
        description: 'إطار منهجي كلاسيكي موثوق يناسب المناهج والكتب المدرسية المعتمدة.',
        palette: isIslamicOrArabic ? SMART_COLOR_PALETTES[1] : isMathOrPhysics ? SMART_COLOR_PALETTES[2] : SMART_COLOR_PALETTES[0],
        cover: {
          stylePreset: 'official',
          mainTitle: currentProject.title,
          subtitle: `${stage} — ${grade}`,
          authorName: currentProject.cover.authorName || 'إعداد نخبة من الموجهين والأساتذة',
          reviewerName: currentProject.cover.reviewerName || 'إشراف لجنة المناهج التعليمية',
          publisherName: 'منصة الرقيم للنشر المنهجي',
          editionNumber: 'الطبعة المعتمدة (1448 هـ / 2026 م)',
          publicationYear: '2026 م',
          isbnNumber: '978-9953-0-8812-4',
          qrCodeUrl: 'https://raqeem.edu/ver/book1',
          showLogo: true,
          heroGraphicType: isMathOrPhysics ? 'formula' : isChemistryOrBio ? 'flask' : 'calligraphy',
          accentColor: isIslamicOrArabic ? '#065f46' : isMathOrPhysics ? '#c2410c' : '#1e40af',
          backgroundColor: '#f8fafc',
          titleColor: '#0f172a',
          hasDecorativeBorder: true,
          borderStyle: 'islamic_frame'
        }
      },
      {
        id: 'preset_2',
        name: 'العصر المعرفي التفاعلي (Modern Scientific)',
        description: 'توزيع عصري جريء يبرز العناوين بوضوح مع خلفية تدرج ناعمة وأشكال هندسية.',
        palette: SMART_COLOR_PALETTES[0], // Science Blue
        cover: {
          stylePreset: 'science',
          mainTitle: currentProject.title,
          subtitle: `دليل التفوق الشامل — ${grade}`,
          authorName: currentProject.cover.authorName || 'المؤلف القومية للمناهج',
          reviewerName: 'تدقيق واعتماد خبراء التوجيه التربوي',
          publisherName: 'دار الرقيم الحديثة للطباعة',
          editionNumber: 'طبعة المناهج المحدثة 2026',
          publicationYear: '2026 م',
          isbnNumber: '978-9953-0-9901-2',
          qrCodeUrl: 'https://raqeem.edu/ver/book2',
          showLogo: true,
          heroGraphicType: 'circuit',
          accentColor: '#2563eb',
          backgroundColor: '#eff6ff',
          titleColor: '#1e3a8a',
          hasDecorativeBorder: false,
          borderStyle: 'modern_grid'
        }
      },
      {
        id: 'preset_3',
        name: 'الطراز الأصيل والزخرفي (Heritage Gold)',
        description: 'زخارف إسلامية ذهبية ونصوص عربية أنيقة ملائمة لمناهج اللغة العربية والدين والتاريخ.',
        palette: SMART_COLOR_PALETTES[4], // History Brown / Gold
        cover: {
          stylePreset: 'islamic',
          mainTitle: currentProject.title,
          subtitle: `كتاب مقرر ومدقق لطلاب ${grade}`,
          authorName: currentProject.cover.authorName || 'لجنة التأليف العلمي والتربوي',
          reviewerName: 'مراجعة قسم المناهج والتدقيق',
          publisherName: 'منصة الرقيم للنشر المنهجي',
          editionNumber: 'الطبعة الذهبيه المعتمدة',
          publicationYear: '2026 م',
          isbnNumber: '978-9953-0-7711-0',
          qrCodeUrl: 'https://raqeem.edu/ver/book3',
          showLogo: true,
          heroGraphicType: 'calligraphy',
          accentColor: '#b45309',
          backgroundColor: '#fef3c7',
          titleColor: '#451a03',
          hasDecorativeBorder: true,
          borderStyle: 'islamic_frame'
        }
      },
      {
        id: 'preset_4',
        name: 'التصميم المينيمال العصري (Minimalist Clean)',
        description: 'تنسيق أنيق يعتمد على المساحات البيضاء السخية والتايبوجرافي الدقيق.',
        palette: SMART_COLOR_PALETTES[6], // Executive Slate
        cover: {
          stylePreset: 'minimal',
          mainTitle: currentProject.title,
          subtitle: `حقيبة المنهج الدراسي — ${stage}`,
          authorName: currentProject.cover.authorName || 'استوديو النشر المنهجي',
          reviewerName: 'إشراف إدارة المناهج والكتب',
          publisherName: 'الرقيم ديجيتال DTP',
          editionNumber: 'إصدار رقمي ومطبوع 2026',
          publicationYear: '2026 م',
          isbnNumber: '978-9953-0-5522-8',
          qrCodeUrl: 'https://raqeem.edu/ver/book4',
          showLogo: true,
          heroGraphicType: 'abstract',
          accentColor: '#0f172a',
          backgroundColor: '#ffffff',
          titleColor: '#0f172a',
          hasDecorativeBorder: true,
          borderStyle: 'minimal_bar'
        }
      }
    ];
  };

  const suggestions = generateSuggestions();

  const handleApplyCover = (sug: CoverSuggestion) => {
    updateCoverSettings(sug.cover);
    updateColorPalette(sug.palette);
    onClose();
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans select-none" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Sparkles size={22} />
            </div>
            <div>
              <h2 className="text-base font-black text-white">مولد الأغلفة الذكي المنهجي (AI Cover Studio)</h2>
              <p className="text-xs text-slate-400 font-bold">يقترح تصاميم أغلفة وألوان مخصصة بناءً على المادة والمرحلة والصف الدراسية</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Form Criteria Controls */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-bold">
          
          <div className="space-y-1">
            <label className="text-slate-400 block font-bold">المادة الدراسية:</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value as BookSubject)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-bold"
            >
              {['الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'اللغة العربية', 'اللغة الإنجليزية', 'التربية الإسلامية', 'التاريخ', 'الجغرافيا', 'الحاسوب والتقانة', 'عام / مخصص'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 block font-bold">المرحلة التعليمية:</label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as EducationalStage)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-bold"
            >
              {['الابتدائية', 'الإعدادية / المتوسطة', 'الثانوية العامة', 'التعليم الجامعي والمهني'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 block font-bold">الصف / المستوى:</label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-bold"
              placeholder="مثال: الصف الثالث الثانوي"
            />
          </div>

        </div>

        {/* Generated Cards Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
          
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-black text-slate-300">
              الاقتراحات المولدة ذكياً ({suggestions.length} نماذج أغلفة معتمدة):
            </span>

            <button
              onClick={handleRegenerate}
              disabled={isGenerating}
              className="px-3 py-1.5 bg-indigo-950 text-indigo-300 border border-indigo-800 hover:bg-indigo-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={14} className={isGenerating ? 'animate-spin' : ''} />
              <span>إعادة توليد المقترحات</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((sug) => {
              const isSelected = selectedSuggestionId === sug.id;

              return (
                <div
                  key={sug.id}
                  onClick={() => setSelectedSuggestionId(sug.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                    isSelected
                      ? 'bg-indigo-950/80 border-indigo-500 ring-2 ring-indigo-500/40 shadow-xl'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-white flex items-center gap-2">
                        {sug.name}
                        {isSelected && <CheckCircle2 size={16} className="text-emerald-400" />}
                      </h4>
                      <p className="text-xs text-slate-400 font-bold leading-relaxed">{sug.description}</p>
                    </div>

                    {/* Palette Color Swatch Preview */}
                    <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 shrink-0">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: sug.palette.primary }} title="Primary" />
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: sug.palette.secondary }} title="Secondary" />
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: sug.palette.accent }} title="Accent" />
                    </div>
                  </div>

                  {/* Mini Cover Graphic Preview */}
                  <div 
                    className="w-full h-44 rounded-2xl border p-4 flex flex-col justify-between items-center text-center shadow-inner relative overflow-hidden"
                    style={{ 
                      backgroundColor: sug.cover.backgroundColor,
                      borderColor: sug.cover.accentColor 
                    }}
                  >
                    <div className="w-full flex items-center justify-between text-[10px] font-black text-slate-600">
                      <span>{currentProject.metadata.governorate}</span>
                      <Shield size={16} style={{ color: sug.cover.accentColor }} />
                      <span>{subject}</span>
                    </div>

                    <div className="my-auto space-y-1">
                      <h5 className="text-base font-black" style={{ color: sug.cover.titleColor }}>
                        {sug.cover.mainTitle}
                      </h5>
                      <span className="text-[10px] font-bold text-slate-500 block">
                        {sug.cover.subtitle}
                      </span>
                    </div>

                    <div className="w-full flex items-center justify-between text-[9px] font-bold text-slate-500 border-t pt-2" style={{ borderColor: `${sug.cover.accentColor}30` }}>
                      <span>{sug.cover.authorName}</span>
                      <span>{sug.cover.editionNumber}</span>
                    </div>
                  </div>

                  {/* Action Apply Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyCover(sug);
                    }}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Wand2 size={14} />
                    <span>تطبيق هذا الغلاف والألوان على الكتاب</span>
                  </button>
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400">
          <span>يتم تحديث جميع بيانات الغلاف والألوان تلقائياً في استوديو الكتاب عند الحفظ</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
          >
            إغلاق المولد
          </button>
        </div>

      </div>
    </div>
  );
};
