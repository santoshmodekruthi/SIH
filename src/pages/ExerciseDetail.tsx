import { useParams, Link } from 'react-router-dom';
import { exercises } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Dumbbell, Activity, Clock, Flame, AlertCircle } from 'lucide-react';

export const ExerciseDetail = () => {
  const { id } = useParams();
  // using first exercise if not found for mock purposes
  const exercise = exercises.find(e => e.id === id) || exercises[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Link to="/exercises" className="inline-flex items-center text-textMuted hover:text-primary transition-colors font-medium">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to exercises
      </Link>

      {/* Video Header */}
      <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-slate-100 border border-borderLight shadow-sm">
        <video 
          src={exercise.videoUrl} 
          className="w-full h-full object-cover mix-blend-multiply opacity-90"
          controls
          autoPlay
          muted
          loop
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-4xl font-extrabold mb-4 text-textMain">{exercise.name}</h1>
        </div>
        
        <Link to="/workout/start">
          <Button size="lg" className="w-full md:w-auto shadow-lg shadow-primary/30">
            Start Exercise
          </Button>
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { icon: <Activity />, label: 'SETS & REPS', value: `${exercise.sets} × ${exercise.reps}` },
          { icon: <Clock />, label: 'REST', value: `${exercise.rest}s` },
          { icon: <Flame />, label: 'CALORIES', value: `${exercise.calories} kcal` },
          { icon: <Clock />, label: 'DURATION', value: `${exercise.duration} min` },
          { icon: <Dumbbell />, label: 'EQUIPMENT', value: exercise.equipment },
          { icon: <Activity />, label: 'INTENSITY', value: exercise.difficulty },
        ].map((metric, i) => (
          <div key={i} className="bg-white border border-borderLight p-4 rounded-2xl flex flex-col items-center text-center shadow-sm">
            <div className="text-primary mb-2 bg-pastel-green p-2 rounded-lg">{metric.icon}</div>
            <p className="text-[10px] text-textMuted font-bold tracking-widest uppercase mb-1">{metric.label}</p>
            <p className="text-lg font-black text-textMain leading-tight">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8 pt-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-textMain">How to Perform</h2>
          <div className="space-y-4">
            {exercise.instructions.map((inst, idx) => (
              <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white border border-borderLight shadow-sm hover:shadow-soft transition-all">
                <span className="text-4xl font-black text-slate-200">0{idx + 1}</span>
                <p className="text-lg text-textMuted font-medium pt-2 leading-relaxed">{inst}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-textMain">Common Mistakes</h2>
            <div className="bg-pastel-pink border border-red-100 p-6 rounded-2xl space-y-4">
              <div className="flex gap-3 text-red-600">
                <AlertCircle className="w-6 h-6 shrink-0" />
                <p className="text-sm font-medium leading-relaxed">Avoid arching your lower back excessively during the movement.</p>
              </div>
              <div className="flex gap-3 text-red-600">
                <AlertCircle className="w-6 h-6 shrink-0" />
                <p className="text-sm font-medium leading-relaxed">Don't sacrifice form to lift heavier weight. Focus on the muscle contraction.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-textMain">Safety Tips</h2>
            <div className="bg-pastel-blue border border-blue-100 p-6 rounded-2xl space-y-4">
              <div className="flex gap-3 text-blue-600">
                <Activity className="w-6 h-6 shrink-0" />
                <p className="text-sm font-medium leading-relaxed">Always warm up with light cardio before performing heavy exercises.</p>
              </div>
              <div className="flex gap-3 text-blue-600">
                <Activity className="w-6 h-6 shrink-0" />
                <p className="text-sm font-medium leading-relaxed">If you feel sharp pain, stop immediately and assess your form.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


