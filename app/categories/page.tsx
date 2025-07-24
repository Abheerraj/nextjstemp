"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useDarkMode } from "../context/DarkModeContext";
import { useListedItems } from "../context/ListedItemsContext";
import { useBorrowedItems } from "../context/BorrowedItemsContext";
import toast, { Toaster } from 'react-hot-toast';

function CategoriesContent() {
  const { isDarkMode } = useDarkMode();
  const { listedItems } = useListedItems();
  const { addBorrowedItem, isItemBorrowed } = useBorrowedItems();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [borrowModal, setBorrowModal] = useState<{id: number, item: string, owner: string} | null>(null);
  const [borrowForm, setBorrowForm] = useState({
    name: "",
    email: "",
    phone: "",
    duration: "",
    reason: ""
  });

  // Ref for scrolling to items section
  const itemsSectionRef = useRef<HTMLDivElement>(null);

  // Sample items data with categories
  const sampleItems = useMemo(() => [
    { id: 101, emoji: "🔧", item: "Drill", owner: "John", distance: "300m", category: "tools", isOwn: false, status: "available" },
    { id: 102, emoji: "🚲", item: "Bike", owner: "Alice", distance: "1.2km", category: "sports", isOwn: false, status: "available" },
    { id: 103, emoji: "🪜", item: "Ladder", owner: "Mike", distance: "600m", category: "tools", isOwn: false, status: "available" },
    { id: 104, emoji: "⛺", item: "Tent", owner: "Sarah", distance: "950m", category: "outdoor gear", isOwn: false, status: "available" },
    { id: 105, emoji: "🍳", item: "Frying Pan", owner: "Emma", distance: "400m", category: "kitchen", isOwn: false, status: "available" },
    { id: 106, emoji: "📚", item: "Textbook", owner: "David", distance: "700m", category: "books", isOwn: false, status: "available" },
    { id: 107, emoji: "🎸", item: "Guitar", owner: "Sophie", distance: "1.5km", category: "misc", isOwn: false, status: "available" },
    { id: 108, emoji: "🏓", item: "Ping Pong Table", owner: "Chris", distance: "1.8km", category: "sports", isOwn: false, status: "available" },
    { id: 109, emoji: "🔨", item: "Hammer", owner: "Mark", distance: "500m", category: "tools", isOwn: false, status: "available" },
    { id: 110, emoji: "🎯", item: "Dartboard", owner: "Lisa", distance: "1.1km", category: "games", isOwn: false, status: "available" },
    { id: 111, emoji: "📱", item: "Camera", owner: "Alex", distance: "800m", category: "electronics", isOwn: false, status: "available" },
    { id: 112, emoji: "🪑", item: "Folding Chair", owner: "Maria", distance: "1km", category: "furniture", isOwn: false, status: "available" },
    { id: 113, emoji: "👕", item: "Tuxedo", owner: "James", distance: "1.3km", category: "clothing", isOwn: false, status: "available" },
    { id: 114, emoji: "🌱", item: "Lawn Mower", owner: "Robert", distance: "900m", category: "garden", isOwn: false, status: "available" },
    { id: 115, emoji: "🎨", item: "Easel", owner: "Anna", distance: "1.1km", category: "art & craft", isOwn: false, status: "available" },
  ], []);

  // Convert your listed items to the same format
  const ownItems = useMemo(() => listedItems.map(item => ({
    id: item.id,
    emoji: item.image,
    item: item.name,
    owner: "You",
    distance: "0m",
    category: item.category.toLowerCase(),
    isOwn: true,
    status: item.status
  })), [listedItems]);

  // Combine all items
  const allItems = useMemo(() => [...ownItems, ...sampleItems], [ownItems, sampleItems]);

  // Filter items by selected category and search query
  const categoryItems = useMemo(() => {
    if (!selectedCategory) return [];
    
    let filteredItems = allItems.filter(item => 
      item.category.toLowerCase() === selectedCategory.toLowerCase()
    );

    // Apply search filter if there's a search query
    if (searchQuery.trim()) {
      filteredItems = filteredItems.filter(item =>
        item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredItems;
  }, [allItems, selectedCategory, searchQuery]);

  // Count items per category
  const categories = useMemo(() => [
    { name: "Tools", emoji: "🔧", description: "Power tools, hand tools, and equipment", count: allItems.filter(item => item.category === "tools").length },
    { name: "Electronics", emoji: "📱", description: "Gadgets, devices, and tech equipment", count: allItems.filter(item => item.category === "electronics").length },
    { name: "Outdoor Gear", emoji: "⛺", description: "Camping, hiking, and outdoor equipment", count: allItems.filter(item => item.category === "outdoor gear").length },
    { name: "Games", emoji: "🎯", description: "Board games, video games, and puzzles", count: allItems.filter(item => item.category === "games").length },
    { name: "Kitchen", emoji: "🍳", description: "Appliances, cookware, and utensils", count: allItems.filter(item => item.category === "kitchen").length },
    { name: "Books", emoji: "📚", description: "Textbooks, novels, and reference materials", count: allItems.filter(item => item.category === "books").length },
    { name: "Furniture", emoji: "🪑", description: "Tables, chairs, and home furnishings", count: allItems.filter(item => item.category === "furniture").length },
    { name: "Sports", emoji: "⚽", description: "Sports equipment and fitness gear", count: allItems.filter(item => item.category === "sports").length },
    { name: "Clothing", emoji: "👕", description: "Special occasion and seasonal wear", count: allItems.filter(item => item.category === "clothing").length },
    { name: "Garden", emoji: "🌱", description: "Gardening tools and lawn equipment", count: allItems.filter(item => item.category === "garden").length },
    { name: "Art & Craft", emoji: "🎨", description: "Art supplies and crafting materials", count: allItems.filter(item => item.category === "art & craft").length },
    { name: "Misc", emoji: "📦", description: "Everything else that doesn&apos;t fit above", count: allItems.filter(item => item.category === "misc").length },
  ], [allItems]);

  // Handle URL parameter for pre-selected category
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // Convert URL parameter back to display format
      const categoryName = categoryParam
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .replace('Art Craft', 'Art & Craft')
        .replace('Outdoor Gear', 'Outdoor Gear');
      
      setSelectedCategory(categoryName);
      
      // Scroll to items section after a short delay to ensure DOM is ready
      setTimeout(() => {
        if (itemsSectionRef.current) {
          itemsSectionRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, [searchParams]);

  // Auto-scroll when category is selected
  useEffect(() => {
    if (selectedCategory && itemsSectionRef.current) {
      setTimeout(() => {
        itemsSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 150); // Small delay for animation
    }
  }, [selectedCategory]);

  const handleBorrowClick = (item: {id: number, item: string, owner: string}) => {
    if (item.owner === "You") {
      toast.error("You can&apos;t borrow your own item!", {
        position: 'top-right',
        icon: '🚫',
      });
      return;
    }
    
    setBorrowModal(item);
    setBorrowForm({
      name: "",
      email: "",
      phone: "",
      duration: "",
      reason: ""
    });
  };

  const handleBorrowFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBorrowForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBorrowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!borrowModal) return;
    
    // Find the item data to get emoji
    const itemData = sampleItems.find(item => item.id === borrowModal.id);
    
    // Add to borrowed items with full details
    const borrowedItem = {
      id: borrowModal.id,
      item: borrowModal.item,
      owner: borrowModal.owner,
      emoji: itemData?.emoji || "📦",
      borrowDate: new Date().toLocaleDateString(),
      duration: borrowForm.duration,
      reason: borrowForm.reason
    };
    
    addBorrowedItem(borrowedItem);
    
    // Close modal
    setBorrowModal(null);
    
    // Show success toast notification
    toast.success(
      `Successfully borrowed ${borrowModal.item} from ${borrowModal.owner}!`,
      {
        duration: 4000,
        position: 'top-right',
        icon: '🎉',
        style: {
          background: isDarkMode ? '#1f2937' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#1f2937',
          border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '500',
          padding: '16px',
          maxWidth: '400px',
        },
      }
    );
  };

  const closeBorrowModal = () => {
    setBorrowModal(null);
  };

  const handleCategorySelect = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      setSearchQuery(""); // Clear search when deselecting category
    } else {
      setSelectedCategory(categoryName);
      setSearchQuery(""); // Clear search when selecting new category
      
      // Scroll to items section
      setTimeout(() => {
        if (itemsSectionRef.current) {
          itemsSectionRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 150);
    }
  };

  return (
    <div className={`min-h-screen font-inter ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-neutral-800'
    }`}>
      {/* Toast Container */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#1f2937',
            border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: isDarkMode 
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />

      {/* Borrow Modal */}
      {borrowModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className={`rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            style={{
              boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4)",
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-semibold ${
                isDarkMode ? 'text-purple-300' : 'text-purple-700'
              }`}>
                Borrow {borrowModal.item}
              </h3>
              <button
                onClick={closeBorrowModal}
                className={`p-1 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className={`text-sm mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Send a borrow request to {borrowModal.owner}
            </p>

            <form onSubmit={handleBorrowSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={borrowForm.name}
                  onChange={handleBorrowFormChange}
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-300'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={borrowForm.email}
                  onChange={handleBorrowFormChange}
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-300'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={borrowForm.phone}
                  onChange={handleBorrowFormChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-300'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  How long do you need it? *
                </label>
                <select
                  name="duration"
                  value={borrowForm.duration}
                  onChange={handleBorrowFormChange}
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-300'
                  }`}
                >
                  <option value="">Select duration</option>
                  <option value="few-hours">A few hours</option>
                  <option value="1-day">1 day</option>
                  <option value="2-3-days">2-3 days</option>
                  <option value="1-week">1 week</option>
                  <option value="2-weeks">2 weeks</option>
                  <option value="1-month">1 month</option>
                  <option value="other">Other (specify in message)</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Message/Reason *
                </label>
                <textarea
                  name="reason"
                  value={borrowForm.reason}
                  onChange={handleBorrowFormChange}
                  required
                  rows={3}
                  placeholder="Why do you need this item? When would you like to pick it up?"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-400 placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-300 placeholder-gray-500'
                  }`}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeBorrowModal}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Borrow Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                onClick={() => handleCategorySelect(category.name)}
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

          {/* Items Section with ref for scrolling */}
          {selectedCategory && (
            <div 
              ref={itemsSectionRef}
              className={`mt-8 p-6 rounded-xl border scroll-mt-6 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600' 
                  : 'bg-purple-50 border-purple-200'
              }`}
            >
              <div className="text-center mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-700'
                }`}>
                  {selectedCategory} Items
                </h3>
                <p className={`text-sm mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Available items in the {selectedCategory.toLowerCase()} category
                </p>

                {/* Search Bar */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder={`Search within ${selectedCategory}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-400 placeholder-gray-400'
                          : 'bg-white text-gray-900 border-purple-300 focus:ring-purple-300 placeholder-gray-500'
                      }`}
                      style={{
                        paddingRight: searchQuery ? "40px" : "16px",
                      }}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-all duration-200 hover:scale-110 ${
                          isDarkMode 
                            ? 'text-gray-400 hover:text-white hover:bg-gray-600' 
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Search Results Info */}
                {searchQuery && (
                  <div className="text-center mb-4">
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {categoryItems.length === 0 
                        ? `No items found for "${searchQuery}" in ${selectedCategory}`
                        : `Found ${categoryItems.length} item${categoryItems.length !== 1 ? 's' : ''} for "${searchQuery}"`
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Items Grid */}
              {categoryItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryItems.map((item) => (
                    <div
                      key={`${item.id}-${item.owner}`}
                      className={`flex flex-col gap-2 p-4 border rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-500' 
                          : 'bg-white border-purple-100'
                      } ${item.isOwn ? 'ring-2 ring-purple-400' : ''}`}
                    >
                      {/* Badge */}
                      {item.isOwn ? (
                        <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                          Your Item
                        </div>
                      ) : isItemBorrowed(item.id) ? (
                        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          Borrowed
                        </div>
                      ) : null}

                      <div className="flex justify-between items-center">
                        <span className="text-lg">{item.emoji}</span>
                        <span className={`text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-neutral-800'
                        }`}>{item.item}</span>
                        <span className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-neutral-400'
                        }`}>— {item.owner}</span>
                      </div>

                      {/* Photo box */}
                      <div
                        className="rounded-lg h-24 w-full flex items-center justify-center text-xs"
                        style={{
                          backgroundColor: isDarkMode ? "#374151" : "#faf5ff",
                          color: isDarkMode ? "#c084fc" : "#a855f7",
                        }}
                      >
                        Photo Preview
                      </div>

                      {/* Distance and Actions */}
                      <div className="flex justify-between items-center mt-1">
                        <span className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                        }`}>
                          📍 {item.distance} away
                        </span>
                        
                        {!item.isOwn && (
                          <button
                            onClick={() => handleBorrowClick({
                              id: item.id,
                              item: item.item,
                              owner: item.owner
                            })}
                            disabled={isItemBorrowed(item.id)}
                            className={`text-white text-xs px-3 py-1 rounded-full transition-all duration-200 shadow-md hover:shadow-lg ${
                              isItemBorrowed(item.id)
                                ? 'bg-blue-600 cursor-not-allowed'
                                : 'bg-purple-600 hover:bg-purple-700'
                            }`}
                          >
                            {isItemBorrowed(item.id) ? 'Borrowed' : 'Borrow'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : selectedCategory && !searchQuery ? (
                // No items in category (without search)
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">📭</div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    No items in {selectedCategory}
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Be the first to list an item in this category!
                  </p>
                </div>
              ) : (
                // No search results
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">🔍</div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    No items found
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Try searching for something else in {selectedCategory}
                  </p>
                </div>
              )}
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

function LoadingCategories() {
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className={`min-h-screen font-inter flex items-center justify-center ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-neutral-800'
    }`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading categories...
        </p>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<LoadingCategories />}>
      <CategoriesContent />
    </Suspense>
  );
}