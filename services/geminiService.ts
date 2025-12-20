
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { INITIAL_SUBJECTS, INITIAL_TOPICS, INITIAL_SUBTOPICS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const changeContextTool: FunctionDeclaration = {
  name: 'changeContext',
  parameters: {
    type: Type.OBJECT,
    description: 'Updates the chatbot focus to a new subject, topic, or subtopic after user explicitly requests a switch.',
    properties: {
      subjectName: {
        type: Type.STRING,
        description: 'The name of the academic subject to switch to.',
      },
      topicName: {
        type: Type.STRING,
        description: 'The name of the specific topic to switch to.',
      },
      subtopicName: {
        type: Type.STRING,
        description: 'The name of the granular subtopic to switch to.',
      },
    },
    required: ['subjectName'],
  },
};

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

  async chatWithAI(messages: any[], currentContext: any) {
    const systemInstruction = `You are the OpenLearn Hub AI Assistant. 
    CORE RULES:
    1. You are strictly bound to the CURRENT CONTEXT: ${JSON.stringify(currentContext)}.
    2. You must not automatically switch context. If a user asks about a different subject, inform them they must explicitly request a switch (e.g., "Switch to Biology").
    3. You may ONLY change context using the "changeContext" tool when the user explicitly asks to "switch", "change subject", or "move to another topic".
    4. When answering, analyze user responses. Classify them as correct, partial, incorrect, or off-topic based on current educational standards.
    5. Be concise and professional. Discard previous context entirely after a switch is confirmed.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: messages,
      config: {
        systemInstruction,
        tools: [{ functionDeclarations: [changeContextTool] }],
      },
    });

    return response;
  },

  validateContext(subjectName: string, topicName?: string, subtopicName?: string) {
    const subject = INITIAL_SUBJECTS.find(s => s.name.toLowerCase() === subjectName.toLowerCase());
    if (!subject) return { valid: false, message: `Subject "${subjectName}" not found in Hub.` };

    if (topicName) {
      const topic = INITIAL_TOPICS.find(t => t.subjectId === subject.id && t.title.toLowerCase() === topicName.toLowerCase());
      if (!topic) return { valid: false, message: `Topic "${topicName}" not found in ${subject.name}.` };
      
      if (subtopicName) {
        const subtopic = INITIAL_SUBTOPICS.find(st => st.topicId === topic.id && st.title.toLowerCase() === subtopicName.toLowerCase());
        if (!subtopic) return { valid: false, message: `Subtopic "${subtopicName}" not found in ${topic.title}.` };
        return { valid: true, subject, topic, subtopic };
      }
      return { valid: true, subject, topic };
    }
    return { valid: true, subject };
  }
};
