"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Activity, Play, Square, AlertCircle, AlertTriangle } from "lucide-react";
import Script from "next/script";

export default function GymTrainer() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [exercise, setExercise] = useState("squats");
  const [isLive, setIsLive] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  
  // Workout State
  const [reps, setReps] = useState(0);
  const [phase, setPhase] = useState("eccentric");
  const [feedback, setFeedback] = useState("Ready to start.");
  const [formStatus, setFormStatus] = useState<"good" | "warning">("good");
  const [timer, setTimer] = useState(0);

  const calculateAngle = (a: any, b: any, c: any) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) angle = 360 - angle;
    return angle;
  };

  const startWorkout = () => {
    if (!scriptsLoaded) {
      alert("Please wait for AI models to load...");
      return;
    }
    setIsLive(true);
    setReps(0);
    setTimer(0);
    setFeedback("Position yourself in frame.");
  };

  const endWorkout = async () => {
    setIsLive(false);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch("http://localhost:8000/api/workouts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            exercise_type: exercise,
            rep_count: reps,
            performance_score: formStatus === "good" ? 95 : 75,
            duration_seconds: timer
          })
        });
        setFeedback("Workout saved to history!");
      } catch(e) {
        setFeedback("Demo Mode: Failed to save to history.");
      }
    }
  };

  useEffect(() => {
    let interval: any;
    if (isLive) interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isLive]);

  useEffect(() => {
    if (typeof window !== "undefined" && isLive && webcamRef.current?.video && window.Pose) {
      const pose = new window.Pose({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults((results: any) => {
        if (!canvasRef.current || !webcamRef.current?.video) return;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
        
        const canvasCtx = canvasRef.current.getContext("2d");
        if (canvasCtx) {
          canvasCtx.save();
          canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
          
          if (results.poseLandmarks) {
            const landmarks = results.poseLandmarks;
            const POSE_CONNECTIONS = window.POSE_CONNECTIONS || [];
            
            canvasCtx.strokeStyle = '#22c55e';
            canvasCtx.lineWidth = 4;
            POSE_CONNECTIONS.forEach(([startIdx, endIdx]: any) => {
              const start = landmarks[startIdx];
              const end = landmarks[endIdx];
              if (start && end && start.visibility > 0.5 && end.visibility > 0.5) {
                canvasCtx.beginPath();
                canvasCtx.moveTo(start.x * videoWidth, start.y * videoHeight);
                canvasCtx.lineTo(end.x * videoWidth, end.y * videoHeight);
                canvasCtx.stroke();
              }
            });

            canvasCtx.fillStyle = '#ffffff';
            landmarks.forEach((landmark: any) => {
              if (landmark.visibility > 0.5) {
                canvasCtx.beginPath();
                canvasCtx.arc(landmark.x * videoWidth, landmark.y * videoHeight, 3, 0, 2 * Math.PI);
                canvasCtx.fill();
              }
            });
            
            if (exercise === "squats") {
              const hip = landmarks[23];
              const knee = landmarks[25];
              const ankle = landmarks[27];
              if(hip && knee && ankle) {
                const angle = calculateAngle(hip, knee, ankle);
                if (angle > 160) {
                  if (phase === "eccentric") {
                    setPhase("concentric");
                    setReps(r => r + 1);
                    setFeedback("Good rep!");
                    setFormStatus("good");
                  }
                }
                if (angle < 90) setPhase("eccentric");
                if (angle < 120 && angle >= 90) {
                  setFeedback("Go lower!");
                  setFormStatus("warning");
                }
              }
            } else if (exercise === "bicep_curls") {
              const shoulder = landmarks[11];
              const elbow = landmarks[13];
              const wrist = landmarks[15];
              if(shoulder && elbow && wrist) {
                const angle = calculateAngle(shoulder, elbow, wrist);
                if (angle > 160) {
                  if (phase === "eccentric") {
                    setPhase("concentric");
                    setReps(r => r + 1);
                    setFeedback("Good rep!");
                    setFormStatus("good");
                  }
                }
                if (angle < 45) setPhase("eccentric");
              }
            }
          }
          canvasCtx.restore();
        }
      });

      let animationFrameId: number;
      const sendFrame = async () => {
        if (webcamRef.current?.video && webcamRef.current.video.readyState >= 2) {
          await pose.send({ image: webcamRef.current.video });
        }
        animationFrameId = requestAnimationFrame(sendFrame);
      };
      sendFrame();

      return () => {
        cancelAnimationFrame(animationFrameId);
        pose.close();
      };
    }
  }, [isLive, exercise, phase]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="space-y-6">
      <Script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js" onLoad={() => setScriptsLoaded(true)} />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Gym Trainer</h1>
          <p className="text-neutral-400 mt-1">Live pose estimation and form correction.</p>
        </div>
        <div className="px-3 py-1 bg-green-900/30 text-green-500 border border-green-500/20 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Live AI Mode
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden relative min-h-[480px] flex items-center justify-center">
          {!isLive ? (
            <div className="text-center p-8">
              <Activity className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Camera Inactive</h2>
              <p className="text-neutral-400 mb-6">Select an exercise and click Start Workout to activate MediaPipe Pose detection.</p>
              <button 
                onClick={startWorkout}
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-medium inline-flex items-center gap-2 transition"
              >
                <Play size={18} /> {scriptsLoaded ? "Start Workout" : "Loading AI..."}
              </button>
            </div>
          ) : (
            <>
              <Webcam ref={webcamRef} className="absolute w-full h-full object-cover" mirrored />
              <canvas ref={canvasRef} className="absolute w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur border border-neutral-700 p-3 rounded-lg flex items-center gap-4">
                <div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">Exercise</div>
                  <div className="font-bold text-lg capitalize">{exercise.replace('_', ' ')}</div>
                </div>
                <div className="w-px h-8 bg-neutral-700"></div>
                <div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">Time</div>
                  <div className="font-bold text-lg font-mono">{formatTime(timer)}</div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-4">Workout Controls</h3>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Select Exercise</label>
            <select 
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              disabled={isLive}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none mb-6"
            >
              <option value="squats">Squats</option>
              <option value="push_ups">Push-ups</option>
              <option value="bicep_curls">Bicep Curls</option>
            </select>
            {isLive && (
              <button 
                onClick={endWorkout}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <Square size={18} /> End Workout
              </button>
            )}
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-4">Live Metrics</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl text-center">
                <div className="text-sm text-neutral-400 mb-1 uppercase tracking-wider">Reps</div>
                <div className="text-4xl font-bold text-green-500">{reps}</div>
              </div>
              <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl text-center">
                <div className="text-sm text-neutral-400 mb-1 uppercase tracking-wider">Phase</div>
                <div className="text-lg font-bold capitalize mt-2">{phase}</div>
              </div>
            </div>
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${formStatus === "good" ? "bg-green-900/20 border-green-500/30 text-green-400" : "bg-orange-900/20 border-orange-500/30 text-orange-400"}`}>
              {formStatus === "good" ? <Activity size={20} className="mt-0.5" /> : <AlertTriangle size={20} className="mt-0.5" />}
              <div>
                <div className="font-semibold text-sm mb-1 uppercase tracking-wider">Form Feedback</div>
                <div>{feedback}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
