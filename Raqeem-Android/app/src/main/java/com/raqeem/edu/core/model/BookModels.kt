package com.raqeem.edu.core.model

import java.util.UUID

enum class BookDocumentType(val title: String, val badge: String) {
    BOOK("كتاب مدرسي شامل", "منهجي"),
    BOOKLET("ملزمة تعليمية ومراجعة", "ملزمة"),
    TEACHER_GUIDE("دليل المعلم التربوي", "إرشادي"),
    ACTIVITY_WORKBOOK("كراسة الأنشطة والتطبيقات", "تطبيقي"),
    QUESTION_BANK_BOOK("بنك الأسئلة الشامل", "تقييم"),
    LAB_MANUAL("دليل التجارب والمختبرات", "عملي")
}

data class BookOutlineItem(
    val id: String = UUID.randomUUID().toString(),
    val title: String,
    val type: String = "chapter", // "cover", "unit", "chapter", "lesson", "summary"
    val pageIndex: Int = 0,
    val children: List<BookOutlineItem> = emptyList()
)

data class BookCoverSettings(
    var mainTitle: String = "الفيزياء الحديثة والميكانيكا",
    var subtitle: String = "شرح مفصل مع التجارب والمسائل الوزارية المحلولة",
    var authorName: String = "أ. عبدالله محمد الأهدل",
    var reviewerName: String = "د. جميل المخلافي",
    var publisherName: String = "منشورات الرقيم التربوية",
    var editionNumber: String = "الطبعة النموذجية الأولى",
    var publicationYear: String = "2026م - 1447هـ",
    var primaryColor: String = "#004B6E",
    var accentColor: String = "#0D7A68",
    var backgroundColor: String = "#0F172A",
    var stylePreset: String = "science" // "official", "academic", "modern", "science", "math"
)

data class BookProject(
    val id: String = UUID.randomUUID().toString(),
    var documentType: BookDocumentType = BookDocumentType.BOOKLET,
    var title: String = "ملزمة الفيزياء التفاعلية",
    var subject: String = "الفيزياء",
    var stage: String = "الثانوية العامة",
    var grade: String = "الصف الثالث الثانوي",
    var semester: String = "الفصل الدراسي الأول",
    var paperSize: PaperSize = PaperSize.A4,
    var cover: BookCoverSettings = BookCoverSettings(),
    val outline: MutableList<BookOutlineItem> = mutableListOf(),
    val pages: MutableList<DocumentPage> = mutableListOf(DocumentPage(pageNumber = 1)),
    val createdAt: Long = System.currentTimeMillis(),
    var updatedAt: Long = System.currentTimeMillis()
)
