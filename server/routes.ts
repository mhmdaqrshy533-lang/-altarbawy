import { Router } from 'express';
import multer from 'multer';
import { OCRService } from './modules/ocr/OCRService';
import { ConceptExtractor } from './modules/concepts/ConceptExtractor';
import { QuestionGenerator } from './modules/questions/QuestionGenerator';
import { SmartCorrectionEngine } from './modules/correction/SmartCorrectionEngine';
import { KnowledgeGraphEngine } from './modules/knowledge-graph/KnowledgeGraphEngine';
import { AdaptiveLearningEngine } from './modules/adaptive-learning/AdaptiveLearningEngine';
import { ImageGenerator } from './modules/image/ImageGenerator';
import { PedagogicalMastermindEngine } from './modules/pedagogical/PedagogicalMastermindEngine';
import { db } from './db';
import { ocrResults, concepts, generatedQuestions } from './db/schema';
import { desc } from 'drizzle-orm';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const getApiKey = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not configured on the server.");
  return key;
};

// Image Generation API
router.post('/image/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });
    const service = new ImageGenerator(getApiKey());
    const imageUrl = await service.generate(prompt);
    res.json({ imageUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Pedagogical Mastermind Processing API
router.post('/pedagogical/remix', async (req, res) => {
  try {
    const { content, subject, grade, stage } = req.body;
    if (!content) return res.status(400).json({ error: 'Content is required' });
    const engine = new PedagogicalMastermindEngine(getApiKey());
    const result = await engine.processAndRemix(content, subject, grade, stage);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 1. OCR Engine APIs
router.post('/ocr/extract', upload.single('image') as any, async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
    const service = new OCRService(getApiKey());
    const result = await service.extract(req.file.buffer, req.file.mimetype);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Concept Extraction APIs
router.post('/concepts/analyze', async (req, res) => {
  try {
    const { content, contentId } = req.body;
    if (!content) return res.status(400).json({ error: 'Content is required' });
    const service = new ConceptExtractor(getApiKey());
    const result = await service.analyze(content, contentId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Question Generation APIs
router.post('/questions/generate', async (req, res) => {
  try {
    const { content, difficulty, count, types, contentId } = req.body;
    if (!content) return res.status(400).json({ error: 'Content is required' });
    const service = new QuestionGenerator(getApiKey());
    const result = await service.generate(content, difficulty || 'متوسط', count || 5, types || ['mcq'], contentId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Smart Correction APIs
router.post('/correction/analyze', async (req, res) => {
  try {
    const { studentAnswer, modelAnswer, questionText } = req.body;
    if (!studentAnswer || !modelAnswer) return res.status(400).json({ error: 'Answers are required' });
    const service = new SmartCorrectionEngine(getApiKey());
    const result = await service.analyze(studentAnswer, modelAnswer, questionText);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Knowledge Graph APIs
router.post('/knowledge-graph/build', async (req, res) => {
  try {
    const { concepts } = req.body;
    if (!concepts || !Array.isArray(concepts)) return res.status(400).json({ error: 'Concepts array is required' });
    const service = new KnowledgeGraphEngine();
    const result = await service.buildGraph(concepts);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Adaptive Learning APIs
router.post('/adaptive/recommend', async (req, res) => {
  try {
    const { studentProfile, recentScores } = req.body;
    const service = new AdaptiveLearningEngine(getApiKey());
    const result = await service.recommendPath(studentProfile, recentScores);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export { router as apiRouter };
