import { useEffect, useState } from 'react'

export function useTheme() {
  const [isLight, setIsLight] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (isLight) {
      root.classList.add('light')
      localStorage.setItem('theme', 'light')
    } else {
      root.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    }
  }, [isLight])

  const toggleTheme = () => setIsLight(!isLight)

  return { isLight, toggleTheme }
}
