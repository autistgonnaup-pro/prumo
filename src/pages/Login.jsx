// src/pages/Login.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const MENSAGENS_ERRO = {
  'Invalid login credentials': 'E-mail ou senha incorretos.',
  'User already registered': 'Este e-mail já está cadastrado.',
  'Email not confirmed': 'Confirme seu e-mail antes de entrar.',
  'Password should be at least 6 characters': 'A senha deve ter no mínimo 6 caracteres.',
  'Unable to validate email address: invalid format': 'Formato de e-mail inválido.',
}

const traduzErro = (msg) => MENSAGENS_ERRO[msg] ?? 'Algo deu errado. Tente novamente.'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [senha2, setSenha2] = useState('')
  const [modo, setModo] = useState('login')
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Se já está logado, sai da tela de login
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/app', { replace: true })
    })
  }, [navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setAviso('')

    const emailLimpo = email.trim().toLowerCase()

    if (modo === 'cadastro' && senha !== senha2) {
      setErro('As senhas não coincidem.')
      return
    }

    setLoading(true)

    if (modo === 'login') {
      const { error } = await supabase.auth.signInWithPassword({
        email: emailLimpo,
        password: senha,
      })
      setLoading(false)
      if (error) return setErro(traduzErro(error.message))
      navigate('/app')
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email: emailLimpo,
      password: senha,
    })
    setLoading(false)
    if (error) return setErro(traduzErro(error.message))

    if (data.session) {
      navigate('/app')
    } else {
      setAviso('Conta criada! Verifique seu e-mail para confirmar.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-4"
      >
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-primary">Prumo</h1>
          <p className="text-sm text-ink/60 mt-1">
            {modo === 'login' ? 'Entre na sua conta' : 'Crie sua conta'}
          </p>
        </div>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          autoComplete="email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary disabled:opacity-60"
        />

        <input
          type="password"
          placeholder="Senha (mín. 6 caracteres)"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          minLength={6}
          disabled={loading}
          autoComplete={modo === 'login' ? 'current-password' : 'new-password'}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary disabled:opacity-60"
        />

        {modo === 'cadastro' && (
          <input
            type="password"
            placeholder="Confirme a senha"
            value={senha2}
            onChange={(e) => setSenha2(e.target.value)}
            required
            minLength={6}
            disabled={loading}
            autoComplete="new-password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary disabled:opacity-60"
          />
        )}

        {erro && <p className="text-sm text-red-600">{erro}</p>}
        {aviso && <p className="text-sm text-green-700">{aviso}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white rounded-lg py-2 font-medium disabled:opacity-50 hover:opacity-90 transition"
        >
          {loading ? 'Aguarde...' : modo === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>

        <button
          type="button"
          onClick={() => {
            setModo(modo === 'login' ? 'cadastro' : 'login')
            setErro('')
            setAviso('')
            setSenha2('')
          }}
          className="text-sm text-primary underline w-full"
        >
          {modo === 'login' ? 'Criar conta' : 'Já tenho conta'}
        </button>
      </form>
    </div>
  )
}