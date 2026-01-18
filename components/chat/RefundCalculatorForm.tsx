"use client";

import { useState } from "react";

interface RefundCalculatorFormProps {
  onCalculate: (result: RefundCalculation) => void;
}

interface RefundCalculation {
  originalFare: number;
  deductionPercentage: number;
  deductionAmount: number;
  refundAmount: number;
  ticketType: string;
  cancellationTime: string;
  processingTime: string;
}

export default function RefundCalculatorForm({
  onCalculate,
}: RefundCalculatorFormProps) {
  const [ticketType, setTicketType] = useState<"AC" | "Sleeper" | "Tatkal">(
    "AC",
  );
  const [fare, setFare] = useState<string>("");
  const [hoursBeforeDeparture, setHoursBeforeDeparture] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<RefundCalculation | null>(null);

  const calculateRefund = () => {
    const originalFare = parseFloat(fare);
    const hours = parseFloat(hoursBeforeDeparture);

    if (isNaN(originalFare) || isNaN(hours) || originalFare <= 0 || hours < 0) {
      return;
    }

    let deductionPercentage = 0;
    let cancellationTime = "";
    let processingTime = "";

    if (ticketType === "Tatkal") {
      deductionPercentage = 100;
      cancellationTime = "Non-refundable";
      processingTime = "N/A";
    } else if (ticketType === "AC") {
      if (hours >= 48) {
        deductionPercentage = 25;
        cancellationTime = "48+ hours before departure";
        processingTime = "7-10 working days";
      } else if (hours >= 12) {
        deductionPercentage = 50;
        cancellationTime = "12-48 hours before departure";
        processingTime = "7-10 working days";
      } else if (hours >= 4) {
        deductionPercentage = 75;
        cancellationTime = "4-12 hours before departure";
        processingTime = "10-15 working days";
      } else {
        deductionPercentage = 100;
        cancellationTime = "Less than 4 hours before departure";
        processingTime = "N/A";
      }
    } else if (ticketType === "Sleeper") {
      if (hours >= 48) {
        deductionPercentage = 20;
        cancellationTime = "48+ hours before departure";
        processingTime = "7-10 working days";
      } else if (hours >= 12) {
        deductionPercentage = 40;
        cancellationTime = "12-48 hours before departure";
        processingTime = "7-10 working days";
      } else if (hours >= 4) {
        deductionPercentage = 60;
        cancellationTime = "4-12 hours before departure";
        processingTime = "10-15 working days";
      } else {
        deductionPercentage = 100;
        cancellationTime = "Less than 4 hours before departure";
        processingTime = "N/A";
      }
    }

    const deductionAmount = (originalFare * deductionPercentage) / 100;
    const refundAmount = originalFare - deductionAmount;

    const calculation: RefundCalculation = {
      originalFare,
      deductionPercentage,
      deductionAmount,
      refundAmount,
      ticketType,
      cancellationTime,
      processingTime,
    };

    setResult(calculation);
    setShowResult(true);
    onCalculate(calculation);
  };

  const resetForm = () => {
    setShowResult(false);
    setResult(null);
    setFare("");
    setHoursBeforeDeparture("");
  };

  return (
    <div className="bg-white rounded-lg border border-blue-200 p-4 space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Refund Calculator</h3>
          <p className="text-xs text-gray-500">
            Calculate your estimated refund
          </p>
        </div>
      </div>

      {!showResult ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["AC", "Sleeper", "Tatkal"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setTicketType(type)}
                  className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                    ticketType === type
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-blue-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Fare (₹)
            </label>
            <input
              type="number"
              value={fare}
              onChange={(e) => setFare(e.target.value)}
              placeholder="Enter ticket fare"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hours Before Departure
            </label>
            <input
              type="number"
              value={hoursBeforeDeparture}
              onChange={(e) => setHoursBeforeDeparture(e.target.value)}
              placeholder="e.g., 24"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="mt-1 text-xs text-gray-500">
              Time before scheduled departure
            </p>
          </div>

          <button
            onClick={calculateRefund}
            disabled={!fare || !hoursBeforeDeparture}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Calculate Refund
          </button>
        </>
      ) : (
        result && (
          <>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-blue-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">
                    Estimated Refund Amount
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    ₹{result.refundAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Original Fare</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{result.originalFare.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-xs text-red-600">
                    Deduction ({result.deductionPercentage}%)
                  </p>
                  <p className="text-lg font-semibold text-red-700">
                    -₹{result.deductionAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Ticket Type:</span>
                  <span className="font-medium text-gray-900">
                    {result.ticketType}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Cancellation Time:</span>
                  <span className="font-medium text-gray-900">
                    {result.cancellationTime}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Processing Time:</span>
                  <span className="font-medium text-gray-900">
                    {result.processingTime}
                  </span>
                </div>
              </div>

              {result.deductionPercentage < 100 && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-800 flex items-start gap-2">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Refund will be credited to the original payment method.
                      GST component is non-refundable.
                    </span>
                  </p>
                </div>
              )}

              {result.deductionPercentage === 100 && (
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-xs text-red-800 flex items-start gap-2">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      No refund available for this cancellation.{" "}
                      {result.ticketType === "Tatkal"
                        ? "Tatkal tickets are non-refundable."
                        : "Cancellation too close to departure time."}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={resetForm}
              className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
            >
              Calculate Another
            </button>
          </>
        )
      )}
    </div>
  );
}
