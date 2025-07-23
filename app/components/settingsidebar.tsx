"use client";

import { useDarkMode } from "../context/DarkModeContext";

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsSidebar({ isOpen, onClose }: SettingsSidebarProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
        style={{
          boxShadow: "-10px 0 25px rgba(139, 92, 246, 0.15)",
        }}
      >
        {/* Header */}
        <div
          className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-purple-100'}`}
          style={{
            background: isDarkMode 
              ? "linear-gradient(135deg, #1f1f23 0%, #2d1b3d 100%)" 
              : "linear-gradient(135deg, #f8f5ff 0%, #f0f4ff 100%)",
          }}
        >
          <div className="flex justify-between items-center">
            <h2
              className="text-xl font-semibold"
              style={{ color: isDarkMode ? "#c084fc" : "#7c3aed" }}
            >
              Appearance
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isDarkMode ? 'hover:bg-purple-800' : 'hover:bg-purple-100'
              }`}
              style={{ color: isDarkMode ? "#c084fc" : "#7c3aed" }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Dark Mode Toggle */}
          <div className={`p-4 rounded-lg transition-colors duration-200 ${
            isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-purple-50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🌙</span>
                <div>
                  <span className={`text-lg font-medium ${
                    isDarkMode ? 'text-white' : 'text-neutral-800'
                  }`}>Dark Mode</span>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                  }`}>Switch to dark theme</p>
                </div>
              </div>
              <button 
                onClick={toggleDarkMode}
                className={`w-14 h-7 rounded-full relative transition-colors duration-200 ${
                  isDarkMode ? 'bg-purple-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                  isDarkMode ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}