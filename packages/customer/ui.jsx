import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCustomer } from './context.jsx'
import { INITIAL_BONUS, money, quoteOrder } from './model.mjs'
import './customer.css'

export function FooterDemoNotice() {
  return <p className="ds-footer-notice">Демонстрационная версия. Заказы не отправляются, оплата имитируется, деньги не списываются.</p>
}
export function AuthModal({ isOpen, onClose }) {
  const { state, transact } = useCustomer()
  const dialog = useRef(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  useEffect(() => { if (isOpen && dialog.current && !dialog.current.open) dialog.current.showModal() }, [isOpen])
  if (!isOpen) return null
  async function signIn(event) {
    event.preventDefault(); setBusy(true); setError('')
    try { await transact({ type: 'SIGN_IN' }); onClose() } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  return <dialog ref={dialog} className="ds-dialog ds" aria-labelledby="customer-sign-in-title" onCancel={onClose} onClick={event => { if (event.target === dialog.current) onClose() }}>
    <form onSubmit={signIn}>
      <div className="ds-between"><span className="ds-eyebrow">СУШИСТОРОЛЛ / КЛУБ ГОСТЕЙ</span><button type="button" className="ds-icon" aria-label="Закрыть вход" onClick={onClose}>×</button></div>
      <div className="ds-avatar">{state.profile.name.slice(0, 1)}</div>
      <h2 id="customer-sign-in-title">С возвращением</h2>

      <div className="ds-note"><strong>{state.profile.name}</strong><span>{state.profile.phone}</span></div>
      {error && <p className="ds-error" role="alert">{error}</p>}
      <button className="btn btn-primary ds-wide" disabled={busy}>{busy ? 'Входим…' : `Войти как ${state.profile.name}`}</button>
    </form>
  </dialog>
}
export function PromoMessage({ quote }) {
  return quote.promoError ? <p className="ds ds-error" role="status">{quote.promoError}</p> : quote.discount > 0 ? <p className="ds ds-good">Скидка SUSHI10: −{money(quote.discount)}</p> : null
}
export function QuoteSummary({ quote, children }) {
  return <section className="ds-section ds-summary" aria-label="Сумма заказа">
    <span className="ds-eyebrow">ВАШ ЗАКАЗ</span>
    <div className="ds-order-lines">{quote.lines.map(item => <div className="ds-between" key={item.productId}><span>{item.name} <small>× {item.quantity}</small></span><strong className="ds-numeric">{money(item.price * item.quantity)}</strong></div>)}</div>
    <div className="ds-between"><span>Товары</span><span className="ds-numeric">{money(quote.subtotal)}</span></div>
    {quote.discount > 0 && <div className="ds-between ds-good"><span>Промокод −10%</span><span className="ds-numeric">−{money(quote.discount)}</span></div>}
    {quote.spent > 0 && <div className="ds-between ds-good"><span>Бонусами</span><span className="ds-numeric">−{money(quote.spent)}</span></div>}
    <div className="ds-between"><span>Доставка</span><span className="ds-numeric">{quote.deliveryFee ? money(quote.deliveryFee) : 'Бесплатно'}</span></div>
    <div className="ds-between ds-total"><span>К оплате</span><strong className="ds-numeric">{money(quote.total)}</strong></div>
    <p className="ds-caption">+{quote.earned} бонусов после оплаты</p>
    {children}
  </section>
}
function BonusRules() {
  return <div className="ds-rules"><div><strong>1 бонус = 1 ₽</strong><span>Списывайте до 30% стоимости товаров после скидки.</span></div><div><strong>5% возвращается</strong><span>Начисляем с суммы товаров после скидки и списания бонусов. Доставка не учитывается.</span></div><div><strong>Начисление сразу</strong><span>Бонусы зачисляются после оплаты.</span></div></div>
}
function AccountCart({ cart, products, store, customer }) {
  const quote = quoteOrder({
    items: cart.items, products, store, promoCode: cart.promoCode,
    hasOrders: customer.orders.length > 0,
  })
  return (
    <section aria-labelledby="account-cart-title">
      <h2 id="account-cart-title">Корзина</h2>
      {quote.lines.length === 0 ? (
        <div className="ds-empty">
          <p className="ds-muted">В корзине пока пусто.</p>
          <Link className="btn btn-primary" to="/">Выбрать блюда</Link>
        </div>
      ) : (
        <>
          <ul className="ds-cart-lines">
            {quote.lines.map(line => (
              <li key={line.productId} className="ds-cart-line">
                <div>
                  <strong>{line.name}</strong>
                  <p className="ds-caption ds-numeric">{money(line.price)} за шт.</p>
                </div>
                <div className="ds-quantity">
                  <button type="button" aria-label={`Уменьшить количество: ${line.name}`} onClick={() => cart.removeItem(line.productId)}>−</button>
                  <span className="ds-numeric">{line.quantity}</span>
                  <button type="button" aria-label={`Увеличить количество: ${line.name}`} disabled={line.quantity >= 99} onClick={() => cart.setQuantity(line.productId, line.quantity + 1)}>+</button>
                </div>
                <strong className="ds-numeric">{money(line.price * line.quantity)}</strong>
              </li>
            ))}
          </ul>
          <PromoMessage quote={quote} />
          <div className="ds-between ds-cart-total">
            <span>Итого с доставкой</span>
            <strong className="ds-numeric">{money(quote.total)}</strong>
          </div>
          <div className="ds-actions ds-actions--start">
            <Link className="btn btn-primary" to="/checkout">Оформить заказ</Link>
            <Link className="btn btn-outline" to="/cart">Открыть полную корзину</Link>
          </div>
        </>
      )}
    </section>
  )
}

const orderTime = new Intl.DateTimeFormat('ru-RU', {
  dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Moscow',
})

function AccountOrders({ orders, onRepeat }) {
  return (
    <section aria-labelledby="account-orders-title">
      <h2 id="account-orders-title">История заказов</h2>
      {orders.length === 0 ? (
        <div className="ds-empty">
          <p className="ds-muted">Заказов пока нет.</p>
          <Link className="btn btn-primary" to="/">Выбрать блюда</Link>
        </div>
      ) : orders.map(order => (
        <article className="ds-history" key={order.id}>
          <div className="ds-between">
            <div>
              <strong>Заказ {order.number}</strong>
              <p className="ds-caption">{orderTime.format(new Date(order.time))}</p>
            </div>
            <span className="ds-good">Оплачен</span>
          </div>
          <p>{order.lines.map(line => `${line.name} × ${line.quantity}`).join(' · ')}</p>
          <p className="ds-caption">{order.deliveryType === 'pickup' ? 'Самовывоз' : order.customer.address}</p>
          <div className="ds-between">
            <strong className="ds-numeric">{money(order.total)}</strong>
            <span className="ds-good ds-numeric">+{order.earned} бонусов{order.spent ? ` / −${order.spent} списано` : ''}</span>
          </div>
          <button className="btn btn-outline" onClick={() => onRepeat(order)}>Повторить заказ</button>
        </article>
      ))}
    </section>
  )
}

function AccountBonuses({ balance, ledger }) {
  return (
    <>
      <section className="ds-section">
        <h2>Баланс бонусов</h2>
        <p className="ds-balance ds-numeric">{balance.toLocaleString('ru-RU')} <small>бонусов</small></p>
        <BonusRules />
      </section>
      <section className="ds-section">
        <h2>История бонусов</h2>
        {ledger.map(entry => (
          <div className="ds-ledger" key={entry.id}>
            <div>
              <strong>{entry.label}</strong>
              <small>{entry.time ? orderTime.format(new Date(entry.time)) : 'Стартовый баланс'}</small>
            </div>
            <strong className={entry.amount > 0 ? 'ds-numeric ds-good' : 'ds-numeric'}>
              {entry.amount > 0 ? '+' : ''}{entry.amount.toLocaleString('ru-RU')}
            </strong>
          </div>
        ))}
      </section>
    </>
  )
}

export function AccountPage({ cart, products, store, onRepeat }) {
  const { state, transact, error } = useCustomer()
  const [params, setParams] = useSearchParams()
  const tabs = [
    ['profile', 'Профиль'],
    ['cart', 'Корзина', cart.itemCount],
    ['orders', 'Заказы', state.orders.length],
    ['bonuses', 'Бонусы'],
  ]
  const tab = tabs.some(([key]) => key === params.get('tab')) ? params.get('tab') : 'profile'
  const [authOpen, setAuthOpen] = useState(false)
  const [profile, setProfile] = useState(state.profile)
  const [notice, setNotice] = useState('')
  const [resetOpen, setResetOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => setProfile(state.profile), [state.profile])

  async function act(action, message = '') {
    setBusy(true)
    setNotice('')
    try {
      await transact(action)
      setNotice(message)
      setResetOpen(false)
    } catch {} finally {
      setBusy(false)
    }
  }

  return (
    <main className="ds ds-page ds-account">
      <h1 className="page-title">Личный кабинет</h1>
      {!state.signedIn ? (
        <section className="ds-section">
          <p className="ds-muted">{INITIAL_BONUS.toLocaleString('ru-RU')} приветственных бонусов. Войдите, чтобы увидеть баланс и заказы.</p>
          <button className="btn btn-primary" onClick={() => setAuthOpen(true)}>Войти в аккаунт</button>
        </section>
      ) : (
        <>
          <div className="ds-account-header">
            <div className="ds-account-identity">
              <span className="ds-avatar" aria-hidden="true">{state.profile.name.trim().slice(0, 1).toLocaleUpperCase('ru-RU') || 'Г'}</span>
              <strong>{state.profile.name}</strong>
            </div>
            <button className="ds-text-button" disabled={busy} onClick={() => act({ type: 'SIGN_OUT' })}>Выйти</button>
          </div>
          <nav className="ds-tabs" aria-label="Разделы кабинета">
            {tabs.map(([key, label, count]) => (
              <Link key={key} to={`?tab=${key}`} aria-current={tab === key ? 'page' : undefined} onClick={() => { setNotice(''); setResetOpen(false) }}>
                {label}{count > 0 && <span className="ds-tab-count ds-numeric">{count}</span>}
              </Link>
            ))}
          </nav>
          <div className="ds-account-content">
            {tab === 'profile' && (
              <section>
                <h2>Личные данные</h2>
                <p className="ds-muted">Используем их при оформлении заказа.</p>
                <form className="ds-form" onSubmit={event => { event.preventDefault(); act({ type: 'PROFILE', profile }, 'Профиль сохранён') }}>
                  <div className="ds-fields">
                    {[['name', 'Имя', 'text'], ['phone', 'Телефон', 'tel'], ['email', 'Почта', 'email']].map(([key, label, type]) => (
                      <label key={key}>{label}
                        <input className="input" name={key} type={type} required={key !== 'email'} maxLength={100} value={profile[key]} onChange={event => setProfile({ ...profile, [key]: event.target.value })} />
                      </label>
                    ))}
                  </div>
                  <label>Адрес доставки
                    <input className="input" name="address" maxLength={250} value={profile.address} onChange={event => setProfile({ ...profile, address: event.target.value })} />
                  </label>
                  <button className="btn btn-primary" disabled={busy}>Сохранить профиль</button>
                </form>
                {notice && <p role="status" className="ds-good">{notice}</p>}
                <div className="ds-account-tools">
                  {!resetOpen ? (
                    <button className="ds-text-button" onClick={() => setResetOpen(true)}>Сбросить профиль и историю</button>
                  ) : (
                    <>
                      <p>Удалить историю заказов и изменения профиля? На баланс вернётся {INITIAL_BONUS.toLocaleString('ru-RU')} бонусов.</p>
                      <div className="ds-actions ds-actions--start">
                        <button className="btn btn-outline" onClick={() => setResetOpen(false)}>Оставить</button>
                        <button className="btn btn-primary" disabled={busy} onClick={() => act({ type: 'RESET' })}>Сбросить</button>
                      </div>
                    </>
                  )}
                </div>
              </section>
            )}
            {tab === 'cart' && <AccountCart cart={cart} products={products} store={store} customer={state} />}
            {tab === 'orders' && <AccountOrders orders={state.orders} onRepeat={onRepeat} />}
            {tab === 'bonuses' && <AccountBonuses balance={state.balance} ledger={state.ledger} />}
          </div>
        </>
      )}
      {error && <p role="alert" className="ds-error">{error}</p>}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </main>
  )
}

export function CheckoutPage({ cart, products, store, variant }) {
  const { state, transact } = useCustomer()
  const [authOpen, setAuthOpen] = useState(false)
  const [customer, setCustomer] = useState(state.profile)
  const [deliveryType, setDeliveryType] = useState('delivery')
  const [useBonuses, setUseBonuses] = useState(false)
  const [draft, setDraft] = useState(null)
  const [order, setOrder] = useState(null)
  const [payment, setPayment] = useState('ready')
  const [error, setError] = useState('')
  const paying = useRef(false)
  useEffect(() => setCustomer(state.profile), [state.profile])
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [draft, order])
  const input = { items: cart.items, products, store, promoCode: cart.promoCode, deliveryType, useBonuses: useBonuses && state.signedIn }
  let quote
  try { quote = quoteOrder({ ...input, balance: state.balance, hasOrders: state.orders.length > 0 }) } catch (err) {
    return <main className="ds ds-page"><h1 className="page-title">Проверьте корзину</h1><p role="alert">{err.message}</p><Link to="/cart" className="btn btn-primary">В корзину</Link></main>
  }
  function prepare(event) {
    event.preventDefault(); setError('')
    if (!state.signedIn) { setAuthOpen(true); return }
    if (quote.subtotal < store.minOrder) return
    setDraft({ id: crypto.randomUUID(), quote, input, day: state.day, customer: { ...customer }, time: new Date().toISOString() })
    setPayment('ready')
  }
  async function pay() {
    if (paying.current) return
    paying.current = true; setPayment('processing'); setError('')
    try {
      const result = await transact({ type: 'PAY', day: draft.day, id: draft.id, expected: draft.quote, input: draft.input, customer: draft.customer, time: draft.time, variant })
      setOrder(result.orders.find(item => item.id === draft.id)); cart.clearCart(); setDraft(null); setPayment('ready')
    } catch (err) { setError(err.message); setPayment('ready') } finally { paying.current = false }
  }
  if (order) return (
    <main className="ds ds-page">
      <section className="ds-section ds-success">
        <div className="ds-success-mark" aria-hidden="true">✓</div>
        <h1 className="page-title">Заказ {order.number} оплачен</h1>
        <div className="ds-success-total ds-numeric">{money(order.total)}</div>
        <p className="ds-good">+{order.earned} бонусов на баланс{order.spent ? ` · использовано ${order.spent}` : ''}</p>
        <p>{order.deliveryType === 'pickup' ? `Самовывоз: ${store.address}` : order.customer.address}</p>
        <div className="ds-actions">
          <Link to="/account?tab=orders" className="btn btn-primary">Посмотреть заказ</Link>
          <Link to="/" className="btn btn-outline">Вернуться в меню</Link>
        </div>
      </section>
    </main>
  )
  if (draft) return (
    <main className="ds ds-page">
      <div className="ds-checkout-heading">
        <button className="ds-text-button" disabled={payment === 'processing'} onClick={() => { setDraft(null); setError('') }}>
          ← Вернуться к оформлению
        </button>
        <h1 className="page-title">Оплата заказа</h1>
      </div>
      <div className="ds-checkout-grid ds-checkout-grid--payment">
        <section className="ds-section ds-payment">
          <span className="ds-eyebrow">К ОПЛАТЕ</span>
          <p className="ds-payment-amount ds-numeric">{money(draft.quote.total)}</p>
          {payment === 'failed' ? (
            <>
              <p role="alert" className="ds-error">Платёж отклонён. Корзина и бонусы сохранены.</p>
              <button className="btn btn-primary ds-wide" onClick={() => setPayment('ready')}>Повторить оплату</button>
            </>
          ) : (
            <div className="ds-form">
              <button className="btn btn-primary ds-wide" disabled={payment === 'processing'} onClick={pay}>
                {payment === 'processing' ? 'Подтверждаем…' : 'Оплатить заказ'}
              </button>
              <button className="btn btn-outline ds-wide" disabled={payment === 'processing'} onClick={() => setPayment('failed')}>
                Отклонить платёж
              </button>
            </div>
          )}
          {error && <p className="ds-error" role="alert">{error}</p>}
        </section>
        <QuoteSummary quote={draft.quote} />
      </div>
    </main>
  )
  if (!cart.items.length) return <main className="ds ds-page"><h1 className="page-title">Оформление заказа</h1><section className="ds-section ds-empty"><h2>Корзина пока пуста</h2><p className="ds-muted">Самое время выбрать что-нибудь вкусное.</p><Link className="btn btn-primary" to="/">Перейти в меню</Link><Link className="ds-text-button" to="/account?tab=orders">История заказов</Link></section></main>
  return <main className="ds ds-page"><div className="ds-checkout-heading"><Link className="ds-text-button" to="/cart">← Корзина</Link><h1 className="page-title">Оформление заказа</h1></div><div className="ds-checkout-grid"><form className="ds-form" onSubmit={prepare}>
    {!state.signedIn && <section className="ds-section"><h2>С бонусами приятнее</h2><p className="ds-muted">Войдите, чтобы оформить заказ и получить бонусы.</p><button type="button" className="btn btn-outline" onClick={() => setAuthOpen(true)}>Войти в аккаунт</button></section>}
    <section className="ds-section"><span className="ds-eyebrow">01 / КОНТАКТЫ</span><h2>Контактные данные</h2><div className="ds-fields"><label>Имя<input className="input" required maxLength={100} name="name" value={customer.name} onChange={event => setCustomer({ ...customer, name: event.target.value })} /></label><label>Телефон<input className="input" required maxLength={30} type="tel" name="phone" value={customer.phone} onChange={event => setCustomer({ ...customer, phone: event.target.value })} /></label></div></section>
    <section className="ds-section"><span className="ds-eyebrow">02 / ПОЛУЧЕНИЕ</span><h2>Способ получения</h2><div className="ds-segment">{[['delivery', 'Доставка'], ['pickup', 'Самовывоз']].map(([key, label]) => <label key={key}><input type="radio" name="deliveryType" value={key} checked={deliveryType === key} onChange={() => setDeliveryType(key)} /><span>{label}</span></label>)}</div>{deliveryType === 'delivery' ? <label>Адрес доставки<input className="input" required maxLength={250} name="address" value={customer.address} onChange={event => setCustomer({ ...customer, address: event.target.value })} /></label> : <div className="ds-note"><strong>{store.city}, {store.address}</strong><span>{store.hours} · самовывоз бесплатно</span></div>}</section>
    <section className="ds-section"><span className="ds-eyebrow">03 / БОНУСЫ</span><h2>Списание бонусов</h2><label className="ds-bonus-check"><input type="checkbox" checked={useBonuses} disabled={!state.signedIn || !quote.maxSpend} onChange={event => setUseBonuses(event.target.checked)} /><span><strong>Списать {state.signedIn ? quote.maxSpend : 0} бонусов</strong><small>Баланс: {state.signedIn ? state.balance : 'войдите в аккаунт'} · до 30% стоимости товаров</small></span></label><p className="ds-caption">1 бонус = 1 ₽. После оплаты начислим {quote.earned} бонусов.</p></section>
    <PromoMessage quote={quote} />{quote.subtotal < store.minOrder && <p className="ds-error" role="alert">Минимальная сумма товаров — {money(store.minOrder)}. Добавьте ещё {money(store.minOrder - quote.subtotal)}.</p>}
    <button className="btn btn-primary ds-wide ds-numeric" disabled={quote.subtotal < store.minOrder}>{state.signedIn ? `Перейти к оплате · ${money(quote.total)}` : 'Войти и продолжить'}</button>
  </form><QuoteSummary quote={quote}><p className="ds-caption">Доставка бесплатно от {money(store.freeDeliveryFrom)} до скидок; иначе {money(store.deliveryFee)}.</p><p className="ds-caption">Для первого заказа: промокод SUSHI10 в корзине.</p></QuoteSummary></div><AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} /></main>
}
