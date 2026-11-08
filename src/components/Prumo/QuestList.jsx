import QuestCard from './QuestCard'

export default function QuestList({ titulo, subtitulo, missoes, onConcluir, onDesfazer }) {
  return (
    <section className="quest-list">
      <div className="quest-list__header">
        <h2 className="quest-list__title">{titulo}</h2>
        {subtitulo && <p className="quest-list__subtitle">{subtitulo}</p>}
      </div>
      <div className="quest-list__items">
        {missoes.map((m) => (
          <QuestCard
            key={m.id}
            missao={m}
            onConcluir={onConcluir}
            onDesfazer={onDesfazer}
          />
        ))}
      </div>
    </section>
  )
}