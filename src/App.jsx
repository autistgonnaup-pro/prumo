import { useEffect } from 'react'
import { supabase } from './lib/supabase'

function App() {
  useEffect(() => {
    async function testarConexao() {
      const { data, error } = await supabase.auth.getSession()
      console.log('Supabase conectado:', { data, error })
    }
    testarConexao()
  }, [])

  return <h1>Prumo</h1>
}

export default App