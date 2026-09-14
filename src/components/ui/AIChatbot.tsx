import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, X, MessageSquare } from 'lucide-react';
import { fitnessQuestions } from '../../data/fitnessQuestions';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'ai',
      text: "Hello! I'm your Fitzer AI Coach. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = "I'm here to help with fitness, workouts, nutrition and healthy training habits. Try asking one of the suggested questions above.";
      
      const foundQA = fitnessQuestions.find(qa => qa.question.toLowerCase() === text.toLowerCase());
      if (foundQA) {
        aiResponseText = foundQA.answer;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText
      };
      
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  const clearChat = () => {
    setMessages([{
      id: Date.now().toString(),
      sender: 'ai',
      text: "Hello! I'm your Fitzer AI Coach. How can I help you today?"
    }]);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-primary text-background rounded-full shadow-2xl shadow-primary/30 group"
      >
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></div>
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-32px)] md:w-[400px] h-[600px] max-h-[80vh] bg-white/95 backdrop-blur-xl border border-borderLight rounded-3xl flex flex-col shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-borderLight bg-white">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </div>
                <div>
                  <h3 className="font-bold text-textMain">Fitzer AI Coach</h3>
                  <p className="text-xs text-textMuted font-medium">Your personal fitness assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={clearChat} className="text-xs text-textMuted hover:text-textMain transition-colors font-semibold">Clear</button>
                <button onClick={() => setIsOpen(false)} className="p-1 text-textMuted hover:text-textMain transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                    msg.sender === 'ai' ? 'bg-pastel-green text-primary' : 'bg-textMain text-white'
                  }`}>
                    {msg.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-textMain text-white rounded-tr-sm font-medium' 
                      : 'bg-white border border-borderLight rounded-tl-sm text-textMain leading-relaxed font-medium'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[85%]">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-pastel-green text-primary flex items-center justify-center shadow-sm">
                    <Bot size={16} />
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-borderLight rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-textMuted rounded-full" />
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-textMuted rounded-full" />
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-textMuted rounded-full" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area & Predefined Questions */}
            <div className="bg-white border-t border-borderLight p-3">
              <div className="mb-3">
                <p className="text-[10px] text-textMuted font-bold tracking-widest uppercase mb-2">Popular Questions</p>
                <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                  {fitnessQuestions.map((qa) => (
                    <button
                      key={qa.id}
                      onClick={() => handleSend(qa.question)}
                      className="whitespace-nowrap px-3 py-1.5 bg-white border border-borderLight shadow-sm rounded-lg text-xs font-semibold hover:border-primary/50 hover:text-primary transition-colors flex items-center gap-1.5 text-textMain"
                    >
                      <MessageSquare className="w-3 h-3 text-primary" />
                      {qa.question}
                    </button>
                  ))}
                </div>
              </div>

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex items-center gap-2 bg-background border border-borderLight rounded-xl p-1 shadow-sm focus-within:border-primary/50 transition-colors"
              >
                <input 
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask your coach anything..."
                  className="flex-1 bg-transparent py-2 px-3 text-sm focus:outline-none text-textMain placeholder:text-textMuted font-medium"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2 bg-primary text-white rounded-lg hover:bg-primaryHover disabled:opacity-50 transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

