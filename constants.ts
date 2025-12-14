import { Question, AssessmentCategory } from './types';

export const QUESTIONS: Question[] = [
  // Emotional Regulation
  { id: 1, text: "I can remain calm when facing a difficult situation.", category: AssessmentCategory.EMOTIONAL_REGULATION },
  { id: 2, text: "I control my emotions rather than letting them control me.", category: AssessmentCategory.EMOTIONAL_REGULATION },
  { id: 3, text: "When I am stressed, I know how to soothe myself.", category: AssessmentCategory.EMOTIONAL_REGULATION },
  
  // Optimism
  { id: 4, text: "I tend to see difficulties as temporary challenges.", category: AssessmentCategory.OPTIMISM },
  { id: 5, text: "I believe that things will work out in the end.", category: AssessmentCategory.OPTIMISM },
  { id: 6, text: "I can find the positive side of most situations.", category: AssessmentCategory.OPTIMISM },

  // Self-Efficacy
  { id: 7, text: "I am confident in my ability to solve problems.", category: AssessmentCategory.SELF_EFFICACY },
  { id: 8, text: "When I set a goal, I am able to find a way to achieve it.", category: AssessmentCategory.SELF_EFFICACY },
  { id: 9, text: "I trust my own judgment when making decisions.", category: AssessmentCategory.SELF_EFFICACY },

  // Social Support
  { id: 10, text: "I have people I can turn to for help when I need it.", category: AssessmentCategory.SOCIAL_SUPPORT },
  { id: 11, text: "I feel comfortable sharing my feelings with others.", category: AssessmentCategory.SOCIAL_SUPPORT },
  { id: 12, text: "I actively maintain relationships with friends and family.", category: AssessmentCategory.SOCIAL_SUPPORT },

  // Adaptability
  { id: 13, text: "I can easily adjust to changes in plans.", category: AssessmentCategory.ADAPTABILITY },
  { id: 14, text: "I am open to new ways of doing things.", category: AssessmentCategory.ADAPTABILITY },
  { id: 15, text: "I bounce back quickly after a setback.", category: AssessmentCategory.ADAPTABILITY },
];

export const MAX_SCORE_PER_QUESTION = 5;
