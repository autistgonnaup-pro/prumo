// src/components/Prumo/AlignmentBadge.jsx

export default function AlignmentBadge({ debuff }) {
  // ✅ Proteção básica para evitar quebras se o objeto debuff estiver ausente
  const estaTorto = !!debuff?.ativo
  const atributosAbaixo = debuff?.atributosAbaixo || []

  if (estaTorto) {
    return (
      <div className="alignment-badge alignment-badge--debuff">
        <span className="alignment-badge__dot" />
        PRUMO TORTO
        {atributosAbaixo.length > 0 && (
          <span className="alignment-badge__detail">
            ({atributosAbaixo.join(', ')} abaixo do piso)
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="alignment-badge">
      <span className="alignment-badge__dot" />
      PRUMO ALINHADO
    </div>
  )
}
