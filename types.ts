export enum AssessmentCategory {
  EMOTIONAL_REGULATION = "Emotional Regulation",
  OPTIMISM = "Optimism",
  SELF_EFFICACY = "Self-Efficacy",
  SOCIAL_SUPPORT = "Social Support",
  ADAPTABILITY = "Adaptability"
}

export interface Question {
  id: number;
  text: string;
  category: AssessmentCategory;
}

export interface Answer {
  questionId: number;
  score: number; // 1-5 Likert scale
}

export interface CategoryScore {
  category: AssessmentCategory;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface AIAnalysisResult {
  summary: string;
  strengths: string[];
  growthAreas: string[];
  workshopActivity: string;
}
