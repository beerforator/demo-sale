import { moscowDay } from './moscow-day.mjs'

export const STORAGE_KEY = 'demo-sale.customer.v1'
export const INITIAL_BONUS = 1000
export const money = value => `${value.toLocaleString('ru-RU')} ₽`
export const freshState = (day = moscowDay()) => ({
  version: 1, day, signedIn: false,
  profile: { name: 'Алексей', phone: '+7 (000) 000-00-00', email: 'demo@example.com', address: 'Новороссийск, ул. Примерная, 12, кв. 8' },
  balance: INITIAL_BONUS, orders: [],
  ledger: [{ id: 'welcome', label: 'Приветственные бонусы', amount: INITIAL_BONUS, time: null }],
})
export function readState(storage, day = moscowDay()) {
  const raw = storage.getItem(STORAGE_KEY)
  if (!raw) return freshState(day)
  try {
    const state = JSON.parse(raw)
    if (state.version !== 1 || typeof state.signedIn !== 'boolean' || !Number.isInteger(state.balance) || state.balance < 0 ||
      !state.profile || !['name', 'phone', 'email', 'address'].every(key => typeof state.profile[key] === 'string') ||
      !Array.isArray(state.orders) || !state.orders.every(o => typeof o.id === 'string' && Array.isArray(o.lines) && Number.isFinite(o.total)) ||
      !Array.isArray(state.ledger) || !state.ledger.every(x => typeof x.label === 'string' && Number.isFinite(x.amount))) return freshState(day)
    if (state.day !== day) {
      return { ...freshState(day), signedIn: state.signedIn, profile: state.profile }
    }
    return state
  } catch { return freshState(day) }
}
export function quoteOrder({ items, products, promoCode, balance = 0, useBonuses = false, hasOrders = false, deliveryType = 'delivery', store }) {
  const lines = items.map(item => {
    const product = products.find(p => p.id === item.productId)
    if (!product || product.stopList || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) throw new Error('Состав корзины изменился. Проверьте товары и количество (до 99).')
    return { productId: product.id, name: product.name, price: product.price, quantity: item.quantity }
  })
  const subtotal = lines.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const code = (promoCode ?? '').trim().toUpperCase()
  const validPromo = code === 'SUSHI10' && !hasOrders
  const promoError = code && !validPromo ? (code === 'SUSHI10' ? 'SUSHI10 действует только на первый оплаченный заказ.' : 'Промокод не найден. Попробуйте SUSHI10 на первый заказ.') : ''
  const discount = validPromo ? Math.floor(subtotal * 0.1) : 0
  const afterDiscount = subtotal - discount
  const maxSpend = Math.min(balance, Math.floor(afterDiscount * 0.3))
  const spent = useBonuses ? maxSpend : 0
  const deliveryFee = !lines.length || deliveryType === 'pickup' || subtotal >= store.freeDeliveryFrom ? 0 : store.deliveryFee
  return { lines, subtotal, discount, promoError, code: validPromo ? code : null, maxSpend, spent, deliveryFee,
    total: afterDiscount - spent + deliveryFee, earned: Math.floor((afterDiscount - spent) * 0.05) }
}
export function reduceCustomer(state, action) {
  switch (action.type) {
    case 'SIGN_IN': return { ...state, signedIn: true }
    case 'SIGN_OUT': return { ...state, signedIn: false }
    case 'PROFILE': return { ...state, profile: { ...state.profile, ...action.profile } }
    case 'RESET': return freshState(state.day)
    case 'PAY': {
      if (action.day !== state.day) throw new Error('Начался новый день. Соберите корзину заново.')
      if (!state.signedIn) throw new Error('Войдите в аккаунт перед оплатой.')
      if (state.orders.some(o => o.id === action.id)) return state
      const quote = quoteOrder({ ...action.input, balance: state.balance, hasOrders: state.orders.length > 0 })
      if (!quote.lines.length || quote.subtotal < action.input.store.minOrder) throw new Error(`Минимальная сумма товаров — ${money(action.input.store.minOrder)}.`)
      if (['total', 'spent', 'earned', 'discount'].some(key => quote[key] !== action.expected[key])) throw new Error('Баланс или скидка изменились в другой вкладке. Вернитесь к оформлению и проверьте сумму.')
      const order = { ...quote, id: action.id, number: `Д-${action.id.slice(0, 8).toUpperCase()}`, time: action.time,
        variant: action.variant, status: 'Оплачен', deliveryType: action.input.deliveryType,
        customer: action.customer }
      const entries = []
      if (quote.spent) entries.push({ id: `${action.id}-spend`, amount: -quote.spent, label: `Списание за заказ ${order.number}`, time: action.time })
      if (quote.earned) entries.push({ id: `${action.id}-earn`, amount: quote.earned, label: `Начисление за заказ ${order.number}`, time: action.time })
      return { ...state, profile: { ...state.profile, ...action.customer }, balance: state.balance - quote.spent + quote.earned,
        orders: [order, ...state.orders], ledger: [...entries, ...state.ledger] }
    }
    default: throw new Error('Неизвестное действие')
  }
}
