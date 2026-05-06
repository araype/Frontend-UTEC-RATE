import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: -window.innerHeight, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-screen bg-background text-foreground transition-colors duration-300"
    >
      <Sidebar />
      <main className="flex-1 transition-all duration-300 md:ml-72 min-w-0">
        <div className="w-full px-4 py-8 md:px-8 lg:px-10">
          <Outlet />
        </div>
      </main>
      
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 -z-10 h-full w-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px]" />
      </div>
    </motion.div>
  )
}

export default Layout
