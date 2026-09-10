package com.raqeem.edu.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "exams")
data class ExamEntity(
    @PrimaryKey val id: String,
    val title: String,
    val subject: String,
    val grade: String,
    val totalMarks: Float,
    val jsonContent: String,
    val updatedAt: Long
)

@Entity(tableName = "certificates")
data class CertificateEntity(
    @PrimaryKey val id: String,
    val studentName: String,
    val schoolName: String,
    val certificateType: String,
    val jsonContent: String,
    val updatedAt: Long
)

@Entity(tableName = "books")
data class BookEntity(
    @PrimaryKey val id: String,
    val title: String,
    val subject: String,
    val stage: String,
    val jsonContent: String,
    val updatedAt: Long
)

@Entity(tableName = "attendance")
data class AttendanceEntity(
    @PrimaryKey val id: String,
    val dateString: String,
    val grade: String,
    val division: String,
    val jsonContent: String,
    val updatedAt: Long
)
