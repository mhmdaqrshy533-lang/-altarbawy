/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import jsPDF from 'jspdf';
import QRCode from 'qrcode';

// محرك المستندات السيادي (Sovereign Output Engine)
// يتولى إصدار التقارير والشهادات بمظهر يضاهي المطابع المركزية
export class SovereignDocumentEngine {
  
  public static async generateOfficialDocument(title: string, content: string[], schoolName: string = 'مدرسة الرقيم النموذجية') {
    // تشغيل العملية في خلفية غير متزامنة لمنع تجميد الواجهة
    return new Promise<void>(async (resolve) => {
      
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // 0. العلامة المائية (Sovereign Watermark)
      doc.setTextColor(230, 230, 240); // لون فاتح جداً
      doc.setFontSize(70);
      // تدوير العلامة المائية
      doc.text('R A Q E E M', pageWidth / 2, pageHeight / 2, {
        align: 'center',
        angle: 45
      });
      
      // 1. الترويسة السيادية (الهوية)
      doc.setFillColor(0, 75, 110); // لون كحلي سيادي
      doc.rect(0, 0, pageWidth, 25, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.text('محرر الرقيم التربوي', pageWidth / 2, 16, { align: 'center' });
      
      // 2. بيانات المدرسة والتاريخ
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(14);
      
      // لمحاكاة الخطوط العربية، سنستخدم اتجاه اليمين
      doc.text(schoolName, pageWidth - 20, 40, { align: 'right' });
      doc.text(new Date().toLocaleDateString('en-GB'), 20, 40); // التاريخ
      
      // 3. خط فاصل احترافي (المسطرة)
      doc.setLineWidth(0.5);
      doc.setDrawColor(76, 29, 149);
      doc.line(20, 48, pageWidth - 20, 48);

      // 4. العنوان الرئيسي
      doc.setFontSize(22);
      doc.setTextColor(76, 29, 149);
      doc.text(title, pageWidth / 2, 65, { align: 'center' });

      // 5. المحتوى (الفقرات)
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      let yPos = 90;
      
      content.forEach(line => {
        if (yPos > pageHeight - 60) {
          doc.addPage();
          // إعادة رسم العلامة المائية في الصفحة الجديدة
          doc.setTextColor(230, 230, 240);
          doc.setFontSize(80);
          doc.text('R A Q E E M', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(12);
          yPos = 30;
        }
        doc.text(line, pageWidth - 20, yPos, { align: 'right' });
        yPos += 12; // تباعد سطور مثالي
      });

      // 6. التذييل والتوقيع والـ QR Code
      doc.setLineWidth(0.2);
      doc.setDrawColor(200, 200, 200);
      doc.line(20, pageHeight - 45, pageWidth - 20, pageHeight - 45);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('توقيع مدير المدرسة', pageWidth - 40, pageHeight - 30, { align: 'center' });
      doc.text('توقيع المعلم', 40, pageHeight - 30, { align: 'center' });
      
      // توليد وإضافة QR Code للتوثيق
      try {
        const qrDataUrl = await QRCode.toDataURL(`Raqeem Auth: ${title} | ${new Date().toISOString()}`, { margin: 1 });
        doc.addImage(qrDataUrl, 'PNG', (pageWidth / 2) - 10, pageHeight - 40, 20, 20);
        doc.setFontSize(8);
        doc.text('وثيقة معتمدة رقمياً — محرر الرقيم التربوي', pageWidth / 2, pageHeight - 15, { align: 'center' });
      } catch (err) {
        console.error('Failed to generate QR Code', err);
      }

      // حفظ المستند
      doc.save(`${title.replace(/\s+/g, '_')}_Raqeem.pdf`);
      resolve();
    });
  }
}
