// src/components/Prumo/PrumoLogo.jsx

export default function PrumoLogo({ size = 32, torto = false, color = '#7c3aed' }) {
  return (
    <svg 
      width={size * 0.4} 
      height={size} 
      viewBox="0 0 40 100" 
      fill="none"
      style={{ 
        transform: torto ? 'rotate(2deg)' : 'rotate(0deg)', 
        // ✅ Sets the swing pivot point to the absolute top-center where the string begins
        transformOrigin: '20px 0px', 
        transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)', // Snappier game-like transition
        display: 'block' 
      }}
      aria-label={torto ? "Prumo Torto - Debuff Ativo" : "Prumo Alinhado"}
      role="img"
    >
      {/* Plumb line string */}
      <line x1="20" y1="0" x2="20" y2="70" stroke={color} strokeWidth="2" strokeDasharray="2 2" />
      {/* Plumb bob weight weight */}
      <path d="M20 63 L29 74 L20 90 L11 74 Z" fill={color} />
    </svg>
  )
}




