import { useMemo, useState } from 'react'
import { ArrowLeft, BriefcaseBusiness, GraduationCap, MessageSquare } from 'lucide-react'
import { Sparkle } from '@phosphor-icons/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AddReviewForm from '../components/AddReviewForm'
import AIInsights from '../components/AIInsights'
import ReviewsList from '../components/ReviewsList'
import StarRating from '../components/StarRating'
import { professorService } from '../services/professorService'
import { reviewService } from '../services/reviewService'
import type { NewReview, Review } from '../types/review'

const calcAverage = (reviews: Review[]) => {
  if (!reviews.length) {
    return 0
  }

  const total = reviews.reduce((acc, item) => acc + item.rating, 0)
  return total / reviews.length
}

function ProfessorDetail() {
  const { professorId } = useParams()
  const navigate = useNavigate()
  const parsedProfessorId = Number(professorId)
  const professor = Number.isNaN(parsedProfessorId)
    ? undefined
    : professorService.getProfessorById(parsedProfessorId)

  const [reviews, setReviews] = useState<Review[]>(
    professor ? reviewService.getReviewsByProfessorId(professor.id) : [],
  )

  const averageRating = useMemo(() => calcAverage(reviews), [reviews])

  const handleAddReview = (newReview: NewReview) => {
    if (!professor) {
      return
    }

    setReviews((current) => [
      {
        id: Date.now(),
        professorId: professor.id,
        rating: newReview.rating,
        comment: newReview.comment,
        author: 'Alumno UTEC',
        createdAt: '2026-04-29',
      },
      ...current,
    ])
  }

  if (!professor) {
    return (
      <section className="glass-panel rounded-3xl p-8 border border-card-border">
        <h1 className="text-2xl font-bold text-foreground">Profesor no encontrado</h1>
        <Link to="/careers" className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
          Volver a carreras
        </Link>
      </section>
    )
  }

  return (
    <div className="space-y-6 animate-review-enter">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        Volver
      </button>

      <section className="glass-panel rounded-2xl border border-card-border p-5 bg-card">
        <div className="flex flex-col gap-5 md:flex-row md:items-start">
          <div className="relative group">
            <img
              src={professor.photo}
              alt={professor.name}
              className="h-20 w-20 rounded-2xl object-cover border border-card-border transition-transform group-hover:scale-105"
            />
            <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-lg bg-primary flex items-center justify-center text-white border border-background">
               <Sparkle size={12} weight="fill" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground font-display">{professor.name}</h1>
              <span className="px-2 py-0.5 rounded-full bg-foreground/5 border border-card-border text-[9px] font-bold uppercase text-secondary/60">Verified Professor</span>
            </div>
            <p className="mt-1 text-xs text-secondary/70 leading-relaxed max-w-2xl">{professor.bio}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-widest">
              <span className="inline-flex items-center gap-2 text-secondary/50">
                <BriefcaseBusiness className="h-3.5 w-3.5 text-primary/60" />
                <span className="text-foreground/80">{professor.yearsExperience} años exp</span>
              </span>
              <span className="inline-flex items-center gap-2 text-secondary/50">
                <GraduationCap className="h-3.5 w-3.5 text-primary/60" />
                <span className="text-foreground/80">{professor.department}</span>
              </span>
              <span className="inline-flex items-center gap-2 text-secondary/50">
                <MessageSquare className="h-3.5 w-3.5 text-primary/60" />
                <span className="text-foreground/80">{reviews.length} opiniones</span>
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-card-border bg-foreground/[0.03] p-4 text-center md:text-right min-w-[120px]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/40 mb-1">Score</p>
            <p className="text-3xl font-black text-foreground">{averageRating.toFixed(1)}</p>
            <div className="flex justify-center md:justify-end mt-1 scale-90">
              <StarRating rating={averageRating} />
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-card-border">
          <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">
            Cursos asignados: <span className="text-foreground/80 ml-2">{professor.coursesTaught.join(' • ')}</span>
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-4 space-y-6">
          <AIInsights averageRating={averageRating} />
          <AddReviewForm onAddReview={handleAddReview} />
        </div>
        <div className="xl:col-span-8">
          <ReviewsList reviews={reviews} />
        </div>
      </div>
    </div>
  )
}

export default ProfessorDetail
