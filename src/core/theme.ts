/**
 * Central Unified Design Tokens for Raqeem Platform
 * المنصة الوطنية للوثائق التعليمية - الرقيم
 */

export const DESIGN_TOKENS = {
  colors: {
    // Primary Brand Colors
    primaryNavy: '#004B6E',
    primaryDark: '#003650',
    primaryHover: '#003D5B',
    cyanEducational: '#38BDF8',
    cyanLight: '#F0F9FF',
    
    // Status & Functional Colors
    success: '#10B981',
    successLight: '#ECFDF5',
    warningAmber: '#F59E0B',
    warningLight: '#FFFBEB',
    danger: '#EF4444',
    dangerLight: '#FEF2F2',
    academicPurple: '#8B5CF6',
    academicPurpleLight: '#F5F3FF',

    // Neutrals
    background: '#F8FAFC',
    cardBg: '#FFFFFF',
    border: '#E2E8F0',
    borderHover: '#CBD5E1',

    // Typography Text
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    textDisabled: '#CBD5E1',
  },

  radius: {
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    full: '9999px',
  },

  shadows: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },

  typography: {
    fontFamily: 'Cairo, Tajawal, "IBM Plex Sans Arabic", system-ui, sans-serif',
    scale: {
      display: 'text-3xl lg:text-4xl font-black leading-tight',
      h1: 'text-2xl lg:text-3xl font-black leading-snug',
      h2: 'text-xl lg:text-2xl font-black leading-snug',
      h3: 'text-lg font-black leading-normal',
      sectionTitle: 'text-base font-black leading-normal',
      cardTitle: 'text-sm font-black leading-snug',
      body: 'text-xs font-bold leading-relaxed',
      caption: 'text-[11px] font-bold leading-normal',
      label: 'text-[10px] font-black tracking-wider uppercase',
      kpiNum: 'text-2xl font-black tracking-tight font-mono',
    }
  }
};
