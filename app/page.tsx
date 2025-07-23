"use client";

import { useState } from "react";
import { useDarkMode } from "./context/DarkModeContext";  // Changed from ../context to ./context

export default function Home() {  // Changed from MyListedPage to Home
  const { isDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample items data
  const allItems = [
    { emoji: "🔧", item: "Drill", owner: "John", distance: "300m", category: "tools" },
    { emoji: "🚲", item: "Bike", owner: "Alice", distance: "1.2km", category: "sports" },
    { emoji: "🪜", item: "Ladder", owner: "Mike", distance: "600m", category: "tools" },
    { emoji: "⛺", item: "Tent", owner: "Sarah", distance: "950m", category: "outdoor" },
    { emoji: "📷", item: "Camera", owner: "Leo", distance: "2km", category: "electronics" },
    { emoji: "🎲", item: "Board Game", owner: "Alex", distance: "850m", category: "games" },
    { emoji: "🍳", item: "Frying Pan", owner: "Emma", distance: "400m", category: "kitchen" },
    { emoji: "📚", item: "Textbook", owner: "David", distance: "700m", category: "books" },
    { emoji: "🎸", item: "Guitar", owner: "Sophie", distance: "1.5km", category: "misc" },
    { emoji: "🏓", item: "Ping Pong Table", owner: "Chris", distance: "1.8km", category: "sports" },
    { emoji: "🔨", item: "Hammer", owner: "Mark", distance: "500m", category: "tools" },
    { emoji: "🎯", item: "Dartboard", owner: "Lisa", distance: "1.1km", category: "games" },
  ];

  // Filter items based on search query
  const filteredItems = allItems.filter(item => 
    item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show only first 6 items if no search, or all filtered items if searching
  const displayItems = searchQuery ? filteredItems : allItems.slice(0, 6);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
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
          Welcome to Lendly
        </h1>
        <p className={`text-base sm:text-lg max-w-xl mx-auto ${
          isDarkMode ? 'text-purple-200' : 'text-blue-900/70'
        }`}>
          Share what you own, borrow what you need. Connect with your community
          to save money and reduce waste.
        </p>
      </section>

      {/* Categories Section */}
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
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-center text-xs">
            {[
              "Tools",
              "Electronics",
              "Outdoor Gear",
              "Games",
              "Kitchen",
              "Books",
              "Furniture",
              "Misc",
              "Sports",
              "Clothing",
              "Garden",
              "Art & Craft",
            ].map((cat) => (
              <div
                key={cat}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg transform ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-purple-500 text-white hover:shadow-purple-500/20' 
                    : 'bg-neutral-100 border-neutral-200 hover:bg-blue-50 hover:border-blue-200 hover:shadow-blue-200/50'
                }`}
                style={{
                  boxShadow: isDarkMode 
                    ? "0 4px 6px -1px rgba(139, 92, 246, 0.1)"
                    : "0 4px 6px -1px rgba(59, 130, 246, 0.1)"
                }}
                onClick={() => setSearchQuery(cat.toLowerCase().replace(' & ', ' '))}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
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
          <h2
            className="text-2xl font-semibold mb-8 text-center"
            style={{ color: isDarkMode ? "#c084fc" : "#7c3aed" }}
          >
            Recommended for You
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Tools",
                subtitle: "Essential equipment",
                image: "🔧",
                gradient: isDarkMode 
                  ? "linear-gradient(135deg, #374151 0%, #4b5563 100%)"
                  : "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)",
                hoverGradient: isDarkMode
                  ? "linear-gradient(135deg, #4b5563 0%, #6b7280 100%)"
                  : "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)"
              },
              {
                title: "Outdoor Gear",
                subtitle: "Adventure essentials",
                image: "⛺",
                gradient: isDarkMode
                  ? "linear-gradient(135deg, #78350f 0%, #92400e 100%)"
                  : "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                hoverGradient: isDarkMode
                  ? "linear-gradient(135deg, #92400e 0%, #a16207 100%)"
                  : "linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)"
              },
              {
                title: "Garden",
                subtitle: "Green thumb supplies",
                image: "🌱",
                gradient: isDarkMode
                  ? "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)"
                  : "linear-gradient(135deg, #fed7d7 0%, #fbb6ce 100%)",
                hoverGradient: isDarkMode
                  ? "linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)"
                  : "linear-gradient(135deg, #fbb6ce 0%, #f687b3 100%)"
              },
              {
                title: "Sports",
                subtitle: "Active lifestyle gear",
                image: "⚽",
                gradient: isDarkMode
                  ? "linear-gradient(135deg, #3730a3 0%, #4338ca 100%)"
                  : "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
                hoverGradient: isDarkMode
                  ? "linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)"
                  : "linear-gradient(135deg, #c7d2fe 0%, #a5b4fc 100%)"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  background: item.gradient,
                  boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.1)",
                }}
                onClick={() => setSearchQuery(item.title.toLowerCase())}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = item.hoverGradient;
                  e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(139, 92, 246, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = item.gradient;
                  e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(139, 92, 246, 0.1)";
                }}
              >
                {/* Image/Icon Area */}
                <div className="h-40 flex items-center justify-center text-6xl p-6">
                  {item.image}
                </div>
                
                {/* Content Area */}
                <div className="p-6 pt-0">
                  <h3 
                    className={`text-lg font-semibold mb-1 group-hover:text-white transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className={`text-sm group-hover:text-white/90 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {item.subtitle}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-900/0 group-hover:from-purple-600/20 group-hover:to-purple-900/40 transition-all duration-300 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Items Box */}
      <div className="px-6 py-10 max-w-6xl mx-auto">
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
          {/* Centered Title */}
          <h2
            className="text-2xl font-semibold mb-8 text-center"
            style={{ color: isDarkMode ? "#c084fc" : "#7c3aed" }}
          >
            Find Items to Borrow
          </h2>

          {/* Centered Search */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search for items, owners, or categories..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={`border rounded-lg px-6 py-3 w-full text-base focus:outline-none focus:ring-4 transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-xl ${
                  isDarkMode 
                    ? 'bg-gray-800 text-white border-gray-600 focus:ring-purple-400 placeholder-gray-400'
                    : 'bg-white text-neutral-800 border-purple-200 focus:ring-purple-300 placeholder-gray-500'
                }`}
                style={{
                  boxShadow: "0 10px 15px -3px rgba(139, 92, 246, 0.1)",
                  paddingRight: searchQuery ? "50px" : "24px",
                }}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-all duration-200 hover:scale-110 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="text-center mb-6">
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {filteredItems.length === 0 
                  ? `No items found for "${searchQuery}"`
                  : `Found ${filteredItems.length} item${filteredItems.length !== 1 ? 's' : ''} for "${searchQuery}"`
                }
              </p>
            </div>
          )}

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className={`text-lg font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  No items found
                </h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Try searching for something else or browse our categories
                </p>
              </div>
            ) : (
              displayItems.map(({ emoji, item, owner, distance, category }) => (
                <div
                  key={`${item}-${owner}`}
                  className={`flex flex-col gap-2 p-4 border rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600' 
                      : 'bg-white border-purple-200'
                  }`}
                  style={{
                    boxShadow: "0 10px 15px -3px rgba(139, 92, 246, 0.1)",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xl">{emoji}</span>
                    <span className={`text-base font-medium ${
                      isDarkMode ? 'text-white' : 'text-neutral-800'
                    }`}>{item}</span>
                    <span className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-neutral-400'
                    }`}>— {owner}</span>
                  </div>
                  {/* Photo box */}
                  <div
                    className="rounded-lg h-32 w-full flex items-center justify-center text-xs"
                    style={{
                      backgroundColor: isDarkMode ? "#374151" : "#faf5ff",
                      color: isDarkMode ? "#c084fc" : "#a855f7",
                    }}
                  >
                    Photo Preview
                  </div>
                  {/* Distance and Details */}
                  <div className="flex justify-between items-center mt-1">
                    <span className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                    }`}>
                      📍 {distance} away
                    </span>
                    <button
                      className={`text-white text-xs px-3 py-1 rounded-full transition-all duration-200 shadow-md hover:shadow-lg ${
                        isDarkMode ? 'hover:bg-purple-600' : 'hover:bg-purple-700'
                      }`}
                      style={{
                        backgroundColor: isDarkMode ? "#7c3aed" : "#8b5cf6",
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = isDarkMode ? "#6d28d9" : "#7c3aed";
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = isDarkMode ? "#7c3aed" : "#8b5cf6";
                      }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Show more button when not searching */}
          {!searchQuery && allItems.length > 6 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setSearchQuery("")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isDarkMode 
                    ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                View All Items ({allItems.length})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Global Background Blobs & Gradients */}
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
      <div className={`absolute top-24 right-1/3 w-56 h-56 rounded-full blur-2xl opacity-30 -z-10 ${
        isDarkMode ? 'bg-purple-700' : 'bg-yellow-100'
      }`} />
      <div className={`absolute bottom-24 left-1/4 w-40 h-40 rounded-full blur-2xl opacity-30 -z-10 ${
        isDarkMode ? 'bg-purple-600' : 'bg-green-100'
      }`} />
      <div className={`absolute top-1/2 left-0 w-32 h-32 rounded-full blur-2xl opacity-30 -z-10 ${
        isDarkMode ? 'bg-purple-500' : 'bg-purple-100'
      }`} />
    </div>
  );
}