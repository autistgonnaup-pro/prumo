// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Financas from './pages/Financas'
// ... imports

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()
  if (loading) return <div>Carregando...</div>
  return session ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/prumo">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route path="financas" element={<Financas />} />
            <Route path="habitos" element={<Habitos />} />
            <Route path="metas" element={<Metas />} />
            <Route path="tarefas" element={<Tarefas />} />
            <Route path="saude" element={<Saude />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}