// Mock Database for Intelligent Chatbot Features

// Runtime tracking for cancelled tickets (persisted in browser storage)
const CANCELLED_TICKETS_KEY = "irctc_cancelled_tickets";

function getCancelledTickets(): Record<
  string,
  { fare: number; cancelledAt: string; refundAmount: number }
> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(CANCELLED_TICKETS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveCancelledTicket(pnr: string, fare: number, refundAmount: number) {
  if (typeof window === "undefined") return;
  try {
    const cancelled = getCancelledTickets();
    cancelled[pnr] = {
      fare,
      cancelledAt: new Date().toISOString(),
      refundAmount,
    };
    localStorage.setItem(CANCELLED_TICKETS_KEY, JSON.stringify(cancelled));
  } catch (error) {
    console.error("Failed to save cancelled ticket:", error);
  }
}

export function markTicketAsCancelled(
  pnr: string,
  fare: number,
  refundAmount: number,
) {
  saveCancelledTicket(pnr, fare, refundAmount);
}

function isTicketCancelled(pnr: string): boolean {
  const cancelled = getCancelledTickets();
  return pnr in cancelled;
}

function getCancelledTicketData(pnr: string) {
  const cancelled = getCancelledTickets();
  return cancelled[pnr] || null;
}

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
  status: "confirmed" | "rac" | "waitlist" | "cancelled";
  quota: "general" | "tatkal" | "premium-tatkal" | "ladies";
}

export interface MockTrainStatus {
  trainNumber: string;
  trainName: string;
  status: "running" | "delayed" | "cancelled" | "diverted";
  delay: number; // in minutes
  currentLocation: string;
  expectedArrival: string;
  lastUpdated: string;
}

export interface MockRefundStatus {
  pnr: string;
  status: "initiated" | "approved" | "processing" | "credited" | "rejected";
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
  status: "received" | "processing" | "rejected";
  date: string;
  reason?: string;
  trainNumber?: string;
  trainName?: string;
}

// Mock PNR Database
export const mockPNRDatabase: Record<string, MockPNR> = {
  "1234567890": {
    pnr: "1234567890",
    trainNumber: "12301",
    trainName: "Howrah Rajdhani Express",
    from: "Howrah Junction (HWH)",
    to: "New Delhi (NDLS)",
    journeyDate: "2026-01-25",
    bookingDate: "2026-01-10",
    class: "AC 3-Tier (3A)",
    fare: 3450,
    passengers: [
      { name: "Rajesh Kumar", age: 32, status: "CNF", seat: "B4-23" },
      { name: "Priya Sharma", age: 28, status: "CNF", seat: "B4-24" },
    ],
    status: "confirmed",
    quota: "general",
  },
  "9876543210": {
    pnr: "9876543210",
    trainNumber: "12951",
    trainName: "Mumbai Rajdhani Express",
    from: "Mumbai Central (BCT)",
    to: "New Delhi (NDLS)",
    journeyDate: "2026-01-22",
    bookingDate: "2026-01-08",
    class: "AC 2-Tier (2A)",
    fare: 4250,
    passengers: [{ name: "Amit Patel", age: 45, status: "CNF", seat: "A1-15" }],
    status: "confirmed",
    quota: "general",
  },
  "5555555555": {
    pnr: "5555555555",
    trainNumber: "12259",
    trainName: "Duronto Express",
    from: "Sealdah (SDAH)",
    to: "New Delhi (NDLS)",
    journeyDate: "2026-01-20",
    bookingDate: "2026-01-19",
    class: "AC 3-Tier (3A)",
    fare: 2890,
    passengers: [
      { name: "Sunita Singh", age: 35, status: "CNF", seat: "C2-42" },
    ],
    status: "confirmed",
    quota: "premium-tatkal",
  },
  "1111111111": {
    pnr: "1111111111",
    trainNumber: "12430",
    trainName: "Lucknow Mail",
    from: "New Delhi (NDLS)",
    to: "Lucknow (LKO)",
    journeyDate: "2026-01-28",
    bookingDate: "2026-01-12",
    class: "Sleeper (SL)",
    fare: 890,
    passengers: [
      { name: "Vikram Yadav", age: 28, status: "RAC", seat: "RAC-12" },
    ],
    status: "rac",
    quota: "general",
  },
  "2222222222": {
    pnr: "2222222222",
    trainNumber: "12925",
    trainName: "Paschim Express",
    from: "Amritsar (ASR)",
    to: "Mumbai Bandra (BDTS)",
    journeyDate: "2026-02-05",
    bookingDate: "2026-01-15",
    class: "AC 3-Tier (3A)",
    fare: 3150,
    passengers: [
      { name: "Meera Kapoor", age: 42, status: "WL", seat: "WL-8" },
      { name: "Rohan Kapoor", age: 15, status: "WL", seat: "WL-9" },
    ],
    status: "waitlist",
    quota: "general",
  },
};

// Mock Train Status Database
export const mockTrainStatus: Record<string, MockTrainStatus> = {
  "12301": {
    trainNumber: "12301",
    trainName: "Howrah Rajdhani",
    status: "running",
    delay: 0,
    currentLocation: "Kanpur Central",
    expectedArrival: "22:30",
    lastUpdated: "2026-01-18 15:30",
  },
  "12951": {
    trainNumber: "12951",
    trainName: "Mumbai Rajdhani",
    status: "delayed",
    delay: 120,
    currentLocation: "Pune Junction",
    expectedArrival: "18:45",
    lastUpdated: "2026-01-18 15:28",
  },
  "12259": {
    trainNumber: "12259",
    trainName: "Duronto Express",
    status: "cancelled",
    delay: 0,
    currentLocation: "N/A",
    expectedArrival: "N/A",
    lastUpdated: "2026-01-18 08:00",
  },
  "12430": {
    trainNumber: "12430",
    trainName: "Lucknow Express",
    status: "running",
    delay: 15,
    currentLocation: "Ghaziabad",
    expectedArrival: "06:45",
    lastUpdated: "2026-01-18 15:25",
  },
  "12925": {
    trainNumber: "12925",
    trainName: "Paschim Express",
    status: "running",
    delay: 0,
    currentLocation: "Jaipur",
    expectedArrival: "14:20",
    lastUpdated: "2026-01-18 15:20",
  },
};

// Mock Refund Status Database
export const mockRefundStatus: Record<string, MockRefundStatus> = {
  "1234567890": {
    pnr: "1234567890",
    status: "processing",
    percentage: 60,
    amount: 3123,
    submittedDate: "2026-01-18",
    approvedDate: "2026-01-19",
    expectedCreditDate: "2026-01-22",
    stages: {
      received: true,
      approved: true,
      processing: true,
      credited: false,
    },
  },
  "9876543210": {
    pnr: "9876543210",
    status: "approved",
    percentage: 40,
    amount: 3850,
    submittedDate: "2026-01-15",
    approvedDate: "2026-01-17",
    expectedCreditDate: "2026-01-21",
    stages: {
      received: true,
      approved: true,
      processing: false,
      credited: false,
    },
  },
  "5555555555": {
    pnr: "5555555555",
    status: "rejected",
    percentage: 0,
    amount: 0,
    submittedDate: "2026-01-10",
    expectedCreditDate: "N/A",
    stages: {
      received: true,
      approved: false,
      processing: false,
      credited: false,
    },
  },
};

// Mock Refund History
export const mockRefundHistory: RefundHistory[] = [
  {
    pnr: "1234567890",
    amount: 3123,
    status: "processing",
    date: "2026-01-18",
    trainNumber: "12301",
    trainName: "Howrah Rajdhani",
  },
  {
    pnr: "9876543210",
    amount: 3850,
    status: "processing",
    date: "2026-01-15",
    trainNumber: "12951",
    trainName: "Mumbai Rajdhani",
  },
  {
    pnr: "5555555555",
    amount: 0,
    status: "rejected",
    date: "2026-01-10",
    reason: "Premium Tatkal - No refund eligible",
    trainNumber: "12259",
    trainName: "Duronto Express",
  },
  {
    pnr: "8888888888",
    amount: 2100,
    status: "received",
    date: "2025-12-05",
    trainNumber: "12423",
    trainName: "Dibrugarh Rajdhani",
  },
  {
    pnr: "7777777777",
    amount: 890,
    status: "received",
    date: "2025-12-20",
    trainNumber: "12317",
    trainName: "Akal Takht Express",
  },
];

// Alternative Train Suggestions
export const alternativeTrains = [
  {
    trainNumber: "12302",
    trainName: "Howrah Rajdhani",
    from: "Howrah",
    to: "New Delhi",
    departure: "2026-01-25 18:00",
    arrival: "2026-01-26 10:15",
    availableSeats: { "3A": 4, "2A": 2, "1A": 1 },
    fare: { "3A": 3550, "2A": 4850, "1A": 6950 },
  },
  {
    trainNumber: "12305",
    trainName: "Kalka Mail",
    from: "Howrah",
    to: "New Delhi",
    departure: "2026-01-26 10:00",
    arrival: "2026-01-27 05:30",
    availableSeats: { "3A": 8, "2A": 5, SL: 12 },
    fare: { "3A": 2950, "2A": 4250, SL: 890 },
  },
];

// Sample train names and stations for generating mock data
const sampleTrains = [
  { number: "12301", name: "Howrah Rajdhani Express" },
  { number: "12951", name: "Mumbai Rajdhani Express" },
  { number: "12259", name: "Sealdah Duronto Express" },
  { number: "12430", name: "Lucknow Mail" },
  { number: "12925", name: "Paschim Express" },
  { number: "12627", name: "Karnataka Express" },
  { number: "12839", name: "Chennai Mail" },
  { number: "12002", name: "Bhopal Shatabdi" },
];

const sampleStations = [
  "New Delhi (NDLS)",
  "Mumbai Central (BCT)",
  "Howrah Junction (HWH)",
  "Chennai Central (MAS)",
  "Bangalore City (SBC)",
  "Pune Junction (PUNE)",
  "Agra Cantt (AGC)",
  "Jaipur Junction (JP)",
  "Lucknow (LKO)",
  "Kolkata (KOAA)",
];

const sampleClasses = [
  "AC 1st Class (1A)",
  "AC 2-Tier (2A)",
  "AC 3-Tier (3A)",
  "Sleeper (SL)",
];
const sampleNames = [
  "Rahul Sharma",
  "Priya Singh",
  "Amit Kumar",
  "Sneha Patel",
  "Vikram Joshi",
  "Anjali Gupta",
];

// Generate deterministic but varied mock data based on PNR
function generateMockPNR(pnr: string): MockPNR {
  const pnrNum = parseInt(pnr);
  const trainIndex = pnrNum % sampleTrains.length;
  const fromIndex = pnrNum % sampleStations.length;
  const toIndex = (pnrNum + 3) % sampleStations.length;
  const classIndex = pnrNum % sampleClasses.length;
  const nameIndex = pnrNum % sampleNames.length;

  const statuses: ("confirmed" | "rac" | "waitlist")[] = [
    "confirmed",
    "confirmed",
    "confirmed",
    "rac",
    "waitlist",
  ];
  const statusIndex = pnrNum % statuses.length;

  const quotas: ("general" | "tatkal" | "ladies")[] = [
    "general",
    "general",
    "general",
    "tatkal",
    "ladies",
  ];
  const quotaIndex = pnrNum % quotas.length;

  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + (pnrNum % 10) + 1);
  const journeyDate = baseDate.toISOString().split("T")[0];

  const bookingDate = new Date();
  bookingDate.setDate(bookingDate.getDate() - (pnrNum % 5) - 1);

  const fare = 1500 + (pnrNum % 3000);

  return {
    pnr,
    trainNumber: sampleTrains[trainIndex].number,
    trainName: sampleTrains[trainIndex].name,
    from: sampleStations[fromIndex],
    to: sampleStations[
      toIndex === fromIndex ? (toIndex + 1) % sampleStations.length : toIndex
    ],
    journeyDate,
    bookingDate: bookingDate.toISOString().split("T")[0],
    class: sampleClasses[classIndex],
    fare,
    passengers: [
      {
        name: sampleNames[nameIndex],
        age: 25 + (pnrNum % 30),
        status:
          statuses[statusIndex] === "confirmed"
            ? "CNF"
            : statuses[statusIndex] === "rac"
              ? "RAC"
              : "WL",
        seat:
          statuses[statusIndex] === "confirmed"
            ? `B${(pnrNum % 8) + 1}-${(pnrNum % 60) + 1}`
            : "-",
      },
    ],
    status: statuses[statusIndex],
    quota: quotas[quotaIndex],
  };
}

// Generate mock refund status based on PNR
function generateMockRefundStatus(pnr: string): MockRefundStatus {
  const pnrNum = parseInt(pnr);
  const statuses: ("initiated" | "approved" | "processing" | "credited")[] = [
    "initiated",
    "approved",
    "processing",
    "credited",
  ];
  const statusIndex = pnrNum % statuses.length;
  const status = statuses[statusIndex];

  const percentage =
    status === "credited"
      ? 75
      : status === "processing"
        ? 60
        : status === "approved"
          ? 50
          : 0;
  const amount = 1000 + (pnrNum % 4000);

  const submittedDate = new Date();
  submittedDate.setDate(submittedDate.getDate() - (pnrNum % 5) - 1);

  const approvedDate = new Date(submittedDate);
  approvedDate.setDate(approvedDate.getDate() + 1);

  const expectedCreditDate = new Date(approvedDate);
  expectedCreditDate.setDate(expectedCreditDate.getDate() + 5);

  return {
    pnr,
    status,
    percentage,
    amount: Math.round(amount * (percentage / 100)),
    submittedDate: submittedDate.toISOString().split("T")[0],
    approvedDate:
      status !== "initiated"
        ? approvedDate.toISOString().split("T")[0]
        : undefined,
    creditedDate:
      status === "credited"
        ? expectedCreditDate.toISOString().split("T")[0]
        : undefined,
    expectedCreditDate: expectedCreditDate.toISOString().split("T")[0],
    stages: {
      received: true,
      approved: status !== "initiated",
      processing: status === "processing" || status === "credited",
      credited: status === "credited",
    },
  };
}

// Helper function to get PNR data - returns mock data for any valid 10-digit PNR
export const getPNRData = (pnr: string): MockPNR | null => {
  // First check if it's a predefined PNR
  if (mockPNRDatabase[pnr]) {
    const pnrData = mockPNRDatabase[pnr];
    // Check if this ticket was cancelled in the session
    if (isTicketCancelled(pnr)) {
      return { ...pnrData, status: "cancelled" };
    }
    return pnrData;
  }

  // For any valid 10-digit PNR, generate mock data
  if (/^\d{10}$/.test(pnr)) {
    const generated = generateMockPNR(pnr);
    // Check if this ticket was cancelled in the session
    if (isTicketCancelled(pnr)) {
      return { ...generated, status: "cancelled" };
    }
    return generated;
  }

  return null;
};

// Helper function to get train status
export const getTrainStatus = (trainNumber: string): MockTrainStatus | null => {
  return mockTrainStatus[trainNumber] || null;
};

// Helper function to get refund status - returns mock data for any valid 10-digit PNR
export const getRefundStatus = (pnr: string): MockRefundStatus | null => {
  // Check if this ticket was cancelled in the current session
  const cancelledData = getCancelledTicketData(pnr);
  if (cancelledData) {
    // Return refund status for recently cancelled ticket
    const daysSinceCancellation = Math.floor(
      (new Date().getTime() - new Date(cancelledData.cancelledAt).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    return {
      pnr,
      status:
        daysSinceCancellation < 1
          ? "processing"
          : daysSinceCancellation < 3
            ? "approved"
            : "credited",
      percentage: 100,
      amount: cancelledData.refundAmount,
      submittedDate: cancelledData.cancelledAt.split("T")[0],
      approvedDate:
        daysSinceCancellation >= 1
          ? new Date(Date.now() + 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0]
          : undefined,
      creditedDate:
        daysSinceCancellation >= 3
          ? new Date().toISOString().split("T")[0]
          : undefined,
      expectedCreditDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      stages: {
        received: true,
        approved: daysSinceCancellation >= 1,
        processing: daysSinceCancellation >= 1,
        credited: daysSinceCancellation >= 3,
      },
    };
  }

  // First check if it's a predefined PNR
  if (mockRefundStatus[pnr]) {
    return mockRefundStatus[pnr];
  }

  // For any valid 10-digit PNR, generate mock data
  if (/^\d{10}$/.test(pnr)) {
    return generateMockRefundStatus(pnr);
  }

  return null;
};
