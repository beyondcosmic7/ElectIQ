# ElectIQ — AI Election Guide for Indian Voters
**Empowering 96+ Crore Citizens with Intelligent Civic Guidance**

> Built for Hack2Skill PromptWars | Vertical: Civic Tech / Social Good

---

## 🗳️ Chosen Vertical
**Civic Tech / Social Good — Election Process Assistant**

India runs the world's largest democratic exercise. Yet most voters 
don't fully understand the 7-phase process between announcement and 
government formation. Official portals exist but are dense, jargon-heavy, 
and English-only. ElectIQ fixes this with an AI assistant that speaks 
your language — literally.

---

## 🧠 Approach & Logic

### The Core Problem
Information gap, not interest gap. 96+ crore eligible voters. 
7 distinct election phases. Zero accessible plain-language guides.

### Our Solution: Grounded AI + Interactive Timeline

```
User Query (any language)
        │
        ▼
Input Sanitization Layer (XSS + injection prevention)
        │
        ▼
Gemini 3.1 Flash Lite
  ├── System Prompt: 7-step ECI knowledge base injected as ground truth
  ├── Temperature: 0.3 (factual, not creative)
  └── Safety: BLOCK_MEDIUM_AND_ABOVE all categories
        │
        ▼
Streaming Response Parser
  ├── Strips JSON artifacts from live stream
  ├── Extracts: answer, activeStep, suggestedQuestions, confidence
  └── Falls back to raw text if parse fails
        │
        ▼
UI Update (synchronized across 3 panels)
  ├── Chat: Streaming message display
  ├── Timeline: Highlights relevant election phase
  └── Checklist: Flags completable civic tasks
        │
        ▼
Firebase Analytics: Logs event with language + query metadata
```

### Decision Logic
- **Language detection**: AI responds in user's input language 
  (Hindi, Tamil, Marathi, Bengali, Hinglish — automatic)
- **Grounding strategy**: Full `electionSteps.js` injected into 
  every system prompt — AI cannot contradict static ECI data
- **Confidence scoring**: AI self-reports high/medium/low confidence; 
  low-confidence answers show verification disclaimer
- **Non-partisan guardrail**: System prompt prohibits candidate 
  endorsement, winner prediction, or party opinion

---

## ⚙️ How the Solution Works

### User Flow
1. User lands on ElectIQ — sees tricolor pastel UI with 4 starter questions
2. Clicks a question OR types in any language → AI responds with streaming text
3. Response highlights the relevant phase in the 7-step Timeline panel
4. Suggested follow-up questions appear as chips
5. User checks off civic tasks in the Voter Checklist (8 items, registration → results)
6. Can switch between Chat, Timeline, Gallery, and Checklist via Bubble Menu

### Architecture
```
src/
├── components/          # UI only — zero API calls
│   ├── chat/            # ChatPanel, MessageBubble, InputBar, SuggestedQuestions
│   ├── timeline/        # ElectionTimeline, TimelineStep, StepDetailCard
│   ├── checklist/       # ChecklistBar, ChecklistItem
│   └── layout/          # Header, Footer, BubbleMenu, ApiKeySetup
├── context/
│   └── AppContext.jsx   # Global state — activeStep, chatHistory, checklist
├── hooks/
│   └── useGemini.js     # Gemini API integration with streaming
├── data/
│   └── electionSteps.js # Ground truth — 7 ECI election phases
├── utils/
│   └── geminiPrompt.js  # System prompt builder + response parser
├── services/
│   └── firebase.js      # Firebase Analytics — event tracking
└── tests/               # 32 unit tests across 3 test files
    ├── geminiPrompt.test.js   # 12 tests
    ├── electionSteps.test.js  # 13 tests
    └── AppContext.test.jsx    # 7 tests
```

---

## ☁️ Google Services Integration

| Service | Package | Usage |
|---------|---------|-------|
| **Gemini 3.1 Flash Lite** | `@google/generative-ai ^0.24.1` | Core AI — NLP, streaming responses, multilingual |
| **Firebase Analytics** | `firebase` | Tracks: question_asked, step_viewed, checklist_toggled |
| **Google Fonts** | CDN | Inter + Outfit typefaces |
| **Google Material Symbols** | CDN | Icon system throughout UI |

### Firebase Event Schema
```javascript
// Fired on every question
trackEvent('question_asked', { 
  question_length: number, 
  language: string 
})

// Fired when timeline step is viewed  
trackEvent('election_step_viewed', { 
  step_id: string 
})

// Fired on checklist interaction
trackEvent('checklist_item_toggled', { 
  item: string, 
  checked: boolean 
})
```

---

## 🔐 Security Implementation

- **API keys**: Isolated in `.env.local` via Vite — never committed
- **Input sanitization**: Length cap (500 chars), HTML bracket strip, 
  prompt injection filtering before every API call
- **Content safety**: Gemini `BLOCK_MEDIUM_AND_ABOVE` on all 4 harm categories
- **Non-partisan**: System prompt prohibits political opinions, 
  candidate endorsement, winner prediction
- **XSS prevention**: No `dangerouslySetInnerHTML` anywhere in codebase
- **Graceful degradation**: Every API failure has a specific user-facing 
  error — no raw error objects ever reach the UI

---

## ♿ Accessibility

- `role="log"` + `aria-live="polite"` on chat message list
- `role="list"` / `role="listitem"` on timeline and checklist
- All buttons have `aria-label`
- Skip-to-main link on focus
- Keyboard navigation: Tab through all interactive elements
- `prefers-reduced-motion` respected in all animations
- Color contrast ≥ 4.5:1 throughout (WCAG AA)
- Screen reader tested: hidden labels on icon-only buttons

---

## 🧪 Testing

**32 tests across 3 files — all passing**

```bash
npm run test:run

✓ src/tests/electionSteps.test.js  (13 tests)
✓ src/tests/geminiPrompt.test.js   (12 tests)  
✓ src/tests/AppContext.test.jsx     (7 tests)

Test Files: 3 passed | Tests: 32 passed
```

Coverage areas:
- Input sanitization (edge cases, injection attempts, length limits)
- Response parsing (valid JSON, malformed, markdown-fenced, missing fields)
- Election data integrity (7 steps, sequential phases, required fields)
- State management (all reducer actions, toggle behavior, error handling)

---

## ⚡ Efficiency

- **Gemini Flash Lite**: Lowest latency model, highest token throughput
- **Temperature 0.3**: Deterministic factual answers, fewer retries needed
- **Session caching**: Identical questions served from `sessionStorage` — 
  zero API calls for repeated queries
- **WebGL/GSAP**: Hardware-accelerated background effects (Grainient + 
  MagicRings) run on GPU, not main thread
- **CSS-first animations**: `breathing-dots`, transitions via keyframes 
  — no JS timing loops
- **Streaming parser**: Processes response tokens as they arrive — 
  user sees output in <500ms vs waiting for full response

---

## 🚀 Running the Project

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/electiq.git
cd electiq

# Install
npm install

# Environment setup
cp .env.example .env.local
# Add: VITE_GEMINI_API_KEY=your_key (get free at aistudio.google.com)
# Add: VITE_FIREBASE_* keys (get from Firebase console)

# Development
npm run dev        # localhost:5173

# Testing  
npm run test:run   # run all 32 tests

# Production build
npm run build
```

---

## 📌 Assumptions Made

1. Target audience: Indian voters of all ages and technical literacy levels
2. Gemini API key required — free tier sufficient for demo usage
3. App is educational only — not a substitute for official ECI guidance
4. All election process data reflects general Lok Sabha election procedures
5. Multi-language support is AI-driven (no static translations needed)
6. Firebase Analytics gracefully disabled if keys not configured

---

## Tech Stack

React 19 · Vite 8 · Tailwind CSS 3 · GSAP 3 · Three.js · 
Google Gemini API · Firebase Analytics · Vitest · 
Google Fonts · Google Material Symbols

---

*Non-partisan. Non-commercial. Built for democracy.*  
*Hack2Skill PromptWars 2026 — Civic Tech Vertical*
