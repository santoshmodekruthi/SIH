import { create } from 'zustand';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  // Workout
  activeWorkoutId: string | null;
  startWorkout: (id: string) => void;
  endWorkout: () => void;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  streak: number;
  goal: string;
}

export const useStore = create<AppState>((set) => ({
  user: {
    id: '1',
    name: 'Alex',
    streak: 12,
    goal: 'Build Muscle',
    avatar: 'https://ui-avatars.com/api/?name=Alex&background=bdf522&color=0a0a0a'
  },
  isAuthenticated: true, // Auto login for demo
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  activeWorkoutId: null,
  startWorkout: (id) => set({ activeWorkoutId: id }),
  endWorkout: () => set({ activeWorkoutId: null }),
}));
