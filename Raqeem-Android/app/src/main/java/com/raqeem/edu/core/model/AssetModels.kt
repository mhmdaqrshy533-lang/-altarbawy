package com.raqeem.edu.core.model

import java.util.UUID

enum class AssetCategory(val title: String) {
    LOGOS("الشعارات والأختام"),
    FRAMES("الإطارات والزخارف"),
    SIGNATURES("التواقيع المعتمدة"),
    BADGES("الأوسمة والميداليات"),
    BACKGROUNDS("الخلفيات والعلامات المائية")
}

data class AssetItem(
    val id: String = UUID.randomUUID().toString(),
    val name: String,
    val category: AssetCategory = AssetCategory.LOGOS,
    val uriOrPath: String,
    val isBuiltIn: Boolean = true,
    val tags: List<String> = emptyList()
)
