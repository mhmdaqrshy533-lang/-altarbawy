import React, { useRef, useEffect } from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { useEditorStore } from '../../store/useEditorStore';
import { Rnd } from 'react-rnd';
import { EditorElement, TextElement } from '../../types';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { 
  Sparkles, BookOpen, QrCode, Barcode, Shield, Award, 
  ChevronLeft, FileText, CheckCircle2, Bookmark, Layers, Edit3, Image as ImageIcon
} from 'lucide-react';
import { 
  YemeniEagleEmblem, MinistrySeal, QuranOnStandGraphic, 
  IslamicMihrabArch, MathGeometryGraphic, YemeniLandmarksGraphic 
} from './YemeniCoversRenderer';

const ElementRenderer = ({ element, updateElement, activePageIndex }: { element: EditorElement, updateElement: any, activePageIndex: number }) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const { newlyCreatedElementId, setNewlyCreatedElementId } = useEditorStore();

  const isHtml = element.type === 'text' && typeof element.content === 'string' && /<[a-z][\s\S]*>/i.test(element.content);

  useEffect(() => {
    if (element.type === 'text' && !isHtml && contentEditableRef.current && document.activeElement !== contentEditableRef.current) {
      contentEditableRef.current.innerText = element.content;
    }
  }, [element, isHtml]);

  useEffect(() => {
    if (element.type === 'text' && !isHtml && element.id === newlyCreatedElementId && contentEditableRef.current) {
      contentEditableRef.current.focus();
      try {
        const range = window.document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(contentEditableRef.current);
        range.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(range);
      } catch (e) {
        console.warn('Focus failed', e);
      }
      setNewlyCreatedElementId(null);
    }
  }, [newlyCreatedElementId, element.id, element.type, isHtml, setNewlyCreatedElementId]);

  if (element.type === 'text') {
    const textEl = element as TextElement;

    if (isHtml) {
      return (
        <div 
          style={{ width: '100%', height: '100%', overflow: 'hidden' }}
          dangerouslySetInnerHTML={{ __html: textEl.content }}
        />
      );
    }

    return (
      <div 
        ref={contentEditableRef}
        style={{ 
          width: '100%', height: '100%', 
          fontSize: element.fontSize, fontFamily: element.fontFamily,
          fontWeight: element.fontWeight, color: element.color,
          textAlign: element.textAlign as any,
          outline: 'none',
          whiteSpace: 'pre-wrap'
        }}
        className="cursor-text p-1.5 leading-relaxed"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          updateElement(activePageIndex, element.id, { content: e.currentTarget.innerText });
        }}
      />
    );
  }

  if (element.type === 'image') {
    return (
      <img src={element.src} alt="element" style={{ width: '100%', height: '100%', objectFit: 'contain' }} crossOrigin="anonymous" referrerPolicy="no-referrer" />
    );
  }

  if (element.type === 'math') {
    return (
      <div 
        style={{ fontSize: element.fontSize, color: element.color, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        dangerouslySetInnerHTML={{ __html: katex.renderToString(element.latex, { displayMode: true, throwOnError: false }) }}
      />
    );
  }

  if (element.type === 'physics') {
    return (
      <div 
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        dangerouslySetInnerHTML={{ __html: element.svgContent }}
      />
    );
  }

  return <div>عنصر محتوى</div>;
};

export const BookCanvas: React.FC = () => {
  const { currentProject, setActiveDrawer } = useBookStudioStore();
  const { document, activePageIndex, zoom, updateElement, selectElement, selectedElementIds, clearSelection, snapToGrid, setActivePage } = useEditorStore();

  const canvasRef = useRef<HTMLDivElement>(null);

  if (!currentProject) return null;

  const page = document.pages[activePageIndex] || { id: 'p0', elements: [] };
  const totalPages = document.pages.length;

  const cover = currentProject.cover;
  const palette = currentProject.palette;
  const fontPairing = currentProject.fontPairing;
  const outline = currentProject.outline;

  // Paper Dimensions based on paperSize
  let A4_WIDTH = 794;
  let A4_HEIGHT = 1123;
  if (currentProject.paperSize === 'A5') {
    A4_WIDTH = 559;
    A4_HEIGHT = 794;
  } else if (currentProject.paperSize === 'B5') {
    A4_WIDTH = 665;
    A4_HEIGHT = 945;
  }

  const GRID_SIZE = 20;
  const scale = zoom / 100;
  const scaledWidth = A4_WIDTH * scale;
  const scaledHeight = A4_HEIGHT * scale;

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      clearSelection();
    }
  };

  const isFrontCover = activePageIndex === 0;
  const isCopyrightPage = activePageIndex === 1;
  const isDedicationPage = activePageIndex === 2;
  const isTocPage = activePageIndex === 3;
  const isBackCover = activePageIndex === totalPages - 1;
  const isContentPage = !isFrontCover && !isCopyrightPage && !isDedicationPage && !isTocPage && !isBackCover;

  return (
    <div className="w-full h-full overflow-auto bg-slate-950/50 p-6 md:p-12 flex justify-center items-start custom-scrollbar select-none">
      <div 
        style={{ 
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          position: 'relative',
          flexShrink: 0,
          margin: '0 auto',
        }}
        className="transition-all duration-150 ease-out my-auto shadow-2xl"
      >
        <div 
          id={`book-canvas-page-${activePageIndex}`}
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="bg-white relative flex flex-col shadow-2xl rounded-sm overflow-hidden"
          style={{
            width: `${A4_WIDTH}px`,
            height: `${A4_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
            fontFamily: fontPairing.bodyFont,
            backgroundImage: snapToGrid ? 'linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)' : 'none',
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
          }}
        >
          
          {/* ==================== PAGE 0: FRONT COVER ==================== */}
          {isFrontCover && (
            <div 
              className="w-full h-full flex flex-col justify-between p-8 relative overflow-hidden text-slate-900 border-[10px]"
              style={{ 
                backgroundColor: cover.backgroundColor || palette.background,
                borderColor: cover.accentColor || palette.primary 
              }}
            >
              {/* Optional Islamic Mihrab Arch for Religion/Quran */}
              {(currentProject.subject === 'التربية الإسلامية' || cover.borderStyle === 'islamic_frame') && (
                <IslamicMihrabArch />
              )}

              {/* Decorative Frame Overlay */}
              {cover.hasDecorativeBorder && (
                <div 
                  className="absolute inset-3 border-2 border-slate-900/20 pointer-events-none rounded-sm"
                  style={{ borderColor: `${cover.accentColor || palette.primary}60` }}
                />
              )}

              {/* Cover Official Yemeni Ministry Header */}
              <div className="flex items-start justify-between z-10 border-b-2 pb-3" style={{ borderColor: `${cover.accentColor || palette.primary}40` }}>
                
                {/* Right: Republic of Yemen + Ministry Header with Eagle Emblem */}
                <div className="flex items-center gap-3">
                  <YemeniEagleEmblem size={52} />
                  <div className="space-y-0.5 text-right">
                    <span className="text-[11px] font-black text-slate-900 block leading-tight">الجمهورية اليمنية</span>
                    <span className="text-[10px] font-bold text-slate-700 block leading-tight">وزارة التربية والتعليم</span>
                    <span className="text-[9px] font-semibold text-slate-500 block leading-tight">قطاع المناهج والتوجيه — الإدارة العامة للمناهج</span>
                  </div>
                </div>

                {/* Left: Ministry Seal & Subject Badge */}
                <div className="flex items-center gap-3">
                  <div className="text-left space-y-0.5">
                    <span className="px-2.5 py-1 text-white text-[10px] font-black rounded-md inline-block shadow-sm" style={{ backgroundColor: cover.accentColor || palette.primary }}>
                      {currentProject.subject}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 block">{currentProject.grade}</span>
                  </div>
                  <MinistrySeal size={42} />
                </div>

              </div>

              {/* Cover Hero Center Section */}
              <div className="my-auto text-center space-y-5 z-10 py-4">
                
                <div className="space-y-2">
                  <span 
                    className="text-[11px] font-black tracking-wider uppercase px-4 py-1 rounded-full border inline-block shadow-sm"
                    style={{ 
                      color: cover.accentColor || palette.primary, 
                      borderColor: `${cover.accentColor || palette.primary}50`,
                      backgroundColor: 'rgba(255,255,255,0.85)' 
                    }}
                  >
                    {currentProject.stage} — {currentProject.semester || 'الجزء الأول'}
                  </span>

                  {/* Main Subject Title with Arabic Diacritics Typography */}
                  <h1 
                    className="text-4xl md:text-5xl font-black leading-snug tracking-normal pt-2 drop-shadow-sm px-4"
                    style={{ 
                      color: cover.titleColor || palette.textPrimary,
                      fontFamily: fontPairing.headingFont || 'Noto Naskh Arabic'
                    }}
                  >
                    {cover.mainTitle || currentProject.title}
                  </h1>

                  <p className="text-sm md:text-base font-bold text-slate-700 max-w-lg mx-auto pt-1 leading-relaxed">
                    {cover.subtitle || `${currentProject.grade} — مرحلة التعليم الأساسي`}
                  </p>
                </div>

                {/* Dynamic Hero Graphic Art matching Yemeni Subject */}
                <div className="w-48 h-48 mx-auto rounded-3xl bg-white/90 backdrop-blur border-2 shadow-xl flex items-center justify-center p-4 relative overflow-hidden" style={{ borderColor: `${cover.accentColor || palette.primary}40` }}>
                  {cover.heroImageUrl ? (
                    <img src={cover.heroImageUrl} alt="Hero" className="w-full h-full object-contain" />
                  ) : currentProject.subject === 'التربية الإسلامية' || cover.mainTitle.includes('الْقُرْآنُ') ? (
                    <QuranOnStandGraphic size={150} />
                  ) : currentProject.subject === 'الرياضيات' || cover.mainTitle.includes('الرِّيَاضِيَّاتُ') ? (
                    <MathGeometryGraphic size={140} />
                  ) : currentProject.subject === 'الجغرافيا' || currentProject.subject === 'التاريخ' || currentProject.subject === 'اللغة الإنجليزية' ? (
                    <YemeniLandmarksGraphic size={150} />
                  ) : (
                    <div className="text-center space-y-2" style={{ color: cover.accentColor || palette.primary }}>
                      <BookOpen size={64} className="mx-auto opacity-85" />
                      <span className="text-[11px] font-black block text-slate-800">طبعة المنهج المعتمد</span>
                    </div>
                  )}
                </div>

                {/* Authors & Reviewers Ministerial Committee */}
                <div className="flex items-center justify-center gap-6 text-[11px] font-bold pt-3 border-t max-w-lg mx-auto" style={{ borderColor: `${cover.accentColor || palette.primary}30` }}>
                  <div>
                    <span className="text-slate-500 block text-[9px] font-semibold">إعداد وتأليف:</span>
                    <span className="text-slate-900 font-black">{cover.authorName || 'الإدارة العامة للمناهج والبرامج'}</span>
                  </div>
                  <div className="w-px h-7 bg-slate-300" />
                  <div>
                    <span className="text-slate-500 block text-[9px] font-semibold">المراجعة والتدقيق:</span>
                    <span className="text-slate-900 font-black">{cover.reviewerName || 'قطاع المناهج والتوجيه التربوي'}</span>
                  </div>
                </div>

              </div>

              {/* Cover Bottom Official Ministerial Footer */}
              <div className="flex items-end justify-between z-10 pt-3 border-t-2" style={{ borderColor: `${cover.accentColor || palette.primary}40` }}>
                <div className="space-y-0.5 text-right">
                  <span className="text-[10px] font-black text-slate-900 block">
                    {cover.publisherName || 'حقوق الطبع محفوظة لوزارة التربية والتعليم'}
                  </span>
                  <span className="text-[9px] text-slate-600 font-bold block">
                    {cover.editionNumber || '1447 هـ / 2026 م — (طبعة معتمدة)'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded text-[9px] font-black">
                    طبعة معتمدة
                  </div>
                  <div className="p-1 bg-white border rounded shadow-sm text-center">
                    <Barcode size={28} className="text-slate-800" />
                  </div>
                </div>
              </div>

              {/* Cover Micro Action Bar Overlay */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-bold">
                <button
                  onClick={() => setActiveDrawer('cover')}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <Edit3 size={14} />
                  <span>تعديل عناصر الغلاف</span>
                </button>

                <div className="w-px h-4 bg-slate-700" />

                <button
                  onClick={() => setActivePage(3)}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <span>الانتقال لصفحات المحتوى</span>
                  <ChevronLeft size={14} />
                </button>
              </div>

            </div>
          )}

          {/* ==================== PAGE 1: COPYRIGHT & DETAILS ==================== */}
          {isCopyrightPage && (
            <div className="w-full h-full p-12 flex flex-col justify-between text-slate-900 relative">
              <div className="border-b-2 border-slate-800 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-800">جمهورية اليمن — وزارة التربية والتعليم</h3>
                  <p className="text-xs font-bold text-slate-500">قطاع المناهج والتوجيه التربوي</p>
                </div>
                <Shield size={28} className="text-slate-800" />
              </div>

              <div className="my-auto space-y-6 max-w-md mx-auto text-right bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-black text-slate-900">{currentProject.title}</h2>
                  <p className="text-xs font-bold text-slate-600">{currentProject.stage} — {currentProject.grade}</p>
                </div>

                <div className="space-y-2 text-xs font-bold text-slate-700 border-t border-b border-slate-200 py-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">إعداد وتأليف:</span>
                    <span className="text-slate-900">{cover.authorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">المراجعة والتدقيق:</span>
                    <span className="text-slate-900">{cover.reviewerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">الإشراف الفني والطباعي:</span>
                    <span className="text-slate-900">{cover.publisherName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">سنة الإصدار والطبعة:</span>
                    <span className="text-slate-900">{cover.editionNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">الرقم الدولي المعياري (ISBN):</span>
                    <span className="font-mono text-slate-900">{cover.isbnNumber || '978-9953-0-1234-5'}</span>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 font-bold leading-relaxed text-center">
                  ⚠️ <strong>حقوق الطبع والتوزيع محفوظة:</strong> لا يجوز إعادة طبع أو تصوير أو اقتطاع أي جزء من هذا المنهج بدون إذن كتابي رسمياً.
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3 text-center text-[10px] font-bold text-slate-500">
                طُبع في مطابع المناهج التعليمية والمنصات الرقمية المعتمدة — صفحة 2
              </div>
            </div>
          )}

          {/* ==================== PAGE 2: DEDICATION & PREFACE ==================== */}
          {isDedicationPage && (
            <div className="w-full h-full p-12 flex flex-col justify-between text-slate-900 relative">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between text-xs font-bold text-slate-500">
                <span>{currentProject.title}</span>
                <span>الإهداء والمقدمة</span>
              </div>

              <div className="my-auto space-y-8 max-w-lg mx-auto text-right">
                
                {/* Dedication Box */}
                <div className="p-8 bg-indigo-50/60 border border-indigo-100 rounded-3xl text-center space-y-4 shadow-sm">
                  <span className="text-xs font-black text-indigo-600 block">﴿ بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ﴾</span>
                  <h3 className="text-lg font-black text-indigo-900">إهــــداء وتصـــدير</h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-bold italic">
                    «إلى أبنائنا وبناتنا الطلاب والطالبات، قادة المستقبل وبناة الغد المشرق.. نضع بين أيديكم هذا المنهج ليكون زادكم العلمي ومرشدكم المعرفي.»
                  </p>
                </div>

                {/* Preface Box */}
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-slate-900 border-r-4 border-indigo-600 pr-3">
                    مقدمة المنهج والكتيب التعليمي
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    الحمد لله رب العالمين والصلاة والسلام على أشرف الأنبياء والمرسلين. يأتي هذا المنهج متوافقاً مع أحدث الرؤى التربوية والمعايير الوزارية، حيث حرصنا على تبسيط المفاهيم، وتزويد الطالب بالتدريبات والأنشطة التفاعلية التي تنمي مهارات التفكير العليا.
                  </p>
                </div>

              </div>

              <div className="border-t border-slate-200 pt-3 text-center text-[10px] font-bold text-slate-500">
                منصة الرقيم للنشر المنهجي — صفحة 3
              </div>
            </div>
          )}

          {/* ==================== PAGE 3: AUTOMATED TABLE OF CONTENTS ==================== */}
          {isTocPage && (
            <div className="w-full h-full p-12 flex flex-col justify-between text-slate-900 relative">
              <div className="border-b-2 border-indigo-600 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-900">فهرس المحتويات والوحدات</h2>
                  <p className="text-xs font-bold text-slate-500">{currentProject.title}</p>
                </div>
                <Bookmark size={24} className="text-indigo-600" />
              </div>

              {/* TOC List */}
              <div className="my-auto space-y-2.5 py-4">
                {outline.map((item, idx) => (
                  <div 
                    key={item.id}
                    onClick={() => setActivePage(item.pageIndex)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer hover:bg-indigo-50/80 ${
                      item.type === 'unit' 
                        ? 'bg-indigo-950 text-white font-black border-indigo-900' 
                        : item.type === 'chapter'
                        ? 'bg-slate-100 text-slate-900 font-bold border-slate-200'
                        : 'bg-white text-slate-700 border-dashed border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center shrink-0 ${
                        item.type === 'unit' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-xs">{item.title}</span>
                    </div>

                    <div className="flex-1 border-b border-dotted border-slate-300 mx-3 opacity-60" />

                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-white text-indigo-900 border rounded">
                      صفحة {item.pageIndex + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-3 text-center text-[10px] font-bold text-slate-500">
                منصة الرقيم للنشر المنهجي — صفحة 4
              </div>
            </div>
          )}

          {/* ==================== CONTENT PAGES (RUNNING HEADER & FOOTER) ==================== */}
          {isContentPage && (
            <div className="w-full h-full flex flex-col justify-between p-10 pointer-events-none">
              {/* Running Header */}
              <div className="border-b border-slate-200 pb-2 flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span>{currentProject.title}</span>
                <span className="text-indigo-700 font-black">{currentProject.subject} — {currentProject.grade}</span>
              </div>

              {/* Running Footer */}
              <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-[11px] font-bold text-slate-500 mt-auto">
                <span>منصة الرقيم للنشر المنهجي والمدرسي</span>
                <span className="font-mono text-indigo-900 font-black bg-slate-100 px-2 py-0.5 rounded border">
                  صفحة {activePageIndex + 1}
                </span>
              </div>
            </div>
          )}

          {/* ==================== PAGE N-1: BACK COVER ==================== */}
          {isBackCover && (
            <div 
              className="w-full h-full p-12 flex flex-col justify-between text-slate-900 relative border-8"
              style={{ 
                backgroundColor: cover.backgroundColor || palette.background,
                borderColor: cover.accentColor || palette.primary 
              }}
            >
              <div className="text-center space-y-2 border-b pb-4" style={{ borderColor: `${palette.primary}30` }}>
                <Shield size={36} className="mx-auto" style={{ color: palette.primary }} />
                <h2 className="text-xl font-black text-slate-900">{currentProject.title}</h2>
                <p className="text-xs font-bold text-slate-600">المنهج المعتمد — وزارة التربية والتعليم</p>
              </div>

              <div className="my-auto space-y-4 max-w-md mx-auto text-right bg-white/90 backdrop-blur p-6 rounded-2xl border shadow-md">
                <h4 className="text-sm font-black text-slate-900 border-r-4 border-indigo-600 pr-2">
                  مميزات وحقيبة المنهج التعليمي:
                </h4>
                <ul className="space-y-2 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>موافق للمعايير والمخرجات الوزارية المحدثة.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>شرح مبسط مدعم بالأمثلة المحلولة والتجارب المعملية.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>أنشطة وتدريبات تقويمية متدرجة المستويات.</span>
                  </li>
                </ul>
              </div>

              <div className="border-t pt-4 flex items-center justify-between" style={{ borderColor: `${palette.primary}30` }}>
                <div>
                  <span className="text-xs font-black text-slate-800 block">{cover.publisherName}</span>
                  <span className="text-[10px] text-slate-500 font-bold block">{cover.editionNumber}</span>
                </div>
                <div className="p-2 bg-white border rounded-xl shadow-sm">
                  <Barcode size={40} className="text-slate-800" />
                </div>
              </div>
            </div>
          )}

          {/* ==================== DRAGGABLE CONTENT ELEMENTS LAYER ==================== */}
          <div className="absolute inset-0 pt-14 pb-14 px-10 pointer-events-auto">
            {page?.elements?.map(el => {
              const isLocked = el.isLocked;
              const isHidden = el.isHidden;

              return (
                <Rnd
                  key={el.id}
                  position={{ x: el.x, y: el.y }}
                  size={{ width: el.width, height: el.height }}
                  scale={scale}
                  disableDragging={isLocked}
                  onDragStop={(e, d) => {
                    updateElement(activePageIndex, el.id, { x: d.x, y: d.y });
                  }}
                  onResizeStop={(e, dir, ref, delta, position) => {
                    updateElement(activePageIndex, el.id, {
                      width: parseInt(ref.style.width, 10),
                      height: parseInt(ref.style.height, 10),
                      ...position
                    });
                  }}
                  dragGrid={snapToGrid ? [GRID_SIZE, GRID_SIZE] : [1, 1]}
                  resizeGrid={snapToGrid ? [GRID_SIZE, GRID_SIZE] : [1, 1]}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    selectElement(el.id, e.shiftKey);
                  }}
                  className={`absolute transition-shadow ${
                    selectedElementIds.includes(el.id) 
                      ? 'ring-2 ring-indigo-600 ring-offset-2 ring-offset-white rounded-lg shadow-md' 
                      : 'hover:ring-1 hover:ring-slate-300'
                  } ${isHidden ? 'opacity-30 print:hidden' : ''}`}
                  style={{ zIndex: el.zIndex }}
                  bounds="parent"
                >
                  <ElementRenderer element={el} updateElement={updateElement} activePageIndex={activePageIndex} />
                </Rnd>
              );
            })}
          </div>

          {/* Watermark Branding Credit */}
          <div className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400/60 [writing-mode:vertical-lr] rotate-180 select-none pointer-events-none font-sans tracking-wider">
            استوديو النشر المكتبي المنهجي — منصة الرقيم
          </div>

        </div>
      </div>
    </div>
  );
};
