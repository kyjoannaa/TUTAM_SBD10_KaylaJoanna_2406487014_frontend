"use client";

import React from "react";

interface SearchBarProps {
  query: string;
  setQuery: (val: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

export default function SearchBar({ query, setQuery, onSearch }: SearchBarProps) {
  return (
    <form onSubmit={onSearch} className="flex w-full max-w-2xl mx-auto mb-10 mt-8 shadow-sm">
      <input
        type="text"
        placeholder="Search for your movie!"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-6 py-4 bg-white text-[#382110] border border-[#d8d3c4] border-r-0 rounded-l-md outline-none focus:ring-2 focus:ring-[#FF6B35]"
      />
      <button 
        type="submit"
        className="px-8 py-4 bg-[#FF6B35] hover:bg-[#e55b2b] text-white font-bold rounded-r-md transition"
      >
        Search
      </button>
    </form>
  );
}