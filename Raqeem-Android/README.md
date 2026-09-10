# مشروع محرر الرقيم التربوي — Android Native (Jetpack Compose)

منظومة الرقيم السيادية لإعداد وتنسيق وطباعة الوثائق والامتحانات المدرسية المعيارية A4 مبنية بنسبة 100% بلغة **Kotlin** وواجهات **Jetpack Compose** الحديثة معمارية **Offline-First**.

---

## مميزات المشروع والتحويل الكامل

1. **Native Jetpack Compose UI**: واجهات مستخدم عربية كاملة RTL متوافقة مع Material 3 وبدون أي استخدام لـ WebView.
2. **محرك طباعة وPDF أصلي (A4 Vector Engine)**: توليد ملفات PDF حقيقية vector وطباعة فورية عبر `PrintDocumentAdapter` بدون أخذ لقطات شاشة أو ضياع الدقة.
3. **قاعدة بيانات محلية مستقلة (Room Database)**: تخزين ومزامنة الامتحانات، الشهادات، الكتب والملازم، وسجلات الحضور والدرجات محلياً دون الحاجة لأي اتصال بالإنترنت.
4. **تطابق وظيفي كامل مع محرر الويب**:
   - محرر الامتحانات A4 وقوالب الترويسة الوزارية.
   - كشوفات رصد الدرجات ومبيضات النتائج.
   - استوديو الشهادات التراثية، الإجازات القرآنية، وأوسمة التفوق.
   - استوديو تأليف الكتب والمذكرات والملازم المدرسية.
   - نظام حصر الحضور والغياب والانضباط اليومي.
   - مركز القوالب وبنك الأصول والشعارات.

---

## متطلبات التشغيل والاستيراد

- **Android Studio** (Hedgehog 2023.1.1 أو أحدث) أو **Code Assist Pro**.
- **JDK**: OpenJDK 17 أو أحدث.
- **Gradle**: 8.5 (معرف في `gradle/wrapper/gradle-wrapper.properties`).
- **Android SDK**: Compile SDK 34, Min SDK 24.

---

## خطوات الاستيراد والتشغيل في Android Studio / Code Assist Pro

1. افتح بيئة التطوير (Android Studio أو Code Assist Pro).
2. اختر **Open Project** واختر مجلد `Raqeem-Android` (أو استورد ملف الأرشيف `Raqeem-Android-Studio-Project.zip`).
3. انتظر حتى يكتمل الـ **Gradle Sync**.
4. اضغط على زر **Run** أو اختر **Build > Build Bundle(s) / APK(s) > Build APK(s)** لتوليد حزمة التثبيت مباشرة.

---

## هيكلية المشروع

```
Raqeem-Android/
├── app/
│   ├── build.gradle.kts
│   ├── proguard-rules.pro
│   └── src/main/
│       ├── AndroidManifest.xml
│       ├── java/com/raqeem/edu/
│       │   ├── RaqeemApp.kt
│       │   ├── MainActivity.kt
│       │   ├── core/
│       │   │   ├── model/ (DocumentModels, ExamMetadata, CertificateModels, BookModels, etc.)
│       │   │   ├── document/ (A4Geometry, DocumentEngine)
│       │   │   ├── pdf/ (PdfExportEngine)
│       │   │   └── printing/ (RaqeemPrintAdapter)
│       │   ├── data/
│       │   │   ├── local/ (AppDatabase, DAOs, Entities)
│       │   │   └── repository/ (ExamRepository, CertificateRepository, etc.)
│       │   ├── features/
│       │   │   ├── home/ (HomeScreen)
│       │   │   ├── exam/ (ExamEditorScreen, ExamViewModel)
│       │   │   ├── results/ (GradeRecordsScreen)
│       │   │   ├── certificates/ (CertificatesScreen)
│       │   │   ├── books/ (BookStudioScreen)
│       │   │   ├── attendance/ (AttendanceScreen)
│       │   │   ├── documents/ (OfficialMemosScreen)
│       │   │   ├── templates/ (TemplateCenterScreen)
│       │   │   ├── assets/ (AssetManagerScreen)
│       │   │   └── settings/ (SettingsScreen)
│       │   └── ui/
│       │       ├── navigation/ (RaqeemNavigation)
│       │       └── theme/ (Color, Type, Theme)
│       └── res/
│           ├── values/ (strings, colors, themes)
│           ├── xml/ (file_paths, data_extraction_rules, backup_rules)
│           └── mipmap-anydpi-v26/
├── gradle/
│   ├── libs.versions.toml
│   └── wrapper/
│       └── gradle-wrapper.properties
├── build.gradle.kts
├── settings.gradle.kts
├── gradlew
└── gradlew.bat
```
