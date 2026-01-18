'use client';

import { MockRefundStatus } from '@/lib/chatbot/mockData';

interface RefundStatusTrackerProps {
  refundData: MockRefundStatus;
}

export default function RefundStatusTracker({ refundData }: RefundStatusTrackerProps) {
  const getStatusColor = () => {
    switch (refundData.status) {
      case 'initiated': return 'from-blue-500 to-blue-600';
      case 'approved': return 'from-green-500 to-green-600';
      case 'processing': return 'from-yellow-500 to-yellow-600';
      case 'credited': return 'from-green-600 to-green-700';
      case 'rejected': return 'from-red-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const steps = [
    { 
      name: 'Cancellation Received', 
      status: refundData.stages.received ? 'completed' : 'pending',
      icon: '📋',
      date: refundData.submittedDate
    },
    { 
      name: 'Refund Approved', 
      status: refundData.stages.approved ? 'completed' : refundData.stages.received ? 'current' : 'pending',
      icon: '✅',
      date: refundData.approvedDate
    },
    { 
      name: 'Payment Processing', 
      status: refundData.stages.processing ? 'current' : refundData.stages.approved ? 'pending' : 'pending',
      icon: '💳',
      date: undefined
    },
    { 
      name: 'Credit to Bank', 
      status: refundData.stages.credited ? 'completed' : 'pending',
      icon: '🏦',
      date: refundData.creditedDate
    },
  ];

  return (
    <div className="mt-3 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-5 border-2 border-purple-200 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Refund Status</h3>
          <p className="text-sm text-gray-600">PNR: {refundData.pnr}</p>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getStatusColor()}`}>
          {refundData.status.toUpperCase()}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Progress</span>
          <span className="text-sm font-bold text-purple-600">{refundData.percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${refundData.percentage}%` }}
          />
        </div>
      </div>

      {/* Amount */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 text-white mb-3 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Refund Amount</p>
            <p className="text-3xl font-bold">₹{refundData.amount.toLocaleString()}</p>
          </div>
          <span className="text-4xl">💰</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📊</span>
          Timeline
        </h4>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              {/* Status Indicator */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  step.status === 'completed' ? 'bg-green-100 border-2 border-green-500' :
                  step.status === 'current' ? 'bg-yellow-100 border-2 border-yellow-500 animate-pulse' :
                  'bg-gray-100 border-2 border-gray-300'
                }`}>
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-0.5 h-8 ${
                    step.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'
                  }`} />
                )}
              </div>

              {/* Step Info */}
              <div className="flex-1 pb-2">
                <p className={`font-semibold ${
                  step.status === 'completed' ? 'text-green-700' :
                  step.status === 'current' ? 'text-yellow-700' :
                  'text-gray-500'
                }`}>
                  {step.name}
                </p>
                {step.date && (
                  <p className="text-xs text-gray-500">
                    {new Date(step.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                )}
                {step.status === 'current' && (
                  <p className="text-xs text-yellow-600 font-semibold mt-1">In Progress...</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expected Date */}
      {refundData.status !== 'rejected' && refundData.status !== 'credited' && (
        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm font-semibold text-blue-800 flex items-center gap-2">
            <span>🗓️</span>
            Expected Credit Date
          </p>
          <p className="text-lg font-bold text-blue-900 mt-1">
            {new Date(refundData.expectedCreditDate).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Refund will be credited to your original payment source
          </p>
        </div>
      )}

      {/* Rejected Message */}
      {refundData.status === 'rejected' && (
        <div className="mt-3 bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold">❌ Refund Request Rejected</p>
          <p className="text-sm text-red-600 mt-2">
            This refund request was not eligible. Premium Tatkal tickets are non-refundable after booking.
          </p>
          <button className="mt-3 text-sm text-red-700 font-semibold hover:text-red-800">
            Learn about refund rules →
          </button>
        </div>
      )}

      {/* Help Section */}
      {refundData.status !== 'rejected' && (
        <div className="mt-3 pt-3 border-t border-purple-200">
          <p className="text-xs text-gray-600 text-center">
            💡 Refund will be processed within 7-10 working days from cancellation
          </p>
        </div>
      )}
    </div>
  );
}
