import { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'

export default function ChecklistBar() {
  const { state, dispatch } = useAppContext()
  const items = Object.entries(state.checklist)
  const completedCount = items.filter(([, v]) => v).length
  const totalCount = items.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
  const allDone = completedCount === totalCount
  const [showDoneDialog, setShowDoneDialog] = useState(false)

  useEffect(() => {
    if (allDone) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowDoneDialog(true)
    } else {
      setShowDoneDialog(false)
    }
  }, [allDone])

  const labels = {
    'voter-registration': { text: 'Register as a voter', icon: 'how_to_reg', emoji: '📝' },
    'verify-voter-id': { text: 'Verify your Voter ID', icon: 'badge', emoji: '🪪' },
    'know-your-constituency': { text: 'Know your constituency', icon: 'map', emoji: '📍' },
    'check-candidate-list': { text: 'Check candidate list', icon: 'group', emoji: '👥' },
    'find-polling-booth': { text: 'Find your polling booth', icon: 'location_on', emoji: '🏫' },
    'carry-voter-id': { text: 'Keep Voter ID ready', icon: 'credit_card', emoji: '💳' },
    'cast-your-vote': { text: 'Cast your vote', icon: 'how_to_vote', emoji: '🗳️' },
    'check-results': { text: 'Check election results', icon: 'bar_chart', emoji: '📊' },
  }

  return (
    <div className="shrink-0" style={{ borderTop: '2.5px solid var(--border-brutal)', backgroundColor: 'var(--card-bg)' }}>
      {/* Header with animated progress */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wide flex items-center gap-1.5"
            style={{ color: 'var(--navy)' }}>
            <span className="material-symbols-outlined filled text-[14px]" style={{ color: 'var(--green)' }}>
              checklist
            </span>
            Voter Checklist
          </h3>
          <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full transition-all duration-500 ${allDone ? 'animate-fade-in' : ''}`}
            style={{
              background: allDone
                ? 'linear-gradient(135deg, var(--green), var(--green-dark))'
                : 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))',
              color: '#FFF',
            }}>
            {allDone ? '🎉 ' : ''}{completedCount}/{totalCount}
          </span>
        </div>

        {/* Animated progress bar */}
        <div className="h-2.5 rounded-full overflow-hidden brutal-border-thin" style={{ backgroundColor: 'var(--cream)' }}>
          <div className={`h-full rounded-full transition-all duration-700 ease-out ${allDone ? 'shimmer' : ''}`}
            style={{
              width: `${progress}%`,
              background: allDone
                ? 'linear-gradient(90deg, var(--green), var(--green-light))'
                : `linear-gradient(90deg, var(--saffron) 0%, var(--cream) 50%, var(--green) 100%)`,
            }}
          />
        </div>

        {showDoneDialog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => setShowDoneDialog(false)}
            />
            
            {/* Squircle Dialog */}
            <div 
              className="relative z-10 p-8 text-center brutal-border brutal-shadow-lg animate-pop-in"
              style={{ 
                backgroundColor: 'var(--card-bg)',
                borderRadius: '60px', // Smooth squircle-like curve
                maxWidth: '320px',
                aspectRatio: '1/1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div className="mb-4 text-4xl">
                🇮🇳
              </div>
              <h2 className="font-display font-black text-xl leading-tight mb-4 text-gradient-tricolor">
                You're all set to exercise your right!
              </h2>
              <p className="font-bold text-lg mb-6" style={{ color: 'var(--navy)' }}>
                Jai Hind! 🇮🇳
              </p>
              
              <button 
                onClick={() => setShowDoneDialog(false)}
                className="px-8 py-2.5 rounded-full font-bold brutal-border-thin brutal-btn transform transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: 'var(--green)', color: '#FFF' }}
              >
                Awesome!
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Checklist items — staggered */}
      <div className="px-3 pb-3 max-h-[60vh] overflow-y-auto">
        <ul className="space-y-1.5 stagger-children" role="list">
          {items.map(([key, checked]) => {
            const meta = labels[key] || { text: key, icon: 'check', emoji: '✓' }
            return (
              <li key={key} role="listitem">
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_CHECKLIST_ITEM', payload: key })}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-brutal text-left text-xs font-medium transition-all duration-300 card-hover ${checked ? 'brutal-border-thin' : 'border border-transparent hover:border-[var(--border-light)]'}`}
                  style={{
                    backgroundColor: checked ? 'rgba(19, 136, 8, 0.07)' : 'transparent',
                    color: checked ? 'var(--green-dark)' : 'var(--ink-light)',
                  }}
                  aria-pressed={checked}
                >
                  {/* Fun emoji or checkbox */}
                  <span className="text-lg shrink-0">{checked ? '✅' : meta.emoji}</span>
                  <span className={`flex-1 ${checked ? 'line-through opacity-70' : ''}`}>
                    {meta.text}
                  </span>
                  {checked && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full animate-fade-in"
                      style={{ backgroundColor: 'var(--green)', color: '#FFF' }}>
                      Done
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
