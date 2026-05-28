import { Outlet, useLocation } from 'react-router-dom'
import { MobileNavigation, Sidebar, WorkOSMark } from './Sidebar'

const routeMeta: Record<string, { title: string }> = {
  '/': {
    title: 'Dashboard',
  },
  '/projects': {
    title: 'Projects',
  },
  '/tasks': {
    title: 'Tasks',
  },
  '/system': {
    title: 'System',
  },
}

export default function AppShell() {
  const location = useLocation()
  const currentRoute = routeMeta[location.pathname] ?? routeMeta['/']

  return (
    <div className="min-h-screen bg-workos-grid text-slate-950">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col pb-16 lg:pb-0">
          <header className="sticky top-0 z-40 border-b border-slate-300 bg-workos-paper shadow-[0_1px_0_#ffffff_inset]">
            <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-5 lg:px-6">
              <div className="lg:hidden">
                <WorkOSMark compact />
              </div>

              <div className="hidden lg:block">
                <h1 className="font-mono text-sm font-black uppercase tracking-normal text-black">
                  {currentRoute.title}
                </h1>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
            <Outlet />
          </main>
        </div>
      </div>

      <MobileNavigation />
    </div>
  )
}
