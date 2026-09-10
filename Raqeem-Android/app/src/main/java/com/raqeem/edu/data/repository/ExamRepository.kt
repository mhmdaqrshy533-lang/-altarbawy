package com.raqeem.edu.data.repository

import com.google.gson.Gson
import com.raqeem.edu.core.model.DocumentModel
import com.raqeem.edu.data.local.dao.ExamDao
import com.raqeem.edu.data.local.entity.ExamEntity
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class ExamRepository(private val examDao: ExamDao, private val gson: Gson = Gson()) {

    val allExams: Flow<List<DocumentModel>> = examDao.getAllExams().map { entities ->
        entities.mapNotNull { entity ->
            try {
                gson.fromJson(entity.jsonContent, DocumentModel::class.java)
            } catch (e: Exception) {
                null
            }
        }
    }

    suspend fun saveExam(document: DocumentModel) {
        val json = gson.toJson(document)
        val entity = ExamEntity(
            id = document.id,
            title = document.title,
            subject = document.metadata.subject,
            grade = document.metadata.grade,
            totalMarks = document.metadata.marks.toFloatOrNull() ?: 50f,
            jsonContent = json,
            updatedAt = document.updatedAt
        )
        examDao.insertExam(entity)
    }

    suspend fun getExamById(id: String): DocumentModel? {
        val entity = examDao.getExamById(id) ?: return null
        return try {
            gson.fromJson(entity.jsonContent, DocumentModel::class.java)
        } catch (e: Exception) {
            null
        }
    }

    suspend fun deleteExam(document: DocumentModel) {
        val entity = examDao.getExamById(document.id) ?: return
        examDao.deleteExam(entity)
    }
}
