"use client";

import { useDarkMode } from "../context/DarkModeContext";
import { useState } from "react";

export default function Categories() {
  const { isDarkMode } = useDarkMode();

  const categories = [
    { name: "Tools", emoji: "🔧", count: 45, description: "Power tools, hand tools, and equipment" },
    { name: "Electronics", emoji: "💻", count: 32, description: "Gadgets, devices, and tech equipment" },
    { name: "Outdoor Gear", emoji: "⛺", count: 28, description: "Camping, hiking, and adventure gear" },
    { name: "Games", emoji: "🎲", count: 19, description: "Board games, video games, and toys" },
    { name: "Kitchen", emoji: "🍳", count: 24, description: "Appliances, cookware, and utensils" },
    { name: "Books", emoji: "📚", count: 67, description: "Fiction, non-fiction, and textbooks" },
    { name: "Furniture", emoji: "🪑", count: 15, description: "Tables, chairs, and home furnishings" },
    { name: "Sports", emoji: "⚽", count: 31, description: "Sports equipment and fitness gear" },
    { name: "Clothing", emoji: "👕", count: 22, description: "Formal wear, costumes, and accessories" },
    { name: "Garden", emoji: "🌱", count: 18, description: "Tools, plants, and garden equipment" },
    { name: "Art & Craft", emoji: "🎨", count: 26, description: "Supplies for creative projects" },
    { name: "Misc", emoji: "📦", count: 41, description: "Everything else you might need" },
  ];

  // Track the currently active/selected category
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

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
          Find exactly what you need by exploring our organized categories
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
          <h2 className={`text-2xl font-semibold mb-8 text-center ${
            isDarkMode ? 'text-purple-300' : 'text-purple-700'
          }`}>
            All Categories
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const isActive = activeCategory === category.name;
              return (
                <div
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-purple-500' 
                      : 'bg-white border-purple-200 hover:bg-purple-50 hover:border-purple-300'
                  }`}
                  style={{
                    boxShadow: "0 10px 15px -3px rgba(139, 92, 246, 0.1)",
                  }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{category.emoji}</div>
                    <h3 className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-neutral-800'
                    }`}>
                      {category.name}
                    </h3>
                    <p className={`text-sm mb-3 ${
                      isDarkMode ? 'text-gray-400' : 'text-neutral-600'
                    }`}>
                      {category.description}
                    </p>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkMode 
                        ? 'bg-purple-900 text-purple-200' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {category.count} items
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
    </div>
  );
}