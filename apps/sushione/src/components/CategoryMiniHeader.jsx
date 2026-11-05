const FILTER_LABELS = {
  all: 'Все',
  new: 'Новинки',
  hit: 'Хиты',
  spicy: 'Острое',
  veg: 'Вегетарианское',
}

export default function CategoryMiniHeader({
  category,
  activeFilter,
  onFilterChange,
  activeSubcategory,
  onSubcategoryClick,
  count,
}) {
  if (!category) return null

  const visibleSubcategories = (category.subcategories || []).filter((s) => s.id !== 'all')

  return (
    <>
      <div className="cat-head">
        <div className="cat-head__title-wrap">
          <h2 className="cat-head__title">{category.name}</h2>
          {count > 0 && (
            <span className="cat-head__count">{count} позиций</span>
          )}
        </div>

        <div className="cat-filters">
          {category.filters.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                className={`cat-filter${isActive ? ' cat-filter--active' : ''}`}
                onClick={() => onFilterChange(isActive ? 'all' : filter)}
              >
                {FILTER_LABELS[filter] || filter}
              </button>
            )
          })}
        </div>
      </div>

      {visibleSubcategories.length > 0 && (
        <div className="cat-subs">
          {visibleSubcategories.map((sub) => (
            <button
              key={sub.id}
              className={`cat-sub${activeSubcategory === sub.id ? ' cat-sub--active' : ''}`}
              onClick={() => onSubcategoryClick(sub.id)}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
