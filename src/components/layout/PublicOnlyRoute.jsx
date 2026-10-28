import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <div className="min-h-screen bg-bg" />
  if (user) return <Navigate to="/app" replace />
  return children
}