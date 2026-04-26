import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { useAppContext } from '../../context/AppContext'
import EciLogo from '../layout/EciLogo'
import StateEmblem from '../layout/StateEmblem'

const MENU_ITEMS = [
  {
    id: 'chat',
    label: 'AI Assistant',
    icon: 'smart_toy',
    description: 'Ask anything about elections',
    color: '#FF9933',
    emoji: '🤖',
  },
  {
    id: 'timeline',
    label: 'Election Timeline',
    icon: 'timeline',
    description: '7-step election process',
    color: '#000080',
    emoji: '🏛️',
  },
  {
    id: 'gallery',
    label: 'Photo Gallery',
    icon: 'photo_library',
    description: 'Lok Sabha election moments',
    color: '#138808',
    emoji: '📸',
  },
  {
    id: 'checklist',
    label: 'Voter Checklist',
    icon: 'checklist',
    description: 'Track your civic to-dos',
    color: '#E67A00',
    emoji: '✅',
  },
]

export default function BubbleMenu() {
  const { state, dispatch } = useAppContext()
  const overlayRef = useRef(null)
  const menuRef = useRef(null)
  const itemsRef = useRef([])
  const [isAnimating, setIsAnimating] = useState(false)

  const animateIn = useCallback(() => {
    setIsAnimating(true)
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
      defaults: { ease: 'power3.out' },
    })

    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35 }
    )
    tl.fromTo(menuRef.current,
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
      '-=0.15'
    )
    tl.fromTo(itemsRef.current.filter(Boolean),
      { opacity: 0, x: -20, scale: 0.9 },
      { opacity: 1, x: 0, scale: 1, stagger: 0.08, duration: 0.4, ease: 'back.out(1.2)' },
      '-=0.25'
    )
  }, [])

  const animateOut = useCallback(() => {
    setIsAnimating(true)
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false)
        dispatch({ type: 'CLOSE_MENU' })
      },
      defaults: { ease: 'power2.in' },
    })

    tl.to(itemsRef.current.filter(Boolean),
      { opacity: 0, x: 20, scale: 0.95, stagger: 0.03, duration: 0.2 }
    )
    tl.to(menuRef.current,
      { opacity: 0, y: -30, scale: 0.9, duration: 0.3 },
      '-=0.1'
    )
    tl.to(overlayRef.current,
      { opacity: 0, duration: 0.25 },
      '-=0.1'
    )
  }, [dispatch])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (state.showMenu) animateIn()
  }, [state.showMenu, animateIn])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && state.showMenu && !isAnimating) animateOut()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [state.showMenu, isAnimating, animateOut])

  if (!state.showMenu) return null

  const handleItemClick = (viewId) => {
    if (isAnimating) return
    dispatch({ type: 'SET_VIEW', payload: viewId })
  }

  const handleClose = () => {
    if (isAnimating) return
    animateOut()
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ opacity: 0 }}
    >
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-menu"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Menu content */}
      <div
        ref={menuRef}
        className="relative z-10 w-full max-w-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{ opacity: 0 }}
      >
        {/* Close button */}
        <div className="flex justify-end mb-3">
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full brutal-border brutal-shadow flex items-center justify-center brutal-btn"
            style={{ backgroundColor: 'var(--card-bg)', color: 'var(--ink)' }}
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Logo + Title */}
        <div className="text-center mb-5">
          <div className="flex justify-center items-center gap-4 mb-3">
            <StateEmblem size={50} />
            <div className="w-[1.5px] h-10 bg-border-light opacity-30" />
            <EciLogo size={52} />
          </div>
          <h2 className="font-display font-bold text-xl text-gradient-tricolor">
            ElectIQ
          </h2>
          <p className="text-xs font-semibold uppercase tracking-widest mt-1" style={{ color: 'var(--saffron-dark)' }}>
            🇮🇳 Navigate
          </p>
        </div>

        {/* Menu items */}
        <div className="space-y-3">
          {MENU_ITEMS.map((item, i) => {
            const isActive = state.activeView === item.id
            return (
              <button
                key={item.id}
                ref={el => (itemsRef.current[i] = el)}
                onClick={() => handleItemClick(item.id)}
                className={`
                  w-full flex items-center gap-4 px-5 py-4 rounded-brutal brutal-border text-left
                  transition-all duration-200
                  ${isActive ? 'brutal-shadow-lg' : 'brutal-shadow card-hover'}
                `}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${item.color}, ${item.color}DD)`
                    : 'var(--card-bg)',
                  opacity: 0,
                }}
              >
                <div
                  className={`w-12 h-12 rounded-full brutal-border flex items-center justify-center shrink-0 ${isActive ? '' : 'shimmer'}`}
                  style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : `${item.color}12` }}
                >
                  <span className="text-2xl">{item.emoji}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: isActive ? '#FFF' : 'var(--ink)' }}>
                    {item.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--ink-muted)' }}>
                    {item.description}
                  </p>
                </div>
                <span
                  className="material-symbols-outlined text-[18px] ml-auto shrink-0"
                  style={{ color: isActive ? '#FFF' : 'var(--ink-muted)' }}
                >
                  {isActive ? 'radio_button_checked' : 'arrow_forward_ios'}
                </span>
              </button>
            )
          })}
        </div>

        {/* Bottom */}
        <div className="text-center mt-5 space-y-2">
          <p className="text-[10px] font-medium" style={{ color: 'var(--ink-muted)' }}>
            Press <kbd className="px-1.5 py-0.5 rounded brutal-border-thin text-[9px] font-bold" style={{ backgroundColor: 'var(--cream)' }}>ESC</kbd> to close
          </p>
          <div className="tricolor-bar mx-auto" style={{ width: '60px', borderRadius: '2px' }} />
        </div>
      </div>
    </div>
  )
}
