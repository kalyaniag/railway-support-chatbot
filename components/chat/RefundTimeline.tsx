"use client";

import { Check, Clock, XCircle } from "lucide-react";

interface TimelineStep {
  title: string;
  description: string;
  status: "completed" | "current" | "pending" | "failed";
  duration?: string;
}

interface RefundTimelineProps {
  steps: TimelineStep[];
}

export default function RefundTimeline({ steps }: RefundTimelineProps) {
  return (
    <div className="relative py-4">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className="relative pb-8 last:pb-0">
            {/* Vertical Line */}
            {!isLast && (
              <div
                className={`absolute left-4 top-8 w-0.5 h-full ${
                  step.status === "completed"
                    ? "bg-green-500"
                    : step.status === "failed"
                      ? "bg-red-500"
                      : "bg-gray-300"
                }`}
              />
            )}

            {/* Step Content */}
            <div className="flex items-start gap-4">
              {/* Icon Circle */}
              <div
                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                  step.status === "completed"
                    ? "bg-green-500"
                    : step.status === "current"
                      ? "bg-[#E95420] animate-pulse"
                      : step.status === "failed"
                        ? "bg-red-500"
                        : "bg-gray-300"
                }`}
              >
                {step.status === "completed" ? (
                  <Check className="w-4 h-4 text-white" />
                ) : step.status === "failed" ? (
                  <XCircle className="w-4 h-4 text-white" />
                ) : step.status === "current" ? (
                  <Clock className="w-4 h-4 text-white" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>

              {/* Step Details */}
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-sm font-semibold ${
                      step.status === "completed" || step.status === "current"
                        ? "text-gray-800"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </h4>
                  {step.duration && (
                    <span className="text-xs text-gray-500">
                      {step.duration}
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs mt-1 ${
                    step.status === "completed" || step.status === "current"
                      ? "text-gray-600"
                      : "text-gray-400"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
