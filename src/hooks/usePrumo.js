import { useEffect, useReducer, useCallback } from 'react'
import { criarPersonagemInicial } from '../lib/prumo/initialData'
import { carregarEstado, salvarEstado, limparEstado } from '../lib/prumo/storage'
import { executarResets, concluirMissao, desfazerMissao, resgatarRecompensa, calcularClasse, verificarDebuff, calcularNivel } from '../lib/prumo/engine'

function reducer(estado, action) {
  switch (action.type) {
    case 'INIT': {
      const inicial = action.payload || criarPersonagemInicial()
      return executarResets(inicial)
    }
    case 'CONCLUIR_MISSAO': {
      const { estado: novo, erro } = concluirMissao(estado, action.payload)
      if (erro) return { ...estado, ultimoErro: erro }
      return { ...novo, ultimoErro: null }
    }
    case 'DESFAZER_MISSAO': {
      const { estado: novo, erro } = desfazerMissao(estado, action.payload)
      if (erro) return { ...estado, ultimoErro: erro }
      return { ...novo, ultimoErro: null }
    }
    case 'RESGATAR': {
      const { estado: novo, erro } = resgatarRecompensa(estado, action.payload.custo, action.payload.nome)
      if (erro) return { ...estado, ultimoErro: erro }
      return { ...novo, ultimoErro: null }
    }

    // ============ PROJETOS / METAS ============
    case 'TOGGLE_MILESTONE': {
      const { projetoId, milestoneId } = action.payload
      const projetos = (estado.projetos || []).map((p) => {
        if (p.id !== projetoId) return p
        return {
          ...p,
          milestones: p.milestones.map((m) =>
            m.id === milestoneId ? { ...m, feito: !m.feito } : m
          ),
        }
      })
      return { ...estado, projetos }
    }
    case 'CONCLUIR_PROJETO': {
      const projeto = (estado.projetos || []).find((p) => p.id === action.payload)
      if (!projeto) return { ...estado, ultimoErro: 'Projeto não encontrado' }
      const todosFeitos = projeto.milestones.every((m) => m.feito)
      if (!todosFeitos) {
        return { ...estado, ultimoErro: 'Complete todos os milestones primeiro.' }
      }
      const atributos = { ...estado.atributos }
      Object.entries(projeto.recompensa.atributo || {}).forEach(([k, v]) => {
        atributos[k] = Math.min(100, atributos[k] + v)
      })
      return {
        ...estado,
        atributos,
        tokens: estado.tokens + projeto.recompensa.tokens,
        meta: { ...estado.meta, xp: estado.meta.xp + projeto.recompensa.xp },
        projetos: estado.projetos.map((p) =>
          p.id === projeto.id ? { ...p, concluido: true } : p
        ),
        ultimoErro: null,
      }
    }
    case 'ADICIONAR_PROJETO': {
      return {
        ...estado,
        projetos: [...(estado.projetos || []), action.payload],
      }
    }

    case 'RESET_TUDO': return criarPersonagemInicial()
    case 'LIMPAR_ERRO': return { ...estado, ultimoErro: null }

    default: return estado
  }
}

export function usePrumo() {
  const [estado, dispatch] = useReducer(reducer, null)

  useEffect(() => {
    const salvo = carregarEstado()
    dispatch({ type: 'INIT', payload: salvo })
  }, [])

  useEffect(() => {
    if (estado) salvarEstado(estado)
  }, [estado])

  const concluir = useCallback((id) => dispatch({ type: 'CONCLUIR_MISSAO', payload: id }), [])
  const desfazer = useCallback((id) => dispatch({ type: 'DESFAZER_MISSAO', payload: id }), [])
  const resgatar = useCallback((custo, nome) => dispatch({ type: 'RESGATAR', payload: { custo, nome } }), [])
  const resetarTudo = useCallback(() => { limparEstado(); dispatch({ type: 'RESET_TUDO' }) }, [])
  const limparErro = useCallback(() => dispatch({ type: 'LIMPAR_ERRO' }), [])

  // ============ PROJETOS / METAS ============
  const toggleMilestone = useCallback(
    (projetoId, milestoneId) =>
      dispatch({ type: 'TOGGLE_MILESTONE', payload: { projetoId, milestoneId } }),
    []
  )
  const concluirProjeto = useCallback(
    (id) => dispatch({ type: 'CONCLUIR_PROJETO', payload: id }),
    []
  )
  const adicionarProjeto = useCallback(
    (projeto) => dispatch({ type: 'ADICIONAR_PROJETO', payload: projeto }),
    []
  )

  const derivados = estado ? {
    classe: calcularClasse(estado.atributos),
    debuff: verificarDebuff(estado.atributos),
    nivelInfo: calcularNivel(estado.meta.xp),
    dailies: estado.missoes.filter((m) => m.tipo === 'daily'),
    weeklies: estado.missoes.filter((m) => m.tipo === 'weekly'),
    projetosAtivos: (estado.projetos || []).filter((p) => !p.concluido),
  } : null

  return {
    estado,
    derivados,
    concluir,
    desfazer,
    resgatar,
    resetarTudo,
    limparErro,
    toggleMilestone,
    concluirProjeto,
    adicionarProjeto,
  }
}