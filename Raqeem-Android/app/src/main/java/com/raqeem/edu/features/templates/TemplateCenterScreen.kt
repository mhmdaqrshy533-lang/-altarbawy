package com.raqeem.edu.features.templates

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.raqeem.edu.ui.theme.EmeraldGreen
import com.raqeem.edu.ui.theme.RoyalNavy

data class TemplateItem(val title: String, val category: String, val paper: String)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TemplateCenterScreen(
    onBack: () -> Unit
) {
    val templates = listOf(
        TemplateItem("النموذج الوزاري الرسمي الموحد", "امتحانات", "A4 عمودي"),
        TemplateItem("نموذج امتحان مؤتمت وتظليل OMR", "أتمتة", "A4 عمودي"),
        TemplateItem("كشف رصد الدرجات وأعمال السنة", "سجلات", "A4 أفقي"),
        TemplateItem("شهادة إجازة وسند شرعي", "شهادات", "A4 عمودي"),
        TemplateItem("شهادة تفوق ووسام مدرسي", "شهادات", "A4 أفقي"),
        TemplateItem("ملزمة مراجعة دراسية شاملة", "كتب وملازم", "A4 عمودي")
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("مركز القوالب التعليمية المعتمدة", fontWeight = FontWeight.Bold, color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowForward, contentDescription = "رجوع", tint = Color.White)
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
            LazyVerticalGrid(
                columns = GridCells.Adaptive(minSize = 150.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                items(templates) { item ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(130.dp),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxSize()
                                .padding(12.dp),
                            verticalArrangement = Arrangement.SpaceBetween
                        ) {
                            Surface(shape = RoundedCornerShape(6.dp), color = RoyalNavy.copy(alpha = 0.1f)) {
                                Text(item.category, color = RoyalNavy, fontSize = 9.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp))
                            }
                            Text(item.title, fontWeight = FontWeight.Bold, fontSize = 12.sp, maxLines = 2)
                            Text(item.paper, fontSize = 10.sp, color = Color.Gray)
                        }
                    }
                }
            }
        }
    }
}
