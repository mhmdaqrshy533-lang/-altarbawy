package com.raqeem.edu.features.attendance

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
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
import com.raqeem.edu.core.model.AttendanceStatus
import com.raqeem.edu.core.model.StudentAttendanceItem
import com.raqeem.edu.ui.theme.EmeraldGreen
import com.raqeem.edu.ui.theme.RoyalNavy

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AttendanceScreen(
    onBack: () -> Unit
) {
    val students = remember {
        mutableStateListOf(
            StudentAttendanceItem(studentName = "إبراهيم عبدالله عوض الجوفي", status = AttendanceStatus.PRESENT),
            StudentAttendanceItem(studentName = "أحمد علي أحمد العارمي", status = AttendanceStatus.ABSENT),
            StudentAttendanceItem(studentName = "أمير الخضر حسين الدهبلي", status = AttendanceStatus.LATE),
            StudentAttendanceItem(studentName = "باسم محمد سالم السلمي", status = AttendanceStatus.PRESENT),
            StudentAttendanceItem(studentName = "جلال أحمد العزي فارع", status = AttendanceStatus.EXCUSED)
        )
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("حصر الغياب والانضباط اليومي", fontWeight = FontWeight.Bold, color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowForward, contentDescription = "رجوع", tint = Color.White)
                    }
                },
                actions = {
                    IconButton(onClick = { /* Export attendance log */ }) {
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
            // Summary header
            val presentCount = students.count { it.status == AttendanceStatus.PRESENT }
            val absentCount = students.count { it.status == AttendanceStatus.ABSENT }

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 16.dp),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = RoyalNavy.copy(alpha = 0.08f))
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(14.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column {
                        Text("اليوم: الجمعة، 3 يوليو 2026", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                        Text("الصف: التاسع الأساسي - الشعبة (أ)", fontSize = 12.sp, color = Color.DarkGray)
                    }
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        Surface(shape = RoundedCornerShape(8.dp), color = EmeraldGreen.copy(alpha = 0.15f)) {
                            Text("حضور: $presentCount", color = EmeraldGreen, fontWeight = FontWeight.Bold, fontSize = 11.sp, modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp))
                        }
                        Surface(shape = RoundedCornerShape(8.dp), color = Color.Red.copy(alpha = 0.15f)) {
                            Text("غياب: $absentCount", color = Color.Red, fontWeight = FontWeight.Bold, fontSize = 11.sp, modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp))
                        }
                    }
                }
            }

            // Student attendance list
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(students) { student ->
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(12.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(student.studentName, fontWeight = FontWeight.SemiBold, fontSize = 13.sp)

                            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                AttendanceStatus.values().forEach { st ->
                                    val isCurrent = student.status == st
                                    Surface(
                                        modifier = Modifier.clickable {
                                            val index = students.indexOf(student)
                                            if (index != -1) {
                                                students[index] = student.copy(status = st)
                                            }
                                        },
                                        shape = RoundedCornerShape(8.dp),
                                        color = if (isCurrent) Color(android.graphics.Color.parseColor(st.colorHex)) else Color(0xFFE2E8F0)
                                    ) {
                                        Text(
                                            text = st.labelAr,
                                            color = if (isCurrent) Color.White else Color.DarkGray,
                                            fontSize = 10.sp,
                                            fontWeight = if (isCurrent) FontWeight.Bold else FontWeight.Normal,
                                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
