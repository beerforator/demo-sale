import { AccountPage as SharedAccount } from '../../../../packages/customer/index.jsx'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import products from '../data/products.json'

export default function AccountPage() {
  const cart = useCart()
  const navigate = useNavigate()
  function repeat(order) {
    cart.clearCart()
    for (const line of order.lines) {
      const product = products.find(p => p.id === line.productId)
      if (product && !product.stopList) {
        cart.addItem(product)
        cart.setQuantity(product.id, line.quantity)
      }
    }
    navigate('/cart')
  }
  return <SharedAccount onRepeat={repeat} />
}
