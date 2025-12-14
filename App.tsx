import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Questionnaire from './components/Questionnaire';
import ResultsDashboard from './components/ResultsDashboard';
import { QUESTIONS, MAX_SCORE_PER_QUESTION } from './constants';
import { Answer, CategoryScore, AssessmentCategory } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'quiz' | 'results'>('welcome');
  const [scores, setScores] = useState<CategoryScore[]>([]);

  const handleStart = () => {
    setCurrentStep('quiz');
  };

  const handleComplete = (answers: Answer[]) => {
    // Calculate scores per category
    const categories = Object.values(AssessmentCategory);
    
    const calculatedScores: CategoryScore[] = categories.map(category => {
      // Find questions belonging to this category
      const categoryQuestions = QUESTIONS.filter(q => q.category === category);
      const questionIds = categoryQuestions.map(q => q.id);
      
      // Filter answers for this category
      const categoryAnswers = answers.filter(a => questionIds.includes(a.questionId));
      
      // Sum the scores
      const totalScore = categoryAnswers.reduce((sum, a) => sum + a.score, 0);
      const maxPossibleScore = categoryQuestions.length * MAX_SCORE_PER_QUESTION;
      
      // Avoid division by zero if category is empty
      const percentage = maxPossibleScore > 0 
        ? Math.round((totalScore / maxPossibleScore) * 100) 
        : 0;

      return {
        category,
        score: totalScore,
        maxScore: maxPossibleScore,
        percentage
      };
    });

    setScores(calculatedScores);
    setCurrentStep('results');
  };

  const handleReset = () => {
    setScores([]);
    setCurrentStep('welcome');
  };

  return (
    <div className="antialiased text-slate-800">
      {currentStep === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {currentStep === 'quiz' && <Questionnaire questions={QUESTIONS} onComplete={handleComplete} />}
      {currentStep === 'results' && <ResultsDashboard scores={scores} onReset={handleReset} />}
    </div>
  );
}

export default App;
