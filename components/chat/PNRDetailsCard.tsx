"use client";

import { useState } from "react";
import {
  MockPNR,
  getTrainStatus,
  markTicketAsCancelled,
} from "@/lib/chatbot/mockData";
import { CheckCircle2, AlertTriangle } from "lucide-react";

interface PNRDetailsCardProps {
  pnrData: MockPNR;
}

export default function PNRDetailsCard({ pnrData }: PNRDetailsCardProps) {
  const [showTrainStatus, setShowTrainStatus] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isCancelled, setIsCancelled] = useState(
    pnrData.status === "cancelled",
  );
  const [refundAmount, setRefundAmount] = useState(0);
  const [mockDelay] = useState(() => Math.floor(Math.random() * 30));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CNF":
        return "text-green-600 bg-green-50";
      case "RAC":
        return "text-yellow-600 bg-yellow-50";
      case "WL":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const handleTrainStatus = () => {
    setShowTrainStatus(!showTrainStatus);
    setShowCancelConfirm(false);
  };

  const handleCancelClick = () => {
    setShowCancelConfirm(!showCancelConfirm);
    setShowTrainStatus(false);
  };

  const handleConfirmCancel = () => {
    // Calculate refund (demo: 75% refund)
    const refund = Math.round(pnrData.fare * 0.75);
    setRefundAmount(refund);

    // Mark ticket as cancelled in persistent storage
    markTicketAsCancelled(pnrData.pnr, pnrData.fare, refund);

    setIsCancelled(true);
    setShowCancelConfirm(false);
  };

  const trainStatus = getTrainStatus(pnrData.trainNumber);

  // Generate mock train status if not found
  const mockTrainStatus = trainStatus || {
    trainNumber: pnrData.trainNumber,
    trainName: pnrData.trainName,
    status: "running" as const,
    delay: mockDelay,
    currentLocation: pnrData.from.split(" (")[0],
    expectedArrival: "On Time",
    lastUpdated: new Date().toLocaleString("en-IN"),
  };

  if (isCancelled) {
    return (
      <div className="mt-3 bg-white rounded-lg p-4 border border-green-200 shadow-sm">
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Ticket Cancelled Successfully
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Your cancellation request has been processed
          </p>

          <div className="bg-gray-50 rounded-lg p-4 w-full mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">PNR Number</p>
                <p className="font-semibold">{pnrData.pnr}</p>
              </div>
              <div>
                <p className="text-gray-500">Train</p>
                <p className="font-semibold">{pnrData.trainNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Original Fare</p>
                <p className="font-semibold">₹{pnrData.fare}</p>
              </div>
              <div>
                <p className="text-gray-500">Cancellation Charge</p>
                <p className="font-semibold text-red-600">
                  ₹{pnrData.fare - refundAmount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 w-full border border-green-200">
            <p className="text-sm text-green-700">Refund Amount</p>
            <p className="text-2xl font-bold text-green-700">₹{refundAmount}</p>
            <p className="text-xs text-green-600 mt-1">
              Will be credited to your account in 3-5 business days
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <div>
          <h3 className="text-sm font-medium text-gray-500">PNR Status</h3>
          <p className="text-xl font-bold text-gray-900">{pnrData.pnr}</p>
        </div>
        <div
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
            pnrData.status === "confirmed"
              ? "bg-green-50 text-green-700 border border-green-200"
              : pnrData.status === "cancelled"
                ? "bg-red-50 text-red-700 border border-red-200"
                : pnrData.status === "rac"
                  ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                  : "bg-orange-50 text-orange-700 border border-orange-200"
          }`}
        >
          {pnrData.status.toUpperCase()}
        </div>
      </div>

      {/* Train Details */}
      <div className="bg-gray-50 rounded-lg p-3 mb-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-xl">🚂</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{pnrData.trainName}</h4>
            <p className="text-xs text-gray-500">
              Train #{pnrData.trainNumber}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500 text-xs">From</p>
            <p className="font-semibold text-gray-800">{pnrData.from}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">To</p>
            <p className="font-semibold text-gray-800">{pnrData.to}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Journey Date</p>
            <p className="font-semibold text-gray-800">
              {new Date(pnrData.journeyDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Class</p>
            <p className="font-semibold text-gray-800">{pnrData.class}</p>
          </div>
        </div>
      </div>

      {/* Passenger Details */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>👥</span>
          Passengers ({pnrData.passengers.length})
        </h4>
        <div className="space-y-2">
          {pnrData.passengers.map((passenger, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {passenger.name}
                </p>
                <p className="text-xs text-gray-500">Age: {passenger.age}</p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(passenger.status)}`}
                >
                  {passenger.status}
                </span>
                <p className="text-xs text-gray-600 mt-1">{passenger.seat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fare */}
      <div className="mt-3 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Total Fare</p>
            <p className="text-2xl font-bold">₹{pnrData.fare}</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-90">Quota</p>
            <p className="text-sm font-semibold uppercase">
              {pnrData.quota.replace("-", " ")}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <button
          onClick={handleTrainStatus}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
            showTrainStatus
              ? "bg-orange-600 text-white border-orange-600"
              : "bg-white text-orange-600 border-orange-200 hover:bg-orange-50"
          }`}
        >
          📊 Train Status
        </button>
        <button
          onClick={handleCancelClick}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
            showCancelConfirm
              ? "bg-red-600 text-white border-red-600"
              : "bg-white text-orange-600 border-orange-200 hover:bg-orange-50"
          }`}
        >
          ❌ Cancel Ticket
        </button>
      </div>

      {/* Train Status Panel */}
      {showTrainStatus && (
        <div className="mt-3 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>🚂</span> Live Train Status
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  mockTrainStatus.status === "running"
                    ? "bg-green-100 text-green-700"
                    : mockTrainStatus.status === "delayed"
                      ? "bg-yellow-100 text-yellow-700"
                      : mockTrainStatus.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                }`}
              >
                {mockTrainStatus.status.toUpperCase()}
              </span>
            </div>
            {mockTrainStatus.delay > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Delay</span>
                <span className="text-sm font-semibold text-yellow-700">
                  {mockTrainStatus.delay} minutes
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Current Location</span>
              <span className="text-sm font-semibold">
                {mockTrainStatus.currentLocation}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Expected Arrival</span>
              <span className="text-sm font-semibold">
                {mockTrainStatus.expectedArrival}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Last updated: {mockTrainStatus.lastUpdated}
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Panel */}
      {showCancelConfirm && (
        <div className="mt-3 bg-red-50 rounded-lg p-4 border border-red-200">
          <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Confirm Cancellation
          </h4>
          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              Are you sure you want to cancel this ticket? Cancellation charges
              will apply.
            </p>
            <div className="bg-white rounded-lg p-3 border border-red-100">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Ticket Fare</span>
                <span className="font-semibold">₹{pnrData.fare}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Cancellation Charge (25%)</span>
                <span className="font-semibold text-red-600">
                  -₹{Math.round(pnrData.fare * 0.25)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between text-sm">
                <span className="text-gray-800 font-semibold">
                  Refund Amount
                </span>
                <span className="font-bold text-green-600">
                  ₹{Math.round(pnrData.fare * 0.75)}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleConfirmCancel}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-all"
              >
                Confirm Cancel
              </button>
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-all"
              >
                Keep Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
