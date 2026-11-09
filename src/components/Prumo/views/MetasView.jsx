// src/components/Prumo/views/MetasView.jsx
import { useState } from 'react'
import { TIPOS_PROJETO, ATRIBUTOS } from '../../../lib/prumo/constants'
import ModalNovaMeta from '../ModalNovaMeta'

export default function MetasView({ estado, toggleMilestone, concluirProjeto, adicionarProjeto }) {
  const [modalAberto, setModalAberto] = useState(false)
  
  // ✅ Fallbacks seguros evitam quebras se a estrutura do estado estiver inicializando
  const projetos = estado?.projetos || []
  const ativos = projetos.filter((p) => !p.concluido)
  const concluidos = projetos.filter((p) => p.concluido)

  return (
    <div className="view">
      <div className="view__header-row">
        <div>
          <h1 className="view__title">Metas</h1>
          <p className="view__subtitle">
            Suas masmorras ativas. Complete milestones para vencer o chefe.
          </p>
        </div>
        <button className="btn-new" onClick={() => setModalAberto(true)} aria-label="Nova meta">
          + Nova
        </button>
      </div>

      {ativos.length === 0 && (
        <div className="empty-state">
          <p className="empty-state__emoji">🏜️</p>
          <p className="empty-state__title">Nenhuma masmorra ativa</p>
          <p className="empty-state__desc">Comece uma meta para dar direção ao seu prumo.</p>
        </div>
      )}

      <div className="metas-list">
        {ativos.map((p) => (
          <MetaCard
            key={p.id}
            projeto={p}
            estado={estado}
            onToggleMilestone={toggleMilestone}
            onConcluir={concluirProjeto}
          />
        ))}
      </div>

      {concluidos.length > 0 && (
        <>
          <h2 className="view__section">✅ Concluídas</h2>
          <div className="metas-list">
            {concluidos.map((p) => (
              <div key={p.id} className="meta-card meta-card--done">
                <span className="meta-card__icon">{p?.icone || '🏆'}</span>
                <div>
                  <p className="meta-card__titulo">{p?.titulo || 'Meta Sem Nome'}</p>
                  <p className="meta-card__tipo">Concluída</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {modalAberto && (
        <ModalNovaMeta
          onClose={() => setModalAberto(false)}
          onCreate={(nova) => {
            adicionarProjeto(nova)
            setModalAberto(false)
          }}
        />
      )}
    </div>
  )
}

function MetaCard({ projeto, estado, onToggleMilestone, onConcluir }) {
  // ✅ Fallback para Tipo de Projeto inexistente
  const tipo = TIPOS_PROJETO[projeto?.tipo] || { label: 'Aventura' }
  
  const milestones = projeto?.milestones || []
  const feitos = milestones.filter((m) => m?.feito).length
  const total = milestones.length
  const pct = total ? (feitos / total) * 100 : 0
  const todosFeitos = feitos === total && total > 0

  // ✅ Proteção completa contra atributos nulos ou chaves de pré-requisitos inválidas
  const bloqueadoPor = Object.entries(projeto?.preRequisitos || {})
    .filter(([k, v]) => (estado?.atributos?.[k] || 0) < v)
    .map(([k, v]) => {
      const labelAtributo = ATRIBUTOS[k]?.label || k.toUpperCase()
      const valorAtual = estado?.atributos?.[k] || 0
      return `${labelAtributo} ${valorAtual}/${v}`
    })

  // ✅ Proteção para valores numéricos e arrays das recompensas
  const xpGanho = projeto?.recompensa?.xp || 0
  const tokensGanhos = projeto?.recompensa?.tokens || 0
  const atributosRecompensa = Object.entries(projeto?.recompensa?.atributo || {})

  return (
    <div className="meta-card">
      <div className="meta-card__header">
        <span className="meta-card__icon">{projeto?.icone || '🎯'}</span>
        <div className="meta-card__title-wrap">
          <p className="meta-card__titulo">{projeto?.titulo || 'Masmorra Sem Nome'}</p>
          <p className="meta-card__tipo">{tipo.label}</p>
        </div>
        <span className="meta-card__pct">{Math.round(pct)}%</span>
      </div>

      <p className="meta-card__desc">{projeto?.descricao || 'Sem descrição cadastrada.'}</p>

      <div className="meta-card__bar">
        <div className="meta-card__fill" style={{ width: `${pct}%` }} />
      </div>

      {bloqueadoPor.length > 0 && (
        <div className="meta-card__lock">🔒 Requer: {bloqueadoPor.join(' · ')}</div>
      )}

      <div className="meta-card__milestones">
        {milestones.map((m) => (
          <label key={m?.id} className="milestone">
            <input
              type="checkbox"
              checked={!!m?.feito}
              onChange={() => onToggleMilestone(projeto?.id, m?.id)}
              disabled={bloqueadoPor.length > 0} // Impede marcar se a meta estiver travada por atributos
            />
            <span className={m?.feito ? 'milestone__done' : ''}>{m?.titulo || 'Sub-tarefa'}</span>
          </label>
        ))}
      </div>

      <div className="meta-card__rewards">
        🎁 +{xpGanho} XP · +{tokensGanhos} 🪙
        {atributosRecompensa.map(([k, v]) => (
          <span key={k}> · +{v} {ATRIBUTOS[k]?.key || k.toUpperCase()}</span>
        ))}
      </div>

      <button
        className={`meta-card__btn ${todosFeitos && bloqueadoPor.length === 0 ? '' : 'meta-card__btn--disabled'}`}
        onClick={() => onConcluir(projeto?.id)}
        disabled={!todosFeitos || bloqueadoPor.length > 0}
      >
        {todosFeitos ? '🏆 Vencer Chefe' : 'Complete os milestones'}
      </button>
    </div>
  )
}
