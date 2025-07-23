"use client";

import { useDarkMode } from "../context/DarkModeContext";

export default function BorrowedPage() {
  const { isDarkMode } = useDarkMode();

  const borrowedItems = [
    {
      id: 1,
      name: "Power Drill",
      owner: "John Smith",
      borrowedDate: "2024-07-15",
      dueDate: "2024-07-25",
      status: "active",
      image: "🔧",
      ownerRating: 4.8,
    },
    {
      id: 2,
      name: "Camping Tent",
      owner: "Sarah Johnson",
      borrowedDate: "2024-07-20",
      dueDate: "2024-07-30",
      status: "active",
      image: "⛺",
      ownerRating: 4.9,
    },
    {
      id: 3,
      name: "Garden Ladder",
      owner: "Mike Wilson",
      borrowedDate: "2024-07-10",
      dueDate: "2024-07-20",
      status: "overdue",
      image: "🪜",
      ownerRating: 4.7,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return isDarkMode ? "text-green-400" : "text-green-600";
      case "overdue":
        return isDarkMode ? "text-red-400" : "text-red-600";
      default:
        return isDarkMode ? "text-gray-400" : "text-gray-600";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "active":
        return isDarkMode ? "bg-green-900" : "bg-green-100";
      case "overdue":
        return isDarkMode ? "bg-red-900" : "bg-red-100";
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
          Currently Borrowing
        </h1>
        <p className={`text-base sm:text-lg max-w-xl mx-auto ${
          isDarkMode ? 'text-purple-200' : 'text-blue-900/70'
        }`}>
          Keep track of the items you're currently borrowing from your community
        </p>
      </section>

      {/* Borrowed Items */}
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
            Your Borrowed Items
          </h2>

          {borrowedItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className={`text-lg font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-neutral-700'
              }`}>
                No items currently borrowed
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-neutral-500'
              }`}>
                Start browsing categories to find items you need!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {borrowedItems.map((item) => (
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
                      Borrowed from {item.owner}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                      }`}>
                        Borrowed:
                      </span>
                      <span className={`text-xs font-medium ${
                        isDarkMode ? 'text-white' : 'text-neutral-800'
                      }`}>
                        {new Date(item.borrowedDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                      }`}>
                        Due Date:
                      </span>
                      <span className={`text-xs font-medium ${
                        isDarkMode ? 'text-white' : 'text-neutral-800'
                      }`}>
                        {new Date(item.dueDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                      }`}>
                        Status:
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        getStatusColor(item.status)
                      } ${getStatusBg(item.status)}`}>
                        {item.status === 'active' ? 'Active' : 'Overdue'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                      }`}>
                        Owner Rating:
                      </span>
                      <span className={`text-xs font-medium ${
                        isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                      }`}>
                        ⭐ {item.ownerRating}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <button
                      className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isDarkMode 
                          ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                    >
                      Contact Owner
                    </button>
                    <button
                      className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 border ${
                        isDarkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                          : 'border-gray-300 text-neutral-700 hover:bg-gray-50'
                      }`}
                    >
                      Return Item
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