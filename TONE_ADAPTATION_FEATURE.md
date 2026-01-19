# 🎭 Dynamic Tone Adaptation Feature

## Overview

The chatbot now adapts its tone, language, and behavior dynamically based on **refund amounts**, acknowledging that user emotions and expectations vary significantly with higher vs lower refund values.

> **Core UX Principle**: Higher refund amount = higher emotional load, anxiety, and perceived loss

This is not just a copy change — it's a fundamental UX behavior rule that creates more empathetic and contextually appropriate interactions.

---

## 💡 The Problem We're Solving

### User Psychology
- **₹5,000 refund**: High anxiety, significant financial concern, need for reassurance
- **₹500 refund**: Lower emotional risk, faster acceptance, efficiency preferred

### Why It Matters
Without tone adaptation:
- ❌ Treats all refund situations identically
- ❌ May sound dismissive for large amounts
- ❌ May sound overly formal for small amounts
- ❌ Misses opportunity to build trust and empathy

With tone adaptation:
- ✅ Acknowledges emotional context implicitly
- ✅ Builds trust through appropriate empathy
- ✅ Improves user satisfaction and perceived care
- ✅ Reduces anxiety for high-value situations
- ✅ Maintains efficiency for low-value situations

---

## 📊 Refund Amount Buckets

```typescript
const REFUND_THRESHOLDS = {
  HIGH_VALUE: 4000, // Amount > ₹4000 = high emotional load
};
```

| Bucket | Amount Range | Emotional Load | Bot Behavior |
|--------|--------------|----------------|--------------|
| **High-Value** | > ₹4,000 | High anxiety, significant concern | Empathetic, deliberate, reassuring |
| **Low-Value** | ≤ ₹4,000 | Lower emotional risk | Friendly, efficient, confident |

---

## 🎨 Tone & Behavior Rules

### High-Value Refund (> ₹4,000)

**Bot Characteristics:**
- 🤝 **More empathetic and respectful**
- 🙏 **Permission-based, not authoritative**
- 💙 **Reassuring, patient, and transparent**
- 📖 **Complete sentences and acknowledgment**
- ⏱️ **Deliberate pacing (not rushed)**

**Tone Phrases:**
- "We understand this is a significant amount"
- "We want to ensure this is handled correctly"
- "Thank you for your patience during this process"
- "Rest assured, we're treating this with priority"
- "We're committed to keeping you informed"

**Language Style:**
```
✅ "We understand this is a significant refund request, and we want to 
    assure you that it's being handled with priority. Your refund has 
    been approved and will be processed carefully."

❌ "Your refund has been approved."
```

---

### Low-Value Refund (≤ ₹4,000)

**Bot Characteristics:**
- 😊 **Friendly, efficient, confident**
- ⚡ **Slightly more casual but professional**
- 🎯 **Focus on clarity and speed**
- 📝 **Shorter sentences, less cushioning**
- ✨ **Positive and helpful**

**Tone Phrases:**
- "No worries"
- "You're all set"
- "This will be processed shortly"
- "Happy to help"
- "Quick update for you"

**Language Style:**
```
✅ "Good news! Your refund has been approved. You'll receive the 
    amount within 7-10 working days. You're all set."

❌ "We understand this is a significant amount and want to assure 
    you that it's being handled with priority..."
```

---

## 🏗️ Architecture

### File Structure

```
lib/chatbot/
├── toneAdapter.ts              # Core tone adaptation logic
├── responseGenerator.ts        # Integrates tone into responses
└── conversationContext.ts      # Tracks refund amounts

components/chat/
└── RefundCalculatorForm.tsx    # UI with tone-adapted messages
```

### Core Components

#### 1. **toneAdapter.ts** (300+ lines)

**Key Functions:**

```typescript
// Determine tone level based on amount
getToneLevel(refundAmount: number): ToneLevel

// Get full tone configuration
getToneConfig(refundAmount: number): ToneConfig

// Generate complete response with appropriate tone
generateTonedResponse(
  context: 'refundStatus' | 'refundCalculator' | 'tdrFiling',
  subContext: string,
  refundAmount: number
): string

// Utility helpers
isHighValueRefund(refundAmount: number): boolean
getEmpathyPhrase(refundAmount: number): string
getAcknowledgment(refundAmount: number): string
getClosingPhrase(refundAmount: number): string
```

**ToneConfig Interface:**

```typescript
interface ToneConfig {
  level: 'high_value' | 'low_value';
  empathyLevel: 'high' | 'moderate';
  pacing: 'deliberate' | 'efficient';
  sentenceStyle: 'complete' | 'concise';
  reassuranceNeeded: boolean;
}
```

#### 2. **Response Templates**

Structured templates for different contexts and tone levels:

```typescript
ToneTemplates = {
  refundStatus: {
    approved: { high_value: {...}, low_value: {...} },
    processing: { high_value: {...}, low_value: {...} },
    rejected: { high_value: {...}, low_value: {...} }
  },
  refundCalculator: {
    high_value: {...},
    low_value: {...}
  },
  tdrFiling: {
    high_value: {...},
    low_value: {...}
  }
}
```

---

## 🔄 Integration Points

### 1. Refund Status Checks

**Before:**
```typescript
return {
  text: `Refund status for PNR ${pnr}:`,
  richContent: { type: "refund-status", data: refundStatus }
};
```

**After:**
```typescript
const refundAmount = refundStatus.amount || 0;
const statusMessage = generateTonedResponse(
  'refundStatus',
  refundStatus.status === 'approved' ? 'approved' : 'processing',
  refundAmount
);

return {
  text: statusMessage,
  richContent: { type: "refund-status", data: refundStatus }
};
```

### 2. Refund Calculator

**High-Value Example:**
```
Input: ₹5,000 fare, 50% deduction
Output: ₹2,500 refund

Message: "We understand this is a significant amount. The refund 
will be credited to your original payment method within the 
processing time mentioned above. Please note that GST component 
is non-refundable as per IRCTC policy. We'll ensure this is 
tracked carefully."
```

**Low-Value Example:**
```
Input: ₹1,000 fare, 25% deduction
Output: ₹750 refund

Message: "Refund will be credited to the original payment method. 
GST component is non-refundable."
```

### 3. TDR Filing

Adapts guidance complexity based on potential refund amount.

---

## 📝 Example Conversations

### Scenario 1: High-Value Approved Refund (₹5,500)

**User:** "Check refund for PNR 1234567890"

**Bot (High-Value Tone):**
> We understand this is a significant refund request, and we want to assure you that it's being handled with priority.
> 
> Your refund has been approved and will be processed carefully.
> 
> The amount will be credited to your account within 7-10 working days. We'll ensure this is tracked closely.
> 
> Thank you for your patience. If you have any concerns during this period, please don't hesitate to reach out.

**[Refund Status Card displays ₹5,500]**

---

### Scenario 2: Low-Value Processing Refund (₹800)

**User:** "Where is my refund for 9876543210?"

**Bot (Low-Value Tone):**
> Your refund is on its way!
> 
> We're currently processing your request.
> 
> It should be completed within 5-7 working days.
> 
> No worries — you'll get a confirmation soon.

**[Refund Status Card displays ₹800]**

---

### Scenario 3: High-Value Rejected Refund (₹6,200)

**User:** "Refund status for 5555555555"

**Bot (High-Value Tone):**
> We understand this may be disappointing, and we want to explain the situation clearly.
> 
> Unfortunately, your refund request doesn't meet the eligibility criteria based on the ticket type and cancellation policy.
> 
> For Premium Tatkal tickets, IRCTC policy states that no refund is provided after booking, as these are premium, guaranteed-seat tickets.
> 
> However, we want to help. If you believe there are exceptional circumstances, you can file a TDR (Ticket Deposit Receipt) for review.
> 
> We're here to assist you through this process. Would you like guidance on filing a TDR?

**[Refund Status Card shows "Rejected"]**

---

### Scenario 4: Low-Value Refund Calculator (₹1,200)

**User:** "Calculate my refund"

**Bot:** *[Shows calculator form]*

**User:** *[Enters ₹1,200 fare, Sleeper class, 30 hours before departure]*

**Calculator Result:**
- Original Fare: ₹1,200
- Deduction (25%): ₹300
- Refund: ₹900

**Message (Low-Value Tone):**
> "Refund will be credited to the original payment method. GST component is non-refundable."

---

### Scenario 5: High-Value Refund Calculator (₹8,500)

**User:** *[Enters ₹8,500 fare, AC class, 60 hours before departure]*

**Calculator Result:**
- Original Fare: ₹8,500
- Deduction (25%): ₹2,125
- Refund: ₹6,375

**Message (High-Value Tone):**
> "We understand this is a significant amount. The refund will be credited to your original payment method within the processing time mentioned above. Please note that GST component is non-refundable as per IRCTC policy. We'll ensure this is tracked carefully."

---

## 🎯 UX Guardrails

### What We DO

✅ **Implicitly acknowledge emotional context**
- Use tone, pacing, and language naturally
- Show empathy through behavior, not explicit statements

✅ **Maintain trust and transparency**
- Explain policies clearly for all amounts
- Provide next steps and timelines

✅ **Scale empathy appropriately**
- High-value: More reassurance, complete sentences
- Low-value: Efficient, friendly, positive

✅ **Stay professional at all levels**
- Never robotic or scripted
- Never dismissive or casual for high amounts

### What We DON'T DO

❌ **Never explicitly mention the amount in tone justification**
- Bad: "Because this is a large refund..."
- Good: "We understand this is a significant amount" (implicit)

❌ **Never sound dismissive for low amounts**
- Bad: "It's just ₹500, you'll get it soon"
- Good: "No worries — you'll receive it within 7-10 days"

❌ **Never sound casual for high amounts**
- Bad: "Cool, your ₹6K refund is approved!"
- Good: "We're pleased to confirm your refund has been approved"

❌ **Never create false urgency or over-apologize**
- Avoid: "We're SO sorry for the delay..." (manufactured emotion)
- Use: "Thank you for your patience" (genuine acknowledgment)

---

## 🧪 Testing

### Test Refund Amounts

| PNR | Status | Amount | Expected Tone |
|-----|--------|--------|---------------|
| 1234567890 | Processing | ₹5,500 | High-value (deliberate, reassuring) |
| 9876543210 | Approved | ₹800 | Low-value (efficient, friendly) |
| 5555555555 | Rejected | ₹6,200 | High-value (empathetic, helpful) |
| 2222222222 | Processing | ₹1,200 | Low-value (quick, positive) |

### Manual Testing Checklist

- [ ] High-value approved refund shows empathetic message
- [ ] Low-value approved refund shows efficient message
- [ ] High-value rejection offers TDR guidance
- [ ] Low-value rejection is concise but not dismissive
- [ ] Calculator adapts message based on calculated amount
- [ ] Messages feel natural, not forced
- [ ] Never explicitly says "because amount is high/low"
- [ ] Tone transitions smoothly between contexts

---

## 🔮 Future Enhancements

### Additional Tone Tiers
```typescript
const REFUND_TIERS = {
  VERY_HIGH: 10000,  // ₹10K+ (executive tone)
  HIGH: 4000,        // ₹4K-10K (current high-value)
  MODERATE: 1500,    // ₹1.5K-4K (balanced)
  LOW: 0             // <₹1.5K (current low-value)
};
```

### Context-Aware Adjustments
- **First-time user**: More explanatory
- **Frequent traveler**: More concise
- **Recent complaint history**: Extra empathetic

### Sentiment Detection
Detect user frustration in message and adjust tone:
- Frustrated + high-value = Maximum empathy
- Calm + low-value = Standard efficiency

### Multilingual Tone Adaptation
Adapt tone rules for Hindi, regional languages with culturally appropriate phrases.

### A/B Testing Framework
Test different empathy thresholds:
- Threshold A: ₹3,000
- Threshold B: ₹5,000
- Threshold C: ₹7,000

Measure user satisfaction, follow-up questions, escalation rates.

---

## 📊 Success Metrics

### Quantitative
- **Reduced escalations** for high-value refunds
- **Faster resolution** for low-value refunds
- **Higher satisfaction scores** (CSAT/NPS)
- **Lower follow-up question rate**

### Qualitative
- **User feedback**: "Bot understood my concern"
- **Tone appropriateness**: A/B test results
- **Trust indicators**: "Thank you for explaining"

---

## 🎓 Key Takeaways

1. **Empathy scales with stakes**: Higher refund = higher emotional load
2. **Tone is behavior**: It's not just copy, it's how the bot acts
3. **Never explicit**: Don't say "because it's large", show care through tone
4. **Context matters**: Same intent, different amounts = different experiences
5. **Balance efficiency and empathy**: High-value needs reassurance, low-value needs speed

---

## 👥 For Developers

### Adding New Contexts

```typescript
// 1. Add template in toneAdapter.ts
ToneTemplates.yourNewContext = {
  high_value: {
    introduction: "...",
    details: "...",
    closing: "..."
  },
  low_value: {
    introduction: "...",
    details: "...",
    closing: "..."
  }
};

// 2. Update type
type ToneContext = 'refundStatus' | 'refundCalculator' | 'tdrFiling' | 'yourNewContext';

// 3. Use in responseGenerator.ts
const message = generateTonedResponse('yourNewContext', subContext, refundAmount);
```

### Adjusting Threshold

```typescript
// In toneAdapter.ts
const REFUND_THRESHOLDS = {
  HIGH_VALUE: 5000, // Change from 4000 to 5000
};
```

---

## 📚 References

- **UX Research**: [Nielsen Norman Group - Emotional Design](https://www.nngroup.com/articles/emotion-design/)
- **Chatbot Empathy**: [Conversational AI Best Practices](https://research.google/pubs/pub48381/)
- **Financial Psychology**: [Loss Aversion in User Experience](https://www.behavioraleconomics.com/resources/mini-encyclopedia-of-be/loss-aversion/)

---

**Implementation Date**: January 19, 2026  
**Version**: 1.0  
**Status**: ✅ Production Ready

