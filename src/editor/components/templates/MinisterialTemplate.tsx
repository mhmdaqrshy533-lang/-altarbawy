import React, { useState, useEffect } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { getCachedYemeniLogo, YEMENI_LOGO_URL } from '../../../utils/logoCache';

export const THEME_PRESETS_CLASSES: Record<string, {
  mainBorder: string;
  borderStyle: string;
  borderWidth: string;
  textPrimary: string;
  textSecondary: string;
  boxBg: string;
  boxBorder: string;
  studentBg: string;
  studentBorder: string;
  matrixBg: string;
  matrixBorder: string;
  cutLine: string;
  cutText: string;
  introBg: string;
  introText: string;
  accentText: string;
  eagleColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}> = {
  classic: {
    mainBorder: 'border-slate-900',
    borderStyle: 'border-double',
    borderWidth: 'border-[6px]',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-neutral-700',
    boxBg: 'bg-slate-50',
    boxBorder: 'border-slate-900',
    studentBg: 'bg-slate-50/70',
    studentBorder: 'border-slate-900',
    matrixBg: 'bg-slate-50/50',
    matrixBorder: 'border-slate-400',
    cutLine: 'border-neutral-300',
    cutText: 'text-neutral-400',
    introBg: 'bg-slate-900',
    introText: 'text-white',
    accentText: 'text-rose-600',
    eagleColor: 'text-neutral-800',
    badgeBg: 'bg-rose-50',
    badgeBorder: 'border-rose-200',
    badgeText: 'text-rose-700'
  },
  luxury_blue: {
    mainBorder: 'border-blue-900',
    borderStyle: 'border-double',
    borderWidth: 'border-[6px]',
    textPrimary: 'text-blue-900',
    textSecondary: 'text-blue-700',
    boxBg: 'bg-blue-50/80',
    boxBorder: 'border-amber-500',
    studentBg: 'bg-blue-50/50',
    studentBorder: 'border-blue-900',
    matrixBg: 'bg-blue-50/30',
    matrixBorder: 'border-blue-200',
    cutLine: 'border-blue-200',
    cutText: 'text-blue-400',
    introBg: 'bg-blue-900',
    introText: 'text-amber-300',
    accentText: 'text-amber-600',
    eagleColor: 'text-blue-800',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-700'
  },
  emerald_green: {
    mainBorder: 'border-emerald-900',
    borderStyle: 'border-double',
    borderWidth: 'border-[6px]',
    textPrimary: 'text-emerald-900',
    textSecondary: 'text-emerald-700',
    boxBg: 'bg-emerald-50/80',
    boxBorder: 'border-emerald-600',
    studentBg: 'bg-emerald-50/50',
    studentBorder: 'border-emerald-900',
    matrixBg: 'bg-emerald-50/30',
    matrixBorder: 'border-emerald-200',
    cutLine: 'border-emerald-200',
    cutText: 'text-emerald-400',
    introBg: 'bg-emerald-950',
    introText: 'text-emerald-50',
    accentText: 'text-red-600',
    eagleColor: 'text-emerald-800',
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-200',
    badgeText: 'text-emerald-700'
  },
  royal_crimson: {
    mainBorder: 'border-rose-950',
    borderStyle: 'border-double',
    borderWidth: 'border-[6px]',
    textPrimary: 'text-rose-950',
    textSecondary: 'text-rose-800',
    boxBg: 'bg-rose-50',
    boxBorder: 'border-rose-800',
    studentBg: 'bg-rose-50/50',
    studentBorder: 'border-rose-950',
    matrixBg: 'bg-rose-50/30',
    matrixBorder: 'border-rose-200',
    cutLine: 'border-rose-200',
    cutText: 'text-rose-400',
    introBg: 'bg-rose-950',
    introText: 'text-rose-100',
    accentText: 'text-rose-600',
    eagleColor: 'text-rose-900',
    badgeBg: 'bg-rose-50',
    badgeBorder: 'border-rose-200',
    badgeText: 'text-rose-700'
  },
  imperial_purple: {
    mainBorder: 'border-violet-950',
    borderStyle: 'border-double',
    borderWidth: 'border-[6px]',
    textPrimary: 'text-violet-950',
    textSecondary: 'text-violet-800',
    boxBg: 'bg-violet-50',
    boxBorder: 'border-violet-800',
    studentBg: 'bg-violet-50/50',
    studentBorder: 'border-violet-950',
    matrixBg: 'bg-violet-50/30',
    matrixBorder: 'border-violet-200',
    cutLine: 'border-violet-200',
    cutText: 'text-violet-400',
    introBg: 'bg-violet-950',
    introText: 'text-violet-100',
    accentText: 'text-fuchsia-600',
    eagleColor: 'text-violet-900',
    badgeBg: 'bg-violet-50',
    badgeBorder: 'border-violet-200',
    badgeText: 'text-violet-700'
  },
  noble_gold: {
    mainBorder: 'border-amber-950',
    borderStyle: 'border-double',
    borderWidth: 'border-[6px]',
    textPrimary: 'text-amber-950',
    textSecondary: 'text-amber-800',
    boxBg: 'bg-amber-50',
    boxBorder: 'border-amber-700',
    studentBg: 'bg-amber-50/50',
    studentBorder: 'border-amber-950',
    matrixBg: 'bg-amber-50/30',
    matrixBorder: 'border-amber-200',
    cutLine: 'border-amber-200',
    cutText: 'text-amber-400',
    introBg: 'bg-amber-900',
    introText: 'text-amber-50',
    accentText: 'text-amber-600',
    eagleColor: 'text-amber-900',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-700'
  }
};

export const getMinisterialTheme = (meta: any) => {
  const presetKey = meta.themePreset || 'classic';
  const base = { ...THEME_PRESETS_CLASSES[presetKey] || THEME_PRESETS_CLASSES.classic };
  
  if (meta.themeBorderStyle) {
    if (meta.themeBorderStyle === 'double') {
      base.borderStyle = 'border-double';
      base.borderWidth = 'border-[6px]';
    } else if (meta.themeBorderStyle === 'solid') {
      base.borderStyle = 'border-solid';
      base.borderWidth = 'border-4';
    } else if (meta.themeBorderStyle === 'dashed') {
      base.borderStyle = 'border-dashed';
      base.borderWidth = 'border-2';
    } else if (meta.themeBorderStyle === 'groove') {
      base.borderStyle = 'border-groove';
      base.borderWidth = 'border-4';
    } else if (meta.themeBorderStyle === 'ridge') {
      base.borderStyle = 'border-ridge';
      base.borderWidth = 'border-[6px]';
    }
  }

  if (meta.themeBorderWidth) {
    base.borderWidth = meta.themeBorderWidth;
  }
  
  return base;
};

export const MinisterialHeader = () => {
  const { document } = useEditorStore();
  const meta = document.metadata;
  const theme = getMinisterialTheme(meta);

  const [logoSrc, setLogoSrc] = useState<string | null>(() => getCachedYemeniLogo() || YEMENI_LOGO_URL);

  useEffect(() => {
    const cached = getCachedYemeniLogo();
    if (cached) {
      setLogoSrc(cached);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center select-none bg-white p-2" dir="rtl">
      {/* Main Double Border Wrapper */}
      <div className={`w-full ${theme.mainBorder} ${theme.borderStyle} ${theme.borderWidth} p-2 flex flex-col transition-all duration-300`}>
        
        {/* Top Header Row with 3 Columns */}
        <div className="flex w-full justify-between items-stretch">
          
          {/* Right - Educational Directory Info */}
          <div className={`w-[30%] text-[11px] font-bold leading-normal text-right ${theme.textPrimary} flex flex-col justify-between`}>
            <div>{meta.country || 'الجمهورية اليمنية'}</div>
            <div>{meta.ministry || 'وزارة التربية والتعليم'}</div>
            <div>مكتب التربية والتعليم م/ <span className="font-extrabold">{meta.governorate || '...............'}</span></div>
            <div>إدارة التربية والتعليم بمديرية/ <span className="font-extrabold">{meta.directorate || '...............'}</span></div>
            <div>مدرسة/ <span className="font-extrabold">{meta.school || '...............................'}</span></div>
          </div>

          {/* Center - Stylized Eagle Emblem and Exam Title */}
          <div className="w-[40%] flex flex-col items-center justify-center border-x border-slate-300 px-2 text-center">
            {/* National Emblem - Cached Yemeni Logo */}
            {logoSrc ? (
              <img 
                src={logoSrc} 
                alt="الشعار الجمهوري اليمني" 
                className="h-12 w-auto object-contain mb-1" 
                onError={() => setLogoSrc(null)} 
              />
            ) : (
              <svg viewBox="0 0 100 85" className={`w-14 h-10 ${theme.eagleColor} mb-1`} fill="currentColor">
                <path d="M50 10 L54 22 L66 12 L61 28 L78 18 L68 35 L85 30 L72 45 L80 54 L60 50 L56 65 L50 53 L44 65 L40 50 L20 54 L28 45 L15 30 L32 35 L22 18 L39 28 L34 12 L46 22 Z" />
                <ellipse cx="50" cy="38" rx="8" ry="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="50" y1="28" x2="50" y2="48" stroke="currentColor" strokeWidth="1" />
                <path d="M25 65 Q50 73 75 65 L73 61 Q50 68 27 61 Z" />
                <text x="50" y="77" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="currentColor">الجمهورية اليمنية</text>
              </svg>
            )}
            
            {/* Elegant Double Border Exam Title Box */}
            <div className={`border-2 ${theme.boxBorder} p-1 w-full ${theme.boxBg} rounded transition-colors`}>
              <h2 className={`text-[12px] font-black ${theme.textPrimary} leading-tight`}>
                {meta.examTitle || 'اختبار نهاية الفصل الدراسي الأول'}
              </h2>
              <div className={`text-[10px] font-bold ${theme.textSecondary} mt-0.5`}>
                {meta.examType || 'امتحان تحريري'} - {meta.semester || 'الفصل الأول'}
              </div>
            </div>
          </div>

          {/* Left - Exam Technical Parameters */}
          <div className={`w-[30%] text-[11px] font-bold leading-normal text-right pr-6 ${theme.textPrimary} flex flex-col justify-between`}>
            <div>الصف: <span className="font-extrabold">{meta.grade || '................'}</span></div>
            <div>الشعبة: <span className="font-extrabold">{meta.division || '................'}</span></div>
            <div>المادة: <span className="font-extrabold">{meta.subject || '................'}</span></div>
            <div>الزمن: <span className="font-extrabold">{meta.time || '................'}</span></div>
            <div>العام الدراسي: <span className="font-extrabold">{meta.academicYear || '2025/2026م'}</span></div>
          </div>
        </div>

        {/* Middle Row - Beautiful Student Details & Grades Box */}
        <div className={`w-full mt-3 border ${theme.studentBorder} rounded overflow-hidden grid grid-cols-12 text-center ${theme.studentBg} transition-colors`}>
          <div className={`col-span-3 border-l ${theme.studentBorder} p-1 text-[10px] font-bold flex flex-col justify-center ${theme.textPrimary}`}>
            <span>الرقم السري: ( ............ )</span>
          </div>
          <div className={`col-span-6 border-l ${theme.studentBorder} p-1 text-[11px] font-bold flex flex-col justify-center text-right pr-3 ${theme.textPrimary}`}>
            <span>إسم الطالب رباعياً: ................................................................</span>
          </div>
          <div className={`col-span-3 p-1 text-[10px] font-bold flex flex-col justify-center ${theme.textPrimary}`}>
            <span>رقم الجلوس: ( ............ )</span>
          </div>
        </div>

        {/* Marks Matrix row */}
        <div className={`w-full mt-2 border ${theme.matrixBorder} rounded overflow-hidden grid grid-cols-12 text-center ${theme.matrixBg} text-[10px] font-bold transition-colors`}>
          <div className={`col-span-2 border-l ${theme.matrixBorder} p-1 ${theme.textPrimary}`}>الدرجة بالأرقام</div>
          <div className={`col-span-3 border-l ${theme.matrixBorder} p-1 ${theme.textPrimary}`}>الدرجة بالكتابة</div>
          <div className={`col-span-3 border-l ${theme.matrixBorder} p-1 ${theme.textPrimary}`}>توقيع المصحح</div>
          <div className={`col-span-2 border-l ${theme.matrixBorder} p-1 ${theme.textPrimary}`}>توقيع المراجع</div>
          <div className={`col-span-2 p-1 ${theme.textPrimary}`}>الدرجة الكلية: <span className={`${theme.accentText} text-xs font-black`}>{meta.marks || '50'}</span></div>
        </div>

      </div>
      
      {/* Tear/Cut Section Line */}
      <div className={`w-full flex items-center justify-between text-[9px] ${theme.cutText} font-mono my-1 select-none overflow-hidden`}>
        <span className="shrink-0 pl-2">قـــص هنـــــــاء - - - - - - - - - - - - - - -</span>
        <span className="shrink-0 border-t border-dashed border-neutral-300 flex-1 mx-2"></span>
        <span className="shrink-0">✂ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span>
        <span className="shrink-0 border-t border-dashed border-neutral-300 flex-1 mx-2"></span>
        <span className="shrink-0 pr-2">- - - - - - - - - - - - - - - قـــص هنـــــــاء</span>
      </div>

      {/* Intro Question row with question/answer guide */}
      <div className={`w-full flex justify-between border-b-2 ${theme.mainBorder} mt-1 mb-2 px-3 py-1 ${theme.introBg} ${theme.introText} rounded transition-colors`}>
        <div className="text-[11px] font-black w-24 text-center">الدرجة بالدرجات</div>
        <div className="flex-1 text-center text-[11px] font-extrabold tracking-wide">
          أجب مستعيناً بالله العلي القدير عن جميع الأسئلة التالية:
        </div>
        <div className="text-[11px] font-black w-24 text-center">رقم السؤال</div>
      </div>
    </div>
  );
};

export const MinisterialFooter = () => {
  const { document } = useEditorStore();
  const meta = document.metadata;
  const theme = getMinisterialTheme(meta);

  return (
    <div className="w-full flex flex-col items-center mt-auto pb-4 px-4 select-none" dir="rtl">
      <div className={`w-full border-t-2 ${theme.borderStyle} ${theme.mainBorder} mb-2`}></div>
      
      {/* High-fidelity official signatures layout */}
      <div className="w-full grid grid-cols-3 text-center text-[11px] font-bold text-black mt-2 gap-4">
        <div className="flex flex-col items-center">
          <span className="text-neutral-500 font-bold">معد الإختبار (المعلم)</span>
          <span className={`mt-1 font-black ${theme.textPrimary}`}>أ/ {meta.teacherName || '................'}</span>
          <span className="text-[9px] text-neutral-400 mt-2 font-medium">التوقيع: .....................</span>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <span className={`${theme.badgeText} font-black text-[12px] py-1 border-y border-dashed ${theme.badgeBorder} px-3 ${theme.badgeBg} rounded transition-all duration-300`}>
            انتهت الأسئلة وبحمد الله وتوفيقه
          </span>
          <span className="text-[9px] text-neutral-400 mt-2 font-medium">محرر الرقيم - ذكي وبسيط</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-neutral-500 font-sans font-bold font-sans">مدير المدرسة</span>
          <span className={`mt-1 font-black ${theme.textPrimary}`}>{meta.schoolPrincipal || '................'}</span>
          <span className="text-[9px] text-neutral-400 mt-2 font-medium">الختم والتوقيع: .....................</span>
        </div>
      </div>
    </div>
  );
};

export const PrivateHeader = () => {
  const { document } = useEditorStore();
  const meta = document.metadata;

  return (
    <div className="w-full flex flex-col items-center select-none bg-white p-3" dir="rtl">
      <div className="w-full border-2 border-indigo-600 rounded-2xl p-4 flex justify-between items-center bg-indigo-50/25">
        <div className="text-right text-[11px] font-bold leading-relaxed">
          <div className="text-indigo-700 text-sm font-black mb-1">{meta.school || 'مدرسة الرقيم النموذجية'}</div>
          <div>المادة: <span className="text-slate-700 font-semibold">{meta.subject || 'الرياضيات'}</span></div>
          <div>الصف: <span className="text-slate-700 font-semibold">{meta.grade || 'التاسع الأساسي'}</span></div>
        </div>
        <div className="text-center">
          <div className="text-sm font-black text-slate-800 tracking-wide mb-1">{meta.examTitle || 'اختبار نهاية الفصل الدراسي'}</div>
          <div className="text-[10px] text-indigo-600 font-extrabold bg-indigo-100/60 px-3 py-1 rounded-full">
            زمن الاختبار: {meta.time || 'ساعتان'}
          </div>
        </div>
        <div className="text-left text-[11px] font-bold leading-relaxed">
          <div>العام الدراسي: <span className="text-slate-700 font-semibold">{meta.academicYear || '2025/2026م'}</span></div>
          <div className="text-rose-600 mt-1">الدرجة الكلية: <span className="text-rose-700 text-sm font-black">{meta.marks || '50'}</span></div>
        </div>
      </div>
      
      {/* Student Details */}
      <div className="w-full mt-2 border border-dashed border-indigo-300 rounded-xl p-2.5 flex justify-between bg-slate-50/50 text-[11px] font-bold text-slate-600">
        <div>اسم الطالب: ................................................................</div>
        <div>الشعبة: ( {meta.division || 'أ'} )</div>
        <div>رقم الجلوس: ....................</div>
      </div>

      <div className="w-full border-b-2 border-indigo-600 my-2"></div>
    </div>
  );
};

export const PrivateFooter = () => {
  const { document } = useEditorStore();
  const meta = document.metadata;

  return (
    <div className="w-full flex justify-between px-8 py-3 bg-slate-50 border-t border-slate-100 mt-auto text-[11px] font-bold" dir="rtl">
      <div className="text-indigo-600">
        تمنياتنا لكم بالنجاح والتفوق الإبداعي
      </div>
      <div className="text-slate-700">
        معد المادة: أ/ {meta.teacherName || ' سهيل الهزبري'}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. AUTOMATED EXAM QUESTION SHEET TEMPLATE (امتحان أسئلة مؤتمت وزارية) */
/* -------------------------------------------------------------------------- */
export const AutomatedHeader = () => {
  const { document } = useEditorStore();
  const meta = document.metadata;
  const theme = getMinisterialTheme(meta);

  return (
    <div className="w-full flex flex-col items-center select-none bg-white p-2 font-sans" dir="rtl">
      {/* Corner OMR Registration Calibration Markers */}
      <div className="w-full flex justify-between items-center mb-1">
        <div className="w-4 h-4 bg-slate-900 rounded-xs shadow-xs" title="OMR Alignment Marker"></div>
        <div className="text-[10px] font-black tracking-widest text-slate-900 bg-slate-100 px-3 py-0.5 rounded border border-slate-400">
          نموذج أسئلة مؤتمت - OMR FORMAT
        </div>
        <div className="w-4 h-4 bg-slate-900 rounded-xs shadow-xs" title="OMR Alignment Marker"></div>
      </div>

      {/* Main Container */}
      <div className={`w-full ${theme.mainBorder} ${theme.borderStyle} ${theme.borderWidth} p-2 flex flex-col transition-all duration-300 relative bg-white`}>
        
        {/* Top Information Row */}
        <div className="flex w-full justify-between items-stretch">
          
          {/* Right Column - Ministry & School Info */}
          <div className={`w-[32%] text-[11px] font-bold leading-relaxed text-right ${theme.textPrimary} flex flex-col justify-between`}>
            <div>الجمهورية اليمنية</div>
            <div>وزارة التربية والتعليم - قطاع المناهج والتوجيه</div>
            <div>مكتب التربية والتعليم م/ <span className="font-extrabold">{meta.governorate || 'صنعاء'}</span></div>
            <div>إدارة الاختبارات بمديرية/ <span className="font-extrabold">{meta.directorate || 'الأمانة'}</span></div>
            <div>مدرسة/ <span className="font-extrabold">{meta.school || '...............................'}</span></div>
          </div>

          {/* Center Column - Eagle Emblem, Exam Title & Model Badge */}
          <div className="w-[36%] flex flex-col items-center justify-center border-x border-slate-300 px-2 text-center">
            {/* Eagle Emblem */}
            <svg viewBox="0 0 100 85" className={`w-12 h-9 ${theme.eagleColor} mb-1`} fill="currentColor">
              <path d="M50 10 L54 22 L66 12 L61 28 L78 18 L68 35 L85 30 L72 45 L80 54 L60 50 L56 65 L50 53 L44 65 L40 50 L20 54 L28 45 L15 30 L32 35 L22 18 L39 28 L34 12 L46 22 Z" />
              <ellipse cx="50" cy="38" rx="8" ry="10" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="50" y1="28" x2="50" y2="48" stroke="currentColor" strokeWidth="1" />
              <path d="M25 65 Q50 73 75 65 L73 61 Q50 68 27 61 Z" />
            </svg>

            <div className={`border-2 ${theme.boxBorder} p-1.5 w-full ${theme.boxBg} rounded-xl shadow-xs transition-colors`}>
              <h2 className={`text-[12px] font-black ${theme.textPrimary} leading-tight`}>
                {meta.examTitle || 'اختبار أتمتة موحد - اختيار من متعدد'}
              </h2>
              <div className={`text-[10px] font-bold ${theme.textSecondary} mt-0.5`}>
                المادة: <span className="font-black underline">{meta.subject || 'الرياضيات'}</span> | {meta.semester || 'الفصل الأول'}
              </div>
            </div>

            {/* Model Badge */}
            <div className="mt-1.5 flex items-center gap-1.5 bg-rose-600 text-white px-4 py-1 rounded-full shadow-xs text-xs font-black">
              <span>رمز النموذج:</span>
              <span className="text-amber-300 text-sm font-extrabold underline"> ( {meta.modelCode || 'أ'} ) </span>
            </div>
          </div>

          {/* Left Column - Exam Parameters & System Info */}
          <div className={`w-[32%] text-[11px] font-bold leading-relaxed text-right pr-4 ${theme.textPrimary} flex flex-col justify-between`}>
            <div>الصف: <span className="font-extrabold">{meta.grade || 'الثالث الثانوي العلمي'}</span></div>
            <div>الشعبة / المجموعة: <span className="font-extrabold">{meta.division || 'أ'}</span></div>
            <div>الزمن المحدد: <span className="font-extrabold">{meta.time || 'ساعتان'}</span></div>
            <div>العلامة الكلية: <span className="font-black text-rose-600">{meta.marks || '100'} درجة</span></div>
            <div>العام الدراسي: <span className="font-extrabold">{meta.academicYear || '2025/2026م'}</span></div>
          </div>
        </div>

        {/* Instructions Banner for Automated Exam */}
        <div className="w-full mt-2.5 bg-amber-50 border border-amber-300 rounded-xl p-2 text-[10px] font-bold text-amber-900 leading-normal">
          <div className="font-black text-amber-950 flex items-center gap-1 mb-0.5">
            <span>⚠️ تعليمات وتنبيهات ورقة الأتمتة والتظليل الإلكتروني (OMR):</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[9.5px]">
            <div>• إجابة كل سؤال تتم باختيار بديل واحد فقط ( أ ، ب ، ج ، د ) وتظليله بحذر.</div>
            <div>• استخدم القلم الجاف (الأزرق أو الأسود) للتظليل التام للدائرة المقابلة.</div>
            <div>• احذر الشطب أو وضع علامات مثل ( ✓ ) أو ( ✕ ) داخل الدوائر.</div>
            <div>• التأكد من تطابق رمز نموذج الأسئلة ( {meta.modelCode || 'أ'} ) مع ورقة الإجابة.</div>
          </div>
        </div>

      </div>

      <div className={`w-full flex justify-between border-b-2 ${theme.mainBorder} mt-1.5 mb-2 px-3 py-1 ${theme.introBg} ${theme.introText} rounded-lg transition-colors`}>
        <div className="text-[11px] font-black w-24 text-center">علامة السؤال</div>
        <div className="flex-1 text-center text-[11px] font-extrabold tracking-wide">
          اختر الإجابة الصحيحة لكل من الأسئلة الآتية ثم ظلل الرمز المقابل لها في ورقة التظليل:
        </div>
        <div className="text-[10px] font-bold w-28 text-left">النموذج ( {meta.modelCode || 'أ'} )</div>
      </div>
    </div>
  );
};

export const AutomatedFooter = () => {
  const { document } = useEditorStore();
  const meta = document.metadata;

  return (
    <div className="w-full flex flex-col items-center mt-auto pb-4 px-4 select-none font-sans" dir="rtl">
      <div className="w-full border-t-2 border-double border-slate-900 mb-2"></div>
      
      <div className="w-full grid grid-cols-3 text-center text-[11px] font-bold text-slate-900 mt-1 gap-4">
        <div className="flex flex-col items-center">
          <span className="text-neutral-500 font-bold">لجنة إعداد وتدقيق الأسئلة</span>
          <span className="mt-1 font-black text-slate-900">أ/ {meta.teacherName || '................'}</span>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <span className="text-emerald-700 font-black text-[12px] py-1 border-y border-dashed border-emerald-300 px-4 bg-emerald-50 rounded-full">
            انتهت الأسئلة - تأكد من نقل إجاباتك لورقة التظليل
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-neutral-500 font-bold">اعتماد رئيس الكنترول</span>
          <span className="mt-1 font-black text-slate-900">{meta.schoolPrincipal || '................'}</span>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. OMR BUBBLE SHEET ANSWER FORM TEMPLATE (ورقة الإجابة والتظليل المؤتمتة) */
/* -------------------------------------------------------------------------- */
export const BubbleSheetHeader = () => {
  const { document } = useEditorStore();
  const meta = document.metadata;

  return (
    <div className="w-full flex flex-col items-center select-none bg-white p-3 font-sans" dir="rtl">
      {/* 4 Corner OMR Alignment Markers for ZipGrade / Scanner Calibration */}
      <div className="w-full flex justify-between items-center mb-1">
        <div className="w-5 h-5 bg-black rounded-xs shadow-xs" title="OMR Scanner Top-Right Anchor"></div>
        <div className="text-[11px] font-black tracking-widest text-slate-900 bg-slate-100 border-2 border-slate-900 px-4 py-1 rounded-xl shadow-xs">
          ورقة إجابة وتظليل مؤتمتة ( OMR ANSWER SHEET )
        </div>
        <div className="w-5 h-5 bg-black rounded-xs shadow-xs" title="OMR Scanner Top-Left Anchor"></div>
      </div>

      {/* Main Outer Box */}
      <div className="w-full border-4 border-slate-900 rounded-2xl p-3 flex flex-col gap-3 bg-white">
        
        {/* Top Header & Student Info Row */}
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3 gap-3">
          
          {/* Right: School & Subject info */}
          <div className="flex-1 text-right text-[11px] font-bold leading-relaxed text-slate-900">
            <div className="text-sm font-black text-slate-950 mb-0.5">{meta.school || 'وزارة التربية والتعليم'}</div>
            <div>المادة: <span className="font-extrabold underline">{meta.subject || 'الرياضيات'}</span></div>
            <div>الصف: <span className="font-extrabold">{meta.grade || 'الثالث الثانوي العلمي'}</span></div>
            <div>العام الدراسي: <span className="font-extrabold">{meta.academicYear || '2025/2026م'}</span></div>
            <div className="mt-1">اسم الطالب رباعياً: <span className="inline-block border-b border-dotted border-slate-800 w-48"></span></div>
          </div>

          {/* Center: Model Code Selection Box */}
          <div className="border-2 border-slate-900 bg-slate-50 p-2 rounded-xl flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-black text-slate-900 mb-1">رمز النموذج ( Key Version )</span>
            <div className="flex gap-2">
              {['أ', 'ب', 'ج', 'د'].map((code) => {
                const isCurrent = (meta.modelCode || 'أ') === code;
                return (
                  <div key={code} className="flex flex-col items-center gap-0.5">
                    <span className="text-[10px] font-black">{code}</span>
                    <div className={`w-6 h-6 rounded-full border-2 border-slate-900 flex items-center justify-center font-black text-xs ${
                      isCurrent ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
                    }`}>
                      {isCurrent ? '●' : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Left: Student ID Bubble Matrix Grid (رقم الجلوس) */}
          <div className="border-2 border-slate-900 rounded-xl p-2 bg-slate-50 flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-900 mb-1">تظليل رقم الجلوس ( Student ID )</span>
            <div className="flex gap-1" dir="ltr">
              {[1, 2, 3, 4, 5].map((colIndex) => (
                <div key={colIndex} className="flex flex-col items-center gap-0.5 border-r border-slate-200 last:border-0 pr-0.5">
                  <div className="w-4 h-4 border border-slate-400 bg-white text-[9px] font-black text-center leading-3 mb-0.5"></div>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                    <div key={digit} className="w-3.5 h-3.5 rounded-full border border-slate-800 bg-white flex items-center justify-center text-[7px] font-bold text-slate-700">
                      {digit}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Answer Bubble Grid (50 Questions Layout in 2 Columns) */}
        <div className="w-full grid grid-cols-2 gap-4" dir="rtl">
          {/* Column 1: Questions 1 to 25 */}
          <div className="border border-slate-800 rounded-xl p-2 bg-slate-50/50 space-y-1">
            <div className="grid grid-cols-12 text-[10px] font-black text-center border-b border-slate-300 pb-1 mb-1 text-slate-700">
              <span className="col-span-2">رقم</span>
              <span className="col-span-10 grid grid-cols-4 text-center">
                <span>أ</span><span>ب</span><span>ج</span><span>د</span>
              </span>
            </div>
            {Array.from({ length: 25 }, (_, i) => i + 1).map((qNum) => (
              <div key={qNum} className="grid grid-cols-12 items-center text-center text-[11px] font-bold py-0.5 border-b border-slate-100 last:border-0 hover:bg-slate-100/80 rounded">
                <span className="col-span-2 text-slate-900 font-extrabold">{qNum}</span>
                <div className="col-span-10 grid grid-cols-4 items-center justify-items-center">
                  {['أ', 'ب', 'ج', 'د'].map((opt) => (
                    <div key={opt} className="w-4 h-4 rounded-full border border-slate-900 bg-white flex items-center justify-center text-[8px] font-bold text-slate-800 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer" title={`سؤال ${qNum} خيار ${opt}`}>
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Questions 26 to 50 */}
          <div className="border border-slate-800 rounded-xl p-2 bg-slate-50/50 space-y-1">
            <div className="grid grid-cols-12 text-[10px] font-black text-center border-b border-slate-300 pb-1 mb-1 text-slate-700">
              <span className="col-span-2">رقم</span>
              <span className="col-span-10 grid grid-cols-4 text-center">
                <span>أ</span><span>ب</span><span>ج</span><span>د</span>
              </span>
            </div>
            {Array.from({ length: 25 }, (_, i) => i + 26).map((qNum) => (
              <div key={qNum} className="grid grid-cols-12 items-center text-center text-[11px] font-bold py-0.5 border-b border-slate-100 last:border-0 hover:bg-slate-100/80 rounded">
                <span className="col-span-2 text-slate-900 font-extrabold">{qNum}</span>
                <div className="col-span-10 grid grid-cols-4 items-center justify-items-center">
                  {['أ', 'ب', 'ج', 'د'].map((opt) => (
                    <div key={opt} className="w-4 h-4 rounded-full border border-slate-900 bg-white flex items-center justify-center text-[8px] font-bold text-slate-800 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer" title={`سؤال ${qNum} خيار ${opt}`}>
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Corner Anchors */}
      <div className="w-full flex justify-between items-center mt-1">
        <div className="w-5 h-5 bg-black rounded-xs shadow-xs" title="OMR Scanner Bottom-Right Anchor"></div>
        <div className="text-[9px] font-bold text-slate-400">محرر الرقيم - نظام أتمتة وتظليل الامتحانات المعتمد</div>
        <div className="w-5 h-5 bg-black rounded-xs shadow-xs" title="OMR Scanner Bottom-Left Anchor"></div>
      </div>
    </div>
  );
};
