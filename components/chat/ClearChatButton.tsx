'use client';

import { Trash2 } from 'lucide-react';
import { clearContext } from '@/lib/chatbot/conversationContext';

interface ClearChatButtonProps {
  onClear: () => void;
  messageCount: number;
}

export default function ClearChatButton({ onClear, messageCount }: ClearChatButtonProps) {
  const handleClear = () => {
    if (messageCount === 0) return;
    
    if (confirm('🗑️ Clear all chat history?\n\nThis will delete all messages and conversation context. This action cannot be undone.')) {
      clearContext(); // Clear conversation context
      onClear(); // Clear messages in UI
    }
  };

  if (messageCount === 0) return null;

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
