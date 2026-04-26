# BUILD_PLAN.md — ElectIQ Execution Roadmap

## Project: ElectIQ — AI Election Process Assistant
## Challenge: Hack2Skill PromptWars | Google Antigravity IDE
## Repo size target: < 1MB | Branch: main only

---

## Strategic Overview

**What wins this challenge:**
1. Working product (not a prototype)
2. Real Google Services integration (not fake)
3. Polished UI that doesn't look AI-generated (ironic but true)
4. Clean, structured code (not a 500-line App.jsx)
5. Accessible + responsive

**What loses this challenge:**
- Generic chatbot UI cloned from a tutorial
- Broken features shipped as "WIP"
- No meaningful Google Services use
- Security holes (API key in code)

---

## Phase Breakdown

---

### ✅ PHASE 0 — Pre-Build (Done Before You Start)
**Goal:** Repo + environment + skeleton working

```
Tasks:
├── Create public GitHub repo: "electiq"
├── Initialize Vite + React project
├── Install core deps (Tailwind, React Router, Gemini SDK)
├── Configure Tailwind
├── Set up .env.example and .gitignore
├── Commit all 5 MD files to repo root
├── Verify npm run dev works
└── First commit: "chore: initial project setup"

Time estimate: 20 minutes
Deliverable: Working blank app at localhost:5173
```

**Install command:**
```bash
npm create vite@latest electiq -- --template react
cd electiq
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install @google/generative-ai
npm install react-router-dom
```

---

### 🎨 PHASE 1 — Design System + Layout Shell
**Goal:** The skeleton of the app — layout, colors, fonts. No functionality yet.

```
Tasks:
├── Configure tailwind.config.js with custom color tokens
├── Set up CSS variables for theming (light/dark)
├── Create Header component
├── Create MainLayout (2-panel grid)
├── Create TimelinePanel placeholder
├── Create ChatPanel placeholder
├── Add Google Material Symbols via CDN
├── Add Google Fonts (Inter + Playfair Display) via CDN
├── Implement theme toggle (light/dark)
└── Commit: "feat(layout): design system and layout shell"

Time estimate: 45 minutes
Deliverable: Responsive 2-panel layout with theming working
```

**Color System:**
```javascript
// tailwind.config.js custom colors
colors: {
  primary: {
    50: '#f0f4ff',
    500: '#3B5BDB',   // Main blue — civic authority
    600: '#3451C7',
    900: '#1E3A8A'
  },
  accent: {
    500: '#F59E0B',   // Amber — for important dates/CTAs
  },
  surface: {
    light: '#FFFFFF',
    card: '#F8FAFC',
    dark: '#0F172A',
    'dark-card': '#1E293B'
  }
}
```

---

### 🗳️ PHASE 2 — Election Data + Timeline Component
**Goal:** The static knowledge layer — the timeline that anchors the whole app.

```
Tasks:
├── Create src/data/electionSteps.js (7 steps, full data)
│   ├── Step 1: Voter Registration
│   ├── Step 2: Voter ID Verification
│   ├── Step 3: Candidate Filing & Nominations
│   ├── Step 4: Election Campaign Period
│   ├── Step 5: Voting Day
│   ├── Step 6: Vote Counting & Results
│   └── Step 7: Post-Election & Government Formation
├── Create AppContext.jsx with useReducer
├── Build ElectionTimeline component
├── Build TimelineStep component (with active/completed/upcoming states)
├── Build StepDetailCard component (shown when step clicked)
├── Build ChecklistBar component
└── Commit: "feat(timeline): election process timeline with step details"

Time estimate: 60 minutes
Deliverable: Fully navigable timeline — click any step, see full details
```

---

### 🤖 PHASE 3 — Gemini AI Integration
**Goal:** The brain. Connect AI to the election knowledge base.

```
Tasks:
├── Create src/utils/geminiPrompt.js
│   ├── buildSystemPrompt() — injects election step data
│   ├── buildUserMessage() — formats + sanitizes input
│   └── parseGeminiResponse() — extracts JSON from response
├── Create src/hooks/useGemini.js
│   ├── sendMessage() — handles API call with streaming
│   ├── Error handling (network, rate limit, safety block)
│   └── Loading state management
├── Build ChatInputBar component
├── Build MessageBubble component (user + AI variants)
│   └── AI bubble supports streaming (char-by-char reveal)
├── Build MessageList component
├── Wire up: user message → Gemini → parsed response → UI update
├── Wire up: AI response → activeStep update → timeline highlight
└── Commit: "feat(ai): Gemini integration with streaming + timeline sync"

Time estimate: 90 minutes
Deliverable: Full chat works — ask questions, get answers, timeline highlights
```

**System Prompt Structure (key excerpt):**
```
You are ElectIQ, a non-partisan election education assistant for Indian voters.
Your knowledge base is: [INJECTED ELECTION_STEPS DATA]

RULES:
1. Only answer questions about election processes, voter rights, and civic procedures
2. Never express opinions on political parties, candidates, or policies
3. Always respond in this JSON format: { answer, activeStep, suggestedQuestions, confidence, disclaimer }
4. If you're uncertain, set confidence to "low" and add a disclaimer
5. Suggest 3 relevant follow-up questions after every answer
6. Be conversational but accurate. Plain language, not legal jargon.
```

---

### ✨ PHASE 4 — Polish + UX Details
**Goal:** Turn a working app into a great app.

```
Tasks:
├── SuggestedQuestions chips (rendered from AI response)
├── Typing animation on AI messages (streaming reveal)
├── Timeline scroll-to-active behavior when step changes
├── Empty state for chat (welcome message + starter questions)
├── Loading skeleton for AI response
├── Error states (network, API, rate limit — each has specific UI)
├── Keyboard shortcuts (Enter to send, Escape to clear)
├── Mobile responsive check + fixes
├── Smooth transitions on panel changes
├── Footer with ECI link + disclaimer
└── Commit: "feat(ux): polish pass — animations, empty states, mobile"

Time estimate: 60 minutes
Deliverable: App feels polished and production-grade
```

---

### ♿ PHASE 5 — Accessibility + Performance
**Goal:** Pass evaluation criteria for accessibility and efficiency.

```
Tasks:
├── ARIA roles: role="log" on MessageList, aria-live="polite"
├── All buttons have aria-label
├── Timeline is keyboard navigable (Tab + Enter)
├── Color contrast audit (all text ≥ 4.5:1)
├── Focus visible on all interactive elements
├── prefers-reduced-motion check on animations
├── Check Lighthouse score (target: 90+ performance, 90+ accessibility)
├── Lazy load StepDetailCard
├── Verify bundle < 800KB
└── Commit: "feat(a11y): accessibility and performance pass"

Time estimate: 30 minutes
```

---

### 🏁 PHASE 6 — Final Review + Submission
**Goal:** Ship it clean.

```
Tasks:
├── Remove all console.log statements
├── Verify .env.example has placeholder (not real key)
├── Verify .gitignore is correct
├── Run npm audit — fix any high/critical issues
├── Test on mobile (Chrome DevTools)
├── Test dark mode
├── Final commit: "chore: production cleanup and submission prep"
├── npm run build — verify build succeeds
├── Push to GitHub
└── Submit repo link

Time estimate: 20 minutes
```

---

## Phase → Prompt Mapping

| Phase | Antigravity Prompt File |
|-------|------------------------|
| Phase 0 | `prompts/phase-0-setup.md` |
| Phase 1 | `prompts/phase-1-design-shell.md` |
| Phase 2 | `prompts/phase-2-timeline-data.md` |
| Phase 3 | `prompts/phase-3-gemini-ai.md` |
| Phase 4 | `prompts/phase-4-polish.md` |
| Phase 5 | `prompts/phase-5-a11y-perf.md` |
| Phase 6 | `prompts/phase-6-final.md` |

---

## Risk Log

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Gemini API key free tier quota exhausted | Medium | High | Use low temperature, cache common responses in sessionStorage |
| AI gives wrong election info | High | High | System prompt grounding + static data source of truth |
| Bundle > 1MB | Low | High | Purge Tailwind, no heavy libraries, monitor with `npm run build` |
| Mobile layout broken | Medium | Medium | Test each phase on mobile before proceeding |
| Gemini API unavailable at demo time | Low | High | Cache last 10 responses in sessionStorage as fallback |

---

## Definition of Done

A phase is **done** when:
1. Feature works as described
2. No console errors
3. Mobile responsive
4. Code committed with proper message
5. Next phase can begin without reworking this one
