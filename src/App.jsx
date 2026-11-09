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

    // 1. Criar o ouvinte contínuo do Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!ativo) return
      setSession(session)
      setLoading(false)
    })

    // 2. Fallback imediato e assíncrono (sem travar o usuário por 500ms)
    // O getSession pega instantaneamente o que está no cache local do dispositivo
    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (!ativo) return
        if (error) {
          setError(error.message)
        } else if (data.session) {
          setSession(data.session)
        }
      })
      .catch((err) => {
        if (ativo) setError(err.message)
      })
      .finally(() => {
        if (ativo) setLoading(false)
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
