import { NavLink } from 'react-router-dom'
import {
  FiHome, FiDollarSign, FiCheckCircle,
  FiTarget, FiCheckSquare, FiActivity,
} from 'react-icons/fi'

const items = [
  { to: '/app',           label: 'Painel',   icon: FiHome,         end: true },
  { to: '/app/financas',  label: 'Finanças', icon: FiDollarSign },
  { to: '/app/habitos',   label: 'Hábitos',  icon: FiCheckCircle },
  { to: '/app/metas',     label: 'Metas',    icon: FiTarget },
  { to: '/app/tarefas',   label: 'Tarefas',  icon: FiCheckSquare },
  { to: '/app/saude',     label: 'Saúde',    icon: FiActivity },
]

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <h1 className="text-xl font-bold text-primary">Prumo</h1>
        <p className="text-xs text-gray-500 mt-0.5">Seu painel de vida</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}