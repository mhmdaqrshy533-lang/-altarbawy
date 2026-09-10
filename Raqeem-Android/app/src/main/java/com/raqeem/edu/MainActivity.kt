package com.raqeem.edu

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.raqeem.edu.features.assets.AssetManagerScreen
import com.raqeem.edu.features.attendance.AttendanceScreen
import com.raqeem.edu.features.books.BookStudioScreen
import com.raqeem.edu.features.certificates.CertificatesScreen
import com.raqeem.edu.features.documents.OfficialMemosScreen
import com.raqeem.edu.features.exam.ExamEditorScreen
import com.raqeem.edu.features.home.HomeScreen
import com.raqeem.edu.features.results.GradeRecordsScreen
import com.raqeem.edu.features.settings.SettingsScreen
import com.raqeem.edu.features.templates.TemplateCenterScreen
import com.raqeem.edu.ui.navigation.Screen
import com.raqeem.edu.ui.theme.RaqeemTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            RaqeemTheme {
                val navController = rememberNavController()

                NavHost(
                    navController = navController,
                    startDestination = Screen.Home.route
                ) {
                    composable(Screen.Home.route) {
                        HomeScreen(
                            onNavigate = { route -> navController.navigate(route) }
                        )
                    }

                    composable(Screen.ExamEditor.route) { backStackEntry ->
                        val examId = backStackEntry.arguments?.getString("examId") ?: "new"
                        ExamEditorScreen(
                            examId = examId,
                            onBack = { navController.popBackStack() }
                        )
                    }

                    composable(Screen.GradeRecords.route) {
                        GradeRecordsScreen(
                            onBack = { navController.popBackStack() }
                        )
                    }

                    composable(Screen.Certificates.route) {
                        CertificatesScreen(
                            onBack = { navController.popBackStack() }
                        )
                    }

                    composable(Screen.BookStudio.route) {
                        BookStudioScreen(
                            onBack = { navController.popBackStack() }
                        )
                    }

                    composable(Screen.Attendance.route) {
                        AttendanceScreen(
                            onBack = { navController.popBackStack() }
                        )
                    }

                    composable(Screen.OfficialMemos.route) {
                        OfficialMemosScreen(
                            onBack = { navController.popBackStack() }
                        )
                    }

                    composable(Screen.TemplateCenter.route) {
                        TemplateCenterScreen(
                            onBack = { navController.popBackStack() }
                        )
                    }

                    composable(Screen.AssetManager.route) {
                        AssetManagerScreen(
                            onBack = { navController.popBackStack() }
                        )
                    }

                    composable(Screen.Settings.route) {
                        SettingsScreen(
                            onBack = { navController.popBackStack() }
                        )
                    }
                }
            }
        }
    }
}
