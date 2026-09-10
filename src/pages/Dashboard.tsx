import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Dumbbell, Clock, Activity, Play } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardData } from '../data/mockData';

export const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold text-textMain tracking-tight">
          Good Morning, Alex 👋
        </h1>
        <p className="text-lg text-textMuted font-medium">Ready to make today count?</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-pastel-orange border-none h-full flex flex-col justify-between">
            <div className="text-orange-500 mb-4 bg-white/60 w-max p-3 rounded-xl"><Flame size={24} /></div>
            <div>
              <p className="text-sm font-bold text-orange-900/60 uppercase tracking-wider mb-1">Current Streak</p>
              <h3 className="text-3xl font-black text-orange-900">12 days</h3>
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-pastel-blue border-none h-full flex flex-col justify-between">
            <div className="text-blue-500 mb-4 bg-white/60 w-max p-3 rounded-xl"><Dumbbell size={24} /></div>
            <div>
              <p className="text-sm font-bold text-blue-900/60 uppercase tracking-wider mb-1">Workouts</p>
              <h3 className="text-3xl font-black text-blue-900">24</h3>
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-pastel-green border-none h-full flex flex-col justify-between">
            <div className="text-primary mb-4 bg-white/60 w-max p-3 rounded-xl"><Activity size={24} /></div>
            <div>
              <p className="text-sm font-bold text-green-900/60 uppercase tracking-wider mb-1">Calories Burned</p>
              <h3 className="text-3xl font-black text-green-900">8,420</h3>
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-pastel-purple border-none h-full flex flex-col justify-between">
            <div className="text-purple-500 mb-4 bg-white/60 w-max p-3 rounded-xl"><Clock size={24} /></div>
            <div>
              <p className="text-sm font-bold text-purple-900/60 uppercase tracking-wider mb-1">Workout Time</p>
              <h3 className="text-3xl font-black text-purple-900">18h 42m</h3>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Weekly Chart */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-textMain">Weekly Activity</h2>
          <Card className="h-[350px] p-6 flex flex-col">
            <div className="flex-1 min-h-0 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboardData.weeklyStats} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', color: '#14213D', fontWeight: 'bold' }}
                    itemStyle={{ color: '#10B981' }}
                  />
                  <Area type="monotone" dataKey="calories" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorCalories)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-textMain">Today's Workout</h2>
            <Card className="p-1 border-borderLight overflow-hidden relative group">
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80" alt="Workout" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Upper Body Strength</h3>
                  <div className="flex items-center gap-3 text-sm text-white/80 font-medium">
                    <span className="flex items-center gap-1"><Clock size={16} /> 45 min</span>
                    <span>•</span>
                    <span>Intermediate</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-4">
                <Link to="/workout/start">
                  <Button fullWidth className="gap-2">
                    <Play size={18} className="fill-current" /> Start Workout
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-textMain">Your Progress</h2>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-textMain">Weekly Goal</span>
                <span className="font-bold text-primary">78%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-primary h-full rounded-full" 
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-textMain">Calorie Deficit</span>
                <span className="font-bold text-orange-500">65%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 mt-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="bg-orange-500 h-full rounded-full" 
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
