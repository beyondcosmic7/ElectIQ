import { useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useAppContext } from '../../context/AppContext'

const MAX_LENGTH = 500

export default function ChatInputBar({ onSend }) {
  const [value, setValue] = useState('')
  const { state, dispatch } = useAppContext()
  const textareaRef = useRef(null)
  const canSend = value.trim().length > 0 && !state.isStreaming

  const handleSend = useCallback(() => {
    if (!canSend) return
    onSend(value.trim())
    setValue('')
    textareaRef.current?.focus()
  }, [canSend, value, onSend])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    if (e.key === 'Escape') { setValue(''); e.target.blur(); }
    if (state.error) dispatch({ type: 'CLEAR_ERROR' })
  }

  return (
    <div className="p-4 glass backdrop-blur-xl border-t border-white/20">
      {/* Subtle tricolor top accent line */}
      <div className="absolute top-0 left-0 w-full h-[2px] opacity-40" 
           style={{ background: 'linear-gradient(90deg, var(--saffron) 0%, var(--white) 50%, var(--green) 100%)' }} />

      <div className={`
        relative flex items-end gap-2 px-4 py-3 rounded-[20px] transition-all duration-500
        ${value.trim() ? 'brutal-border brutal-shadow-saffron' : 'brutal-border-thin focus-within:brutal-border hover:border-saffron/40 shadow-soft'}
      `}
        style={{ backgroundColor: 'var(--card-bg)' }}>
        
        {/* Status indicator */}
        <div className="shrink-0 mb-2 mr-1">
          <span className="material-symbols-outlined text-[18px]"
                style={{ color: state.isStreaming ? 'var(--navy)' : 'var(--green-light)' }}>
            {state.isStreaming ? 'hourglass_top' : 'assistant'}
          </span>
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => setValue(e.target.value.slice(0, MAX_LENGTH))}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about the Indian elections..."
          rows={1}
          className="flex-1 text-sm font-medium resize-none bg-transparent outline-none border-none py-1.5 leading-relaxed placeholder:text-ink-muted/50 focus:ring-0"
          style={{ color: 'var(--ink)', maxHeight: '150px', overflowY: 'auto', boxShadow: 'none' }}
          aria-label="Type your question about elections"
          aria-multiline="true"
          disabled={state.isStreaming}
        />

        <div className="flex flex-col items-center justify-center gap-2 shrink-0">
          {value.length > 350 && (
            <span className="text-[9px] font-black tracking-tighter"
              style={{ color: value.length > 450 ? '#DC2626' : 'var(--ink-muted)' }}>
              {MAX_LENGTH - value.length}
            </span>
          )}
          <button 
            onClick={handleSend} 
            disabled={!canSend}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center transition-all duration-400
              ${canSend ? 'brutal-shadow-sm hover:scale-105 active:scale-95' : 'opacity-40'}
            `}
            style={{
              background: canSend 
                ? 'linear-gradient(135deg, var(--saffron), #FF7A00)' 
                : 'var(--cream-warm)',
              border: canSend ? '2px solid var(--saffron-dark)' : '1px solid var(--border-light)',
              cursor: canSend ? 'pointer' : 'not-allowed',
            }}
            aria-label="Send message">
            <span className="material-symbols-outlined filled text-[20px]"
              style={{
                color: canSend ? '#FFF' : 'var(--ink-muted)',
                transform: state.isStreaming ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.5s ease'
              }}>
              {state.isStreaming ? 'stop_circle' : 'arrow_upward'}
            </span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2.5 px-2">
        <div className="flex items-center gap-3">
          <p className="text-[10px] font-bold tracking-tight opacity-60" style={{ color: 'var(--ink-muted)' }}>
            <span className="bg-cream px-1.5 py-0.5 rounded border border-border-light mr-1">Enter</span> to send
          </p>
          <div className="h-1 w-1 rounded-full bg-ink-muted/30" />
          <p className="text-[10px] font-bold tracking-tight opacity-60" style={{ color: 'var(--ink-muted)' }}>
            <span className="bg-cream px-1.5 py-0.5 rounded border border-border-light mr-1">Shift+Enter</span> new line
          </p>
        </div>
        <p className="text-[9px] font-black uppercase tracking-widest opacity-40" style={{ color: 'var(--navy)' }}>
          ElectIQ AI Assistant
        </p>
      </div>
    </div>
  )
}

ChatInputBar.propTypes = {
  onSend: PropTypes.func.isRequired,
}
