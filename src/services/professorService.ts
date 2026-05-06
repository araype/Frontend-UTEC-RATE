import {
  mockProfessors as professors,
  mockProfessorsByCourseId as professorsByCourseId,
} from '../mock/professors'
import type { Professor } from '../types/professor'

const getProfessorById = (id: number) => professors.find((professor) => professor.id === id)

const getProfessorsByCourseId = (courseId: number) => {
  const ids = professorsByCourseId[courseId] ?? []
  return ids
    .map((id) => getProfessorById(id))
    .filter((professor): professor is Professor => Boolean(professor))
}

export const professorService = {
  getProfessorById,
  getProfessorsByCourseId,
}
