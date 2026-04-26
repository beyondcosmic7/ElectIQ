# ARCHITECTURE.md — ElectIQ System Design

## Why This Architecture

The biggest risk in an election assistant is **wrong information presented confidently**. Every architectural decision below is made to minimize that risk while maximizing user clarity.

---

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    BROWSER (Client)                      │
│                                                         │
│   ┌─────────────┐    ┌──────────────┐    ┌──────────┐  │
│   │  Timeline   │    │  Chat Panel  │    │Checklist │  │
│   │  Component  │◄───│  Component   │───►│ Panel    │  │
│   └──────┬──────┘    └──────┬───────┘    └──────────┘  │
│          │                  │                           │
│          └──────────┬───────┘                          │
│                     │                                   │
│              ┌──────▼──────┐                           │
│              │ App Context  │  (Global State)           │
│              │ activeStep   │                           │
│              │ chatHistory  │                           │
│              │ checklist    │                           │
│              └──────┬───────┘                          │
│                     │                                   │
│              ┌──────▼──────┐                           │
│              │ useGemini   │  (Custom Hook)             │
│              │   Hook      │                           │
│              └──────┬───────┘                          │
└─────────────────────┼───────────────────────────────────┘
                      │ HTTPS
                      │
         ┌────────────▼────────────┐
         │   Google Gemini API     │
         │   (gemini-2.0-flash)    │
         │                         │
         │  System Prompt:         │
         │  - Scoped to elections  │
         │  - Structured output    │
         │  - Source citations     │
         └─────────────────────────┘
```

---

## Component Architecture

### Layout Split (2-panel + sidebar)
```
┌──────────────────────────────────────────────────────────┐
│  Header: ElectIQ logo + Theme toggle + Active election   │
├─────────────────────────────┬────────────────────────────┤
│                             │                            │
│   LEFT: Timeline Panel      │   RIGHT: Chat Panel        │
│   (40% width)               │   (60% width)              │
│                             │                            │
│   • Election Timeline       │   • Message History        │
│   • Step Cards              │   • Input Bar              │
│   • Active Step highlight   │   • Suggested Questions    │
│                             │   • Streaming indicator    │
├─────────────────────────────┴────────────────────────────┤
│  Bottom: Checklist bar (collapsed/expanded)              │
└──────────────────────────────────────────────────────────┘
```

### Component Tree
```
App
├── AppContext.Provider
│   ├── Header
│   │   └── ThemeToggle
│   ├── MainLayout
│   │   ├── TimelinePanel
│   │   │   ├── ElectionTimeline
│   │   │   │   └── TimelineStep (×N)
│   │   │   └── StepDetailCard
│   │   └── ChatPanel
│   │       ├── MessageList
│   │       │   ├── MessageBubble (user)
│   │       │   └── MessageBubble (AI) ← streams content
│   │       ├── SuggestedQuestions
│   │       └── ChatInputBar
│   └── ChecklistBar
│       └── ChecklistItem (×N)
└── ErrorBoundary
```

---

## Data Flow

### Chat Message Flow
```
User types message
        │
        ▼
ChatInputBar → dispatches to AppContext
        │
        ▼
useGemini hook called
        │
        ├── 1. Build system prompt (from geminiPrompt.js)
        ├── 2. Append user message to history
        ├── 3. Call Gemini API (streaming)
        │         │
        │         ▼
        │   Token stream arrives
        │         │
        │         ▼
        │   Update MessageBubble incrementally (useState)
        │
        ├── 4. Parse response for:
        │       - activeStep signal → update timeline
        │       - suggestedQuestions array → render chips
        │       - checklistItems → flag in checklist
        │
        └── 5. Append complete response to chatHistory
```

### Gemini Response Schema
The system prompt instructs Gemini to always return structured JSON-wrapped-in-text:

```json
{
  "answer": "Plain text answer for display",
  "activeStep": "registration | primary | campaign | voting | results | null",
  "suggestedQuestions": ["...", "...", "..."],
  "checklistItems": ["voter-registration", "id-check"],
  "confidence": "high | medium | low",
  "disclaimer": "Optional: shown when answer involves dates/laws"
}
```

This is parsed client-side. If parsing fails, raw text is displayed (graceful degradation).

---

## State Management

Using **React Context + useReducer** (no external library). Why not Zustand? Overkill for this scope. Why not useState everywhere? Too much prop drilling across the 2-panel layout.

```javascript
// State shape
{
  activeStep: 'registration',      // drives timeline highlight
  chatHistory: [],                 // full message history
  isStreaming: false,              // loading state
  checklist: {                     // user's personal checklist
    'voter-registration': false,
    'check-id-validity': false,
    'find-polling-station': false,
    // ...
  },
  theme: 'light',                  // 'light' | 'dark'
  error: null
}
```

---

## Gemini Integration Design

### System Prompt Strategy
The system prompt is the most important piece of code in this project. It:

1. **Scopes the AI** to election education only — off-topic questions get redirected politely
2. **Defines output format** — JSON structure ensures parseable, consistent responses
3. **Injects static knowledge** — election process steps are embedded in the prompt, so the AI isn't hallucinating from training data alone
4. **Sets tone** — "neutral, helpful, non-partisan, educational"
5. **Handles uncertainty** — AI must flag low-confidence answers with a disclaimer

```
SYSTEM PROMPT LAYERS:
Layer 1: Identity ("You are ElectIQ, an election education assistant...")
Layer 2: Knowledge base (injected electionSteps data)
Layer 3: Output format (JSON schema)
Layer 4: Guardrails (no political opinions, no party advocacy, cite uncertainty)
Layer 5: Personalization (detected user context from conversation)
```

### API Call Configuration
```javascript
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.3,       // LOW — we want factual, not creative
    topP: 0.8,
    maxOutputTokens: 1024,
  },
  safetySettings: [/* BLOCK_MEDIUM_AND_ABOVE for all categories */]
});
```

---

## Election Data Model

Static data (`src/data/electionSteps.js`) contains the ground truth. AI references this, not its training data.

```javascript
const ELECTION_STEPS = [
  {
    id: 'voter-registration',
    title: 'Voter Registration',
    phase: 1,
    icon: 'how_to_reg',
    shortDescription: '...',
    fullDescription: '...',
    keyDates: { deadline: 'varies by state', method: 'online/offline' },
    checklist: ['Check eligibility', 'Gather documents', 'Register at BLO/online', 'Verify enrollment'],
    faqs: [ { q: '...', a: '...' } ],
    externalLinks: [{ label: 'ECI Voter Registration', url: 'https://voters.eci.gov.in' }]
  },
  // ... 6 more steps
]
```

---

## Performance Decisions

| Decision | Reason |
|---------|--------|
| Vite over CRA | 10x faster HMR, smaller bundle |
| No SSR | Static export needed for GitHub Pages; no server |
| Streaming API response | Users see output immediately, not after 3-4s wait |
| Lazy load StepDetail | Only loaded when step is clicked |
| CSS variables for theming | Instant theme switch, no re-render |
| No external state lib | Keeps bundle under 1MB limit |

### Bundle Budget
Target: **< 800KB** gzipped total (well under 1MB repo limit)
- React + React DOM: ~130KB
- React Router: ~25KB
- Tailwind (purged): ~15KB
- Gemini SDK: ~40KB
- App code: ~100KB
- **Total estimated: ~310KB** ✅

---

## Error Handling

```
API Error Types:
├── Network failure → Show retry button + offline message
├── API key missing → Show setup instructions modal
├── Rate limit hit → Show "please wait 60s" message
├── Parse failure → Show raw AI text (graceful degradation)
└── Safety block → Show "I can't answer that" with redirect
```

---

## Accessibility Architecture

- All interactive elements have `aria-label` + keyboard navigation
- Timeline steps are `role="list"` with `role="listitem"` children
- Chat messages use `role="log"` with `aria-live="polite"`
- Color contrast ≥ 4.5:1 for all text (WCAG AA)
- Focus trap in modals
- `prefers-reduced-motion` checked before all animations

---

## File Size Management (< 1MB Repo)

```
Excluded from repo (via .gitignore):
  node_modules/        ← obvious
  dist/                ← build output
  .env.local           ← secrets
  *.log

Repo contains:
  Source code only + README files
  Estimated: ~200KB total
```
