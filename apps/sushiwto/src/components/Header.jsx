import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { ShoppingCart, User, Search, MapPin, ChevronDown, Menu } from './Icons'
import AuthModal from './AuthModal.jsx'

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 'var(--header-height)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 'var(--spacing-xl)',
    paddingRight: 'var(--spacing-xl)',
    transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-lg)',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
  },
  logo: {
    fontFamily: 'Sangha',
    fontSize: 'var(--font-size-xl)',
    fontWeight: 400,
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    transition: 'color 0.4s ease, opacity var(--transition-fast)',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    letterSpacing: '0.02em',
  },
  logoDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#fff',
    display: 'inline-block',
    marginLeft: 2,
    transition: 'background 0.4s ease',
  },
  cityBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--font-size-sm)',
    color: 'rgba(255,255,255,0.8)',
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(8px)',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.4s ease, background 0.4s ease',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  iconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 'var(--radius-md)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.85)',
    transition: 'color 0.4s ease, background var(--transition-fast), transform var(--transition-fast)',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 18,
    height: 18,
    borderRadius: 'var(--radius-full)',
    background: 'var(--color-accent)',
    color: '#fff',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 4px',
    lineHeight: 1,
  },
  signIn: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: '#fff',
    padding: '8px 16px',
    borderRadius: 'var(--radius-full)',
    cursor: 'pointer',
    border: '1.5px solid rgba(255,255,255,0.5)',
    background: 'transparent',
    transition: 'all 0.4s ease',
    whiteSpace: 'nowrap',
    lineHeight: 1,
  },
  menuBtn: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 'var(--radius-md)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    transition: 'color 0.4s ease, background var(--transition-fast), transform var(--transition-fast)',
    marginRight: 'var(--spacing-sm)',
  },
  searchBtnDesktop: {
    display: 'flex',
  },
}

export default function Header({ onMenuToggle }) {
  const { itemCount, openPanel } = useCart()
  const [authOpen, setAuthOpen] = useState(false)
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

  const headerBg = isHome && !scrolled
    ? 'transparent'
    : 'rgba(255, 255, 255, 0.72)'

  const headerBorder = isHome && !scrolled
    ? '1px solid transparent'
    : '1px solid rgba(0,0,0,0.06)'

  const headerShadow = isHome && !scrolled
    ? 'none'
    : '0 1px 3px rgba(0,0,0,0.04)'

  const textColor = isHome && !scrolled ? '#fff' : 'var(--color-text)'
  const textSecondary = isHome && !scrolled ? 'rgba(255,255,255,0.75)' : 'var(--color-text-secondary)'
  const logoColor = isHome && !scrolled ? '#fff' : 'var(--color-accent)'
  const dotColor = isHome && !scrolled ? '#fff' : 'var(--color-blue-soft)'
  const cityBg = isHome && !scrolled ? 'rgba(255,255,255,0.1)' : 'var(--color-surface-hover)'
  const cityColor = isHome && !scrolled ? 'rgba(255,255,255,0.8)' : 'var(--color-text-secondary)'
  const iconColor = isHome && !scrolled ? 'rgba(255,255,255,0.85)' : 'var(--color-text-secondary)'
  const signInColor = isHome && !scrolled ? '#fff' : 'var(--color-blue-soft)'
  const signInBorder = isHome && !scrolled ? 'rgba(255,255,255,0.5)' : 'var(--color-blue-soft)'

  return (
    <>
      <style>{`
        .header-icon-btn:hover { color: var(--color-accent); background: var(--color-accent-light); transform: scale(1.05); }
        .header-icon-btn:active { transform: scale(0.97); }
        .header-city-btn:hover { background: rgba(255,255,255,0.2); }
        .header-logo:hover { opacity: 0.75; }
        .header-signin:hover { background: rgba(255,255,255,0.15); }
        .header-menu-btn:hover { background: rgba(255,255,255,0.1); }
        .header-menu-btn:active { transform: scale(0.97); }
        .header-scrolled .header-city-btn:hover { color: var(--color-text) !important; background: var(--color-border) !important; }
        .header-scrolled .header-signin:hover { background: var(--color-blue-soft) !important; color: #fff !important; transform: scale(1.02); }
        @media (max-width: 1024px) {
          .header-search-desktop { display: none !important; }
          .header-menu-btn { display: flex !important; display: none !important;}
        }
        @media (max-width: 640px) {
          .header-city-btn { display: none !important; }
        }
      `}</style>

      <header
        className={scrolled || !isHome ? 'header-scrolled' : ''}
        style={{
          ...styles.header,
          background: headerBg,
          backdropFilter: isHome && !scrolled ? 'none' : 'blur(20px)',
          WebkitBackdropFilter: isHome && !scrolled ? 'none' : 'blur(20px)',
          borderBottom: headerBorder,
          boxShadow: headerShadow,
        }}
      >
        <div style={styles.left}>
          <button
            className="header-menu-btn"
            style={{ ...styles.menuBtn, color: iconColor }}
            onClick={onMenuToggle}
            aria-label="Меню"
          >
            <Menu size={22} />
          </button>

          <a href={import.meta.env.BASE_URL} className="header-logo" style={{ ...styles.logo, color: logoColor }} aria-label="На главную">
            СушиСтоРолл<span style={{ ...styles.logoDot, background: dotColor }} />
          </a>

          <button className="header-city-btn" style={{ ...styles.cityBtn, background: cityBg, color: cityColor }} aria-label="Выбрать город">
            <MapPin size={14} />
            Новороссийск
            <ChevronDown size={12} />
          </button>
        </div>

        <div style={styles.right}>
          <button
            className="header-icon-btn header-search-desktop"
            style={{ ...styles.iconBtn, ...styles.searchBtnDesktop, color: iconColor }}
            aria-label="Поиск"
          >
            <Search size={20} />
          </button>

          <button
            className="header-icon-btn"
            style={{ ...styles.iconBtn, color: iconColor }}
            onClick={openPanel}
            aria-label="Корзина"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span style={styles.cartBadge}>{itemCount}</span>
            )}
          </button>

          <button
            className="header-icon-btn"
            style={{ ...styles.iconBtn, color: iconColor }}
            aria-label="Профиль"
          >
            <User size={20} />
          </button>

          <button
            className="header-signin"
            style={{ ...styles.signIn, color: signInColor, borderColor: signInBorder }}
            onClick={() => setAuthOpen(true)}
          >
            Войти
          </button>
        </div>
      </header>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}