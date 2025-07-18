import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-12 py-6 shadow-md bg-gray-50">
        <div className="text-2xl font-bold tracking-tight">Lendly</div>
        <div className="flex gap-8 text-sm font-medium">
          <button className="hover:text-blue-600 transition">Home</button>
          <button className="hover:text-blue-600 transition">Categories</button>
          <button className="hover:text-blue-600 transition">About</button>
          <button className="hover:text-blue-600 transition">How it Works</button>
          <button className="hover:text-blue-600 transition">Contact</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-blue-50 py-20 px-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Lendly</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Share what you own, borrow what you need. Connect with your community to save money and reduce waste. 🌍
        </p>
      </section>

      {/* Categories */}
      <section className="px-12 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-sm">
          {["Tools", "Electronics", "Outdoor Gear", "Games", "Kitchen", "Books", "Furniture", "Misc"].map((cat) => (
            <div key={cat} className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer shadow-sm transition">
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* Search & Items */}
      <div className="px-12 py-12 max-w-6xl mx-auto flex flex-col items-center gap-12">
        {/* Search */}
        <input
          type="text"
          placeholder="Search to borrow..."
          className="border border-gray-300 rounded-lg px-5 py-3 w-full max-w-2xl text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {[
            { emoji: "🔧", item: "Drill", owner: "John", distance: "300m" },
            { emoji: "🚲", item: "Bike", owner: "Alice", distance: "1.2km" },
            { emoji: "🪜", item: "Ladder", owner: "Mike", distance: "600m" },
            { emoji: "⛺", item: "Tent", owner: "Sarah", distance: "950m" },
            { emoji: "📷", item: "Camera", owner: "Leo", distance: "2km" },
            { emoji: "🎲", item: "Board Game", owner: "Alex", distance: "850m" },
          ].map(({ emoji, item, owner, distance }) => (
            <div
              key={item}
              className="flex flex-col gap-3 p-5 bg-gray-100 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <span className="text-2xl">{emoji}</span>
                <span className="text-lg font-semibold">{item}</span>
                <span className="text-sm text-gray-500">— {owner}</span>
              </div>

              {/* Photo box */}
              <div className="bg-gray-200 rounded-lg h-40 w-full flex items-center justify-center text-gray-500">
                Photo Preview
              </div>

              {/* Distance and Details button */}
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">📍 {distance} away</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 mt-20 py-6 text-center text-sm text-gray-500 border-t">
        Powered by Next.js · Built for generous neighbours 🤝
      </footer>
    </div>
  );
}
