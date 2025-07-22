"use client";

import { useState } from "react";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg border-l border-gray-300 transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-40 flex flex-col`}
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <span className="font-bold">Chat</span>
        <button onClick={onClose} className="text-gray-600 font-bold">
          X
        </button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="mb-2 p-2 bg-blue-50 rounded text-sm text-gray-800"
          >
            {msg}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
}