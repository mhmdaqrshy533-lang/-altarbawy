package com.raqeem.edu.features.assets

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
import com.raqeem.edu.core.model.AssetCategory
import com.raqeem.edu.core.model.AssetItem
import com.raqeem.edu.ui.theme.EmeraldGreen
import com.raqeem.edu.ui.theme.RoyalNavy

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AssetManagerScreen(
    onBack: () -> Unit
) {
    val assets = listOf(
        AssetItem(name = "شعار الجمهورية اليمنية (نسر الدولة الرسمي)", category = AssetCategory.LOGOS, uriOrPath = "assets/logos/yemen_eagle.png"),
        AssetItem(name = "شعار وزارة التربية والتعليم والبحث العلمي", category = AssetCategory.LOGOS, uriOrPath = "assets/logos/ministry_logo.png"),
        AssetItem(name = "الختم الدائري الرسمي للمدرسة", category = AssetCategory.LOGOS, uriOrPath = "assets/stamps/school_stamp.png"),
        AssetItem(name = "الإطار التراثي المذهب لشهادات الإجازة", category = AssetCategory.FRAMES, uriOrPath = "assets/frames/quran_gold_frame.png"),
        AssetItem(name = "وسام التفوق الأكاديمي الذهبي", category = AssetCategory.BADGES, uriOrPath = "assets/badges/gold_medal.png")
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("مدير وبنك الأصول والشعارات", fontWeight = FontWeight.Bold, color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowForward, contentDescription = "رجوع", tint = Color.White)
                    }
                },
                actions = {
                    IconButton(onClick = { /* Pick Image from Storage */ }) {
                        Icon(Icons.Default.AddPhotoAlternate, contentDescription = "استيراد صورة", tint = Color.White)
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
                items(assets) { asset ->
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
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(Icons.Default.Image, contentDescription = null, tint = RoyalNavy)
                                Spacer(modifier = Modifier.width(10.dp))
                                Column {
                                    Text(asset.name, fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
                                    Text(asset.category.title, fontSize = 10.sp, color = Color.Gray)
                                }
                            }
                            Surface(shape = RoundedCornerShape(6.dp), color = EmeraldGreen.copy(alpha = 0.15f)) {
                                Text("جاهز Offline", color = EmeraldGreen, fontSize = 9.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp))
                            }
                        }
                    }
                }
            }
        }
    }
}
