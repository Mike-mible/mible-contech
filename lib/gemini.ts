import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Standard initialization as per guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Executes a text-based prompt with the model.
 * Uses gemini-3-pro-preview for high-fidelity reasoning.
 */
export const askAssistant = async (prompt: string, complex: boolean = true) => {
  const ai = getAI();
  const config: any = {};
  
  if (complex) {
    // Max thinking budget for gemini-3-pro-preview is 32768
    config.thinkingConfig = { thinkingBudget: 32768 };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

/**
 * Analyzes an image with an optional text prompt.
 */
export const analyzeImage = async (prompt: string, base64Data: string, mimeType: string) => {
  const ai = getAI();
  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType: mimeType,
    },
  };
  const textPart = { text: prompt };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { parts: [imagePart, textPart] },
      config: {
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Image Analysis Error:", error);
    throw error;
  }
};

/**
 * Creates a stateful chat session.
 */
export const createChatSession = (systemInstruction: string) => {
  const ai = getAI();
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction,
      thinkingConfig: { thinkingBudget: 32768 }
    },
  });
};