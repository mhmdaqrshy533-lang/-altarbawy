/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * الرقيم التربوي - محرك المعايير المركزية (Arabic Education Standards Engine)
 * يدير ملفات التعريف (Profiles)، التخزين المستديم في IndexedDB، وتوليد ترويسات ومستندات قياسية متوافقة.
 * برمجة وتصميم وتطوير المهندس سهيل الهزبري
 */

import { PersistenceEngine } from '../PersistenceEngine';
import { 
  CountryProfile, 
  AuthorityProfile, 
  DocumentTypeDefinition, 
  DocumentStandardProfile, 
  GradeSystem,
  BrandProfile
} from './EducationStandardsTypes';
import { 
  PRESET_COUNTRIES, 
  PRESET_DOCUMENT_TYPES, 
  PRESET_GRADE_SYSTEMS,
  DEFAULT_TYPOGRAPHY_STANDARD,
  DEFAULT_TABLE_STANDARD,
  DEFAULT_HEADER_STANDARD,
  DEFAULT_FOOTER_STANDARD,
  DEFAULT_BRAND_PROFILE
} from './EducationStandardsPresets';

const STORAGE_KEY_ACTIVE_STANDARD = 'raq_active_standard_profile';
const STORAGE_KEY_CUSTOM_COUNTRIES = 'raq_custom_countries';
const STORAGE_KEY_CUSTOM_AUTHORITIES = 'raq_custom_authorities';

class ArabicEducationStandardsEngine {
  private activeProfile: DocumentStandardProfile | null = null;
  private customCountries: CountryProfile[] = [];
  private customAuthorities: AuthorityProfile[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.initEngine();
    }
  }

  private initEngine() {
    // 1. Load active profile from local storage or bootstrap default
    try {
      const savedProfile = localStorage.getItem(STORAGE_KEY_ACTIVE_STANDARD);
      if (savedProfile) {
        this.activeProfile = JSON.parse(savedProfile);
      } else {
        this.activeProfile = this.createDefaultProfile('ye', 'exam_term_final');
      }

      const savedCountries = localStorage.getItem(STORAGE_KEY_CUSTOM_COUNTRIES);
      if (savedCountries) {
        this.customCountries = JSON.parse(savedCountries);
      }

      const savedAuthorities = localStorage.getItem(STORAGE_KEY_CUSTOM_AUTHORITIES);
      if (savedAuthorities) {
        this.customAuthorities = JSON.parse(savedAuthorities);
      }
    } catch (e) {
      console.warn('[StandardsEngine] Initialization fallback:', e);
      this.activeProfile = this.createDefaultProfile('ye', 'exam_term_final');
    }
  }

  /**
   * إنشاء Profile افتراضي متوازن لدولة معينة ونوع وثيقة
   */
  public createDefaultProfile(
    countryId: string = 'ye', 
    docTypeId: string = 'exam_term_final'
  ): DocumentStandardProfile {
    const country = this.getCountryById(countryId) || PRESET_COUNTRIES[0];
    const docType = this.getDocumentTypeById(docTypeId) || PRESET_DOCUMENT_TYPES[0];
    const gradeSystem = PRESET_GRADE_SYSTEMS.find(g => g.countryId === country.id) || PRESET_GRADE_SYSTEMS[0];

    const authority: AuthorityProfile = {
      id: `auth_${country.id}_default`,
      countryId: country.id,
      countryName: country.name,
      ministry: country.defaultMinistryName,
      sectorOrGeneralAdmin: country.administrativeHierarchy.level2Name,
      governorateOrRegion: 'الإدارة العامة للتعليم',
      directorate: 'المديرية التعليمية',
      schoolName: 'مدرسة الرقيم النموذجية',
      schoolStage: 'ثانوي',
      academicYear: '2024 / 2025م',
      termName: 'الفصل الدراسي الأول',
      principalName: 'مدير المدرسة',
      superintendentName: 'وكيل الشؤون التعليمية',
      headerLayout: 'balanced_tripartite',
    };

    return {
      id: `profile_${Date.now()}`,
      title: `${docType.name} — ${country.name}`,
      authority,
      documentType: docType,
      typography: { ...DEFAULT_TYPOGRAPHY_STANDARD },
      tableStandard: { ...DEFAULT_TABLE_STANDARD },
      gradeSystem,
      header: { ...DEFAULT_HEADER_STANDARD },
      footer: { ...DEFAULT_FOOTER_STANDARD },
      brand: { ...DEFAULT_BRAND_PROFILE },
      lastModified: Date.now(),
    };
  }

  /**
   * الحصول على الملف النشط حالياً
   */
  public getActiveProfile(): DocumentStandardProfile {
    if (!this.activeProfile) {
      this.activeProfile = this.createDefaultProfile();
    }
    return this.activeProfile;
  }

  /**
   * تعيين الملف النشط وحفظه في IndexedDB والذاكرة
   */
  public setActiveProfile(profile: DocumentStandardProfile) {
    this.activeProfile = { ...profile, lastModified: Date.now() };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_ACTIVE_STANDARD, JSON.stringify(this.activeProfile));
      } catch (e) {}
    }
    PersistenceEngine.saveDocument('active_standards_profile', 'settings', profile.title, profile).catch(() => {});
    this.notifyListeners();
  }

  /**
   * تحديث جزئي للملف النشط
   */
  public updateActiveProfile(partial: Partial<DocumentStandardProfile>) {
    const current = this.getActiveProfile();
    const updated: DocumentStandardProfile = {
      ...current,
      ...partial,
      lastModified: Date.now(),
    };
    this.setActiveProfile(updated);
  }

  /**
   * تحديث بيانات الجهة الإدارية (Authority)
   */
  public updateAuthority(partial: Partial<AuthorityProfile>) {
    const current = this.getActiveProfile();
    const updatedAuthority: AuthorityProfile = {
      ...current.authority,
      ...partial,
    };
    this.updateActiveProfile({ authority: updatedAuthority });
  }

  /**
   * قائمة بجميع الدول المتاحة (المسبقة والمخصصة)
   */
  public getAllCountries(): CountryProfile[] {
    return [...PRESET_COUNTRIES, ...this.customCountries];
  }

  public getCountryById(id: string): CountryProfile | undefined {
    return this.getAllCountries().find(c => c.id === id);
  }

  /**
   * إضافة دولة جديدة أو جهة تعليمية خاصة
   */
  public addCustomCountry(country: CountryProfile) {
    this.customCountries.push(country);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_CUSTOM_COUNTRIES, JSON.stringify(this.customCountries));
    }
    this.notifyListeners();
  }

  /**
   * قائمة بأنواع الوثائق المعيارية
   */
  public getAllDocumentTypes(): DocumentTypeDefinition[] {
    return PRESET_DOCUMENT_TYPES;
  }

  public getDocumentTypeById(id: string): DocumentTypeDefinition | undefined {
    return PRESET_DOCUMENT_TYPES.find(d => d.id === id);
  }

  /**
   * قائمة بأنظمة الدرجات المعيارية
   */
  public getAllGradeSystems(): GradeSystem[] {
    return PRESET_GRADE_SYSTEMS;
  }

  /**
   * تصدير المعيار الحالي كملف JSON لتبادله بين المعلمين والمدارس
   */
  public exportProfileJSON(): string {
    return JSON.stringify(this.getActiveProfile(), null, 2);
  }

  /**
   * استيراد وتطبيق معيار مخصص
   */
  public importProfileJSON(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && parsed.authority && parsed.documentType) {
        this.setActiveProfile(parsed);
        return true;
      }
    } catch (e) {
      console.error('[StandardsEngine] Import error:', e);
    }
    return false;
  }

  /**
   * اشتراك في تحديثات المعايير لربط الـ React Components
   */
  public subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners() {
    this.listeners.forEach(cb => {
      try { cb(); } catch (e) {}
    });
  }
}

export const EducationStandardsEngine = new ArabicEducationStandardsEngine();
