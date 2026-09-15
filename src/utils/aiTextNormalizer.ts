/**
 * AI Smart Text Normalizer, Layout Estimator & Bloom's Taxonomy Classifier
 * On-device client-side algorithm for Arabic typography and A4 layout optimization
 */

import { BloomLevel, QuestionDifficulty } from '../types/exam';

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
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      .replace(/[ \t]+/g, ' ')
      .replace(/\s+([،؛:؟!.\-])/g, '$1')
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
   * Bloom's Taxonomy Classifier (Heuristic Keyword Analyzer for Arabic Exam Questions)
   */
  public static classifyBloomTaxonomy(questionText: string): {
    level: BloomLevel;
    arabicLabel: string;
    suggestedDifficulty: QuestionDifficulty;
  } {
    const text = questionText.toLowerCase();

    // 1. Remembering (تذكر)
    if (/^(اذكر|عدد|عرف|سم|متى|أين|ما هو|ما هي|اختر|حدد|أكمل)/.test(text) || text.includes('معنى كلمة') || text.includes('مرادف')) {
      return { level: 'remember', arabicLabel: 'تذكر واسترجاع', suggestedDifficulty: 'easy' };
    }

    // 2. Understanding (فهم واستيعاب)
    if (/^(اشرح|وضح|بين|فسر|لخص|ما الفكرة|ما المقصود|استخرج)/.test(text) || text.includes('بحسب النص') || text.includes('يدل على')) {
      return { level: 'understand', arabicLabel: 'فهم واستيعاب', suggestedDifficulty: 'medium' };
    }

    // 3. Applying (تطبيق)
    if (/^(أعرب|اضبط|طبق|زن الكلمة|حول|استخدم|صغ|ما إعراب)/.test(text) || text.includes('إعراب') || text.includes('ميزان صرفي')) {
      return { level: 'apply', arabicLabel: 'تطبيق نحوي وصرفي', suggestedDifficulty: 'medium' };
    }

    // 4. Analyzing (تحليل)
    if (/^(علل|قارن|ميز بين|ما نوع المحسن|حلل|ما الغرض|ما علاقة)/.test(text) || text.includes('محسن بديعي') || text.includes('صورة بيانية') || text.includes('استعارة') || text.includes('كناية')) {
      return { level: 'analyze', arabicLabel: 'تحليل وبلاغة', suggestedDifficulty: 'hard' };
    }

    // 5. Evaluating (تقويم)
    if (/^(ما رأيك|احكم|انقد|برهن|دلل|علل صحة|فند)/.test(text)) {
      return { level: 'evaluate', arabicLabel: 'تقويم ونقد', suggestedDifficulty: 'hard' };
    }

    // 6. Creating (ابتكار / تعبير)
    if (/^(اكتب|انشئ|صمم|اقترح|لخص بأسلوبك|عبر)/.test(text)) {
      return { level: 'create', arabicLabel: 'تركيب وتعبير كتابي', suggestedDifficulty: 'medium' };
    }

    return { level: 'understand', arabicLabel: 'فهم وتطبيق', suggestedDifficulty: 'medium' };
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
    matchingCount?: number;
    totalCharacters: number;
    fontSize: 'compact' | 'normal' | 'large';
  }): {
    percentageUsed: number;
    status: 'optimal' | 'safe' | 'warning' | 'overflow';
    recommendation: string;
  } {
    const maxCapacityUnits = 1000;
    const fontMultiplier = params.fontSize === 'compact' ? 0.82 : params.fontSize === 'normal' ? 1.0 : 1.25;
    
    const headerWeight = 190;
    const questionWeight = params.questionCount * 36;
    const passageWeight = params.passageCount * 75;
    const poetryWeight = params.poetryCount * 60;
    const matchingWeight = (params.matchingCount || 0) * 55;
    const essayWeight = params.essayLinesCount * 22;
    const charWeight = (params.totalCharacters / 100) * 10;
    
    const rawTotal = (headerWeight + questionWeight + passageWeight + poetryWeight + matchingWeight + essayWeight + charWeight) * fontMultiplier;
    const percentage = Math.min(Math.round((rawTotal / maxCapacityUnits) * 100), 150);

    let status: 'optimal' | 'safe' | 'warning' | 'overflow' = 'optimal';
    let recommendation = 'حجم المحتوى مثالي ومطابق لمعايير الصفحة الواحدة A4 بدقة (210mm × 297mm).';

    if (percentage <= 80) {
      status = 'optimal';
      recommendation = 'المحتوى مريح جداً، يمكنك إضافة أسئلة إضافية أو تكبير حجم الخط.';
    } else if (percentage <= 95) {
      status = 'safe';
      recommendation = 'المحتوى متناسق تماماً ومطابق لارتفاع ورقة A4.';
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
