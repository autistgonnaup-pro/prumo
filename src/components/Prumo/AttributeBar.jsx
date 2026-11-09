// src/components/Prumo/AttributeBar.jsx
import { ATRIBUTOS, BLOCOS, PISO } from '../../lib/prumo/constants'

export default function AttributeBar({ attrKey, valor }) {
  // ✅ Fallbacks defensivos para evitar quebras por referências nulas
  const attr = ATRIBUTOS[attrKey] || { icon: '❓', label: attrKey, bloco: 'geral' }
  const bloco = BLOCOS[attr.bloco] || { cor: 'neutral', hex: '#94a3b8' }
  
  const valorSeguro = typeof valor === 'number' ? valor : 0
  const abaixoPiso = valorSeguro < PISO
  
  // ✅ Escala corrigida para base 100 de acordo com o teto do motor do RPG
  const pct = Math.min(100, (valorSeguro / 100) * 100) 
  const posicaoPiso = (PISO / 100) * 100

  return (
    <div className={`attr-bar attr-bar--${bloco.cor || 'neutral'} ${abaixoPiso ? 'attr-bar--danger' : ''}`}>
      <div className="attr-bar__header">
        <span className="attr-bar__icon" aria-hidden="true">{attr.icon}</span>
        <span className="attr-bar__label">{attr.label}</span>
        <span className="attr-bar__value">
          {valorSeguro.toFixed(1)}
          {abaixoPiso && <span className="attr-bar__warn"> ▼</span>}
        </span>
      </div>
      <div className="attr-bar__track">
        <div
          className="attr-bar__fill"
          style={{ width: `${pct}%`, backgroundColor: bloco.hex }}
        />
        {/* Marcador do piso posicionado na escala real correta */}
        <div
          className="attr-bar__piso"
          style={{ left: `${posicaoPiso}%` }}
          title={`Piso: ${PISO}`}
        />
      </div>
    </div>
  )
}
