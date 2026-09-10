export type BubbleShape = 'circle' | 'square' | 'oval';
export type BubbleLabelType = 'arabic' | 'english' | 'numeric';
export type OMRElementType = 
  | 'bubble_grid' 
  | 'student_id_matrix' 
  | 'header' 
  | 'text' 
  | 'barcode' 
  | 'qrcode' 
  | 'calibration_anchor' 
  | 'signature_box' 
  | 'stamp_area' 
  | 'image' 
  | 'table' 
  | 'line';

export interface BaseOMRElement {
  id: string;
  type: OMRElementType;
  x: number; // Page X in mm or px (A4 standard: 794 x 1123 px at 96 DPI)
  y: number; // Page Y in mm or px
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  isLocked: boolean;
  isHidden: boolean;
  opacity: number;
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double';
  fillColor?: string;
}

export interface OMRBubbleGridElement extends BaseOMRElement {
  type: 'bubble_grid';
  questionCount: number;
  choicesCount: number; // 2, 3, 4, 5
  columns: number; // 1, 2, 3, 4
  startQuestionNumber: number;
  questionType: 'mcq' | 'true_false' | 'matching' | 'ordering' | 'numeric' | 'literacy';
  bubbleShape: BubbleShape;
  labelType: BubbleLabelType;
  bubbleSpacing: number;
  marksPerQuestion: number;
  filledAnswers: Record<number, string[]>; // questionIndex -> selected choices e.g. ['أ'] or ['1']
}

export interface OMRStudentIDElement extends BaseOMRElement {
  type: 'student_id_matrix';
  digitCount: number; // 3 to 10 digits
  filledDigits: Record<number, number>; // colIndex -> digit (0-9)
  showLabels: boolean;
  title: string;
}

export interface OMRHeaderData {
  country: string;
  ministry: string;
  governorate: string;
  directorate: string;
  school: string;
  examTitle: string;
  subject: string;
  grade: string;
  division: string;
  time: string;
  marks: string;
  academicYear: string;
  semester: string;
  modelCode: 'أ' | 'ب' | 'ج' | 'د';
  logoUrl?: string;
}

export interface OMRHeaderElement extends BaseOMRElement {
  type: 'header';
  data: OMRHeaderData;
}

export interface OMRTextElement extends BaseOMRElement {
  type: 'text';
  text: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold' | 'extrabold' | 'black';
  fontFamily: string;
  color: string;
  textAlign: 'right' | 'center' | 'left';
}

export interface OMRBarcodeElement extends BaseOMRElement {
  type: 'barcode';
  code: string;
}

export interface OMRQRCodeElement extends BaseOMRElement {
  type: 'qrcode';
  data: string;
}

export interface OMRCalibrationAnchorElement extends BaseOMRElement {
  type: 'calibration_anchor';
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface OMRSignatureBoxElement extends BaseOMRElement {
  type: 'signature_box';
  label: string;
}

export interface OMRStampAreaElement extends BaseOMRElement {
  type: 'stamp_area';
  label: string;
}

export interface OMRImageElement extends BaseOMRElement {
  type: 'image';
  src: string;
}

export interface OMRTableElement extends BaseOMRElement {
  type: 'table';
  rows: number;
  cols: number;
  headers: string[];
  data: string[][];
}

export interface OMRLineElement extends BaseOMRElement {
  type: 'line';
  strokeWidth: number;
  strokeColor: string;
}

export type OMRElement = 
  | OMRBubbleGridElement 
  | OMRStudentIDElement 
  | OMRHeaderElement 
  | OMRTextElement 
  | OMRBarcodeElement 
  | OMRQRCodeElement 
  | OMRCalibrationAnchorElement 
  | OMRSignatureBoxElement 
  | OMRStampAreaElement 
  | OMRImageElement 
  | OMRTableElement 
  | OMRLineElement;

export interface OMRProjectData {
  id: string;
  title: string;
  metadata: OMRHeaderData;
  elements: OMRElement[];
  zoom: number; // 50 to 300
  gridSnap: boolean;
  gridSize: number;
  mode: 'edit' | 'preview' | 'grading';
  lastSavedAt?: string;
}

export interface OMRTemplatePreset {
  id: string;
  name: string;
  category: 'ministerial' | 'primary' | 'secondary' | 'university' | 'economic';
  questionCount: number;
  description: string;
  metadata: OMRHeaderData;
  elements: OMRElement[];
}
