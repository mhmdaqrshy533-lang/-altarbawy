package com.raqeem.edu.core.document

import com.raqeem.edu.core.model.*

class DocumentEngine {

    fun renumberQuestions(document: DocumentModel) {
        var currentNumber = 1
        document.pages.forEach { page ->
            page.elements.filter { it.isQuestion }.forEach { questionElement ->
                questionElement.questionNumber = currentNumber++
            }
        }
    }

    fun calculateTotalMarks(document: DocumentModel): Float {
        var total = 0f
        document.pages.forEach { page ->
            page.elements.filter { it.isQuestion }.forEach { question ->
                total += (question.marks ?: 0f)
            }
        }
        return total
    }

    fun addQuestion(
        document: DocumentModel,
        pageIndex: Int,
        content: String,
        type: String,
        marks: Float = 5f,
        options: List<String> = emptyList()
    ): EditorElement {
        val page = document.pages.getOrElse(pageIndex) { document.pages.first() }
        val lastY = page.elements.maxOfOrNull { it.y + it.height } ?: 120f
        val newQuestion = EditorElement(
            type = ElementType.TEXT,
            x = document.margins.right,
            y = lastY + 15f,
            width = 595.28f - document.margins.left - document.margins.right,
            height = if (type == "mcq") 90f else 50f,
            content = content,
            isQuestion = true,
            questionType = type,
            marks = marks,
            options = options
        )
        page.elements.add(newQuestion)
        renumberQuestions(document)
        document.updatedAt = System.currentTimeMillis()
        return newQuestion
    }

    fun addPage(document: DocumentModel): DocumentPage {
        val newPage = DocumentPage(pageNumber = document.pages.size + 1)
        document.pages.add(newPage)
        document.updatedAt = System.currentTimeMillis()
        return newPage
    }

    fun removePage(document: DocumentModel, pageIndex: Int): Boolean {
        if (document.pages.size <= 1) return false
        if (pageIndex in document.pages.indices) {
            document.pages.removeAt(pageIndex)
            document.pages.forEachIndexed { index, page ->
                // Keep page numbers normalized
            }
            renumberQuestions(document)
            document.updatedAt = System.currentTimeMillis()
            return true
        }
        return false
    }
}
