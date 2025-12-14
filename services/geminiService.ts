import { GoogleGenAI, Type } from "@google/genai";
import { CategoryScore, AIAnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeAssessment = async (scores: CategoryScore[]): Promise<AIAnalysisResult> => {
  const model = 'gemini-2.5-flash';

  const scoreSummary = scores.map(s => `${s.category}: ${s.percentage}%`).join(', ');

  const prompt = `
    You are an expert resilience coach conducting a workshop.
    Analyze the following resilience assessment scores for a participant:
    ${scoreSummary}

    Provide a JSON response with:
    1. A short, encouraging summary paragraph (approx 40 words).
    2. A list of 2 key strengths based on the highest scores.
    3. A list of 2 specific growth areas based on the lowest scores.
    4. One specific, actionable 5-minute activity they can do during this workshop to improve their lowest area.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            strengths: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            growthAreas: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            workshopActivity: { type: Type.STRING }
          },
          required: ["summary", "strengths", "growthAreas", "workshopActivity"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIAnalysisResult;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("AI Analysis Failed:", error);
    // Fallback if AI fails
    return {
      summary: "Great job completing the assessment. Your profile indicates a unique blend of strengths. Review your chart to see where you excel.",
      strengths: ["Review your chart above"],
      growthAreas: ["Focus on the pillars with lower percentages"],
      workshopActivity: "Take 5 minutes to journal about a recent challenge and how you overcame it."
    };
  }
};