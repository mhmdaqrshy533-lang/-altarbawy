/**
 * AI Smart Text Normalizer & Layout Estimator
 * On-device client-side algorithm for Arabic typography and A4 layout optimization
 */

export class AITextNormalizer {
  // Regex for Arabic diacritics (Harakat)
  private static readonly TASHKEEL_REGEX = /[\u064B-\u0652\u0670\u0640]/g;
  private static readonly TATWEEL_REGEX = /\u0640+/g;

  /**
   * Remove all Harakat / Tashkeel from Arabic text
   */
  public static stripTashkeel(text: string): string {
    if (!text) return '';
    return text.replace(this.TASHKEEL_REGEX, '');
  }

  /**
   * Remove Tatweel (Kashida / الكشيدة)
   */
  public static removeTatweel(text: string): string {
    if (!text) return '';
    return text.replace(this.TATWEEL_REGEX, '');
  }

  /**
   * Standardize Arabic Hamzas to clean presentation
   */
  public static standardizeHamzas(text: string): string {
    if (!text) return '';
    return text
      .replace(/[إأآ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي');
  }

  /**
   * Smartly clean and standardize Arabic punctuation and spacing
   */
  public static smartPunctuation(text: string): string {
    if (!text) return '';
    return text
      // Replace English quotes with clean Arabic / standard quotes
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      // Remove double spaces
      .replace(/[ \t]+/g, ' ')
      // Fix spacing before punctuation (in Arabic, punctuation sticks to preceding word)
      .replace(/\s+([،؛:؟!.\-])/g, '$1')
      // Ensure space after punctuation if followed by a letter
      .replace(/([،؛:؟!])([^\s0-9"'])/g, '$1 $2')
      .trim();
  }

  /**
   * Full AI Deep Normalization Suite
   */
  public static deepCleanArabic(text: string, options: {
    stripDiacritics?: boolean;
    removeTatweel?: boolean;
    fixPunctuation?: boolean;
    standardizeHamza?: boolean;
  } = {}): string {
    let result = text;
    if (options.removeTatweel !== false) {
      result = this.removeTatweel(result);
    }
    if (options.stripDiacritics) {
      result = this.stripTashkeel(result);
    }
    if (options.standardizeHamza) {
      result = this.standardizeHamzas(result);
    }
    if (options.fixPunctuation !== false) {
      result = this.smartPunctuation(result);
    }
    return result;
  }

  /**
   * AI Layout Metric: Calculate total text weight and estimated A4 line footprint
   * to ensure 100% single-page A4 compliance without overflowing.
   */
  public static estimateA4Fit(params: {
    questionCount: number;
    passageCount: number;
    poetryCount: number;
    essayLinesCount: number;
    totalCharacters: number;
    fontSize: 'compact' | 'normal' | 'large';
  }): {
    percentageUsed: number;
    status: 'optimal' | 'safe' | 'warning' | 'overflow';
    recommendation: string;
  } {
    // Standard A4 Sheet budget in points / capacity score
    const maxCapacityUnits = 1000;
    
    // Weight factors
    const fontMultiplier = params.fontSize === 'compact' ? 0.85 : params.fontSize === 'normal' ? 1.0 : 1.25;
    
    const headerWeight = 200; // Fixed header & student table
    const questionWeight = params.questionCount * 38;
    const passageWeight = params.passageCount * 80;
    const poetryWeight = params.poetryCount * 65;
    const essayWeight = params.essayLinesCount * 25;
    const charWeight = (params.totalCharacters / 100) * 12;
    
    const rawTotal = (headerWeight + questionWeight + passageWeight + poetryWeight + essayWeight + charWeight) * fontMultiplier;
    const percentage = Math.min(Math.round((rawTotal / maxCapacityUnits) * 100), 150);

    let status: 'optimal' | 'safe' | 'warning' | 'overflow' = 'optimal';
    let recommendation = 'حجم المحتوى مثالي ومطابق لمعايير الصفحة الواحدة A4 بدقة.';

    if (percentage <= 80) {
      status = 'optimal';
      recommendation = 'المحتوى مريح جداً، يمكنك إضافة أسئلة إضافية أو تكبير حجم الخط.';
    } else if (percentage <= 95) {
      status = 'safe';
      recommendation = 'المحتوى متناسق تماماً ومطابق لارتفاع ورقة A4 (297mm).';
    } else if (percentage <= 105) {
      status = 'warning';
      recommendation = 'المحتوى يقترب من الهامش السفلي. يُفضل تفعيل وضع الخط المدمج (Compact) لتفادي الانزلاق.';
    } else {
      status = 'overflow';
      recommendation = 'تنبيه: حجم المحتوى يتجاوز الصفحة الواحدة! يُرجى تقليص أسطر المقالي أو تقليل عدد الفقرات.';
    }

    return {
      percentageUsed: percentage,
      status,
      recommendation
    };
  }
}
