"use client";

import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const { isDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [callNotify, setCallNotify] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear any previous errors
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Try a more compatible approach for GitHub Pages
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      };

      console.log('Sending email with params:', templateParams);

      // Use emailjs.sendForm instead of emailjs.send
      const result = await emailjs.send(
        'service_3mydifu',
        'template_ou93sea',
        templateParams,
        'qXjCxUZXyfLqAT2PO'
      );

      console.log('SUCCESS!', result.status, result.text);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
      
    } catch (error) {
      console.error('FAILED...', error);
      console.error('Error details:', error);
      
      // Properly handle the error type without using 'any'
      let errorMessage = 'Unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'text' in error) {
        errorMessage = (error as {text: string}).text;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as {message: string}).message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      setError(`Failed to send message: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Call button handler
  const handleCallClick = () => {
    setCallNotify(true);
    setTimeout(() => setCallNotify(false), 3500);
  };

  return (
    <div className={`min-h-screen font-inter ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-neutral-800'}`}>
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
          Contact Us
        </h1>
        <p className={`text-base sm:text-lg max-w-xl mx-auto ${
          isDarkMode ? 'text-purple-200' : 'text-blue-900/70'
        }`}>
          Have questions? Need help? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
        </p>
      </section>

      <div className="px-6 py-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
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
            <h2 className={`text-2xl font-semibold mb-6 ${
              isDarkMode ? 'text-purple-300' : 'text-purple-700'
            }`}>
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Name *
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
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-300'
                    }`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-300'
                  }`}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="report">Report an Issue</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-300'
                  }`}
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">
                  {error}
                </div>
              )}

              {isSuccess && (
                <div className="text-green-500 text-sm mt-2">
                  Message sent successfully! We&apos;ll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Phone Contact */}
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
            <h2 className={`text-2xl font-semibold mb-6 ${
              isDarkMode ? 'text-purple-300' : 'text-purple-700'
            }`}>
              Call Us Directly
            </h2>

            <div
              className={`p-6 rounded-lg border transition-all duration-300 hover:scale-105 cursor-pointer ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 hover:border-purple-500' 
                  : 'bg-white border-purple-200 hover:border-purple-300'
              }`}
              style={{
                boxShadow: "0 4px 6px -1px rgba(139, 92, 246, 0.1)",
              }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">📞</div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Phone Support
                </h3>
                <p className={`text-sm mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Speak directly with our support team
                </p>
                <div className={`text-2xl font-bold mb-4 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  +1 (555) 123-4567
                </div>
                <button
                  type="button"
                  onClick={handleCallClick}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  Call Now
                </button>
              </div>
            </div>

            {/* Response Time */}
            <div className={`mt-6 p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-purple-50'
            }`}>
              <div className="text-center">
                <h4 className={`font-semibold mb-2 ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-700'
                }`}>
                  ⏰ Availability
                </h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday: 10:00 AM - 4:00 PM EST<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {callNotify && (
        <div className="fixed top-6 right-6 z-50 bg-purple-700 text-white px-6 py-4 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
          Calling Lendly Support<br />
          <span className="text-xs opacity-80">(This is a MOCK website, nothing is really happening)</span>
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
    </div>
  );
}