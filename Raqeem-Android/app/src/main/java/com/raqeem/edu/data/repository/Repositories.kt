package com.raqeem.edu.data.repository

import com.google.gson.Gson
import com.raqeem.edu.core.model.*
import com.raqeem.edu.data.local.dao.*
import com.raqeem.edu.data.local.entity.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class CertificateRepository(private val certificateDao: CertificateDao, private val gson: Gson = Gson()) {
    val allCertificates: Flow<List<CertificateDocument>> = certificateDao.getAllCertificates().map { entities ->
        entities.mapNotNull { entity ->
            try {
                gson.fromJson(entity.jsonContent, CertificateDocument::class.java)
            } catch (e: Exception) {
                null
            }
        }
    }

    suspend fun saveCertificate(cert: CertificateDocument) {
        val json = gson.toJson(cert)
        val entity = CertificateEntity(
            id = cert.id,
            studentName = cert.studentName,
            schoolName = cert.schoolName,
            certificateType = cert.type.id,
            jsonContent = json,
            updatedAt = System.currentTimeMillis()
        )
        certificateDao.insertCertificate(entity)
    }
}

class BookRepository(private val bookDao: BookDao, private val gson: Gson = Gson()) {
    val allBooks: Flow<List<BookProject>> = bookDao.getAllBooks().map { entities ->
        entities.mapNotNull { entity ->
            try {
                gson.fromJson(entity.jsonContent, BookProject::class.java)
            } catch (e: Exception) {
                null
            }
        }
    }

    suspend fun saveBook(book: BookProject) {
        val json = gson.toJson(book)
        val entity = BookEntity(
            id = book.id,
            title = book.title,
            subject = book.subject,
            stage = book.stage,
            jsonContent = json,
            updatedAt = book.updatedAt
        )
        bookDao.insertBook(entity)
    }
}

class AttendanceRepository(private val attendanceDao: AttendanceDao, private val gson: Gson = Gson()) {
    val allSessions: Flow<List<AttendanceSession>> = attendanceDao.getAllAttendance().map { entities ->
        entities.mapNotNull { entity ->
            try {
                gson.fromJson(entity.jsonContent, AttendanceSession::class.java)
            } catch (e: Exception) {
                null
            }
        }
    }

    suspend fun saveSession(session: AttendanceSession) {
        val json = gson.toJson(session)
        val entity = AttendanceEntity(
            id = session.id,
            dateString = session.dateString,
            grade = session.grade,
            division = session.division,
            jsonContent = json,
            updatedAt = System.currentTimeMillis()
        )
        attendanceDao.insertAttendance(entity)
    }
}
