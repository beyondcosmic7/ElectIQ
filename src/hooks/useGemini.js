import { useCallback } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useAppContext } from '../context/AppContext'
import { buildSystemPrompt, sanitizeInput, parseGeminiResponse, extractAnswerFromStream } from '../utils/geminiPrompt'

// Initialize the client once (not on every call)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

let genAI = null
let model = null

function getModel() {
  if (!API_KEY) {
    throw new Error('MISSING_API_KEY')
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY)
  }
  if (!model) {
    model = genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-lite-preview',
      generationConfig: {
        temperature: 0.3,
        topP: 0.8,
        maxOutputTokens: 800,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    })
  }
  return model
}

export function useGemini() {
  const { state, dispatch } = useAppContext()

  const sendMessage = useCallback(async (userInput) => {
    const sanitized = sanitizeInput(userInput)
    if (!sanitized) return

    // Check cache for identical recent question
    const cacheKey = `electiq_cache_${sanitized.toLowerCase().replace(/\s+/g, '_').slice(0, 50)}`
    const cached = sessionStorage.getItem(cacheKey)
    if (cached) {
      try {
        const parsedCache = JSON.parse(cached)
        dispatch({ type: 'ADD_USER_MESSAGE', payload: sanitized })
        dispatch({ type: 'FINISH_STREAMING', payload: parsedCache })
        if (parsedCache.activeStep) {
          dispatch({ type: 'SET_ACTIVE_STEP', payload: parsedCache.activeStep })
        }
        return
      } catch {
        sessionStorage.removeItem(cacheKey)
      }
    }

    // Add user message to history
    dispatch({ type: 'ADD_USER_MESSAGE', payload: sanitized })
    dispatch({ type: 'START_STREAMING' })

    let attempts = 0
    const maxAttempts = 3 // Initial + 2 retries
    const baseDelay = 2000 // 2 seconds

    while (attempts < maxAttempts) {
      try {
        const geminiModel = getModel()
        const systemPrompt = buildSystemPrompt()

        // Build conversation history for multi-turn context
        const history = (state.chatHistory || [])
          .slice(-6)
          .map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.role === 'user' ? msg.content : JSON.stringify({ answer: msg.content }) }],
          }))

        const chat = geminiModel.startChat({
          history: [
            {
              role: 'user',
              parts: [{ text: `SYSTEM CONTEXT:\n${systemPrompt}\n\nACKNOWLEDGE: Understood. I am ElectIQ and will respond only in the specified JSON format.` }],
            },
            {
              role: 'model',
              parts: [{ text: '{"answer":"Hello! I\'m ElectIQ, your guide to understanding elections in India. Ask me anything about voter registration, voting day, how votes are counted, or any other part of the election process.","activeStep":null,"suggestedQuestions":["How do I register as a voter?","What is the Model Code of Conduct?","What should I bring on voting day?"],"confidence":"high","disclaimer":null}' }],
            },
            ...history,
          ],
        })

        // Stream the response
        const result = await chat.sendMessageStream(sanitized)

        let fullResponse = ''
        let lastExtractedAnswer = ''

        for await (const chunk of result.stream) {
          const chunkText = chunk.text()
          fullResponse += chunkText

          // Try to extract the answer part during stream
          const currentAnswer = extractAnswerFromStream(fullResponse)
          if (currentAnswer && currentAnswer !== lastExtractedAnswer) {
            const delta = currentAnswer.slice(lastExtractedAnswer.length)
            dispatch({ type: 'APPEND_STREAM', payload: delta })
            lastExtractedAnswer = currentAnswer
          }
        }

        // Parse the complete response
        const parsed = parseGeminiResponse(fullResponse)

        // Update timeline if AI identified a relevant step
        if (parsed.activeStep) {
          dispatch({ type: 'SET_ACTIVE_STEP', payload: parsed.activeStep })
        }

        // Finish streaming
        dispatch({ type: 'FINISH_STREAMING', payload: parsed })

        // Cache the response
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(parsed))
        } catch {
          // Ignore storage errors
        }

        return

      } catch (error) {
        attempts++
        const errorMsg = error.message?.toLowerCase() || ''
        const isRateLimit = errorMsg.includes('quota') ||
          errorMsg.includes('limit') ||
          errorMsg.includes('429') ||
          error.status === 429

        if (isRateLimit && attempts < maxAttempts) {
          const delay = baseDelay * Math.pow(2, attempts - 1)
          await new Promise(resolve => setTimeout(resolve, delay))
          continue
        }

        let errorMessage = 'Something went wrong. Please try again.'

        if (error.message === 'MISSING_API_KEY') {
          errorMessage = 'API key not configured. Add VITE_GEMINI_API_KEY to your .env.local file.'
        } else if (isRateLimit) {
          errorMessage = 'ElectIQ is temporarily busy (Rate Limit). Please wait 5-10 seconds and click Try Again.'
        } else if (errorMsg.includes('not found') || error.status === 404) {
          errorMessage = `AI service model (gemini-3.1-flash-lite-preview) not found. Please check your API project permissions.`
        } else if (error.message?.includes('SAFETY')) {
          errorMessage = "I couldn't answer that question safely. Please rephrase and ask about elections."
        } else if (!navigator.onLine) {
          errorMessage = 'No internet connection. Please check your network and try again.'
        }

        dispatch({ type: 'SET_ERROR', payload: errorMessage })
        break
      }
    }
  }, [state.chatHistory, dispatch])

  return { sendMessage, isStreaming: state.isStreaming }
}
