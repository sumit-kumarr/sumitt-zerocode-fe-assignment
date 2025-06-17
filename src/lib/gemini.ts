
import { GoogleGenerativeAI } from '@google/generative-ai';

// Direct API key - no user input needed
const API_KEY = 'AIzaSyDC_T756pM450zJ4OaqhYimqfwlJivdtgw';

let genAI: GoogleGenerativeAI;

// Initialize immediately with the API key
const initializeGemini = () => {
  genAI = new GoogleGenerativeAI(API_KEY);
  return true;
};

export const sendMessage = async (message: string, history: Array<{role: string, parts: string}> = []) => {
  if (!genAI) {
    initializeGemini();
  }

  try {
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

// Initialize immediately
initializeGemini();
