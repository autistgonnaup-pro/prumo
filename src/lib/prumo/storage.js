// ✅ NOVO
const KEY = 'prumo:estado'
const VERSAO_SCHEMA = 2

export function carregarEstado() {
  try {
    const bruto = localStorage.getItem(KEY)
    if (!bruto) return null

    const parsed = JSON.parse(bruto)

    // Estado legado sem versão (schema v1 = sem projetos)
    if (!parsed._version) {
      return migrarDeV1(parsed)
    }

    if (parsed._version !== VERSAO_SCHEMA) {
      console.warn(`[Prumo] Schema ${parsed._version} → ${VERSAO_SCHEMA}`)
      return migrar(parsed)
    }

    const { _version, ...estado } = parsed
    return estado
  } catch (err) {
    console.error('[Prumo] Estado corrompido, ignorando:', err)
    // ⚠️ Backup antes de descartar
    try {
      const backup = localStorage.getItem(KEY)
      if (backup) {
        localStorage.setItem(`${KEY}:corrompido:${Date.now()}`, backup)
      }
    } catch {}
    return null
  }
}

export function salvarEstado(estado) {
  try {
    const payload = { _version: VERSAO_SCHEMA, ...estado }
    localStorage.setItem(KEY, JSON.stringify(payload))
  } catch (err) {
    console.error('[Prumo] Falha ao salvar:', err)
  }
}

export function limparEstado() {
  localStorage.removeItem(KEY)
}

// ============ MIGRAÇÕES ============

function migrarDeV1(estadoV1) {
  // v1 não tinha projetos nem tokensGastos
  return {
    ...estadoV1,
    projetos: estadoV1.projetos || [],
    tokensGastos: estadoV1.tokensGastos || [],
    ultimoReset: estadoV1.ultimoReset || {
      daily: new Date().toISOString().slice(0, 10),
      weekly: new Date().toISOString().slice(0, 10),
    },
  }
}

function migrar(estado) {
  // Reservado para futuras versões
  return estado
}