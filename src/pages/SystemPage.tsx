import { ShieldCheck } from 'lucide-react'

const utilityActions = [
  {
    label: 'Backup Snapshot',
    description: 'Create a local operational checkpoint.',
    icon: ShieldCheck,
  },
]

export default function SystemPage() {
  return (
    <section className="grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
      <article className="module-panel p-3 sm:p-4">
        <p className="eyebrow">Maintenance</p>
        <div className="mt-3 divide-y divide-slate-200 border border-slate-300">
          {utilityActions.map((action) => (
            <button
              key={action.label}
              type="button"
              className="grid w-full gap-3 px-3 py-3 text-left transition hover:bg-slate-50 sm:grid-cols-[32px_minmax(0,1fr)_auto] sm:items-center"
            >
              <span className="grid size-8 place-items-center border border-slate-300 bg-white text-slate-700">
                <action.icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-black text-black">{action.label}</span>
                <span className="mt-1 block text-xs leading-5 text-slate-500">{action.description}</span>
              </span>
              <span className="font-mono text-[10px] font-black uppercase tracking-normal text-slate-500">
                Ready
              </span>
            </button>
          ))}
        </div>
      </article>

      <article className="module-panel border-t-2 border-t-black p-3 sm:p-4">
        <p className="eyebrow">Version</p>
        <p className="mt-3 text-3xl font-black tracking-normal text-black">v1.0-workos</p>
        <p className="mt-2 text-xs font-bold uppercase tracking-normal text-slate-500">
          WorkOS local shell
        </p>
      </article>
    </section>
  )
}
