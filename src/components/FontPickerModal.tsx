import React, { useState, useEffect } from 'react';
import { ALL_FONTS, ARABIC_FONTS, ENGLISH_FONTS, FontItem, DOCUMENT_DEFAULT_FONTS } from '../data/fontsData';
import { fontManager } from '../services/fontManager';
import { 
  X, Search, Type, Sparkles, Check, Download, 
  AlignRight, AlignCenter, AlignLeft, AlignJustify,
  Sliders, Globe, BookOpen, FileText, Award, Shield, CheckCircle2, RefreshCw
} from 'lucide-react';

export interface TypographyStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number | string;
  color?: string;
  lineHeight?: number;
  letterSpacing?: number;
  wordSpacing?: number;
  textAlign?: 'right' | 'center' | 'left' | 'justify';
  direction?: 'rtl' | 'ltr';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textStrokeWidth?: number;
  textStrokeColor?: string;
  textShadow?: string;
  opacity?: number;
}

interface FontPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStyle?: TypographyStyle;
  onApplyStyle?: (style: TypographyStyle) => void;
  title?: string;
  documentType?: 'exam' | 'book' | 'certificate' | 'report' | 'official_letter' | 'cover';
}

export const FontPickerModal: React.FC<FontPickerModalProps> = ({
  isOpen,
  onClose,
  currentStyle = {},
  onApplyStyle,
  title = "مكتبة ومدير الخطوط الاحترافية الشاملة",
  documentType
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLangTab, setActiveLangTab] = useState<'all' | 'ar' | 'en' | 'document_presets'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [customPreviewText, setCustomPreviewText] = useState('مدرسة الرقيم النموذجية — بسم الله الرحمن الرحيم');
  
  // Advanced Typography Controls State
  const [styleState, setStyleState] = useState<TypographyStyle>({
    fontFamily: currentStyle.fontFamily || "'Cairo', sans-serif",
    fontSize: currentStyle.fontSize || 16,
    fontWeight: currentStyle.fontWeight || 600,
    color: currentStyle.color || '#0f172a',
    lineHeight: currentStyle.lineHeight || 1.5,
    letterSpacing: currentStyle.letterSpacing || 0,
    wordSpacing: currentStyle.wordSpacing || 0,
    textAlign: currentStyle.textAlign || 'right',
    direction: currentStyle.direction || 'rtl',
    textTransform: currentStyle.textTransform || 'none',
    textStrokeWidth: currentStyle.textStrokeWidth || 0,
    textStrokeColor: currentStyle.textStrokeColor || '#000000',
    textShadow: currentStyle.textShadow || 'none',
    opacity: currentStyle.opacity !== undefined ? currentStyle.opacity : 100,
  });

  const [activeTabSection, setActiveTabSection] = useState<'font_library' | 'advanced_tuning'>('font_library');
  const [isDownloadingOffline, setIsDownloadingOffline] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({ loaded: 0, total: 60 });

  const currentStyleJson = JSON.stringify(currentStyle || {});

  useEffect(() => {
    if (currentStyle && isOpen) {
      setStyleState(prev => {
        let changed = false;
        const next = { ...prev };
        (Object.keys(currentStyle) as Array<keyof TypographyStyle>).forEach(key => {
          if (currentStyle[key] !== undefined && prev[key] !== currentStyle[key]) {
            (next as any)[key] = currentStyle[key];
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    }
  }, [currentStyleJson, isOpen]);

  // Handle automatic font preloading on selection
  const handleSelectFont = (font: FontItem) => {
    fontManager.loadFont(font.id);
    const newStyle = { ...styleState, fontFamily: font.fontFamily };
    setStyleState(newStyle);
    if (onApplyStyle) {
      onApplyStyle(newStyle);
    }
  };

  const handleDownloadAllFonts = async () => {
    setIsDownloadingOffline(true);
    await fontManager.preloadAllFonts((loaded, total) => {
      setDownloadProgress({ loaded, total });
    });
    setIsDownloadingOffline(false);
  };

  if (!isOpen) return null;

  // Filtering Logic
  const filteredFonts = ALL_FONTS.filter(font => {
    // Language Tab Filter
    if (activeLangTab === 'ar' && font.lang !== 'ar') return false;
    if (activeLangTab === 'en' && font.lang !== 'en') return false;

    // Category Filter
    if (activeCategory !== 'all' && font.category !== activeCategory) return false;

    // Search Term Filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchName = font.name.toLowerCase().includes(term);
      const matchArabic = font.arabicName.toLowerCase().includes(term);
      const matchSample = font.sampleText.toLowerCase().includes(term);
      const matchCat = font.category.toLowerCase().includes(term);
      return matchName || matchArabic || matchSample || matchCat;
    }

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 md:p-6 font-sans select-none animate-in fade-in duration-200" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Top Navigation Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400">
              <Type size={22} />
            </div>
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                {title}
                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-full">
                  جاهز دون إنترنت
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-bold">
                مكتبة تضم 60 خطاً عربياً وإنجليزياً مع تحكم دقيق بدقة المطبوعات والمستندات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadAllFonts}
              disabled={isDownloadingOffline}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-amber-300 transition-all"
            >
              {isDownloadingOffline ? (
                <>
                  <RefreshCw size={14} className="animate-spin text-amber-400" />
                  <span>جاري التخزين ({downloadProgress.loaded}/{downloadProgress.total})</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>تخزين جميع الخطوط (Offline)</span>
                </>
              )}
            </button>

            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Section View Selector Bar */}
        <div className="p-2 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTabSection('font_library')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTabSection === 'font_library'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Type size={14} />
              <span>مكتبة الخطوط الـ 60</span>
            </button>

            <button
              onClick={() => setActiveTabSection('advanced_tuning')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTabSection === 'advanced_tuning'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Sliders size={14} />
              <span>خصائص وتنسيق النص (Typography)</span>
            </button>
          </div>

          {/* Current Selection Pill */}
          <div className="hidden md:flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-bold">
            <span className="text-slate-400">الخط الحالي:</span>
            <span className="text-amber-300 font-black" style={{ fontFamily: styleState.fontFamily }}>
              {styleState.fontFamily.split(',')[0].replace(/['"]/g, '')}
            </span>
          </div>
        </div>

        {/* Main Content Body */}
        {activeTabSection === 'font_library' ? (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            
            {/* Filter controls row */}
            <div className="p-4 bg-slate-950/40 border-b border-slate-800 space-y-3 shrink-0">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Search Box */}
                <div className="relative w-full sm:w-80">
                  <Search size={16} className="absolute right-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="ابحث باسم الخط، نوعه، أو الاستخدام..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-bold"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="absolute left-2 top-2.5 text-slate-500 hover:text-white text-xs">
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Main Language Tabs */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 w-full sm:w-auto overflow-x-auto">
                  <button
                    onClick={() => { setActiveLangTab('all'); setActiveCategory('all'); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      activeLangTab === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    الكل (60)
                  </button>
                  <button
                    onClick={() => { setActiveLangTab('ar'); setActiveCategory('all'); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      activeLangTab === 'ar' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    العربية (30)
                  </button>
                  <button
                    onClick={() => { setActiveLangTab('en'); setActiveCategory('all'); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      activeLangTab === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    English (30)
                  </button>
                  <button
                    onClick={() => { setActiveLangTab('document_presets'); setActiveCategory('all'); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      activeLangTab === 'document_presets' ? 'bg-amber-600 text-white' : 'text-amber-400 hover:text-white'
                    }`}
                  >
                    حسب الوثيقة
                  </button>
                </div>
              </div>

              {/* Category Chips Bar */}
              {activeLangTab !== 'document_presets' && (
                <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-1 text-xs font-bold">
                  <span className="text-slate-500 shrink-0 text-[11px]">التصنيف:</span>
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-2.5 py-1 rounded-lg shrink-0 ${
                      activeCategory === 'all' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    الجميع
                  </button>
                  {activeLangTab !== 'en' && (
                    <>
                      <button onClick={() => setActiveCategory('naskh')} className={`px-2.5 py-1 rounded-lg shrink-0 ${activeCategory === 'naskh' ? 'bg-slate-800 text-indigo-300 border border-slate-700' : 'text-slate-400 hover:text-white'}`}>نسخ</button>
                      <button onClick={() => setActiveCategory('kufi')} className={`px-2.5 py-1 rounded-lg shrink-0 ${activeCategory === 'kufi' ? 'bg-slate-800 text-indigo-300 border border-slate-700' : 'text-slate-400 hover:text-white'}`}>كوفي</button>
                      <button onClick={() => setActiveCategory('ruqaa')} className={`px-2.5 py-1 rounded-lg shrink-0 ${activeCategory === 'ruqaa' ? 'bg-slate-800 text-indigo-300 border border-slate-700' : 'text-slate-400 hover:text-white'}`}>رقعة</button>
                      <button onClick={() => setActiveCategory('thuluth_diwani')} className={`px-2.5 py-1 rounded-lg shrink-0 ${activeCategory === 'thuluth_diwani' ? 'bg-slate-800 text-indigo-300 border border-slate-700' : 'text-slate-400 hover:text-white'}`}>ثلث / ديواني</button>
                      <button onClick={() => setActiveCategory('modern')} className={`px-2.5 py-1 rounded-lg shrink-0 ${activeCategory === 'modern' ? 'bg-slate-800 text-indigo-300 border border-slate-700' : 'text-slate-400 hover:text-white'}`}>حديث / عصري</button>
                    </>
                  )}
                  {activeLangTab !== 'ar' && (
                    <>
                      <button onClick={() => setActiveCategory('sans_serif')} className={`px-2.5 py-1 rounded-lg shrink-0 ${activeCategory === 'sans_serif' ? 'bg-slate-800 text-indigo-300 border border-slate-700' : 'text-slate-400 hover:text-white'}`}>Sans Serif</button>
                      <button onClick={() => setActiveCategory('serif')} className={`px-2.5 py-1 rounded-lg shrink-0 ${activeCategory === 'serif' ? 'bg-slate-800 text-indigo-300 border border-slate-700' : 'text-slate-400 hover:text-white'}`}>Serif</button>
                      <button onClick={() => setActiveCategory('display')} className={`px-2.5 py-1 rounded-lg shrink-0 ${activeCategory === 'display' ? 'bg-slate-800 text-indigo-300 border border-slate-700' : 'text-slate-400 hover:text-white'}`}>Display</button>
                      <button onClick={() => setActiveCategory('monospace')} className={`px-2.5 py-1 rounded-lg shrink-0 ${activeCategory === 'monospace' ? 'bg-slate-800 text-indigo-300 border border-slate-700' : 'text-slate-400 hover:text-white'}`}>Monospace</button>
                    </>
                  )}
                </div>
              )}

              {/* Custom Preview Text Editor Bar */}
              <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-bold shrink-0">المعاينة المباشرة:</span>
                <input
                  type="text"
                  value={customPreviewText}
                  onChange={(e) => setCustomPreviewText(e.target.value)}
                  placeholder="اكتب أي جملة لملاحظة شكل الخط عليها مباشرة..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-amber-200 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

            </div>

            {/* Font Cards Grid View */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
              
              {/* Document Default Presets Tab */}
              {activeLangTab === 'document_presets' && (
                <div className="space-y-4">
                  <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl text-amber-200 text-xs font-bold leading-relaxed">
                    <Sparkles size={16} className="inline ml-1.5 text-amber-400" />
                    الخطوط الافتراضية الموصى بها حسب نوع الوثيقة والملف التعليمي:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(DOCUMENT_DEFAULT_FONTS).map(([key, def]) => {
                      const arFont = fontManager.getFontById(def.arabic);
                      const enFont = fontManager.getFontById(def.english);

                      return (
                        <div key={key} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                          <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black rounded-lg inline-block">
                            {def.name}
                          </span>

                          <div className="space-y-2">
                            {arFont && (
                              <div
                                onClick={() => handleSelectFont(arFont)}
                                className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 hover:border-indigo-500 cursor-pointer flex items-center justify-between"
                              >
                                <div>
                                  <span className="text-[10px] text-slate-400 block font-bold">العربية:</span>
                                  <span className="text-xs font-bold text-white" style={{ fontFamily: arFont.fontFamily }}>
                                    {arFont.name}
                                  </span>
                                </div>
                                <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded font-bold">اختيار</span>
                              </div>
                            )}

                            {enFont && (
                              <div
                                onClick={() => handleSelectFont(enFont)}
                                className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 hover:border-indigo-500 cursor-pointer flex items-center justify-between"
                              >
                                <div>
                                  <span className="text-[10px] text-slate-400 block font-bold">الإنجليزية:</span>
                                  <span className="text-xs font-bold text-white" style={{ fontFamily: enFont.fontFamily }}>
                                    {enFont.name}
                                  </span>
                                </div>
                                <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded font-bold">اختيار</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Font Cards List */}
              {activeLangTab !== 'document_presets' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredFonts.map((font) => {
                    const isSelected = styleState.fontFamily.includes(font.fontFamily.split(',')[0].replace(/['"]/g, ''));

                    return (
                      <div
                        key={font.id}
                        onClick={() => handleSelectFont(font)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                          isSelected
                            ? 'bg-indigo-950/80 border-indigo-500 ring-2 ring-indigo-500/30'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-indigo-300">{font.name}</span>
                            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-bold rounded">
                              {font.category}
                            </span>
                          </div>
                          {isSelected && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
                        </div>

                        {/* Font Live Rendered Box */}
                        <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                          <p 
                            className="text-base text-white leading-relaxed truncate" 
                            style={{ 
                              fontFamily: font.fontFamily,
                              fontSize: `${Math.min(styleState.fontSize || 16, 20)}px`,
                              fontWeight: styleState.fontWeight || 600
                            }}
                          >
                            {customPreviewText || font.sampleText}
                          </p>
                        </div>

                        {/* Metadata Footer */}
                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold pt-1">
                          <span>الأوزان: {font.weights.join(', ')}</span>
                          <span className="text-amber-400/80">
                            موصى به: {font.recommendedFor.map(r => r === 'exam' ? 'امتحان' : r === 'book' ? 'كتاب' : r === 'certificate' ? 'شهادة' : 'تقرير').join('، ')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

          </div>
        ) : (
          /* TAB 2: Advanced Typography Controls Panel (سابعاً: خصائص إضافية) */
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            
            {/* Live Sample Canvas Preview Box */}
            <div className="p-6 bg-white rounded-3xl border-4 border-slate-800 shadow-inner flex flex-col items-center justify-center min-h-[140px] text-center overflow-hidden">
              <span className="text-xs font-bold text-slate-400 mb-2">المعاينة المباشرة للتنسيق المحدد:</span>
              <p
                style={{
                  fontFamily: styleState.fontFamily,
                  fontSize: `${styleState.fontSize}px`,
                  fontWeight: styleState.fontWeight,
                  color: styleState.color,
                  lineHeight: styleState.lineHeight,
                  letterSpacing: `${styleState.letterSpacing}px`,
                  wordSpacing: `${styleState.wordSpacing}px`,
                  textAlign: styleState.textAlign,
                  direction: styleState.direction,
                  textTransform: styleState.textTransform,
                  WebkitTextStrokeWidth: styleState.textStrokeWidth ? `${styleState.textStrokeWidth}px` : undefined,
                  WebkitTextStrokeColor: styleState.textStrokeColor,
                  textShadow: styleState.textShadow !== 'none' ? styleState.textShadow : undefined,
                  opacity: (styleState.opacity || 100) / 100
                }}
                className="w-full break-words"
              >
                {customPreviewText || 'مدرسة الرقيم النموذجية — بسم الله الرحمن الرحيم'}
              </p>
            </div>

            {/* Controls Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-bold">
              
              {/* Font Size */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <label className="text-slate-400 block">حجم الخط (Font Size): {styleState.fontSize}px</label>
                <input
                  type="range"
                  min="8"
                  max="72"
                  value={styleState.fontSize}
                  onChange={(e) => setStyleState({ ...styleState, fontSize: Number(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Font Weight */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <label className="text-slate-400 block">وزن الخط (Font Weight): {styleState.fontWeight}</label>
                <select
                  value={styleState.fontWeight}
                  onChange={(e) => setStyleState({ ...styleState, fontWeight: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2 focus:outline-none"
                >
                  <option value={300}>300 — خفيف (Light)</option>
                  <option value={400}>400 — عادي (Normal)</option>
                  <option value={500}>500 — متوسط (Medium)</option>
                  <option value={600}>600 — نصف عريض (SemiBold)</option>
                  <option value={700}>700 — عريض (Bold)</option>
                  <option value={800}>800 — عريض جداً (ExtraBold)</option>
                  <option value={900}>900 — ثقيل (Black)</option>
                </select>
              </div>

              {/* Font Color */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <label className="text-slate-400 block">لون النص (Text Color)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={styleState.color}
                    onChange={(e) => setStyleState({ ...styleState, color: e.target.value })}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-slate-700 bg-transparent"
                  />
                  <input
                    type="text"
                    value={styleState.color}
                    onChange={(e) => setStyleState({ ...styleState, color: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-800 text-white rounded-xl p-2 font-mono"
                  />
                </div>
              </div>

              {/* Line Height */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <label className="text-slate-400 block">ارتفاع السطر (Line Height): {styleState.lineHeight}</label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={styleState.lineHeight}
                  onChange={(e) => setStyleState({ ...styleState, lineHeight: Number(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Letter Spacing */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <label className="text-slate-400 block">تباعد الأحرف (Letter Spacing): {styleState.letterSpacing}px</label>
                <input
                  type="range"
                  min="-2"
                  max="10"
                  value={styleState.letterSpacing}
                  onChange={(e) => setStyleState({ ...styleState, letterSpacing: Number(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Word Spacing */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <label className="text-slate-400 block">تباعد الكلمات (Word Spacing): {styleState.wordSpacing}px</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={styleState.wordSpacing}
                  onChange={(e) => setStyleState({ ...styleState, wordSpacing: Number(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Alignment */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <label className="text-slate-400 block">المحاذاة (Text Align)</label>
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setStyleState({ ...styleState, textAlign: 'right' })}
                    className={`flex-1 py-1.5 rounded-lg flex items-center justify-center ${styleState.textAlign === 'right' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    <AlignRight size={16} />
                  </button>
                  <button
                    onClick={() => setStyleState({ ...styleState, textAlign: 'center' })}
                    className={`flex-1 py-1.5 rounded-lg flex items-center justify-center ${styleState.textAlign === 'center' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    <AlignCenter size={16} />
                  </button>
                  <button
                    onClick={() => setStyleState({ ...styleState, textAlign: 'left' })}
                    className={`flex-1 py-1.5 rounded-lg flex items-center justify-center ${styleState.textAlign === 'left' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    <AlignLeft size={16} />
                  </button>
                  <button
                    onClick={() => setStyleState({ ...styleState, textAlign: 'justify' })}
                    className={`flex-1 py-1.5 rounded-lg flex items-center justify-center ${styleState.textAlign === 'justify' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    <AlignJustify size={16} />
                  </button>
                </div>
              </div>

              {/* Text Direction */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <label className="text-slate-400 block">اتجاه الكتابة (Direction)</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setStyleState({ ...styleState, direction: 'rtl' })}
                    className={`flex-1 py-2 rounded-xl border ${styleState.direction === 'rtl' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                  >
                    من اليمين (RTL)
                  </button>
                  <button
                    onClick={() => setStyleState({ ...styleState, direction: 'ltr' })}
                    className={`flex-1 py-2 rounded-xl border ${styleState.direction === 'ltr' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                  >
                    من اليسار (LTR)
                  </button>
                </div>
              </div>

              {/* Opacity */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <label className="text-slate-400 block">الشفافية (Opacity): {styleState.opacity}%</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={styleState.opacity}
                  onChange={(e) => setStyleState({ ...styleState, opacity: Number(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Text Shadow */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <label className="text-slate-400 block">ظل النص (Text Shadow)</label>
                <select
                  value={styleState.textShadow}
                  onChange={(e) => setStyleState({ ...styleState, textShadow: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2 focus:outline-none"
                >
                  <option value="none">بدون ظل</option>
                  <option value="1px 1px 2px rgba(0,0,0,0.3)">ظل خفيف</option>
                  <option value="2px 2px 4px rgba(0,0,0,0.5)">ظل متوسط</option>
                  <option value="3px 3px 6px rgba(0,0,0,0.8)">ظل بارز</option>
                  <option value="0px 0px 8px rgba(99,102,241,0.8)">إضاءة نيون (Glow)</option>
                </select>
              </div>

            </div>

          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-400 font-bold">
            سيتم تطبيق الخط مباشرة دون الحاجة لإعادة تحميل الصفحة
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all"
            >
              إلغاء
            </button>
            <button
              onClick={() => {
                if (onApplyStyle) {
                  onApplyStyle(styleState);
                }
                onClose();
              }}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <Check size={16} />
              <span>تطبيق النمط والخط</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
