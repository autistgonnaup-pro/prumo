// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// ✅ Cria o client PRIMEIRO (export fica visível pro Rolldown)
let supabase
try {
  if (!url || !anonKey) {
    throw new Error(
      '[Prumo] Faltam VITE_SUPABASE_URL e/ou VITE_SUPABASE_ANON_KEY. ' +
      'Verifique seu .env e reinicie o Vite (npm run dev).'
    )
  }
  supabase = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })
} catch (err) {
  console.error('[Prumo] Falha ao inicializar Supabase:', err)
  throw err
}

// ✅ Export DEPOIS do try/catch (mas antes de qualquer throw solto)
export { supabase }