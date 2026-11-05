import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { Clock, Phone, Star, CheckCircle, X } from '../components/Icons'
import products from '../data/products.json'

const DELIVERY_FEE = 200
const FREE_DELIVERY_THRESHOLD = 900

const productById = {}
products.forEach(p => { productById[p.id] = p })

function formatPrice(price) {
  return price + ' \u20BD'
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function formatTime(date) {
  return pad(date.getHours()) + ':' + pad(date.getMinutes())
}

function generateOrderNumber() {
  return '#' + (1000 + Math.floor(Math.random() * 9000))
}

export default function CheckoutPage() {
  const { items, promoCode, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [order, setOrder] = useState(null)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [deliveryType, setDeliveryType] = useState('delivery')
  const [street, setStreet] = useState('')
  const [house, setHouse] = useState('')
  const [apartment, setApartment] = useState('')
  const [floor, setFloor] = useState('')
  const [entrance, setEntrance] = useState('')
  const [comment, setComment] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('asap')
  const [exactTime, setExactTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card-online')

  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const subtotal = items.reduce((sum, item) => {
    const product = productById[item.productId]
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  const orderTime = useMemo(() => new Date(), [orderPlaced])
  const cookingTime = useMemo(() => new Date(orderTime.getTime() + 5 * 60000), [orderPlaced])
  const deliveryEstimate = useMemo(() => {
    const mins = 45 + Math.floor(Math.random() * 16)
    return new Date(orderTime.getTime() + mins * 60000)
  }, [orderPlaced, orderTime])

  const handleSubmit = (e) => {
    e.preventDefault()
    const orderNumber = generateOrderNumber()
    const now = new Date()
    const orderData = {
      number: orderNumber,
      status: 'accepted',
      time: now.toISOString(),
      items: [...items],
      subtotal,
      deliveryFee,
      total,
      promoCode,
      name,
      phone,
      email,
      deliveryType,
      street,
      house,
      apartment,
      floor,
      entrance,
      comment,
      deliveryTime: deliveryTime === 'asap' ? 'asap' : exactTime,
      paymentMethod,
    }
    setOrder(orderData)
    setOrderPlaced(true)
    clearCart()
  }

  const handleCancel = () => {
    setShowCancelConfirm(false)
    setOrderPlaced(false)
    setOrder(null)
  }

  const canCancel = order && (order.status === 'accepted' || order.status === 'cooking')

  const nowTime = new Date()

  const formInputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-surface)',
    color: 'var(--color-text)',
    fontSize: 'var(--font-size-base)',
    outline: 'none',
    transition: 'border-color var(--transition-fast)',
  }

  const formLabelStyle = {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    marginBottom: 'var(--spacing-xs)',
  }

  const sectionStyle = {
    marginBottom: 'var(--spacing-xl)',
  }

  const sectionTitleStyle = {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: 'var(--spacing-md)',
  }

  if (orderPlaced && order) {
    return (
      <div className="main-content main-content--full">
        <div className="page-container" style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link to="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-text-secondary)',
              fontWeight: 500,
              marginBottom: 'var(--spacing-md)',
            }}>
              &larr; В меню
            </Link>
            <h1 style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 800,
              color: 'var(--color-text)',
            }}>
              Заказ {order.number}
            </h1>
          </div>

          <div style={{
            background: 'rgba(26,156,94,0.05)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-xl) var(--spacing-lg)',
            marginBottom: 'var(--spacing-xl)',
          }}>
            <div className="stepper" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              <div className="stepper-step stepper-step--done" style={{ flexDirection: 'column' }}>
                <div className="stepper-dot">
                  <CheckCircle size={18} color="#fff" />
                </div>
                <div className="stepper-label">Принят</div>
                <div className="stepper-time">{formatTime(nowTime)}</div>
              </div>
              <div className="stepper-line" style={{ alignSelf: 'center', marginBottom: 28 }} />
              <div className="stepper-step stepper-step--active" style={{ flexDirection: 'column' }}>
                <div className="stepper-dot" style={{
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}>
                  <Clock size={18} color="#fff" />
                </div>
                <div className="stepper-label">Готовится</div>
                <div className="stepper-time">{formatTime(cookingTime)}</div>
              </div>
              <div className="stepper-line" style={{
                alignSelf: 'center',
                marginBottom: 28,
                background: 'var(--color-border)',
              }} />
              <div className="stepper-step" style={{ flexDirection: 'column' }}>
                <div className="stepper-dot" style={{ background: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <Clock size={18} />
                </div>
                <div className="stepper-label">В пути</div>
                <div className="stepper-time">--:--</div>
              </div>
              <div className="stepper-line" style={{
                alignSelf: 'center',
                marginBottom: 28,
                background: 'var(--color-border)',
              }} />
              <div className="stepper-step" style={{ flexDirection: 'column' }}>
                <div className="stepper-dot" style={{ background: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <CheckCircle size={18} />
                </div>
                <div className="stepper-label">Доставлен</div>
                <div className="stepper-time">--:--</div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--color-surface)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: 'var(--spacing-xl)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
              <Clock size={24} color="var(--color-green)" />
              <span style={{
                fontSize: 'var(--font-size-lg)',
                fontWeight: 700,
                color: 'var(--color-text)',
              }}>
                Примерное время доставки: {formatTime(deliveryEstimate)}
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-md)',
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-text)',
              fontWeight: 500,
            }}>
              <span>Курьер: Алексей</span>
              <span style={{ display: 'inline-flex', gap: 2 }}>
                <Star size={14} color="var(--color-yellow)" fill="var(--color-yellow)" />
                <Star size={14} color="var(--color-yellow)" fill="var(--color-yellow)" />
                <Star size={14} color="var(--color-yellow)" fill="var(--color-yellow)" />
                <Star size={14} color="var(--color-yellow)" fill="var(--color-yellow)" />
                <Star size={14} color="var(--color-yellow)" fill="var(--color-yellow)" />
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-lg)',
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-text-secondary)',
            }}>
              <Phone size={16} />
              <span>Телефон курьера: +7 ___ ___ __-__</span>
            </div>
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              padding: '10px 24px',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--color-green)',
              background: 'transparent',
              color: 'var(--color-green)',
              fontSize: 'var(--font-size-base)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}>
              <Phone size={16} />
              Позвонить
            </button>
          </div>

          <div style={{
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-lg)',
            marginBottom: 'var(--spacing-xl)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <h3 style={{
              fontSize: 'var(--font-size-lg)',
              fontWeight: 700,
              marginBottom: 'var(--spacing-md)',
              color: 'var(--color-text)',
            }}>
              Состав заказа
            </h3>
            {order.items.map(item => {
              const product = productById[item.productId]
              if (!product) return null
              return (
                <div key={item.productId} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--spacing-sm) 0',
                  borderBottom: '1px solid var(--color-border-light)',
                  fontSize: 'var(--font-size-base)',
                }}>
                  <span style={{ color: 'var(--color-text)' }}>
                    {product.name} &times; {item.quantity}
                  </span>
                  <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>
                    {formatPrice(product.price * item.quantity)}
                  </span>
                </div>
              )
            })}
            {order.promoCode && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 'var(--spacing-sm) 0',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-green)',
              }}>
                <span>Промокод: {order.promoCode}</span>
                <span>-100 \u20BD</span>
              </div>
            )}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: 'var(--spacing-md) 0',
              borderTop: '2px solid var(--color-border)',
              marginTop: 'var(--spacing-md)',
            }}>
              <span style={{
                fontSize: 'var(--font-size-lg)',
                fontWeight: 700,
                color: 'var(--color-text)',
              }}>Итого</span>
              <span style={{
                fontSize: 'var(--font-size-lg)',
                fontWeight: 700,
                color: 'var(--color-text)',
              }}>{formatPrice(order.total)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--font-size-sm)',
              color: order.deliveryFee === 0 ? 'var(--color-green)' : 'var(--color-text-secondary)',
              fontWeight: order.deliveryFee === 0 ? 600 : 400,
            }}>
              <span>Доставка</span>
              <span>{order.deliveryFee === 0 ? 'бесплатно' : formatPrice(order.deliveryFee)}</span>
            </div>
          </div>

          {canCancel && (
            <div style={{ textAlign: 'center', paddingBottom: 'var(--spacing-2xl)' }}>
              {!showCancelConfirm ? (
                <button
                  onClick={() => setShowCancelConfirm(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    padding: '12px 28px',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid var(--color-danger)',
                    background: 'transparent',
                    color: 'var(--color-danger)',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <X size={18} />
                  Отменить заказ
                </button>
              ) : (
                <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                  <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-base)' }}>
                    Вы уверены, что хотите отменить заказ?
                  </span>
                  <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <button
                      onClick={handleCancel}
                      style={{
                        padding: '10px 24px',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: 'var(--color-danger)',
                        color: '#fff',
                        fontSize: 'var(--font-size-base)',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Да, отменить
                    </button>
                    <button
                      onClick={() => setShowCancelConfirm(false)}
                      style={{
                        padding: '10px 24px',
                        borderRadius: 'var(--radius-md)',
                        border: '2px solid var(--color-border)',
                        background: 'var(--color-surface)',
                        color: 'var(--color-text)',
                        fontSize: 'var(--font-size-base)',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Нет
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="main-content main-content--full">
      <div className="page-container">
        <h1 className="page-title">Оформление заказа</h1>

        {items.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 'var(--spacing-3xl)',
            color: 'var(--color-text-secondary)',
          }}>
            <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-lg)' }}>
              Корзина пуста
            </p>
            <Link to="/" style={{
              display: 'inline-flex',
              padding: '12px 28px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-accent)',
              color: '#fff',
              fontSize: 'var(--font-size-base)',
              fontWeight: 600,
              textDecoration: 'none',
            }}>
              В меню
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            gap: 'var(--spacing-xl)',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}>
            <div style={{ flex: '1 1 60%', minWidth: 300 }}>
              <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Контакты</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                  <div>
                    <div style={formLabelStyle}>Имя</div>
                    <input
                      style={formInputStyle}
                      type="text"
                      placeholder="Имя"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <div style={formLabelStyle}>Телефон</div>
                    <input
                      style={formInputStyle}
                      type="tel"
                      placeholder="+7 ___ ___ __-__"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <div style={formLabelStyle}>Email</div>
                    <input
                      style={formInputStyle}
                      type="email"
                      placeholder="Email (необязательно)"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Адрес доставки</h2>
                <div className="radio-group" style={{ flexDirection: 'row', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                  <div
                    className={'radio-item' + (deliveryType === 'delivery' ? ' radio-item--active' : '')}
                    onClick={() => setDeliveryType('delivery')}
                  >
                    <div className="radio-dot" />
                    <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 500 }}>Доставка</span>
                  </div>
                  <div
                    className={'radio-item' + (deliveryType === 'pickup' ? ' radio-item--active' : '')}
                    onClick={() => setDeliveryType('pickup')}
                  >
                    <div className="radio-dot" />
                    <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 500 }}>Самовывоз</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                  <div>
                    <div style={formLabelStyle}>Улица</div>
                    <input
                      style={formInputStyle}
                      type="text"
                      placeholder="Улица"
                      value={street}
                      onChange={e => setStreet(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <div style={{ flex: 1 }}>
                      <div style={formLabelStyle}>Дом</div>
                      <input
                        style={formInputStyle}
                        type="text"
                        placeholder="Дом"
                        value={house}
                        onChange={e => setHouse(e.target.value)}
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={formLabelStyle}>Квартира</div>
                      <input
                        style={formInputStyle}
                        type="text"
                        placeholder="Квартира"
                        value={apartment}
                        onChange={e => setApartment(e.target.value)}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={formLabelStyle}>Этаж</div>
                      <input
                        style={formInputStyle}
                        type="text"
                        placeholder="Этаж"
                        value={floor}
                        onChange={e => setFloor(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div style={formLabelStyle}>Подъезд</div>
                    <input
                      style={formInputStyle}
                      type="text"
                      placeholder="Подъезд"
                      value={entrance}
                      onChange={e => setEntrance(e.target.value)}
                    />
                  </div>
                  <div>
                    <div style={formLabelStyle}>Комментарий курьеру</div>
                    <textarea
                      style={{ ...formInputStyle, minHeight: 80, resize: 'vertical' }}
                      placeholder="Комментарий курьеру"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Время доставки</h2>
                <div className="radio-group" style={{ gap: 'var(--spacing-sm)' }}>
                  <div
                    className={'radio-item' + (deliveryTime === 'asap' ? ' radio-item--active' : '')}
                    onClick={() => setDeliveryTime('asap')}
                  >
                    <div className="radio-dot" />
                    <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 500 }}>Как можно скорее</span>
                  </div>
                  <div
                    className={'radio-item' + (deliveryTime === 'exact' ? ' radio-item--active' : '')}
                    onClick={() => setDeliveryTime('exact')}
                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}
                  >
                    <div className="radio-dot" />
                    <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 500 }}>Ко времени</span>
                    <input
                      type="time"
                      style={{
                        padding: '8px 12px',
                        border: '2px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--color-surface)',
                        color: 'var(--color-text)',
                        fontSize: 'var(--font-size-base)',
                        outline: 'none',
                        marginLeft: 'var(--spacing-md)',
                      }}
                      value={exactTime}
                      onChange={e => setExactTime(e.target.value)}
                      onClick={e => {
                        e.stopPropagation()
                        setDeliveryTime('exact')
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Способ оплаты</h2>
                <div className="radio-group" style={{ gap: 'var(--spacing-sm)' }}>
                  <div
                    className={'radio-item' + (paymentMethod === 'card-online' ? ' radio-item--active' : '')}
                    onClick={() => setPaymentMethod('card-online')}
                  >
                    <div className="radio-dot" />
                    <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 500 }}>Картой онлайн</span>
                  </div>
                  <div
                    className={'radio-item' + (paymentMethod === 'cash' ? ' radio-item--active' : '')}
                    onClick={() => setPaymentMethod('cash')}
                  >
                    <div className="radio-dot" />
                    <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 500 }}>Наличными курьеру</span>
                  </div>
                  <div
                    className={'radio-item' + (paymentMethod === 'card-courier' ? ' radio-item--active' : '')}
                    onClick={() => setPaymentMethod('card-courier')}
                  >
                    <div className="radio-dot" />
                    <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 500 }}>Картой курьеру</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: 56,
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-accent)',
                  color: '#fff',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.01em',
                  transition: 'background var(--transition-fast), transform var(--transition-fast)',
                  marginBottom: 'var(--spacing-2xl)',
                }}
              >
                Оформить заказ
              </button>
            </div>

            <div style={{
              flex: '1 1 340px',
              maxWidth: 420,
              position: 'sticky',
              top: 'calc(var(--header-height) + var(--spacing-lg))',
            }}>
              <div style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-xl)',
                boxShadow: 'var(--shadow-md)',
              }}>
                <h3 style={{
                  fontSize: 'var(--font-size-xl)',
                  fontWeight: 700,
                  marginBottom: 'var(--spacing-lg)',
                  color: 'var(--color-text)',
                }}>
                  Ваш заказ
                </h3>

                {items.map(item => {
                  const product = productById[item.productId]
                  if (!product) return null
                  return (
                    <div key={item.productId} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 'var(--spacing-sm) 0',
                      borderBottom: '1px solid var(--color-border-light)',
                      fontSize: 'var(--font-size-base)',
                    }}>
                      <span style={{ color: 'var(--color-text)', flex: 1, paddingRight: 'var(--spacing-md)' }}>
                        {product.name} &times; {item.quantity}
                      </span>
                      <span style={{ fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>
                        {formatPrice(product.price * item.quantity)}
                      </span>
                    </div>
                  )
                })}

                {promoCode && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 'var(--spacing-sm) 0',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-green)',
                  }}>
                    <span>Промокод: {promoCode}</span>
                    <span>-100 \u20BD</span>
                  </div>
                )}

                <div style={{
                  height: 1,
                  background: 'var(--color-border)',
                  margin: 'var(--spacing-md) 0',
                }} />

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--spacing-xs)',
                }}>
                  <span style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 800,
                    color: 'var(--color-text)',
                  }}>
                    {formatPrice(total)}
                  </span>
                  <span style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                  }}>
                    {itemCount} {itemCount === 1 ? 'товар' : itemCount < 5 ? 'товара' : 'товаров'}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'var(--font-size-sm)',
                  color: deliveryFee === 0 ? 'var(--color-green)' : 'var(--color-text-secondary)',
                  fontWeight: deliveryFee === 0 ? 600 : 400,
                }}>
                  <span>Доставка</span>
                  <span>{deliveryFee === 0 ? 'бесплатно' : formatPrice(deliveryFee)}</span>
                </div>

                {deliveryFee > 0 && (
                  <div style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-muted)',
                    marginTop: 'var(--spacing-xs)',
                  }}>
                    Бесплатно от {FREE_DELIVERY_THRESHOLD} \u20BD
                  </div>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}