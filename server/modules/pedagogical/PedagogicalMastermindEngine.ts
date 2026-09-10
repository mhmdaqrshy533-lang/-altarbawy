import { GoogleGenAI } from '@google/genai';

export interface MastermindPipelineResult {
  header: {
    targetAudience: string;
    difficulty: string;
    classification: string;
  };
  typography: {
    fontName: string;
    titleSize: string;
    bodySize: string;
    spacingAdvice: string;
  };
  colorHarmony: {
    paletteName: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    frameLayoutAdvice: string;
  };
  coreContent: {
    mainTitle: string;
    objective: string;
    points: string[];
    anticipatorySummary: string;
  };
  interactiveStation: {
    exercise: string;
    criticalThinkingQuestion: string;
  };
}

export class PedagogicalMastermindEngine {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async processAndRemix(
    content: string,
    subject: string = 'عام',
    grade: string = 'عام',
    stage: string = 'عام'
  ): Promise<MastermindPipelineResult> {
    const systemPrompt = `أنت العقل المدبر والنواة الذكية لـ (استوديو تحرير الكتب والملازم والملخصات) في منصة الرقيم التربوي.
مهمتك هي إعادة صياغة ومزج مدخلات المعلم فوراً وفق [الهيكل التنفيذي الإجباري للمخرجات - Structured Output Pipeline]:

يجب أن ترجع النتيجة بصيغة JSON حصرية بالهيكل التالي:
{
  "header": {
    "targetAudience": "الفئة المستهدفة بدقة (مثال: طلاب مرحلة الثانوية العامة / معلمو الرياضيات)",
    "difficulty": "درجة الصعوبة (مبتدئ / متوسط / متقدم / امتحاني وزارى)",
    "classification": "التصنيف التربوي (مثال: ملخص تعميقي مكثف / منهج رسمي مطور)"
  },
  "typography": {
    "fontName": "اسم الخط العربي المقترح (مثل: Amiri أو Cairo أو Noto Naskh Arabic)",
    "titleSize": "حجم الخط للعناوين (مثال: 24px)",
    "bodySize": "حجم الخط للمتن (مثال: 14px)",
    "spacingAdvice": "إرشادات التباعد الموصى بها لضمان راحة العين"
  },
  "colorHarmony": {
    "paletteName": "اسم لوحة الألوان المقترحة (مثال: الأزرق الملكي والفضي الأكاديمي)",
    "primaryColor": "كود اللون الأساسي (مثل: #1e3a8a)",
    "secondaryColor": "كود اللون الثانوي (مثل: #0284c7)",
    "accentColor": "كود اللون التمييزي (مثل: #f59e0b)",
    "frameLayoutAdvice": "توزيع الإطارات والجداول لمنع العشوائية البصرية"
  },
  "coreContent": {
    "mainTitle": "عنوان رئيسي جذاب وبليغ",
    "objective": "الهدف التربوي والتمهيد المركز",
    "points": ["نقطة مركزة 1", "نقطة مركزة 2", "نقطة مركزة 3"],
    "anticipatorySummary": "الخلاصة المركزية التي تقرأ أفكار المستخدم وتستبق احتياجاته"
  },
  "interactiveStation": {
    "exercise": "تمرين تطبيقي عملي فائق الجودة",
    "criticalThinkingQuestion": "سؤال تفكير ناقد مستقبلي ذكي"
  }
}

قواعد صارمة:
- لغة عربية فصحى رسمية بليغة خالية من الأخطاء النحوية والملائية.
- بدون أي مقدمات أو عبارات ترحيبية أو ختامية.
- المادة: ${subject} | الصف: ${grade} | المرحلة: ${stage}`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemPrompt}\n\n[النص/الموضوع المطلوب معالجته ومزجه]:\n${content}`,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error('لم يتم استلام استجابة من نموذج الذكاء الاصطناعي');
      }

      const parsed = JSON.parse(text);

      const fallback: MastermindPipelineResult = {
        header: {
          targetAudience: `طلاب ${grade} - ${stage}`,
          difficulty: 'متوسط امتحاني',
          classification: `منهج ${subject} الشامل المطور`
        },
        typography: {
          fontName: 'Cairo',
          titleSize: '22px',
          bodySize: '14px',
          spacingAdvice: 'تباعد أسطر 1.6 لراحة العين'
        },
        colorHarmony: {
          paletteName: 'الأخضر الملكي والذهبي',
          primaryColor: '#064e3b',
          secondaryColor: '#047857',
          accentColor: '#d97706',
          frameLayoutAdvice: 'توزيع إطارات منظم'
        },
        coreContent: {
          mainTitle: content.length < 50 ? `الوحدة المنهجية: ${content}` : 'المفهوم التربوي المنهجي',
          objective: 'تهدف هذه المحطة إلى استيعاب المفاهيم الأساسية وتطبيق القواعد المعتمدة.',
          points: [
            'صياغة القواعد والمفاهيم الرئيسية بشكل مباشر.',
            'ربط الأمور النظرية بالتطبيقات العملية.',
            'التدرج المنطقي في عرض المحتوى.'
          ],
          anticipatorySummary: 'خلاصة مركزة: فهم المفاهيم الأساسية وممارسة التطبيقات بشكل متكرر.'
        },
        interactiveStation: {
          exercise: 'تطبيق عملي: قم بحل المسألة واكتب الخطوات بالتفصيل.',
          criticalThinkingQuestion: 'سؤال تفكير ناقد: ما تأثير تغير المتغير الرئيسي على النتيجة النهائية؟'
        }
      };

      return {
        header: {
          targetAudience: parsed.header?.targetAudience || fallback.header.targetAudience,
          difficulty: parsed.header?.difficulty || fallback.header.difficulty,
          classification: parsed.header?.classification || fallback.header.classification
        },
        typography: {
          fontName: parsed.typography?.fontName || fallback.typography.fontName,
          titleSize: parsed.typography?.titleSize || fallback.typography.titleSize,
          bodySize: parsed.typography?.bodySize || fallback.typography.bodySize,
          spacingAdvice: parsed.typography?.spacingAdvice || fallback.typography.spacingAdvice
        },
        colorHarmony: {
          paletteName: parsed.colorHarmony?.paletteName || fallback.colorHarmony.paletteName,
          primaryColor: parsed.colorHarmony?.primaryColor || fallback.colorHarmony.primaryColor,
          secondaryColor: parsed.colorHarmony?.secondaryColor || fallback.colorHarmony.secondaryColor,
          accentColor: parsed.colorHarmony?.accentColor || fallback.colorHarmony.accentColor,
          frameLayoutAdvice: parsed.colorHarmony?.frameLayoutAdvice || fallback.colorHarmony.frameLayoutAdvice
        },
        coreContent: {
          mainTitle: parsed.coreContent?.mainTitle || fallback.coreContent.mainTitle,
          objective: parsed.coreContent?.objective || fallback.coreContent.objective,
          points: Array.isArray(parsed.coreContent?.points) && parsed.coreContent.points.length > 0
            ? parsed.coreContent.points
            : fallback.coreContent.points,
          anticipatorySummary: parsed.coreContent?.anticipatorySummary || fallback.coreContent.anticipatorySummary
        },
        interactiveStation: {
          exercise: parsed.interactiveStation?.exercise || fallback.interactiveStation.exercise,
          criticalThinkingQuestion: parsed.interactiveStation?.criticalThinkingQuestion || fallback.interactiveStation.criticalThinkingQuestion
        }
      };
    } catch (error) {
      console.error('[PedagogicalMastermindEngine] Processing error:', error);
      // Fallback structured pedagogical response adhering to the exact 5-step pipeline
      return {
        header: {
          targetAudience: `طلاب ${grade} - ${stage}`,
          difficulty: 'متوسط امتحاني',
          classification: `منهج ${subject} الشامل المطور`
        },
        typography: {
          fontName: 'Cairo',
          titleSize: '22px',
          bodySize: '14px',
          spacingAdvice: 'تباعد أسطر 1.6 مع هامش جانبي 15px لراحة العين'
        },
        colorHarmony: {
          paletteName: 'الأزرق الأكاديمي والذهبي',
          primaryColor: '#1e3a8a',
          secondaryColor: '#0369a1',
          accentColor: '#d97706',
          frameLayoutAdvice: 'وضع الإطارات النحيفة للعناوين والجداول المزدوجة للمقارنات'
        },
        coreContent: {
          mainTitle: content.length < 50 ? `الوحدة المنهجية: ${content}` : 'المفهوم التربوي والمنهجي الشامل',
          objective: 'تهدف هذه المحطة التعليمية إلى استيعاب المفاهيم الأساسية وتطبيق القواعد المعتمدة بدقة.',
          points: [
            'صياغة القواعد والمفاهيم الرئيسية بشكل مباشر ومكثف.',
            'ربط الأمور النظرية بالتطبيقات العملية في الحياة اليومية.',
            'مراعاة التدرج المنطقي من الأسهل إلى الأكثر تعقيداً.'
          ],
          anticipatorySummary: 'خلاصة مركزة: يعتمد استيعاب المادة على فهم القوانين المحورية ثم ممارسة التطبيقات بشكل متكرر.'
        },
        interactiveStation: {
          exercise: 'تطبيق عملي: قم بحل المسألة واكتب الخطوات بالتفصيل للوصول للنتيجة النهائية.',
          criticalThinkingQuestion: 'سؤال تفكير ناقد: ما تأثير تغير المتغير الرئيسي على النتيجة النهائية في النظام المنهجي؟'
        }
      };
    }
  }
}
