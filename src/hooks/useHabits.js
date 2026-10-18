// src/hooks/useHabits.js
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function useHabits() {
  const { user } = useAuth()
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .order('created_at', { ascending: true })
    if (!error) setHabits(data)
    setLoading(false)
  }, [user])

  useEffect(() => { load() }, [load])

  const toggleToday = async (habit) => {
    const novo = !habit.concluido_hoje
    const streak = novo ? habit.streak + 1 : Math.max(0, habit.streak - 1)
    const { error } = await supabase
      .from('habits')
      .update({ concluido_hoje: novo, streak })
      .eq('id', habit.id)
    if (!error) setHabits(prev => prev.map(h => h.id === habit.id ? { ...h, concluido_hoje: novo, streak } : h))
  }

  const criar = async (nome, frequencia = 'diario') => {
    const { data, error } = await supabase
      .from('habits')
      .insert({ nome, frequencia, user_id: user.id })
      .select()
      .single()
    if (!error) setHabits(prev => [...prev, data])
  }

  const remover = async (id) => {
    await supabase.from('habits').delete().eq('id', id)
    setHabits(prev => prev.filter(h => h.id !== id))
  }

  return { habits, loading, toggleToday, criar, remover }
}