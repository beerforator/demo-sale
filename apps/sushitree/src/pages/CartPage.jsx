import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { Plus, Minus, Trash2, Package, CheckCircle } from '../components/Icons'
import products from '../data/products.json'

const DELIVERY_FEE = 199
const FREE_DELIVERY_THRESHOLD = 900

const productById = {}
products.forEach(p => { productById[p.id] = p })

function formatPrice(price) {
  return price + ' ₽'
}

export default function CartPage() {
  const {
    items,
    promoCode,
    addItem,
    deleteItem,
    setQuantity,
    clearCart,
    applyPromo,
    removePromo,
  } = useCart()

  const [promoInput, setPromoInput] = useState('')
  const [imageErrors, setImageErrors] = useState({})

  const cartProductIds = new Set(items.map(i => i.productId))

  const subtotal = items.reduce((sum, item) => {
    const product = productById[item.productId]
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  const recommended = products
    .filter(p => !cartProductIds.has(p.id) && !p.stopList)
    .slice(0, 6)

  const handleApplyPromo = () => {
    const code = promoInput.trim()
    if (code) {
      applyPromo(code)
      setPromoInput('')
    }
  }

  const handlePromoKeyDown = (e) => {
    if (e.key === 'Enter') handleApplyPromo()
  }

  const handleImageError = (productId) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }))
  }

  return (
    <main className="main-content main-content--full">
      <div className="page-container" style={{ maxWidth: '860px' }}>
        <h1 style={{
          fontSize: 'var(--font-size-3xl)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: 'var(--spacing-xl)',
          color: 'var(--color-text)',
        }}>
          Корзина
        </h1>

        {items.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--spacing-3xl) var(--spacing-3xl)',
            textAlign: 'center',
            minHeight: '53vh',
          }}>
            <div style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              background: 'var(--color-border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--spacing-lg)',
            }}>
              <Package size={48} />
            </div>
            <h2 style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 700,
              color: 'var(--color-text)',
              marginBottom: 'var(--spacing-sm)',
            }}>
              В корзине пока пусто
            </h2>
            <p style={{
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-xl)',
            }}>
              Добавьте что-нибудь из меню
            </p>
            <Link
              to="/"
              style={{
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
              }}
            >
              Перейти в меню
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--spacing-md) var(--spacing-lg)',
                borderBottom: '1px solid var(--color-border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <span style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                  }}>
                    Товары
                  </span>
                  <span style={{
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
                  }}>
                    {itemCount}
                  </span>
                </div>
                <button
                  onClick={clearCart}
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-danger)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 500,
                    transition: 'background var(--transition-fast)',
                  }}
                >
                  Очистить
                </button>
              </div>

              {items.map(item => {
                const product = productById[item.productId]
                if (!product) return null
                const hasImageError = imageErrors[item.productId]
                const lineTotal = product.price * item.quantity

                return (
                  <div
                    key={item.productId}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-md)',
                      padding: 'var(--spacing-md) var(--spacing-lg)',
                      borderBottom: '1px solid var(--color-border-light)',
                    }}
                  >
                    {!hasImageError ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: '8px',
                          objectFit: 'cover',
                          flexShrink: 0,
                          background: 'var(--color-border)',
                        }}
                        onError={() => handleImageError(item.productId)}
                      />
                    ) : (
                      <div style={{
                        width: 80,
                        height: 80,
                        borderRadius: '8px',
                        flexShrink: 0,
                        background: 'var(--color-border)',
                      }} />
                    )}

                    <div style={{
                      flex: 1,
                      minWidth: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}>
                      <div style={{
                        fontSize: 'var(--font-size-base)',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                      }}>
                        {product.name}
                      </div>
                      <div style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-muted)',
                      }}>
                        {product.pieces} шт. · {product.weight}
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-sm)',
                      flexShrink: 0,
                    }}>
                      <span style={{
                        fontSize: 'var(--font-size-base)',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        whiteSpace: 'nowrap',
                        minWidth: 60,
                        textAlign: 'right',
                      }}>
                        {formatPrice(lineTotal)}
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <button
                          onClick={() => {
                            if (item.quantity === 1) {
                              deleteItem(item.productId)
                            } else {
                              setQuantity(item.productId, item.quantity - 1)
                            }
                          }}
                          aria-label="Уменьшить"
                          style={{
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
                            padding: 0,
                            transition: 'all var(--transition-fast)',
                          }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{
                          width: 28,
                          textAlign: 'center',
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 600,
                          color: 'var(--color-text)',
                          lineHeight: '28px',
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(item.productId, item.quantity + 1)}
                          aria-label="Увеличить"
                          style={{
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
                            padding: 0,
                            transition: 'all var(--transition-fast)',
                          }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => deleteItem(item.productId)}
                        aria-label="Удалить"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 32,
                          height: 32,
                          borderRadius: 'var(--radius-sm)',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--color-text-muted)',
                          padding: 0,
                          transition: 'color var(--transition-fast)',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: 'var(--spacing-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-md)',
            }}>
              {promoCode ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--color-green-light)',
                  border: '1px solid var(--color-green)',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                  }}>
                    <CheckCircle size={18} color="var(--color-green)" />
                    <span style={{
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 600,
                      color: 'var(--color-green)',
                    }}>
                      Промокод применён: {promoCode}
                    </span>
                  </div>
                  <button
                    onClick={removePromo}
                    aria-label="Удалить промокод"
                    style={{
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
                    }}
                  >
                    <span style={{ fontSize: '16px', lineHeight: 1 }}>×</span>
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                  <input
                    type="text"
                    placeholder="Промокод"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    onKeyDown={handlePromoKeyDown}
                    style={{
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
                    }}
                  />
                  <button
                    onClick={handleApplyPromo}
                    style={{
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
                    }}
                  >
                    Применить
                  </button>
                </div>
              )}

              {recommended.length > 0 && (
                <div>
                  <h3 style={{
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    marginBottom: 'var(--spacing-md)',
                  }}>
                    Добавить к заказу?
                  </h3>
                  <div style={{
                    display: 'flex',
                    gap: 'var(--spacing-md)',
                    overflowX: 'auto',
                    paddingBottom: 'var(--spacing-xs)',
                    scrollSnapType: 'x mandatory',
                  }}>
                    {recommended.map(product => {

                      return (
                        <div
                          key={product.id}
                          style={{
                            flexShrink: 0,
                            width: 160,
                            background: 'var(--color-surface)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)',
                            overflow: 'hidden',
                            scrollSnapAlign: 'start',
                            transition: 'box-shadow var(--transition-fast), border-color var(--transition-fast)',
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{
                              width: '100%',
                              height: 100,
                              objectFit: 'cover',
                              background: 'var(--color-border)',
                            }}
                            onError={(e) => { e.target.style.display = 'none' }}
                          />
                          <div style={{ padding: 'var(--spacing-sm)' }}>
                            <div style={{
                              fontSize: 'var(--font-size-sm)',
                              fontWeight: 600,
                              color: 'var(--color-text)',
                              marginBottom: '4px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                              {product.name}
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                              <span style={{
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: 600,
                                color: 'var(--color-accent)',
                              }}>
                                {formatPrice(product.price)}
                              </span>
                              <button
                                onClick={() => addItem(product)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 28,
                                  height: 28,
                                  borderRadius: 'var(--radius-sm)',
                                  background: 'var(--color-accent)',
                                  color: '#fff',
                                  border: 'none',
                                  cursor: 'pointer',
                                  padding: 0,
                                  transition: 'background var(--transition-fast)',
                                }}
                                aria-label="Добавить"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-md)',
                background: 'var(--color-border-light)',
                borderRadius: 'var(--radius-md)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                }}>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--color-green)',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                  }}>
                    Бесплатная доставка от 900 ₽
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                }}>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--color-green)',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                  }}>
                    Доставка 45–60 мин
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                }}>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--color-green)',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                  }}>
                    Зона доставки: Новороссийск
                  </span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-sm)',
                paddingTop: 'var(--spacing-sm)',
                borderTop: '1px solid var(--color-border)',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                  }}>
                    Сумма заказа
                  </span>
                  <span style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                  }}>
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                  }}>
                    Доставка
                  </span>
                  {deliveryFee === 0 ? (
                    <span style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-green)',
                      fontWeight: 600,
                    }}>
                      бесплатно
                    </span>
                  ) : (
                    <span style={{
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 500,
                      color: 'var(--color-text)',
                    }}>
                      {formatPrice(deliveryFee)}
                    </span>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 'var(--spacing-sm)',
                  borderTop: '1px solid var(--color-border)',
                }}>
                  <span style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                  }}>
                    Итого
                  </span>
                  <span style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                  }}>
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                style={{
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
                  letterSpacing: '0.01em',
                }}
              >
                Оформить заказ
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}