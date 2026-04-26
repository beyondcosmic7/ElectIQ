export default function Footer() {
  return (
    <footer className="shrink-0 z-10">
      <div
        className="px-4 py-2 flex items-center justify-between text-[10px] glass"
        style={{ borderTop: '1.5px solid var(--border-light)', color: 'var(--ink-muted)' }}
      >
        <span className="flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--green)' }} />
          AI-generated · Verify with{' '}
          <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2" style={{ color: 'var(--navy)' }}>
            ECI Official
          </a>
        </span>
        <span className="hidden sm:inline font-semibold text-gradient-saffron">
          ElectIQ · Powered by Gemini ✨
        </span>
      </div>
      <div className="tricolor-bar shimmer" />
    </footer>
  )
}
