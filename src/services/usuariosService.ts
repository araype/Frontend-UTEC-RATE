import { ms1 } from './axiosConfig'

export type BackendRol = 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE'

export interface Usuario {
  id: string
  nombre: string
  apellido: string
  correo: string
  rol: BackendRol
}

export interface CreateUsuarioPayload {
  nombre: string
  apellido: string
  correo: string
  password: string
  rol: BackendRol
}

export interface UpdateUsuarioPayload {
  nombre?: string
  apellido?: string
  correo?: string
  password?: string
  rol?: BackendRol
}

const getUsuarios = async (): Promise<Usuario[]> => {
  const { data } = await ms1.get<Usuario[]>('/usuarios')
  return data
}

const getUsuarioById = async (id: string): Promise<Usuario> => {
  const { data } = await ms1.get<Usuario>(`/usuarios/${id}`)
  return data
}

const createUsuario = async (payload: CreateUsuarioPayload): Promise<Usuario> => {
  const { data } = await ms1.post<Usuario>('/usuarios', payload)
  return data
}

const updateUsuario = async (id: string, payload: UpdateUsuarioPayload): Promise<Usuario> => {
  const { data } = await ms1.put<Usuario>(`/usuarios/${id}`, payload)
  return data
}

const deleteUsuario = async (id: string): Promise<void> => {
  await ms1.delete(`/usuarios/${id}`)
}

const changeRol = async (id: string, rol: BackendRol): Promise<Usuario> => {
  const { data } = await ms1.put<Usuario>(`/admin/usuarios/${id}/role`, { rol })
  return data
}

export const usuariosService = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  changeRol,
}
