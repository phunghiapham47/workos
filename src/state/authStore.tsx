/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { X } from 'lucide-react'
import { supabase } from '../lib/supabase'

type AuthStore = {
  isEditMode: boolean
  isLoading: boolean
  openLogin: () => void
  requireEditAccess: () => boolean
  signOut: () => Promise<void>
  user: User | null
}

const AuthContext = createContext<AuthStore | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  useEffect(() => {
    let isMounted = true

    void supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return
      setUser(data.session?.user ?? null)
      setIsLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
      if (session?.user) setIsLoginOpen(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const value = useMemo<AuthStore>(
    () => ({
      isEditMode: Boolean(user),
      isLoading,
      openLogin: () => setIsLoginOpen(true),
      requireEditAccess: () => {
        if (user) return true
        setIsLoginOpen(true)
        return false
      },
      signOut: async () => {
        await supabase.auth.signOut()
        setUser(null)
      },
      user,
    }),
    [isLoading, user],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
      {isLoginOpen ? <LoginDialog onClose={() => setIsLoginOpen(false)} /> : null}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}

function LoginDialog({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setIsSubmitting(false)
    if (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-white/80 p-3 backdrop-blur-sm sm:p-5">
      <form
        onSubmit={(event) => void submitLogin(event)}
        className="ml-auto flex w-full max-w-sm flex-col border border-black bg-white shadow-[3px_3px_0_#020617]"
      >
        <div className="flex items-center justify-between border-b border-slate-300 px-3 py-2">
          <p className="eyebrow">Editor Login</p>
          <button type="button" onClick={onClose} className="grid size-8 place-items-center border border-black">
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-3 p-3">
          <label className="grid gap-1.5">
            <span className="eyebrow">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-9 border border-slate-300 px-2 text-sm font-bold outline-none focus:border-black"
            />
          </label>

          <label className="grid gap-1.5">
            <span className="eyebrow">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-9 border border-slate-300 px-2 text-sm font-bold outline-none focus:border-black"
            />
          </label>

          {errorMessage ? (
            <p className="border border-red-200 bg-red-50 px-2 py-1.5 text-xs font-bold text-red-700">
              {errorMessage}
            </p>
          ) : null}
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-300 p-3">
          <button
            type="button"
            onClick={onClose}
            className="h-9 border border-slate-300 px-3 font-mono text-[10px] font-black uppercase tracking-normal"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-9 border border-black bg-black px-3 font-mono text-[10px] font-black uppercase tracking-normal text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Signing In' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  )
}
