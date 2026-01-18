# 🧪 Quick Testing Guide

## Start Testing in 3 Steps:

### 1. Open the Application
Visit: **http://localhost:3000**

### 2. Click the Orange Chat Icon
Bottom-right corner of the page → Opens floating chatbot

### 3. Try These Commands

#### Quick Demo Sequence:
```
1. "Check PNR 1234567890"
   → See full booking details with passengers

2. "Is train 12259 running?"
   → See cancellation alert + alternatives

3. "Where is my refund for 9876543210?"
   → Track refund progress (60% complete)

4. "Show refund history"
   → View all past refunds

5. "Calculate my refund"
   → Interactive calculator opens

6. "File TDR"
   → Step-by-step TDR wizard starts
```

---

## 🎯 Feature Testing Checklist

### ✅ PNR Lookup
- [ ] Try: `1234567890` (Confirmed)
- [ ] Try: `9876543210` (RAC)
- [ ] Try: `5555555555` (Premium Tatkal)
- [ ] Try: `2222222222` (Waitlist)
- [ ] Try invalid PNR → See helpful error

**Expected:** Rich card with passenger list, train details, fare

---

### ✅ Train Status
- [ ] Try: `12301` (On time)
- [ ] Try: `12951` (2 hour delay)
- [ ] Try: `12259` (Cancelled → shows alternatives)
- [ ] Try: `12430` (15 min delay)

**Expected:** Status card with live location, delays, alerts

---

### ✅ Refund Tracking
- [ ] Try: `1234567890` (Processing)
- [ ] Try: `9876543210` (Approved)
- [ ] Try: `5555555555` (Rejected)

**Expected:** 4-stage progress tracker with animated current step

---

### ✅ Refund Calculator
- [ ] Say: "Calculate my refund"
- [ ] Select: AC ticket
- [ ] Enter: ₹3000 fare
- [ ] Enter: 72 hours before departure
- [ ] Click: Calculate

**Expected:** Shows ₹2250 refund (25% deduction)

Try different combinations:
- AC + 10 hours → 75% deduction
- Sleeper + 50 hours → 20% deduction
- Tatkal + any time → 100% deduction (non-refundable)

---

### ✅ Refund History
- [ ] Say: "Show refund history"

**Expected:** Dashboard with:
- Total refunded: ₹8,323
- Pending: ₹3,123
- 3 transaction cards with dates and status

---

### ✅ Alternative Trains
- [ ] Say: "Show alternatives for 12259"
- [ ] Say: "My train 12259 is cancelled"

**Expected:** Card showing 5 alternative trains with:
- Departure/arrival times
- Duration
- Available classes
- Pricing
- Status (on time/delayed)

---

### ✅ TDR Filing Wizard
- [ ] Say: "File TDR"
- [ ] **Step 1:** Enter PNR (10 digits)
- [ ] **Step 2:** Select reason + description
- [ ] **Step 3:** Enter bank details
- [ ] **Step 4:** Review and submit

**Expected:** 4-step wizard with progress bar, validation at each step

---

### ✅ Partial Cancellation
- [ ] Say: "Cancel one passenger"
- [ ] Say: "Partial cancellation"

**Expected:** Refund calculator opens with explanation

---

## 🎨 UI/UX Testing

### Visual Elements
- [ ] Orange theme consistent throughout
- [ ] Smooth animations on card appearance
- [ ] Progress bars animate correctly
- [ ] Status badges color-coded properly
- [ ] Responsive on mobile (resize browser)

### Interactions
- [ ] Calculator buttons toggle selection
- [ ] TDR wizard back/next buttons work
- [ ] Form validation shows errors
- [ ] Submit buttons disable when invalid
- [ ] Hover effects on cards

---

## 📱 Responsive Testing

### Desktop (>640px)
- [ ] Chatbot width: 400px
- [ ] Chatbot height: 600px
- [ ] All content visible
- [ ] No horizontal scroll

### Mobile (<640px)
- [ ] Chatbot width: calc(100vw - 2rem)
- [ ] Chatbot height: calc(100vh - 8rem)
- [ ] Touch-friendly buttons
- [ ] Readable text sizes

**Test:** Resize browser from 1920px → 375px

---

## 🐛 Error Handling Testing

### Invalid Inputs
- [ ] Try PNR: `123` (too short)
- [ ] Try train: `999999` (not found)
- [ ] Try empty calculator submission
- [ ] Try TDR with incomplete data

**Expected:** Helpful error messages with suggestions

---

## 💡 Advanced Testing

### Natural Language
Try conversational queries:
```
"What's the status of my booking 1234567890?"
"When will I get my money back for PNR 9876543210?"
"Show me trains instead of 12259"
"I want to file a complaint for delayed train"
```

**Expected:** Intent detection works, appropriate response shown

---

## 🎯 Performance Testing

### Load Times
- [ ] Initial page load < 500ms
- [ ] Chatbot opens instantly
- [ ] Messages appear immediately
- [ ] No lag when typing
- [ ] Components render smoothly

### Build Quality
- [ ] Zero console errors
- [ ] No TypeScript warnings
- [ ] No React warnings
- [ ] Clean build output

---

## ✨ User Delight Features

Look for these details:
- [ ] Animated train emoji 🚂
- [ ] Progress spinner on processing refunds
- [ ] Color-coded status badges
- [ ] Gradient backgrounds on cards
- [ ] Info tooltips with icons
- [ ] Masked bank account numbers
- [ ] Percentage progress bars
- [ ] Current step pulse animation

---

## 📸 Screenshot Checklist

Capture these for documentation:
1. Full homepage with chatbot closed
2. Chatbot open on desktop
3. Chatbot open on mobile
4. PNR details card
5. Train status card (cancelled with alternatives)
6. Refund status tracker
7. Refund calculator form
8. Refund history dashboard
9. Alternative trains card
10. TDR wizard (all 4 steps)

---

## 🚀 Next Steps After Testing

If all tests pass:
1. ✅ Mark implementation as complete
2. 📝 Document any issues found
3. 🎯 Prioritize next features
4. 🔄 Deploy to staging/production

If issues found:
1. 📋 List specific bugs
2. 🔍 Reproduce steps
3. 🛠️ Fix and re-test
4. ✅ Verify fix

---

## 📞 Support

If you encounter issues:
- Check browser console for errors
- Verify dev server is running
- Clear browser cache
- Check network tab for failed requests
- Review IMPLEMENTATION_COMPLETE.md for demo data

---

**Happy Testing! 🎉**
