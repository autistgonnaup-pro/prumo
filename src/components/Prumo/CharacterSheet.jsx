import { ATRIBUTOS, BLOCOS } from '../../lib/prumo/constants'
import AttributeBar from './AttributeBar'
import ManaBar from './ManaBar'
import AlignmentBadge from './AlignmentBadge'
import PrumoLogo from './PrumoLogo'

export default function CharacterSheet({ estado, derivados }) {
  const { classe, debuff, nivelInfo } = derivados

  // Agrupa atributos por bloco
  const porBloco = Object.keys(BLOCOS).reduce((acc, bloco) => {
    acc[bloco] = Object.keys(ATRIBUTOS).filter(
      (k) => ATRIBUTOS[k].bloco === bloco
    )
    return acc
  }, {})

  return (
    <div className="character-sheet">
      <div className="character-sheet__header">
        <PrumoLogo size={48} torto={debuff.ativo} />
        <div className="character-sheet__title">
          <h1>{estado.meta.nome}</h1>
          <p>Nível {nivelInfo.nivel} · {classe.icone} {classe.nome}</p>
        </div>
      </div>

      <AlignmentBadge debuff={debuff} />

      <div className="character-sheet__xp">
        <div className="xp-bar">
          <div
            className="xp-bar__fill"
            style={{ width: `${(nivelInfo.xpAtual / nivelInfo.xpProximo) * 100}%` }}
          />
        </div>
        <span className="xp-bar__label">
          {nivelInfo.xpAtual} / {nivelInfo.xpProximo} XP
        </span>
      </div>

      <ManaBar mana={estado.mana} />

      <div className="character-sheet__blocks">
        {Object.entries(porBloco).map(([blocoKey, attrs]) => {
          const bloco = BLOCOS[blocoKey]
          return (
            <div key={blocoKey} className="block">
              <h3 className={`block__title block__title--${bloco.cor}`}>
                {bloco.label}
              </h3>
              {attrs.map((attrKey) => (
                <AttributeBar
                  key={attrKey}
                  attrKey={attrKey}
                  valor={estado.atributos[attrKey]}
                />
              ))}
            </div>
          )
        })}
      </div>

      <div className="character-sheet__durability">
        <span>🛡️ Durabilidade</span>
        <strong>{estado.durabilidade}%</strong>
      </div>
    </div>
  )
}