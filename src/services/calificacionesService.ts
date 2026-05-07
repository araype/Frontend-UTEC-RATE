// TODO: conectar cuando MS3 esté documentado
import { ms3 } from './axiosConfig'

export interface Calificacion {
  id: string
  profesor_curso_id: number
  estudiante_id: string | null
  puntaje: number
  comentario: string | null
  anonimo: boolean
  creado_en: string
  actualizado_en: string | null
}

export interface CalificacionPayload {
  profesor_curso_id: number
  puntaje: number      // 1.0 – 5.0, el backend lo redondea al 0.5 más cercano
  comentario?: string  // máx 500 caracteres
  anonimo?: boolean    // default true
}

export interface CalificacionUpdatePayload {
  puntaje?: number
  comentario?: string
  anonimo?: boolean
}

export interface ResumenProfesor {
  profesor_id: string
  total: number
  promedio: number
  distribucion: Record<number, number>
}

const crear = async (payload: CalificacionPayload): Promise<Calificacion> => {
  const { data } = await ms3.post<Calificacion>('/calificaciones/', payload)
  return data
}

const editar = async (id: string, payload: CalificacionUpdatePayload): Promise<Calificacion> => {
  const { data } = await ms3.put<Calificacion>(`/calificaciones/${id}`, payload)
  return data
}

const eliminar = async (id: string): Promise<void> => {
  await ms3.delete(`/calificaciones/${id}`)
}

const listarPorProfesorCurso = async (profesorCursoId: number): Promise<Calificacion[]> => {
  const { data } = await ms3.get<Calificacion[]>(`/calificaciones/profesor-curso/${profesorCursoId}`)
  return data
}

const resumenProfesor = async (profesorId: string): Promise<ResumenProfesor> => {
  const { data } = await ms3.get<ResumenProfesor>(`/calificaciones/resumen/profesor/${profesorId}`)
  return data
}

export const calificacionesService = {
  crear,
  editar,
  eliminar,
  listarPorProfesorCurso,
  resumenProfesor,
}
