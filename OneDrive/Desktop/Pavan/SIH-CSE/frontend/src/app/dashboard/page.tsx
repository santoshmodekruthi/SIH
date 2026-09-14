"use client";

import { Activity, Flame, Target, Trophy, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [greeting, setGreeting] = useState("Welcome back");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{greeting}, Athlete!</h1>
          <p className="text-neutral-400 mt-1">Let's crush your fitness goals today.</p>
        </div>
        <div className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center gap-3">
          <Flame className="text-orange-500" size={24} />
          <div>
            <div className="text-sm text-neutral-400">Workout Streak</div>
            <div className="font-bold text-lg">5 Days</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Today's Plan */}
        <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Target className="text-green-500" /> Today's Plan
            </h2>
            <Link href="/dashboard/trainer" className="text-sm text-green-500 hover:underline">
              Start Workout &rarr;
            </Link>
          </div>
          
          <div className="bg-neutral-950 rounded-xl p-5 border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">Upper Body Power</div>
              <div className="text-sm text-neutral-400 mt-1 flex items-center gap-4">
                <span className="flex items-center gap-1"><Clock size={16}/> 45 mins</span>
                <span className="flex items-center gap-1"><Activity size={16}/> High Intensity</span>
              </div>
            </div>
            <Link 
              href="/dashboard/trainer" 
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              Start
            </Link>
          </div>
        </div>

        {/* Nutrition Summary */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Nutrition</h2>
            <Link href="/dashboard/dietician" className="text-sm text-green-500 hover:underline">
              Log &rarr;
            </Link>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-400">Calories</span>
                <span className="font-medium">1,250 / 2,400 kcal</span>
              </div>
              <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: "52%" }}></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                <div className="text-neutral-400 text-xs mb-1">Protein</div>
                <div className="font-medium">85g</div>
              </div>
              <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                <div className="text-neutral-400 text-xs mb-1">Carbs</div>
                <div className="font-medium">120g</div>
              </div>
              <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                <div className="text-neutral-400 text-xs mb-1">Fats</div>
                <div className="font-medium">40g</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="md:col-span-3 bg-gradient-to-r from-neutral-900 to-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="text-green-500" /> AI Insights & Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 border-l-4 border-l-green-500">
              <h3 className="font-semibold text-white mb-2">Form Alert</h3>
              <p className="text-sm text-neutral-400">
                Your last squat session showed a 15% decrease in depth. Focus on range of motion today.
              </p>
            </div>
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 border-l-4 border-l-blue-500">
              <h3 className="font-semibold text-white mb-2">Recovery Need</h3>
              <p className="text-sm text-neutral-400">
                You've trained 5 days in a row. Consider a light stretching or yoga session tomorrow.
              </p>
            </div>
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 border-l-4 border-l-orange-500">
              <h3 className="font-semibold text-white mb-2">Macro Goal</h3>
              <p className="text-sm text-neutral-400">
                You are 65g short of your protein goal. A protein shake post-workout will help!
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
