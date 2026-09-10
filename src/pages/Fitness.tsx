import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Dumbbell, HeartPulse, Flame, Activity } from 'lucide-react';

export const Fitness = () => {
  const cards = [
    {
      title: 'Strength',
      desc: 'Improve muscle strength and power.',
      icon: <Dumbbell className="w-8 h-8 text-primary" />,
      duration: '45-60 min',
      difficulty: 'Intermediate',
      color: 'from-blue-500/20'
    },
    {
      title: 'Cardio',
      desc: 'Improve cardiovascular endurance.',
      icon: <HeartPulse className="w-8 h-8 text-primary" />,
      duration: '30-45 min',
      difficulty: 'Beginner',
      color: 'from-red-500/20'
    },
    {
      title: 'Weight Loss',
      desc: 'Burn calories and improve body composition.',
      icon: <Flame className="w-8 h-8 text-primary" />,
      duration: '40-50 min',
      difficulty: 'All Levels',
      color: 'from-orange-500/20'
    },
    {
      title: 'Flexibility & Mobility',
      desc: 'Improve movement and flexibility.',
      icon: <Activity className="w-8 h-8 text-primary" />,
      duration: '15-20 min',
      difficulty: 'Beginner',
      color: 'from-green-500/20'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-textMain">Build Your Fitness</h1>
        <p className="text-textMuted text-lg font-medium">Choose a training style that matches your goals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card hoverEffect className={`relative overflow-hidden bg-white border border-borderLight`}>
              <div className="absolute inset-0 bg-gradient-to-br opacity-50 pointer-events-none" />
              <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10 p-2">
                <div className={`p-5 rounded-2xl shadow-sm ${card.color.replace('from-', 'bg-').replace('/20', '')}`}>
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold mb-2 text-textMain">{card.title}</h3>
                  <p className="text-textMuted font-medium mb-6">{card.desc}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm font-semibold mb-6">
                    <span className="px-3 py-1 bg-slate-100 text-textMain rounded-lg">{card.duration}</span>
                    <span className="px-3 py-1 bg-pastel-blue text-blue-700 rounded-lg">{card.difficulty}</span>
                  </div>

                  <Link to="/exercises">
                    <Button variant="outline" className="w-full sm:w-auto">Explore</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
