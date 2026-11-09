// src/components/Prumo/ManaBar.jsx
import { MANA_MAX } from '../../lib/prumo/constants'

export default function ManaBar({ mana }) {
  // ✅ Garante que o valor seja sempre um número válido
  const manaSegura = typeof mana === 'number' ? mana : 0
  const limiteMaximo = MANA_MAX || 100 // Fallback caso a constante falhe

  // ✅ Trava o preenchimento rigidamente entre 0% e 100% para não quebrar o layout
  const pctCalculado = (manaSegura / limiteMaximo) * 100
  const pct = Math.min(100, Math.max(0, pctCalculado))
  
  const baixa = manaSegura < 20

  return (
    <div className={`mana-bar ${baixa ? 'mana-bar--low' : ''}`}>
      <div className="mana-bar__header">
        <span>💠 Mana</span>
        <span>{manaSegura}/{limiteMaximo}</span>
      </div>
      <div className="mana-bar__track">
        <div className="mana-bar__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
