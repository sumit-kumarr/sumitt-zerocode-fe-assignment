
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let genAI: GoogleGenerativeAI | null = null;

export const initializeGemini = (apiKey?: string) => {
  const key = apiKey || API_KEY;
  if (key) {
    genAI = new GoogleGenerativeAI(key);
  }
  return !!genAI;
};

export const sendMessage = async (message: string, history: Array<{role: string, parts: string}> = []) => {
  if (!genAI) {
    throw new Error('Gemini AI not initialized. Please provide an API key.');
  }

  try {
    // Use the correct model name - gemini-1.5-flash instead of deprecated gemini-pro
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.parts }]
      }))
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini AI Error:', error);
    throw new Error('Failed to get response from AI. Please try again.');
  }
};

// Initialize with environment variable if available
if (API_KEY) {
  initializeGemini();
}
