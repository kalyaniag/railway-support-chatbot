"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import ChatContainer from "./ChatContainer";
import DishaAvatar from "./DishaAvatar";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Window - Responsive */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[480px] md:w-[520px] h-[calc(100vh-6rem)] sm:h-[680px] max-h-[750px] bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-100 animate-in slide-in-from-bottom-5 duration-300">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white px-4 sm:px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Disha Avatar */}
              <DishaAvatar size="md" showRing={true} />
              <div className="min-w-0">
                <h2 className="text-lg font-bold truncate flex items-center gap-2">
                  Disha 2.0
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </h2>
                <p className="text-xs text-orange-100 truncate font-medium">
                  AI-Powered Virtual Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0 backdrop-blur-sm"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>

          {/* Chat Content */}
          <div className="h-[calc(100%-76px)]">
            <ChatContainer isWidget={true} />
          </div>
        </div>
      )}

      {/* Compact Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 group transition-all duration-300 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="Open chat"
      >
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-20"></div>
        <div className="absolute inset-0 rounded-full bg-orange-400 animate-pulse opacity-30"></div>

        {/* Main button */}
        <div className="relative w-16 h-16 bg-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center group-hover:scale-110 border-2 border-blue-200">
          <DishaAvatar size="lg" showRing={false} />
          {/* Online indicator */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Hover tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Chat with Disha 2.0</span>
          </div>
          {/* Arrow */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-2">
            <div className="w-3 h-3 bg-gray-900 rotate-45"></div>
          </div>
        </div>
      </button>
    </>
  );
}
