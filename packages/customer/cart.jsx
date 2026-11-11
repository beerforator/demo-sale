import { createContext, useContext, useReducer, useCallback, useEffect } from 'react'
import { useCustomer } from './context.jsx'
import { moscowDay, readDailyCart } from './moscow-day.mjs'

const CartContext = createContext()

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.productId === action.product.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.productId === action.product.id
              ? { ...i, quantity: Math.min(99, i.quantity + 1) }
              : i
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { productId: action.product.id, quantity: 1 }]
      }
    }
    case 'REMOVE_ITEM': {
      const existing = state.items.find(i => i.productId === action.productId)
      if (existing && existing.quantity > 1) {
        return {
          ...state,
          items: state.items.map(i =>
            i.productId === action.productId
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
        }
      }
      return {
        ...state,
        items: state.items.filter(i => i.productId !== action.productId)
      }
    }
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(i => i.productId !== action.productId)
      }
    case 'CLEAR_CART':
      return { ...state, items: [], promoCode: null }
    case 'SET_QUANTITY':
      return {
        ...state,
        items: state.items.map(i =>
          i.productId === action.productId
            ? { ...i, quantity: Math.min(99, Math.max(1, Math.floor(action.quantity) || 1)) }
            : i
        )
      }
    case 'APPLY_PROMO':
      return { ...state, promoCode: action.code }
    case 'REMOVE_PROMO':
      return { ...state, promoCode: null }
    case 'TOGGLE_PANEL':
      return { ...state, panelOpen: !state.panelOpen }
    case 'OPEN_PANEL':
      return { ...state, panelOpen: true }
    case 'CLOSE_PANEL':
      return { ...state, panelOpen: false }
    default:
      return state
  }
}

export function CartProvider({ base, children }) {
  const { state: { day } } = useCustomer()
  const storageKey = `demo-sale.cart.${base}`
  return <DailyCartProvider key={day} day={day} storageKey={storageKey}>{children}</DailyCartProvider>
}

function DailyCartProvider({ day, storageKey, children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => ({
    ...readDailyCart({ getItem: key => localStorage.getItem(key) }, storageKey, day),
    panelOpen: false,
  }))
  useEffect(() => {
    // A suspended tab must not write yesterday's cart over today's cart.
    if (day !== moscowDay()) return
    try {
      localStorage.setItem(storageKey, JSON.stringify({ day, items: state.items, promoCode: state.promoCode }))
    } catch {}
  }, [day, storageKey, state.items, state.promoCode])

  const addItem = useCallback((product) => dispatch({ type: 'ADD_ITEM', product }), [])
  const removeItem = useCallback((productId) => dispatch({ type: 'REMOVE_ITEM', productId }), [])
  const deleteItem = useCallback((productId) => dispatch({ type: 'DELETE_ITEM', productId }), [])
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])
  const setQuantity = useCallback((productId, quantity) => dispatch({ type: 'SET_QUANTITY', productId, quantity }), [])
  const applyPromo = useCallback((code) => dispatch({ type: 'APPLY_PROMO', code }), [])
  const removePromo = useCallback(() => dispatch({ type: 'REMOVE_PROMO' }), [])
  const togglePanel = useCallback(() => dispatch({ type: 'TOGGLE_PANEL' }), [])
  const openPanel = useCallback(() => dispatch({ type: 'OPEN_PANEL' }), [])
  const closePanel = useCallback(() => dispatch({ type: 'CLOSE_PANEL' }), [])

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{
      ...state,
      itemCount,
      addItem,
      removeItem,
      deleteItem,
      clearCart,
      setQuantity,
      applyPromo,
      removePromo,
      togglePanel,
      openPanel,
      closePanel
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
