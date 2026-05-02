"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Password dan Confirm Password tidak cocok!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/register", { email, username, password });
      alert("Registrasi berhasil! Silakan login.");
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat registrasi");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-md border border-[#e5e0d8]">
      <h2 className="text-3xl font-bold mb-6 text-[#382110] text-center">Join GoodWatches</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <div>
          <label className="block text-[#5a4634] text-sm font-semibold mb-1">Email</label>
          <input 
            type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full bg-[#f9f8f4] border border-[#d8d3c4] rounded-md px-4 py-2 text-[#382110] outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
          />
        </div>
        <div>
          <label className="block text-[#5a4634] text-sm font-semibold mb-1">Username</label>
          <input 
            type="text" value={username} onChange={(e) => setUsername(e.target.value)} required
            className="w-full bg-[#f9f8f4] border border-[#d8d3c4] rounded-md px-4 py-2 text-[#382110] outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
          />
        </div>
        <div>
          <label className="block text-[#5a4634] text-sm font-semibold mb-1">Password</label>
          <input 
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full bg-[#f9f8f4] border border-[#d8d3c4] rounded-md px-4 py-2 text-[#382110] outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
          />
        </div>
        <div>
          <label className="block text-[#5a4634] text-sm font-semibold mb-1">Confirm Password</label>
          <input 
            type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
            className="w-full bg-[#f9f8f4] border border-[#d8d3c4] rounded-md px-4 py-2 text-[#382110] outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
          />
        </div>
        <button type="submit" className="mt-4 bg-[#FF6B35] hover:bg-[#e55b2b] text-white font-bold py-3 rounded-md transition shadow-sm">
          Sign Up
        </button>
      </form>
      <p className="mt-6 text-center text-[#5a4634] text-sm">
        Already a member? <Link href="/login" className="text-[#FF6B35] font-bold hover:underline">Sign In</Link>
      </p>
    </div>
  );
}