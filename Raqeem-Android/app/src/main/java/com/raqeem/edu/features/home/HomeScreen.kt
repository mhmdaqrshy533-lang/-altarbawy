package com.raqeem.edu.features.home

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.raqeem.edu.ui.navigation.Screen
import com.raqeem.edu.ui.theme.RoyalNavy

data class PortalCard(
    val title: String,
    val subtitle: String,
    val icon: ImageVector,
    val route: String,
    val color: Color
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    onNavigate: (String) -> Unit
) {
    val portals = listOf(
        PortalCard("محرر الامتحانات", "إعداد وتنسيق الاختبارات المعيارية A4", Icons.Default.EditDocument, Screen.ExamEditor.createRoute("new"), Color(0xFF004B6E)),
        PortalCard("الكشوفات والنتائج", "رصد درجات الطلاب ومبيضات النتائج", Icons.Default.Assessment, Screen.GradeRecords.route, Color(0xFF0D7A68)),
        PortalCard("الشهادات والوثائق", "شهادات الإجازة والتفوق والاعتماد", Icons.Default.WorkspacePremium, Screen.Certificates.route, Color(0xFFB45309)),
        PortalCard("الكتب والمذكرات", "تأليف الملازم والكتيبات التعليمية", Icons.Default.MenuBook, Screen.BookStudio.route, Color(0xFF0284C7)),
        PortalCard("الحضور والغياب", "حصر المواظبة اليومية والانضباط", Icons.Default.CoPresent, Screen.Attendance.route, Color(0xFF4F46E5)),
        PortalCard("المستندات الرسمية", "المذكرات الإدارية والتعاميم والقرارات", Icons.Default.Description, Screen.OfficialMemos.route, Color(0xFF475569)),
        PortalCard("مركز القوالب", "قوالب امتحانية وشهادات جاهزة", Icons.Default.DashboardCustomize, Screen.TemplateCenter.route, Color(0xFF059669)),
        PortalCard("بنك الأصول", "الشعارات والأختام والتواقيع والخطوط", Icons.Default.FolderSpecial, Screen.AssetManager.route, Color(0xFFD97706)),
        PortalCard("إعدادات المنظومة", "بيانات المدرسة والمعايير والخطوط", Icons.Default.Settings, Screen.Settings.route, Color(0xFF334155))
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "محرر الرقيم التربوي",
                            fontWeight = FontWeight.Bold,
                            fontSize = 18.sp,
                            color = Color.White
                        )
                        Text(
                            text = "المنصة الموحدة لإعداد وتحرير الوثائق المدرسية",
                            fontSize = 11.sp,
                            color = Color.White.copy(alpha = 0.8f)
                        )
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
            // Institutional Welcome Banner
            Surface(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 16.dp),
                shape = RoundedCornerShape(16.dp),
                color = MaterialTheme.colorScheme.surfaceVariant
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.School,
                        contentDescription = null,
                        tint = RoyalNavy,
                        modifier = Modifier.size(36.dp)
                    )
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text(
                            text = "منظومة الرقيم السيادية Offline-First",
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp
                        )
                        Text(
                            text = "محرك تنسيق وطباعة A4 معياري مستقل بدون اتصال بالإنترنت",
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }

            // Grid of 9 Core Portals
            LazyVerticalGrid(
                columns = GridCells.Adaptive(minSize = 160.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items(portals) { portal ->
                    PortalCardItem(portal = portal, onClick = { onNavigate(portal.route) })
                }
            }
        }
    }
}

@Composable
fun PortalCardItem(portal: PortalCard, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(135.dp)
            .clickable { onClick() },
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(14.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(portal.color.copy(alpha = 0.12f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = portal.icon,
                    contentDescription = portal.title,
                    tint = portal.color,
                    modifier = Modifier.size(24.dp)
                )
            }

            Column {
                Text(
                    text = portal.title,
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp
                )
                Text(
                    text = portal.subtitle,
                    fontSize = 10.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    maxLines = 1
                )
            }
        }
    }
}
