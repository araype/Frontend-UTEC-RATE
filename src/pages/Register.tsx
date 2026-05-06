import { FormEvent, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { EnvelopeSimple, LockKey, User } from '@phosphor-icons/react'
import { useAuth } from '../hooks/useAuth'
import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'

function Register() {
  const navigate = useNavigate()
  const { isAuthenticated, register, registerWithGoogle } = useAuth()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/careers" replace />
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await register({ fullName, email, password })
      navigate('/careers', { replace: true })
    } catch (registerError) {
      const message =
        registerError instanceof Error
          ? registerError.message
          : 'No se pudo crear la cuenta'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    setError('')
    setIsLoading(true)

    try {
      await registerWithGoogle()
      navigate('/careers', { replace: true })
    } catch {
      setError('No se pudo registrar con Google')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 font-sans"
    >
      <Link
        to="/"
        className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-xl border border-card-border bg-foreground/5 px-3 py-2 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Link>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 border border-card-border shadow-2xl">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2 font-display">
              Crear cuenta
            </h1>
            <p className="text-secondary text-sm font-medium">Únete a URATE en segundos</p>
          </header>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="w-full rounded-2xl border border-card-border bg-foreground/5 px-12 py-4 text-foreground outline-none focus:border-primary/50"
                placeholder="Nombre completo"
                required
              />
            </div>

            <div className="relative">
              <EnvelopeSimple size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-card-border bg-foreground/5 px-12 py-4 text-foreground outline-none focus:border-primary/50"
                placeholder="correo@utec.edu.pe"
                required
              />
            </div>

            <div className="relative">
              <LockKey size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-card-border bg-foreground/5 px-12 py-4 text-foreground outline-none focus:border-primary/50"
                placeholder="Contraseña"
                required
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-primary py-4 text-sm font-bold text-white transition hover:bg-primary-hover disabled:opacity-50"
            >
              Registrarme
            </button>

            <button
              type="button"
              onClick={handleGoogleRegister}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-card-border bg-foreground/5 py-4 text-sm font-bold text-foreground transition hover:bg-foreground/10 disabled:opacity-50"
            >
              <FcGoogle size={20} />
              Registrarme con Google
            </button>

            <p className="text-center text-sm text-secondary">
              Ya tienes cuenta?{' '}
              <Link to="/login" className="font-bold text-primary hover:underline">
                Inicia sesion
              </Link>
            </p>
          </form>
        </div>
      </div>
    </motion.main>
  )
}

export default Register
