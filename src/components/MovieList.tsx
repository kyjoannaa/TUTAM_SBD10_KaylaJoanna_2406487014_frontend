"use client";

import React from "react";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: any[];
  onAddList: (movie: any) => void;
  onAddWatched: (movie: any, rating: number) => void;
}

export default function MovieList({ movies, onAddList, onAddWatched }: MovieListProps) {
  if (movies.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-black mb-4 text-[#382110] border-b-2 border-[#e5e0d8] pb-2">Search Results</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 pt-4">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            mode="search" 
            onAddList={onAddList} 
            onAddWatched={onAddWatched}
          />
        ))}
      </div>
    </div>
  );
}