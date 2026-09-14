import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock } from 'lucide-react';
import { exercises } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export const Exercises = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [muscleFilter, setMuscleFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [equipmentFilter, setEquipmentFilter] = useState('All');

  const muscles = ['All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Full Body'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const equipments = ['All', 'None', 'Dumbbells', 'Barbell', 'Cable Machine', 'Bench/Parallel Bars', 'Pull Up Bar'];

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscle = muscleFilter === 'All' || ex.muscleGroup === muscleFilter;
    const matchesDiff = difficultyFilter === 'All' || ex.difficulty === difficultyFilter;
    const matchesEquip = equipmentFilter === 'All' || ex.equipment.includes(equipmentFilter);
    return matchesSearch && matchesMuscle && matchesDiff && matchesEquip;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-textMain">Explore Exercises</h1>
          <p className="text-textMuted font-medium">Find the perfect exercises for your fitness goals.</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted h-5 w-5" />
          <input 
            type="text" 
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-borderLight rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-textMain placeholder:text-textMuted shadow-sm"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <select 
            value={muscleFilter} onChange={(e) => setMuscleFilter(e.target.value)}
            className="bg-white border border-borderLight rounded-xl px-4 py-2.5 text-sm font-semibold text-textMain focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none shadow-sm cursor-pointer hover:bg-slate-50 transition-colors"
          >
            {muscles.map(m => <option key={m} value={m}>{m === 'All' ? 'All Muscles' : m}</option>)}
          </select>
          <select 
            value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-white border border-borderLight rounded-xl px-4 py-2.5 text-sm font-semibold text-textMain focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none shadow-sm cursor-pointer hover:bg-slate-50 transition-colors"
          >
            {difficulties.map(d => <option key={d} value={d}>{d === 'All' ? 'All Difficulties' : d}</option>)}
          </select>
          <select 
            value={equipmentFilter} onChange={(e) => setEquipmentFilter(e.target.value)}
            className="bg-white border border-borderLight rounded-xl px-4 py-2.5 text-sm font-semibold text-textMain focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none shadow-sm cursor-pointer hover:bg-slate-50 transition-colors"
          >
            {equipments.map(e => <option key={e} value={e}>{e === 'All' ? 'All Equipment' : e}</option>)}
          </select>
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredExercises.map(exercise => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card hoverEffect className="h-full flex flex-col overflow-hidden group">
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                {exercise.videoUrl ? (
                  <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80" alt={exercise.name} className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-textMuted">
                    No preview
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-textMain shadow-sm">
                  <Clock size={12} /> {exercise.duration}m
                </div>
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm">
                  {exercise.muscleGroup}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg leading-tight text-textMain">{exercise.name}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs font-semibold px-2 py-1 rounded-md bg-pastel-blue text-blue-700">
                    {exercise.difficulty}
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 rounded-md bg-slate-100 text-textMuted">
                    {exercise.equipment}
                  </span>
                </div>

                <div className="mt-auto">
                  <Link to={`/exercises/${exercise.id}`}>
                    <Button variant="outline" fullWidth className="group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                      View Exercise
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
// forced reload


