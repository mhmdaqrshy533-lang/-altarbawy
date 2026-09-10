package com.raqeem.edu.core.model

data class ExamMetadata(
    var country: String = "الجمهورية اليمنية",
    var ministry: String = "وزارة التربية والتعليم والبحث العلمي",
    var standardProfileId: String = "ye",
    var governorate: String = "محافظة تعز",
    var directorate: String = "مديرية المظفر",
    var school: String = "مدرسة الرقيم النموذجية",
    var stage: String = "الأساسية",
    var grade: String = "الصف التاسع",
    var division: String = "الشعبة (أ)",
    var subject: String = "القرآن الكريم والتربية الإسلامية",
    var semester: String = "الفصل الدراسي الأول",
    var round: String = "الدور الأول",
    var academicYear: String = "1447هـ - 2026م",
    var examTitle: String = "امتحان نهاية الفصل الدراسي الأول",
    var time: String = "ساعتان",
    var marks: String = "50",
    var examType: String = "تحريري رسمي",
    var teacherName: String = "أ. عبدالله محمد الأهدل",
    var schoolPrincipal: String = "أ. عبدالرحمن الشميري",
    var templateType: String = "ministerial", // "ministerial", "private", "automated", "book_studio"
    var modelCode: String = "أ",
    var themePreset: String = "classic",
    var themePrimaryColor: String = "#004B6E",
    var themeBorderColor: String = "#004B6E",
    var themeBorderStyle: String = "double",
    var themeBorderWidth: String = "2.5",
    var themeHeaderBg: String = "#F8FAFC",
    var themeAccentColor: String = "#0D7A68",
    var numberingStyle: String = "arabic",
    var customLogoUrl: String = ""
)
