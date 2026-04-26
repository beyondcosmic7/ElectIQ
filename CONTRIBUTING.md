# CONTRIBUTING.md — ElectIQ Dev Setup

> This doc exists so future-you (or a collaborator) can get running in under 5 minutes.

---

## Prerequisites

```
Node.js >= 18.0.0
npm >= 9.0.0
Git >= 2.30
A Google Gemini API key (free tier works)
```

Get your Gemini API key at: https://aistudio.google.com/app/apikey

---

## Local Setup

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/electiq.git
cd electiq

# Install
npm install

# Environment setup
cp .env.example .env.local
# Open .env.local and add your key:
# VITE_GEMINI_API_KEY=AIzaSy...

# Start dev server
npm run dev
# → http://localhost:5173
```

---

## Available Scripts

```bash
npm run dev        # Dev server with HMR
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint check
npm run lint:fix   # ESLint auto-fix
```

---

## Code Standards

### Naming Conventions
```
Components:    PascalCase    → ChatPanel.jsx, TimelineStep.jsx
Hooks:         camelCase     → useGemini.js, useTimeline.js
Utilities:     camelCase     → geminiPrompt.js, sanitizeInput.js
Constants:     SCREAMING_SNAKE → ELECTION_STEPS, GEMINI_CONFIG
CSS classes:   Tailwind only (no custom classes unless unavoidable)
```

### Component Structure
Every component follows this order:
```jsx
// 1. Imports (React first, then libs, then local)
import { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import MessageBubble from './MessageBubble'

// 2. Constants (if component-specific)
const MAX_MESSAGE_LENGTH = 500

// 3. Component (named export preferred)
export default function ChatPanel() {
  // 3a. Context/props
  // 3b. State
  // 3c. Derived values
  // 3d. Effects
  // 3e. Handlers
  // 3f. Render
  return (...)
}
```

### No Magic Numbers
```javascript
// Bad
setTimeout(fn, 3000)

// Good
const STREAM_DEBOUNCE_MS = 3000
setTimeout(fn, STREAM_DEBOUNCE_MS)
```

---

## Commit Message Format

```
type(scope): short description

Types:
  feat     → new feature
  fix      → bug fix
  style    → UI/CSS changes only
  refactor → code restructure, no behavior change
  docs     → README/MD changes
  chore    → config, deps, tooling

Examples:
  feat(chat): add streaming message animation
  fix(gemini): handle API rate limit gracefully
  style(timeline): add active step highlight animation
  docs(readme): update setup instructions
```

---

## Folder Responsibility

```
src/components/     → UI only. No API calls. No business logic.
src/hooks/          → Side effects and API calls live here.
src/context/        → Global state shape and reducers.
src/data/           → Static content. No imports from components.
src/utils/          → Pure functions. No React imports.
```

Breaking these rules will cause maintainability hell. Don't do it.

---

## Adding a New Election Step

1. Open `src/data/electionSteps.js`
2. Add a new object following the existing schema (see ARCHITECTURE.md)
3. Add the corresponding icon name from [Google Material Symbols](https://fonts.google.com/icons)
4. Add any new checklist items to `src/context/AppContext.jsx` initial state
5. Test that the timeline renders correctly

---

## Environment Variables Reference

```bash
# Required
VITE_GEMINI_API_KEY=          # Your Google Gemini API key

# Optional (for future Civic API integration)
VITE_CIVIC_API_KEY=           # Google Civic Information API key
VITE_APP_COUNTRY=IN           # 'IN' | 'US' — affects election process data shown
```

---

## Branch Strategy

Single branch only (per hackathon rules): `main`

Commit frequently. Each commit should represent a working state.
