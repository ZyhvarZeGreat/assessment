"use client";

import { useState } from "react";
import { searchSuggestions } from "@/lib/data";

export default function MobileSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredSuggestions = searchSuggestions.filter((sug) =>
    sug.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-gray-600"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Fullscreen search overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            {/* Search header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Ser"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-3 py-2 border-none focus:outline-none text-lg"
                />
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearchQuery("");
                }}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search results */}
            <div className="flex-1 overflow-y-auto">
              {searchQuery && filteredSuggestions.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredSuggestions.map((sug, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-4 hover:bg-gray-50 cursor-pointer"
                    >
                      <p className="font-medium text-gray-900">{sug.name}</p>
                      <p className="text-sm text-gray-500">{sug.username}</p>
                    </div>
                  ))}
                </div>
              ) : searchQuery && filteredSuggestions.length === 0 ? (
                <div className="py-16 text-center px-4">
                  <div className="flex justify-center mb-4">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-500">Check spelling or try searching by connection name</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
