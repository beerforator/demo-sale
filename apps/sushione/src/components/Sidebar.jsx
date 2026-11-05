import { useState, useRef, useCallback, useEffect } from 'react'
import { Icon } from './Icons'
import store from '../data/store.json'

// ══════════════════════════════════════════════
// Сайдбар спрятан влево: постоянно виден только узкий корешок.
// Наведение мышью на корешок (или на саму панель) плавно выдвигает
// меню ПОВЕРХ контента — раскладка при этом не сдвигается.
//
// Закрытие с небольшой задержкой: иначе панель схлопывается на
// «перепрыгивании» курсора через зазор между корешком и панелью.
// Клик по корешку закрепляет панель — для тех, кому неудобно
// держать курсор.
// ══════════════════════════════════════════════

const CLOSE_DELAY = 220

export default function Sidebar({
  categories,
  activeCategory,
  onCategoryClick,
  isMobileOpen = false,
  onMobileClose = () => {},
}) {
  const [hovered, setHovered] = useState(false)
  const [pinned, setPinned] = useState(false)
  const closeTimer = useRef(null)

  const isOpen = hovered || pinned

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const open = useCallback(() => {
    cancelClose()
    setHovered(true)
  }, [cancelClose])

  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimer.current = setTimeout(() => setHovered(false), CLOSE_DELAY)
  }, [cancelClose])

  useEffect(() => cancelClose, [cancelClose])

  // Esc снимает закрепление — иначе панель нечем убрать с клавиатуры
  useEffect(() => {
    if (!pinned) return
    const onKey = (e) => {
      if (e.key === 'Escape') setPinned(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pinned])

  if (!categories || categories.length === 0) return null

  const activeName = categories.find((c) => c.id === activeCategory)?.name || ''

  const handleClick = (id) => {
    onCategoryClick(id)
    onMobileClose()
    setPinned(false)
    setHovered(false)
  }

  return (
    <>
      <div
        className={`rail${isOpen ? ' rail--open' : ''}`}
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
      >
        <button
          className="rail__burger"
          onClick={() => setPinned((p) => !p)}
          aria-label={pinned ? 'Открепить меню' : 'Закрепить меню'}
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <div className="rail__middle">
          <span className="rail__dot" />
          <span className="rail__active">{activeName}</span>
        </div>

        <span className="rail__label">Меню</span>
      </div>

      <aside
        className={`flyout${isOpen ? ' flyout--open' : ''}`}
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
        aria-hidden={!isOpen}
      >
        <div className="flyout__head">
          <span className="flyout__title">Меню</span>
          <span className="flyout__jp">お品書き</span>
        </div>

        <nav className="flyout__nav">
          {categories.map((cat, i) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                className={`flyout__item${isActive ? ' flyout__item--active' : ''}`}
                style={{ '--i': i }}
                onClick={() => handleClick(cat.id)}
                tabIndex={isOpen ? 0 : -1}
              >
                {isActive && <span className="flyout__bar" />}
                <span className="flyout__item-icon">
                  <Icon name={cat.icon} size={18} />
                </span>
                <span>{cat.name}</span>
                <span className="flyout__item-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="flyout__foot">
          <div className="flyout__foot-row">
            <Icon name="truck" size={13} />
            <span>
              Бесплатная доставка от <b>{store.freeDeliveryFrom} ₽</b>
            </span>
          </div>
          <div className="flyout__foot-row">
            <Icon name="clock" size={13} />
            <span>{store.deliveryTime}</span>
          </div>
          <div className="flyout__foot-row">
            <Icon name="phone" size={13} />
            <span>{store.phone}</span>
          </div>
        </div>
      </aside>

      <div className={`cat-drawer${isMobileOpen ? ' cat-drawer--open' : ''}`}>
        <nav className="cat-drawer__nav">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                className={`cat-drawer__item${isActive ? ' cat-drawer__item--active' : ''}`}
                onClick={() => handleClick(cat.id)}
              >
                <Icon name={cat.icon} size={15} />
                <span>{cat.name}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </>
  )
}
