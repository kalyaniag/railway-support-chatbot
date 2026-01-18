// Conversation Context Management
// Tracks conversation history to understand follow-up questions
// Now with persistent localStorage support!

const STORAGE_KEY = "irctc_chatbot_context";
const CHAT_HISTORY_KEY = "irctc_chat_history";
const MAX_HISTORY_LENGTH = 50; // Store up to 50 messages

export interface ConversationContext {
  lastIntent: string | null;
  lastPNR: string | null;
  lastTrainNumber: string | null;
  lastTopic: string | null; // 'refund', 'booking', 'train', 'tdr', etc.
  lastData: unknown; // Last rich content data shown
  conversationHistory: Array<{
    userMessage: string;
    intent: string;
    timestamp: string; // Changed to string for JSON serialization
  }>;
}

// Helper to check if we're in browser environment
const isBrowser = typeof window !== "undefined";

// Load context from localStorage on initialization
function loadContextFromStorage(): ConversationContext {
  if (!isBrowser) {
    return {
      lastIntent: null,
      lastPNR: null,
      lastTrainNumber: null,
      lastTopic: null,
      lastData: null,
      conversationHistory: [],
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert timestamp strings back to Date objects if needed
      return parsed;
    }
  } catch (error) {
    console.error("Failed to load context from storage:", error);
  }

  return {
    lastIntent: null,
    lastPNR: null,
    lastTrainNumber: null,
    lastTopic: null,
    lastData: null,
    conversationHistory: [],
  };
}

// Save context to localStorage
function saveContextToStorage(context: ConversationContext) {
  if (!isBrowser) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(context));
  } catch (error) {
    console.error("Failed to save context to storage:", error);
  }
}

let globalContext: ConversationContext = loadContextFromStorage();

export function updateContext(
  userMessage: string,
  intent: string,
  extractedData?: {
    pnr?: string;
    trainNumber?: string;
    topic?: string;
    richContent?: unknown;
  },
) {
  globalContext.lastIntent = intent;

  if (extractedData?.pnr) {
    globalContext.lastPNR = extractedData.pnr;
  }

  if (extractedData?.trainNumber) {
    globalContext.lastTrainNumber = extractedData.trainNumber;
  }

  if (extractedData?.topic) {
    globalContext.lastTopic = extractedData.topic;
  }

  if (extractedData?.richContent) {
    globalContext.lastData = extractedData.richContent;
  }

  // Add to history (keep last MAX_HISTORY_LENGTH messages)
  globalContext.conversationHistory.push({
    userMessage,
    intent,
    timestamp: new Date().toISOString(),
  });

  if (globalContext.conversationHistory.length > MAX_HISTORY_LENGTH) {
    globalContext.conversationHistory.shift();
  }

  // Save to localStorage after each update
  saveContextToStorage(globalContext);
}

export function getContext(): ConversationContext {
  return { ...globalContext };
}

export function clearContext() {
  globalContext = {
    lastIntent: null,
    lastPNR: null,
    lastTrainNumber: null,
    lastTopic: null,
    lastData: null,
    conversationHistory: [],
  };

  // Clear from localStorage
  if (isBrowser) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CHAT_HISTORY_KEY);
  }
}

// Helper to detect if user is asking a follow-up question
export function isFollowUpQuestion(message: string): boolean {
  const followUpPatterns = [
    /\b(why|how|what|when|where)\b/i,
    /\b(tell me more|explain|details|reason)\b/i,
    /\b(this|that|it)\b/i,
    /^(ok|okay|yes|no|sure)\b/i,
  ];

  return followUpPatterns.some((pattern) => pattern.test(message));
}

// Get context-aware suggestions for ambiguous questions
export function getContextualIntent(message: string): string | null {
  const context = getContext();
  const normalizedMessage = message.toLowerCase().trim();

  // Handle "why" questions based on last topic
  if (/\b(why|reason|how come)\b/i.test(normalizedMessage)) {
    if (context.lastTopic === "refund") {
      return "refund_explanation";
    }
    if (context.lastTopic === "train") {
      return "train_delay_explanation";
    }
    if (context.lastTopic === "tdr") {
      return "tdr_explanation";
    }
  }

  // Handle "how" questions
  if (/\b(how|process|steps)\b/i.test(normalizedMessage)) {
    if (context.lastTopic === "refund") {
      return "refund_process_explanation";
    }
    if (context.lastTopic === "tdr") {
      return "tdr_filing";
    }
  }

  // Handle "what" questions
  if (/\b(what|which|tell me)\b/i.test(normalizedMessage)) {
    if (context.lastTopic === "refund") {
      return "refund_rules_explanation";
    }
  }

  // Handle affirmative responses (yes, ok, sure)
  if (/^(yes|yeah|sure|ok|okay|yep)\b/i.test(normalizedMessage)) {
    if (context.lastIntent === "tdr_filing") {
      return "tdr_filing_continue";
    }
    if (context.lastIntent === "refund_calculator") {
      return "refund_calculator";
    }
  }

  return null;
}
