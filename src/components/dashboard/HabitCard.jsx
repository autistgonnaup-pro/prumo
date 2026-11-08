export default function HabitCard({ habit, completed, onToggle }) {
  return (
    <div className="habit-card">
      <div className="habit-card__icon" aria-hidden="true">{habit.icon}</div>
      <h3 className="habit-card__title">{habit.title}</h3>
      <p className="habit-card__time">{habit.time}</p>
      <button
        type="button"
        className="habit-card__check"
        onClick={onToggle}
        aria-pressed={completed}
        aria-label={
          completed
            ? `Desmarcar ${habit.title} como concluído`
            : `Marcar ${habit.title} como concluído`
        }
      >
        {completed ? '✓ Concluído' : 'Marcar ✓'}
      </button>
    </div>
  )
}