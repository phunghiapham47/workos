import { BarChart3, CheckSquare, FolderKanban, Settings2 } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigationItems = [
  {
    label: 'Dashboard',
    path: '/',
    icon: BarChart3,
    code: 'DASH',
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: FolderKanban,
    code: 'PROJ',
  },
  {
    label: 'Tasks',
    path: '/tasks',
    icon: CheckSquare,
    code: 'TASK',
  },
  {
    label: 'System',
    path: '/system',
    icon: Settings2,
    code: 'SYS',
  },
]

export function WorkOSMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? '' : 'border-b border-black pb-5'}>
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
        Personal Work Operating System
      </p>
      <p className={compact ? 'mt-1 text-2xl font-black tracking-tight text-black' : 'mt-2 text-3xl font-black tracking-tight text-black'}>
        WorkOS
      </p>
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-300 bg-white/95 px-4 py-5 lg:block">
      <WorkOSMark />

      <nav className="mt-6 space-y-1.5" aria-label="Primary navigation">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              [
                'group flex h-10 items-center justify-between border px-2.5 text-xs font-black uppercase tracking-[0.08em] transition',
                isActive
                  ? 'border-black bg-black text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:text-black',
              ].join(' ')
            }
          >
            <span className="flex items-center gap-3">
              <item.icon className="size-4" aria-hidden="true" />
              {item.label}
            </span>
            <span className="font-mono text-[10px] opacity-60">{item.code}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export function MobileNavigation() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-slate-200 bg-white lg:hidden"
      aria-label="Mobile navigation"
    >
      {navigationItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            [
              'flex h-16 flex-col items-center justify-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em]',
              isActive ? 'bg-black text-white' : 'text-slate-500',
            ].join(' ')
          }
        >
          <item.icon className="size-4" aria-hidden="true" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
