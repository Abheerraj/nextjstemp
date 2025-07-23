"use client";

import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

export default function CategoriesPage() {
  const { isDarkMode } = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: "Tools", emoji: "🔧", description: "Power tools, hand tools, and equipment", count: 24 },
    { name: "Electronics", emoji: "📱", description: "Gadgets, devices, and tech equipment", count: 18 },
    { name: "Outdoor Gear", emoji: "⛺", description: "Camping, hiking, and outdoor equipment", count: 32 },
    { name: "Games", emoji: "🎯", description: "Board games, video games, and puzzles", count: 15 },
    { name: "Kitchen", emoji: "🍳", description: "Appliances, cookware, and utensils", count: 21 },
    { name: "Books", emoji: "📚", description: "Textbooks, novels, and reference materials", count: 45 },
    { name: "Furniture", emoji: "🪑", description: "Tables, chairs, and home furnishings", count: 12 },
    { name: "Sports", emoji: "⚽", description: "Sports equipment and fitness gear", count: 28 },
    { name: "Clothing", emoji: "👕", description: "Special occasion and seasonal wear", count: 9 },
    { name: "Garden", emoji: "🌱", description: "Gardening tools and lawn equipment", count: 19 },
    { name: "Art & Craft", emoji: "🎨", description: "Art supplies and crafting materials", count: 14 },
    { name: "Misc", emoji: "📦", description: "Everything else that doesn't fit above", count: 22 },
  ];

  return (
    <div className={`min-h-screen font-inter ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-neutral-800'
    }`}>
      {/* Hero Section */}
      <section
        className="py-20 px-6 text-center"
        style={{ 
          backgroundColor: isDarkMode ? "#1a1a1a" : "#f0f6ff" 
        }}
      >
        <h1 className={`text-3xl sm:text-4xl font-semibold mb-3 ${
          isDarkMode ? 'text-purple-300' : 'text-blue-700'
        }`}>
          Browse Categories
        </h1>
        <p className={`text-base sm:text-lg max-w-xl mx-auto ${
          isDarkMode ? 'text-purple-200' : 'text-blue-900/70'
        }`}>
          Find exactly what you need by browsing our organized categories
        </p>
      </section>

      {/* Categories Grid */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <div
          className="rounded-xl border shadow-2xl p-8"
          style={{
            backgroundColor: isDarkMode ? "#1f1f23" : "#f8f5ff",
            borderColor: isDarkMode ? "#374151" : "#e0d4ff",
            boxShadow: isDarkMode 
              ? "0 25px 50px -12px rgba(139, 92, 246, 0.4)" 
              : "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 p-6 border ${
                  selectedCategory === category.name
                    ? isDarkMode 
                      ? 'border-purple-400 bg-purple-900/20' 
                      : 'border-purple-400 bg-purple-50'
                    : isDarkMode 
                      ? 'border-gray-600 bg-gray-800 hover:border-purple-500' 
                      : 'border-purple-200 bg-white hover:border-purple-300'
                }`}
                style={{
                  boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.1)",
                }}
                onClick={() => setSelectedCategory(category.name === selectedCategory ? null : category.name)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(139, 92, 246, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(139, 92, 246, 0.1)";
                }}
              >
                {/* Icon */}
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{category.emoji}</div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    isDarkMode 
                      ? 'bg-purple-900 text-purple-300' 
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {category.count} items
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className={`text-lg font-semibold mb-2 group-hover:text-purple-600 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {category.name}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {category.description}
                  </p>
                </div>

                {/* Selection indicator */}
                {selectedCategory === category.name && (
                  <div className="absolute top-3 right-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-purple-600' : 'bg-purple-500'
                    }`}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-900/0 group-hover:from-purple-600/10 group-hover:to-purple-900/20 transition-all duration-300 rounded-2xl pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Selected Category Info */}
          {selectedCategory && (
            <div className={`mt-8 p-6 rounded-xl border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600' 
                : 'bg-purple-50 border-purple-200'
            }`}>
              <div className="text-center">
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-700'
                }`}>
                  {selectedCategory} Selected
                </h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Browse all items in this category or use the search to find specific items.
                </p>
                <button
                  className={`mt-4 px-6 py-2 rounded-lg font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  View All {selectedCategory}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Background Elements */}
      <div className={`fixed left-0 top-0 h-full w-2 opacity-40 -z-10 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-purple-900 via-purple-800 to-transparent' 
          : 'bg-gradient-to-b from-blue-100 via-pink-100 to-transparent'
      }`} />
      <div className={`fixed right-0 top-0 h-full w-2 opacity-40 -z-10 ${
        isDarkMode 
          ? 'bg-gradient-to-t from-purple-900 via-purple-800 to-transparent' 
          : 'bg-gradient-to-t from-green-100 via-blue-100 to-transparent'
      }`} />
      <div className={`absolute top-0 left-0 w-64 h-64 rounded-full blur-2xl opacity-40 -z-10 ${
        isDarkMode ? 'bg-purple-900' : 'bg-blue-100'
      }`} />
      <div className={`absolute bottom-0 right-0 w-72 h-72 rounded-full blur-2xl opacity-30 -z-10 ${
        isDarkMode ? 'bg-purple-800' : 'bg-pink-100'
      }`} />
    </div>
  );
}