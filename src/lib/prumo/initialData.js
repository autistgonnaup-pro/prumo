// src/lib/prumo/initialData.js
// 1. CORREÇÃO: Adicionada a extensão .js para suporte nativo no terminal
import { PISO, MANA_MAX } from './constants.js'

export function inicioDaSemana(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day
  return new Date(d.setDate(diff))
}

export function criarPersonagemInicial(nome = 'Aprendiz') {
  return {
    meta: { nome, criadoEm: new Date().toISOString(), nivel: 1, xp: 0, xpProximo: 100 },
    atributos: { FOR: PISO, CON: PISO, DES: PISO, CAR: PISO, INT: PISO, SAB: PISO },
    mana: MANA_MAX,
    manaMax: MANA_MAX,
    durabilidade: 100,
    tokens: 0,
    ultimoReset: {
      daily: new Date().toISOString().slice(0, 10),
      weekly: inicioDaSemana(new Date()).toISOString().slice(0, 10),
    },
    // 2. CORREÇÃO: Propriedade ajustada de 'titulo' para 'nome'
    // 3. CORREÇÃO: Recompensas e penalidades ajustadas para inteiros
    missoes: [
      { id: 'con-higiene', atributo: 'CON', tipo: 'daily', nome: 'Rotina de higiene', descricao: 'Escovar os dentes, banho, skincare', recompensa: { xp: 5, atributo: 1, tokens: 2, mana: 0 }, penalidade: { durabilidade: -5, atributo: -1 }, concluida: false, ultimaConclusao: null },
      { id: 'for-refeicao', atributo: 'FOR', tipo: 'daily', nome: 'Preparar referência', descricao: 'Cozinhar em casa uma refeição limpa', recompensa: { xp: 8, atributo: 1, tokens: 3, mana: 0 }, penalidade: { durabilidade: -3, atributo: -1 }, concluida: false, ultimaConclusao: null },
      { id: 'des-financas', atributo: 'DES', tipo: 'weekly', nome: 'Processar finanças', descricao: 'Revisar gastos e transferir valor para poupança', recompensa: { xp: 20, atributo: 1, tokens: 10, mana: 0 }, penalidade: { durabilidade: -10, atributo: -1 }, concluida: false, ultimaConclusao: null },
      { id: 'car-interacoes', atributo: 'CAR', tipo: 'daily', nome: 'Responder mensagens urgentes', descricao: 'Gerenciar interações sem esgotar a bateria social', recompensa: { xp: 5, atributo: 1, tokens: 2, mana: 0 }, penalidade: { durabilidade: -2, atributo: -1 }, concluida: false, ultimaConclusao: null },
      { id: 'int-codigo', atributo: 'INT', tipo: 'daily', nome: 'Codificar o motor do prumo', descricao: 'Foco profundo de desenvolvimento (consome mana)', recompensa: { xp: 15, atributo: 1, tokens: 5, mana: 40 }, penalidade: { durabilidade: -5, atributo: -1 }, concluida: false, ultimaConclusao: null },
      { id: 'sab-arquitetura', atributo: 'SAB', tipo: 'weekly', nome: 'Planejar arquitetura da semana', descricao: 'Definir dependências e próximos passos do projeto', recompensa: { xp: 20, atributo: 1, tokens: 10, mana: 0 }, penalidade: { durabilidade: -8, atributo: -1 }, concluida: false, ultimaConclusao: null },
    ],
    projetos: [
      {
        id: 'proj-prumo-mvp',
        titulo: 'Prumo MVP',
        tipo: 'masmorra',
        icone: '🏰',
        descricao: 'Lançar a versão funcional do app com ficha, dailies e tokens.',
        preRequisitos: { INT: 12, SAB: 12 },
        recompensa: { xp: 100, tokens: 30, atributo: { INT: 2, SAB: 2 } },
        milestones: [
          { id: 'm1', titulo: 'Sistema de autenticação', feito: true },
          { id: 'm2', titulo: 'Ficha de personagem', feito: true },
          { id: 'm3', titulo: 'Dailies + resets', feito: false },
          { id: 'm4', titulo: 'Loja de tokens', feito: false },
        ],
        concluido: false,
      },
      {
        id: 'proj-financas',
        titulo: 'Reserva de emergência',
        tipo: 'raid',
        icone: '⚔️',
        descricao: 'Guardar 6 meses de despesas em conta separada.',
        preRequisitos: { DES: 15 },
        recompensa: { xp: 80, tokens: 40, atributo: { DES: 3 } },
        milestones: [
          { id: 'm1', titulo: 'Calcular despesa mensal', feito: false },
          { id: 'm2', titulo: 'Definir meta (6x)', feito: false },
          { id: 'm3', titulo: 'Automatizar transferência', feito: false },
        ],
        concluido: false,
      },
    ],
    tokensGastos: [],
  }
}
