import test from 'node:test'
import assert from 'node:assert/strict'
import { freshState, quoteOrder, reduceCustomer, readState, STORAGE_KEY } from './model.mjs'

const products = [{ id: 'roll', name: 'Ролл', price: 420 }, { id: 'stopped', price: 100, stopList: true }]
const store = { deliveryFee: 199, freeDeliveryFrom: 900, minOrder: 500 }
const input = { products, store, items: [{ productId: 'roll', quantity: 2 }], promoCode: 'SUSHI10', useBonuses: true, deliveryType: 'delivery' }
const signedIn = () => ({ ...freshState(), signedIn: true })
function payment(state, overrides = {}) {
  const orderInput = { ...input, ...overrides }
  return { type: 'PAY', id: 'test-order-12345', time: '2026-11-05T12:00:00.000Z', variant: 'sushione', customer: state.profile, input: orderInput,
    expected: quoteOrder({ ...orderInput, balance: state.balance, hasOrders: state.orders.length > 0 }) }
}

test('скидка, бонусы и доставка: 840 − 84 − 226 + 199 = 729, начисление 26', () => {
  const result = quoteOrder({ ...input, balance: 300 })
  assert.equal(result.discount, 84); assert.equal(result.spent, 226)
  assert.equal(result.total, 729); assert.equal(result.earned, 26)
})
test('успешная оплата сохраняет заказ и обе операции бонусного счёта', () => {
  const state = signedIn(); const next = reduceCustomer(state, payment(state))
  assert.equal(next.balance, 100)
  assert.equal(next.orders.length, 1)
  assert.deepEqual(next.ledger.map(x => x.amount), [-226, 26, 300])
  assert.equal(next.orders[0].total, 729)
  assert.equal(state.orders.length, 0)
})
test('повторное подтверждение того же платежа не начисляет и не списывает повторно', () => {
  const state = signedIn(); const action = payment(state); const paid = reduceCustomer(state, action)
  assert.deepEqual(reduceCustomer(paid, action), paid)
})
test('SUSHI10 перестаёт действовать после первого оплаченного заказа', () => {
  const state = signedIn(); const paid = reduceCustomer(state, payment(state))
  const quote = quoteOrder({ ...input, hasOrders: paid.orders.length > 0 })
  assert.equal(quote.discount, 0); assert.ok(quote.promoError.includes('первый'))
})
test('списание ограничено текущим балансом', () => {
  const result = quoteOrder({ ...input, balance: 10 })
  assert.equal(result.spent, 10); assert.equal(result.total, 945)
})
test('самовывоз бесплатный, бонусы за доставку не начисляются', () => {
  const delivery = quoteOrder({ ...input, balance: 0 })
  const pickup = quoteOrder({ ...input, balance: 0, deliveryType: 'pickup' })
  assert.equal(pickup.deliveryFee, 0); assert.equal(delivery.earned, pickup.earned)
  assert.equal(delivery.total - pickup.total, 199)
})
test('порог бесплатной доставки проверяется до скидок', () => {
  const quote = quoteOrder({ ...input, items: [{ productId: 'roll', quantity: 3 }], balance: 300 })
  assert.equal(quote.deliveryFee, 0)
})
test('изменение баланса в другой вкладке требует повторной проверки суммы', () => {
  const state = signedIn(); const action = payment(state)
  assert.throws(() => reduceCustomer({ ...state, balance: 0 }, action), /другой вкладке/)
})
test('без входа нельзя подтвердить оплату', () => {
  const state = freshState()
  assert.throws(() => reduceCustomer(state, payment(state)), /Войдите/)
})
test('пустой или слишком маленький заказ нельзя оплатить', () => {
  const state = signedIn()
  assert.throws(() => reduceCustomer(state, payment(state, { items: [] })), /Минимальная/)
  assert.throws(() => reduceCustomer(state, payment(state, { items: [{ productId: 'roll', quantity: 1 }] })), /Минимальная/)
})
test('отсутствующие и недоступные товары и неверное количество отклоняются', () => {
  for (const item of [{ productId: 'missing', quantity: 1 }, { productId: 'stopped', quantity: 1 }, { productId: 'roll', quantity: 0 }, { productId: 'roll', quantity: 1.5 }]) {
    assert.throws(() => quoteOrder({ ...input, items: [item] }), /Состав корзины/)
  }
})
test('неизвестный промокод не уменьшает сумму', () => {
  const quote = quoteOrder({ ...input, promoCode: 'NOPE', balance: 0 })
  assert.equal(quote.discount, 0); assert.equal(quote.total, 1039); assert.ok(quote.promoError)
})
test('аккаунт восстанавливается из общего хранилища, сброс возвращает исходное состояние', () => {
  const state = signedIn(); const paid = reduceCustomer(state, payment(state))
  const storage = { getItem: key => key === STORAGE_KEY ? JSON.stringify(paid) : null }
  assert.deepEqual(readState(storage), paid)
  assert.deepEqual(reduceCustomer(paid, { type: 'RESET' }), freshState())
  assert.deepEqual(readState({ getItem: () => '{bad' }), freshState())
  assert.deepEqual(readState({ getItem: () => JSON.stringify({ version: 1, balance: -1 }) }), freshState())
})
