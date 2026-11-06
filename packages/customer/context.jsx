import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { STORAGE_KEY, freshState, readState, reduceCustomer } from './model.mjs'

const CustomerContext = createContext(null)
export function CustomerProvider({ children }) {
  const [state, setState] = useState(() => { try { return readState(localStorage) } catch { return freshState() } })
  const [error, setError] = useState('')
  useEffect(() => {
    const refresh = event => {
      if (event.type === 'storage' && event.key !== STORAGE_KEY && event.key !== null) return
      try { setState(readState(localStorage)) } catch { setError('Не удалось прочитать демоданные. Разрешите хранение данных в браузере.') }
    }
    window.addEventListener('storage', refresh)
    window.addEventListener('focus', refresh)
    return () => { window.removeEventListener('storage', refresh); window.removeEventListener('focus', refresh) }
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
