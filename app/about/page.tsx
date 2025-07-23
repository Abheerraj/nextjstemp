"use client";

import { useDarkMode } from "../context/DarkModeContext";

export default function AboutPage() {
  const { isDarkMode } = useDarkMode();

  const features = [
    {
      icon: "🤝",
      title: "Community Driven",
      description: "Connect with neighbors and build stronger communities through sharing"
    },
    {
      icon: "💰",
      title: "Save Money",
      description: "Access items you need without the cost of purchasing everything new"
    },
    {
      icon: "🌍",
      title: "Reduce Waste",
      description: "Help the environment by sharing resources and reducing consumption"
    },
    {
      icon: "🔒",
      title: "Safe & Secure",
      description: "Built-in safety features and community ratings for peace of mind"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Items Shared" },
    { number: "5,000+", label: "Community Members" },
    { number: "2,500+", label: "Successful Borrows" },
    { number: "95%", label: "Satisfaction Rate" }
  ];

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
        <p className={`text-base sm:text-lg max-w-2xl mx-auto ${
          isDarkMode ? 'text-purple-200' : 'text-blue-900/70'
        }`}>
          We&apos;re building a world where communities thrive through sharing, where neighbors help neighbors, and where access matters more than ownership.
        </p>
      </section>

      {/* Mission Section */}
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
          <div className="text-center mb-12">
            <h2 className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? 'text-purple-300' : 'text-purple-700'
            }`}>
              Our Mission
            </h2>
            <p className={`text-lg leading-relaxed max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Lendly empowers communities to share resources, reduce waste, and build meaningful connections. 
              We believe that by sharing what we have, we can create a more sustainable and connected world 
              where everyone has access to the tools and items they need.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600 hover:border-purple-500' 
                    : 'bg-white border-purple-200 hover:border-purple-300'
                }`}
                style={{
                  boxShadow: "0 10px 15px -3px rgba(139, 92, 246, 0.1)",
                }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className={`rounded-xl p-8 ${
            isDarkMode ? 'bg-gray-800' : 'bg-purple-50'
          }`}>
            <h3 className={`text-xl font-semibold text-center mb-8 ${
              isDarkMode ? 'text-purple-300' : 'text-purple-700'
            }`}>
              Community Impact
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl lg:text-3xl font-bold mb-1 ${
                    isDarkMode ? 'text-white' : 'text-purple-700'
                  }`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
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
      <div className={`absolute top-0 left-0 w-64 h-64 rounded-full blur-2xl opacity-40 -z-10 ${
        isDarkMode ? 'bg-purple-900' : 'bg-blue-100'
      }`} />
      <div className={`absolute bottom-0 right-0 w-72 h-72 rounded-full blur-2xl opacity-30 -z-10 ${
        isDarkMode ? 'bg-purple-800' : 'bg-pink-100'
      }`} />
    </div>
  );
}