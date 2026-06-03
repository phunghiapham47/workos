import { LogIn, LogOut } from 'lucide-react'
import { useAuth } from '../../state/authStore'

export default function AuthControls() {
  const { isEditMode, isLoading, openLogin, signOut, user } = useAuth()

  return (
    <div className="flex min-w-0 items-center gap-2">
      <span
        className={[
          'hidden border px-2 py-1 font-mono text-[10px] font-black uppercase tracking-normal sm:inline-flex',
          isEditMode ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-slate-300 bg-white text-slate-500',
        ].join(' ')}
      >
        {isEditMode ? 'Edit Mode' : 'View Only'}
      </span>

      {isEditMode ? (
        <button
          type="button"
          onClick={() => void signOut()}
          className="inline-flex h-8 min-w-0 items-center gap-2 border border-slate-300 bg-white px-2.5 font-mono text-[10px] font-black uppercase tracking-normal text-slate-700 hover:border-black hover:text-black"
          title={user?.email ?? 'Signed in'}
        >
          <LogOut className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="hidden max-w-36 truncate sm:inline">{user?.email ?? 'Sign Out'}</span>
          <span className="sm:hidden">Out</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={openLogin}
          disabled={isLoading}
          className="inline-flex h-8 items-center gap-2 border border-black bg-black px-2.5 font-mono text-[10px] font-black uppercase tracking-normal text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogIn className="size-3.5" aria-hidden="true" />
          Sign In
        </button>
      )}
    </div>
  )
}
