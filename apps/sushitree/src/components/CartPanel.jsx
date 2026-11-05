import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { X, Plus, Minus, Trash2, Package, CheckCircle } from './Icons'
import products from '../data/products.json'

const DELIVERY_FEE = 200
const FREE_DELIVERY_THRESHOLD = 900

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'var(--color-overlay)',
    zIndex: 200,
  },
  panel: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: 'var(--cart-panel-width)',
    height: '100vh',
    background: 'var(--color-surface)',
    zIndex: 210,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--shadow-xl)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--spacing-lg)',
    paddingBottom: 'var(--spacing-md)',
    borderBottom: '1px solid var(--color-border)',
    flexShrink: 0,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
  },
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  badgeBase: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 22,
    height: 22,
    padding: '0 6px',
    borderRadius: 'var(--radius-full)',
    background: 'var(--color-accent)',
    color: '#fff',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 700,
    lineHeight: 1,
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
  },
  iconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 'var(--radius-sm)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--color-text-secondary)',
    transition: 'color var(--transition-fast), background var(--transition-fast)',
  },
  clearBtn: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-danger)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: 'var(--radius-sm)',
    transition: 'background var(--transition-fast)',
    fontWeight: 500,
  },
  items: {
    flex: 1,
    overflowY: 'auto',
    padding: 'var(--spacing-md) var(--spacing-lg)',
  },
  item: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    padding: 'var(--spacing-md) 0',
    borderBottom: '1px solid var(--color-border-light)',
    position: 'relative',
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 'var(--radius-sm)',
    objectFit: 'cover',
    flexShrink: 0,
    background: 'var(--color-border)',
  },
  itemDetails: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '4px',
  },
  itemName: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    color: 'var(--color-text)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  itemMeta: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
  },
  itemRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  itemPrice: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    color: 'var(--color-text)',
    whiteSpace: 'nowrap',
  },
  quantityRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
  },
  qtyBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-border)',
    background: 'var(--color-surface)',
    cursor: 'pointer',
    color: 'var(--color-text-secondary)',
    transition: 'all var(--transition-fast)',
    padding: 0,
  },
  qtyValue: {
    width: 28,
    textAlign: 'center',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-text)',
    lineHeight: '28px',
  },
  itemDeleteBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 'var(--radius-sm)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--color-text-muted)',
    padding: 0,
    transition: 'color var(--transition-fast)',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 'var(--spacing-2xl)',
    textAlign: 'center',
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: '50%',
    background: 'var(--color-border-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)',
    marginBottom: 'var(--spacing-lg)',
  },
  emptyText: {
    fontSize: 'var(--font-size-lg)',
    color: 'var(--color-text-secondary)',
    marginBottom: 'var(--spacing-lg)',
  },
  emptyBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 28px',
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-accent)',
    color: '#fff',
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'background var(--transition-fast), transform var(--transition-fast)',
  },
  footer: {
    padding: 'var(--spacing-lg)',
    borderTop: '1px solid var(--color-border)',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
  },
  promoRow: {
    display: 'flex',
    gap: 'var(--spacing-sm)',
  },
  promoInput: {
    flex: 1,
    height: 40,
    padding: '0 12px',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--color-surface)',
    color: 'var(--color-text)',
    fontSize: 'var(--font-size-sm)',
    outline: 'none',
    transition: 'border-color var(--transition-fast)',
  },
  promoApplyBtn: {
    height: 40,
    padding: '0 16px',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--color-accent)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    transition: 'background var(--transition-fast)',
  },
  promoApplied: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--color-green-light)',
    border: '1px solid var(--color-green)',
  },
  promoAppliedLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
  },
  promoCodeText: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-green)',
  },
  promoRemoveBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 'var(--radius-sm)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--color-green)',
    padding: 0,
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  summaryValue: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 500,
    color: 'var(--color-text)',
  },
  freeDelivery: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-green)',
    fontWeight: 600,
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  totalValue: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  checkoutBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 52,
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-accent)',
    color: '#fff',
    fontSize: 'var(--font-size-base)',
    fontWeight: 700,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'background var(--transition-fast), transform var(--transition-fast)',
    marginTop: 'var(--spacing-sm)',
    letterSpacing: '0.01em',
  },
  productMap: {},
}

const keyframeStyles = `
@keyframes cartSlideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
@keyframes cartSlideOut {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}
@keyframes cartFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes cartFadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
@media (max-width: 640px) {
  .cart-panel { width: 100% !important; }
  .cart-overlay { display: none !important; }
}
`

const productById = {}
products.forEach(p => { productById[p.id] = p })

function formatPrice(price) {
  return price + ' ₽'
}

export default function CartPanel() {
  const {
    items,
    promoCode,
    panelOpen,
    closePanel,
    removeItem,
    deleteItem,
    setQuantity,
    clearCart,
    applyPromo,
    removePromo,
  } = useCart()

  const [closing, setClosing] = useState(false)
  const [promoInput, setPromoInput] = useState('')
  const [imageErrors, setImageErrors] = useState({})

  const subtotal = items.reduce((sum, item) => {
    const product = productById[item.productId]
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      closePanel()
      setClosing(false)
    }, 250)
  }, [closePanel])

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) handleClose()
  }, [handleClose])

  const handleApplyPromo = useCallback(() => {
    const code = promoInput.trim()
    if (code) {
      applyPromo(code)
      setPromoInput('')
    }
  }, [promoInput, applyPromo])

  const handlePromoKeyDown = useCallback((e) => {
    if (e.key === 'Enter') handleApplyPromo()
  }, [handleApplyPromo])

  const handleImageError = useCallback((productId) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }))
  }, [])

  if (!panelOpen && !closing) return null

  const animationStyle = closing
    ? { animation: 'cartSlideOut 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards' }
    : { animation: 'cartSlideIn 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards' }

  const overlayAnimation = closing
    ? { animation: 'cartFadeOut 0.2s ease forwards' }
    : { animation: 'cartFadeIn 0.2s ease forwards' }

  return (
    <>
      <style>{keyframeStyles}</style>
      <div
        className="cart-overlay"
        style={{ ...styles.overlay, ...overlayAnimation }}
        onClick={handleOverlayClick}
      />
      <div
        className="cart-panel"
        style={{ ...styles.panel, ...animationStyle }}
      >
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <span style={styles.title}>Корзина</span>
            {itemCount > 0 && (
              <span style={styles.badgeBase}>{itemCount}</span>
            )}
          </div>
          <div style={styles.headerActions}>
            {items.length > 0 && (
              <button style={styles.clearBtn} onClick={clearCart}>
                Очистить
              </button>
            )}
            <button
              style={styles.iconBtn}
              onClick={handleClose}
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>
              <Package size={36} />
            </div>
            <p style={styles.emptyText}>В корзине пока пусто</p>
            <Link to="/" style={styles.emptyBtn} onClick={handleClose}>
              В меню
            </Link>
          </div>
        ) : (
          <>
            <div style={styles.items}>
              {items.map(item => {
                const product = productById[item.productId]
                if (!product) return null
                const hasImageError = imageErrors[item.productId]
                const lineTotal = product.price * item.quantity

                const handleQuantityDecrement = () => {
                  if (item.quantity === 1) {
                    deleteItem(item.productId)
                  } else {
                    setQuantity(item.productId, item.quantity - 1)
                  }
                }

                const handleQuantityIncrement = () => {
                  setQuantity(item.productId, item.quantity + 1)
                }

                return (
                  <div key={item.productId} style={styles.item}>
                    {!hasImageError ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={styles.itemImage}
                        onError={() => handleImageError(item.productId)}
                      />
                    ) : (
                      <div style={styles.itemImage} />
                    )}
                    <div style={styles.itemDetails}>
                      <div style={styles.itemName}>{product.name}</div>
                      <div style={styles.itemMeta}>{product.pieces} шт. · {product.weight}</div>
                    </div>
                    <div style={styles.itemRight}>
                      <span style={styles.itemPrice}>{formatPrice(lineTotal)}</span>
                      <div style={styles.quantityRow}>
                        <button
                          style={styles.qtyBtn}
                          onClick={handleQuantityDecrement}
                          aria-label="Уменьшить"
                        >
                          <Minus size={14} />
                        </button>
                        <span style={styles.qtyValue}>{item.quantity}</span>
                        <button
                          style={styles.qtyBtn}
                          onClick={handleQuantityIncrement}
                          aria-label="Увеличить"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          style={styles.itemDeleteBtn}
                          onClick={() => deleteItem(item.productId)}
                          aria-label="Удалить"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={styles.footer}>
              {promoCode ? (
                <div style={styles.promoApplied}>
                  <div style={styles.promoAppliedLeft}>
                    <CheckCircle size={18} color="var(--color-green)" />
                    <span style={styles.promoCodeText}>{promoCode}</span>
                  </div>
                  <button
                    style={styles.promoRemoveBtn}
                    onClick={removePromo}
                    aria-label="Удалить промокод"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div style={styles.promoRow}>
                  <input
                    style={styles.promoInput}
                    type="text"
                    placeholder="Промокод"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    onKeyDown={handlePromoKeyDown}
                  />
                  <button style={styles.promoApplyBtn} onClick={handleApplyPromo}>
                    Применить
                  </button>
                </div>
              )}

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Сумма заказа</span>
                <span style={styles.summaryValue}>{formatPrice(subtotal)}</span>
              </div>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Доставка</span>
                {deliveryFee === 0 ? (
                  <span style={styles.freeDelivery}>бесплатно</span>
                ) : (
                  <span style={styles.summaryValue}>{formatPrice(deliveryFee)}</span>
                )}
              </div>

              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Итого</span>
                <span style={styles.totalValue}>{formatPrice(total)}</span>
              </div>

              <Link
                to="/checkout"
                style={styles.checkoutBtn}
                onClick={handleClose}
              >
                Оформить заказ
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}