"use client";

import { useState } from "react";
import { Trash2, X, Check } from "lucide-react";
import { clearContext } from "@/lib/chatbot/conversationContext";

interface ClearChatButtonProps {
  onClear: () => void;
  messageCount: number;
}

export default function ClearChatButton({
  onClear,
  messageCount,
}: ClearChatButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClear = () => {
    if (messageCount === 0) return;
    setShowConfirm(true);
  };

  const confirmClear = () => {
    clearContext(); // Clear conversation context
    onClear(); // Clear messages in UI
    setShowConfirm(false);
  };

  const cancelClear = () => {
    setShowConfirm(false);
  };

  if (messageCount === 0) return null;

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-red-50 rounded-lg border border-red-200">
        <span className="text-red-700">Clear chat?</span>
        <button
          onClick={confirmClear}
          className="p-1 hover:bg-red-100 rounded text-red-600"
          title="Confirm clear"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={cancelClear}
          className="p-1 hover:bg-gray-200 rounded text-gray-600"
          title="Cancel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleClear}
      className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
      title="Clear chat history"
    >
      <Trash2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
      <span className="hidden sm:inline">Clear Chat</span>
    </button>
  );
}
