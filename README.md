# 🚂 IRCTC AskDisha 2.0 - AI-Powered Railway Support Chatbot# IRCTC Disha 2.0 - Chatbot Support System



A modern, intelligent chatbot for Indian Railways built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Features persistent chat history, context-aware conversations, and a professional UI.A rule-based chatbot support system for IRCTC (Indian Railway Catering and Tourism Corporation) built with Next.js 14, TypeScript, and Tailwind CSS.



![Next.js](https://img.shields.io/badge/Next.js-16.1.2-black)## Features

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)- 🤖 **Intelligent Intent Detection**: Pattern-based matching for various railway queries

![License](https://img.shields.io/badge/License-MIT-green)- 💬 **Streaming Responses**: Natural typing animation for bot responses

- 🎨 **Disha 2.0 Theme**: Official IRCTC color scheme (Orange gradient)

## ✨ Features- 📱 **Responsive Design**: Mobile-first approach, works on all devices

- ⚡ **Quick Actions**: Pre-defined buttons for common queries

### 🧠 Intelligent Conversation- 🎫 **Comprehensive Coverage**: PNR status, train search, cancellation, Tatkal, fare info, and more

- **Context-Aware Memory**: Remembers conversation across browser sessions

- **Follow-up Questions**: Understands "why?", "how?", "what?" based on context## Supported Queries

- **24+ Intent Types**: PNR check, refund tracking, train status, TDR filing, etc.

- **Priority-Based Detection**: Specific intents matched before generic ones- PNR Status Checking

- Train Search & Schedules

### 💾 Persistent Storage- Fare Information

- **Chat History**: All messages saved to localStorage- Cancellation & Refund Policies

- **Session Continuity**: Pick up conversations days later- Tatkal Booking Rules

- **Context Tracking**: Remembers PNRs, train numbers, topics- Food Ordering on Trains

- **User Control**: Clear history anytime with confirmation- Station Codes

- Account & Login Issues

### 🎨 Professional UI- Payment Problems

- **Blue/Indigo Theme**: Clean, corporate design- General Railway Help

- **Lucide React Icons**: Professional iconography

- **Responsive Design**: Works on mobile, tablet, desktop## Installation

- **Smooth Animations**: Message streaming, typing indicators

- **Rich Content**: Interactive cards for PNR, refunds, trainsFirst, install the required dependencies:



### 🎯 Key Capabilities```bash

- ✅ PNR status checking with detailed booking infonpm install lucide-react clsx tailwind-merge class-variance-authority

- ✅ Train running status with live updates```

- ✅ Refund tracking with timeline visualization

- ✅ Refund calculator for ticket cancellations## Getting Started

- ✅ TDR (Ticket Deposit Receipt) filing wizard

- ✅ Alternative train suggestionsRun the development server:

- ✅ Tatkal booking rules and guidelines

- ✅ Cancellation policy explanations```bash

npm run dev

## 🚀 Quick Start```



### PrerequisitesOpen [http://localhost:3000](http://localhost:3000) with your browser to see the chatbot.

- Node.js 18+ 

- npm or yarn## Project Structure



### Installation```

chatbot-support/

```bash├── app/

# Clone the repository│   ├── page.tsx              # Main chat page

git clone <your-repo-url>│   ├── layout.tsx            # Root layout

cd chatbot-support│   └── globals.css           # Global styles

├── components/

# Install dependencies│   └── chat/

npm install│       ├── ChatContainer.tsx    # Main chat logic

│       ├── MessageBubble.tsx    # Message component

# Run development server│       ├── ChatInput.tsx        # Input field

npm run dev│       ├── TypingIndicator.tsx  # Typing animation

```│       └── QuickActions.tsx     # Quick action buttons

├── lib/

Open [http://localhost:3000](http://localhost:3000) in your browser.│   ├── utils.ts              # Utility functions

│   └── chatbot/

### Build for Production│       ├── intents.ts           # Intent definitions

│       ├── intentDetector.ts    # Pattern matching

```bash│       └── responseGenerator.ts # Response logic

npm run build└── types/

npm start    └── chat.ts               # TypeScript types

``````



## 📁 Project Structure## Technology Stack



```- **Framework**: Next.js 14 (App Router)

chatbot-support/- **Language**: TypeScript

├── app/- **Styling**: Tailwind CSS

│   ├── page.tsx              # Main landing page- **Icons**: Lucide React

│   ├── layout.tsx            # Root layout- **Pattern Matching**: Regex-based intent detection

│   └── globals.css           # Global styles

├── components/## Color Scheme (Disha 2.0)

│   └── chat/

│       ├── ChatContainer.tsx     # Main chat logic- Primary Orange: `#E95420`

│       ├── ChatWidget.tsx        # Floating chat button- Secondary Orange: `#FF6B35`

│       ├── MessageBubble.tsx     # Message display- Gradient: `from-[#E95420] to-[#FF6B35]`

│       ├── ChatInput.tsx         # Input field

│       ├── QuickActions.tsx      # Quick reply buttons## No AI Integration

│       ├── ClearChatButton.tsx   # Clear history button

│       └── [Rich Content Cards]  # PNR, refund, train cardsThis chatbot uses **rule-based pattern matching** and does not rely on any external AI APIs. All responses are predefined and triggered based on keyword matching, making it fast, reliable, and cost-effective.

├── lib/

│   └── chatbot/---

│       ├── intentDetector.ts     # Intent detection logic

│       ├── intents.ts            # Intent definitions (24+)Built with ❤️ for Indian Railways

│       ├── responseGenerator.ts  # Response creation
│       ├── conversationContext.ts # Context tracking
│       └── mockData.ts           # Demo data
├── types/
│   └── chat.ts               # TypeScript types
└── [Documentation]           # 8+ markdown files
```

## 🎯 Usage Examples

### Basic Queries
```
"Check PNR 1234567890"
"Is train 12301 running?"
"Calculate my refund"
"How to file TDR?"
```

### Context-Aware Conversations
```
User: "Refund for PNR 5555555555"
Bot: [Shows refund rejected status]

User: "why?"
Bot: [Explains Premium Tatkal non-refundable policy]

User: "what are the rules?"
Bot: [Details complete refund policy]
```

## 🧪 Testing

### Demo PNRs
- `1234567890` - Confirmed booking (Howrah to Delhi)
- `9876543210` - RAC booking (Mumbai to Delhi)
- `5555555555` - Premium Tatkal (Refund rejected)
- `2222222222` - Waitlist booking
- `3333333333` - Cancelled booking

### Demo Train Numbers
- `12301` - Running on time
- `12951` - Delayed by 2 hours
- `12259` - Cancelled

### Test Scenarios
1. **Persistence Test**: Ask questions → Close browser → Reopen → History preserved ✅
2. **Context Test**: "Refund for PNR X" → Close → Reopen → "why?" → Bot remembers ✅
3. **Clear Chat**: Click trash icon → Confirm → All history cleared ✅

## 📚 Documentation

Comprehensive guides available:
- **CONVERSATION_CONTEXT_FEATURE.md** - How context memory works
- **LOCALSTORAGE_IMPLEMENTATION.md** - Persistence details
- **UI_REDESIGN_SUMMARY.md** - Design system
- **STYLE_GUIDE.md** - Component styling
- **TESTING_GUIDE.md** - QA procedures
- **COMPONENTS_DOCUMENTATION.md** - Component API
- **IMPLEMENTATION_SUMMARY.md** - Full status
- **FIXED.md** - Latest updates

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.2 with Turbopack
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **State**: React Hooks (useState, useEffect, useRef)
- **Storage**: localStorage API
- **Build**: Next.js optimized production build

## 🔑 Key Technologies

### Context Management
```typescript
// Automatic context tracking
updateContext(userMessage, intent, {
  pnr: '1234567890',
  trainNumber: '12301',
  topic: 'refund',
  richContent: data
});

// Persisted to localStorage automatically
```

### Intent Detection
```typescript
// Priority-based matching
detectIntent("Refund for PNR 5555555555")
// Returns: 'refund_status_check' (not generic 'pnr_status')
```

### Persistent Storage
```typescript
// Messages auto-saved
localStorage.setItem('irctc_chat_messages', JSON.stringify(messages));

// Context auto-saved
localStorage.setItem('irctc_chatbot_context', JSON.stringify(context));
```

## 🎨 UI Highlights

### Color Palette
- **Primary**: Blue 600 (#2563EB)
- **Secondary**: Indigo 600 (#4F46E5)
- **Accent**: Gray 50 (#F9FAFB)
- **Text**: Gray 900 (#111827)

### Components
- **8+ Rich Content Cards**: PNR details, refund tracker, train status, etc.
- **Responsive Layout**: Mobile-first design
- **Smooth Animations**: Message streaming, typing indicators
- **Professional Icons**: Lucide React icon set

## 📊 Features Breakdown

### Intents Supported (24+)
- Greeting & Help
- PNR Status (Detailed)
- Train Search & Status
- Ticket Booking Info
- Cancellation Policy
- Refund Status & Calculator
- Refund History
- TDR Filing
- Tatkal Rules
- Food Ordering
- Seat Availability
- Platform Info
- Luggage Guidelines
- And more...

### Rich Content Types
- PNR Details Card
- Train Status Card
- Refund Status Tracker
- Refund Calculator Form
- Refund History Dashboard
- Alternative Trains Card
- TDR Filing Wizard
- Timeline Visualizations

## 🔮 Future Enhancements

- [ ] User authentication & profiles
- [ ] Cloud sync across devices
- [ ] Export chat history (PDF/TXT)
- [ ] Search through past conversations
- [ ] Multi-language support (Hindi, regional languages)
- [ ] Voice input/output
- [ ] Real-time train data integration
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] Analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Authors

- **Mukund** - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Lucide for beautiful icons
- Tailwind CSS for the styling system
- IRCTC for inspiration

## 📧 Contact

For questions or support:
- Open an issue on GitHub
- Email: [your-email]

## 🌟 Star the Project!

If you find this project useful, please give it a ⭐ on GitHub!

---

**Built with ❤️ for Indian Railways passengers**

**Last Updated**: January 18, 2026
