import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Courses from './pages/Courses'
import CourseProfessors from './pages/CourseProfessors'
import Dashboard from './pages/Dashboard'
import Insights from './pages/Insights'
import Landing from './pages/Landing'
import Login from './pages/Login'
import ProfessorDetail from './pages/ProfessorDetail'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Reviews from './pages/Reviews'

function App() {
  const location = useLocation()

  // Solo cambiamos la key cuando salimos o entramos al dashboard
  // Esto evita que Layout se desmonte al cambiar entre Carreras, Perfil, etc.
  const isDashboardPath = 
    location.pathname.startsWith('/careers') || 
    location.pathname.startsWith('/dashboard') || 
    location.pathname.startsWith('/courses') || 
    location.pathname.startsWith('/professors') || 
    ['/reviews', '/insights', '/profile'].includes(location.pathname)

  const groupKey = isDashboardPath ? 'dashboard-group' : location.pathname

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={groupKey}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/careers" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/careers/:careerId/courses" element={<Courses />} />
            <Route path="/courses/:courseId/professors" element={<CourseProfessors />} />
            <Route path="/professors/:professorId" element={<ProfessorDetail />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
