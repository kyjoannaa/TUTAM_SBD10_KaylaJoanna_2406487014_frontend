"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Watched() {
  const [watched, setWatched] = useState([]);
  const router = useRouter();
  const API_URL = "https://tutam-sbd-10-kayla-joanna-240648701.vercel.app/api";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    const user = JSON.parse(storedUser);
    
    axios.get(`${API_URL}/watched/${user.id}`)
      .then((res) => setWatched(res.data))
      .catch((err) => console.error(err));
  }, [router]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "text-[#FF6B35] text-2xl" : "text-[#d8d3c4] text-2xl"}>
        ★
      </span>
    ));
  };

  return (
    <div className="pt-10 pb-20">
      <h2 className="text-3xl font-black mb-2 text-[#382110] border-b-2 border-[#e5e0d8] pb-4">My Ratings & Reviews</h2>
      
      {watched.length === 0 ? (
        <p className="mt-8 text-[#5a4634]">You haven't rated any movies yet.</p>
      ) : (
        <div className="flex flex-col gap-4 mt-8 max-w-4xl">
          {watched.map((movie: any) => (
            <div key={movie.id} className="flex bg-white p-4 rounded-lg shadow-sm border border-[#e5e0d8] gap-6 items-center hover:shadow-md transition">
              <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/100x150"} 
                alt={movie.title} 
                className="w-20 h-auto object-cover rounded shadow-sm border border-[#d8d3c4]"
              />
              <div>
                <h3 className="font-bold text-2xl text-[#382110] mb-1">{movie.title}</h3>
                <div className="flex gap-1">{renderStars(movie.rating)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}