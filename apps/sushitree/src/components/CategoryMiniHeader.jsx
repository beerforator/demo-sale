import { useState, useCallback, useMemo } from 'react'

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
        gap: 'var(--spacing-md)',
      }}>
        <h2 style={{
          fontSize: 'var(--font-size-2xl)',
          fontWeight: 800,
          letterSpacing: '-0.01em',
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
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 600,
                  border: '2px solid',
                  borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border)',
                  background: isActive ? 'var(--color-accent)' : isHovered ? 'var(--color-surface-hover)' : 'var(--color-surface)',
                  color: isActive ? '#fff' : 'var(--color-text)',
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
            gap: '4px',
            flexWrap: 'wrap',
            width: '100%',
            paddingTop: '4px',
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
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: isActive ? 600 : 500,
                    background: isActive ? 'var(--color-accent)' : hoveredSub === sub.id ? 'var(--color-surface-hover)' : 'transparent',
                    color: isActive ? '#fff' : hoveredSub === sub.id ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
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