/**
 * Tone Adapter - Dynamic tone and behavior adjustment based on refund amount
 * 
 * Core Principle: Higher refund = higher emotional load
 * Bot must implicitly adapt empathy, pace, and language style
 */

export type ToneLevel = 'high_value' | 'low_value';

export interface ToneConfig {
  level: ToneLevel;
  empathyLevel: 'high' | 'moderate';
  pacing: 'deliberate' | 'efficient';
  sentenceStyle: 'complete' | 'concise';
  reassuranceNeeded: boolean;
}

/**
 * Refund amount thresholds
 */
const REFUND_THRESHOLDS = {
  HIGH_VALUE: 4000, // Amount > ₹4000 = high emotional load
};

/**
 * Determine tone level based on refund amount
 */
export function getToneLevel(refundAmount: number): ToneLevel {
  return refundAmount > REFUND_THRESHOLDS.HIGH_VALUE ? 'high_value' : 'low_value';
}

/**
 * Get tone configuration for the refund amount
 */
export function getToneConfig(refundAmount: number): ToneConfig {
  const level = getToneLevel(refundAmount);

  if (level === 'high_value') {
    return {
      level: 'high_value',
      empathyLevel: 'high',
      pacing: 'deliberate',
      sentenceStyle: 'complete',
      reassuranceNeeded: true,
    };
  }

  return {
    level: 'low_value',
    empathyLevel: 'moderate',
    pacing: 'efficient',
    sentenceStyle: 'concise',
    reassuranceNeeded: false,
  };
}

/**
 * Response Templates - Structured by context and tone level
 */
export const ToneTemplates = {
  // Refund Status Responses
  refundStatus: {
    approved: {
      high_value: {
        opening: "We understand this is a significant refund request, and we want to assure you that it's being handled with priority.",
        status: "Your refund has been approved and will be processed carefully.",
        timeline: "The amount will be credited to your account within 7-10 working days. We'll ensure this is tracked closely.",
        closing: "Thank you for your patience. If you have any concerns during this period, please don't hesitate to reach out.",
      },
      low_value: {
        opening: "Good news!",
        status: "Your refund has been approved.",
        timeline: "You'll receive the amount within 7-10 working days.",
        closing: "You're all set. Feel free to check back anytime.",
      },
    },
    credited: {
      high_value: {
        opening: "Thank you for your patience during this process.",
        status: "We're pleased to inform you that your refund is in the final stage and will be credited to your account very soon.",
        timeline: "The amount is currently being transferred to your original payment method. You should see it reflected within 24-48 hours.",
        closing: "We appreciate your understanding. If the amount doesn't appear within the expected timeframe, please reach out and we'll investigate immediately.",
      },
      low_value: {
        opening: "Almost there!",
        status: "Your refund is in the final stage and will hit your account soon.",
        timeline: "Expect it within 24-48 hours to your original payment method.",
        closing: "You'll get a confirmation once it's done. Thanks for your patience!",
      },
    },
    processing: {
      high_value: {
        opening: "Thank you for checking on your refund status.",
        status: "Your refund request is currently being processed by our team. We want to ensure everything is reviewed thoroughly.",
        timeline: "This typically takes 5-7 working days for completion. We appreciate your patience as we handle this carefully.",
        closing: "Rest assured, you'll receive a confirmation once the refund is initiated. We're here if you need any updates.",
      },
      low_value: {
        opening: "Your refund is on its way!",
        status: "We're currently processing your request.",
        timeline: "It should be completed within 5-7 working days.",
        closing: "No worries — you'll get a confirmation soon.",
      },
    },
    initiated: {
      high_value: {
        opening: "We're pleased to update you on your refund progress.",
        status: "Your refund has been initiated and is now moving through the payment system. We're monitoring it to ensure smooth processing.",
        timeline: "The refund should be completed and credited to your account within 3-5 working days.",
        closing: "We'll keep you informed of any updates. Feel free to reach out if you need more information.",
      },
      low_value: {
        opening: "Great news!",
        status: "Your refund has been initiated and is in progress.",
        timeline: "Should be in your account within 3-5 days.",
        closing: "You'll get an update once it's credited!",
      },
    },
    rejected: {
      high_value: {
        opening: "We understand this may be disappointing, and we want to explain the situation clearly.",
        status: "Unfortunately, your refund request doesn't meet the eligibility criteria based on the ticket type and cancellation policy.",
        explanation: "For Premium Tatkal tickets, IRCTC policy states that no refund is provided after booking, as these are premium, guaranteed-seat tickets.",
        alternative: "However, we want to help. If you believe there are exceptional circumstances, you can file a TDR (Ticket Deposit Receipt) for review.",
        closing: "We're here to assist you through this process. Would you like guidance on filing a TDR?",
      },
      low_value: {
        opening: "Unfortunately, this refund doesn't qualify under current policy.",
        status: "Premium Tatkal tickets aren't eligible for refunds after booking.",
        explanation: "This is part of the terms for guaranteed-seat bookings.",
        alternative: "You can file a TDR if there were exceptional circumstances.",
        closing: "Let me know if you'd like help with that!",
      },
    },
  },

  // Refund Calculator Responses
  refundCalculator: {
    high_value: {
      introduction: "Let's carefully calculate your refund eligibility. We'll walk through this step by step to ensure accuracy.",
      calculation_complete: "Based on the cancellation policy and timing, here's what you can expect.",
      deduction_explanation: "The deduction includes cancellation charges and service fees as per IRCTC guidelines. We want to be transparent about how this amount was determined.",
      next_steps: "Would you like us to proceed with the cancellation, or would you prefer more time to review?",
    },
    low_value: {
      introduction: "Let's quickly calculate your refund amount.",
      calculation_complete: "Here's your refund breakdown:",
      deduction_explanation: "Deductions are based on standard cancellation charges.",
      next_steps: "Ready to proceed with cancellation?",
    },
  },

  // TDR Filing Guidance
  tdrFiling: {
    high_value: {
      introduction: "We understand you'd like to file a TDR for this refund. This is an important step, and we want to make sure you have all the information you need.",
      process_explanation: "A TDR allows you to request a manual review of your case, especially if there were circumstances beyond your control.",
      requirements: "Here's what you'll need to provide for a strong TDR submission:",
      timeline: "The review process typically takes 60-90 days. We know this feels like a long time, but each case is examined carefully to ensure fairness.",
      support: "We're here to guide you through each step. Shall we start with gathering the required documents?",
    },
    low_value: {
      introduction: "You can file a TDR to request a manual review.",
      process_explanation: "It's useful if there were special circumstances.",
      requirements: "Here's what you'll need:",
      timeline: "Reviews usually take 60-90 days.",
      support: "Let me know if you'd like help getting started!",
    },
  },

  // Empathy Phrases - Contextual cushioning
  empathyPhrases: {
    high_value: [
      "We understand this is a significant amount",
      "We want to ensure this is handled correctly",
      "Thank you for your patience during this process",
      "We appreciate this may be concerning",
      "Rest assured, we're treating this with priority",
      "We're committed to keeping you informed",
    ],
    low_value: [
      "No worries",
      "You're all set",
      "This will be processed shortly",
      "Happy to help",
      "Quick update for you",
    ],
  },

  // Acknowledgment Phrases
  acknowledgment: {
    high_value: [
      "Thank you for bringing this to our attention",
      "We appreciate you reaching out about this",
      "I understand your concern",
    ],
    low_value: [
      "Got it",
      "Sure thing",
      "Thanks for checking",
    ],
  },

  // Closing Phrases
  closing: {
    high_value: [
      "Please don't hesitate to reach out if you need further assistance",
      "We're here to support you through this process",
      "Feel free to check back anytime for updates",
    ],
    low_value: [
      "Let me know if you need anything else",
      "Happy to help anytime",
      "Feel free to ask if you have questions",
    ],
  },
};

/**
 * Generate a complete response with appropriate tone
 */
export function generateTonedResponse(
  context: 'refundStatus' | 'refundCalculator' | 'tdrFiling',
  subContext: string,
  refundAmount: number,
  customData?: Record<string, any>
): string {
  const config = getToneConfig(refundAmount);
  const templates = ToneTemplates[context] as any;

  if (!templates) return '';

  const toneKey = config.level;
  const template = templates[subContext]?.[toneKey];

  if (!template) return '';

  // Build response with appropriate pacing
  const parts: string[] = [];

  // Add opening if available
  if (template.opening) {
    parts.push(template.opening);
  }

  // Add main content
  Object.keys(template).forEach((key) => {
    if (key !== 'opening' && key !== 'closing') {
      parts.push(template[key]);
    }
  });

  // Add closing if available
  if (template.closing) {
    parts.push(template.closing);
  }

  // Join with appropriate spacing based on pacing
  const separator = config.pacing === 'deliberate' ? '\n\n' : '\n';
  return parts.join(separator);
}

/**
 * Get a random empathy phrase based on tone level
 */
export function getEmpathyPhrase(refundAmount: number): string {
  const config = getToneConfig(refundAmount);
  const phrases = ToneTemplates.empathyPhrases[config.level];
  return phrases[Math.floor(Math.random() * phrases.length)];
}

/**
 * Get a random acknowledgment phrase based on tone level
 */
export function getAcknowledgment(refundAmount: number): string {
  const config = getToneConfig(refundAmount);
  const phrases = ToneTemplates.acknowledgment[config.level];
  return phrases[Math.floor(Math.random() * phrases.length)];
}

/**
 * Get a random closing phrase based on tone level
 */
export function getClosingPhrase(refundAmount: number): string {
  const config = getToneConfig(refundAmount);
  const phrases = ToneTemplates.closing[config.level];
  return phrases[Math.floor(Math.random() * phrases.length)];
}

/**
 * Utility: Check if amount is high-value
 */
export function isHighValueRefund(refundAmount: number): boolean {
  return refundAmount > REFUND_THRESHOLDS.HIGH_VALUE;
}
