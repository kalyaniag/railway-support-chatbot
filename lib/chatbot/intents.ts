import { Intent } from "@/types/chat";

export const intents: Intent[] = [
  {
    name: "greeting",
    patterns: [
      /^(hi|hello|hey|namaste|good morning|good afternoon|good evening)/i,
      /^(hi there|hello there)/i,
    ],
    responses: [
      "Hello! Welcome to IRCTC Disha 2.0. I'm here to help you with your railway queries. How may I assist you today?",
      "Namaste! I'm Disha, your IRCTC virtual assistant. How can I help you with your train booking or travel queries?",
      "Hi there! Welcome to Indian Railways support. What would you like to know today?",
    ],
    followUp: [
      "Check PNR Status",
      "Find Trains",
      "Cancellation Policy",
      "Tatkal Booking",
    ],
  },
  {
    name: "pnr_status",
    patterns: [
      /\b(pnr|ticket)\s*(status|check|number|tracking)\b/i,
      /\bcheck.*pnr\b/i,
      /\bpnr.*status\b/i,
      /\b(booking|ticket).*status\b/i,
      /\b\d{10}\b/,
    ],
    responses: [
      "To check your PNR status:\n\n1. Visit the IRCTC website or app\n2. Go to 'PNR Status' section\n3. Enter your 10-digit PNR number\n4. Click 'Check Status'\n\nYou can also SMS 'PNR <10-digit PNR>' to 139 for instant status updates.\n\nWould you like to know about anything else?",
      "You can check your PNR status in multiple ways:\n\n• IRCTC Website: www.irctc.co.in → PNR Status\n• IRCTC Rail Connect App\n• SMS: Send 'PNR <PNR Number>' to 139\n• Call: 139 (Railway Enquiry)\n\nYour PNR is a 10-digit number printed on your ticket.\n\nNeed help with anything else?",
    ],
  },
  {
    name: "train_search",
    patterns: [
      /\b(train|trains).*\b(between|from|to|search|find)\b/i,
      /\bfind.*train\b/i,
      /\bsearch.*train\b/i,
      /\btrain.*schedule\b/i,
      /\btrain.*timing\b/i,
      /\btrain.*availability\b/i,
    ],
    responses: [
      "To search for trains:\n\n1. Visit IRCTC website or open the app\n2. Select 'Book Ticket'\n3. Enter:\n   • From Station (source)\n   • To Station (destination)\n   • Date of Journey\n   • Class preference (Sleeper, AC, etc.)\n4. Click 'Find Trains'\n\nYou'll see all available trains with timings, fare, and seat availability.\n\nWould you like to know about ticket classes or fare information?",
      "Finding trains is easy on IRCTC:\n\n**On Website/App:**\n• Go to 'Plan My Travel' or 'Book Ticket'\n• Enter journey details (from, to, date)\n• View all trains with real-time availability\n\n**Via SMS:**\nSend 'TRAINS <Source> <Destination>' to 139\n\nNeed help with anything specific about train booking?",
    ],
  },
  {
    name: "ticket_booking",
    patterns: [
      /\b(book|booking|reserve|reservation).*\b(ticket|train)\b/i,
      /\b(ticket|train).*\b(book|booking|reserve)\b/i,
      /\bi want to book\b/i,
      /\bbook.*ticket\b/i,
      /\bmake.*reservation\b/i,
      /\bwant.*ticket\b/i,
    ],
    responses: [],
    multiStep: true,
  },
  {
    name: "ticket_booking_with_details",
    patterns: [
      /\b(book|booking).*\b(from|to)\b.*\b(to|from)\b/i,
      /\b(ticket|train).*\bfrom\b.*\bto\b/i,
      /\bfrom\b.*\bto\b.*\b(book|ticket)\b/i,
    ],
    responses: [],
  },
  {
    name: "refund_amount_inquiry",
    patterns: [
      /\bmy refund.*\b(\d+|rupees?|rs\.?)\b/i,
      /\brefund.*\b(\d+|rupees?|rs\.?)\b/i,
      /\b(\d+).*\brefund\b/i,
      /\brefund.*amount.*\b(\d+)\b/i,
    ],
    responses: [],
  },
  {
    name: "refund_request_initial",
    patterns: [
      /^i want.*refund$/i,
      /^i need.*refund$/i,
      /^refund$/i,
      /^can i get.*refund\??$/i,
      /^i want my refund$/i,
    ],
    responses: [],
  },
  {
    name: "refund_request_confirm",
    patterns: [],
    responses: [],
  },
  {
    name: "travel_credit_accept",
    patterns: [],
    responses: [],
  },
  {
    name: "cancellation",
    patterns: [
      /\b(cancel|cancellation|refund).*\b(ticket|booking|policy)\b/i,
      /\bhow.*cancel\b/i,
      /\bcancel.*train.*ticket\b/i,
      /\brefund.*policy\b/i,
      /\bticket.*cancel\b/i,
    ],
    responses: [
      "**IRCTC Cancellation Policy:**\n\n**Online Cancellation:**\n• Can be done up to 4 hours before train departure\n• For Tatkal tickets: Up to 1 hour before departure\n\n**Refund Rules:**\n• 48+ hours before: Full refund minus clerkage\n• 12-48 hours: 25% deduction\n• 4-12 hours: 50% deduction\n• After chart preparation: No refund\n\n**How to Cancel:**\n1. Login to IRCTC account\n2. Go to 'Booked Ticket History'\n3. Select ticket and click 'Cancel'\n4. Confirm cancellation\n\nRefund is processed within 3-7 days.\n\nNeed more help?",
    ],
  },
  {
    name: "tatkal_booking",
    patterns: [
      /\btatkal\b/i,
      /\bemergency.*ticket\b/i,
      /\blast.*minute.*booking\b/i,
      /\btatkal.*timing\b/i,
      /\btatkal.*rules\b/i,
    ],
    responses: [
      "**Tatkal Booking Information:**\n\n**Booking Opens:**\n• AC Classes (1A, 2A, 3A, CC): 10:00 AM (1 day before)\n• Non-AC Classes (Sleeper, 2S): 11:00 AM (1 day before)\n\n**Important Rules:**\n• ID proof is mandatory during travel\n• No name change allowed\n• Higher charges applicable\n• Limited quota (10% of total seats)\n• Cancellation: Only up to 30 mins before departure\n• Partial refund only\n\n**Tips:**\n• Keep payment details ready\n• Login before 10 AM\n• Use fast internet connection\n\nAnything else about Tatkal booking?",
    ],
  },
  {
    name: "fare_info",
    patterns: [
      /\b(fare|price|cost|charges|ticket.*price)\b/i,
      /\bhow.*much\b/i,
      /\bticket.*cost\b/i,
    ],
    responses: [
      "**Train Ticket Fare Information:**\n\n**Fare varies based on:**\n• Distance traveled\n• Class of travel\n• Train type (Express, Superfast, Premium)\n• Quota (General, Tatkal, Ladies, etc.)\n\n**Class Types (Low to High):**\n1. Second Sitting (2S)\n2. Sleeper Class (SL)\n3. AC 3 Tier (3A)\n4. AC 2 Tier (2A)\n5. First AC (1A)\n6. Executive Chair Car (EC)\n\n**Additional Charges:**\n• Tatkal: Extra charges apply\n• Dynamic Pricing: On premium trains\n• Booking Fee: ₹10-40\n\nTo see exact fare, search for your journey on IRCTC website.\n\nNeed help with booking?",
    ],
  },
  {
    name: "food_ordering",
    patterns: [
      /\bfood\b.*\b(order|ordering|train)\b/i,
      /\border.*food\b/i,
      /\bmeal.*train\b/i,
      /\be-catering\b/i,
    ],
    responses: [
      "**Food Ordering on Trains:**\n\n**IRCTC eCatering Service:**\n• Order food from 400+ stations\n• Delivered at your seat\n• Choose from multiple restaurants\n\n**How to Order:**\n1. Visit www.ecatering.irctc.co.in\n2. Enter PNR number\n3. Browse menu from your route stations\n4. Place order (2 hours before station)\n5. Pay online\n6. Food delivered at your seat\n\n**Or Call:** 1323 (IRCTC eCatering)\n\nYou can also order via WhatsApp: +91-8750001323\n\nWould you like to know about anything else?",
    ],
  },
  {
    name: "station_code",
    patterns: [
      /\bstation.*code\b/i,
      /\bcode.*station\b/i,
      /\bwhat.*code.*of\b/i,
      /\bfind.*station\b/i,
    ],
    responses: [
      "**Finding Station Codes:**\n\nStation codes are 2-5 letter abbreviations used for booking.\n\n**Popular Station Codes:**\n• NDLS - New Delhi\n• CSMT - Mumbai CST\n• MAS - Chennai Central\n• HWH - Howrah (Kolkata)\n• BLR - Bangalore City\n• SBC - Bangalore Cantt\n• JP - Jaipur\n• LKO - Lucknow\n• ADI - Ahmedabad\n\n**To Find Any Station Code:**\n1. Go to IRCTC website\n2. Start typing station name in 'From/To' field\n3. Codes appear automatically\n\nOr visit: www.irctc.co.in → Station Codes\n\nLooking for a specific station?",
    ],
  },
  {
    name: "refund_status",
    patterns: [
      /\brefund.*status\b/i,
      /\bcheck.*refund\b/i,
      /\brefund.*track\b/i,
      /\bwhere.*refund\b/i,
      /\brefund.*process\b/i,
      /\bhow.*long.*refund\b/i,
    ],
    responses: [],
    multiStep: true,
  },
  {
    name: "refund_e_ticket",
    patterns: [/\be-ticket.*refund\b/i, /\bonline.*ticket.*refund\b/i],
    responses: [],
  },
  {
    name: "refund_counter_ticket",
    patterns: [/\bcounter.*ticket.*refund\b/i, /\boffline.*ticket.*refund\b/i],
    responses: [],
  },
  {
    name: "help",
    patterns: [
      /\bhelp\b/i,
      /\bwhat.*can.*you.*do\b/i,
      /\bassist\b/i,
      /\bsupport\b/i,
      /\bservices\b/i,
    ],
    responses: [
      "I'm Disha 2.0, your IRCTC virtual assistant! I can help you with:\n\n🎫 PNR Status & Tracking\n🚂 Train Schedules & Search\n💰 Fare Information\n❌ Cancellation & Refund Policies\n⚡ Tatkal Booking Rules\n🍽️ Food Ordering on Trains\n📍 Station Codes\n💳 Payment & Transaction Issues\n📱 IRCTC App/Website Help\n\nJust type your question, and I'll assist you!\n\nWhat would you like to know?",
    ],
  },
  {
    name: "account_issues",
    patterns: [
      /\b(login|sign.*in|account|password|username)\b/i,
      /\bcannot.*login\b/i,
      /\bforgot.*password\b/i,
      /\baccount.*locked\b/i,
    ],
    responses: [
      "**IRCTC Account & Login Help:**\n\n**Forgot Password:**\n1. Go to IRCTC login page\n2. Click 'Forgot Password'\n3. Enter User ID\n4. OTP sent to registered email/mobile\n5. Reset password\n\n**Account Locked:**\n• Too many wrong attempts lock account\n• Wait 4 hours or reset password\n• Contact helpdesk: 14646\n\n**Can't Remember User ID:**\n• Check registration email\n• Click 'Forgot User ID' on login page\n• Enter registered email/mobile\n\n**Technical Issues:**\n• Clear browser cache/cookies\n• Try different browser\n• Update IRCTC app\n\nFor urgent help, call: 14646 or 0755-6610661\n\nNeed more assistance?",
    ],
  },
  {
    name: "payment_issues",
    patterns: [
      /\bpayment.*fail\b/i,
      /\bmoney.*deduct\b/i,
      /\btransaction.*fail\b/i,
      /\bpayment.*problem\b/i,
      /\bamount.*deduct.*no.*ticket\b/i,
    ],
    responses: [
      "**Payment & Transaction Issues:**\n\n**If Payment Failed but Money Deducted:**\n• Amount will be auto-refunded in 3-7 days\n• Check 'My Transactions' in IRCTC account\n• If not refunded in 7 days, raise complaint\n\n**To Raise Complaint:**\n1. Login to IRCTC\n2. Go to 'Customer Support'\n3. Select 'Transaction Related'\n4. Fill details with transaction ID\n5. Submit complaint\n\n**Contact Customer Care:**\n• Phone: 14646, 08044647999\n• Email: etickets@irctc.co.in\n• Timings: 24/7 support\n\n**Keep Ready:**\n• Transaction ID\n• Bank reference number\n• PNR (if generated)\n• Screenshot of payment\n\nNeed help with anything else?",
    ],
  },
  // NEW INTELLIGENT FEATURES
  {
    name: "pnr_check_detailed",
    patterns: [
      /\b(check|show|find|get|fetch|status|details).*pnr\b/i,
      /\bpnr.*(check|status|details|show|info)\b/i,
      /\bpnr\s*(\d{10})\b/i,
      /\b(\d{10}).*(status|check|details)\b/i,
      /\bmy\s*(booking|ticket).*(status|check|details)\b/i,
    ],
    responses: [],
    requiresPNR: true,
  },
  {
    name: "train_status_check",
    patterns: [
      /\b(train|my train).*\b(cancel|cancelled|running|delay|delayed|status|where)\b/i,
      /\bis.*train.*\b(cancel|running|on time|delayed)\b/i,
      /\btrain.*\b(status|running|cancelled)\b/i,
      /\bwhere.*is.*train\b/i,
      /\bcheck.*train.*\d{5}\b/i,
      /\btrain\s*\d{5}.*(status|running|cancelled)\b/i,
    ],
    responses: [],
    requiresTrainNumber: true,
  },
  {
    name: "refund_status_check",
    patterns: [
      /\b(refund|money|amount).*\b(status|where|track|check|for)\b/i,
      /\bwhere.*is.*(refund|money)\b/i,
      /\b(refund|money).*(receive|credited|pending|status)\b/i,
      /\brefund.*for.*(pnr|booking|ticket)\b/i,
      /\bcheck.*(refund|money).*(status|for)\b/i,
      /\b(refund|money).*\d{10}\b/i,
    ],
    responses: [],
    requiresPNR: true,
  },
  {
    name: "refund_calculator",
    patterns: [
      /\b(calculate|calculator|how much).*refund\b/i,
      /\brefund.*(amount|calculate|calculator|how much)\b/i,
      /\bhow much.*(refund|get|receive|back)\b/i,
      /\brefund.*calculation\b/i,
      /\bestimate.*refund\b/i,
    ],
    responses: [],
    requiresCalculation: true,
  },
  {
    name: "refund_history",
    patterns: [
      /\b(show|view|check|see|display).*(refund|transaction).*(history|list)\b/i,
      /\b(refund|transaction).*(history|list|all|past)\b/i,
      /\bpast.*refund\b/i,
      /\bmy.*refund.*history\b/i,
      /\ball.*(refund|transaction)\b/i,
    ],
    responses: [],
    showsHistory: true,
  },
  {
    name: "tdr_filing",
    patterns: [
      /\b(file|submit|raise|create|want).*tdr\b/i,
      /\btdr.*(file|filing|how|process|submit)\b/i,
      /\bhow.*(file|submit).*tdr\b/i,
      /\bi want.*tdr\b/i,
      /\bclaim.*refund\b/i,
    ],
    responses: [],
    requiresTDRFlow: true,
  },
  {
    name: "cancelled_train_refund",
    patterns: [
      /\btrain.*(cancelled|canceled).*refund\b/i,
      /\b(cancelled|canceled).*train\b/i,
      /\brailways.*(cancelled|canceled).*train\b/i,
      /\bmy train.*(cancelled|canceled)\b/i,
    ],
    responses: [],
    requiresTrainNumber: true,
  },
  {
    name: "partial_cancellation",
    patterns: [
      /\bpartial.*cancellation\b/i,
      /\bcancel.*\b(some|few|one|two|partial).*passenger\b/i,
      /\bcancel.*only.*\d+.*passenger\b/i,
    ],
    responses: [
      "**Partial Cancellation Guide:**\n\n✅ Yes! You can cancel individual passengers from your booking.\n\n**How it works:**\n1. Login to IRCTC\n2. Go to 'Booked Ticket History'\n3. Find your PNR\n4. Click 'Cancel'\n5. Select passengers you want to cancel\n6. Confirm cancellation\n\n**Refund Calculation:**\n• Refund calculated per passenger\n• Same cancellation charges apply\n• Remaining passengers' tickets stay valid\n\n**Important Notes:**\n• For RAC/Waitlist: Affects remaining passengers' chances\n• Cancellation charges apply per passenger\n• Can't partially cancel tatkal tickets in some cases\n\n💡 Tip: If cancelling >50% passengers, consider cancelling entire booking for better refund.\n\nNeed help calculating refund amount?",
    ],
  },
  {
    name: "alternative_trains",
    patterns: [
      /\balternative.*train\b/i,
      /\bother.*train\b/i,
      /\bdifferent.*train\b/i,
      /\brebook.*another.*train\b/i,
    ],
    responses: [],
    requiresAlternatives: true,
  },
  // Context-aware follow-up intents
  {
    name: "refund_explanation",
    patterns: [
      /\bwhy.*(refund|rejected|not eligible)\b/i,
      /\breason.*(refund|rejection)\b/i,
    ],
    responses: [
      "I understand your concern about the refund rejection. Let me explain:\n\n**Why was your refund rejected?**\n\nBased on the PNR details, this appears to be a Premium Tatkal ticket. Here's why refunds are not processed:\n\n**Premium Tatkal Rules:**\n• Premium Tatkal tickets are NON-REFUNDABLE after booking\n• No refund for any cancellation (even train cancelled)\n• This is an IRCTC policy to prevent speculative bookings\n• The premium pricing reflects this no-refund condition\n\n**What are your options?**\n1. **TDR Filing**: If train was cancelled/delayed >3 hours, you may file TDR for consideration\n2. **Insurance Claim**: If you opted for travel insurance, you may claim\n3. **Contact Railway**: Call 139 for special case review (medical emergency, etc.)\n\n**Important to Know:**\nWhen booking Premium Tatkal, a warning is shown about non-refundable nature. The checkbox must be accepted before payment.\n\n📚 [Learn more about refund rules →](https://www.irctc.co.in/nget/train-search)\n\nWould you like me to help you file a TDR or check other options?",
    ],
  },
  {
    name: "refund_rules_explanation",
    patterns: [
      /\bwhat.*(refund|rule|policy)\b/i,
      /\btell me.*(refund|rule)\b/i,
    ],
    responses: [
      "**IRCTC Refund Rules Explained:**\n\n**🎫 Regular Tickets:**\n• >48 hours before: ₹240 deduction\n• 12-48 hours: 25% of fare deducted\n• 4-12 hours: 50% of fare deducted\n• <4 hours: No refund\n\n**⚡ Tatkal Tickets:**\n• No refund for voluntary cancellation\n• Only if train cancelled/delayed >3hrs\n\n**💎 Premium Tatkal:**\n• Absolutely no refund\n• Even if train cancelled\n• Non-refundable by policy\n\n**🚂 If Train is Cancelled:**\n• Full refund (100%)\n• No cancellation charges\n• Auto-refund within 7-10 days\n\n**📄 TDR (Ticket Deposit Receipt):**\n• Can be filed for special circumstances\n• Medical emergency with proof\n• Train delay >3 hours\n• AC/services not provided\n\nWould you like to calculate your refund amount or file a TDR?",
    ],
  },
  {
    name: "refund_process_explanation",
    patterns: [/\bhow.*(refund|process|work)\b/i, /\brefund.*process\b/i],
    responses: [
      "**How the Refund Process Works:**\n\n**Step 1: Cancellation**\n• Cancel ticket via IRCTC app/website\n• Note the cancellation confirmation\n\n**Step 2: Refund Calculation**\n• System automatically calculates refund\n• Based on ticket type & cancellation time\n• Deducts applicable charges\n\n**Step 3: Processing**\n• Refund request sent to bank\n• Usually takes 7-10 business days\n• Can take up to 15 days for some banks\n\n**Step 4: Credit to Account**\n• Refunded to original payment method\n• Card/UPI/Net Banking\n• You'll receive SMS confirmation\n\n**Track Refund Status:**\n• IRCTC Website → Refund Status\n• Use your PNR number\n• Shows current stage of processing\n\n**If Delayed:**\n• Wait 15 business days\n• Then call 139 or email care@irctc.co.in\n• Keep PNR & transaction ID ready\n\nWould you like to check your refund status now?",
    ],
  },
  {
    name: "train_delay_explanation",
    patterns: [/\bwhy.*(train|delay|cancel)\b/i, /\breason.*(delay|cancel)\b/i],
    responses: [
      "**Why is your train delayed/cancelled?**\n\nCommon reasons include:\n\n**1. Operational Reasons:**\n• Track maintenance/repair\n• Signal failures\n• Engine/coach technical issues\n• Staff availability\n\n**2. Weather Conditions:**\n• Fog (especially in winter)\n• Heavy rain/floods\n• Landslides in hilly areas\n• Extreme heat affecting tracks\n\n**3. Accidents/Incidents:**\n• Accident on route\n• Security concerns\n• Track obstruction\n\n**4. Priority Trains:**\n• Rajdhani/Shatabdi given priority\n• May cause other trains to wait\n\n**What you can do:**\n• Check live running status regularly\n• If delayed >3 hours, you can file TDR for refund\n• For cancellation, full refund is automatic\n• Keep checking for alternate trains\n\nWould you like me to find alternative trains for your journey?",
    ],
  },
  {
    name: "tdr_explanation",
    patterns: [/\bwhat.*tdr\b/i, /\btdr.*mean\b/i, /\bexplain.*tdr\b/i],
    responses: [
      "**What is TDR (Ticket Deposit Receipt)?**\n\nTDR is a refund claim system for specific situations where normal cancellation isn't possible or fair.\n\n**When to file TDR:**\n\n✅ **You Should File TDR if:**\n• Train delayed by more than 3 hours\n• AC/services not working during journey\n• Train cancelled by Railways\n• Booked wrong class/date by mistake\n• Medical emergency prevented travel\n• Missed train due to train delay\n• Duplicate/fraudulent booking\n\n❌ **Don't File TDR if:**\n• You voluntarily cancelled (use normal cancellation)\n• You missed train without valid reason\n• Premium Tatkal tickets\n\n**Filing Process:**\n1. Login to IRCTC\n2. Go to 'My Transactions' → 'File TDR'\n3. Select reason & upload proof (if needed)\n4. Submit within time limit\n\n**Time Limits:**\n• Train delay/AC issue: Within 3 days of journey\n• Wrong booking: Within journey date\n• Non-travel: Within 60 days\n\nWould you like me to guide you through filing a TDR?",
    ],
  },
  {
    name: "tdr_filing_continue",
    patterns: [/^(yes|yeah|sure|ok|okay|continue|proceed)\b/i],
    responses: [],
    requiresTDRFlow: true,
  },
];

export const fallbackResponses = [
  "I'm **DISHA 2.0**, your IRCTC virtual assistant. I can help with PNR status, train info, bookings, refunds, cancellations, and more. What would you like to know?",
  "I can assist you with Indian Railways services - ticket booking, PNR status, train schedules, refunds, and travel queries. How can I help?",
  "I didn't quite catch that. Try asking about:\n- PNR status\n- Train running status\n- How to book tickets\n- Refund queries\n- Cancellation policy",
  'I\'m here to help with IRCTC services!\n\n**Try:**\n- "Check PNR 1234567890"\n- "Train 12301 status"\n- "How to book ticket?"\n- "Refund policy"',
];
