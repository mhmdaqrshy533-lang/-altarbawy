import { GoogleGenAI } from '@google/genai';
import { db } from '../../db/index';
import { concepts } from '../../db/schema';
import crypto from 'crypto';

export class ConceptExtractor {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async analyze(content: string, contentId: string = 'demo-content') {
    const prompt = `أنت محرك استخراج المفاهيم لنظام Mistar EduOS.
قم بتحليل النص التعليمي التالي واستخرج المعلومات المطلوبة بدقة عالية. 
تنسيق المخرجات يجب أن يكون كائن JSON فقط:
{
  "concepts": ["مفهوم 1", "مفهوم 2"],
  "objectives": ["الهدف التعليمي 1", "الهدف التعليمي 2"],
  "bloomsLevel": "تذكر / فهم / تطبيق / تحليل / تقييم / ابتكار",
  "difficulty": 1 الى 10,
  "keywords": ["كلمة 1", "كلمة 2"]
}

النص:
${content}
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
      console.error("Failed to parse Concepts JSON:", outputText);
      throw new Error("Failed to process Concepts output");
    }

    const id = crypto.randomUUID();

    // Store in DB
    await db.insert(concepts).values({
      id,
      contentId,
      extractedConcepts: extractedData.concepts || [],
      objectives: extractedData.objectives || [],
      bloomsLevel: extractedData.bloomsLevel || 'غير محدد',
      difficulty: extractedData.difficulty || 5,
      keywords: extractedData.keywords || [],
      createdAt: new Date()
    });

    return { id, ...extractedData };
  }
}
