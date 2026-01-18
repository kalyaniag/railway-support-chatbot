// Mock Database for Intelligent Chatbot Features

export interface MockPNR {
  pnr: string;
  trainNumber: string;
  trainName: string;
  from: string;
  to: string;
  journeyDate: string;
  bookingDate: string;
  class: string;
  fare: number;
  passengers: {
    name: string;
    age: number;
    status: string;
    seat: string;
  }[];
  status: 'confirmed' | 'rac' | 'waitlist' | 'cancelled';
  quota: 'general' | 'tatkal' | 'premium-tatkal' | 'ladies';
}

export interface MockTrainStatus {
  trainNumber: string;
  trainName: string;
  status: 'running' | 'delayed' | 'cancelled' | 'diverted';
  delay: number; // in minutes
  currentLocation: string;
  expectedArrival: string;
  lastUpdated: string;
}

export interface MockRefundStatus {
  pnr: string;
  status: 'initiated' | 'approved' | 'processing' | 'credited' | 'rejected';
  percentage: number;
  amount: number;
  submittedDate: string;
  approvedDate?: string;
  creditedDate?: string;
  expectedCreditDate: string;
  stages: {
    received: boolean;
    approved: boolean;
    processing: boolean;
    credited: boolean;
  };
}

export interface RefundHistory {
  pnr: string;
  amount: number;
  status: 'received' | 'processing' | 'rejected';
  date: string;
  reason?: string;
  trainNumber?: string;
  trainName?: string;
}

// Mock PNR Database
export const mockPNRDatabase: Record<string, MockPNR> = {
  '1234567890': {
    pnr: '1234567890',
    trainNumber: '12301',
    trainName: 'Howrah Rajdhani Express',
    from: 'Howrah Junction (HWH)',
    to: 'New Delhi (NDLS)',
    journeyDate: '2026-01-25',
    bookingDate: '2026-01-10',
    class: 'AC 3-Tier (3A)',
    fare: 3450,
    passengers: [
      { name: 'Rajesh Kumar', age: 32, status: 'CNF', seat: 'B4-23' },
      { name: 'Priya Sharma', age: 28, status: 'CNF', seat: 'B4-24' }
    ],
    status: 'confirmed',
    quota: 'general'
  },
  '9876543210': {
    pnr: '9876543210',
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani Express',
    from: 'Mumbai Central (BCT)',
    to: 'New Delhi (NDLS)',
    journeyDate: '2026-01-22',
    bookingDate: '2026-01-08',
    class: 'AC 2-Tier (2A)',
    fare: 4250,
    passengers: [
      { name: 'Amit Patel', age: 45, status: 'CNF', seat: 'A1-15' }
    ],
    status: 'confirmed',
    quota: 'general'
  },
  '5555555555': {
    pnr: '5555555555',
    trainNumber: '12259',
    trainName: 'Duronto Express',
    from: 'Sealdah (SDAH)',
    to: 'New Delhi (NDLS)',
    journeyDate: '2026-01-20',
    bookingDate: '2026-01-19',
    class: 'AC 3-Tier (3A)',
    fare: 2890,
    passengers: [
      { name: 'Sunita Singh', age: 35, status: 'CNF', seat: 'C2-42' }
    ],
    status: 'confirmed',
    quota: 'premium-tatkal'
  },
  '1111111111': {
    pnr: '1111111111',
    trainNumber: '12430',
    trainName: 'Lucknow Mail',
    from: 'New Delhi (NDLS)',
    to: 'Lucknow (LKO)',
    journeyDate: '2026-01-28',
    bookingDate: '2026-01-12',
    class: 'Sleeper (SL)',
    fare: 890,
    passengers: [
      { name: 'Vikram Yadav', age: 28, status: 'RAC', seat: 'RAC-12' }
    ],
    status: 'rac',
    quota: 'general'
  },
  '2222222222': {
    pnr: '2222222222',
    trainNumber: '12925',
    trainName: 'Paschim Express',
    from: 'Amritsar (ASR)',
    to: 'Mumbai Bandra (BDTS)',
    journeyDate: '2026-02-05',
    bookingDate: '2026-01-15',
    class: 'AC 3-Tier (3A)',
    fare: 3150,
    passengers: [
      { name: 'Meera Kapoor', age: 42, status: 'WL', seat: 'WL-8' },
      { name: 'Rohan Kapoor', age: 15, status: 'WL', seat: 'WL-9' }
    ],
    status: 'waitlist',
    quota: 'general'
  }
};

// Mock Train Status Database
export const mockTrainStatus: Record<string, MockTrainStatus> = {
  '12301': {
    trainNumber: '12301',
    trainName: 'Howrah Rajdhani',
    status: 'running',
    delay: 0,
    currentLocation: 'Kanpur Central',
    expectedArrival: '22:30',
    lastUpdated: '2026-01-18 15:30'
  },
  '12951': {
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani',
    status: 'delayed',
    delay: 120,
    currentLocation: 'Pune Junction',
    expectedArrival: '18:45',
    lastUpdated: '2026-01-18 15:28'
  },
  '12259': {
    trainNumber: '12259',
    trainName: 'Duronto Express',
    status: 'cancelled',
    delay: 0,
    currentLocation: 'N/A',
    expectedArrival: 'N/A',
    lastUpdated: '2026-01-18 08:00'
  },
  '12430': {
    trainNumber: '12430',
    trainName: 'Lucknow Express',
    status: 'running',
    delay: 15,
    currentLocation: 'Ghaziabad',
    expectedArrival: '06:45',
    lastUpdated: '2026-01-18 15:25'
  },
  '12925': {
    trainNumber: '12925',
    trainName: 'Paschim Express',
    status: 'running',
    delay: 0,
    currentLocation: 'Jaipur',
    expectedArrival: '14:20',
    lastUpdated: '2026-01-18 15:20'
  }
};

// Mock Refund Status Database
export const mockRefundStatus: Record<string, MockRefundStatus> = {
  '1234567890': {
    pnr: '1234567890',
    status: 'processing',
    percentage: 60,
    amount: 3123,
    submittedDate: '2026-01-18',
    approvedDate: '2026-01-19',
    expectedCreditDate: '2026-01-22',
    stages: {
      received: true,
      approved: true,
      processing: true,
      credited: false
    }
  },
  '9876543210': {
    pnr: '9876543210',
    status: 'approved',
    percentage: 40,
    amount: 3850,
    submittedDate: '2026-01-15',
    approvedDate: '2026-01-17',
    expectedCreditDate: '2026-01-21',
    stages: {
      received: true,
      approved: true,
      processing: false,
      credited: false
    }
  },
  '5555555555': {
    pnr: '5555555555',
    status: 'rejected',
    percentage: 0,
    amount: 0,
    submittedDate: '2026-01-10',
    expectedCreditDate: 'N/A',
    stages: {
      received: true,
      approved: false,
      processing: false,
      credited: false
    }
  }
};

// Mock Refund History
export const mockRefundHistory: RefundHistory[] = [
  {
    pnr: '1234567890',
    amount: 3123,
    status: 'processing',
    date: '2026-01-18',
    trainNumber: '12301',
    trainName: 'Howrah Rajdhani'
  },
  {
    pnr: '9876543210',
    amount: 3850,
    status: 'processing',
    date: '2026-01-15',
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani'
  },
  {
    pnr: '5555555555',
    amount: 0,
    status: 'rejected',
    date: '2026-01-10',
    reason: 'Premium Tatkal - No refund eligible',
    trainNumber: '12259',
    trainName: 'Duronto Express'
  },
  {
    pnr: '8888888888',
    amount: 2100,
    status: 'received',
    date: '2025-12-05',
    trainNumber: '12423',
    trainName: 'Dibrugarh Rajdhani'
  },
  {
    pnr: '7777777777',
    amount: 890,
    status: 'received',
    date: '2025-12-20',
    trainNumber: '12317',
    trainName: 'Akal Takht Express'
  }
];

// Alternative Train Suggestions
export const alternativeTrains = [
  {
    trainNumber: '12302',
    trainName: 'Howrah Rajdhani',
    from: 'Howrah',
    to: 'New Delhi',
    departure: '2026-01-25 18:00',
    arrival: '2026-01-26 10:15',
    availableSeats: { '3A': 4, '2A': 2, '1A': 1 },
    fare: { '3A': 3550, '2A': 4850, '1A': 6950 }
  },
  {
    trainNumber: '12305',
    trainName: 'Kalka Mail',
    from: 'Howrah',
    to: 'New Delhi',
    departure: '2026-01-26 10:00',
    arrival: '2026-01-27 05:30',
    availableSeats: { '3A': 8, '2A': 5, 'SL': 12 },
    fare: { '3A': 2950, '2A': 4250, 'SL': 890 }
  }
];

// Helper function to get PNR data
export const getPNRData = (pnr: string): MockPNR | null => {
  return mockPNRDatabase[pnr] || null;
};

// Helper function to get train status
export const getTrainStatus = (trainNumber: string): MockTrainStatus | null => {
  return mockTrainStatus[trainNumber] || null;
};

// Helper function to get refund status
export const getRefundStatus = (pnr: string): MockRefundStatus | null => {
  return mockRefundStatus[pnr] || null;
};

// Calculate refund amount based on cancellation time and class
export const calculateRefund = (
  fare: number,
  ticketClass: string,
  hoursBeforeDeparture: number,
  quota: string
): { refundAmount: number; cancellationCharge: number; clerkage: number; gst: number } => {
  // Premium Tatkal - No refund
  if (quota === 'premium-tatkal') {
    return { refundAmount: 0, cancellationCharge: fare, clerkage: 0, gst: 0 };
  }

  let cancellationCharge = 0;
  const clerkage = 60;

  // AC Classes
  if (ticketClass.includes('AC') || ticketClass.includes('1A') || ticketClass.includes('2A') || ticketClass.includes('3A')) {
    if (hoursBeforeDeparture >= 48) {
      cancellationCharge = 240;
    } else if (hoursBeforeDeparture >= 12) {
      cancellationCharge = fare * 0.5;
    } else if (hoursBeforeDeparture >= 4) {
      cancellationCharge = fare * 0.5;
    } else {
      return { refundAmount: 0, cancellationCharge: fare, clerkage: 0, gst: 0 };
    }
  } 
  // Sleeper Class
  else if (ticketClass.includes('Sleeper') || ticketClass.includes('SL')) {
    if (hoursBeforeDeparture >= 48) {
      cancellationCharge = 120;
    } else if (hoursBeforeDeparture >= 12) {
      cancellationCharge = fare * 0.5;
    } else if (hoursBeforeDeparture >= 4) {
      cancellationCharge = fare * 0.5;
    } else {
      return { refundAmount: 0, cancellationCharge: fare, clerkage: 0, gst: 0 };
    }
  }

  const totalCharges = cancellationCharge + clerkage;
  const gst = totalCharges * 0.05;
  const refundAmount = fare - cancellationCharge - clerkage - gst;

  return {
    refundAmount: Math.max(0, Math.round(refundAmount)),
    cancellationCharge: Math.round(cancellationCharge),
    clerkage,
    gst: Math.round(gst)
  };
};
