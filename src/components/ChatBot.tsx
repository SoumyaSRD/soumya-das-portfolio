import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Trash2, Sparkles, CheckCircle } from 'lucide-react';
import { simulatedChatBotResponses } from '../data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isVerified?: boolean;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: `Hello! I am Soumya's portfolio AI assistant. I can answer questions about his 7+ years of experience, Angular & React craftsmanship, and NestJS backends. What would you like to know?`,
      timestamp: new Date(),
      isVerified: true
    },
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const suggestions = [
    { label: '💼 Experience', query: 'experience' },
    { label: '🛡️ Quality', query: 'quality' },
    { label: '🛠️ Tech Stack', query: 'angular' },
    { label: '📞 Contact', query: 'contact' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => chatInputRef.current?.focus(), 300);
    }
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

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
          isVerified: true
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const clearChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: `Chat cleared! What other details about Soumya's professional background can I fetch for you?`,
        timestamp: new Date(),
        isVerified: true
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChat}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary text-white flex items-center justify-center shadow-xl cursor-pointer relative group border border-white/20"
          >
            <MessageSquare size={22} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-secondary"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, x: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100, x: 50 }}
            className="w-[calc(100vw-32px)] sm:w-[380px] h-[550px] glass-panel flex flex-col overflow-hidden shadow-2xl origin-bottom-right"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Header */}
            <div className="bg-bg-secondary/80 backdrop-blur-md border-b border-border-custom px-5 py-4 flex justify-between items-center select-none">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center border border-accent-primary/30">
                    <Bot size={20} className="text-accent-primary" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-bg-secondary rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-xs font-black text-text-primary tracking-tight uppercase flex items-center gap-1.5">
                    Soumya's Agent <Sparkles size={12} className="text-amber-400" />
                  </h3>
                  <p className="text-[10px] text-text-muted font-mono tracking-wider">
                    AI POWERED ASSISTANT
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="p-2 text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-all rounded-lg cursor-pointer"
                  title="Clear Chat"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-2 text-text-muted hover:text-text-primary hover:bg-white/10 transition-all rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-gradient-to-b from-bg-primary/50 to-bg-secondary/30">
              {messages.map((msg, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  key={index}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`flex gap-2.5 max-w-[90%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {msg.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot size={12} className="text-accent-primary" />
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl text-[12.5px] leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-accent-primary to-accent-secondary text-white rounded-tr-none'
                          : 'bg-bg-secondary border border-border-custom text-text-primary rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                      {msg.isVerified && msg.sender === 'bot' && (
                        <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border-custom/50 text-[9px] font-bold text-accent-primary uppercase tracking-widest">
                          <CheckCircle size={10} /> Verified Experience Data
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-[9px] text-text-muted mt-1.5 px-1 font-mono">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5 items-center"
                >
                  <div className="w-6 h-6 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                    <Bot size={12} className="text-accent-primary" />
                  </div>
                  <div className="flex gap-1">
                    <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 rounded-full bg-accent-primary"></motion.span>
                    <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-accent-primary"></motion.span>
                    <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-accent-primary"></motion.span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-5 py-3 border-t border-border-custom flex gap-2 overflow-x-auto whitespace-nowrap bg-bg-secondary/20 scrollbar-none">
              {suggestions.map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(pill.label.substring(2))}
                  className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-bg-primary hover:bg-accent-primary hover:text-white text-text-primary border border-border-custom rounded-full transition-all cursor-pointer shadow-sm flex-shrink-0 font-mono"
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputVal);
              }}
              className="p-4 border-t border-border-custom bg-bg-secondary flex gap-2"
            >
              <input
                ref={chatInputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-bg-primary border border-border-custom focus:border-accent-primary outline-none text-xs rounded-xl px-4 py-3 text-text-primary transition-all placeholder:text-text-muted/50"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                className="w-11 h-11 rounded-xl bg-gradient-to-tr from-accent-primary to-accent-secondary text-white flex items-center justify-center disabled:opacity-40 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent-primary/20"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

