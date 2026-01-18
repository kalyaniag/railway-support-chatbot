'use client';

import { MockTrainStatus } from '@/lib/chatbot/mockData';

interface TrainStatusCardProps {
  trainStatus: MockTrainStatus;
  trainName?: string;
}

export default function TrainStatusCard({ trainStatus, trainName }: TrainStatusCardProps) {
  const getStatusIcon = () => {
    switch (trainStatus.status) {
      case 'running': return '✅';
      case 'delayed': return '⏰';
      case 'cancelled': return '❌';
      case 'diverted': return '🔄';
      default: return '📊';
    }
  };

  const getStatusColor = () => {
    switch (trainStatus.status) {
      case 'running': return trainStatus.delay === 0 ? 'from-green-500 to-green-600' : 'from-yellow-500 to-yellow-600';
      case 'delayed': return 'from-orange-500 to-orange-600';
      case 'cancelled': return 'from-red-500 to-red-600';
      case 'diverted': return 'from-blue-500 to-blue-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusText = () => {
    if (trainStatus.status === 'cancelled') return 'CANCELLED';
    if (trainStatus.status === 'diverted') return 'DIVERTED';
    if (trainStatus.delay === 0) return 'ON TIME';
    return `DELAYED BY ${trainStatus.delay} MIN`;
  };

  return (
    <div className="mt-3 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-5 border-2 border-blue-200 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{getStatusIcon()}</span>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">Train Status</h3>
          <p className="text-sm text-gray-600">Live Tracking</p>
        </div>
      </div>

      {/* Train Info */}
      <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-2xl font-bold text-gray-800">Train #{trainStatus.trainNumber}</h4>
            {trainName && <p className="text-sm text-gray-600">{trainName}</p>}
          </div>
        </div>

        {/* Status Badge */}
        <div className={`bg-gradient-to-r ${getStatusColor()} text-white rounded-xl p-4 mb-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Current Status</p>
              <p className="text-2xl font-bold">{getStatusText()}</p>
            </div>
            {trainStatus.delay > 0 && (
              <div className="text-right">
                <p className="text-3xl font-bold">{trainStatus.delay}</p>
                <p className="text-xs opacity-90">minutes</p>
              </div>
            )}
          </div>
        </div>

        {trainStatus.status !== 'cancelled' && (
          <>
            {/* Current Location */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-xs text-gray-500 mb-1">📍 Current Location</p>
              <p className="text-lg font-bold text-gray-800">{trainStatus.currentLocation}</p>
            </div>

            {/* Expected Arrival */}
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">🕐 Expected Arrival</p>
              <p className="text-lg font-bold text-gray-800">{trainStatus.expectedArrival}</p>
            </div>
          </>
        )}

        {trainStatus.status === 'cancelled' && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <p className="text-red-700 font-semibold text-center">
              🚨 This train has been cancelled by Indian Railways
            </p>
            <p className="text-sm text-red-600 text-center mt-2">
              Full automatic refund will be processed
            </p>
          </div>
        )}
      </div>

      {/* Last Updated */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>⏱️ Last updated: {trainStatus.lastUpdated}</span>
        <button className="text-blue-600 font-semibold hover:text-blue-700">
          Refresh
        </button>
      </div>

      {/* Alert Box for Delays */}
      {trainStatus.delay >= 180 && (
        <div className="mt-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3">
          <p className="text-sm font-semibold text-yellow-800">💡 Compensation Eligible!</p>
          <p className="text-xs text-yellow-700 mt-1">
            Train delayed by 3+ hours. You may be eligible for compensation refund. File TDR to claim.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      {trainStatus.status === 'cancelled' && (
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all">
            Get Full Refund
          </button>
          <button className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-all border border-blue-200">
            Find Alternative
          </button>
        </div>
      )}
    </div>
  );
}
