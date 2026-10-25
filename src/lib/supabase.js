import { createClient } from '@supabase/supabase-js'

// URL escrita direto no código (sem variável de ambiente)
const supabaseUrl = 'https://chcvkktpfwivfjfsfrmn.supabase.co'
const supabaseAnonKey = 'sb_publishable_WGuAnsji11lsg4yxPY4t4w_aEHettnQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)