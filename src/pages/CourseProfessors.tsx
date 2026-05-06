import { useMemo, useState } from 'react'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import { courseService } from '../services/courseService'
import { professorService } from '../services/professorService'

const ITEMS_PER_PAGE = 8

function CourseProfessors() {
  const { courseId } = useParams()
  const parsedCourseId = Number(courseId)
  const course = Number.isNaN(parsedCourseId)
    ? undefined
    : courseService.getCourseById(parsedCourseId)

  const [page, setPage] = useState(1)
  const professors = useMemo(() => {
    if (!course) {
      return []
    }

    return professorService.getProfessorsByCourseId(course.id)
  }, [course])
  const totalPages = Math.max(1, Math.ceil(professors.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)

  const pagedProfessors = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE
    return professors.slice(start, start + ITEMS_PER_PAGE)
  }, [professors, safePage])

  if (!course) {
    return (
      <section className="glass-panel rounded-3xl p-8 border border-card-border">
        <h1 className="text-2xl font-bold text-foreground">Curso no encontrado</h1>
        <Link to="/careers" className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
          Volver a carreras
        </Link>
      </section>
    )
  }

  return (
    <div className="space-y-6 animate-review-enter">
      <Link
        to={`/careers/${course.careerId}/courses`}
        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        Volver a cursos
      </Link>

      <header className="rounded-2xl border border-card-border bg-card p-5">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">
          <BookOpen className="h-3.5 w-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">{course.code}</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground font-display">{course.name}</h1>
        <p className="mt-1 text-xs text-secondary/70">{course.description}</p>
      </header>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {pagedProfessors.map((professor) => (
          <article
            key={professor.id}
            className="glass-panel group rounded-2xl border border-card-border p-4 hover:border-primary/30 transition-all"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={professor.photo}
                  alt={professor.name}
                  className="h-12 w-12 rounded-xl object-cover border border-card-border transition-transform group-hover:scale-105"
                />
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-foreground font-display line-clamp-1">{professor.name}</h2>
                  <p className="text-[10px] text-secondary/50 uppercase font-bold tracking-wider">{professor.department}</p>
                </div>
              </div>

              <Link
                to={`/professors/${professor.id}`}
                className="inline-flex rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all whitespace-nowrap"
              >
                Ver opiniones
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] font-bold uppercase tracking-widest border-t border-card-border pt-3">
              <div className="text-center">
                <p className="text-secondary/40 mb-0.5">Exp</p>
                <p className="text-foreground">{professor.yearsExperience}A</p>
              </div>
              <div className="text-center border-x border-card-border">
                <p className="text-secondary/40 mb-0.5">Didáctica</p>
                <p className="text-primary">{professor.didacticScore.toFixed(1)}</p>
              </div>
              <div className="text-center">
                <p className="text-secondary/40 mb-0.5">Rating</p>
                <p className="text-foreground">{professor.averageRating.toFixed(1)}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={safePage}
          onPageChange={setPage}
          totalItems={professors.length}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}

export default CourseProfessors
