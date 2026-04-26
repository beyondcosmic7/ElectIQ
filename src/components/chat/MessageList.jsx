import { useEffect, useRef } from 'react'
import { useAppContext } from '../../context/AppContext'
import MessageBubble from './MessageBubble'
import SuggestedQuestions from './SuggestedQuestions'
import TextType from '../effects/TextType'
import EciLogo from '../layout/EciLogo'

const STARTER_QUESTIONS = [
  '🗳️ How do I get my Voter ID?',
  '📋 What proof do I need to vote?',
  '🏛️ How do they count the votes?',
  '⚖️ What are the election rules?',
]

const FLOATING_EMOJIS = ['🇮🇳', '🗳️', '🏛️', '⚖️', '📋', '✅']

export default function MessageList({ onSelectQuestion }) {
  const { state, dispatch } = useAppContext()
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [state.chatHistory.length, state.streamingContent])

  const isEmpty = state.chatHistory.length === 0

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4" role="log" aria-label="Chat history"
      aria-live="polite" aria-atomic="false">
      {isEmpty ? (
        <div className="h-full flex flex-col items-center justify-center text-center pb-4 relative">
          {/* Floating decorative emojis */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {FLOATING_EMOJIS.map((emoji, i) => (
              <span
                key={i}
                className="absolute text-2xl opacity-[0.08] select-none"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${15 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${3.5 + i * 0.5}s`,
                  fontSize: `${1.5 + (i % 3) * 0.5}rem`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>

          {/* ECI Logo */}
          <div className="relative mb-6 flex flex-col items-center gap-4 animate-fade-in">
            <EciLogo size={80} className="relative z-10 drop-shadow-md" />
          </div>

          {/* Typing hero text */}
          <TextType
            text={[
              'Welcome to ElectIQ 🇮🇳',
              'Your Lok Sabha Election Guide',
              'Ask me anything about voting!',
              'Powered by AI, built for India 🗳️',
            ]}
            as="h2"
            className="font-display text-xl md:text-2xl font-bold mb-3"
            typingSpeed={55}
            deletingSpeed={25}
            pauseDuration={2500}
            showCursor={true}
            cursorCharacter="▊"
            cursorClassName="text-saffron"
            textColors={['#000080', '#FF9933', '#138808', '#000080']}
            loop={true}
          />

          <p className="text-sm max-w-xs leading-relaxed mb-6 font-medium animate-fade-in" style={{ color: 'var(--ink-muted)', animationDelay: '0.3s' }}>
            From voter registration to result day — understand every step of India's democratic process.
          </p>

          {/* Fun stat badges */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {[
              { label: '96+ Cr Voters', icon: 'groups', color: 'var(--saffron)' },
              { label: '543 Seats', icon: 'event_seat', color: 'var(--navy)' },
              { label: '7 Phases', icon: 'timeline', color: 'var(--green)' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold brutal-border-thin"
                style={{ backgroundColor: 'var(--cream-warm)', color: s.color }}>
                <span className="material-symbols-outlined filled text-[12px]">{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>

          {/* Starter questions — staggered */}
          <div className="flex flex-wrap gap-2 justify-center max-w-md stagger-children">
            {STARTER_QUESTIONS.map(q => (
              <button key={q} onClick={() => onSelectQuestion(q)}
                className="px-4 py-2.5 rounded-brutal brutal-border-thin brutal-shadow-sm brutal-btn text-sm font-semibold card-hover"
                style={{ backgroundColor: 'var(--card-bg)', color: 'var(--ink)' }}>
                {q}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4" role="list">
          {state.chatHistory.map((message, index) => {
            const isLastAI = message.role === 'ai' && index === state.chatHistory.length - 1
            return (
              <div key={message.id}>
                <MessageBubble message={message} />
                {isLastAI && !state.isStreaming && message.suggestedQuestions?.length > 0 && (
                  <div className="mt-2 ml-11">
                    <SuggestedQuestions questions={message.suggestedQuestions} onSelect={onSelectQuestion} />
                  </div>
                )}
              </div>
            )
          })}

          {state.isStreaming && <MessageBubble isStreaming={true} streamingContent={state.streamingContent} />}

          {state.error && (
            <div className="flex flex-col gap-2 px-4 py-3 rounded-brutal text-sm animate-fade-in brutal-border"
              style={{ backgroundColor: '#FEF2F2', color: '#991B1B' }} role="alert">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
                <span className="font-medium text-[13px]">{state.error}</span>
              </div>
              <button 
                onClick={() => {
                  const lastUserMessage = [...state.chatHistory].reverse().find(m => m.role === 'user');
                  if (lastUserMessage) {
                    onSelectQuestion(lastUserMessage.content);
                  } else {
                    // Fallback just clear error
                    dispatch({ type: 'CLEAR_ERROR' });
                  }
                }}
                className="mt-1 self-start px-3 py-1.5 bg-white rounded-brutal brutal-border-thin brutal-shadow-sm text-[12px] font-bold text-[#991B1B] hover:bg-[#FFF5F5] transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[14px]">refresh</span>
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
      <div ref={bottomRef} aria-hidden="true" />
    </div>
  )
}
