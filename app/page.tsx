"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDarkMode } from "./context/DarkModeContext";
import { useListedItems } from "./context/ListedItemsContext";
import { useBorrowedItems } from "./context/BorrowedItemsContext";
import toast, { Toaster } from 'react-hot-toast';

// Define the borrowed item type
interface BorrowedItem {
  id: number;
  item: string;
  owner: string;
  emoji: string;
  borrowDate: string;
  duration: string;
  reason: string;
}

export default function Home() {
  const { isDarkMode } = useDarkMode();
  const { listedItems, removeItem } = useListedItems();
  const { borrowedItems, addBorrowedItem, removeBorrowedItem, isItemBorrowed } = useBorrowedItems();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [borrowModal, setBorrowModal] = useState<{id: number, item: string, owner: string} | null>(null);
  const [borrowForm, setBorrowForm] = useState({
    name: "",
    email: "",
    phone: "",
    duration: "",
    reason: ""
  });

  // Sample items data
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

  // Search and filter
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return allItems;
    
    return allItems.filter(item =>
      item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allItems, searchQuery]);

  // Limit display to first 8 items
  const displayItems = useMemo(() => filteredItems.slice(0, 8), [filteredItems]);

  // Memoize event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const handleCategoryClick = useCallback((category: string) => {
    // Navigate to categories page with the selected category
    const categoryParam = category.toLowerCase().replace(' & ', '-').replace(' ', '-');
    router.push(`/categories?category=${encodeURIComponent(categoryParam)}`);
  }, [router]);

  const handleUnlist = useCallback((id: number) => {
    removeItem(id);
    setConfirmDelete(null);
    toast.success("Item unlisted successfully!", {
      position: 'top-right',
      icon: '✅',
    });
  }, [removeItem]);

  const handleBorrowClick = useCallback((item: {id: number, item: string, owner: string}) => {
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
  }, []);

  const handleBorrowFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBorrowForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleBorrowSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!borrowModal) return;
    
    // Find the item data to get emoji
    const itemData = sampleItems.find(item => item.id === borrowModal.id);
    
    // Add to borrowed items with full details
    const borrowedItem: BorrowedItem = {
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
  }, [borrowModal, borrowForm, addBorrowedItem, isDarkMode, sampleItems]);

  const closeBorrowModal = useCallback(() => {
    setBorrowModal(null);
  }, []);

  const handleReturnClick = useCallback((borrowedItem: BorrowedItem) => {
    removeBorrowedItem(borrowedItem.id);
    toast.success(`Successfully returned ${borrowedItem.item} to ${borrowedItem.owner}!`, {
      position: 'top-right',
      icon: '↩️',
    });
  }, [removeBorrowedItem]);

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
          // Global toast options
          duration: 3000,
          style: {
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#1f2937',
            border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            padding: '12px 16px',
            boxShadow: isDarkMode 
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          // Success toasts (for borrowing)
          success: {
            style: {
              background: isDarkMode ? '#065f46' : '#ecfdf5',
              color: isDarkMode ? '#ffffff' : '#065f46',
              border: isDarkMode ? '1px solid #047857' : '1px solid #10b981',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            style: {
              background: isDarkMode ? '#7f1d1d' : '#fef2f2',
              color: isDarkMode ? '#ffffff' : '#7f1d1d',
              border: isDarkMode ? '1px solid #dc2626' : '1px solid #ef4444',
            },
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
          Your Community Marketplace
        </h1>
        <p className={`text-base sm:text-lg max-w-xl mx-auto ${
          isDarkMode ? 'text-purple-200' : 'text-blue-900/70'
        }`}>
          Borrow, lend, and share with your neighbors. Discover what&apos;s available near you.
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
                onClick={() => handleCategoryClick(cat)}
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
                onClick={() => handleCategoryClick(item.title)}
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

      {/* Available Items Section */}
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
            Available Items Near You
          </h2>

          {/* Search Section */}
          <div className="mb-8">
            <div className="relative max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Search for items, people, or categories..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl text-lg focus:outline-none focus:ring-4 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-white border-gray-600 focus:ring-purple-400/30 focus:border-purple-400 placeholder-gray-400'
                    : 'bg-white text-gray-900 border-purple-200 focus:ring-purple-200/50 focus:border-purple-400 placeholder-gray-500'
                }`}
                style={{
                  boxShadow: isDarkMode 
                    ? "0 10px 25px -5px rgba(139, 92, 246, 0.1)" 
                    : "0 10px 25px -5px rgba(139, 92, 246, 0.1)",
                }}
              />
              
              {/* Search Icon */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Clear Search Button */}
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors ${
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

            {/* Search Results Info */}
            {searchQuery && (
              <div className="mt-4 text-center">
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {filteredItems.length === 0 
                    ? `No items found for "${searchQuery}"`
                    : `Found ${filteredItems.length} item${filteredItems.length !== 1 ? 's' : ''} for "${searchQuery}"`
                  }
                  {filteredItems.length > 8 && " (showing first 8)"}
                </p>
              </div>
            )}
          </div>

          {displayItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayItems.map((item) => (
                <div
                  key={`${item.id}-${item.owner}`}
                  className={`flex flex-col gap-2 p-4 border rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600' 
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
                    
                    {item.isOwn ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => setConfirmDelete(item.id)}
                          className="text-white text-xs px-2 py-1 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                        >
                          Unlist
                        </button>
                      </div>
                    ) : (
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
          ) : searchQuery ? (
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
                Try searching for something else or browse categories above
              </p>
            </div>
          ) : (
            // No items available
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📦</div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                No items available yet
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Be the first to list an item in your community!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Borrowed Items Section */}
      {borrowedItems.length > 0 && (
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
              Your Borrowed Items
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {borrowedItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col gap-2 p-4 border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                    isDarkMode 
                      ? 'bg-gray-800 border-blue-500' 
                      : 'bg-white border-blue-200'
                  } ring-2 ring-blue-400`}
                >
                  {/* Borrowed Badge */}
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    Borrowed
                  </div>

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

                  {/* Borrowed Info */}
                  <div className="text-xs space-y-1">
                    <div className={`${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                      📅 Borrowed: {item.borrowDate}
                    </div>
                    <div className={`${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                      ⏰ Duration: {item.duration.replace('-', ' ')}
                    </div>
                  </div>

                  {/* Return Button */}
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={() => handleReturnClick(item)}
                      className="text-white text-xs px-3 py-1 bg-green-600 rounded-full hover:bg-green-700 transition-colors"
                    >
                      Return Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-xl max-w-md w-full mx-4 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-semibold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Confirm Unlist
            </h3>
            <p className={`text-sm mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Are you sure you want to unlist this item? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className={`flex-1 px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => handleUnlist(confirmDelete)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Unlist
              </button>
            </div>
          </div>
        </div>
      )}

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