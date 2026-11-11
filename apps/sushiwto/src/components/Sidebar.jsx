import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Icon } from './Icons'
import store from '../data/store.json'

const ACCENT = 'var(--color-accent)'
const ACCENT_LIGHT = 'var(--color-accent-light)'

const css = `
.sidebar-trigger {
  position: fixed;
  top: var(--header-height);
  left: 0;
  width: 80px;
  height: calc(100vh - var(--header-height));
  z-index: 95;
  cursor: pointer;
}

.sidebar-trigger-line {
  position: absolute;
  left: 10px;
  top: 50%;
//   transform: translateY(-50%);
  width: 3px;
  height: 60px;
  border-radius: 1px;
  background: var(--color-blue-soft);
  opacity: 0.15;
  transition: all 0.4s ease;
}

.sidebar-trigger:hover .sidebar-trigger-line {
  opacity: 0;
//   height: 80px;
}

.sidebar-overlay-panel {
  position: fixed;
  top: var(--header-height);
  left: 0;
  width: var(--sidebar-width);
  height: calc(100vh - var(--header-height));
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  z-index: 94;
  display: flex;
  flex-direction: column;
  transform: translateX(calc(-1 * var(--sidebar-width)));
  transition: transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.04);
}

.sidebar-overlay-panel.open {
  transform: translateX(0);
  box-shadow: 4px 0 32px rgba(0, 0, 0, 0.08);
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
  opacity: 0;
  transform: translateX(-12px);
  transition: opacity 0.3s ease 0.15s, transform 0.3s ease 0.15s;
}

.sidebar-overlay-panel.open .sidebar-nav {
  opacity: 1;
  transform: translateX(0);
}

.sidebar-delivery {
  padding: 16px 20px;
  border-top: 1px solid var(--color-border-light);
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transform: translateX(-12px);
  transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s;
}

.sidebar-overlay-panel.open .sidebar-delivery {
  opacity: 1;
  transform: translateX(0);
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  margin: 2px 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text-secondary);
  position: relative;
  transition: all 0.25s;
  user-select: none;
}

.sidebar-item:hover {
  background: var(--color-surface-hover);
  color: var(--color-text);
}

.sidebar-item.active {
  background: var(--color-accent-light);
  color: var(--color-accent);
  font-weight: 700;
}

.sidebar-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-active-bar {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 24px;
  border-radius: 0 2px 2px 0;
  background: var(--color-accent);
}

.sidebar-delivery-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.sidebar-delivery-highlight {
  color: var(--color-text);
  font-weight: 600;
}

.sidebar-mobile {
  display: none;
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  z-index: 89;
  height: var(--mobile-category-height);
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-bottom: 1px solid transparent;
  transition: background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease;
}

.sidebar-mobile.scrolled {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.sidebar-mobile-nav {
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: row;
  overflow-x: auto;
  padding: 12px;
  gap: 8px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.sidebar-mobile-nav::-webkit-scrollbar {
  display: none;
}

.sidebar-mobile-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius-full);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: rgba(255,255,255,0.85);
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.25s, color 0.4s ease, border-color 0.4s ease, background 0.4s ease;
  user-select: none;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(4px);
}

.sidebar-mobile-item.active {
  background: #fff;
  color: var(--color-accent);
  border-color: rgba(255,255,255,0.5);
}

.sidebar-mobile.scrolled .sidebar-mobile-item {
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  background: transparent;
  backdrop-filter: none;
}

.sidebar-mobile.scrolled .sidebar-mobile-item.active {
  background: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
}

@media (max-width: 1024px) {
  .sidebar-trigger,
  .sidebar-overlay-panel {
    display: none !important;
  }
  .sidebar-mobile {
    display: block;
  }
}
`

export default function Sidebar({
  categories,
  activeCategory,
  onCategoryClick,
  isMobileOpen = false,
  onMobileClose = () => {},
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    function onScroll() {
      setScrolled(window.scrollY > 80)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  if (!categories || categories.length === 0) {
    return null
  }

  const handleClick = (id) => {
    onCategoryClick(id)
    setOpen(false)
    onMobileClose()
  }

  return (
    <>
      <style>{css}</style>

      <div
        className="sidebar-trigger"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="sidebar-trigger-line" />
      </div>

      <aside
        className={`sidebar-overlay-panel${open ? ' open' : ''}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <nav className="sidebar-nav">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <div
                key={cat.id}
                className={`sidebar-item${isActive ? ' active' : ''}`}
                onClick={() => handleClick(cat.id)}
              >
                <span className="sidebar-icon">
                  <Icon name={cat.icon} size={20} />
                </span>
                <span>{cat.name}</span>
                {isActive && <span className="sidebar-active-bar" />}
              </div>
            )
          })}
        </nav>

        <div className="sidebar-delivery">
          <div className="sidebar-delivery-row">
            <Icon name="truck" size={14} />
            <span>
              Бесплатная доставка от{' '}
              <span className="sidebar-delivery-highlight">
                {store.freeDeliveryFrom} ₽
              </span>
            </span>
          </div>
          <div className="sidebar-delivery-row">
            <Icon name="clock" size={14} />
            <span>{store.deliveryTime}</span>
          </div>
          <div className="sidebar-delivery-row">
            <Icon name="phone" size={14} />
            <span>{store.phone}</span>
          </div>
        </div>
      </aside>

      <div
        className={`sidebar-mobile${scrolled ? ' scrolled' : ''}`}
        style={isMobileOpen ? { display: 'block' } : {}}
      >
        <nav className="sidebar-mobile-nav">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <div
                key={cat.id}
                className={`sidebar-mobile-item${isActive ? ' active' : ''}`}
                onClick={() => handleClick(cat.id)}
              >
                <Icon name={cat.icon} size={16} />
                <span>{cat.name}</span>
              </div>
            )
          })}
        </nav>
      </div>
    </>
  )
}