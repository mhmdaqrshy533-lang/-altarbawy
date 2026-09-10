package com.raqeem.edu.features.settings

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.raqeem.edu.ui.theme.RoyalNavy

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsScreen(
    onBack: () -> Unit
) {
    var schoolName by remember { mutableStateOf("مدرسة الرقيم النموذجية") }
    var directorate by remember { mutableStateOf("مديرية المظفر") }
    var governorate by remember { mutableStateOf("محافظة تعز") }
    var country by remember { mutableStateOf("الجمهورية اليمنية") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("إعدادات المنظومة والمعايير", fontWeight = FontWeight.Bold, color = Color.White) },
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
            Text("البيانات المؤسسية المعتمدة:", fontWeight = FontWeight.Bold, fontSize = 14.sp)
            Spacer(modifier = Modifier.height(12.dp))

            OutlinedTextField(value = country, onValueChange = { country = it }, label = { Text("الدولة") }, modifier = Modifier.fillMaxWidth())
            Spacer(modifier = Modifier.height(8.dp))
            OutlinedTextField(value = governorate, onValueChange = { governorate = it }, label = { Text("المحافظة") }, modifier = Modifier.fillMaxWidth())
            Spacer(modifier = Modifier.height(8.dp))
            OutlinedTextField(value = directorate, onValueChange = { directorate = it }, label = { Text("المديرية") }, modifier = Modifier.fillMaxWidth())
            Spacer(modifier = Modifier.height(8.dp))
            OutlinedTextField(value = schoolName, onValueChange = { schoolName = it }, label = { Text("اسم المدرسة / المجمع") }, modifier = Modifier.fillMaxWidth())

            Spacer(modifier = Modifier.height(24.dp))
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text("الإصدار والنظام:", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                    Spacer(modifier = Modifier.height(4.dp))
                    Text("محرر الرقيم التربوي — Native Android Edition v1.0.0", fontSize = 11.sp, color = Color.DarkGray)
                    Text("محرك الطباعة والمعايير: Sovereign Document Engine v2.0", fontSize = 11.sp, color = Color.DarkGray)
                    Text("الوضع: غير متصل بالإنترنت بالكامل (Offline-First)", fontSize = 11.sp, color = RoyalNavy, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}
