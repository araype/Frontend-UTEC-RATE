import { ArrowRight, Star } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import {
  faqs,
  highlights,
  quickStats,
  testimonials,
  valuePillars,
} from './landingData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] as const },
  },
}

export function LandingHeroSection() {
  return (
    <section className="mt-24 mb-24 flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 mb-8"
      >
        <HiOutlineSparkles className="h-4 w-4 text-primary animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
          Elige mejor tus profesores
        </span>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
        className="relative max-w-5xl text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl font-display"
      >
        Decisiones académicas
        <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-purple-400">
          impulsadas por experiencia real.
        </span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
        className="mt-8 max-w-2xl text-lg text-secondary font-medium leading-relaxed md:text-xl"
      >
        En URATE navegas por carrera, curso y profesor para encontrar docentes
        didácticos, secciones recomendadas y opiniones que realmente te ayudan.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.24, ease: 'easeOut' }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          to="/register"
          className="group inline-flex items-center gap-3 rounded-2xl bg-foreground px-8 py-4 text-base font-bold text-background transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Crear cuenta gratis
          <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to="/login"
          className="inline-flex items-center rounded-2xl border border-card-border px-8 py-4 text-base font-bold text-foreground hover:bg-foreground/10"
        >
          Iniciar sesión
        </Link>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-16 grid w-full grid-cols-1 gap-4 md:grid-cols-4"
      >
        {quickStats.map((item) => {
          const Icon = item.icon

          return (
            <motion.article
              key={item.label}
              variants={itemVariants}
              className="rounded-2xl border border-card-border bg-foreground/[0.03] p-5 text-left"
            >
              <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
                <Icon size={18} weight="duotone" />
              </div>
              <p className="text-2xl font-extrabold text-foreground font-display">{item.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-secondary">{item.label}</p>
            </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}

export function LandingHighlightsSection() {
  return (
    <section className="py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold text-white font-display md:text-5xl">Por que usar URATE</h2>
        <p className="mt-3 text-slate-400">Contenido real para elegir mejor y aprender de verdad.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon
          return (
            <article
              key={item.title}
              className="group rounded-[2rem] border border-card-border bg-foreground/[0.02] p-8 transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 border border-card-border transition-transform duration-200 group-hover:scale-110">
                <Icon size={28} weight="duotone" className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-display mb-3">{item.title}</h3>
              <p className="text-secondary leading-relaxed">{item.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export function LandingPillarsSection() {
  return (
    <section className="py-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {valuePillars.map((item) => {
        const Icon = item.icon
        return (
          <article key={item.title} className="rounded-[2rem] border border-card-border bg-foreground/[0.02] p-7">
            <div className="mb-5 inline-flex rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
              <Icon size={22} weight="duotone" />
            </div>
            <h3 className="text-xl font-bold text-foreground font-display mb-2">{item.title}</h3>
            <p className="text-secondary leading-relaxed">{item.description}</p>
          </article>
        )
      })}
    </section>
  )
}

export function LandingTestimonialsSection() {
  return (
    <section className="py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold text-white font-display md:text-4xl">Lo que dicen los estudiantes</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.author} className="rounded-[2rem] border border-card-border bg-foreground/[0.03] p-7">
            <div className="mb-4 flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={`${item.author}-${i}`} size={14} weight="fill" />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">"{item.quote}"</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-secondary">{item.author}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function LandingFaqSection() {
  return (
    <section className="py-16 rounded-[2.5rem] border border-card-border bg-foreground/[0.02] p-8 md:p-10">
      <h2 className="text-3xl font-extrabold text-foreground font-display text-center md:text-4xl">Preguntas frecuentes</h2>
      <div className="mt-8 space-y-4">
        {faqs.map((faq) => {
          const Icon = faq.icon
          return (
            <article key={faq.question} className="rounded-2xl border border-card-border bg-foreground/[0.03] p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex rounded-lg bg-primary/10 p-1.5 text-primary">
                  <Icon size={14} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/90">{faq.question}</h3>
                  <p className="mt-2 text-sm text-secondary leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export function LandingCtaSection() {
  return (
    <section className="my-20 rounded-[2.5rem] border border-primary/20 bg-gradient-to-r from-primary/20 via-blue-700/5 to-purple-500/10 p-10 text-center">
      <h2 className="text-3xl font-extrabold text-foreground font-display md:text-4xl">Listo para elegir mejor tus profesores?</h2>
      <p className="mx-auto mt-4 max-w-2xl text-secondary">
        Registrate gratis y arma tu ciclo con base en didáctica real, opiniones y resultados.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link to="/register" className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-bold text-background">
          Crear cuenta
          <ArrowRight size={16} weight="bold" />
        </Link>
        <Link to="/login" className="inline-flex items-center rounded-xl border border-card-border px-6 py-3 text-sm font-bold text-foreground hover:bg-foreground/10">
          Ya tengo cuenta
        </Link>
      </div>
    </section>
  )
}
