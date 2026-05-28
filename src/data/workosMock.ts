export type ProjectStatus =
  | 'Planning'
  | 'In Progress'
  | 'Review'
  | 'Payment'
  | 'Done'

export type Project = {
  id: string
  name: string
  client: string
  status: ProjectStatus
  revenue: number
  paid: number
  note: string
}

export type Task = {
  id: string
  title: string
  dueDate: string
  status: 'To-do' | 'Done'
}

export const TODAY = '2026-05-28'

export const projectStatuses = ['Planning', 'In Progress', 'Review', 'Payment', 'Done'] as const

export const statusFilters = ['ALL', ...projectStatuses] as const

export type StatusFilter = (typeof statusFilters)[number]

export const mockProjects: Project[] = [
  {
    id: 'proj-coca-retainer',
    name: 'Retail activation retainer',
    client: 'Coca',
    status: 'In Progress',
    revenue: 120_000_000,
    paid: 40_000_000,
    note: 'Finalize execution timeline and next asset batch.',
  },
  {
    id: 'proj-nutifood-proposal',
    name: 'Q3 trade proposal',
    client: 'Nutifood',
    status: 'Planning',
    revenue: 75_000_000,
    paid: 0,
    note: 'Scope locked. Proposal package needs pricing review.',
  },
  {
    id: 'proj-masan-acceptance',
    name: 'Sampling acceptance pack',
    client: 'Masan',
    status: 'Review',
    revenue: 95_000_000,
    paid: 60_000_000,
    note: 'Collect acceptance confirmation before invoicing remainder.',
  },
  {
    id: 'proj-vinamilk-payment',
    name: 'Brand booth settlement',
    client: 'Vinamilk',
    status: 'Payment',
    revenue: 180_000_000,
    paid: 120_000_000,
    note: 'Payment follow-up pending with procurement.',
  },
]

export const mockTasks: Task[] = [
  {
    id: 'task-overdue-payment',
    title: 'Follow payment Vinamilk',
    dueDate: '2026-05-25',
    status: 'To-do',
  },
  {
    id: 'task-today-proposal',
    title: 'Send revised proposal Nutifood',
    dueDate: TODAY,
    status: 'To-do',
  },
  {
    id: 'task-today-assets',
    title: 'Check Coca activation assets',
    dueDate: TODAY,
    status: 'To-do',
  },
  {
    id: 'task-done',
    title: 'Confirm venue photos',
    dueDate: '2026-05-27',
    status: 'Done',
  },
  {
    id: 'task-upcoming-review',
    title: 'Prepare Masan review pack',
    dueDate: '2026-05-30',
    status: 'To-do',
  },
]

export function getOutstanding(project: Project) {
  return Math.max(project.revenue - project.paid, 0)
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'VND',
  }).format(value)
}

export function formatDateLabel(value: string) {
  const [, month, day] = value.split('-')
  return `${day}/${month}`
}

export function getProjectStatusTone(status: ProjectStatus) {
  switch (status) {
    case 'Planning':
      return 'border-blue-200 bg-blue-50 text-blue-800'
    case 'In Progress':
      return 'border-emerald-200 bg-emerald-50 text-emerald-800'
    case 'Review':
      return 'border-amber-200 bg-amber-50 text-amber-800'
    case 'Payment':
      return 'border-orange-200 bg-orange-50 text-orange-800'
    case 'Done':
      return 'border-slate-200 bg-slate-50 text-slate-500'
  }
}

export function getTaskTone(status: 'OVERDUE' | 'TODAY' | 'UPCOMING' | 'DONE') {
  switch (status) {
    case 'OVERDUE':
      return 'border-red-200 bg-red-50 text-red-800'
    case 'TODAY':
      return 'border-emerald-200 bg-emerald-50 text-emerald-800'
    case 'UPCOMING':
      return 'border-slate-200 bg-slate-50 text-slate-700'
    case 'DONE':
      return 'border-slate-200 bg-slate-50 text-slate-500'
  }
}
