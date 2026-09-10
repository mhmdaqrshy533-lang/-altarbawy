package com.raqeem.edu.core.model

data class CountryStandard(
    val id: String,
    val name: String,
    val flagEmoji: String,
    val ministryName: String,
    val hierarchyLevel1: String,
    val hierarchyLevel2: String,
    val hierarchyLevel3: String,
    val hierarchyLevel4: String,
    val hierarchyLevel5: String,
    val defaultPaperSize: PaperSize = PaperSize.A4
)

object PresetEducationStandards {
    val countries = listOf(
        CountryStandard(
            id = "ye",
            name = "الجمهورية اليمنية",
            flagEmoji = "🇾🇪",
            ministryName = "وزارة التربية والتعليم والبحث العلمي",
            hierarchyLevel1 = "الوزارة",
            hierarchyLevel2 = "قطاع المناهج والتوجيه",
            hierarchyLevel3 = "مكتب التربية والتعليم بالمحافظة",
            hierarchyLevel4 = "إدارة التربية والتعليم بالمديرية",
            hierarchyLevel5 = "المدرسة / المجمع التربوي"
        ),
        CountryStandard(
            id = "sa",
            name = "المملكة العربية السعودية",
            flagEmoji = "🇸🇦",
            ministryName = "وزارة التعليم",
            hierarchyLevel1 = "الوزارة",
            hierarchyLevel2 = "وكالة التعليم العام",
            hierarchyLevel3 = "الإدارة العامة للتعليم بالمنطقة",
            hierarchyLevel4 = "مكتب التعليم",
            hierarchyLevel5 = "المدرسة"
        ),
        CountryStandard(
            id = "eg",
            name = "جمهورية مصر العربية",
            flagEmoji = "🇪🇬",
            ministryName = "وزارة التربية والتعليم والتعليم الفني",
            hierarchyLevel1 = "الوزارة",
            hierarchyLevel2 = "قطاع التعليم العام",
            hierarchyLevel3 = "مديرية التربية والتعليم بالمحافظة",
            hierarchyLevel4 = "الإدارة التعليمية",
            hierarchyLevel5 = "المدرسة"
        ),
        CountryStandard(
            id = "om",
            name = "سلطنة عمان",
            flagEmoji = "🇴🇲",
            ministryName = "وزارة التربية والتعليم",
            hierarchyLevel1 = "الوزارة",
            hierarchyLevel2 = "المديرية العامة للمناهج والتقويم",
            hierarchyLevel3 = "المديرية العامة للتربية بالمحافظة",
            hierarchyLevel4 = "دائرة الإشراف التربوي",
            hierarchyLevel5 = "المدرسة"
        ),
        CountryStandard(
            id = "ae",
            name = "الإمارات العربية المتحدة",
            flagEmoji = "🇦🇪",
            ministryName = "مؤسسة الإمارات للتعليم المدرسي",
            hierarchyLevel1 = "الوزارة / المؤسسة",
            hierarchyLevel2 = "قطاع العمليات المدرسية",
            hierarchyLevel3 = "النطاق التعليمي / الإمارة",
            hierarchyLevel4 = "المجمع التعليمي",
            hierarchyLevel5 = "المدرسة"
        ),
        CountryStandard(
            id = "jo",
            name = "المملكة الأردنية الهاشمية",
            flagEmoji = "🇯🇴",
            ministryName = "وزارة التربية والتعليم",
            hierarchyLevel1 = "الوزارة",
            hierarchyLevel2 = "إدارة الامتحانات والاختبارات",
            hierarchyLevel3 = "مديرية التربية بالمحافظة",
            hierarchyLevel4 = "قسم الامتحانات",
            hierarchyLevel5 = "المدرسة"
        ),
        CountryStandard(
            id = "iq",
            name = "جمهورية العراق",
            flagEmoji = "🇮🇶",
            ministryName = "وزارة التربية",
            hierarchyLevel1 = "الوزارة",
            hierarchyLevel2 = "المديرية العامة للتقويم والامتحانات",
            hierarchyLevel3 = "المديرية العامة لتربية المحافظة",
            hierarchyLevel4 = "قسم التربية في القضاء",
            hierarchyLevel5 = "المدرسة"
        )
    )
}
