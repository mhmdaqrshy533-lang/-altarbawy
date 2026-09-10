package com.raqeem.edu.ui.navigation

sealed class Screen(val route: String) {
    object Home : Screen("home")
    object ExamEditor : Screen("exam_editor/{examId}") {
        fun createRoute(examId: String) = "exam_editor/$examId"
    }
    object GradeRecords : Screen("grade_records")
    object Certificates : Screen("certificates")
    object BookStudio : Screen("book_studio")
    object Attendance : Screen("attendance")
    object OfficialMemos : Screen("official_memos")
    object TemplateCenter : Screen("template_center")
    object AssetManager : Screen("asset_manager")
    object Settings : Screen("settings")
}
