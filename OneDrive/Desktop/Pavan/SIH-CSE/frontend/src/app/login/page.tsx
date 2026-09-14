"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Activity } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || "Failed to login");
      }

      localStorage.setItem("token", data.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
        <div className="flex justify-center mb-6">
          <Activity className="text-green-500 w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-neutral-400 text-center mb-8">Sign in to your FITZER AI account</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
              placeholder="athlete@fitzer.ai"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </form>

        <p className="text-center text-sm text-neutral-400 mt-6">
          Don't have an account? <Link href="/signup" className="text-green-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
