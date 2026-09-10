/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * محرر الرقيم التربوي - محرك التدقيق والمعايرة المعيارية للمستندات (Document Standards Validator)
 * يفحص المستند هندسياً للتأكد من ملاءمته للطباعة، حساب الدرجات، الهوامش، وعدم تداخل العناصر.
 * برمجة وتصميم وتطوير المهندس سهيل الهزبري
 */

import { DocumentState, DocumentValidationReport, DocumentValidationIssue, TextElement } from '../../editor/types';
import { PageGeometry } from './PageGeometry';

export class DocumentStandardsValidator {
  /**
   * تدقيق شامل لحالة المستند
   */
  static validate(doc: DocumentState): DocumentValidationReport {
    const issues: DocumentValidationIssue[] = [];
    const paper = PageGeometry.getPaperDimensions(doc.paperSize, doc.orientation);
    const margins = PageGeometry.DEFAULT_MARGINS;

    const printableW = paper.widthPx - (margins.rightPx + margins.leftPx);
    const printableH = paper.heightPx - (margins.topPx + margins.bottomPx);

    // 1. Metadata Checks
    if (!doc.metadata.subject || doc.metadata.subject.trim() === '') {
      issues.push({
        id: 'meta_no_subject',
        severity: 'warning',
        category: 'metadata',
        message: 'لم يتم تحديد اسم المادة في ترويسة الاختبار.',
      });
    }

    if (!doc.metadata.grade || doc.metadata.grade.trim() === '') {
      issues.push({
        id: 'meta_no_grade',
        severity: 'warning',
        category: 'metadata',
        message: 'لم يتم تحديد الصف الدراسي في بيانات الاختبار.',
      });
    }

    // 2. Questions & Marks Balance Checks
    let calculatedTotalMarks = 0;
    let questionCount = 0;

    doc.pages.forEach((page, pageIdx) => {
      page.elements.forEach((el) => {
        // Element bounds check
        if (el.x < 0 || el.x + el.width > paper.widthPx + 10) {
          issues.push({
            id: `bounds_x_${el.id}`,
            severity: 'warning',
            category: 'bounds',
            message: `عنصر يتجاوز الهامش الأفقي في الصفحة ${pageIdx + 1}.`,
            pageIndex: pageIdx,
            elementId: el.id,
          });
        }

        if (el.y + el.height > paper.heightPx - margins.bottomPx + 15) {
          issues.push({
            id: `bounds_y_${el.id}`,
            severity: 'error',
            category: 'bounds',
            message: `عنصر يلامس أو يتجاوز الحد السفلي للصفحة ${pageIdx + 1} وقد يُقطع عند الطباعة.`,
            pageIndex: pageIdx,
            elementId: el.id,
          });
        }

        // Question specific checks
        if (el.type === 'text' && (el as TextElement).isQuestion) {
          const q = el as TextElement;
          questionCount++;
          const marks = q.marks || 0;
          calculatedTotalMarks += marks;

          if (!q.content || q.content.trim() === '' || q.content === `س${q.questionNumber}:`) {
            issues.push({
              id: `q_empty_${q.id}`,
              severity: 'error',
              category: 'content',
              message: `نص السؤال ${q.questionNumber || questionCount} فارغ في الصفحة ${pageIdx + 1}.`,
              pageIndex: pageIdx,
              elementId: q.id,
            });
          }

          if (q.questionType === 'mcq' && (!q.options || q.options.length < 2)) {
            issues.push({
              id: `q_mcq_options_${q.id}`,
              severity: 'warning',
              category: 'content',
              message: `سؤال الاختيار من متعدد ${q.questionNumber || questionCount} يحتوي على أقل من خيارين.`,
              pageIndex: pageIdx,
              elementId: q.id,
            });
          }
        }
      });
    });

    // Check Marks Consistency
    const targetMarks = parseInt(doc.metadata.marks || '0', 10);
    if (questionCount > 0 && targetMarks > 0 && calculatedTotalMarks !== targetMarks) {
      issues.push({
        id: 'marks_mismatch',
        severity: 'warning',
        category: 'marks',
        message: `مجموع درجات الأسئلة الفردية (${calculatedTotalMarks}) لا يطابق الدرجة الكلية المحددة في الترويسة (${targetMarks}).`,
      });
    }

    if (doc.pages.length === 0) {
      issues.push({
        id: 'doc_empty_pages',
        severity: 'error',
        category: 'print',
        message: 'المستند لا يحتوي على أي صفحات.',
      });
    }

    const hasErrors = issues.some(i => i.severity === 'error');
    const warningCount = issues.filter(i => i.severity === 'warning').length;
    const score = Math.max(0, 100 - (hasErrors ? 40 : 0) - (warningCount * 10));

    return {
      isValid: !hasErrors,
      score,
      issues,
      checkedAt: Date.now(),
    };
  }
}
