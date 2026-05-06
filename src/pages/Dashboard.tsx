import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Sparkle } from '@phosphor-icons/react'
import Pagination from '../components/Pagination'
import { careerService } from '../services/careerService'

const ITEMS_PER_PAGE = 10

function Dashboard() {
  const careers = careerService.getCareers()
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(careers.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)

  const pagedCareers = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE
    return careers.slice(start, start + ITEMS_PER_PAGE)
  }, [careers, safePage])

  return (
    <div className="space-y-6 animate-review-enter">
      <header className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-8 border border-card-border">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Sparkle size={120} weight="fill" className="text-primary" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Ruta académica URATE
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl font-display">
            Carreras
          </h1>
          <p className="mt-2 text-sm text-secondary font-medium leading-relaxed max-w-xl">
            Explora el catálogo de carreras y descubre los cursos mejor valorados por la comunidad estudiantil.
          </p>
        </div>
      </header>

      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {pagedCareers.map((career) => (
            <Link
              key={career.id}
              to={`/careers/${career.id}/courses`}
              className="glass-card flex flex-col justify-between rounded-2xl border border-card-border p-5 hover:border-primary/30 transition-all group"
            >
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <GraduationCap size={20} weight="duotone" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">
                  {career.code}
                </p>
                <h2 className="mt-1 text-lg font-bold text-foreground font-display line-clamp-1">
                  {career.name}
                </h2>
                <p className="mt-2 text-xs text-secondary/70 leading-relaxed line-clamp-2">
                  {career.description}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-card-border flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary">
                  {career.coursesCount} CURSOS
                </span>
                <div className="h-6 w-6 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/50 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                   <Sparkle size={12} weight="fill" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={safePage}
            onPageChange={setPage}
            totalItems={careers.length}
            totalPages={totalPages}
          />
        </div>
      </section>
    </div>
  )
}

export default Dashboard
