
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async classifyNote(noteContent: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this note and classify it by subject and topic. Provide a suggested filename.\n\nNote Content: ${noteContent.substring(0, 2000)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            topic: { type: Type.STRING },
            suggestedName: { type: Type.STRING },
            summary: { type: Type.STRING },
          },
          required: ["subject", "topic", "suggestedName", "summary"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async compareVersions(v1: string, v2: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Compare these two versions of a study note. Identify what's missing in v1 that's in v2, and what was clarified.\n\nVersion 1: ${v1}\n\nVersion 2: ${v2}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            differences: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedMerge: { type: Type.STRING }
          },
          required: ["differences", "suggestedMerge"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async checkPlagiarism(content: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Evaluate the originality of this educational content. Is it likely plagiarized from common textbooks or Wikipedia? Content: ${content.substring(0, 1000)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            originalityScore: { type: Type.NUMBER },
            potentialSources: { type: Type.ARRAY, items: { type: Type.STRING } },
            remarks: { type: Type.STRING }
          },
          required: ["originalityScore", "remarks"]
        }
      }
    });
    return JSON.parse(response.text);
  }
};
