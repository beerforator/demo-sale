import { useState, useEffect, useRef, useCallback } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Hero from '../components/Hero.jsx'
import BannerCarousel from '../components/BannerCarousel.jsx'
import CategoryMiniHeader from '../components/CategoryMiniHeader.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useReveal } from '../hooks/useReveal.js'
import categories from '../data/categories.json'
import products from '../data/products.json'

function getHeaderOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-height')
  return parseFloat(raw) || 64
}

function getFilteredItems(categoryId, filter, subcategory) {
  let items = products.filter(p => p.categoryId === categoryId)
  if (subcategory && subcategory !== 'all') {
    items = items.filter(p => p.subcategoryId === subcategory)
  }
  if (filter === 'new') items = items.filter(p => p.tags.includes('new'))
  if (filter === 'hit') items = items.filter(p => p.tags.includes('hit'))
  if (filter === 'spicy') items = items.filter(p => p.tags.includes('spicy'))
  if (filter === 'veg') items = items.filter(p => p.tags.includes('veg'))
  return items
}

function ProductGrid({ items }) {
  if (items.length === 0) return null
  return (
    <div className="product-grid">
      {items.map(product => (
        <div key={product.id} className="reveal">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return <p className="section-empty">Ничего не найдено по этому фильтру.</p>
}

// Тело категории: если есть подкатегории — всегда показываем сгруппированные
// блоки одним списком (подкатегорийные вкладки в шапке только скроллят к
// нужному блоку и ничего не скрывают); фильтр (Все/Новинки/Хиты/...) при этом
// применяется внутри каждой группы. Если подкатегорий нет — обычная плоская сетка.
function CategoryBody({ category, filter }) {
  const visibleSubs = (category.subcategories || []).filter(s => s.id !== 'all')
  const hasSubcategories = visibleSubs.length > 0

  if (hasSubcategories) {
    const groups = visibleSubs
      .map(sub => ({ sub, items: getFilteredItems(category.id, filter, sub.id) }))
      .filter(g => g.items.length > 0)

    if (groups.length === 0) return <EmptyState />

    return groups.map(({ sub, items }) => (
      <div
        key={sub.id}
        className="subgroup"
        id={`subcat-${category.id}-${sub.id}`}
        style={{ scrollMarginTop: 'calc(var(--header-height) + 130px)' }}
      >
        <div className="subgroup__head">
          <h3 className="subgroup__title">{sub.name}</h3>
          <span className="subgroup__rule" />
          <span className="subgroup__num">{String(items.length).padStart(2, '0')}</span>
        </div>
        <ProductGrid items={items} />
      </div>
    ))
  }

  const items = getFilteredItems(category.id, filter, null)
  if (items.length === 0) return <EmptyState />
  return <ProductGrid items={items} />
}

// Каждая категория — самостоятельный блок: свой фильтр и собственная
// прилипающая мини-шапка внутри своей же секции. Никакого общего состояния
// между категориями — это то, что раньше приводило к рассинхрону шапки с
// реально видимой секцией во время скролла.
//
// Вкладки подкатегорий (Маленькие/Средние/Большие и т.п.) ничего не
// фильтруют — это якорная навигация: клик скроллит к нужному блоку, а какая
// вкладка подсвечена, определяется тем, какой блок сейчас реально виден
// (тот же приём, что и для активной категории в сайдбаре).
function CategorySection({ category }) {
  const [filter, setFilter] = useState('all')
  const visibleSubs = (category.subcategories || []).filter(s => s.id !== 'all')
  const [activeSubTab, setActiveSubTab] = useState(visibleSubs[0]?.id ?? null)
  const [stuck, setStuck] = useState(false)
  const sectionRef = useRef(null)
  const miniHeaderRef = useRef(null)

  useReveal(sectionRef, [filter])

  const handleSubcategoryClick = useCallback((subId) => {
    setActiveSubTab(subId)
    document.getElementById(`subcat-${category.id}-${subId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [category.id])

  useEffect(() => {
    function onScroll() {
      const headerOffset = getHeaderOffset()

      // Мини-шапка «прилипла», когда её верх дошёл до линии шапки.
      // Отдельного сентинела не нужно — сам элемент и есть индикатор.
      const miniRect = miniHeaderRef.current?.getBoundingClientRect()
      if (miniRect) {
        const sectionRect = sectionRef.current?.getBoundingClientRect()
        const isStuck = miniRect.top <= headerOffset + 1 && (sectionRect?.bottom ?? 0) > headerOffset + miniRect.height
        setStuck(prev => (prev === isStuck ? prev : isStuck))
      }

      if (visibleSubs.length === 0) return

      const line = headerOffset + (miniRect?.height || 0) + 1
      let current = null
      for (const sub of visibleSubs) {
        const el = document.getElementById(`subcat-${category.id}-${sub.id}`)
        if (!el) continue
        if (el.getBoundingClientRect().top <= line) current = sub.id
      }
      if (current) {
        setActiveSubTab(prev => (prev === current ? prev : current))
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category.id])

  const total = getFilteredItems(category.id, filter, null).length

  return (
    <section
      id={`section-${category.id}`}
      ref={sectionRef}
      style={{ marginBottom: 'var(--spacing-3xl)', scrollMarginTop: 'var(--header-height)' }}
    >
      <div ref={miniHeaderRef} className={`cat-sticky${stuck ? ' cat-sticky--stuck' : ''}`}>
        <CategoryMiniHeader
          category={category}
          activeFilter={filter}
          onFilterChange={setFilter}
          activeSubcategory={activeSubTab}
          onSubcategoryClick={handleSubcategoryClick}
          count={total}
        />
      </div>
      <CategoryBody category={category} filter={filter} />
    </section>
  )
}

export default function HomePage({ mobileSidebarOpen, onMobileSidebarClose }) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || null)

  const scrollToCategory = useCallback((categoryId) => {
    setActiveCategory(categoryId)
    document.getElementById(`section-${categoryId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const scrollToMenu = useCallback(() => {
    document.getElementById('menu-start')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // Подсветка активной категории в сайдбаре: считаем "текущей" последнюю по
  // порядку секцию, чей верх уже пересёк линию прилипания шапки — это та же
  // самая линия (top: var(--header-height)), на которой держатся мини-шапки,
  // поэтому подсветка сайдбара всегда совпадает с тем, что реально прилипло.
  useEffect(() => {
    // Без ручного rAF-тротлинга: секций мало (десяток), getBoundingClientRect
    // на каждой — копейки. Так подсветка не может "залипнуть", если браузер
    // пропустит один requestAnimationFrame (например, вкладка на миг скрылась
    // посреди скролла) — раньше именно это иногда сбивало активную категорию.
    function computeActive() {
      const line = getHeaderOffset() + 1
      let current = null
      for (const cat of categories) {
        const el = document.getElementById(`section-${cat.id}`)
        if (!el) continue
        if (el.getBoundingClientRect().top <= line) current = cat.id
      }
      if (current) {
        setActiveCategory(prev => (prev === current ? prev : current))
      }
    }

    computeActive()
    window.addEventListener('scroll', computeActive, { passive: true })
    window.addEventListener('resize', computeActive)
    return () => {
      window.removeEventListener('scroll', computeActive)
      window.removeEventListener('resize', computeActive)
    }
  }, [])

  return (
    <div className="app-layout">
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={scrollToCategory}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={onMobileSidebarClose}
      />

      <main className="main-content">
        <Hero onExplore={scrollToMenu} />

        <div className="page-container" id="menu-start" style={{ scrollMarginTop: 'var(--header-height)' }}>
          <BannerCarousel />

          {/* Сэйгайха — «морская волна»: единственный орнамент на странице,
              отделяет промо от меню */}
          <div className="wave-rule" aria-hidden="true" />

          {categories.map(category => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </main>
    </div>
  )
}
