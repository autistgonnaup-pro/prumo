import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isRegistering, setIsRegistering] = useState(false) // Alterna entre Login e Cadastro

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isRegistering) {
        // Criar conta
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        alert('Cadastro realizado! Verifique seu email para confirmar (se habilitado).')
      } else {
        // Fazer login
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (err) {
      setError(err.message || 'Ocorreu um erro na autenticação.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Prumo {isRegistering ? ' - Cadastro' : ' - Login'}</h2>
        
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleAuth} style={styles.form}>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Carregando...' : isRegistering ? 'Criar Conta' : 'Entrar'}
          </button>
        </form>

        <p style={styles.toggleText}>
          {isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?'}
          <button 
            type="button" 
            onClick={() => setIsRegistering(!isRegistering)}
            style={styles.toggleButton}
          >
            {isRegistering ? 'Faça login' : 'Cadastre-se'}
          </button>
        </p>
      </div>
    </div>
  )
}

// Estilos básicos (inline para facilitar, mas ideal é mover para um CSS)
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' },
  card: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  title: { textAlign: 'center', marginBottom: '1.5rem', color: '#1f2937' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.75rem', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '1rem' },
  button: { padding: '0.75rem', borderRadius: '4px', border: 'none', backgroundColor: '#3b82f6', color: 'white', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' },
  error: { backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' },
  toggleText: { textAlign: 'center', marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' },
  toggleButton: { background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', marginLeft: '0.5rem', fontWeight: 'bold' }
}