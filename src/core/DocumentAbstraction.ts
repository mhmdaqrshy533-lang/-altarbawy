/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * الرقيم التربوي - إطار عمل المستندات والصفحات الموحد (Unified Document Abstraction)
 * يضمن ثبات المقاسات المنطقية لورقة A4، التكبير النقي (Optical Zoom)، وإدارة العناصر المتخصصة.
 */

export const A4_LOGICAL_WIDTH = 794;  // 210mm @ 96 DPI
export const A4_LOGICAL_HEIGHT = 1123; // 297mm @ 96 DPI

export type ZoomPreset = 50 | 75 | 90 | 100 | 110 | 125 | 150 | 200;

export interface PaperDimensions {
  width: number;
  height: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  orientation: 'portrait' | 'landscape';
}

export const DEFAULT_A4_PORTRAIT: PaperDimensions = {
  width: A4_LOGICAL_WIDTH,
  height: A4_LOGICAL_HEIGHT,
  marginTop: 35,
  marginBottom: 35,
  marginLeft: 35,
  marginRight: 35,
  orientation: 'portrait',
};

/**
 * حساب مقياس العرض المناسب لشاشة المستخدم دون تغيير أبعاد الورقة المنطقية
 */
export function calculateFitZoom(
  containerWidth: number,
  containerHeight: number,
  padding = 40
): number {
  if (!containerWidth || !containerHeight) return 100;
  const availableW = Math.max(containerWidth - padding * 2, 300);
  const scale = availableW / A4_LOGICAL_WIDTH;
  const percentage = Math.round(scale * 100);
  // Clamp between 50% and 150%
  return Math.min(Math.max(percentage, 50), 150);
}

/**
 * علامة الرقيم الرسمية المعتمدة
 */
export const RAQEEM_OFFICIAL_CREDIT = 'محرر الرقيم الذكي — برمجة وتصميم المهندس سهيل الهزبري';
