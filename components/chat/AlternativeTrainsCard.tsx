'use client';

interface AlternativeTrain {
  trainNumber: string;
  trainName: string;
  departure: string;
  arrival: string;
  duration: string;
  availableClasses: string[];
  fare: number;
  runningStatus: 'On Time' | 'Delayed';
  delay?: number;
}

interface AlternativeTrainsCardProps {
  originalTrain: string;
  alternatives: AlternativeTrain[];
  reason: string;
}

export default function AlternativeTrainsCard({
  originalTrain,
  alternatives,
  reason,
}: AlternativeTrainsCardProps) {
  const getStatusBadge = (status: string, delay?: number) => {
    if (status === 'On Time') {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200">
          On Time
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full border border-yellow-200">
        Delayed {delay}min
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <div>
            <h3 className="font-bold text-lg">Alternative Trains</h3>
            <p className="text-sm text-blue-100">For your journey</p>
          </div>
        </div>

        <div className="mt-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <p className="text-xs text-blue-100 mb-1">Original Train</p>
          <p className="font-semibold">{originalTrain}</p>
          <p className="text-xs text-blue-100 mt-2">Reason: {reason}</p>
        </div>
      </div>

      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {alternatives.map((train, index) => (
          <div
            key={index}
            className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900">{train.trainName}</h4>
                  {getStatusBadge(train.runningStatus, train.delay)}
                </div>
                <p className="text-sm text-gray-500">Train No: {train.trainNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">₹{train.fare}</p>
                <p className="text-xs text-gray-500">onwards</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Departure</p>
                <p className="font-semibold text-gray-900">{train.departure}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Duration</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-px w-6 bg-gray-300"></div>
                  <p className="font-semibold text-gray-900 text-sm">{train.duration}</p>
                  <div className="h-px w-6 bg-gray-300"></div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Arrival</p>
                <p className="font-semibold text-gray-900">{train.arrival}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Available Classes</p>
              <div className="flex flex-wrap gap-2">
                {train.availableClasses.map((cls, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded border border-blue-200"
                  >
                    {cls}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full mt-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-orange-600 transition-all group-hover:shadow-md">
              Check Availability
            </button>
          </div>
        ))}

        {alternatives.length === 0 && (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500 font-medium">No alternatives found</p>
            <p className="text-xs text-gray-400 mt-1">Please try different dates or routes</p>
          </div>
        )}
      </div>

      <div className="px-4 py-3 bg-blue-50 border-t border-blue-200">
        <p className="text-xs text-blue-800 flex items-start gap-2">
          <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Prices and availability shown are indicative. Click "Check Availability" for real-time information and booking.</span>
        </p>
      </div>
    </div>
  );
}
