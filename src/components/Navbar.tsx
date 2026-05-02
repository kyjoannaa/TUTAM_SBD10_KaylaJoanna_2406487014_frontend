"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-[#e5e0d8] shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-black tracking-tight text-[#FF6B35] hover:text-[#e55b2b] transition">
            GoodWatches.
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link href="/mylist" className="text-[#5a4634] hover:text-[#FF6B35] font-bold transition">
                My List
              </Link>
              <Link href="/watched" className="text-[#5a4634] hover:text-[#FF6B35] font-bold transition">
                My Ratings
              </Link>
              <div className="border-l border-[#d8d3c4] h-6 mx-2"></div>
              <span className="text-[#8c7a6b] text-sm font-medium">Hi, {user.username}</span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-bold bg-[#f4f1ea] text-[#382110] border border-[#d8d3c4] rounded-md hover:bg-[#e5e0d8] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-[#5a4634] hover:text-[#FF6B35] font-bold transition">
                Sign In
              </Link>
              <Link href="/register" className="px-5 py-2 bg-[#FF6B35] hover:bg-[#e55b2b] text-white font-bold rounded-md transition shadow-sm">
                Join
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}