/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * الرقيم التربوي - نظام التصميم الموحد (Raqeem Design System Tokens)
 * معايير الهوية البصرية، الألوان السيادية، التايبوغرافي، المسافات، ونظام التجاوب.
 * برمجة وتصميم وتطوير المهندس سهيل الهزبري
 */

export const RAQEEM_DESIGN_TOKENS = {
  name: 'محرر الرقيم التربوي',
  version: '2.0.0',
  description: 'نظام تصميم مؤسسي وتقني سيادي للمنظومة التعليمية',
  
  // 1. Color Palette (Sovereign Educational Technology)
  colors: {
    // Primary Sovereign Brand (كحلي بحري سيادي رصين)
    primary: {
      50: '#f0f7fa',
      100: '#d9ecf3',
      200: '#b8dbe9',
      300: '#86c2db',
      400: '#4fa1c7',
      500: '#2b84b1',
      600: '#1d6a95',
      700: '#004B6E', // Sovereign Base
      800: '#003B57', // Hover
      900: '#002B40', // Active
      950: '#001a28',
    },
    // Secondary Sovereign Accent (زمردي تعليمي وطني)
    secondary: {
      50: '#edfcf7',
      100: '#d3f8ec',
      200: '#acf0da',
      300: '#75e2c2',
      400: '#3acba6',
      500: '#19ae8c',
      600: '#0e8c71',
      700: '#0D7A68', // Base
      800: '#0c6153',
      900: '#0c5046',
    },
    // Sovereign Gold / Amber for accolades and official badges
    amber: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
    },
    // Functional States
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#0284c7',
  },

  // 2. Responsive Breakpoints
  breakpoints: {
    xs: '320px',    // Small Mobile
    sm: '640px',    // Large Mobile
    md: '768px',    // Tablet Portrait
    lg: '1024px',   // Tablet Landscape / Small Desktop
    xl: '1280px',   // Desktop
    '2xl': '1536px',// Large Desktop
    max: '1920px',  // Maximum layout constraint
  },

  // 3. Spacing Scale (8pt Grid Standard)
  spacing: {
    none: '0',
    '3xs': '2px',
    '2xs': '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },

  // 4. Border Radii
  radii: {
    none: '0',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    full: '9999px',
  },

  // 5. Typography Specs
  typography: {
    fontFamily: {
      sans: '"Cairo", "Noto Naskh Arabic", ui-sans-serif, system-ui, -apple-system, sans-serif',
      naskh: '"Noto Naskh Arabic", "Amiri", serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // 6. Safe Area Environment CSS Helpers
  safeArea: {
    top: 'env(safe-area-inset-top, 0px)',
    bottom: 'env(safe-area-inset-bottom, 0px)',
    left: 'env(safe-area-inset-left, 0px)',
    right: 'env(safe-area-inset-right, 0px)',
  }
};
