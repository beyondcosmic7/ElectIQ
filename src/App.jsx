import { useState, useEffect } from 'react'
import { AppProvider, useAppContext } from './context/AppContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import BubbleMenu from './components/layout/BubbleMenu'
import ChatPanel from './components/chat/ChatPanel'
import ElectionTimeline from './components/timeline/ElectionTimeline'
import ChecklistBar from './components/checklist/ChecklistBar'
import PhotoGallery from './components/gallery/PhotoGallery'
import Grainient from './components/effects/Grainient'

function AppLayout() {
  const { state, dispatch } = useAppContext()

  const renderActiveView = () => {
    switch (state.activeView) {
      case 'timeline':
        return (
          <div className="flex flex-col flex-1 overflow-hidden animate-fade-in relative z-10">
            <ElectionTimeline onClose={() => dispatch({ type: 'SET_VIEW', payload: 'chat' })} />
          </div>
        )

      case 'gallery':
        return (
          <div className="flex flex-col flex-1 overflow-hidden animate-fade-in relative z-10">
            <PhotoGallery onClose={() => dispatch({ type: 'SET_VIEW', payload: 'chat' })} />
          </div>
        )

      case 'checklist':
        return (
          <div className="flex flex-col flex-1 overflow-hidden animate-fade-in relative z-10">
            <div className="px-4 py-3 shrink-0 flex items-center justify-between"
              style={{ borderBottom: '2.5px solid var(--border-brutal)', backgroundColor: 'var(--card-bg)' }}>
              <div>
                <h2 className="font-display font-bold text-base" style={{ color: 'var(--navy)' }}>
                  ✅ Voter Checklist
                </h2>
                <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--ink-muted)' }}>
                  Track your civic responsibilities
                </p>
              </div>
              <button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'chat' })}
                className="p-2 rounded-brutal brutal-border-thin brutal-shadow-sm brutal-btn"
                style={{ backgroundColor: 'var(--cream)', color: 'var(--ink)' }}
                aria-label="Close checklist">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-[var(--cream)]">
              <ChecklistBar />
            </div>
          </div>
        )

      case 'chat':
      default:
        return (
          <div className="flex flex-col flex-1 overflow-hidden relative z-10">
            <ChatPanel />
          </div>
        )
    }
  }

  return (
    <div className="relative flex flex-col h-screen overflow-hidden text-ink" style={{ backgroundColor: 'var(--cream)' }}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none">
        <Grainient 
          color1="#FF9633" // Vibrant Saffron
          color2="#FFFDF5" // Bright Cream/White
          color3="#17B908" // Vibrant Green
          timeSpeed={0.08}
          rotationAmount={10}
          warpStrength={0.2}
          grainAmount={0.03}
          contrast={1.1}
          colorBalance={0.1} // Shift towards lighter colors
        />
      </div>

      {/* Skip to main content — accessibility */}
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[99] focus:px-4 focus:py-2 focus:rounded-brutal focus:text-sm focus:font-bold brutal-border"
        style={{ backgroundColor: 'var(--saffron)', color: '#FFF' }}>
        Skip to main content
      </a>

      <div className="relative z-10">
        <Header />
      </div>

      {/* Main content area — full screen for active view */}
      <main id="main-content" className="flex flex-col flex-1 overflow-hidden relative z-10" role="main" aria-label="ElectIQ main content">
        {renderActiveView()}
        {state.activeView === 'chat' && <Footer />}
      </main>

      {/* BubbleMenu overlay */}
      <div className="relative z-50">
        <BubbleMenu />
      </div>
    </div>
  )
}

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // Phase 1: Trigger the morph/fade out transition
    const timer1 = setTimeout(() => setIsInitializing(false), 1800)
    // Phase 2: Safely unmount after transition completes
    const timer2 = setTimeout(() => setShowLoader(false), 2800)
    return () => { 
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <AppProvider>
      {showLoader && (
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#FFF8F0] transition-all duration-1000 ease-in-out pointer-events-none ${
            isInitializing ? 'opacity-100 scale-100' : 'opacity-0 scale-110 blur-md'
          }`}
        >
          {/* Responsive Ashoka Chakra */}
          <img 
            src="/images/Ashoka_Chakra.svg"
            alt="Loading ElectIQ"
            className="opacity-80"
            style={{ 
              width: 'clamp(100px, 20vmin, 200px)', 
              height: 'clamp(100px, 20vmin, 200px)',
              animation: 'spin-slow 300s linear infinite'
            }}
          />
        </div>
      )}
      <AppLayout />
    </AppProvider>
  )
}
