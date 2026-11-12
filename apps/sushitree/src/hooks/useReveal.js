import { useEffect } from 'react'

export function useReveal(containerRef) {
  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue
        target.classList.add('editorial-section--revealed')
        observer.unobserve(target)
      }
    })

    for (const section of container.querySelectorAll('[data-scroll-reveal]')) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [containerRef])
}
