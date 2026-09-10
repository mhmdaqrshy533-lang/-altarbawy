/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Local Context Engine (Offline-First Pattern Recognition)
// يتولى هذا المحرك حفظ سلوكيات المعلم والتعرف على الأنماط لتسريع الإدخال
export class AIContextEngine {
  private static instance: AIContextEngine;
  private memoryKey = 'mistar_ai_memory';

  private constructor() {}

  public static getInstance(): AIContextEngine {
    if (!AIContextEngine.instance) {
      AIContextEngine.instance = new AIContextEngine();
    }
    return AIContextEngine.instance;
  }

  // حفظ سياق نشاط معين
  public logAction(actionType: string, data: any) {
    const memory = this.getMemory();
    if (!memory[actionType]) memory[actionType] = [];
    
    memory[actionType].push({
      timestamp: Date.now(),
      data
    });

    // الاحتفاظ بآخر 100 إجراء فقط لكل نوع للحفاظ على الذاكرة
    if (memory[actionType].length > 100) {
      memory[actionType].shift();
    }

    localStorage.setItem(this.memoryKey, JSON.stringify(memory));
  }

  // التنبؤ بالإجراء القادم بناءً على الأنماط السابقة
  public predictNextAction(actionType: string): any | null {
    const memory = this.getMemory();
    const actions = memory[actionType];
    
    if (!actions || actions.length === 0) return null;
    
    // خوارزمية بسيطة للتعرف على النمط: إرجاع الإجراء الأكثر تكراراً
    const frequency: Record<string, number> = {};
    let mostFrequent = null;
    let maxCount = 0;

    for (const action of actions) {
      const key = JSON.stringify(action.data);
      frequency[key] = (frequency[key] || 0) + 1;
      if (frequency[key] > maxCount) {
        maxCount = frequency[key];
        mostFrequent = action.data;
      }
    }

    return mostFrequent;
  }

  private getMemory(): Record<string, any[]> {
    const data = localStorage.getItem(this.memoryKey);
    return data ? JSON.parse(data) : {};
  }
}
