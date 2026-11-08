import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Login from './components/login/Login'
import Dashboard from './components/Dashboard'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Verifica a sessão atual quando a página carrega
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // 2. Escuta mudanças na autenticação (login, logout, etc)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Carregando...</div>
  }

  // Se não houver sessão, mostra a tela de Login
  if (!session) {
    return <Login />
  }

  // Se houver sessão, mostra o Dashboard passando os dados do usuário
  return <Dashboard user={session.user} />
}

export default App
