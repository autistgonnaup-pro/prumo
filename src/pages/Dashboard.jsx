// src/pages/Dashboard.jsx
import { useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { useHabits } from '../hooks/useHabits'
import { useTransactions } from '../hooks/useTransactions'
import { useTasks } from '../hooks/useTasks'
import { useGoals } from '../hooks/useGoals'

// Formatter instanciado uma vez fora do componente (evita recriar a cada render)
const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export default function Dashboard() {
  const { habits } = useHabits()
  const { transacoes } = useTransactions()
  const { tasks } = useTasks()
  const { goals } = useGoals()

  const resumo = useMemo(() => {
    const saldo = transacoes.reduce((acc, t) => {
      const valor = Number(t.valor) || 0
      return acc + (t.tipo === 'receita' ? valor : -valor)
    }, 0)

    return {
      habitosHoje: habits.filter(h => h.concluido_hoje).length,
      saldo,
      tarefasPendentes: tasks.filter(t => !t.concluida).length,
      metasConcluidas: goals.filter(g => g.concluida).length,
    }
  }, [habits, transacoes, tasks, goals])

  return (
    <div className="min-h-screen bg-bg p-6">
      <h1 className="text-2xl font-bold text-ink mb-6">Prumosssssss</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-ink/60">Hábitos hoje</p>
          <p className="text-xl font-bold text-ink">
            {resumo.habitosHoje}/{habits.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-ink/60">Saldo</p>
          <p className="text-xl font-bold text-ink">{brl.format(resumo.saldo)}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-ink/60">Tarefas pendentes</p>
          <p className="text-xl font-bold text-ink">{resumo.tarefasPendentes}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-ink/60">Metas</p>
          <p className="text-xl font-bold text-ink">
            {resumo.metasConcluidas}/{goals.length}
          </p>
        </div>
      </div>

      <Outlet />
    </div>
  )
}