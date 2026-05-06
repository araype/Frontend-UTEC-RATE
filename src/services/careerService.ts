import { mockCareers as careers } from '../mock/careers'

const getCareers = () => careers

const getCareerById = (id: number) => careers.find((career) => career.id === id)

export const careerService = {
  getCareerById,
  getCareers,
}
