import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Exercises } from './pages/Exercises';
import { Diet } from './pages/Diet';
import { AICoach } from './pages/AICoach';
import { Onboarding } from './pages/Auth/Onboarding';
import { ExerciseDetail } from './pages/ExerciseDetail';
import { Profile } from './pages/Profile';
import { WorkoutMode } from './pages/WorkoutMode';
import { Fitness } from './pages/Fitness';
import { FitnessAssessment } from './pages/FitnessAssessment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Auth / Onboarding */}
        <Route path="/auth/onboarding" element={<Onboarding />} />

        {/* Workout Mode (Fullscreen) */}
        <Route path="/workout/start" element={<WorkoutMode />} />

        {/* Protected Routes inside AppLayout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercises/:id" element={<ExerciseDetail />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/assessment" element={<FitnessAssessment />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/coach" element={<AICoach />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
