export default function StateEmblem({ className = '', size = 60, hideText = false }) {
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <img
        src="/images/Emblem_of_India.svg"
        alt="State Emblem of India"
        width={size}
        height={size}
        style={{ objectFit: 'contain' }}
        className="opacity-90"
      />
      {!hideText && (
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-navy opacity-80 leading-none">
            सत्यमेव जयते
          </span>
          <span className="text-[8px] font-bold tracking-widest uppercase text-navy opacity-60 mt-0.5">
            Satyameva Jayate
          </span>
        </div>
      )}
    </div>
  )
}
