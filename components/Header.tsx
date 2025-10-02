"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileSearch from "./MobileSearch";
import { connections, profileDetails } from "@/lib/data";

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

export default function Header({ onSearch, searchPlaceholder = "Search customer" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredResults = connections.filter((conn) =>
    conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conn.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conn.location.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowDropdown(value.length > 0);
    onSearch?.(value);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile logo */}
        <div className="md:hidden flex items-center gap-2">
          <Image
            src="/home-logo.png"
            alt="Aplite Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>

        {/* Search bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md" ref={dropdownRef}>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => searchQuery.length > 0 && setShowDropdown(true)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {/* Search Dropdown */}
            {showDropdown && searchQuery.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                {filteredResults.length > 0 ? (
                  <div className="py-2">
                    {filteredResults.map((result) => {
                      const profile = profileDetails[result.id];
                      return (
                        <Link
                          key={result.id}
                          href={`/profile/${result.id}`}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setShowDropdown(false);
                            setSearchQuery("");
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-[#1a1f4d] rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-semibold">
                                {result.name.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900">{result.name}</p>
                              <p className="text-sm text-gray-500">@{result.username}</p>
                              {profile?.bio && (
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{profile.bio}</p>
                              )}
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-gray-400">{result.email}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-400">{result.location}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <p>No results found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Search icon - Mobile */}
        <MobileSearch />

        {/* Right side - Notification & User */}
        <div className="flex items-center gap-4 ml-auto md:ml-6">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1a1f4d] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">JH</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">Josh Heart</p>
              <p className="text-xs text-gray-500">Accountant</p>
            </div>
          </div>

          <button className="hidden md:block text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-4 space-y-2">
            <a href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white bg-[#1a1f4d] rounded-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20.5V14.5H14V20.5H19V12.5H22L12 3.5L2 12.5H5V20.5H10Z" fill="white" />
              </svg>
              Home
            </a>
            <a href="/locations" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1.66667C6.775 1.66667 4.16667 4.27501 4.16667 7.50001C4.16667 11.875 10 18.3333 10 18.3333C10 18.3333 15.8333 11.875 15.8333 7.50001C15.8333 4.27501 13.225 1.66667 10 1.66667ZM5.83333 7.50001C5.83333 5.20001 7.7 3.33334 10 3.33334C12.3 3.33334 14.1667 5.20001 14.1667 7.50001C14.1667 9.90001 11.7667 13.4917 10 15.7333C8.26667 13.5083 5.83333 9.87501 5.83333 7.50001Z" fill="#575E67" />
                <path d="M10 9.58334C11.1506 9.58334 12.0833 8.6506 12.0833 7.50001C12.0833 6.34941 11.1506 5.41667 10 5.41667C8.84941 5.41667 7.91667 6.34941 7.91667 7.50001C7.91667 8.6506 8.84941 9.58334 10 9.58334Z" fill="#575E67" />
              </svg>
              Locations
            </a>
            <a href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.70833 18.3333L7.375 15.6667C7.19444 15.5972 7.02431 15.5139 6.86458 15.4167C6.70486 15.3195 6.54861 15.2153 6.39583 15.1042L3.91667 16.1458L1.625 12.1875L3.77083 10.5625C3.75694 10.4653 3.75 10.3715 3.75 10.2813V9.71876C3.75 9.62848 3.75694 9.53473 3.77083 9.43751L1.625 7.81251L3.91667 3.85417L6.39583 4.89584C6.54861 4.78473 6.70833 4.68056 6.875 4.58334C7.04167 4.48612 7.20833 4.40278 7.375 4.33334L7.70833 1.66667H12.2917L12.625 4.33334C12.8056 4.40278 12.9757 4.48612 13.1354 4.58334C13.2951 4.68056 13.4514 4.78473 13.6042 4.89584L16.0833 3.85417L18.375 7.81251L16.2292 9.43751C16.2431 9.53473 16.25 9.62848 16.25 9.71876V10.2813C16.25 10.3715 16.2361 10.4653 16.2083 10.5625L18.3542 12.1875L16.0625 16.1458L13.6042 15.1042C13.4514 15.2153 13.2917 15.3195 13.125 15.4167C12.9583 15.5139 12.7917 15.5972 12.625 15.6667L12.2917 18.3333H7.70833ZM9.16667 16.6667H10.8125L11.1042 14.4583C11.5347 14.3472 11.934 14.184 12.3021 13.9688C12.6701 13.7535 13.0069 13.4931 13.3125 13.1875L15.375 14.0417L16.1875 12.625L14.3958 11.2708C14.4653 11.0764 14.5139 10.8715 14.5417 10.6563C14.5694 10.441 14.5833 10.2222 14.5833 10C14.5833 9.77778 14.5694 9.55903 14.5417 9.34376C14.5139 9.12848 14.4653 8.92362 14.3958 8.72917L16.1875 7.37501L15.375 5.95834L13.3125 6.83334C13.0069 6.51389 12.6701 6.24653 12.3021 6.03126C11.934 5.81598 11.5347 5.65278 11.1042 5.54167L10.8333 3.33334H9.1875L8.89583 5.54167C8.46528 5.65278 8.06597 5.81598 7.69792 6.03126C7.32986 6.24653 6.99306 6.50695 6.6875 6.81251L4.625 5.95834L3.8125 7.37501L5.60417 8.70834C5.53472 8.91667 5.48611 9.12501 5.45833 9.33334C5.43056 9.54167 5.41667 9.76389 5.41667 10C5.41667 10.2222 5.43056 10.4375 5.45833 10.6458C5.48611 10.8542 5.53472 11.0625 5.60417 11.2708L3.8125 12.625L4.625 14.0417L6.6875 13.1667C6.99306 13.4861 7.32986 13.7535 7.69792 13.9688C8.06597 14.184 8.46528 14.3472 8.89583 14.4583L9.16667 16.6667ZM10.0417 12.9167C10.8472 12.9167 11.5347 12.632 12.1042 12.0625C12.6736 11.4931 12.9583 10.8056 12.9583 10C12.9583 9.19445 12.6736 8.50695 12.1042 7.93751C11.5347 7.36806 10.8472 7.08334 10.0417 7.08334C9.22222 7.08334 8.53125 7.36806 7.96875 7.93751C7.40625 8.50695 7.125 9.19445 7.125 10C7.125 10.8056 7.40625 11.4931 7.96875 12.0625C8.53125 12.632 9.22222 12.9167 10.0417 12.9167Z" fill="#575E67" />
              </svg>
              Settings
            </a>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-10 h-10 bg-[#1a1f4d] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">JH</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Josh Heart</p>
                  <p className="text-xs text-gray-500">Accountant</p>
                </div>
              </div>
              <button className="w-full mt-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md text-left">
                🚪 Log out
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
