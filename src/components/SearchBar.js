import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search events by title, location, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 pl-14 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-700 text-lg shadow-md"
        />
        <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl">
          🔍
        </span>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <p className="mt-2 text-sm text-gray-600">
          Searching for: <span className="font-semibold text-indigo-600">{searchTerm}</span>
        </p>
      )}
    </div>
  );
}

export default SearchBar;
