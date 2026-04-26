import { useRef, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import StepDetailCard from './StepDetailCard'

export default function TimelineStep({ step, isLast }) {
  const { state, dispatch } = useAppContext()
  const isActive = state.activeStep === step.id
  const detailRef = useRef(null)

  const completedCount = step.checklistKeys.filter(k => state.checklist[k]).length
  const totalCount = step.checklistKeys.length
  const isCompleted = totalCount > 0 && completedCount === totalCount

  const handleClick = () => {
    dispatch({ type: 'SET_ACTIVE_STEP', payload: isActive ? null : step.id })
  }

  // Auto-scroll the detail card into view when it opens
  useEffect(() => {
    if (isActive && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 150)
    }
  }, [isActive])

  return (
    <li className="relative" role="listitem">
      {!isLast && (
        <div
          className={`absolute left-[32px] -translate-x-1/2 top-[3.25rem] bottom-[-4px] z-0 ${isCompleted ? 'connector-pulse' : ''}`}
          style={{
            width: '4px',
            background: isCompleted
              ? `linear-gradient(180deg, var(--saffron) 0%, var(--white) 50%, var(--green) 100%)`
              : 'var(--border-light)',
            borderRadius: '4px',
            opacity: isCompleted ? 1 : 0.3,
          }}
          aria-hidden="true"
        />
      )}

      {/* Step button — clickable header */}
      <button
        onClick={handleClick}
        className={`
          relative flex items-start gap-3 w-full text-left px-3 py-3 rounded-brutal
          transition-all duration-300 card-hover
          ${isActive
            ? 'brutal-border brutal-shadow'
            : `border-2 ${isCompleted ? 'border-green/30' : 'border-transparent'} hover:brutal-border-thin`
          }
          ${isCompleted ? 'stamp' : ''}
        `}
        style={{
          backgroundColor: isActive ? 'var(--card-bg)' : 'transparent',
        }}
        aria-expanded={isActive}
        aria-label={`Election step ${step.phase}: ${step.title}`}
      >
        {/* Step icon circle with gradient */}
        <div
          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'glow-saffron' : ''}`}
          style={{
            background: isCompleted
              ? 'linear-gradient(135deg, var(--green), var(--green-dark))'
              : isActive
                ? 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))'
                : 'var(--cream-warm)',
            border: isCompleted
              ? '2.5px solid var(--green-dark)'
              : isActive
                ? '2.5px solid var(--saffron-dark)'
                : '2.5px solid var(--border-light)',
          }}
          aria-hidden="true"
        >
          {isCompleted ? (
            <span className="material-symbols-outlined filled text-white text-[18px]">check_circle</span>
          ) : (
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ color: isActive ? '#FFF' : 'var(--ink-muted)' }}
            >
              {step.icon}
            </span>
          )}
        </div>

        {/* Step content */}
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors duration-300"
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))'
                  : 'var(--cream-warm)',
                color: isActive ? '#FFF' : 'var(--saffron-dark)',
              }}
            >
              Phase {step.phase}
            </span>
            {totalCount > 0 && (
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: isCompleted ? 'var(--green)' : 'var(--cream)',
                  color: isCompleted ? '#FFF' : 'var(--ink-muted)',
                  border: isCompleted ? 'none' : '1px solid var(--border-light)',
                }}
              >
                {completedCount}/{totalCount} ✓
              </span>
            )}
          </div>
          <p className="text-sm font-bold leading-tight mt-1" style={{ color: 'var(--ink)' }}>
            {step.title}
          </p>
          <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--ink-muted)' }}>
            {step.subtitle}
          </p>
        </div>

        {/* Animated chevron */}
        <span
          className="material-symbols-outlined text-[16px] mt-2 shrink-0 transition-transform duration-300"
          style={{
            color: isActive ? 'var(--saffron-dark)' : 'var(--ink-muted)',
            transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
          aria-hidden="true"
        >
          chevron_right
        </span>
      </button>

      {/* INLINE Detail Card — renders directly under this step (accordion style) */}
      {isActive && (
        <div ref={detailRef} className="animate-slide-down">
          <StepDetailCard step={step} />
        </div>
      )}
    </li>
  )
}
