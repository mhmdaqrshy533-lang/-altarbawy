import { GoogleGenAI } from '@google/genai';
import { db } from '../../db/index';
import { generatedQuestions } from '../../db/schema';
import crypto from 'crypto';

export class QuestionGenerator {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generate(content: string, difficulty: string, count: number, types: string[], contentId: string = 'demo-content') {
    const prompt = `أنت محرك توليد الأسئلة الذكي لنظام Mistar EduOS.
قم بإنشاء ${count} أسئلة من النص التعليمي التالي.
مستوى الصعوبة المطلوب: ${difficulty}
أنواع الأسئلة المطلوبة: ${types.join(', ')} (mcq=اختيار من متعدد, tf=صح وخطأ, essay=مقالي, fill=إكمال الفراغ).

تنسيق المخرجات يجب أن يكون كائن JSON يحتوي على مصفوفة questions فقط:
{
  "questions": [
    {
      "type": "mcq",
      "text": "نص السؤال هنا",
      "options": ["أ", "ب", "ج", "د"],
      "correctAnswer": "ب",
      "bloomLevel": "فهم",
      "difficulty": 5
    }
  ]
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
      console.error("Failed to parse Questions JSON:", outputText);
      throw new Error("Failed to process Questions output");
    }

    const questionsList = extractedData.questions || [];

    // Store in DB
    for (const q of questionsList) {
      const id = crypto.randomUUID();
      await db.insert(generatedQuestions).values({
        id,
        contentId,
        type: q.type || 'unknown',
        text: q.text || '',
        options: q.options || [],
        correctAnswer: q.correctAnswer || '',
        bloomLevel: q.bloomLevel || 'تذكر',
        difficulty: q.difficulty || 5,
        createdAt: new Date()
      });
    }

    return { questions: questionsList };
  }
}
