"use client";

import { useDarkMode } from "../context/DarkModeContext";

export default function BasketPage() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen font-inter ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-neutral-800'
    }`}>
      <section
        className="py-20 px-6 text-center"
        style={{ 
          backgroundColor: isDarkMode ? "#1a1a1a" : "#f0f6ff" 
        }}
      >
        <h1 className={`text-3xl sm:text-4xl font-semibold mb-3 ${
          isDarkMode ? 'text-purple-300' : 'text-blue-700'
        }`}>
          Your Basket
        </h1>
        <p className={`text-base sm:text-lg max-w-xl mx-auto ${
          isDarkMode ? 'text-purple-200' : 'text-blue-900/70'
        }`}>
          Items you&apos;ve requested to borrow
        </p>
      </section>

      <section className="px-6 py-10 max-w-6xl mx-auto">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className={`text-lg font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-neutral-700'
          }`}>
            Your basket is empty
          </h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-neutral-500'
          }`}>
            Browse items and add them to your basket to get started
          </p>
        </div>
      </section>
    </div>
  );
}