import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { ShoppingCart, User, Search, MapPin, ChevronDown, Menu } from './Icons'
import AuthModal from './AuthModal.jsx'
import store from '../data/store.json'

const NAV = [
  { to: '/', label: 'Меню' },
  { to: '/about', label: 'О нас' },
]

export default function Header({ onMenuToggle }) {
  const { itemCount, openPanel } = useCart()
  const [authOpen, setAuthOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  // Над геро-баннером шапка прозрачная и без линии; как только страница
  // сдвинулась — подкладывается матовое стекло, чтобы текст не сливался
  // с уезжающими под неё карточками.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`lux-header${scrolled ? ' lux-header--scrolled' : ''}`}>
        <div className="lux-header__side">
          <button className="lux-burger" onClick={onMenuToggle} aria-label="Меню">
            <Menu size={20} />
          </button>

          <Link to="/" className="lux-logo" aria-label="На главную">
            СушиСтоРолл
            <span className="lux-logo__dot" />
          </Link>

          <nav className="lux-nav">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`lux-nav__link${pathname === item.to ? ' lux-nav__link--active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="lux-header__side">
          <button className="lux-city" aria-label="Выбрать город">
            <MapPin size={12} />
            {store.city}
            <ChevronDown size={11} />
          </button>

          <button className="lux-icon-btn" aria-label="Поиск">
            <Search size={18} />
          </button>

          <button className="lux-icon-btn" onClick={openPanel} aria-label="Корзина">
            <ShoppingCart size={18} />
            {itemCount > 0 && <span className="lux-cart-badge">{itemCount}</span>}
          </button>

          <button className="lux-icon-btn lux-icon-btn--user" aria-label="Профиль">
            <User size={18} />
          </button>

          <button className="lux-signin" onClick={() => setAuthOpen(true)}>
            Войти
          </button>
        </div>
      </header>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
