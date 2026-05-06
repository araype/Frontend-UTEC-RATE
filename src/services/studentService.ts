import {
  mockFallbackStudents as fallbackStudents,
  mockStudentsByCourseId as studentsByCourseId,
} from '../mock/students'
import type { Student } from '../types/student'

const getStudentsByCourseId = (courseId: number): Student[] => {
  return studentsByCourseId[courseId] ?? fallbackStudents
}

export const studentService = {
  getStudentsByCourseId,
}
