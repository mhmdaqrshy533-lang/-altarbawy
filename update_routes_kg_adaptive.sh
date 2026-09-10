cat << 'INNER_EOF' >> server/routes.ts

// ----------------------------------------------------
// Knowledge Graph & Adaptive Learning APIs
// ----------------------------------------------------
import { KnowledgeGraphEngine } from './modules/knowledge-graph/KnowledgeGraphEngine';
import { AdaptiveLearningEngine } from './modules/adaptive-learning/AdaptiveLearningEngine';

router.post('/knowledge-graph/build', async (req, res) => {
  try {
    const { concepts } = req.body;
    if (!concepts || !Array.isArray(concepts)) return res.status(400).json({ error: 'Concepts array is required' });
    const service = new KnowledgeGraphEngine(getApiKey());
    const result = await service.buildGraph(concepts);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

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
INNER_EOF
