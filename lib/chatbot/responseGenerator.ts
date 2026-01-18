import { getIntentByName, extractStations } from "./intentDetector";
import { fallbackResponses } from "./intents";
import {
  getPNRData,
  getTrainStatus,
  getRefundStatus,
  mockRefundHistory,
  alternativeTrains,
} from "./mockData";
import { updateContext } from "./conversationContext";

export function generateResponse(
  intentName: string | null,
  userMessage: string = "",
): {
  text: string;
  link?: string;
  from?: string;
  to?: string;
  richContent?: Record<string, unknown>;
} {
  if (!intentName) {
    // Return random fallback response
    return {
      text: fallbackResponses[
        Math.floor(Math.random() * fallbackResponses.length)
      ],
    };
  }

  // Handle context-aware explanation intents
  if (
    intentName === "refund_explanation" ||
    intentName === "refund_rules_explanation" ||
    intentName === "refund_process_explanation" ||
    intentName === "train_delay_explanation" ||
    intentName === "tdr_explanation"
  ) {
    const intent = getIntentByName(intentName);
    if (intent && intent.responses.length > 0) {
      return { text: intent.responses[0] };
    }
  }

  // PRIORITY 2: PNR & Train Status Features

  // Handle detailed PNR check with mock data
  if (intentName === "pnr_check_detailed") {
    const pnrMatch = userMessage.match(/\b(\d{10})\b/);

    if (pnrMatch) {
      const pnr = pnrMatch[1];
      const pnrData = getPNRData(pnr);

      // Update conversation context
      updateContext(userMessage, intentName, { pnr, topic: "booking" });

      if (pnrData) {
        return {
          text: `Booking found for PNR ${pnr}:`,
          richContent: {
            type: "pnr-details",
            data: pnrData,
          },
        };
      } else {
        return {
          text: `PNR ${pnr} not found in the system.\n\nPossible reasons:\n- PNR number might be incorrect\n- Booking might be very old (>9 months)\n- Check if you entered all 10 digits correctly\n\nTry these demo PNRs:\n- 1234567890: Confirmed booking\n- 9876543210: Confirmed booking\n- 2222222222: Waitlist booking`,
        };
      }
    }

    return {
      text: 'Please provide your 10-digit PNR number.\n\nExample: "Check PNR 1234567890"\n\nDemo PNRs available:\n- 1234567890: Howrah to Delhi\n- 9876543210: Mumbai to Delhi\n- 5555555555: Premium Tatkal',
    };
  }

  // Handle train status check
  if (intentName === "train_status_check") {
    const trainMatch = userMessage.match(/\b(\d{5})\b/);
    const pnrMatch = userMessage.match(/\b(\d{10})\b/);

    let trainNumber = "";

    // Extract train number from PNR or direct train number
    if (pnrMatch) {
      const pnrData = getPNRData(pnrMatch[1]);
      if (pnrData) trainNumber = pnrData.trainNumber;
    } else if (trainMatch) {
      trainNumber = trainMatch[1];
    }

    if (trainNumber) {
      const trainStatus = getTrainStatus(trainNumber);

      if (trainStatus) {
        return {
          text: `Train ${trainNumber} status:`,
          richContent: {
            type: "train-status",
            data: trainStatus,
          },
        };
      }
    }

    return {
      text: 'Please provide a train number or PNR to check status.\n\nExample: "Check status of train 12301"\n\nDemo train numbers:\n- 12301: Running on time\n- 12951: Delayed by 2 hours\n- 12259: Cancelled',
    };
  }

  // Handle refund status check
  if (intentName === "refund_status_check") {
    const pnrMatch = userMessage.match(/\b(\d{10})\b/);

    if (pnrMatch) {
      const pnr = pnrMatch[1];
      const refundStatus = getRefundStatus(pnr);

      // Update conversation context
      updateContext(userMessage, intentName, {
        pnr,
        topic: "refund",
        richContent: refundStatus,
      });

      if (refundStatus) {
        return {
          text: `Refund status for PNR ${pnr}:`,
          richContent: {
            type: "refund-status",
            data: refundStatus,
          },
        };
      } else {
        return {
          text: `No refund found for PNR ${pnr}.\n\nPossible reasons:\n- Ticket hasn't been cancelled yet\n- Refund already completed\n- No refund applicable\n\nDemo PNRs with refund status:\n- 1234567890: Processing refund\n- 9876543210: Approved refund\n- 5555555555: Rejected (Premium Tatkal)`,
        };
      }
    }

    return {
      text: 'Please provide your PNR to check refund status.\n\nExample: "Where is my refund for 1234567890"\n\nDemo PNRs with refunds:\n- 1234567890: 60% processed\n- 9876543210: Approved, pending credit\n- 5555555555: Rejected',
    };
  }

  // Handle refund history
  if (intentName === "refund_history") {
    return {
      text: `Your recent refund transactions:`,
      richContent: {
        type: "refund-history",
        data: mockRefundHistory,
      },
    };
  }

  // Handle refund calculator
  if (intentName === "refund_calculator") {
    return {
      text: "Calculate your estimated refund amount based on ticket type and cancellation timing:",
      richContent: {
        type: "refund-calculator",
      },
    };
  }

  // Handle TDR filing
  if (intentName === "tdr_filing") {
    return {
      text: "TDR (Ticket Deposit Receipt) is used for refund claims when:\n- Train is cancelled or rescheduled\n- Train delayed by more than 3 hours\n- Services not provided (AC/food/water)\n- Booking errors\n\nFollow the steps below to file:",
      richContent: {
        type: "tdr-filing",
      },
    };
  }

  // Handle cancelled train refund query
  if (intentName === "cancelled_train_refund") {
    const trainMatch = userMessage.match(/\b(\d{5})\b/);

    if (trainMatch) {
      const trainNumber = trainMatch[1];
      const trainStatus = getTrainStatus(trainNumber);

      if (trainStatus && trainStatus.status === "cancelled") {
        return {
          text: `Train ${trainNumber} is cancelled. Here are alternatives for your journey:`,
          richContent: {
            type: "alternative-trains",
            data: {
              originalTrain: `${trainNumber} - ${trainStatus.trainName}`,
              alternatives: alternativeTrains,
              reason: "Original train cancelled",
            },
          },
        };
      }
    }

    return {
      text: 'For cancelled trains, you are eligible for full refund automatically.\n\nWhat happens:\n- Full fare refunded automatically\n- No cancellation charges\n- Credit within 5-7 business days\n\nTo see alternatives, provide your cancelled train number.\n\nExample: "My train 12259 is cancelled"',
    };
  }

  // Handle partial cancellation
  if (intentName === "partial_cancellation") {
    return {
      text: "Partial Cancellation allows you to cancel specific passengers from your ticket.\n\nHow it works:\n- Select passengers to cancel\n- Refund calculated per passenger\n- Cancellation charges apply per person\n- Remaining passengers unaffected\n\nUse the calculator to estimate your refund:",
      richContent: {
        type: "refund-calculator",
      },
    };
  }

  // Handle alternative trains request
  if (intentName === "alternative_trains") {
    const trainMatch = userMessage.match(/\b(\d{5})\b/);

    if (trainMatch) {
      const trainNumber = trainMatch[1];
      const trainStatus = getTrainStatus(trainNumber);

      if (trainStatus) {
        return {
          text: `Alternative trains available for your route:`,
          richContent: {
            type: "alternative-trains",
            data: {
              originalTrain: `${trainNumber} - ${trainStatus.trainName}`,
              alternatives: alternativeTrains,
              reason:
                trainStatus.status === "cancelled"
                  ? "Train cancelled"
                  : "Alternative options requested",
            },
          },
        };
      }
    }

    return {
      text: 'To find alternative trains, provide:\n- Your original train number, OR\n- Route (From to To)\n\nExample: "Show alternatives for train 12951"\n\nDemo trains: 12259 (Cancelled), 12951 (Delayed)',
    };
  }

  // ORIGINAL HANDLERS (keeping existing functionality)

  // Handle ticket booking intent
  if (intentName === "ticket_booking") {
    const stations = extractStations(userMessage);

    return {
      text: `I can help you book a train ticket! Fill in the details below:`,
      richContent: {
        type: "ticket-booking",
        data: {
          from: stations.from || "",
          to: stations.to || "",
        },
      },
    };
  }

  // Handle if user provides station details in follow-up
  if (intentName === "ticket_booking_with_details") {
    const stations = extractStations(userMessage);

    return {
      text: `Great! Let me help you book from **${capitalizeWords(stations.from || "")}** to **${capitalizeWords(stations.to || "")}**:`,
      richContent: {
        type: "ticket-booking",
        data: {
          from: stations.from || "",
          to: stations.to || "",
        },
      },
    };
  }

  // Handle refund status queries with timeline
  if (intentName === "refund_status") {
    const ticketTypeMatch = userMessage.match(
      /\b(e-ticket|online|counter|offline)\b/i,
    );
    let ticketType: "e-ticket" | "counter" = "e-ticket";

    if (ticketTypeMatch) {
      const type = ticketTypeMatch[1].toLowerCase();
      ticketType =
        type === "counter" || type === "offline" ? "counter" : "e-ticket";
    }

    return {
      text: `I'll show you the complete refund process timeline for your ${ticketType === "e-ticket" ? "e-ticket" : "counter ticket"}.\n\nHere's what happens at each stage:`,
      richContent: {
        type: "refund-timeline",
        ticketType: ticketType,
      },
    };
  }

  // Handle specific e-ticket refund
  if (intentName === "refund_e_ticket") {
    return {
      text: "Here's the complete e-ticket refund process timeline:",
      richContent: {
        type: "refund-timeline",
        ticketType: "e-ticket",
      },
    };
  }

  // Handle specific counter ticket refund
  if (intentName === "refund_counter_ticket") {
    return {
      text: "Here's the complete counter ticket refund process timeline:",
      richContent: {
        type: "refund-timeline",
        ticketType: "counter",
      },
    };
  }

  const intent = getIntentByName(intentName);

  if (!intent || intent.responses.length === 0) {
    return {
      text: fallbackResponses[
        Math.floor(Math.random() * fallbackResponses.length)
      ],
    };
  }

  // Return random response from intent's responses
  return {
    text: intent.responses[Math.floor(Math.random() * intent.responses.length)],
  };
}

function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
