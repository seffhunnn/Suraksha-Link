
import { useState, useEffect, useRef } from 'react';
import { startChat, sendMessage } from '../services/geminiService';
import type { Chat } from '@google/genai';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm Suraksha AI. How can I help you prepare for emergencies?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    try {
        chatRef.current = startChat();
    } catch (error) {
        console.error("Failed to initialize chat:", error);
        setMessages(prev => [...prev, {
            id: Date.now(),
            text: "Chatbot could not be initialized. Please check the configuration.",
            sender: 'bot'
        }]);
    }
  }, []);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    if (chatRef.current) {
        try {
            const botResponseText = await sendMessage(chatRef.current, input);
            const botMessage: Message = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
             const errorMessage: Message = { id: Date.now() + 1, text: "Sorry, something went wrong.", sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        }
    } else {
        const errorMessage: Message = { id: Date.now() + 1, text: "Chat service is not available.", sender: 'bot' };
        setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  return { messages, input, setInput, handleSend, isLoading };
};