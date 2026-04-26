import Masonry from '../effects/Masonry'

const GALLERY_ITEMS = [
  // New hyper-realistic AI generated election scenes
  { id: 11, img: '/images/ai_polling_officials.png', height: 380, label: 'Election Officials at a Polling Booth' },
  { id: 12, img: '/images/ai_voters_line.png', height: 420, label: 'Indian Citizens in a Voting Queue' },
  { id: 13, img: '/images/ai_inked_finger.png', height: 360, label: 'Voter Showing Inked Finger' },
  { id: 14, img: '/images/ai_election_celebration.png', height: 400, label: 'Joyful Post-Election Celebration' },
]

export default function PhotoGallery({ onClose }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between shrink-0"
        style={{ borderBottom: '2.5px solid var(--border-brutal)', backgroundColor: 'var(--card-bg)' }}>
        <div>
          <h2 className="font-display font-bold text-base" style={{ color: 'var(--navy)' }}>
            📸 Lok Sabha Elections
          </h2>
          <p className="text-xs font-medium" style={{ color: 'var(--ink-muted)' }}>
            Real moments from India's democratic journey
          </p>
        </div>
        <button onClick={onClose}
          className="p-2 rounded-brutal brutal-border-thin brutal-shadow-sm brutal-btn"
          style={{ backgroundColor: 'var(--cream)', color: 'var(--ink)' }}
          aria-label="Close gallery">
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      {/* Attribution */}
      <div className="px-4 py-1.5 text-[10px] font-medium" style={{ color: 'var(--ink-muted)', backgroundColor: 'var(--cream-warm)' }}>
        📷 Real photos via <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: 'var(--navy)' }}>Unsplash</a> (free license) · Illustrated scenes by AI
      </div>

      {/* Masonry Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <Masonry
          items={GALLERY_ITEMS}
          animateFrom="bottom"
          stagger={0.08}
          scaleOnHover={true}
          hoverScale={0.97}
          blurToFocus={true}
        />
      </div>
    </div>
  )
}
