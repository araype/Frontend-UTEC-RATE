import { useMemo, useState } from 'react'
import { ArrowLeft, Search } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import Pagination from '../components/Pagination'
import { careerService } from '../services/careerService'
import { courseService } from '../services/courseService'

const ITEMS_PER_PAGE = 12

function Courses() {
  const { careerId } = useParams()
  const parsedCareerId = Number(careerId)
  const career = Number.isNaN(parsedCareerId)
    ? undefined
    : careerService.getCareerById(parsedCareerId)

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const courses = useMemo(() => {
    if (!career) {
      return []
    }

    return courseService.getCoursesByCareerId(career.id)
  }, [career])

  const filteredCourses = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return courses
    }

    return courses.filter((course) => {
      return (
        course.name.toLowerCase().includes(normalized) ||
        course.code.toLowerCase().includes(normalized)
      )
    })
  }, [courses, query])

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)

  const pagedCourses = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE
    return filteredCourses.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredCourses, safePage])

  if (!career) {
    return (
      <section className="glass-panel rounded-3xl p-8 border border-card-border">
        <h1 className="text-2xl font-bold text-foreground">Carrera no encontrada</h1>
        <p className="mt-2 text-secondary">Selecciona una carrera válida para continuar.</p>
        <Link
          to="/careers"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a carreras
        </Link>
      </section>
    )
  }

  return (
    <div className="space-y-6 animate-review-enter">
      <Link
        to="/careers"
        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        Volver a carreras
      </Link>

      <header className="flex flex-col gap-2 rounded-2xl border border-card-border bg-card p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
          {career.code}
        </p>
        <h1 className="text-2xl font-bold text-foreground font-display">{career.name}</h1>
        <p className="text-xs text-secondary/70 max-w-2xl">{career.description}</p>

        <div className="relative mt-2 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-secondary/50" />
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
            placeholder="Buscar curso..."
            className="h-9 w-full rounded-lg bg-foreground/5 border border-card-border pl-9 pr-4 text-xs text-foreground outline-none focus:border-primary/50 transition-all"
          />
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pagedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </section>

      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={safePage}
          onPageChange={setPage}
          totalItems={filteredCourses.length}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}

export default Courses
