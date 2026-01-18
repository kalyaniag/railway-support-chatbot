import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  getPNRData,
  getTrainStatus,
  getRefundStatus,
  mockRefundHistory,
  alternativeTrains,
} from "@/lib/chatbot/mockData";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are DISHA 2.0, a proactive AI copilot for IRCTC - Indian Railway's official virtual assistant.

ROLE:
You are a full-service travel assistant capable of helping with:
- Train ticket booking guidance
- PNR status checking
- Train running status
- Refunds and cancellations
- TDR (Ticket Deposit Receipt) filing
- Tatkal booking rules
- Food ordering (e-Catering)
- Account and payment issues
- General railway information

TONE & BEHAVIOR:
- Helpful, friendly, and professional
- Clear and concise responses
- Provide actionable information
- Use simple language
- Be patient with follow-up questions

MOCK DATABASE FOR DEMONSTRATION:

PNR Database (10-digit numbers):
- 1234567890: Howrah Rajdhani (12301), HWH to NDLS, 25 Jan 2026, 3A class, Rs.3450, 2 passengers (Rajesh Kumar & Priya Sharma) - CONFIRMED
- 9876543210: Mumbai Rajdhani (12951), BCT to NDLS, 22 Jan 2026, 2A class, Rs.4250, 1 passenger (Amit Patel) - CONFIRMED
- 5555555555: Duronto Express (12259), SDAH to NDLS, 20 Jan 2026, 3A class, Rs.2890, Premium Tatkal - CONFIRMED (NON-REFUNDABLE)
- 1111111111: Lucknow Mail (12430), NDLS to LKO, 28 Jan 2026, Sleeper, Rs.890, 1 passenger (Vikram Yadav) - RAC
- 2222222222: Paschim Express (12925), ASR to BDTS, 5 Feb 2026, 3A, Rs.3150, 2 passengers (Meera & Rohan Kapoor) - WAITLIST

Train Status (5-digit numbers):
- 12301 (Howrah Rajdhani): Running on time
- 12951 (Mumbai Rajdhani): DELAYED by 2 hours
- 12259 (Duronto Express): CANCELLED
- 12430 (Lucknow Express): Running, 15 min delay
- 12925 (Paschim Express): Running on time

Refund Status:
- 1234567890: Processing (60%), Rs.3123, expected 22 Jan
- 9876543210: Approved (40%), Rs.3850, expected 21 Jan
- 5555555555: REJECTED - Premium Tatkal (no refund allowed)

---

SERVICE CAPABILITIES:

1. TICKET BOOKING:
- Guide users to IRCTC website/app for booking
- Explain booking process step-by-step
- Provide information about train classes (1A, 2A, 3A, SL, 2S)
- Explain quotas (General, Tatkal, Ladies, Senior Citizen, etc.)

2. PNR STATUS:
- Check booking status using 10-digit PNR
- Show passenger details, coach, berth
- Explain status codes (CNF, RAC, WL)

3. TRAIN STATUS:
- Check live running status
- Show current location, delay information
- Alert about cancellations

4. REFUNDS & CANCELLATIONS:
Cancellation charges:
- More than 48 hours: Rs.240 (AC) / Rs.120 (Sleeper) flat
- 12-48 hours: 25% of fare
- 4-12 hours: 50% of fare
- Less than 4 hours: No refund
- Tatkal: No refund on voluntary cancellation
- Premium Tatkal: Non-refundable under any circumstance

5. TDR FILING:
Valid reasons: Train cancelled, delayed >3 hours, AC not working, no services provided
Review timeline: 15-30 days
Refund depends on railway approval

6. TATKAL BOOKING:
- AC classes: Opens at 10:00 AM, one day before journey
- Non-AC: Opens at 11:00 AM, one day before journey
- ID proof mandatory
- Higher charges apply
- No voluntary cancellation refund

7. FOOD ORDERING (e-Catering):
- Available via ecatering.irctc.co.in
- Order using PNR number
- Delivery at seat
- Available at 400+ stations

8. ACCOUNT & PAYMENT:
- Password reset via registered email/mobile
- Transaction issues: Auto-refund in 3-7 days
- Contact: 14646 or care@irctc.co.in

---

RESPONSE GUIDELINES:
- **REMEMBER CONVERSATION CONTEXT**: Pay attention to previously mentioned PNR numbers, train numbers, and topics
- When user says "it", "this", "that", "my ticket", "the same", refer to previously discussed items
- If user cancelled a ticket in previous messages, acknowledge it when they ask for refund details
- Be helpful and guide users to complete their tasks
- For booking, provide clear steps and redirect to IRCTC
- For PNR/train status, use the mock data when available
- For refunds, explain eligibility and timelines clearly
- Always offer to help with follow-up questions
- If PNR not found, suggest demo PNRs: 1234567890, 9876543210, 5555555555

Keep responses concise but complete. Use bullet points for lists.`;

// Helper function to detect user intent
function detectUserIntent(message: string): string[] {
  const intents: string[] = [];
  const lowerMessage = message.toLowerCase();

  // PNR related
  if (
    /\b(pnr|booking|ticket)\b.*\b(status|check|find|show|details|where)\b/i.test(
      message,
    ) ||
    /\b\d{10}\b/.test(message)
  ) {
    intents.push("pnr_check");
  }

  // Train status
  if (
    /\b(train|running|delay|cancel|status|where)\b/i.test(message) ||
    /\b\d{5}\b/.test(message)
  ) {
    intents.push("train_status");
  }

  // Refund related
  if (
    /\b(refund|money back|return|credited|payment|eligible|eligibility)\b/i.test(
      lowerMessage,
    )
  ) {
    intents.push("refund");
  }

  // Refund eligibility check
  if (
    /\b(eligible|eligibility|can i get|will i get|do i get)\b.*\b(refund|money|amount)\b/i.test(
      lowerMessage,
    ) ||
    /\b(refund|money)\b.*\b(eligible|eligibility|get back|receive)\b/i.test(
      lowerMessage,
    )
  ) {
    intents.push("refund_eligibility");
  }

  // Refund timeline/process
  if (
    /\b(refund|money).*(time|how long|process|step|timeline|procedure|when|days)\b/i.test(
      lowerMessage,
    ) ||
    /\b(time|how long|process|step|timeline|procedure|when|days).*(refund|money)\b/i.test(
      lowerMessage,
    ) ||
    /\bhow.*(refund|cancellation).*(work|process)\b/i.test(lowerMessage)
  ) {
    intents.push("refund_timeline");
  }

  // E-ticket vs counter ticket
  if (/\be-?ticket\b/i.test(lowerMessage)) {
    intents.push("e_ticket");
  }
  if (
    /\bcounter\b.*\bticket\b/i.test(lowerMessage) ||
    /\boffline\b.*\bticket\b/i.test(lowerMessage)
  ) {
    intents.push("counter_ticket");
  }

  // Why rejected
  if (/\b(why|reason|rejected|denied|not eligible)\b/i.test(lowerMessage)) {
    intents.push("explanation");
  }

  // Cancellation
  if (/\b(cancel|cancellation|want to cancel)\b/i.test(lowerMessage)) {
    intents.push("cancellation");
  }

  // TDR
  if (
    /\btdr\b/i.test(message) ||
    /\b(file|claim|deposit receipt)\b/i.test(lowerMessage)
  ) {
    intents.push("tdr");
  }

  // Alternative trains
  if (
    /\b(alternative|other train|different train|next train)\b/i.test(
      lowerMessage,
    )
  ) {
    intents.push("alternatives");
  }

  // Refund history
  if (/\b(history|all refund|past refund|previous)\b/i.test(lowerMessage)) {
    intents.push("refund_history");
  }

  // Calculate refund
  if (/\b(calculate|how much|estimate|refund amount)\b/i.test(lowerMessage)) {
    intents.push("refund_calculator");
  }

  // Help/greeting
  if (/^(hi|hello|hey|help|what can you do)\b/i.test(message)) {
    intents.push("greeting");
  }

  // Ticket booking
  if (
    /\b(book|booking|reserve|reservation)\b.*\b(ticket|train)\b/i.test(
      lowerMessage,
    ) ||
    /\b(ticket|train)\b.*\b(book|reserve)\b/i.test(lowerMessage) ||
    /\bi want to book\b/i.test(lowerMessage) ||
    /\bbook from here\b/i.test(lowerMessage) ||
    /\bwant.*ticket\b/i.test(lowerMessage) ||
    /\bmake.*reservation\b/i.test(lowerMessage) ||
    /\b(book|reserve).*\b(from|to)\b/i.test(lowerMessage) ||
    /\bneed.*ticket\b/i.test(lowerMessage)
  ) {
    intents.push("ticket_booking");
  }

  // Fare inquiry
  if (
    /\b(fare|price|cost|charge|how much|ticket price)\b/i.test(lowerMessage)
  ) {
    intents.push("fare_inquiry");
  }

  // Tatkal booking
  if (/\btatkal\b/i.test(lowerMessage)) {
    intents.push("tatkal");
  }

  // Food ordering
  if (/\b(food|meal|catering|order food|e-?catering)\b/i.test(lowerMessage)) {
    intents.push("food_ordering");
  }

  // Station code
  if (/\b(station|code|station code)\b/i.test(lowerMessage)) {
    intents.push("station_code");
  }

  // Account/login issues
  if (
    /\b(login|account|password|sign in|forgot|locked)\b/i.test(lowerMessage)
  ) {
    intents.push("account_issues");
  }

  // Payment issues
  if (
    /\b(payment|deduct|transaction|fail|money deducted)\b/i.test(lowerMessage)
  ) {
    intents.push("payment_issues");
  }

  return intents;
}

export async function POST(request: NextRequest) {
  // Parse request body once at the start - store for use in both try and catch
  let message: string = "";
  let conversationHistory: Array<{ text: string; isBot: boolean }> = [];

  try {
    const body = await request.json();
    message = body.message || "";
    conversationHistory = body.conversationHistory || [];
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  // Extract PNR or train numbers from current message
  let pnrMatch = message.match(/\b(\d{10})\b/);
  const trainMatch = message.match(/\b(\d{5})\b/);

  // Check for contextual references like "it", "this", "my ticket", etc.
  const hasContextualReference =
    /\b(it|this|that|my|the same|above|mentioned)\b/i.test(message);

  // If user refers to context but didn't provide PNR, look in conversation history
  if (!pnrMatch && hasContextualReference && conversationHistory.length > 0) {
    // Look for PNR in recent conversation (last 10 messages)
    for (
      let i = conversationHistory.length - 1;
      i >= Math.max(0, conversationHistory.length - 10);
      i--
    ) {
      const historyMsg = conversationHistory[i].text;
      const historyPnr = historyMsg.match(/\b(\d{10})\b/);
      if (historyPnr) {
        pnrMatch = historyPnr;
        console.log(
          `Context: Found PNR ${historyPnr[1]} from conversation history`,
        );
        break;
      }
    }
  }

  const intents = detectUserIntent(message);

  try {
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    let contextInfo = "";
    let richContent = null;

    // Add contextual awareness note if PNR found from history
    if (pnrMatch && hasContextualReference) {
      contextInfo += `\n\n[CONTEXT NOTE: User referred to something from previous conversation (said "${message}"). The PNR ${pnrMatch[1]} was extracted from conversation history. Act naturally as if continuing the same conversation about this PNR.]`;
    }

    // Check if user provided PNR number
    if (pnrMatch) {
      const pnr = pnrMatch[1];
      const pnrData = getPNRData(pnr);
      const refundData = getRefundStatus(pnr);

      if (pnrData) {
        const passengerInfo = pnrData.passengers
          .map((p) => `${p.name} (${p.status}, ${p.seat})`)
          .join(", ");
        contextInfo = `\n\n[SYSTEM DATA - PNR ${pnr} FOUND]:
- Train: ${pnrData.trainName} (${pnrData.trainNumber})
- Route: ${pnrData.from} → ${pnrData.to}
- Journey Date: ${pnrData.journeyDate}
- Class: ${pnrData.class}
- Fare: ₹${pnrData.fare}
- Quota: ${pnrData.quota}
- Status: ${pnrData.status.toUpperCase()}
- Passengers: ${passengerInfo}
${pnrData.quota === "premium-tatkal" ? "⚠️ IMPORTANT: This is a Premium Tatkal ticket - NON-REFUNDABLE" : ""}
The UI will auto-display a detailed card. Provide a conversational summary.`;

        richContent = {
          type: "pnr-details",
          data: pnrData,
        };

        // Also check refund status if refund intent detected
        if (intents.includes("refund") && refundData) {
          contextInfo += `\n\n[REFUND STATUS FOR ${pnr}]:
- Status: ${refundData.status.toUpperCase()}
- Amount: ₹${refundData.amount}
- Progress: ${refundData.percentage}%
- Expected Credit: ${refundData.expectedCreditDate}
${refundData.status === "rejected" ? "REASON: Premium Tatkal tickets are non-refundable under IRCTC policy." : ""}`;

          richContent = {
            type: "refund-status",
            data: refundData,
          };
        }
      } else {
        contextInfo = `\n\n[SYSTEM: PNR ${pnr} NOT FOUND in database. Politely inform user and suggest demo PNRs: 1234567890 (Confirmed), 9876543210 (Confirmed), 5555555555 (Premium Tatkal), 1111111111 (RAC), 2222222222 (Waitlist)]`;
      }
    }

    // Check if user provided train number
    if (trainMatch && !pnrMatch) {
      const trainNumber = trainMatch[1];
      const trainData = getTrainStatus(trainNumber);

      if (trainData) {
        contextInfo = `\n\n[SYSTEM DATA - TRAIN ${trainNumber} STATUS]:
- Train: ${trainData.trainName}
- Status: ${trainData.status.toUpperCase()}
- Delay: ${trainData.delay} minutes
- Current Location: ${trainData.currentLocation}
- Expected Arrival: ${trainData.expectedArrival}
- Last Updated: ${trainData.lastUpdated}
${trainData.status === "cancelled" ? "⚠️ TRAIN CANCELLED: Suggest alternative trains (12302 Howrah Rajdhani or 12305 Kalka Mail) and explain refund process." : ""}
${trainData.status === "delayed" && trainData.delay >= 180 ? "💡 DELAY >3 hours: User may be eligible for TDR refund claim." : ""}
The UI will auto-display train status card.`;

        richContent = {
          type: "train-status",
          data: trainData,
        };

        // If train cancelled, also prepare alternative trains
        if (
          trainData.status === "cancelled" &&
          intents.includes("alternatives")
        ) {
          richContent = {
            type: "alternative-trains",
            data: {
              originalTrain: `${trainNumber} - ${trainData.trainName}`,
              alternatives: alternativeTrains,
              reason: "Train cancelled",
            },
          };
        }
      } else {
        contextInfo = `\n\n[SYSTEM: Train ${trainNumber} NOT FOUND. Suggest demo trains: 12301 (Running), 12951 (Delayed 2hrs), 12259 (Cancelled), 12430 (Running, slight delay)]`;
      }
    }

    // Handle refund history request
    if (intents.includes("refund_history")) {
      contextInfo += `\n\n[SYSTEM: User wants refund history. Show the refund history dashboard with these entries:
1. PNR 1234567890 - ₹3123 Processing (Howrah Rajdhani)
2. PNR 9876543210 - ₹3850 Processing (Mumbai Rajdhani)
3. PNR 5555555555 - ₹0 Rejected (Premium Tatkal - no refund)
4. PNR 8888888888 - ₹2100 Received (Dibrugarh Rajdhani)
5. PNR 7777777777 - ₹890 Received (Akal Takht Express)]`;

      richContent = {
        type: "refund-history",
        data: mockRefundHistory,
      };
    }

    // Handle refund calculator request
    if (intents.includes("refund_calculator") && !pnrMatch) {
      contextInfo += `\n\n[SYSTEM: User wants to calculate refund. Show the refund calculator form. Explain briefly:
- >48 hours before: ₹240 flat charge (AC) / ₹120 (Sleeper)
- 12-48 hours: 25% deduction
- 4-12 hours: 50% deduction
- <4 hours: No refund
- Premium Tatkal: No refund ever]`;

      richContent = {
        type: "refund-calculator",
      };
    }

    // Handle TDR filing request
    if (intents.includes("tdr") && !pnrMatch) {
      contextInfo += `\n\n[SYSTEM: User interested in TDR. Show TDR filing wizard. Explain TDR is for:
- Train cancelled/delayed >3 hours
- AC/services not working
- Wrong charge/duplicate booking
- Medical emergency
Guide them through the process step by step.]`;

      richContent = {
        type: "tdr-filing",
      };
    }

    // Handle alternative trains request
    if (intents.includes("alternatives") && !trainMatch && !pnrMatch) {
      contextInfo += `\n\n[SYSTEM: User wants alternative trains. Show alternatives:
- 12302 Howrah Rajdhani (HWH→NDLS, 3A: 4 seats, 2A: 2 seats)
- 12305 Kalka Mail (HWH→NDLS, 3A: 8 seats, 2A: 5 seats, SL: 12 seats)
Ask which train was cancelled or route they need.]`;

      richContent = {
        type: "alternative-trains",
        data: {
          originalTrain: "Your train",
          alternatives: alternativeTrains,
          reason: "Looking for alternatives",
        },
      };
    }

    // Handle ticket booking request - show booking form
    if (intents.includes("ticket_booking") && !richContent) {
      // Extract stations from the message
      const stationPatterns = [
        /\bfrom\s+([a-zA-Z\s]+?)\s+to\s+([a-zA-Z\s]+?)(?:\s|$|\.|\,|\?)/i,
        /([a-zA-Z]+)\s+se\s+([a-zA-Z]+)/i, // Hindi: "X se Y"
        /([a-zA-Z]+)\s+to\s+([a-zA-Z]+)/i, // Simple: "X to Y"
      ];

      let fromStation = "";
      let toStation = "";

      for (const pattern of stationPatterns) {
        const match = message.match(pattern);
        if (match) {
          fromStation = match[1].trim();
          toStation = match[2].trim();
          break;
        }
      }

      const stationInfo =
        fromStation && toStation
          ? `I'll help you book from **${fromStation.charAt(0).toUpperCase() + fromStation.slice(1).toLowerCase()}** to **${toStation.charAt(0).toUpperCase() + toStation.slice(1).toLowerCase()}**. `
          : "";

      contextInfo += `\n\n[SYSTEM: User wants to book a ticket${fromStation ? ` from ${fromStation} to ${toStation}` : ""}. A booking form is being shown below your response. Your response should be SHORT (1-2 sentences max) and should tell the user to fill in the form below. Do NOT tell them to go to IRCTC website - the form is right here! Example: "${stationInfo}Please fill in the details below to proceed with your booking."]`;

      richContent = {
        type: "ticket-booking",
        data: {
          from: fromStation,
          to: toStation,
        },
      };
    }

    // Handle refund timeline/process request
    if (intents.includes("refund_timeline") && !richContent) {
      // Determine ticket type
      let ticketType: "e-ticket" | "counter" = "e-ticket";
      if (intents.includes("counter_ticket")) {
        ticketType = "counter";
      }

      contextInfo += `\n\n[SYSTEM: User asking about refund timeline/process. Show the refund timeline card for ${ticketType}.

**E-Ticket Refund Timeline (3-7 days):**
1. Day 1: Ticket Cancelled - Cancellation request confirmed
2. Day 1: TDR Filed - Ticket Deposit Receipt generated automatically
3. Day 2-5: Processing Refund - Amount being calculated
4. Day 5-7: Refund Initiated - Sent to bank
5. Day 7-10: Amount Credited - Credited to original payment method

**Counter Ticket Refund Timeline (15-30 days):**
1. Day 1: Ticket Cancelled at counter
2. Day 1-7: TDR Submission - Submit form at counter
3. Day 7-15: Document Verification
4. Day 15-25: Refund Processing by accounts
5. Day 25-30: Amount Credited

Explain the timeline based on ticket type and offer to show the visual timeline.]`;

      richContent = {
        type: "refund-timeline",
        ticketType: ticketType,
      };
    }

    // Handle refund eligibility questions
    if (
      (intents.includes("refund_eligibility") || intents.includes("refund")) &&
      !richContent &&
      !pnrMatch
    ) {
      contextInfo += `\n\n[SYSTEM: User asking about refund eligibility. They didn't provide PNR. Ask for PNR to check specific eligibility, and explain general rules:

**Refund Eligibility:**
✅ **You ARE eligible for refund if:**
- Regular ticket cancelled >4 hours before departure
- Train cancelled by Railways (full refund)
- Train delayed >3 hours (file TDR)
- RAC/Waitlist ticket not confirmed

❌ **You are NOT eligible for refund if:**
- Cancelled <4 hours before departure (chart prepared)
- Tatkal ticket voluntary cancellation
- Premium Tatkal ticket (NO REFUND ever)
- Missed train without valid reason

Ask user to provide PNR number to check their specific eligibility.]`;
    }

    // Add intent context for AI
    if (intents.length > 0) {
      contextInfo += `\n\n[USER INTENT: ${intents.join(", ")}]`;
    }

    // Prepare messages for OpenAI
    interface ConversationMessage {
      text: string;
      isBot: boolean;
    }

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(conversationHistory || []).map((msg: ConversationMessage) => ({
        role: msg.isBot ? ("assistant" as const) : ("user" as const),
        content: msg.text,
      })),
      { role: "user", content: message + contextInfo },
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 800,
    });

    const aiResponse =
      completion.choices[0]?.message?.content ||
      "I apologize, but I'm having trouble processing your request right now. Please try again.";

    return NextResponse.json({
      response: aiResponse,
      richContent,
    });
  } catch (error: unknown) {
    console.error("OpenAI API Error:", error);

    // Generate fallback response based on detected intents and data
    // Using already-parsed variables from the start of the function

    let fallbackResponse = "";
    let fallbackRichContent = null;

    // PNR check fallback
    if (pnrMatch) {
      const pnr = pnrMatch[1];
      const pnrData = getPNRData(pnr);
      const refundData = getRefundStatus(pnr);

      if (pnrData) {
        const statusEmoji =
          pnrData.status === "confirmed"
            ? "✅"
            : pnrData.status === "rac"
              ? "🟡"
              : "⏳";
        fallbackResponse = `${statusEmoji} **PNR ${pnr} - ${pnrData.status.toUpperCase()}**\n\n**Train:** ${pnrData.trainName} (${pnrData.trainNumber})\n**Route:** ${pnrData.from} → ${pnrData.to}\n**Date:** ${pnrData.journeyDate}\n**Class:** ${pnrData.class}\n\n**Passengers:**\n${pnrData.passengers.map((p) => `• ${p.name} - ${p.status} (${p.seat})`).join("\n")}`;

        if (intents.includes("refund") && refundData) {
          fallbackResponse = `📊 **Refund Status for PNR ${pnr}**\n\n**Status:** ${refundData.status.toUpperCase()}\n**Amount:** ₹${refundData.amount}\n**Progress:** ${refundData.percentage}%\n**Expected Credit:** ${refundData.expectedCreditDate}${refundData.status === "rejected" ? "\n\n❌ **Reason:** Premium Tatkal tickets are non-refundable under IRCTC policy." : ""}`;
          fallbackRichContent = { type: "refund-status", data: refundData };
        } else {
          fallbackRichContent = { type: "pnr-details", data: pnrData };
        }
      } else {
        fallbackResponse = `PNR ${pnr} not found in the system.\n\nTo check refund eligibility, try these demo PNRs:\n- 1234567890: Confirmed booking with refund in processing\n- 9876543210: Confirmed booking with approved refund\n- 5555555555: Premium Tatkal (non-refundable)\n- 2222222222: Waitlist booking`;
      }
    }
    // Train status fallback
    else if (trainMatch) {
      const trainNumber = trainMatch[1];
      const trainData = getTrainStatus(trainNumber);

      if (trainData) {
        fallbackResponse = `Train ${trainNumber} - ${trainData.trainName}\n\nStatus: ${trainData.status.toUpperCase()}${trainData.delay > 0 ? ` (delayed by ${trainData.delay} minutes)` : ""}\nCurrent Location: ${trainData.currentLocation}\nExpected Arrival: ${trainData.expectedArrival}`;
        fallbackRichContent = { type: "train-status", data: trainData };

        if (trainData.status === "cancelled") {
          fallbackResponse = `Train ${trainNumber} ${trainData.trainName} has been cancelled.\n\nRefund will be processed automatically within 5-7 business days to your original payment method. No action needed from your side.\n\nAlternative trains are available for your route.`;
          fallbackRichContent = {
            type: "alternative-trains",
            data: {
              originalTrain: `${trainNumber} - ${trainData.trainName}`,
              alternatives: alternativeTrains,
              reason: "Train cancelled",
            },
          };
        }
      } else {
        fallbackResponse = `Train ${trainNumber} not found.\n\nTry these demo trains:\n- 12301: Howrah Rajdhani (Running)\n- 12951: Mumbai Rajdhani (Delayed)\n- 12259: Duronto Express (Cancelled)\n- 12430: Lucknow Express (Running)`;
      }
    }
    // Refund timeline fallback
    else if (intents.includes("refund_timeline")) {
      const ticketType = intents.includes("counter_ticket")
        ? "counter"
        : "e-ticket";
      fallbackResponse =
        ticketType === "e-ticket"
          ? `E-Ticket Refund Timeline (5-7 business days):\n\n1. Day 1: Cancellation confirmed, TDR auto-generated\n2. Day 2-5: Refund processing by IRCTC\n3. Day 5-7: Amount credited to original payment method\n\nNo action required from your side.`
          : `Counter Ticket Refund Timeline (15-30 days):\n\n1. Day 1: Cancel at counter\n2. Day 1-7: Submit TDR form at counter\n3. Day 7-15: Document verification\n4. Day 15-25: Accounts processing\n5. Day 25-30: Amount credited\n\nKeep your TDR receipt for tracking.`;
      fallbackRichContent = { type: "refund-timeline", ticketType };
    }
    // Refund eligibility fallback
    else if (
      intents.includes("refund_eligibility") ||
      intents.includes("refund")
    ) {
      fallbackResponse = `Refund Eligibility depends on ticket type and timing.\n\nEligible for refund:\n- Regular ticket cancelled more than 4 hours before departure\n- Train cancelled by Railways (full refund)\n- Train delayed more than 3 hours (file TDR)\n- Waitlist ticket not confirmed (auto-refund)\n\nNot eligible:\n- Cancelled less than 4 hours before departure\n- Tatkal voluntary cancellation\n- Premium Tatkal (non-refundable under any circumstance)\n\nProvide your 10-digit PNR to check specific eligibility.`;
    }
    // Refund history fallback
    else if (intents.includes("refund_history")) {
      fallbackResponse = `Your recent refund transactions are shown below. Each entry shows the PNR, amount, and current status.`;
      fallbackRichContent = { type: "refund-history", data: mockRefundHistory };
    }
    // Refund calculator fallback
    else if (intents.includes("refund_calculator")) {
      fallbackResponse = `Refund amount depends on cancellation timing.\n\nCancellation charges:\n- More than 48 hours before: Rs.240 (AC) / Rs.120 (Sleeper) flat\n- 12-48 hours before: 25% of fare\n- 4-12 hours before: 50% of fare\n- Less than 4 hours: No refund\n- Tatkal: No refund (except train cancellation)\n- Premium Tatkal: No refund under any circumstance`;
      fallbackRichContent = { type: "refund-calculator" };
    }
    // TDR filing fallback
    else if (intents.includes("tdr")) {
      fallbackResponse = `TDR (Ticket Deposit Receipt) is used to claim refunds in specific situations.\n\nValid reasons to file TDR:\n- Train cancelled or delayed more than 3 hours\n- AC or services not working during journey\n- Duplicate or erroneous booking\n- Medical emergency (with documentation)\n\nTDR review takes 15-30 days. Refund amount, if approved, depends on railway evaluation.`;
      fallbackRichContent = { type: "tdr-filing" };
    }
    // Alternative trains fallback
    else if (intents.includes("alternatives")) {
      fallbackResponse = `Alternative trains are available for your route. Select one to proceed with booking.`;
      fallbackRichContent = {
        type: "alternative-trains",
        data: {
          originalTrain: "Your train",
          alternatives: alternativeTrains,
          reason: "Looking for alternatives",
        },
      };
    }
    // Cancellation fallback
    else if (intents.includes("cancellation")) {
      fallbackResponse = `Cancellation charges depend on timing:\n\n- More than 48 hours: Rs.240 (AC) / Rs.120 (Sleeper) flat charge\n- 12-48 hours before: 25% of fare deducted\n- 4-12 hours before: 50% of fare deducted\n- Less than 4 hours: No refund (chart prepared)\n\nTatkal tickets: No refund on voluntary cancellation\nPremium Tatkal: Non-refundable under any circumstance\n\nProvide your PNR to calculate exact refund amount.`;
    }
    // Tatkal fallback
    else if (intents.includes("tatkal")) {
      fallbackResponse = `**Tatkal Booking Information**\n\n**Booking Window:**\n- AC Classes (1A, 2A, 3A, CC): Opens at 10:00 AM\n- Non-AC (Sleeper, 2S): Opens at 11:00 AM\n- Opens 1 day before journey date\n\n**Important Rules:**\n- ID proof mandatory during travel\n- No name change allowed\n- Higher charges apply\n- Limited quota (about 10% of seats)\n\n**Cancellation:**\n- No refund for voluntary cancellation\n- Full refund only if train cancelled by Railways\n- Premium Tatkal: Non-refundable under any circumstance`;
    }
    // Fare inquiry fallback
    else if (intents.includes("fare_inquiry")) {
      fallbackResponse = `**Train Fare Information**\n\nFare depends on:\n- Distance traveled\n- Class of travel\n- Train type (Express, Superfast, Premium)\n- Quota (General, Tatkal, etc.)\n\n**Classes (Low to High):**\n1. Second Sitting (2S)\n2. Sleeper Class (SL)\n3. AC 3 Tier (3A)\n4. AC 2 Tier (2A)\n5. First AC (1A)\n\nFor exact fares, search your route on irctc.co.in`;
    }
    // Ticket booking fallback
    else if (intents.includes("ticket_booking")) {
      // Extract stations for fallback too
      const stationPatterns = [
        /\\bfrom\\s+([a-zA-Z\\s]+?)\\s+to\\s+([a-zA-Z\\s]+?)(?:\\s|$|\\.|\\,|\\?)/i,
        /([a-zA-Z]+)\\s+se\\s+([a-zA-Z]+)/i,
        /([a-zA-Z]+)\\s+to\\s+([a-zA-Z]+)/i,
      ];

      let fromStation = "";
      let toStation = "";

      for (const pattern of stationPatterns) {
        const match = message.match(pattern);
        if (match) {
          fromStation = match[1].trim();
          toStation = match[2].trim();
          break;
        }
      }

      if (fromStation && toStation) {
        fallbackResponse = `I'll help you book from **${fromStation.charAt(0).toUpperCase() + fromStation.slice(1).toLowerCase()}** to **${toStation.charAt(0).toUpperCase() + toStation.slice(1).toLowerCase()}**. Please fill in the details below:`;
        fallbackRichContent = {
          type: "ticket-booking",
          data: { from: fromStation, to: toStation },
        };
      } else {
        fallbackResponse = `I can help you book a train ticket! Please fill in the details below:`;
        fallbackRichContent = { type: "ticket-booking", data: {} };
      }
    }
    // Food ordering fallback
    else if (intents.includes("food_ordering")) {
      fallbackResponse = `**Food Ordering on Trains (e-Catering)**\n\n**How to Order:**\n1. Visit ecatering.irctc.co.in\n2. Enter your PNR number\n3. Select delivery station\n4. Choose restaurant and food items\n5. Place order (at least 2 hours before station)\n6. Food delivered at your seat!\n\n**Contact:**\n- Website: ecatering.irctc.co.in\n- Call: 1323\n- WhatsApp: +91-8750001323\n\nAvailable at 400+ stations across India.`;
    }
    // Account issues fallback
    else if (intents.includes("account_issues")) {
      fallbackResponse = `**IRCTC Account Help**\n\n**Forgot Password:**\n1. Click 'Forgot Password' on login page\n2. Enter User ID\n3. OTP sent to registered email/mobile\n4. Reset your password\n\n**Account Locked:**\n- Wait 4 hours, or\n- Reset password to unlock immediately\n\n**Forgot User ID:**\n- Click 'Forgot User ID'\n- Enter registered email/mobile\n\n**Contact Support:**\n- Helpdesk: 14646\n- Email: care@irctc.co.in`;
    }
    // Payment issues fallback
    else if (intents.includes("payment_issues")) {
      fallbackResponse = `**Payment Issues Help**\n\n**Money Deducted, No Ticket?**\n- Amount will be auto-refunded in 3-7 business days\n- No action required from your side\n\n**Check Transaction:**\n1. Login to IRCTC\n2. Go to 'My Transactions'\n3. Check ticket status\n\n**If not resolved in 7 days:**\n- Call: 14646\n- Email: etickets@irctc.co.in\n\n**Keep Ready:**\n- Transaction ID\n- Bank reference number`;
    }
    // Greeting/Help fallback
    else if (intents.includes("greeting")) {
      fallbackResponse = `Hello! I'm **DISHA 2.0**, your IRCTC virtual assistant.\n\nI can help you with:\n- 🎫 **PNR Status** - Check your booking\n- 🚂 **Train Status** - Live running info\n- 💰 **Refunds** - Track and calculate\n- ❌ **Cancellation** - Policy and process\n- ⚡ **Tatkal** - Booking rules\n- 🍽️ **Food Order** - e-Catering info\n- 🎟️ **Book Tickets** - Step-by-step guide\n\n**Try:** "Check PNR 1234567890" or "Book train ticket"`;
    }
    // General fallback
    else {
      fallbackResponse = `I'm **DISHA 2.0**, your IRCTC assistant!\n\nI can help with:\n- **PNR Status** - "Check PNR 1234567890"\n- **Train Status** - "Is train 12301 running?"\n- **Book Tickets** - "Book train ticket"\n- **Refunds** - "Check refund status"\n- **Cancellation** - "How to cancel ticket?"\n- **Tatkal** - "Tatkal booking rules"\n- **Food** - "Order food on train"\n\nWhat would you like to know?`;
    }

    return NextResponse.json({
      response: fallbackResponse,
      richContent: fallbackRichContent,
      fallback: true,
    });
  }
}
