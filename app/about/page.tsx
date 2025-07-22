"use client";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-neutral-800 font-inter">
      {/* Hero Section with Similar Background */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: "#f0f6ff" }}
      >
        <h1 className="text-3xl sm:text-4xl font-semibold mb-3 text-blue-700">
          About Lendly
        </h1>
        <p className="text-base sm:text-lg max-w-xl mx-auto text-blue-900/70">
          Welcome to Lendly’s About page. Here we share our mission and vision —
          helping generous neighbors connect, share, and save.
        </p>
      </section>

      {/* Additional Content Section */}
      <section className="p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Our Journey</h2>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel
          scelerisque mauris, non egestas tellus. Praesent nec nibh ac leo
          faucibus dapibus. Donec vehicula nisl nec augue consequat, in
          pellentesque purus laoreet.
        </p>
        <p>
          Suspendisse potenti. Vivamus id risus neque. Nulla facilisi. Nam tempus
          eros sed velit ultrices, at faucibus tellus elementum. Learn more about
          how we connect communities and foster sharing.
        </p>
      </section>
    </div>
  );
}