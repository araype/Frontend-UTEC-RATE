import { ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function LandingNavbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex items-center justify-between rounded-full border border-card-border bg-foreground/[0.04] px-6 py-4 backdrop-blur-2xl shadow-2xl"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-white/10 overflow-hidden">
          <img src="/urate_logo.png" alt="URATE" className="h-full w-full object-contain scale-[2]" />
        </div>
        <span className="hidden text-sm font-bold tracking-widest text-foreground uppercase font-display sm:block">
          URATE
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/login" className="text-sm font-bold text-secondary hover:text-foreground transition-colors">
          Iniciar sesión
        </Link>
        <Link
          to="/register"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_var(--primary-glow)] transition-transform hover:scale-105 active:scale-95"
        >
          Crear cuenta
          <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.nav>
  )
}

export default LandingNavbar
