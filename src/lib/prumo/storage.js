// src/lib/prumo/storage.js

const KEY = 'prumo:estado'
const VERSAO_SCHEMA = 2

export function carregarEstado() {
  try {
    const bruto = localStorage.getItem(KEY)
    if (!bruto) return null

    const parsed = JSON.parse(bruto)

    // Estado legado sem versão (schema v1 = sem projetos)
    if (!parsed?._version) {
      return migrarDeV1(parsed)
    }

    if (parsed._version !== VERSAO_SCHEMA) {
      console.warn(`[Prumo] Schema ${parsed._version} → ${VERSAO_SCHEMA}`)
      return migrar(parsed)
    }

    // ✅ FIX 1: Use direct deletion. This strips '_version' completely 
    // without declaring an unused variable name like '__unused' or '_version'.
    const estado = { ...parsed }
    delete estado._version
    return estado
  } catch (err) {
    console.error('[Prumo] Estado corrompido, ignorando:', err)
    
    // ⚠️ Backup antes de descartar
    try {
      const backup = localStorage.getItem(KEY)
      if (backup) {
        localStorage.setItem(`${KEY}:corrompido:${Date.now()}`, backup)
      }
    } catch (backupError) {
      // ✅ FIX 2: Filled the empty block statement with a non-breaking debug log
      console.warn('[Prumo] Falha ao criar arquivo de backup de emergência:', backupError)
    }
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
  const dataHojeISO = new Date().toISOString().slice(0, 10)

  return {
    ...estadoV1,
    projetos: estadoV1?.projetos || [],
    tokensGastos: estadoV1?.tokensGastos || [],
    ultimoReset: estadoV1?.ultimoReset || {
      daily: dataHojeISO,
      weekly: dataHojeISO,
    },
  }
}

function migrar(estado) {
  return estado
}
