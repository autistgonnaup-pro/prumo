// src/components/Prumo/QuestCard.jsx
import { ATRIBUTOS, BLOCOS } from '../../lib/prumo/constants'

export default function QuestCard({ missao, onConcluir, onDesfazer }) {
  // ✅ Defensive handling for unmapped or missing attributes/blocks
  const attr = ATRIBUTOS[missao?.atributo] || { icon: '❓', key: 'ST', bloco: 'geral' }
  const bloco = BLOCOS[attr.bloco] || { cor: 'neutral' }
  
  const concluida = !!missao?.concluida
  const questId = missao?.id

  // ✅ Safe extractions of nested numerical primitives
  const recompensaAtributo = missao?.recompensa?.atributo || 0
  const recompensaXp = missao?.recompensa?.xp || 0
  const recompensaTokens = missao?.recompensa?.tokens || 0
  const custoMana = missao?.recompensa?.mana || 0

  return (
    <div className={`quest-card ${concluida ? 'quest-card--done' : ''}`}>
      <div className="quest-card__header">
        <span className="quest-card__icon" aria-hidden="true">{attr.icon}</span>
        <div className="quest-card__title-wrap">
          <h3 className="quest-card__title">{missao?.titulo || 'Missão Sem Nome'}</h3>
          <p className="quest-card__desc">{missao?.descricao || 'Sem descrição cadastrada.'}</p>
        </div>
        <span className={`quest-card__badge quest-card__badge--${bloco.cor || 'neutral'}`}>
          {attr.key}
        </span>
      </div>

      <div className="quest-card__rewards">
        <span>+{recompensaAtributo} {attr.key}</span>
        <span>+{recompensaXp} XP</span>
        <span>+{recompensaTokens} 🪙</span>
        {custoMana > 0 && (
          <span className="quest-card__mana-cost">−{custoMana} 💠</span>
        )}
      </div>

      <button
        className={`quest-card__btn ${concluida ? 'quest-card__btn--done' : ''}`}
        onClick={() => (concluida ? onDesfazer(questId) : onConcluir(questId))}
        aria-pressed={concluida}
        disabled={!questId} // Prevents calling functions with undefined IDs
      >
        {concluida ? '✓ Concluída' : 'Concluir'}
      </button>
    </div>
  )
}



