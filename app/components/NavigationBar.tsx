"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    // Implement your logout logic here
    alert("Logging out...");
  };

  return (
    <>
      <header>
        <nav className="flex items-center px-8 py-5 border-b border-black bg-white shadow-md relative">
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
          {/* Profile Button and Dropdown */}
          <div className="flex-1 flex justify-end relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 rounded-full bg-black hover:bg-blue-900 flex items-center justify-center transition"
            >
              <span className="text-white text-lg font-bold">P</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-12 w-56 bg-white border border-gray-200 rounded shadow-lg z-50">
                <ul>
                  <li>
                    <Link
                      href="/borrowed"
                      className="block px-4 py-2 hover:bg-blue-50 text-black"
                    >
                      Currently Borrowing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/basket"
                      className="block px-4 py-2 hover:bg-blue-50 text-black"
                    >
                      My Basket
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-listed"
                      className="block px-4 py-2 hover:bg-blue-50 text-black"
                    >
                      My Listed Items
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/manage"
                      className="block px-4 py-2 hover:bg-blue-50 text-black"
                    >
                      Manage
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 text-black"
                    >
                      Log Out
                    </button>
                  </li>
                  <li>
                    <Link
                      href="/add-account"
                      className="block px-4 py-2 hover:bg-blue-50 text-black"
                    >
                      Add Account
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-b border-black px-8 py-4 flex flex-col gap-2">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-black hover:bg-blue-50 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="block px-3 py-2 rounded-md text-black hover:bg-blue-50 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-black hover:bg-blue-50 transition-colors"
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