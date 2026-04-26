import { useEffect, useRef } from 'react'
import { ELECTION_STEPS } from '../../data/electionSteps'
import TimelineStep from './TimelineStep'
import { useAppContext } from '../../context/AppContext'

export default function ElectionTimeline({ onClose }) {
  const { state } = useAppContext()
  const activeRef = useRef(null)
  const containerRef = useRef(null)

  // Scroll active step into view
  useEffect(() => {
    if (state.activeStep && activeRef.current && containerRef.current) {
      setTimeout(() => {
        activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }, [state.activeStep])

  return (
    <div className="flex flex-col h-full">
      {/* Panel header */}
      <div className="px-4 py-3 shrink-0 flex items-center justify-between glass"
        style={{ borderBottom: '2.5px solid var(--border-brutal)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))', border: '2px solid var(--saffron-dark)' }}>
            <span className="material-symbols-outlined filled text-white text-[18px]">account_balance</span>
          </div>
          <div>
            <h2 className="font-display font-bold text-base leading-tight" style={{ color: 'var(--navy)' }}>
              Election Process
            </h2>
            <p className="text-[10px] font-semibold mt-0.5 uppercase tracking-wider" style={{ color: 'var(--saffron-dark)' }}>
              Lok Sabha · {ELECTION_STEPS.length} phases
            </p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose}
            className="p-2 rounded-brutal brutal-border-thin brutal-shadow-sm brutal-btn"
            style={{ backgroundColor: 'var(--cream)', color: 'var(--ink)' }}
            aria-label="Close timeline">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* Scrollable timeline — detail cards now render INLINE */}
      <div ref={containerRef} className="flex-1 overflow-y-auto px-3 py-4">
        <ol className="space-y-1 stagger-children" role="list" aria-label="Election process steps">
          {ELECTION_STEPS.map((step, index) => (
            <div key={step.id} ref={state.activeStep === step.id ? activeRef : null}>
              <TimelineStep step={step} isLast={index === ELECTION_STEPS.length - 1} />
            </div>
          ))}
        </ol>
      </div>
    </div>
  )
}
