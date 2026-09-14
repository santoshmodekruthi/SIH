
import { NavLink } from 'react-router-dom';
import { Activity, Search, Bell } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/dashboard' },
    { name: 'Exercises', path: '/exercises' },
    { name: 'Fitness', path: '/fitness' },
    { name: 'Assessment', path: '/assessment' },
    { name: 'Diet Plans', path: '/diet' },
    { name: 'AI Coach', path: '/coach' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between border-b border-borderLight bg-white/80 px-4 md:px-8 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pastel-green text-primary">
          <Activity size={24} className="font-bold" />
        </div>
        <div>
          <span className="text-xl font-extrabold tracking-tight text-textMain block leading-none">FITZER</span>
          <span className="text-[10px] text-textMuted uppercase tracking-widest font-semibold">Train. Fuel. Transform.</span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-sm font-bold transition-colors hover:text-primary ${
                isActive ? 'text-primary' : 'text-textMuted'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" className="rounded-full h-10 w-10 p-0 hidden md:flex">
          <Search className="w-5 h-5" />
        </Button>
        <Button variant="ghost" className="rounded-full h-10 w-10 p-0 relative hidden md:flex">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>
        <NavLink to="/profile">
          <Button variant="ghost" className="rounded-full h-10 w-10 p-0 ml-2">
            <img 
              src="https://ui-avatars.com/api/?name=Alex&background=10B981&color=fff" 
              alt="Profile" 
              className="h-full w-full rounded-full object-cover border-2 border-white shadow-sm"
            />
          </Button>
        </NavLink>
      </div>
    </nav>
  );
};
