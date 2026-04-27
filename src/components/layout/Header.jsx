import { useAppContext } from '../../context/AppContext'
import PropTypes from 'prop-types'
import EciLogo from './EciLogo'

export default function Header() {
  const { state, dispatch } = useAppContext()
  const completedCount = Object.values(state.checklist).filter(Boolean).length
  const totalCount = Object.keys(state.checklist).length

  return (
    <header className="shrink-0 z-30 relative">
      {/* Animated tricolor strip */}
      <div className="tricolor-bar shimmer" />

      <div
        className="h-14 flex items-center justify-between px-4 md:px-6 glass"
        style={{ borderBottom: '2.5px solid var(--border-brutal)' }}
      >
        {/* Left: Logo + Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 animate-fade-in">
            <EciLogo size={40} />
          </div>
          <div>
            <span className="font-display font-bold text-lg leading-none text-gradient-tricolor">
              ElectIQ
            </span>
            <p className="text-[10px] leading-none mt-0.5 font-semibold tracking-wider uppercase" style={{ color: 'var(--saffron-dark)' }}>
              Lok Sabha Election Guide
            </p>
          </div>
        </div>

        {/* Center: Progress pill */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'checklist' })}
            className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 rounded-brutal brutal-border-thin text-[11px] md:text-sm font-semibold card-hover brutal-btn transition-all active:scale-95"
            style={{ 
              backgroundColor: state.activeView === 'checklist' ? 'var(--saffron-glow)' : 'var(--cream-warm)', 
              boxShadow: 'var(--shadow-brutal-sm)',
              border: state.activeView === 'checklist' ? '1.5px solid var(--saffron)' : '1.5px solid var(--border-brutal)'
            }}
            aria-label="View voter checklist"
          >
            <span className="material-symbols-outlined filled text-[14px] md:text-[16px]" style={{ color: completedCount === totalCount ? 'var(--green)' : 'var(--saffron)' }}>
              {completedCount === totalCount ? 'verified' : 'task_alt'}
            </span>
            <span style={{ color: 'var(--ink)' }}>
              <span className="font-extrabold" style={{ color: completedCount === totalCount ? 'var(--green)' : 'var(--saffron-dark)' }}>{completedCount}</span>
              <span className="hidden xs:inline">/{totalCount} steps</span>
              <span className="xs:hidden">/{totalCount}</span>
            </span>
            {/* Mini progress bar (desktop/small tablet only) */}
            <div className="hidden sm:block w-12 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-light)' }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`, background: 'linear-gradient(90deg, var(--saffron), var(--green))' }} />
            </div>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://eci.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-brutal brutal-border-thin brutal-shadow-sm brutal-btn text-sm font-semibold"
            style={{ backgroundColor: 'var(--cream)', color: 'var(--navy)' }}
          >
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            <span>ECI Official</span>
          </a>

          {/* Menu toggle — animated icon */}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
            className="p-2 rounded-brutal brutal-border brutal-shadow-sm brutal-btn flex items-center justify-center transition-all duration-300"
            style={{
              background: state.showMenu ? 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))' : 'var(--card-bg)',
              color: state.showMenu ? '#FFF' : 'var(--ink)',
            }}
            aria-label={state.showMenu ? 'Close menu' : 'Open menu'}
            aria-pressed={state.showMenu}
          >
            <span className="material-symbols-outlined text-[20px] transition-transform duration-300" style={{ transform: state.showMenu ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              {state.showMenu ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  isDark: PropTypes.bool,
  onToggleTheme: PropTypes.func,
}
