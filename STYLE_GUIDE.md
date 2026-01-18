# 🎨 Visual Style Guide - Professional UI

## Color Palette

### Primary Colors
```
Blue Theme (New Professional Look)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary:     #2563eb (blue-600)
Secondary:   #4f46e5 (indigo-600)
Accent:      #3b82f6 (blue-500)
```

### Neutral Colors
```
Gray Scale (Clean & Professional)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Background:  #f9fafb (gray-50)
Surface:     #ffffff (white)
Border:      #e5e7eb (gray-200)
Text:        #374151 (gray-700)
Muted:       #6b7280 (gray-500)
```

### Status Colors
```
Semantic Colors
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Success:     #22c55e (green-500)
Warning:     #eab308 (yellow-500)
Error:       #ef4444 (red-500)
Info:        #3b82f6 (blue-500)
Online:      #4ade80 (green-400)
```

---

## Typography Scale

### Font Weights
```
Regular:     400 (body text)
Medium:      500 (emphasis)
Semibold:    600 (headings)
Bold:        700 (rare, only for hero text)
```

### Font Sizes
```
xs:   0.75rem  (12px)  - Timestamps, captions
sm:   0.875rem (14px)  - Body text, buttons
base: 1rem     (16px)  - Default text
lg:   1.125rem (18px)  - Subheadings
xl:   1.25rem  (20px)  - Headings
2xl:  1.5rem   (24px)  - Page titles
```

---

## Spacing System

### Padding/Margin Scale (4px grid)
```
0.5 → 2px
1   → 4px
2   → 8px
3   → 12px
4   → 16px
5   → 20px
6   → 24px
8   → 32px
```

### Common Usage
```
Card padding:        p-4 (16px)
Button padding:      px-4 py-2.5 (16px × 10px)
Gap between items:   gap-3 (12px)
Section margin:      mb-6 (24px)
```

---

## Border Radius

### Standards
```
sm:   0.125rem (2px)  - Badges, pills
md:   0.375rem (6px)  - Small cards
lg:   0.5rem   (8px)  - Default (cards, buttons, inputs)
xl:   0.75rem  (12px) - Large containers
2xl:  1rem     (16px) - Hero sections
```

### Usage
```
✅ Use: rounded-lg (most common)
✅ Use: rounded-xl (chat widget)
❌ Avoid: rounded-full (too playful)
❌ Avoid: rounded-2xl (too soft)
```

---

## Shadows

### Elevation System
```
shadow-sm:   Subtle depth (cards, inputs)
shadow-md:   Medium depth (floating elements)
shadow-lg:   High depth (modals, tooltips)
shadow-xl:   Maximum depth (rare, hero elements)
```

### When to Use
```
✅ shadow-sm:  Default for all cards
✅ shadow-md:  Hover states, active buttons
❌ shadow-lg:  Use sparingly
❌ shadow-xl:  Almost never
```

---

## Icon System

### Lucide React Icons

#### Chat & Communication
```tsx
<Bot />              // AI assistant
<User />             // User avatar
<MessageSquare />    // Chat message
<Headphones />       // Support/Help
<Send />             // Send message
```

#### Actions
```tsx
<Ticket />           // Booking
<Search />           // PNR search
<IndianRupee />      // Money/Refund
<Zap />              // Fast/Tatkal
<ExternalLink />     // External links
```

#### UI Elements
```tsx
<X />                // Close
<ChevronDown />      // Dropdown
<Check />            // Success
<AlertCircle />      // Warning
<Info />             // Information
```

### Icon Sizing
```tsx
Small:   w-4 h-4      (16px)
Medium:  w-5 h-5      (20px)  ← Default
Large:   w-6 h-6      (24px)
XLarge:  w-8 h-8      (32px)
```

### Icon Styling
```tsx
// Always use strokeWidth for consistency
<Icon className="w-5 h-5" strokeWidth={2} />

// In colored backgrounds
<Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
```

---

## Button Styles

### Primary Button
```tsx
className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 
           text-white rounded-lg font-semibold 
           hover:from-blue-700 hover:to-indigo-700 
           transition-all shadow-sm hover:shadow-md"
```

### Secondary Button
```tsx
className="px-4 py-2.5 bg-white border border-gray-300 
           text-gray-700 rounded-lg font-medium 
           hover:bg-gray-50 hover:border-gray-400 
           transition-all"
```

### Icon Button
```tsx
className="p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 
           text-white rounded-lg 
           hover:shadow-md transition-all"
```

---

## Input Styles

### Text Input
```tsx
className="px-4 py-2.5 border border-gray-300 rounded-lg 
           bg-gray-50 text-gray-900
           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
           focus:outline-none transition-colors"
```

### Select Dropdown
```tsx
className="px-4 py-2.5 border border-gray-300 rounded-lg 
           bg-gray-50 text-gray-900
           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
           focus:outline-none appearance-none"
```

### Checkbox
```tsx
className="w-4 h-4 text-blue-600 rounded 
           border-gray-300 focus:ring-blue-500"
```

---

## Card Styles

### Default Card
```tsx
className="bg-white rounded-lg border border-gray-200 
           shadow-sm p-4"
```

### Hover Card
```tsx
className="bg-white rounded-lg border border-gray-200 
           shadow-sm p-4 
           hover:border-blue-300 hover:shadow-md 
           transition-all cursor-pointer"
```

### Section Card
```tsx
className="bg-gray-50 rounded-lg p-3 border border-gray-200"
```

---

## Gradient Styles

### Primary Gradient (Blue)
```tsx
className="bg-gradient-to-r from-blue-600 to-indigo-600"
```

### Avatar/Icon Background
```tsx
className="bg-gradient-to-br from-blue-500 to-indigo-600"
```

### User Message
```tsx
className="bg-gradient-to-br from-blue-600 to-indigo-600"
```

### Header
```tsx
className="bg-gradient-to-r from-blue-700 to-indigo-700"
```

---

## Avatar Styles

### Bot Avatar (Professional)
```tsx
<div className="w-9 h-9 rounded-lg bg-gradient-to-br 
                from-blue-500 to-indigo-600 
                flex items-center justify-center shadow-sm">
  <Bot className="w-5 h-5 text-white" strokeWidth={2.5} />
</div>
```

### User Avatar
```tsx
<div className="w-9 h-9 rounded-lg bg-gradient-to-br 
                from-gray-600 to-gray-700 
                flex items-center justify-center shadow-sm">
  <User className="w-5 h-5 text-white" strokeWidth={2.5} />
</div>
```

---

## Message Bubble Styles

### Bot Message
```tsx
className="bg-gray-50 text-gray-700 border border-gray-200 
           rounded-lg px-4 py-3 shadow-sm"
```

### User Message
```tsx
className="bg-gradient-to-br from-blue-600 to-indigo-600 
           text-white rounded-lg px-4 py-3 shadow-sm"
```

---

## Animation Guidelines

### Transitions
```tsx
// Standard transition
transition-all duration-200

// Smooth color change
transition-colors duration-200

// Transform transition
transition-transform duration-200
```

### Hover Effects
```tsx
// Subtle scale
hover:scale-105

// Shadow increase
hover:shadow-md

// Border color
hover:border-blue-500
```

### Loading States
```tsx
// Pulse (online indicator)
animate-pulse

// Bounce (typing dots)
animate-bounce

// Spin (loading spinner)
animate-spin
```

---

## Responsive Breakpoints

### Tailwind Breakpoints
```
sm:  640px   (tablet)
md:  768px   (small desktop)
lg:  1024px  (desktop)
xl:  1280px  (large desktop)
2xl: 1536px  (extra large)
```

### Common Patterns
```tsx
// Hide on mobile, show on desktop
className="hidden sm:block"

// Full width on mobile, fixed on desktop
className="w-full sm:w-[420px]"

// Smaller padding on mobile
className="p-3 sm:p-4"

// Grid columns responsive
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
```

---

## Accessibility

### Focus States
```tsx
// Always include focus styles
focus:outline-none 
focus:ring-2 
focus:ring-blue-500 
focus:ring-offset-2
```

### Color Contrast
```
✅ Dark text on white:    gray-700 on white (8.59:1)
✅ White text on blue:    white on blue-600 (4.54:1)
✅ Links:                 blue-600 on white (4.54:1)
❌ Avoid:                 gray-400 on white (2.85:1)
```

### ARIA Labels
```tsx
// Interactive elements
aria-label="Close chat"
aria-label="Send message"
aria-label="Open chat"

// Status indicators
aria-live="polite"
role="status"
```

---

## Do's and Don'ts

### ✅ DO
- Use lucide-react icons
- Keep borders thin (1px)
- Use subtle shadows
- Apply blue theme consistently
- Use gray-50 for backgrounds
- Use rounded-lg for most elements
- Keep font weights medium (500-600)
- Use 8px spacing grid
- Add focus states to all interactive elements

### ❌ DON'T
- Use emojis in UI (except sparingly)
- Use bright orange colors
- Use thick borders (2px+)
- Use heavy shadows (shadow-2xl)
- Use rounded-full for everything
- Use bold (700+) everywhere
- Mix border radii inconsistently
- Forget hover states
- Skip focus indicators

---

## Component Examples

### Professional Button
```tsx
<button className="inline-flex items-center gap-2 
                   px-4 py-2.5 
                   bg-gradient-to-r from-blue-600 to-indigo-600 
                   text-white text-sm font-semibold 
                   rounded-lg shadow-sm
                   hover:from-blue-700 hover:to-indigo-700 
                   hover:shadow-md
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   transition-all duration-200">
  <Ticket className="w-4 h-4" strokeWidth={2} />
  Book Ticket
</button>
```

### Professional Card
```tsx
<div className="bg-white rounded-lg border border-gray-200 
                shadow-sm p-4
                hover:border-blue-300 hover:shadow-md
                transition-all cursor-pointer">
  <div className="flex items-center gap-3 mb-3">
    <div className="w-10 h-10 bg-blue-100 rounded-lg 
                    flex items-center justify-center">
      <Search className="w-5 h-5 text-blue-600" strokeWidth={2} />
    </div>
    <div>
      <h3 className="font-semibold text-gray-900">Check PNR Status</h3>
      <p className="text-xs text-gray-500">Track your booking</p>
    </div>
  </div>
</div>
```

### Professional Input
```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    PNR Number
  </label>
  <input 
    type="text"
    placeholder="Enter 10-digit PNR"
    className="w-full px-4 py-2.5 
               border border-gray-300 rounded-lg bg-gray-50
               text-gray-900 placeholder-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
               focus:outline-none
               transition-colors"
  />
</div>
```

---

## Testing Checklist

### Visual Consistency
- [ ] All icons are from lucide-react
- [ ] Blue theme used throughout
- [ ] Border radius consistent (mostly rounded-lg)
- [ ] Shadows subtle (mostly shadow-sm)
- [ ] Font weights appropriate (mostly 500-600)
- [ ] No bright orange anywhere
- [ ] Gray-50 backgrounds where appropriate

### Interaction States
- [ ] All buttons have hover states
- [ ] All inputs have focus rings
- [ ] All cards have hover effects
- [ ] All icons scale properly
- [ ] Animations smooth (200ms)

### Responsive Design
- [ ] Mobile layout works
- [ ] Desktop layout works
- [ ] Touch targets adequate (44px min)
- [ ] Text readable on all sizes

---

**This professional UI is now production-ready! 🚀**
