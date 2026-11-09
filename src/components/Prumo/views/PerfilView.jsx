// src/components/Prumo/views/PerfilView.jsx
import { ATRIBUTOS, BLOCOS, PISO } from '../../../lib/prumo/constants'
import PrumoLogo from '../PrumoLogo'

export default function PerfilView({ estado, derivados, onLogout, onResetar }) {
  // ✅ Proteções e fallbacks para evitar desestruturação de nulos
  const classe = derivados?.classe || { icone: '👤', nome: 'Viajante' }
  const nivelInfo = derivados?.nivelInfo || { nivel: 1, xpAtual: 0, xpProximo: 100 }
  const debuff = derivados?.debuff || { ativo: false }

  const porBloco = Object.keys(BLOCOS).reduce((acc, bloco) => {
    acc[bloco] = Object.keys(ATRIBUTOS).filter((k) => ATRIBUTOS[k]?.bloco === bloco)
    return acc
  }, {})

  // Evita quebra se o objeto estado não estiver carregado na montagem
  const metaNome = estado?.meta?.nome || 'Viajante do Prumo'
  const criadoEmRaw = estado?.meta?.criadoEm

  return (
    <div className="view">
      <div className="perfil-header">
        <PrumoLogo size={64} torto={debuff.ativo} />
        <div>
          <h1 className="view__title">{metaNome}</h1>
          <p className="view__subtitle">
            {classe.icone} {classe.nome} · Nível {nivelInfo.nivel}
          </p>
        </div>
      </div>

      <div className="perfil-xp">
        <div className="perfil-xp__bar">
          <div
            className="perfil-xp__fill"
            style={{ width: `${nivelInfo.xpProximo ? (nivelInfo.xpAtual / nivelInfo.xpProximo) * 100 : 0}%` }}
          />
        </div>
        <p className="perfil-xp__label">
          {nivelInfo.xpAtual} / {nivelInfo.xpProximo} XP para nível {nivelInfo.nivel + 1}
        </p>
      </div>

      <h2 className="view__section">Ficha de Atributos</h2>
      {Object.entries(porBloco).map(([blocoKey, attrs]) => {
        const bloco = BLOCOS[blocoKey] || { label: 'Geral', hex: '#94a3b8' }
        return (
          <div key={blocoKey} className="perfil-bloco">
            <h3 className="perfil-bloco__title" style={{ color: bloco.hex }}>
              {bloco.label}
            </h3>
            {attrs.map((k) => {
              const attr = ATRIBUTOS[k] || { icon: '❓', label: k, desc: 'Sem descrição' }
              
              // ✅ Fallback numérico evita crash do .toFixed(1)
              const valorRaw = estado?.atributos?.[k]
              const valor = typeof valorRaw === 'number' ? valorRaw : 0
              const abaixoPiso = valor < PISO

              return (
                <div key={k} className="perfil-attr">
                  <span className="perfil-attr__icon">{attr.icon}</span>
                  <div className="perfil-attr__body">
                    <div className="perfil-attr__header">
                      <span className="perfil-attr__label">{attr.label}</span>
                      <span className={`perfil-attr__value ${abaixoPiso ? 'perfil-attr__value--danger' : ''}`}>
                        {valor.toFixed(1)}
                      </span>
                    </div>
                    <div className="perfil-attr__bar">
                      <div
                        className="perfil-attr__fill"
                        style={{
                          // ✅ Ajustado teto para base 100 para condizer com o motor do RPG
                          width: `${Math.min(100, (valor / 100) * 100)}%`,
                          backgroundColor: bloco.hex,
                        }}
                      />
                    </div>
                    <p className="perfil-attr__desc">{attr.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}

      <h2 className="view__section">Status do Personagem</h2>
      <div className="perfil-stats">
        <div className="perfil-stat">
          <span>💠 Mana</span>
          <strong>{estado?.mana || 0}/{estado?.manaMax || 0}</strong>
        </div>
        <div className="perfil-stat">
          <span>🪙 Tokens</span>
          <strong>{estado?.tokens || 0}</strong>
        </div>
        <div className="perfil-stat">
          <span>🛡️ Durabilidade</span>
          <strong>{estado?.durabilidade ?? 100}%</strong>
        </div>
        <div className="perfil-stat">
          <span>📅 Criado em</span>
          <strong>
            {criadoEmRaw ? new Date(criadoEmRaw).toLocaleDateString('pt-BR') : '---'}
          </strong>
        </div>
      </div>

      <h2 className="view__section">Configurações</h2>
      <div className="perfil-actions">
        <button className="btn-logout" onClick={onLogout}>
          🚪 Sair da conta
        </button>
        <button
          className="btn-reset"
          onClick={() => {
            if (window.confirm('Isso apaga sua ficha, progresso e tokens. Tem certeza?')) {
              onResetar()
            }
          }}
        >
          ⚠️ Resetar personagem
        </button>
      </div>
    </div>
  )
}
