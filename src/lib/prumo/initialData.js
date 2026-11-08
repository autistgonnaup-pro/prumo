import { PISO, MANA_MAX } from './constants'

export function criarPersonagemInicial(nome = 'Aprendiz') {
  return {
    meta: {
      nome,
      criadoEm: new Date().toISOString(),
      nivel: 1,
      xp: 0,
      xpProximo: 100,
    },
    atributos: {
      FOR: PISO,
      CON: PISO,
      DES: PISO,
      CAR: PISO,
      INT: PISO,
      SAB: PISO,
    },
    mana: MANA_MAX,
    manaMax: MANA_MAX,
    durabilidade: 100,
    tokens: 0,
    ultimoReset: {
      daily: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
      weekly: inicioDaSemana(new Date()).toISOString().slice(0, 10),
    },
    missoes: [
      // 🟥 FÍSICO
      {
        id: 'con-higiene',
        atributo: 'CON',
        tipo: 'daily',
        titulo: 'Rotina de higiene',
        descricao: 'Escovar os dentes, banho, skincare',
        recompensa: { xp: 5, atributo: 0.5, tokens: 2, mana: 0 },
        penalidade: { durabilidade: 5, atributo: -0.5 },
        concluida: false,
        ultimaConclusao: null,
      },
      {
        id: 'for-refeicao',
        atributo: 'FOR',
        tipo: 'daily',
        titulo: 'Preparar refeição',
        descricao: 'Cozinhar em casa uma refeição limpa',
        recompensa: { xp: 8, atributo: 0.5, tokens: 3, mana: 0 },
        penalidade: { durabilidade: 3, atributo: -0.3 },
        concluida: false,
        ultimaConclusao: null,
      },
      // 🟩 OPERACIONAL
      {
        id: 'des-financas',
        atributo: 'DES',
        tipo: 'weekly',
        titulo: 'Processar finanças',
        descricao: 'Revisar gastos e transferir valor para poupança',
        recompensa: { xp: 20, atributo: 1.0, tokens: 10, mana: 0 },
        penalidade: { durabilidade: 10, atributo: -1.0 },
        concluida: false,
        ultimaConclusao: null,
      },
      {
        id: 'car-interacoes',
        atributo: 'CAR',
        tipo: 'daily',
        titulo: 'Responder mensagens urgentes',
        descricao: 'Gerenciar interações sem esgotar a bateria social',
        recompensa: { xp: 5, atributo: 0.3, tokens: 2, mana: 0 },
        penalidade: { durabilidade: 2, atributo: -0.2 },
        concluida: false,
        ultimaConclusao: null,
      },
      // 🟦 MENTAL
      {
        id: 'int-codigo',
        atributo: 'INT',
        tipo: 'daily',
        titulo: 'Codificar o motor do prumo',
        descricao: 'Foco profundo de desenvolvimento (consome mana)',
        recompensa: { xp: 15, atributo: 1.5, tokens: 5, mana: 40 }, // mana: custo
        penalidade: { durabilidade: 5, atributo: -0.5 },
        concluida: false,
        ultimaConclusao: null,
      },
      {
        id: 'sab-arquitetura',
        atributo: 'SAB',
        tipo: 'weekly',
        titulo: 'Planejar arquitetura da semana',
        descricao: 'Definir dependências e próximos passos do projeto',
        recompensa: { xp: 20, atributo: 1.0, tokens: 10, mana: 0 },
        penalidade: { durabilidade: 8, atributo: -0.8 },
        concluida: false,
        ultimaConclusao: null,
      },
    ],
    tokensGastos: [],
  }
}

export function inicioDaSemana(date) {
  const d = new Date(date)
  const day = d.getDay() // 0=Dom, 1=Seg, ..., 6=Sáb
  // Consideramos que a semana começa no domingo (reset de weeklies)
  const diff = d.getDate() - day
  return new Date(d.setDate(diff))
}