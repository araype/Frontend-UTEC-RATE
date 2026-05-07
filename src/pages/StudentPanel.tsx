import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, MagnifyingGlass, Star, Calendar } from '@phosphor-icons/react'
import { cursosService, type Curso } from '../services/cursosService'
import { myReviewService } from '../services/myReviewService'

type StudentTab = 'Cursos' | 'Mis Reseñas'
const TABS: StudentTab[] = ['Cursos', 'Mis Reseñas']
const LIMIT = 12

// ── Tab Cursos ────────────────────────────────────────────────────────────────
function CursosTab() {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async (p: number, q: string) => {
    try {
      setLoading(true)
      setError(null)
      const res = await cursosService.getCursos({ pagina: p, limite: LIMIT, q: q || undefined })
      setCursos(res.data)
      setTotal(res.meta.total)
    } catch {
      setError('No se pudieron cargar los cursos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load(page, searchQuery) }, [page, searchQuery])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    setPage(1)
    setSearchQuery(searchInput)
  }

  const totalPages = Math.max(1, Math.ceil(total / LIMIT))

  return (
    <div className="space-y-5">
      {/* Búsqueda */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar curso por nombre..."
            className="w-full rounded-xl border border-card-border bg-foreground/5 py-3 pl-11 pr-4 text-sm text-foreground outline-none focus:border-primary/50 placeholder:text-foreground/30"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-hover transition-all"
        >
          Buscar
        </button>
        {searchQuery && (
          <button
            type="button"
            onClick={() => { setSearchInput(''); setSearchQuery(''); setPage(1) }}
            className="rounded-xl border border-card-border bg-foreground/5 px-4 py-3 text-sm text-secondary hover:bg-foreground/10 transition-all"
          >
            Limpiar
          </button>
        )}
      </form>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cursos.map((c) => (
              <Link
                key={c.id}
                to={`/courses/${c.id}/professors`}
                className="glass-card group flex flex-col justify-between rounded-2xl border border-card-border overflow-hidden hover:border-primary/30 transition-all"
              >
                <div className="h-1.5 w-full" style={{ backgroundColor: c.colorHex }} />
                <div className="flex flex-col flex-1 p-5">
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-all group-hover:scale-105"
                    style={{ backgroundColor: `${c.colorHex}20`, color: c.colorHex }}
                  >
                    <BookOpen size={20} weight="duotone" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/50">{c.codigo}</p>
                  <h2 className="mt-1 text-sm font-bold text-foreground font-display line-clamp-2">{c.nombre}</h2>
                  <p className="mt-1 text-[11px] text-secondary/60">{c.creditos} créditos</p>
                  <div className="mt-4 pt-4 border-t border-card-border">
                    <span className="text-[10px] font-bold text-primary group-hover:underline">
                      Ver profesores →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            {cursos.length === 0 && (
              <p className="col-span-full py-16 text-center text-secondary">
                {searchQuery ? `Sin resultados para "${searchQuery}".` : 'No hay cursos disponibles.'}
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg border border-card-border bg-foreground/5 px-4 py-2 text-sm text-secondary hover:bg-foreground/10 disabled:opacity-40 transition-all"
              >
                Anterior
              </button>
              <span className="text-sm text-secondary">Página {page} de {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-card-border bg-foreground/5 px-4 py-2 text-sm text-secondary hover:bg-foreground/10 disabled:opacity-40 transition-all"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ── Tab Mis Reseñas ───────────────────────────────────────────────────────────
function MisResenasTab() {
  const reviews = myReviewService.getMyReviews()

  if (reviews.length === 0) {
    return (
      <p className="py-16 text-center text-secondary">Aún no has escrito ninguna reseña.</p>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <article
          key={r.id}
          className="rounded-2xl border border-card-border bg-foreground/[0.03] p-5 transition-colors hover:bg-foreground/5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-foreground">{r.courseName}</h3>
              <p className="text-sm text-secondary">Prof. {r.professor}</p>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  weight={i < r.rating ? 'fill' : 'regular'}
                  className={i < r.rating ? 'text-yellow-400' : 'text-secondary/30'}
                />
              ))}
              <span className="ml-1.5 text-xs font-bold text-foreground">{r.rating}.0</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-foreground/80 leading-relaxed">"{r.comment}"</p>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-secondary/60">
            <Calendar size={12} />
            {r.createdAt}
          </div>
        </article>
      ))}
    </div>
  )
}

// ── Panel principal ───────────────────────────────────────────────────────────
export default function StudentPanel() {
  const [tab, setTab] = useState<StudentTab>('Cursos')

  return (
    <div className="space-y-6 animate-review-enter">
      <header className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-8 border border-card-border">
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Panel Estudiante</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground font-display">
            {tab === 'Cursos' ? 'Catálogo de Cursos' : 'Mis Reseñas'}
          </h1>
          <p className="mt-2 text-sm text-secondary font-medium">
            {tab === 'Cursos'
              ? 'Explora los cursos disponibles y consulta las valoraciones de cada profesor.'
              : 'Historial de tus calificaciones y comentarios.'}
          </p>
        </div>
      </header>

      {/* Tab bar */}
      <div className="flex gap-1 rounded-2xl border border-card-border bg-foreground/5 p-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
              tab === t
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'text-secondary hover:text-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Contenido */}
      {tab === 'Cursos' && <CursosTab />}
      {tab === 'Mis Reseñas' && <MisResenasTab />}
    </div>
  )
}
