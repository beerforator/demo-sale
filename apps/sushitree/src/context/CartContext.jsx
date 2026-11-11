import { CartProvider as SharedCartProvider } from '../../../../packages/customer/cart.jsx'
export { useCart } from '../../../../packages/customer/cart.jsx'

export function CartProvider({ children }) {
  return <SharedCartProvider base="/sushitree/">{children}</SharedCartProvider>
}
