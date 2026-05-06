import type { Student } from '../types/student'

export const mockStudentsByCourseId: Record<number, Student[]> = {
  1: [
    { id: 1, name: 'Camila Torres', major: 'CS', semester: 4 },
    { id: 2, name: 'Diego Flores', major: 'CS', semester: 5 },
    { id: 3, name: 'Andrea Ruiz', major: 'DS', semester: 4 },
    { id: 4, name: 'Mateo Pineda', major: 'CS', semester: 6 },
  ],
  3: [
    { id: 5, name: 'Lucia Arias', major: 'SE', semester: 5 },
    { id: 6, name: 'Joaquin Salas', major: 'SE', semester: 6 },
    { id: 7, name: 'Valeria Cabanillas', major: 'DS', semester: 5 },
    { id: 8, name: 'Renata Soria', major: 'DS', semester: 6 },
  ],
  9: [
    { id: 9, name: 'Ariana Vega', major: 'CS', semester: 7 },
    { id: 10, name: 'Sergio Diaz', major: 'DS', semester: 7 },
    { id: 11, name: 'Jimena Vera', major: 'CS', semester: 8 },
    { id: 12, name: 'Pablo Contreras', major: 'SE', semester: 7 },
  ],
}

export const mockFallbackStudents: Student[] = [
  { id: 21, name: 'Alumno UTEC 1', major: 'CS', semester: 4 },
  { id: 22, name: 'Alumno UTEC 2', major: 'SE', semester: 5 },
  { id: 23, name: 'Alumno UTEC 3', major: 'DS', semester: 6 },
  { id: 24, name: 'Alumno UTEC 4', major: 'CS', semester: 7 },
  { id: 25, name: 'Alumno UTEC 5', major: 'SE', semester: 8 },
]
