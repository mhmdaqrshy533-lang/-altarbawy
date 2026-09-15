export type QuestionType = 'tf' | 'mcq' | 'passage' | 'poetry' | 'essay' | 'fill';

export interface QuestionOption {
  id: string;
  label: string; // أ، ب، ج، د / 1، 2، 3، 4
  text: string;
}

export interface ExamQuestion {
  id: string;
  type: QuestionType;
  sectionNumber?: number;
  questionNumber?: number;
  text: string;
  points: number;
  options?: QuestionOption[];
  correctAnswer?: string; // e.g. 'T', 'F' for TF, 'A', 'B', 'C', 'D' for MCQ, or index
  passageText?: string; // For passage type or question context
  poetryVerses?: string[]; // For poetry verses
  essayLinesCount?: number; // Number of ruled lines for essay
  explanation?: string;
}

export interface ExamHeader {
  republicText: string;
  ministryText: string;
  officeText: string;
  directorateText: string;
  schoolName: string;
  subject: string;
  grade: string;
  sectionName: string;
  examTitle: string;
  modelName: string; // 'أ' | 'ب' | 'ج' | 'د'
  duration: string;
  academicYear: string;
  totalMarks: number;
  omrMarks: number;
  essayMarks: number;
  teacherName: string;
  principalName: string;
  logoUrl?: string;
  barcodeText: string;
}

export interface ExamTheme {
  primaryColor: string;
  primaryDark: string;
  accentTint: string;
  borderTint: string;
  fontFamily: 'cairo' | 'naskh' | 'amiri';
  fontSize: 'compact' | 'normal' | 'large';
  headerStyle: 'ministerial' | 'modern_card' | 'compact_grid';
  showInstructions: boolean;
  showMarksTable: boolean;
  showStudentInfo: boolean;
}

export interface ExamFormModel {
  modelLetter: 'أ' | 'ب' | 'ج' | 'د';
  questions: ExamQuestion[];
  answerKey: Record<string, string>; // questionId -> correct option ID/key
}

export interface ScannedBubbleResult {
  questionIndex: number;
  optionIndex: number;
  optionLabel: string;
  fillPercentage: number;
  isMarked: boolean;
  isAmbiguous: boolean;
  centerX: number;
  centerY: number;
}

export interface ScannedQuestionResult {
  questionNumber: number;
  questionId: string;
  type: QuestionType;
  selectedOption?: string;
  selectedOptionLabel?: string;
  correctOption?: string;
  correctOptionLabel?: string;
  isCorrect: boolean;
  isUnanswered: boolean;
  isDoubleMarked: boolean;
  pointsEarned: number;
  pointsPossible: number;
  bubbles: ScannedBubbleResult[];
}

export interface OMRGradingReport {
  studentName: string;
  seatNumber: string;
  modelLetter: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  doubleMarkedCount: number;
  scannedQuestions: ScannedQuestionResult[];
  scannedImageUrl?: string;
  processedCanvasUrl?: string;
  timestamp: string;
}

export const MANDATORY_COPYRIGHT = 'محرر الرقيم التربوي — برمجة وتصميم المهندسين (سهيل الهزبري & سيف الدين الهزبري)';
