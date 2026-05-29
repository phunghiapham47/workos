import { useEffect, useState } from 'react'
import { getLocalDateKey, getNextLocalDateDelay } from './localDate'

export function useLocalDateKey() {
  const [todayKey, setTodayKey] = useState(() => getLocalDateKey())

  useEffect(() => {
    let midnightTimer: number | undefined

    const refreshTodayKey = () => {
      setTodayKey((current) => {
        const next = getLocalDateKey()
        return current === next ? current : next
      })
    }

    const scheduleNextMidnight = () => {
      midnightTimer = window.setTimeout(() => {
        refreshTodayKey()
        scheduleNextMidnight()
      }, getNextLocalDateDelay())
    }

    const interval = window.setInterval(refreshTodayKey, 60_000)
    scheduleNextMidnight()

    return () => {
      window.clearInterval(interval)
      if (midnightTimer !== undefined) window.clearTimeout(midnightTimer)
    }
  }, [])

  return todayKey
}
