import { useState } from 'react'
import { TIPOS_PROJETO, ATRIBUTOS } from '../../../lib/prumo/constants'
import ModalNovaMeta from '../ModalNovaMeta'

export default function MetasView({ estado, toggleMilestone, concluirProjeto, adicionarProjeto }) {
  const [modalAberto, setModalAberto] = useState(false)
  const projetos = estado.projetos || []
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
                <span className="meta-card__icon">{p.icone}</span>
                <div>
                  <p className="meta-card__titulo">{p.titulo}</p>
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
  const tipo = TIPOS_PROJETO[projeto.tipo]
  const feitos = projeto.milestones.filter((m) => m.feito).length
  const total = projeto.milestones.length
  const pct = total ? (feitos / total) * 100 : 0
  const todosFeitos = feitos === total

  const bloqueadoPor = Object.entries(projeto.preRequisitos || {})
    .filter(([k, v]) => (estado.atributos[k] || 0) < v)
    .map(([k, v]) => `${ATRIBUTOS[k].label} ${estado.atributos[k]}/${v}`)

  return (
    <div className="meta-card">
      <div className="meta-card__header">
        <span className="meta-card__icon">{projeto.icone}</span>
        <div className="meta-card__title-wrap">
          <p className="meta-card__titulo">{projeto.titulo}</p>
          <p className="meta-card__tipo">{tipo.label}</p>
        </div>
        <span className="meta-card__pct">{Math.round(pct)}%</span>
      </div>

      <p className="meta-card__desc">{projeto.descricao}</p>

      <div className="meta-card__bar">
        <div className="meta-card__fill" style={{ width: `${pct}%` }} />
      </div>

      {bloqueadoPor.length > 0 && (
        <div className="meta-card__lock">🔒 Requer: {bloqueadoPor.join(' · ')}</div>
      )}

      <div className="meta-card__milestones">
        {projeto.milestones.map((m) => (
          <label key={m.id} className="milestone">
            <input
              type="checkbox"
              checked={m.feito}
              onChange={() => onToggleMilestone(projeto.id, m.id)}
            />
            <span className={m.feito ? 'milestone__done' : ''}>{m.titulo}</span>
          </label>
        ))}
      </div>

      <div className="meta-card__rewards">
        🎁 +{projeto.recompensa.xp} XP · +{projeto.recompensa.tokens} 🪙
        {Object.entries(projeto.recompensa.atributo || {}).map(([k, v]) => (
          <span key={k}> · +{v} {k}</span>
        ))}
      </div>

      <button
        className={`meta-card__btn ${todosFeitos && bloqueadoPor.length === 0 ? '' : 'meta-card__btn--disabled'}`}
        onClick={() => onConcluir(projeto.id)}
        disabled={!todosFeitos || bloqueadoPor.length > 0}
      >
        {todosFeitos ? '🏆 Vencer Chefe' : 'Complete os milestones'}
      </button>
    </div>
  )
}