import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Settings, Droplets, Target, Utensils, ChevronRight, Apple, Beef } from 'lucide-react';

export const Diet = () => {
  const [waterGlasses, setWaterGlasses] = useState(3);
  const totalGlasses = 10; // 10 glasses ~ 3.5L
  
  const macroData = [
    { name: 'Protein', value: 180, color: '#F43F5E' },
    { name: 'Carbs', value: 320, color: '#3B82F6' },
    { name: 'Fats', value: 88, color: '#EAB308' },
  ];

  const meals = [
    {
      type: 'BREAKFAST',
      name: 'Oatmeal & Protein Shake',
      calories: 550,
      protein: 40,
      carbs: 70,
      fats: 15,
      bg: 'bg-pastel-orange',
      img: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=300&q=80'
    },
    {
      type: 'LUNCH',
      name: 'Grilled Chicken & Brown Rice',
      calories: 650,
      protein: 50,
      carbs: 80,
      fats: 20,
      bg: 'bg-pastel-green',
      img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=300&q=80'
    },
    {
      type: 'SNACK',
      name: 'Greek Yogurt & Nuts',
      calories: 300,
      protein: 20,
      carbs: 30,
      fats: 10,
      bg: 'bg-pastel-purple',
      img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=300&q=80'
    },
    {
      type: 'DINNER',
      name: 'Salmon & Sweet Potato',
      calories: 600,
      protein: 50,
      carbs: 60,
      fats: 25,
      bg: 'bg-pastel-pink',
      img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const recommendedPlans = [
    { name: 'Muscle Gain', desc: 'High calorie, high protein', icon: <Beef className="text-red-500"/>, bg: 'bg-red-50' },
    { name: 'Weight Loss', desc: 'Calorie deficit, nutritious meals', icon: <Target className="text-orange-500"/>, bg: 'bg-orange-50' },
    { name: 'Balanced', desc: 'For overall wellness', icon: <Utensils className="text-blue-500"/>, bg: 'bg-blue-50' },
    { name: 'Vegetarian', desc: 'Plant-based nutrition', icon: <Apple className="text-green-500"/>, bg: 'bg-green-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-textMain">Fuel Your Progress</h1>
          <p className="text-lg text-textMuted font-medium">Your personalized nutrition plan for your fitness goal.</p>
        </div>
        <Button variant="outline" className="gap-2 shrink-0">
          <Settings size={18} /> Edit Preferences
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card className="bg-pastel-blue border-none flex flex-col justify-center py-8">
          <p className="text-xs font-bold text-blue-900/60 tracking-wider mb-2">DAILY CALORIES</p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-4xl font-black text-blue-900">2800</h3>
            <span className="text-blue-900/60 font-semibold">kcal/day</span>
          </div>
        </Card>
        <Card className="bg-pastel-pink border-none flex flex-col justify-center py-8">
          <p className="text-xs font-bold text-pink-900/60 tracking-wider mb-2">PROTEIN</p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-4xl font-black text-pink-900">180</h3>
            <span className="text-pink-900/60 font-semibold">g</span>
          </div>
        </Card>
        <Card className="bg-pastel-yellow border-none flex flex-col justify-center py-8">
          <p className="text-xs font-bold text-yellow-900/60 tracking-wider mb-2">CARBS</p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-4xl font-black text-yellow-900">320</h3>
            <span className="text-yellow-900/60 font-semibold">g</span>
          </div>
        </Card>
        <Card className="bg-pastel-orange border-none flex flex-col justify-center py-8">
          <p className="text-xs font-bold text-orange-900/60 tracking-wider mb-2">FATS</p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-4xl font-black text-orange-900">88</h3>
            <span className="text-orange-900/60 font-semibold">g</span>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Today's Nutrition & Hydration */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Today's Nutrition</h3>
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={macroData}
                        innerRadius={45}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {macroData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black">2800</span>
                    <span className="text-[10px] font-bold text-textMuted uppercase">Kcal</span>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-1"><span className="text-rose-500">Protein</span> <span>180g / 220g</span></div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-rose-500 rounded-full w-[80%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-1"><span className="text-blue-500">Carbs</span> <span>320g / 350g</span></div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full w-[90%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-1"><span className="text-yellow-500">Fats</span> <span>88g / 100g</span></div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-yellow-500 rounded-full w-[88%]"></div></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-pastel-blue border-none">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-blue-900">Daily Hydration</h3>
                  <p className="text-sm font-semibold text-blue-900/60 mt-1">Target: 3.5 Liters</p>
                </div>
                <div className="bg-white p-3 rounded-2xl shadow-sm text-blue-500">
                  <Droplets size={24} />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-8">
                {Array.from({ length: totalGlasses }).map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setWaterGlasses(i + 1)}
                    className="transition-transform hover:scale-110 active:scale-95"
                  >
                    {i < waterGlasses ? (
                      <span className="text-2xl drop-shadow-md">💧</span>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-blue-200 m-1 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-100"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs font-bold text-blue-900/60 mt-4 text-center">{waterGlasses * 350}ml / 3500ml</p>
            </Card>
          </div>

          {/* Today's Meals */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Today's Meals</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {meals.map((meal, i) => (
                <Card key={i} hoverEffect className={`p-1 border-none ${meal.bg} overflow-hidden group`}>
                  <div className="flex flex-col h-full bg-white/40 rounded-[20px] p-5">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden shadow-sm">
                        <img src={meal.img} alt={meal.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-textMuted tracking-wider mb-1">{meal.type}</p>
                        <h4 className="font-bold text-textMain leading-snug">{meal.name}</h4>
                        <p className="text-primary font-black mt-1">{meal.calories} kcal</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="bg-white/60 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600">P: {meal.protein}g</span>
                      <span className="bg-white/60 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600">C: {meal.carbs}g</span>
                      <span className="bg-white/60 px-3 py-1.5 rounded-lg text-xs font-bold text-yellow-600">F: {meal.fats}g</span>
                    </div>
                    <Button variant="ghost" className="mt-4 w-full bg-white/50 hover:bg-white text-textMain gap-2 text-sm h-10">
                      View Details <ChevronRight size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Your Goal</h3>
            <div className="bg-pastel-green rounded-2xl p-6 mb-6 text-center border border-green-100">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                <Target size={32} />
              </div>
              <h4 className="text-2xl font-black text-green-900 mb-1">Muscle Gain</h4>
              <p className="text-sm font-semibold text-green-900/60">Gain lean muscle and strength</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-borderLight">
                <span className="text-textMuted font-medium">Target Calories</span>
                <span className="font-bold">2800 kcal</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-borderLight">
                <span className="text-textMuted font-medium">Workout Days</span>
                <span className="font-bold">5 days/week</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-borderLight">
                <span className="text-textMuted font-medium">Diet Type</span>
                <span className="font-bold">Balanced</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-textMuted font-medium">Duration</span>
                <span className="font-bold">12 weeks</span>
              </div>
            </div>
            
            <Button variant="outline" fullWidth className="mt-6">Edit Goal</Button>
          </Card>

          <div>
            <h3 className="text-xl font-bold mb-4">Recommended Plans</h3>
            <div className="space-y-3">
              {recommendedPlans.map((plan, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-borderLight hover:border-primary/30 transition-colors cursor-pointer bg-white group hover:shadow-soft">
                  <div className={`p-3 rounded-xl ${plan.bg}`}>
                    {plan.icon}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-textMain group-hover:text-primary transition-colors">{plan.name}</h5>
                    <p className="text-xs font-medium text-textMuted">{plan.desc}</p>
                  </div>
                  <ChevronRight size={18} className="text-textMuted group-hover:text-primary" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

