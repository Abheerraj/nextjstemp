"use client";

import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

export default function Contact() {
  const { isDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
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
          Contact Us
        </h1>
        <p
          className={`text-base sm:text-lg max-w-xl mx-auto ${
            isDarkMode ? "text-purple-200" : "text-blue-900/70"
          }`}
        >
          We'd love to hear from you. Send us a message!
        </p>
      </section>

      {/* Contact Form */}
      <section className="px-6 py-10 max-w-4xl mx-auto">
        <div
          className="rounded-xl border shadow-2xl p-8 mb-8"
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
            Get in Touch
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-neutral-700"
                  }`}
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-4 ${
                    isDarkMode
                      ? "bg-gray-800 text-white border-gray-600 focus:ring-purple-400"
                      : "bg-white text-neutral-800 border-purple-200 focus:ring-purple-300"
                  }`}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-neutral-700"
                }`}
              >
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-4 ${
                  isDarkMode
                    ? "bg-gray-800 text-white border-gray-600 focus:ring-purple-400"
                    : "bg-white text-neutral-800 border-purple-200 focus:ring-purple-300"
                }`}
                required
                disabled={isSubmitting}
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="feedback">Feedback</option>
                <option value="partnership">Partnership</option>
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-neutral-700"
                }`}
              >
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-4 resize-none ${
                  isDarkMode
                    ? "bg-gray-800 text-white border-gray-600 focus:ring-purple-400"
                    : "bg-white text-neutral-800 border-purple-200 focus:ring-purple-300"
                }`}
                required
                disabled={isSubmitting}
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:cursor-not-allowed ${
                  isSuccess
                    ? "bg-green-600 text-white"
                    : isSubmitting
                    ? isDarkMode
                      ? "bg-gray-700 text-gray-400"
                      : "bg-gray-400 text-gray-600"
                    : isDarkMode
                    ? "bg-purple-700 hover:bg-purple-600 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {isSuccess ? (
                  <span className="flex items-center justify-center space-x-2">
                    <span>✓</span>
                    <span>Message Sent Successfully!</span>
                  </span>
                ) : isSubmitting ? (
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
                    <span>Sending...</span>
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
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
            Other Ways to Reach Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "📧",
                title: "Email",
                info: "hello@lendly.com",
              },
              {
                icon: "📱",
                title: "Phone",
                info: "+1 (555) 123-4567",
              },
              {
                icon: "📍",
                title: "Location",
                info: "San Francisco, CA",
              },
            ].map((contact, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-purple-50"
                }`}
              >
                <div className="text-4xl mb-4">{contact.icon}</div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? "text-white" : "text-neutral-800"
                  }`}
                >
                  {contact.title}
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-neutral-600"
                  }`}
                >
                  {contact.info}
                </p>
              </div>
            ))}
          </div>
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