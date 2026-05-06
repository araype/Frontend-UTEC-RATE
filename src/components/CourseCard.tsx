import { Link } from 'react-router-dom'
import type { Course } from '../types/course'
import StarRating from './StarRating'
import { ArrowSquareOut, BookBookmark, UserCircle } from '@phosphor-icons/react'

interface CourseCardProps {
  course: Course
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      to={`/courses/${course.id}/professors`}
      className="group glass-card relative flex flex-col overflow-hidden rounded-2xl p-4 transition-all hover:border-primary/30"
    >
      <div className="absolute top-0 right-0 p-3 opacity-0 transition-all duration-300 translate-x-2 -translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary backdrop-blur-md border border-primary/20">
          <ArrowSquareOut size={16} weight="bold" />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:rotate-3">
            <BookBookmark size={20} weight="duotone" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-foreground font-display leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {course.name}
            </h3>
            <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-0.5">
              {course.code}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs text-secondary/70 line-clamp-2 leading-relaxed h-8">
            {course.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-secondary/60 font-medium">
            <UserCircle size={16} weight="bold" className="text-primary/40" />
            <span>
              <span className="text-foreground/80">{course.professorsCount}</span> profesores
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-card-border">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-foreground">{course.averageRating.toFixed(1)}</span>
              <div className="scale-75 origin-left">
                <StarRating rating={course.averageRating} />
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">Reseñas: </span>
              <span className="text-xs font-bold text-foreground/80">{course.reviewsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
