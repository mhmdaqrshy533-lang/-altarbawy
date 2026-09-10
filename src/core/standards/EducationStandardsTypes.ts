/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * الرقيم التربوي - محرك المعايير العربية للوثائق التعليمية (Arabic Education Standards Engine)
 * برمجة وتصميم وتطوير المهندس سهيل الهزبري
 * 
 * المبادئ الحاكمة:
 * 1. لا افتراض لنموذج وزاري موحد — كل دولة وجهة تعليمية لها Profile مرن وقابل للتخصيص.
 * 2. التسلسل الإداري مرن وديناميكي (الدولة -> الوزارة -> الإدارة العامة -> المنطقة/المحافظة -> المديرية -> المدرسة).
 * 3. التمييز الصارم بين "قالب تعليمي رسمي المظهر" و"معتمد رسمياً".
 * 4. قابلية التخزين المحلي Offline-First والتصدير والاستيراد.
 */

export interface CountryProfile {
  id: string;
  name: string;
  flagEmoji: string;
  defaultMinistryName: string;
  administrativeHierarchy: {
    level1Name: string; // e.g. الوزارة
    level2Name: string; // e.g. القطاع / الإدارة العامة
    level3Name: string; // e.g. المنطقة / المحافظة
    level4Name: string; // e.g. المديرية / الإدارة التعليمية
    level5Name: string; // e.g. المدرسة / المجمع
  };
  defaultGradingScaleId: string;
  defaultPaperSize: 'A4' | 'A3' | 'Letter';
}

export interface AuthorityProfile {
  id: string;
  countryId: string;
  countryName: string;
  ministry: string;
  sectorOrGeneralAdmin: string;
  governorateOrRegion: string;
  directorate: string;
  schoolName: string;
  schoolStage: 'ابتدائي' | 'أساسي' | 'متوسط' | 'ثانوي' | 'مشترك' | 'جامعي';
  academicYear: string;
  termName: string;
  principalName: string;
  superintendentName: string;
  customSealEmoji?: string;
  customLogoUrl?: string;
  headerLayout: 'balanced_tripartite' | 'right_aligned' | 'centered_emblem';
}

export type DocumentCategory = 
  | 'exam' 
  | 'records' 
  | 'certificate' 
  | 'administrative' 
  | 'educational';

export interface DocumentTypeDefinition {
  id: string;
  category: DocumentCategory;
  name: string;
  description: string;
  defaultPageOrientation: 'portrait' | 'landscape';
  recommendedPaperSize: 'A4' | 'A3' | 'Letter' | 'A5';
  headerType: 'full_formal' | 'compact' | 'simple' | 'none';
  hasGradeSystem: boolean;
  hasTableStandard: boolean;
  complianceLevel: 'official_looking' | 'custom_authority';
}

export interface TypographyStandard {
  primaryFont: string;
  secondaryFont: string;
  mathFont: string;
  bodyFontSize: number;
  headerFontSize: number;
  titleFontSize: number;
  lineHeight: number;
  letterSpacing: number;
  direction: 'rtl' | 'ltr';
}

export interface TableStandard {
  showBorder: boolean;
  borderWidth: number; // in px
  borderColor: string;
  repeatHeaderOnPageBreak: boolean;
  headerBgColor: string;
  alternateRowBg: boolean;
  paddingY: number;
  paddingX: number;
  fontSize: number;
}

export interface GradeSystemRule {
  minPercentage: number;
  maxPercentage: number;
  label: string;
  gpaEquivalent?: number;
  isPassing: boolean;
  badgeColor: string;
}

export interface GradeSystem {
  id: string;
  name: string;
  countryId: string;
  passingScore: number;
  maxScore: number;
  rules: GradeSystemRule[];
}

export interface HeaderStandard {
  showCountryName: boolean;
  showMinistry: boolean;
  showGovernorate: boolean;
  showDirectorate: boolean;
  showSchoolName: boolean;
  showEmblem: boolean;
  showDocumentTitle: boolean;
  showAcademicYear: boolean;
  showTerm: boolean;
  showRefNumber: boolean;
  showDate: boolean;
  emblemSize: number; // in px
  headerBorderBottom: boolean;
}

export interface FooterStandard {
  showPageNumber: boolean;
  showTotalPages: boolean;
  showDocumentId: boolean;
  showPrintDate: boolean;
  showSchoolSignature: boolean;
  showDeveloperCredit: boolean;
  developerCreditText: string;
  customNote?: string;
}

export interface BrandProfile {
  id: string;
  name: string;
  primaryColor: string;
  accentColor: string;
  darkColor: string;
  neutralBg: string;
  borderStyle: 'solid' | 'double' | 'classic_formal';
  watermarkText?: string;
  watermarkOpacity: number;
}

export interface DocumentStandardProfile {
  id: string;
  title: string;
  authority: AuthorityProfile;
  documentType: DocumentTypeDefinition;
  typography: TypographyStandard;
  tableStandard: TableStandard;
  gradeSystem?: GradeSystem;
  header: HeaderStandard;
  footer: FooterStandard;
  brand: BrandProfile;
  lastModified: number;
}
