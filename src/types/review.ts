export interface Review {
  id: number
  professorId: number
  rating: number
  comment: string
  author: string
  createdAt: string
}

export interface NewReview {
  rating: number
  comment: string
}
