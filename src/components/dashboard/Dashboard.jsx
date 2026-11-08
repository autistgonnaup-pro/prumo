import { supabase } from '../../lib/supabase'
import { usePrumo } from '../../hooks/usePrumo'
import CharacterSheet from '../Prumo/CharacterSheet'
import QuestList from '../Prumo/QuestList'
import TokenShop from '../Prumo/TokenShop'
import './Dashboard.css'

export default function Dashboard({ user }) {
  const { estado, derivados, concluir, desfazer, resgatar, limparErro } = usePrumo()

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (!estado || !derivados) {
    return (
      <div className="dashboard-page">
        <div className="dashboard">
          <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando ficha...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard">
        <header className="dashboard-header">
          <p className="dashboard-greeting">
            {user?.email?.split('@')[0] ?? 'viajante'}
          </p>
          <button onClick={handleLogout} className="icon-btn" aria-label="Sair">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="#ef4444" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </header>

        <main className="dashboard-main">
          {estado.ultimoErro && (
            <div className="dashboard-error" onClick={limparErro}>
              ⚠️ {estado.ultimoErro}
              <span className="dashboard-error__close">✕</span>
            </div>
          )}

          <CharacterSheet estado={estado} derivados={derivados} />

          <QuestList
            titulo="⚔️ Dailies"
            subtitulo="Missões diárias — resetam à meia-noite"
            missoes={derivados.dailies}
            onConcluir={concluir}
            onDesfazer={desfazer}
          />

          <QuestList
            titulo="🏰 Weeklies"
            subtitulo="Missões semanais — resetam todo domingo"
            missoes={derivados.weeklies}
            onConcluir={concluir}
            onDesfazer={desfazer}
          />

          <TokenShop tokens={estado.tokens} onResgatar={resgatar} />
        </main>
      </div>
    </div>
  )
}