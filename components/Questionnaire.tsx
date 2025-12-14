import React, { useState } from 'react';
import { Question, Answer } from '../types';
import { ChevronRight, Check } from 'lucide-react';

interface QuestionnaireProps {
  questions: Question[];
  onComplete: (answers: Answer[]) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleNext = () => {
    if (selectedScore === null) return;

    const newAnswers = [...answers, { questionId: currentQuestion.id, score: selectedScore }];
    setAnswers(newAnswers);
    setSelectedScore(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const scaleLabels = [
    { score: 1, label: "Strongly Disagree" },
    { score: 2, label: "Disagree" },
    { score: 3, label: "Neutral" },
    { score: 4, label: "Agree" },
    { score: 5, label: "Strongly Agree" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2">
        <div 
          className="bg-teal-500 h-2 transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col max-w-xl mx-auto w-full p-6 justify-center">
        <span className="text-teal-600 font-semibold text-sm tracking-widest uppercase mb-2">
          Question {currentIndex + 1} of {questions.length}
        </span>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-8 leading-tight">
          {currentQuestion.text}
        </h2>

        <div className="space-y-3 mb-8">
          {scaleLabels.map((item) => (
            <button
              key={item.score}
              onClick={() => setSelectedScore(item.score)}
              className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group
                ${selectedScore === item.score 
                  ? 'border-teal-500 bg-teal-50 text-teal-800 ring-2 ring-teal-200 ring-offset-1' 
                  : 'border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-slate-50'}`}
            >
              <span className="font-medium">{item.label}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${selectedScore === item.score ? 'border-teal-500 bg-teal-500' : 'border-slate-300'}`}>
                {selectedScore === item.score && <Check className="w-3 h-3 text-white" />}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selectedScore === null}
          className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
            ${selectedScore !== null 
              ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          {currentIndex === questions.length - 1 ? 'Finish Assessment' : 'Next Question'}
          {currentIndex !== questions.length - 1 && <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
