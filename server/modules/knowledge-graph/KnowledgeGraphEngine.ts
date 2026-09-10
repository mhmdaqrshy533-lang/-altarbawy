export class KnowledgeGraphEngine {
  // Hardcoded taxonomy of concepts and their prerequisites for deterministic local execution
  private taxonomy: Record<string, string[]> = {
    'الجاذبية': ['الكتلة', 'التسارع'],
    'قوانين نيوتن': ['القوة', 'الكتلة', 'التسارع'],
    'الطاقة الحركية': ['الكتلة', 'السرعة'],
    'السرعة': ['المسافة', 'الزمن'],
    'التسارع': ['السرعة', 'الزمن'],
    'الكسور': ['القسمة', 'الضرب'],
    'المعادلات الخطية': ['الجمع', 'الطرح', 'الضرب', 'القسمة', 'المتغيرات'],
    'الجبر': ['المعادلات الخطية', 'الكسور'],
    'التفاضل': ['الجبر', 'الدوال', 'النهايات'],
  };

  async buildGraph(targetConcepts: string[]) {
    // We will build a local deterministic graph representation
    const nodes = new Set<string>();
    const prerequisitesMap = new Map<string, string[]>();
    
    // Breadth-First traversal to find all dependencies
    const queue = [...targetConcepts];
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.trim() === '') continue;
      
      if (!nodes.has(current)) {
        nodes.add(current);
        const prereqs = this.taxonomy[current] || [];
        prerequisitesMap.set(current, prereqs);
        queue.push(...prerequisitesMap.get(current)!);
      }
    }

    // Prepare graph response format
    const graph = Array.from(nodes).map(concept => {
      return {
        concept,
        prerequisites: prerequisitesMap.get(concept) || [],
        relatedConcepts: []
      };
    });

    // Topological Sort to generate Learning Path
    const learningPath = this.topologicalSort(nodes, prerequisitesMap);

    return {
      graph,
      learningPath,
      metadata: {
        engine: "Deterministic Local Graph Engine v1.0",
        nodesCount: nodes.size
      }
    };
  }

  private topologicalSort(nodes: Set<string>, prereqsMap: Map<string, string[]>): string[] {
    const inDegree = new Map<string, number>();
    const adj = new Map<string, string[]>();
    
    for (const node of nodes) {
      inDegree.set(node, 0);
      adj.set(node, []);
    }

    // Build Adjacency List and In-Degrees
    for (const [node, prereqs] of prereqsMap.entries()) {
      for (const p of prereqs) {
        if (nodes.has(p)) {
          // p -> node (prerequisite points to the concept that requires it)
          adj.get(p)!.push(node);
          inDegree.set(node, inDegree.get(node)! + 1);
        }
      }
    }

    const queue: string[] = [];
    for (const [node, deg] of inDegree.entries()) {
      if (deg === 0) queue.push(node);
    }

    const path: string[] = [];
    while (queue.length > 0) {
      const curr = queue.shift()!;
      path.push(curr);
      for (const neighbor of adj.get(curr)!) {
        inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
        if (inDegree.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      }
    }

    return path;
  }
}
