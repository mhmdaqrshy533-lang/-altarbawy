/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Vision Engine for Path Smoothing and SVG Generation
// يحاكي محرك التصحيح البصري (OpenCV) لتحويل الرسم اليدوي إلى رسومات هندسية احترافية
export class VisionEngine {
  
  // خوارزمية تنعيم المسار (Path Smoothing) 
  public static smoothPath(points: {x: number, y: number}[]): string {
    if (points.length === 0) return '';
    if (points.length < 3) {
      return `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
    }

    let d = `M ${points[0].x},${points[0].y} `;
    
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = i > 0 ? points[i - 1] : points[0];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = i != points.length - 2 ? points[i + 2] : p2;

      // حساب نقاط التحكم
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y} `;
    }

    return d;
  }

  // تحويل المسار إلى SVG جاهز للطباعة
  public static generateSVG(points: {x: number, y: number}[], strokeColor = '#4c1d95', strokeWidth = 3): string {
    const path = this.smoothPath(points);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 500 500">
      <path d="${path}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`;
  }
}
