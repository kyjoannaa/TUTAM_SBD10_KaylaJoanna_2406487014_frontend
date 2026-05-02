"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SearchBar from "@/src/components/SearchBar";
import MovieList from "@/src/components/MovieList";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  const API_URL = "https://tutam-sbd-10-kayla-joanna-240648701.vercel.app/api";

  const searchMovies = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    try {
      const response = await axios.get(`${API_URL}/movies/search?query=${query}`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const addToFavorites = async (movie: any) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please sign in first!");
      router.push("/login");
      return;
    }
    const user = JSON.parse(storedUser);
    try {
      await axios.post(`${API_URL}/favorites`, {
        user_id: user.id,
        movie_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      });
      alert(`"${movie.title}" added to your Want to Watch list!`);
    } catch (error: any) {
      if (error.response?.status === 400) alert("Already in your list!");
    }
  };

  const addToWatched = async (movie: any, rating: number) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please sign in first!");
      router.push("/login");
      return;
    }
    const user = JSON.parse(storedUser);
    try {
      await axios.post(`${API_URL}/watched`, {
        user_id: user.id,
        movie_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        rating: rating, 
      });
      alert(`Rated ${rating} stars! Added to your My Ratings list.`);
    } catch (error: any) {
      if (error.response?.status === 400) alert("You have already rated this movie!");
    }
  };

  return (
    <div className="pb-20 flex flex-col items-center">
      <div className="text-center mt-12 mb-8 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-black text-[#382110] mb-4 tracking-tight">
          Search & Rate <span className="text-[#FF6B35]">Your Next Watch</span>
        </h1>
        <p className="text-[#5a4634] text-lg">
          Search thousands of movies, add them to your list, and review what you've watched.
        </p>
      </div>

      <div className="w-full max-w-4xl">
        <SearchBar query={query} setQuery={setQuery} onSearch={searchMovies} />
      </div>

      <div className="w-full mt-8">
        <MovieList movies={movies} onAddList={addToFavorites} onAddWatched={addToWatched} />
      </div>
    </div>
  );
}