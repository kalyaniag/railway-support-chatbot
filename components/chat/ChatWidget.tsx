'use client';

import { useState } from 'react';
import { X, MessageSquare, Headphones } from 'lucide-react';
import ChatContainer from './ChatContainer';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Window - Responsive */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[calc(100vh-8rem)] sm:h-[600px] max-h-[600px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-5 duration-300">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-5 py-3.5 flex items-center justify-between border-b border-blue-700/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 border border-white/20">
                <Headphones className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-semibold truncate">AskDisha</h2>
                <p className="text-xs text-blue-100 truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          {/* Chat Content */}
          <div className="h-[calc(100%-60px)] sm:h-[calc(100%-72px)]">
            <ChatContainer isWidget={true} />
          </div>
        </div>
      )}

      {/* Floating Button - Responsive */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Open chat"
      >
        <div className="relative group">
          {/* Pulse animation - subtler */}
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
          
          {/* Main button */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group-hover:scale-105 border-2 border-white">
            <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Need Help? Chat with us
            <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1">
              <div className="w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          </div>
        </div>
      </button>

      {/* Floating Badge (when closed) - Hidden on mobile when scrolled */}
      {!isOpen && (
        <div className="hidden sm:block fixed bottom-24 right-6 z-40 bg-white rounded-lg px-4 py-2.5 shadow-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Need Help?</span>
          </div>
        </div>
      )}
    </>
  );
}
