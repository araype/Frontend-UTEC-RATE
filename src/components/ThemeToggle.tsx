import { Sun, Moon } from '@phosphor-icons/react'
import { useTheme } from '../hooks/useTheme'

function ThemeToggle() {
  const { isLight, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 hover:border-white/10 group"
      aria-label="Toggle Theme"
    >
      <div className="relative h-5 w-5 overflow-hidden">
        <div 
          className={`absolute inset-0 transition-transform duration-500 ${isLight ? 'translate-y-0' : '-translate-y-full'}`}
        >
          <Sun size={20} weight="fill" className="text-yellow-400" />
        </div>
        <div 
          className={`absolute inset-0 transition-transform duration-500 ${isLight ? 'translate-y-full' : 'translate-y-0'}`}
        >
          <Moon size={20} weight="fill" className="text-primary" />
        </div>
      </div>
      
      {/* Tooltip */}
      <span className="absolute left-full ml-4 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none border border-white/10 z-50">
        {isLight ? 'Modo Obscuro' : 'Modo Claro'}
      </span>
    </button>
  )
}

export default ThemeToggle
