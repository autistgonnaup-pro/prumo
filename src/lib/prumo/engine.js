import {
  ATRIBUTOS,
  CLASSES,
  PISO,
  MANA_MAX,
  MANA_REGEN_DIA,
} from './constants'
import { inicioDaSemana } from './initialData'

// ============================================================
// CÁLCULOS
// ============================================================

/** Atributo dominante → define a Classe */
export function calcularClasse(atributos) {
  const ordenados = Object.entries(atributos).sort((a, b) => b[1] - a[1])
  const [topo] = ordenados
  const empate = ordenados[1][1] === topo[1]

  if (empate) {
    // Empate de 1º lugar → combinar par
    const [segundo] = ordenados[1]
    const par = [topo[0], segundo[0]].sort().join('')
    const mapaPar = {
      FORCON: 'guardiao',
      DESC: 'mercador', // simplificado
      DESCAR: 'ladino',
      INT: 'erudito',
      INTSAB: 'erudito',
      FORSAB: 'andarilho',
      FORINT: 'artesao',
      CONINT: 'andarilho',
      FORDES: 'mercador',
      CONDES: 'mercador',
      CONCAR: 'mercador',
      CARSAB: 'oraculo',
      DESSAB: 'oraculo',
      FORCAR: 'guardiao',
    }
    return CLASSES[mapaPar[par]] || CLASSES.aprendiz
  }

  // Sem empate
  const dominante = topo[0]
  if (['INT', 'SAB'].includes(dominante)) return CLASSES.erudito
  if (['DES', 'CAR'].includes(dominante)) return CLASSES.ladino
  if (['FOR', 'CON'].includes(dominante)) return CLASSES.guardiao

  return CLASSES.aprendiz
}

/** Verifica se algum atributo está abaixo do Piso → Debuff Visual */
export function verificarDebuff(atributos) {
  const abaixo = Object.entries(atributos)
    .filter(([, valor]) => valor < PISO)
    .map(([key]) => key)
  return {
    ativo: abaixo.length > 0,
    atributosAbaixo: abaixo,
  }
}

/** Verifica se algum atributo está no Piso exato (zona de risco) */
export function verificarAtencao(atributos) {
  return Object.entries(atributos)
    .filter(([, v]) => v === PISO)
    .map(([k]) => k)
}

/** Calcula bônus de performance (multiplicador global) */
export function calcularMultiplicadorBônus(estado) {
  const debuff = verificarDebuff(estado.atributos)
  if (debuff.ativo) return 0 // Congelado
  if (estado.durabilidade < 50) return 0.5
  if (estado.durabilidade < 80) return 0.8
  return 1
}

/** Nível sobe a cada XP acumulado, ex: 100, 250, 450, ... */
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
// AÇÕES
// ============================================================

/** Conclui uma missão. Retorna novo estado ou erro. */
export function concluirMissao(estado, missaoId) {
  const missao = estado.missoes.find((m) => m.id === missaoId)
  if (!missao) return { erro: 'Missão não encontrada' }
  if (missao.concluida) return { erro: 'Missão já concluída neste ciclo' }

  // Verifica mana (só para missões que consumem)
  const custoMana = missao.recompensa.mana || 0
  if (custoMana > 0 && estado.mana < custoMana) {
    return { erro: `Mana insuficiente. Precisa de ${custoMana}, tem ${estado.mana}` }
  }

  // Verifica debuff: se alguma área está abaixo do Piso, congela ganho de INT (regra do documento)
  const debuff = verificarDebuff(estado.atributos)
  const missoesCongeladas = debuff.ativo && missao.atributo === 'INT'
  if (missoesCongeladas) {
    return { erro: 'Prumo Torto: reestabeleça o equilíbrio antes de ganhar INT.' }
  }

  const mult = calcularMultiplicadorBônus(estado)

  // Aplica recompensa
  const novoAtributos = { ...estado.atributos }
  novoAtributos[missao.atributo] = Math.min(
    100,
    novoAtributos[missao.atributo] + missao.recompensa.atributo * mult
  )

  const novoXp = estado.meta.xp + Math.round(missao.recompensa.xp * mult)
  const { nivel } = calcularNivel(novoXp)

  const novaMana = Math.max(0, Math.min(MANA_MAX, estado.mana - custoMana + 5)) // +5 regen micro

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

/** Desfaz conclusão (útil para erros) */
export function desfazerMissao(estado, missaoId) {
  const missao = estado.missoes.find((m) => m.id === missaoId)
  if (!missao || !missao.concluida) return { erro: 'Missão não concluída' }

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

/**
 * Executa resets pendentes ao "abrir o app".
 * - Daily: reseta toda missão daily se a data mudou
 * - Weekly: reseta toda missão weekly se a semana mudou
 * - Aplica decaimento por negligência (missões não concluídas no ciclo anterior)
 * - Regenera mana
 */
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
    // Aplica decaimento se a missão NÃO foi concluída no ciclo anterior
    const cicloTerminou =
      (m.tipo === 'daily' && resetouDaily) ||
      (m.tipo === 'weekly' && resetouWeekly)

    if (cicloTerminou && !m.concluida) {
      // Penalidade de negligência
      atributos[m.atributo] = Math.max(
        0,
        atributos[m.atributo] + m.penalidade.atributo
      )
      durabilidade = Math.max(0, durabilidade - m.penalidade.durabilidade)
    }

    return cicloTerminou
      ? { ...m, concluida: false, ultimaConclusao: null }
      : m
  })

  // Regenera mana
  const regenMana = resetouDaily ? MANA_REGEN_DIA : 0
  mana = Math.min(MANA_MAX, mana + regenMana)

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

/** Resgata recompensa na loja de tokens */
export function resgatarRecompensa(estado, custoTokens, nome) {
  if (estado.tokens < custoTokens) {
    return { erro: 'Tokens insuficientes' }
  }
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

/** Helper para exibir mana formatada */
export function formatarMana(mana) {
  return `${mana}/${MANA_MAX}`
}

/** Ranking de atributos por bloco */
export function agruparPorBloco(atributos) {
  const grupos = { fisico: [], operacional: [], mental: [] }
  Object.entries(atributos).forEach(([key, valor]) => {
    grupos[ATRIBUTOS[key].bloco].push({ key, valor })
  })
  return grupos
}