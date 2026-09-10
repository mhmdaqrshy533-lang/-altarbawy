package com.raqeem.edu.features.books

import androidx.compose.foundation.background
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
import com.raqeem.edu.core.model.BookDocumentType
import com.raqeem.edu.core.model.BookProject
import com.raqeem.edu.ui.theme.EmeraldGreen
import com.raqeem.edu.ui.theme.RoyalNavy

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BookStudioScreen(
    onBack: () -> Unit
) {
    val bookProject = remember { mutableStateOf(BookProject()) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("استوديو تأليف الكتب والملازم", fontWeight = FontWeight.Bold, color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowForward, contentDescription = "رجوع", tint = Color.White)
                    }
                },
                actions = {
                    IconButton(onClick = { /* Export Book to PDF */ }) {
                        Icon(Icons.Default.MenuBook, contentDescription = "معاينة الكتاب", tint = Color.White)
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
            // Book Cover Preview Card
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = RoyalNavy)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(20.dp),
                    verticalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = EmeraldGreen
                        ) {
                            Text(
                                text = bookProject.value.documentType.badge,
                                color = Color.White,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                            )
                        }
                        Text("الجمهورية اليمنية", color = Color.White.copy(alpha = 0.8f), fontSize = 11.sp)
                    }

                    Column {
                        Text(
                            text = bookProject.value.cover.mainTitle,
                            color = Color.White,
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 20.sp
                        )
                        Text(
                            text = bookProject.value.cover.subtitle,
                            color = Color.White.copy(alpha = 0.85f),
                            fontSize = 12.sp
                        )
                    }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("المؤلف: ${bookProject.value.cover.authorName}", color = Color.White.copy(alpha = 0.9f), fontSize = 11.sp)
                        Text(bookProject.value.cover.editionNumber, color = Color.White.copy(alpha = 0.7f), fontSize = 10.sp)
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))
            Text("فصول وأبواب الملزمة:", fontWeight = FontWeight.Bold, fontSize = 14.sp)
            Spacer(modifier = Modifier.height(8.dp))

            // Outline chapters list
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                val chapters = listOf(
                    "الوحدة الأولى: علم الحركة والقوى الدورانية",
                    "الوحدة الثانية: الديناميكا الحرارية والمحركات",
                    "الوحدة الثالثة: الكهرومغناطيسية والدوائر المترددة",
                    "الوحدة الرابعة: الفيزياء الذرية والإشعاع"
                )
                items(chapters) { chapter ->
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(14.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(Icons.Default.Bookmark, contentDescription = null, tint = RoyalNavy, modifier = Modifier.size(20.dp))
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(chapter, fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                            }
                            Icon(Icons.Default.ChevronLeft, contentDescription = null, tint = Color.Gray)
                        }
                    }
                }
            }
        }
    }
}
