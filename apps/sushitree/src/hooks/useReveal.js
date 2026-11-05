import { useEffect } from 'react'

const FALLBACK_MS = 1200

// Наблюдает за .reveal-элементами внутри containerRef и проявляет их
// с небольшой ступенчатой задержкой при попадании во вьюпорт.
// Элементы, уже видимые на момент монтирования, проявляются сразу.
// Если IntersectionObserver по какой-то причине не срабатывает
// (нестандартные браузеры/расширения), контент всё равно не остаётся
// навсегда невидимым — есть таймаут-страховка.
export function useReveal(containerRef, deps = []) {
  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = Array.from(root.querySelectorAll('.reveal'))
    if (!els.length) return

    if (reduced) {
      els.forEach((el) => el.classList.add('visible'))
      return
    }

    els.forEach((el, i) => {
      el.style.setProperty('--d', `${Math.min(i % 8, 8) * 0.05}s`)
    })

    const vh = window.innerHeight || document.documentElement.clientHeight
    const pending = []
    els.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < vh && rect.bottom > 0) {
        el.classList.add('visible')
      } else {
        pending.push(el)
      }
    })
    if (!pending.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    pending.forEach((el) => io.observe(el))

    const fallback = setTimeout(() => {
      pending.forEach((el) => el.classList.add('visible'))
    }, FALLBACK_MS)

    return () => {
      io.disconnect()
      clearTimeout(fallback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
