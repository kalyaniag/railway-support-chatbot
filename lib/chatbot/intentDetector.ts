import { intents } from "./intents";
import { getContextualIntent, isFollowUpQuestion } from "./conversationContext";

export function detectIntent(userMessage: string): string | null {
  const normalizedMessage = userMessage.trim().toLowerCase();

  // Check if this is a follow-up question based on conversation context
  if (isFollowUpQuestion(userMessage)) {
    const contextualIntent = getContextualIntent(userMessage);
    if (contextualIntent) {
      return contextualIntent;
    }
  }

  // Check for out-of-context questions (food, weather, general topics not related to IRCTC)
  const outOfContextPatterns = [
    /\b(cook|dinner|lunch|breakfast|recipe|food|eat|meal)\b/i,
    /\b(weather|temperature|rain|sunny|climate)\b/i,
    /\b(movie|film|music|song|game|sport)\b/i,
    /\b(shopping|buy|purchase|product)\b(?!.*ticket)/i, // Allow ticket purchase
    /\b(health|doctor|medicine|hospital)\b/i,
    /\b(news|politics|election)\b/i,
    /\b(job|career|interview|salary)\b/i,
    /\b(dating|relationship|love|marriage)\b/i,
    /\b(homework|assignment|study)\b/i,
  ];

  for (const pattern of outOfContextPatterns) {
    if (pattern.test(normalizedMessage)) {
      return "out_of_context";
    }
  }

  // Priority order: Check more specific intents first before generic ones

  // PRIORITY 1: Detailed PNR check with number extraction
  if (/\b\d{10}\b/.test(normalizedMessage)) {
    // Check if it's a refund query with PNR
    if (/\b(refund|money|amount|return|tdr)\b/.test(normalizedMessage)) {
      return "refund_status_check";
    }
    // Check if it's asking about train status via PNR
    if (/\b(train|running|cancel|delay)\b/.test(normalizedMessage)) {
      return "train_status_check";
    }
    // Default to PNR details
    if (/\b(check|show|status|details|pnr)\b/.test(normalizedMessage)) {
      return "pnr_check_detailed";
    }
  }

  // PRIORITY 2: Train number queries (5 digits)
  if (/\b\d{5}\b/.test(normalizedMessage)) {
    // Check if asking about alternatives
    if (/\b(alternative|other|different|instead)\b/.test(normalizedMessage)) {
      return "alternative_trains";
    }
    // Check if asking about cancellation
    if (/\b(cancel|cancelled)\b/.test(normalizedMessage)) {
      return "cancelled_train_refund";
    }
    // Default to train status
    if (/\b(train|status|running|delay|where)\b/.test(normalizedMessage)) {
      return "train_status_check";
    }
  }

  // PRIORITY 3: Simple "I want a refund" request (no PNR, no amount)
  if (/^(i want|i need|can i get).*refund\.?$/i.test(normalizedMessage) ||
      /^refund\.?$/i.test(normalizedMessage)) {
    return "refund_request_initial";
  }

  // PRIORITY 4: Refund amount inquiry (without PNR)
  if (/\b(my|i|me).*refund.*\b(\d+|rupees?|rs\.?)\b/i.test(normalizedMessage) ||
      /\brefund.*\b(\d{3,5})\b/i.test(normalizedMessage)) {
    return "refund_amount_inquiry";
  }

  // PRIORITY 5: Refund-specific queries
  if (/\b(refund|money|amount)\b/.test(normalizedMessage)) {
    // Refund calculator
    if (/\b(calculate|how much)\b/.test(normalizedMessage)) {
      return "refund_calculator";
    }
    // Refund history
    if (/\b(history|past|all|show|list)\b/.test(normalizedMessage)) {
      return "refund_history";
    }
    // Refund status tracking
    if (
      /\b(where|status|track|check|pending|receive|credited)\b/.test(
        normalizedMessage,
      )
    ) {
      return "refund_status_check";
    }
  }

  // PRIORITY 6: TDR filing
  if (/\b(tdr|file|claim)\b/.test(normalizedMessage)) {
    return "tdr_filing";
  }

  // PRIORITY 7: Alternative trains
  if (/\b(alternative|other|different).*train\b/.test(normalizedMessage)) {
    return "alternative_trains";
  }

  // PRIORITY 8: Partial cancellation
  if (
    /\bpartial.*cancel\b/.test(normalizedMessage) ||
    /\bcancel.*\b(one|some|few).*passenger\b/.test(normalizedMessage)
  ) {
    return "partial_cancellation";
  }

  // PRIORITY 7: Now check all other intents in order
  for (const intent of intents) {
    // Skip the detailed intents we already checked
    if (
      [
        "pnr_check_detailed",
        "train_status_check",
        "refund_status_check",
        "refund_calculator",
        "refund_history",
        "tdr_filing",
        "cancelled_train_refund",
        "alternative_trains",
        "partial_cancellation",
      ].includes(intent.name)
    ) {
      continue;
    }

    for (const pattern of intent.patterns) {
      if (pattern.test(normalizedMessage)) {
        return intent.name;
      }
    }
  }

  return null;
}

export function getIntentByName(intentName: string) {
  return intents.find((intent) => intent.name === intentName);
}

export function extractStations(message: string): {
  from: string | null;
  to: string | null;
} {
  // Patterns to extract FROM and TO stations
  const fromToPattern =
    /\bfrom\s+([a-zA-Z\s]+?)\s+to\s+([a-zA-Z\s]+?)(?:\s|$|\.|\,|\?)/i;
  const toFromPattern =
    /\bto\s+([a-zA-Z\s]+?)\s+from\s+([a-zA-Z\s]+?)(?:\s|$|\.|\,|\?)/i;
  // Hindi pattern: "X se Y" or "X se Y tak"
  const hindiSePattern =
    /([a-zA-Z\s]+?)\s+se\s+([a-zA-Z\s]+?)(?:\s+tak)?(?:\s|$|\.|\,|\?|\s+ticket|\s+book|\s+train)/i;
  // Simple pattern: "X to Y"
  const simpleToPattern = /([a-zA-Z]+)\s+to\s+([a-zA-Z]+)/i;

  let from: string | null = null;
  let to: string | null = null;

  // Try "from X to Y" pattern
  const fromToMatch = message.match(fromToPattern);
  if (fromToMatch) {
    from = fromToMatch[1].trim();
    to = fromToMatch[2].trim();
  } else {
    // Try "to Y from X" pattern
    const toFromMatch = message.match(toFromPattern);
    if (toFromMatch) {
      to = toFromMatch[1].trim();
      from = toFromMatch[2].trim();
    } else {
      // Try Hindi "X se Y" pattern
      const hindiMatch = message.match(hindiSePattern);
      if (hindiMatch) {
        from = hindiMatch[1].trim();
        to = hindiMatch[2].trim();
      } else {
        // Try simple "X to Y" pattern
        const simpleMatch = message.match(simpleToPattern);
        if (simpleMatch) {
          from = simpleMatch[1].trim();
          to = simpleMatch[2].trim();
        }
      }
    }
  }

  return { from, to };
}
