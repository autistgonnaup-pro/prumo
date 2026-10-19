// src/pages/Dashboard.jsx
import { Outlet } from 'react-router-dom'
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
    (acc, t) => acc + (t.tipo === 'receita' ? +t.valor : -t.valor),
    0
  )
  const habitosHoje = habits.filter(h => h.concluido_hoje).length

  return (
    <div className="min-h-screen bg-bg p-6">
      {/* Cabeçalho do painel */}
      <h1 className="text-2xl font-bold text-ink mb-6">Prumo</h1>

      {/* Resumos rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-ink/60">Hábitos hoje</p>
          <p className="text-xl font-bold text-ink">{habitosHoje}/{habits.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-ink/60">Saldo</p>
          <p className="text-xl font-bold text-ink">
            {saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-ink/60">Tarefas pendentes</p>
          <p className="text-xl font-bold text-ink">
            {tasks.filter(t => !t.concluida).length}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-ink/60">Metas</p>
          <p className="text-xl font-bold text-ink">
            {goals.filter(g => g.concluida).length}/{goals.length}
          </p>
        </div>
      </div>

      {/* Aqui as subpáginas aparecem */}
      <Outlet />
    </div>
  )
}