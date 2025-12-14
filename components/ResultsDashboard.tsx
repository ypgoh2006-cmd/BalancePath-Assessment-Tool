import React, { useEffect, useState } from 'react';
import { CategoryScore, AIAnalysisResult } from '../types';
import { analyzeAssessment } from '../services/geminiService';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Loader2, Download, RefreshCw, Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';

interface ResultsDashboardProps {
  scores: CategoryScore[];
  onReset: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ scores, onReset }) => {
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      const result = await analyzeAssessment(scores);
      setAnalysis(result);
      setLoading(false);
    };
    fetchAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Prepare data for Recharts
  const chartData = scores.map(s => ({
    subject: s.category,
    A: s.percentage,
    fullMark: 100,
  }));

  const overallScore = Math.round(scores.reduce((acc, curr) => acc + curr.percentage, 0) / scores.length);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 print:p-0 print:bg-white print:min-h-0">
      <div className="max-w-4xl mx-auto space-y-6 print:space-y-4">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm print:shadow-none print:border print:border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Your ResilientMind Profile</h1>
            <p className="text-slate-500">Workshop Session: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-right">
             <div className="text-3xl font-bold text-teal-600">{overallScore}%</div>
             <div className="text-xs text-slate-400 uppercase tracking-wide">Overall Score</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:block print:space-y-6">
          {/* Chart Section */}
          <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center min-h-[300px] print:shadow-none print:border print:border-slate-200 print:break-inside-avoid">
             <h3 className="text-lg font-semibold text-slate-700 mb-4 self-start w-full px-2">Visual Breakdown</h3>
             <div className="w-full h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                   <PolarGrid stroke="#e2e8f0" />
                   <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                   <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                   <Radar
                     name="Resilience"
                     dataKey="A"
                     stroke="#0d9488"
                     strokeWidth={2}
                     fill="#14b8a6"
                     fillOpacity={0.3}
                   />
                 </RadarChart>
               </ResponsiveContainer>
             </div>
          </div>

          {/* AI Analysis Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col print:shadow-none print:border print:border-slate-200 print:break-inside-avoid">
            <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
               <Lightbulb className="w-5 h-5 text-yellow-500" />
               AI Coach Analysis
            </h3>
            
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
                <p className="text-sm">Analyzing your responses...</p>
              </div>
            ) : analysis ? (
              <div className="space-y-4 animate-in fade-in duration-500">
                <p className="text-slate-600 text-sm leading-relaxed italic border-l-4 border-teal-500 pl-3">
                  "{analysis.summary}"
                </p>

                <div className="grid grid-cols-1 gap-3">
                   <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                      <div className="flex items-center gap-2 text-green-800 font-semibold text-sm mb-1">
                        <TrendingUp className="w-4 h-4" /> Top Strengths
                      </div>
                      <ul className="list-disc list-inside text-xs text-green-700">
                        {analysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                   </div>

                   <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                      <div className="flex items-center gap-2 text-orange-800 font-semibold text-sm mb-1">
                        <AlertCircle className="w-4 h-4" /> Growth Areas
                      </div>
                      <ul className="list-disc list-inside text-xs text-orange-700">
                        {analysis.growthAreas.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                   </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Workshop Activity Card */}
        {!loading && analysis && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white print:bg-white print:text-black print:border print:border-slate-200 print:shadow-none print:bg-none print:break-inside-avoid">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 print:text-slate-900">
              🚀 Workshop Action Item
            </h3>
            <p className="text-indigo-100 mb-4 text-sm print:text-slate-600">
              Based on your lowest score, try this activity right now:
            </p>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20 print:border-slate-300 print:bg-slate-50">
              <p className="font-medium text-lg print:text-slate-900">"{analysis.workshopActivity}"</p>
            </div>
          </div>
        )}

        {/* Footer Controls */}
        <div className="flex gap-4 pt-4 print:hidden">
          <button 
            onClick={() => window.print()}
            className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
          >
            <Download className="w-4 h-4" /> Save PDF
          </button>
          <button 
            onClick={onReset}
            className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> New Assessment
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResultsDashboard;