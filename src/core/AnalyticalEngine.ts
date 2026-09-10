/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Analytical Engine (Predictive Algorithms & Decision Trees)
// يعتمد على معالجة البيانات محلياً دون الحاجة لنموذج لغوي للدردشة
export class AnalyticalEngine {
  // توقع تعثر الطلاب باستخدام شجرة قرارات مبسطة ومؤشرات أداء
  public static predictAtRiskStudents(studentsData: any[]): any[] {
    return studentsData.map(student => {
      let riskScore = 0;
      const riskFactors: string[] = [];
      
      // Decision Tree logic
      if (student.attendanceRate < 85) {
        riskScore += 40;
        riskFactors.push('غياب متكرر');
      }
      if (student.averageScore < 60) {
        riskScore += 30;
        riskFactors.push('ضعف أكاديمي عام');
      }
      if (student.lastTestScore < student.averageScore - 10) {
        riskScore += 20;
        riskFactors.push('تراجع مفاجئ في المستوى');
      }
      if (student.homeworkCompletion < 70) {
        riskScore += 10;
        riskFactors.push('إهمال الواجبات');
      }
      
      let status = 'آمن';
      let statusColor = 'bg-green-100 text-green-700';
      if (riskScore >= 70) {
        status = 'خطر رسوب مؤكد';
        statusColor = 'bg-red-100 text-red-700';
      }
      else if (riskScore >= 40) {
        status = 'يحتاج تدخل';
        statusColor = 'bg-yellow-100 text-yellow-700';
      }

      return {
        ...student,
        riskScore,
        riskFactors,
        prediction: status,
        statusColor,
        recommendedAction: this.getRecommendation(riskScore, student)
      };
    }).sort((a, b) => b.riskScore - a.riskScore); // ترتيب من الأكثر خطورة
  }

  private static getRecommendation(riskScore: number, student: any): string {
    if (student.attendanceRate < 85) return 'إرسال إنذار آلي لولي الأمر وجدولة استدعاء.';
    if (student.averageScore < 60) return 'تسجيل الطالب آلياً في فصول التقوية المكثفة للمادة.';
    if (student.lastTestScore < student.averageScore - 10) return 'مراجعة ورقة الاختبار الأخيرة مع الطالب وتحديد نقاط الضعف.';
    return 'متابعة دورية.';
  }
}
