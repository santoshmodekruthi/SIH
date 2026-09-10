import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Settings, Target, Activity, Flame, Dumbbell, Award, Clock, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Header Profile Section */}
      <Card className="p-8 flex flex-col md:flex-row items-center md:items-start gap-8 bg-white border-borderLight shadow-sm">
        <div className="relative group shrink-0">
          <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-white shadow-lg bg-pastel-green">
            <img 
              src="https://ui-avatars.com/api/?name=Alex&background=10B981&color=fff&size=200" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-2 right-2 p-2 bg-white text-primary rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <h1 className="text-3xl font-extrabold text-textMain mb-1">Alex Carter</h1>
            <p className="text-textMuted font-medium flex items-center justify-center md:justify-start gap-2">
              <Target className="w-4 h-4" /> Muscle Gain Focus
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <span className="px-3 py-1.5 bg-pastel-blue text-blue-700 rounded-lg text-sm font-bold flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> Intermediate
            </span>
            <span className="px-3 py-1.5 bg-pastel-orange text-orange-700 rounded-lg text-sm font-bold flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> 12 Day Streak
            </span>
          </div>
        </div>

        <Button variant="outline" className="shrink-0 gap-2">
          <Settings className="w-4 h-4" /> Edit Profile
        </Button>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { icon: <Dumbbell />, label: 'Workouts', value: '124', color: 'text-blue-500', bg: 'bg-pastel-blue' },
          { icon: <Flame />, label: 'Calories', value: '45.2k', color: 'text-orange-500', bg: 'bg-pastel-orange' },
          { icon: <Award />, label: 'Achievements', value: '12', color: 'text-yellow-500', bg: 'bg-pastel-yellow' },
          { icon: <Clock />, label: 'Hours', value: '86', color: 'text-purple-500', bg: 'bg-pastel-purple' }
        ].map((stat, i) => (
          <Card key={i} className="p-6 bg-white border-borderLight shadow-sm flex flex-col justify-center">
            <div className={`mb-3 w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-[10px] text-textMuted font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-textMain">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {['Overview', 'Achievements', 'Progress', 'Settings'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap shadow-sm ${
              activeTab === tab.toLowerCase()
                ? 'bg-primary text-white'
                : 'bg-white border border-borderLight text-textMuted hover:text-textMain'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 md:p-8 bg-white border-borderLight shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-textMain">Personal Information</h2>
              <Button variant="ghost" className="text-primary hover:text-primaryHover">Edit</Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Email</p>
                <p className="font-medium text-textMain">alex@example.com</p>
              </div>
              <div>
                <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Member Since</p>
                <p className="font-medium text-textMain">March 2023</p>
              </div>
              <div>
                <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Height</p>
                <p className="font-medium text-textMain">180 cm</p>
              </div>
              <div>
                <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Weight</p>
                <p className="font-medium text-textMain">75 kg</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:p-8 bg-white border-borderLight shadow-sm">
            <h2 className="text-2xl font-bold text-textMain mb-6">Preferences</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-borderLight">
                <div>
                  <h4 className="font-bold text-textMain">Workout Reminders</h4>
                  <p className="text-sm text-textMuted font-medium">Get notified when it's time to train</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-borderLight">
                <div>
                  <h4 className="font-bold text-textMain">Weekly Report</h4>
                  <p className="text-sm text-textMuted font-medium">Receive weekly progress summaries</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Achievements Widget */}
        <div className="space-y-6">
          <Card className="p-6 bg-white border-borderLight shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-textMain">Recent Badges</h3>
              <Link to="/achievements" className="text-sm text-primary font-bold hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Early Bird', desc: 'Workout before 7 AM', icon: '🌅', bg: 'bg-pastel-orange' },
                { name: 'Iron Man', desc: 'Lift 10,000 kg total', icon: '🦾', bg: 'bg-slate-100' },
                { name: 'Consistency', desc: '14 day streak', icon: '🔥', bg: 'bg-pastel-pink' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-borderLight">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${badge.bg}`}>
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-textMain">{badge.name}</h4>
                    <p className="text-xs text-textMuted font-medium">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};


