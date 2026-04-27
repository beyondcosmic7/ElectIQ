import PropTypes from 'prop-types'

export default function MessageBubble({ message, isStreaming = false, streamingContent = '' }) {
  const isUser = message?.role === 'user'
  const isAI = message?.role === 'ai'
  const content = isStreaming ? streamingContent : message?.content

  // Typing indicator — tricolor dots with bounce
  if (isStreaming && !streamingContent) {
    return (
      <div className="flex items-start gap-3 animate-fade-in">
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 brutal-border"
          style={{ background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))' }} aria-hidden="true">
          <span className="material-symbols-outlined filled text-white text-[16px]">smart_toy</span>
        </div>
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-brutal brutal-border-thin shadow-soft"
          style={{ backgroundColor: 'var(--card-bg)' }} aria-label="AI is typing" role="status">
          {[0, 1, 2].map(index => {
            const dotClass = index === 0 ? "dot-1" : index === 1 ? "dot-2" : "dot-3";
            const bgColor = index === 0 
                  ? 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))'
                  : index === 1
                    ? 'var(--white)'
                    : 'linear-gradient(135deg, var(--green), var(--green-dark))';
            return (
              <div key={index} className={`w-2.5 h-2.5 rounded-full ${dotClass}`}
                style={{
                  background: bgColor,
                  border: '1px solid var(--border-light)'
                }} />
            )
          })}
          <span className="text-[10px] font-medium" style={{ color: 'var(--ink-muted)' }}>Thinking...</span>
        </div>
      </div>
    )
  }

  // User message — saffron gradient
  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-in" role="listitem">
        <div className="max-w-xs sm:max-w-sm px-4 py-2.5 rounded-brutal brutal-border text-sm font-medium shimmer"
          style={{
            background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))',
            color: '#FFF',
            boxShadow: 'var(--shadow-brutal-saffron)',
          }}>
          {content}
        </div>
      </div>
    )
  }

  // AI message — clean card with soft shadow
  if (isAI || isStreaming) {
    return (
      <div className="flex items-start gap-3 animate-fade-in" role="listitem">
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 brutal-border"
          style={{ background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))' }} aria-hidden="true">
          <span className="material-symbols-outlined filled text-white text-[16px]">smart_toy</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="px-4 py-3 rounded-brutal brutal-border-thin text-sm leading-relaxed shadow-soft"
            style={{ backgroundColor: 'var(--card-bg)', color: 'var(--ink)' }}>
            <p style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {content}
              {isStreaming && (
                <span className="inline-block w-0.5 h-4 ml-0.5 animate-pulse rounded-full"
                  style={{ backgroundColor: 'var(--saffron)', verticalAlign: 'text-bottom' }} aria-hidden="true" />
              )}
            </p>
          </div>

          {!isStreaming && message?.confidence === 'low' && message?.disclaimer && (
            <div className="mt-2 px-3 py-2 rounded-lg text-xs flex items-start gap-1.5 brutal-border-thin animate-fade-in"
              style={{ backgroundColor: '#FEF3C7', color: '#92400E' }} role="note">
              <span className="material-symbols-outlined text-[14px] shrink-0 mt-0.5">info</span>
              <span>{message.disclaimer}</span>
            </div>
          )}

          {!isStreaming && message?.timestamp && (
            <p className="text-[10px] mt-1.5 px-1 font-medium" style={{ color: 'var(--ink-muted)' }} aria-hidden="true">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>
      </div>
    )
  }

  return null
}

MessageBubble.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.oneOf(['user', 'ai']).isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date),
    suggestedQuestions: PropTypes.arrayOf(PropTypes.string),
    confidence: PropTypes.oneOf(['high', 'medium', 'low']),
    disclaimer: PropTypes.string,
  }),
  isStreaming: PropTypes.bool,
  streamingContent: PropTypes.string,
}
