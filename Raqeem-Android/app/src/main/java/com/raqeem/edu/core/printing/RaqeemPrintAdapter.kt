package com.raqeem.edu.core.printing

import android.content.Context
import android.os.Bundle
import android.os.CancellationSignal
import android.os.ParcelFileDescriptor
import android.print.PageRange
import android.print.PrintAttributes
import android.print.PrintDocumentAdapter
import android.print.PrintDocumentInfo
import com.raqeem.edu.core.model.DocumentModel
import com.raqeem.edu.core.pdf.PdfExportEngine
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream

class RaqeemPrintAdapter(
    private val context: Context,
    private val document: DocumentModel
) : PrintDocumentAdapter() {

    private var pdfFile: File? = null

    override fun onLayout(
        oldAttributes: PrintAttributes?,
        newAttributes: PrintAttributes?,
        cancellationSignal: CancellationSignal?,
        callback: LayoutResultCallback?,
        extras: Bundle?
    ) {
        if (cancellationSignal?.isCanceled == true) {
            callback?.onLayoutCancelled()
            return
        }

        val info = PrintDocumentInfo.Builder("${document.title}.pdf")
            .setContentType(PrintDocumentInfo.CONTENT_TYPE_DOCUMENT)
            .setPageCount(document.pages.size)
            .build()

        callback?.onLayoutFinished(info, true)
    }

    override fun onWrite(
        pages: Array<out PageRange>?,
        destination: ParcelFileDescriptor?,
        cancellationSignal: CancellationSignal?,
        callback: WriteResultCallback?
    ) {
        if (cancellationSignal?.isCanceled == true) {
            callback?.onWriteCancelled()
            return
        }

        try {
            val tempFile = File(context.cacheDir, "print_temp_${System.currentTimeMillis()}.pdf")
            val engine = PdfExportEngine(context)
            val success = engine.exportDocumentToPdf(document, tempFile)

            if (success && destination != null) {
                FileInputStream(tempFile).use { input ->
                    FileOutputStream(destination.fileDescriptor).use { output ->
                        input.copyTo(output)
                    }
                }
                callback?.onWriteFinished(arrayOf(PageRange.ALL_PAGES))
            } else {
                callback?.onWriteFailed("فشل إنشاء ملف الطباعة")
            }
        } catch (e: Exception) {
            callback?.onWriteFailed(e.message)
        }
    }
}
