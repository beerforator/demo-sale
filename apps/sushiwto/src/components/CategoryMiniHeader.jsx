import { useState } from 'react'

const FILTER_LABELS = {
  all: 'Все',
  new: 'Новинки',
  hit: 'Хиты',
  spicy: 'Острое',
  veg: 'Вегетарианское'
}

export default function CategoryMiniHeader({ category, activeFilter, onFilterChange, activeSubcategory, onSubcategoryClick }) {
  const [hoveredFilter, setHoveredFilter] = useState(null)
  const [hoveredSub, setHoveredSub] = useState(null)

  if (!category) return null

  const visibleSubcategories = (category.subcategories || []).filter(s => s.id !== 'all')

  return (
    <div style={{
      transition: 'opacity 0.35s ease, transform 0.35s ease',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'calc(var(--spacing-md) - 10px)',
      }}>
        <h2 style={{
          fontFamily: 'Sangha, var(--font-primary)',
          fontSize: 'var(--font-size-3xl)',
          fontWeight: 400,
          letterSpacing: '0.01em',
          color: 'var(--color-text)',
          margin: 0,
        }}>
          {category.name}
        </h2>

        <div style={{
          display: 'flex',
          gap: '6px',
          flexWrap: 'wrap',
        }}>
          {category.filters.map(filter => {
            const isActive = activeFilter === filter
            const isHovered = hoveredFilter === filter

            return (
              <button
                key={filter}
                onClick={() => onFilterChange(isActive ? 'all' : filter)}
                onMouseEnter={() => setHoveredFilter(filter)}
                onMouseLeave={() => setHoveredFilter(null)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 600,
                  border: '1.5px solid',
                  borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border-light)',
                  background: isActive ? 'var(--color-accent)' : isHovered ? 'var(--color-surface-hover)' : 'transparent',
                  color: isActive ? '#fff' : isHovered ? 'var(--color-text)' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  whiteSpace: 'nowrap',
                }}
              >
                {FILTER_LABELS[filter] || filter}
              </button>
            )
          })}
        </div>

        {visibleSubcategories.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '2px',
            flexWrap: 'wrap',
            width: '100%',
            paddingTop: '4px',
            background: 'var(--color-surface-hover)',
            borderRadius: 'var(--radius-sm)',
            padding: '3px',
          }}>
            {visibleSubcategories.map(sub => {
              const isActive = activeSubcategory === sub.id
              return (
                <button
                  key={sub.id}
                  onClick={() => onSubcategoryClick(sub.id)}
                  onMouseEnter={() => setHoveredSub(sub.id)}
                  onMouseLeave={() => setHoveredSub(null)}
                  style={{
                    padding: '7px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 600,
                    background: isActive ? 'var(--color-surface)' : hoveredSub === sub.id ? 'var(--color-surface)' : 'transparent',
                    color: isActive ? 'var(--color-accent)' : hoveredSub === sub.id ? 'var(--color-text)' : 'var(--color-text-muted)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  {sub.name}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}