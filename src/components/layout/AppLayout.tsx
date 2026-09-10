import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Navbar } from './Navbar';
import { AIChatbot } from '../ui/AIChatbot';
import { Home, Dumbbell, Activity, Target, MessageSquare } from 'lucide-react';

export const AppLayout = () => {
  const mobileNav = [
    { name: 'Home', path: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Exercises', path: '/exercises', icon: <Dumbbell className="w-5 h-5" /> },
    { name: 'Fitness', path: '/fitness', icon: <Activity className="w-5 h-5" /> },
    { name: 'Assess', path: '/assessment', icon: <Target className="w-5 h-5" /> },
    { name: 'Coach', path: '/coach', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background text-textMain pb-20 lg:pb-0">
      <Navbar />
      
      <main className="pt-20">
        <Outlet />
      </main>

      <AIChatbot />

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-borderLight flex justify-around items-center h-16 px-2 z-40 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        {mobileNav.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-primary' : 'text-textMuted hover:text-textMain'}`
            }
          >
            {item.icon}
            <span className="text-[10px] font-semibold">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
