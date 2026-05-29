import { Check, Clipboard, ClipboardCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  formatDateLabel,
  getOutstanding,
  getProjectStatusTone,
  getTaskTone,
  projectStatuses,
  type Project,
} from '../data/workosMock'
import { useWorkOSStore, type TaskSnapshot } from '../state/workosStore'
import { useLocalDateKey } from '../utils/useLocalDateKey'

type ActionTask = {
  id: string
  date: string
  title: string
  status: 'OVERDUE' | 'TODAY'
}

export default function DashboardPage() {
  const { completeTask, projects, restoreTask, tasks } = useWorkOSStore()
  const todayKey = useLocalDateKey()
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle')
  const [undoSnapshot, setUndoSnapshot] = useState<TaskSnapshot | null>(null)

  const dashboard = useMemo(() => {
    const activeProjects = projects.filter((project) => project.status !== 'Done')
    const openTasks = tasks.filter((task) => task.status !== 'Done')
    const overdueTasks = openTasks.filter((task) => task.dueDate < todayKey)
    const todayTasks = openTasks.filter((task) => task.dueDate === todayKey)
    const paymentOutstanding = projects
      .filter((project) => project.status === 'Payment')
      .reduce((total, project) => total + getOutstanding(project), 0)

    const actionTasks: ActionTask[] = [
      ...overdueTasks.map((task) => ({
        id: task.id,
        date: formatDateLabel(task.dueDate),
        title: task.title,
        status: 'OVERDUE' as const,
      })),
      ...todayTasks.map((task) => ({
        id: task.id,
        date: formatDateLabel(task.dueDate),
        title: task.title,
        status: 'TODAY' as const,
      })),
    ]

    const statusBreakdown = projectStatuses.map((status) => ({
      status,
      count: projects.filter((project) => project.status === status).length,
    }))

    const mission =
      overdueTasks.length > 0
        ? 'OUTSTANDING COLLECTION REQUIRED.'
        : paymentOutstanding > 0 || todayTasks.length > 0
          ? 'EXECUTION PIPELINE ACTIVE.'
          : 'FREE TODAY.'

    return {
      activeProjects,
      actionTasks,
      mission,
      overdueTasks,
      paymentOutstanding,
      statusBreakdown,
      todayTasks,
    }
  }, [projects, tasks, todayKey])

  const handleCompleteTask = (taskId: string) => {
    const snapshot = completeTask(taskId)
    if (!snapshot) return
    setUndoSnapshot(snapshot)
    window.setTimeout(() => {
      setUndoSnapshot((current) => (current?.task.id === taskId ? null : current))
    }, 3200)
  }

  const handleUndoTask = () => {
    if (!undoSnapshot) return
    restoreTask(undoSnapshot)
    setUndoSnapshot(null)
  }

  const handleCopyReport = async () => {
    const report = buildMondayReport({
      activeProjects: dashboard.activeProjects,
    })

    await copyText(report)
    setCopyState('copied')
    window.setTimeout(() => setCopyState('idle'), 1800)
  }

  return (
    <section className="space-y-3 sm:space-y-4">
      <div className="grid gap-3 sm:gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="module-panel border-t-2 border-t-black p-3 sm:p-4">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-start">
            <PixelRobot />
            <div className="relative min-w-0 border border-slate-300 bg-white px-3 py-2.5 before:absolute before:left-[-7px] before:top-5 before:h-3 before:w-3 before:rotate-45 before:border-b before:border-l before:border-slate-300 before:bg-white">
              <h2 className="text-lg font-black tracking-normal text-black sm:text-2xl">
                {dashboard.mission}
              </h2>
              <p className="mt-1.5 text-sm leading-5 text-slate-600">
                {dashboard.overdueTasks.length > 0
                  ? 'Resolve pending exposure. Clear overdue queue.'
                  : dashboard.paymentOutstanding > 0
                    ? 'Collect payment queue. Stabilize cash position.'
                    : dashboard.todayTasks.length > 0
                      ? 'Execute today queue. Keep pipeline moving.'
                      : 'No action required today.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => void handleCopyReport()}
              className="col-span-2 inline-flex h-8 w-fit shrink-0 items-center justify-center gap-2 border border-black bg-white px-2.5 font-mono text-[10px] font-black uppercase tracking-normal text-black transition hover:bg-black hover:text-white sm:col-span-1"
            >
              {copyState === 'copied' ? (
                <ClipboardCheck className="size-3.5" aria-hidden="true" />
              ) : (
                <Clipboard className="size-3.5" aria-hidden="true" />
              )}
              {copyState === 'copied' ? 'Copied' : 'Monday Report'}
            </button>
          </div>
        </div>

        <div className="module-panel p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow">Project Status</p>
            <span className="status-chip">{projects.length} TOTAL</span>
          </div>
          <div className="mt-3 grid gap-1.5 text-xs font-bold sm:grid-cols-2 xl:grid-cols-1">
            {dashboard.statusBreakdown.map((item) => (
              <div
                key={item.status}
                className={[
                  'flex min-h-8 items-center justify-between gap-2 border px-2',
                  getProjectStatusTone(item.status),
                ].join(' ')}
              >
                <span>{item.status}</span>
                <span className="font-mono">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <ActionTaskQueue items={dashboard.actionTasks} onComplete={handleCompleteTask} />
        <ActiveProjectQueue projects={dashboard.activeProjects} />
      </div>

      {undoSnapshot ? (
        <div className="fixed bottom-20 left-3 right-3 z-50 border border-black bg-white px-3 py-2 shadow-[3px_3px_0_#020617] sm:bottom-4 sm:left-auto sm:right-4 sm:w-80">
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 truncate font-mono text-[10px] font-black uppercase tracking-normal text-black">
              Done: {undoSnapshot.task.title}
            </p>
            <button
              type="button"
              onClick={handleUndoTask}
              className="h-7 shrink-0 border border-black px-2 font-mono text-[10px] font-black uppercase tracking-normal"
            >
              Undo
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function PixelRobot() {
  return (
    <div className="grid place-items-center border border-blue-200 bg-blue-50 p-3 shadow-[2px_2px_0_#bfdbfe]">
      <div className="relative h-12 w-14 border-2 border-blue-900 bg-blue-100">
        <div className="absolute left-3 top-3 h-2 w-2 bg-blue-600" />
        <div className="absolute right-3 top-3 h-2 w-2 bg-blue-600" />
        <div className="absolute bottom-2 left-4 h-2 w-6 border-b-2 border-black" />
        <div className="absolute -top-2 left-1/2 h-2 w-0.5 -translate-x-1/2 bg-blue-900" />
        <div className="absolute -top-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 border border-blue-900 bg-blue-200" />
      </div>
    </div>
  )
}

function ActionTaskQueue({ items, onComplete }: { items: ActionTask[]; onComplete: (taskId: string) => void }) {
  return (
    <article className="module-panel p-3 sm:p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">Action Queue</p>
        <span className="status-chip">{items.length} OPEN</span>
      </div>

      <div className="mt-3 divide-y divide-slate-200 border border-slate-300">
        {items.length === 0 ? (
          <div className="px-3 py-3 font-mono text-[10px] font-black uppercase tracking-normal text-slate-400">
            Clear
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="grid gap-2 px-3 py-2 sm:grid-cols-[70px_minmax(0,1fr)_auto_auto] sm:items-center">
              <p className="font-mono text-[10px] font-black uppercase tracking-normal text-slate-500">
                {item.date}
              </p>
              <p className="min-w-0 text-sm font-bold text-black">{item.title}</p>
              <span
                className={[
                  'w-fit border px-2 py-1 font-mono text-[10px] font-black uppercase tracking-normal',
                  getTaskTone(item.status),
                ].join(' ')}
              >
                {item.status}
              </span>
              <button
                type="button"
                onClick={() => onComplete(item.id)}
                className="grid size-7 place-items-center border border-slate-300 bg-white text-slate-700 hover:border-black hover:text-black"
                aria-label={`Complete ${item.title}`}
              >
                <Check className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          ))
        )}
      </div>
    </article>
  )
}

function ActiveProjectQueue({ projects }: { projects: Project[] }) {
  return (
    <article className="module-panel p-3 sm:p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">Running Projects</p>
        <span className="status-chip">{projects.length} ACTIVE</span>
      </div>

      <div className="mt-3 divide-y divide-slate-200 border border-slate-300">
        {projects.map((project) => (
          <div key={project.id} className="grid gap-2 px-3 py-2.5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-black">{project.name}</p>
              <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-normal text-slate-500">
                {project.client}
              </p>
              <p className="mt-1 truncate text-xs font-bold text-slate-500">{project.note}</p>
            </div>
            <span
              className={[
                'w-fit border px-2 py-1 font-mono text-[10px] font-black uppercase tracking-normal',
                getProjectStatusTone(project.status),
              ].join(' ')}
            >
              {project.status}
            </span>
          </div>
        ))}
      </div>
    </article>
  )
}

function buildMondayReport({
  activeProjects,
}: {
  activeProjects: Project[]
}) {
  return activeProjects
    .map((project, index) => `${index + 1}. ${project.client}_${project.name} | ${project.status.toUpperCase()} - ${project.note}`)
    .join('\n')
}

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    return
  } catch {
    const textArea = document.createElement('textarea')
    textArea.value = value
    textArea.setAttribute('readonly', 'true')
    textArea.style.position = 'fixed'
    textArea.style.top = '0'
    textArea.style.left = '-9999px'
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}
