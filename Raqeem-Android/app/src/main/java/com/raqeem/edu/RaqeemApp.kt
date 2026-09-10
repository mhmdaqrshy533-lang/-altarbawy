package com.raqeem.edu

import android.app.Application
import com.raqeem.edu.data.local.AppDatabase

class RaqeemApp : Application() {
    val database: AppDatabase by lazy { AppDatabase.getDatabase(this) }

    override fun onCreate() {
        super.onCreate()
    }
}
