
import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from '../../constants';
import { createChatSession } from '../../lib/gemini';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AIChat: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am ConTech AI, powered by Gemini 3 Pro. I can help with safety audits, material schedules, or site logic. What complex task shall we tackle?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

  useEffect(() => {
    chatSessionRef.current = createChatSession(
      "You are a master construction superintendent and site engineer. You have deep expertise in building codes, structural safety, and resource optimization. You use Gemini 3 Pro's thinking capabilities to solve complex site problems. When asked for advice, be detailed, professional, and prioritize safety."
    );
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: result.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I encountered a processing error. This might be a complex connectivity issue. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-2xl overflow-hidden border border-slate-200">
      <div className="bg-slate-900 p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <ICONS.DailyLog className="text-white w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">ConTech AI</h4>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Thinking Active</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
          <ICONS.Error className="w-5 h-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[88%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-tl-none shadow-sm flex flex-col gap-2 w-full max-w-[80%]">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              </div>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest animate-pulse">Assistant is thinking deeply...</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <div className="flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a complex site question..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            <ICONS.ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
