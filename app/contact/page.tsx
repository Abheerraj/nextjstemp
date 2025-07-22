"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission logic here
    setSubmitted(true);
    // Reset form fields after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-800 font-inter">
      {/* Hero Section */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: "#f0f6ff" }}
      >
        <h1 className="text-3xl sm:text-4xl font-semibold mb-3 text-blue-700">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg max-w-xl mx-auto text-blue-900/70">
          Get in touch with us using the form below or through our contact
          details.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="p-8 max-w-4xl mx-auto">
        <div className="border border-dashed border-gray-400 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
          {submitted ? (
            <div className="p-4 bg-green-100 text-green-800 rounded">
              Form submitted successfully!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  rows={5}
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          )}
        </div>

        {/* Contact Details */}
        <div className="border border-dashed border-gray-400 p-6">
          <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
          <p className="mb-2">
            Address: 1234 Lendly Street, Sharing City, Country
          </p>
          <p className="mb-2">Phone: (123) 456-7890</p>
          <p>Email: info@lendly.com</p>
        </div>
      </section>
    </div>
  );
}