// src/components/Prumo/ModalNovaMeta.jsx
import { useState, useEffect } from 'react'
import { TIPOS_PROJETO } from '../../lib/prumo/constants'

export default function ModalNovaMeta({ onClose, onCreate }) {
  // ✅ Dica: Garanta que a string inicial bata com alguma chave real do seu arquivo constants.js
  const [titulo, setTitulo] = useState('')
  const [tipo, setTipo] = useState(Object.keys(TIPOS_PROJETO)[0] || 'estudo')
  const [descricao, setDescricao] = useState('')

  // ✅ Adiciona fechamento automático do modal ao apertar a tecla ESC (Melhor UX)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!titulo.trim()) return

    onCreate({
      id: 'proj-' + Date.now(),
      titulo: titulo.trim(),
      tipo,
      // ✅ Proteção com fallback caso o tipo selecionado não possua ícone mapeado
      icone: TIPOS_PROJETO[tipo]?.icone || '🎯',
      descricao: descricao.trim() || 'Sem descrição.',
      preRequisitos: {},
      recompensa: { xp: 60, tokens: 20, atributo: {} },
      milestones: [{ id: 'm1', titulo: 'Primeiro passo', feito: false }],
      concluido: false,
    })
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">Nova Meta</h2>

        <form onSubmit={handleSubmit} className="modal__form">
          <label className="modal__label">
            Título
            <input
              className="modal__input"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Aprender Rust"
              autoFocus
              required
            />
          </label>

          <label className="modal__label">
            Tipo
            <select
              className="modal__input"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              {Object.entries(TIPOS_PROJETO || {}).map(([key, t]) => (
                <option key={key} value={key}>
                  {t?.icone || '🎯'} {t?.label || key}
                </option>
              ))}
            </select>
          </label>

          <label className="modal__label">
            Descrição
            <textarea
              className="modal__input modal__input--area"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="O que define o sucesso?"
              rows={3}
            />
          </label>

          <div className="modal__actions">
            <button type="button" className="modal__btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="modal__btn-ok">
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}



