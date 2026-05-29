/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { type Project, type ProjectStatus, type Task } from '../data/workosMock'
import { supabase } from '../lib/supabase'
import { getLocalDateKey } from '../utils/localDate'

type ProjectDraft = Omit<Project, 'id'>
type TaskDraft = Pick<Task, 'dueDate' | 'title'>

type WorkOSStore = {
  projects: Project[]
  tasks: Task[]
  addProject: (draft: ProjectDraft) => Project
  updateProject: (projectId: string, draft: ProjectDraft) => void
  updateProjectStatus: (projectId: string, status: ProjectStatus) => void
  deleteProject: (projectId: string) => void
  addTask: (draft: TaskDraft) => Task
  updateTask: (taskId: string, draft: TaskDraft) => void
  completeTask: (taskId: string) => TaskSnapshot | null
  undoTask: (taskId: string) => Task | null
  deleteTask: (taskId: string) => void
  restoreTask: (snapshot: TaskSnapshot) => void
}

export type { ProjectDraft, TaskDraft }

export type TaskSnapshot = {
  task: Task
  index: number
}

const WorkOSContext = createContext<WorkOSStore | null>(null)

type ProjectRow = {
  id: string
  name: string
  client: string
  status: string
  revenue: number | string | null
  paid: number | string | null
  note: string | null
}

type TaskRow = {
  id: string
  title: string
  due_date: string | null
  completed: boolean | null
}

function createId(prefix: string) {
  return globalThis.crypto?.randomUUID?.() ?? `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function normalizeProjectStatus(status: string): ProjectStatus {
  switch (status) {
    case 'Lead/Brief':
      return 'Planning'
    case 'In progress':
      return 'In Progress'
    case 'Nghiệm thu':
      return 'Review'
    case 'Chờ thanh toán':
    case 'Pending Payment':
      return 'Payment'
    case 'Planning':
    case 'In Progress':
    case 'Review':
    case 'Payment':
    case 'Done':
      return status
    default:
      return 'Planning'
  }
}

function toNumber(value: number | string | null) {
  return Number(value ?? 0)
}

function fromProjectRow(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    client: row.client,
    status: normalizeProjectStatus(row.status),
    revenue: toNumber(row.revenue),
    paid: toNumber(row.paid),
    note: row.note ?? '',
  }
}

function toProjectRow(project: Project) {
  return {
    id: project.id,
    name: project.name,
    client: project.client,
    status: project.status,
    revenue: project.revenue,
    paid: project.paid,
    note: project.note,
  }
}

function fromTaskRow(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    dueDate: row.due_date ?? getLocalDateKey(),
    status: row.completed ? 'Done' : 'To-do',
  }
}

function toTaskRow(task: Task) {
  return {
    id: task.id,
    title: task.title,
    due_date: task.dueDate,
    completed: task.status === 'Done',
  }
}

function reportSupabaseError(action: string, error: unknown) {
  console.error(`[WorkOS Supabase] ${action} failed`, error)
}

export function WorkOSProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    let isMounted = true

    async function loadWorkOSState() {
      const [projectsResult, tasksResult] = await Promise.all([
        supabase.from('projects').select('id,name,client,status,revenue,paid,note').order('created_at', {
          ascending: false,
        }),
        supabase.from('tasks').select('id,title,due_date,completed').order('created_at', {
          ascending: false,
        }),
      ])

      if (!isMounted) return

      if (projectsResult.error) {
        reportSupabaseError('Load projects', projectsResult.error)
      } else {
        setProjects((projectsResult.data ?? []).map((row) => fromProjectRow(row)))
      }

      if (tasksResult.error) {
        reportSupabaseError('Load tasks', tasksResult.error)
      } else {
        setTasks((tasksResult.data ?? []).map((row) => fromTaskRow(row)))
      }
    }

    void loadWorkOSState()

    return () => {
      isMounted = false
    }
  }, [])

  const value = useMemo<WorkOSStore>(
    () => ({
      projects,
      tasks,
      addProject(draft) {
        const project = { ...draft, id: createId('proj') }
        setProjects((current) => [project, ...current])

        void supabase
          .from('projects')
          .insert(toProjectRow(project))
          .then(({ error }) => {
            if (!error) return
            reportSupabaseError('Add project', error)
            setProjects((current) => current.filter((item) => item.id !== project.id))
          })

        return project
      },
      updateProject(projectId, draft) {
        const previousProject = projects.find((project) => project.id === projectId)
        if (!previousProject) return

        const nextProject = { ...draft, id: projectId }
        setProjects((current) =>
          current.map((project) => (project.id === projectId ? nextProject : project)),
        )

        void supabase
          .from('projects')
          .update(toProjectRow(nextProject))
          .eq('id', projectId)
          .then(({ error }) => {
            if (!error) return
            reportSupabaseError('Update project', error)
            setProjects((current) =>
              current.map((project) => (project.id === projectId ? previousProject : project)),
            )
          })
      },
      updateProjectStatus(projectId, status) {
        const previousProject = projects.find((project) => project.id === projectId)
        if (!previousProject) return

        setProjects((current) =>
          current.map((project) => (project.id === projectId ? { ...project, status } : project)),
        )

        void supabase
          .from('projects')
          .update({ status })
          .eq('id', projectId)
          .then(({ error }) => {
            if (!error) return
            reportSupabaseError('Update project status', error)
            setProjects((current) =>
              current.map((project) => (project.id === projectId ? previousProject : project)),
            )
          })
      },
      deleteProject(projectId) {
        const previousIndex = projects.findIndex((project) => project.id === projectId)
        const previousProject = projects[previousIndex]
        if (!previousProject) return

        setProjects((current) => current.filter((project) => project.id !== projectId))

        void supabase
          .from('projects')
          .delete()
          .eq('id', projectId)
          .then(({ error }) => {
            if (!error) return
            reportSupabaseError('Delete project', error)
            setProjects((current) => {
              const next = current.filter((project) => project.id !== projectId)
              next.splice(Math.min(previousIndex, next.length), 0, previousProject)
              return next
            })
          })
      },
      addTask(draft) {
        const task = { id: createId('task'), status: 'To-do' as const, ...draft }
        setTasks((current) => [task, ...current])

        void supabase
          .from('tasks')
          .insert(toTaskRow(task))
          .then(({ error }) => {
            if (!error) return
            reportSupabaseError('Add task', error)
            setTasks((current) => current.filter((item) => item.id !== task.id))
          })

        return task
      },
      updateTask(taskId, draft) {
        const previousTask = tasks.find((task) => task.id === taskId)
        if (!previousTask) return

        const nextTask = { ...previousTask, ...draft }
        setTasks((current) => current.map((task) => (task.id === taskId ? { ...task, ...draft } : task)))

        void supabase
          .from('tasks')
          .update(toTaskRow(nextTask))
          .eq('id', taskId)
          .then(({ error }) => {
            if (!error) return
            reportSupabaseError('Update task', error)
            setTasks((current) => current.map((task) => (task.id === taskId ? previousTask : task)))
          })
      },
      completeTask(taskId) {
        const index = tasks.findIndex((task) => task.id === taskId)
        const task = tasks[index]
        if (!task) return null

        const completedTask = { ...task, status: 'Done' as const }
        setTasks((current) =>
          current.map((item) => (item.id === taskId ? completedTask : item)),
        )

        void supabase
          .from('tasks')
          .update({ completed: true })
          .eq('id', taskId)
          .then(({ error }) => {
            if (!error) return
            reportSupabaseError('Complete task', error)
            setTasks((current) => current.map((item) => (item.id === taskId ? task : item)))
          })

        return { task, index }
      },
      undoTask(taskId) {
        const task = tasks.find((item) => item.id === taskId)
        if (!task) return null

        const restoredTask = { ...task, status: 'To-do' as const }
        setTasks((current) => current.map((item) => (item.id === taskId ? restoredTask : item)))

        void supabase
          .from('tasks')
          .update({ completed: false })
          .eq('id', taskId)
          .then(({ error }) => {
            if (!error) return
            reportSupabaseError('Undo task', error)
            setTasks((current) => current.map((item) => (item.id === taskId ? task : item)))
          })

        return restoredTask
      },
      deleteTask(taskId) {
        const previousIndex = tasks.findIndex((task) => task.id === taskId)
        const previousTask = tasks[previousIndex]
        if (!previousTask) return

        setTasks((current) => current.filter((task) => task.id !== taskId))

        void supabase
          .from('tasks')
          .delete()
          .eq('id', taskId)
          .then(({ error }) => {
            if (!error) return
            reportSupabaseError('Delete task', error)
            setTasks((current) => {
              const next = current.filter((task) => task.id !== taskId)
              next.splice(Math.min(previousIndex, next.length), 0, previousTask)
              return next
            })
          })
      },
      restoreTask(snapshot) {
        setTasks((current) => {
          const withoutTask = current.filter((task) => task.id !== snapshot.task.id)
          const next = [...withoutTask]
          next.splice(Math.min(snapshot.index, next.length), 0, snapshot.task)
          return next
        })

        void supabase
          .from('tasks')
          .update(toTaskRow(snapshot.task))
          .eq('id', snapshot.task.id)
          .then(({ error }) => {
            if (error) reportSupabaseError('Restore task', error)
          })
      },
    }),
    [projects, tasks],
  )

  return <WorkOSContext.Provider value={value}>{children}</WorkOSContext.Provider>
}

export function useWorkOSStore() {
  const context = useContext(WorkOSContext)
  if (!context) {
    throw new Error('useWorkOSStore must be used inside WorkOSProvider')
  }
  return context
}
