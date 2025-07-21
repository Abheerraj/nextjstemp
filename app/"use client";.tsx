"use client";

import { useState } from "react";

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center px-8 py-5 border-b border-neutral-200 bg-white">
        {/* Site Name (Left) */}
        <div className="flex-1">
          <span className="text-xl font-semibold tracking-tight text-blue-600">
            Lendly
          </span>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm font-normal">
          <button className="hover:text-blue-500 transition-colors">Home</button>
          <button className="hover:text-blue-500 transition-colors">Categories</button>
          <button className="hover:text-blue-500 transition-colors">About</button>
          <button className="hover:text-blue-500 transition-colors">How it Works</button>
          <button className="hover:text-blue-500 transition-colors">Contact</button>
        </div>
        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-600 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 8h16M4 16h16"
              />
            </svg>
          </button>
        </div>
        {/* Profile Picture (Right) */}
        <div className="flex-1 flex justify-end">
          <button className="w-10 h-10 rounded-full bg-neutral-200 hover:bg-blue-100 flex items-center justify-center transition">
            <span className="text-neutral-500 text-lg font-bold">P</span>
          </button>
        </div>
      </nav>
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-8 py-4">
          <button className="block w-full text-left hover:text-blue-500 transition-colors mb-2">Home</button>
          <button className="block w-full text-left hover:text-blue-500 transition-colors mb-2">Categories</button>
          <button className="block w-full text-left hover:text-blue-500 transition-colors mb-2">About</button>
          <button className="block w-full text-left hover:text-blue-500 transition-colors mb-2">How it Works</button>
          <button className="block w-full text-left hover:text-blue-500 transition-colors">Contact</button>
        </div>
      )}
    </>
  );
}