import { ATRIBUTOS, BLOCOS, PISO } from '../../lib/prumo/constants'

export default function AttributeBar({ attrKey, valor }) {
  const attr = ATRIBUTOS[attrKey]
  const bloco = BLOCOS[attr.bloco]
  const abaixoPiso = valor < PISO
  const noPiso = valor === PISO
  const pct = Math.min(100, (valor / 50) * 100) // escala visual: 50 = barra cheia

  return (
    <div className={`attr-bar attr-bar--${bloco.cor} ${abaixoPiso ? 'attr-bar--danger' : ''}`}>
      <div className="attr-bar__header">
        <span className="attr-bar__icon" aria-hidden="true">{attr.icon}</span>
        <span className="attr-bar__label">{attr.label}</span>
        <span className="attr-bar__value">
          {valor.toFixed(1)}
          {abaixoPiso && <span className="attr-bar__warn"> ▼</span>}
        </span>
      </div>
      <div className="attr-bar__track">
        <div
          className="attr-bar__fill"
          style={{ width: `${pct}%`, backgroundColor: bloco.hex }}
        />
        {/* Marcador do piso */}
        <div
          className="attr-bar__piso"
          style={{ left: `${(PISO / 50) * 100}%` }}
          title={`Piso: ${PISO}`}
        />
      </div>
    </div>
  )
}