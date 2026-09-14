"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";

export default function Profile() {
  const [formData, setFormData] = useState({
    age: "", height: "", weight: "", gender: "male", activity_level: "moderate", diet_preference: "balanced", goal: "maintain"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("http://localhost:8000/api/nutrition/profile", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.profile) {
        setFormData({
          age: data.profile.age || "",
          height: data.profile.height || "",
          weight: data.profile.weight || "",
          gender: data.profile.gender || "male",
          activity_level: data.profile.activity_level || "moderate",
          diet_preference: data.profile.diet_preference || "balanced",
          goal: data.profile.goal || "maintain",
        });
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    await fetch("http://localhost:8000/api/nutrition/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        age: parseInt(formData.age),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        gender: formData.gender,
        activity_level: formData.activity_level,
        diet_preference: formData.diet_preference,
        goal: formData.goal
      })
    });
    setLoading(false);
    alert("Profile updated!");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-neutral-800">
          <div className="w-16 h-16 bg-green-900 text-green-500 rounded-full flex items-center justify-center"><User size={32}/></div>
          <div>
            <h2 className="text-xl font-bold">Physical Attributes</h2>
            <p className="text-sm text-neutral-400">Used for AI calorie and fitness recommendations.</p>
          </div>
        </div>
        
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Age</label>
              <input type="number" required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Gender</label>
              <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Height (cm)</label>
              <input type="number" required value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Weight (kg)</label>
              <input type="number" required value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2" />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm text-neutral-400 mb-1">Activity Level</label>
              <select value={formData.activity_level} onChange={e => setFormData({...formData, activity_level: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2">
                <option value="sedentary">Sedentary (little to no exercise)</option>
                <option value="light">Lightly active (light exercise 1-3 days/week)</option>
                <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
                <option value="active">Active (hard exercise 6-7 days/week)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-neutral-400 mb-1">Goal</label>
              <select value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2">
                <option value="maintain">Maintain Weight</option>
                <option value="cut">Lose Weight (Cut)</option>
                <option value="bulk">Gain Muscle (Bulk)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Diet Preference</label>
              <select value={formData.diet_preference} onChange={e => setFormData({...formData, diet_preference: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2">
                <option value="balanced">Balanced</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-3 rounded-lg mt-6">
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
