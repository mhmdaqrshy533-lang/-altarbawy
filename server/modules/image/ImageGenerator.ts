import { GoogleGenAI } from '@google/genai';

export class ImageGenerator {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generate(prompt: string): Promise<string> {
    try {
      const response = await this.ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          aspectRatio: '3:4',
          outputMimeType: 'image/jpeg'
        }
      });
      
      const base64Image = response.generatedImages?.[0]?.image?.imageBytes;
      if (!base64Image) {
        throw new Error('No image returned from Gemini');
      }
      return `data:image/jpeg;base64,${base64Image}`;
    } catch (error) {
      console.error('[ImageGenerator] Error:', error);
      throw error;
    }
  }
}
