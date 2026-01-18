export type MessageRole = 'user' | 'bot';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  streaming?: boolean;
  link?: string;
  richContent?: {
    type: 'refund-timeline' | 'pnr-details' | 'train-status' | 'refund-status' | 'refund-history' | 'refund-calculator' | 'tdr-form' | 'alternative-trains' | 'tdr-filing';
    ticketType?: 'e-ticket' | 'counter';
    data?: any;
  };
}

export interface Intent {
  name: string;
  patterns: RegExp[];
  responses: string[];
  followUp?: string[];
  multiStep?: boolean;
  requiresPNR?: boolean;
  requiresTrainNumber?: boolean;
  requiresCalculation?: boolean;
  showsHistory?: boolean;
  requiresTDRFlow?: boolean;
  requiresAlternatives?: boolean;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  currentIntent?: string;
  awaitingInput?: boolean;
}
