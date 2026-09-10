export type ElementType = 'text' | 'image' | 'math' | 'physics' | 'table' | 'shape';

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number; // pixels
  y: number; // pixels
  width: number;
  height: number;
  rotation: number;
  isLocked: boolean;
  isHidden: boolean;
  zIndex: number;
}

export interface TextElement extends BaseElement {
  type: 'text';
  content: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  color: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: number;
  letterSpacing?: number;
  wordSpacing?: number;
  opacity?: number;
  isQuestion?: boolean;
  questionNumber?: number;
  questionType?: 'mcq' | 'tf' | 'essay' | 'matching' | 'fill' | 'reasoning';
  marks?: number;
  options?: string[];
  optionColumns?: 1 | 2 | 4;
  numberingFormat?: 'arabic' | 'abjad' | 'hierarchical' | 'roman';
}

export interface MathElement extends BaseElement {
  type: 'math';
  latex: string;
  fontSize: number;
  color: string;
}

export interface PhysicsElement extends BaseElement {
  type: 'physics';
  svgContent: string;
  strokeColor: string;
  strokeWidth: number;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
}

export interface TableElement extends BaseElement {
  type: 'table';
  tableHtml: string;
  rows?: number;
  cols?: number;
}

export interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'line' | 'divider';
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export type EditorElement = TextElement | MathElement | PhysicsElement | ImageElement | TableElement | ShapeElement;

export interface Page {
  id: string;
  elements: EditorElement[];
}

export interface ExamMetadata {
  country?: string;
  ministry?: string;
  standardProfileId?: string;
  governorate: string;
  directorate: string;
  school: string;
  stage: string;       // المرحلة
  grade: string;       // الصف
  division: string;    // الشعبة
  subject: string;     // المادة
  semester: string;    // الفصل الدراسي
  round: string;       // الدور
  academicYear: string;// العام الدراسي
  examTitle: string;   // عنوان الاختبار
  time: string;        // الزمن
  marks: string;       // الدرجة الكلية
  examType: string;    // نوع الاختبار
  teacherName: string;
  schoolPrincipal?: string; // اسم مدير المدرسة
  templateType: 'none' | 'ministerial' | 'private' | 'automated' | 'bubblesheet' | 'book_studio';
  modelCode?: 'أ' | 'ب' | 'ج' | 'د';
  themePreset?: 'classic' | 'luxury_blue' | 'emerald_green' | 'royal_crimson' | 'imperial_purple' | 'noble_gold';
  themePrimaryColor?: string;
  themeBorderColor?: string;
  themeBorderStyle?: 'double' | 'solid' | 'dashed' | 'groove' | 'ridge';
  themeBorderWidth?: string;
  themeHeaderBg?: string;
  themeIntroBg?: string;
  themeIntroTextColor?: string;
  themeAccentColor?: string;
  numberingStyle?: 'arabic' | 'abjad' | 'hierarchical' | 'roman';
  customLogoUrl?: string;
}

export interface DocumentValidationIssue {
  id: string;
  severity: 'error' | 'warning' | 'info';
  category: 'bounds' | 'marks' | 'metadata' | 'content' | 'print';
  message: string;
  pageIndex?: number;
  elementId?: string;
}

export interface DocumentValidationReport {
  isValid: boolean;
  score: number; // 0 - 100
  issues: DocumentValidationIssue[];
  checkedAt: number;
}

export interface DocumentState {
  id: string;
  schemaVersion?: number; // Versioned schema for safe migration (current = 2)
  title: string;
  pages: Page[];
  paperSize: 'A4' | 'A3' | 'Letter' | 'Legal' | 'A5' | 'B5';
  orientation: 'portrait' | 'landscape';
  margins: { top: number; right: number; bottom: number; left: number };
  metadata: ExamMetadata;
}

