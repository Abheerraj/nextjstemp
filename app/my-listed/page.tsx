"use client";

import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { useListedItems } from "../context/ListedItemsContext";
import Link from "next/link";

export default function MyListedPage() {
  const { isDarkMode } = useDarkMode();
  const { listedItems } = useListedItems();
  const [activeTab, setActiveTab] = useState("active");

  const getFilteredItems = () => {
    switch (activeTab) {
      case "available":
        return listedItems.filter(item => item.status === "available");
      case "borrowed":
        return listedItems.filter(item => item.status === "borrowed");
      default:
        return listedItems;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return isDarkMode ? "text-green-400" : "text-green-600";
      case "borrowed":
        return isDarkMode ? "text-blue-400" : "text-blue-600";
      default:
        return isDarkMode ? "text-gray-400" : "text-gray-600";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "available":
        return isDarkMode ? "bg-green-900" : "bg-green-100";
      case "borrowed":
        return isDarkMode ? "bg-blue-900" : "bg-blue-100";
      default:
        return isDarkMode ? "bg-gray-800" : "bg-gray-100";
    }
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
          My Listed Items
        </h1>
        <p className={`text-base sm:text-lg max-w-xl mx-auto ${
          isDarkMode ? 'text-purple-200' : 'text-blue-900/70'
        }`}>
          Manage the items you've shared with your community
        </p>
      </section>

      {/* Listed Items */}
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
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h2 className={`text-2xl font-semibold ${
              isDarkMode ? 'text-purple-300' : 'text-purple-700'
            }`}>
              Your Items
            </h2>
            <Link
              href="/listitem"
              className={`mt-4 sm:mt-0 px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              + List New Item
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-1 mb-6">
            {[
              { key: "active", label: "All Items", count: listedItems.length },
              { key: "available", label: "Available", count: listedItems.filter(i => i.status === "available").length },
              { key: "borrowed", label: "Borrowed", count: listedItems.filter(i => i.status === "borrowed").length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? isDarkMode
                      ? 'bg-purple-700 text-white'
                      : 'bg-purple-600 text-white'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-neutral-600 hover:text-neutral-800 hover:bg-purple-50'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {getFilteredItems().length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className={`text-lg font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-neutral-700'
              }`}>
                No items found
              </h3>
              <p className={`text-sm mb-4 ${
                isDarkMode ? 'text-gray-400' : 'text-neutral-500'
              }`}>
                {activeTab === "active" 
                  ? "You haven't listed any items yet." 
                  : `No ${activeTab} items at the moment.`}
              </p>
              {activeTab === "active" && (
                <Link
                  href="/listitem"
                  className={`inline-block px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  List Your First Item
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredItems().map((item) => (
                <div
                  key={item.id}
                  className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 hover:border-purple-500' 
                      : 'bg-white border-purple-200 hover:border-purple-300'
                  }`}
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{item.image}</div>
                    <h3 className={`text-lg font-semibold mb-1 ${
                      isDarkMode ? 'text-white' : 'text-neutral-800'
                    }`}>
                      {item.name}
                    </h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-neutral-600'
                    }`}>
                      {item.category} • {item.condition}
                    </p>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                      }`}>
                        Status:
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        getStatusColor(item.status)
                      } ${getStatusBg(item.status)}`}>
                        {item.status === 'available' ? 'Available' : 'Borrowed'}
                      </span>
                    </div>

                    {item.status === "borrowed" && (
                      <div className="flex justify-between items-center">
                        <span className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                        }`}>
                          Borrowed by:
                        </span>
                        <span className={`text-xs font-medium ${
                          isDarkMode ? 'text-white' : 'text-neutral-800'
                        }`}>
                          {item.borrowedBy}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                      }`}>
                        Created:
                      </span>
                      <span className={`text-xs font-medium ${
                        isDarkMode ? 'text-white' : 'text-neutral-800'
                      }`}>
                        {new Date(item.dateCreated).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                      }`}>
                        Views:
                      </span>
                      <span className={`text-xs font-medium ${
                        isDarkMode ? 'text-white' : 'text-neutral-800'
                      }`}>
                        {item.views}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                      }`}>
                        Requests:
                      </span>
                      <span className={`text-xs font-medium ${
                        isDarkMode ? 'text-white' : 'text-neutral-800'
                      }`}>
                        {item.requests}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isDarkMode 
                          ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                    >
                      View Details
                    </button>
                    <button
                      className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 border ${
                        isDarkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                          : 'border-gray-300 text-neutral-700 hover:bg-gray-50'
                      }`}
                    >
                      Edit Item
                    </button>
                  </div>
                </div>
              ))}
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
    </div>
  );
}