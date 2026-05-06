import { motion } from 'framer-motion'

function LandingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 opacity-40 dark:opacity-100 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[20%] -right-[10%] h-[800px] w-[800px] rounded-full bg-primary/20 blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[40%] -left-[20%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-[20%] right-[10%] h-[700px] w-[700px] rounded-full bg-purple-600/20 blur-[150px]"
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
    </div>
  )
}

export default LandingBackground
