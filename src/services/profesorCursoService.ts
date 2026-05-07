import { ms2 } from './axiosConfig'

// Semestre acepta solo formato "YYYY-1" o "YYYY-2"
export type Semestre = `${number}-1` | `${number}-2`

export interface ProfesorCurso {
  id: number
  profesorId: string
  cursoId: number
  semestre: string
  seccion: string
}

export interface ProfesorDeCurso {
  profesorCursoId: number
  profesorId: string
  nombre: string
  apellido: string
  semestre: string
  seccion: string
}

export interface CursoAsignado {
  profesorCursoId: number
  cursoId: number
  nombre: string
  codigo: string
  colorHex: string
  creditos: number
  semestre: string
  seccion: string
}

export interface AsignarProfesorPayload {
  profesorId: string
  cursoId: number
  semestre: Semestre
  seccion: string
}

const getProfesoresDeCurso = async (cursoId: number): Promise<ProfesorDeCurso[]> => {
  const { data } = await ms2.get<ProfesorDeCurso[]>(`/cursos/${cursoId}/profesores`)
  return data
}

const getCursosDeProfesor = async (profesorId: string): Promise<CursoAsignado[]> => {
  const { data } = await ms2.get<CursoAsignado[]>(`/profesores/${profesorId}/cursos`)
  return data
}

const asignarProfesor = async (payload: AsignarProfesorPayload): Promise<ProfesorCurso> => {
  const { data } = await ms2.post<ProfesorCurso>('/profesor-curso', payload)
  return data
}

const desactivarAsignacion = async (id: number): Promise<void> => {
  await ms2.delete(`/profesor-curso/${id}`)
}

export const profesorCursoService = {
  getProfesoresDeCurso,
  getCursosDeProfesor,
  asignarProfesor,
  desactivarAsignacion,
}
