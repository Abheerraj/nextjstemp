"use client";

import { useDarkMode } from "../context/DarkModeContext";

export default function About() {
  const { isDarkMode } = useDarkMode();

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
          About Lendly
        </h1>
        <p className={`text-base sm:text-lg max-w-xl mx-auto ${
          isDarkMode ? 'text-purple-200' : 'text-blue-900/70'
        }`}>
          Building stronger communities through sharing
        </p>
      </section>

      {/* Main Content */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
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
          <h2 className={`text-2xl font-semibold mb-6 text-center ${
            isDarkMode ? 'text-purple-300' : 'text-purple-700'
          }`}>
            Our Mission
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className={`text-lg mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-neutral-700'
              }`}>
                Lendly connects neighbors and communities through the simple act of sharing. We believe that by lending and borrowing everyday items, we can reduce waste, save money, and build stronger relationships with those around us.
              </p>
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-neutral-700'
              }`}>
                From power tools to party supplies, camping gear to kitchen appliances - there's always something someone in your community has that you need, and vice versa.
              </p>
            </div>
            <div className={`text-6xl text-center ${
              isDarkMode ? 'text-purple-300' : 'text-purple-600'
            }`}>
              🤝
            </div>
          </div>
        </div>

        {/* Values Section */}
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
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🌍",
                title: "Sustainability",
                description: "Reduce waste by sharing resources and extending the life of items through community use."
              },
              {
                icon: "💝",
                title: "Community",
                description: "Foster connections between neighbors and build trust through shared experiences."
              },
              {
                icon: "💰",
                title: "Affordability",
                description: "Help everyone access what they need without the financial burden of purchasing."
              }
            ].map((value, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-purple-50'
                }`}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-neutral-800'
                }`}>
                  {value.title}
                </h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-neutral-600'
                }`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
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