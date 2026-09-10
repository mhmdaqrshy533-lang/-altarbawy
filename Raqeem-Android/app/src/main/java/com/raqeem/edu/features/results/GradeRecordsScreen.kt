package com.raqeem.edu.features.results

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.raqeem.edu.core.model.StudentGradeItem
import com.raqeem.edu.ui.theme.EmeraldGreen
import com.raqeem.edu.ui.theme.RoyalNavy

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GradeRecordsScreen(
    onBack: () -> Unit
) {
    val students = remember {
        mutableStateListOf(
            StudentGradeItem(studentName = "إبراهيم عبدالله عوض الجوفي", courseworkScore = 19.0, midTermScore = 10.0, finalExamScore = 68.0, totalScore = 97.0, letterGrade = "ممتاز", rank = 1),
            StudentGradeItem(studentName = "أحمد علي أحمد العارمي", courseworkScore = 18.0, midTermScore = 9.0, finalExamScore = 65.0, totalScore = 92.0, letterGrade = "ممتاز", rank = 2),
            StudentGradeItem(studentName = "أمير الخضر حسين الدهبلي", courseworkScore = 16.0, midTermScore = 8.0, finalExamScore = 60.0, totalScore = 84.0, letterGrade = "جيد جداً", rank = 3),
            StudentGradeItem(studentName = "باسم محمد سالم السلمي", courseworkScore = 15.0, midTermScore = 7.0, finalExamScore = 55.0, totalScore = 77.0, letterGrade = "جيد", rank = 4),
            StudentGradeItem(studentName = "جلال أحمد العزي فارع", courseworkScore = 14.0, midTermScore = 7.0, finalExamScore = 44.0, totalScore = 65.0, letterGrade = "مقبول", rank = 5)
        )
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("كشف رصد الدرجات والنتائج", fontWeight = FontWeight.Bold, color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowForward, contentDescription = "رجوع", tint = Color.White)
                    }
                },
                actions = {
                    IconButton(onClick = { /* Export to Excel / PDF */ }) {
                        Icon(Icons.Default.FileDownload, contentDescription = "تصدير", tint = Color.White)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = RoyalNavy)
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(16.dp)
        ) {
            // Summary Card
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 16.dp),
                colors = CardDefaults.cardColors(containerColor = RoyalNavy.copy(alpha = 0.08f)),
                shape = RoundedCornerShape(12.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(14.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column {
                        Text("الصف: التاسع الأساسي", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                        Text("المادة: اللغة العربية", fontSize = 12.sp, color = Color.DarkGray)
                    }
                    Column(horizontalAlignment = Alignment.End) {
                        Text("نسبة النجاح: 100%", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = EmeraldGreen)
                        Text("الطلاب المرصودون: ${students.size}", fontSize = 12.sp, color = Color.DarkGray)
                    }
                }
            }

            // Table Header
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(RoyalNavy, RoundedCornerShape(topStart = 8.dp, topEnd = 8.dp))
                    .padding(vertical = 10.dp, horizontal = 8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("#", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 11.sp, modifier = Modifier.width(28.dp))
                Text("اسم الطالب", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 11.sp, modifier = Modifier.weight(1.5f))
                Text("أعمال (20)", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 10.sp, modifier = Modifier.weight(1f))
                Text("نهائي (70)", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 10.sp, modifier = Modifier.weight(1f))
                Text("المجموع", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 10.sp, modifier = Modifier.weight(1f))
                Text("التقدير", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 10.sp, modifier = Modifier.weight(1f))
            }

            // Student Rows
            LazyColumn(modifier = Modifier.fillMaxSize()) {
                itemsIndexed(students) { index, student ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(if (index % 2 == 0) Color.White else Color(0xFFF8FAFC))
                            .border(0.5.dp, Color(0xFFE2E8F0))
                            .padding(vertical = 10.dp, horizontal = 8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text("${index + 1}", fontSize = 11.sp, modifier = Modifier.width(28.dp))
                        Text(student.studentName, fontSize = 11.sp, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1.5f))
                        Text("${student.courseworkScore.toInt()}", fontSize = 11.sp, modifier = Modifier.weight(1f))
                        Text("${student.finalExamScore.toInt()}", fontSize = 11.sp, modifier = Modifier.weight(1f))
                        Text("${student.totalScore.toInt()}", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = RoyalNavy, modifier = Modifier.weight(1f))
                        Text(student.letterGrade, fontSize = 11.sp, fontWeight = FontWeight.Bold, color = EmeraldGreen, modifier = Modifier.weight(1f))
                    }
                }
            }
        }
    }
}
