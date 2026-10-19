import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { FiLogOut } from 'react-icons/fi'

export default function Topbar({ title }) {
  const { user } = useAuth()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    // ProtectedRoute + onAuthStateChange redirecionam automaticamente
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 hidden sm:inline">
          {user?.email}
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <FiLogOut size={16} />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  )
}