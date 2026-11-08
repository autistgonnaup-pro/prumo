import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { usePrumo } from '../../hooks/usePrumo'
import { ATRIBUTOS, BLOCOS, CLASSES, PISO } from '../../lib/prumo/constants'
import PrumoLogo from '../Prumo/PrumoLogo'
import './Dashboard.css'

export default function Dashboard({ user }) {
  const { estado, derivados, concluir, desfazer, limparErro } = usePrumo()
  const [activeTab, setActiveTab] = useState('inicio')

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (!estado || !derivados) {
    return <div className="dashboard-page">Carregando motor do Prumo...</div>
  }

  const { classe, debuff, nivelInfo } = derivados
  const nomeUsuario = user?.email?.split('@')[0] ?? 'viajante'
  const hora = new Date().getHours()
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'
  
  const missoesAbertas = estado.missoes.filter(m => !m.concluida).length

  // Pegamos as dailies para mostrar no carrossel
  const dailies = derivados.dailies

  return (
    <div className={`dashboard-page ${debuff.ativo ? 'prumo-torto' : ''}`}>
      <div className="dashboard">
        
        {/* HEADER */}
        <header className="dashboard-header">
          <div>
            <p className="dashboard-greeting">{saudacao}, {nomeUsuario}</p>
            <h2 className="dashboard-title">Minha Rotina</h2>
          </div>
          <button onClick={handleLogout} className="icon-btn" aria-label="Sair">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </header>

        <main className="dashboard-main">
          
          {estado.ultimoErro && (
            <div className="dashboard-error" onClick={limparErro}>
              ⚠️ {estado.ultimoErro} <span>✕</span>
            </div>
          )}

          {/* BANNER DE FOCO (STATUS) */}
          <div className={`focus-banner ${debuff.ativo ? 'focus-banner--torto' : ''}`}>
            <div className="focus-banner__text">
              <h3 className="focus-banner__title">
                {debuff.ativo ? 'Prumo Torto' : 'Foco de Hoje'}
              </h3>
              <p className="focus-banner__subtitle">
                {debuff.ativo 
                  ? `Atenção em: ${debuff.atributosAbaixo.join(', ')}` 
                  : `Nível ${nivelInfo.nivel} · ${classe.nome} (${classe.icone})`}
              </p>
              <button className="focus-banner__btn">
                {debuff.ativo ? 'Restaurar Equilíbrio' : 'Ver Tarefas'}
              </button>
            </div>
            <div className="focus-banner__icon" style={{ transform: debuff.ativo ? 'rotate(15deg)' : 'none' }}>
              {debuff.ativo ? '⚖️' : '🎯'}
            </div>
          </div>

          {/* BLOCOS DE ATRIBUTOS (SUBSTITUI CATEGORIAS) */}
          <h3 className="section-title">Seus Atributos</h3>
          <div className="grid-categories">
            {Object.keys(BLOCOS).map((blocoKey) => {
              const bloco = BLOCOS[blocoKey];
              // Soma os atributos do bloco para exibir (ou o status do atributo principal)
              return (
                <div key={blocoKey} className="category-item">
                  <div className="category-icon" style={{ backgroundColor: bloco.hex + '20', color: bloco.hex }}>
                    {blocoKey === 'fisico' ? '🛡️' : blocoKey === 'operacional' ? '⚙️' : '🧠'}
                  </div>
                  <span className="category-name">{bloco.label}</span>
                </div>
              )
            })}
            {/* Um card extra para a Classe */}
            <div className="category-item">
              <div className="category-icon" style={{ backgroundColor: '#ede9fe', color: '#7c3aed' }}>
                {classe.icone}
              </div>
              <span className="category-name">{classe.nome}</span>
            </div>
          </div>

          {/* DAILIES (SUBSTITUI HÁBITOS DIÁRIOS - MANTENDO SCROLL HORIZONTAL) */}
          <h3 className="section-title">Dailies (Missões Diárias)</h3>
          <div className="scroll-horizontal">
            {dailies.map((missao) => {
              const attr = ATRIBUTOS[missao.atributo];
              const bloco = BLOCOS[attr.bloco];
              return (
                <div key={missao.id} className={`habit-card ${missao.concluida ? 'habit-card--done' : ''}`}>
                  <div className="habit-icon">{attr.icon}</div>
                  <h4 className="habit-title">{missao.titulo}</h4>
                  <p className="habit-time" style={{ color: bloco.hex }}>
                    +{missao.recompensa.atributo} {attr.key}
                  </p>
                  
                  <button 
                    className={`check-button ${missao.concluida ? 'check-button--done' : ''}`}
                    onClick={() => missao.concluida ? desfazer(missao.id) : concluir(missao.id)}
                  >
                    {missao.concluida ? '✓ Feito' : 'Concluir'}
                  </button>
                </div>
              )
            })}
          </div>

          {/* MANA & TOKENS (NOVO BLOCO PARA COMPLETAR O HUD) */}
          <div className="status-panel">
            <div className="status-panel__item">
              <span>💠 Mana</span>
              <div className="status-bar">
                <div className="status-bar__fill" style={{ width: `${(estado.mana / estado.manaMax) * 100}%`, backgroundColor: 'var(--prumo-mana)' }} />
              </div>
              <small>{estado.mana}/{estado.manaMax}</small>
            </div>
            <div className="status-panel__item">
              <span>🪙 Tokens</span>
              <div className="status-bar">
                <div className="status-bar__fill" style={{ width: `${Math.min(100, (estado.tokens / 100) * 100)}%`, backgroundColor: 'var(--prumo-primary)' }} />
              </div>
              <small>{estado.tokens} 🪙</small>
            </div>
          </div>

        </main>

        {/* BOTTOM NAVIGATION BAR */}
        <nav className="bottom-nav">
          {[
            { id: 'inicio', label: 'Início', icon: '🏠' },
            { id: 'agenda', label: 'Agenda', icon: '📅' },
            { id: 'metas', label: 'Metas', icon: '🎯' },
            { id: 'perfil', label: 'Perfil', icon: '👤' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-item ${activeTab === tab.id ? 'nav-item--active' : ''}`}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>

      </div>
    </div>
  )
}