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
      {/* Runas decorativas no fundo */}
      <span style={styles.runeLeft}>~ ~ ~</span>
      <span style={styles.runeRight}>~ ~ ~</span>

      <div style={styles.card}>
        {/* Ornamento superior do grimório */}
        <div style={styles.grimoireHeader}>
          <span style={styles.rune}>~ ~ ~  G R I M O I R E   D O   P R U M O  ~ ~ ~</span>
        </div>

        <div style={styles.cardInner}>
          {/* Brasão / Portão do Mago */}
          <div style={styles.crest}>[ &lt;&gt; ]</div>
          <h2 style={styles.title}>
            {isRegistering ? 'PORTÃO DO MAGO — Cadastro' : 'PORTÃO DO MAGO — Login'}
          </h2>
          <div style={styles.divider}>+ - - - - - - - - - - - - - - - - +</div>

          {/* Pergaminho de aviso (erro) */}
          {error && (
            <div style={styles.error}>
              !! UM FEITIÇO FALHOU !!
              <div style={styles.errorMessage}>{error}</div>
            </div>
          )}

          <form onSubmit={handleAuth} style={styles.form}>
            <label style={styles.label}>&gt; Nome Arcano (e-mail)</label>
            <input
              type="email"
              placeholder="seu@pergaminho.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />

            <label style={styles.label}>&gt; Palavra Secreta (senha)</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />

            <button type="submit" disabled={loading} style={styles.button}>
              {loading
                ? '~ Conjurando... ~'
                : isRegistering
                  ? '~ Forjar Conta ~'
                  : '~ Entrar na Guilda ~'}
            </button>
          </form>

          <div style={styles.divider}>+ - - - - - - - - - - - - - - - - +</div>

          <p style={styles.toggleText}>
            {isRegistering ? 'Já é iniciado?' : 'Ainda sem pergaminho?'}
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              style={styles.toggleButton}
            >
              {isRegistering ? 'Fazer login' : 'Aprender as Artes'}
            </button>
          </p>
        </div>

        {/* Ornamento inferior */}
        <div style={styles.grimoireFooter}>
          <span style={styles.rune}>*  *  *</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// ESTILOS — TEMA RPG / GRIMÓRIO DO PRUMO
// ============================================================
const parchment = '#f4e4c1'
const parchmentDark = '#e8d3a8'
const ink = '#3b2a1a'
const inkSoft = '#5c4a33'
const gold = '#c9a227'
const bloodRed = '#7a1f1f'
const bloodRedBg = '#f2d6d6'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background:
      'radial-gradient(circle at 50% 30%, #2b1d12 0%, #1a120a 60%, #0d0905 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '"Cinzel", "Georgia", serif',
  },
  runeLeft: {
    position: 'absolute',
    top: '50%',
    left: '4%',
    color: gold,
    opacity: 0.25,
    fontSize: '2rem',
    letterSpacing: '0.5rem',
    transform: 'rotate(-90deg)',
    userSelect: 'none',
  },
  runeRight: {
    position: 'absolute',
    top: '50%',
    right: '4%',
    color: gold,
    opacity: 0.25,
    fontSize: '2rem',
    letterSpacing: '0.5rem',
    transform: 'rotate(90deg)',
    userSelect: 'none',
  },
  card: {
    backgroundColor: parchment,
    backgroundImage:
      'repeating-linear-gradient(0deg, rgba(120,90,50,0.04) 0px, rgba(120,90,50,0.04) 2px, transparent 2px, transparent 6px)',
    border: `2px solid ${ink}`,
    outline: `1px solid ${gold}`,
    outlineOffset: '-6px',
    borderRadius: '6px',
    boxShadow:
      '0 0 0 4px rgba(201,162,39,0.15), 0 20px 40px rgba(0,0,0,0.6), inset 0 0 40px rgba(120,90,50,0.15)',
    width: '100%',
    maxWidth: '420px',
    padding: '1.5rem 1.75rem 1.25rem',
    color: ink,
    position: 'relative',
  },
  grimoireHeader: {
    textAlign: 'center',
    borderBottom: `1px solid ${inkSoft}`,
    paddingBottom: '0.6rem',
    marginBottom: '1rem',
  },
  grimoireFooter: {
    textAlign: 'center',
    borderTop: `1px solid ${inkSoft}`,
    paddingTop: '0.6rem',
    marginTop: '1rem',
  },
  rune: {
    color: gold,
    letterSpacing: '0.25rem',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    textShadow: `0 1px 0 ${ink}`,
  },
  cardInner: {
    textAlign: 'center',
  },
  crest: {
    color: gold,
    fontSize: '1.4rem',
    letterSpacing: '0.5rem',
    marginBottom: '0.25rem',
    textShadow: `0 1px 0 ${ink}`,
  },
  title: {
    fontSize: '1.05rem',
    letterSpacing: '0.15rem',
    textTransform: 'uppercase',
    color: ink,
    margin: '0 0 0.75rem',
  },
  divider: {
    color: inkSoft,
    opacity: 0.5,
    fontSize: '0.75rem',
    letterSpacing: '0.1rem',
    margin: '0.75rem 0',
    userSelect: 'none',
  },
  error: {
    backgroundColor: bloodRedBg,
    border: `1px solid ${bloodRed}`,
    color: bloodRed,
    padding: '0.6rem 0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
    fontSize: '0.8rem',
    letterSpacing: '0.08rem',
    fontWeight: 'bold',
  },
  errorMessage: {
    marginTop: '0.35rem',
    fontWeight: 'normal',
    letterSpacing: 'normal',
    color: '#5c1414',
    fontSize: '0.78rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    textAlign: 'left',
  },
  label: {
    fontSize: '0.78rem',
    color: inkSoft,
    letterSpacing: '0.08rem',
    fontWeight: 'bold',
    marginTop: '0.2rem',
  },
  input: {
    padding: '0.65rem 0.75rem',
    borderRadius: '3px',
    border: `1px solid ${inkSoft}`,
    borderBottom: `2px solid ${gold}`,
    backgroundColor: parchmentDark,
    color: ink,
    fontSize: '0.95rem',
    fontFamily: '"Courier New", monospace',
    outline: 'none',
  },
  button: {
    marginTop: '0.9rem',
    padding: '0.75rem',
    borderRadius: '3px',
    border: `2px solid ${ink}`,
    background: `linear-gradient(180deg, ${gold} 0%, #a8841a 100%)`,
    color: ink,
    fontSize: '0.9rem',
    fontWeight: 'bold',
    letterSpacing: '0.15rem',
    cursor: 'pointer',
    textTransform: 'uppercase',
    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.4), 0 3px 0 ${ink}`,
    transition: 'transform 0.08s ease, box-shadow 0.08s ease',
  },
  toggleText: {
    textAlign: 'center',
    marginTop: '0.5rem',
    color: inkSoft,
    fontSize: '0.8rem',
    letterSpacing: '0.05rem',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: bloodRed,
    cursor: 'pointer',
    marginLeft: '0.5rem',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    letterSpacing: '0.08rem',
    textDecoration: 'underline dotted',
    fontFamily: 'inherit',
    padding: 0,
  },
}