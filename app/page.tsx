"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-800 font-inter">
      {/* Hero Section */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: "#f0f6ff" }}
      >
        <h1 className="text-3xl sm:text-4xl font-semibold mb-3 text-blue-700">
          Welcome to Lendly
        </h1>
        <p className="text-base sm:text-lg max-w-xl mx-auto text-blue-900/70">
          Share what you own, borrow what you need. Connect with your community
          to save money and reduce waste.
        </p>
      </section>

      {/* Categories Section */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <h2 className="text-lg font-medium mb-5 text-neutral-800">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-center text-xs">
          {[
            "Tools",
            "Electronics",
            "Outdoor Gear",
            "Games",
            "Kitchen",
            "Books",
            "Furniture",
            "Misc",
            "Sports",
            "Clothing",
            "Garden",
            "Art & Craft",
          ].map((cat) => (
            <div
              key={cat}
              className="p-3 bg-neutral-100 rounded-lg border border-neutral-200 hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition"
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold mb-6 text-blue-700">
          Recommended for you
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-4 flex flex-col gap-3">
            <span className="font-medium text-blue-600 mb-2">
              Outdoor Gear Picks
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-50 rounded-lg flex flex-col items-center justify-center p-3">
                <span className="text-2xl">⛺</span>
                <span className="text-xs mt-1 text-blue-700">Tent</span>
              </div>
              <div className="bg-blue-50 rounded-lg flex flex-col items-center justify-center p-3">
                <span className="text-2xl">🚲</span>
                <span className="text-xs mt-1 text-blue-700">Bike</span>
              </div>
            </div>
            <button className="mt-2 text-xs text-blue-500 hover:underline self-start">
              See more
            </button>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-4 flex flex-col gap-3">
            <span className="font-medium text-blue-600 mb-2">Top Tools</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-50 rounded-lg flex flex-col items-center justify-center p-3">
                <span className="text-2xl">🔧</span>
                <span className="text-xs mt-1 text-blue-700">Drill</span>
              </div>
              <div className="bg-blue-50 rounded-lg flex flex-col items-center justify-center p-3">
                <span className="text-2xl">🪜</span>
                <span className="text-xs mt-1 text-blue-700">Ladder</span>
              </div>
            </div>
            <button className="mt-2 text-xs text-blue-500 hover:underline self-start">
              See more
            </button>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-4 flex flex-col gap-3">
            <span className="font-medium text-blue-600 mb-2">Game Night</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-50 rounded-lg flex flex-col items-center justify-center p-3">
                <span className="text-2xl">🎲</span>
                <span className="text-xs mt-1 text-blue-700">Board Game</span>
              </div>
              <div className="bg-blue-50 rounded-lg flex flex-col items-center justify-center p-3">
                <span className="text-2xl">🎮</span>
                <span className="text-xs mt-1 text-blue-700">Console</span>
              </div>
            </div>
            <button className="mt-2 text-xs text-blue-500 hover:underline self-start">
              See more
            </button>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-4 flex flex-col gap-3">
            <span className="font-medium text-blue-600 mb-2">
              Kitchen & Books
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-50 rounded-lg flex flex-col items-center justify-center p-3">
                <span className="text-2xl">🍳</span>
                <span className="text-xs mt-1 text-blue-700">Blender</span>
              </div>
              <div className="bg-blue-50 rounded-lg flex flex-col items-center justify-center p-3">
                <span className="text-2xl">📚</span>
                <span className="text-xs mt-1 text-blue-700">Books</span>
              </div>
            </div>
            <button className="mt-2 text-xs text-blue-500 hover:underline self-start">
              See more
            </button>
          </div>
        </div>
      </section>

      {/* Search & Items */}
      <div className="px-6 py-10 max-w-6xl mx-auto flex flex-col items-center gap-10">
        {/* Search */}
        <input
          type="text"
          placeholder="Search to borrow..."
          className="border border-neutral-200 rounded-lg px-4 py-2 w-full max-w-2xl text-base bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
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
              className="flex flex-col gap-2 p-4 bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <span className="text-xl">{emoji}</span>
                <span className="text-base font-medium">{item}</span>
                <span className="text-xs text-neutral-400">— {owner}</span>
              </div>
              {/* Photo box */}
              <div className="bg-neutral-100 rounded-lg h-32 w-full flex items-center justify-center text-neutral-300 text-xs">
                Photo Preview
              </div>
              {/* Distance and Details */}
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-neutral-500">
                  📍 {distance} away
                </span>
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-full transition">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-16 py-5 text-center text-xs text-neutral-400 border-t border-neutral-200">
        Powered by Next.js · Built for generous neighbours 🤝
      </footer>

      {/* Global Background Blobs & Gradients */}
      <div className="fixed left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-100 via-pink-100 to-transparent opacity-40 -z-10" />
      <div className="fixed right-0 top-0 h-full w-2 bg-gradient-to-t from-green-100 via-blue-100 to-transparent opacity-40 -z-10" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-2xl opacity-40 -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-100 rounded-full blur-2xl opacity-30 -z-10" />
      <div className="absolute top-24 right-1/3 w-56 h-56 bg-yellow-100 rounded-full blur-2xl opacity-30 -z-10" />
      <div className="absolute bottom-24 left-1/4 w-40 h-40 bg-green-100 rounded-full blur-2xl opacity-30 -z-10" />
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-purple-100 rounded-full blur-2xl opacity-30 -z-10" />
    </div>
  );
}