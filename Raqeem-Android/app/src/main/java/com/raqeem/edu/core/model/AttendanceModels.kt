package com.raqeem.edu.core.model

import java.util.UUID

enum class AttendanceStatus(val labelAr: String, val colorHex: String) {
    PRESENT("حاضر", "#059669"),
    ABSENT("غائب", "#E11D48"),
    LATE("متأخر", "#D97706"),
    EXCUSED("مستأذن", "#2563EB")
}

data class StudentAttendanceItem(
    val studentId: String = UUID.randomUUID().toString(),
    val studentName: String,
    val seatNumber: String = "",
    var status: AttendanceStatus = AttendanceStatus.PRESENT,
    var note: String = ""
)

data class AttendanceSession(
    val id: String = UUID.randomUUID().toString(),
    var dateString: String = "2026-07-03",
    var dayName: String = "الجمعة",
    var grade: String = "الصف التاسع",
    var division: String = "الشعبة (أ)",
    var subject: String = "القرآن الكريم",
    var teacherName: String = "أ. عبدالله محمد الأهدل",
    val students: MutableList<StudentAttendanceItem> = mutableListOf()
)

data class StudentGradeItem(
    val studentId: String = UUID.randomUUID().toString(),
    val studentName: String,
    var courseworkScore: Double = 0.0, // أعمال السنة (20)
    var midTermScore: Double = 0.0,    // اختبار شهري (10)
    var finalExamScore: Double = 0.0,  // اختبار نهائي (70)
    var totalScore: Double = 0.0,      // المجموع الكلي (100)
    var letterGrade: String = "ممتاز",
    var rank: Int = 1
)

data class GradeSheetDocument(
    val id: String = UUID.randomUUID().toString(),
    var title: String = "كشف رصد درجات الفصل الدراسي الأول",
    var schoolName: String = "مدرسة الرقيم النموذجية",
    var subject: String = "اللغة العربية",
    var gradeLevel: String = "الصف التاسع الأساسي",
    var academicYear: String = "1447هـ - 2026م",
    var teacherName: String = "أ. صهيب الوجيه",
    var maxScore: Double = 100.0,
    var passingScore: Double = 50.0,
    val studentGrades: MutableList<StudentGradeItem> = mutableListOf()
)
