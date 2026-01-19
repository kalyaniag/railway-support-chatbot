"use client";

import { Ticket, Search, IndianRupee, Zap } from "lucide-react";
import DishaAvatar from "./DishaAvatar";

interface QuickActionsProps {
  onQuickAction: (question: string) => void;
}

const quickActions = [
  { label: "Book Tickets", query: "I want to book tickets", icon: Ticket },
  {
    label: "Check PNR Status",
    query: "How do I check PNR status?",
    icon: Search,
  },
  {
    label: "Refund Process",
    query: "Show me refund process",
    icon: IndianRupee,
  },
  { label: "Tatkal Booking", query: "Tell me about Tatkal booking", icon: Zap },
];

export default function QuickActions({ onQuickAction }: QuickActionsProps) {
  return (
    <div className="mb-6 px-3">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center mb-4 relative">
          <DishaAvatar size="xl" showRing={true} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 px-4">
          Namaste! I&apos;m Disha 2.0
        </h2>
        <p className="text-sm text-gray-600 font-medium">
          AI-Powered Virtual Assistant for IRCTC
        </p>
        <p className="text-xs text-blue-600 mt-2">
          ✨ Powered by advanced AI • Available 24/7
        </p>
      </div>

      <p className="text-center text-gray-700 mb-6 text-sm px-4 leading-relaxed">
        I can help you with PNR status, train schedules, refunds, bookings, and
        more. Ask me anything about Indian Railways!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={() => onQuickAction(action.query)}
              className="group px-4 py-3.5 text-left bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-lg transition-all duration-200 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-orange-50 flex items-center justify-center flex-shrink-0 transition-colors">
                <Icon
                  className="w-5 h-5 text-blue-600 group-hover:text-orange-600"
                  strokeWidth={2}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
