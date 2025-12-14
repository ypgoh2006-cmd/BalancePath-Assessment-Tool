import React from 'react';
import { Brain, ArrowRight, ShieldCheck } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center max-w-md mx-auto">
      <div className="bg-teal-100 p-4 rounded-full mb-8 animate-pulse">
        <Brain className="w-16 h-16 text-teal-600" />
      </div>
      
      <h1 className="text-3xl font-bold text-slate-800 mb-4">ResilientMind</h1>
      <p className="text-slate-600 mb-8 text-lg leading-relaxed">
        Discover your inner strengths. This assessment measures 5 key pillars of resilience to help you thrive in uncertainty.
      </p>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full mb-8 text-left">
        <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-500" />
          What you'll get:
        </h3>
        <ul className="space-y-2 text-slate-500 text-sm">
          <li>• A personalized resilience profile</li>
          <li>• Identification of key strengths</li>
          <li>• AI-powered coaching tips</li>
          <li>• Actionable workshop exercises</li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-teal-200"
      >
        Start Assessment <ArrowRight className="w-5 h-5" />
      </button>
      
      <p className="mt-6 text-xs text-slate-400">
        Takes approx. 3 minutes • 15 Questions
      </p>
    </div>
  );
};

export default WelcomeScreen;
