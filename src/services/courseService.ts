import { mockCourses as courses } from '../mock/courses'

const getCourses = () => courses

const getCoursesByCareerId = (careerId: number) =>
  courses.filter((course) => course.careerId === careerId)

const getCourseById = (id: number) => courses.find((course) => course.id === id)

export const courseService = {
  getCourseById,
  getCourses,
  getCoursesByCareerId,
}
