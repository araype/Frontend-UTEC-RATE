import { useCallback } from 'react'
import { authService } from '../services/authService'
import type { LoginCredentials, RegisterCredentials, Role } from '../types/auth'

const ROLE_REDIRECT: Record<Role, string> = {
  ADMIN: '/admin',
  PROFESSOR: '/professor',
  STUDENT: '/student',
}

export const getRoleRedirect = (role: Role): string => ROLE_REDIRECT[role] ?? '/careers'

export const useAuth = () => {
  const login = useCallback(
    async (credentials: LoginCredentials) => authService.login(credentials),
    [],
  )

  const logout = useCallback(async () => {
    await authService.logout()
  }, [])

  const loginWithGoogle = useCallback(async () => authService.loginWithGoogle(), [])

  const register = useCallback(
    async (credentials: RegisterCredentials) => authService.register(credentials),
    [],
  )

  const registerWithGoogle = useCallback(async () => authService.loginWithGoogle(), [])

  const token = authService.getToken()
  const user = authService.getUser()

  return {
    isAuthenticated: Boolean(token),
    user,
    role: user?.role,
    isAdmin: user?.role === 'ADMIN',
    isStudent: user?.role === 'STUDENT',
    isProfessor: user?.role === 'PROFESSOR',
    login,
    loginWithGoogle,
    logout,
    register,
    registerWithGoogle,
    token,
  }
}
