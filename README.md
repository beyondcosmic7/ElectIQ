# ElectIQ
**Empowering Indian Citizens with Intelligent Election Guidance**

![ElectIQ Showcase](/images/ai_voters_line.png)

## 📌 Vertical & Problem Statement
**Chosen Vertical:** Civic Tech / Social Good

Navigating the Indian election process can be overwhelming due to bureaucratic jargon, massive amounts of data, and constantly changing regulations. **ElectIQ** solves this by acting as a beautiful, calm, and intelligent portal that breaks down the Lok Sabha election into an accessible, 7-step timeline. It combines an interactive AI assistant, a civic checklist, and multi-lingual voice/text guidance to empower voters across all demographics.

---

## 🛠 Approach & Logic
Our approach focused on **radical simplification** and **accessible aesthetics**:
1. **Plain Language Data Structure**: We re-wrote official ECI processes into conversational, jargon-free explanations, establishing a single ground-truth data file (`electionSteps.js`).
2. **Intelligent Persona**: We designed our AI prompt to act as a friendly, non-partisan Indian civic guide, actively enforcing plain-language, neutral tone, and multi-lingual fallback.
3. **Calm Aesthetics**: Replacing rapid animations with sequential, breathing elements and adopting a pastel Indian Tricolor palette ensures the application doesn't overwhelm the user.
4. **Gamification**: A persistent "Civic Checklist" helps voters systematically track their readiness from registration to counting day.

---

## 🚀 How the Solution Works
ElectIQ is a modern Single Page Application (SPA) built with React and Vite. 
- **Context API (`AppContext.js`)**: Manages the global state, ensuring the Chat Panel, Timeline, and Checklist remain perfectly synchronized.
- **AI Core (`useGemini.js`)**: Powers the Chat Assistant. We inject the 7-step timeline directly into the AI's system prompt during initialization. This means the AI perfectly understands the app's internal logic and can direct users dynamically.
- **Streaming Parser**: A custom interceptor parses the live AI text stream, stripping out JSON structural artifacts before the text reaches the UI, ensuring smooth readability.
- **Dynamic Views**: The user can toggle effortlessly between the AI Chat, the Timeline, the Photo Gallery, and the Checklist via the `BubbleMenu.jsx`.

---

## 🧠 Assumptions Made
- **Target Audience:** Indian citizens of all ages and technical literacies (hence the extreme focus on plain language and ARIA accessibility).
- **Core Needs:** Most users want to know 1) How to register, 2) Where to vote, 3) Who is running, and 4) When to vote.
- **Infrastructure:** Users are on mobile devices or varied network speeds, requiring lightweight DOM structures and fast model inference.

---

## 🔬 Core Engineering Pillars

### 1. Code Quality (Structure, Readability, Maintainability)
- **Modular Architecture**: Complete separation of concerns (`/components`, `/hooks`, `/context`, `/data`).
- **State Management**: Zero prop-drilling thanks to an elegant `AppProvider` pattern.
- **Maintainability**: The app's entire knowledge base is isolated in `electionSteps.js`, meaning civic data can be updated without touching UI logic.

### 2. Security (Safe and Responsible Implementation)
- **Non-Partisan Guardrails**: The system prompt strictly prohibits the AI from predicting winners, endorsing candidates, or generating biased political opinions.
- **Content Parsing**: User inputs and Markdown rendering are properly sanitized to prevent XSS injection. 
- **Environment Isolation**: API keys are isolated via Vite `.env` variables and NEVER committed to the repository.

### 3. Efficiency (Optimal Use of Resources)
- **Hardware Acceleration**: The beautiful `Grainient` background and `MagicRings` effects utilize WebGL and GSAP for GPU-accelerated rendering without choking the main UI thread.
- **CSS-First Animations**: Relying on raw CSS keyframes (e.g., the `breathing-dots`) rather than heavy JS timing loops to reduce layout thrashing.
- **Lite Models**: By defaulting to `gemini-3.1-flash-lite`, we minimize cost and maximize token throughput for real-time responsiveness.

### 4. Testing (Validation of Functionality)
- **Strict Linting**: The entire codebase passes rigorous `eslint` checks with custom hooks rule enforcements (`0 errors, 0 warnings`).
- **Responsive Layouts**: Validated fluidly across desktop, tablet, and mobile viewport breakpoints.

### 5. Accessibility (Inclusive and Usable Design)
- **Semantic HTML & ARIA**: Use of `role="dialog"`, `aria-label`, and `aria-hidden` across dynamic UI components.
- **Screen Reader Support**: Implemented hidden "Skip to main content" links and large, legible typographies (e.g., `Inter` and `Outfit` web fonts).
- **Multi-lingual Context**: The Gemini integration dynamically shifts language based on user input, removing language barriers to civic education.

---

## ☁️ Google Services Integration
ElectIQ leans heavily on cutting-edge Google AI ecosystem tools:
1. **Gemini 3.1 Flash Lite (`@google/generative-ai`)**: Serves as the high-speed reasoning engine for the ElectIQ chat assistant, parsing rapid queries in English, Hindi, and regional dialects.
2. **Generative Image AI**: The App's Photo Gallery features stunning, hyper-realistic portrayals of Indian election scenes (polling booths, results celebrations) dynamically generated using Google's generative image tools.
