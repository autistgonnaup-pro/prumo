import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { usePrumo } from '../../hooks/usePrumo'
import { ATRIBUTOS, BLOCOS } from '../../lib/prumo/constants'

// Imports das novas páginas
import AgendaView from '../Prumo/views/AgendaView'
import MetasView from '../Prumo/views/MetasView'
import ShopView from '../Prumo/views/ShopView'
import PerfilView from '../Prumo/views/PerfilView'

import './Dashboard.css'

export default function Dashboard({ user }) {
  const { 
    estado, 
    derivados, 
    concluir, 
    desfazer, 
    resgatar, 
    resetarTudo,
    limparErro,
    toggleMilestone,
    concluirProjeto,
    adicionarProjeto
  } = usePrumo()

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

  return (
    <div className={`dashboard-page ${debuff.ativo ? 'prumo-torto' : ''}`}>
      <div className="dashboard">

        {/* HEADER (só na aba início) */}
        {activeTab === 'inicio' && (
          <header className="dashboard-header">
            <div>
              <p className="dashboard-greeting">{saudacao}, {nomeUsuario}</p>
              <h1 className="dashboard-title">Minha Rotina</h1>
            </div>
            <button onClick={handleLogout} className="icon-btn" aria-label="Sair">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#ef4444" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden="true">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </header>
        )}

        <main className="dashboard-main">
          {/* ERRO GLOBAL */}
          {estado.ultimoErro && (
            <div className="dashboard-error" onClick={limparErro}>
              ⚠️ {estado.ultimoErro}
              <span className="dashboard-error__close">✕</span>
            </div>
          )}

          {/* ================= ABA: INÍCIO ================= */}
          {activeTab === 'inicio' && (
            <>
              {/* Banner */}
              <div className={`focus-banner ${debuff.ativo ? 'focus-banner--torto' : ''}`}>
                <div className="focus-banner__text">
                  <h3 className="focus-banner__title">
                    {debuff.ativo ? 'Prumo Torto' : 'Foco de Hoje'}
                  </h3>
                  <p className="focus-banner__subtitle">
                    {debuff.ativo
                      ? `Atenção em: ${debuff.atributosAbaixo.join(', ')}`
                      : `Nível ${nivelInfo.nivel} · ${classe.nome}`}
                  </p>
                  <button className="focus-banner__btn" onClick={() => setActiveTab('agenda')}>
                    {debuff.ativo ? 'Restaurar' : 'Ver Tarefas'}
                  </button>
                </div>
                <div className="focus-banner__icon">{debuff.ativo ? '⚖️' : '🎯'}</div>
              </div>

              {/* Atributos */}
              <h2 className="section-title">Seus Atributos</h2>
              <div className="grid-categories">
                {Object.keys(BLOCOS).map((k) => {
                  const b = BLOCOS[k]
                  const icon = k === 'fisico' ? '🛡️' : k === 'operacional' ? '⚙️' : '🧠'
                  return (
                    <div key={k} className="category-item">
                      <div className="category-icon"
                        style={{ backgroundColor: b.hex + '20', color: b.hex }}>
                        {icon}
                      </div>
                      <span className="category-name">{b.label}</span>
                    </div>
                  )
                })}
                <div className="category-item">
                  <div className="category-icon"
                    style={{ backgroundColor: '#ede9fe', color: '#7c3aed' }}>
                    {classe.icone}
                  </div>
                  <span className="category-name">{classe.nome}</span>
                </div>
              </div>

              {/* Dailies */}
              <h2 className="section-title">Dailies</h2>
              <div className="scroll-horizontal">
                {derivados.dailies.map((m) => {
                  const attr = ATRIBUTOS[m.atributo]
                  const bloco = BLOCOS[attr.bloco]
                  return (
                    <div key={m.id} className={`habit-card ${m.concluida ? 'habit-card--done' : ''}`}>
                      <div className="habit-icon">{attr.icon}</div>
                      <h3 className="habit-title">{m.titulo}</h3>
                      <p className="habit-time" style={{ color: bloco.hex }}>
                        +{m.recompensa.atributo} {attr.key}
                      </p>
                      <button
                        className={`check-button ${m.concluida ? 'check-button--done' : ''}`}
                        onClick={() => m.concluida ? desfazer(m.id) : concluir(m.id)}
                      >
                        {m.concluida ? '✓ Feito' : 'Concluir'}
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Status */}
              <div className="status-panel">
                <div className="status-panel__item">
                  <span>💠 Mana</span>
                  <div className="status-bar">
                    <div className="status-bar__fill"
                      style={{ width: `${(estado.mana / estado.manaMax) * 100}%`, backgroundColor: 'var(--prumo-mana)' }} />
                  </div>
                  <small>{estado.mana}/{estado.manaMax}</small>
                </div>
                <div className="status-panel__item">
                  <span>🪙 Tokens</span>
                  <div className="status-bar">
                    <div className="status-bar__fill"
                      style={{ width: `${Math.min(100, estado.tokens)}%`, backgroundColor: 'var(--prumo-primary)' }} />
                  </div>
                  <small>{estado.tokens}</small>
                </div>
              </div>
            </>
          )}

          {/* ================= ABA: AGENDA ================= */}
          {activeTab === 'agenda' && (
            <AgendaView
              estado={estado}
              derivados={derivados}
              concluir={concluir}
              desfazer={desfazer}
            />
          )}

          {/* ================= ABA: METAS ================= */}
          {activeTab === 'metas' && (
            <MetasView
              estado={estado}
              toggleMilestone={toggleMilestone}
              concluirProjeto={concluirProjeto}
              adicionarProjeto={adicionarProjeto}
            />
          )}

          {/* ================= ABA: LOJA ================= */}
          {activeTab === 'loja' && (
            <ShopView estado={estado} resgatar={resgatar} />
          )}

          {/* ================= ABA: PERFIL ================= */}
          {activeTab === 'perfil' && (
            <PerfilView
              estado={estado}
              derivados={derivados}
              onLogout={handleLogout}
              onResetar={resetarTudo}
            />
          )}
        </main>

        {/* BOTTOM NAV */}
        <nav className="bottom-nav" aria-label="Navegação principal">
          {[
            { id: 'inicio', label: 'Início', icon: '🏠' },
            { id: 'agenda', label: 'Agenda', icon: '📅' },
            { id: 'metas', label: 'Metas', icon: '🎯' },
            { id: 'loja', label: 'Loja', icon: '🪙' },
            { id: 'perfil', label: 'Perfil', icon: '👤' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-item ${activeTab === tab.id ? 'nav-item--active' : ''}`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              <span className="nav-icon" aria-hidden="true">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>

      </div>
    </div>
  )
}