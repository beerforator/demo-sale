import { CheckoutPage as SharedCheckout } from '../../../../packages/customer/index.jsx'
import { useCart } from '../context/CartContext.jsx'
import products from '../data/products.js'
import store from '../data/store.json'

export default function CheckoutPage() {
  return <SharedCheckout cart={useCart()} products={products} store={store} variant="sushitree" />
}
