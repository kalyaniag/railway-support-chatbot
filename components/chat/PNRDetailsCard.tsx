'use client';

import { MockPNR } from '@/lib/chatbot/mockData';

interface PNRDetailsCardProps {
  pnrData: MockPNR;
}

export default function PNRDetailsCard({ pnrData }: PNRDetailsCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CNF': return 'text-green-600 bg-green-50';
      case 'RAC': return 'text-yellow-600 bg-yellow-50';
      case 'WL': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="mt-3 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <div>
          <h3 className="text-sm font-medium text-gray-500">PNR Status</h3>
          <p className="text-xl font-bold text-gray-900">{pnrData.pnr}</p>
        </div>
        <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
          pnrData.status === 'confirmed' ? 'bg-green-50 text-green-700 border border-green-200' :
          pnrData.status === 'rac' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
          'bg-orange-50 text-orange-700 border border-orange-200'
        }`}>
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
            <p className="text-xs text-gray-500">Train #{pnrData.trainNumber}</p>
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
              {new Date(pnrData.journeyDate).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
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
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800 text-sm">{passenger.name}</p>
                <p className="text-xs text-gray-500">Age: {passenger.age}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(passenger.status)}`}>
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
            <p className="text-sm font-semibold uppercase">{pnrData.quota.replace('-', ' ')}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <button className="px-4 py-2 bg-white text-orange-600 rounded-lg text-sm font-semibold hover:bg-orange-50 transition-all border border-orange-200">
          📊 Train Status
        </button>
        <button className="px-4 py-2 bg-white text-orange-600 rounded-lg text-sm font-semibold hover:bg-orange-50 transition-all border border-orange-200">
          ❌ Cancel Ticket
        </button>
      </div>
    </div>
  );
}
