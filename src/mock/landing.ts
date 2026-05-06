import {
  BookOpen,
  Brain,
  CheckCircle,
  ClockCountdown,
  GraduationCap,
  Lightning,
  Question,
  ShieldCheck,
  Star,
  TrendUp,
  Users,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

export interface LandingItem {
  title: string
  description: string
  icon: Icon
}

export const mockLandingHighlights: LandingItem[] = [
  { title: 'Ranking Confiable', description: 'Consulta calificaciones reales de profesores y secciones con contexto de ciclo.', icon: Star },
  { title: 'Resenas Comunitarias', description: 'Lee experiencias honestas de alumnos para elegir docentes didacticos.', icon: BookOpen },
  { title: 'Insights Predictivos', description: 'Descubre patrones de dificultad y satisfaccion antes de matricularte.', icon: Brain },
]

export const mockLandingQuickStats = [
  { label: 'Resenas verificadas', value: '18,240+', icon: BookOpen },
  { label: 'Profesores evaluados', value: '680+', icon: Users },
  { label: 'Carreras activas', value: '12', icon: GraduationCap },
  { label: 'Satisfaccion estudiantil', value: '95%', icon: TrendUp },
]

export const mockLandingValuePillars = [
  { title: 'Didactica primero', description: 'Encuentra docentes que explican bien y te ayudan a dominar conceptos, no solo aprobar.', icon: GraduationCap },
  { title: 'Feedback reciente', description: 'Usa resenas del ciclo actual para evitar decisiones basadas en informacion desactualizada.', icon: ClockCountdown },
  { title: 'Ruta inteligente', description: 'Navega por carrera, curso y profesor con una experiencia clara y accionable.', icon: Lightning },
]

export const mockLandingTestimonials = [
  { quote: 'Elegi un profesor super didactico para Algoritmos y fue el mejor ciclo que he tenido.', author: 'Camila T. - Ciencias de la Computacion' },
  { quote: 'Antes matriculaba a ciegas. Ahora comparo profesores en minutos y tomo mejores decisiones.', author: 'Joaquin S. - Ingenieria de Software' },
  { quote: 'La combinacion de rating + opiniones reales me ayudo un monton para planificar mi carga.', author: 'Andrea R. - Data Science' },
]

export const mockLandingFaqs = [
  { question: 'URATE reemplaza la informacion oficial de la universidad?', answer: 'No. URATE complementa la oferta oficial con experiencias reales de estudiantes.', icon: Question },
  { question: 'Las opiniones se centran en didactica y forma de ensenanza?', answer: 'Si. El foco principal es ayudarte a elegir profesores que ensenen bien y te hagan aprender.', icon: CheckCircle },
  { question: 'Puedo comparar profesores de un mismo curso?', answer: 'Ese es el flujo principal: carrera, curso, profesores, y luego opiniones con rating.', icon: ShieldCheck },
]
