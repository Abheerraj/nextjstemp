"use client";

import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const { isDarkMode } = useDarkMode();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! I&apos;m here to help you with Lendly. What can I assist you with today?";
    } else if (lowerMessage.includes("how") && lowerMessage.includes("work")) {
      return "Lendly connects neighbors to share items! You can list items you own or browse what others are sharing. It&apos;s a great way to save money and reduce waste.";
    } else if (lowerMessage.includes("list") || lowerMessage.includes("add")) {
      return "To list an item, click the &apos;+&apos; button in the navigation or go to the List Item page. Fill out the details and your item will be available for others to borrow!";
    } else if (lowerMessage.includes("borrow") || lowerMessage.includes("find")) {
      return "You can browse items by category or search for specific things you need. When you find something, you can contact the owner to arrange borrowing it.";
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("help")) {
      return "You can reach out through our Contact page or use this chat for quick questions. I&apos;m here to help with any Lendly-related questions!";
    } else if (lowerMessage.includes("account") || lowerMessage.includes("profile")) {
      return "You can manage your account settings, update your profile, and view your activity in the Account section from the profile dropdown.";
    } else if (lowerMessage.includes("dark") || lowerMessage.includes("theme")) {
      return "You can switch between light and dark mode using the Appearance settings in your profile dropdown. The theme will be saved for your next visit!";
    } else {
      return "I&apos;m here to help with Lendly! You can ask me about how the platform works, listing items, borrowing, or managing your account. What would you like to know?";
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = input.trim();
      const newUserMessage: Message = {
        text: userMessage,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      setInput("");
      setIsTyping(true);
      
      // Simulate bot thinking time
      setTimeout(() => {
        const botResponse: Message = {
          text: getBotResponse(userMessage),
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
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
      className={`fixed top-0 right-0 h-full w-80 shadow-2xl border-l transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-40 flex flex-col ${
        isDarkMode
          ? "bg-gray-800 border-gray-600"
          : "bg-white border-gray-300"
      }`}
      style={{
        boxShadow: isDarkMode
          ? "0 25px 50px -12px rgba(139, 92, 246, 0.4)"
          : "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
      }}
    >
      {/* Header */}
      <div
        className={`p-4 border-b flex justify-between items-center ${
          isDarkMode ? "border-gray-600" : "border-gray-200"
        }`}
        style={{
          background: isDarkMode
            ? "linear-gradient(135deg, #1a1a1a 0%, #4c1d95 50%, #000000 100%)"
            : "linear-gradient(135deg, #f8f5ff 0%, #e0d4ff 50%, #f0f6ff 100%)",
        }}
      >
        <div className="flex items-center space-x-2">
          <div className="text-2xl">🤖</div>
          <div>
            <span
              className={`font-bold text-lg ${
                isDarkMode ? "text-white" : "text-purple-700"
              }`}
            >
              Lendly Helper
            </span>
            <div className={`text-xs ${
              isDarkMode ? "text-gray-300" : "text-purple-600"
            }`}>
              Online • Ready to help
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
            isDarkMode
              ? "text-white hover:bg-gray-700"
              : "text-purple-700 hover:bg-purple-100"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div
        className={`p-4 flex-1 overflow-y-auto ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">👋</div>
            <h3
              className={`font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Hi there! I&apos;m your Lendly assistant
            </h3>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Ask me anything about using Lendly - from listing items to borrowing from neighbors!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end space-x-2 max-w-xs ${message.isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                  {!message.isUser && (
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs">
                      🤖
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl shadow-sm ${
                      message.isUser
                        ? isDarkMode 
                          ? "bg-purple-700 text-white" 
                          : "bg-purple-600 text-white"
                        : isDarkMode
                          ? "bg-gray-700 text-white"
                          : "bg-white text-gray-800"
                    }`}
                    style={{
                      borderBottomRightRadius: message.isUser ? "4px" : "16px",
                      borderBottomLeftRadius: message.isUser ? "16px" : "4px",
                    }}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 opacity-70`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end space-x-2 max-w-xs">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs">
                    🤖
                  </div>
                  <div
                    className={`p-3 rounded-2xl shadow-sm ${
                      isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                    }`}
                    style={{ borderBottomLeftRadius: "4px" }}
                  >
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div
        className={`p-4 border-t ${
          isDarkMode ? "border-gray-600 bg-gray-800" : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Ask me anything about Lendly..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-4 text-sm disabled:opacity-50 ${
              isDarkMode
                ? "bg-gray-700 text-white border-gray-600 focus:ring-purple-400 placeholder-gray-400"
                : "bg-white text-neutral-800 border-purple-200 focus:ring-purple-300 placeholder-gray-500"
            }`}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode
                ? "bg-purple-700 hover:bg-purple-600 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            { text: "How does Lendly work?", action: () => setInput("How does Lendly work?") },
            { text: "How to list an item?", action: () => setInput("How do I list an item?") },
            { text: "How to borrow something?", action: () => setInput("How do I borrow something?") },
          ].map((quick, index) => (
            <button
              key={index}
              onClick={quick.action}
              disabled={isTyping}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-purple-100 text-purple-700 hover:bg-purple-200"
              }`}
            >
              {quick.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}