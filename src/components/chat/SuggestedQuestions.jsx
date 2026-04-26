export default function SuggestedQuestions({ questions, onSelect }) {
  if (!questions || questions.length === 0) return null

  return (
    <div className="px-4 py-2 flex flex-wrap gap-2 stagger-children" role="group"
      aria-label="Suggested follow-up questions">
      {questions.map((q, i) => (
        <button key={i} onClick={() => onSelect(q)}
          className="text-xs px-3 py-1.5 rounded-brutal brutal-border-thin brutal-shadow-sm brutal-btn text-left font-medium card-hover"
          style={{ backgroundColor: 'var(--cream)', color: 'var(--ink-light)' }}>
          <span className="mr-1">💡</span>
          {q}
        </button>
      ))}
    </div>
  )
}
