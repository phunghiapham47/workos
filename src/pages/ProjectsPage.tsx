import { Pencil, Plus, Trash2, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import {
  formatMoney,
  getOutstanding,
  getProjectStatusTone,
  projectStatuses,
  statusFilters,
  type Project,
  type ProjectStatus,
  type StatusFilter,
} from '../data/workosMock'
import { useWorkOSStore, type ProjectDraft } from '../state/workosStore'

const statusOrder: Record<ProjectStatus, number> = {
  Planning: 1,
  'In Progress': 2,
  Review: 3,
  Payment: 4,
  Done: 5,
}

const emptyDraft: ProjectDraft = {
  name: '',
  client: '',
  status: 'Planning',
  revenue: 0,
  paid: 0,
  note: '',
}

export default function ProjectsPage() {
  const { addProject, deleteProject, projects, updateProject, updateProjectStatus } = useWorkOSStore()
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('ALL')
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id ?? '')
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isProjectSheetOpen, setIsProjectSheetOpen] = useState(false)
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false)

  const orderedProjects = useMemo(
    () =>
      [...projects].sort((a, b) => {
        if (a.status === 'Done' && b.status !== 'Done') return 1
        if (a.status !== 'Done' && b.status === 'Done') return -1
        return statusOrder[a.status] - statusOrder[b.status]
      }),
    [projects],
  )

  const metrics = useMemo(() => {
    const activeProjects = orderedProjects.filter((project) => project.status !== 'Done')
    const pipelineValue = activeProjects.reduce((total, project) => total + project.revenue, 0)
    const outstandingExposure = activeProjects
      .filter((project) => project.status === 'Payment')
      .reduce((total, project) => total + getOutstanding(project), 0)
    const paidReceived = orderedProjects.reduce((total, project) => total + project.paid, 0)

    return {
      activeCount: activeProjects.length,
      paidReceived,
      pipelineValue,
      outstandingExposure,
    }
  }, [orderedProjects])

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'ALL'
        ? orderedProjects
        : orderedProjects.filter((project) => project.status === activeFilter),
    [activeFilter, orderedProjects],
  )

  const selectedProject =
    orderedProjects.find((project) => project.id === selectedProjectId) ??
    filteredProjects[0] ??
    orderedProjects[0]

  const openAddProject = () => {
    setEditingProject(null)
    setIsProjectSheetOpen(true)
  }

  const openEditProject = (project: Project) => {
    setEditingProject(project)
    setIsProjectSheetOpen(true)
  }

  const saveProject = (draft: ProjectDraft) => {
    if (editingProject) {
      updateProject(editingProject.id, draft)
      setSelectedProjectId(editingProject.id)
    } else {
      const project = addProject(draft)
      setSelectedProjectId(project.id)
    }
    setIsProjectSheetOpen(false)
    setEditingProject(null)
  }

  const handleDeleteProject = (projectId: string) => {
    deleteProject(projectId)
    if (selectedProjectId === projectId) {
      setSelectedProjectId(projects.find((project) => project.id !== projectId)?.id ?? '')
    }
  }

  return (
    <section>
      {isMobileDetailOpen && selectedProject ? (
        <div className="min-h-[calc(100vh-9rem)] bg-workos-grid pb-20 lg:hidden">
          <div className="mb-3 flex min-h-12 items-center justify-between border border-slate-300 bg-white px-3 py-2">
            <div className="min-w-0">
              <p className="eyebrow">Project Detail</p>
              <p className="mt-1 truncate text-sm font-black text-black">{selectedProject.name}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileDetailOpen(false)}
              className="grid size-8 shrink-0 place-items-center border border-black bg-white text-black"
              aria-label="Close project detail"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </div>
          <ProjectDetailPanel project={selectedProject} onEdit={openEditProject} onDelete={handleDeleteProject} />
        </div>
      ) : null}

      <div
        className={
          isMobileDetailOpen && selectedProject
            ? 'hidden space-y-3 sm:space-y-4 lg:block'
            : 'space-y-3 sm:space-y-4'
        }
      >
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <ProjectMetric label="Active Pipeline" value={String(metrics.activeCount)} note="Excludes Done" />
          <ProjectMetric label="Pipeline Value" value={formatMoney(metrics.pipelineValue)} note="Active revenue" />
          <ProjectMetric
            label="Outstanding"
            value={formatMoney(metrics.outstandingExposure)}
            note="Payment only"
          />
          <ProjectMetric
            label="Paid Received"
            value={formatMoney(metrics.paidReceived)}
            note="Total paid"
          />
        </div>

        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="min-w-0 space-y-3 sm:space-y-4">
            <div className="module-panel flex min-w-0 items-center justify-between gap-3 overflow-hidden p-2.5 sm:p-3">
              <StatusFilterBar activeFilter={activeFilter} onChange={setActiveFilter} />
              <button
                type="button"
                onClick={openAddProject}
                className="inline-flex h-8 shrink-0 items-center gap-2 border border-black bg-black px-2.5 font-mono text-[10px] font-black uppercase tracking-[0.12em] text-white"
              >
                <Plus className="size-3.5" aria-hidden="true" />
                Add Project
              </button>
            </div>

            <ProjectQueue
              projects={filteredProjects}
              selectedProjectId={selectedProject?.id}
              onDeleteProject={handleDeleteProject}
              onEditProject={openEditProject}
              onSelectProject={(project) => {
                setSelectedProjectId(project.id)
                setIsMobileDetailOpen(true)
              }}
              onUpdateStatus={updateProjectStatus}
            />
          </div>

          <aside className="hidden lg:block">
            {selectedProject ? (
              <ProjectDetailPanel project={selectedProject} onEdit={openEditProject} onDelete={handleDeleteProject} />
            ) : null}
          </aside>
        </div>
      </div>

      {isProjectSheetOpen ? (
        <ProjectEditor
          initialProject={editingProject}
          onClose={() => {
            setIsProjectSheetOpen(false)
            setEditingProject(null)
          }}
          onSave={saveProject}
        />
      ) : null}
    </section>
  )
}

function ProjectMetric({
  label,
  value,
  note,
  className = '',
}: {
  label: string
  value: string
  note: string
  className?: string
}) {
  return (
    <article className={['module-panel p-2 sm:p-2.5', className].join(' ')}>
      <p className="eyebrow">{label}</p>
      <p className="mt-1.5 break-words text-lg font-black tracking-tight text-black sm:text-xl xl:text-2xl">
        {value}
      </p>
      <p className="mt-0.5 text-[11px] font-bold text-slate-500">{note}</p>
    </article>
  )
}

function StatusFilterBar({
  activeFilter,
  onChange,
}: {
  activeFilter: StatusFilter
  onChange: (filter: StatusFilter) => void
}) {
  return (
    <div className="flex min-w-0 flex-1 gap-2 pb-1" style={{ overflowX: 'auto' }} aria-label="Project status filters">
      {statusFilters.map((status) => {
        const isActive = activeFilter === status
        const colorClass = status === 'ALL' ? 'border-slate-300 bg-white text-slate-700' : getProjectStatusTone(status)

        return (
          <button
            key={status}
            type="button"
            onClick={() => onChange(status)}
            className={[
              'h-8 shrink-0 border px-2.5 font-mono text-[10px] font-black uppercase tracking-[0.12em] transition',
              isActive ? 'border-black bg-black text-white' : `${colorClass} hover:border-black hover:text-black`,
            ].join(' ')}
          >
            {status}
          </button>
        )
      })}
    </div>
  )
}

function ProjectQueue({
  projects,
  selectedProjectId,
  onDeleteProject,
  onEditProject,
  onSelectProject,
  onUpdateStatus,
}: {
  projects: Project[]
  selectedProjectId?: string
  onDeleteProject: (projectId: string) => void
  onEditProject: (project: Project) => void
  onSelectProject: (project: Project) => void
  onUpdateStatus: (projectId: string, status: ProjectStatus) => void
}) {
  return (
    <article className="module-panel min-w-0 overflow-hidden p-3 sm:p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">Project Queue</p>
        <span className="status-chip">{projects.length} PROJECTS</span>
      </div>

      <div className="mt-3 hidden grid-cols-[minmax(0,1.2fr)_126px_104px_104px_92px] border border-b-0 border-slate-300 bg-slate-50 px-3 py-2 font-mono text-[10px] font-black uppercase tracking-[0.14em] text-slate-500 sm:grid">
        <span>Project / Client</span>
        <span>Status</span>
        <span>Revenue</span>
        <span>Outstanding</span>
        <span>Actions</span>
      </div>

      <div className="divide-y divide-slate-200 border border-slate-300">
        {projects.map((project) => {
          const isDone = project.status === 'Done'
          const isSelected = selectedProjectId === project.id

          return (
            <div
              key={project.id}
              className={[
                'grid gap-2 px-3 py-2.5 sm:grid-cols-[minmax(0,1.2fr)_126px_104px_104px_92px] sm:items-start',
                isSelected ? 'bg-slate-50 shadow-[inset_3px_0_0_#020617]' : 'bg-white',
                isDone ? 'text-slate-400 opacity-60' : 'text-slate-950',
              ].join(' ')}
            >
              <button type="button" onClick={() => onSelectProject(project)} className="min-w-0 text-left">
                <p className="truncate text-sm font-black">{project.name}</p>
                <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  {project.client}
                </p>
              </button>

              <label className="hidden gap-1 sm:grid">
                <select
                  value={project.status}
                  onChange={(event) => onUpdateStatus(project.id, event.target.value as ProjectStatus)}
                  className={[
                    'h-8 w-full max-w-36 border px-2 font-mono text-[10px] font-black uppercase tracking-[0.08em] outline-none',
                    getProjectStatusTone(project.status),
                  ].join(' ')}
                  aria-label={`Update status for ${project.name}`}
                >
                  {projectStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-2 sm:contents">
                <div className="border border-slate-200 bg-white px-2 py-1.5 sm:border-0 sm:bg-transparent sm:p-0">
                  <p className="eyebrow sm:hidden">Revenue</p>
                  <p className="mt-1 text-xs font-black sm:mt-0 sm:text-sm">{formatMoney(project.revenue)}</p>
                </div>

                <div className="border border-slate-200 bg-white px-2 py-1.5 sm:border-0 sm:bg-transparent sm:p-0">
                  <p className="eyebrow sm:hidden">Outstanding</p>
                  <p className="mt-1 text-xs font-black sm:mt-0 sm:text-sm">{formatMoney(getOutstanding(project))}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 sm:hidden">
                <label>
                  <span className="sr-only">Status</span>
                  <select
                    value={project.status}
                    onChange={(event) => onUpdateStatus(project.id, event.target.value as ProjectStatus)}
                    className={[
                      'h-8 w-36 border px-2 font-mono text-[10px] font-black uppercase tracking-[0.08em] outline-none',
                      getProjectStatusTone(project.status),
                    ].join(' ')}
                    aria-label={`Update status for ${project.name}`}
                  >
                    {projectStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <ProjectRowActions project={project} onDeleteProject={onDeleteProject} onEditProject={onEditProject} />
              </div>

              <div className="hidden items-center gap-1 sm:flex">
                <ProjectRowActions project={project} onDeleteProject={onDeleteProject} onEditProject={onEditProject} />
              </div>

              <p className="text-xs leading-4 text-slate-500 sm:col-span-5 sm:-mt-1">{project.note}</p>
            </div>
          )
        })}
      </div>
    </article>
  )
}

function ProjectRowActions({
  onDeleteProject,
  onEditProject,
  project,
}: {
  onDeleteProject: (projectId: string) => void
  onEditProject: (project: Project) => void
  project: Project
}) {
  return (
    <>
                <button
                  type="button"
                  onClick={() => onEditProject(project)}
                  className="grid size-8 place-items-center border border-slate-300 bg-white text-slate-700"
                  aria-label={`Edit ${project.name}`}
                >
                  <Pencil className="size-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteProject(project.id)}
                  className="grid size-8 place-items-center border border-slate-300 bg-white text-slate-700"
                  aria-label={`Delete ${project.name}`}
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                </button>
    </>
  )
}

function ProjectDetailPanel({
  project,
  onDelete,
  onEdit,
}: {
  project: Project
  onDelete: (projectId: string) => void
  onEdit: (project: Project) => void
}) {
  return (
    <article className="module-panel border-t-2 border-t-black p-3 sm:p-4 lg:sticky lg:top-24">
      <div className="flex items-start justify-between gap-3">
        <p className="eyebrow">Project Detail</p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onEdit(project)}
            className="grid size-8 place-items-center border border-slate-300 bg-white text-slate-700"
            aria-label={`Edit ${project.name}`}
          >
            <Pencil className="size-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(project.id)}
            className="grid size-8 place-items-center border border-slate-300 bg-white text-slate-700"
            aria-label={`Delete ${project.name}`}
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="mt-3 border border-slate-300 bg-slate-50 p-3">
        <h2 className="text-lg font-black tracking-tight text-black">{project.name}</h2>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            className={[
              'border px-2 py-1 font-mono text-[10px] font-black uppercase tracking-[0.12em]',
              getProjectStatusTone(project.status),
            ].join(' ')}
          >
            {project.status}
          </span>
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
            {project.client}
          </span>
        </div>
      </div>

      <div className="mt-3 divide-y divide-slate-200 border border-slate-300 bg-white">
        <DetailRow label="Status" value={project.status} />
        <DetailRow label="Outstanding" value={formatMoney(getOutstanding(project))} strong />
        <DetailRow label="Revenue" value={formatMoney(project.revenue)} />
        <DetailRow label="Paid" value={formatMoney(project.paid)} />
        <DetailRow label="Note" value={project.note} />
      </div>
    </article>
  )
}

function DetailRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="grid grid-cols-[96px_minmax(0,1fr)] items-start gap-3 px-3 py-2.5">
      <p className="eyebrow">{label}</p>
      <p className={['break-words text-sm text-black', strong ? 'font-black' : 'font-bold'].join(' ')}>
        {value}
      </p>
    </div>
  )
}

function ProjectEditor({
  initialProject,
  onClose,
  onSave,
}: {
  initialProject: Project | null
  onClose: () => void
  onSave: (draft: ProjectDraft) => void
}) {
  const [draft, setDraft] = useState<ProjectDraft>(initialProject ?? emptyDraft)

  const updateDraft = <K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  return (
    <div className="fixed inset-0 z-40 bg-white/80 p-3 backdrop-blur-sm sm:p-5">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSave(draft)
        }}
        className="ml-auto flex max-h-full w-full max-w-xl flex-col border border-black bg-white lg:max-w-md"
      >
        <div className="flex items-center justify-between border-b border-slate-300 px-3 py-2">
          <p className="eyebrow">{initialProject ? 'Edit Project' : 'Add Project'}</p>
          <button type="button" onClick={onClose} className="grid size-8 place-items-center border border-black">
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-3 overflow-y-auto p-3">
          <Field label="Project Name">
            <input
              required
              value={draft.name}
              onChange={(event) => updateDraft('name', event.target.value)}
              className="h-9 w-full border border-slate-300 px-2 text-sm font-bold"
            />
          </Field>
          <Field label="Client">
            <input
              required
              value={draft.client}
              onChange={(event) => updateDraft('client', event.target.value)}
              className="h-9 w-full border border-slate-300 px-2 text-sm font-bold"
            />
          </Field>
          <Field label="Status">
            <select
              value={draft.status}
              onChange={(event) => updateDraft('status', event.target.value as ProjectStatus)}
              className="h-9 w-full border border-slate-300 px-2 text-sm font-bold"
            >
              {projectStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Revenue">
              <input
                min="0"
                type="number"
                value={draft.revenue}
                onChange={(event) => updateDraft('revenue', Number(event.target.value))}
                className="h-9 w-full border border-slate-300 px-2 text-sm font-bold"
              />
            </Field>
            <Field label="Paid">
              <input
                min="0"
                type="number"
                value={draft.paid}
                onChange={(event) => updateDraft('paid', Number(event.target.value))}
                className="h-9 w-full border border-slate-300 px-2 text-sm font-bold"
              />
            </Field>
          </div>
          <div className="border border-slate-300 bg-slate-50 p-2">
            <p className="eyebrow">Outstanding</p>
            <p className="mt-1 text-sm font-black">{formatMoney(getOutstanding({ ...draft, id: 'draft' }))}</p>
          </div>
          <Field label="Note">
            <textarea
              value={draft.note}
              onChange={(event) => updateDraft('note', event.target.value)}
              className="min-h-20 w-full border border-slate-300 p-2 text-sm font-bold"
            />
          </Field>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-300 p-3">
          <button type="button" onClick={onClose} className="h-9 border border-slate-300 px-3 font-mono text-[10px] font-black uppercase tracking-[0.12em]">
            Cancel
          </button>
          <button type="submit" className="h-9 border border-black bg-black px-3 font-mono text-[10px] font-black uppercase tracking-[0.12em] text-white">
            Save Project
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({ children, label }: { children: ReactNode; label: string }) {
  return (
    <label className="grid gap-1.5">
      <span className="eyebrow">{label}</span>
      {children}
    </label>
  )
}
