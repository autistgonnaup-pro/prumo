import { ATRIBUTOS, BLOCOS } from '../../lib/prumo/constants'

export default function QuestCard({ missao, onConcluir, onDesfazer }) {
  const attr = ATRIBUTOS[missao.atributo]
  const bloco = BLOCOS[attr.bloco]
  const concluida = missao.concluida
  const custoMana = missao.recompensa.mana

  return (
    <div className={`quest-card ${concluida ? 'quest-card--done' : ''}`}>
      <div className="quest-card__header">
        <span className="quest-card__icon" aria-hidden="true">{attr.icon}</span>
        <div className="quest-card__title-wrap">
          <h3 className="quest-card__title">{missao.titulo}</h3>
          <p className="quest-card__desc">{missao.descricao}</p>
        </div>
        <span className={`quest-card__badge quest-card__badge--${bloco.cor}`}>
          {attr.key}
        </span>
      </div>

      <div className="quest-card__rewards">
        <span>+{missao.recompensa.atributo} {attr.key}</span>
        <span>+{missao.recompensa.xp} XP</span>
        <span>+{missao.recompensa.tokens} 🪙</span>
        {custoMana > 0 && (
          <span className="quest-card__mana-cost">−{custoMana} 💠</span>
        )}
      </div>

      <button
        className={`quest-card__btn ${concluida ? 'quest-card__btn--done' : ''}`}
        onClick={() => (concluida ? onDesfazer(missao.id) : onConcluir(missao.id))}
        aria-pressed={concluida}
      >
        {concluida ? '✓ Concluída' : 'Concluir'}
      </button>
    </div>
  )
}