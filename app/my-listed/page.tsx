"use client";

import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { useListedItems } from "../context/ListedItemsContext";

export default function MyListedPage() {
  const { isDarkMode } = useDarkMode();
  const { listedItems, removeItem } = useListedItems();
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const handleUnlist = (id: number) => {
    removeItem(id);
    setConfirmDelete(null);
  };

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
          My Listed Items
        </h1>
        <p className={`text-base sm:text-lg max-w-xl mx-auto ${
          isDarkMode ? 'text-purple-200' : 'text-blue-900/70'
        }`}>
          Manage your shared items
        </p>
      </section>

      <section className="px-6 py-10 max-w-6xl mx-auto">
        {listedItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className={`text-lg font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-neutral-700'
            }`}>
              You haven&apos;t listed any items yet
            </h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-neutral-500'
            }`}>
              Start sharing your items with the community
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listedItems.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col gap-3 p-4 border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600' 
                    : 'bg-white border-purple-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xl">{item.image}</span>
                  <span className={`text-base font-medium ${
                    isDarkMode ? 'text-white' : 'text-neutral-800'
                  }`}>{item.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    item.status === 'available' 
                      ? isDarkMode 
                        ? 'bg-green-900 text-green-400' 
                        : 'bg-green-100 text-green-600'
                      : isDarkMode
                        ? 'bg-blue-900 text-blue-400'
                        : 'bg-blue-100 text-blue-600'
                  }`}>
                    {item.status === 'available' ? 'Available' : 'Borrowed'}
                  </span>
                </div>

                <div
                  className="rounded-lg h-32 w-full flex items-center justify-center text-xs"
                  style={{
                    backgroundColor: isDarkMode ? "#374151" : "#faf5ff",
                    color: isDarkMode ? "#c084fc" : "#a855f7",
                  }}
                >
                  Photo Preview
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-neutral-500'
                  }`}>
                    Category: {item.category}
                  </span>
                  
                  {confirmDelete === item.id ? (
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleUnlist(item.id)}
                        className="text-white text-xs px-2 py-1 rounded-full bg-red-600 hover:bg-red-700 transition-all duration-200"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className={`text-xs px-2 py-1 rounded-full transition-all duration-200 ${
                          isDarkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(item.id)}
                      disabled={item.status === "borrowed"}
                      className={`text-xs px-3 py-1 rounded-full transition-all duration-200 ${
                        item.status === "borrowed"
                          ? isDarkMode
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                      title={item.status === "borrowed" ? "Cannot unlist borrowed items" : "Unlist item"}
                    >
                      Unlist
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}