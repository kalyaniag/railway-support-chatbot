'use client';

interface RefundRecord {
  pnr: string;
  trainNumber: string;
  trainName: string;
  refundAmount: number;
  status: 'Credited' | 'Processing' | 'Approved' | 'Pending';
  dateInitiated: string;
  dateCredited?: string;
  ticketType: string;
}

interface RefundHistoryDashboardProps {
  records: RefundRecord[];
}

export default function RefundHistoryDashboard({ records }: RefundHistoryDashboardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Credited':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Processing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Approved':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Pending':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const totalRefunded = records
    .filter(r => r.status === 'Credited')
    .reduce((sum, r) => sum + r.refundAmount, 0);

  const pendingAmount = records
    .filter(r => r.status !== 'Credited')
    .reduce((sum, r) => sum + r.refundAmount, 0);

  return (
    <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div>
            <h3 className="font-bold text-lg">Refund History</h3>
            <p className="text-sm text-blue-100">Last {records.length} transactions</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-xs text-blue-100 mb-1">Total Refunded</p>
            <p className="text-2xl font-bold">₹{totalRefunded.toFixed(2)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-xs text-blue-100 mb-1">Pending</p>
            <p className="text-2xl font-bold">₹{pendingAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {records.map((record, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{record.trainName}</span>
                  <span className="text-xs text-gray-500">({record.trainNumber})</span>
                </div>
                <p className="text-xs text-gray-500">PNR: {record.pnr}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  record.status
                )}`}
              >
                {record.status}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Refund Amount</p>
                <p className="text-lg font-bold text-blue-600">₹{record.refundAmount.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Initiated</p>
                <p className="text-xs font-medium text-gray-700">{record.dateInitiated}</p>
                {record.dateCredited && (
                  <>
                    <p className="text-xs text-gray-500 mt-1">Credited</p>
                    <p className="text-xs font-medium text-green-600">{record.dateCredited}</p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Ticket Type</span>
                <span className="font-medium text-gray-700">{record.ticketType}</span>
              </div>
            </div>

            {record.status === 'Processing' && (
              <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700 flex items-center gap-2">
                <div className="animate-spin rounded-full h-3 w-3 border-2 border-blue-600 border-t-transparent"></div>
                <span>Processing refund to original payment method...</span>
              </div>
            )}
          </div>
        ))}

        {records.length === 0 && (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 font-medium">No refund records found</p>
            <p className="text-xs text-gray-400 mt-1">Your refund history will appear here</p>
          </div>
        )}
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-600 flex items-start gap-2">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Refunds typically take 7-15 working days to reflect in your account. For queries, contact customer support.</span>
        </p>
      </div>
    </div>
  );
}
