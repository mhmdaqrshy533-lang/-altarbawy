package com.raqeem.edu.features.certificates

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
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
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.raqeem.edu.core.model.CertificateDocument
import com.raqeem.edu.core.model.CertificateType
import com.raqeem.edu.ui.theme.EmeraldGreen
import com.raqeem.edu.ui.theme.NobleGold
import com.raqeem.edu.ui.theme.RoyalNavy

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CertificatesScreen(
    onBack: () -> Unit
) {
    var selectedType by remember { mutableStateOf(CertificateType.ACADEMIC_EXCELLENCE) }
    var certificateData by remember { mutableStateOf(CertificateDocument()) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("استوديو الشهادات والوثائق", fontWeight = FontWeight.Bold, color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowForward, contentDescription = "رجوع", tint = Color.White)
                    }
                },
                actions = {
                    IconButton(onClick = { /* Print / Export */ }) {
                        Icon(Icons.Default.Print, contentDescription = "طباعة الشهادة", tint = Color.White)
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
            // Template Selector Row
            Text("اختر قالب الشهادة المعتمد:", fontWeight = FontWeight.Bold, fontSize = 13.sp, modifier = Modifier.padding(bottom = 8.dp))
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.padding(bottom = 16.dp)
            ) {
                items(CertificateType.values()) { type ->
                    val isSelected = selectedType == type
                    Surface(
                        modifier = Modifier.clickable { selectedType = type },
                        shape = RoundedCornerShape(12.dp),
                        color = if (isSelected) RoyalNavy else Color(0xFFE2E8F0)
                    ) {
                        Text(
                            text = type.title,
                            color = if (isSelected) Color.White else Color(0xFF0F172A),
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                            fontSize = 12.sp,
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp)
                        )
                    }
                }
            }

            // Certificate Live Preview Canvas
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(340.dp)
                    .border(3.dp, NobleGold, RoundedCornerShape(16.dp)),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFFFFFDF5))
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.SpaceBetween
                ) {
                    // Header
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(
                            text = "بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ",
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp,
                            color = NobleGold
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = selectedType.title,
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 18.sp,
                            color = RoyalNavy
                        )
                        Text(
                            text = certificateData.schoolName,
                            fontSize = 12.sp,
                            color = Color.DarkGray
                        )
                    }

                    // Body Text
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(
                            text = "تمنح هذه الشهادة للطالب المتميز:",
                            fontSize = 12.sp,
                            color = Color.Gray
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = certificateData.studentName,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold,
                            color = RoyalNavy
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = certificateData.appreciationText,
                            fontSize = 11.sp,
                            textAlign = TextAlign.Center,
                            color = Color(0xFF334155),
                            modifier = Modifier.padding(horizontal = 16.dp)
                        )
                    }

                    // Signatures & Stamp
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("معلم المادة", fontSize = 10.sp, color = Color.Gray)
                            Text(certificateData.teacherName, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                        }

                        // Gold Seal
                        Surface(
                            shape = RoundedCornerShape(20.dp),
                            color = NobleGold.copy(alpha = 0.15f),
                            modifier = Modifier.padding(4.dp)
                        ) {
                            Text(
                                text = "ختم الاعتماد الرسمي",
                                fontSize = 9.sp,
                                color = NobleGold,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                            )
                        }

                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("مدير المدرسة", fontSize = 10.sp, color = Color.Gray)
                            Text(certificateData.principalName, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }
    }
}
