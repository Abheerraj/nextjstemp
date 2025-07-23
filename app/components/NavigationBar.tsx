"use client";

import { useState } from "react";
import Link from "next/link";
import SettingsSidebar from "./settingsidebar";
import { useDarkMode } from "../context/DarkModeContext";

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { isDarkMode } = useDarkMode();

  const handleLogout = () => {
    // Implement your logout logic here
    alert("Logging out...");
  };

  const handleAppearanceClick = () => {
    setProfileOpen(false); // Close profile dropdown
    setSettingsOpen(true); // Open settings sidebar
  };

  return (
    <>
      <header>
        <nav
          className={`flex items-center px-8 py-5 border-b shadow-md relative ${
            isDarkMode ? "border-gray-700" : "border-black"
          }`}
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #1a1a1a 0%, #4c1d95 50%, #000000 100%)"
              : "#ffffff",
          }}
        >
          {/* Site Name (Left) */}
          <div className="flex-1">
            <Link
              href="/"
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Lendly
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-lg font-medium">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md transition-colors ${
                isDarkMode
                  ? "text-white hover:bg-purple-800/50"
                  : "text-black hover:bg-blue-50"
              }`}
            >
              Home
            </Link>
            <Link
              href="/categories"
              className={`px-3 py-2 rounded-md transition-colors ${
                isDarkMode
                  ? "text-white hover:bg-purple-800/50"
                  : "text-black hover:bg-blue-50"
              }`}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md transition-colors ${
                isDarkMode
                  ? "text-white hover:bg-purple-800/50"
                  : "text-black hover:bg-blue-50"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-md transition-colors ${
                isDarkMode
                  ? "text-white hover:bg-purple-800/50"
                  : "text-black hover:bg-blue-50"
              }`}
            >
              Contact
            </Link>
          </div>
          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`focus:outline-none ${
                isDarkMode ? "text-white" : "text-black"
              }`}
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
              className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                isDarkMode
                  ? "bg-purple-700 hover:bg-purple-600"
                  : "bg-black hover:bg-blue-900"
              }`}
            >
              <span className="text-white text-lg font-bold">P</span>
            </button>
            {profileOpen && (
              <div
                className={`absolute right-0 mt-12 w-56 border rounded shadow-lg z-50 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <ul>
                  <li>
                    <Link
                      href="/borrowed"
                      className={`block px-4 py-2 transition-colors ${
                        isDarkMode
                          ? "text-white hover:bg-gray-700"
                          : "text-black hover:bg-blue-50"
                      }`}
                    >
                      Currently Borrowing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-listed"
                      className={`block px-4 py-2 transition-colors ${
                        isDarkMode
                          ? "text-white hover:bg-gray-700"
                          : "text-black hover:bg-blue-50"
                      }`}
                    >
                      My Listed Items
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account"
                      className={`block px-4 py-2 transition-colors ${
                        isDarkMode
                          ? "text-white hover:bg-gray-700"
                          : "text-black hover:bg-blue-50"
                      }`}
                    >
                      Account
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleAppearanceClick}
                      className={`w-full text-left px-4 py-2 transition-colors ${
                        isDarkMode
                          ? "text-white hover:bg-gray-700"
                          : "text-black hover:bg-blue-50"
                      }`}
                    >
                      Appearance
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 transition-colors ${
                        isDarkMode
                          ? "text-white hover:bg-gray-700"
                          : "text-black hover:bg-blue-50"
                      }`}
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div
            className={`md:hidden border-b px-8 py-4 flex flex-col gap-2 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-black"
            }`}
          >
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md transition-colors ${
                isDarkMode
                  ? "text-white hover:bg-gray-700"
                  : "text-black hover:bg-blue-50"
              }`}
            >
              Home
            </Link>
            <Link
              href="/categories"
              className={`block px-3 py-2 rounded-md transition-colors ${
                isDarkMode
                  ? "text-white hover:bg-gray-700"
                  : "text-black hover:bg-blue-50"
              }`}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 rounded-md transition-colors ${
                isDarkMode
                  ? "text-white hover:bg-gray-700"
                  : "text-black hover:bg-blue-50"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2 rounded-md transition-colors ${
                isDarkMode
                  ? "text-white hover:bg-gray-700"
                  : "text-black hover:bg-blue-50"
              }`}
            >
              Contact
            </Link>
          </div>
        )}
      </header>

      {/* Settings Sidebar */}
      <SettingsSidebar
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}