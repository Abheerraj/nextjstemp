"use client";

import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { useListedItems } from "../context/ListedItemsContext";
import { useRouter } from "next/navigation";

export default function ListItemPage() {
  const { isDarkMode } = useDarkMode();
  const { addItem } = useListedItems();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    condition: "",
    availability: "",
    imageUrl: "",
    pricePerDay: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Category to emoji mapping
  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      tools: "🔧",
      electronics: "📷",
      outdoor: "⛺",
      games: "🎲",
      kitchen: "🍳",
      books: "📚",
      furniture: "🪑",
      sports: "⚽",
      clothing: "👕",
      garden: "🌱",
      art: "🎨",
      misc: "📦",
    };
    return emojiMap[category] || "📦";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      // Add item to the context - only pass fields that exist in ListedItem interface
      addItem({
        name: formData.itemName,
        category: formData.category.charAt(0).toUpperCase() + formData.category.slice(1),
        condition: formData.condition.charAt(0).toUpperCase() + formData.condition.slice(1),
        image: getCategoryEmoji(formData.category),
        url: formData.imageUrl, // Map imageUrl to url
        pricePerDay: parseFloat(formData.pricePerDay) || 0,
        status: "available",
      });

      console.log("Item listed:", formData);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form
      setFormData({
        itemName: "",
        description: "",
        category: "",
        condition: "",
        availability: "",
        imageUrl: "",
        pricePerDay: "",
      });

      // Reset success state and redirect after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        router.push("/my-listed");
      }, 3000);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={`min-h-screen font-inter ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-neutral-800"
      }`}
    >
      {/* Hero Section */}
      <section
        className="py-20 px-6 text-center"
        style={{
          backgroundColor: isDarkMode ? "#1a1a1a" : "#f0f6ff",
        }}
      >
        <h1
          className={`text-3xl sm:text-4xl font-semibold mb-3 ${
            isDarkMode ? "text-purple-300" : "text-blue-700"
          }`}
        >
          List Your Item
        </h1>
        <p
          className={`text-base sm:text-lg max-w-xl mx-auto ${
            isDarkMode ? "text-purple-200" : "text-blue-900/70"
          }`}
        >
          Share what you own with your community and help others save money
        </p>
      </section>

      {/* Form Section */}
      <section className="px-6 py-10 max-w-4xl mx-auto">
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
            className={`text-2xl font-semibold mb-8 text-center ${
              isDarkMode ? "text-purple-300" : "text-purple-700"
            }`}
          >
            Item Details
          </h2>

          {isSuccess ? (
            <div
              className={`p-6 rounded-lg text-center ${
                isDarkMode
                  ? "bg-green-900 text-green-200"
                  : "bg-green-100 text-green-800"
              }`}
            >
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-lg font-semibold mb-2">
                Item Listed Successfully!
              </h3>
              <p className="text-sm mb-4">
                Your item is now available for borrowing in your community.
              </p>
              <p className="text-xs opacity-80">
                Redirecting to your listed items...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-neutral-700"
                    }`}
                  >
                    Item Name *
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    placeholder="e.g., Power Drill, Camping Tent"
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-4 ${
                      isDarkMode
                        ? "bg-gray-800 text-white border-gray-600 focus:ring-purple-400"
                        : "bg-white text-neutral-800 border-purple-200 focus:ring-purple-300"
                    }`}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-neutral-700"
                    }`}
                  >
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-4 ${
                      isDarkMode
                        ? "bg-gray-800 text-white border-gray-600 focus:ring-purple-400"
                        : "bg-white text-neutral-800 border-purple-200 focus:ring-purple-300"
                    }`}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select a category</option>
                    <option value="tools">Tools</option>
                    <option value="electronics">Electronics</option>
                    <option value="outdoor">Outdoor Gear</option>
                    <option value="games">Games</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="books">Books</option>
                    <option value="furniture">Furniture</option>
                    <option value="sports">Sports</option>
                    <option value="clothing">Clothing</option>
                    <option value="garden">Garden</option>
                    <option value="art">Art & Craft</option>
                    <option value="misc">Miscellaneous</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-neutral-700"
                    }`}
                  >
                    Condition *
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-4 ${
                      isDarkMode
                        ? "bg-gray-800 text-white border-gray-600 focus:ring-purple-400"
                        : "bg-white text-neutral-800 border-purple-200 focus:ring-purple-300"
                    }`}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select condition</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="needs-repair">Needs Repair</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-neutral-700"
                    }`}
                  >
                    Price Per Day *
                  </label>
                  <div className="relative">
                    <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      $
                    </span>
                    <input
                      type="number"
                      name="pricePerDay"
                      value={formData.pricePerDay}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className={`w-full pl-8 pr-3 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-4 ${
                        isDarkMode
                          ? "bg-gray-800 text-white border-gray-600 focus:ring-purple-400"
                          : "bg-white text-neutral-800 border-purple-200 focus:ring-purple-300"
                      }`}
                      placeholder="5.00"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-neutral-700"
                  }`}
                >
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your item, its features, and any special instructions..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-4 resize-none ${
                    isDarkMode
                      ? "bg-gray-800 text-white border-gray-600 focus:ring-purple-400"
                      : "bg-white text-neutral-800 border-purple-200 focus:ring-purple-300"
                  }`}
                  disabled={isSubmitting}
                ></textarea>
                <p className={`text-xs mt-1 ${
                  isDarkMode ? "text-gray-400" : "text-neutral-500"
                }`}>
                  Optional: Add more details about your item
                </p>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-neutral-700"
                  }`}
                >
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/your-item-photo.jpg"
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-4 ${
                    isDarkMode
                      ? "bg-gray-800 text-white border-gray-600 focus:ring-purple-400"
                      : "bg-white text-neutral-800 border-purple-200 focus:ring-purple-300"
                  }`}
                  disabled={isSubmitting}
                />
                <p
                  className={`text-xs mt-1 ${
                    isDarkMode ? "text-gray-400" : "text-neutral-500"
                  }`}
                >
                  Optional: Upload your image to a service like Imgur or use a direct image URL
                </p>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:cursor-not-allowed ${
                    isSubmitting
                      ? isDarkMode
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gray-400 text-gray-600"
                      : isDarkMode
                      ? "bg-purple-700 hover:bg-purple-600 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Listing Item...</span>
                    </span>
                  ) : (
                    "List My Item"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Background Elements */}
      <div
        className={`fixed left-0 top-0 h-full w-2 opacity-40 -z-10 ${
          isDarkMode
            ? "bg-gradient-to-b from-purple-900 via-purple-800 to-transparent"
            : "bg-gradient-to-b from-blue-100 via-pink-100 to-transparent"
        }`}
      />
      <div
        className={`fixed right-0 top-0 h-full w-2 opacity-40 -z-10 ${
          isDarkMode
            ? "bg-gradient-to-t from-purple-900 via-purple-800 to-transparent"
            : "bg-gradient-to-t from-green-100 via-blue-100 to-transparent"
        }`}
      />
    </div>
  );
}