# Conversation Context Feature

## Overview
The chatbot now has **intelligent conversation context tracking** that remembers previous interactions and understands follow-up questions. This means users can ask "why?" or "how?" and the bot will understand what they're referring to based on the conversation history.

## The Problem We Solved

### Before:
**User:** "Refund for the PNR 5555555555"  
**Bot:** *Shows refund rejected status*  
**User:** "why?"  
**Bot:** "I didn't quite catch that. I'm Disha, your IRCTC assistant..." ❌

### After:
**User:** "Refund for the PNR 5555555555"  
**Bot:** *Shows refund rejected status*  
**User:** "why?"  
**Bot:** *Explains Premium Tatkal non-refundable policy in detail* ✅

## How It Works

### 1. **Conversation Context Tracking** (`conversationContext.ts`)
```typescript
{
  lastIntent: 'refund_status_check',
  lastPNR: '5555555555',
  lastTopic: 'refund',
  lastData: { /* refund status data */ },
  conversationHistory: [...]
}
```

The system tracks:
- **Last Intent**: What the user just asked about
- **Last PNR/Train Number**: Extracted identifiers
- **Last Topic**: High-level category (refund, train, booking, TDR)
- **Last Data**: Rich content data shown to user
- **History**: Last 10 conversation turns

### 2. **Follow-Up Question Detection**
The system recognizes follow-up patterns:
- "why", "how", "what", "when", "where"
- "tell me more", "explain", "details", "reason"
- "this", "that", "it"
- "ok", "yes", "no", "sure"

### 3. **Context-Aware Intent Resolution**

When a follow-up question is detected, the system:
1. Checks the conversation context
2. Maps the question to the appropriate topic
3. Returns a detailed, contextual response

## New Context-Aware Intents

### 1. **Refund Explanation** (`refund_explanation`)
**Triggers when:**
- User asks "why?" after seeing refund rejection
- User asks "reason" or "why rejected"

**Provides:**
- Detailed explanation of Premium Tatkal policy
- Why refunds are not processed
- Alternative options (TDR, insurance, contact railway)
- Educational content about booking terms

### 2. **Refund Rules Explanation** (`refund_rules_explanation`)
**Triggers when:**
- User asks "what are the refund rules?"
- Follow-up "what" questions after refund topics

**Provides:**
- Complete refund policy breakdown
- Regular vs Tatkal vs Premium Tatkal
- Time-based cancellation charges
- TDR eligibility criteria

### 3. **Refund Process Explanation** (`refund_process_explanation`)
**Triggers when:**
- User asks "how does refund work?"
- Follow-up "how" questions after refund topics

**Provides:**
- Step-by-step refund process
- Timeline expectations
- Tracking methods
- What to do if delayed

### 4. **Train Delay Explanation** (`train_delay_explanation`)
**Triggers when:**
- User asks "why?" after seeing train delay/cancellation
- Follow-up about train status

**Provides:**
- Common reasons for delays (weather, maintenance, etc.)
- What passengers can do
- TDR eligibility for delays >3 hours
- Alternative train search

### 5. **TDR Explanation** (`tdr_explanation`)
**Triggers when:**
- User asks "what is TDR?"
- Follow-up questions about TDR

**Provides:**
- Complete TDR definition and purpose
- When to file (eligible scenarios)
- When NOT to file
- Filing process and time limits

## Implementation Details

### Files Modified:

1. **`conversationContext.ts`** (NEW)
   - Context storage and management
   - Follow-up question detection
   - Contextual intent mapping

2. **`intentDetector.ts`**
   - Added context checking at the beginning
   - Checks if question is a follow-up
   - Returns contextual intent if found

3. **`intents.ts`**
   - Added 5 new context-aware intents
   - Each with detailed educational responses
   - Patterns to match follow-up questions

4. **`responseGenerator.ts`**
   - Updates context after each response
   - Extracts PNR/train numbers
   - Stores rich content data for reference
   - Handles new explanation intents

5. **`ChatContainer.tsx`**
   - Imports context update function
   - Extracts data from user messages
   - Updates context with each interaction

## Example Conversations

### Scenario 1: Refund Rejection
```
User: Refund for PNR 5555555555
Bot: [Shows refund rejected status]
Context Updated: { lastTopic: 'refund', lastPNR: '5555555555', lastIntent: 'refund_status_check' }

User: why?
Intent Detected: refund_explanation (via context)
Bot: [Detailed explanation of Premium Tatkal non-refundable policy]
```

### Scenario 2: Train Delay
```
User: Is train 12259 running?
Bot: [Shows train cancelled status]
Context Updated: { lastTopic: 'train', lastTrainNumber: '12259', lastIntent: 'train_status_check' }

User: why is it cancelled?
Intent Detected: train_delay_explanation (via context)
Bot: [Explains common reasons for cancellations, options for passengers]
```

### Scenario 3: TDR Follow-Up
```
User: How to file TDR?
Bot: [Shows TDR filing process]
Context Updated: { lastTopic: 'tdr', lastIntent: 'tdr_filing' }

User: what is TDR?
Intent Detected: tdr_explanation (via context)
Bot: [Complete explanation of TDR system]
```

## Benefits

### 1. **Natural Conversation Flow**
Users can ask follow-up questions naturally without repeating context.

### 2. **Better User Experience**
No more "I didn't understand" responses for simple follow-ups.

### 3. **Educational**
Detailed explanations help users understand IRCTC policies better.

### 4. **Context Retention**
System remembers last 10 interactions for complex conversations.

### 5. **Smart Intent Mapping**
Same question ("why?") gets different answers based on what was just discussed.

## Testing

### Test These Conversation Flows:

1. **Refund Rejection Flow:**
   ```
   → "Refund for PNR 5555555555"
   → "why?"
   → "what are the rules?"
   → "how does the refund process work?"
   ```

2. **Train Status Flow:**
   ```
   → "Is train 12259 running?"
   → "why is it cancelled?"
   → "what are my options?"
   ```

3. **TDR Flow:**
   ```
   → "How to file TDR?"
   → "what is TDR?"
   → "when should I file it?"
   ```

## Technical Notes

- **Context Storage**: In-memory (resets on page refresh)
- **History Limit**: Last 10 conversations
- **Performance**: No impact, simple object lookups
- **Scalability**: Can be extended to database storage for persistent context

## Future Enhancements

1. **Session Persistence**: Store context in localStorage
2. **User Profiles**: Remember preferences across sessions
3. **Multi-Turn TDR Filing**: Complete TDR process through conversation
4. **Smart Suggestions**: Proactive follow-up suggestions based on context
5. **Sentiment Analysis**: Detect user frustration and adjust responses

## Conclusion

The conversation context feature transforms the chatbot from a simple pattern-matcher into an intelligent assistant that understands the flow of conversation. Users can now have natural, multi-turn conversations without constantly repeating information.

**Key Achievement**: Solved the "why?" problem where users got generic "I didn't understand" responses for contextual follow-up questions.
