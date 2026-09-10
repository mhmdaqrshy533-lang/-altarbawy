package com.raqeem.edu.core.model

import java.util.UUID

enum class CertificateType(val id: String, val title: String, val isPortrait: Boolean) {
    IJAZAH_BUKHARI("ijazah_bukhari", "إجازة ثلاثيات الإمام البخاري", true),
    TRADITIONAL_QURAN("traditional_quran", "شهادة حفظ القرآن الكريم (الإطار التراثي)", false),
    QURAN_ASSOCIATION("quran_association", "شهادة جمعية القراء (نهضة العلماء)", true),
    QURAN_COMPETITION("quran_competition", "شهادة شكر وتفوق قرآني (ورتّل)", false),
    ACADEMIC_EXCELLENCE("academic_excellence", "شهادة تفوق مدرسي (الوسام الذهبي)", false),
    UNIVERSITY_DEGREE("university_degree", "شهادة اعتماد أكاديمي وجامعي", true),
    TOP_STUDENTS_LIST("top_students_list", "كشف أسماء أوائل الطلاب (وزاري)", true),
    GRADE_RECORD_SHEET("grade_record_sheet", "كشف رصد الدرجات وأعمال السنة", false)
}

data class CertificateDocument(
    val id: String = UUID.randomUUID().toString(),
    var type: CertificateType = CertificateType.ACADEMIC_EXCELLENCE,
    var studentName: String = "محمد أحمد فارع العريقي",
    var schoolName: String = "مجمع الرقيم التربوي النموذجي",
    var directorate: String = "مديرية صالة",
    var governorate: String = "محافظة تعز",
    var academicYear: String = "1447هـ / 2026م",
    var gradeLevel: String = "الصف الثالث الثانوي - علمي",
    var appreciationText: String = "تقديراً لجهوده المتميزة وتفوقه الباهر وحصوله على المركز الأول بمعدل 99.5%",
    var rank: String = "الأول على مستوى المديرية",
    var percentage: Double = 99.5,
    var issueDate: String = "15 ذو القعدة 1447هـ",
    var principalName: String = "أ. جميل عبدالملك المخلافي",
    var teacherName: String = "أ. صهيب الوجيه",
    var inspectorName: String = "أ. رشاد سلطان قائد",
    var serialNumber: String = "RQ-CERT-2026-0841",
    var qrCodeContent: String = "https://raqeem.edu.ye/verify/RQ-CERT-2026-0841",
    var hasStamp: Boolean = true,
    var hasGoldSeal: Boolean = true,
    var watermarkText: String = "الرقيم التربوي المعياري"
)
