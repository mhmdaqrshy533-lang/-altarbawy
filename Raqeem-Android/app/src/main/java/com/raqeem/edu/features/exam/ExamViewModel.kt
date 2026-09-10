package com.raqeem.edu.features.exam

import android.app.Application
import android.content.Context
import android.content.Intent
import android.print.PrintManager
import androidx.core.content.FileProvider
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.raqeem.edu.RaqeemApp
import com.raqeem.edu.core.document.DocumentEngine
import com.raqeem.edu.core.model.*
import com.raqeem.edu.core.pdf.PdfExportEngine
import com.raqeem.edu.core.printing.RaqeemPrintAdapter
import com.raqeem.edu.data.repository.ExamRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.io.File

class ExamViewModel(application: Application) : AndroidViewModel(application) {

    private val repository: ExamRepository
    private val documentEngine = DocumentEngine()

    private val _document = MutableStateFlow(DocumentModel())
    val document: StateFlow<DocumentModel> = _document.asStateFlow()

    private val _selectedPageIndex = MutableStateFlow(0)
    val selectedPageIndex: StateFlow<Int> = _selectedPageIndex.asStateFlow()

    private val _statusMessage = MutableStateFlow<String?>(null)
    val statusMessage: StateFlow<String?> = _statusMessage.asStateFlow()

    init {
        val db = (application as RaqeemApp).database
        repository = ExamRepository(db.examDao())
    }

    fun loadExam(examId: String) {
        if (examId == "new") {
            val doc = DocumentModel()
            documentEngine.addQuestion(
                doc, 0,
                "اذكر المعنى الإجمالي لقوله تعالى في سورة الحجرات.",
                "essay", 10f
            )
            documentEngine.addQuestion(
                doc, 0,
                "اختر الإجابة الصحيحة مما يلي:",
                "mcq", 10f,
                listOf("الإخلاص في العمل", "ترك الرياء والسمعة", "جميع ما سبق صحيح")
            )
            _document.value = doc
            return
        }

        viewModelScope.launch {
            val existing = repository.getExamById(examId)
            if (existing != null) {
                _document.value = existing
            }
        }
    }

    fun addQuestion(content: String, type: String, marks: Float, options: List<String>) {
        val currentDoc = _document.value
        documentEngine.addQuestion(currentDoc, _selectedPageIndex.value, content, type, marks, options)
        _document.value = currentDoc.copy(updatedAt = System.currentTimeMillis())
        saveExam()
    }

    fun removeQuestion(pageIndex: Int, elementId: String) {
        val currentDoc = _document.value
        val page = currentDoc.pages.getOrNull(pageIndex) ?: return
        page.elements.removeAll { it.id == elementId }
        documentEngine.renumberQuestions(currentDoc)
        _document.value = currentDoc.copy(updatedAt = System.currentTimeMillis())
        saveExam()
    }

    fun updateMetadata(update: (ExamMetadata) -> Unit) {
        val currentDoc = _document.value
        update(currentDoc.metadata)
        _document.value = currentDoc.copy(updatedAt = System.currentTimeMillis())
        saveExam()
    }

    fun addPage() {
        val currentDoc = _document.value
        documentEngine.addPage(currentDoc)
        _document.value = currentDoc.copy(updatedAt = System.currentTimeMillis())
        _selectedPageIndex.value = currentDoc.pages.size - 1
        saveExam()
    }

    fun saveExam() {
        viewModelScope.launch {
            repository.saveExam(_document.value)
            _statusMessage.value = "تم الحفظ بنجاح"
        }
    }

    fun exportAndSharePdf(context: Context) {
        val file = File(context.cacheDir, "${_document.value.title}.pdf")
        val engine = PdfExportEngine(context)
        val success = engine.exportDocumentToPdf(_document.value, file)

        if (success) {
            val uri = FileProvider.getUriForFile(context, "${context.packageName}.fileprovider", file)
            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                type = "application/pdf"
                putExtra(Intent.EXTRA_STREAM, uri)
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
            }
            context.startActivity(Intent.createChooser(shareIntent, "مشاركة الامتحان عبر"))
        } else {
            _statusMessage.value = "فشل تصدير ملف PDF"
        }
    }

    fun printDocument(context: Context) {
        val printManager = context.getSystemService(Context.PRINT_SERVICE) as? PrintManager
        if (printManager != null) {
            val adapter = RaqeemPrintAdapter(context, _document.value)
            printManager.print(_document.value.title, adapter, null)
        }
    }

    fun clearStatusMessage() {
        _statusMessage.value = null
    }
}
