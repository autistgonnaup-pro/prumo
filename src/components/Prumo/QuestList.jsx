// src/components/Prumo/QuestList.jsx
import QuestCard from './QuestCard'

export default function QuestList({ titulo, subtitulo, missoes, onConcluir, onDesfazer }) {
  // ✅ Defensive array fallback allocation prevents .map() from throwing errors if null
  const activeQuests = missoes || []

  return (
    <section className="quest-list">
      <div className="quest-list__header">
        <h2 className="quest-list__title">{titulo || 'Missões'}</h2>
        {subtitulo && <p className="quest-list__subtitle">{subtitulo}</p>}
      </div>
      
      {activeQuests.length === 0 ? (
        <div className="quest-list__empty">
          <p>Nenhuma missão disponível nesta categoria.</p>
        </div>
      ) : (
        <div className="quest-list__items">
          {activeQuests.map((m, index) => (
            <QuestCard
              // ✅ Dynamic key tracking prevents runtime rendering errors if m.id is missing
              key={m?.id || `quest-${index}`}
              missao={m}
              onConcluir={onConcluir}
              onDesfazer={onDesfazer}
            />
          ))}
        </div>
      )}
    </section>
  )
}
