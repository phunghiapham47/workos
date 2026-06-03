import { Check, Pencil, Plus, Trash2, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { formatDateLabel, getTaskTone, type Task } from '../data/workosMock'
import { useAuth } from '../state/authStore'
import { useWorkOSStore, type TaskDraft, type TaskSnapshot } from '../state/workosStore'
import { useLocalDateKey } from '../utils/useLocalDateKey'

type TaskTab = 'OVERDUE' | 'TODAY' | 'UPCOMING' | 'DONE'

const taskTabs: TaskTab[] = ['OVERDUE', 'TODAY', 'UPCOMING', 'DONE']
const taskTabLabels: Record<TaskTab, string> = {
  OVERDUE: 'Overdue',
  TODAY: 'Today',
  UPCOMING: 'Upcoming',
  DONE: 'Done',
}

export default function TasksPage() {
  const {
    addTask: addTaskToStore,
    completeTask: completeTaskInStore,
    deleteTask,
    restoreTask,
    tasks,
    undoTask,
    updateTask,
  } =
    useWorkOSStore()
  const { requireEditAccess } = useAuth()
  const todayKey = useLocalDateKey()
  const [activeTab, setActiveTab] = useState<TaskTab>('TODAY')
  const [quickInput, setQuickInput] = useState('')
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [undoSnapshot, setUndoSnapshot] = useState<TaskSnapshot | null>(null)

  const groups = useMemo(() => getTaskGroups(tasks, todayKey), [tasks, todayKey])
  const visibleTasks = groups[activeTab]
  const visibleTaskMonthGroups = useMemo(() => getTaskMonthGroups(visibleTasks), [visibleTasks])

  const addTask = () => {
    if (!requireEditAccess()) return
    const parsed = parseTaskInput(quickInput, todayKey)
    if (!parsed.title) return

    const task = addTaskToStore(parsed)
    setQuickInput('')
    setActiveTab(getTaskTab(task, todayKey))
  }

  const saveTask = (draft: TaskDraft) => {
    if (!requireEditAccess()) return
    if (!editingTask) return
    updateTask(editingTask.id, draft)
    setEditingTask(null)
    setActiveTab(getTaskTab({ ...editingTask, ...draft }, todayKey))
  }

  const completeTask = (taskId: string) => {
    if (!requireEditAccess()) return
    const snapshot = completeTaskInStore(taskId)
    if (!snapshot) return
    setUndoSnapshot(snapshot)
    setActiveTab('DONE')
    window.setTimeout(() => {
      setUndoSnapshot((current) => (current?.task.id === taskId ? null : current))
    }, 3200)
  }

  const undoCompleteTask = () => {
    if (!requireEditAccess()) return
    if (!undoSnapshot) return
    restoreTask(undoSnapshot)
    setActiveTab(getTaskTab(undoSnapshot.task, todayKey))
    setUndoSnapshot(null)
  }

  const restoreDoneTask = (taskId: string) => {
    if (!requireEditAccess()) return
    const task = undoTask(taskId)
    if (!task) return
    setActiveTab(getTaskTab(task, todayKey))
  }

  return (
    <section className="space-y-3 sm:space-y-4">
      <div className="module-panel grid gap-2 p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:p-4">
        <label className="grid gap-1.5">
          <span className="eyebrow">Add Task</span>
          <input
            value={quickInput}
            onChange={(event) => setQuickInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') addTask()
            }}
            placeholder="25/05 - Follow payment Vinamilk"
            className="h-9 border border-slate-300 bg-white px-2 text-sm font-bold outline-none focus:border-black"
          />
        </label>
        <button
          type="button"
          onClick={addTask}
          className="inline-flex h-9 items-center justify-center gap-2 border border-black bg-black px-3 font-mono text-[10px] font-black uppercase tracking-normal text-white sm:self-end"
        >
          <Plus className="size-3.5" aria-hidden="true" />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {taskTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={[
              'module-panel min-h-14 p-2 text-left transition sm:min-h-16 sm:p-3',
              activeTab === tab ? 'border-black bg-slate-50 shadow-[inset_0_-3px_0_#020617]' : '',
            ].join(' ')}
          >
            <span className={['inline-flex border px-1.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-normal sm:text-[10px]', getTaskTone(tab)].join(' ')}>
              {taskTabLabels[tab]}
            </span>
            <span className="mt-1.5 block text-xl font-black tracking-normal text-black sm:mt-2 sm:text-2xl">
              {groups[tab].length}
            </span>
          </button>
        ))}
      </div>

      <article className="module-panel min-w-0 overflow-hidden p-3 sm:p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">Task Registry</p>
          <span className={['border px-2 py-1 font-mono text-[10px] font-black uppercase tracking-normal', getTaskTone(activeTab)].join(' ')}>
            {taskTabLabels[activeTab]}
          </span>
        </div>

        <div className="mt-3 border border-slate-300">
          {visibleTasks.length === 0 ? (
            <div className="px-3 py-3 font-mono text-[10px] font-black uppercase tracking-normal text-slate-400">
              Clear
            </div>
          ) : (
            visibleTaskMonthGroups.map((group) => (
              <div key={group.monthKey} className="border-b border-slate-300 last:border-b-0">
                <div className="flex min-h-9 items-center justify-between gap-3 border-b border-slate-300 bg-slate-50 px-3 py-2">
                  <p className="font-mono text-[10px] font-black uppercase tracking-normal text-slate-600">
                    {group.label}
                  </p>
                  <span className="status-chip">{group.tasks.length} TASKS</span>
                </div>
                <div className="divide-y divide-slate-200">
                  {group.tasks.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      onComplete={completeTask}
                      onDelete={(taskId) => {
                        if (!requireEditAccess()) return
                        deleteTask(taskId)
                      }}
                      onEdit={(task) => {
                        if (!requireEditAccess()) return
                        setEditingTask(task)
                      }}
                      onUndo={restoreDoneTask}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </article>

      {editingTask ? (
        <TaskEditor
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={saveTask}
        />
      ) : null}

      {undoSnapshot ? (
        <div className="fixed bottom-20 left-3 right-3 z-50 border border-black bg-white px-3 py-2 shadow-[3px_3px_0_#020617] sm:bottom-4 sm:left-auto sm:right-4 sm:w-80">
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 truncate font-mono text-[10px] font-black uppercase tracking-normal text-black">
              Done: {undoSnapshot.task.title}
            </p>
            <button
              type="button"
              onClick={undoCompleteTask}
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

function TaskRow({
  onComplete,
  onDelete,
  onEdit,
  onUndo,
  task,
}: {
  onComplete: (taskId: string) => void
  onDelete: (taskId: string) => void
  onEdit: (task: Task) => void
  onUndo: (taskId: string) => void
  task: Task
}) {
  const isDone = task.status === 'Done'

  return (
    <div className={['grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 px-3 py-2.5 sm:grid-cols-[70px_minmax(0,1fr)_auto] sm:items-center', isDone ? 'bg-slate-50' : 'bg-white'].join(' ')}>
      <p className="hidden font-mono text-[10px] font-black uppercase tracking-normal text-slate-500 sm:block">
        {formatDateLabel(task.dueDate)}
      </p>
      <div className="min-w-0">
        <p className="font-mono text-[10px] font-black uppercase tracking-normal text-slate-500 sm:hidden">
          {formatDateLabel(task.dueDate)}
        </p>
        <p className={['mt-1 break-words text-sm font-bold leading-5 sm:mt-0 sm:truncate', isDone ? 'text-slate-500 line-through' : 'text-black'].join(' ')}>
          {task.title}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {!isDone ? (
          <button
            type="button"
            onClick={() => onComplete(task.id)}
            className="grid size-8 place-items-center border border-slate-300 bg-white text-slate-700"
            aria-label={`Complete ${task.title}`}
          >
            <Check className="size-3.5" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onUndo(task.id)}
            className="h-8 border border-slate-300 bg-white px-2 font-mono text-[10px] font-black uppercase tracking-normal text-slate-700"
            aria-label={`Undo ${task.title}`}
          >
            Undo
          </button>
        )}
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="grid size-8 place-items-center border border-slate-300 bg-white text-slate-700"
          aria-label={`Edit ${task.title}`}
        >
          <Pencil className="size-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="grid size-8 place-items-center border border-slate-300 bg-white text-slate-700"
          aria-label={`Delete ${task.title}`}
        >
          <Trash2 className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

function TaskEditor({
  onClose,
  onSave,
  task,
}: {
  onClose: () => void
  onSave: (draft: TaskDraft) => void
  task: Task
}) {
  const [draft, setDraft] = useState<TaskDraft>({ dueDate: task.dueDate, title: task.title })

  return (
    <div className="fixed inset-0 z-40 bg-white/80 p-3 backdrop-blur-sm sm:p-5">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSave(draft)
        }}
        className="ml-auto flex max-h-full w-full max-w-md flex-col border border-black bg-white"
      >
        <div className="flex items-center justify-between border-b border-slate-300 px-3 py-2">
          <p className="eyebrow">Edit Task</p>
          <button type="button" onClick={onClose} className="grid size-8 place-items-center border border-black">
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </div>
        <div className="grid gap-3 p-3">
          <label className="grid gap-1.5">
            <span className="eyebrow">Due Date</span>
            <input
              type="date"
              value={draft.dueDate}
              onChange={(event) => setDraft((current) => ({ ...current, dueDate: event.target.value }))}
              className="h-9 border border-slate-300 px-2 text-sm font-bold"
            />
          </label>
          <label className="grid gap-1.5">
            <span className="eyebrow">Task</span>
            <input
              value={draft.title}
              onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
              className="h-9 border border-slate-300 px-2 text-sm font-bold"
            />
          </label>
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-300 p-3">
          <button type="button" onClick={onClose} className="h-9 border border-slate-300 px-3 font-mono text-[10px] font-black uppercase tracking-normal">
            Cancel
          </button>
          <button type="submit" className="h-9 border border-black bg-black px-3 font-mono text-[10px] font-black uppercase tracking-normal text-white">
            Save Task
          </button>
        </div>
      </form>
    </div>
  )
}

function getTaskGroups(tasks: Task[], todayKey: string): Record<TaskTab, Task[]> {
  const openTasks = tasks.filter((task) => task.status !== 'Done')
  return {
    OVERDUE: openTasks
      .filter((task) => task.dueDate < todayKey)
      .sort((a, b) => b.dueDate.localeCompare(a.dueDate)),
    TODAY: openTasks.filter((task) => task.dueDate === todayKey),
    UPCOMING: openTasks
      .filter((task) => task.dueDate > todayKey)
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
    DONE: tasks
      .filter((task) => task.status === 'Done')
      .sort((a, b) => getDateDistance(a.dueDate, todayKey) - getDateDistance(b.dueDate, todayKey)),
  }
}

function getTaskMonthGroups(tasks: Task[]) {
  return tasks.reduce<Array<{ label: string; monthKey: string; tasks: Task[] }>>((monthGroups, task) => {
    const monthKey = task.dueDate.slice(0, 7)
    const currentGroup = monthGroups[monthGroups.length - 1]

    if (currentGroup?.monthKey === monthKey) {
      currentGroup.tasks.push(task)
      return monthGroups
    }

    monthGroups.push({
      label: formatTaskMonthLabel(monthKey),
      monthKey,
      tasks: [task],
    })

    return monthGroups
  }, [])
}

function formatTaskMonthLabel(monthKey: string) {
  const [year, month] = monthKey.split('-')
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(Number(year), Number(month) - 1))
}

function getDateDistance(dateKey: string, todayKey: string) {
  return Math.abs(new Date(`${dateKey}T00:00:00`).getTime() - new Date(`${todayKey}T00:00:00`).getTime())
}

function getTaskTab(task: Task, todayKey: string): TaskTab {
  if (task.status === 'Done') return 'DONE'
  if (task.dueDate < todayKey) return 'OVERDUE'
  if (task.dueDate === todayKey) return 'TODAY'
  return 'UPCOMING'
}

function parseTaskInput(value: string, todayKey: string): TaskDraft {
  const trimmed = value.trim()
  const match = trimmed.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\s*[—-]\s*(.+)$/)

  if (!match) {
    return { dueDate: todayKey, title: trimmed }
  }

  const [, rawDay, rawMonth, rawYear, rawTitle] = match
  const year =
    rawYear === undefined
      ? todayKey.slice(0, 4)
      : rawYear.length === 2
        ? `20${rawYear}`
        : rawYear
  const month = rawMonth.padStart(2, '0')
  const day = rawDay.padStart(2, '0')

  return {
    dueDate: `${year}-${month}-${day}`,
    title: rawTitle.trim(),
  }
}
