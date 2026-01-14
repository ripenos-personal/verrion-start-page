import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 relative z-10">
      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500 group-focus-within:text-verrion-accent transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Google..."
          className="block w-full pl-12 pr-4 py-4 bg-verrion-container border border-[#1E293B] rounded-full text-gray-200 placeholder-gray-600 focus:outline-none focus:border-verrion-accent/50 focus:ring-1 focus:ring-verrion-accent/50 transition-all shadow-lg font-sans text-lg"
        />
        <div className="absolute inset-0 rounded-full bg-verrion-accent/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 blur-xl -z-10"></div>
      </form>
    </div>
  );
};

export default SearchBar;