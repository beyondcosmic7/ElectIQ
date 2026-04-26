export default function EciLogo({ className = '', size = 40 }) {
  return (
    <img
      src="/images/eci-official-logo.png"
      alt="Election Commission of India emblem"
      width={size}
      height={size * 1.2}
      className={className}
      style={{ objectFit: 'contain' }}
      role="img"
      aria-label="Election Commission of India emblem"
    />
  )
}
