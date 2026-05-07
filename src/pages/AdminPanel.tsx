import { useState } from 'react'
import AdminUsers from './admin/AdminUsers'
import AdminCareers from './admin/AdminCareers'
import AdminCourses from './admin/AdminCourses'
import AsignacionesPanel from './admin/AsignacionesPanel'

type AdminTab = 'Usuarios' | 'Carreras' | 'Cursos' | 'Asignaciones'

const TABS: AdminTab[] = ['Usuarios', 'Carreras', 'Cursos', 'Asignaciones']

export default function AdminPanel() {
  const [tab, setTab] = useState<AdminTab>('Cursos')

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 rounded-2xl border border-card-border bg-foreground/5 p-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
              tab === t
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'text-secondary hover:text-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'Usuarios' && <AdminUsers />}
      {tab === 'Carreras' && <AdminCareers />}
      {tab === 'Cursos' && <AdminCourses />}
      {tab === 'Asignaciones' && <AsignacionesPanel />}
    </div>
  )
}
