"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header>
        <nav className="flex items-center px-8 py-5 border-b border-black bg-white shadow-md">
          {/* Site Name (Left) */}
          <div className="flex-1">
            <span className="text-2xl font-bold text-black">Lendly</span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-lg font-medium">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-black hover:bg-blue-50 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="px-3 py-2 rounded-md text-black hover:bg-blue-50 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-md text-black hover:bg-blue-50 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 rounded-md text-black hover:bg-blue-50 transition-colors"
            >
              Contact
            </Link>
          </div>
          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
            <button className="w-10 h-10 rounded-full bg-black hover:bg-blue-900 flex items-center justify-center transition">
              <span className="text-white text-lg font-bold">P</span>
            </button>
          </div>
        </nav>
        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-b border-black px-8 py-4">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-black hover:bg-blue-50 transition-colors mb-2"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="block px-3 py-2 rounded-md text-black hover:bg-blue-50 transition-colors mb-2"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-black hover:bg-blue-50 transition-colors mb-2"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-black hover:bg-blue-50 transition-colors"
            >
              Contact
            </Link>
          </div>
        )}
      </header>
    </>
  );
}