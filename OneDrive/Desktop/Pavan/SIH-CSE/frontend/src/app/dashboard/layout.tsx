import Link from "next/link";
import { 
  Home, Activity, Apple, Dumbbell, Calendar, MessageSquare, 
  BarChart, MapPin, User, Shield 
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "AI Trainer", href: "/dashboard/trainer", icon: Activity },
  { name: "AI Dietician", href: "/dashboard/dietician", icon: Apple },
  { name: "Smart Gym", href: "/dashboard/smartgym", icon: Dumbbell },
  { name: "Habit Tracker", href: "/dashboard/habits", icon: Calendar },
  { name: "Gym Buddy", href: "/dashboard/buddy", icon: MessageSquare },
  { name: "Performance", href: "/dashboard/performance", icon: BarChart },
  { name: "Gym Finder", href: "/dashboard/finder", icon: MapPin },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 bg-neutral-950 flex flex-col hidden md:flex">
        <div className="p-6">
          <Link href="/" className="text-2xl font-bold text-green-500 tracking-tighter">
            FITZER AI
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition"
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-neutral-800">
          <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-3 text-neutral-400 hover:text-white transition">
            <User size={20} />
            <span className="font-medium">Profile</span>
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-3 py-3 text-red-400 hover:text-red-300 transition">
            <Shield size={20} />
            <span className="font-medium">Admin</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-neutral-950">
        <header className="h-16 border-b border-neutral-800 flex items-center px-6 md:hidden">
          <span className="text-xl font-bold text-green-500">FITZER AI</span>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
