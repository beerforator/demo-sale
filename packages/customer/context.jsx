import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { STORAGE_KEY, freshState, readState, reduceCustomer } from './model.mjs'
import { millisecondsUntilMoscowMidnight, moscowDay } from './moscow-day.mjs'

const CustomerContext = createContext(null)
export function CustomerProvider({ children }) {
  const [state, setState] = useState(() => { try { return readState(localStorage) } catch { return freshState() } })
  const [error, setError] = useState('')
  useEffect(() => {
    let midnightTimer
    const refresh = event => {
      if (event?.type === 'storage' && event.key !== STORAGE_KEY && event.key !== null) return
      const now = new Date()
      const day = moscowDay(now)
      try { setState(readState(localStorage, day)) } catch {
        setState(previous => ({ ...freshState(day), signedIn: previous.signedIn, profile: previous.profile }))
        setError('Не удалось прочитать данные. Проверьте настройки хранения в браузере.')
      }
      clearTimeout(midnightTimer)
      midnightTimer = setTimeout(refresh, millisecondsUntilMoscowMidnight(now))
    }
    refresh()
    window.addEventListener('storage', refresh)
    window.addEventListener('focus', refresh)
    window.addEventListener('pageshow', refresh)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      clearTimeout(midnightTimer)
      window.removeEventListener('storage', refresh)
      window.removeEventListener('focus', refresh)
      window.removeEventListener('pageshow', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [])
  const transact = useCallback(async action => {
    const commit = () => {
      const current = readState(localStorage)
      const next = reduceCustomer(current, action)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setState(next); setError('')
      return next
    }
    try {
      return navigator.locks ? await navigator.locks.request(STORAGE_KEY, commit) : commit()
    } catch (err) {
      const message = err.name === 'QuotaExceededError' || err.name === 'SecurityError'
        ? 'Не удалось сохранить данные. Проверьте разрешения и свободное место в браузере.' : err.message
      setError(message)
      throw new Error(message)
    }
  }, [])
  return <CustomerContext.Provider value={{ state, transact, error }}>{children}</CustomerContext.Provider>
}
export const useCustomer = () => useContext(CustomerContext)
