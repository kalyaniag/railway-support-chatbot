'use client';

import RefundTimeline from './RefundTimeline';

interface RefundStatusCardProps {
  ticketType: 'e-ticket' | 'counter';
  cancellationDate?: string;
}

export default function RefundStatusCard({ ticketType, cancellationDate }: RefundStatusCardProps) {
  const isETicket = ticketType === 'e-ticket';
  
  const eTicketSteps = [
    {
      title: 'Ticket Cancelled',
      description: 'Your cancellation request has been confirmed',
      status: 'completed' as const,
      duration: 'Day 1',
    },
    {
      title: 'TDR Filed',
      description: 'Ticket Deposit Receipt generated automatically',
      status: 'completed' as const,
      duration: 'Day 1',
    },
    {
      title: 'Processing Refund',
      description: 'Refund amount being calculated and processed',
      status: 'current' as const,
      duration: 'Day 2-5',
    },
    {
      title: 'Refund Initiated',
      description: 'Amount will be credited to original payment method',
      status: 'pending' as const,
      duration: 'Day 5-7',
    },
    {
      title: 'Amount Credited',
      description: 'Refund successfully credited to your account',
      status: 'pending' as const,
      duration: 'Day 7-10',
    },
  ];

  const counterTicketSteps = [
    {
      title: 'Ticket Cancelled',
      description: 'Cancellation completed at railway counter',
      status: 'completed' as const,
      duration: 'Day 1',
    },
    {
      title: 'TDR Submission',
      description: 'Submit TDR form at railway reservation counter',
      status: 'current' as const,
      duration: 'Day 1-7',
    },
    {
      title: 'Document Verification',
      description: 'Counter staff verifying cancellation documents',
      status: 'pending' as const,
      duration: 'Day 7-15',
    },
    {
      title: 'Refund Processing',
      description: 'Refund request forwarded to accounts department',
      status: 'pending' as const,
      duration: 'Day 15-25',
    },
    {
      title: 'Amount Credited',
      description: 'Refund amount credited to your account',
      status: 'pending' as const,
      duration: 'Day 25-30',
    },
  ];

  const steps = isETicket ? eTicketSteps : counterTicketSteps;

  return (
    <div className="bg-gradient-to-br from-orange-50 to-white border border-blue-200 rounded-xl p-4 my-3 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-200">
        <div>
          <h3 className="text-base font-bold text-gray-800">Refund Process Timeline</h3>
          <p className="text-xs text-gray-600 mt-0.5">
            {isETicket ? 'E-Ticket Refund (3-7 days)' : 'Counter Ticket Refund (15-30 days)'}
          </p>
        </div>
        <div className="bg-white px-3 py-1.5 rounded-full border border-blue-300">
          <span className="text-xs font-medium text-[#E95420]">
            {isETicket ? '⚡ Fast Track' : '🎫 Standard'}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <RefundTimeline steps={steps} />

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-blue-200">
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs">💡</span>
          </div>
          <div>
            <p className="text-xs text-gray-700 font-medium">Pro Tip:</p>
            <p className="text-xs text-gray-600 mt-0.5">
              {isETicket
                ? 'E-ticket refunds are processed automatically. Check your email for updates.'
                : 'For counter tickets, keep your TDR receipt safe. You can track status at railway counter.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
