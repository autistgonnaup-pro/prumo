import { supabase } from '../lib/supabase'

export default function Dashboard({ user }) {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
        <h1>Bem-vindo ao Prumo</h1>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Sair
        </button>
      </header>
      
      <main style={{ marginTop: '2rem' }}>
        <p>Você está logado como: <strong>{user.email}</strong></p>
        <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h2>Painel de Controle</h2>
          <p>Aqui você pode adicionar as funcionalidades do seu sistema.</p>
        </div>
      </main>
    </div>
  )
}