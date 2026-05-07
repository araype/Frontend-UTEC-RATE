import { ms1 } from './axiosConfig'
import type { AuthResponse, LoginCredentials, RegisterCredentials, Role, User } from '../types/auth'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const USER_KEY = 'user'

// ── Mock auth (solo cuando VITE_MOCK_AUTH=true) ───────────────────────────────
const MOCK_ENABLED = import.meta.env.VITE_MOCK_AUTH === 'true'

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@utec.edu.pe': {
    password: 'admin123',
    user: { id: 1, email: 'admin@utec.edu.pe', name: 'Admin UTEC', role: 'ADMIN' },
  },
  'juan.perez@utec.edu.pe': {
    password: 'profesor123',
    user: { id: 2, email: 'juan.perez@utec.edu.pe', name: 'Juan Pérez', role: 'PROFESSOR' },
  },
  'maria.garcia@utec.edu.pe': {
    password: 'estudiante123',
    user: { id: 3, email: 'maria.garcia@utec.edu.pe', name: 'María García', role: 'STUDENT' },
  },
}

const loginMock = (credentials: LoginCredentials): AuthResponse => {
  const entry = MOCK_USERS[credentials.email]
  if (!entry || entry.password !== credentials.password) {
    throw new Error('Credenciales incorrectas')
  }
  saveSession('mock-access-token', 'mock-refresh-token', entry.user)
  return { token: 'mock-access-token', user: entry.user }
}
// ─────────────────────────────────────────────────────────────────────────────

const ROLE_MAP: Record<string, Role> = {
  ADMIN: 'ADMIN',
  PROFESOR: 'PROFESSOR',
  ESTUDIANTE: 'STUDENT',
}

const normalizeRole = (backendRole: string): Role => ROLE_MAP[backendRole] ?? 'STUDENT'

const decodeJwt = (token: string): Record<string, unknown> => {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return {}
  }
}

const saveSession = (accessToken: string, refreshToken: string, user: User) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

const buildUserFromPayload = (payload: Record<string, unknown>, fallbackEmail = ''): User => ({
  id: payload.sub as number,
  email: (payload.correo as string) ?? fallbackEmail,
  name: (payload.nombre as string) ?? '',
  role: normalizeRole(payload.rol as string),
})

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  if (MOCK_ENABLED) return loginMock(credentials)

  const { data } = await ms1.post('/auth/login', {
    correo: credentials.email,
    password: credentials.password,
  })

  const payload = decodeJwt(data.accessToken)
  const user = buildUserFromPayload(payload, credentials.email)
  saveSession(data.accessToken, data.refreshToken, user)
  return { token: data.accessToken, user }
}

// Google login requires a Firebase idToken obtained client-side.
// Pass the idToken here once Firebase is integrated.
const loginWithGoogle = async (idToken?: string): Promise<AuthResponse> => {
  if (!idToken) {
    // Placeholder: redirect to backend OAuth when Firebase is not yet wired up
    const ms1Url = import.meta.env.VITE_MS1_URL ?? 'http://localhost:3001'
    window.location.href = `${ms1Url}/oauth2/authorization/google`
    return new Promise(() => {})
  }

  const { data } = await ms1.post('/auth/google', { idToken })
  const payload = decodeJwt(data.accessToken)
  const user = buildUserFromPayload(payload)
  saveSession(data.accessToken, data.refreshToken, user)
  return { token: data.accessToken, user }
}

const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const [nombre, ...rest] = credentials.fullName.trim().split(' ')
  const apellido = rest.join(' ') || '-'

  const { data } = await ms1.post('/auth/register', {
    nombre,
    apellido,
    correo: credentials.email,
    password: credentials.password,
  })

  const payload = decodeJwt(data.accessToken)
  const user = buildUserFromPayload(payload, credentials.email)
  saveSession(data.accessToken, data.refreshToken, user)
  return { token: data.accessToken, user }
}

const refreshAccessToken = async (): Promise<string> => {
  const storedRefresh = localStorage.getItem(REFRESH_TOKEN_KEY)
  if (!storedRefresh) throw new Error('No refresh token disponible')

  const { data } = await ms1.post('/auth/refresh', { refreshToken: storedRefresh })
  localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken)
  return data.accessToken
}

const logout = async (): Promise<void> => {
  if (!MOCK_ENABLED) {
    try {
      await ms1.post('/auth/logout')
    } catch {
      // continuar con limpieza aunque falle el backend
    }
  }
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

const getMe = async (): Promise<User> => {
  const { data } = await ms1.get('/auth/me')
  return {
    id: data.id,
    email: data.correo,
    name: `${data.nombre ?? ''} ${data.apellido ?? ''}`.trim(),
    role: normalizeRole(data.rol),
  }
}

const getToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)

const getUser = (): User | null => {
  const userStr = localStorage.getItem(USER_KEY)
  return userStr ? (JSON.parse(userStr) as User) : null
}

const isAuthenticated = () => Boolean(getToken())

export const authService = {
  getToken,
  getUser,
  isAuthenticated,
  login,
  loginWithGoogle,
  logout,
  register,
  refreshAccessToken,
  getMe,
}
