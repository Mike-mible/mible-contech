
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askAssistant = async (prompt: string, complex: boolean = false) => {
  const ai = getAI();
  const config: any = {};
  
  if (complex) {
    config.thinkingConfig = { thinkingBudget: 32768 };
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config,
  });

  return response.text;
};

export const analyzeImage = async (prompt: string, base64Data: string, mimeType: string) => {
  const ai = getAI();
  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType: mimeType,
    },
  };
  const textPart = { text: prompt };

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: [imagePart, textPart] },
  });

  return response.text;
};

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
