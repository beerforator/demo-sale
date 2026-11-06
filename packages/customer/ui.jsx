import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCustomer } from './context.jsx'
import { money, quoteOrder } from './model.mjs'
import './customer.css'

export function DemoNotice() {
  return <p className="ds-notice"><span className="ds-dot" /> Деморежим · заказы не отправляются, деньги не списываются</p>
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
  return <dialog ref={dialog} className="ds-dialog ds" onCancel={onClose} onClick={event => { if (event.target === dialog.current) onClose() }}>
    <form onSubmit={signIn}>
      <div className="ds-between"><span className="ds-eyebrow">СУШИСТОРОЛЛ / КЛУБ ГОСТЕЙ</span><button type="button" className="ds-icon" aria-label="Закрыть вход" onClick={onClose}>×</button></div>
      <div className="ds-avatar">{state.profile.name.slice(0, 1)}</div>
      <h2>С возвращением</h2>
      <p className="ds-muted">Посмотрите, как работает кабинет гостя: заказы, любимый адрес и бонусы за покупки.</p>
      <div className="ds-inset"><strong>{state.profile.name}</strong><span>{state.profile.phone}</span><span className="ds-muted">Один демоаккаунт для трёх вариантов сайта. Пароль и SMS не нужны.</span></div>
      {error && <p className="ds-error" role="alert">{error}</p>}
      <button className="ds-button ds-wide" disabled={busy}>{busy ? 'Входим…' : `Войти как ${state.profile.name}`}</button>
      <p className="ds-caption">Демо хранится только в этом браузере. Используйте вымышленные данные.</p>
    </form>
  </dialog>
}
export function PromoMessage({ quote }) {
  return quote.promoError ? <p className="ds ds-error" role="status">{quote.promoError}</p> : quote.discount > 0 ? <p className="ds ds-good">Скидка SUSHI10: −{money(quote.discount)}</p> : null
}
export function QuoteSummary({ quote, children }) {
  return <section className="ds-card ds-summary" aria-label="Сумма заказа">
    <span className="ds-eyebrow">ВАШ ЗАКАЗ</span>
    <div className="ds-order-lines">{quote.lines.map(item => <div className="ds-between" key={item.productId}><span>{item.name} <small>× {item.quantity}</small></span><strong>{money(item.price * item.quantity)}</strong></div>)}</div>
    <div className="ds-between"><span>Товары</span><span>{money(quote.subtotal)}</span></div>
    {quote.discount > 0 && <div className="ds-between ds-good"><span>Промокод −10%</span><span>−{money(quote.discount)}</span></div>}
    {quote.spent > 0 && <div className="ds-between ds-good"><span>Бонусами</span><span>−{money(quote.spent)}</span></div>}
    <div className="ds-between"><span>Доставка</span><span>{quote.deliveryFee ? money(quote.deliveryFee) : 'Бесплатно'}</span></div>
    <div className="ds-between ds-total"><span>К оплате</span><strong>{money(quote.total)}</strong></div>
    <p className="ds-caption">+{quote.earned} бонусов после успешной демооплаты</p>
    {children}
  </section>
}
function BonusRules() {
  return <div className="ds-rules"><div><strong>1 бонус = 1 ₽</strong><span>Списывайте до 30% стоимости товаров после скидки.</span></div><div><strong>5% возвращается</strong><span>Начисляем с суммы товаров после скидки и списания бонусов. Доставка не учитывается.</span></div><div><strong>Сразу в демо</strong><span>Бонусы зачисляются после успешной демонстрационной оплаты.</span></div></div>
}
export function AccountPage({ onRepeat }) {
  const { state, transact, error } = useCustomer()
  const [params, setParams] = useSearchParams()
  const tab = ['profile', 'orders', 'bonuses'].includes(params.get('tab')) ? params.get('tab') : 'profile'
  const [authOpen, setAuthOpen] = useState(false)
  const [profile, setProfile] = useState(state.profile)
  const [notice, setNotice] = useState('')
  const [resetOpen, setResetOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  useEffect(() => setProfile(state.profile), [state.profile])
  async function act(action, message) {
    setBusy(true); setNotice('')
    try { await transact(action); setNotice(message); setResetOpen(false) } catch {} finally { setBusy(false) }
  }
  return <main className="ds ds-page">
    <DemoNotice />
    <div className="ds-page-heading"><span className="ds-eyebrow">ВАШЕ МЕСТО В СУШИСТОРОЛЛ</span><h1>{state.signedIn ? `Привет, ${state.profile.name}` : 'Кабинет гостя'}</h1><p className="ds-muted">Любимые вкусы, заказы и немного приятных привилегий.</p></div>
    {!state.signedIn ? <section className="ds-card ds-welcome"><div className="ds-avatar">↗</div><h2>Вкуснее, когда с бонусами</h2><p>300 приветственных бонусов уже ждут вас. Войдите в демоаккаунт, чтобы попробовать весь путь заказа.</p><button className="ds-button" onClick={() => setAuthOpen(true)}>Войти в демоаккаунт</button></section> : <div className="ds-account-grid">
      <aside><section className="ds-club"><span className="ds-eyebrow">КАРТА ГОСТЯ</span><div className="ds-between"><h2>{state.profile.name}</h2><span className="ds-stamp">鮨</span></div><span className="ds-balance">{state.balance.toLocaleString('ru-RU')}</span><span>бонусов на новые вкусы</span><small>СУШИСТОРОЛЛ · DEMO CLUB</small></section>
        <nav className="ds-tabs" aria-label="Разделы кабинета">{[['profile', 'Мой профиль'], ['orders', `Заказы · ${state.orders.length}`], ['bonuses', 'Мои бонусы']].map(([key, label]) => <button key={key} aria-current={tab === key ? 'page' : undefined} onClick={() => { setParams({ tab: key }); setNotice('') }}>{label}<span>↗</span></button>)}</nav>
        <button className="ds-text-button" disabled={busy} onClick={() => act({ type: 'SIGN_OUT' }, '')}>Выйти из демоаккаунта</button>
      </aside>
      <div className="ds-account-content">
        {tab === 'profile' && <section className="ds-card"><span className="ds-eyebrow">01 / ЛИЧНЫЕ ДАННЫЕ</span><h2>Будем знакомы</h2><p className="ds-muted">Эти данные подставятся при оформлении заказа.</p><form onSubmit={event => { event.preventDefault(); act({ type: 'PROFILE', profile }, 'Профиль сохранён') }} className="ds-form">
          <div className="ds-fields">{[['name', 'Имя', 'text'], ['phone', 'Телефон', 'tel'], ['email', 'Почта', 'email']].map(([key, label, type]) => <label key={key}>{label}<input name={key} type={type} required={key !== 'email'} maxLength={100} value={profile[key]} onChange={event => setProfile({ ...profile, [key]: event.target.value })} /></label>)}</div>
          <label>Адрес доставки<input name="address" maxLength={250} value={profile.address} onChange={event => setProfile({ ...profile, address: event.target.value })} /></label><button className="ds-button" disabled={busy}>Сохранить профиль</button>
        </form></section>}
        {tab === 'orders' && <section><div className="ds-between"><h2>Ваши заказы</h2><Link to="/" className="ds-text-button">В меню ↗</Link></div>{!state.orders.length ? <div className="ds-card ds-empty"><span className="ds-empty-mark">↗</span><h3>Первая встреча со вкусом впереди</h3><p className="ds-muted">Соберите корзину и попробуйте демооплату — заказ появится здесь.</p><Link className="ds-button" to="/">Выбрать блюда</Link></div> : state.orders.map(order => <article className="ds-card ds-history" key={order.id}><div className="ds-between"><div><strong>Заказ {order.number}</strong><p className="ds-caption">{new Date(order.time).toLocaleString('ru-RU')} · {order.variant}</p></div><span className="ds-pill">{order.status}</span></div><p>{order.lines.map(line => `${line.name} × ${line.quantity}`).join(' · ')}</p><p className="ds-caption">{order.deliveryType === 'pickup' ? 'Самовывоз' : order.customer.address}</p><div className="ds-between"><strong>{money(order.total)}</strong><span className="ds-good">+{order.earned} бонусов{order.spent ? ` / −${order.spent} списано` : ''}</span></div><button className="ds-button ds-secondary" onClick={() => onRepeat(order)}>Повторить заказ</button></article>)}</section>}
        {tab === 'bonuses' && <><section className="ds-card"><span className="ds-eyebrow">ПРИЯТНОЕ ПОСЛЕВКУСИЕ</span><h2>Больше поводов вернуться</h2><BonusRules /></section><section className="ds-card"><h2>История бонусов</h2>{state.ledger.map(entry => <div className="ds-ledger" key={entry.id}><div><strong>{entry.label}</strong><small>{entry.time ? new Date(entry.time).toLocaleString('ru-RU') : 'Подарок новому гостю'}</small></div><strong className={entry.amount > 0 ? 'ds-good' : ''}>{entry.amount > 0 ? '+' : ''}{entry.amount}</strong></div>)}</section></>}
        {notice && <p role="status" className="ds-good">{notice}</p>}{error && <p role="alert" className="ds-error">{error}</p>}
        <div className="ds-demo-footer"><p>Один демоаккаунт для всех трёх вариантов в этом браузере.</p>{!resetOpen ? <button className="ds-text-button" onClick={() => setResetOpen(true)}>Начать демо заново</button> : <div className="ds-inset"><p>Удалить демозаказы и изменения профиля? Баланс вернётся к 300 бонусам во всех трёх вариантах.</p><div className="ds-actions"><button className="ds-button ds-secondary" onClick={() => setResetOpen(false)}>Оставить</button><button className="ds-button" disabled={busy} onClick={() => act({ type: 'RESET' }, '')}>Сбросить демо</button></div></div>}</div>
      </div>
    </div>}
    <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
  </main>
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
  const input = { items: cart.items, products, store, promoCode: cart.promoCode, deliveryType, useBonuses: useBonuses && state.signedIn }
  let quote
  try { quote = quoteOrder({ ...input, balance: state.balance, hasOrders: state.orders.length > 0 }) } catch (err) {
    return <main className="ds ds-page"><h1>Проверьте корзину</h1><p role="alert">{err.message}</p><Link to="/cart" className="ds-button">В корзину</Link></main>
  }
  function prepare(event) {
    event.preventDefault(); setError('')
    if (!state.signedIn) { setAuthOpen(true); return }
    if (quote.subtotal < store.minOrder) return
    setDraft({ id: crypto.randomUUID(), quote, input, customer: { ...customer }, time: new Date().toISOString() })
    setPayment('ready')
  }
  async function pay() {
    if (paying.current) return
    paying.current = true; setPayment('processing'); setError('')
    try {
      const result = await transact({ type: 'PAY', id: draft.id, expected: draft.quote, input: draft.input, customer: draft.customer, time: draft.time, variant })
      setOrder(result.orders.find(item => item.id === draft.id)); cart.clearCart(); setDraft(null); setPayment('ready')
    } catch (err) { setError(err.message); setPayment('ready') } finally { paying.current = false }
  }
  if (order) return <main className="ds ds-page"><DemoNotice /><section className="ds-card ds-success"><div className="ds-success-mark">✓</div><span className="ds-eyebrow">ВСЁ ПОЛУЧИЛОСЬ</span><h1>Заказ {order.number} оплачен</h1><p className="ds-muted">Демонстрационная оплата прошла успешно. Реального заказа и списания денег нет.</p><div className="ds-success-total">{money(order.total)}</div><p className="ds-good">+{order.earned} бонусов на баланс{order.spent ? ` · использовано ${order.spent}` : ''}</p><p>{order.deliveryType === 'pickup' ? `Самовывоз: ${store.address}` : order.customer.address}</p><div className="ds-actions"><Link to="/account?tab=orders" className="ds-button">Посмотреть заказ</Link><Link to="/" className="ds-button ds-secondary">Вернуться в меню</Link></div></section></main>
  if (draft) return <main className="ds ds-page"><DemoNotice /><div className="ds-checkout-heading"><button className="ds-text-button" disabled={payment === 'processing'} onClick={() => { setDraft(null); setError('') }}>← Вернуться к оформлению</button><h1>Демонстрационная оплата</h1><p className="ds-muted">Здесь можно проверить успешный платёж и отказ. Банковские реквизиты не нужны.</p></div><div className="ds-checkout-grid"><section className="ds-card ds-payment"><div className="ds-payment-symbol">↗</div><span className="ds-eyebrow">СУШИСТОРОЛЛ / DEMO PAY</span><h2>{money(draft.quote.total)}</h2><p>К оплате за ваш заказ</p><div className="ds-inset"><strong>Тестовая оплата</strong><span>Деньги не списываются. Внешний платёжный сервис не подключён.</span></div>{payment === 'failed' ? <><p role="alert" className="ds-error">Тестовый платёж отклонён. Корзина и бонусы сохранены, заказ не создан.</p><button className="ds-button ds-wide" onClick={() => setPayment('ready')}>Повторить оплату</button></> : <div className="ds-form"><button className="ds-button ds-wide" disabled={payment === 'processing'} onClick={pay}>{payment === 'processing' ? 'Подтверждаем…' : 'Имитировать успешную оплату'}</button><button className="ds-button ds-secondary ds-wide" disabled={payment === 'processing'} onClick={() => setPayment('failed')}>Имитировать отказ</button></div>}{error && <p className="ds-error" role="alert">{error}</p>}</section><QuoteSummary quote={draft.quote} /></div></main>
  if (!cart.items.length) return <main className="ds ds-page"><h1>Оформление заказа</h1><section className="ds-card ds-empty"><h2>Корзина пока пуста</h2><p className="ds-muted">Самое время выбрать что-нибудь вкусное.</p><Link className="ds-button" to="/">Перейти в меню</Link><Link className="ds-text-button" to="/account?tab=orders">История заказов</Link></section></main>
  return <main className="ds ds-page"><DemoNotice /><div className="ds-checkout-heading"><Link className="ds-text-button" to="/cart">← Корзина</Link><h1>Осталось совсем немного</h1><p className="ds-muted">Укажите, куда доставить заказ, и попробуйте демооплату.</p></div><div className="ds-checkout-grid"><form className="ds-form" onSubmit={prepare}>
    {!state.signedIn && <section className="ds-card"><h2>С бонусами приятнее</h2><p className="ds-muted">Войдите в общий демоаккаунт, чтобы оформить заказ и получить бонусы.</p><button type="button" className="ds-button ds-secondary" onClick={() => setAuthOpen(true)}>Войти в демоаккаунт</button></section>}
    <section className="ds-card"><span className="ds-eyebrow">01 / КОНТАКТЫ</span><h2>Для кого готовим?</h2><div className="ds-fields"><label>Имя<input required maxLength={100} name="name" value={customer.name} onChange={event => setCustomer({ ...customer, name: event.target.value })} /></label><label>Телефон<input required maxLength={30} type="tel" name="phone" value={customer.phone} onChange={event => setCustomer({ ...customer, phone: event.target.value })} /></label></div></section>
    <section className="ds-card"><span className="ds-eyebrow">02 / ПОЛУЧЕНИЕ</span><h2>Доставим или заберёте?</h2><div className="ds-segment">{[['delivery', 'Доставка'], ['pickup', 'Самовывоз']].map(([key, label]) => <label key={key}><input type="radio" name="deliveryType" value={key} checked={deliveryType === key} onChange={() => setDeliveryType(key)} /><span>{label}</span></label>)}</div>{deliveryType === 'delivery' ? <label>Адрес доставки<input required maxLength={250} name="address" value={customer.address} onChange={event => setCustomer({ ...customer, address: event.target.value })} /></label> : <div className="ds-inset"><strong>{store.city}, {store.address}</strong><span>{store.hours} · самовывоз бесплатно</span></div>}<p className="ds-caption">Показываем сценарий получения. Настоящая доставка не оформляется.</p></section>
    <section className="ds-card"><span className="ds-eyebrow">03 / БОНУСЫ</span><h2>Добавим приятного</h2><label className="ds-bonus-check"><input type="checkbox" checked={useBonuses} disabled={!state.signedIn || !quote.maxSpend} onChange={event => setUseBonuses(event.target.checked)} /><span><strong>Списать {state.signedIn ? quote.maxSpend : 0} бонусов</strong><small>Баланс: {state.signedIn ? state.balance : 'войдите в аккаунт'} · до 30% стоимости товаров</small></span></label><p className="ds-caption">1 бонус = 1 ₽. После оплаты начислим {quote.earned} бонусов.</p></section>
    <PromoMessage quote={quote} />{quote.subtotal < store.minOrder && <p className="ds-error" role="alert">Минимальная сумма товаров — {money(store.minOrder)}. Добавьте ещё {money(store.minOrder - quote.subtotal)}.</p>}
    <button className="ds-button ds-wide" disabled={quote.subtotal < store.minOrder}>{state.signedIn ? `Перейти к демооплате · ${money(quote.total)}` : 'Войти и продолжить'}</button>
  </form><QuoteSummary quote={quote}><p className="ds-caption">Доставка бесплатно от {money(store.freeDeliveryFrom)} до скидок; иначе {money(store.deliveryFee)}.</p><p className="ds-caption">Для первого заказа: промокод SUSHI10 в корзине.</p></QuoteSummary></div><AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} /></main>
}
