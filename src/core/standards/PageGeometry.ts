/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * محرر الرقيم التربوي - المصدر الموحد لقياسات وهندسة الصفحات (PageGeometry)
 * Unified Single Source of Truth for Page Dimensions, DPI, Margins, and Coordinates.
 * برمجة وتصميم وتطوير المهندس سهيل الهزبري
 */

export const DPI_SCREEN = 96;
export const DPI_PRINT = 300;
export const MM_PER_INCH = 25.4;

export interface PaperDimensions {
  widthMm: number;
  heightMm: number;
  widthPx: number; // 96 DPI
  heightPx: number; // 96 DPI
  printWidthPx: number; // 300 DPI
  printHeightPx: number; // 300 DPI
}

export interface PageMargins {
  topMm: number;
  bottomMm: number;
  rightMm: number;
  leftMm: number;
  topPx: number;
  bottomPx: number;
  rightPx: number;
  leftPx: number;
}

export class PageGeometry {
  /**
   * تحويل من مليمتر إلى بكسل حسب الـ DPI
   */
  static mmToPx(mm: number, dpi: number = DPI_SCREEN): number {
    return Math.round((mm / MM_PER_INCH) * dpi);
  }

  /**
   * تحويل من بكسل إلى مليمتر
   */
  static pxToMm(px: number, dpi: number = DPI_SCREEN): number {
    return Number(((px / dpi) * MM_PER_INCH).toFixed(2));
  }

  /**
   * الأبعاد الفيزيائية المعيارية لورق A4
   * 210mm × 297mm = 794px × 1123px @ 96 DPI
   */
  static readonly A4: PaperDimensions = {
    widthMm: 210,
    heightMm: 297,
    widthPx: 794,
    heightPx: 1123,
    printWidthPx: 2480,
    printHeightPx: 3508,
  };

  /**
   * الأبعاد الفيزيائية المعيارية لورق A3
   * 297mm × 420mm = 1123px × 1587px @ 96 DPI
   */
  static readonly A3: PaperDimensions = {
    widthMm: 297,
    heightMm: 420,
    widthPx: 1123,
    heightPx: 1587,
    printWidthPx: 3508,
    printHeightPx: 4960,
  };

  /**
   * الأبعاد الفيزيائية المعيارية لورق A5
   * 148mm × 210mm = 559px × 794px @ 96 DPI
   */
  static readonly A5: PaperDimensions = {
    widthMm: 148,
    heightMm: 210,
    widthPx: 559,
    heightPx: 794,
    printWidthPx: 1748,
    printHeightPx: 2480,
  };

  /**
   * الأبعاد الفيزيائية لورق Letter
   * 8.5in × 11in = 215.9mm × 279.4mm = 816px × 1056px @ 96 DPI
   */
  static readonly LETTER: PaperDimensions = {
    widthMm: 215.9,
    heightMm: 279.4,
    widthPx: 816,
    heightPx: 1056,
    printWidthPx: 2550,
    printHeightPx: 3300,
  };

  /**
   * الأبعاد الفيزيائية لورق Legal
   * 8.5in × 14in = 215.9mm × 355.6mm = 816px × 1344px @ 96 DPI
   */
  static readonly LEGAL: PaperDimensions = {
    widthMm: 215.9,
    heightMm: 355.6,
    widthPx: 816,
    heightPx: 1344,
    printWidthPx: 2550,
    printHeightPx: 4200,
  };

  /**
   * الأبعاد الفيزيائية لورق B5
   * 176mm × 250mm = 665px × 945px @ 96 DPI
   */
  static readonly B5: PaperDimensions = {
    widthMm: 176,
    heightMm: 250,
    widthPx: 665,
    heightPx: 945,
    printWidthPx: 2079,
    printHeightPx: 2953,
  };

  /**
   * الحصول على أبعاد الورقة حسب الاسم والاتجاه
   */
  static getPaperDimensions(size: 'A4' | 'A3' | 'Letter' | 'Legal' | 'A5' | 'B5' = 'A4', orientation: 'portrait' | 'landscape' = 'portrait'): PaperDimensions {
    let base: PaperDimensions;
    switch (size) {
      case 'A3': base = PageGeometry.A3; break;
      case 'A5': base = PageGeometry.A5; break;
      case 'Letter': base = PageGeometry.LETTER; break;
      case 'Legal': base = PageGeometry.LEGAL; break;
      case 'B5': base = PageGeometry.B5; break;
      case 'A4':
      default: base = PageGeometry.A4; break;
    }

    if (orientation === 'landscape') {
      return {
        widthMm: base.heightMm,
        heightMm: base.widthMm,
        widthPx: base.heightPx,
        heightPx: base.widthPx,
        printWidthPx: base.printHeightPx,
        printHeightPx: base.printWidthPx,
      };
    }

    return base;
  }

  /**
   * هوامش الوثائق التعليمية الوزارية الرسمية
   * علوي: 15mm، سفلي: 15mm، أيمن وأيسر: 10mm
   */
  static readonly DEFAULT_MARGINS: PageMargins = {
    topMm: 15,
    bottomMm: 15,
    rightMm: 10,
    leftMm: 10,
    topPx: Math.round((15 / MM_PER_INCH) * DPI_SCREEN), // ~57px
    bottomPx: Math.round((15 / MM_PER_INCH) * DPI_SCREEN), // ~57px
    rightPx: Math.round((10 / MM_PER_INCH) * DPI_SCREEN), // ~38px
    leftPx: Math.round((10 / MM_PER_INCH) * DPI_SCREEN), // ~38px
  };

  /**
   * حساب المساحة القابلة للطباعة داخل الصفحة
   */
  static getPrintableArea(dimensions: PaperDimensions = PageGeometry.A4, margins: PageMargins = PageGeometry.DEFAULT_MARGINS) {
    return {
      x: margins.rightPx,
      y: margins.topPx,
      width: dimensions.widthPx - (margins.rightPx + margins.leftPx),
      height: dimensions.heightPx - (margins.topPx + margins.bottomPx),
    };
  }

  /**
   * فحص ما إذا كان العنصر يتجاوز الحد السفلي للصفحة ويحتاج إلى صفحة جديدة
   */
  static isElementOverflowingPage(
    elementY: number,
    elementHeight: number,
    pageHeightPx: number = PageGeometry.A4.heightPx,
    bottomMarginPx: number = PageGeometry.DEFAULT_MARGINS.bottomPx
  ): boolean {
    return elementY + elementHeight > (pageHeightPx - bottomMarginPx);
  }
}
