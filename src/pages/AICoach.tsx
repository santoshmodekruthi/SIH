import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

const suggestions = [
  "Create today's workout",
  "What should I eat for recovery?",
  "How can I gain muscle?",
  "Analyze my progress"
];

export const AICoach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I'm your Fitzer AI Coach. Ready to crush your goals today? How can I help you?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `I can certainly help with that! Based on your "Build Muscle" goal, I'd suggest focusing on progressive overload and ensuring a high protein intake. Want me to generate a specific routine?`
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 h-[calc(100vh-80px)] flex flex-col">
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 bg-primary/30 blur-2xl rounded-full"
          />
          <div className="relative bg-white border border-borderLight p-4 rounded-2xl shadow-sm">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold mb-2 text-textMain">Your AI Fitness Coach</h1>
        <p className="text-textMuted font-medium">Personal guidance whenever you need it.</p>
      </div>

      <div className="flex-1 bg-white border border-borderLight rounded-3xl overflow-hidden flex flex-col relative shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 max-w-[80%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                msg.sender === 'ai' ? 'bg-pastel-green text-primary' : 'bg-textMain text-white'
              }`}>
                {msg.sender === 'ai' ? <Bot size={18} /> : <User size={18} />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-textMain text-white rounded-tr-sm font-medium' 
                  : 'bg-white border border-borderLight rounded-tl-sm text-textMain font-medium leading-relaxed'
              }`}>
                <p>{msg.text}</p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 max-w-[80%]">
              <div className="shrink-0 w-8 h-8 rounded-full bg-pastel-green text-primary flex items-center justify-center shadow-sm">
                <Bot size={18} />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-borderLight rounded-tl-sm flex items-center gap-2 shadow-sm">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 bg-textMuted rounded-full" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-textMuted rounded-full" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-textMuted rounded-full" />
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-borderLight bg-white">
          
          {/* Suggestions */}
          <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
            {suggestions.map((s, i) => (
              <button 
                key={i}
                onClick={() => handleSend(s)}
                className="whitespace-nowrap px-4 py-2 bg-white border border-borderLight shadow-sm rounded-xl text-sm font-semibold text-textMain hover:border-primary/50 hover:text-primary transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex items-center gap-2"
          >
            <input 
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask your coach anything..."
              className="flex-1 bg-background border border-borderLight shadow-sm rounded-2xl py-4 px-6 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-textMain placeholder:text-textMuted font-medium"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-4 bg-primary text-white rounded-2xl hover:bg-primaryHover disabled:opacity-50 transition-colors shadow-sm"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

