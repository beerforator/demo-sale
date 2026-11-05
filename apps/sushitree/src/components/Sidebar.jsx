import { Icon } from './Icons'
import store from '../data/store.json'

const ACCENT = 'var(--color-accent)'
const ACCENT_LIGHT = 'var(--color-accent-light)'

const styles = {
  sidebar: {
    position: 'fixed',
    top: 'var(--header-height)',
    left: 0,
    width: 'var(--sidebar-width)',
    height: 'calc(100vh - var(--header-height))',
    background: 'var(--color-surface)',
    borderRight: '1px solid var(--color-border)',
    zIndex: 90,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  nav: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px 0',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 20px',
    margin: '2px 8px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: 'var(--font-size-base)',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    position: 'relative',
    transition: 'all 0.25s',
    userSelect: 'none',
  },
  itemIcon: {
    width: 20,
    height: 20,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBar: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '3px',
    height: '24px',
    borderRadius: '0 2px 2px 0',
    background: ACCENT,
  },
  delivery: {
    padding: '16px 20px',
    borderTop: '1px solid var(--color-border-light)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  deliveryRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-text-secondary)',
  },
  deliveryHighlight: {
    color: 'var(--color-text)',
    fontWeight: 600,
  },
  mobileSidebar: {
    display: 'none',
    position: 'fixed',
    top: 'var(--header-height)',
    left: 0,
    right: 0,
    zIndex: 89,
    background: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)',
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    padding: '12px',
    gap: '8px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  mobileItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: 'var(--radius-full)',
    cursor: 'pointer',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    transition: 'all 0.25s',
    userSelect: 'none',
    border: '1px solid var(--color-border)',
  },
  mobileItemActive: {
    background: 'var(--color-accent)',
    color: '#fff',
    borderColor: 'var(--color-accent)',
  },
}

export default function Sidebar({
  categories,
  activeCategory,
  onCategoryClick,
  isMobileOpen = false,
  onMobileClose = () => {},
}) {
  if (!categories || categories.length === 0) {
    return null
  }

  const handleClick = (id) => {
    onCategoryClick(id)
    onMobileClose()
  }

  return (
    <>
      <aside
        className="sidebar-desktop"
        style={styles.sidebar}
      >
        <nav style={styles.nav}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <div
                key={cat.id}
                style={{
                  ...styles.item,
                  ...(isActive && {
                    background: ACCENT_LIGHT,
                    color: ACCENT,
                    fontWeight: 700,
                  }),
                }}
                onClick={() => handleClick(cat.id)}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'var(--color-surface-hover)'
                    e.currentTarget.style.color = 'var(--color-text)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = ''
                    e.currentTarget.style.color = 'var(--color-text-secondary)'
                  }
                }}
              >
                <span style={styles.itemIcon}>
                  <Icon name={cat.icon} size={20} />
                </span>
                <span>{cat.name}</span>
                {isActive && <span style={styles.activeBar} />}
              </div>
            )
          })}
        </nav>

        <div style={styles.delivery}>
          <div style={styles.deliveryRow}>
            <Icon name="truck" size={14} />
            <span>
              Бесплатная доставка от{' '}
              <span style={styles.deliveryHighlight}>
                {store.freeDeliveryFrom} ₽
              </span>
            </span>
          </div>
          <div style={styles.deliveryRow}>
            <Icon name="clock" size={14} />
            <span>
              {store.deliveryTime}
            </span>
          </div>
          <div style={styles.deliveryRow}>
            <Icon name="phone" size={14} />
            <span>{store.phone}</span>
          </div>
        </div>
      </aside>

      <div
        className="sidebar-mobile"
        style={{
          ...styles.mobileSidebar,
          ...(isMobileOpen ? { display: 'block' } : {}),
        }}
      >
        <nav style={styles.mobileNav}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <div
                key={cat.id}
                style={{
                  ...styles.mobileItem,
                  ...(isActive ? styles.mobileItemActive : {}),
                }}
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