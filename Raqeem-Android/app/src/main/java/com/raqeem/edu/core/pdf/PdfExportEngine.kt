package com.raqeem.edu.core.pdf

import android.content.Context
import android.graphics.*
import android.graphics.pdf.PdfDocument
import com.raqeem.edu.core.document.A4Geometry
import com.raqeem.edu.core.model.*
import java.io.File
import java.io.FileOutputStream

/**
 * True Vector PDF Export Engine for Android.
 * Draws mathematical vector geometry, precise typography, tables, and borders directly onto Android's PdfDocument.
 */
class PdfExportEngine(private val context: Context) {

    fun exportDocumentToPdf(document: DocumentModel, outputFile: File): Boolean {
        val pdfDocument = PdfDocument()
        val isLandscape = document.orientation == PageOrientation.LANDSCAPE
        val (pageWidthPt, pageHeightPt) = A4Geometry.getPageDimensions(document.paperSize, isLandscape)

        val textPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            color = Color.parseColor("#0F172A")
            textSize = 12f
            typeface = Typeface.create(Typeface.SERIF, Typeface.NORMAL)
            textAlign = Paint.Align.RIGHT
        }

        val titlePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            color = Color.parseColor(document.metadata.themePrimaryColor)
            textSize = 14f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            textAlign = Paint.Align.CENTER
        }

        val borderPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            color = Color.parseColor(document.metadata.themeBorderColor)
            strokeWidth = 2f
            style = Paint.Style.STROKE
        }

        try {
            document.pages.forEachIndexed { pageIndex, page ->
                val pageInfo = PdfDocument.PageInfo.Builder(pageWidthPt.toInt(), pageHeightPt.toInt(), pageIndex + 1).create()
                val pdfPage = pdfDocument.startPage(pageInfo)
                val canvas = pdfPage.canvas

                // 1. Draw Page Outer Border
                canvas.drawRect(
                    document.margins.left,
                    document.margins.top,
                    pageWidthPt - document.margins.right,
                    pageHeightPt - document.margins.bottom,
                    borderPaint
                )

                // 2. Draw Standardized Header (Page 1 only or repeated)
                if (pageIndex == 0) {
                    drawInstitutionalHeader(canvas, document.metadata, pageWidthPt, document.margins)
                }

                // 3. Draw Elements
                page.elements.filter { !it.isHidden }.sortedBy { it.zIndex }.forEach { element ->
                    when (element.type) {
                        ElementType.TEXT -> {
                            if (element.isQuestion) {
                                drawQuestionElement(canvas, element, pageWidthPt, textPaint)
                            } else {
                                textPaint.textSize = element.fontSize
                                textPaint.color = Color.parseColor(element.color)
                                canvas.drawText(element.content, element.x + element.width, element.y + element.fontSize, textPaint)
                            }
                        }
                        ElementType.TABLE -> {
                            drawTableElement(canvas, element)
                        }
                        ElementType.SHAPE -> {
                            val shapePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
                                color = Color.parseColor(element.strokeColor)
                                strokeWidth = element.strokeWidth
                                style = Paint.Style.STROKE
                            }
                            canvas.drawRect(element.x, element.y, element.x + element.width, element.y + element.height, shapePaint)
                        }
                        else -> {
                            // Render other element types safely
                        }
                    }
                }

                // 4. Draw Footer
                drawInstitutionalFooter(canvas, document.metadata, pageIndex + 1, document.pages.size, pageWidthPt, pageHeightPt, document.margins)

                pdfDocument.finishPage(pdfPage)
            }

            FileOutputStream(outputFile).use { out ->
                pdfDocument.writeTo(out)
            }
            return true
        } catch (e: Exception) {
            e.printStackTrace()
            return false
        } finally {
            pdfDocument.close()
        }
    }

    private fun drawInstitutionalHeader(canvas: Canvas, meta: ExamMetadata, pageWidth: Float, margins: MarginSettings) {
        val headerPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            textSize = 10f
            color = Color.parseColor("#0F172A")
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            textAlign = Paint.Align.RIGHT
        }

        val rightX = pageWidth - margins.right - 10f
        var topY = margins.top + 20f

        canvas.drawText(meta.country, rightX, topY, headerPaint)
        topY += 14f
        canvas.drawText(meta.ministry, rightX, topY, headerPaint)
        topY += 14f
        canvas.drawText("${meta.governorate} - ${meta.directorate}", rightX, topY, headerPaint)
        topY += 14f
        canvas.drawText(meta.school, rightX, topY, headerPaint)

        // Center Title Box
        val titlePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            textSize = 13f
            color = Color.parseColor(meta.themePrimaryColor)
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            textAlign = Paint.Align.CENTER
        }
        val centerX = pageWidth / 2f
        canvas.drawText(meta.examTitle, centerX, margins.top + 30f, titlePaint)
        
        val subTitlePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            textSize = 10f
            color = Color.parseColor("#475569")
            textAlign = Paint.Align.CENTER
        }
        canvas.drawText("المادة: ${meta.subject} | ${meta.grade} | الزمن: ${meta.time}", centerX, margins.top + 46f, subTitlePaint)

        // Left Box (Year, Round, Mark)
        val leftPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            textSize = 10f
            color = Color.parseColor("#0F172A")
            textAlign = Paint.Align.LEFT
        }
        val leftX = margins.left + 10f
        var leftY = margins.top + 20f
        canvas.drawText("العام الدراسي: ${meta.academicYear}", leftX, leftY, leftPaint)
        leftY += 14f
        canvas.drawText("الفصل: ${meta.semester}", leftX, leftY, leftPaint)
        leftY += 14f
        canvas.drawText("الدرجة الكلية: (${meta.marks}) درجة", leftX, leftY, leftPaint)

        // Divider
        val linePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            color = Color.parseColor("#CBD5E1")
            strokeWidth = 1.2f
        }
        canvas.drawLine(margins.left, margins.top + 75f, pageWidth - margins.right, margins.top + 75f, linePaint)
    }

    private fun drawQuestionElement(canvas: Canvas, q: EditorElement, pageWidth: Float, paint: Paint) {
        paint.textSize = 12f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        val qTitle = "السؤال (${q.questionNumber ?: 1}): ${q.content} [${q.marks ?: 5} درجات]"
        canvas.drawText(qTitle, q.x + q.width, q.y + 16f, paint)

        if (q.options.isNotEmpty()) {
            paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
            var optY = q.y + 36f
            val labels = listOf("أ", "ب", "ج", "د")
            q.options.forEachIndexed { i, opt ->
                val label = labels.getOrElse(i) { "${i + 1}" }
                canvas.drawText("($label) $opt", q.x + q.width - 20f, optY, paint)
                optY += 18f
            }
        }
    }

    private fun drawTableElement(canvas: Canvas, table: EditorElement) {
        val borderPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            color = Color.parseColor("#334155")
            strokeWidth = 1f
            style = Paint.Style.STROKE
        }
        val rowHeight = table.height / table.tableRows
        val colWidth = table.width / table.tableCols

        for (r in 0..table.tableRows) {
            val y = table.y + r * rowHeight
            canvas.drawLine(table.x, y, table.x + table.width, y, borderPaint)
        }
        for (c in 0..table.tableCols) {
            val x = table.x + c * colWidth
            canvas.drawLine(x, table.y, x, table.y + table.height, borderPaint)
        }
    }

    private fun drawInstitutionalFooter(canvas: Canvas, meta: ExamMetadata, current: Int, total: Int, pageWidth: Float, pageHeight: Float, margins: MarginSettings) {
        val footerY = pageHeight - margins.bottom - 10f
        val footerPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            textSize = 9f
            color = Color.parseColor("#64748B")
            textAlign = Paint.Align.CENTER
        }
        canvas.drawText("صفحة $current من $total — مع تمنياتنا بالتوفيق والنجاح | معلم المادة: ${meta.teacherName}", pageWidth / 2f, footerY, footerPaint)
    }
}
