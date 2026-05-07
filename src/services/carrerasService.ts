import { ms2 } from './axiosConfig'

export interface Carrera {
  id: number
  nombre: string
  codigo: string
  activa: boolean
}

export interface CarreraPayload {
  nombre: string
  codigo: string
  activa: boolean
}

const getCarreras = async (): Promise<Carrera[]> => {
  const { data } = await ms2.get<Carrera[]>('/carreras')
  return data
}

const getCarreraById = async (id: number): Promise<Carrera> => {
  const { data } = await ms2.get<Carrera>(`/carreras/${id}`)
  return data
}

const createCarrera = async (payload: CarreraPayload): Promise<Carrera> => {
  const { data } = await ms2.post<Carrera>('/carreras', payload)
  return data
}

const updateCarrera = async (id: number, payload: CarreraPayload): Promise<Carrera> => {
  const { data } = await ms2.put<Carrera>(`/carreras/${id}`, payload)
  return data
}

const deleteCarrera = async (id: number): Promise<void> => {
  await ms2.delete(`/carreras/${id}`)
}

export const carrerasService = {
  getCarreras,
  getCarreraById,
  createCarrera,
  updateCarrera,
  deleteCarrera,
}
