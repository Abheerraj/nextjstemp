"use client";

import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

export default function AccountPage() {
  const { isDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Friendly neighbor who loves sharing and helping the community!",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Account updated:", formData);
      setIsSubmitting(false);
      setIsEditing(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          Account Settings
        </h1>
        <p className={`text-base sm:text-lg max-w-xl mx-auto ${
          isDarkMode ? 'text-purple-200' : 'text-blue-900/70'
        }`}>
          Manage your profile and account preferences
        </p>
      </section>

      {/* Account Form */}
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
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-2xl font-semibold ${
              isDarkMode ? 'text-purple-300' : 'text-purple-700'
            }`}>
              Profile Information
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-neutral-700'
                }`}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-4 ${
                    !isEditing 
                      ? isDarkMode
                        ? 'bg-gray-800 text-gray-400 border-gray-700'
                        : 'bg-gray-100 text-gray-600 border-gray-300'
                      : isDarkMode 
                        ? 'bg-gray-800 text-white border-gray-600 focus:ring-purple-400' 
                        : 'bg-white text-neutral-800 border-purple-200 focus:ring-purple-300'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-neutral-700'
                }`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-4 ${
                    !isEditing 
                      ? isDarkMode
                        ? 'bg-gray-800 text-gray-400 border-gray-700'
                        : 'bg-gray-100 text-gray-600 border-gray-300'
                      : isDarkMode 
                        ? 'bg-gray-800 text-white border-gray-600 focus:ring-purple-400' 
                        : 'bg-white text-neutral-800 border-purple-200 focus:ring-purple-300'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-neutral-700'
                }`}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-4 ${
                    !isEditing 
                      ? isDarkMode
                        ? 'bg-gray-800 text-gray-400 border-gray-700'
                        : 'bg-gray-100 text-gray-600 border-gray-300'
                      : isDarkMode 
                        ? 'bg-gray-800 text-white border-gray-600 focus:ring-purple-400' 
                        : 'bg-white text-neutral-800 border-purple-200 focus:ring-purple-300'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-neutral-700'
                }`}>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-4 ${
                    !isEditing 
                      ? isDarkMode
                        ? 'bg-gray-800 text-gray-400 border-gray-700'
                        : 'bg-gray-100 text-gray-600 border-gray-300'
                      : isDarkMode 
                        ? 'bg-gray-800 text-white border-gray-600 focus:ring-purple-400' 
                        : 'bg-white text-neutral-800 border-purple-200 focus:ring-purple-300'
                  }`}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-neutral-700'
              }`}>
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-4 resize-none ${
                  !isEditing 
                    ? isDarkMode
                      ? 'bg-gray-800 text-gray-400 border-gray-700'
                      : 'bg-gray-100 text-gray-600 border-gray-300'
                    : isDarkMode 
                      ? 'bg-gray-800 text-white border-gray-600 focus:ring-purple-400' 
                      : 'bg-white text-neutral-800 border-purple-200 focus:ring-purple-300'
                }`}
              ></textarea>
            </div>

            {isEditing && (
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 border ${
                    isDarkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-neutral-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:cursor-not-allowed ${
                    isSubmitting
                      ? isDarkMode
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-400 text-gray-600'
                      : isDarkMode
                      ? 'bg-purple-700 hover:bg-purple-600 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
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