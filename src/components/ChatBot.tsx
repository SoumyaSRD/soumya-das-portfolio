import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Trash2 } from 'lucide-react';
import { simulatedChatBotResponses } from '../data/portfolioData';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: `Hello! I am Soumya's portfolio AI assistant. I can answer questions about his 7+ years of experience, Angular & React craftsmanship, and NestJS backends. What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Quick suggestion prompts
  const suggestions = [
    { label: '💼 Core Experience', query: 'experience' },
    { label: '🛡️ Code Quality', query: 'quality' },
    { label: '🛠️ Tech Stack', query: 'angular' },
    { label: '📞 Contact Details', query: 'contact' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => chatInputRef.current?.focus(), 150);
    }
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // AI logic (Keyword parsing)
    setTimeout(() => {
      const normalizedQuery = textToSend.toLowerCase();
      let responseText = simulatedChatBotResponses.default;

      if (normalizedQuery.includes('experience') || normalizedQuery.includes('years') || normalizedQuery.includes('work') || normalizedQuery.includes('esspl') || normalizedQuery.includes('zemusi')) {
        responseText = simulatedChatBotResponses.experience;
      } else if (normalizedQuery.includes('angular') || normalizedQuery.includes('rxjs') || normalizedQuery.includes('ngrx') || normalizedQuery.includes('state')) {
        responseText = simulatedChatBotResponses.angular;
      } else if (normalizedQuery.includes('react') || normalizedQuery.includes('typescript') || normalizedQuery.includes('tailwind')) {
        responseText = simulatedChatBotResponses.react;
      } else if (normalizedQuery.includes('node') || normalizedQuery.includes('nestjs') || normalizedQuery.includes('express') || normalizedQuery.includes('api') || normalizedQuery.includes('backend')) {
        responseText = simulatedChatBotResponses.node;
      } else if (normalizedQuery.includes('quality') || normalizedQuery.includes('sonar') || normalizedQuery.includes('review') || normalizedQuery.includes('test')) {
        responseText = simulatedChatBotResponses.quality;
      } else if (normalizedQuery.includes('contact') || normalizedQuery.includes('email') || normalizedQuery.includes('phone') || normalizedQuery.includes('reach') || normalizedQuery.includes('hire')) {
        responseText = simulatedChatBotResponses.contact;
      } else if (normalizedQuery.includes('project') || normalizedQuery.includes('dashboard') || normalizedQuery.includes('transport') || normalizedQuery.includes('20high')) {
        responseText = simulatedChatBotResponses.projects;
      } else if (normalizedQuery.includes('interest') || normalizedQuery.includes('hobby') || normalizedQuery.includes('hobbies') || normalizedQuery.includes('learn') || normalizedQuery.includes('flutter')) {
        responseText = simulatedChatBotResponses.hobbies;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: responseText,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 850);
  };

  const clearChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: `Chat cleared! What other details about Soumya's professional background can I fetch for you?`,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 no-print font-sans">
      {/* 1. Floating Action Icon Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-accent-primary text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer relative group border border-border-custom"
          style={{ boxShadow: 'var(--theme-glow-style)' }}
        >
          <MessageSquare size={22} className="animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-secondary"></span>
          </span>
          {/* Tooltip */}
          <div className="absolute right-16 bg-bg-secondary text-text-primary border border-border-custom px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Ask Soumya's AI Agent
          </div>
        </button>
      )}

      {/* 2. Expanded Chatbot Window */}
      {isOpen && (
        <div
          className="w-[calc(100vw-32px)] sm:w-[350px] md:w-[400px] h-[500px] glass-panel flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300"
          style={{
            boxShadow: 'var(--theme-glow-style)',
          }}
        >
          {/* Header */}
          <div className="bg-bg-secondary border-b border-border-custom px-4 py-4 flex justify-between items-center select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center border border-accent-primary/30">
                <Bot size={18} className="text-accent-primary" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-text-primary tracking-wider uppercase">Soumya AI Agent</h3>
                <p className="text-[10px] text-text-muted flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Ready to answer recruiter Qs
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={clearChat}
                className="text-text-muted hover:text-red-500 transition-colors p-1 rounded hover:bg-white/5 cursor-pointer"
                title="Clear Chat History"
              >
                <Trash2 size={14} />
              </button>
              <button
                onClick={toggleChat}
                className="text-text-muted hover:text-text-primary transition-colors p-1 rounded hover:bg-white/5 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-primary/45">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-accent-secondary/15 border border-accent-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot size={12} className="text-accent-secondary" />
                  </div>
                )}
                <div>
                  <div
                    className={`p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-accent-primary text-white rounded-2xl rounded-tr-none'
                        : 'bg-bg-secondary border border-border-custom text-text-primary rounded-2xl rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-text-muted px-1.5 mt-1 block">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 mr-auto max-w-[80%]">
                <div className="w-6 h-6 rounded-full bg-accent-secondary/15 border border-accent-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5 animate-bounce">
                  <Bot size={12} className="text-accent-secondary" />
                </div>
                <div className="bg-bg-secondary border border-border-custom p-3 rounded-2xl rounded-tl-none flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Pill Prompts */}
          <div className="px-4 py-2 border-t border-border-custom flex gap-2 overflow-x-auto whitespace-nowrap bg-bg-secondary/40 select-none scrollbar-none">
            {suggestions.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(pill.label.substring(4))}
                className="px-2.5 py-1 text-[10px] font-medium bg-bg-secondary hover:bg-accent-primary hover:text-white text-text-primary border border-border-custom rounded-full transition-all cursor-pointer shadow-sm flex-shrink-0"
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputVal);
            }}
            className="p-3 border-t border-border-custom flex items-center gap-2 bg-bg-secondary"
          >
            <input
              ref={chatInputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-bg-primary border border-border-custom focus:border-accent-primary outline-none text-xs rounded-xl px-3.5 py-2.5 text-text-primary focus:ring-1 focus:ring-accent-primary"
              placeholder="Ask me something..."
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="w-9 h-9 rounded-xl bg-accent-primary text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all cursor-pointer border border-border-custom"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
