
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';
import { useLanguage } from '../context/LanguageContext';
import Tooltip from './Tooltip';

const Chatbot: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'model', content: t('chatWelcome') }]);
  }, [t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);

    const geminiHistory = currentMessages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
    }));

    try {
        const responseContent = await getChatResponse(geminiHistory, input);
        const modelMessage: ChatMessage = { role: 'model', content: responseContent };
        setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
        console.error("Chat Error:", error);
        const modelMessage: ChatMessage = { role: 'model', content: t('errorChat') };
        setMessages(prev => [...prev, modelMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl flex flex-col h-full p-4 shadow-2xl shadow-black/20">
      <h2 className="text-xl font-semibold text-gray-200 mb-2 border-b border-white/10 pb-2">{t('chatTitle')}</h2>
      <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl shadow-lg ${msg.role === 'user' ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white' : 'bg-slate-800/80 text-gray-200 border border-white/10'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-slate-800/80 text-gray-200 px-4 py-2 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex relative items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('chatPlaceholder')}
          className="w-full bg-slate-900/50 text-gray-200 p-2 pl-4 pr-12 rounded-full border border-white/10 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
          disabled={isLoading}
        />
        <Tooltip text={t('tooltipSend')}>
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-gradient-to-br from-cyan-500 to-purple-600 text-white rounded-full hover:from-cyan-400 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Chatbot;
