import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

const steps = [
  {
    title: "What's your goal?",
    options: ['Lose Weight', 'Build Muscle', 'Get Stronger', 'Improve Endurance']
  },
  {
    title: "What's your experience?",
    options: ['Beginner', 'Intermediate', 'Advanced']
  },
  {
    title: "How often do you train?",
    options: ['2–3 days', '4–5 days', '6+ days']
  },
  {
    title: "Where do you train?",
    options: ['Home', 'Gym', 'Outdoor']
  }
];

export const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [isFinishing, setIsFinishing] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (option: string) => {
    setSelections({ ...selections, [currentStep]: option });
    
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(c => c + 1);
      } else {
        setIsFinishing(true);
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    }, 400);
  };

  if (isFinishing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-16 h-16 border-4 border-surfaceHover border-t-primary rounded-full mx-auto"
          />
          <h2 className="text-3xl font-bold">Crafting your Fitzer plan...</h2>
          <p className="text-muted">Analyzing your goals and experience level</p>
        </motion.div>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 py-8 max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-center gap-2 mb-16 pt-12">
        {steps.map((_, i) => (
          <React.Fragment key={i}>
            <div className={`w-3 h-3 rounded-full transition-colors ${
              i <= currentStep ? 'bg-primary' : 'bg-surfaceHover'
            }`} />
            {i < steps.length - 1 && (
              <div className={`w-12 h-1 rounded-full transition-colors ${
                i < currentStep ? 'bg-primary' : 'bg-surfaceHover'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">{step.title}</h1>
            
            <div className="grid gap-4">
              {step.options.map(option => {
                const isSelected = selections[currentStep] === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`p-6 rounded-2xl text-xl font-medium transition-all duration-300 border-2 ${
                      isSelected 
                        ? 'border-primary bg-primary/10 text-white translate-x-2' 
                        : 'border-surfaceHover bg-surface text-muted hover:border-primary/50 hover:text-white'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
