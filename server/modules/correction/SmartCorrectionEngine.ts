import { GoogleGenAI } from '@google/genai';
import { db } from '../../db/index';
// Reusing some schema or we can create specific ones. 
// For now, let's keep it simple and just do the API logic as requested.
import crypto from 'crypto';

export class SmartCorrectionEngine {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async analyze(studentAnswer: string, modelAnswer: string, questionText: string) {
    const prompt = `أنت محرك التصحيح الذكي لنظام Mistar EduOS.
قم بتصحيح إجابة الطالب مقارنة بالإجابة النموذجية.
تنسيق المخرجات يجب أن يكون كائن JSON فقط:
{
  "score": 87,
  "errors": ["خطأ 1", "خطأ 2"],
  "weakConcepts": ["المفهوم الضعيف 1", "المفهوم الضعيف 2"],
  "recommendations": ["نصيحة علاجية 1"]
}

نص السؤال:
${questionText}

الإجابة النموذجية:
${modelAnswer}

إجابة الطالب:
${studentAnswer}
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
      console.error("Failed to parse Correction JSON:", outputText);
      throw new Error("Failed to process Correction output");
    }

    return extractedData;
  }
}
