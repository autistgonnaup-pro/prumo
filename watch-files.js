import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isRegistering, setIsRegistering] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isRegistering) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        alert('Cadastro realizado! Verifique seu email para confirmar (se habilitado).')
      } else {
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
        
        {/* Cabeçalho Discreto */}
        <div style={styles.header}>
          <span style={styles.symbol}>❖</span>
          <h2 style={styles.title}>
            {isRegistering ? 'Criar Conta' : 'Acesso ao Prumo'}
          </h2>
          <span style={styles.subtitle}>
            {isRegistering ? 'Junte-se ao grimório.' : 'Identifique-se para continuar.'}
          </span>
        </div>

        {/* Aviso de Erro */}
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleAuth} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>E-mail</label>
            <input
              type="email"
              placeholder="mago@prumo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading
              ? 'Aguarde...'
              : isRegistering
                ? 'Cadastrar'
                : 'Entrar'}
          </button>
        </form>

        {/* Rodapé do Card (Alternância) */}
        <div style={styles.footer}>
          <span style={styles.footerText}>
            {isRegistering ? 'Já possui uma conta?' : 'Ainda não tem acesso?'}
          </span>
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            style={styles.toggleButton}
          >
            {isRegistering ? 'Fazer login' : 'Cadastre-se'}
          </button>
        </div>

      </div>
    </div>
  )
}

// ============================================================
// ESTILOS — TEMA DISCRETO (DARK FANTASY / CORPORATIVO)
// ============================================================
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#121212', // Fundo escuro quase preto
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    backgroundColor: '#1E1E1E', // Cinza escuro (pedra)
    border: '1px solid #333333',
    borderRadius: '8px',
    padding: '2.5rem 2rem',
    width: '100%',
    maxWidth: '380px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  symbol: {
    color: '#8B7355', // Tom de bronze envelhecido (bem discreto)
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
  title: {
    color: '#E0E0E0',
    fontSize: '1.25rem',
    fontWeight: '500',
    margin: '0 0 0.25rem 0',
    letterSpacing: '0.05rem',
    fontFamily: '"Cinzel", "Georgia", serif', // Fonte serifada apenas no título
  },
  subtitle: {
    color: '#888888',
    fontSize: '0.85rem',
  },
  error: {
    backgroundColor: 'rgba(122, 31, 31, 0.15)',
    borderLeft: '3px solid #7a1f1f',
    color: '#e57373',
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    marginBottom: '1.5rem',
    fontSize: '0.85rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    color: '#AAAAAA',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08rem',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#121212',
    border: '1px solid #333333',
    borderRadius: '4px',
    padding: '0.75rem',
    color: '#E0E0E0',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  button: {
    backgroundColor: '#E0E0E0', // Botão claro (contraste) ou poderia ser o tom de bronze
    color: '#121212',
    border: 'none',
    borderRadius: '4px',
    padding: '0.85rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    letterSpacing: '0.05rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'opacity 0.2s ease',
  },
  footer: {
    marginTop: '2rem',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.85rem',
  },
  footerText: {
    color: '#888888',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#A68A64', // Cor de destaque (bronze suave)
    cursor: 'pointer',
    fontWeight: '600',
    padding: 0,
    fontSize: '0.85rem',
    fontFamily: 'inherit',
  },
}