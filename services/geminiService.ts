
import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. Chatbot will not function.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
let chat: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are 'Suraksha AI,' a friendly and helpful AI assistant for a disaster preparedness application used by students and school staff in India.
Your primary goal is to provide clear, concise, and actionable safety information.
- Answer questions related to disaster preparedness (earthquakes, floods, fires, etc.).
- If asked about a current emergency, strongly advise the user to contact local emergency services (like 112) and school authorities immediately. Do not provide medical advice.
- Keep responses short and easy to understand.
- If you don't know an answer, say so and suggest they consult official sources or their teacher.
- Your tone should be calm, reassuring, and authoritative.
`;

export const startChat = (): Chat => {
  if (!API_KEY) {
    throw new Error("API_KEY for Gemini is not configured.");
  }
  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chat;
};

export const sendMessage = async (chatInstance: Chat, message: string): Promise<string> => {
    try {
        if (!API_KEY) {
            return "Chatbot is not configured. Please contact an administrator.";
        }
        const result = await chatInstance.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return "Sorry, I'm having trouble connecting right now. Please try again later.";
    }
};