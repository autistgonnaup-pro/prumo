import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import FocusBanner from './FocusBanner'
import CategoryGrid from './CategoryGrid'
import HabitCard from './HabitCard'
import BottomNav from './BottomNav'
import './Dashboard.css'

// Dados estáticos (fáceis de trocar por fetch depois)
const CATEGORIES = [
  { id: 'trabalho', name: 'Trabalho', icon: '💼', color: '#e0e7ff' },
  { id: 'estudos', name: 'Estudos', icon: '📚', color: '#fef3c7' },
  { id: 'saude', name: 'Saúde', icon: '❤️', color: '#fee2e2' },
  { id: 'financas', name: 'Finanças', icon: '💰', color: '#dcfce7' },
  { id: 'academia', name: 'Academia', icon: '🏋️', color: '#f3e8ff' },
]

const HABITS = [
  { id: 'agua', title: 'Beber Água', time: '2L', icon: '💧' },
  { id: 'ler', title: 'Ler um livro', time: '20 min', icon: '📖' },
  { id: 'meditar', title: 'Meditar', time: '10 min', icon: '🧘' },
  { id: 'exercicio', title: 'Exercício', time: '30 min', icon: '🏃' },
]

const NAV_TABS = [
  { id: 'inicio', label: 'Início', icon: '🏠' },
  { id: 'agenda', label: 'Agenda', icon: '📅' },
  { id: 'metas', label: 'Metas', icon: '🎯' },
  { id: 'perfil', label: 'Perfil', icon: '👤' },
]

export default function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState('inicio')
  const [loggingOut, setLoggingOut] = useState(false)
  const [completedHabits, setCompletedHabits] = useState({})

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (err) {
      console.error('Erro ao sair:', err)
      setLoggingOut(false)
    }
  }

  const toggleHabit = (id) => {
    setCompletedHabits((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Blindagem caso user venha nulo
  const nomeUsuario = user?.email?.split('@')[0] ?? 'viajante'
  const hora = new Date().getHours()
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'

  const completedCount = Object.values(completedHabits).filter(Boolean).length
  const pendingCount = HABITS.length - completedCount

  return (
    <div className="dashboard-page">
      <div className="dashboard">
        {/* HEADER */}
        <header className="dashboard-header">
          <div>
            <p className="dashboard-greeting">
              {saudacao}, {nomeUsuario}
            </p>
            <h1 className="dashboard-title">Minha Rotina</h1>
          </div>
          <button
            onClick={handleLogout}
            className="icon-btn"
            aria-label="Sair da conta"
            title="Sair"
            disabled={loggingOut}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </header>

        {/* MAIN */}
        <main className="dashboard-main">
          {activeTab === 'inicio' && (
            <>
              <FocusBanner
                pendingCount={pendingCount}
                onViewTasks={() => setActiveTab('agenda')}
              />

              <h2 className="section-title">Categorias</h2>
              <CategoryGrid categories={CATEGORIES} />

              <h2 className="section-title">Hábitos Diários</h2>
              <div className="habit-scroll">
                {HABITS.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    completed={!!completedHabits[habit.id]}
                    onToggle={() => toggleHabit(habit.id)}
                  />
                ))}
              </div>
            </>
          )}

          {activeTab !== 'inicio' && (
            <div style={{ padding: '2rem 0', textAlign: 'center', color: '#6b7280' }}>
              <p>🚧 A aba <strong>{activeTab}</strong> estará disponível em breve.</p>
            </div>
          )}
        </main>

        {/* BOTTOM NAV */}
        <BottomNav
          tabs={NAV_TABS}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>
    </div>
  )
}