import { GoogleGenAI } from '@google/genai';
import { db } from '../../db/index';
import crypto from 'crypto';

export class AdaptiveLearningEngine {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async recommendPath(studentProfile: string, recentScores: any[]) {
    const prompt = `أنت محرك التعلم التكيفي لنظام Mistar EduOS.
قم بتحليل ملف الطالب ودرجاته الأخيرة لإنشاء نموذج معرفي وتوصيات وتعديل الصعوبة تلقائياً لخطته القادمة.
تنسيق المخرجات يجب أن يكون كائن JSON فقط:
{
  "masteryLevel": "مبتدئ / متوسط / متقدم",
  "recommendedDifficulty": 1 الى 10,
  "recommendations": ["نصيحة 1", "نصيحة 2"],
  "adaptivePath": [
    { "step": "خطوة 1", "focus": "المفهوم المراد التركيز عليه", "type": "شرح / تدريب / اختبار" }
  ]
}

ملف الطالب:
${studentProfile}

الدرجات الأخيرة:
${JSON.stringify(recentScores)}
`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [prompt],
      config: {
        responseMimeType: "application/json",
      }
    });

    const outputText = response.text || "{}";
    let extractedData;
    
    try {
      extractedData = JSON.parse(outputText);
    } catch (e) {
      console.error("Failed to parse Adaptive JSON:", outputText);
      throw new Error("Failed to process Adaptive output");
    }

    return extractedData;
  }
}
