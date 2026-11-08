import { MANA_MAX } from '../../lib/prumo/constants'

export default function ManaBar({ mana }) {
  const pct = (mana / MANA_MAX) * 100
  const baixa = mana < 20
  return (
    <div className={`mana-bar ${baixa ? 'mana-bar--low' : ''}`}>
      <div className="mana-bar__header">
        <span>💠 Mana</span>
        <span>{mana}/{MANA_MAX}</span>
      </div>
      <div className="mana-bar__track">
        <div className="mana-bar__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}