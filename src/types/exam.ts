export type QuestionType = 'tf' | 'mcq' | 'matching' | 'passage' | 'poetry' | 'essay' | 'fill';

export type BloomLevel = 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export interface QuestionOption {
  id: string;
  label: string; // أ، ب، ج، د، هـ
  text: string;
}

export interface MatchingPair {
  id: string;
  leftText: string;
  rightText: string;
  correctMatch: string; // '1', '2', '3', '4' or letter
}

export interface ExamQuestion {
  id: string;
  type: QuestionType;
  sectionNumber?: number;
  questionNumber?: number;
  text: string;
  points: number;
  options?: QuestionOption[];
  matchingPairs?: MatchingPair[];
  correctAnswer?: string; // e.g. 'T', 'F' for TF, 'A', 'B', 'C', 'D', 'E' for MCQ
  passageText?: string; // For passage or poetry verses
  poetryVerses?: string[]; // For poetry verses (صدر وعجز)
  essayLinesCount?: number; // Number of ruled lines for essay
  explanation?: string;
  bloomLevel?: BloomLevel;
  difficulty?: QuestionDifficulty;
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
  contrastRatio: number;
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

export interface QuestionItemStat {
  questionNumber: number;
  questionText: string;
  type: QuestionType;
  difficultyIndex: number; // 0.0 - 1.0 (proportion answering correctly)
  discriminationIndex: number; // -1.0 - 1.0
  correctCount: number;
  wrongCount: number;
  blankCount: number;
}

export interface ControlClassAnalytics {
  totalStudents: number;
  averageScore: number;
  passCount: number;
  failCount: number;
  passPercentage: number;
  highestScore: number;
  lowestScore: number;
  gradeDistribution: {
    excellent: number; // >= 90%
    veryGood: number;  // 80% - 89%
    good: number;      // 65% - 79%
    pass: number;      // 50% - 64%
    fail: number;      // < 50%
  };
  itemStats: QuestionItemStat[];
}

export const MANDATORY_COPYRIGHT = 'محرر الرقيم التربوي — برمجة وتصميم المهندسين (سهيل الهزبري & سيف الدين الهزبري)';
