"use client";

import React from "react";

interface MovieCardProps {
  movie: any;
  mode: "search" | "list";
  onAddList?: (movie: any) => void;
  onAddWatched?: (movie: any, rating: number) => void;
  onRemove?: (movie: any) => void;
}

export default function MovieCard({ movie, mode, onAddList, onAddWatched, onRemove }: MovieCardProps) {
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
      <img 
        src={imageUrl} 
        alt={movie.title} 
        className="w-full h-auto rounded-md object-cover shadow-sm border border-[#d8d3c4]"
      />
      
      <div className="absolute inset-0 bg-[#382110] bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-300 rounded-md flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
        <h3 className="text-white font-bold text-sm md:text-base mb-3 truncate">
          {movie.title}
        </h3>
        
        {}
        {mode === "search" && (
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => onAddList && onAddList(movie)}
              className="w-full py-2 bg-[#f4f1ea] text-[#382110] font-bold rounded text-xs hover:bg-white transition"
            >
              + Want to Watch
            </button>
            <button 
              onClick={() => {
                const rating = prompt("Rate this movie (1-5):", "5");
                const numRating = parseInt(rating || "0");
                if (numRating >= 1 && numRating <= 5) {
                  onAddWatched && onAddWatched(movie, numRating);
                } else if (rating !== null) {
                  alert("Rating harus berupa angka 1 sampai 5.");
                }
              }}
              className="w-full py-2 bg-[#FF6B35] text-white font-bold rounded text-xs hover:bg-[#e55b2b] transition"
            >
              ★ Rate & Watched
            </button>
          </div>
        )}

        {}
        {mode === "list" && (
          <button 
            onClick={() => onRemove && onRemove(movie)}
            className="w-full py-2 bg-rose-600 text-white font-bold rounded text-xs hover:bg-rose-700 transition"
          >
            Remove from List
          </button>
        )}
      </div>
    </div>
  );
}