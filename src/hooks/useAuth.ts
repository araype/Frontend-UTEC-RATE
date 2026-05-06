import { useCallback } from 'react'
import { authService } from '../services/authService'
import type { LoginCredentials, RegisterCredentials } from '../types/auth'

export const useAuth = () => {
  const login = useCallback(
    async (credentials: LoginCredentials) => authService.login(credentials),
    [],
  )

  const logout = useCallback(() => {
    authService.logout()
  }, [])

  const loginWithGoogle = useCallback(async () => authService.loginWithGoogle(), [])

  const register = useCallback(
    async (credentials: RegisterCredentials) => authService.register(credentials),
    [],
  )

  const registerWithGoogle = useCallback(
    async () => authService.registerWithGoogle(),
    [],
  )

  const token = authService.getToken()

  return {
    isAuthenticated: Boolean(token),
    login,
    loginWithGoogle,
    logout,
    register,
    registerWithGoogle,
    token,
  }
}
