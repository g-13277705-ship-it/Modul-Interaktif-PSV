export interface Question {
  id: number; // 1 to 600
  sectionId: string;
  sectionTitle: string;
  questionText: string;
  options: string[]; // [Option A, Option B, Option C, Option D]
  correctAnswer: number; // 0 for A, 1 for B, 2 for C, 3 for D
  answerLetter: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface SectionInfo {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  questionRange: [number, number];
  questionCount: number;
  icon: string;
  themeColor: string;
  accentBg: string;
  badgeBg: string;
  borderColor: string;
  keyConcepts: string[];
}

export interface StudentProfile {
  name: string;
  className: string;
}

export interface QuizAttempt {
  id: string;
  timestamp: number;
  dateFormatted: string;
  studentName: string;
  className: string;
  mode: string;
  modeTitle: string;
  timeTakenSeconds: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  grade: 'Cemerlang' | 'Lulus' | 'Perlu Bimbingan';
  gradeBadgeColor: string;
  sectionScores: Record<string, { score: number; total: number }>;
  answers: Record<number, number | null>; // questionId -> selectedOptionIndex (0..3)
  flaggedQuestions: number[];
}

export type ActiveTab = 'dashboard' | 'quiz' | 'answerKey' | 'tracker' | 'leaderboard';
