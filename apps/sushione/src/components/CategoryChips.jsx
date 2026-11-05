import { useEffect, useRef, useState } from 'react'
import './CategoryChips.css'

export default function CategoryChips({ categories, activeId, onSelect }) {
  const trackRef = useRef(null)
  const indicatorRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    const indicator = indicatorRef.current
    if (!track || !indicator) return
    const btn = track.querySelector(`[data-id="${activeId}"]`)
    if (!btn) return
    const trackRect = track.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    indicator.style.width = `${btnRect.width}px`
    indicator.style.transform = `translateX(${btnRect.left - trackRect.left + track.scrollLeft}px)`
    if (!ready) setReady(true)
  }, [activeId, ready])

  return (
    <div className="chip-row">
      <div className="chip-track" ref={trackRef}>
        <span
          className="chip-indicator"
          ref={indicatorRef}
          style={{ opacity: ready ? 1 : 0 }}
        />
        {categories.map((cat) => (
          <button
            key={cat.id}
            data-id={cat.id}
            className="chip"
            aria-selected={cat.id === activeId}
            onClick={() => onSelect(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}
