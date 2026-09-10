export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroup: string;
  difficulty: Difficulty;
  duration: number; // in minutes
  calories: number;
  equipment: string;
  sets: number;
  reps: number;
  rest: number; // in seconds
  videoUrl: string;
  instructions: string[];
}

export const exercises: Exercise[] = [
  { id: 'e1', name: 'Push Ups', category: 'Strength', muscleGroup: 'Chest', difficulty: 'Beginner', duration: 10, calories: 50, equipment: 'None', sets: 3, reps: 15, rest: 45, videoUrl: 'https://cdn.pixabay.com/video/2022/11/20/139726-773413867_tiny.mp4', instructions: ['Start in a plank position.', 'Lower your body until your chest is near the floor.', 'Push back up.'] },
  { id: 'e2', name: 'Squats', category: 'Strength', muscleGroup: 'Legs', difficulty: 'Beginner', duration: 15, calories: 100, equipment: 'None', sets: 4, reps: 20, rest: 60, videoUrl: 'https://cdn.pixabay.com/video/2021/08/11/84687-587930811_tiny.mp4', instructions: ['Stand with feet shoulder-width apart.', 'Lower hips down and back.', 'Return to standing.'] },
  { id: 'e3', name: 'Lunges', category: 'Strength', muscleGroup: 'Legs', difficulty: 'Intermediate', duration: 12, calories: 80, equipment: 'None', sets: 3, reps: 12, rest: 45, videoUrl: 'https://cdn.pixabay.com/video/2021/08/11/84687-587930811_tiny.mp4', instructions: ['Step forward with one leg.', 'Lower your hips until both knees are bent at a 90-degree angle.', 'Push back to the start.'] },
  { id: 'e4', name: 'Plank', category: 'Core', muscleGroup: 'Core', difficulty: 'Beginner', duration: 5, calories: 30, equipment: 'None', sets: 3, reps: 1, rest: 30, videoUrl: 'https://cdn.pixabay.com/video/2022/11/20/139726-773413867_tiny.mp4', instructions: ['Rest on forearms and toes.', 'Keep body in a straight line.', 'Hold the position.'] },
  { id: 'e5', name: 'Jumping Jacks', category: 'Cardio', muscleGroup: 'Full Body', difficulty: 'Beginner', duration: 10, calories: 120, equipment: 'None', sets: 3, reps: 30, rest: 30, videoUrl: 'https://cdn.pixabay.com/video/2019/04/16/22807-331252187_tiny.mp4', instructions: ['Jump up and spread your legs.', 'Bring arms over your head.', 'Return to starting position.'] },
  { id: 'e6', name: 'Burpees', category: 'Cardio', muscleGroup: 'Full Body', difficulty: 'Advanced', duration: 15, calories: 200, equipment: 'None', sets: 4, reps: 15, rest: 60, videoUrl: 'https://cdn.pixabay.com/video/2019/04/16/22807-331252187_tiny.mp4', instructions: ['Drop to a squat.', 'Kick feet back to a plank.', 'Perform a push-up.', 'Jump feet back in and leap up.'] },
  { id: 'e7', name: 'Mountain Climbers', category: 'Cardio', muscleGroup: 'Core', difficulty: 'Intermediate', duration: 10, calories: 150, equipment: 'None', sets: 4, reps: 20, rest: 45, videoUrl: 'https://cdn.pixabay.com/video/2019/04/16/22807-331252187_tiny.mp4', instructions: ['Start in a plank.', 'Bring one knee towards your chest.', 'Quickly alternate legs.'] },
  { id: 'e8', name: 'Bench Press', category: 'Strength', muscleGroup: 'Chest', difficulty: 'Intermediate', duration: 15, calories: 100, equipment: 'Barbell, Bench', sets: 4, reps: 10, rest: 90, videoUrl: 'https://cdn.pixabay.com/video/2022/11/20/139726-773413867_tiny.mp4', instructions: ['Lie on bench.', 'Lower barbell to chest.', 'Press it back up.'] },
  { id: 'e9', name: 'Bicep Curls', category: 'Strength', muscleGroup: 'Arms', difficulty: 'Beginner', duration: 10, calories: 60, equipment: 'Dumbbells', sets: 3, reps: 12, rest: 60, videoUrl: 'https://cdn.pixabay.com/video/2020/05/20/40003-424756586_tiny.mp4', instructions: ['Hold dumbbells at sides.', 'Curl weights up to shoulders.', 'Lower under control.'] },
  { id: 'e10', name: 'Tricep Dips', category: 'Strength', muscleGroup: 'Arms', difficulty: 'Intermediate', duration: 10, calories: 70, equipment: 'Bench/Parallel Bars', sets: 3, reps: 12, rest: 60, videoUrl: 'https://cdn.pixabay.com/video/2020/05/20/40003-424756586_tiny.mp4', instructions: ['Lower your body by bending elbows.', 'Push back up until arms are straight.'] },
  { id: 'e11', name: 'Shoulder Press', category: 'Strength', muscleGroup: 'Shoulders', difficulty: 'Intermediate', duration: 12, calories: 90, equipment: 'Dumbbells', sets: 4, reps: 10, rest: 60, videoUrl: 'https://cdn.pixabay.com/video/2020/05/20/40003-424756586_tiny.mp4', instructions: ['Press dumbbells straight up.', 'Lower to shoulder level.'] },
  { id: 'e12', name: 'Lat Pulldown', category: 'Strength', muscleGroup: 'Back', difficulty: 'Beginner', duration: 12, calories: 85, equipment: 'Cable Machine', sets: 4, reps: 12, rest: 60, videoUrl: 'https://cdn.pixabay.com/video/2020/05/20/40003-424756586_tiny.mp4', instructions: ['Pull bar down to chest.', 'Control the weight back up.'] },
  { id: 'e13', name: 'Deadlift', category: 'Strength', muscleGroup: 'Back', difficulty: 'Advanced', duration: 20, calories: 150, equipment: 'Barbell', sets: 5, reps: 5, rest: 120, videoUrl: 'https://cdn.pixabay.com/video/2021/08/11/84687-587930811_tiny.mp4', instructions: ['Keep back straight.', 'Lift bar by extending hips and knees.', 'Lower with control.'] },
  { id: 'e14', name: 'Leg Press', category: 'Strength', muscleGroup: 'Legs', difficulty: 'Intermediate', duration: 15, calories: 120, equipment: 'Leg Press Machine', sets: 4, reps: 12, rest: 90, videoUrl: 'https://cdn.pixabay.com/video/2021/08/11/84687-587930811_tiny.mp4', instructions: ['Press platform away.', 'Lower until knees are 90 degrees.'] },
  { id: 'e15', name: 'Russian Twists', category: 'Core', muscleGroup: 'Core', difficulty: 'Intermediate', duration: 8, calories: 60, equipment: 'None', sets: 3, reps: 20, rest: 45, videoUrl: 'https://cdn.pixabay.com/video/2022/11/20/139726-773413867_tiny.mp4', instructions: ['Sit back slightly with feet elevated.', 'Twist torso side to side.'] },
  { id: 'e16', name: 'Crunches', category: 'Core', muscleGroup: 'Core', difficulty: 'Beginner', duration: 8, calories: 50, equipment: 'None', sets: 3, reps: 20, rest: 30, videoUrl: 'https://cdn.pixabay.com/video/2022/11/20/139726-773413867_tiny.mp4', instructions: ['Lie on back.', 'Curl shoulders off the floor.', 'Lower slowly.'] },
  { id: 'e17', name: 'Pull Ups', category: 'Strength', muscleGroup: 'Back', difficulty: 'Advanced', duration: 10, calories: 80, equipment: 'Pull Up Bar', sets: 3, reps: 8, rest: 90, videoUrl: 'https://cdn.pixabay.com/video/2020/05/20/40003-424756586_tiny.mp4', instructions: ['Hang from bar.', 'Pull chin over bar.', 'Lower under control.'] },
  { id: 'e18', name: 'Dumbbell Rows', category: 'Strength', muscleGroup: 'Back', difficulty: 'Intermediate', duration: 12, calories: 90, equipment: 'Dumbbells, Bench', sets: 4, reps: 10, rest: 60, videoUrl: 'https://cdn.pixabay.com/video/2020/05/20/40003-424756586_tiny.mp4', instructions: ['Support upper body on bench.', 'Pull dumbbell to hip.', 'Lower fully.'] },
  { id: 'e19', name: 'Leg Raises', category: 'Core', muscleGroup: 'Core', difficulty: 'Intermediate', duration: 8, calories: 55, equipment: 'None', sets: 3, reps: 15, rest: 45, videoUrl: 'https://cdn.pixabay.com/video/2022/11/20/139726-773413867_tiny.mp4', instructions: ['Lie on back.', 'Raise straight legs up to 90 degrees.', 'Lower without touching floor.'] },
  { id: 'e20', name: 'Glute Bridges', category: 'Strength', muscleGroup: 'Legs', difficulty: 'Beginner', duration: 10, calories: 60, equipment: 'None', sets: 3, reps: 15, rest: 45, videoUrl: 'https://cdn.pixabay.com/video/2021/08/11/84687-587930811_tiny.mp4', instructions: ['Lie on back with knees bent.', 'Push hips towards ceiling.', 'Squeeze glutes at top.'] }
];

export interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  image: string;
}

export interface DietPlan {
  id: string;
  goal: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: {
    breakfast: Meal;
    lunch: Meal;
    snack: Meal;
    dinner: Meal;
  }
}

export const mockDietPlan: DietPlan = {
  id: 'd1',
  goal: 'Muscle Gain',
  calories: 2800,
  protein: 180,
  carbs: 320,
  fats: 88,
  meals: {
    breakfast: {
      name: 'Oatmeal & Protein Shake',
      calories: 550,
      protein: 45,
      carbs: 65,
      fats: 12,
      image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=400&q=80'
    },
    lunch: {
      name: 'Grilled Chicken & Sweet Potato',
      calories: 750,
      protein: 55,
      carbs: 85,
      fats: 22,
      image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=400&q=80'
    },
    snack: {
      name: 'Greek Yogurt & Almonds',
      calories: 400,
      protein: 25,
      carbs: 30,
      fats: 20,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80'
    },
    dinner: {
      name: 'Salmon & Quinoa',
      calories: 850,
      protein: 50,
      carbs: 90,
      fats: 32,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80'
    }
  }
};

export const weeklyActivityData = [
  { day: 'Mon', workouts: 1, duration: 45, calories: 420 },
  { day: 'Tue', workouts: 1, duration: 60, calories: 550 },
  { day: 'Wed', workouts: 0, duration: 0, calories: 0 },
  { day: 'Thu', workouts: 1, duration: 50, calories: 480 },
  { day: 'Fri', workouts: 1, duration: 40, calories: 390 },
  { day: 'Sat', workouts: 2, duration: 90, calories: 850 },
  { day: 'Sun', workouts: 0, duration: 0, calories: 0 },
];

export const dashboardData = { weeklyStats: [ { day: 'Mon', calories: 450 }, { day: 'Tue', calories: 520 }, { day: 'Wed', calories: 380 }, { day: 'Thu', calories: 610 }, { day: 'Fri', calories: 590 }, { day: 'Sat', calories: 800 }, { day: 'Sun', calories: 720 } ] };
