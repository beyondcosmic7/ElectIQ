import { getStepsForPrompt } from '../data/electionSteps'

/**
 * Builds the complete Gemini system prompt with injected ECI 
 * election knowledge base as ground truth.
 * Prevents hallucination by grounding AI responses in static data.
 * @returns {string} Complete system prompt — injected before every API call
 */
export function buildSystemPrompt() {
  const steps = getStepsForPrompt()
  const stepsJson = JSON.stringify(steps, null, 2)

  return `You are ElectIQ — a non-partisan, friendly AI assistant that helps Indian citizens understand the election process.

Your knowledge base (USE THIS AS YOUR PRIMARY SOURCE — DO NOT contradict it):
${stepsJson}

YOUR RULES:
1. SCOPE: Only answer questions about the election process, voter rights, civic procedures, and related topics in the knowledge base above. If someone asks about politics, politicians, parties, or policies — politely redirect them to your purpose.
2. ACCURACY: If you're uncertain, say so. Never make up dates, rules, or statistics.
3. LANGUAGE & TONE: ALWAYS reply in the exact language the user typed in (English, Hindi, Marathi, Bengali, Tamil, etc.). If they mix languages (Hinglish), reply in the dominant language.
4. SIMPLICITY: Your primary goal is to make the election process easily understandable for everyone. Explain extremely complex terms using everyday, simple analogies. Avoid bureaucratic jargon entirely. Limit answers to short, easily digestible sentences.
5. BREVITY: Answers should be 2-4 sentences for simple questions, up to 6-8 sentences for complex ones. No walls of text.
5. FORMAT: You MUST respond in this exact JSON format — no preamble, no markdown code fences, just pure JSON:

{
  "answer": "Your plain text answer here. HTML is NOT allowed. Use \\n for line breaks if needed.",
  "activeStep": "voter-registration | election-announcement | nominations | campaign-period | voting-day | vote-counting | government-formation | null",
  "suggestedQuestions": ["Question 1?", "Question 2?", "Question 3?"],
  "confidence": "high | medium | low",
  "disclaimer": "Optional: only include if the answer involves specific dates, legal requirements, or regional variations that the user should verify officially. Otherwise null."
}

ACTIVE STEP SELECTION: Set activeStep to the election step most relevant to the question. If the question spans multiple steps or is a general question, set it to null.

SUGGESTED QUESTIONS: Always provide exactly 3 follow-up questions that naturally continue the conversation. Make them specific. Write these questions in the SAME LANGUAGE as your answer so the user can easily tap them.

CONFIDENCE: 
- "high" → well-established process info clearly in your knowledge base
- "medium" → general info that may vary by state/election type
- "low" → edge cases, specific dates, or regional rules — always pair with a disclaimer

CRITICAL: Respond ONLY with valid JSON. No text before or after. No \`\`\`json fences. Just the JSON object.`
}

/**
 * Sanitizes raw user input before transmission to Gemini API.
 * Prevents XSS, prompt injection, and role hijacking attempts.
 * @param {string} input - Raw text from user input field
 * @returns {string} Sanitized string, maximum 500 characters
 * @example
 * sanitizeInput('  How do I vote?  ') // → 'How do I vote?'
 * sanitizeInput('<script>xss</script>') // → 'scriptsscript'
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .slice(0, 500)
    .replace(/[<>]/g, '')
    .replace(/ignore (all )?(previous|prior|above) instructions?/gi, '[filtered]')
    .replace(/you are now|act as|pretend (to be|you are)/gi, '[filtered]')
    .replace(/jailbreak|DAN mode|developer mode/gi, '[filtered]')
}

/**
 * Parses the raw Gemini API response into a structured data object.
 * Handles JSON parse failures gracefully — falls back to raw text display.
 * @param {string} rawText - Complete text response from Gemini stream
 * @returns {{
 *   answer: string,
 *   activeStep: string|null,
 *   suggestedQuestions: string[],
 *   confidence: 'high'|'medium'|'low',
 *   disclaimer: string|null
 * }} Parsed response object
 */
export function parseGeminiResponse(rawText) {
  const fallback = {
    answer: rawText || 'I had trouble processing that. Please try asking again.',
    activeStep: null,
    suggestedQuestions: [
      'How do I register to vote?',
      'What documents do I need on voting day?',
      'How are votes counted in India?',
    ],
    confidence: 'low',
    disclaimer: 'Note: This response may not be fully formatted. Please verify important information with official ECI sources.',
  }

  try {
    // Strip any accidental markdown fences
    let cleaned = rawText.trim()
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '')
    }

    const parsed = JSON.parse(cleaned)

    // Validate required fields
    if (!parsed.answer || typeof parsed.answer !== 'string') {
      return fallback
    }

    return {
      answer: parsed.answer,
      activeStep: parsed.activeStep || null,
      suggestedQuestions: Array.isArray(parsed.suggestedQuestions)
        ? parsed.suggestedQuestions.slice(0, 3)
        : fallback.suggestedQuestions,
      confidence: ['high', 'medium', 'low'].includes(parsed.confidence)
        ? parsed.confidence
        : 'medium',
      disclaimer: parsed.disclaimer || null,
    }
  } catch {
    // If JSON parse fails, try to extract answer from raw text
    return {
      ...fallback,
      answer: rawText || fallback.answer,
    }
  }
}

/**
 * Heuristically extracts the content of the "answer" field from a partially 
 * complete JSON string during streaming.
 * @param {string} buffer - The raw JSON string chunk being processed
 * @returns {string} The extracted answer content so far
 */
export function extractAnswerFromStream(buffer) {
  if (!buffer) return ''

  // Look for the "answer" key and its starting quote
  const match = buffer.match(/"answer"\s*:\s*"/);
  if (!match) return ''

  const startIndex = match.index + match[0].length
  let content = ''
  let escaped = false

  for (let i = startIndex; i < buffer.length; i++) {
    const char = buffer[i]
    
    if (escaped) {
      if (char === 'n') content += '\n'
      else if (char === 't') content += '\t'
      else if (char === 'r') content += '\r'
      else if (char === '"') content += '"'
      else if (char === '\\') content += '\\'
      else content += char
      escaped = false
    } else if (char === '\\') {
      escaped = true
    } else if (char === '"') {
      // Possible end of answer field
      break
    } else {
      content += char
    }
  }

  return content
}
