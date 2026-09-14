"use client";

import { useState, useEffect } from "react";
import { Apple, Scale, Activity, ListChecks, Plus, Utensils, MessageSquare } from "lucide-react";

export default function Dietician() {
  const [activeTab, setActiveTab] = useState<"overview" | "log" | "chatbot">("overview");
  const [profile, setProfile] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [meals, setMeals] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // For Food Log
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");

  const fetchProfileAndMeals = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const res = await fetch("http://localhost:8000/api/nutrition/profile", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setProfile(data.profile);
      setMetrics(data.metrics);
      
      const mealRes = await fetch("http://localhost:8000/api/nutrition/recommend_meals", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const mealData = await mealRes.json();
      setMeals(mealData.meals);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileAndMeals();
  }, []);

  const handleLogFood = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch("http://localhost:8000/api/nutrition/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        date: new Date().toISOString().split('T')[0],
        food_name: foodName,
        calories: parseFloat(calories),
        protein: parseFloat(protein),
        carbs: 0,
        fats: 0
      })
    });
    setFoodName("");
    setCalories("");
    setProtein("");
    alert("Food logged successfully!");
  };

  if (loading) {
    return <div className="p-8 text-center text-neutral-400">Loading diet profile...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Dietician</h1>
          <p className="text-neutral-400 mt-1">Your personalized nutrition and calorie coach.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-neutral-900 p-1 rounded-xl w-max border border-neutral-800">
        <button 
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "overview" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"}`}
        >
          Overview & Meals
        </button>
        <button 
          onClick={() => setActiveTab("log")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "log" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"}`}
        >
          Log Food
        </button>
        <button 
          onClick={() => setActiveTab("chatbot")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "chatbot" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"}`}
        >
          AI Nutritionist
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Metrics */}
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Scale size={18} /> Daily Targets</h3>
              {metrics ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                    <span className="text-neutral-400 text-sm">Target Calories</span>
                    <span className="font-bold text-lg text-green-500">{metrics.target_calories} kcal</span>
                  </div>
                  <div className="flex justify-between items-center bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                    <span className="text-neutral-400 text-sm">Base Metabolic Rate (BMR)</span>
                    <span className="font-bold">{metrics.bmr} kcal</span>
                  </div>
                  <div className="text-sm text-neutral-500 text-center mt-2">
                    Based on Mifflin-St Jeor equation
                  </div>
                </div>
              ) : (
                <p className="text-sm text-neutral-400">Please update your profile to see targets.</p>
              )}
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Activity size={18} /> Macro Split</h3>
              <div className="flex h-32 items-end justify-between px-2">
                <div className="w-1/3 flex flex-col items-center gap-2">
                  <div className="w-full bg-blue-500 rounded-t-sm" style={{ height: "40%" }}></div>
                  <div className="text-xs text-neutral-400">Carbs<br/>40%</div>
                </div>
                <div className="w-1/3 flex flex-col items-center gap-2">
                  <div className="w-full bg-green-500 rounded-t-sm" style={{ height: "30%" }}></div>
                  <div className="text-xs text-neutral-400">Protein<br/>30%</div>
                </div>
                <div className="w-1/3 flex flex-col items-center gap-2">
                  <div className="w-full bg-orange-500 rounded-t-sm" style={{ height: "30%" }}></div>
                  <div className="text-xs text-neutral-400">Fats<br/>30%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Recommended Meals */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Utensils size={18} /> AI Meal Recommendations</h3>
                <span className="px-2 py-1 text-xs bg-neutral-800 border border-neutral-700 rounded-md text-neutral-400">Demo Mode / Fallback</span>
              </div>
              
              {meals ? (
                <div className="space-y-4">
                  {Object.entries(meals).map(([mealType, desc]) => (
                    <div key={mealType} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                      <h4 className="text-sm font-semibold text-green-500 uppercase tracking-wider mb-1">{mealType}</h4>
                      <p className="text-neutral-300">{desc as React.ReactNode}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-400">Generating meals...</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "log" && (
        <div className="max-w-xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mt-10">
          <h2 className="text-2xl font-bold mb-2">Log Food</h2>
          <p className="text-neutral-400 mb-6">Track your calories and macros for today.</p>
          <form onSubmit={handleLogFood} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Food Item Name</label>
              <input 
                required type="text" value={foodName} onChange={e => setFoodName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none"
                placeholder="e.g. Chicken Breast"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Calories</label>
                <input 
                  required type="number" value={calories} onChange={e => setCalories(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Protein (g)</label>
                <input 
                  required type="number" value={protein} onChange={e => setProtein(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none"
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-3 rounded-lg mt-4 flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add to Log
            </button>
          </form>
        </div>
      )}

      {activeTab === "chatbot" && (
        <div className="max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden h-[600px] flex flex-col mt-4">
          <div className="p-4 border-b border-neutral-800 bg-neutral-950 flex items-center gap-3">
            <MessageSquare className="text-green-500" />
            <h3 className="font-semibold">Dietician Assistant</h3>
            <span className="ml-auto px-2 py-1 text-xs bg-neutral-800 border border-neutral-700 rounded-md text-neutral-400">Demo Mode</span>
          </div>
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center flex-shrink-0 text-green-500"><Apple size={16}/></div>
              <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl rounded-tl-none">
                <p className="text-neutral-200">Hi there! I'm your AI Nutritionist. What did you eat today, or what meal advice do you need?</p>
              </div>
            </div>
            <div className="flex gap-4 flex-row-reverse">
              <div className="bg-green-900 text-green-100 p-4 rounded-xl rounded-tr-none">
                <p>Is eating 4 eggs a day safe for my cholesterol?</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center flex-shrink-0 text-green-500"><Apple size={16}/></div>
              <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl rounded-tl-none">
                <p className="text-neutral-200">For most healthy individuals, 4 eggs a day is perfectly fine and provides excellent protein! However, if you have a history of high cholesterol, you might want to balance it with other protein sources. *(This is a demo response)*</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex gap-2">
            <input 
              type="text" 
              className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none"
              placeholder="Ask a nutrition question..."
              disabled
            />
            <button className="bg-green-600 text-white px-4 rounded-lg opacity-50 cursor-not-allowed">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
