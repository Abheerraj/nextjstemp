"use client";

import { useState } from "react";

export default function CategoriesPage() {
  const categories = [
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
  ];

  // Track the currently active/selected category
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-800 font-inter">
      {/* Hero Section */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: "#f0f6ff" }}
      >
        <h1 className="text-3xl sm:text-4xl font-semibold mb-3 text-blue-700">
          Explore Categories
        </h1>
        <p className="text-base sm:text-lg max-w-xl mx-auto text-blue-900/70">
          Browse through a wide range of categories to discover what you need.
        </p>
      </section>
      
      {/* Low Fidelity Wireframe for Categories List */}
      <section className="p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Category Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`w-full text-left border border-dashed border-gray-400 p-4 transition-colors 
                            ${isActive ? "bg-blue-200" : "hover:bg-blue-50"}`}
              >
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
                <p className="text-sm text-gray-600">
                  [Placeholder for category description]
                </p>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}