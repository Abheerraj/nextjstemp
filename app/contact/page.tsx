"use client";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-800 font-inter">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#f0f6ff" }}>
        <h1 className="text-3xl sm:text-4xl font-semibold mb-3 text-blue-700">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg max-w-xl mx-auto text-blue-900/70">
          Get in touch with us using the form below or through our contact details.
        </p>
      </section>
      
      {/* Low Fidelity Wireframe for Contact Form and Details */}
      <section className="p-8 max-w-4xl mx-auto">
        <div className="border border-dashed border-gray-400 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
          <div className="space-y-4">
            <div className="border border-dashed border-gray-300 p-4 text-center">
              [Name Input Placeholder]
            </div>
            <div className="border border-dashed border-gray-300 p-4 text-center">
              [Email Input Placeholder]
            </div>
            <div className="border border-dashed border-gray-300 p-4 text-center">
              [Message Input Placeholder]
            </div>
            <div className="border border-dashed border-gray-300 p-4 text-center">
              [Submit Button Placeholder]
            </div>
          </div>
        </div>
        <div className="border border-dashed border-gray-400 p-6">
          <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
          <p className="mb-2">Address: 1234 Lendly Street, Sharing City, Country</p>
          <p className="mb-2">Phone: (123) 456-7890</p>
          <p>Email: info@lendly.com</p>
        </div>
      </section>
    </div>
  );
}