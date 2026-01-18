'use client';

import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { Bot, User, ExternalLink, Sparkles } from 'lucide-react';
import RefundStatusCard from './RefundStatusCard';
import PNRDetailsCard from './PNRDetailsCard';
import TrainStatusCard from './TrainStatusCard';
import RefundStatusTracker from './RefundStatusTracker';
import RefundCalculatorForm from './RefundCalculatorForm';
import RefundHistoryDashboard from './RefundHistoryDashboard';
import AlternativeTrainsCard from './AlternativeTrainsCard';
import TDRFilingWizard from './TDRFilingWizard';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isBot = message.role === 'bot';

  return (
    <div className={cn('flex gap-3 mb-4', isBot ? 'justify-start' : 'justify-end')}>
      {isBot && (
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
          <Bot className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
      )}
      
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-3 shadow-sm',
          isBot
            ? 'bg-gray-50 text-gray-800 border border-gray-200'
            : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
        )}
      >
        <div className={cn('text-sm whitespace-pre-wrap leading-relaxed', isBot ? 'text-gray-700' : 'text-white')}>
          {message.content}
        </div>
        
        {/* Show rich content if available */}
        {isBot && message.richContent && (
          <>
            {message.richContent.type === 'refund-timeline' && message.richContent.ticketType && (
              <RefundStatusCard ticketType={message.richContent.ticketType} />
            )}
            
            {message.richContent.type === 'pnr-details' && message.richContent.data && (
              <PNRDetailsCard pnrData={message.richContent.data} />
            )}
            
            {message.richContent.type === 'train-status' && message.richContent.data && (
              <TrainStatusCard trainStatus={message.richContent.data} />
            )}
            
            {message.richContent.type === 'refund-status' && message.richContent.data && (
              <RefundStatusTracker refundData={message.richContent.data} />
            )}
            
            {message.richContent.type === 'refund-calculator' && (
              <RefundCalculatorForm onCalculate={(result) => console.log('Refund calculated:', result)} />
            )}
            
            {message.richContent.type === 'refund-history' && message.richContent.data && (
              <RefundHistoryDashboard records={message.richContent.data} />
            )}
            
            {message.richContent.type === 'alternative-trains' && message.richContent.data && (
              <AlternativeTrainsCard 
                originalTrain={message.richContent.data.originalTrain}
                alternatives={message.richContent.data.alternatives}
                reason={message.richContent.data.reason}
              />
            )}
            
            {message.richContent.type === 'tdr-filing' && (
              <TDRFilingWizard onSubmit={(data) => console.log('TDR submitted:', data)} />
            )}
          </>
        )}
        
        {/* Show link button if available */}
        {isBot && message.link && (
          <a
            href={message.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm"
          >
            <span>Book Tickets on IRCTC</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
        
        <div
          className={cn(
            'text-xs mt-2 flex items-center gap-1',
            isBot ? 'text-gray-400' : 'text-blue-100'
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center shadow-sm">
          <User className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
      )}
    </div>
  );
}
