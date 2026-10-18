// src/pages/Dashboard.jsx (esboço)
import { useHabits } from '../hooks/useHabits'
import { useTransactions } from '../hooks/useTransactions'
import { useTasks } from '../hooks/useTasks'
import { useGoals } from '../hooks/useGoals'
import { useHealth } from '../hooks/useHealth'

export default function Dashboard() {
  const { habits } = useHabits()
  const { transacoes } = useTransactions()
  const { tasks } = useTasks()
  const { goals } = useGoals()
  const { ultimoLog } = useHealth()

  const saldo = transacoes.reduce(
    (acc, t) => acc + (t.tipo === 'receita' ? +t.valor : -t.valor), 0
  )
  const habitosHoje = habits.filter(h => h.concluido_hoje).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      <Card title="Hábitos hoje">{habitosHoje}/{habits.length}</Card>
      <Card title="Saldo">{saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Card>
      <Card title="Tarefas pendentes">{tasks.filter(t => !t.concluida).length}</Card>
      {/* ... */}
    </div>
  )
}