import { Page, ExamMetadata } from '../types';

export type BookDocumentType = 
  | 'book'                  // كتاب جديد
  | 'booklet'               // ملزمة جديدة
  | 'teacher_guide'         // دليل المعلم
  | 'activity_workbook'     // كراسة نشاط
  | 'exercise_book'         // كتاب تدريبات
  | 'revision_guide'        // كتاب مراجعة
  | 'solution_manual'       // كتاب حلول
  | 'question_bank_book'    // بنك أسئلة
  | 'lab_manual'            // دليل المختبر
  | 'instructional_booklet' // كتيب تعليمي
  | 'school_magazine'       // مجلة مدرسية
  | 'educational_bulletin';  // نشرة تربوية

export interface DocumentTypeConfig {
  id: BookDocumentType;
  title: string;
  subtitle: string;
  iconName: string;
  badge: string;
  gradient: string;
  description: string;
  defaultPagesCount: number;
}

export type BookSubject = 
  | 'الرياضيات' 
  | 'الفيزياء' 
  | 'الكيمياء' 
  | 'الأحياء' 
  | 'اللغة العربية' 
  | 'اللغة الإنجليزية' 
  | 'التربية الإسلامية' 
  | 'التاريخ' 
  | 'الجغرافيا' 
  | 'الحاسوب والتقانة' 
  | 'العلوم العامة' 
  | 'عام / مخصص';

export type EducationalStage = 'الابتدائية' | 'الإعدادية / المتوسطة' | 'الثانوية العامة' | 'التعليم الجامعي والمهني';

export type PaperSize = 'A4' | 'A5' | 'Letter' | 'B5';
export type PageOrientation = 'portrait' | 'landscape';

export type CoverStylePreset = 
  | 'official'    // رسمي
  | 'academic'    // أكاديمي
  | 'modern'      // حديث
  | 'minimal'     // بسيط
  | 'creative'    // إبداعي
  | 'kids'        // للأطفال
  | 'science'     // للعلوم
  | 'math'        // للرياضيات
  | 'languages'   // للغات
  | 'islamic'     // للتربية الإسلامية
  | 'history'     // للتاريخ
  | 'geography'   // للجغرافيا
  | 'physics'     // للفيزياء
  | 'chemistry'   // للكيمياء
  | 'biology';    // للأحياء

export interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
}

export interface FontPairing {
  id: string;
  name: string;
  headingFont: string;
  bodyFont: string;
  captionFont: string;
}

export interface CoverSettings {
  stylePreset: CoverStylePreset;
  mainTitle: string;
  subtitle: string;
  authorName: string;
  reviewerName: string;
  publisherName: string;
  editionNumber: string;
  publicationYear: string;
  isbnNumber?: string;
  qrCodeUrl?: string;
  showLogo: boolean;
  logoUrl?: string;
  heroImageUrl?: string;
  heroGraphicType?: 'formula' | 'circuit' | 'flask' | 'dna' | 'calligraphy' | 'map' | 'abstract' | 'custom';
  accentColor: string;
  backgroundColor: string;
  titleColor: string;
  hasDecorativeBorder: boolean;
  borderStyle: 'classic' | 'modern_grid' | 'islamic_frame' | 'minimal_bar';
}

export interface BookOutlineItem {
  id: string;
  title: string;
  type: 
    | 'cover_front' 
    | 'copyright' 
    | 'dedication' 
    | 'preface' 
    | 'toc' 
    | 'unit' 
    | 'chapter' 
    | 'lesson' 
    | 'activity' 
    | 'quiz' 
    | 'appendix' 
    | 'references' 
    | 'cover_back';
  pageIndex: number;
  children?: BookOutlineItem[];
}

export interface BookProject {
  id: string;
  documentType: BookDocumentType;
  title: string;
  subject: BookSubject;
  stage: EducationalStage;
  grade: string;
  semester: string;
  language: 'العربية' | 'التقنية الإنجليزية' | 'ثنائي اللغة (عربي - إنجليزي)';
  paperSize: PaperSize;
  orientation: PageOrientation;
  palette: ColorPalette;
  fontPairing: FontPairing;
  cover: CoverSettings;
  outline: BookOutlineItem[];
  pages: Page[];
  metadata: ExamMetadata;
  createdAt: string;
  updatedAt: string;
  author: string;
  version: string;
}

export type StudioDrawerType = 
  | 'none' 
  | 'cover' 
  | 'ai_cover' 
  | 'styles' 
  | 'colors' 
  | 'master_pages' 
  | 'media' 
  | 'fonts' 
  | 'flipbook' 
  | 'export' 
  | 'outline' 
  | 'formatting' 
  | 'chapters'
  | 'pedagogical_mastermind'
  | 'ai_remix';

export type FormattingBlockType = 
  | 'chapter_title'
  | 'lesson_heading'
  | 'activity_heading'
  | 'paragraph'
  | 'definition'
  | 'solved_example'
  | 'important_note'
  | 'warning'
  | 'question_block'
  | 'lab_experiment'
  | 'table'
  | 'diagram'
  | 'captioned_image'
  | 'quote'
  | 'lesson_summary'
  | 'chapter_review';
