export default function FocusBanner({ pendingCount, onViewTasks }) {
  const mensagem =
    pendingCount === 0
      ? 'Tudo em dia! Que tal um hábito extra?'
      : `Você tem ${pendingCount} ${pendingCount === 1 ? 'hábito pendente' : 'hábitos pendentes'}.`

  return (
    <div className="focus-banner">
      <div className="focus-banner__text">
        <h2 className="focus-banner__title">Foco de Hoje</h2>
        <p className="focus-banner__subtitle">{mensagem}</p>
        <button className="focus-banner__btn" onClick={onViewTasks}>
          {pendingCount === 0 ? 'Ver Agenda' : 'Ver Tarefas'}
        </button>
      </div>
      <div className="focus-banner__icon" aria-hidden="true">🎯</div>
    </div>
  )
}