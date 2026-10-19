import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

// Mapa rota → título
const titles = {
  '/app':          'Painel Central',
  '/app/financas': 'Finanças',
  '/app/habitos':  'Hábitos',
  '/app/metas':    'Metas',
  '/app/tarefas':  'Tarefas',
  '/app/saude':    'Saúde & Bem-estar',
}

export default function AppLayout() {
  const { pathname } = useLocation()
  const title = titles[pathname] ?? 'Prumo'

  return (
    <div className="min-h-screen flex bg-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={title} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}