package com.raqeem.edu.core.document

import com.raqeem.edu.core.model.PaperSize

/**
 * Physical coordinate system and transformation matrix for document rendering.
 * All measurements are stored in Points (1/72 inch).
 * Standard A4 = 595.28 pt x 841.89 pt (210mm x 297mm).
 */
object A4Geometry {
    const val POINTS_PER_MM = 72f / 25.4f // ~2.8346 pt/mm
    const val A4_WIDTH_PT = 595.28f
    const val A4_HEIGHT_PT = 841.89f

    fun getPageDimensions(paperSize: PaperSize, isLandscape: Boolean): Pair<Float, Float> {
        val w = paperSize.widthPt
        val h = paperSize.heightPt
        return if (isLandscape) Pair(h, w) else Pair(w, h)
    }

    fun mmToPt(mm: Float): Float = mm * POINTS_PER_MM
    fun ptToMm(pt: Float): Float = pt / POINTS_PER_MM
}
