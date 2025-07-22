"use client";

import { useState } from "react";
import Link from "next/link";
import ChatSidebar from "./ChatSidebar";

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        {/* Plus Button to navigate to list your item page */}
        <Link href="/listitem">
          <button className="w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition flex items-center justify-center text-2xl">
            +
          </button>
        </Link>
        {/* Question Mark Button toggles the Chat Sidebar */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-12 h-12 rounded-full bg-white border border-blue-200 text-blue-500 shadow-lg hover:bg-blue-50 transition flex items-center justify-center text-xl"
        >
          ?
        </button>
      </div>
      {/* Chat Sidebar */}
      <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}