"use client";

import { useState } from "react";

export default function ListItemPage() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission logic (e.g., API call)
    setSubmitted(true);
    // Reset the form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setItemName("");
      setDescription("");
      setImageUrl("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-800 font-inter p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-blue-700 text-center">
        List Your Item
      </h1>
      <div className="max-w-xl mx-auto border border-gray-300 rounded shadow p-6">
        {submitted ? (
          <div className="p-4 bg-green-100 text-green-800 rounded text-center">
            Item listed successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium" htmlFor="itemName">
                Item Name
              </label>
              <input
                id="itemName"
                type="text"
                placeholder="Enter item name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter item description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="imageUrl">
                Image URL
              </label>
              <input
                id="imageUrl"
                type="url"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}