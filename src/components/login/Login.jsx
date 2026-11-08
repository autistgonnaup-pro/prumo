import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import './Login.css'
import SocialButtons from './SocialButtons'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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

  const handleSocialLogin = async (provider) => {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    })
    if (error) setError(error.message)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Header / Logo */}
        <div className="login-header">
          <div className="logo-emblem">🐉</div>
          <h1 className="login-title">Realm of Legends</h1>
          <p className="login-subtitle">
            {isRegistering ? 'Junte-se ao reino' : 'Entre no reino'}
          </p>
        </div>

        {/* Erro */}
        {error && <div className="login-error">{error}</div>}

        {/* Form */}
        <form className="login-form" onSubmit={handleAuth}>
          {/* E-mail */}
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input
              type="email"
              className="login-input"
              placeholder="mago@realm.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          {/* Senha */}
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type={showPassword ? 'text' : 'password'}
              className="login-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {/* Botão principal */}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading
              ? 'Aguarde...'
              : isRegistering
                ? 'CRIAR CONTA'
                : 'ENTRAR'}
          </button>
        </form>

        {/* Esqueci senha - só no login */}
        {!isRegistering && (
          <div className="forgot-link">
            <a href="/forgot-password">Esqueci minha senha</a>
          </div>
        )}

        {/* Divisor + social - só no login */}
        {!isRegistering && (
          <>
            <div className="divider">ou</div>
            <SocialButtons onLogin={handleSocialLogin} />
          </>
        )}

        {/* Footer */}
        <div className="login-footer">
          {isRegistering ? 'Já possui uma conta?' : 'Não tem conta?'}{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setError(null)
              setIsRegistering(!isRegistering)
            }}
          >
            {isRegistering ? 'Faça login' : 'Cadastre-se'}
          </a>
        </div>
      </div>
    </div>
  )
}