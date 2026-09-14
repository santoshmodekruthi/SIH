import Link from "next/link";
import { ArrowRight, Activity, Brain, Users, LineChart } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col font-sans">
      <header className="px-6 py-4 flex justify-between items-center border-b border-neutral-800">
        <div className="text-2xl font-bold text-green-500 tracking-tighter">FITZER AI</div>
        <nav className="flex gap-6">
          <Link href="/login" className="text-neutral-300 hover:text-white transition">Login</Link>
          <Link href="/signup" className="text-green-400 hover:text-green-300 transition">Get Started</Link>
        </nav>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Train Smarter. <span className="text-green-500">Live Stronger.</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-10">
          Your personal AI trainer, dietician, gym buddy, and fitness manager — all in one intelligent ecosystem.
        </p>
        <Link 
          href="/dashboard"
          className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 transition-transform transform hover:scale-105"
        >
          Enter the Dashboard <ArrowRight size={20} />
        </Link>
      </main>

      <section className="py-20 px-6 bg-neutral-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="p-6 bg-neutral-950 rounded-xl border border-neutral-800">
          <Activity className="text-green-500 w-10 h-10 mb-4" />
          <h3 className="text-xl font-bold mb-2">AI Gym Trainer</h3>
          <p className="text-neutral-400">Real-time form feedback and rep counting using advanced computer vision.</p>
        </div>
        <div className="p-6 bg-neutral-950 rounded-xl border border-neutral-800">
          <Brain className="text-green-500 w-10 h-10 mb-4" />
          <h3 className="text-xl font-bold mb-2">AI Dietician</h3>
          <p className="text-neutral-400">Personalized macronutrient guidance and meal recommendations.</p>
        </div>
        <div className="p-6 bg-neutral-950 rounded-xl border border-neutral-800">
          <Users className="text-green-500 w-10 h-10 mb-4" />
          <h3 className="text-xl font-bold mb-2">Virtual Gym Buddy</h3>
          <p className="text-neutral-400">Conversational AI for motivation and fitness advice anytime.</p>
        </div>
        <div className="p-6 bg-neutral-950 rounded-xl border border-neutral-800">
          <LineChart className="text-green-500 w-10 h-10 mb-4" />
          <h3 className="text-xl font-bold mb-2">Performance Analytics</h3>
          <p className="text-neutral-400">Detailed insights into your workout consistency and form score.</p>
        </div>
      </section>

      <footer className="py-6 text-center text-neutral-500 border-t border-neutral-800">
        <p>&copy; {new Date().getFullYear()} FITZER AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
