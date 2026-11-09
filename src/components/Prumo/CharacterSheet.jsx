// src/components/Prumo/CharacterSheet.jsx
import { ATRIBUTOS, BLOCOS } from '../../lib/prumo/constants'
import AttributeBar from './AttributeBar'
import ManaBar from './ManaBar'
import AlignmentBadge from './AlignmentBadge'
import PrumoLogo from './PrumoLogo'

export default function CharacterSheet({ estado, derivados }) {
  // ✅ Proteção imediata contra desestruturação de objeto nulo/indefinido
  const classe = derivados?.classe || { icone: '👤', nome: 'Viajante' }
  const debuff = derivados?.debuff || { ativo: false, atributosAbaixo: [] }
  const nivelInfo = derivados?.nivelInfo || { nivel: 1, xpAtual: 0, xpProximo: 100 }

  // ✅ Agrupa atributos de forma segura tratando possíveis nulos nas constantes
  const porBloco = Object.keys(BLOCOS || {}).reduce((acc, bloco) => {
    acc[bloco] = Object.keys(ATRIBUTOS || {}).filter(
      (k) => ATRIBUTOS[k]?.bloco === bloco
    )
    return acc
  }, {})

  // ✅ Fallbacks defensivos para strings e números do estado principal
  const nomePersonagem = estado?.meta?.nome || 'Viajante do Prumo'
  const manaAtual = estado?.mana || 0
  const durabilidade = estado?.durabilidade ?? 100

  const pctXp = nivelInfo.xpProximo ? (nivelInfo.xpAtual / nivelInfo.xpProximo) * 100 : 0

  return (
    <div className="character-sheet">
      <div className="character-sheet__header">
        <PrumoLogo size={48} torto={debuff.ativo} />
        <div className="character-sheet__title">
          <h1>{nomePersonagem}</h1>
          <p>Nível {nivelInfo.nivel} · {classe.icone} {classe.nome}</p>
        </div>
      </div>

      <AlignmentBadge debuff={debuff} />

      <div className="character-sheet__xp">
        <div className="xp-bar">
          <div
            className="xp-bar__fill"
            style={{ width: `${pctXp}%` }}
          />
        </div>
        <span className="xp-bar__label">
          {nivelInfo.xpAtual} / {nivelInfo.xpProximo} XP
        </span>
      </div>

      <ManaBar mana={manaAtual} />

      <div className="character-sheet__blocks">
        {Object.entries(porBloco).map(([blocoKey, attrs]) => {
          const bloco = BLOCOS[blocoKey] || { label: blocoKey, cor: 'neutral' }
          return (
            <div key={blocoKey} className="block">
              <h3 className={`block__title block__title--${bloco.cor || 'neutral'}`}>
                {bloco.label}
              </h3>
              {attrs.map((attrKey) => {
                const valorAtributo = estado?.atributos?.[attrKey] ?? 0
                return (
                  <AttributeBar
                    key={attrKey}
                    attrKey={attrKey}
                    valor={valorAtributo}
                  />
                )
              })}
            </div>
          )
        })}
      </div>

      <div className="character-sheet__durability">
        <span>🛡️ Durabilidade</span>
        <strong>{durabilidade}%</strong>
      </div>
    </div>
  )
}
