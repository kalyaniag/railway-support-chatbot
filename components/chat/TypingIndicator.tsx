"use client";

import DishaAvatar from "./DishaAvatar";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4">
      <DishaAvatar size="sm" showRing={false} />

      <div className="max-w-[75%] rounded-lg px-4 py-3 bg-gray-50 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
