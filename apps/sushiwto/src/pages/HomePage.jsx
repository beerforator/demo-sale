import { useState, useEffect, useRef, useCallback } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import BannerCarousel from '../components/BannerCarousel.jsx'
import CategoryMiniHeader from '../components/CategoryMiniHeader.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useReveal } from '../hooks/useReveal.js'
import categories from '../data/categories.json'
import products from '../data/products.json'

function getHeaderOffset() {
  const styles = getComputedStyle(document.documentElement)
  const header = parseFloat(styles.getPropertyValue('--header-height')) || 64
  const mobileCategories = parseFloat(styles.getPropertyValue('--mobile-category-height')) || 0
  return header + mobileCategories
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
  return (
    <p style={{
      padding: 'var(--spacing-xl) 0',
      color: 'var(--color-text-muted)',
      fontSize: 'var(--font-size-base)',
    }}>
      Ничего не найдено по этому фильтру.
    </p>
  )
}

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
        id={`subcat-${category.id}-${sub.id}`}
        style={{
          marginBottom: 'var(--spacing-xl)',
          scrollMarginTop: 'calc(var(--category-offset) + 120px)',
        }}
      >
        <h3 style={{
          fontSize: 'var(--font-size-lg)',
          fontWeight: 700,
          marginBottom: 'var(--spacing-md)',
          paddingBottom: 'var(--spacing-sm)',
          color: 'var(--color-text)',
        }}>
          {sub.name}
        </h3>
        <ProductGrid items={items} />
      </div>
    ))
  }

  const items = getFilteredItems(category.id, filter, null)
  if (items.length === 0) return <EmptyState />
  return <ProductGrid items={items} />
}

function CategorySection({ category }) {
  const [filter, setFilter] = useState('all')
  const visibleSubs = (category.subcategories || []).filter(s => s.id !== 'all')
  const [activeSubTab, setActiveSubTab] = useState(visibleSubs[0]?.id ?? null)
  const sectionRef = useRef(null)
  const miniHeaderRef = useRef(null)

  useReveal(sectionRef, [filter])

  const handleSubcategoryClick = useCallback((subId) => {
    setActiveSubTab(subId)
    document.getElementById(`subcat-${category.id}-${subId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [category.id])

  useEffect(() => {
    if (visibleSubs.length === 0) return

    function computeActiveSub() {
      const miniHeaderHeight = miniHeaderRef.current?.getBoundingClientRect().height || 0
      const line = getHeaderOffset() + miniHeaderHeight + 1
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

    computeActiveSub()
    window.addEventListener('scroll', computeActiveSub, { passive: true })
    window.addEventListener('resize', computeActiveSub)
    return () => {
      window.removeEventListener('scroll', computeActiveSub)
      window.removeEventListener('resize', computeActiveSub)
    }
  }, [category.id])

  return (
    <section
      id={`section-${category.id}`}
      ref={sectionRef}
      style={{
        marginBottom: 'var(--spacing-2xl)',
        scrollMarginTop: 'var(--category-offset)',
      }}
    >
      <div ref={miniHeaderRef} className="category-sticky">
        <CategoryMiniHeader
          category={category}
          activeFilter={filter}
          onFilterChange={setFilter}
          activeSubcategory={activeSubTab}
          onSubcategoryClick={handleSubcategoryClick}
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

  useEffect(() => {
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

      <main className="main-content" style={{ paddingTop: 0 }}>
        <BannerCarousel />

        <div className="page-container">
          {categories.map(category => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </main>
    </div>
  )
}