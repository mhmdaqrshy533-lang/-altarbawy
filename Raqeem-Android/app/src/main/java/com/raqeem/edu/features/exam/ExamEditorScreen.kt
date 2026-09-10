package com.raqeem.edu.features.exam

import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.raqeem.edu.core.model.EditorElement
import com.raqeem.edu.core.model.ExamMetadata
import com.raqeem.edu.ui.theme.EmeraldGreen
import com.raqeem.edu.ui.theme.RoyalNavy

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ExamEditorScreen(
    examId: String,
    onBack: () -> Unit,
    viewModel: ExamViewModel = viewModel()
) {
    val context = LocalContext.current
    val document by viewModel.document.collectAsState()
    val statusMessage by viewModel.statusMessage.collectAsState()
    val snackbarHostState = remember { SnackbarHostState() }

    var showAddQuestionDialog by remember { mutableStateOf(false) }
    var showHeaderSettingsSheet by remember { mutableStateOf(false) }

    LaunchedEffect(examId) {
        viewModel.loadExam(examId)
    }

    LaunchedEffect(statusMessage) {
        statusMessage?.let {
            snackbarHostState.showSnackbar(it)
            viewModel.clearStatusMessage()
        }
    }

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) },
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(document.title, fontWeight = FontWeight.Bold, fontSize = 16.sp, color = Color.White)
                        Text("${document.metadata.subject} | ${document.metadata.grade}", fontSize = 11.sp, color = Color.White.copy(alpha = 0.8f))
                    }
                },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowForward, contentDescription = "رجوع", tint = Color.White)
                    }
                },
                actions = {
                    IconButton(onClick = { showHeaderSettingsSheet = true }) {
                        Icon(Icons.Default.Tune, contentDescription = "تعديل الترويسة", tint = Color.White)
                    }
                    IconButton(onClick = { viewModel.saveExam() }) {
                        Icon(Icons.Default.Save, contentDescription = "حفظ", tint = Color.White)
                    }
                    IconButton(onClick = { viewModel.printDocument(context) }) {
                        Icon(Icons.Default.Print, contentDescription = "طباعة", tint = Color.White)
                    }
                    IconButton(onClick = { viewModel.exportAndSharePdf(context) }) {
                        Icon(Icons.Default.Share, contentDescription = "مشاركة PDF", tint = Color.White)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = RoyalNavy)
            )
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = { showAddQuestionDialog = true },
                containerColor = EmeraldGreen,
                contentColor = Color.White
            ) {
                Icon(Icons.Default.Add, contentDescription = "إضافة سؤال")
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(Color(0xFFE2E8F0))
                .padding(12.dp)
        ) {
            // A4 Canvas Container Simulation
            Card(
                modifier = Modifier
                    .fillMaxSize()
                    .shadow(4.dp, RoundedCornerShape(8.dp)),
                shape = RoundedCornerShape(8.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp)
                ) {
                    // 1. Institutional Standard Header
                    item {
                        ExamHeaderView(meta = document.metadata)
                        Divider(
                            modifier = Modifier.padding(vertical = 12.dp),
                            color = Color(0xFF004B6E),
                            thickness = 1.5.dp
                        )
                    }

                    // 2. Questions List
                    val page = document.pages.firstOrNull()
                    val questions = page?.elements?.filter { it.isQuestion } ?: emptyList()

                    if (questions.isEmpty()) {
                        item {
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 40.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = "لا توجد أسئلة مضافة حتى الآن. انقر على (+) لإضافة سؤال.",
                                    color = Color.Gray,
                                    fontSize = 13.sp
                                )
                            }
                        }
                    } else {
                        items(questions, key = { it.id }) { question ->
                            QuestionCardItem(
                                question = question,
                                onDelete = { viewModel.removeQuestion(0, question.id) }
                            )
                        }
                    }

                    // 3. Institutional Footer
                    item {
                        Spacer(modifier = Modifier.height(24.dp))
                        Divider(color = Color.LightGray, thickness = 1.dp)
                        Spacer(modifier = Modifier.height(8.dp))
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(
                                text = "مع تمنياتنا لكم بالنجاح والتوفيق",
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF004B6E)
                            )
                            Text(
                                text = "معلم المادة: ${document.metadata.teacherName}",
                                fontSize = 11.sp,
                                color = Color.DarkGray
                            )
                        }
                    }
                }
            }
        }
    }

    if (showAddQuestionDialog) {
        AddQuestionDialog(
            onDismiss = { showAddQuestionDialog = false },
            onAdd = { content, type, marks, options ->
                viewModel.addQuestion(content, type, marks, options)
                showAddQuestionDialog = false
            }
        )
    }

    if (showHeaderSettingsSheet) {
        HeaderSettingsModal(
            metadata = document.metadata,
            onDismiss = { showHeaderSettingsSheet = false },
            onSave = { updatedMeta ->
                viewModel.updateMetadata { meta ->
                    meta.country = updatedMeta.country
                    meta.ministry = updatedMeta.ministry
                    meta.school = updatedMeta.school
                    meta.subject = updatedMeta.subject
                    meta.grade = updatedMeta.grade
                    meta.semester = updatedMeta.semester
                    meta.academicYear = updatedMeta.academicYear
                    meta.time = updatedMeta.time
                    meta.marks = updatedMeta.marks
                    meta.teacherName = updatedMeta.teacherName
                }
                showHeaderSettingsSheet = false
            }
        )
    }
}

@Composable
fun ExamHeaderView(meta: ExamMetadata) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Right: Hierarchy
        Column(horizontalAlignment = Alignment.Start) {
            Text(meta.country, fontSize = 11.sp, fontWeight = FontWeight.Bold)
            Text(meta.ministry, fontSize = 10.sp)
            Text("${meta.governorate} - ${meta.directorate}", fontSize = 9.sp, color = Color.Gray)
            Text(meta.school, fontSize = 10.sp, fontWeight = FontWeight.Bold)
        }

        // Center: Title
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(meta.examTitle, fontSize = 13.sp, fontWeight = FontWeight.ExtraBold, color = RoyalNavy)
            Text("المادة: ${meta.subject} | ${meta.grade}", fontSize = 11.sp, fontWeight = FontWeight.Bold)
            Text("الزمن: ${meta.time} | الدرجة الكلية: (${meta.marks})", fontSize = 10.sp, color = Color.DarkGray)
        }

        // Left: Details
        Column(horizontalAlignment = Alignment.End) {
            Text("العام: ${meta.academicYear}", fontSize = 10.sp)
            Text("الفصل: ${meta.semester}", fontSize = 10.sp)
            Text("نموذج: (${meta.modelCode})", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = RoyalNavy)
        }
    }
}

@Composable
fun QuestionCardItem(
    question: EditorElement,
    onDelete: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 6.dp)
            .border(1.dp, Color(0xFFCBD5E1), RoundedCornerShape(8.dp)),
        colors = CardDefaults.cardColors(containerColor = Color(0xFFF8FAFC)),
        shape = RoundedCornerShape(8.dp)
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "س (${question.questionNumber ?: 1}): ${question.content}",
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp,
                    modifier = Modifier.weight(1f)
                )
                Text(
                    text = "[${question.marks ?: 5} درجات]",
                    fontWeight = FontWeight.Bold,
                    fontSize = 11.sp,
                    color = EmeraldGreen
                )
                IconButton(onClick = onDelete, modifier = Modifier.size(24.dp)) {
                    Icon(Icons.Default.Delete, contentDescription = "حذف", tint = Color.Red, modifier = Modifier.size(16.dp))
                }
            }

            if (question.options.isNotEmpty()) {
                Spacer(modifier = Modifier.height(8.dp))
                val labels = listOf("أ", "ب", "ج", "د")
                question.options.forEachIndexed { index, option ->
                    val label = labels.getOrElse(index) { "${index + 1}" }
                    Text(
                        text = "($label) $option",
                        fontSize = 12.sp,
                        color = Color.DarkGray,
                        modifier = Modifier.padding(vertical = 2.dp, horizontal = 8.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun AddQuestionDialog(
    onDismiss: () -> Unit,
    onAdd: (content: String, type: String, marks: Float, options: List<String>) -> Unit
) {
    var content by remember { mutableStateOf("") }
    var type by remember { mutableStateOf("essay") }
    var marksText by remember { mutableStateOf("5") }
    var option1 by remember { mutableStateOf("") }
    var option2 by remember { mutableStateOf("") }
    var option3 by remember { mutableStateOf("") }
    var option4 by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("إضافة سؤال جديد", fontWeight = FontWeight.Bold) },
        text = {
            Column(modifier = Modifier.fillMaxWidth()) {
                OutlinedTextField(
                    value = content,
                    onValueChange = { content = it },
                    label = { Text("نص السؤال") },
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(8.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Button(
                        onClick = { type = "essay" },
                        colors = ButtonDefaults.buttonColors(containerColor = if (type == "essay") RoyalNavy else Color.LightGray)
                    ) {
                        Text("مقالي", fontSize = 11.sp)
                    }
                    Button(
                        onClick = { type = "mcq" },
                        colors = ButtonDefaults.buttonColors(containerColor = if (type == "mcq") RoyalNavy else Color.LightGray)
                    ) {
                        Text("اختيار من متعدد", fontSize = 11.sp)
                    }
                }
                Spacer(modifier = Modifier.height(8.dp))
                OutlinedTextField(
                    value = marksText,
                    onValueChange = { marksText = it },
                    label = { Text("الدرجة") },
                    modifier = Modifier.fillMaxWidth()
                )
                if (type == "mcq") {
                    Spacer(modifier = Modifier.height(8.dp))
                    OutlinedTextField(value = option1, onValueChange = { option1 = it }, label = { Text("الخيار (أ)") }, modifier = Modifier.fillMaxWidth())
                    OutlinedTextField(value = option2, onValueChange = { option2 = it }, label = { Text("الخيار (ب)") }, modifier = Modifier.fillMaxWidth())
                    OutlinedTextField(value = option3, onValueChange = { option3 = it }, label = { Text("الخيار (ج)") }, modifier = Modifier.fillMaxWidth())
                    OutlinedTextField(value = option4, onValueChange = { option4 = it }, label = { Text("الخيار (د)") }, modifier = Modifier.fillMaxWidth())
                }
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    val opts = if (type == "mcq") listOf(option1, option2, option3, option4).filter { it.isNotBlank() } else emptyList()
                    onAdd(content, type, marksText.toFloatOrNull() ?: 5f, opts)
                },
                colors = ButtonDefaults.buttonColors(containerColor = EmeraldGreen)
            ) {
                Text("إضافة")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("إلغاء") }
        }
    )
}

@Composable
fun HeaderSettingsModal(
    metadata: ExamMetadata,
    onDismiss: () -> Unit,
    onSave: (ExamMetadata) -> Unit
) {
    var school by remember { mutableStateOf(metadata.school) }
    var subject by remember { mutableStateOf(metadata.subject) }
    var grade by remember { mutableStateOf(metadata.grade) }
    var academicYear by remember { mutableStateOf(metadata.academicYear) }
    var semester by remember { mutableStateOf(metadata.semester) }
    var time by remember { mutableStateOf(metadata.time) }
    var marks by remember { mutableStateOf(metadata.marks) }
    var teacherName by remember { mutableStateOf(metadata.teacherName) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("تعديل ترويسة الامتحان", fontWeight = FontWeight.Bold) },
        text = {
            LazyColumn(modifier = Modifier.fillMaxWidth()) {
                item {
                    OutlinedTextField(value = school, onValueChange = { school = it }, label = { Text("اسم المدرسة") }, modifier = Modifier.fillMaxWidth())
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(value = subject, onValueChange = { subject = it }, label = { Text("المادة") }, modifier = Modifier.fillMaxWidth())
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(value = grade, onValueChange = { grade = it }, label = { Text("الصف / المرحلة") }, modifier = Modifier.fillMaxWidth())
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(value = academicYear, onValueChange = { academicYear = it }, label = { Text("العام الدراسي") }, modifier = Modifier.fillMaxWidth())
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(value = semester, onValueChange = { semester = it }, label = { Text("الفصل") }, modifier = Modifier.fillMaxWidth())
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(value = time, onValueChange = { time = it }, label = { Text("الزمن") }, modifier = Modifier.fillMaxWidth())
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(value = marks, onValueChange = { marks = it }, label = { Text("الدرجة الكلية") }, modifier = Modifier.fillMaxWidth())
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(value = teacherName, onValueChange = { teacherName = it }, label = { Text("معلم المادة") }, modifier = Modifier.fillMaxWidth())
                }
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    val updated = metadata.copy(
                        school = school,
                        subject = subject,
                        grade = grade,
                        academicYear = academicYear,
                        semester = semester,
                        time = time,
                        marks = marks,
                        teacherName = teacherName
                    )
                    onSave(updated)
                },
                colors = ButtonDefaults.buttonColors(containerColor = RoyalNavy)
            ) {
                Text("حفظ الترويسة")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("إلغاء") }
        }
    )
}
