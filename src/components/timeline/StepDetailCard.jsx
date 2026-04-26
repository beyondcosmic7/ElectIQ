import { useAppContext } from '../../context/AppContext'
import { ELECTION_STEPS } from '../../data/electionSteps'

export default function StepDetailCard({ step: propStep }) {
  const { state, dispatch } = useAppContext()
  // Support both: passed as prop (inline in TimelineStep) or from context
  const step = propStep || ELECTION_STEPS.find(s => s.id === state.activeStep)
  if (!step) return null

  return (
    <div className="mt-2 ml-6 mr-1 mb-3">
      <div
        className="rounded-brutal brutal-border overflow-hidden shadow-soft"
        style={{ backgroundColor: 'var(--card-bg)' }}
      >
        {/* Tricolor accent */}
        <div 
          className="w-full" 
          style={{ 
            height: '4px',
            background: 'linear-gradient(90deg, var(--saffron) 0%, var(--white) 50%, var(--green) 100%)'
          }} 
        />

        {/* Header */}
        <div className="p-4 pb-3" style={{ background: 'linear-gradient(135deg, var(--cream-warm), var(--cream))', borderBottom: '1.5px solid var(--border-light)' }}>
          <div className="flex items-center gap-2.5 mb-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))', border: '2px solid var(--saffron-dark)' }}
            >
              <span className="material-symbols-outlined filled text-white text-[16px]">{step.icon}</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: 'var(--saffron-dark)' }}>
                Phase {step.phase}
              </span>
              <h3 className="font-display font-bold text-base leading-tight" style={{ color: 'var(--navy)' }}>
                {step.title}
              </h3>
            </div>
          </div>
          <p className="text-xs font-medium" style={{ color: 'var(--ink-muted)' }}>{step.subtitle}</p>
        </div>

        {/* Content body */}
        <div className="p-4 space-y-4">
          {/* Short description */}
          <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--ink)' }}>
            {step.shortDescription}
          </p>

          {/* Full description */}
          {step.fullDescription && (
            <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: 'var(--ink-light)' }}>
              {step.fullDescription}
            </p>
          )}

          {/* Optional Featured Image */}
          {step.image && (
            <div className="rounded-xl overflow-hidden brutal-border mt-3 mb-1 animate-fade-in flex flex-col sm:flex-row items-center gap-3 p-3"
                 style={{ backgroundColor: 'var(--cream)', border: '1.5px solid var(--border-light)' }}>
              <img 
                src={step.image.url} 
                alt={step.image.alt}
                className="w-20 h-auto rounded-lg shadow-sm object-contain brutal-border-thin"
              />
              <p className="text-xs font-medium italic leading-relaxed flex-1" style={{ color: 'var(--ink-muted)' }}>
                 {step.image.caption}
              </p>
            </div>
          )}

          {/* Timing badge */}
          {step.estimatedTime && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg animate-fade-in"
              style={{ background: 'linear-gradient(135deg, rgba(255,153,51,0.08), rgba(255,153,51,0.03))', border: '1px solid rgba(255,153,51,0.2)' }}>
              <span className="material-symbols-outlined text-[16px]" style={{ color: 'var(--saffron)' }}>schedule</span>
              <div>
                <p className="text-[10px] font-bold uppercase" style={{ color: 'var(--saffron-dark)' }}>Timing</p>
                <p className="text-xs font-medium" style={{ color: 'var(--ink-light)' }}>{step.estimatedTime}</p>
              </div>
            </div>
          )}

          {/* Steps to follow */}
          {step.steps?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide mb-2 flex items-center gap-1.5" style={{ color: 'var(--navy)' }}>
                <span className="material-symbols-outlined text-[14px]">format_list_numbered</span>
                Steps to Follow
              </h4>
              <ol className="space-y-1.5 stagger-children">
                {step.steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--ink-light)' }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-extrabold mt-0.5"
                      style={{ background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))', color: '#FFF' }}>
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Eligibility */}
          {step.eligibility?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide mb-2 flex items-center gap-1.5" style={{ color: 'var(--navy)' }}>
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                Eligibility
              </h4>
              <ul className="space-y-1.5">
                {step.eligibility.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--ink-light)' }}>
                    <span className="material-symbols-outlined filled text-[12px] mt-0.5 shrink-0" style={{ color: 'var(--green)' }}>check_circle</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Documents */}
          {step.documents?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide mb-2 flex items-center gap-1.5" style={{ color: 'var(--navy)' }}>
                <span className="material-symbols-outlined text-[14px]">description</span>
                Documents Required
              </h4>
              <ul className="space-y-1.5">
                {step.documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--ink-light)' }}>
                    <span className="material-symbols-outlined text-[12px] mt-0.5 shrink-0" style={{ color: 'var(--saffron)' }}>folder_open</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQs — mini accordions */}
          {step.faqs?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide mb-2 flex items-center gap-1.5" style={{ color: 'var(--navy)' }}>
                <span className="material-symbols-outlined text-[14px]">quiz</span>
                Common Questions
              </h4>
              <div className="space-y-2">
                {step.faqs.map((faq, i) => (
                  <details key={i} className="group">
                    <summary
                      className="flex items-center gap-2 text-xs font-semibold cursor-pointer list-none px-3 py-2 rounded-lg transition-all duration-200 hover:shadow-soft"
                      style={{ backgroundColor: 'var(--cream)', color: 'var(--ink)', border: '1px solid var(--border-light)' }}
                    >
                      <span className="material-symbols-outlined text-[14px] transition-transform duration-200 group-open:rotate-90" style={{ color: 'var(--saffron)' }}>
                        chevron_right
                      </span>
                      <span className="flex-1">{faq.q}</span>
                      <span className="material-symbols-outlined text-[12px]" style={{ color: 'var(--ink-muted)' }}>expand_more</span>
                    </summary>
                    <p className="text-xs px-3 py-2.5 ml-6 leading-relaxed animate-fade-in" style={{ color: 'var(--ink-muted)' }}>
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Official links */}
          {step.officialLinks?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {step.officialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-brutal text-xs font-bold brutal-border-thin brutal-shadow-sm brutal-btn"
                  style={{ backgroundColor: 'var(--cream)', color: 'var(--navy)' }}
                >
                  <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Close footer */}
        <div className="px-4 pb-3">
          <button
            onClick={() => dispatch({ type: 'SET_ACTIVE_STEP', payload: null })}
            className="w-full py-2 rounded-brutal brutal-border-thin text-xs font-bold brutal-btn transition-all duration-200"
            style={{ backgroundColor: 'var(--cream-warm)', color: 'var(--ink-muted)' }}
          >
            <span className="flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">expand_less</span>
              Collapse
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
