"use client";

import { useDarkMode } from "../context/DarkModeContext";
import { useBorrowedItems } from "../context/BorrowedItemsContext";
import toast, { Toaster } from 'react-hot-toast';

export default function BorrowedPage() {
  const { isDarkMode } = useDarkMode();
  const { borrowedItems, removeBorrowedItem } = useBorrowedItems();

  const handleReturnItem = (id: number) => {
    const item = borrowedItems.find(item => item.id === id);
    removeBorrowedItem(id);
    
    toast.success(`${item?.item} returned to ${item?.owner}!`, {
      duration: 3000,
      position: 'top-right',
      style: {
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#1f2937',
        border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
      },
      iconTheme: {
        primary: '#10b981',
        secondary: '#ffffff',
      },
    });
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
        }}
      />

      <section
        className="py-20 px-6 text-center"
        style={{ 
          backgroundColor: isDarkMode ? "#1a1a1a" : "#f0f6ff" 
        }}
      >
        <h1 className={`text-3xl sm:text-4xl font-semibold mb-3 ${
          isDarkMode ? 'text-purple-300' : 'text-blue-700'
        }`}>
          Borrowed Items
        </h1>
        <p className={`text-base sm:text-lg max-w-xl mx-auto ${
          isDarkMode ? 'text-purple-200' : 'text-blue-900/70'
        }`}>
          Items you&apos;ve borrowed from the community
        </p>
      </section>

      {/* Borrowed Items Section */}
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
          {borrowedItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className={`text-lg font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                No borrowed items yet
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Start borrowing items from your community to see them here!
              </p>
            </div>
          ) : (
            <>
              <h2 className={`text-2xl font-semibold mb-8 text-center ${
                isDarkMode ? 'text-purple-300' : 'text-purple-700'
              }`}>
                Your Borrowed Items ({borrowedItems.length})
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {borrowedItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col gap-3 p-6 border rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl relative ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-600' 
                        : 'bg-white border-blue-200'
                    }`}
                    style={{
                      boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    {/* Borrowed Badge */}
                    <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      Borrowed
                    </div>

                    {/* Item Header */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1 mx-3">
                        <h3 className={`text-lg font-semibold ${
                          isDarkMode ? 'text-white' : 'text-neutral-800'
                        }`}>
                          {item.item}
                        </h3>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                        }`}>
                          from {item.owner}
                        </p>
                      </div>
                    </div>

                    {/* Photo box */}
                    <div
                      className="rounded-lg h-32 w-full flex items-center justify-center text-sm font-medium"
                      style={{
                        backgroundColor: isDarkMode ? "#374151" : "#f0f9ff",
                        color: isDarkMode ? "#60a5fa" : "#3b82f6",
                      }}
                    >
                      Borrowed Item
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                          Borrowed:
                        </span>
                        <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                          {item.borrowDate}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                          Duration:
                        </span>
                        <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                          {item.duration.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>

                      {item.reason && (
                        <div className="mt-3">
                          <p className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Reason:
                          </p>
                          <p className={`text-sm mt-1 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {item.reason}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Return button */}
                    <div className="flex justify-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={() => handleReturnItem(item.id)}
                        className="w-full text-white text-sm py-2 px-4 rounded-lg bg-green-600 hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                      >
                        Mark as Returned
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Background decorations */}
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