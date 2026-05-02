"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MovieCard from "@/src/components/MovieCard";

export default function MyList() {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();
  const API_URL = "https://tutam-sbd-10-kayla-joanna-240648701.vercel.app/api";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    const user = JSON.parse(storedUser);
    
    axios.get(`${API_URL}/favorites/${user.id}`)
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error(err));
  }, [router]);

  const removeFromFavorites = async (movie: any) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    try {
      await axios.delete(`${API_URL}/favorites/${user.id}/${movie.movie_id}`);
      setFavorites(favorites.filter((fav: any) => fav.movie_id !== movie.movie_id));
    } catch (error) {
      console.error("Error removing:", error);
    }
  };

  return (
    <div className="pt-10 pb-20">
      <h2 className="text-3xl font-black mb-2 text-[#382110] border-b-2 border-[#e5e0d8] pb-4">Want to Watch</h2>
      {favorites.length === 0 ? (
        <p className="mt-8 text-[#5a4634]">Your list is currently empty. Go find some good movies!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8">
          {favorites.map((movie: any) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              mode="list" 
              onRemove={removeFromFavorites} 
            />
          ))}
        </div>
      )}
    </div>
  );
}