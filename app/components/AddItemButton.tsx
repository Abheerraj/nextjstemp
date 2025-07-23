"use client";

import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { useListedItems } from "../context/ListedItemsContext";

export default function AddItemButton() {
  const { isDarkMode } = useDarkMode();
  const { addItem } = useListedItems();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    condition: "",
    url: "",
    pricePerDay: "",
  });

  const [errors, setErrors] = useState({
    url: "",
    pricePerDay: "",
  });

  const validateURL = (url: string) => {
    if (!url) return true; // URL is optional
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validatePrice = (price: string) => {
    if (!price) return false; // Price is required
    const numPrice = parseFloat(price);
    return !isNaN(numPrice) && numPrice >= 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ url: "", pricePerDay: "" });

    let hasErrors = false;

    // Validate URL if provided
    if (formData.url && !validateURL(formData.url)) {
      setErrors(prev => ({ ...prev, url: "Please enter a valid URL (e.g., https://example.com)" }));
      hasErrors = true;
    }

    // Validate price
    if (!validatePrice(formData.pricePerDay)) {
      setErrors(prev => ({ ...prev, pricePerDay: "Please enter a valid price (e.g., 5.00)" }));
      hasErrors = true;
    }

    if (hasErrors) return;

    if (formData.name && formData.category && formData.condition && formData.pricePerDay) {
      addItem({
        name: formData.name,
        category: formData.category,
        image: "📦", // Default emoji
        condition: formData.condition,
        url: formData.url,
        pricePerDay: parseFloat(formData.pricePerDay),
        status: "available",
      });
      setFormData({ name: "", category: "", condition: "", url: "", pricePerDay: "" });
      setErrors({ url: "", pricePerDay: "" });
      setIsModalOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (name === "url" && errors.url) {
      setErrors(prev => ({ ...prev, url: "" }));
    }
    if (name === "pricePerDay" && errors.pricePerDay) {
      setErrors(prev => ({ ...prev, pricePerDay: "" }));
    }
  };

  return (
    <>
      {/* Plus Button - positioned to not overlap with chat */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={`fixed bottom-6 right-24 w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
          isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
        }`}
        title="Add new item"
      >
        <span className="text-white text-2xl font-bold">+</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`p-6 border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex justify-between items-center">
                <h2 className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Add New Item
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`text-2xl ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Item Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Item Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-300'
                  }`}
                  placeholder="e.g., Power Drill"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-300'
                  }`}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Tools">Tools</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Outdoor Gear">Outdoor Gear</option>
                  <option value="Games">Games</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Books">Books</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Sports">Sports</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Garden">Garden</option>
                  <option value="Art & Craft">Art & Craft</option>
                  <option value="Misc">Misc</option>
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-300'
                  }`}
                  required
                >
                  <option value="">Select condition</option>
                  <option value="Like New">Like New</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

              {/* Price Per Day */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
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
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.pricePerDay 
                        ? 'border-red-500 focus:ring-red-400' 
                        : isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-400' 
                          : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-300'
                    }`}
                    placeholder="5.00"
                    required
                  />
                </div>
                {errors.pricePerDay && (
                  <p className="text-red-500 text-xs mt-1">{errors.pricePerDay}</p>
                )}
                <p className={`text-xs mt-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  How much you&apos;d like to charge per day for this item
                </p>
              </div>

              {/* URL (Optional) */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Product URL (Optional)
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.url 
                      ? 'border-red-500 focus:ring-red-400' 
                      : isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-300'
                  }`}
                  placeholder="https://example.com/product"
                />
                {errors.url && (
                  <p className="text-red-500 text-xs mt-1">{errors.url}</p>
                )}
                <p className={`text-xs mt-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Link to product page, manual, or more info (optional)
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData({ name: "", category: "", condition: "", url: "", pricePerDay: "" });
                    setErrors({ url: "", pricePerDay: "" });
                  }}
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
                  className={`flex-1 px-4 py-2 rounded-lg font-medium text-white transition-colors ${
                    isDarkMode 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-purple-500 hover:bg-purple-600'
                  }`}
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}