"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { connections, searchSuggestions } from "@/lib/data";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const isSearching = searchQuery.length > 0;

  const filteredSuggestions = searchSuggestions.filter((sug) =>
    sug.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredConnections = connections.filter((conn) =>
    conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conn.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowDropdown(query.length > 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-[#1a1f4d] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-3xl">J</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Joshua Heart</h1>
              <p className="text-gray-500">@joshheart3495</p>
            </div>
          </div>
        </div>

        {/* Connections List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">Connections List</h2>
            </div>
            <button className="text-sm text-[#2D2D2D] font-semibold border border-gray-300 rounded-lg px-4 py-2 cursor-pointer font-medium">
              View all
            </button>
          </div>

          {/* Search results for mobile */}
          <div className="md:hidden px-4 py-3 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search customer"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-3 text-[#929292] py-2 border placeholder:text-[#929292] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Search suggestions (when typing) */}
          {isSearching && filteredSuggestions.length > 0 && searchQuery.length > 0 && (
            <div className="border-b border-gray-200">
              {filteredSuggestions.map((sug, idx) => (
                <div
                  key={idx}
                  className="px-6 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  <p className="font-medium text-gray-900">{sug.name}</p>
                  <p className="text-sm text-gray-500">{sug.username}</p>
                </div>
              ))}
            </div>
          )}

          {/* No results state */}
          {isSearching && filteredConnections.length === 0 && filteredSuggestions.length === 0 && (
            <div className="py-16 text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">Check spelling or try searching by connection name</p>
            </div>
          )}

          {/* Table - Desktop */}
          {!isSearching && filteredConnections.length > 0 && (
            <>
              <div className="hidden md:block overflow-x-auto px-6">
                <table className="min-w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last login
                      </th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredConnections.map((connection) => (
                      <tr key={connection.id} className="bg-gray-50 hover:bg-gray-100">
                        <td className="px-4 py-2.5 whitespace-nowrap rounded-l-lg">
                          <Link href={`/profile/${connection.id}`} className="flex items-center gap-3 group">
                            <div className="w-9 h-9 bg-[#1a1f4d] rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-semibold text-sm">
                                {connection.name.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">
                              {connection.name}
                            </span>
                          </Link>
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap text-sm text-gray-500">
                          {connection.email}
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap text-sm text-gray-500">
                          {connection.location}
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              connection.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {connection.status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap text-sm text-gray-500">
                          {connection.lastLogin}
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap text-right text-sm rounded-r-lg">
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* List - Mobile */}
              <div className="md:hidden">
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-3 bg-gray-50 grid grid-cols-2 text-xs font-medium text-gray-500 uppercase">
                    <div>Name</div>
                    <div>Email</div>
                  </div>
                  {filteredConnections.map((connection) => (
                    <Link
                      key={connection.id}
                      href={`/profile/${connection.id}`}
                      className="px-4 py-3 hover:bg-gray-50 grid grid-cols-2 items-center"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#1a1f4d] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">
                            {connection.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 text-sm">
                          {connection.name}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {connection.email}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Empty state (no connections) */}
          {!isSearching && filteredConnections.length === 0 && (
            <div className="py-16 text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No connections yet</h3>
              <p className="text-gray-500 mb-4">
                Start building your network. Search for<br />connections on Aplite.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
