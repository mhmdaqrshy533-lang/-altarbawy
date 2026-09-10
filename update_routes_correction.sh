cat << 'INNER_EOF' >> server/routes.ts

// ----------------------------------------------------
// Smart Correction APIs
// ----------------------------------------------------
import { SmartCorrectionEngine } from './modules/correction/SmartCorrectionEngine';

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
INNER_EOF
