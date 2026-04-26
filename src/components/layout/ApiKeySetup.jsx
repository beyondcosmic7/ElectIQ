import EciLogo from './EciLogo'

export default function ApiKeySetup() {
  return (
    <div className="flex-1 flex items-center justify-center p-8" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-md w-full p-6 rounded-brutal brutal-border brutal-shadow text-center"
        style={{ backgroundColor: 'var(--card-bg)' }}>

        <div className="mb-4">
          <EciLogo size={48} className="mx-auto" />
        </div>

        <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--navy)' }}>
          API Key Required
        </h2>
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--ink-muted)' }}>
          ElectIQ needs a Google Gemini API key to power the AI chat. It's free to get.
        </p>

        <div className="text-left space-y-3 mb-5">
          {[
            { step: '1', text: 'Visit Google AI Studio', icon: 'open_in_new', link: 'https://aistudio.google.com/app/apikey' },
            { step: '2', text: 'Create a free API key', icon: 'vpn_key', link: null },
            { step: '3', text: 'Add to .env.local: VITE_GEMINI_API_KEY=your_key', icon: 'code', link: null },
            { step: '4', text: 'Restart the dev server (npm run dev)', icon: 'refresh', link: null },
          ].map(({ step, text, icon, link }) => (
            <div key={step} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-extrabold brutal-border-thin"
                style={{ backgroundColor: 'var(--saffron)', color: '#FFF' }}>
                {step}
              </div>
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-sm flex items-center gap-1.5 font-semibold underline underline-offset-2"
                  style={{ color: 'var(--navy)' }}>
                  {text}
                  <span className="material-symbols-outlined text-[14px]">{icon}</span>
                </a>
              ) : (
                <div className="flex-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]" style={{ color: 'var(--ink-muted)' }}>{icon}</span>
                  <p className="text-sm font-mono" style={{ color: 'var(--ink-light)' }}>{text}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs" style={{ color: 'var(--ink-muted)' }}>
          🔒 The API key stays on your machine. It is never sent anywhere except Google's servers.
        </p>
      </div>
    </div>
  )
}
