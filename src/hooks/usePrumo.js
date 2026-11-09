// src/hooks/usePrumo.js
import { useEffect, useReducer, useCallback, useMemo } from 'react'
import { criarPersonagemInicial } from '../lib/prumo/initialData'
import { carregarEstado, salvarEstado, limparEstado } from '../lib/prumo/storage'
import {
  executarResets, concluirMissao, desfazerMissao, resgatarRecompensa,
  calcularClasse, verificarDebuff, calcularNivel
} from '../lib/prumo/engine'

// ✅ Estado inicial sempre válido: nunca `null`
const ESTADO_INICIAL = Object.freeze({
  estado: null,
  hidratado: false,
  ultimoErro: null,
})

function reducer(shell, action) {
  switch (action.type) {
    case 'HIDRATAR': {
      const bruto = action.payload || criarPersonagemInicial()
      return { estado: executarResets(bruto, action.agora), hidratado: true, ultimoErro: null }
    }
    case 'CONCLUIR_MISSAO': {
      const { estado: novo, erro } = concluirMissao(shell.estado, action.payload)
      if (erro) return { ...shell, ultimoErro: erro }
      return { ...shell, estado: novo, ultimoErro: null }
    }
    case 'DESFAZER_MISSAO': {
      const { estado: novo, erro } = desfazerMissao(shell.estado, action.payload)
      if (erro) return { ...shell, ultimoErro: erro }
      return { ...shell, estado: novo, ultimoErro: null }
    }
    case 'RESGATAR': {
      const { estado: novo, erro } = resgatarRecompensa(shell.estado, action.payload.custo, action.payload.nome)
      if (erro) return { ...shell, ultimoErro: erro }
      return { ...shell, estado: novo, ultimoErro: null }
    }
    case 'TOGGLE_MILESTONE': {
      const { projetoId, milestoneId } = action.payload
      const projetos = (shell.estado?.projetos || []).map((p) =>
        p.id === projetoId
          ? { ...p, milestones: (p.milestones || []).map((m) => m.id === milestoneId ? { ...m, feito: !m.feito } : m) }
          : p
      )
      return { ...shell, estado: { ...shell.estado, projetos } }
    }
    case 'CONCLUIR_PROJETO': {
      const projeto = (shell.estado?.projetos || []).find((p) => p.id === action.payload)
      if (!projeto) return { ...shell, ultimoErro: 'Projeto não encontrado' }
      
      const milestones = projeto.milestones || []
      if (!milestones.every((m) => m.feito)) {
        return { ...shell, ultimoErro: 'Complete todos os milestones primeiro.' }
      }
      
      const atributos = { ...(shell.estado?.atributos || {}) }
      Object.entries(projeto.recompensa?.atributo || {}).forEach(([k, v]) => {
        atributos[k] = Math.min(100, (atributos[k] || 0) + v)
      })

      const tokensAtuais = shell.estado?.tokens || 0
      const tokensGanhos = projeto.recompensa?.tokens || 0
      const xpAtual = shell.estado?.meta?.xp || 0
      const xpGanho = projeto.recompensa?.xp || 0

      return {
        ...shell,
        estado: {
          ...shell.estado,
          atributos,
          tokens: tokensAtuais + tokensGanhos,
          meta: { ...shell.estado?.meta, xp: xpAtual + xpGanho },
          projetos: shell.estado.projetos.map((p) => p.id === projeto.id ? { ...p, concluido: true } : p),
        },
        ultimoErro: null,
      }
    }
    case 'ADICIONAR_PROJETO':
      return { ...shell, estado: { ...shell.estado, projetos: [...(shell.estado?.projetos || []), action.payload] } }
    case 'RESET_TUDO':
      limparEstado()
      return { estado: criarPersonagemInicial(), hidratado: true, ultimoErro: null }
    case 'LIMPAR_ERRO':
      return { ...shell, ultimoErro: null }
    default:
      return shell
  }
}

export function usePrumo() {
  const [shell, dispatch] = useReducer(reducer, ESTADO_INICIAL)

  useEffect(() => {
    const salvo = carregarEstado()
    dispatch({ type: 'HIDRATAR', payload: salvo, agora: new Date() })
  }, [])

  // ✅ Correção: Só sincroniza com o LocalStorage se o estado já estiver devidamente hidratado
  useEffect(() => {
    if (shell.hidratado && shell.estado) {
      salvarEstado(shell.estado)
    }
  }, [shell.estado, shell.hidratado])

  const concluir = useCallback((id) => dispatch({ type: 'CONCLUIR_MISSAO', payload: id }), [])
  const desfazer = useCallback((id) => dispatch({ type: 'DESFAZER_MISSAO', payload: id }), [])
  const resgatar = useCallback((custo, nome) => dispatch({ type: 'RESGATAR', payload: { custo, nome } }), [])
  const resetarTudo = useCallback(() => dispatch({ type: 'RESET_TUDO' }), [])
  const limparErro = useCallback(() => dispatch({ type: 'LIMPAR_ERRO' }), [])
  const toggleMilestone = useCallback((projetoId, milestoneId) =>
    dispatch({ type: 'TOGGLE_MILESTONE', payload: { projetoId, milestoneId } }), [])
  const concluirProjeto = useCallback((id) => dispatch({ type: 'CONCLUIR_PROJETO', payload: id }), [])
  const adicionarProjeto = useCallback((projeto) => dispatch({ type: 'ADICIONAR_PROJETO', payload: projeto }), [])

  // ✅ Derivados memoizados e protegidos contra referências nulas
  const derivados = useMemo(() => {
    const e = shell.estado
    if (!e) return null
    return {
      classe: calcularClasse(e.atributos),
      debuff: verificarDebuff(e.atributos),
      nivelInfo: calcularNivel(e.meta?.xp || 0),
      dailies: (e.missoes || []).filter((m) => m.tipo === 'daily'),
      weeklies: (e.missoes || []).filter((m) => m.tipo === 'weekly'),
      projetosAtivos: (e.projetos || []).filter((p) => !p.concluido),
    }
  }, [shell.estado])

  return {
    estado: shell.estado,
    hidratado: shell.hidratado,
    ultimoErro: shell.ultimoErro,
    derivados,
    concluir, desfazer, resgatar, resetarTudo, limparErro,
    toggleMilestone, concluirProjeto, adicionarProjeto,
  }
}
