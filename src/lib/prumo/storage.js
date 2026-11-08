const KEY = 'prumo:estado:v1'
export function carregarEstado() {
  try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : null } catch { return null }
}
export function salvarEstado(estado) {
  try { localStorage.setItem(KEY, JSON.stringify(estado)) } catch (err) { console.error(err) }
}
export function limparEstado() { localStorage.removeItem(KEY) }
