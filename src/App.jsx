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

  // ✅ NOVO
  useEffect(() => {
    let ativo = true
    let jaResolveu = false

    // Listener PRIMEIRO (fonte de verdade contínua)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!ativo) return
      jaResolveu = true
      setSession(session)
      setLoading(false)
    })

    // getSession como fallback (se nenhum evento disparar em 500ms)
    const timeout = setTimeout(async () => {
      if (jaResolveu) return
      try {
        const { data, error } = await supabase.auth.getSession()
        if (!ativo) return
        if (error) setError(error.message)
        setSession(data.session)
      } catch (err) {
        if (ativo) setError(err.message)
      } finally {
        if (ativo) setLoading(false)
      }
    }, 500)

    return () => {
      ativo = false
      clearTimeout(timeout)
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