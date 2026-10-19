// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [modo, setModo] = useState('login') // 'login' | 'cadastro'
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setAviso('')
    setLoading(true)

    const { error } =
      modo === 'login'
        ? await supabase.auth.signInWithPassword({ email, password: senha })
        : await supabase.auth.signUp({ email, password: senha })

    setLoading(false)

    if (error) {
      setErro(error.message)
      return
    }

    if (modo === 'cadastro') {
      setAviso('Conta criada! Verifique seu e-mail para confirmar (se a confirmação estiver ativa no Supabase).')
      return
    }

    navigate('/app')
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
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary"
        />
        <input
          type="password"
          placeholder="Senha (mín. 6 caracteres)"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          minLength={6}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary"
        />

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
          }}
          className="text-sm text-primary underline w-full"
        >
          {modo === 'login' ? 'Criar conta' : 'Já tenho conta'}
        </button>
      </form>
    </div>
  )
}

console.log("CHAVE SUPABASE:", import.meta.env.VITE_SUPABASE_ANON_KEY)
console.log("URL SUPABASE:", import.meta.env.VITE_SUPABASE_URL)