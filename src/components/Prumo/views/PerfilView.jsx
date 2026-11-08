import { ATRIBUTOS, BLOCOS, PISO } from '../../../lib/prumo/constants'
import PrumoLogo from '../PrumoLogo'

export default function PerfilView({ estado, derivados, onLogout, onResetar }) {
  const { classe, nivelInfo, debuff } = derivados
  const porBloco = Object.keys(BLOCOS).reduce((acc, bloco) => {
    acc[bloco] = Object.keys(ATRIBUTOS).filter((k) => ATRIBUTOS[k].bloco === bloco)
    return acc
  }, {})

  return (
    <div className="view">
      <div className="perfil-header">
        <PrumoLogo size={64} torto={debuff.ativo} />
        <div>
          <h1 className="view__title">{estado.meta.nome}</h1>
          <p className="view__subtitle">
            {classe.icone} {classe.nome} · Nível {nivelInfo.nivel}
          </p>
        </div>
      </div>

      <div className="perfil-xp">
        <div className="perfil-xp__bar">
          <div
            className="perfil-xp__fill"
            style={{ width: `${(nivelInfo.xpAtual / nivelInfo.xpProximo) * 100}%` }}
          />
        </div>
        <p className="perfil-xp__label">
          {nivelInfo.xpAtual} / {nivelInfo.xpProximo} XP para nível {nivelInfo.nivel + 1}
        </p>
      </div>

      <h2 className="view__section">Ficha de Atributos</h2>
      {Object.entries(porBloco).map(([blocoKey, attrs]) => {
        const bloco = BLOCOS[blocoKey]
        return (
          <div key={blocoKey} className="perfil-bloco">
            <h3 className="perfil-bloco__title" style={{ color: bloco.hex }}>
              {bloco.label}
            </h3>
            {attrs.map((k) => {
              const attr = ATRIBUTOS[k]
              const valor = estado.atributos[k]
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
                          width: `${Math.min(100, (valor / 50) * 100)}%`,
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
          <strong>{estado.mana}/{estado.manaMax}</strong>
        </div>
        <div className="perfil-stat">
          <span>🪙 Tokens</span>
          <strong>{estado.tokens}</strong>
        </div>
        <div className="perfil-stat">
          <span>🛡️ Durabilidade</span>
          <strong>{estado.durabilidade}%</strong>
        </div>
        <div className="perfil-stat">
          <span>📅 Criado em</span>
          <strong>{new Date(estado.meta.criadoEm).toLocaleDateString('pt-BR')}</strong>
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
            if (confirm('Isso apaga sua ficha, progresso e tokens. Tem certeza?')) {
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