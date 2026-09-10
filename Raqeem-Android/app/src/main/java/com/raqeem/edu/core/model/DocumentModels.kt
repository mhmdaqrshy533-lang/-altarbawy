package com.raqeem.edu.core.model

import com.google.gson.annotations.SerializedName
import java.util.UUID

enum class ElementType {
    @SerializedName("text") TEXT,
    @SerializedName("image") IMAGE,
    @SerializedName("math") MATH,
    @SerializedName("physics") PHYSICS,
    @SerializedName("table") TABLE,
    @SerializedName("shape") SHAPE
}

enum class PaperSize(val widthMm: Float, val heightMm: Float, val widthPt: Float, val heightPt: Float) {
    A4(210f, 297f, 595.28f, 841.89f),
    A3(297f, 420f, 841.89f, 1190.55f),
    A5(148f, 210f, 419.53f, 595.28f),
    Letter(215.9f, 279.4f, 612f, 792f),
    B5(176f, 250f, 498.9f, 708.66f)
}

enum class PageOrientation {
    @SerializedName("portrait") PORTRAIT,
    @SerializedName("landscape") LANDSCAPE
}

data class MarginSettings(
    val top: Float = 36f,
    val right: Float = 36f,
    val bottom: Float = 36f,
    val left: Float = 36f
)

data class EditorElement(
    val id: String = UUID.randomUUID().toString(),
    val type: ElementType = ElementType.TEXT,
    var x: Float = 0f,
    var y: Float = 0f,
    var width: Float = 200f,
    var height: Float = 60f,
    var rotation: Float = 0f,
    var isLocked: Boolean = false,
    var isHidden: Boolean = false,
    var zIndex: Int = 0,
    
    // Text / Question properties
    var content: String = "",
    var fontSize: Float = 14f,
    var fontFamily: String = "Cairo",
    var fontWeight: String = "normal",
    var color: String = "#0F172A",
    var textAlign: String = "right",
    var isQuestion: Boolean = false,
    var questionNumber: Int? = null,
    var questionType: String = "essay", // "mcq", "tf", "essay", "matching"
    var marks: Float? = null,
    var options: List<String> = emptyList(),
    var optionColumns: Int = 1,
    
    // Math & Physics formulas
    var latexFormula: String = "",
    var svgContent: String = "",
    
    // Image properties
    var imageUri: String = "",
    
    // Table properties
    var tableRows: Int = 3,
    var tableCols: Int = 4,
    var tableData: List<List<String>> = emptyList(),
    var tableHeaderRow: Boolean = true,
    
    // Shape properties
    var shapeType: String = "rectangle", // "rectangle", "circle", "line", "divider"
    var fillColor: String = "#FFFFFF",
    var strokeColor: String = "#004B6E",
    var strokeWidth: Float = 1.5f
)

data class DocumentPage(
    val id: String = UUID.randomUUID().toString(),
    val pageNumber: Int = 1,
    val elements: MutableList<EditorElement> = mutableListOf()
)

data class DocumentModel(
    val id: String = UUID.randomUUID().toString(),
    val schemaVersion: Int = 2,
    var title: String = "امتحان جديد",
    var paperSize: PaperSize = PaperSize.A4,
    var orientation: PageOrientation = PageOrientation.PORTRAIT,
    var margins: MarginSettings = MarginSettings(),
    var metadata: ExamMetadata = ExamMetadata(),
    val pages: MutableList<DocumentPage> = mutableListOf(DocumentPage(pageNumber = 1)),
    val createdAt: Long = System.currentTimeMillis(),
    var updatedAt: Long = System.currentTimeMillis()
)
