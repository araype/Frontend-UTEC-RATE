import {
  createFallbackReviews,
  mockReviewsByProfessorId as reviewsByProfessorId,
} from '../mock/reviews'
import type { Review } from '../types/review'

const getReviewsByProfessorId = (professorId: number): Review[] => {
  const reviews = reviewsByProfessorId[professorId] ?? createFallbackReviews(professorId)
  return reviews.map((review) => ({ ...review }))
}

export const reviewService = {
  getReviewsByProfessorId,
}
