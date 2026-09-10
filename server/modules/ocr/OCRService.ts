import { GoogleGenAI } from '@google/genai';
import { db } from '../../db/index';
import { ocrResults } from '../../db/schema';
import crypto from 'crypto';

export class OCRService {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async extract(imageBuffer: Buffer, mimeType: string) {
    const prompt = `أنت محرك التعرف البصري (OCR) المتقدم لنظام Mistar EduOS.
قم بتحليل الصورة المرفقة واستخرج البيانات التالية بدقة، وقم بتنسيق المخرجات ككائن JSON فقط بدون أي نص إضافي:
{
  "text": "النص الكامل المستخرج",
  "language": "ar أو en أو mixed",
  "headings": ["العنوان 1", "العنوان 2"],
  "paragraphs": ["الفقرة 1", "الفقرة 2"],
  "tables": [{"rows": [["خلية 1", "خلية 2"]]}]
}
تأكد من الحفاظ على البنية الأساسية والمصطلحات الدقيقة.`;

    const contents = [
      {
        inlineData: {
          data: imageBuffer.toString('base64'),
          mimeType: mimeType
        }
      },
      prompt
    ];

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        responseMimeType: "application/json",
      }
    });

    const outputText = response.text || "{}";
    let extractedData;
    
    try {
      extractedData = JSON.parse(outputText);
    } catch (e) {
      console.error("Failed to parse OCR JSON:", outputText);
      throw new Error("Failed to process OCR output");
    }

    const id = crypto.randomUUID();

    // Store in DB
    await db.insert(ocrResults).values({
      id,
      text: extractedData.text || '',
      language: extractedData.language || 'unknown',
      headings: extractedData.headings || [],
      paragraphs: extractedData.paragraphs || [],
      tables: extractedData.tables || [],
      images: extractedData.images || [],
      createdAt: new Date()
    });

    return { id, ...extractedData };
  }
}
