# 🎭 Tone Adaptation - Live Examples

## Visual Comparison: High vs Low Value Refunds

This document shows **actual bot responses** with tone adaptation in action.

---

## Example 1: Credited Status (Almost Complete)

### 💰 Low-Value Refund: ₹1,046
**User Query:** "I want my refund for PNR 3534892395"

**Bot Response (Friendly, Efficient):**
```
Almost there!

Your refund is in the final stage and will hit your account soon.

Expect it within 24-48 hours to your original payment method.

You'll get a confirmation once it's done. Thanks for your patience!

💰 Refund: ₹1,046
```

**[Refund Status Card Shows: CREDITED, 75% Progress]**

---

### 💰 High-Value Refund: ₹5,500 (Hypothetical)
**User Query:** "I want my refund for PNR 1234567890"

**Bot Response (Empathetic, Reassuring):**
```
Thank you for your patience during this process.

We're pleased to inform you that your refund is in the final stage 
and will be credited to your account very soon.

The amount is currently being transferred to your original payment 
method. You should see it reflected within 24-48 hours.

We appreciate your understanding. If the amount doesn't appear within 
the expected timeframe, please reach out and we'll investigate 
immediately.

💰 Refund Amount: ₹5,500
```

**[Refund Status Card Shows: CREDITED, 75% Progress]**

---

## Example 2: Processing Status

### 💰 Low-Value Refund: ₹1,200
**User Query:** "Where is my refund for PNR 2222222222?"

**Bot Response (Quick, Positive):**
```
Your refund is on its way!

We're currently processing your request.

It should be completed within 5-7 working days.

No worries — you'll get a confirmation soon.

💰 Refund: ₹1,200
```

---

### 💰 High-Value Refund: ₹6,800
**User Query:** "Where is my refund for PNR 8888888888?"

**Bot Response (Patient, Thorough):**
```
Thank you for checking on your refund status.

Your refund request is currently being processed by our team. 
We want to ensure everything is reviewed thoroughly.

This typically takes 5-7 working days for completion. We appreciate 
your patience as we handle this carefully.

Rest assured, you'll receive a confirmation once the refund is 
initiated. We're here if you need any updates.

💰 Refund Amount: ₹6,800
```

---

## Example 3: Approved Status

### 💰 Low-Value Refund: ₹800
**User Query:** "Check refund status for 9876543210"

**Bot Response (Cheerful, Concise):**
```
Good news!

Your refund has been approved.

You'll receive the amount within 7-10 working days.

You're all set. Feel free to check back anytime.

💰 Refund: ₹800
```

---

### 💰 High-Value Refund: ₹8,200
**User Query:** "Check refund status for 7777777777"

**Bot Response (Formal, Caring):**
```
We understand this is a significant refund request, and we want to 
assure you that it's being handled with priority.

Your refund has been approved and will be processed carefully.

The amount will be credited to your account within 7-10 working days. 
We'll ensure this is tracked closely.

Thank you for your patience. If you have any concerns during this 
period, please don't hesitate to reach out.

💰 Refund Amount: ₹8,200
```

---

## Example 4: Rejected Status (Most Critical)

### 💰 Low-Value Refund: ₹750
**User Query:** "Refund for PNR 5555555555" (Premium Tatkal)

**Bot Response (Helpful, Direct):**
```
Unfortunately, this refund doesn't qualify under current policy.

Premium Tatkal tickets aren't eligible for refunds after booking.

This is part of the terms for guaranteed-seat bookings.

You can file a TDR if there were exceptional circumstances.

Let me know if you'd like help with that!

💰 Refund: ₹750
```

---

### 💰 High-Value Refund: ₹6,200
**User Query:** "Refund for PNR 5555555555" (Premium Tatkal)

**Bot Response (Empathetic, Helpful, Offers Alternatives):**
```
We understand this may be disappointing, and we want to explain the 
situation clearly.

Unfortunately, your refund request doesn't meet the eligibility 
criteria based on the ticket type and cancellation policy.

For Premium Tatkal tickets, IRCTC policy states that no refund is 
provided after booking, as these are premium, guaranteed-seat tickets.

However, we want to help. If you believe there are exceptional 
circumstances, you can file a TDR (Ticket Deposit Receipt) for review.

We're here to assist you through this process. Would you like guidance 
on filing a TDR?

💰 Refund Amount: ₹6,200
```

---

## Example 5: Initiated Status (Refund Started)

### 💰 Low-Value Refund: ₹950
**User Query:** "Status of my refund PNR 4444444444"

**Bot Response (Positive, Brief):**
```
Great news!

Your refund has been initiated and is in progress.

Should be in your account within 3-5 days.

You'll get an update once it's credited!

💰 Refund: ₹950
```

---

### 💰 High-Value Refund: ₹7,500
**User Query:** "Status of my refund PNR 6666666666"

**Bot Response (Professional, Reassuring):**
```
We're pleased to update you on your refund progress.

Your refund has been initiated and is now moving through the payment 
system. We're monitoring it to ensure smooth processing.

The refund should be completed and credited to your account within 
3-5 working days.

We'll keep you informed of any updates. Feel free to reach out if 
you need more information.

💰 Refund Amount: ₹7,500
```

---

## 🎯 Key Differences Highlighted

### Low-Value Tone (≤₹4,000)
- **Opening**: "Almost there!", "Good news!", "Great news!", "Your refund is on its way!"
- **Language**: Casual, friendly, upbeat
- **Sentence Length**: Short (1-2 lines per section)
- **Pacing**: Quick, efficient
- **Closing**: "Thanks!", "You're all set!", "No worries!"
- **Emoji Style**: 💰 Refund: ₹X

### High-Value Tone (>₹4,000)
- **Opening**: "Thank you for your patience", "We understand this is significant", "We're pleased to inform you"
- **Language**: Formal, respectful, empathetic
- **Sentence Length**: Complete, multi-line explanations
- **Pacing**: Deliberate, patient
- **Closing**: "We're here if you need updates", "Please don't hesitate to reach out", "We appreciate your understanding"
- **Emoji Style**: 💰 Refund Amount: ₹X,XXX

---

## 📊 Tone Adaptation Matrix

| Refund Amount | Status | Tone Level | Opening Style | Explanation Depth | Closing Style |
|---------------|--------|------------|---------------|-------------------|---------------|
| ₹1,046 | Credited | Low | "Almost there!" | Brief, 2-3 lines | "Thanks for your patience!" |
| ₹5,500 | Credited | High | "Thank you for your patience..." | Detailed, 4-6 lines | "Please reach out if needed" |
| ₹1,200 | Processing | Low | "Your refund is on its way!" | Quick update | "No worries!" |
| ₹6,800 | Processing | High | "Thank you for checking..." | Thorough explanation | "We're here for updates" |
| ₹800 | Approved | Low | "Good news!" | Concise confirmation | "You're all set!" |
| ₹8,200 | Approved | High | "We understand this is significant..." | Detailed assurance | "Please don't hesitate..." |
| ₹750 | Rejected | Low | "Unfortunately..." | Direct explanation | "Let me know if I can help!" |
| ₹6,200 | Rejected | High | "We understand this may be disappointing..." | Empathetic + alternatives | "We're here to assist you" |

---

## 🧪 Testing Your Chatbot

### Test Queries

**Low-Value Credited (₹1,046):**
```
"I want my refund for PNR 3534892395"
```
**Expected:** Friendly, brief, "Almost there!" tone

**High-Value Processing (Make a test PNR with ₹5,000+):**
```
"Where is my refund for PNR [high-value-pnr]"
```
**Expected:** Patient, detailed, "Thank you for checking..." tone

**High-Value Rejected (₹6,200):**
```
"Refund for PNR 5555555555"
```
**Expected:** Empathetic, offers TDR alternative, "We understand this may be disappointing..." tone

---

## 💡 What Makes It Work

### 1. **Threshold Detection**
```typescript
const REFUND_THRESHOLDS = { HIGH_VALUE: 4000 };
// ₹4,000 is the magic number
```

### 2. **Status Mapping**
- `credited` → Almost done messages
- `initiated` → Progress update messages
- `processing` → Being reviewed messages
- `approved` → Confirmed messages
- `rejected` → Empathetic + helpful messages

### 3. **Template Selection**
```typescript
generateTonedResponse('refundStatus', 'credited', 1046)
// Returns: low_value template (friendly, brief)

generateTonedResponse('refundStatus', 'credited', 5500)
// Returns: high_value template (empathetic, detailed)
```

### 4. **Visual Indicator**
- Low: `💰 Refund: ₹1,046`
- High: `💰 Refund Amount: ₹5,500` (more formal)

---

## 🎨 UX Impact

### User with ₹1,000 refund:
- ✅ Feels: "This is quick and easy!"
- ✅ Perception: Efficient, friendly service
- ✅ Behavior: Less likely to ask follow-ups

### User with ₹6,000 refund:
- ✅ Feels: "They understand this matters to me"
- ✅ Perception: Careful, trustworthy handling
- ✅ Behavior: More reassured, less anxious

---

## 🔄 Dynamic Adaptation in Action

**Same Query, Different Amounts:**

Query: "Where is my refund?"

| PNR | Amount | Response Start |
|-----|--------|----------------|
| 3534892395 | ₹1,046 | "Almost there! Your refund is in the final stage..." |
| 1234567890 | ₹5,500 | "Thank you for your patience during this process..." |
| 9876543210 | ₹800 | "Good news! Your refund has been approved..." |
| 7777777777 | ₹8,200 | "We understand this is a significant refund request..." |

**No explicit mention of amount in tone justification!**
- ❌ Bad: "Because this is a large refund..."
- ✅ Good: "We understand this is significant..." (implicit)

---

## 📈 Success Metrics

Track these to validate tone adaptation effectiveness:

### Quantitative
- **Follow-up question rate**: High-value users should ask fewer "when will I get it?" questions
- **Escalation rate**: Should drop for high-value refunds
- **Satisfaction (CSAT)**: Higher ratings for refund interactions
- **Time to resolution**: Faster for low-value (less back-and-forth)

### Qualitative
- User comments: "Bot understood my concern"
- Sentiment analysis: Less frustration detected
- Support tickets: Fewer complaints about tone

---

**Test It Live**: Run the dev server and try both PNRs!
```bash
npm run dev

# Test Low-Value (₹1,046):
"I want my refund for PNR 3534892395"

# Test High-Value (create mock with ₹5,000+):
"Check refund for PNR 1234567890"
```

**Look for the difference in:**
- Opening line tone
- Explanation depth
- Closing reassurance
- Amount display format

---

**Status**: ✅ Tone Adaptation Active  
**Threshold**: ₹4,000  
**Contexts**: 5 statuses (approved, credited, initiated, processing, rejected)  
**Languages**: English (scalable to Hindi, regional languages)

