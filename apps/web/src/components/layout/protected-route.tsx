import { useUser, useAuth } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'
import type { UserRole } from '@studyai/types'

interface ProtectedRouteProps {
  allowedRoles: UserRole[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!isSignedIn) {
    return <Navigate to="/login/aluno" replace />
  }

  // TODO: Get role from user metadata or API
  const userRole = (user?.publicMetadata?.role as UserRole) || 'student'

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}