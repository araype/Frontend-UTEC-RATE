import { ShieldCheck } from '@phosphor-icons/react'
import LandingBackground from '../components/landing/LandingBackground'
import LandingNavbar from '../components/landing/LandingNavbar'
import {
  LandingCtaSection,
  LandingFaqSection,
  LandingHeroSection,
  LandingHighlightsSection,
  LandingPillarsSection,
  LandingTestimonialsSection,
} from '../components/landing/LandingSections'

import { motion } from 'framer-motion'

function Landing() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen overflow-hidden bg-background font-sans selection:bg-primary/30 selection:text-foreground"
    >
      <LandingBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <LandingNavbar />
        <LandingHeroSection />
        <LandingHighlightsSection />
        <LandingPillarsSection />
        <LandingTestimonialsSection />
        <LandingFaqSection />
        <LandingCtaSection />

        <footer className="mt-16 border-t border-card-border pt-8 pb-12 text-center text-sm font-medium text-secondary/40 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} weight="duotone" className="text-primary/50" />
            <span>URATE - UTEC Rate Platform &copy; 2026</span>
          </div>
          <p>Desarrollado para transformar la educación mediante feedback real.</p>
        </footer>
      </div>
    </motion.main>
  )
}

export default Landing
