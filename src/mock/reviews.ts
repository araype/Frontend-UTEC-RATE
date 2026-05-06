import type { Review } from '../types/review'

export const mockReviewsByProfessorId: Record<number, Review[]> = {
  1: [
    { id: 1, professorId: 1, rating: 5, comment: 'Muy didactico y claro con la complejidad de algoritmos.', author: 'Alumno UTEC', createdAt: '2026-04-10' },
    { id: 2, professorId: 1, rating: 4, comment: 'Deja retos exigentes, pero explica como resolverlos.', author: 'Alumno UTEC', createdAt: '2026-04-03' },
  ],
  2: [
    { id: 3, professorId: 2, rating: 4, comment: 'Buena estructura de clase y laboratorios bien guiados.', author: 'Alumno UTEC', createdAt: '2026-04-09' },
    { id: 4, professorId: 2, rating: 3, comment: 'Exigente en examenes, pero justo con criterios.', author: 'Alumno UTEC', createdAt: '2026-03-28' },
  ],
  3: [
    { id: 5, professorId: 3, rating: 5, comment: 'Excelente enfoque practico para arquitectura cloud.', author: 'Alumno UTEC', createdAt: '2026-04-11' },
    { id: 6, professorId: 3, rating: 5, comment: 'Muy recomendado, aprendes cosas aplicables al trabajo.', author: 'Alumno UTEC', createdAt: '2026-04-01' },
  ],
  4: [{ id: 7, professorId: 4, rating: 4, comment: 'Organiza bien los proyectos y da feedback detallado.', author: 'Alumno UTEC', createdAt: '2026-03-30' }],
  5: [{ id: 8, professorId: 5, rating: 4, comment: 'Buen nivel tecnico y ejercicios interesantes.', author: 'Alumno UTEC', createdAt: '2026-03-27' }],
  6: [{ id: 9, professorId: 6, rating: 5, comment: 'Explica IA de forma clara y cercana.', author: 'Alumno UTEC', createdAt: '2026-04-08' }],
}

export const createFallbackReviews = (professorId: number): Review[] => [
  { id: Number(`${professorId}01`), professorId, rating: 4, comment: 'Explica de forma ordenada y responde dudas en clase.', author: 'Alumno UTEC', createdAt: '2026-04-06' },
  { id: Number(`${professorId}02`), professorId, rating: 5, comment: 'Muy didactico y cercano en evaluaciones practicas.', author: 'Alumno UTEC', createdAt: '2026-03-22' },
  { id: Number(`${professorId}03`), professorId, rating: 4, comment: 'Buena metodologia, aunque con carga exigente.', author: 'Alumno UTEC', createdAt: '2026-03-10' },
]
