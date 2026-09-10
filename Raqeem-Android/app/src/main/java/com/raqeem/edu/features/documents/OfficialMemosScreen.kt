package com.raqeem.edu.features.documents

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.raqeem.edu.ui.theme.RoyalNavy

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun OfficialMemosScreen(
    onBack: () -> Unit
) {
    val memos = listOf(
        "تعميم وزاري بشأن مواعيد الامتحانات النهائية للعام الدراسي 1447هـ",
        "قرار إداري بتشكيل لجنة الكنترول والرصد والمراجعة",
        "أمر تكليف برئاسة لجان المراقبة للفصل الدراسي الأول",
        "مذكرة داخلية بشأن ضوابط تصحيح أوراق التظليل OMR"
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("المستندات والتعاميم الرسمية", fontWeight = FontWeight.Bold, color = Color.White) },
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
            LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                items(memos) { memo ->
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(14.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(
                                modifier = Modifier.weight(1f),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(Icons.Default.Description, contentDescription = null, tint = RoyalNavy)
                                Spacer(modifier = Modifier.width(10.dp))
                                Text(memo, fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
                            }
                            Icon(Icons.Default.ChevronLeft, contentDescription = null, tint = Color.Gray)
                        }
                    }
                }
            }
        }
    }
}
