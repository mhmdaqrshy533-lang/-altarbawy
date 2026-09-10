import React from 'react';

// Official Republic of Yemen Emblem (الطير الجمهوري)
export const YemeniEagleEmblem: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 48 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Eagle Body & Wings Gold & Red Foil Style */}
    <path d="M50 20 L58 35 L75 25 L65 42 L88 45 L70 58 L92 68 L65 72 L50 90 L35 72 L8 68 L30 58 L12 45 L35 42 L25 25 L42 35 Z" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
    {/* Chest Shield with Marib Dam & Coffee Plant Motif */}
    <path d="M40 45 Q50 40 60 45 L60 62 Q50 72 40 62 Z" fill="#DC2626" stroke="#B91C1C" strokeWidth="1.5" />
    <path d="M40 54 H60" stroke="#FFFFFF" strokeWidth="2" />
    <path d="M40 58 Q50 68 60 58" fill="#059669" />
    {/* Head Facing Left */}
    <circle cx="50" cy="24" r="7" fill="#F59E0B" />
    <path d="M47 22 L41 24 L47 26 Z" fill="#78350F" />
    {/* Wreath & Scroll Ribbons */}
    <path d="M30 82 Q50 92 70 82" stroke="#D97706" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

// Official Ministry Seal (شعار وزارة التربية والتعليم)
export const MinistrySeal: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <div 
    style={{ width: size, height: size }} 
    className="rounded-full bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 p-0.5 shadow-md flex items-center justify-center shrink-0 border border-amber-700/40"
  >
    <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center text-[7px] font-black text-amber-200 text-center leading-none p-1 border border-amber-400/40">
      <span className="text-[6px] tracking-tighter text-amber-400">وزارة</span>
      <span className="text-[7.5px] font-black text-white py-0.5">التربية</span>
      <span className="text-[6px] text-amber-300">والتعليم</span>
    </div>
  </div>
);

// Holy Quran on Wooden Stand (المصحف الشريف)
export const QuranOnStandGraphic: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <div className="relative flex flex-col items-center justify-center py-2" style={{ width: size, height: size }}>
    {/* Radial Light Halo */}
    <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/30 via-emerald-300/20 to-sky-400/30 rounded-full blur-xl animate-pulse" />
    
    {/* Quran Book Open SVG */}
    <svg viewBox="0 0 100 100" width={size * 0.85} height={size * 0.85} fill="none" className="relative z-10 drop-shadow-xl">
      {/* Wooden Rehal / Stand */}
      <path d="M20 75 L50 55 L80 75 M25 82 L50 62 L75 82 M35 88 L50 72 L65 88" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
      <path d="M20 75 L25 82 M80 75 L75 82" stroke="#451A03" strokeWidth="3" />
      
      {/* Left Page */}
      <path d="M12 40 Q32 30 48 44 L48 62 Q32 48 12 58 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
      {/* Right Page */}
      <path d="M88 40 Q68 30 52 44 L52 62 Q68 48 88 58 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
      {/* Book Cover Spine Gold Backing */}
      <path d="M10 42 Q32 32 48 46 L50 48 L52 46 Q68 32 90 42 L88 60 Q68 50 52 64 L50 65 L48 64 Q32 50 12 60 Z" fill="#047857" stroke="#065F46" strokeWidth="1" />
      
      {/* Arabesque Text Lines */}
      <line x1="20" y1="45" x2="40" y2="39" stroke="#92400E" strokeWidth="1" strokeDasharray="2 1" />
      <line x1="20" y1="50" x2="42" y2="44" stroke="#92400E" strokeWidth="1" strokeDasharray="2 1" />
      <line x1="60" y1="39" x2="80" y2="45" stroke="#92400E" strokeWidth="1" strokeDasharray="2 1" />
      <line x1="58" y1="44" x2="80" y2="50" stroke="#92400E" strokeWidth="1" strokeDasharray="2 1" />

      {/* Center Ray Rays */}
      <circle cx="50" cy="30" r="16" fill="url(#sunRay)" opacity="0.4" />
      <defs>
        <radialGradient id="sunRay" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

// Islamic Mihrab Arch Frame (القوس المحرابي الزخرفي)
export const IslamicMihrabArch: React.FC = () => (
  <svg className="absolute inset-x-2 top-12 h-64 w-[calc(100%-16px)] pointer-events-none opacity-25" viewBox="0 0 200 240" fill="none">
    <path 
      d="M10 230 V 90 Q 10 40 100 10 Q 190 40 190 90 V 230" 
      stroke="#047857" 
      strokeWidth="3" 
      strokeDasharray="6 3" 
    />
    <path 
      d="M18 230 V 95 Q 18 48 100 20 Q 182 48 182 95 V 230" 
      stroke="#D97706" 
      strokeWidth="1.5" 
    />
    {/* Dome Finial Crescent */}
    <circle cx="100" cy="10" r="6" fill="#D97706" />
  </svg>
);

// Geometry Compass & Protractor Graphic (الرياضيات)
export const MathGeometryGraphic: React.FC<{ size?: number }> = ({ size = 110 }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" className="drop-shadow-md">
      {/* Outer Protractor Semi-Circle */}
      <path d="M10 70 A40 40 0 0 1 90 70 H10 Z" fill="#3B82F6" fillOpacity="0.15" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M25 70 A25 25 0 0 1 75 70" stroke="#2563EB" strokeWidth="1" strokeDasharray="3 2" />
      
      {/* Degree Ticks */}
      <line x1="50" y1="30" x2="50" y2="35" stroke="#1D4ED8" strokeWidth="1.5" />
      <line x1="22" y1="42" x2="26" y2="45" stroke="#1D4ED8" strokeWidth="1.5" />
      <line x1="78" y1="42" x2="74" y2="45" stroke="#1D4ED8" strokeWidth="1.5" />

      {/* Compass Leg (الفرجار) */}
      <path d="M50 20 L25 78 M50 20 L72 78" stroke="#C2410C" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="20" r="5" fill="#EA580C" />
      <path d="M32 60 H65" stroke="#D97706" strokeWidth="1.5" />

      {/* Geometric Angle Arc */}
      <path d="M38 70 A15 15 0 0 1 62 70" stroke="#059669" strokeWidth="2" fill="none" />
    </svg>
  </div>
);

// Historical / Geographical Landmark Artwork (معالم اليمن)
export const YemeniLandmarksGraphic: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <div className="relative flex items-center justify-center p-2" style={{ width: size, height: size }}>
    <svg viewBox="0 0 120 100" width={size} height={size * 0.83} fill="none" className="drop-shadow-md">
      {/* Sana'a Minaret & Old Architecture Silhouette */}
      <rect x="50" y="20" width="12" height="60" fill="#78350F" rx="2" />
      <path d="M48 20 L56 8 L64 20 Z" fill="#D97706" />
      <circle cx="56" cy="6" r="3" fill="#F59E0B" />
      
      {/* Bab Al Yemen Arch Gate */}
      <path d="M15 80 V 50 Q 30 35 45 50 V 80 H 15 Z" fill="#92400E" />
      <path d="M22 80 V 60 Q 30 50 38 60 V 80 Z" fill="#FEF3C7" />

      {/* Dar Al Hajar Rock Foundation */}
      <path d="M72 80 L75 55 L105 55 L108 80 Z" fill="#57534E" />
      <rect x="78" y="38" width="22" height="17" fill="#B45309" />
      <path d="M78 38 L89 28 L100 38 Z" fill="#D97706" />

      {/* Decorative Wave/Mountain Coast Base */}
      <path d="M5 85 Q30 75 60 85 T115 85 V 95 H 5 Z" fill="#0284C7" fillOpacity="0.8" />
    </svg>
  </div>
);
