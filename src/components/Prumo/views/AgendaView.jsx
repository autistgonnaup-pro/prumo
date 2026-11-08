import { ATRIBUTOS, BLOCOS } from '../../../lib/prumo/constants'

export default function AgendaView({ derivados, concluir, desfazer }) {
  const { dailies, weeklies } = derivados
  const totalDailies = dailies.length
  const feitasDailies = dailies.filter((m) => m.concluida).length
  const totalWeeklies = weeklies.length
  const feitasWeeklies = weeklies.filter((m) => m.concluida).length

  return (
    <div className="view">
      <h1 className="view__title">Agenda</h1>
      <p className="view__subtitle">
        Seus ciclos de manutenção. Dailies resetam à meia-noite, weeklies aos domingos.
      </p>

      <div className="agenda-summary">
        <div className="agenda-summary__item">
          <span className="agenda-summary__label">Dailies de hoje</span>
          <strong className="agenda-summary__value">
            {feitasDailies} <span className="muted">/ {totalDailies}</span>
          </strong>
          <div className="agenda-summary__bar">
            <div
              className="agenda-summary__fill"
              style={{ width: `${totalDailies ? (feitasDailies / totalDailies) * 100 : 0}%` }}
            />
          </div>
        </div>
        <div className="agenda-summary__item">
          <span className="agenda-summary__label">Weeklies</span>
          <strong className="agenda-summary__value">
            {feitasWeeklies} <span className="muted">/ {totalWeeklies}</span>
          </strong>
          <div className="agenda-summary__bar">
            <div
              className="agenda-summary__fill agenda-summary__fill--verde"
              style={{ width: `${totalWeeklies ? (feitasWeeklies / totalWeeklies) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      <section className="agenda-section">
        <h2 className="agenda-section__title">
          ⚔️ Dailies <span className="muted">(resetam à meia-noite)</span>
        </h2>
        <div className="agenda-list">
          {dailies.map((m) => (
            <MissaoRow key={m.id} missao={m} onToggle={m.concluida ? desfazer : concluir} />
          ))}
        </div>
      </section>

      <section className="agenda-section">
        <h2 className="agenda-section__title">
          🏰 Weeklies <span className="muted">(resetam domingo)</span>
        </h2>
        <div className="agenda-list">
          {weeklies.map((m) => (
            <MissaoRow key={m.id} missao={m} onToggle={m.concluida ? desfazer : concluir} />
          ))}
        </div>
      </section>
    </div>
  )
}

function MissaoRow({ missao, onToggle }) {
  const attr = ATRIBUTOS[missao.atributo]
  const bloco = BLOCOS[attr.bloco]
  return (
    <div className={`missao-row ${missao.concluida ? 'missao-row--done' : ''}`}>
      <div
        className="missao-row__icon"
        style={{ backgroundColor: bloco.hex + '20', color: bloco.hex }}
      >
        {attr.icon}
      </div>
      <div className="missao-row__body">
        <p className="missao-row__titulo">{missao.titulo}</p>
        <p className="missao-row__desc">{missao.descricao}</p>
        <div className="missao-row__rewards">
          <span>+{missao.recompensa.atributo} {attr.key}</span>
          <span>+{missao.recompensa.xp} XP</span>
          <span>+{missao.recompensa.tokens} 🪙</span>
          {missao.recompensa.mana > 0 && (
            <span className="missao-row__mana">−{missao.recompensa.mana} 💠</span>
          )}
        </div>
      </div>
      <button
        className={`missao-row__btn ${missao.concluida ? 'missao-row__btn--done' : ''}`}
        onClick={() => onToggle(missao.id)}
        aria-pressed={missao.concluida}
      >
        {missao.concluida ? '✓' : '○'}
      </button>
    </div>
  )
}