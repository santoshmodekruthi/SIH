import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Activity, Flame, Dumbbell } from 'lucide-react';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-background pt-20 flex items-center">
      <section className="px-4 md:px-8 py-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="flex-1 space-y-8 z-10 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 rounded-full bg-pastel-green text-primary font-bold text-xs tracking-widest uppercase border border-primary/20"
          >
            Your Fitness Journey Starts Here
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-textMain"
          >
            Train Smarter. <br />
            <span className="text-primary">Transform</span> Stronger.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-textMuted max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Personalized workouts, nutrition and AI coaching designed around your fitness goals.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/30">
                Start Training
              </Button>
            </Link>
            <Link to="/assessment">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Take Fitness Assessment
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex-1 relative w-full aspect-[4/3] max-w-[600px] mt-10 lg:mt-0"
        >
          {/* Main Image Container */}
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-pastel-blue">
            <img 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80" 
              alt="Athlete working out" 
              className="object-cover w-full h-full"
            />
          </div>

          {/* Floating Card 1 */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-10 -left-6 md:-left-12 bg-white px-5 py-4 rounded-2xl flex items-center gap-4 shadow-soft-lg border border-borderLight"
          >
            <div className="p-3 bg-pastel-orange rounded-xl text-orange-500">
              <Flame className="w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-textMain">12 Day Streak</p>
              <p className="text-xs font-medium text-textMuted">Keep it up!</p>
            </div>
          </motion.div>
          
          {/* Floating Card 2 */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 -left-4 md:-left-8 bg-white px-5 py-4 rounded-2xl flex items-center gap-4 shadow-soft-lg border border-borderLight"
          >
            <div className="p-3 bg-pastel-blue rounded-xl text-blue-500">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-textMain">4 Workouts</p>
              <p className="text-xs font-medium text-textMuted">Completed this week</p>
            </div>
          </motion.div>

          {/* Floating Card 3 */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/2 -right-6 md:-right-10 bg-white px-5 py-4 rounded-2xl flex items-center gap-4 shadow-soft-lg border border-borderLight"
          >
            <div className="p-3 bg-pastel-green rounded-xl text-primary">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-textMain">78% Goal</p>
              <p className="text-xs font-medium text-textMuted">Almost there!</p>
            </div>
          </motion.div>

        </motion.div>
      </section>
    </div>
  );
};

