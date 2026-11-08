// src/lib/prumo/engine.js
import { ATRIBUTOS, CLASSES, PISO, MANA_MAX, MANA_REGEN_DIA } from './constants.js'

// ============================================================
// CÁLCULOS (funções puras)
// ============================================================

export function calcularClasse(atributos) {
  // 1. Ordena mirando no valor numérico contido no índice [1] da tupla
  const ordenados = Object.entries(atributos).sort((a, b) => b[1] - a[1])
  const [topo] = ordenados
  
  // 2. Valida com segurança se há um empate exato entre os dois maiores atributos
  const empate = ordenados[1] && ordenados[1][1] === topo[1]

  if (empate) {
    const segundo = ordenados[1]
    const par = [topo[0], segundo[0]].sort().join('')
    const mapaPar = {
      FORCON: 'guardiao', FORDES: 'mercador', FORCAR: 'guardiao',
      FORINT: 'artesao',  FORSAB: 'andarilho', CONDES: 'mercador',
      CONCAR: 'mercador',  CONINT: 'andarilho', CONSAB: 'andarilho',
      DESCAR: 'ladino',    DESINT: 'mercador',  DESSAB: 'oraculo',
      CARINT: 'mercador',  CARSAB: 'oraculo',   INTSAB: 'erudito',
    }
    return CLASSES[mapaPar[par]] || CLASSES.aprendiz
  }

  // 3. Fallback para os caminhos de atributo dominante único tradicional
  const dominante = topo[0]
  if (['INT', 'SAB'].includes(dominante)) return CLASSES.erudito
  if (['DES', 'CAR'].includes(dominante)) return CLASSES.ladino
  if (['FOR', 'CON'].includes(dominante)) return CLASSES.guardiao
  return CLASSES.aprendiz
}

export function verificarDebuff(atributos) {
  const abaixo = Object.entries(atributos)
    .filter(([, v]) => v < PISO)
    .map(([k]) => k)
  return { ativo: abaixo.length > 0, atributosAbaixo: abaixo }
}

export function calcularMultiplicadorBônus(estado) {
  const debuff = verificarDebuff(estado.atributos)
  if (debuff.ativo) return 0
  if (estado.durabilidade < 50) return 0.5
  if (estado.durabilidade < 80) return 0.8
  return 1
}

export function calcularNivel(xp) {
  let nivel = 1
  let necessario = 100
  let acumulado = 0
  while (xp >= acumulado + necessario) {
    acumulado += necessario
    nivel++
    necessario = Math.round(necessario * 1.5)
  }
  return { nivel, xpAtual: xp - acumulado, xpProximo: necessario }
}

// ============================================================
// AÇÕES (usadas pelo usePrumo)
// ============================================================

export function concluirMissao(estado, missaoId) {
  const missao = estado.missoes.find((m) => m.id === missaoId)
  if (!missao) return { erro: 'Missão não encontrada' }
  if (missao.concluida) return { erro: 'Missão já concluída' }

  // Valida se o atributo da missão existe no domínio do RPG
  if (!ATRIBUTOS[missao.atributo]) {
    return { erro: `Atributo inválido: ${missao.atributo} não existe no sistema.` }
  }

  const custoMana = missao.recompensa.mana || 0
  if (custoMana > 0 && estado.mana < custoMana) {
    return { erro: 'Mana insuficiente' }
  }

  const debuff = verificarDebuff(estado.atributos)
  if (debuff.ativo && missao.atributo === 'INT') {
    return { erro: 'Prumo Torto: reestabeleça o equilíbrio antes de ganhar INT.' }
  }

  const mult = calcularMultiplicadorBônus(estado)

  const novoAtributos = { ...estado.atributos }
  novoAtributos[missao.atributo] = Math.min(
    100,
    novoAtributos[missao.atributo] + missao.recompensa.atributo * mult
  )

  const novoXp = estado.meta.xp + Math.round(missao.recompensa.xp * mult)
  const { nivel } = calcularNivel(novoXp)
  const novaMana = Math.max(0, Math.min(MANA_MAX, estado.mana - custoMana + 5))

  const novaMissao = {
    ...missao,
    concluida: true,
    ultimaConclusao: new Date().toISOString(),
  }

  return {
    estado: {
      ...estado,
      atributos: novoAtributos,
      mana: novaMana,
      durabilidade: Math.min(100, estado.durabilidade + 2),
      tokens: estado.tokens + missao.recompensa.tokens,
      meta: { ...estado.meta, xp: novoXp, nivel },
      missoes: estado.missoes.map((m) => (m.id === missaoId ? novaMissao : m)),
    },
  }
}

export function desfazerMissao(estado, missaoId) {
  const missao = estado.missoes.find((m) => m.id === missaoId)
  if (!missao || !missao.concluida) return { erro: 'Missão não concluída' }

  // Proteção contra manipulação de dados corrompidos externos
  if (!ATRIBUTOS[missao.atributo]) {
    return { erro: `Atributo inválido: ${missao.atributo} não pode ser desfeito.` }
  }

  const novoAtributos = { ...estado.atributos }
  novoAtributos[missao.atributo] = Math.max(
    0,
    novoAtributos[missao.atributo] - missao.recompensa.atributo
  )

  return {
    estado: {
      ...estado,
      atributos: novoAtributos,
      tokens: Math.max(0, estado.tokens - missao.recompensa.tokens),
      meta: {
        ...estado.meta,
        xp: Math.max(0, estado.meta.xp - missao.recompensa.xp),
      },
      missoes: estado.missoes.map((m) =>
        m.id === missaoId ? { ...m, concluida: false, ultimaConclusao: null } : m
      ),
    },
  }
}

export function resgatarRecompensa(estado, custoTokens, nome) {
  if (estado.tokens < custoTokens) return { erro: 'Tokens insuficientes' }
  return {
    estado: {
      ...estado,
      tokens: estado.tokens - custoTokens,
      tokensGastos: [
        ...estado.tokensGastos,
        { nome, custo: custoTokens, data: new Date().toISOString() },
      ],
    },
  }
}

// ============================================================
// RESETS DE CICLO
// ============================================================

export function executarResets(estado) {
  const hoje = new Date().toISOString().slice(0, 10)
  const semanaAtual = inicioDaSemana(new Date()).toISOString().slice(0, 10)

  const resetouDaily = estado.ultimoReset.daily !== hoje
  const resetouWeekly = estado.ultimoReset.weekly !== semanaAtual

  if (!resetouDaily && !resetouWeekly) return estado

  let atributos = { ...estado.atributos }
  let durabilidade = estado.durabilidade
  let mana = estado.mana

  const missoesAtualizadas = estado.missoes.map((m) => {
    const cicloTerminou =
      (m.tipo === 'daily' && resetouDaily) ||
      (m.tipo === 'weekly' && resetouWeekly)

    if (cicloTerminou && !m.concluida) {
      atributos[m.atributo] = Math.max(0, atributos[m.atributo] + m.penalidade.atributo)
      // 🔥 CORREÇÃO: Mudado de "-" para "+" para somar corretamente o valor negativo e blindado o teto de 100%
      durabilidade = Math.max(0, Math.min(100, durabilidade + m.penalidade.durabilidade))
    }

    return cicloTerminou
      ? { ...m, concluida: false, ultimaConclusao: null }
      : m
  })

  if (resetouDaily) {
    mana = Math.min(MANA_MAX, mana + MANA_REGEN_DIA)
  }

  return {
    ...estado,
    atributos,
    durabilidade,
    mana,
    missoes: missoesAtualizadas,
    ultimoReset: {
      daily: resetouDaily ? hoje : estado.ultimoReset.daily,
      weekly: resetouWeekly ? semanaAtual : estado.ultimoReset.weekly,
    },
  }
}

// Helper
function inicioDaSemana(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day
  return new Date(d.setDate(diff))
}
