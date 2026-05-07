import { ms2 } from './axiosConfig'

export interface Curso {
  id: number
  carreraId: number
  nombre: string
  codigo: string
  colorHex: string
  creditos: number
}

export interface CursoPayload {
  carreraId: number
  nombre: string
  codigo: string
  colorHex: string
  creditos: number
}

export interface PaginatedCursos {
  data: Curso[]
  meta: {
    pagina: number
    limite: number
    total: number
  }
}

export interface CursosQuery {
  pagina?: number
  limite?: number
  q?: string
}

const getCursos = async (query: CursosQuery = {}): Promise<PaginatedCursos> => {
  const { pagina = 1, limite = 10, q } = query
  const params: Record<string, unknown> = { pagina, limite }
  if (q) params.q = q

  const { data } = await ms2.get<PaginatedCursos>('/cursos', { params })
  return data
}

const getCursosByCarrera = async (carreraId: number): Promise<Curso[]> => {
  const { data } = await ms2.get<Curso[]>(`/carreras/${carreraId}/cursos`)
  return data
}

const getCursoById = async (id: number): Promise<Curso> => {
  const { data } = await ms2.get<Curso>(`/cursos/${id}`)
  return data
}

const createCurso = async (payload: CursoPayload): Promise<Curso> => {
  const { data } = await ms2.post<Curso>('/cursos', payload)
  return data
}

const updateCurso = async (id: number, payload: CursoPayload): Promise<Curso> => {
  const { data } = await ms2.put<Curso>(`/cursos/${id}`, payload)
  return data
}

const deleteCurso = async (id: number): Promise<void> => {
  await ms2.delete(`/cursos/${id}`)
}

export const cursosService = {
  getCursos,
  getCursosByCarrera,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso,
}
