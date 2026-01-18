'use client';

import { Ticket, Search, IndianRupee, Zap } from 'lucide-react';

interface QuickActionsProps {
  onQuickAction: (question: string) => void;
}

const quickActions = [
  { label: 'Book Tickets', query: 'I want to book tickets', icon: Ticket },
  { label: 'Check PNR Status', query: 'How do I check PNR status?', icon: Search },
  { label: 'Refund Process', query: 'Show me refund process', icon: IndianRupee },
  { label: 'Tatkal Booking', query: 'Tell me about Tatkal booking', icon: Zap },
];

export default function QuickActions({ onQuickAction }: QuickActionsProps) {
  return (
    <div className="mb-6 px-3">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg">
          <span className="text-3xl">🤖</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2 px-4">Welcome to AskDisha</h2>
        <p className="text-sm text-gray-500">Your AI Railway Assistant</p>
      </div>
      
      <p className="text-center text-gray-600 mb-6 text-sm px-4">
        How can I assist you today?
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={() => onQuickAction(action.query)}
              className="group px-4 py-3.5 text-left bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center flex-shrink-0 transition-colors">
                <Icon className="w-5 h-5 text-blue-600" strokeWidth={2} />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
