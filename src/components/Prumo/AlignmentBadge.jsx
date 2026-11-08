import { BLOCOS } from '../../lib/prumo/constants'

export default function AlignmentBadge({ debuff }) {
  if (debuff.ativo) {
    return (
      <div className="alignment-badge alignment-badge--debuff">
        <span className="alignment-badge__dot" />
        PRUMO TORTO
        <span className="alignment-badge__detail">
          ({debuff.atributosAbaixo.join(', ')} abaixo do piso)
        </span>
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