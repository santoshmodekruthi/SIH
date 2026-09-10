import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Target, Activity, Flame, Trophy } from 'lucide-react';

const assessmentQuestions = [
  {
    question: "What is your primary fitness goal?",
    options: ["Weight Loss", "Muscle Gain", "Strength", "Endurance", "General Fitness"]
  },
  {
    question: "What is your current fitness level?",
    options: ["Beginner", "Intermediate", "Advanced"]
  },
  {
    question: "How many days per week can you work out?",
    options: ["2–3", "4–5", "6+"]
  },
  {
    question: "Where do you prefer to work out?",
    options: ["Home", "Gym", "Outdoor"]
  },
  {
    question: "How long can you train per session?",
    options: ["15–30 minutes", "30–45 minutes", "45–60 minutes", "60+ minutes"]
  },
  {
    question: "What type of training do you prefer?",
    options: ["Strength", "Cardio", "HIIT", "Mixed"]
  },
  {
    question: "How would you describe your current activity level?",
    options: ["Low", "Moderate", "High"]
  },
  {
    question: "What equipment do you have access to?",
    options: ["None", "Basic equipment", "Full gym"]
  },
  {
    question: "What area would you most like to improve?",
    options: ["Strength", "Stamina", "Weight", "Flexibility", "Muscle"]
  },
  {
    question: "How committed are you to your fitness goal?",
    options: ["Beginner commitment", "Moderate commitment", "Highly committed"]
  }
];

export const FitnessAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [currentStep]: option });
    setTimeout(() => {
      if (currentStep < assessmentQuestions.length - 1) {
        setCurrentStep(c => c + 1);
      } else {
        setIsComplete(true);
      }
    }, 300);
  };

  if (isComplete) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8"
        >
          <div className="w-24 h-24 bg-pastel-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-black text-textMain">Your Fitness Assessment is Complete 🎉</h1>
          <p className="text-textMuted text-lg font-medium">We've generated a personalized summary based on your answers.</p>
          
          <div className="grid md:grid-cols-2 gap-6 text-left mt-12">
            <Card className="bg-white border-borderLight shadow-sm">
              <h3 className="text-textMuted text-xs font-bold uppercase tracking-widest mb-1">Fitness Level</h3>
              <p className="text-2xl font-black text-textMain">{answers[1] || 'Intermediate'}</p>
            </Card>
            <Card className="bg-white border-borderLight shadow-sm">
              <h3 className="text-textMuted text-xs font-bold uppercase tracking-widest mb-1">Primary Goal</h3>
              <p className="text-2xl font-black text-textMain">{answers[0] || 'General Fitness'}</p>
            </Card>
            <Card className="bg-white border-borderLight shadow-sm">
              <h3 className="text-textMuted text-xs font-bold uppercase tracking-widest mb-1">Frequency</h3>
              <p className="text-2xl font-black text-textMain">{answers[2] || '4-5'} days/week</p>
            </Card>
            <Card className="bg-white border-borderLight shadow-sm">
              <h3 className="text-textMuted text-xs font-bold uppercase tracking-widest mb-1">Training Style</h3>
              <p className="text-2xl font-black text-textMain">{answers[5] || 'Mixed'}</p>
            </Card>
          </div>

          <div className="pt-12 border-t border-borderLight mt-12">
            <h2 className="text-2xl font-black mb-6 text-textMain">Your Recommended Plan</h2>
            <Button size="lg" onClick={() => navigate('/exercises')} className="shadow-lg shadow-primary/30">Explore Recommended Workouts</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const progress = ((currentStep + 1) / assessmentQuestions.length) * 100;
  const question = assessmentQuestions[currentStep];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-16 min-h-[70vh] flex flex-col">
      <div className="mb-12">
        <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Question {currentStep + 1} of {assessmentQuestions.length}</p>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <motion.div 
            className="bg-primary h-2 rounded-full shadow-sm shadow-primary/50"
            initial={{ width: `${(currentStep / assessmentQuestions.length) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-textMain">{question.question}</h2>
            
            <div className="grid gap-4">
              {question.options.map(option => {
                const isSelected = answers[currentStep] === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left p-6 rounded-2xl text-lg font-bold transition-all duration-200 border-2 ${
                      isSelected 
                        ? 'border-primary bg-pastel-green text-primary shadow-sm' 
                        : 'border-borderLight bg-white text-textMuted hover:border-primary/50 hover:bg-slate-50 shadow-sm'
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
