export const ATTR_MIN = 0
export const ATTR_MAX = 100
export const PISO = 10

export const ATRIBUTOS = {
  FOR: { key: 'FOR', label: 'Força', bloco: 'fisico', icon: '⚔️', desc: 'Carga, vigor físico e preparo de recursos' },
  CON: { key: 'CON', label: 'Constituição', bloco: 'fisico', icon: '🛡️', desc: 'Manutenção do hardware: sono, higiene, hidratação' },
  DES: { key: 'DES', label: 'Destreza', bloco: 'operacional', icon: '⚙️', desc: 'Processamento em lote de finanças e burocracias' },
  CAR: { key: 'CAR', label: 'Carisma', bloco: 'operacional', icon: '💬', desc: 'Bateria social e interações externas' },
  INT: { key: 'INT', label: 'Inteligência', bloco: 'mental', icon: '🧠', desc: 'Foco profundo e absorção de conhecimento' },
  SAB: { key: 'SAB', label: 'Sabedoria', bloco: 'mental', icon: '🔮', desc: 'Arquitetura de dependências e planejamento' },
}

export const BLOCOS = {
  fisico: { label: 'Físico', cor: 'vigor', hex: '#de5454' },
  operacional: { label: 'Operacional', cor: 'fluxo', hex: '#52a174' },
  mental: { label: 'Mental', cor: 'mana', hex: '#4b7bec' },
}

export const MANA_MAX = 100
export const MANA_COST_INT = 40
export const MANA_REGEN_DIA = 30

export const CLASSES = {
  erudito: { id: 'erudito', nome: 'Erudito', desc: 'Domina INT e SAB.', icone: '📜' },
  ladino: { id: 'ladino', nome: 'Ladino', desc: 'Domina DES e CAR.', icone: '🗡️' },
  guardiao: { id: 'guardiao', nome: 'Guardião', desc: 'Domina FOR e CON.', icone: '🛡️' },
  aprendiz: { id: 'aprendiz', nome: 'Aprendiz', desc: 'Equilibrado entre todos os blocos.', icone: '🌱' },
  andarilho: { id: 'andarilho', nome: 'Andarilho', desc: 'Mente e corpo em harmonia.', icone: '🧭' },
  artesao: { id: 'artesao', nome: 'Artesão', desc: 'Físico e mental em sinergia.', icone: '🔨' },
  mercador: { id: 'mercador', nome: 'Mercador', desc: 'Operacional e físico.', icone: '🪙' },
  oraculo: { id: 'oraculo', nome: 'Oráculo', desc: 'Operacional e mental.', icone: '👁️' },
}
