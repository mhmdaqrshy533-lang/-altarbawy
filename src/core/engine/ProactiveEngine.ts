/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { AINotification, AIInsight, User } from '../../types/core';

/**
 * ProactiveEngine (Zero-Paper OS Intelligence)
 * 
 * This engine runs in the background, analyzing telemetry, grades, 
 * attendance, and behavioral data to push proactive insights 
 * before the user asks for them.
 */
export class ProactiveEngine {
  private static instance: ProactiveEngine;
  private listeners: ((notification: AINotification) => void)[] = [];

  private constructor() {
    this.startBackgroundAnalysis();
  }

  public static getInstance(): ProactiveEngine {
    if (!ProactiveEngine.instance) {
      ProactiveEngine.instance = new ProactiveEngine();
    }
    return ProactiveEngine.instance;
  }

  public subscribe(callback: (notification: AINotification) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notify(notification: AINotification) {
    this.listeners.forEach(listener => listener(notification));
  }

  private startBackgroundAnalysis() {
    // Disabled fake background notifications
  }

  private generateRandomInsight(): AINotification | null {
    const insights: AINotification[] = [
      {
        id: `ai-${Date.now()}`,
        type: 'alert',
        title: 'مؤشر تسرب محتمل',
        description: 'الطالب "أحمد صالح" غائب لليوم الثالث على التوالي مع انخفاض في تفاعله بنسبة 40%.',
        priority: 'high',
        timestamp: new Date().toISOString(),
        targetRole: 'school_admin',
        actionLabel: 'فتح ملف الطالب',
        actionRoute: 'student_profile',
        isRead: false
      },
      {
        id: `ai-${Date.now() + 1}`,
        type: 'automation',
        title: 'أتمتة السجلات',
        description: 'تم تصحيح 35 ورقة OMR تلقائياً ورصدها في سجل الدرجات لمادة الفيزياء.',
        priority: 'medium',
        timestamp: new Date().toISOString(),
        targetRole: 'teacher',
        actionLabel: 'معاينة السجل',
        actionRoute: 'grades_section',
        isRead: false
      },
      {
        id: `ai-${Date.now() + 2}`,
        type: 'suggestion',
        title: 'تدخل علاجي مقترح',
        description: '30% من الطلاب أخطأوا في فهم "الدوال الأسية". تم توليد نشاط تفاعلي علاجي مخصص لهم.',
        priority: 'medium',
        timestamp: new Date().toISOString(),
        targetRole: 'teacher',
        actionLabel: 'معاينة النشاط',
        actionRoute: 'exams_section',
        isRead: false
      }
    ];

    // Pick a random insight for the demo
    return insights[Math.floor(Math.random() * insights.length)];
  }

  public analyzeExamResults(examId: string, results: any[]) {
    // In a real system, this sends data to the Python/Transformers backend
    console.log(`[ProactiveEngine] Analyzing results for exam ${examId}...`);
  }
}
