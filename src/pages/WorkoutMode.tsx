import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Pause, Play, Check, Flame } from 'lucide-react';
import { exercises } from '../data/mockData';
import { Button } from '../components/ui/Button';

export const WorkoutMode = () => {
  const navigate = useNavigate();
  const workout = exercises[0];

  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workout.rest);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;

    if (isResting && !isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    }

    if (isResting && timeLeft === 0) {
      setIsResting(false);
      setCurrentSet((set) => set + 1);
      setTimeLeft(workout.rest);
      setIsPaused(false);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isResting, isPaused, timeLeft, workout.rest]);

  const handleCompleteSet = () => {
    if (currentSet >= workout.sets) {
      setIsComplete(true);
    } else {
      setIsResting(true);
      setIsPaused(false);
    }
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setCurrentSet((set) => set + 1);
    setTimeLeft(workout.rest);
    setIsPaused(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Flame className="w-12 h-12 text-primary" />
          </div>

          <h1 className="text-4xl font-bold">
            WORKOUT COMPLETE 🎉
          </h1>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface p-4 rounded-xl border border-surfaceHover">
              <p className="text-muted text-sm mb-1">Duration</p>
              <p className="text-xl font-bold">
                {workout.duration} min
              </p>
            </div>

            <div className="bg-surface p-4 rounded-xl border border-surfaceHover">
              <p className="text-muted text-sm mb-1">Calories</p>
              <p className="text-xl font-bold">
                {workout.calories} kcal
              </p>
            </div>
          </div>

          <Button
            size="lg"
            fullWidth
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between p-6 absolute top-0 w-full z-50 bg-gradient-to-b from-background to-transparent">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-surface/80 hover:bg-surface border border-surfaceHover backdrop-blur transition-colors"
          aria-label="Go back"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex gap-2">
          {Array.from({ length: workout.sets }).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-colors ${
                index + 1 < currentSet
                  ? 'bg-primary'
                  : index + 1 === currentSet
                    ? 'bg-primary/50'
                    : 'bg-surfaceHover'
              }`}
            />
          ))}
        </div>

        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row relative">
        <div className="lg:w-1/2 h-[50vh] lg:h-screen relative bg-surface">
          <video
            src={workout.videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent lg:bg-gradient-to-r" />
        </div>

        <div className="flex-1 flex flex-col justify-center p-8 lg:p-16 z-10 -mt-20 lg:mt-0">
          <AnimatePresence mode="wait">
            {!isResting ? (
              <motion.div
                key="exercise"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 max-w-md mx-auto w-full"
              >
                <div>
                  <p className="text-primary font-bold tracking-wider mb-2 uppercase text-sm">
                    Set {currentSet} / {workout.sets}
                  </p>

                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {workout.name}
                  </h2>

                  <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-muted">
                    {workout.reps}{' '}
                    <span className="text-3xl text-muted">
                      REPS
                    </span>
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-muted">
                    Instructions:
                  </h3>

                  <ul className="space-y-2">
                    {workout.instructions.map((instruction, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm text-gray-300"
                      >
                        <span className="text-primary font-bold">
                          {index + 1}.
                        </span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  size="lg"
                  fullWidth
                  className="h-16 text-xl mt-8"
                  onClick={handleCompleteSet}
                >
                  <Check className="mr-2 h-6 w-6" />
                  Complete Set
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="rest"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center space-y-8 max-w-md mx-auto w-full"
              >
                <p className="text-primary font-bold tracking-wider uppercase text-xl">
                  Rest
                </p>

                <div className="text-[120px] font-black leading-none tracking-tighter tabular-nums">
                  {formatTime(timeLeft)}
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsPaused((paused) => !paused)}
                    className="w-16 h-16 rounded-full p-0 flex items-center justify-center"
                    aria-label={isPaused ? 'Resume timer' : 'Pause timer'}
                  >
                    {isPaused ? (
                      <Play className="h-8 w-8 ml-1" />
                    ) : (
                      <Pause className="h-8 w-8" />
                    )}
                  </Button>

                  <Button
                    size="lg"
                    onClick={handleSkipRest}
                  >
                    Skip Rest
                  </Button>
                </div>

                <div className="pt-8 border-t border-surfaceHover">
                  <p className="text-muted mb-2">
                    Up Next
                  </p>

                  <p className="font-semibold text-lg">
                    {workout.name} (Set {currentSet + 1})
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};