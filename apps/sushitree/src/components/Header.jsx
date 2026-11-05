import { useState } from 'react'
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
    background: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 'var(--spacing-xl)',
    paddingRight: 'var(--spacing-xl)',
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
    fontWeight: 700,
    color: 'var(--color-accent)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    transition: 'opacity var(--transition-fast)',
    whiteSpace: 'nowrap',
    lineHeight: 1,
  },
  cityBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 10px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    background: 'var(--color-bg)',
    border: 'none',
    cursor: 'pointer',
    transition: 'color var(--transition-fast), background var(--transition-fast)',
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
    color: 'var(--color-text-secondary)',
    transition: 'color var(--transition-fast), background var(--transition-fast), transform var(--transition-fast)',
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
    color: 'var(--color-accent)',
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    transition: 'background var(--transition-fast), transform var(--transition-fast)',
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
    color: 'var(--color-text)',
    transition: 'background var(--transition-fast), transform var(--transition-fast)',
    marginRight: 'var(--spacing-sm)',
  },
  searchBtnDesktop: {
    display: 'flex',
  },
}

export default function Header({ onMenuToggle }) {
  const { itemCount, openPanel } = useCart()
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <>
      <style>{`
        .header-icon-btn:hover { color: var(--color-accent); background: var(--color-accent-light); transform: scale(1.05); }
        .header-icon-btn:active { transform: scale(0.97); }
        .header-city-btn:hover { color: var(--color-text); background: var(--color-border); }
        .header-logo:hover { opacity: 0.8; }
        .header-signin:hover { background: var(--color-accent-light); transform: scale(1.02); }
        .header-menu-btn:hover { background: var(--color-surface-hover); transform: scale(1.05); }
        .header-menu-btn:active { transform: scale(0.97); }
        @media (max-width: 1024px) {
          .header-search-desktop { display: none !important; }
          .header-menu-btn { display: flex !important; }
        }
        @media (max-width: 640px) {
          .header-city-btn { display: none !important; }
        }
      `}</style>

      <header style={styles.header}>
        <div style={styles.left}>
          <button
            className="header-menu-btn"
            style={styles.menuBtn}
            onClick={onMenuToggle}
            aria-label="Меню"
          >
            <Menu size={22} />
          </button>

          <a href={import.meta.env.BASE_URL} className="header-logo" style={styles.logo} aria-label="На главную">
            СушиСтоРолл
          </a>

          <button className="header-city-btn" style={styles.cityBtn} aria-label="Выбрать город">
            <MapPin size={14} />
            Новороссийск
            <ChevronDown size={12} />
          </button>
        </div>

        <div style={styles.right}>
          <button
            className="header-icon-btn header-search-desktop"
            style={{ ...styles.iconBtn, ...styles.searchBtnDesktop }}
            aria-label="Поиск"
          >
            <Search size={20} />
          </button>

          <button
            className="header-icon-btn"
            style={styles.iconBtn}
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
            style={styles.iconBtn}
            aria-label="Профиль"
          >
            <User size={20} />
          </button>

          <button
            className="header-signin"
            style={styles.signIn}
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