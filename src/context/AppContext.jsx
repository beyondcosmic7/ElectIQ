import { createContext, useContext, useReducer } from 'react'

const initialState = {
  activeStep: null,
  chatHistory: [],
  isStreaming: false,
  streamingContent: '',
  checklist: {
    'voter-registration': false,
    'verify-voter-id': false,
    'know-your-constituency': false,
    'check-candidate-list': false,
    'find-polling-booth': false,
    'carry-voter-id': false,
    'cast-your-vote': false,
    'check-results': false,
  },
  error: null,
  isMobileMenuOpen: false,
  showMenu: false,       // BubbleMenu overlay
  activeView: 'chat',    // 'chat' | 'timeline' | 'gallery' | 'checklist'
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_STEP':
      return { ...state, activeStep: action.payload }

    case 'ADD_USER_MESSAGE':
      return {
        ...state,
        chatHistory: [
          ...state.chatHistory,
          { role: 'user', content: action.payload, id: `user-${Date.now()}`, timestamp: new Date() }
        ]
      }

    case 'START_STREAMING':
      return { ...state, isStreaming: true, streamingContent: '', error: null }

    case 'APPEND_STREAM':
      return { ...state, streamingContent: state.streamingContent + action.payload }

    case 'FINISH_STREAMING':
      return {
        ...state,
        isStreaming: false,
        streamingContent: '',
        chatHistory: [
          ...state.chatHistory,
          {
            role: 'ai',
            content: action.payload.answer,
            suggestedQuestions: action.payload.suggestedQuestions || [],
            confidence: action.payload.confidence || 'high',
            disclaimer: action.payload.disclaimer || null,
            id: `ai-${Date.now()}`,
            timestamp: new Date(),
          }
        ]
      }

    case 'SET_ERROR':
      return { ...state, isStreaming: false, error: action.payload }

    case 'CLEAR_ERROR':
      return { ...state, error: null }

    case 'TOGGLE_CHECKLIST_ITEM':
      return {
        ...state,
        checklist: { ...state.checklist, [action.payload]: !state.checklist[action.payload] }
      }

    case 'TOGGLE_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen }

    case 'CLOSE_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: false }

    case 'TOGGLE_MENU':
      return { ...state, showMenu: !state.showMenu }

    case 'CLOSE_MENU':
      return { ...state, showMenu: false }

    case 'SET_VIEW':
      return { ...state, activeView: action.payload, showMenu: false, isMobileMenuOpen: action.payload === 'timeline' }

    default:
      return state
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
