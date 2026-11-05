import { createContext, useContext, useReducer, useCallback } from 'react'

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
              ? { ...i, quantity: i.quantity + 1 }
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
            ? { ...i, quantity: Math.max(1, action.quantity) }
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

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    promoCode: null,
    panelOpen: false
  })

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
