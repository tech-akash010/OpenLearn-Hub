
import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ChevronDown, 
  RefreshCw, 
  AlertCircle,
  CheckCircle2,
  Minus
} from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage, ChatContext } from '../types';

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<ChatContext>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: input }]
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response = await geminiService.chatWithAI([...messages, userMessage], context);
      
      // Handle Tool Calls
      if (response.functionCalls && response.functionCalls.length > 0) {
        for (const fc of response.functionCalls) {
          if (fc.name === 'changeContext') {
            const { subjectName, topicName, subtopicName } = fc.args as any;
            const validation = geminiService.validateContext(subjectName, topicName, subtopicName);

            if (validation.valid) {
              const newContext: ChatContext = {
                subject: validation.subject?.name,
                topic: validation.topic?.title,
                subtopic: validation.subtopic?.title
              };
              setContext(newContext);
              
              // Clear previous context and messages for a fresh start
              setMessages([
                {
                  role: 'model',
                  parts: [{ text: `🔄 System: Context switched successfully. New Focus: ${newContext.subject} ${newContext.topic ? `> ${newContext.topic}` : ''} ${newContext.subtopic ? `> ${newContext.subtopic}` : ''}. How can I assist you with this area?` }]
                }
              ]);
            } else {
              setMessages(prev => [...prev, {
                role: 'model',
                parts: [{ text: `⚠️ ${validation.message} Please request a valid area from the Hub.` }]
              }]);
            }
          }
        }
      } else {
        const text = response.text || "I'm sorry, I couldn't process that. Please try again.";
        setMessages(prev => [...prev, { role: 'model', parts: [{ text }] }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        parts: [{ text: "An error occurred while connecting to the smart brain. Please try again." }] 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-400/50 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
      >
        <Bot size={32} />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-4 border-white animate-bounce group-hover:animate-none"></div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${isMinimized ? 'w-72 h-14' : 'w-[450px] h-[650px]'} flex flex-col bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden`}>
      {/* Header */}
      <div className="bg-gray-900 text-white px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-black text-sm tracking-tight">OpenLearn AI</h3>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Brain</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <Minus size={18} />
          </button>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Context Bar */}
          <div className="px-6 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
            <div className="flex items-center space-x-2 overflow-hidden">
              <RefreshCw size={12} className="text-blue-600 flex-shrink-0" />
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest truncate">
                Context: {context.subject || 'Global Hub'} {context.topic ? `> ${context.topic}` : ''}
              </span>
            </div>
            <button className="p-1 hover:bg-blue-100 rounded-md transition-colors">
              <ChevronDown size={14} className="text-blue-600" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-10">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                  <Bot size={40} />
                </div>
                <h4 className="font-black text-gray-900">How can I help you today?</h4>
                <p className="text-sm text-gray-500 font-medium">I'm currently focused on the Global Hub. Ask me anything, or tell me to switch subjects!</p>
                <div className="grid grid-cols-1 gap-2 w-full mt-4">
                  <button onClick={() => setInput('Tell me about Operating Systems')} className="text-xs font-bold text-gray-600 bg-gray-50 p-3 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100">"Tell me about Operating Systems"</button>
                  <button onClick={() => setInput('Switch subject to Biology')} className="text-xs font-bold text-gray-600 bg-gray-50 p-3 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100">"Switch subject to Biology"</button>
                </div>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] px-6 py-4 rounded-[2rem] text-sm font-medium leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-xl shadow-blue-100' 
                    : 'bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100'
                }`}>
                  {msg.parts[0].text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 px-6 py-4 rounded-[2rem] rounded-tl-none border border-gray-100 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-8 border-t border-gray-50 bg-white">
            <div className="relative group">
              <input 
                type="text" 
                className="w-full pl-6 pr-14 py-5 bg-gray-900 text-white rounded-[2rem] focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium placeholder:text-gray-500"
                placeholder="Ask your smart assistant..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center mt-4">
              AI-Powered by Gemini 3 Flash • Strictly Context-Bound
            </p>
          </div>
        </>
      )}
    </div>
  );
};
