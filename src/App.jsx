// src/App.jsx
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Login from './components/login/Login'
import Dashboard from './components/dashboard/Dashboard'
import PrumoLogo from './components/Prumo/PrumoLogo'
import './styles/tokens.css'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ativo = true

    // 1. Busca a sessão atual
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (!ativo) return
        if (error) setError(error.message)
        setSession(session)
      })
      .catch((err) => {
        if (ativo) setError(err.message || 'Falha ao carregar sessão')
      })
      .finally(() => {
        if (ativo) setLoading(false)
      })

    // 2. Escuta mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!ativo) return
      setSession(session)
    })

    return () => {
      ativo = false
      subscription.unsubscribe()
    }
  }, [])

  // ============ TELA DE CARREGAMENTO ============
  if (loading) {
    return (
      <div className="app-loading">
        <PrumoLogo size={64} />
        <p>Alinhando prumo...</p>
      </div>
    )
  }

  // ============ ERRO GLOBAL ============
  if (error) {
    return (
      <div className="app-error">
        <h2>Algo travou o motor</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Recarregar</button>
      </div>
    )
  }

  // ============ LOGIN ============
  if (!session) {
    return <Login />
  }

  // ============ APP ============
  return <Dashboard user={session.user} />
}

export default App