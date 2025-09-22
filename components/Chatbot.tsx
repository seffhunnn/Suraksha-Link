
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './icons';
import { useChat } from '../hooks/useChat';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { messages, input, setInput, handleSend, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Manages the entire intro animation sequence on component mount.
  useEffect(() => {
    // 1. Make the button appear (slide up and fade in).
    const mountTimer = setTimeout(() => {
      setIsMounted(true);
    }, 500); // Delay to allow the page to render first.

    // 2. Expand the button to show text.
    const expandTimer = setTimeout(() => {
      setIsIntroExpanded(true);
    }, 1000); // Start expanding shortly after it appears.

    // 3. Collapse the button back to its iconic state.
    const collapseTimer = setTimeout(() => {
      setIsIntroExpanded(false);
    }, 6000); // 1000ms to appear + 5000ms to stay expanded.

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(expandTimer);
      clearTimeout(collapseTimer);
    };
  }, []);


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 z-50 flex items-center transition-all duration-500 ease-in-out transform ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } ${
            isOpen
                ? 'p-4' // Shape when chat window is open.
                : isIntroExpanded
                ? 'py-4 px-6' // Expanded intro state.
                : 'p-4' // Collapsed default state.
        }`}
        aria-label="Open Chatbot"
      >
        {isOpen ? (
            <Icons.X className="h-8 w-8" />
        ) : (
            <>
                <Icons.MessageCircle className="h-8 w-8 flex-shrink-0" />
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isIntroExpanded ? 'max-w-xs ml-3' : 'max-w-0 ml-0'}`}>
                    <span className="whitespace-nowrap pr-1">
                        Need help? Chat with Suraksha AI!
                    </span>
                </div>
            </>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 dark:border-gray-700 animate-fade-in-up">
          <header className="p-4 bg-primary-600 text-white rounded-t-2xl flex items-center">
            <Icons.MessageCircle className="h-6 w-6 mr-3" />
            <h3 className="text-lg font-semibold">Suraksha AI</h3>
          </header>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex flex-col space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white flex-shrink-0"><Icons.Shield className="h-5 w-5"/></div>}
                  <div className={`px-4 py-2 rounded-2xl max-w-[80%] ${msg.sender === 'user' ? 'bg-primary-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-end gap-2 justify-start">
                   <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white flex-shrink-0"><Icons.Shield className="h-5 w-5"/></div>
                  <div className="px-4 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700">
                    <Icons.Loader className="h-5 w-5 animate-spin text-gray-500" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a safety question..."
              className="flex-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || input.trim() === ''}
              className="p-3 bg-primary-600 text-white rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Icons.Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;