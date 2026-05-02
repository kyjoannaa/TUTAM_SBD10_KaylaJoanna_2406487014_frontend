"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://tutam-sbd-10-kayla-joanna-240648701.vercel.app/api/login", { username, password });
      localStorage.setItem("user", JSON.stringify(response.data));
      router.push("/");
      router.refresh(); 
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Username atau password salah");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-md border border-[#e5e0d8]">
      <h2 className="text-3xl font-bold mb-6 text-[#382110] text-center">Welcome Back</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label className="block text-[#5a4634] text-sm font-semibold mb-1">Username</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#f9f8f4] border border-[#d8d3c4] rounded-md px-4 py-2 text-[#382110] outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
            required
          />
        </div>
        <div>
          <label className="block text-[#5a4634] text-sm font-semibold mb-1">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#f9f8f4] border border-[#d8d3c4] rounded-md px-4 py-2 text-[#382110] outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-[#FF6B35] hover:bg-[#e55b2b] text-white font-bold py-3 rounded-md transition shadow-sm">
          Sign In
        </button>
      </form>
      <p className="mt-6 text-center text-[#5a4634] text-sm">
        Don't have an account yet? <Link href="/register" className="text-[#FF6B35] font-bold hover:underline">Join here</Link>
      </p>
    </div>
  );
}